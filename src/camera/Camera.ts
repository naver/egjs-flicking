/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import Panel from "~/core/Panel";
import * as ERROR from "~/const/error";
import { ALIGN, DIRECTION, EVENTS } from "~/const/external";
import { checkExistence, clamp, getFlickingAttached, includes, parseAlign } from "~/utils";

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

  // Internal states getter
  public get element() { return this._el; }
  public get position() { return this._position; }
  public get alignPosition() { return this._alignPos; }
  public get range() { return this._range; }
  public get visiblePanels() { return this._visiblePanels; }

  // Options Getter
  public get align() { return this._align; }

  // Options Setter
  public set align(val: FlickingOptions["align"]) {
    this._align = val;
  }

  public constructor({
    align = ALIGN.CENTER
  }: Partial<CameraOptions> = {}) {
    this._resetInternalValues();

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
    this._resetInternalValues();
    return this;
  }

  public getVisibleRange(): { min: number; max: number } {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const viewport = flicking.viewport;

    const bboxPrev = this._position - this._alignPos;
    return {
      min: bboxPrev,
      max: bboxPrev + (flicking.horizontal ? viewport.width : viewport.height)
    };
  }

  public getPanelBelow(): Panel | null {
    const flicking = getFlickingAttached(this._flicking, "Camera");

    return flicking.renderer.getPanelFromPosition(this._position);
  }

  public getControlParameters() {
    return {
      range: this._range,
      position: this._position,
      circular: false
    };
  }

  public lookAt(pos: number): this {
    const prevPos = this._position;

    this._position = pos;
    this._refreshVisiblePanels();
    this._checkNeedPanel();
    this._checkReachEnd(prevPos, pos);
    this._applyTransform();

    return this;
  }

  public clampToReachablePosition(position: number): number {
    const range = this._range;
    return clamp(position, range.min, range.max);
  }

  public updateAlignPos(): this {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const align = this._align;
    const viewport = flicking.viewport;

    const alignVal = typeof align === "object"
      ? (align as { camera: string | number }).camera
      : align;

    this._alignPos = parseAlign(alignVal, flicking.horizontal ? viewport.width : viewport.height);

    return this;
  }

  public resetNeedPanelHistory() {
    this._needPanelTriggered = { prev: false, next: false };
  }

  protected _resetInternalValues() {
    this._flicking = null;
    this._position = 0;
    this._alignPos = 0;
    this._range = { min: 0, max: 0 };
    this._visiblePanels = [];
    this._needPanelTriggered = { prev: false, next: false };
  }

  protected _refreshVisiblePanels() {
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

  protected _checkNeedPanel(): void {
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

    const viewport = flicking.viewport;
    const cameraPosition = this._position;
    const cameraSize = flicking.horizontal ? viewport.width : viewport.height;
    const cameraRange = this._range;
    const needPanelThreshold = flicking.needPanelThreshold;

    const cameraPrev = cameraPosition - this._alignPos;
    const cameraNext = cameraPrev + cameraSize;

    const firstPanel = panels[0];
    const lastPanel = panels[panels.length - 1];

    if (!needPanelTriggered.prev) {
      const firstPanelPrev = firstPanel.range.min;

      if (cameraPrev <= (firstPanelPrev + needPanelThreshold) || cameraPosition <= (cameraRange.min + needPanelThreshold)) {
        flicking.trigger(EVENTS.NEED_PANEL, { direction: DIRECTION.PREV });
        needPanelTriggered.prev = true;
      }
    }

    if (!needPanelTriggered.next) {
      const lastPanelNext = lastPanel.range.max;

      if (cameraNext >= (lastPanelNext - needPanelThreshold) || cameraPosition >= (cameraRange.max - needPanelThreshold)) {
        flicking.trigger(EVENTS.NEED_PANEL, { direction: DIRECTION.NEXT });
        needPanelTriggered.next = true;
      }
    }
  }

  protected _checkReachEnd(prevPos: number, newPos: number): void {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const range = this._range;

    const wasBetweenRange = prevPos > range.min && prevPos < range.max;
    const isBetweenRange = newPos > range.min && newPos < range.max;

    if (!wasBetweenRange || isBetweenRange) return;

    const direction = newPos <= range.min ? DIRECTION.PREV : DIRECTION.NEXT;

    flicking.trigger(EVENTS.REACH_EDGE, {
      direction
    });
  }

  protected _applyTransform(): void {
    const el = this._el;
    const flicking = getFlickingAttached(this._flicking, "Camera");

    el.style[this._transform] = flicking.horizontal
      ? `translate(${-(this._position - this._alignPos)}px)`
      : `translate(0, ${-(this._position - this._alignPos)}px)`;
  }

  protected _checkTranslateSupport = () => {
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
