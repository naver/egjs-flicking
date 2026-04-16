<template>
  <div>
    <Flicking
      :options="{ renderOnlyVisible: true, align: 'prev', bound: true }"
    >
      <div v-for="i in panels" :key="i"
           class="flicking-panel"
           :style="{ background: COLORS[i % COLORS.length] }">
        {{ i }}
      </div>
    </Flicking>
    <div class="controls">
      <button class="button" @click="prepend">Prepend</button>
      <button class="button" @click="append">Append</button>
      <button class="button danger" @click="removeFirst">Remove First</button>
      <button class="button danger" @click="removeLast">Remove Last</button>
    </div>
    <div class="info-bar">Panel count: {{ panels.length }}</div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const panels = ref([0, 1, 2, 3, 4]);
let counter = 5;

const prepend = () => {
  panels.value = [counter++, ...panels.value];
};
const append = () => {
  panels.value = [...panels.value, counter++];
};
const removeFirst = () => {
  if (panels.value.length > 1) panels.value = panels.value.slice(1);
};
const removeLast = () => {
  if (panels.value.length > 1) panels.value = panels.value.slice(0, -1);
};
</script>
