<template>
  <div class="container">
    <button @click="onClick">Click me</button>
    <flicking class="flicking" v-if="show" :options="flickingOptions">
      <img src="https://picsum.photos/seed/1/200/300" />
      <img src="https://picsum.photos/seed/2/200/300" />
      <img src="https://picsum.photos/seed/3/200/300" />
    </flicking>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ImageLoadDemo extends Vue {
  show = false;
  flickingOptions = {
    circular: true,
    duration: 300,
    resizeOnContentsReady: true,
  }

  onClick() {
    this.show = true;
  }
}
</script>
