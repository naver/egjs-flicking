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

  let plugins = [];

  onMount(() => {
    plugins = [new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        {
          flicking: flicking0.vanillaFlicking,
          isSlidable: true
        },
        {
          flicking: flicking1.vanillaFlicking,
          isClickable: true,
          activeClass: "active"
        }
      ]
    })];
  });
</script>

<Flicking bind:this={flicking0} class="mb-4"
  options={{ bounce: 30 }}
  plugins={plugins}>
  <FlickingPanel class="flicking-panel full has-background-primary">
    <img class="panel-image" src="/img/demo/bg01.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel full has-background-primary">
    <img class="panel-image" src="/img/demo/bg02.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel full has-background-primary">
    <img class="panel-image" src="/img/demo/bg03.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel full has-background-primary">
    <img class="panel-image" src="/img/demo/bg04.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel full has-background-primary">
    <img class="panel-image" src="/img/demo/bg05.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel full has-background-primary">
    <img class="panel-image" src="/img/demo/bg06.jpg" />
  </FlickingPanel>
</Flicking>
<Flicking bind:this={flicking1}
  options={{ moveType: "freeScroll", bound: true, bounce: 30 }}>
  <FlickingPanel class="flicking-panel thumb has-background-primary">
    <img class="thumb-image" src="/img/demo/bg01.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel thumb has-background-primary">
    <img class="thumb-image" src="/img/demo/bg02.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel thumb has-background-primary">
    <img class="thumb-image" src="/img/demo/bg03.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel thumb has-background-primary">
    <img class="thumb-image" src="/img/demo/bg04.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel thumb has-background-primary">
    <img class="thumb-image" src="/img/demo/bg05.jpg" />
  </FlickingPanel>
  <FlickingPanel class="flicking-panel thumb has-background-primary">
    <img class="thumb-image" src="/img/demo/bg06.jpg" />
  </FlickingPanel>
</Flicking>`}
</CodeBlock>;
