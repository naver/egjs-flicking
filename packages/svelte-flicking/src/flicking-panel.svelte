<script>
  import {
    getContext,
    onDestroy
  } from "svelte";
  import * as uuid from "uuid-browser";

  import { findIndex } from "./utils";

  const id = uuid.v4();
  let hidden = false;
  let element;

  const flickingID = getContext("flickingID");
  const sveltePanels = getContext(`${flickingID}-panels`);
  const pending = getContext(`${flickingID}-pending`);

  pending.push({
    show,
    hide,
    id,
    hidden() {
      return hidden;
    },
    element() {
      return element;
    }
  });

  onDestroy(() => {
    const panelIdx = findIndex(sveltePanels, panel => panel.id === id);

    if (panelIdx >= 0) {
      sveltePanels.splice(panelIdx, 1);
    }
  });

  export function show() {
    hidden = false;
  }

  export function hide() {
    hidden = true;
  }
</script>

{#if !hidden}
  <div bind:this={element} data-key={id} class="flicking-panel" {...$$restProps}>
    <slot />
  </div>
{/if}
