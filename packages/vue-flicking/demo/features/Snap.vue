<template>
  <div id="snap" class="container">
    <h1>Snap</h1>
    <ul class="extra">
      <li>You can decide how many panels can be passed on a single snap.</li>
    </ul>
    <h2>Default (count: 1)</h2>
    <flicking class="flicking flicking0" :options="{ gap: 10, circular: true }">
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
    </flicking>
    <div class="pagination pagination0"></div>
    <pre><code class="hljs html" data-script="flicking0">{{ code0 }}</code></pre>
    <h2>count: 3</h2>
    <flicking class="flicking flicking1" :options="{ gap: 10, circular: true, moveType: { type: 'snap', count: 3 } }">
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
    </flicking>
    <div class="pagination pagination1"></div>
    <pre><code class="hljs html" data-script="flicking1">{{ code1 }}</code></pre>
    <h2>count: Infinity</h2>
    <flicking class="flicking flicking2" :options="{ gap: 10, circular: true, moveType: { type: 'snap', count: Infinity } }">
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
    </flicking>
    <div class="pagination pagination2"></div>
    <pre><code class="hljs html" data-script="flicking2">{{ code2 }}</code></pre>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Snap extends Vue {
  public mounted() {
    document.querySelectorAll('.hljs').forEach((block) => {
      (window as any).hljs.highlightBlock(block);
    });
  }

  code0 = `<flicking class="flicking flicking0"
  :options="{ gap: 10, circular: true }">
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
</flicking>`;
  code1 = `<flicking class="flicking flicking1"
  :options="{ gap: 10, circular: true, moveType: { type: 'snap', count: 3 } }">
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
</flicking>`;
  code2 = `<flicking class="flicking flicking2"
  :options="{ gap: 10, circular: true, moveType: { type: 'snap', count: Infinity } }">
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
</flicking>`;
}
</script>
<style scoped>

</style>
