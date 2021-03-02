<template>
  <div>
    <flicking class="flicking flicking1" :options="{ renderOnlyVisible: true, align: '20%' }">
      <panel v-if="a" :key="0" class="panel0"><div class="anchor"></div></panel>
      <panel :key="1" class="panel1"><div class="anchor"></div></panel>
      <panel :key="2" class="panel2"><div class="anchor"></div></panel>
      <panel :key="3" class="panel3"><div class="anchor"></div></panel>
      <panel :key="4" class="panel4"><div class="anchor"></div></panel>
      <panel :key="5" class="panel5"><div class="anchor"></div></panel>
    </flicking>
    <button @click="toFalse">BUTTON</button>
    <div>{{ this.a }}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Test extends Vue {
  public toFalse() {
    this.a = false;
  }

  data() {
    return {
      a: true
    }
  }
}
</script>
<style></style>
