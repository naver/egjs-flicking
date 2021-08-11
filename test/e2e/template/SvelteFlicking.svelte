<script>
import Flicking, { FlickingPanel } from "@egjs/svelte-flicking";

export let options = {};
export let panels = [];
</script>

<Flicking options={options}>
  {#each panels as panel}
    <FlickingPanel class={panel.class}>{panel.text}</FlickingPanel>
  {/each}
</Flicking>
