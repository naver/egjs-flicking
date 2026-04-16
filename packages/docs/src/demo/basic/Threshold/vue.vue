<template>
  <div>
    <!-- threshold: 10 (sensitive) -->
    <div class="demo-container">
      <div class="demo-label">threshold: 10 (short drag changes panel)</div>
      <Flicking :options="{ threshold: 10, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- threshold: 40 (default) -->
    <div class="demo-container">
      <div class="demo-label">threshold: 40 (default)</div>
      <Flicking :options="{ threshold: 40, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- threshold: 100 (insensitive) -->
    <div class="demo-container">
      <div class="demo-label">threshold: 100 (requires long drag)</div>
      <Flicking :options="{ threshold: 100, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default {
  components: { Flicking }
};
</script>
