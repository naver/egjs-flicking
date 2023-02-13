/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";

import Flicking, { FlickingOptions } from "../Flicking";
import FlickingError from "../core/FlickingError";
import Panel from "../core/panel/Panel";
import AnchorPoint from "../core/AnchorPoint";
import * as ERROR from "../const/error";
import { ALIGN, CIRCULAR_FALLBACK, DIRECTION, EVENTS } from "../const/external";
import { checkExistence, find, getFlickingAttached, getProgress, includes, parseAlign, toArray } from "../utils";

import { CameraMode, BoundCameraMode, CircularCameraMode, LinearCameraMode } from "./mode";

export interface CameraOptions {
  align: FlickingOptions["align"];
}

/**
 * A component that manages actual movement inside the viewport
 * @ko 뷰포트 내에서의 실제 움직임을 담당하는 컴포넌트
 */
class Camera {
  // Options
  private _align: FlickingOptions["align"];

  // Internal states
  private _flicking: Flicking;
  private _mode: CameraMode;
  private _el: HTMLElement;
  private _transform: string;
  private _position: number;
  private _alignPos: number;
  private _offset: number;
  private _circularOffset: number;
  private _circularEnabled: boolean;
  private _range: { min: number; max: number };
  private _visiblePanels: Panel[];
  private _anchors: AnchorPoint[];
  private _needPanelTriggered: { prev: boolean; next: boolean };

  // Internal states getter
  /**
   * The camera element(`.flicking-camera`)
   * @ko 카메라 엘리먼트(`.flicking-camera`)
   * @type {HTMLElement}
   * @readonly
   */
  public get element() { return this._el; }
  /**
   * An array of the child elements of the camera element(`.flicking-camera`)
   * @ko 카메라 엘리먼트(`.flicking-camera`)의 자식 엘리먼트 배열
   * @type {HTMLElement[]}
   * @readonly
   */
  public get children() { return toArray(this._el.children) as HTMLElement[]; }
  /**
   * Current position of the camera
   * @ko Camera의 현재 좌표
   * @type {number}
   * @readonly
   */
  public get position() { return this._position; }
  /**
   * Align position inside the viewport where {@link Panel}'s {@link Panel#alignPosition alignPosition} should be located at
   * @ko 패널의 정렬 기준 위치. 뷰포트 내에서 {@link Panel}의 {@link Panel#alignPosition alignPosition}이 위치해야 하는 곳입니다
   * @type {number}
   * @readonly
   */
  public get alignPosition() { return this._alignPos; }
  /**
   * Position offset, used for the {@link Flicking#renderOnlyVisible renderOnlyVisible} option
   * @ko Camera의 좌표 오프셋. {@link Flicking#renderOnlyVisible renderOnlyVisible} 옵션을 위해 사용됩니다.
   * @type {number}
   * @default 0
   * @readonly
   */
  public get offset() { return this._offset - this._circularOffset; }
  /**
   * Whether the `circular` option is enabled.
   * The {@link Flicking#circular circular} option can't be enabled when sum of the panel sizes are too small.
   * @ko {@link Flicking#circular circular} 옵션이 활성화되었는지 여부를 나타내는 멤버 변수.
   * {@link Flicking#circular circular} 옵션은 패널의 크기의 합이 충분하지 않을 경우 비활성화됩니다.
   * @type {boolean}
   * @default false
   * @readonly
   */
  public get circularEnabled() { return this._circularEnabled; }
  /**
   * A current camera mode
   * @type {CameraMode}
   * @readonly
   */
  public get mode() { return this._mode; }
  /**
   * A range that Camera's {@link Camera#position position} can reach
   * @ko Camera의 {@link Camera#position position}이 도달 가능한 범위
   * @type {object}
   * @property {number} min A minimum position<ko>최소 위치</ko>
   * @property {number} max A maximum position<ko>최대 위치</ko>
   * @readonly
   */
  public get range() { return this._range; }
  /**
   * A difference between Camera's minimum and maximum position that can reach
   * @ko Camera가 도달 가능한 최소/최대 좌표의 차이
   * @type {number}
   * @readonly
   */
  public get rangeDiff() { return this._range.max - this._range.min; }
  /**
   * An array of visible panels from the current position
   * @ko 현재 보이는 패널들의 배열
   * @type {Panel[]}
   * @readonly
   */
  public get visiblePanels() { return this._visiblePanels; }
  /**
   * A range of the visible area from the current position
   * @ko 현재 위치에서 보이는 범위
   * @type {object}
   * @property {number} min A minimum position<ko>최소 위치</ko>
   * @property {number} min A maximum position<ko>최대 위치</ko>
   * @readonly
   */
  public get visibleRange() { return { min: this._position - this._alignPos, max: this._position - this._alignPos + this.size }; }
  /**
   * An array of {@link AnchorPoint}s that Camera can be stopped at
   * @ko 카메라가 도달 가능한 {@link AnchorPoint}의 목록
   * @type {AnchorPoint[]}
   * @readonly
   */
  public get anchorPoints() { return this._anchors; }
  /**
   * A current parameters of the Camera for updating {@link AxesController}
   * @ko {@link AxesController}를 업데이트하기 위한 현재 Camera 패러미터들
   * @type {ControlParams}
   * @readonly
   */
  public get controlParams() { return { range: this._range, position: this._position, circular: this._circularEnabled }; }
  /**
   * A Boolean value indicating whether Camera's over the minimum or maximum position reachable
   * @ko 현재 카메라가 도달 가능한 범위의 최소 혹은 최대점을 넘어섰는지를 나타냅니다
   * @type {boolean}
   * @readonly
   */
  public get atEdge() { return this._position <= this._range.min || this._position >= this._range.max; }
  /**
   * Return the size of the viewport
   * @ko 뷰포트 크기를 반환합니다
   * @type {number}
   * @readonly
   */
  public get size() {
    const flicking = this._flicking;
    return flicking
      ? flicking.horizontal
        ? flicking.viewport.width
        : flicking.viewport.height
      : 0;
  }

  /**
   * Return the camera's position progress from the first panel to last panel
   * Range is from 0 to last panel's index
   * @ko 첫번째 패널로부터 마지막 패널까지의 카메라 위치의 진행도를 반환합니다
   * 범위는 0부터 마지막 패널의 인덱스까지입니다
   * @type {number}
   * @readonly
   */
  public get progress() {
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
      let prevPosition = prevPanel
        ? prevPanel.position + prevPanel.offset
        : prevRange - bounceSize[0];

      // Looped
      if (prevPosition > panelPos) {
        prevPosition -= rangeDiff;
      }

      return nearestPanel.index - 1 + getProgress(position, prevPosition, panelPos);
    } else {
      const nextPanel = nearestPanel.next();
      let nextPosition = nextPanel
        ? nextPanel.position + nextPanel.offset
        : nextRange + bounceSize[1];

      // Looped
      if (nextPosition < panelPos) {
        nextPosition += rangeDiff;
      }

      return nearestPanel.index + getProgress(position, panelPos, nextPosition);
    }
  }

  // Options Getter
  /**
   * A value indicating where the {@link Camera#alignPosition alignPosition} should be located at inside the viewport element
   * @ko {@link Camera#alignPosition alignPosition}이 뷰포트 엘리먼트 내의 어디에 위치해야 하는지를 나타내는 값
   * @type {ALIGN | string | number}
   */
  public get align() { return this._align; }

  // Options Setter
  public set align(val: FlickingOptions["align"]) {
    this._align = val;
  }

  /** */
  public constructor(flicking: Flicking, {
    align = ALIGN.CENTER
  }: Partial<CameraOptions> = {}) {
    this._flicking = flicking;
    this._resetInternalValues();

    // Options
    this._align = align;
  }

  /**
   * Initialize Camera
   * @ko Camera를 초기화합니다
   * @throws {FlickingError}
   * {@link ERROR_CODE VAL_MUST_NOT_NULL} If the camera element(`.flicking-camera`) does not exist inside viewport element
   * <ko>{@link ERROR_CODE VAL_MUST_NOT_NULL} 뷰포트 엘리먼트 내부에 카메라 엘리먼트(`.flicking-camera`)가 존재하지 않을 경우</ko>
   * @return {this}
   */
  public init(): this {
    const viewportEl = this._flicking.viewport.element;

    checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
    this._el = viewportEl.firstElementChild as HTMLElement;
    this._checkTranslateSupport();

    this._updateMode();

    return this;
  }

  /**
   * Destroy Camera and return to initial state
   * @ko Camera를 초기 상태로 되돌립니다
   * @return {void}
   */
  public destroy(): this {
    this._resetInternalValues();
    return this;
  }

  /**
   * Move to the given position and apply CSS transform
   * @ko 해당 좌표로 이동하고, CSS transform을 적용합니다
   * @param {number} pos A new position<ko>움직일 위치</ko>
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
  public lookAt(pos: number): void {
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
      });
    } else {
      this.applyTransform();
    }
  }

  /**
   * Return a previous {@link AnchorPoint} of given {@link AnchorPoint}
   * If it does not exist, return `null` instead
   * @ko 주어진 {@link AnchorPoint}의 이전 {@link AnchorPoint}를 반환합니다
   * 존재하지 않을 경우 `null`을 반환합니다
   * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>기준 {@link AnchorPoint}</ko>
   * @return {AnchorPoint | null} The previous {@link AnchorPoint}<ko>이전 {@link AnchorPoint}</ko>
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
   * If it does not exist, return `null` instead
   * @ko 주어진 {@link AnchorPoint}의 다음 {@link AnchorPoint}를 반환합니다
   * 존재하지 않을 경우 `null`을 반환합니다
   * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>기준 {@link AnchorPoint}</ko>
   * @return {AnchorPoint | null} The next {@link AnchorPoint}<ko>다음 {@link AnchorPoint}</ko>
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
   * Value is from 0 to 1 when the camera's inside panel
   * Value can be lower than 0 or bigger than 1 when it's in the margin area
   * @ko 현재 카메라 아래 패널에서의 위치 진행도를 반환합니다
   * 반환값은 카메라가 패널 내부에 있을 경우 0부터 1까지의 값을 갖습니다
   * 패널의 margin 영역에 있을 경우 0보다 작거나 1보다 큰 값을 반환할 수 있습니다
   */
  public getProgressInPanel(panel: Panel) {
    const panelRange = panel.range;

    return (this._position - panelRange.min) / (panelRange.max - panelRange.min);
  }

  /**
   * Return {@link AnchorPoint} that includes given position
   * If there's no {@link AnchorPoint} that includes the given position, return `null` instead
   * @ko 주어진 좌표를 포함하는 {@link AnchorPoint}를 반환합니다
   * 주어진 좌표를 포함하는 {@link AnchorPoint}가 없을 경우 `null`을 반환합니다
   * @param {number} position A position to check<ko>확인할 좌표</ko>
   * @return {AnchorPoint | null} The {@link AnchorPoint} that includes the given position<ko>해당 좌표를 포함하는 {@link AnchorPoint}</ko>
   */
  public findAnchorIncludePosition(position: number): AnchorPoint | null {
    return this._mode.findAnchorIncludePosition(position);
  }

  /**
   * Return {@link AnchorPoint} nearest to given position
   * If there're no {@link AnchorPoint}s, return `null` instead
   * @ko 해당 좌표에서 가장 가까운 {@link AnchorPoint}를 반환합니다
   * {@link AnchorPoint}가 하나도 없을 경우 `null`을 반환합니다
   * @param {number} position A position to check<ko>확인할 좌표</ko>
   * @return {AnchorPoint | null} The {@link AnchorPoint} nearest to the given position<ko>해당 좌표에 가장 인접한 {@link AnchorPoint}</ko>
   */
  public findNearestAnchor(position: number): AnchorPoint | null {
    return this._mode.findNearestAnchor(position);
  }

  /**
   * Return {@link AnchorPoint} that matches {@link Flicking#currentPanel}
   * @ko 현재 {@link Flicking#currentPanel}에 해당하는 {@link AnchorPoint}를 반환합니다
   * @return {AnchorPoint | null}
   */
  public findActiveAnchor(): AnchorPoint | null {
    const flicking = getFlickingAttached(this._flicking);
    const activeIndex = flicking.control.activeIndex;

    return find(this._anchors, anchor => anchor.panel.index === activeIndex);
  }

  /**
   * Clamp the given position between camera's range
   * @ko 주어진 좌표를 Camera가 도달 가능한 범위 사이의 값으로 만듭니다
   * @param {number} position A position to clamp<ko>범위를 제한할 좌표</ko>
   * @return {number} A clamped position<ko>범위 제한된 좌표</ko>
   */
  public clampToReachablePosition(position: number): number {
    return this._mode.clampToReachablePosition(position);
  }

  /**
   * Check whether the given panel is inside of the Camera's range
   * @ko 해당 {@link Panel}이 Camera가 도달 가능한 범위 내에 있는지를 반환합니다
   * @param panel An instance of {@link Panel} to check<ko>확인할 {@link Panel}의 인스턴스</ko>
   * @return {boolean} Whether the panel's inside Camera's range<ko>도달 가능한 범위 내에 해당 패널이 존재하는지 여부</ko>
   */
  public canReach(panel: Panel): boolean {
    return this._mode.canReach(panel);
  }

  /**
   * Check whether the given panel element is visible at the current position
   * @ko 현재 좌표에서 해당 패널 엘리먼트를 볼 수 있는지 여부를 반환합니다
   * @param panel An instance of {@link Panel} to check<ko>확인할 {@link Panel}의 인스턴스</ko>
   * @return Whether the panel element is visible at the current position<ko>현재 위치에서 해당 패널 엘리먼트가 보이는지 여부</ko>
   */
  public canSee(panel: Panel): boolean {
    return this._mode.canSee(panel);
  }

  /**
   * Update {@link Camera#range range} of Camera
   * @ko Camera의 {@link Camera#range range}를 업데이트합니다
   * @method
   * @abstract
   * @memberof Camera
   * @instance
   * @name updateRange
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
  public updateRange() {
    const flicking = getFlickingAttached(this._flicking);
    const renderer = flicking.renderer;
    const panels = renderer.panels;

    this._updateMode();
    this._range = this._mode.getRange();

    panels.forEach(panel => panel.updateCircularToggleDirection());

    return this;
  }

  /**
   * Update Camera's {@link Camera#alignPosition alignPosition}
   * @ko Camera의 {@link Camera#alignPosition alignPosition}을 업데이트합니다
   * @chainable
   * @return {this}
   */
  public updateAlignPos(): this {
    const align = this._align;

    const alignVal = typeof align === "object"
      ? (align as { camera: string | number }).camera
      : align;

    this._alignPos = parseAlign(alignVal, this.size);

    return this;
  }

  /**
   * Update Camera's {@link Camera#anchorPoints anchorPoints}
   * @ko Camera의 {@link Camera#anchorPoints anchorPoints}를 업데이트합니다
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @chainable
   * @return {this}
   */
  public updateAnchors(): this {
    this._anchors = this._mode.getAnchors();

    return this;
  }

  /**
   * Update Viewport's height to active panel's height
   * @ko 현재 선택된 패널의 높이와 동일하도록 뷰포트의 높이를 업데이트합니다
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @chainable
   * @return {this}
   */
  public updateAdaptiveHeight() {
    const flicking = getFlickingAttached(this._flicking);
    const activePanel = flicking.control.activePanel;

    if (!flicking.horizontal || !flicking.adaptive || !activePanel) return;

    flicking.viewport.setSize({
      height: activePanel.height
    });
  }

  /**
   * Update current offset of the camera
   * @ko 현재 카메라의 오프셋을 업데이트합니다
   * @chainable
   * @return {this}
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
   * Reset the history of {@link Flicking#event:needPanel needPanel} events so it can be triggered again
   * @ko 발생한 {@link Flicking#event:needPanel needPanel} 이벤트들을 초기화하여 다시 발생할 수 있도록 합니다
   * @chainable
   * @return {this}
   */
  public resetNeedPanelHistory(): this {
    this._needPanelTriggered = { prev: false, next: false };
    return this;
  }

  /**
   * Apply "transform" style with the current position to camera element
   * @ko 현재 위치를 기준으로한 transform 스타일을 카메라 엘리먼트에 적용합니다.
   * @return {this}
   */
  public applyTransform(): this {
    const el = this._el;
    const flicking = getFlickingAttached(this._flicking);
    const renderer = flicking.renderer;

    if (renderer.rendering || !flicking.initialized) return this;

    const actualPosition = this._position - this._alignPos - this._offset + this._circularOffset;

    el.style[this._transform] = flicking.horizontal
      ? `translate(${-actualPosition}px)`
      : `translate(0, ${-actualPosition}px)`;

    return this;
  }

  private _resetInternalValues() {
    this._position = 0;
    this._alignPos = 0;
    this._offset = 0;
    this._circularOffset = 0;
    this._circularEnabled = false;
    this._range = { min: 0, max: 0 };
    this._visiblePanels = [];
    this._anchors = [];
    this._needPanelTriggered = { prev: false, next: false };
  }

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
        flicking.trigger(new ComponentEvent(EVENTS.VISIBLE_CHANGE, {
          added,
          removed,
          visiblePanels: newVisiblePanels
        }));
      });
    }
  }

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

      if (cameraPrev <= (firstPanelPrev + needPanelThreshold) || cameraPosition <= (cameraRange.min + needPanelThreshold)) {
        flicking.trigger(new ComponentEvent(EVENTS.NEED_PANEL, { direction: DIRECTION.PREV }));
        needPanelTriggered.prev = true;
      }
    }

    if (!needPanelTriggered.next) {
      const lastPanelNext = lastPanel.range.max;

      if (cameraNext >= (lastPanelNext - needPanelThreshold) || cameraPosition >= (cameraRange.max - needPanelThreshold)) {
        flicking.trigger(new ComponentEvent(EVENTS.NEED_PANEL, { direction: DIRECTION.NEXT }));
        needPanelTriggered.next = true;
      }
    }
  }

  private _checkReachEnd(prevPos: number, newPos: number): void {
    const flicking = getFlickingAttached(this._flicking);
    const range = this._range;

    const wasBetweenRange = prevPos > range.min && prevPos < range.max;
    const isBetweenRange = newPos > range.min && newPos < range.max;

    if (!wasBetweenRange || isBetweenRange) return;

    const direction = newPos <= range.min ? DIRECTION.PREV : DIRECTION.NEXT;

    flicking.trigger(new ComponentEvent(EVENTS.REACH_EDGE, {
      direction
    }));
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

  private _updateMode() {
    const flicking = getFlickingAttached(this._flicking);

    if (flicking.circular) {
      const circularMode = new CircularCameraMode(flicking);
      const canSetCircularMode = circularMode.checkAvailability();

      if (canSetCircularMode) {
        this._mode = circularMode;
      } else {
        const fallbackMode = flicking.circularFallback;

        this._mode = fallbackMode === CIRCULAR_FALLBACK.BOUND
          ? new BoundCameraMode(flicking)
          : new LinearCameraMode(flicking);
      }

      this._circularEnabled = canSetCircularMode;
    } else {
      this._mode = flicking.bound
        ? new BoundCameraMode(flicking)
        : new LinearCameraMode(flicking);
      this._circularEnabled = false;
    }
  }

  private _togglePanels(prevPos: number, pos: number): boolean {
    if (pos === prevPos) return false;

    const flicking = getFlickingAttached(this._flicking);
    const panels = flicking.renderer.panels;
    const toggled = panels.map(panel => panel.toggle(prevPos, pos));

    return toggled.some(isToggled => isToggled);
  }
}

export default Camera;
