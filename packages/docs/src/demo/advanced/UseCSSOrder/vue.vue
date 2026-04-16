<template>
  <div>
    <!-- useCSSOrder: false (default) -->
    <div class="demo-container">
      <div class="demo-label">useCSSOrder: false (default) — DOM node order changes in circular mode</div>
      <Flicking
        ref="flick1"
        :options="{ circular: true, useCSSOrder: false, align: 'center' }"
        @moveEnd="updateDomOrder(1)"
        @ready="updateDomOrder(1)"
      >
        <div class="flicking-panel panel-1" data-id="1">Panel 1</div>
        <div class="flicking-panel panel-2" data-id="2">Panel 2</div>
        <div class="flicking-panel panel-3" data-id="3">Panel 3</div>
        <div class="flicking-panel panel-4" data-id="4">Panel 4</div>
        <div class="flicking-panel panel-5" data-id="5">Panel 5</div>
      </Flicking>
      <div class="controls">
        <button @click="$refs.flick1.prev().catch(() => {})">Prev</button>
        <button @click="$refs.flick1.next().catch(() => {})">Next</button>
      </div>
      <div class="dom-order-display">DOM order: {{ domOrder1 }}</div>
    </div>

    <!-- useCSSOrder: true -->
    <div class="demo-container">
      <div class="demo-label">useCSSOrder: true — preserves DOM order, uses CSS order property for visual ordering</div>
      <Flicking
        ref="flick2"
        :options="{ circular: true, useCSSOrder: true, align: 'center' }"
        @moveEnd="updateDomOrder(2)"
        @ready="updateDomOrder(2)"
      >
        <div class="flicking-panel panel-1" data-id="1">Panel 1</div>
        <div class="flicking-panel panel-2" data-id="2">Panel 2</div>
        <div class="flicking-panel panel-3" data-id="3">Panel 3</div>
        <div class="flicking-panel panel-4" data-id="4">Panel 4</div>
        <div class="flicking-panel panel-5" data-id="5">Panel 5</div>
      </Flicking>
      <div class="controls">
        <button @click="$refs.flick2.prev().catch(() => {})">Prev</button>
        <button @click="$refs.flick2.next().catch(() => {})">Next</button>
      </div>
      <div class="dom-order-display">DOM order: {{ domOrder2 }}</div>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default {
  components: { Flicking },
  data() {
    return { domOrder1: "1 2 3 4 5", domOrder2: "1 2 3 4 5" };
  },
  methods: {
    updateDomOrder(n) {
      const ref = this.$refs[`flick${n}`];
      if (!ref) return;
      const camera = ref.$el?.querySelector(".flicking-camera");
      if (!camera) return;
      const ids = [...camera.children].map(el => el.dataset.id).join(" → ");
      this[`domOrder${n}`] = ids;
    }
  }
};
</script>
