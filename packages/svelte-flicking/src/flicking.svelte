<script lang="ts">
  import {
    getContext,
    onMount,
    onDestroy,
    beforeUpdate,
    afterUpdate,
    createEventDispatcher,
setContext
  } from "svelte";
  import VanillaFlicking, {
    EVENTS,
    withFlickingMethods,
    sync,
    getDefaultCameraTransform
  } from "@egjs/flicking";
  import type {
    FlickingOptions,
    Plugin,
    Status
  } from "@egjs/flicking";
  import ListDiffer from "@egjs/list-differ";
  import * as uuid from "uuid";

  import SvelteRenderer from "./SvelteRenderer";
  import type SveltePanelComponent from "./SveltePanelComponent";
  import SveltePanel from "./SveltePanel";
  import { findIndex } from "./utils";

  export let hideBeforeInit: boolean = false;
  export let firstPanelSize: string | undefined = undefined;
  export let options: Partial<FlickingOptions> = {};
  export let plugins: Plugin[] = [];
  export let status: Status | undefined = undefined;

  const flickingID = uuid.v4();
  const dispatch = createEventDispatcher();
  const sveltePanels: SveltePanelComponent[] = [];
  const pendingPanels: SveltePanelComponent[] = [];
  let isHorizontal: boolean;
  let isHiddenBeforeInit: boolean;
  let viewportEl: HTMLElement;
  let cameraEl: HTMLElement;
  let vanillaFlicking: VanillaFlicking | null = null;
  const pluginsDiffer: ListDiffer<Plugin> = new ListDiffer([]);
  const slotDiffer: ListDiffer<HTMLElement> = new ListDiffer<HTMLElement>([], el => el.dataset.key!);

  setContext("flickingID", flickingID);
  setContext(`${flickingID}-panels`, sveltePanels);
  setContext(`${flickingID}-pending`, pendingPanels);

  $: {
    isHorizontal = options.horizontal ?? true;
    isHiddenBeforeInit = hideBeforeInit && !(vanillaFlicking && vanillaFlicking.initialized);
  }

  onDestroy(() => {
    vanillaFlicking?.destroy();
  });

  onMount(() => {
    sveltePanels.push(...pendingPanels.splice(0, pendingPanels.length));
    slotDiffer.update(getChildren());

    const flicking = new VanillaFlicking(viewportEl, {
      ...options,
      renderExternal: {
        renderer: SvelteRenderer,
        rendererOptions: { sveltePanels }
      }
    });

    vanillaFlicking = flicking;

    Object.keys(EVENTS).forEach(key => {
      const eventName = EVENTS[key];

      flicking.on(eventName, (e: any) => {
        dispatch(eventName, e);
      });
    });

    flicking.on(EVENTS.VISIBLE_CHANGE, e => {
      e.added.forEach(panel => {
        (panel as SveltePanel).render();
      });
    });
  });

  beforeUpdate(() => {
    const flicking = vanillaFlicking;
    if (!flicking) return;

    flicking.renderer.forceRenderAllPanels();
  });

  afterUpdate(() => {
    if (!vanillaFlicking) return;

    const children = getChildren();
    const diff = slotDiffer.update(children);

    diff.removed.forEach(idx => {
      sveltePanels.splice(idx, 1);
    });

    diff.ordered.forEach(([prev, next]) => {
      const panel = sveltePanels.splice(prev, 1);
      sveltePanels.splice(next, 0, ...panel);
    });

    const syncingPanels = [...sveltePanels];

    diff.added.forEach(idx => {
      const addedEl = children[idx];
      const panelIdx = findIndex(pendingPanels, panel => panel.id === addedEl.dataset.key);

      syncingPanels.push(pendingPanels[panelIdx]);
      sveltePanels.splice(idx, 0, pendingPanels[panelIdx]);
    });

    sync(vanillaFlicking, diff, syncingPanels);

    // Flush pending panels
    pendingPanels.splice(0, pendingPanels.length);
  });

  function getChildren() {
    if (!cameraEl) return [];

    return [].slice.apply(cameraEl.children) as HTMLElement[];
  }
</script>

<div class="flicking-viewport" bind:this={viewportEl} class:vertical={!isHorizontal} class:flicking-hidden={isHiddenBeforeInit}>
  <div class="flicking-camera" bind:this={cameraEl}>
    <slot />
  </div>
  <slot name="viewport" />
</div>
