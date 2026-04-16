<template>
  <div>
    <!-- observePanelResize: false (default) -->
    <div class="demo-container">
      <div class="demo-label">observePanelResize: false (default)</div>
      <Flicking :options="{ align: 'center', observePanelResize: false }">
        <div
          v-for="(panel, i) in panels"
          :key="i"
          class="flicking-panel"
          :class="panel.bg"
          :style="{ width: panel.wide ? '70%' : '40%' }"
        >
          <div class="panel-inner">
            <span>Panel {{ i + 1 }}</span>
            <button @click.stop="panel.wide = !panel.wide">
              {{ panel.wide ? 'Shrink' : 'Expand' }}
            </button>
          </div>
        </div>
      </Flicking>
      <div class="demo-hint">Flicking does not detect panel resizing, causing misaligned layout</div>
    </div>

    <!-- observePanelResize: true -->
    <div class="demo-container">
      <div class="demo-label">observePanelResize: true</div>
      <Flicking :options="{ align: 'center', observePanelResize: true }">
        <div
          v-for="(panel, i) in panels2"
          :key="i"
          class="flicking-panel"
          :class="panel.bg"
          :style="{ width: panel.wide ? '70%' : '40%' }"
        >
          <div class="panel-inner">
            <span>Panel {{ i + 1 }}</span>
            <button @click.stop="panel.wide = !panel.wide">
              {{ panel.wide ? 'Shrink' : 'Expand' }}
            </button>
          </div>
        </div>
      </Flicking>
      <div class="demo-hint">Flicking automatically recalculates layout when panels are resized</div>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const bgs = ["panel-1", "panel-2", "panel-3", "panel-4", "panel-5"];
const makePanels = () => bgs.map(bg => ({ bg, wide: false }));

export default {
  components: { Flicking },
  data() {
    return {
      panels: makePanels(),
      panels2: makePanels()
    };
  }
};
</script>
