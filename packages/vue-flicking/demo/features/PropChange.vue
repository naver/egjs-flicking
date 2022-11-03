<template>
  <div class="container">
    <flicking class="flicking" :options="{
      panelsPerView: this.panelsPerView,
      circular: false
    }">
      <div class="panel0"><div class="anchor"></div></div>
      <div class="panel1"><div class="anchor"></div></div>
      <div class="panel2"><div class="anchor"></div></div>
      <div class="panel3"><div class="anchor"></div></div>
      <div class="panel4"><div class="anchor"></div></div>
    </flicking>
    <button @click="onClick">Change</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class PropChange extends Vue {
  public panelsPerView = 5;

  public onClick() {
    this.panelsPerView -= 1;
  }
}
</script>
