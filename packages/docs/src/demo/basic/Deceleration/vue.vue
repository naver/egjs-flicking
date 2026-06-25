<template>
  <div>
    <!-- deceleration: 0.001 (long inertia) -->
    <div class="demo-container">
      <div class="demo-label">deceleration: 0.001 (long inertia, travels far)</div>
      <Flicking :options="{ deceleration: 0.001, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- deceleration: 0.0075 (default) -->
    <div class="demo-container">
      <div class="demo-label">deceleration: 0.0075 (default)</div>
      <Flicking :options="{ deceleration: 0.0075, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- deceleration: 0.05 (short inertia) -->
    <div class="demo-container">
      <div class="demo-label">deceleration: 0.05 (short inertia, stops quickly)</div>
      <Flicking :options="{ deceleration: 0.05, align: 'center' }">
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
