import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxFlickingComponent } from "./ngx-flicking.component";
import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";

@NgModule({
  declarations: [NgxFlickingComponent, NgxFlickingPanel],
  imports: [CommonModule],
  exports: [NgxFlickingComponent, NgxFlickingPanel],
})
export class NgxFlickingModule { }
