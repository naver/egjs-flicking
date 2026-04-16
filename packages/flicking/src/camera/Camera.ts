/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";
import { ALIGN, CIRCULAR_FALLBACK, DIRECTION, ORDER } from "../constants/values";
import AnchorPoint from "../core/AnchorPoint";
import Panel from "../core/panel/Panel";
import * as ERROR from "../error/codes";
import FlickingError from "../error/FlickingError";
import { EVENTS } from "../event/names";
import Flicking, { FlickingOptions } from "../Flicking";
import { ValueOf } from "../types/internal";
import {
  checkExistence,
  find,
  getFlickingAttached,
  getProgress,
  getStyle,
  includes,
  parseAlign,
  toArray
} from "../utils";

import { BoundCameraMode, CameraMode, CircularCameraMode, LinearCameraMode } from "./mode";

export interface CameraOptions {
  align: FlickingOptions["align"];
}

/**
 * A range with minimum and maximum values
 */
export interface CameraRange {
  /** A minimum position */
  min: number;
  /** A maximum position */
  max: number;
}

/**
 * A component that manages actual movement inside the viewport
 * @public
 */
class Camera {
  // Options
  private _align: FlickingOptions["align"];

  // Internal states
  private _flicking: Flicking;
  private _mode: CameraMode;
  private _el: HTMLElement;
  private _transform: string;
  private _lookedOffset = 0;
  private _position: number;
  private _alignPos: number;
  private _offset: number;
  private _circularOffset: number;
  private _circularEnabled: boolean;
  private _range: CameraRange;
  private _visiblePanels: Panel[];
  private _anchors: AnchorPoint[];
  private _needPanelTriggered: { prev: boolean; next: boolean };
  private _panelOrder: ValueOf<typeof ORDER>;

  // Internal states getter
  /**
   * The camera element(`.flicking-camera`)
   * @readonly
   */
  public get element(): HTMLElement {
    return this._el;
  }
  /**
   * An array of the child elements of the camera element(`.flicking-camera`)
   * @readonly
   */
  public get children(): HTMLElement[] {
    return toArray(this._el.children) as HTMLElement[];
  }
  /**
   * Current position of the camera
   * @readonly
   */
  public get position(): number {
    return this._position;
  }
  /**
   * Align position inside the viewport where {@link Panel}'s {@link Panel.alignPosition | alignPosition} should be located at
   * @readonly
   */
  public get alignPosition(): number {
    return this._alignPos;
  }
  /**
   * Position offset, used for the {@link Flicking.renderOnlyVisible | renderOnlyVisible} option
   * @defaultValue 0
   * @readonly
   */
  public get offset(): number {
    return this._offset - this._circularOffset;
  }
  /**
   * Whether the `circular` option is enabled.
   * @remarks
   * The {@link Flicking.circular | circular} option can't be enabled when sum of the panel sizes are too small.
   * @defaultValue false
   * @readonly
   */
  public get circularEnabled(): boolean {
    return this._circularEnabled;
  }
  /**
   * A current camera mode
   * @readonly
   */
  public get mode(): CameraMode {
    return this._mode;
  }
  /**
   * A range that Camera's {@link Camera.position | position} can reach
   * @readonly
   */
  public get range(): CameraRange {
    return this._range;
  }
  /**
   * A difference between Camera's minimum and maximum position that can reach
   * @readonly
   */
  public get rangeDiff(): number {
    return this._range.max - this._range.min;
  }
  /**
   * An array of visible panels from the current position
   * @readonly
   */
  public get visiblePanels(): Panel[] {
    return this._visiblePanels;
  }
  /**
   * A range of the visible area from the current position
   * @readonly
   */
  public get visibleRange(): CameraRange {
    return { min: this._position - this._alignPos, max: this._position - this._alignPos + this.size };
  }
  /**
   * An array of {@link AnchorPoint}s that Camera can be stopped at
   * @readonly
   */
  public get anchorPoints(): AnchorPoint[] {
    return this._anchors;
  }
  /**
   * A current parameters of the Camera for updating {@link AxesController}
   * @readonly
   */
  public get controlParams(): { range: CameraRange; position: number; circular: boolean } {
    return { range: this._range, position: this._position, circular: this._circularEnabled };
  }
  /**
   * A Boolean value indicating whether Camera's over the minimum or maximum position reachable
   * @readonly
   */
  public get atEdge(): boolean {
    return this._position <= this._range.min || this._position >= this._range.max;
  }
  /**
   * Return the size of the viewport
   * @readonly
   */
  public get size(): number {
    const flicking = this._flicking;
    return flicking ? (flicking.horizontal ? flicking.viewport.width : flicking.viewport.height) : 0;
  }

  /**
   * Return the camera's position progress from the first panel to last panel
   * @remarks
   * Range is from 0 to last panel's index
   * @readonly
   */
  public get progress(): number {
    const flicking = this._flicking;
    const position = this._position + this._offset;
    const nearestAnchor = this.findNearestAnchor(this._position);

    if (!flicking || !nearestAnchor) {
      return NaN;
    }

    const nearestPanel = nearestAnchor.panel;
    const panelPos = nearestPanel.position + nearestPanel.offset;
    const bounceSize = flicking.control.controller.bounce!;

    const { min: prevRange, max: nextRange } = this.range;
    const rangeDiff = this.rangeDiff;

    if (position === panelPos) {
      return nearestPanel.index;
    }

    if (position < panelPos) {
      const prevPanel = nearestPanel.prev();
      let prevPosition = prevPanel ? prevPanel.position + prevPanel.offset : prevRange - bounceSize[0];

      // Looped
      if (prevPosition > panelPos) {
        prevPosition -= rangeDiff;
      }

      return nearestPanel.index - 1 + getProgress(position, prevPosition, panelPos);
    } else {
      const nextPanel = nearestPanel.next();
      let nextPosition = nextPanel ? nextPanel.position + nextPanel.offset : nextRange + bounceSize[1];

      // Looped
      if (nextPosition < panelPos) {
        nextPosition += rangeDiff;
      }

      return nearestPanel.index + getProgress(position, panelPos, nextPosition);
    }
  }

  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/direction | direction} CSS property applied to the camera element(`.flicking-camera`)
   * @readonly
   */
  public get panelOrder(): ValueOf<typeof ORDER> {
    return this._panelOrder;
  }

  // Options Getter
  /**
   * A value indicating where the {@link Camera.alignPosition | alignPosition} should be located at inside the viewport element
   */
  public get align(): FlickingOptions["align"] {
    return this._align;
  }

  // Options Setter
  public set align(val: FlickingOptions["align"]) {
    this._align = val;
  }

  /**
   * Creates a new Camera instance
   * @param flicking - An instance of {@link Flicking}
   * @param options - Options for the Camera
   */
  public constructor(flicking: Flicking, { align = ALIGN.CENTER }: Partial<CameraOptions> = {}) {
    this._flicking = flicking;
    this._resetInternalValues();

    // Options
    this._align = align;
  }

  /**
   * Initialize Camera
   * @remarks
   * This method is called automatically during {@link Flicking.init}. It finds the camera element inside the viewport.
   * @throws {@link InitializationErrors}
   * @returns The current instance for method chaining
   */
  public init(): this {
    const viewportEl = this._flicking.viewport.element;

    checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
    this._el = viewportEl.firstElementChild as HTMLElement;
    this._checkTranslateSupport();

    this._updateMode();
    this.updatePanelOrder();

    return this;
  }

  /**
   * Destroy Camera and return to initial state
   * @remarks
   * This method resets all internal values to their initial state.
   * @returns The current instance for method chaining
   */
  public destroy(): this {
    this._resetInternalValues();
    return this;
  }

  /**
   * Move to the given position and apply CSS transform
   * @remarks
   * This method updates the camera position, toggles panels for circular mode, and refreshes visible panels.
   * @param pos - A new position
   * @throws {@link InitializationErrors}
   */
  public lookAt(pos: number): void {
    const prevOffset = this._offset;
    const isChangedOffset = this._lookedOffset !== prevOffset;
    const flicking = getFlickingAttached(this._flicking);
    const prevPos = this._position;

    this._position = pos;
    const toggled = this._togglePanels(prevPos, pos);
    this._refreshVisiblePanels();
    this._checkNeedPanel();
    this._checkReachEnd(prevPos, pos);

    if (toggled) {
      void flicking.renderer.render().then(() => {
        this.updateOffset();
        this._lookedOffset = this._offset;
      });
    } else if (isChangedOffset) {
      // sync offset for renderOnlyVisible on resize
      this.updateOffset();
      this._lookedOffset = this._offset;
    } else {
      this.applyTransform();
    }
  }

  /**
   * Return a previous {@link AnchorPoint} of given {@link AnchorPoint}
   * @remarks
   * If it does not exist, return `null` instead
   * @param anchor - A reference {@link AnchorPoint}
   * @returns The previous {@link AnchorPoint}
   */
  public getPrevAnchor(anchor: AnchorPoint): AnchorPoint | null {
    if (!this._circularEnabled || anchor.index !== 0) {
      return this._anchors[anchor.index - 1] || null;
    } else {
      const anchors = this._anchors;
      const rangeDiff = this.rangeDiff;
      const lastAnchor = anchors[anchors.length - 1];

      return new AnchorPoint({
        index: lastAnchor.index,
        position: lastAnchor.position - rangeDiff,
        panel: lastAnchor.panel
      });
    }
  }

  /**
   * Return a next {@link AnchorPoint} of given {@link AnchorPoint}
   * @remarks
   * If it does not exist, return `null` instead
   * @param anchor - A reference {@link AnchorPoint}
   * @returns The next {@link AnchorPoint}
   */
  public getNextAnchor(anchor: AnchorPoint): AnchorPoint | null {
    const anchors = this._anchors;

    if (!this._circularEnabled || anchor.index !== anchors.length - 1) {
      return anchors[anchor.index + 1] || null;
    } else {
      const rangeDiff = this.rangeDiff;
      const firstAnchor = anchors[0];

      return new AnchorPoint({
        index: firstAnchor.index,
        position: firstAnchor.position + rangeDiff,
        panel: firstAnchor.panel
      });
    }
  }

  /**
   * Return the camera's position progress in the panel below
   * @remarks
   * Value is from 0 to 1 when the camera's inside panel.
   * Value can be lower than 0 or bigger than 1 when it's in the margin area
   * @param panel - A panel to check
   * @returns Progress value from 0 to 1 (or outside this range when in margin area)
   */
  public getProgressInPanel(panel: Panel): number {
    const panelRange = panel.range;

    return (this._position - panelRange.min) / (panelRange.max - panelRange.min);
  }

  /**
   * Return {@link AnchorPoint} that includes given position
   * @remarks
   * If there's no {@link AnchorPoint} that includes the given position, return `null` instead
   * @param position - A position to check
   * @returns The {@link AnchorPoint} that includes the given position
   */
  public findAnchorIncludePosition(position: number): AnchorPoint | null {
    return this._mode.findAnchorIncludePosition(position);
  }

  /**
   * Return {@link AnchorPoint} nearest to given position
   * @remarks
   * If there're no {@link AnchorPoint}s, return `null` instead
   * @param position - A position to check
   * @returns The {@link AnchorPoint} nearest to the given position
   */
  public findNearestAnchor(position: number): AnchorPoint | null {
    return this._mode.findNearestAnchor(position);
  }

  /**
   * Return {@link AnchorPoint} that matches {@link Flicking.currentPanel}
   * @returns The {@link AnchorPoint} that matches current panel
   */
  public findActiveAnchor(): AnchorPoint | null {
    const flicking = getFlickingAttached(this._flicking);
    const activePanel = flicking.control.activePanel;

    if (!activePanel) return null;

    return (
      find(this._anchors, anchor => anchor.panel.index === activePanel.index) ??
      this.findNearestAnchor(activePanel.position)
    );
  }

  /**
   * Clamp the given position between camera's range
   * @param position - A position to clamp
   * @returns A clamped position
   */
  public clampToReachablePosition(position: number): number {
    return this._mode.clampToReachablePosition(position);
  }

  /**
   * Check whether the given panel is inside of the Camera's range
   * @param panel - An instance of {@link Panel} to check
   * @returns Whether the panel's inside Camera's range
   */
  public canReach(panel: Panel): boolean {
    return this._mode.canReach(panel);
  }

  /**
   * Check whether the given panel element is visible at the current position
   * @param panel - An instance of {@link Panel} to check
   * @returns Whether the panel element is visible at the current position
   */
  public canSee(panel: Panel): boolean {
    return this._mode.canSee(panel);
  }

  /**
   * Update {@link Camera.range | range} of Camera
   * @remarks
   * This method recalculates the camera range based on the current panel positions and circular mode settings.
   * @throws {@link InitializationErrors}
   * @returns The current instance for method chaining
   */
  public updateRange(): this {
    const flicking = getFlickingAttached(this._flicking);
    const renderer = flicking.renderer;
    const panels = renderer.panels;

    this._updateMode();
    this._range = this._mode.getRange();

    panels.forEach(panel => panel.updateCircularToggleDirection());

    return this;
  }

  /**
   * Update Camera's {@link Camera.alignPosition | alignPosition}
   * @returns The current instance for method chaining
   */
  public updateAlignPos(): this {
    const align = this._align;

    const alignVal = typeof align === "object" ? (align as { camera: string | number }).camera : align;

    this._alignPos = parseAlign(alignVal, this.size);

    return this;
  }

  /**
   * Update Camera's {@link Camera.anchorPoints | anchorPoints}
   * @remarks
   * Anchor points are positions where the camera can stop. This method recalculates them based on the current mode.
   * @throws {@link InitializationErrors}
   * @returns The current instance for method chaining
   */
  public updateAnchors(): this {
    this._anchors = this._mode.getAnchors();

    return this;
  }

  /**
   * Update Viewport's height to visible panel's max height
   * @remarks
   * This method only takes effect when {@link FlickingOptions.horizontal | horizontal} is `true` and {@link FlickingOptions.adaptive | adaptive} is enabled.
   * @throws {@link InitializationErrors}
   */
  public updateAdaptiveHeight(): void {
    const flicking = getFlickingAttached(this._flicking);
    const activePanel = flicking.control.activePanel;
    const visiblePanels = flicking.visiblePanels;

    const selectedPanels = [...visiblePanels];

    if (activePanel) {
      selectedPanels.push(activePanel);
    }

    if (!flicking.horizontal || !flicking.adaptive || !selectedPanels.length) return;

    const maxHeight = Math.max(...selectedPanels.map(panel => panel.height));

    flicking.viewport.setSize({
      height: maxHeight
    });
  }

  /**
   * Update current offset of the camera
   * @returns The current instance for method chaining
   */
  public updateOffset(): this {
    const flicking = getFlickingAttached(this._flicking);
    const position = this._position;
    const unRenderedPanels = flicking.panels.filter(panel => !panel.rendered);

    this._offset = unRenderedPanels
      .filter(panel => panel.position + panel.offset < position)
      .reduce((offset, panel) => offset + panel.sizeIncludingMargin, 0);

    this._circularOffset = this._mode.getCircularOffset();

    this.applyTransform();

    return this;
  }

  /**
   * Update direction to match the {@link https://developer.mozilla.org/en-US/docs/Web/CSS/direction | direction} CSS property applied to the camera element
   * @returns The current instance for method chaining
   */
  public updatePanelOrder(): this {
    const flicking = getFlickingAttached(this._flicking);

    if (!flicking.horizontal) return this;

    const el = this._el;
    const direction = getStyle(el).direction;
    if (direction !== this._panelOrder) {
      this._panelOrder = direction === ORDER.RTL ? ORDER.RTL : ORDER.LTR;
      if (flicking.initialized) {
        flicking.control.controller.updateDirection();
      }
    }

    return this;
  }

  /**
   * Reset the history of {@link Flicking.event:needPanel | needPanel} events so it can be triggered again
   * @returns The current instance for method chaining
   */
  public resetNeedPanelHistory(): this {
    this._needPanelTriggered = { prev: false, next: false };
    return this;
  }

  /**
   * Apply "transform" style with the current position to camera element
   * @returns The current instance for method chaining
   */
  public applyTransform(): this {
    const el = this._el;
    const flicking = getFlickingAttached(this._flicking);
    const renderer = flicking.renderer;

    if (renderer.rendering || !flicking.initialized) return this;

    const actualPosition = this._position - this._alignPos - this._offset + this._circularOffset;

    el.style[this._transform] = flicking.horizontal
      ? `translate(${this._panelOrder === ORDER.RTL ? actualPosition : -actualPosition}px)`
      : `translate(0, ${-actualPosition}px)`;

    return this;
  }

  /**
   * @internal
   * @privateRemarks
   * Resets all internal state values to their defaults. Called during construction and destruction.
   */
  private _resetInternalValues() {
    this._position = 0;
    this._lookedOffset = 0;
    this._alignPos = 0;
    this._offset = 0;
    this._circularOffset = 0;
    this._circularEnabled = false;
    this._range = { min: 0, max: 0 };
    this._visiblePanels = [];
    this._anchors = [];
    this._needPanelTriggered = { prev: false, next: false };
  }

  /**
   * @internal
   * @privateRemarks
   * Updates the list of visible panels and triggers {@link VisibleChangeEvent} if panels were added or removed.
   */
  private _refreshVisiblePanels() {
    const flicking = getFlickingAttached(this._flicking);
    const panels = flicking.renderer.panels;

    const newVisiblePanels = panels.filter(panel => this.canSee(panel));
    const prevVisiblePanels = this._visiblePanels;
    this._visiblePanels = newVisiblePanels;

    const added: Panel[] = newVisiblePanels.filter(panel => !includes(prevVisiblePanels, panel));
    const removed: Panel[] = prevVisiblePanels.filter(panel => !includes(newVisiblePanels, panel));

    if (added.length > 0 || removed.length > 0) {
      void flicking.renderer.render().then(() => {
        flicking.trigger(
          new ComponentEvent(EVENTS.VISIBLE_CHANGE, {
            added,
            removed,
            visiblePanels: newVisiblePanels
          })
        );
      });
    }
  }

  /**
   * @internal
   * @privateRemarks
   * Checks if the camera is near the edges and triggers {@link NeedPanelEvent} for infinite scrolling implementations.
   */
  private _checkNeedPanel(): void {
    const needPanelTriggered = this._needPanelTriggered;

    if (needPanelTriggered.prev && needPanelTriggered.next) return;

    const flicking = getFlickingAttached(this._flicking);
    const panels = flicking.renderer.panels;

    if (panels.length <= 0) {
      if (!needPanelTriggered.prev) {
        flicking.trigger(new ComponentEvent(EVENTS.NEED_PANEL, { direction: DIRECTION.PREV }));
        needPanelTriggered.prev = true;
      }
      if (!needPanelTriggered.next) {
        flicking.trigger(new ComponentEvent(EVENTS.NEED_PANEL, { direction: DIRECTION.NEXT }));
        needPanelTriggered.next = true;
      }

      return;
    }

    const cameraPosition = this._position;
    const cameraSize = this.size;
    const cameraRange = this._range;
    const needPanelThreshold = flicking.needPanelThreshold;

    const cameraPrev = cameraPosition - this._alignPos;
    const cameraNext = cameraPrev + cameraSize;

    const firstPanel = panels[0];
    const lastPanel = panels[panels.length - 1];

    if (!needPanelTriggered.prev) {
      const firstPanelPrev = firstPanel.range.min;

      if (cameraPrev <= firstPanelPrev + needPanelThreshold || cameraPosition <= cameraRange.min + needPanelThreshold) {
        flicking.trigger(new ComponentEvent(EVENTS.NEED_PANEL, { direction: DIRECTION.PREV }));
        needPanelTriggered.prev = true;
      }
    }

    if (!needPanelTriggered.next) {
      const lastPanelNext = lastPanel.range.max;

      if (cameraNext >= lastPanelNext - needPanelThreshold || cameraPosition >= cameraRange.max - needPanelThreshold) {
        flicking.trigger(new ComponentEvent(EVENTS.NEED_PANEL, { direction: DIRECTION.NEXT }));
        needPanelTriggered.next = true;
      }
    }
  }

  /**
   * @internal
   * @privateRemarks
   * Checks if the camera has reached the edge of the range and triggers {@link ReachEdgeEvent}.
   */
  private _checkReachEnd(prevPos: number, newPos: number): void {
    const flicking = getFlickingAttached(this._flicking);
    const range = this._range;

    const wasBetweenRange = prevPos > range.min && prevPos < range.max;
    const isBetweenRange = newPos > range.min && newPos < range.max;

    if (!wasBetweenRange || isBetweenRange) return;

    const direction = newPos <= range.min ? DIRECTION.PREV : DIRECTION.NEXT;

    flicking.trigger(
      new ComponentEvent(EVENTS.REACH_EDGE, {
        direction
      })
    );
  }

  /**
   * @internal
   * @privateRemarks
   * Checks for CSS transform support and stores the vendor-prefixed property name. Throws if transforms are not supported.
   */
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

  /**
   * @internal
   * @privateRemarks
   * Updates the camera mode based on {@link FlickingOptions.circular | circular} and {@link FlickingOptions.bound | bound} options.
   */
  private _updateMode() {
    const flicking = getFlickingAttached(this._flicking);

    if (flicking.circular) {
      const circularMode = new CircularCameraMode(flicking);
      const canSetCircularMode = circularMode.checkAvailability();

      if (canSetCircularMode) {
        this._mode = circularMode;
      } else {
        const fallbackMode = flicking.circularFallback;

        this._mode =
          fallbackMode === CIRCULAR_FALLBACK.BOUND ? new BoundCameraMode(flicking) : new LinearCameraMode(flicking);
      }

      this._circularEnabled = canSetCircularMode;
    } else {
      this._mode = flicking.bound ? new BoundCameraMode(flicking) : new LinearCameraMode(flicking);
      this._circularEnabled = false;
    }
  }

  /**
   * @internal
   * @privateRemarks
   * Toggles panel positions for circular mode. Returns true if any panel was toggled.
   */
  private _togglePanels(prevPos: number, pos: number): boolean {
    if (pos === prevPos) return false;

    const flicking = getFlickingAttached(this._flicking);
    const panels = flicking.renderer.panels;
    const toggled = panels.map(panel => panel.toggle(prevPos, pos));

    return toggled.some(isToggled => isToggled);
  }
}

export default Camera;
