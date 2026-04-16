<template>
  <div>
    <div class="controls">
      <button :class="['button', isVertical && 'active']"
              @click="isVertical = true">
        Vertical (Fullpage)
      </button>
      <button :class="['button', !isVertical && 'active']"
              @click="isVertical = false">
        Horizontal (Slider)
      </button>
    </div>
    <Flicking
      :key="isVertical ? 'v' : 'h'"
      :options="{
        horizontal: !isVertical,
        moveType: 'strict',
        bound: true,
        align: 'prev'
      }"
    >
      <div v-for="(page, i) in PAGES" :key="i"
           class="page-panel" :style="{ background: page.color }">
        <span>{{ page.title }}</span>
        <span class="page-subtitle">{{ page.subtitle }}</span>
      </div>
    </Flicking>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const isVertical = ref(true);
const PAGES = [
  { title: "Page 1", subtitle: "Welcome", color: "#e74c3c" },
  { title: "Page 2", subtitle: "Features", color: "#3498db" },
  { title: "Page 3", subtitle: "Pricing", color: "#2ecc71" },
  { title: "Page 4", subtitle: "Contact", color: "#f39c12" },
  { title: "Page 5", subtitle: "About", color: "#9b59b6" }
];
</script>
