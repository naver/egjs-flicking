/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <><CodeBlock className="language-html" title="app.component.html">
{`<ngx-flicking #flicking0 [options]="{ bound: true, bounce: 30, align: 'prev' }"
  (ready)="onReady($event)"
  (visibleChange)="onVisibleChange($event)"
>
  <div flicking-panel *ngFor="let panel of panels; index as idx" class="panel">
    <img *ngIf="panel" src={{\`https://cataas.com/cat?width=400&height=200&idx=\${idx}\`}} />
    <span class="legend">{{idx}}</span>
  </div>
</ngx-flicking>`}
</CodeBlock>
<CodeBlock className="language-js" title="app.component.ts">
{`import { Component, OnInit, ViewChild } from "@angular/core";
import Flicking from "@egjs/ngx-flicking";

@Component({})
export class DemoFlickingComponent {
  panels = [...new Array(501).fill(false)];

  onReady(e) {
    this.updateVisibility(e.currentTarget.visiblePanels.map(panel => panel.index));
  }

  onVisibleChange(e) {
    this.updateVisibility(e.added.map(panel => panel.index));
  }

  updateVisibility(indexes) {
    indexes.forEach(idx => {
      this.panels[idx] = true;
    });

    this.panels = [...this.panels];
  }
}`}
</CodeBlock></>;

