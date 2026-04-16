<script setup>
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const OFFSETS = [180, 160, 140, 120, 100];
const SIZES = ["size4", "size1", "size3", "size2", "size3"];

const flickingRef = ref(null);
const { indexProgress } = useFlickingReactiveAPI(flickingRef);

const getBarStyle = (panelIndex, barIndex) => {
  const childProgress = panelIndex - indexProgress.value;
  const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);
  return {
    transform: `translateX(${childProgress * OFFSETS[barIndex]}px)`,
    opacity
  };
};
</script>

<template>
  <Flicking ref="flickingRef">
    <div v-for="panelIndex in 5" :key="panelIndex - 1" class="skeleton-panel">
      <span
        v-for="(size, i) in SIZES"
        :key="i"
        :class="'skeleton-bar skeleton-bar-' + size"
        :style="getBarStyle(panelIndex - 1, i)"
      />
    </div>
  </Flicking>
</template>
