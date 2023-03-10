/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import Flicking from '@egjs/flicking';

@Directive({
  selector: '[flicking-panel], [FlickingPanel]',
  standalone: true,
})
export class NgxFlickingPanel {
  private _rendered: boolean;

  public get nativeElement() {
    return this._host.nativeElement;
  }

  public get rendered() {
    return this._rendered;
  }

  public constructor(
    private _host: ElementRef<HTMLElement>,
    private _renderer: Renderer2
  ) {
    this._rendered = true;
  }

  public show(flicking: Flicking) {
    this._rendered = true;

    const el = this.nativeElement;
    const cameraEl = flicking.camera.element;

    if (el.parentElement !== cameraEl) {
      this._renderer.appendChild(cameraEl, el);
    }
  }

  public hide(flicking: Flicking) {
    this._rendered = false;

    const el = this.nativeElement;
    const cameraEl = flicking.camera.element;

    if (el.parentElement === cameraEl) {
      this._renderer.removeChild(cameraEl, el);
    }
  }
}
