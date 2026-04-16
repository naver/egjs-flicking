<script setup>
import Flicking, { useFlickingReactiveAPI } from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];
const LENGTH = COLORS.length;
const flickingRef = ref(null);
const { indexProgress } = useFlickingReactiveAPI(flickingRef);

const getChildProgress = i => ((i - indexProgress.value + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;

const getScale = i => Math.max(0, 0.9 - Math.abs(getChildProgress(i)) * 0.2);
const getRotateY = i => -getChildProgress(i) * 50;
const getOpacity = i => Math.max(0, 1 - Math.abs(getChildProgress(i)) * 0.3);
</script>

<template>
  <Flicking ref="flickingRef" :options="{ circular: true, align: 'center' }">
    <div v-for="(color, i) in COLORS" :key="i"
         class="flicking-panel"
         :style="{
           background: color,
           transform: `rotateY(${getRotateY(i)}deg) scale(${getScale(i)})`,
           opacity: getOpacity(i)
         }">
      {{ i + 1 }}
    </div>
  </Flicking>
</template>
