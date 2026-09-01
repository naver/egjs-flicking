<template>
  <div>
    <div class="demo-hint">
      1. Toggle the container width — the px-positioned carousel gets misaligned, while the %-positioned one keeps its place.<br />
      2. Call resize() to recalculate the internal sizes and fix the misalignment.
    </div>

    <div class="controls">
      <button class="button" @click="toggleWidth">Toggle width</button>
      <button class="button" @click="callResize">Call resize()</button>
      <span class="value-label">width: {{ width }}</span>
    </div>

    <!-- autoResize is disabled to simulate the moment before resize() is applied -->
    <div class="demo-section">
      <div class="demo-label">usePercentagePos: false (default)</div>
      <div :style="{ width }">
        <Flicking
          ref="flickingPx"
          :options="{ usePercentagePos: false, autoResize: false, defaultIndex: 2 }"
          @ready="updateTransformPx"
          @move="updateTransformPx"
          @after-resize="updateTransformPx"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="transform-bar">transform: <span>{{ transformPx }}</span></div>
    </div>

    <div class="demo-section">
      <div class="demo-label">usePercentagePos: true</div>
      <div :style="{ width }">
        <Flicking
          ref="flickingPercent"
          :options="{ usePercentagePos: true, autoResize: false, defaultIndex: 2 }"
          @ready="updateTransformPercent"
          @move="updateTransformPercent"
          @after-resize="updateTransformPercent"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="transform-bar">transform: <span>{{ transformPercent }}</span></div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const width = ref("100%");
const transformPx = ref("");
const transformPercent = ref("");
const flickingPx = ref(null);
const flickingPercent = ref(null);

const updateTransformPx = e => {
  transformPx.value = e.currentTarget.camera.element.style.transform;
};
const updateTransformPercent = e => {
  transformPercent.value = e.currentTarget.camera.element.style.transform;
};

const toggleWidth = () => {
  width.value = width.value === "100%" ? "60%" : "100%";
};

const callResize = () => {
  flickingPx.value.resize();
  flickingPercent.value.resize();
};
</script>
