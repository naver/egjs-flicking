<template>
  <div>
    <div class="slider-row">
      <span>Container width</span>
      <input type="range" :min="30" :max="100" v-model.number="width" />
      <span class="value-label">{{ width }}%</span>
    </div>

    <div class="demo-section">
      <div class="demo-label">useResizeObserver: true</div>
      <div :style="{ width: width + '%' }">
        <Flicking
          :key="'a-' + autoResize"
          :options="{ autoResize, useResizeObserver: true }"
          @afterResize="countA++"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="resize-count">Resize count: {{ countA }}</div>
      <div class="resize-count" style="color: #aaa">Responds immediately when width is changed via slider</div>
    </div>

    <div class="demo-section">
      <div class="demo-label">useResizeObserver: false</div>
      <div :style="{ width: width + '%' }">
        <Flicking
          ref="flickB"
          :key="'b-' + autoResize"
          :options="{ autoResize, useResizeObserver: false }"
          @afterResize="countB++"
        >
          <div class="flicking-panel panel-1">1</div>
          <div class="flicking-panel panel-2">2</div>
          <div class="flicking-panel panel-3">3</div>
          <div class="flicking-panel panel-4">4</div>
          <div class="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div class="resize-count">Resize count: {{ countB }}</div>
      <div class="resize-count" style="color: #aaa">Does not detect element size changes (only detects window resize)</div>
      <button v-if="!autoResize" class="button" style="margin-top: 6px"
        @click="flickB?.resize()">
        Manual resize()
      </button>
    </div>

    <div class="toggle-row">
      <button :class="['button', autoResize && 'active']"
        @click="autoResize = !autoResize; countA = 0; countB = 0">
        autoResize: {{ autoResize }}
      </button>
      <span style="font-size: 13px; color: #888">
        {{ autoResize ? 'Auto resize enabled' : 'Auto resize disabled — use the Manual resize() button' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const flickB = ref(null);
const width = ref(100);
const autoResize = ref(true);
const countA = ref(0);
const countB = ref(0);
</script>
