<template>
  <div>
    <div class="demo-container">
      <div class="demo-label">needPanelThreshold: 100</div>
      <div class="demo-info">needPanel event fires 100px before the end → panels are added automatically</div>
      <Flicking
        ref="flicking"
        align="prev"
        :needPanelThreshold="100"
        @need-panel="handleNeedPanel"
      >
        <div
          v-for="id in panels"
          :key="id"
          class="flicking-panel"
          :style="{ background: colors[id % colors.length] }"
        >
          Panel {{ id + 1 }}
        </div>
      </Flicking>
      <div class="panel-counter">
        Current panel count: <strong>{{ panels.length }}</strong> (auto-appends on scroll to end)
      </div>
      <div class="event-log">
        <div v-if="logs.length === 0">Event log...</div>
        <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
      </div>
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
      colors: ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"],
      panels: [0, 1, 2, 3, 4],
      logs: [],
      nextId: 5
    };
  },
  methods: {
    addLog(message) {
      this.logs = [...this.logs.slice(-4), message];
    },
    handleNeedPanel(e) {
      this.addLog(`needPanel: direction=${e.direction}`);

      if (e.direction === "NEXT") {
        // NEXT: append panels
        const newPanels = [this.nextId, this.nextId + 1, this.nextId + 2];
        this.nextId += 3;
        this.panels = [...this.panels, ...newPanels];
        this.addLog(`Added: Panel ${newPanels.map(p => p + 1).join(", ")}`);
      }
    }
  }
};
</script>
