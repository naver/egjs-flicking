import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[flicking-panel], [FlickingPanel]"
})
export class NgxFlickingPanel {
  public get element() { return this._elementref.nativeElement; }
  private _visible: boolean;

  public get visible() { return this._visible; }

  public constructor(private _elementref: ElementRef) {
    this._visible = true;
  }

  public show() {
    this._visible = true;
  }

  public hide() {
    this._visible = false;
  }
}
