import React from "react";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";

export default <><Columns>
  <ColumnItem is={12}>
    <CodeBlock className="language-html" title="html">
      {`<div id="flick" class="flicking-viewport">
  <div class="flicking-camera"></div>
</div>`}
    </CodeBlock>
  </ColumnItem>
</Columns>
<Columns>
  <ColumnItem is={12}>
    <CodeBlock className="language-js" title="js">
      {`import Flicking, { ALIGN, EVENTS } from "@egjs/flicking";

// Add panel elements
const cameraEl = document.querySelector("#flick .flicking-camera");
const fragment = document.createDocumentFragment();

for (let i = 0; i <= 500; i++) {
  const panel = document.createElement("div");
  panel.innerHTML = "<span>" + i + "</span>"
  panel.__LOADED__ = false;
  fragment.appendChild(panel);
}

cameraEl.appendChild(fragment);

const flicking = new Flicking("#flick", {
  bound: true,
  align: ALIGN.PREV,
  renderOnlyVisible: true,
  defaultIndex: 500
});

const updateVisibility(indexes: number[]) {
  const addedPanels = indexes.map(idx => flicking.panels[idx]);
  addedPanels
    .filter(panel => !panel.element.__LOADED__)
    .forEach(panel => {
      const image = document.createElement("img");
      image.src = "https://cataas.com/cat?idx=" + panel.index
      panel.element.appendChild(image);
      panel.element.__LOADED__ = true;
    });
}

flicking.on(EVENT.VISIBLE_CHANGE, e => {
  updateVisibility(e.added.map(panel => panel.index));
});

updateVisibility(flicking.visiblePanels.map(panel => panel.index));`}
    </CodeBlock>
  </ColumnItem>
</Columns></>;
