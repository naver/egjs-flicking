<template>
  <div>
    <div class="demo-section">
      <div class="demo-label">
        circular + panelsPerView: 3 + align: "prev"
      </div>
      <Flicking :options="{ circular: true, panelsPerView: 3, align: 'prev' }">
        <div v-for="(color, i) in COLORS" :key="i"
             class="flicking-panel" :style="{ background: color }">
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>

    <div class="demo-section">
      <div class="demo-label">
        circular + panelsPerView: 1 + align: "center"
      </div>
      <Flicking :options="{ circular: true, panelsPerView: 1, align: 'center' }">
        <div v-for="(color, i) in COLORS" :key="'b' + i"
             class="flicking-panel" :style="{ background: color }">
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>

    <div class="demo-section">
      <div class="demo-label">
        circular: false + panelsPerView: 3 (bounded slider)
      </div>
      <Flicking :options="{ circular: false, panelsPerView: 3, align: 'prev', bound: true }">
        <div v-for="(color, i) in COLORS" :key="'c' + i"
             class="flicking-panel" :style="{ background: color }">
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];
</script>
