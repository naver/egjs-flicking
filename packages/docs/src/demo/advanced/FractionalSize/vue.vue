<template>
  <div>
    <div class="demo-container">
      <div class="demo-label">useFractionalSize: false (default)</div>
      <Flicking :options="{ useFractionalSize: false, defaultIndex: 2 }" :style="{ width: '200px' }">
        <div
          v-for="(color, i) in colors"
          :key="'false-' + i"
          class="flicking-panel"
          :style="{ width: '199.5px', height: '200px', background: color }"
        >
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>

    <div class="demo-container">
      <div class="demo-label">useFractionalSize: true</div>
      <Flicking :options="{ useFractionalSize: true, defaultIndex: 2 }" :style="{ width: '200px' }">
        <div
          v-for="(color, i) in colors"
          :key="'true-' + i"
          class="flicking-panel"
          :style="{ width: '199.5px', height: '200px', background: color }"
        >
          {{ i + 1 }}
        </div>
      </Flicking>
    </div>
  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import { ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const colors = ref(["#3e8ed0", "#00d1b2", "#48c78e", "#f14668", "#ffe08a"]);
</script>
