/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <><CodeBlock className="html" title="app.component.html">
{`<ngx-flicking #flicking0 [options]="{ bounce: 30 }" [plugins]="plugins">
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
</ngx-flicking>
<ngx-flicking #flicking1 [options]="{ bound: true, bounce: 30, moveType: 'freeScroll' }">
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
</ngx-flicking>`}
</CodeBlock>
<CodeBlock className="js" title="app.component.ts">
{`import { Component, OnInit, ViewChild } from "@angular/core";
import Flicking, { Plugin } from "@egjs/ngx-flicking";
import { Sync } from "@egjs/flicking-plugins";

@Component({})
export class DemoComponent {
  @ViewChild("flicking0", { static: true }) flicking0: NgxFlickingComponent;
  @ViewChild("flicking1", { static: true }) flicking1: NgxFlickingComponent;

  public plugins: Plugin[] = [];

  public ngOnInit() {
    this.plugins = [new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        {
          flicking: this.flicking0,
          isSlidable: true
        },
        {
          flicking: this.flicking1,
          isClickable: true,
          activeClass: "active"
        }
      ]
    })]
  }
}`}
</CodeBlock></>;

