<script setup>
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];

const flickingRef = ref(null);
const { currentPanelIndex, isReachStart, isReachEnd, moveTo } = useFlickingReactiveAPI(flickingRef);

const handlePrev = () => {
  if (!isReachStart.value) {
    moveTo(currentPanelIndex.value - 1);
  }
};

const handleNext = () => {
  if (!isReachEnd.value) {
    moveTo(currentPanelIndex.value + 1);
  }
};
</script>

<template>
  <div>
    <Flicking ref="flickingRef">
      <div
        v-for="index in 5"
        :key="index - 1"
        class="flicking-panel"
        :style="{ backgroundColor: COLORS[(index - 1) % COLORS.length] }"
      >
        {{ index }}
      </div>
    </Flicking>

    <div class="controls">
      <button
        class="nav-btn"
        :disabled="isReachStart"
        @click="handlePrev"
      >
        Prev
      </button>
      <button
        class="nav-btn"
        :disabled="isReachEnd"
        @click="handleNext"
      >
        Next
      </button>
    </div>
  </div>
</template>
