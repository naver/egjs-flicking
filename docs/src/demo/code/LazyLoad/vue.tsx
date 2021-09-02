/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <CodeBlock className="html">
{`<template>
  <div class="wrapper">
    <flicking
      :options="{ bound: true, renderOnlyVisible: true, align: 'prev', defaultIndex: 500 }"
      @ready="e => updateVisibility(e.currentTarget.visiblePanels.map(panel => panel.index))"
      @visibleChange="e => updateVisibility(e.added.map(panel => panel.index))">
      <div v-for="(panel, idx) in panels">
        <img v-if="panel" :src="\`https://cataas.com/cat?width=400&height=200&idx=\${idx}\`" />
        <span class="legend">{idx}</span>
      </div>
    </flicking>
  </div>
</template>
<script>
import { Sync } from "@egjs/flicking-plugins";

export default {
  data() {
    return {
      panels: [...new Array(501).fill(false)]
    }
  },
  methods() {
    updateVisibility: indexes => {
      indexes.forEach(idx => {
        this.panels[idx] = true;
      });

      this.panels = [...this.panels]
    }
  }
}
</script>`}
</CodeBlock>;
