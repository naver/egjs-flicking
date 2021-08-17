import React from "react";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";

export default <Columns>
  <ColumnItem is={6}>
    <CodeBlock className="html" title="html">
      {`<div id="flick0" class="flicking-viewport">
  <div class="flicking-camera">
    <div class="flicking-panel full has-background-primary">
      <img class="panel-image" src="/img/demo/bg01.jpg" />
    </div>
    <div class="flicking-panel full has-background-primary">
      <img class="panel-image" src="/img/demo/bg02.jpg" />
    </div>
    <div class="flicking-panel full has-background-primary">
      <img class="panel-image" src="/img/demo/bg03.jpg" />
    </div>
    <div class="flicking-panel full has-background-primary">
      <img class="panel-image" src="/img/demo/bg04.jpg" />
    </div>
    <div class="flicking-panel full has-background-primary">
      <img class="panel-image" src="/img/demo/bg05.jpg" />
    </div>
    <div class="flicking-panel full has-background-primary">
      <img class="panel-image" src="/img/demo/bg06.jpg" />
    </div>
  </div>
</div>
<div id="flick1" class="flicking-viewport">
  <div class="flicking-camera">
    <div class="flicking-panel thumb has-background-primary">
      <img class="thumb-image" src="/img/demo/bg01.jpg" />
    </div>
    <div class="flicking-panel thumb has-background-primary">
      <img class="thumb-image" src="/img/demo/bg02.jpg" />
    </div>
    <div class="flicking-panel thumb has-background-primary">
      <img class="thumb-image" src="/img/demo/bg03.jpg" />
    </div>
    <div class="flicking-panel thumb has-background-primary">
      <img class="thumb-image" src="/img/demo/bg04.jpg" />
    </div>
    <div class="flicking-panel thumb has-background-primary">
      <img class="thumb-image" src="/img/demo/bg05.jpg" />
    </div>
    <div class="flicking-panel thumb has-background-primary">
      <img class="thumb-image" src="/img/demo/bg06.jpg" />
    </div>
  </div>
</div>`}
    </CodeBlock>
  </ColumnItem>
  <ColumnItem is={6}>
    <CodeBlock className="js" title="js">
      {`import Flicking, { MOVE_TYPE } from "@egjs/flicking";
import { Sync } from "@egjs/flicking-plugins";

const flicking0 = new Flicking("#flick0", {
  bounce: 30
});

const flicking1 = new Flicking("#flick1", {
  bound: true,
  bounce: 30,
  moveType: MOVE_TYPE.FREE_SCROLL
});

flicking0.addPlugins(new Sync({
  type: "index",
  synchronizedFlickingOptions: [
    {
      flicking: flicking0,
      isSlidable: true
    },
    {
      flicking: flicking1,
      isClickable: true,
      activeClass: "active"
    }
  ]
}));`}
    </CodeBlock>
  </ColumnItem>
</Columns>;
