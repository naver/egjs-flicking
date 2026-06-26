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

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const colors = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];
const panels = ref([0, 1, 2, 3, 4]);
const logs = ref([]);
let nextId = 5;

const addLog = message => {
  logs.value = [...logs.value.slice(-4), message];
};
const handleNeedPanel = e => {
  addLog(`needPanel: direction=${e.direction}`);

  if (e.direction === "NEXT") {
    // NEXT: append panels
    const newPanels = [nextId, nextId + 1, nextId + 2];
    nextId += 3;
    panels.value = [...panels.value, ...newPanels];
    addLog(`Added: Panel ${newPanels.map(p => p + 1).join(", ")}`);
  }
};
</script>
