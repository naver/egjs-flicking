<template>
  <div class="container">
    <flicking class="flicking flicking0" ref="flicking" :options="{
      panelsPerView: 5,
      circular: true,
      virtual: {
        cache: true,
        panelClass: 'panel',
        renderPanel: (panel) => `<span>Panel ${panel.index}</span>`,
        initialPanelCount: 100
      }
    }"></flicking>
    <button @click="this.prepend">Prepend</button>
    <button @click="this.append">Append</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class VariableSize extends Vue {
  public prepend() {
    (this.$refs.flicking as any).virtual.prepend(100);
  }

  public append() {
    (this.$refs.flicking as any).virtual.append(100);
  }
}
</script>
