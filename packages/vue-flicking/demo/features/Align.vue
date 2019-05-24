<template>
  <div id="align" class="container" v-highlight>
    <h1>Flexible Align</h1>
      <ul class="extra">
        <li>Use Hanger and Anchor to provide customizable alignment.</li>
        <li>The Hanger and Anchor have magnetically bonded effect which allows the panel position to be aligned</li>
        <li><strong>Hanger:</strong> An alignment point within flicking area. It hangs panel anchors to its position.</li>
        <li><strong>Anchor:</strong> Alignment points based on each panels. Panel's anchor position is determined by this value. <br /> It will be used for a reference point where panel should stop when selected, interacting with hanger position.</li>
      </ul>
    <h2>Center Align (Default)</h2>
    <h3>hanger: 50%, anchor: 50%</h3>
    <div class="hanger flicking0"></div>
    <flicking class="flicking flicking0">
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
    </flicking>
    <pre><code class="hljs html" data-script="flicking0">{{ code0 }}</code></pre>

    <h2>Left Align</h2>
    <h2>hanger: 0, anchor: 0</h2>
    <div class="hanger hanger1"></div>
    <flicking class="flicking flicking1" :options="{ hanger: 0, anchor: 0 }">
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
    </flicking>
    <div class="pagination pagination1"></div>
    <pre><code class="hljs html" data-script="flicking1">{{ code1 }}</code></pre>

    <h2>Custom Align</h2>
    <h3>hanger: 30%, anchor: 50px</h3>
    <div class="hanger hanger2"></div>
    <flicking class="flicking flicking2" :options="{ hanger: '30%', anchor: '50px' }">
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
      <div class="panel"><div class="anchor"></div></div>
    </flicking>
    <div class="pagination pagination2"></div>
    <pre><code class="hljs html" data-script="flicking2">{{ code2 }}</code></pre>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Align extends Vue {
  code0 = `<flicking class="flicking flicking0">
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
</flicking>`;
  code1 = `<flicking class="flicking flicking1" :options="{ hanger: 0, anchor: 0 }">
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
</flicking>`;
  code2 = `<flicking class="flicking flicking2" :options="{ hanger: '30%', anchor: '50px' }">
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
  <div class="panel"><div class="anchor"></div></div>
</flicking>`;
}
</script>
<style scoped>
  #align .hanger {
    position: relative;
    max-width: 500px;
    width: 100%;
    margin: 10px auto;
    height: 20px;
    z-index: 2002;
    top: 10px;
  }
  #align .hanger:after {
    position: absolute;
    content: "hanger: 50%";
    font-weight: bold;
    left: 50%;
    transform: translate(-50%);
  }
  #align .hanger:before {
    position: absolute;
    content: "";
    font-weight: bold;
    top: 100%;
    left: 50%;
    background: #333;
    width: 2px;
    height: 25px;
  }

  #align .anchor {
    position: absolute;
    font-weight: bold;
    bottom: 5px;
    left: 50%;
    background: #333;
    width: 2px;
    height: 25px;
    z-index: 10;
  }
  #align .anchor:after {
    position: absolute;
    content: "anchor: 50%";
    font-weight: bold;
    left: -40px;
    white-space: nowrap;
    bottom: 100%;
  }

  #align .hanger1:after {
    content: "hanger: 0";
    left: 0;
  }
  #align .hanger1:before {
    left: 0;
  }
  #align .flicking1 .anchor {
    left: 0;
  }
  #align .flicking1 .anchor:after {
    content: "anchor: 0";
    left: 0;
  }

  #align .hanger2:after {
    content: "hanger: 30%";
    left: 30%;
  }
  #align .hanger2:before {
    left: 30%;
  }
  #align .flicking2 .anchor {
    left: 50px;
  }
  #align .flicking2 .anchor:after {
    content: "anchor: 50px";
    left: -20px;
  }
  #align .extra li:first-child {
    margin-left: -20px;
    list-style: none;
  }
</style>
