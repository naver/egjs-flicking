<template>
  <div class="infinite" :class="classes"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    num: { type: Number },
  },
})
export default class PlaceHolder extends Vue {
  loaded = false;

  get classes() {
    return `panel${this.$props.num % 5} ${this.loaded ? "" : "placeholder"}`;
  }

  public mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 1500);
  }
}
</script>
<style scoped>

</style>

