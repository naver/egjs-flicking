/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "~/Flicking";
import { parseAlign } from "~/utils";
import { ALIGN } from "~/const/external";
import { LiteralUnion, ValueOf } from "~/type/internal";

export interface PanelOptions {
  index: number;
  align: LiteralUnion<ValueOf<typeof ALIGN>> | number;
  flicking: Flicking;
  el: HTMLElement;
}

/**
 * An slide data component that holds information of a single HTMLElement
 * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
 */
class Panel {
  private _flicking: Flicking;
  private _el: HTMLElement;
  private _align: PanelOptions["align"];

  // Internal States
  private _index: number;
  private _pos: number;
  private _size: number;
  private _height: number;
  private _margin: { prev: number; next: number };
  private _alignPos: number; // Actual align pos
  private _offset: number;
  private _removed: boolean;

  // Internal States Getter
  /**
   * `HTMLElement` that panel's referencing
   * @ko 패널이 참조하고 있는 `HTMLElement`
   * @type {HTMLElement}
   * @readonly
   */
  public get element() { return this._el; }
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
   * Panel's position offset which is changed after panel element's order changes if {@link Flicking#circular circular} is enabled
   * @ko 현재 패널의 위치 오프셋 값. {@link Flicking#circular circular} 모드에서 패널의 엘리먼트의 순서가 변경될 때 이 값이 변경됩니다
   * @type {number}
   * @default 0
   * @readonly
   */
  public get offset() { return this._offset; }
  /**
   * A value indicating whether the panel's {@link Flicking#remove remove}d
   * @ko 패널이 {@link Flicking#remove remove}되었는지 여부를 나타내는 값
   * @type {boolean}
   * @readonly
   */
  public get removed() { return this._removed; }
  /**
   * Panel element's range of the bounding box
   * @ko 패널 엘리먼트의 Bounding box 범위
   * @type {object}
   * @property {number} [min] Bounding box's left({@link Flicking#horizontal horizontal}: true) / top({@link Flicking#horizontal horizontal}: false)
   * @property {number} [max] Bounding box's right({@link Flicking#horizontal horizontal}: true) / bottom({@link Flicking#horizontal horizontal}: false)
   * @readonly
   */
  public get range() { return { min: this._pos, max: this._pos + this._size }; }

  // Options Getter
  /**
   * A value indicating where the {@link Panel#alignPosition alignPosition} should be located at inside the panel element
   * @ko {@link Panel#alignPosition alignPosition}이 패널 내의 어디에 위치해야 하는지를 나타내는 값
   * @type {Constants.ALIGN | string | number}
   */
  public get align() { return this._align; }

  // Options Getter
  public set align(val: PanelOptions["align"]) { this._align = val; }

  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {HTMLElement} [options.el] A `HTMLElement` panel's referencing<ko>패널이 참조하는 `HTMLElement`</ko>
   * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
   * @param {align} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
   */
  public constructor({
    el,
    index,
    align,
    flicking
  }: PanelOptions) {
    this._el = el;
    this._index = index;
    this._flicking = flicking;

    this._align = align;

    this._removed = false;
    this._resetInternalStates();
  }

  /**
   * Update size of the panel
   * @ko 패널의 크기를 갱신합니다
   * @chainable
   * @return {this}
   */
  public resize(): this {
    const el = this._el;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const elStyle = window.getComputedStyle(el) || (el as any).currentStyle as CSSStyleDeclaration;
    const flicking = this._flicking;
    const horizontal = flicking.horizontal;
    const prevPanel = flicking.renderer.panels[this._index - 1];

    this._size = horizontal ? el.offsetWidth : el.offsetHeight;
    this._margin = horizontal
      ? {
        prev: parseFloat(elStyle.marginLeft),
        next: parseFloat(elStyle.marginRight)
      } : {
        prev: parseFloat(elStyle.marginTop),
        next: parseFloat(elStyle.marginBottom)
      };

    this._pos = prevPanel
      ? prevPanel.range.max + prevPanel.margin.next + this._margin.prev
      : this._margin.prev;

    this._height = horizontal ? el.offsetHeight : this._size;

    this._updateAlignPos();

    return this;
  }

  /**
   * Check whether the given element is inside of this panel's {@link Panel#element element}
   * @ko 해당 엘리먼트가 이 패널의 {@link Panel#element element} 내에 포함되어 있는지를 반환합니다
   * @param {HTMLElement} element The HTMLElement to check<ko>확인하고자 하는 HTMLElement</ko>
   * @return {boolean} A Boolean value indicating the element is inside of this panel {@link Panel#element element}<ko>패널의 {@link Panel#element element}내에 해당 엘리먼트 포함 여부</ko>
   */
  public contains(element: HTMLElement): boolean {
    return this._el.contains(element);
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
   * @param {boolean} [includeMargin=false] Include {@link margin} to the range<ko>패널 영역에 {@link margin}값을 포함시킵니다</ko>
   * @return {boolean} A Boolean value indicating whether the given position is included in the panel range<ko>해당 좌표가 패널 영역 내에 속해있는지 여부</ko>
   */
  public includePosition(pos: number, includeMargin: boolean = false): boolean {
    return this.includeRange(pos, pos, includeMargin);
  }

  /**
   * Check whether the given range is fully included in this panel's area
   * @ko 주어진 범위가 이 패널 내부에 완전히 포함되는지를 반환합니다
   * @param {number} min Minimum value of the range to check<ko>확인하고자 하는 최소 범위</ko>
   * @param {number} max Maximum value of the range to check<ko>확인하고자 하는 최대 범위</ko>
   * @param {boolean} [includeMargin=false] Include {@link margin} to the range<ko>패널 영역에 {@link margin}값을 포함시킵니다</ko>
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
   * Increase panel's position by the given value
   * @ko 패널의 위치를 주어진 값만큼 증가시킵니다
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
   * @returns {this}
   */
  public increasePosition(val: number): this {
    this._moveBy(Math.max(val, 0));
    return this;
  }

  /**
   * Decrease panel's position by the given value
   * @ko 패널의위치를 주어진 값만큼 감소시킵니다
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
   * @returns {this}
   */
  public decreasePosition(val: number): this {
    this._moveBy(-Math.max(val, 0));
    return this;
  }

  /**
   * Increase panel's offset by the given value
   * @ko 패널의 오프셋을 주어진 값만큼 증가시킵니다
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
   * @returns {this}
   */
  public increaseOffset(val: number): this {
    this._offset += Math.max(val, 0);
    return this;
  }

  /**
   * Decrease panel's offset by the given value
   * @ko 패널의 오프셋을 주어진 값만큼 감소시킵니다
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
   * @returns {this}
   */
  public decreaseOffset(val: number): this {
    this._offset -= Math.max(val, 0);
    return this;
  }

  /**
   * Reset panel's offset to 0
   * @ko 패널의 오프셋을 0으로 초기화합니다
   * @internal
   * @chainable
   * @returns {this}
   */
  public resetOffset(): this {
    this._offset = 0;
    return this;
  }

  private _moveBy(val: number): this {
    this._pos += val;

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
    this._offset = 0;
  }
}

export default Panel;
