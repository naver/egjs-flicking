/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <><CodeBlock className="language-html" title="app.component.html">
{`<ngx-flicking #flicking0 [options]="{ bound: true, bounce: 30, align: 'prev' }" [plugins]="plugins">
  <span flicking-panel class="button mr-2 is-white">🍎 Apple</span>
  <span flicking-panel class="button mr-2 is-white">🍉 Watermelon</span>
  <span flicking-panel class="button mr-2 is-white">🥝 Kiwi</span>
  <span flicking-panel class="button mr-2 is-white">...</span>
</ngx-flicking>
<ngx-flicking #flicking1 [options]="{ bound: true, bounce: 30, align: 'prev' }">
  <span flicking-panel class="button mr-2 is-white">🍔 Hamburger</span>
  <span flicking-panel class="button mr-2 is-white">🍕 Pizza</span>
  <span flicking-panel class="button mr-2 is-white">🍞 Bread</span>
  <span flicking-panel class="button mr-2 is-white">...</span>
</ngx-flicking>
<ngx-flicking #flicking2 [options]="{ bound: true, bounce: 30, align: 'prev' }">
  <span flicking-panel class="button mr-2 is-white">🥛 Milk</span>
  <span flicking-panel class="button mr-2 is-white">☕ Coffee</span>
  <span flicking-panel class="button mr-2 is-white">🍵 Green tea</span>
  <span flicking-panel class="button mr-2 is-white">...</span>
</ngx-flicking>`}
</CodeBlock>
<CodeBlock className="language-js" title="app.component.ts">
{`import { Component, OnInit, ViewChild } from "@angular/core";
import Flicking, { Plugin } from "@egjs/ngx-flicking";
import { Sync } from "@egjs/flicking-plugins";

@Component({})
export class DemoComponent {
  @ViewChild("flicking0", { static: true }) flicking0: NgxFlickingComponent;
  @ViewChild("flicking1", { static: true }) flicking1: NgxFlickingComponent;
  @ViewChild("flicking2", { static: true }) flicking2: NgxFlickingComponent;

  public plugins: Plugin[] = [];

  public ngOnInit() {
    this.plugins = [new Sync({
      type: "camera",
      synchronizedFlickingOptions: [
        {
          flicking: this.flicking0,
          isClickable: false
        },
        {
          flicking: this.flicking1,
          isClickable: false
        },
        {
          flicking: this.flicking2,
          isClickable: false
        }
      ]
    })]
  }
}`}
</CodeBlock></>;

