<template>
  <div id="gap" class="container">
    <h1>Gap</h1>
    <ul class="extra">
      <li>You can specify the interval between the frames.</li>
    </ul>
    <h2>Default</h2>
    <flicking class="flicking flicking0" :options="{ bound: true }">
      <div class="panel0"></div>
      <div class="panel1"></div>
      <div class="panel2"></div>
      <div class="panel3"></div>
      <div class="panel4"></div>
      <div class="panel0"></div>
    </flicking>
    <div class="pagination pagination0"></div>
    <pre><code class="hljs html" data-script="flicking0">{{ code0 }}</code></pre>
    <h2>gap: 20</h2>
    <flicking class="flicking flicking1" :options="{ gap: 20, bound: true }">
      <div class="panel0"></div>
      <div class="panel1"></div>
      <div class="panel2"></div>
      <div class="panel3"></div>
      <div class="panel4"></div>
      <div class="panel0"></div>
    </flicking>
    <div class="pagination pagination1"></div>
    <pre><code class="hljs html" data-script="flicking1">{{ code1 }}</code></pre>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Gap extends Vue {
  public mounted() {
    document.querySelectorAll('.hljs').forEach((block) => {
      (window as any).hljs.highlightBlock(block);
    });
  }

  code0 = `<flicking class="flicking flicking0" :options="{ bound: true }">
  <div class="panel0"></div>
  <div class="panel1"></div>
  <div class="panel2"></div>
  <div class="panel3"></div>
  <div class="panel4"></div>
  <div class="panel0"></div>
</flicking>`;
  code1 = `<flicking class="flicking flicking1" :options="{ gap: 20, bound: true }">
  <div class="panel0"></div>
  <div class="panel1"></div>
  <div class="panel2"></div>
  <div class="panel3"></div>
  <div class="panel4"></div>
  <div class="panel0"></div>
</flicking>`;
}
</script>
<style scoped>
#gap .flicking1 .panel:before {
  position: absolute;
  width: 20px;
  content: "2 0 p x";
  word-break: break-all;
  font-weight: bold;
  color: #333;
  left: 200px;
  top: 50%;
  transform: translateY(-50%);
  line-height: 1.2;
  text-align: center;
}
</style>
