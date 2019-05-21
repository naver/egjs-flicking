<template>
  <div class="demo">
    <flicking
      :tag="'p'"
      :options="options"
      @change="print"
    >
      <div v-for="(num, idx) in childs" :key="idx">
        Panel {{ num }}
      </div>
    </flicking>

    <button @click="makeNewChild">APPEND</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FlickingOptions } from "@egjs/flicking";
import VueFlicking from "../src/index";
Vue.use(VueFlicking);

@Component({})
export default class Demo extends Vue {
  childs: number[] = [0, 1, 2];
  options: Partial<FlickingOptions> = {
    circular: true,
    renderExternal: true,
  }

  public makeNewChild() {
    this.childs.push(this.childs.length);
  }

  public print(e) {
    console.log(e)
  }
}
</script>

<style>
  .eg-flick-panel {
    width: 100%; height: 100px;
    font-size:2.0em;text-align:center;
  }
</style>
