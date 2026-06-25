<template>
  <div>
    <!-- renderOnlyVisible: true -->
    <div class="demo-container">
      <div class="demo-label">renderOnlyVisible: true</div>
      <div class="demo-info">Non-visible panels are removed from the DOM. Try scrolling.</div>
      <Flicking
        ref="visibleFlicking"
        :options="{ align: 'prev', renderOnlyVisible: true }"
        @ready="updateCounts"
        @visible-change="updateCounts"
      >
        <div
          v-for="i in 20"
          :key="'v-' + i"
          class="flicking-panel"
          :style="{ background: COLORS[(i - 1) % COLORS.length] }"
        >
          Panel {{ i }}
        </div>
      </Flicking>
      <div class="dom-counter">
        DOM panel count: <strong>{{ visibleDomCount }}</strong> / 20 panels
      </div>
    </div>

    <!-- renderOnlyVisible: false -->
    <div class="demo-container">
      <div class="demo-label">renderOnlyVisible: false (default)</div>
      <div class="demo-info">All panels are always present in the DOM.</div>
      <Flicking
        ref="normalFlicking"
        :options="{ align: 'prev' }"
        @ready="updateCounts"
      >
        <div
          v-for="i in 20"
          :key="'n-' + i"
          class="flicking-panel"
          :style="{ background: COLORS[(i - 1) % COLORS.length] }"
        >
          Panel {{ i }}
        </div>
      </Flicking>
      <div class="dom-counter">
        DOM panel count: <strong>{{ normalDomCount }}</strong> / 20 panels
      </div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { nextTick, ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];
const visibleFlicking = ref(null);
const normalFlicking = ref(null);
const visibleDomCount = ref(0);
const normalDomCount = ref(0);

const updateCounts = () => {
  nextTick(() => {
    if (visibleFlicking.value) {
      const el = visibleFlicking.value.$el;
      const camera = el.querySelector(".flicking-camera");
      if (camera) visibleDomCount.value = camera.children.length;
    }
    if (normalFlicking.value) {
      const el = normalFlicking.value.$el;
      const camera = el.querySelector(".flicking-camera");
      if (camera) normalDomCount.value = camera.children.length;
    }
  });
};
</script>
