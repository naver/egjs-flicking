<script lang="ts">
  import { Arrow } from "@egjs/flicking-plugins";
  import Flicking from "../src/Flicking";
  import "@egjs/flicking/dist/flicking.css";
  import "@egjs/flicking-plugins/dist/flicking-plugins.css";
  import FlickingPanel from "../src/flicking-panel.svelte";
  import Test from "./Test.svelte";
  import Test2 from "./Test2.svelte";

  let flick: Flicking;
  let panels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let list0 = [0, 1, 2];
  const plugins = [new Arrow()];

  function prepend() {
    panels = [panels[0] - 2, panels[0] - 1, ...panels];
  }

  function append() {
    const lastEl = panels[panels.length - 1];
    panels = [...panels, lastEl + 1, lastEl + 2];
  }

  function prev() {
    flick.prev();
  }

  function next() {
    flick.next();
  }
</script>

<div class="container">
  <h1>Default Rendering</h1>
  <Flicking hideBeforeInit={true}>
    <FlickingPanel><div class="panel">0</div></FlickingPanel>
    <FlickingPanel><div class="panel">1</div></FlickingPanel>
    <FlickingPanel><div class="panel">2</div></FlickingPanel>
  </Flicking>
  <h1>Bound</h1>
  <Flicking options={{ bound: true }}>
    <FlickingPanel><div class="panel">0</div></FlickingPanel>
    <FlickingPanel><div class="panel">1</div></FlickingPanel>
    <FlickingPanel><div class="panel">2</div></FlickingPanel>
    <FlickingPanel><div class="panel">3</div></FlickingPanel>
    <FlickingPanel><div class="panel">4</div></FlickingPanel>
    <FlickingPanel><div class="panel">5</div></FlickingPanel>
    <FlickingPanel><div class="panel">6</div></FlickingPanel>
  </Flicking>
  <h1>FreeScroll</h1>
  <Flicking options={{ moveType: "freeScroll", align: "center" }} firstPanelSize={"200px"}>
    <FlickingPanel><div class="panel">0</div></FlickingPanel>
    <FlickingPanel><div class="panel">1</div></FlickingPanel>
    <FlickingPanel><div class="panel">2</div></FlickingPanel>
  </Flicking>
  <h1>List Rendering</h1>
  <Flicking>
    {#each list0 as item}
      <FlickingPanel><Test /></FlickingPanel>
    {/each}
  </Flicking>
  <h1>Adding panels</h1>
  <Flicking options={{ circular: true, renderOnlyVisible: true }}>
    {#each panels as panel, idx (panel)}
      <FlickingPanel><div class={`panel panel${panel % 5}`}>{ panel }</div></FlickingPanel>
    {/each}
  </Flicking>
  <div>
    <span class="button" on:click={() => {
      prepend();
    }}>Prepend</span>
    <span class="button" on:click={() => {
      append();
    }}>Append</span>
  </div>
  <h1>Method call</h1>
  <Flicking bind:this={flick}>
    <FlickingPanel><div class="panel">0</div></FlickingPanel>
    <FlickingPanel><div class="panel">1</div></FlickingPanel>
    <FlickingPanel><div class="panel">2</div></FlickingPanel>
  </Flicking>
  <div>
    <span class="button" on:click={() => {
      prev();
    }}>Prev</span>
    <span class="button" on:click={() => {
      next();
    }}>Next</span>
  </div>
  <Flicking plugins={plugins}>
    <FlickingPanel><div class="panel">0</div></FlickingPanel>
    <FlickingPanel><div class="panel">1</div></FlickingPanel>
    <FlickingPanel><div class="panel">2</div></FlickingPanel>
    <FlickingPanel><div class="panel">3</div></FlickingPanel>
    <FlickingPanel><div class="panel">4</div></FlickingPanel>
    <svelte:fragment slot="viewport">
      <span class="flicking-arrow-prev"></span>
      <span class="flicking-arrow-next"></span>
    </svelte:fragment>
  </Flicking>
</div>

<style>
  :global(.panel) {
    display: flex;
    width: 200px;
    height: 200px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }

  :global(.panel0) {
    background-color: red;
  }
  :global(.panel1) {
    background-color: blue;
  }
  :global(.panel2) {
    background-color: green;
  }
  :global(.panel3) {
    background-color: violet;
  }
</style>
