/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <CodeBlock className="language-jsx">
{`<script>
  import { onMount } from "svelte";
  import Flicking, { FlickingPanel } from "@egjs/svelte-flicking";
  import { Sync } from "@egjs/flicking-plugins";
  import "@egjs/svelte-flicking/dist/flicking.css";

  let flicking0;
  let flicking1;
  let flicking2;

  let plugins = [];

  onMount(() => {
    plugins = [new Sync({
      type: "camera",
      synchronizedFlickingOptions: [
        {
          flicking: flicking0.vanillaFlicking,
          isClickable: false
        },
        {
          flicking: flicking1.vanillaFlicking,
          isClickable: false
        },
        {
          flicking: flicking2.vanillaFlicking,
          isClickable: false
        }
      ]
    })];
  });
</script>

<Flicking bind:this={flicking0} class="mb-4"
  options={{ align: "prev", bound: true, bounce: 30 }}
  plugins={plugins}>
  <FlickingPanel class="button mr-2 is-white">🍎 Apple</FlickingPanel>
  <FlickingPanel class="button mr-2 is-white">🍉 Watermelon</FlickingPanel>
  <FlickingPanel class="button mr-2 is-white">🥝 Kiwi</FlickingPanel>
</Flicking>
<Flicking bind:this={flicking1} class="mb-4"
  options={{ align: "prev", bound: true, bounce: 30 }}>
  <FlickingPanel class="button mr-2 is-white">🍔 Hamburger</FlickingPanel>
  <FlickingPanel class="button mr-2 is-white">🍕 Pizza</FlickingPanel>
  <FlickingPanel class="button mr-2 is-white">🍞 Bread</FlickingPanel>
</Flicking>
<Flicking bind:this={flicking2} class="mb-4"
  options={{ align: "prev", bound: true, bounce: 30 }}>
  <FlickingPanel class="button mr-2 is-white">🥛 Milk</FlickingPanel>
  <FlickingPanel class="button mr-2 is-white">☕ Coffee</FlickingPanel>
  <FlickingPanel class="button mr-2 is-white">🍵 Green tea</FlickingPanel>
</Flicking>`}
</CodeBlock>;
