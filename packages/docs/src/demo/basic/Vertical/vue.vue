<template>
  <div>
    <div class="demo-container">
      <div class="demo-label">horizontal: true (default)</div>
      <Flicking :options="{ horizontal: true, align: 'prev', bound: true }">
        <div
          v-for="(color, i) in colors"
          :key="'h-' + i"
          class="flicking-panel"
          :style="{ background: color }"
        >
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>

    <div class="demo-container">
      <div class="demo-label">horizontal: false (vertical)</div>
      <Flicking :options="{ horizontal: false, align: 'prev', bound: true }">
        <div
          v-for="(color, i) in colors"
          :key="'v-' + i"
          class="flicking-panel"
          :style="{ background: color }"
        >
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const colors = ref(["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"]);
</script>
