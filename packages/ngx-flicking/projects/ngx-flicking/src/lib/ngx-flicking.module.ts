import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxFlickingComponent } from "./ngx-flicking.component";

@NgModule({
  declarations: [NgxFlickingComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxFlickingComponent]
})
export class NgxFlickingModule { }
