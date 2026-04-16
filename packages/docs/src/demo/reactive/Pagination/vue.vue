<script setup>
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];

const flickingRef = ref(null);
const { currentPanelIndex, totalPanelCount, moveTo } = useFlickingReactiveAPI(flickingRef);
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

    <div class="pagination">
      <button
        v-for="i in totalPanelCount"
        :key="i - 1"
        :class="['pagination-btn', { active: currentPanelIndex === i - 1 }]"
        @click="moveTo(i - 1)"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>
