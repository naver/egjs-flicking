<template>
  <div>
    <!-- defaultIndex: 0 (default) -->
    <div class="demo-container">
      <div class="demo-label">defaultIndex: 0 (default, first panel)</div>
      <Flicking :options="{ defaultIndex: 0, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- defaultIndex: 2 -->
    <div class="demo-container">
      <div class="demo-label">defaultIndex: 2 (starts at 3rd panel)</div>
      <Flicking :options="{ defaultIndex: 2, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- defaultIndex: 4 (last) -->
    <div class="demo-container">
      <div class="demo-label">defaultIndex: 4 (starts at last panel)</div>
      <Flicking :options="{ defaultIndex: 4, align: 'center' }">
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
