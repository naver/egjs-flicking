<template>
  <div>
    <!-- adaptive: false (default) -->
    <div class="demo-container">
      <div class="demo-label">adaptive: false (default, fixed height)</div>
      <Flicking :options="{ adaptive: false, align: 'center' }">
        <div class="flicking-panel panel-1">Height 80px</div>
        <div class="flicking-panel panel-2">Height 150px</div>
        <div class="flicking-panel panel-3">Height 100px</div>
        <div class="flicking-panel panel-4">Height 200px</div>
        <div class="flicking-panel panel-5">Height 120px</div>
      </Flicking>
    </div>

    <!-- adaptive: true -->
    <div class="demo-container">
      <div class="demo-label">adaptive: true (viewport adjusts to panel height)</div>
      <Flicking :options="{ adaptive: true, align: 'center' }">
        <div class="flicking-panel panel-1">Height 80px</div>
        <div class="flicking-panel panel-2">Height 150px</div>
        <div class="flicking-panel panel-3">Height 100px</div>
        <div class="flicking-panel panel-4">Height 200px</div>
        <div class="flicking-panel panel-5">Height 120px</div>
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
