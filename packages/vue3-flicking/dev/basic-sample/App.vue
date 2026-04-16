<template>
  <div :style="css.container">
    <h1>Basic Sample</h1>
    <Flicking :options="{ align: 'prev', circular: true }">
      <div v-for="n in 5" :key="n" :style="css.panel">{{ n }}</div>
    </Flicking>
  </div>
</template>

<script setup lang="ts">
import Flicking from "@dev/vue3-flicking";

const css = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px"
  },
  panel: {
    minWidth: "200px",
    height: "200px",
    margin: "0 5px",
    background: "#e0e7ff",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold"
  }
};
</script>
