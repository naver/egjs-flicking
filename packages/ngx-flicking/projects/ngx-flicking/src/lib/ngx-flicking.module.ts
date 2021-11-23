import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxFlickingComponent } from "./ngx-flicking.component";
import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";
import { NgxFlickingService } from "./ngx-flicking.service";

@NgModule({
  declarations: [NgxFlickingComponent, NgxFlickingPanel],
  imports: [CommonModule],
  exports: [NgxFlickingComponent, NgxFlickingPanel],
  providers: [NgxFlickingService]
})
export class NgxFlickingModule { }
