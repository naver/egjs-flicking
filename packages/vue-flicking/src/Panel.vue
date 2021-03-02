<template>
  <component :is="this.tag" class="flicking-panel">
    <slot></slot>
  </component>
</template>
<script lang="ts">
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class VuePanel extends Vue {
  @Prop({ type: String, default: "div", required: false }) public tag!: string;
}

export default VuePanel
</script>
<style>
</style>
