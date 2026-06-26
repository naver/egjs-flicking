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

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { nextTick, ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];
const normalFlicking = ref(null);
const virtualFlicking = ref(null);
const normalDomCount = ref(0);
const virtualDomCount = ref(0);
const normalPanels = Array.from({ length: 100 }, (_, i) => ({
  index: i,
  color: COLORS[i % COLORS.length]
}));
const virtualOptions = {
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
};

const updateDomCounts = () => {
  nextTick(() => {
    if (normalFlicking.value) {
      const panels = normalFlicking.value.$el.querySelectorAll(".flicking-panel");
      normalDomCount.value = panels.length;
    }
    if (virtualFlicking.value) {
      const panels = virtualFlicking.value.$el.querySelectorAll(".flicking-panel");
      virtualDomCount.value = panels.length;
    }
  });
};
</script>
