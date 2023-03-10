import { NgModule } from "@angular/core";

import { NgxFlickingComponent } from "./ngx-flicking.component";
import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";

@NgModule({
  imports: [NgxFlickingComponent, NgxFlickingPanel],
  exports: [NgxFlickingComponent, NgxFlickingPanel],
})
export class NgxFlickingModule {}
