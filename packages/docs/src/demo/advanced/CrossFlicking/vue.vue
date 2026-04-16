<template>
  <div>
    <Flicking
      :options="{
        horizontal: false,
        moveType: 'strict',
        bound: true,
        align: 'prev'
      }"
      class="outer-viewport"
      @changed="onOuterChanged"
    >
      <div v-for="(group, gi) in GROUPS" :key="gi" class="outer-panel">
        <div class="group-label">{{ group.name }} (swipe vertically to switch groups)</div>
        <Flicking :options="{ nested: true, moveType: 'strict', bound: true, align: 'prev' }">
          <div v-for="(color, pi) in group.colors" :key="pi"
               class="inner-panel" :style="{ background: color }">
            <span>{{ group.name }}-{{ pi + 1 }}</span>
            <span class="panel-subtitle">swipe horizontally</span>
          </div>
        </Flicking>
      </div>
    </Flicking>
    <div class="info-bar">
      Current group: {{ GROUPS[outerIndex]?.name }} (vertical: switch groups / horizontal: navigate within group)
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const GROUPS = [
  { name: "Group A", colors: ["#e74c3c", "#c0392b", "#e67e22"] },
  { name: "Group B", colors: ["#3498db", "#2980b9", "#1abc9c"] },
  { name: "Group C", colors: ["#2ecc71", "#27ae60", "#16a085"] }
];

const outerIndex = ref(0);
const onOuterChanged = e => {
  outerIndex.value = e.index;
};
</script>
