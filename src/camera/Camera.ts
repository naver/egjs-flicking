/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import Panel from "~/core/Panel";
import * as ERROR from "~/const/error";
import { ALIGN, DIRECTION, EVENTS } from "~/const/external";
import { checkExistence, getFlickingAttached, includes, parseAlign } from "~/utils";

export interface CameraOptions {
  align: FlickingOptions["align"];
}

abstract class Camera {
  // Options
  protected _align: FlickingOptions["align"];

  // Internal states
  protected _flicking: Flicking | null;
  protected _el: HTMLElement;
  protected _transform: string;
  protected _position: number;
  protected _alignPos: number;
  protected _range: { min: number; max: number };
  protected _visiblePanels: Panel[];
  protected _needPanelTriggered: { prev: boolean; next: boolean };

  public constructor({
    align = ALIGN.PREV
  }: Partial<CameraOptions> = {}) {
    this._flicking = null;
    this._position = 0;
    this._alignPos = 0;
    this._range = { min: 0, max: 0 };
    this._visiblePanels = [];
    this._needPanelTriggered = { prev: false, next: false };

    // Options
    this._align = align;
  }

  public abstract updateRange(): this;

  public init(flicking: Flicking): this {
    this._flicking = flicking;

    const viewportEl = flicking.viewport.element;

    checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
    this._el = viewportEl.firstElementChild as HTMLElement;
    this._checkTranslateSupport();

    return this;
  }

  public destroy(): this {
    this._flicking = null;

    return this;
  }

  // Internal states getter
  public get element() { return this._el; }
  public get position() { return this._position; }
  public get alignPosition() { return this._alignPos; }
  public get range() { return this._range; }

  // Options Getter
  public get align() { return this._align; }

  // Options Setter
  public set align(val: FlickingOptions["align"]) {
    this._align = val;
  }

  public getPanelBelow(): Panel | null {
    const flicking = getFlickingAttached(this._flicking, "Camera");

    return flicking.renderer.getPanelFromPosition(this._position);
  }

  public lookAt(pos: number): this {
    this._position = pos;
    this._applyTransform();
    this._refreshVisiblePanels();
    this._checkNeedPanel();
    return this;
  }

  public updateAlignPos(): this {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const align = this._align;
    const size = flicking.viewport.size;

    const alignVal = typeof align === "object"
      ? (align as { hanger: string | number }).hanger
      : align;

    this._alignPos = parseAlign(alignVal, flicking.horizontal ? size.width : size.height);

    return this;
  }

  public resetNeedPanelHistory() {
    this._needPanelTriggered = { prev: false, next: false };
  }

  private _refreshVisiblePanels(): void {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const panels = flicking.renderer.getPanels();

    const newVisiblePanels = panels.filter(panel => panel.isVisible());
    const prevVisiblePanels = this._visiblePanels;

    const added: Panel[] = newVisiblePanels.filter(panel => !includes(prevVisiblePanels, panel));
    const removed: Panel[] = prevVisiblePanels.filter(panel => !includes(newVisiblePanels, panel));

    if (added.length > 0 || removed.length > 0) {
      flicking.trigger(EVENTS.VISIBLE_CHANGE, {
        added,
        removed,
        visiblePanels: newVisiblePanels
      });
    }

    this._visiblePanels = newVisiblePanels;
  }

  private _checkNeedPanel(): void {
    const needPanelTriggered = this._needPanelTriggered;

    if (needPanelTriggered.prev && needPanelTriggered.next) return;

    const flicking = getFlickingAttached(this._flicking, "Camera");
    const panels = flicking.renderer.getPanels();

    if (panels.length <= 0) {
      if (!needPanelTriggered.prev) {
        flicking.trigger(EVENTS.NEED_PANEL, { direction: DIRECTION.PREV });
        needPanelTriggered.prev = true;
      }
      if (!needPanelTriggered.next) {
        flicking.trigger(EVENTS.NEED_PANEL, { direction: DIRECTION.NEXT });
        needPanelTriggered.next = true;
      }

      return;
    }

    const viewportSize = flicking.viewport.size;
    const cameraPosition = this._position;
    const cameraSize = flicking.horizontal ? viewportSize.width : viewportSize.height;
    const cameraRange = this._range;
    const needPanelThreshold = flicking.needPanelThreshold;

    const cameraPrev = cameraPosition - this._alignPos;
    const cameraNext = cameraPrev + cameraSize;

    const firstPanel = panels[0];
    const lastPanel = panels[panels.length - 1];

    if (!needPanelTriggered.prev) {
      const firstPanelBbox = firstPanel.bbox;
      const firstPanelPrev = flicking.horizontal ? firstPanelBbox.left : firstPanelBbox.top;

      if (cameraPrev <= (firstPanelPrev + needPanelThreshold) || cameraPosition <= (cameraRange.min + needPanelThreshold)) {
        flicking.trigger(EVENTS.NEED_PANEL, { direction: DIRECTION.PREV });
        needPanelTriggered.prev = true;
      }
    }

    if (!needPanelTriggered.next) {
      const lastPanelBbox = lastPanel.bbox;
      const lastPanelNext = flicking.horizontal ? lastPanelBbox.right : lastPanelBbox.bottom;

      if (cameraNext >= (lastPanelNext - needPanelThreshold) || cameraPosition >= (cameraRange.max - needPanelThreshold)) {
        flicking.trigger(EVENTS.NEED_PANEL, { direction: DIRECTION.NEXT });
        needPanelTriggered.next = true;
      }
    }
  }

  private _applyTransform(): void {
    const el = this._el;

    el.style[this._transform] = `translate(${-(this._position - this._alignPos)}px)`;
  }

  private _checkTranslateSupport = () => {
    const transforms = ["webkitTransform", "msTransform", "MozTransform", "OTransform", "transform"];

    const supportedStyle = document.documentElement.style;
    let transformName = "";
    for (const prefixedTransform of transforms) {
      if (prefixedTransform in supportedStyle) {
        transformName = prefixedTransform;
      }
    }

    if (!transformName) {
      throw new FlickingError(ERROR.MESSAGE.TRANSFORM_NOT_SUPPORTED, ERROR.CODE.TRANSFORM_NOT_SUPPORTED);
    }

    this._transform = transformName;
  };
}

export default Camera;
