<template>
  <div>
    <!-- Virtual mode: 1000 panels -->
    <div class="demo-container">
      <div class="demo-label">virtual enabled (1000 panels)</div>
      <div class="demo-info">Only panelsPerView + 1 DOM elements are maintained</div>
      <Flicking
        ref="virtualFlicking"
        :options="virtualOptions"
        @move="updateDomCounts"
        @ready="updateDomCounts"
      />
      <div class="dom-counter">
        Total <strong>1000</strong> panels, DOM elements: <strong>{{ virtualDomCount }}</strong>
      </div>
    </div>

    <!-- Normal mode: 100 panels (for comparison) -->
    <div class="demo-container">
      <div class="demo-label">virtual disabled (100 panels - for comparison)</div>
      <div class="demo-info">All panels exist in the DOM</div>
      <Flicking
        ref="normalFlicking"
        :options="{ align: 'prev' }"
        @ready="updateDomCounts"
      >
        <div
          v-for="panel in normalPanels"
          :key="panel.index"
          class="flicking-panel"
          :style="{ background: panel.color }"
        >
          Panel {{ panel.index + 1 }}
        </div>
      </Flicking>
      <div class="dom-counter">
        Total <strong>{{ normalPanels.length }}</strong> panels = DOM elements: <strong>{{ normalDomCount }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

export default {
  components: { Flicking },
  data() {
    return {
      normalDomCount: 0,
      virtualDomCount: 0,
      normalPanels: Array.from({ length: 100 }, (_, i) => ({
        index: i,
        color: COLORS[i % COLORS.length]
      })),
      virtualOptions: {
        align: "prev",
        panelsPerView: 3,
        virtual: {
          renderPanel: (panel, index) => {
            return `<div class="panel-inner color-${index % 7}">Panel ${index + 1}</div>`;
          },
          initialPanelCount: 1000,
          cache: true,
          panelClass: "flicking-panel"
        }
      }
    };
  },
  methods: {
    updateDomCounts() {
      this.$nextTick(() => {
        if (this.$refs.normalFlicking) {
          const panels = this.$refs.normalFlicking.$el.querySelectorAll(".flicking-panel");
          this.normalDomCount = panels.length;
        }
        if (this.$refs.virtualFlicking) {
          const panels = this.$refs.virtualFlicking.$el.querySelectorAll(".flicking-panel");
          this.virtualDomCount = panels.length;
        }
      });
    }
  }
};
</script>
