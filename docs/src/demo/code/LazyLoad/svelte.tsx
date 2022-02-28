/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <CodeBlock className="language-jsx">
{`<script>
  import Flicking, { FlickingPanel } from "@egjs/svelte-flicking";
  import "@egjs/svelte-flicking/dist/flicking.css";

  let panels = [...new Array(501).fill(false)];

  updateVisibility(indexes) {
    indexes.forEach(idx => {
      panels[idx] = true;
    });

    panels = [...panels];
  }
</script>

<Flicking
  on:ready={e => updateVisibility(e.detail.currentTarget.visiblePanels.map(panel => panel.index))}
  on:visibleChange={e => updateVisibility(e.detail.added.map(panel => panel.index))}>
  {#each panels as panel, idx (idx)}
    <FlickingPanel>
      {#if panel}
      <img src={\`https://cataas.com/cat?width=400&height=200&idx=\${idx}\`} />
      {/if}
      <span class="legend">{idx}</span>
    </FlickingPanel>
  {/each}
</Flicking>`}
</CodeBlock>;
