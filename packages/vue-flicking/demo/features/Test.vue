<template>
  <div>
    <flicking class="flicking flicking1" :options="{ circular: true  }">
      <panel v-once class="panel0"><div class="anchor"></div></panel>
      <panel v-once class="panel1"><div class="anchor"></div></panel>
      <panel v-once class="panel2"><div class="anchor"></div></panel>
      <panel v-once class="panel3"><div class="anchor"></div></panel>
      <panel v-once class="panel4"><div class="anchor"></div></panel>
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
