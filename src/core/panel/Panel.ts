/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";
import { getElementSize, getProgress, getStyle, parseAlign, setSize } from "../../utils";
import { ALIGN, DIRECTION } from "../../const/external";
import { LiteralUnion, ValueOf } from "../../type/internal";

import ElementProvider from "./provider/ElementProvider";

export interface PanelOptions {
  index: number;
  align: LiteralUnion<ValueOf<typeof ALIGN>> | number;
  flicking: Flicking;
  elementProvider: ElementProvider;
}

/**
 * A slide data component that holds information of a single HTMLElement
 * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
 */
class Panel {
  // Internal States
  protected _flicking: Flicking;
  protected _elProvider: ElementProvider;
  protected _index: number;
  protected _pos: number;
  protected _size: number;
  protected _height: number;
  protected _margin: { prev: number; next: number };
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
   * @ko 패널이 참조하고 있는 `HTMLElement`
   * @type {HTMLElement}
   * @readonly
   */
  public get element() { return this._elProvider.element; }
  /**
   * @internal
   * @readonly
   */
  public get elementProvider() { return this._elProvider; }
  /**
   * Index of the panel
   * @ko 패널의 인덱스
   * @type {number}
   * @readonly
   */
  public get index() { return this._index; }
  /**
   * Position of the panel, including {@link Panel#alignPosition alignPosition}
   * @ko 패널의 현재 좌표, {@link Panel#alignPosition alignPosition}을 포함하고 있습니다
   * @type {number}
   * @readonly
   */
  public get position() { return this._pos + this._alignPos; }
  /**
   * Cached size of the panel element
   * This is equal to {@link Panel#element element}'s `offsetWidth` if {@link Flicking#horizontal horizontal} is `true`, and `offsetHeight` else
   * @ko 패널 엘리먼트의 캐시된 크기
   * 이 값은 {@link Flicking#horizontal horizontal}이 `true`일 경우 {@link Panel#element element}의 `offsetWidth`와 동일하고, `false`일 경우 `offsetHeight`와 동일합니다
   * @type {number}
   * @readonly
   */
  public get size() { return this._size; }
  /**
   * Panel's size including CSS `margin`
   * This value includes {@link Panel#element element}'s margin left/right if {@link Flicking#horizontal horizontal} is `true`, and margin top/bottom else
   * @ko CSS `margin`을 포함한 패널의 크기
   * 이 값은 {@link Flicking#horizontal horizontal}이 `true`일 경우 margin left/right을 포함하고, `false`일 경우 margin top/bottom을 포함합니다
   * @type {number}
   * @readonly
   */
  public get sizeIncludingMargin() { return this._size + this._margin.prev + this._margin.next; }
  /**
   * Height of the panel element
   * @ko 패널 엘리먼트의 높이
   * @type {number}
   * @readonly
   */
  public get height() { return this._height; }
  /**
   * Cached CSS `margin` value of the panel element
   * @ko 패널 엘리먼트의 CSS `margin` 값
   * @type {object}
   * @property {number} prev CSS `margin-left` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-top` else
   * <ko>{@link Flicking#horizontal horizontal}이 `true`일 경우 `margin-left`, `false`일 경우 `margin-top`에 해당하는 값</ko>
   * @property {number} next CSS `margin-right` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-bottom` else
   * <ko>{@link Flicking#horizontal horizontal}이 `true`일 경우 `margin-right`, `false`일 경우 `margin-bottom`에 해당하는 값</ko>
   * @readonly
   */
  public get margin() { return this._margin; }
  /**
   * Align position inside the panel where {@link Camera}'s {@link Camera#alignPosition alignPosition} inside viewport should be located at
   * @ko 패널의 정렬 기준 위치. {@link Camera}의 뷰포트 내에서의 {@link Camera#alignPosition alignPosition}이 위치해야 하는 곳입니다
   * @type {number}
   * @readonly
   */
  public get alignPosition() { return this._alignPos; }
  /**
   * A value indicating whether the panel's {@link Flicking#remove remove}d
   * @ko 패널이 {@link Flicking#remove remove}되었는지 여부를 나타내는 값
   * @type {boolean}
   * @readonly
   */
  public get removed() { return this._removed; }
  /**
   * A value indicating whether the panel's element is being rendered on the screen
   * @ko 패널의 엘리먼트가 화면상에 렌더링되고있는지 여부를 나타내는 값
   * @type {boolean}
   * @readonly
   */
  public get rendered() { return this._rendered; }
  /**
   * A value indicating whether the panel's image/video is not loaded and waiting for resize
   * @ko 패널 내부의 이미지/비디오가 아직 로드되지 않아 {@link Panel#resize resize}될 것인지를 나타내는 값
   * @type {boolean}
   * @readonly
   */
  public get loading() { return this._loading; }
  /**
   * Panel element's range of the bounding box
   * @ko 패널 엘리먼트의 Bounding box 범위
   * @type {object}
   * @property {number} [min] Bounding box's left({@link Flicking#horizontal horizontal}: true) / top({@link Flicking#horizontal horizontal}: false)
   * @property {number} [max] Bounding box's right({@link Flicking#horizontal horizontal}: true) / bottom({@link Flicking#horizontal horizontal}: false)
   * @readonly
   */
  public get range() { return { min: this._pos, max: this._pos + this._size }; }
  /**
   * A value indicating whether the panel's position is toggled by circular behavior
   * @ko 패널의 위치가 circular 동작에 의해 토글되었는지 여부를 나타내는 값
   * @type {boolean}
   * @readonly
   */
  public get toggled() { return this._toggled; }
  /**
   * A direction where the panel's position is toggled
   * @ko 패널의 위치가 circular 동작에 의해 토글되는 방향
   * @type {DIRECTION}
   * @readonly
   */
  public get toggleDirection() { return this._toggleDirection; }
  /**
   * Actual position offset determined by {@link Panel#order}
   * @ko {@link Panel#order}에 의한 실제 위치 변경값
   * @type {number}
   * @readonly
   */
  public get offset() {
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
   * @ko 이 패널로부터 이전/다음 패널으로의 이동 진행률
   * @type {number}
   * @readonly
   */
  public get progress() {
    const flicking = this._flicking;

    return this.index - flicking.camera.progress;
  }

  /**
   * Progress of movement between points that panel is completely invisible outside of viewport(prev direction: -1, selected point: 0, next direction: 1)
   * @ko 현재 패널이 뷰포트 영역 밖으로 완전히 사라지는 지점을 기준으로 하는 진행도(prev방향: -1, 선택 지점: 0, next방향: 1)
   * @type {number}
   * @readonly
   */
  public get outsetProgress() {
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
   * @ko 뷰포트 안에서 패널이 보이는 영역의 비율
   * @type {number}
   * @readonly
   */
  public get visibleRatio() {
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

  public set loading(val: boolean) { this._loading = val; }

  // Options Getter
  /**
   * A value indicating where the {@link Panel#alignPosition alignPosition} should be located at inside the panel element
   * @ko {@link Panel#alignPosition alignPosition}이 패널 내의 어디에 위치해야 하는지를 나타내는 값
   * @type {Constants.ALIGN | string | number}
   */
  public get align() { return this._align; }

  // Options Setter
  public set align(val: PanelOptions["align"]) {
    this._align = val;
    this._updateAlignPos();
  }

  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
   * @param {Flicking} [options.elementProvider] A provider instance that redirects elements<ko>실제 엘리먼트를 반환하는 엘리먼트 공급자의 인스턴스</ko>
   */
  public constructor({
    index,
    align,
    flicking,
    elementProvider
  }: PanelOptions) {
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
   * Mark panel element to be appended on the camera element
   * @internal
   */
  public markForShow() {
    this._rendered = true;
    this._elProvider.show(this._flicking);
  }

  /**
   * Mark panel element to be removed from the camera element
   * @internal
   */
  public markForHide() {
    this._rendered = false;
    this._elProvider.hide(this._flicking);
  }

  /**
   * Update size of the panel
   * @ko 패널의 크기를 갱신합니다
   * @param {object} cached Predefined cached size of the panel<ko>사전에 캐시된 패널의 크기 정보</ko>
   * @chainable
   * @return {this}
   */
  public resize(cached?: {
    size: number;
    height?: number;
    margin: { prev: number; next: number };
  }): this {
    const el = this.element;
    const flicking = this._flicking;
    const {
      horizontal,
      useFractionalSize
    } = flicking;

    if (!el) {
      return this;
    }

    if (cached) {
      this._size = cached.size;
      this._margin = { ...cached.margin };
      this._height = cached.height ?? getElementSize({
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
        } : {
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
   * Change panel's size. This will change the actual size of the panel element by changing its CSS width/height property
   * @ko 패널 크기를 변경합니다. 패널 엘리먼트에 해당 크기의 CSS width/height를 적용합니다
   * @param {object} [size] New panel size<ko>새 패널 크기</ko>
   * @param {number|string} [size.width] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
   * @param {number|string} [size.height] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
   * @chainable
   * @return {this}
   */
  public setSize(size: Partial<{
    width: number | string;
    height: number | string;
  }>): this {
    setSize(this.element, size);

    return this;
  }

  /**
   * Check whether the given element is inside of this panel's {@link Panel#element element}
   * @ko 해당 엘리먼트가 이 패널의 {@link Panel#element element} 내에 포함되어 있는지를 반환합니다
   * @param {HTMLElement} element The HTMLElement to check<ko>확인하고자 하는 HTMLElement</ko>
   * @return {boolean} A Boolean value indicating the element is inside of this panel {@link Panel#element element}<ko>패널의 {@link Panel#element element}내에 해당 엘리먼트 포함 여부</ko>
   */
  public contains(element: HTMLElement): boolean {
    return !!this.element?.contains(element);
  }

  /**
   * Reset internal state and set {@link Panel#removed removed} to `true`
   * @ko 내부 상태를 초기화하고 {@link Panel#removed removed}를 `true`로 설정합니다.
   * @return {void}
   */
  public destroy(): void {
    this._resetInternalStates();
    this._removed = true;
  }

  /**
   * Check whether the given position is inside of this panel's {@link Panel#range range}
   * @ko 주어진 좌표가 현재 패널의 {@link Panel#range range}내에 속해있는지를 반환합니다.
   * @param {number} pos A position to check<ko>확인하고자 하는 좌표</ko>
   * @param {boolean} [includeMargin=false] Include {@link Panel#margin margin} to the range<ko>패널 영역에 {@link Panel#margin margin}값을 포함시킵니다</ko>
   * @return {boolean} A Boolean value indicating whether the given position is included in the panel range<ko>해당 좌표가 패널 영역 내에 속해있는지 여부</ko>
   */
  public includePosition(pos: number, includeMargin: boolean = false): boolean {
    return this.includeRange(pos, pos, includeMargin);
  }

  /**
   * Check whether the given range is fully included in this panel's area (inclusive)
   * @ko 주어진 범위가 이 패널 내부에 완전히 포함되는지를 반환합니다
   * @param {number} min Minimum value of the range to check<ko>확인하고자 하는 최소 범위</ko>
   * @param {number} max Maximum value of the range to check<ko>확인하고자 하는 최대 범위</ko>
   * @param {boolean} [includeMargin=false] Include {@link Panel#margin margin} to the range<ko>패널 영역에 {@link Panel#margin margin}값을 포함시킵니다</ko>
   * @returns {boolean} A Boolean value indicating whether the given range is fully included in the panel range<ko>해당 범위가 패널 영역 내에 완전히 속해있는지 여부</ko>
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
   * @ko 주어진 범위 내에서 이 패널의 일부가 보여지는지를 반환합니다
   * @param {number} min Minimum value of the range to check<ko>확인하고자 하는 최소 범위</ko>
   * @param {number} max Maximum value of the range to check<ko>확인하고자 하는 최대 범위</ko>
   * @returns {boolean} A Boolean value indicating whether the panel is visible<ko>해당 범위 내에서 패널을 볼 수 있는지 여부</ko>
   */
  public isVisibleOnRange(min: number, max: number): boolean {
    const panelRange = this.range;

    return max > panelRange.min && min < panelRange.max;
  }

  /**
   * Move {@link Camera} to this panel
   * @ko {@link Camera}를 이 패널로 이동합니다
   * @param {number} [duration] Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @returns {Promise<void>} A Promise which will be resolved after reaching the panel<ko>패널 도달시에 resolve되는 Promise</ko>
   */
  public focus(duration?: number) {
    return this._flicking.moveTo(this._index, duration);
  }

  /**
   * Get previous(`index - 1`) panel. When the previous panel does not exist, this will return `null` instead
   * If the {@link Flicking#circularEnabled circular} is enabled, this will return the last panel if called from the first panel
   * @ko 이전(`index - 1`) 패널을 반환합니다. 이전 패널이 없을 경우 `null`을 반환합니다
   * {@link Flicking#circularEnabled circular} 모드가 활성화되었을 때 첫번째 패널에서 이 메소드를 호출할 경우 마지막 패널을 반환합니다
   * @returns {Panel | null} The previous panel<ko>이전 패널</ko>
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
   * Get next(`index + 1`) panel. When the next panel does not exist, this will return `null` instead
   * If the {@link Flicking#circularEnabled circular} is enabled, this will return the first panel if called from the last panel
   * @ko 다음(`index + 1`) 패널을 반환합니다. 다음 패널이 없을 경우 `null`을 반환합니다
   * {@link Flicking#circularEnabled circular} 모드가 활성화되었을 때 마지막 패널에서 이 메소드를 호출할 경우 첫번째 패널을 반환합니다
   * @returns {Panel | null} The previous panel<ko>다음 패널</ko>
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
   * Increase panel's index by the given value
   * @ko 패널의 인덱스를 주어진 값만큼 증가시킵니다
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
   * @returns {this}
   */
  public increaseIndex(val: number): this {
    this._index += Math.max(val, 0);
    return this;
  }

  /**
   * Decrease panel's index by the given value
   * @ko 패널의 인덱스를 주어진 값만큼 감소시킵니다
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
   * @returns {this}
   */
  public decreaseIndex(val: number): this {
    this._index -= Math.max(val, 0);
    return this;
  }

  /**
   * @internal
   */
  public updatePosition(): this {
    const prevPanel = this._flicking.renderer.panels[this._index - 1];

    this._pos = prevPanel
      ? prevPanel.range.max + prevPanel.margin.next + this._margin.prev
      : this._margin.prev;

    return this;
  }

  /**
   * @internal
   * @return {boolean} toggled
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

  private _updateAlignPos() {
    this._alignPos = parseAlign(this._align, this._size);
  }

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
