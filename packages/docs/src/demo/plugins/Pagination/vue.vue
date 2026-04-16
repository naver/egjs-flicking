<template>
  <Flicking :options="{ circular: true }" :plugins="plugins">
    <div v-for="(color, i) in COLORS" :key="i"
         class="flicking-panel"
         :style="{ background: color }">
      {{ i + 1 }}
    </div>
    <template #viewport>
      <div class="flicking-pagination"></div>
    </template>
  </Flicking>
</template>

<script setup>
import { Pagination } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const plugins = [new Pagination({ type: "bullet" })];
</script>
