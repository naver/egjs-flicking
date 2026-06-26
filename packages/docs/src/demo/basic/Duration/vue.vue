<template>
  <div>
    <!-- duration: 100 (fast) -->
    <div class="demo-container">
      <div class="demo-label">duration: 100 (fast animation)</div>
      <Flicking :options="{ duration: 100, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- duration: 500 (default) -->
    <div class="demo-container">
      <div class="demo-label">duration: 500 (default)</div>
      <Flicking :options="{ duration: 500, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- duration: 1500 (slow) -->
    <div class="demo-container">
      <div class="demo-label">duration: 1500 (slow animation)</div>
      <Flicking :options="{ duration: 1500, align: 'center' }">
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
</script>
