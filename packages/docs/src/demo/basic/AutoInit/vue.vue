<template>
  <div>
    <!-- autoInit: true (default) -->
    <div class="demo-container">
      <div class="demo-label">autoInit: true (default, initializes immediately)</div>
      <Flicking :options="{ autoInit: true, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- autoInit: false (manual init) -->
    <div class="demo-container">
      <div class="demo-label">autoInit: false (initialize on button click)</div>
      <Flicking ref="flicking" :options="{ autoInit: false, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="handleInit" :disabled="isInitialized">
          {{ isInitialized ? "Initialized" : "Call init()" }}
        </button>
      </div>
      <div class="status">
        Status: {{ isInitialized ? "initialized - drag enabled" : "not initialized - drag disabled" }}
      </div>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const flicking = ref(null);
const isInitialized = ref(false);

const handleInit = () => {
  if (!isInitialized.value) {
    flicking.value.init();
    isInitialized.value = true;
  }
};
</script>
