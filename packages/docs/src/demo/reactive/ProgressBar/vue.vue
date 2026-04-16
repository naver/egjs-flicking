<script setup>
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];

const flickingRef = ref(null);
const { progress } = useFlickingReactiveAPI(flickingRef);
</script>

<template>
  <div style="width: 100%">
    <Flicking
      ref="flickingRef"
      :options="{ moveType: 'freeScroll' }"
    >
      <div
        v-for="index in 5"
        :key="index - 1"
        class="flicking-panel"
        :style="{ backgroundColor: COLORS[(index - 1) % COLORS.length] }"
      >
        {{ index }}
      </div>
    </Flicking>

    <div class="progress-container">
      <div class="progress-track">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-text">
        Progress: {{ progress.toFixed(1) }}%
      </div>
    </div>
  </div>
</template>
