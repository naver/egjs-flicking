<template>
<div id="sync" class="container">
  <flicking ref="flicking0" class="flicking flicking0" :plugins="plugins">
    <div class="panel0"><div class="anchor"></div></div>
    <div class="panel1"><div class="anchor"></div></div>
    <div class="panel2"><div class="anchor"></div></div>
    <div class="panel3"><div class="anchor"></div></div>
    <div class="panel4"><div class="anchor"></div></div>
  </flicking>
  <flicking ref="flicking1" class="flicking flicking1">
    <div class="panel0"><div class="anchor"></div></div>
    <div class="panel1"><div class="anchor"></div></div>
    <div class="panel2"><div class="anchor"></div></div>
    <div class="panel3"><div class="anchor"></div></div>
    <div class="panel4"><div class="anchor"></div></div>
  </flicking>
  <flicking ref="flicking2" class="flicking flicking2">
    <div class="panel0"><div class="anchor"></div></div>
    <div class="panel1"><div class="anchor"></div></div>
    <div class="panel2"><div class="anchor"></div></div>
    <div class="panel3"><div class="anchor"></div></div>
    <div class="panel4"><div class="anchor"></div></div>
  </flicking>
</div>
</template>
<script lang="ts">
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
          isClickable: true
        },
        {
          flicking: this.$refs.flicking1,
          isClickable: true
        },
        {
          flicking: this.$refs.flicking2,
          isClickable: true
        }
      ]
    })];
  }
}
</script>
