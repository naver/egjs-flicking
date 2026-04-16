<template>
  <div>
    <!-- animationThreshold: 0.5 (default) -->
    <div class="demo-container">
      <div class="demo-label">animationThreshold: 0.5 (default) — normal animation</div>
      <Flicking
        ref="flick1"
        :options="{ duration: 1000, animationThreshold: 0.5, align: 'center' }"
        @willChange="log1 = '▶ Animation started'"
        @moveEnd="log1 = '✓ Move complete'"
      >
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="$refs.flick1.prev().catch(() => {})">Prev</button>
        <button @click="$refs.flick1.next().catch(() => {})">Next</button>
        <span class="event-log">{{ log1 || '—' }}</span>
      </div>
    </div>

    <!-- animationThreshold: 300 -->
    <div class="demo-container">
      <div class="demo-label">animationThreshold: 300 — moves under 300px are instant (no animation)</div>
      <Flicking
        ref="flick2"
        :options="{ duration: 1000, animationThreshold: 300, align: 'center' }"
        @willChange="log2 = '▶ Animation started'"
        @moveEnd="log2 = '✓ Move complete'"
      >
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="$refs.flick2.prev().catch(() => {})">Prev</button>
        <button @click="$refs.flick2.next().catch(() => {})">Next</button>
        <span class="event-log">{{ log2 || '—' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default {
  components: { Flicking },
  data() {
    return { log1: "", log2: "" };
  }
};
</script>
