<template>
  <div>
    <div class="demo-container">
      <div class="demo-label">resizeOnContentsReady: true</div>
      <div class="demo-info">Auto-recalculates panel size & position after image load → correct scrolling</div>
      <Flicking
        ref="autoFlicking"
        :options="{ align: 'prev', resizeOnContentsReady: true, preventDefaultOnDrag: true, bound: true }"
        @ready="updateSizes"
      >
        <div v-for="(src, i) in images" :key="'auto-' + i" class="flicking-panel">
          <img :src="src" :alt="'Panel ' + (i + 1)" @load="updateSizes" />
          <div class="panel-label">Panel {{ i + 1 }}</div>
        </div>
      </Flicking>
      <div class="status-display">
        Flicking internal panel widths: <strong>[{{ autoSizes }}]</strong>
      </div>
    </div>

    <div class="demo-container">
      <div class="demo-label">resizeOnContentsReady: false (default)</div>
      <div class="demo-info">Panel sizes not recalculated → size mismatch, incorrect scroll position</div>
      <Flicking
        ref="manualFlicking"
        :options="{ align: 'prev', resizeOnContentsReady: false, preventDefaultOnDrag: true, bound: true }"
        @ready="updateSizes"
      >
        <div v-for="(src, i) in images" :key="'manual-' + i" class="flicking-panel">
          <img :src="src" :alt="'Panel ' + (i + 1)" @load="updateSizes" />
          <div class="panel-label">Panel {{ i + 1 }}</div>
        </div>
      </Flicking>
      <div class="status-display">
        Flicking internal panel widths: <strong>[{{ manualSizes }}]</strong>
      </div>
    </div>

    <div class="controls">
      <button class="button" @click="moveToPanel(0)">Panel 1</button>
      <button class="button" @click="moveToPanel(1)">Panel 2</button>
      <button class="button" @click="moveToPanel(2)">Panel 3</button>
      <button class="button" @click="moveToPanel(3)">Panel 4</button>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const t = Date.now();

export default {
  components: { Flicking },
  data() {
    return {
      images: [
        `https://picsum.photos/300/150?t=${t}&r=1`,
        `https://picsum.photos/200/150?t=${t}&r=2`,
        `https://picsum.photos/400/150?t=${t}&r=3`,
        `https://picsum.photos/250/150?t=${t}&r=4`
      ],
      autoSizes: "-",
      manualSizes: "-"
    };
  },
  methods: {
    updateSizes() {
      setTimeout(() => {
        try {
          if (this.$refs.autoFlicking) {
            this.autoSizes = this.$refs.autoFlicking.panels.map(p => Math.round(p.size)).join(", ");
          }
          if (this.$refs.manualFlicking) {
            this.manualSizes = this.$refs.manualFlicking.panels.map(p => Math.round(p.size)).join(", ");
          }
        } catch (e) {
          /* ignore */
        }
      }, 500);
    },
    moveToPanel(index) {
      if (this.$refs.autoFlicking) this.$refs.autoFlicking.moveTo(index, 500).catch(() => {});
      if (this.$refs.manualFlicking) this.$refs.manualFlicking.moveTo(index, 500).catch(() => {});
    }
  }
};
</script>
