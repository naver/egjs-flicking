/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <CodeBlock className="language-html">
{`<template>
  <div class="wrapper">
    <flicking ref="flicking0" :options="{ bounce: 30 }" :plugins="plugins">
      <div class="flicking-panel full has-background-primary">
        <img class="panel-image" src="/img/demo/bg01.jpg" />
      </div>
      <div class="flicking-panel full has-background-primary">
        <img class="panel-image" src="/img/demo/bg02.jpg" />
      </div>
      <div class="flicking-panel full has-background-primary">
        <img class="panel-image" src="/img/demo/bg03.jpg" />
      </div>
      <div class="flicking-panel full has-background-primary">
        <img class="panel-image" src="/img/demo/bg04.jpg" />
      </div>
      <div class="flicking-panel full has-background-primary">
        <img class="panel-image" src="/img/demo/bg05.jpg" />
      </div>
      <div class="flicking-panel full has-background-primary">
        <img class="panel-image" src="/img/demo/bg06.jpg" />
      </div>
    </flicking>
    <flicking ref="flicking1" :options="{ bound: true, bounce: 30, moveType: 'freeScroll' }">
      <div class="flicking-panel thumb has-background-primary">
        <img class="thumb-image" src="/img/demo/bg01.jpg" />
      </div>
      <div class="flicking-panel thumb has-background-primary">
        <img class="thumb-image" src="/img/demo/bg02.jpg" />
      </div>
      <div class="flicking-panel thumb has-background-primary">
        <img class="thumb-image" src="/img/demo/bg03.jpg" />
      </div>
      <div class="flicking-panel thumb has-background-primary">
        <img class="thumb-image" src="/img/demo/bg04.jpg" />
      </div>
      <div class="flicking-panel thumb has-background-primary">
        <img class="thumb-image" src="/img/demo/bg05.jpg" />
      </div>
      <div class="flicking-panel thumb has-background-primary">
        <img class="thumb-image" src="/img/demo/bg06.jpg" />
      </div>
    </flicking>
  </div>
</template>
<script>
import { Sync } from "@egjs/flicking-plugins";

export default {
  data() {
    return {
      plugins: []
    }
  },
  mounted() {
    this.plugins = [new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        {
          flicking: this.$refs.flicking0,
          isSlidable: true
        },
        {
          flicking: this.$refs.flicking1,
          isClickable: true,
          activeClass: "active"
        }
      ]
    })];
  }
}
</script>`}
</CodeBlock>;
