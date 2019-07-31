<template>
  <div id="variable-size" class="container">
    <h1>Multiple Panel &amp; Variable Size</h1>
    <ul class="extra">
      <li>You can place multiple panels in the flicking area.</li>
      <li>You can specify various sizes for each panel.</li>
    </ul>
    <flicking class="flicking flicking0" :options="{ circular: true, gap: 10 }">
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
    </flicking>
    <pre><code class="hljs html" data-script="flicking0">{{ code0 }}</code></pre>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class VariableSize extends Vue {
  code0 = `<flicking class="flicking flicking0" :options="{ circular: true, gap: 10 }">
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
</flicking>`;
}
</script>
<style scoped>
#variable-size .flicking .panel:nth-child(5n + 1) {
  width: 100px;
}
#variable-size .flicking .panel:nth-child(5n + 2) {
  width: 200px;
}
#variable-size .flicking .panel:nth-child(5n + 3) {
  width: 80px;
}
#variable-size .flicking .panel:nth-child(5n + 4) {
  width: 250px;
}
#variable-size .flicking .panel:nth-child(5n + 5) {
  width: 150px;
}
</style>
