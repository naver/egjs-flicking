<script>
import {
  onMount
} from "svelte";
import Flicking from "../../../packages/svelte-flicking/src/flicking.svelte";
import FlickingPanel from "../../../packages/svelte-flicking/src/flicking-panel.svelte";

export let options = {};
export let panels = [];

onMount(() => {
  console.log("mounted");
});
</script>

<Flicking options={options}>
  {#each panels as panel}
    <FlickingPanel>
      {@html panel}
    </FlickingPanel>
  {/each}
</Flicking>
