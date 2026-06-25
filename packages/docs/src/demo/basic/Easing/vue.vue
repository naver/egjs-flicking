<template>
  <div>
    <!-- linear -->
    <div class="demo-container">
      <div class="demo-label">easing: linear (constant speed)</div>
      <Flicking :options="{ easing: linear, duration: 800, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- easeOutCubic (default) -->
    <div class="demo-container">
      <div class="demo-label">easing: easeOutCubic (default, fast start → slow end)</div>
      <Flicking :options="{ easing: easeOutCubic, duration: 800, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- easeInOutQuad -->
    <div class="demo-container">
      <div class="demo-label">easing: easeInOutQuad (slow start → fast → slow end)</div>
      <Flicking :options="{ easing: easeInOutQuad, duration: 800, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const linear = x => x;
const easeOutCubic = x => 1 - (1 - x) ** 3;
const easeInOutQuad = x => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);
</script>
