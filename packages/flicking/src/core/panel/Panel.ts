/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { ALIGN, DIRECTION } from "../../constants/values";
import Flicking from "../../Flicking";
import { LiteralUnion, ValueOf } from "../../types/internal";
import { SetSizeParams } from "../../types/params";
import { getElementSize, getProgress, getStyle, parseAlign, setSize } from "../../utils";

import ElementProvider from "./provider/ElementProvider";

export interface PanelOptions {
  /** An initial index of the panel */
  index: number;
  /** An initial {@link Flicking.align | align} value of the panel */
  align: LiteralUnion<ValueOf<typeof ALIGN>> | number;
  /** The Flicking instance that this panel belongs to */
  flicking: Flicking;
  /** A provider instance that returns the actual html element */
  elementProvider: ElementProvider;
}

export interface PanelMarginInfo {
  /** CSS `margin-left` when the {@link Flicking.horizontal | horizontal} is `true`, and `margin-top` else */
  prev: number;
  /** CSS `margin-right` when the {@link Flicking.horizontal | horizontal} is `true`, and `margin-bottom` else */
  next: number;
}

export interface PanelBoundingBoxRange {
  /** Bounding box's left({@link Flicking.horizontal | horizontal}: true) / top({@link Flicking.horizontal | horizontal}: false) */
  min: number;
  /** Bounding box's right({@link Flicking.horizontal | horizontal}: true) / bottom({@link Flicking.horizontal | horizontal}: false) */
  max: number;
}

/**
 * A slide data component that holds information of a single HTMLElement
 * @public
 */
class Panel {
  // Internal States
  protected _flicking: Flicking;
  protected _elProvider: ElementProvider;
  protected _index: number;
  protected _pos: number;
  protected _size: number;
  protected _height: number;
  protected _margin: PanelMarginInfo;
  protected _alignPos: number; // Actual align pos
  protected _rendered: boolean;
  protected _removed: boolean;
  protected _loading: boolean;
  protected _toggleDirection: ValueOf<typeof DIRECTION>;
  protected _toggled: boolean;
  protected _togglePosition: number;

  // Options
  protected _align: PanelOptions["align"];

  // Internal States Getter
  /**
   * `HTMLElement` that panel's referencing
   * @readonly
   */
  public get element(): HTMLElement {
    return this._elProvider.element;
  }
  /**
   * @internal
   * @readonly
   */
  public get elementProvider(): ElementProvider {
    return this._elProvider;
  }
  /**
   * Index of the panel
   * @readonly
   */
  public get index(): number {
    return this._index;
  }
  /**
   * Position of the panel, including {@link Panel.alignPosition | alignPosition}
   * @readonly
   */
  public get position(): number {
    return this._pos + this._alignPos;
  }
  /**
   * Cached size of the panel element
   * @remarks
   * This is equal to {@link Panel.element | element}'s `offsetWidth` if {@link Flicking.horizontal | horizontal} is `true`, and `offsetHeight` else
   * @readonly
   */
  public get size(): number {
    return this._size;
  }
  /**
   * Panel's size including CSS `margin`
   * @remarks
   * This value includes {@link Panel.element | element}'s margin left/right if {@link Flicking.horizontal | horizontal} is `true`, and margin top/bottom else
   * @readonly
   */
  public get sizeIncludingMargin(): number {
    return this._size + this._margin.prev + this._margin.next;
  }
  /**
   * Height of the panel element
   * @readonly
   */
  public get height(): number {
    return this._height;
  }
  /**
   * Cached CSS `margin` value of the panel element
   * @readonly
   */
  public get margin(): PanelMarginInfo {
    return this._margin;
  }
  /**
   * Align position inside the panel where {@link Camera}'s {@link Camera.alignPosition | alignPosition} inside viewport should be located at
   * @readonly
   */
  public get alignPosition(): number {
    return this._alignPos;
  }
  /**
   * A value indicating whether the panel's {@link Flicking.remove | remove}d
   * @readonly
   */
  public get removed(): boolean {
    return this._removed;
  }
  /**
   * A value indicating whether the panel's element is being rendered on the screen
   * @readonly
   */
  public get rendered(): boolean {
    return this._rendered;
  }
  /**
   * A value indicating whether the panel's image/video is not loaded and waiting for resize
   * @readonly
   */
  public get loading(): boolean {
    return this._loading;
  }
  /**
   * Panel element's range of the bounding box
   * @readonly
   */
  public get range(): PanelBoundingBoxRange {
    return { min: this._pos, max: this._pos + this._size };
  }
  /**
   * A value indicating whether the panel's position is toggled by circular behavior
   * @readonly
   */
  public get toggled(): boolean {
    return this._toggled;
  }
  /**
   * A direction where the panel's position is toggled
   * @readonly
   */
  public get toggleDirection(): ValueOf<typeof DIRECTION> {
    return this._toggleDirection;
  }
  /**
   * Actual position offset determined by {@link Panel.order}
   * @readonly
   */
  public get offset(): number {
    const toggleDirection = this._toggleDirection;
    const cameraRangeDiff = this._flicking.camera.rangeDiff;

    return toggleDirection === DIRECTION.NONE || !this._toggled
      ? 0
      : toggleDirection === DIRECTION.PREV
        ? -cameraRangeDiff
        : cameraRangeDiff;
  }

  /**
   * Progress of movement between previous or next panel relative to current panel
   * @readonly
   */
  public get progress(): number {
    const flicking = this._flicking;

    return this.index - flicking.camera.progress;
  }

  /**
   * Progress of movement between points that panel is completely invisible outside of viewport(prev direction: -1, selected point: 0, next direction: 1)
   * @readonly
   */
  public get outsetProgress(): number {
    const position = this.position + this.offset;
    const alignPosition = this._alignPos;
    const camera = this._flicking.camera;
    const camPos = camera.position;

    if (camPos === position) {
      return 0;
    }

    if (camPos < position) {
      const disappearPosNext = position + (camera.size - camera.alignPosition) + alignPosition;

      return -getProgress(camPos, position, disappearPosNext);
    } else {
      const disappearPosPrev = position - (camera.alignPosition + this._size - alignPosition);

      return 1 - getProgress(camPos, disappearPosPrev, position);
    }
  }

  /**
   * Percentage of area where panel is visible in the viewport
   * @readonly
   */
  public get visibleRatio(): number {
    const range = this.range;
    const size = this._size;
    const offset = this.offset;
    const visibleRange = this._flicking.camera.visibleRange;

    const checkingRange = {
      min: range.min + offset,
      max: range.max + offset
    };

    if (checkingRange.max <= visibleRange.min || checkingRange.min >= visibleRange.max) {
      return 0;
    }

    let visibleSize = size;

    if (visibleRange.min > checkingRange.min) {
      visibleSize -= visibleRange.min - checkingRange.min;
    }
    if (visibleRange.max < checkingRange.max) {
      visibleSize -= checkingRange.max - visibleRange.max;
    }

    return visibleSize / size;
  }

  public set loading(val: boolean) {
    this._loading = val;
  }

  // Options Getter
  /**
   * A value indicating where the {@link Panel.alignPosition | alignPosition} should be located at inside the panel element
   */
  public get align(): PanelOptions["align"] {
    return this._align;
  }

  // Options Setter
  public set align(val: PanelOptions["align"]) {
    this._align = val;
    this._updateAlignPos();
  }

  /**
   * Creates a new Panel instance
   * @param panelOptions - Options for creating the panel
   */
  public constructor(panelOptions: PanelOptions) {
    const { index, align, flicking, elementProvider } = panelOptions;

    this._index = index;
    this._flicking = flicking;
    this._elProvider = elementProvider;

    this._align = align;

    this._removed = false;
    this._rendered = true;
    this._loading = false;
    this._resetInternalStates();
  }

  /**
   * @internal
   * @privateRemarks
   * Marks this panel to be rendered on the camera element.
   */
  public markForShow() {
    this._rendered = true;
    this._elProvider.show(this._flicking);
  }

  /**
   * @internal
   * @privateRemarks
   * Marks this panel to be hidden from the camera element.
   */
  public markForHide() {
    this._rendered = false;
    this._elProvider.hide(this._flicking);
  }

  /**
   * Update size of the panel
   * @remarks
   * This method recalculates the panel's size, margin, and position based on the current DOM state.
   * @param cached - Predefined cached size of the panel
   * @returns The current instance for method chaining
   */
  public resize(cached?: { size: number; height?: number; margin: { prev: number; next: number } }): this {
    const el = this.element;
    const flicking = this._flicking;
    const { horizontal, useFractionalSize } = flicking;

    if (!el) {
      return this;
    }

    if (cached) {
      this._size = cached.size;
      this._margin = { ...cached.margin };
      this._height =
        cached.height ??
        getElementSize({
          el,
          horizontal: false,
          useFractionalSize,
          useOffset: true,
          style: getStyle(el)
        });
    } else {
      const elStyle = getStyle(el);

      this._size = getElementSize({
        el,
        horizontal,
        useFractionalSize,
        useOffset: true,
        style: elStyle
      });

      this._margin = horizontal
        ? {
            prev: parseFloat(elStyle.marginLeft || "0"),
            next: parseFloat(elStyle.marginRight || "0")
          }
        : {
            prev: parseFloat(elStyle.marginTop || "0"),
            next: parseFloat(elStyle.marginBottom || "0")
          };

      this._height = horizontal
        ? getElementSize({
            el,
            horizontal: false,
            useFractionalSize,
            useOffset: true,
            style: elStyle
          })
        : this._size;
    }

    this.updatePosition();
    this._updateAlignPos();

    return this;
  }

  /**
   * Change panel's size
   * @remarks
   * This will change the actual size of the panel element by changing its CSS width/height property.
   * @param size - {@link SetSizeParams}
   * @returns The current instance for method chaining
   */
  public setSize(size: SetSizeParams): this {
    setSize(this.element, size);

    return this;
  }

  /**
   * Check whether the given element is inside of this panel's {@link Panel.element | element}
   * @remarks
   * This is useful for determining which panel contains a clicked element.
   * @param element - The HTMLElement to check
   * @returns A Boolean value indicating the element is inside of this panel {@link Panel.element | element}
   */
  public contains(element: HTMLElement): boolean {
    return !!this.element?.contains(element);
  }

  /**
   * Reset internal state and set {@link Panel.removed | removed} to `true`
   * @remarks
   * After calling this method, the panel should no longer be used.
   */
  public destroy(): void {
    this._resetInternalStates();
    this._removed = true;
  }

  /**
   * Check whether the given position is inside of this panel's {@link Panel.range | range}
   * @param pos - A position to check
   * @param includeMargin - Include {@link Panel.margin | margin} to the range
   * @returns A Boolean value indicating whether the given position is included in the panel range
   */
  public includePosition(pos: number, includeMargin: boolean = false): boolean {
    return this.includeRange(pos, pos, includeMargin);
  }

  /**
   * Check whether the given range is fully included in this panel's area (inclusive)
   * @param min - Minimum value of the range to check
   * @param max - Maximum value of the range to check
   * @param includeMargin - Include {@link Panel.margin | margin} to the range
   * @returns A Boolean value indicating whether the given range is fully included in the panel range
   */
  public includeRange(min: number, max: number, includeMargin: boolean = false): boolean {
    const margin = this._margin;
    const panelRange = this.range;

    if (includeMargin) {
      panelRange.min -= margin.prev;
      panelRange.max += margin.next;
    }

    return max >= panelRange.min && min <= panelRange.max;
  }

  /**
   * Check whether the panel is visble in the given range (exclusive)
   * @param min - Minimum value of the range to check
   * @param max - Maximum value of the range to check
   * @returns A Boolean value indicating whether the panel is visible
   */
  public isVisibleOnRange(min: number, max: number): boolean {
    const panelRange = this.range;

    return max > panelRange.min && min < panelRange.max;
  }

  /**
   * Move {@link Camera} to this panel
   * @remarks
   * This is equivalent to calling `Flicking.moveTo(panel.index, duration)`.
   * @param duration - Duration of the animation (unit: ms). Defaults to {@link FlickingOptions.duration}
   * @fires {@link MovementEvents}
   * @throws {@link MovementErrors}
   * @returns A Promise which will be resolved after reaching the panel
   */
  public focus(duration?: number): Promise<void> {
    return this._flicking.moveTo(this._index, duration);
  }

  /**
   * Get previous(`index - 1`) panel.
   * @remarks
   * When the previous panel does not exist, this will return `null` instead
   * If the {@link Flicking.circularEnabled | circular} is enabled, this will return the last panel if called from the first panel
   * @returns The previous panel
   */
  public prev(): Panel | null {
    const index = this._index;
    const flicking = this._flicking;
    const renderer = flicking.renderer;
    const panelCount = renderer.panelCount;

    if (panelCount === 1) return null;

    return flicking.circularEnabled
      ? renderer.getPanel(index === 0 ? panelCount - 1 : index - 1)
      : renderer.getPanel(index - 1);
  }

  /**
   * Get next(`index + 1`) panel.
   * @remarks
   * When the next panel does not exist, this will return `null` instead
   * If the {@link Flicking.circularEnabled | circular} is enabled, this will return the first panel if called from the last panel
   * @returns The next panel
   */
  public next(): Panel | null {
    const index = this._index;
    const flicking = this._flicking;
    const renderer = flicking.renderer;
    const panelCount = renderer.panelCount;

    if (panelCount === 1) return null;

    return flicking.circularEnabled
      ? renderer.getPanel(index === panelCount - 1 ? 0 : index + 1)
      : renderer.getPanel(index + 1);
  }

  /**
   * @internal
   * @privateRemarks
   * Increases the panel's index by the given value. Called when panels are inserted before this panel.
   */
  public increaseIndex(val: number): this {
    this._index += Math.max(val, 0);
    return this;
  }

  /**
   * @internal
   * @privateRemarks
   * Decreases the panel's index by the given value. Called when panels are removed before this panel.
   */
  public decreaseIndex(val: number): this {
    this._index -= Math.max(val, 0);
    return this;
  }

  /**
   * @internal
   * @privateRemarks
   * Recalculates the panel's position based on the previous panel's position and margins.
   */
  public updatePosition(): this {
    const prevPanel = this._flicking.renderer.panels[this._index - 1];

    this._pos = prevPanel ? prevPanel.range.max + prevPanel.margin.next + this._margin.prev : this._margin.prev;

    return this;
  }

  /**
   * @internal
   * @privateRemarks
   * Toggles the panel's position for circular mode. Returns true if the panel was toggled.
   */
  public toggle(prevPos: number, newPos: number): boolean {
    const toggleDirection = this._toggleDirection;
    const togglePosition = this._togglePosition;

    if (toggleDirection === DIRECTION.NONE || newPos === prevPos) return false;

    const prevToggled = this._toggled;

    if (newPos > prevPos) {
      if (togglePosition >= prevPos && togglePosition <= newPos) {
        this._toggled = toggleDirection === DIRECTION.NEXT;
      }
    } else {
      if (togglePosition <= prevPos && togglePosition >= newPos) {
        this._toggled = toggleDirection !== DIRECTION.NEXT;
      }
    }

    return prevToggled !== this._toggled;
  }

  /**
   * @internal
   * @privateRemarks
   * Updates the toggle direction for circular mode based on the panel's visibility at the camera range edges.
   */
  public updateCircularToggleDirection(): this {
    const flicking = this._flicking;

    if (!flicking.circularEnabled) {
      this._toggleDirection = DIRECTION.NONE;
      this._togglePosition = 0;
      this._toggled = false;
      return this;
    }

    const camera = flicking.camera;
    const camRange = camera.range;
    const camAlignPosition = camera.alignPosition;
    const camVisibleRange = camera.visibleRange;
    const camVisibleSize = camVisibleRange.max - camVisibleRange.min;

    const minimumVisible = camRange.min - camAlignPosition;
    const maximumVisible = camRange.max - camAlignPosition + camVisibleSize;

    const shouldBeVisibleAtMin = this.includeRange(maximumVisible - camVisibleSize, maximumVisible, false);
    const shouldBeVisibleAtMax = this.includeRange(minimumVisible, minimumVisible + camVisibleSize, false);

    this._toggled = false;
    if (shouldBeVisibleAtMin) {
      this._toggleDirection = DIRECTION.PREV;
      this._togglePosition = this.range.max + camRange.min - camRange.max + camAlignPosition;
      this.toggle(Infinity, camera.position);
    } else if (shouldBeVisibleAtMax) {
      this._toggleDirection = DIRECTION.NEXT;
      this._togglePosition = this.range.min + camRange.max - camVisibleSize + camAlignPosition;
      this.toggle(-Infinity, camera.position);
    } else {
      this._toggleDirection = DIRECTION.NONE;
      this._togglePosition = 0;
    }

    return this;
  }

  /**
   * @internal
   * @privateRemarks
   * Recalculates the align position based on the align option and panel size.
   */
  private _updateAlignPos() {
    this._alignPos = parseAlign(this._align, this._size);
  }

  /**
   * @internal
   * @privateRemarks
   * Resets all internal state values to their defaults.
   */
  private _resetInternalStates() {
    this._size = 0;
    this._pos = 0;
    this._margin = { prev: 0, next: 0 };
    this._height = 0;
    this._alignPos = 0;
    this._toggled = false;
    this._togglePosition = 0;
    this._toggleDirection = DIRECTION.NONE;
  }
}

export default Panel;
