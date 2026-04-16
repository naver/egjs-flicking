<template>
  <div>
    <!-- preventClickOnDrag: true (default) -->
    <div class="demo-container">
      <div class="demo-label">preventClickOnDrag: true (default)</div>
      <Flicking :options="{ align: 'center', preventClickOnDrag: true }">
        <div :key="0" class="flicking-panel panel-1" @click="count1++">click</div>
        <div :key="1" class="flicking-panel panel-2" @click="count1++">click</div>
        <div :key="2" class="flicking-panel panel-3" @click="count1++">click</div>
        <div :key="3" class="flicking-panel panel-4" @click="count1++">click</div>
        <div :key="4" class="flicking-panel panel-5" @click="count1++">click</div>
      </Flicking>
      <div class="click-count">Click count: {{ count1 }}</div>
      <div class="demo-hint">Click after drag is ignored. Count increases only on pure tap/click.</div>
    </div>

    <!-- preventClickOnDrag: false -->
    <div class="demo-container">
      <div class="demo-label">preventClickOnDrag: false</div>
      <Flicking :options="{ align: 'center', preventClickOnDrag: false }">
        <div :key="0" class="flicking-panel panel-1" @click="count2++">click</div>
        <div :key="1" class="flicking-panel panel-2" @click="count2++">click</div>
        <div :key="2" class="flicking-panel panel-3" @click="count2++">click</div>
        <div :key="3" class="flicking-panel panel-4" @click="count2++">click</div>
        <div :key="4" class="flicking-panel panel-5" @click="count2++">click</div>
      </Flicking>
      <div class="click-count">Click count: {{ count2 }}</div>
      <div class="demo-hint">Click event fires even after drag release.</div>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default {
  components: { Flicking },
  data() {
    return { count1: 0, count2: 0 };
  }
};
</script>
