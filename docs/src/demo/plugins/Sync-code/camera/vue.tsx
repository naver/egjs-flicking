/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <CodeBlock className="html">
{`<template>
  <div class="wrapper">
    <flicking ref="flicking0" :options="{ bound: true, bounce: 30, align: 'prev' }" :plugins="plugins">
      <span className="button mr-2 is-white">🍎 Apple</span>
      <span className="button mr-2 is-white">🍉 Watermelon</span>
      <span className="button mr-2 is-white">🥝 Kiwi</span>
      <span className="button mr-2 is-white">...</span>
    </flicking>
    <flicking ref="flicking1" :options="{ bound: true, bounce: 30, align: 'prev' }">
      <span className="button mr-2 is-white">🍔 Hamburger</span>
      <span className="button mr-2 is-white">🍕 Pizza</span>
      <span className="button mr-2 is-white">🍞 Bread</span>
      <span className="button mr-2 is-white">...</span>
    </flicking>
    <flicking ref="flicking2" :options="{ bound: true, bounce: 30, align: 'prev' }">
      <span className="button mr-2 is-white">🥛 Milk</span>
      <span className="button mr-2 is-white">☕ Coffee</span>
      <span className="button mr-2 is-white">🍵 Green tea</span>
      <span className="button mr-2 is-white">...</span>
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
      type: "camera",
      synchronizedFlickingOptions: [
        {
          flicking: this.$refs.flicking0,
          isClickable: false
        },
        {
          flicking: this.$refs.flicking1,
          isClickable: false
        },
        {
          flicking: this.$refs.flicking2,
          isClickable: false
        }
      ]
    })];
  }
}
</script>`}
</CodeBlock>;
