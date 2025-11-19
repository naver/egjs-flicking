import React from "react";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";

export default <Columns>
  <ColumnItem is={6}>
    <CodeBlock className="language-html" title="html">
      {`<div id="flick0" class="flicking-viewport">
  <div class="flicking-camera">
    <span class="button mr-2 is-white">🍎 Apple</span>
    <span class="button mr-2 is-white">🍉 Watermelon</span>
    <span class="button mr-2 is-white">🥝 Kiwi</span>
    <span class="button mr-2 is-white">...</span>
  </div>
</div>
<div id="flick1" class="flicking-viewport">
  <div class="flicking-camera">
    <span class="button mr-2 is-white">🍔 Hamburger</span>
    <span class="button mr-2 is-white">🍕 Pizza</span>
    <span class="button mr-2 is-white">🍞 Bread</span>
    <span class="button mr-2 is-white">...</span>
  </div>
</div>
<div id="flick2" class="flicking-viewport">
  <div class="flicking-camera">
    <span class="button mr-2 is-white">🥛 Milk</span>
    <span class="button mr-2 is-white">☕ Coffee</span>
    <span class="button mr-2 is-white">🍵 Green tea</span>
    <span class="button mr-2 is-white">...</span>
  </div>
</div>`}
    </CodeBlock>
  </ColumnItem>
  <ColumnItem is={6}>
    <CodeBlock className="language-js" title="js">
      {`import Flicking, { ALIGN } from "@egjs/flicking";
import { Sync } from "@egjs/flicking-plugins";

const flicking0 = new Flicking("#flick0", {
  bound: true,
  bounce: 30,
  align: ALIGN.PREV
});

const flicking1 = new Flicking("#flick1", {
  bound: true,
  bounce: 30,
  align: ALIGN.PREV
});

const flicking2 = new Flicking("#flick2", {
  bound: true,
  bounce: 30,
  align: ALIGN.PREV
});

flicking0.addPlugins(new Sync({
  type: "camera",
  synchronizedFlickingOptions: [
    {
      flicking: flicking0,
      isClickable: false
    },
    {
      flicking: flicking1,
      isClickable: false
    },
    {
      flicking: flicking2,
      isClickable: false
    }
  ]
}));`}
    </CodeBlock>
  </ColumnItem>
</Columns>;
