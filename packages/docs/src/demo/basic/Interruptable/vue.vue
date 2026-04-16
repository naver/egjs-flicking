<template>
  <div>
    <!-- interruptable: true (default) -->
    <div class="demo-container">
      <div class="demo-label">interruptable: true (default — drag during animation)</div>
      <Flicking ref="flick1" :options="{ duration: 2000, align: 'center', interruptable: true }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="next1">Next (start 2s animation)</button>
      </div>
      <div class="demo-hint">Drag during animation to interrupt it immediately</div>
    </div>

    <!-- interruptable: false -->
    <div class="demo-container">
      <div class="demo-label">interruptable: false (ignores drag until animation ends)</div>
      <Flicking ref="flick2" :options="{ duration: 2000, align: 'center', interruptable: false }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="next2">Next (start 2s animation)</button>
      </div>
      <div class="demo-hint">Drag is ignored until the animation completes</div>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default {
  components: { Flicking },
  methods: {
    next1() {
      this.$refs.flick1.next().catch(() => {});
    },
    next2() {
      this.$refs.flick2.next().catch(() => {});
    }
  }
};
</script>
