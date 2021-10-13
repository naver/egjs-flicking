/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ElementProvider from "./ElementProvider";

/**
 * @internal
 */
class VanillaElementProvider implements ElementProvider {
  private _element: HTMLElement;

  public get element() { return this._element; }

  public constructor(element: HTMLElement) {
    this._element = element;
  }

  public show(): void {
    const el = this.element;

    if (el.style.display) {
      el.style.display = "";
    }
  }

  public hide(): void {
    const el = this.element;

    el.style.display = "none";
  }
}

export default VanillaElementProvider;
