<script lang="ts">
  import {
    onDestroy,
    getContext
  } from "svelte";
  import { v4 } from "uuid";

  import PanelManager from "./PanelManager";

  const id = v4();
  const sveltePanels = getContext("panels") as PanelManager;

  let hidden = false;
  let order = Number.MAX_SAFE_INTEGER;
  let element: HTMLElement;

  sveltePanels.add({
    show,
    hide,
    id,
    setOrder(newOrder: number) {
      order = newOrder;
    },
    rendered() {
      return !hidden;
    },
    nativeElement() {
      return element;
    }
  });

  onDestroy(() => {
    sveltePanels.remove(id);
  });

  export function show() {
    hidden = false;
  }

  export function hide() {
    hidden = true;
  }
</script>

{#if !hidden}
  <div bind:this={element} data-key={id} class="flicking-panel" style="order: {order}" {...$$restProps}>
    <slot />
  </div>
{/if}
