<template>
  <div>
    <Flicking
      :options="{ renderOnlyVisible: true, align: 'prev', bound: true, preventDefaultOnDrag: true }"
      @ready="onReady"
      @visible-change="onVisibleChange"
    >
      <div
        v-for="i in TOTAL"
        :key="i - 1"
        class="flicking-panel"
        :style="{ background: COLORS[(i - 1) % COLORS.length] }"
      >
        <img
          v-if="loadedSet.has(i - 1)"
          :src="getImageUrl(i - 1)"
          :alt="'Panel ' + (i - 1)"
        />
        <div v-else class="placeholder">Panel {{ i - 1 }}</div>
      </div>
    </Flicking>
    <div class="info-bar">
      Images loaded: {{ loadedCount }} / {{ TOTAL }}
      (only visible panels are loaded)
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const TOTAL = 100;
const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const getImageUrl = i => `https://picsum.photos/seed/${i}/250/180`;

const loadedSet = ref(new Set());
const loadedCount = ref(0);

const onReady = e => {
  e.currentTarget.visiblePanels.forEach(panel => {
    loadedSet.value.add(panel.index);
  });
  loadedCount.value = loadedSet.value.size;
};

const onVisibleChange = e => {
  e.added.forEach(panel => {
    loadedSet.value.add(panel.index);
  });
  loadedCount.value = loadedSet.value.size;
};
</script>
