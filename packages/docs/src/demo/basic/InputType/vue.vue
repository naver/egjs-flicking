<template>
  <div>
    <!-- inputType: ["touch", "mouse"] (default) -->
    <div class="demo-container">
      <div class="demo-label">inputType: ["touch", "mouse"] (default)</div>
      <Flicking :options="{ inputType: ['touch', 'mouse'], align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- inputType: ["touch"] -->
    <div class="demo-container">
      <div class="demo-label">inputType: ["touch"] (touch only, no mouse drag)</div>
      <Flicking :options="{ inputType: ['touch'], align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- inputType: ["mouse"] -->
    <div class="demo-container">
      <div class="demo-label">inputType: ["mouse"] (mouse only, no touch)</div>
      <Flicking :options="{ inputType: ['mouse'], align: 'center' }">
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
