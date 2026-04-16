import Flicking, { FlickingError } from "@egjs/flicking";

import { BROWSER } from "../../event";
import Pagination from "../Pagination";

export interface RendererOptions {
  flicking: Flicking;
  pagination: Pagination;
  wrapper: HTMLElement;
}

abstract class Renderer {
  protected _flicking: Flicking;
  protected _pagination: Pagination;
  protected _wrapper: HTMLElement;

  public constructor(options: RendererOptions) {
    const { flicking, pagination, wrapper } = options;

    this._flicking = flicking;
    this._pagination = pagination;
    this._wrapper = wrapper;
  }

  public abstract destroy(): void;
  public abstract render(): void;
  public abstract update(index: number): void;

  protected _createBulletFromString(html: string, index: number) {
    const range = document.createRange();
    const frag = range.createContextualFragment(html);
    const bullet = frag.firstChild as HTMLElement;

    this._addBulletEvents(bullet, index);

    return bullet;
  }

  protected _addBulletEvents(bullet: HTMLElement, index: number) {
    const anchorPoints = this._flicking.camera.anchorPoints;
    const panelIndex = anchorPoints[index].panel.index;

    bullet.addEventListener(BROWSER.MOUSE_DOWN, e => {
      e.stopPropagation();
    });

    bullet.addEventListener(
      BROWSER.TOUCH_START,
      e => {
        e.stopPropagation();
      },
      { passive: true }
    );

    bullet.addEventListener(BROWSER.CLICK, () => {
      this._flicking.moveTo(panelIndex).catch(err => {
        if (err instanceof FlickingError) return;
        throw err;
      });
    });
  }
}

export default Renderer;
