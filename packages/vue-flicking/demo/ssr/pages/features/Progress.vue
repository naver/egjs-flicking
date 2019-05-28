<template>
  <div id="progress" class="container" v-highlight>
    <h1>e.progress</h1>
    <ul class="extra">
      <li>Indicates the overall progress of the flicking.</li>
    </ul>
    <flicking class="flicking flicking0"
      :options="{
        gap: 10,
        circular: true,
        moveType: { type: 'snap', count: 5 },
      }"
      @move="e => {
        this.$refs.thumb.style.width = (e.progress * 100) + '%';
      }">
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
    </flicking>
    <div class="progress">
      <div class="thumb" ref="thumb"></div>
    </div>
    <pre><code class="hljs html" data-script="flicking0">{{ code0 }}</code></pre>
    <h1>panel.getProgress()</h1>
    <ul class="extra">
    <li>Indicates the progress of the relative index of each panel.</li>
    </ul>
    <flicking class="flicking flicking1"
      :option="{
        gap: 10,
        circular: true,
        moveType: { type: 'snap', count: 5 },
      }"
      @move="e => {
        e.currentTarget.getAllPanels(true).forEach(panel => {
          panel.getElement().innerHTML = panel.getProgress().toFixed(2);
        });
      }"
      ref="flick1">
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
    </flicking>
    <div class="pagination pagination1"></div>
    <pre><code class="hljs html" data-script="flicking1">{{ code1 }}</code></pre>

    <h1>panel.getOutsetProgress()</h1>
    <ul class="extra">
    <li>When panel is completely invisible, outsetProgress becomes -1 at left(up), 1 at right(down) direction, and 0 when panel's anchor and hanger is overlapped.</li>
    </ul>
    <flicking class="flicking flicking2"
      :options="{
        gap: 10,
        circular: true,
        moveType: { type: 'snap', count: 5 }
      }"
      @move="e => {
        const flicking = e.currentTarget;

        flicking.getAllPanels(true).forEach(panel => {
          panel.getElement().innerHTML = panel.getOutsetProgress().toFixed(2);
        });
      }"
      ref="flick2">
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
    </flicking>
    <div class="pagination pagination2"></div>
    <pre><code class="hljs html" data-script="flicking2">{{ code2 }}</code></pre>

    <h1>panel.getVisibleRatio()</h1>
    <ul class="extra">
    <li>Indicates the percentage of areas within the viewport that the panel occupies.</li>
    </ul>
    <flicking class="flicking flicking3"
      :options="{
        gap: 10,
        circular: true,
        moveType: { type: 'snap', count: 5}
      }"
      @move="e => {
        const flicking = e.currentTarget;

        flicking.getAllPanels(true).forEach(panel => {
          panel.getElement().innerHTML = panel.getVisibleRatio().toFixed(2);
        });
      }"
      ref="flick3">
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
      <div class="panel"></div>
    </flicking>
    <div class="pagination pagination3"></div>
    <pre><code class="hljs html" data-script="flicking3">{{ code3 }}</code></pre>
  </div >
</template>
<script lang="ts">
import { Flicking } from "../../src/index";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Progress extends Vue {
  code0 = `<flicking class="flicking flicking0"
  :options="{
    gap: 10,
    circular: true,
    moveType: { type: 'snap', count: 5 },
  }"
  @move="e => {
    this.$refs.thumb.style.width = (e.progress * 100) + '%';
  }">
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
</flicking>`;
  code1 = `<flicking class="flicking flicking1"
  :option="{
    gap: 10,
    circular: true,
    moveType: { type: 'snap', count: 5 },
  }"
  @move="e => {
    e.currentTarget.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getProgress().toFixed(2);
    });
  }">
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
</flicking>`;
  code2 = `<flicking class="flicking flicking2"
  :options="{
    gap: 10,
    circular: true,
    moveType: { type: 'snap', count: 5 }
  }"
  @move="e => {
    const flicking = e.currentTarget;

    flicking.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getOutsetProgress().toFixed(2);
    });
  }">
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
</flicking>`;
  code3 = `<flicking class="flicking flicking3"
  :options="{
    gap: 10,
    circular: true,
    moveType: { type: 'snap', count: 5}
  }"
  @move="e => {
    const flicking = e.currentTarget;

    flicking.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getVisibleRatio().toFixed(2);
    });
  }">
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
  <div class="panel"></div>
</flicking>`;

  mounted() {
    this.$nextTick(() => {
      (this.$refs.flick1 as Flicking).getAllPanels(true).forEach(panel => {
        panel.getElement().innerHTML = panel.getProgress().toFixed(2);
      });
      (this.$refs.flick2 as Flicking).getAllPanels(true).forEach(panel => {
        panel.getElement().innerHTML = panel.getOutsetProgress().toFixed(2);
      });
      (this.$refs.flick3 as Flicking).getAllPanels(true).forEach(panel => {
        panel.getElement().innerHTML = panel.getVisibleRatio().toFixed(2);
      });
    });
  }
}
</script>
<style scoped>
  #progress .progress {
    position: relative;
    width: 400px;
    height: 10px;
    border-radius: 5px;
    background: #eee;
    margin: 10px auto;
    overflow: hidden;
  }
  #progress .thumb {
    position: relative;
    height: 100%;
    width: 0;
    border-radius: inherit;
    background: #ccc;
  }
</style>
