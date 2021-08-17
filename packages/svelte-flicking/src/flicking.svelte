<script>
  import {
    onMount,
    onDestroy,
    beforeUpdate,
    afterUpdate,
    createEventDispatcher,
    setContext
  } from "svelte";
  import VanillaFlicking, {
    EVENTS,
    sync,
    getDefaultCameraTransform
  } from "@egjs/flicking";
  import ListDiffer from "@egjs/list-differ";
  import * as uuid from "uuid-browser";

  import SvelteRenderer from "./SvelteRenderer";
  import { findIndex } from "./utils";

  export let hideBeforeInit = false;
  export let firstPanelSize = undefined;
  export let options = {};
  export let plugins = [];
  export let status = undefined;
  export let vanillaFlicking = null;

  const flickingID = uuid.v4();
  const dispatch = createEventDispatcher();
  const sveltePanels = [];
  const pendingPanels = [];
  const pluginsDiffer = new ListDiffer([]);
  const slotDiffer = new ListDiffer([], el => el.dataset.key);

  let viewportEl;
  let cameraEl;

  let isHorizontal;
  let isHiddenBeforeInit;
  let cameraTransform;

  setContext("flickingID", flickingID);
  setContext(`${flickingID}-panels`, sveltePanels);
  setContext(`${flickingID}-pending`, pendingPanels);

  $: {
    isHorizontal = options.horizontal != null ? options.horizontal : true;
    isHiddenBeforeInit = hideBeforeInit && !(vanillaFlicking && vanillaFlicking.initialized);
    cameraTransform = !(vanillaFlicking && vanillaFlicking.initialized) && firstPanelSize
      ? `transform: ${getDefaultCameraTransform(options.align, options.horizontal, firstPanelSize)};`
      : undefined;
  }

  onDestroy(() => {
    vanillaFlicking && vanillaFlicking.destroy();
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

      flicking.on(eventName, e => {
        dispatch(eventName, e);
      });
    });

    flicking.on(EVENTS.VISIBLE_CHANGE, e => {
      e.added.forEach(panel => {
        panel.render();
      });
    });

    flicking.once(EVENTS.READY, () => {
      // Update reference to update computed properties
      vanillaFlicking = flicking;
    });

    checkPlugins();

    if (status) {
      flicking.setStatus(status);
    }
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

    checkPlugins();
  });

  function getChildren() {
    if (!cameraEl) return [];

    return [].slice.apply(cameraEl.children);
  }

  function checkPlugins() {
    if (!vanillaFlicking) return;

    const { list, added, removed, prevList } = pluginsDiffer.update(plugins);

    vanillaFlicking.addPlugins(...added.map(index => list[index]));
    vanillaFlicking.removePlugins(...removed.map(index => prevList[index]));
  }
</script>

<svelte:options accessors={true} />
<div class:flicking-viewport={true} bind:this={viewportEl} class:vertical={!isHorizontal} class:flicking-hidden={isHiddenBeforeInit} {...$$restProps}>
  <div class:flicking-camera={true} bind:this={cameraEl} style={cameraTransform}>
    <slot />
  </div>
  <slot name="viewport" />
</div>
