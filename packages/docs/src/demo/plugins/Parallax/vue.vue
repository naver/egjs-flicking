<script setup>
import { Parallax } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const plugins = [
  new Parallax(".bar-0", 2),
  new Parallax(".bar-1", 2),
  new Parallax(".bar-2", 2),
  new Parallax(".bar-3", 2),
  new Parallax(".bar-4", 2)
];
</script>

<template>
  <Flicking :plugins="plugins">
    <div v-for="i in 5" :key="i" class="skeleton-panel">
      <span class="skeleton-bar bar-0" />
      <span class="skeleton-bar bar-1" />
      <span class="skeleton-bar bar-2" />
      <span class="skeleton-bar bar-3" />
      <span class="skeleton-bar bar-4" />
    </div>
  </Flicking>
</template>
