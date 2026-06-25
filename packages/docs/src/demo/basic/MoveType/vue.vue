<template>
  <div>
    <!-- moveType: "snap" (default) -->
    <div class="demo-container">
      <div class="demo-label">moveType: "snap" (default)</div>
      <Flicking :options="{ moveType: 'snap', align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- moveType: "freeScroll" -->
    <div class="demo-container">
      <div class="demo-label">moveType: "freeScroll" (free scroll)</div>
      <Flicking :options="{ moveType: 'freeScroll', align: 'center', bound: true }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- moveType: "strict" -->
    <div class="demo-container">
      <div class="demo-label">moveType: "strict" (one panel at a time)</div>
      <Flicking :options="{ moveType: 'strict', align: 'center' }">
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
