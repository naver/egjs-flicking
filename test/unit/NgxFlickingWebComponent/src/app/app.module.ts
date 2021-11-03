import { DoBootstrap, Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { createCustomElement } from "@angular/elements";

import { NgxFlickingModule } from "./ngx-flicking.module";
import { NgxFlickingComponent } from "./ngx-flicking.component";

@NgModule({
  imports: [
    BrowserModule,
    NgxFlickingModule
  ],
  providers: []
})
export class NgxFlickingWebComponentModule implements DoBootstrap {
  public constructor(private _injector: Injector) {}

  public ngDoBootstrap() {
    const customEl = createCustomElement(NgxFlickingComponent, { injector: this._injector });
    customElements.define("ngx-flicking", customEl);
  }
}
