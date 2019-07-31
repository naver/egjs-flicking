<template>
  <div id="free-scroll" class="container">
    <h1>Free Scroll</h1>
    <ul class="extra">
      <li>The panels are freely scrollable.</li>
    </ul>
    <h2>moveType: "freeScroll", deceleration: 0.0075(default)</h2>
    <flicking class="flicking flicking0" :options="{ gap: 10, circular: true, moveType: 'freeScroll' }">
      <div class="panel0"></div>
      <div class="panel1"></div>
      <div class="panel2"></div>
      <div class="panel3"></div>
      <div class="panel4"></div>
    </flicking>
    <pre><code class="hljs html" data-script="flicking0">{{ code0 }}</code></pre>
    <h2>moveType: "freeScroll", deceleration: 0.015</h2>
    <flicking class="flicking flicking1" :options="{ gap: 10, circular: true, deceleration: 0.015, moveType: 'freeScroll' }">
      <div class="panel0"></div>
      <div class="panel1"></div>
      <div class="panel2"></div>
      <div class="panel3"></div>
      <div class="panel4"></div>
    </flicking>
    <pre><code class="hljs html" data-script="flicking1">{{ code1 }}</code></pre>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class FreeScroll extends Vue {
  public mounted() {
    document.querySelectorAll('.hljs').forEach((block) => {
      (window as any).hljs.highlightBlock(block);
    });
  }

  code0 = `<flicking
  class="flicking flicking0"
  :options="{ gap: 10, circular: true, moveType: 'freeScroll' }">
  <div class="panel0"></div>
  <div class="panel1"></div>
  <div class="panel2"></div>
  <div class="panel3"></div>
  <div class="panel4"></div>
</flicking>`;
  code1 = `<flicking
  class="flicking flicking1"
  :options="{ gap: 10, circular: true, deceleration: 0.015, moveType: 'freeScroll' }">
  <div class="panel0"></div>
  <div class="panel1"></div>
  <div class="panel2"></div>
  <div class="panel3"></div>
  <div class="panel4"></div>
</flicking>`;
}
</script>
<style scoped>

</style>
