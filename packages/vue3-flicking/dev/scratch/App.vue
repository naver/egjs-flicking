<!--
  이슈 재현 템플릿

  이 파일을 덮어써서 이슈를 재현하세요.
-->
<template>
  <div>
    <h2>Scratch</h2>
    <Flicking :options="{ align: 'prev', circular: true }">
      <div v-for="n in 3" :key="n" :style="css.panel">{{ n }}</div>
    </Flicking>
  </div>
</template>

<script setup lang="ts">
import Flicking from "@dev/vue3-flicking";

const css = {
  panel: {
    minWidth: "200px",
    height: "200px",
    margin: "0 5px",
    background: "#f0f0f0",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold"
  }
};
</script>
