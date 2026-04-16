<template>
  <div>
    <!-- bound: false (default) -->
    <div class="demo-container">
      <div class="demo-label">bound: false (default, no boundary constraint)</div>
      <Flicking :options="{ bound: false, align: 'prev' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- bound: true -->
    <div class="demo-container">
      <div class="demo-label">bound: true (bounded at first/last panel)</div>
      <Flicking :options="{ bound: true, align: 'prev' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- bound: true + custom bounce -->
    <div class="demo-container">
      <div class="demo-label">bound: true + bounce: "50%" (larger bounce)</div>
      <Flicking :options="{ bound: true, bounce: '50%', align: 'prev' }">
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
