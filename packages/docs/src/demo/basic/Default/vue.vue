<template>
  <Flicking :options="{ align: 'center' }">
    <div class="flicking-panel panel-1">1</div>
    <div class="flicking-panel panel-2">2</div>
    <div class="flicking-panel panel-3">3</div>
    <div class="flicking-panel panel-4">4</div>
    <div class="flicking-panel panel-5">5</div>
  </Flicking>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default {
  components: { Flicking }
};
</script>
