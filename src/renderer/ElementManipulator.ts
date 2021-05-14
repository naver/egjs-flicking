/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "~/core/Panel";
import OffsetManipulator from "~/renderer/OffsetManipulator";
import { getFlickingAttached, includes } from "~/utils";

/**
 * A component that manages element add/remove and element's order change
 * @ko 엘리먼트 추가/제거 및 순서 변경을 담당하는 컴포넌트
 */
class ElementManipulator extends OffsetManipulator {
  public insertPanelElements(panels: Panel[], nextSibling: Panel | null): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const nextSiblingElement = nextSibling?.element || null;
    const fragment = document.createDocumentFragment();

    panels.forEach(panel => fragment.appendChild(panel.element));
    cameraElement.insertBefore(fragment, nextSiblingElement);

    return this;
  }

  public movePanelElementsToStart(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const camRangeDiff = camera.rangeDiff;

    const panelEls = panels.map(panel => panel.element);

    const refElement = includes(panelEls, cameraElement.firstElementChild)
      ? null
      : cameraElement.firstElementChild;
    this._relocatePanelElements(panels, refElement);

    panels.forEach(panel => {
      panel.decreaseOffset(camRangeDiff);
    });

    return this;
  }

  public movePanelElementsToEnd(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const camRangeDiff = camera.rangeDiff;

    this._relocatePanelElements(panels, null);

    panels.forEach(panel => {
      panel.increaseOffset(camRangeDiff);
    });

    return this;
  }

  public resetPanelElementOrder(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    this._relocatePanelElements(panels.filter(panel => panel.element.parentElement === cameraElement), null);

    panels.forEach(panel => {
      panel.resetOffset();
    });

    return this;
  }

  public removePanelElements(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    panels.forEach(panel => {
      cameraElement.removeChild(panel.element);
    });

    return this;
  }

  public removeAllChildNodes(element: HTMLElement): this {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    return this;
  }

  public removeAllTextNodes(element: HTMLElement): this {
    element.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        element.removeChild(node);
      }
    });

    return this;
  }

  private _relocatePanelElements(panels: Panel[], refChild: Node | null) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    const fragment = document.createDocumentFragment();
    panels.forEach(panel => fragment.appendChild(panel.element));

    cameraElement.insertBefore(fragment, refChild);
  }
}

export default ElementManipulator;
