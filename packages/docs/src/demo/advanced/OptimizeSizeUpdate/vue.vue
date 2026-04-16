<template>
  <div>
    <div class="demo-hint">
      <strong>autoResize: true + renderOnlyVisible: true</strong> with
      200 panels of varying heights.<br/>
      Swipe through the panels and compare the <strong>flickering</strong> between the two carousels.
    </div>

    <div class="demo-section">
      <div class="demo-label">optimizeSizeUpdate: false (default)</div>
      <Flicking
        :renderOnlyVisible="true"
        :autoResize="true"
        :optimizeSizeUpdate="false"
      >
        <div
          v-for="n in 200"
          :key="n"
          :class="'flicking-panel ' + heights[(n - 1) % 5]"
        >
          Panel {{ n }} ({{ heightLabels[(n - 1) % 5] }}px)
        </div>
      </Flicking>
    </div>

    <div class="demo-section">
      <div class="demo-label">optimizeSizeUpdate: true</div>
      <Flicking
        :renderOnlyVisible="true"
        :autoResize="true"
        :optimizeSizeUpdate="true"
      >
        <div
          v-for="n in 200"
          :key="n"
          :class="'flicking-panel ' + heights[(n - 1) % 5]"
        >
          Panel {{ n }} ({{ heightLabels[(n - 1) % 5] }}px)
        </div>
      </Flicking>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default {
  components: { Flicking },
  data() {
    return {
      heights: ["panel-h120", "panel-h130", "panel-h140", "panel-h150", "panel-h160"],
      heightLabels: [120, 130, 140, 150, 160]
    };
  }
};
</script>
