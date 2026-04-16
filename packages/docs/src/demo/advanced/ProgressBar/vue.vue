<script setup>
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const flickingRef = ref(null);
const { progress } = useFlickingReactiveAPI(flickingRef);
</script>

<template>
  <div>
    <Flicking ref="flickingRef" :options="{ moveType: 'freeScroll', bound: true }">
      <div v-for="(color, i) in COLORS" :key="i"
           class="flicking-panel" :style="{ background: color }">
        {{ i + 1 }}
      </div>
    </Flicking>
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }" />
    </div>
    <div class="progress-text">{{ progress.toFixed(1) }}%</div>
  </div>
</template>
