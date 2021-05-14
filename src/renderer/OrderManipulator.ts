/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "~/core/Panel";
import OffsetManipulator from "~/renderer/OffsetManipulator";
import { TogglePoint } from "~/camera/CircularCamera";
import { getFlickingAttached } from "~/utils";

/**
 * A component that manages panel element's order without adding/removing it using CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/order order} property
 * @ko 패널 추가/제거 없이 CSS {@link https://developer.mozilla.org/ko/docs/Web/CSS/order order} 속성을 이용하여 엘리먼트 순서를 변경하는 컴포넌트
 */
class OrderManipulator extends OffsetManipulator {
  public movePanelElementsToStart(panels: Panel[], togglePoints: TogglePoint[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.circular && !flicking.renderOnlyVisible) {
      panels.forEach((panel, idx) => {
        if (togglePoints[idx].toggled) {
          panel.element.style.order = "-1";
        } else {
          panel.element.style.order = "0";
        }
      });
    }

    return super.movePanelElementsToStart(panels, togglePoints);
  }

  public movePanelElementsToEnd(panels: Panel[], togglePoints: TogglePoint[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.circular && !flicking.renderOnlyVisible) {
      panels.forEach((panel, idx) => {
        if (togglePoints[idx].toggled) {
          panel.element.style.order = "1";
        } else {
          panel.element.style.order = "0";
        }
      });
    }

    return super.movePanelElementsToEnd(panels, togglePoints);
  }

  public resetPanelElementOrder(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.circular && !flicking.renderOnlyVisible) {
      panels.forEach(panel => {
        panel.element.style.order = "0";
      });
    }

    return super.resetPanelElementOrder(panels);
  }
}

export default OrderManipulator;
