<script setup>
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const flickingRef = ref(null);
const { currentPanelIndex, totalPanelCount, isReachStart, isReachEnd, moveTo } = useFlickingReactiveAPI(flickingRef);
</script>

<template>
  <div>
    <Flicking ref="flickingRef" :options="{ align: 'center' }">
      <div v-for="(color, i) in COLORS" :key="i"
           class="flicking-panel" :style="{ background: color }">
        {{ i + 1 }}
      </div>
    </Flicking>
    <div class="nav-controls">
      <button class="nav-btn" :disabled="isReachStart"
              @click="moveTo(currentPanelIndex - 1)">← Prev</button>
      <span class="nav-info">{{ currentPanelIndex + 1 }} / {{ totalPanelCount }}</span>
      <button class="nav-btn" :disabled="isReachEnd"
              @click="moveTo(currentPanelIndex + 1)">Next →</button>
    </div>
  </div>
</template>
