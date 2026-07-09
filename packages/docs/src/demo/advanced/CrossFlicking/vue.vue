<template>
  <div ref="viewport" class="cross-viewport flicking-viewport">
    <div class="flicking-camera">
      <div v-for="(category, ci) in CATEGORIES" :key="ci" class="cross-group">
        <div v-for="(it, ii) in category.items" :key="ii"
             class="cross-panel" :style="{ background: it.gradient }">
          <span class="panel-category">{{ category.name }}</span>
          <span class="panel-title">{{ it.title }}</span>
          <span class="panel-hint">↕ browse items · ↔ switch category</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CrossFlicking } from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { onBeforeUnmount, onMounted, ref } from "vue";

// Vue3 has no dedicated CrossFlicking wrapper, so the core class is used imperatively.
const CATEGORIES = [
  {
    name: "Nature",
    items: [
      { title: "Forest", gradient: "linear-gradient(135deg, #0f9b70, #1e5631)" },
      { title: "Meadow", gradient: "linear-gradient(135deg, #56ab2f, #a8e063)" },
      { title: "Canyon", gradient: "linear-gradient(135deg, #3ca55c, #b5ac49)" }
    ]
  },
  {
    name: "Ocean",
    items: [
      { title: "Reef", gradient: "linear-gradient(135deg, #2193b0, #6dd5ed)" },
      { title: "Wave", gradient: "linear-gradient(135deg, #1a2980, #26d0ce)" },
      { title: "Deep", gradient: "linear-gradient(135deg, #000046, #1cb5e0)" }
    ]
  },
  {
    name: "Sunset",
    items: [
      { title: "Dawn", gradient: "linear-gradient(135deg, #ff9966, #ff5e62)" },
      { title: "Dusk", gradient: "linear-gradient(135deg, #f7971e, #ffd200)" },
      { title: "Ember", gradient: "linear-gradient(135deg, #cb2d3e, #ef473a)" }
    ]
  },
  {
    name: "Space",
    items: [
      { title: "Nebula", gradient: "linear-gradient(135deg, #654ea3, #eaafc8)" },
      { title: "Aurora", gradient: "linear-gradient(135deg, #4776e6, #8e54e9)" },
      { title: "Cosmos", gradient: "linear-gradient(135deg, #200122, #6f0000)" }
    ]
  }
];

const viewport = ref(null);
let flicking = null;

onMounted(() => {
  flicking = new CrossFlicking(viewport.value, {
    align: "prev",
    moveType: "strict",
    bound: true,
    sideOptions: { moveType: "strict", bound: true }
  });
});

onBeforeUnmount(() => {
  if (flicking) flicking.destroy();
});
</script>
