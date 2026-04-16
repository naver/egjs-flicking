<script setup>
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];
const LENGTH = 5;

const flickingRef = ref(null);
const { indexProgress } = useFlickingReactiveAPI(flickingRef);

const getStyle = index => {
  const childProgress = ((index - indexProgress.value + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;
  const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);

  return {
    backgroundColor: COLORS[index % COLORS.length],
    transformOrigin: `${50 - childProgress * 50}% 50%`,
    transform: `rotateY(${-childProgress * 50}deg) scale(${scale})`
  };
};
</script>

<template>
  <Flicking
    ref="flickingRef"
    :options="{ circular: true, align: 'center' }"
    class="flicking-coverflow"
  >
    <div
      v-for="index in 5"
      :key="index - 1"
      class="flicking-panel"
      :style="getStyle(index - 1)"
    >
      {{ index }}
    </div>
  </Flicking>
</template>
