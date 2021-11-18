<script lang="ts">
  import {
    onMount,
    onDestroy,
    afterUpdate,
    createEventDispatcher,
    setContext
  } from "svelte";
  import VanillaFlicking, {
    VirtualRenderingStrategy,
    NormalRenderingStrategy,
    sync,
    range,
    toArray,
    getDefaultCameraTransform,
    Plugin,
    Status,
    EVENTS,
    FlickingOptions
  } from "@egjs/flicking";
  import Component from "@egjs/component";
  import ListDiffer, { DiffResult } from "@egjs/list-differ";

  import PanelManager from "./PanelManager";
  import SvelteRenderer, { SvelteRendererOptions } from "./SvelteRenderer";
  import SvelteElementProvider from "./SvelteElementProvider";

  export let hideBeforeInit: boolean = false;
  export let firstPanelSize: string | undefined = undefined;
  export let options: Partial<FlickingOptions> = {};
  export let plugins: Plugin[] = [];
  export let status: Status | undefined = undefined;
  export let vanillaFlicking: VanillaFlicking | null = null;

  const dispatch = createEventDispatcher();
  const panelManager = new PanelManager();
  const pluginsDiffer = new ListDiffer<Plugin>([]);
  const slotDiffer = new ListDiffer<HTMLElement>([], el => el.dataset.key!);
  const renderEmitter = new Component<{ render: void }>();

  let viewportEl: HTMLElement;
  let cameraEl: HTMLElement;

  let isHorizontal: boolean;
  let isHiddenBeforeInit: boolean;
  let cameraTransform: { style?: string };

  let diffResult: DiffResult<HTMLElement> | null = null;
  let renderCounter = 0;

  setContext("panels", panelManager);

  $: {
    isHorizontal = options.horizontal != null ? options.horizontal : true;
    isHiddenBeforeInit = hideBeforeInit && !(vanillaFlicking && vanillaFlicking.initialized);
    cameraTransform = !(vanillaFlicking && vanillaFlicking.initialized) && firstPanelSize
      ? { style: `transform: ${getDefaultCameraTransform(options.align, options.horizontal, firstPanelSize)}` }
      : {};
  }

  onDestroy(() => {
    vanillaFlicking && vanillaFlicking.destroy();
  });

  onMount(() => {
    slotDiffer.update(toArray(cameraEl.children) as HTMLElement[]);

    const rendererOptions: SvelteRendererOptions = {
      getSlots,
      renderEmitter,
      forceUpdate,
      align: options.align,
      strategy: options.virtual && options.panelsPerView > 0
        ? new VirtualRenderingStrategy()
        : new NormalRenderingStrategy({
          providerCtor: SvelteElementProvider
        })
    };

    const flicking = new VanillaFlicking(viewportEl, {
      ...options,
      externalRenderer: new SvelteRenderer(rendererOptions)
    });

    vanillaFlicking = flicking;

    bindEvents();
    checkPlugins();

    if (status) {
      flicking.setStatus(status);
    }
  });

  afterUpdate(() => {
    if (!vanillaFlicking) return;

    if (!vanillaFlicking.camera.element.style.transform) {
      vanillaFlicking.camera.applyTransform();
    }

    checkPlugins();

    renderEmitter.trigger("render");

    if (!vanillaFlicking.initialized) return;

    if (panelManager.dirty) {
      vanillaFlicking.renderer.forceRenderAllPanels();
      panelManager.dirty = false;
      renderEmitter.once("render", () => {
        diffResult = slotDiffer.update(toArray(cameraEl.children) as HTMLElement[]);

        // As added elements should always back in the slots list
        sync(vanillaFlicking!, diffResult, [
          ...diffResult.prevList.map(el => panelManager.get(el.dataset.key!)),
          ...diffResult.added.map(idx => panelManager.get(diffResult!.list[idx].dataset.key!)),
        ]);
        vanillaFlicking!.renderer.render();
      });
    }
  });

  function getSlots(children: HTMLElement[]) {
    return children.map(el => {
      return panelManager.get(el.dataset.key!);
    })
  }

  function bindEvents() {
    Object.keys(EVENTS).forEach(key => {
      const eventName = EVENTS[key];

      vanillaFlicking!.on(eventName, e => {
        dispatch(eventName, e);
      });
    });

    vanillaFlicking!.once(EVENTS.READY, e => {
      // Update reference to update computed properties
      vanillaFlicking = e.currentTarget;
    });
  }

  function checkPlugins() {
    if (!vanillaFlicking) return;

    const { list, added, removed, prevList } = pluginsDiffer.update(plugins);

    vanillaFlicking.addPlugins(...added.map(index => list[index]));
    vanillaFlicking.removePlugins(...removed.map(index => prevList[index]));
  }

  function forceUpdate() {
    renderCounter += 1;
  }
</script>

<svelte:options accessors={true} />
<div class:flicking-viewport={true} bind:this={viewportEl} class:vertical={!isHorizontal} class:flicking-hidden={isHiddenBeforeInit} {...$$restProps}>
  <div class:flicking-camera={true} bind:this={cameraEl} {...cameraTransform}>
    {#if (options.panelsPerView ?? -1) > 0 && !!options.virtual}
      {#each range((options.panelsPerView ?? - 1) + 1) as _idx}
        <div class={options.virtual.panelClass}></div>
      {/each}
    {:else}
      <slot />
    {/if}
  </div>
  <!-- Putting counter here to hide it from where it renderes -->
  <slot data-render-count={renderCounter} name="viewport" />
</div>
