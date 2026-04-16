<template>
  <div>
    <!-- nested: false -->
    <div class="demo-container">
      <div class="demo-label">nested: false (parent does not move at inner boundary)</div>
      <div class="demo-hint">The outer Flicking does not move when the inner one reaches its end</div>
      <Flicking :options="{ align: 'center' }">
        <div :key="0" class="outer-panel outer-1">
          <Flicking class="inner-viewport" :options="{ nested: false, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
        <div :key="1" class="outer-panel outer-2">
          <Flicking class="inner-viewport" :options="{ nested: false, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
        <div :key="2" class="outer-panel outer-3">
          <Flicking class="inner-viewport" :options="{ nested: false, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
      </Flicking>
    </div>

    <!-- nested: true -->
    <div class="demo-container">
      <div class="demo-label">nested: true (propagates to parent at inner boundary)</div>
      <div class="demo-hint">The outer Flicking moves when the inner one reaches its end</div>
      <Flicking :options="{ align: 'center' }">
        <div :key="0" class="outer-panel outer-1">
          <Flicking class="inner-viewport" :options="{ nested: true, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
        <div :key="1" class="outer-panel outer-2">
          <Flicking class="inner-viewport" :options="{ nested: true, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
        <div :key="2" class="outer-panel outer-3">
          <Flicking class="inner-viewport" :options="{ nested: true, align: 'center', bound: true }">
            <div :key="0" class="inner-panel">Inner 1</div>
            <div :key="1" class="inner-panel">Inner 2</div>
            <div :key="2" class="inner-panel">Inner 3</div>
          </Flicking>
        </div>
      </Flicking>
    </div>
  </div>
</template>

<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default {
  components: { Flicking }
};
</script>
