<template>
  <div>
    <div class="demo-hint">
      Change the width using the slider and compare the resize call frequency between the two carousels.
    </div>

    <div class="slider-row">
      <span>Container width</span>
      <input type="range" :min="30" :max="100" v-model.number="width" />
      <span class="value-label">{{ width }}%</span>
    </div>

    <!-- debounce: 0 -->
    <div class="demo-section">
      <div class="demo-label">resizeDebounce: 0 (default)</div>
      <div :style="{ width: width + '%' }">
        <Flicking
          :options="{ resizeDebounce: 0, maxResizeDebounce: 100 }"
          @afterResize="addLogA"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="log-header">
        <span>Resize log</span>
        <span class="count-badge">{{ logsA.length }}x</span>
      </div>
      <div class="log-area">
        <template v-if="logsA.length === 0">
          Move the slider to see resize logs...
        </template>
        <div v-for="(log, i) in logsA" :key="i">{{ log }}</div>
      </div>
    </div>

    <!-- debounce: 300ms -->
    <div class="demo-section">
      <div class="demo-label">resizeDebounce: 300ms / maxResizeDebounce: 800ms</div>
      <div :style="{ width: width + '%' }">
        <Flicking
          :options="{ resizeDebounce: 300, maxResizeDebounce: 800 }"
          @afterResize="addLogB"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="log-header">
        <span>Resize log</span>
        <span class="count-badge">{{ logsB.length }}x</span>
      </div>
      <div class="log-area">
        <template v-if="logsB.length === 0">
          Move the slider to see resize logs...
        </template>
        <div v-for="(log, i) in logsB" :key="i">{{ log }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

function formatTime() {
  return new Date().toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3
  });
}

export default {
  components: { Flicking },
  data() {
    return { width: 100, logsA: [], logsB: [] };
  },
  methods: {
    addLogA() {
      this.logsA = [`[${formatTime()}] resize()`, ...this.logsA].slice(0, 30);
    },
    addLogB() {
      this.logsB = [`[${formatTime()}] resize()`, ...this.logsB].slice(0, 30);
    }
  }
};
</script>
