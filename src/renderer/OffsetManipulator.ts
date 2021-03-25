/*
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/
import Component from "@egjs/component";

import Flicking from "~/Flicking";
import Panel from "~/core/Panel";
import { getFlickingAttached } from "~/utils";
import { TogglePoint } from "~/camera/CircularCamera";

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Event that fires when order of the elements is changed
 * @ko 엘리먼트 순서 변경시 트리거되는 이벤트
 * @event OffsetManipulator#orderChanged
 * @type {void}
 */

/**
 * A component that manages panel offset from the element's order change
 * @ko 엘리먼트 순서 변경에 의한 패널 오프셋 변경을 담당하는 컴포넌트
 * @internal
 * @fires OffsetManipulator#orderChanged
 */
class OffsetManipulator extends Component<{
  orderChanged: void;
}> {
  protected _flicking: Flicking | null;

  /** */
  public constructor() {
    super();
    this._flicking = null;
  }

  /**
   * Initialize OffsetManipulator
   * @ko OffsetManipulator를 초기화합니다
   * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
   * @chainable
   * @return {this}
   */
  public init(flicking: Flicking) {
    this._flicking = flicking;
  }

  /**
   * Destroy Renderer and return to initial state
   * @ko Renderer를 초기 상태로 되돌립니다
   * @return {void}
   */
  public destroy() {
    this._flicking = null;
  }

  /**
   * Insert panel elements before nextSibling
   * @ko 패널 엘리먼트들을 기준 패널(`nextSibling`) 이전에 추가합니다
   * @param {Panel[]} panels An array of panels to add<ko>추가할 패널의 배열</ko>
   * @chainable
   * @return {this}
   */
  public insertPanelElements(panels: Panel[], nextSibling: Panel | null): this {
    // DO NOTHING
    return this;
  }

  /**
   * Move panel element as the first child of the camera element
   * @ko 패널 엘리먼트들을 카메라 엘리먼트의 첫번째 child로 이동시킨다
   * @param {Panel[]} panels Panels to move<ko>위치를 변경할 패널들</ko>
   * @param {TogglePoint[]} togglePoints An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>
   * @chainable
   * @return {this}
   */
  public movePanelElementsToStart(panels: Panel[], togglePoints: TogglePoint[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camRangeDiff = flicking.camera.rangeDiff;

    panels.forEach((panel, idx) => {
      panel.decreaseOffset(camRangeDiff);
    });

    if (panels.length > 0) {
      this.trigger("orderChanged");
    }
    return this;
  }

  /**
   * Move panel element as the last child of the camera element
   * @ko 패널 엘리먼트들을 카메라 엘리먼트의 마지막 child로 이동시킨다
   * @param {Panel[]} panels Panels to move<ko>위치를 변경할 패널들</ko>
   * @param {TogglePoint[]} togglePoints An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>
   * @chainable
   * @return {this}
   */
  public movePanelElementsToEnd(panels: Panel[], togglePoints: TogglePoint[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camRangeDiff = flicking.camera.rangeDiff;

    panels.forEach((panel, idx) => {
      panel.increaseOffset(camRangeDiff);
    });

    if (panels.length > 0) {
      this.trigger("orderChanged");
    }
    return this;
  }

  /**
   * Reset panel element order by the panel's index
   * @ko 패널 엘리먼트 순서를 인덱스 순으로 변경한다
   * @param {Panel[]} panels Panels to move<ko>위치를 변경할 패널들</ko>
   * @chainable
   * @return {this}
   */
  public resetPanelElementOrder(panels: Panel[]): this {
    panels.forEach(panel => {
      panel.resetOffset();
    });

    if (panels.length > 0) {
      this.trigger("orderChanged");
    }
    return this;
  }

  /**
   * Remove panel elements
   * @ko 패널 엘리먼트들을 삭제한다
   * @param {Panel[]} panels Panels to remove<ko>삭제할 패널들</ko>
   * @chainable
   * @return {this}
   */
  public removePanelElements(panels: Panel[]): this {
    // DO NOTHING
    return this;
  }

  /**
   * Remove all child nodes inside the given element
   * @ko 주어진 엘리먼트 내의 모든 child node를 제거한다
   * @param element A HTMLElement to remove all child nodes<ko>Child node를 전부 삭제할 HTMLElement</ko>
   * @chainable
   * @return {this}
   */
  public removeAllChildNodes(element: HTMLElement): this {
    // DO NOTHING
    return this;
  }

  /**
   * Remove all text nodes inside the given element
   * @ko 주어진 엘리먼트 내의 모든 text node를 제거한다
   * @param element A HTMLElement to remove all text nodes<ko>Text node를 전부 삭제할 HTMLElement</ko>
   * @chainable
   * @return {this}
   */
  public removeAllTextNodes(element: HTMLElement): this {
    // DO NOTHING
    return this;
  }
}

export default OffsetManipulator;
