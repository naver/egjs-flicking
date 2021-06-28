<template>
<div id="arrow" class="container">
  <flicking class="flicking flicking0" :plugins="plugins">
    <div class="panel0"><div class="anchor"></div></div>
    <div class="panel1"><div class="anchor"></div></div>
    <div class="panel2"><div class="anchor"></div></div>
    <div class="panel3"><div class="anchor"></div></div>
    <div class="panel4"><div class="anchor"></div></div>
    <span slot="viewport" class="flicking-arrow-prev"></span>
    <span slot="viewport" class="flicking-arrow-next"></span>
  </flicking>
</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Arrow } from "@egjs/flicking-plugins";

@Component({})
export default class ArrowDemo extends Vue {
  plugins = [new Arrow()];
}
</script>
<style scoped>

</style>
