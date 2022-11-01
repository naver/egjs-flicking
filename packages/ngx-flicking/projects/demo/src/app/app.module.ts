import { NgxFlickingModule } from './../../../ngx-flicking/src/lib/ngx-flicking.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlignComponent } from './align/align.component';
import { CustomComponent, TestPanelComponent } from './custom/custom.component';
import { RouterModule, Routes } from '@angular/router';
import { BoundComponent } from './bound/bound.component';
import { FreescrollComponent } from './freescroll/freescroll.component';
import { GapComponent } from './gap/gap.component';
import { InfiniteComponent, PlaceHolderItemComponent } from './infinite/infinite.component';
import { ProgressComponent } from './progress/progress.component';
import { SnapComponent } from './snap/snap.component';
import { VariablesizeComponent } from './variablesize/variablesize.component';
import { VirtualComponent } from './virtual/virtual.component';
import { PropChangeComponent } from './propchange/propchange.component';
import { AutoplayComponent } from './autoplay/autoplay.component';
import { FadeComponent } from './fade/fade.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { VisiblePanelsComponent } from './visiblepanels/visiblepanels.component';
import { PanelComponent } from './panel/panel.component';
import { ArrowComponent } from './arrow/arrow.component';
import { SyncComponent } from './sync/sync.component';

const appRoutes: Routes = [
  { path: 'align', component: AlignComponent },
  { path: 'bound', component: BoundComponent },
  { path: 'freescroll', component: FreescrollComponent },
  { path: 'gap', component: GapComponent },
  { path: 'infinite', component: InfiniteComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'snap', component: SnapComponent },
  { path: 'variable-size', component: VariablesizeComponent },
  { path: 'virtual', component: VirtualComponent },
  { path: 'prop', component: PropChangeComponent },
  { path: 'autoplay', component: AutoplayComponent },
  { path: 'fade', component: FadeComponent },
  { path: 'parallax', component: ParallaxComponent },
  { path: 'custom', component: CustomComponent },
  { path: 'visiblepanels', component: VisiblePanelsComponent },
  { path: 'arrow', component: ArrowComponent },
  { path: 'sync', component: SyncComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlignComponent,
    CustomComponent,
    BoundComponent,
    FreescrollComponent,
    GapComponent,
    InfiniteComponent,
    ProgressComponent,
    SnapComponent,
    VariablesizeComponent,
    VirtualComponent,
    PropChangeComponent,
    AutoplayComponent,
    FadeComponent,
    ParallaxComponent,
    TestPanelComponent,
    PlaceHolderItemComponent,
    VisiblePanelsComponent,
    ArrowComponent,
    PanelComponent,
    SyncComponent
  ],
  imports: [
    BrowserModule,
    NgxFlickingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
