<template>
  <div>
    <!-- disableOnInit: false (default) -->
    <div class="demo-container">
      <div class="demo-label">disableOnInit: false (default, drag enabled)</div>
      <Flicking :options="{ disableOnInit: false, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- disableOnInit: true -->
    <div class="demo-container">
      <div class="demo-label">disableOnInit: true (drag disabled, button control only)</div>
      <Flicking :options="{ disableOnInit: true, align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
    </div>

    <!-- dynamic toggle -->
    <div class="demo-container">
      <div class="demo-label">Dynamic toggle: {{ isDisabled ? "disabled" : "enabled" }}</div>
      <Flicking ref="flicking" :options="{ align: 'center' }">
        <div class="flicking-panel panel-1">1</div>
        <div class="flicking-panel panel-2">2</div>
        <div class="flicking-panel panel-3">3</div>
        <div class="flicking-panel panel-4">4</div>
        <div class="flicking-panel panel-5">5</div>
      </Flicking>
      <div class="controls">
        <button @click="toggleInput">
          {{ isDisabled ? "Enable input" : "Disable input" }}
        </button>
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
    return { isDisabled: false };
  },
  methods: {
    toggleInput() {
      const flicking = this.$refs.flicking;
      if (this.isDisabled) {
        flicking.enableInput();
      } else {
        flicking.disableInput();
      }
      this.isDisabled = !this.isDisabled;
    }
  }
};
</script>
