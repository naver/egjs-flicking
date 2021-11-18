<script>var _a;
import { onMount, onDestroy, afterUpdate, createEventDispatcher, setContext } from "svelte";
import VanillaFlicking, { ExternalPanel, VirtualRenderingStrategy, NormalRenderingStrategy, sync, range, toArray, getDefaultCameraTransform, EVENTS } from "@egjs/flicking";
import Component from "@egjs/component";
import ListDiffer from "@egjs/list-differ";
import PanelManager from "./PanelManager";
import SvelteRenderer from "./SvelteRenderer";
import SvelteElementProvider from "./SvelteElementProvider";
export let hideBeforeInit = false;
export let firstPanelSize = undefined;
export let options = {};
export let plugins = [];
export let status = undefined;
export let vanillaFlicking = null;
const dispatch = createEventDispatcher();
const panelManager = new PanelManager();
const pluginsDiffer = new ListDiffer([]);
const slotDiffer = new ListDiffer([], el => el.dataset.key);
const renderEmitter = new Component();
let viewportEl;
let cameraEl;
let panelsPerView;
let isHorizontal;
let isHiddenBeforeInit;
let cameraTransform;
let diffResult = null;
let renderCounter = 0;
setContext("panels", panelManager);
$: {
    panelsPerView = (_a = options.panelsPerView) !== null && _a !== void 0 ? _a : -1;
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
    var _a;
    slotDiffer.update(toArray(cameraEl.children));
    const rendererOptions = {
        getSlots,
        renderEmitter,
        forceUpdate,
        strategy: options.virtual && ((_a = options.panelsPerView) !== null && _a !== void 0 ? _a : -1) > 0
            ? new VirtualRenderingStrategy()
            : new NormalRenderingStrategy({
                providerCtor: SvelteElementProvider,
                panelCtor: ExternalPanel
            })
    };
    const flicking = new VanillaFlicking(viewportEl, Object.assign(Object.assign({}, options), { renderExternal: {
            renderer: SvelteRenderer,
            rendererOptions
        } }));
    vanillaFlicking = flicking;
    bindEvents();
    checkPlugins();
    if (status) {
        flicking.setStatus(status);
    }
});
afterUpdate(() => {
    if (!vanillaFlicking)
        return;
    if (!vanillaFlicking.camera.element.style.transform) {
        vanillaFlicking.camera.applyTransform();
    }
    checkPlugins();
    renderEmitter.trigger("render");
    if (!vanillaFlicking.initialized)
        return;
    if (panelManager.dirty) {
        vanillaFlicking.renderer.forceRenderAllPanels();
        panelManager.dirty = false;
        renderEmitter.once("render", () => {
            diffResult = slotDiffer.update(toArray(cameraEl.children));
            // As added elements should always back in the slots list
            sync(vanillaFlicking, diffResult, [
                ...diffResult.prevList.map(el => panelManager.get(el.dataset.key)),
                ...diffResult.added.map(idx => panelManager.get(diffResult.list[idx].dataset.key)),
            ]);
            vanillaFlicking.renderer.render();
        });
    }
});
function getSlots(children) {
    return children.map(el => {
        return panelManager.get(el.dataset.key);
    });
}
function bindEvents() {
    Object.keys(EVENTS).forEach(key => {
        const eventName = EVENTS[key];
        vanillaFlicking.on(eventName, e => {
            dispatch(eventName, e);
        });
    });
    vanillaFlicking.once(EVENTS.READY, e => {
        // Update reference to update computed properties
        vanillaFlicking = e.currentTarget;
    });
}
function checkPlugins() {
    if (!vanillaFlicking)
        return;
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
    {#if panelsPerView > 0 && !!options.virtual}
      {#each range(panelsPerView + 1) as _idx}
        <div class={options.virtual.panelClass}></div>
      {/each}
    {:else}
      <slot />
    {/if}
  </div>
  <!-- Putting counter here to hide it from where it renderes -->
  <slot data-render-count={renderCounter} name="viewport" />
</div>
