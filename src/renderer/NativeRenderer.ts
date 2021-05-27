/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { getFlickingAttached, getMinusCompensatedIndex, includes, parseElement, toArray } from "../utils";
import Panel from "../core/Panel/Panel";
import ElementPanel from "../core/Panel/ElementPanel";
import { ElementLike } from "../type/external";

import Renderer from "./Renderer";

class NativeRenderer extends Renderer {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async render() {
    const strategy = this._renderingStrategy;
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraEl = flicking.camera.element;
    const wasRenderedPanels = this._panels.filter(panel => panel.element.parentElement === cameraEl);

    strategy.updateRenderingPanels(flicking);
    const renderingPanels = this._getRenderingPanelsByOrder();

    this._removePanelElements(wasRenderedPanels.filter(panel => !panel.rendered));
    this._insertPanelElements(renderingPanels.filter(panel => panel.element.parentElement !== cameraEl), null);
    this._resetPanelElementOrder(renderingPanels);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async forceRenderAllPanels() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const fragment = document.createDocumentFragment();

    this._panels.forEach(panel => fragment.appendChild(panel.element));

    this._removeAllChildsFromCamera();

    cameraElement.appendChild(fragment);
  }

  /**
   * Insert new panels at given index
   * This will increase index of panels after by the number of panels added
   * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
   * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
   * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
   * @param {Flicking.ElementLike | Flicking.ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
   * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
   */
  public insert(index: number, element: ElementLike | ElementLike[]): ElementPanel[] {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { control } = flicking;
    const align = this._getPanelAlign();

    const elements = parseElement(element);
    const insertingIdx = getMinusCompensatedIndex(index, panels.length);

    const panelsPushed = panels.slice(insertingIdx);
    const newPanels = elements.map((el, elIdx) => new ElementPanel({ el, index: insertingIdx + elIdx, align, flicking }));

    if (newPanels.length <= 0) return [];

    // Reset the order of the elements first
    this._resetPanelElementOrder(panels.filter(panel => panel.element.parentElement === flicking.camera.element));

    panels.splice(insertingIdx, 0, ...newPanels);

    // Insert the actual elements as camera element's children
    this._insertPanelElements(newPanels, panelsPushed[0] || null);

    // Resize the newly added panels
    newPanels.forEach(panel => panel.resize());

    const insertedSize = this._getPanelSizeSum(newPanels);

    // Update panel indexes & positions
    panelsPushed.forEach(panel => {
      panel.increaseIndex(newPanels.length);
      panel.increasePosition(insertedSize);
    });

    // Update camera & control
    this._updateCameraAndControl();

    void this.render();

    // Move to the first panel added if no panels existed
    // FIXME: fix for animating case
    if (newPanels.length > 0 && !control.animating) {
      void control.moveToPanel(control.activePanel || newPanels[0], {
        duration: 0
      }).catch(() => void 0);
    }

    return newPanels;
  }

  /**
   * Remove the panel at the given index
   * This will decrease index of panels after by the number of panels removed
   * @ko 주어진 인덱스의 패널을 제거합니다
   * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
   * @param {number} index Index of panel to remove<ko>제거할 패널의 인덱스</ko>
   * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
   * @return An array of removed panels<ko>제거된 패널들의 배열</ko>
   */
  public remove(index: number, deleteCount: number): ElementPanel[] {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { camera, control } = flicking;
    const activePanel = control.activePanel;
    const removingIdx = getMinusCompensatedIndex(index, panels.length);

    const panelsPulled = panels.slice(removingIdx + deleteCount);
    const panelsRemoved = panels.splice(removingIdx, deleteCount);

    if (panelsRemoved.length <= 0) return [];

    // Update panel indexes & positions
    const removedSize = this._getPanelSizeSum(panelsRemoved);
    panelsPulled.forEach(panel => {
      panel.decreaseIndex(panelsRemoved.length);
      panel.decreasePosition(removedSize);
    });

    // Remove panel elements
    this._removePanelElements(panelsRemoved);
    panelsRemoved.forEach(panel => panel.destroy());

    // Update camera & control
    this._updateCameraAndControl();

    if (includes(panelsRemoved, activePanel)) {
      control.resetActive();
    }

    void this.render();

    // FIXME: fix for animating case
    if (panelsRemoved.length > 0 && !control.animating) {
      const targetPanel = includes(panelsRemoved, activePanel)
        ? (panelsPulled[0] || panels[panels.length - 1])
        : activePanel;

      if (targetPanel) {
        void control.moveToPanel(targetPanel, {
          duration: 0
        }).catch(() => void 0);
      } else {
        // All panels removed
        void camera.lookAt(0);
      }
    }

    return panelsRemoved as ElementPanel[];
  }

  protected _collectPanels(): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const cameraElement = flicking.camera.element;

    // Remove all text nodes in the camera element
    cameraElement.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        cameraElement.removeChild(node);
      }
    });

    const align = this._getPanelAlign();
    const cameraChilds = toArray(cameraElement.children);

    this._panels = cameraChilds.map(
      (el: HTMLElement, index: number) => new ElementPanel({ flicking, el, index, align })
    );

    return this;
  }

  private _resetPanelElementOrder(panels: Panel[]) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraEl = flicking.camera.element;

    // We're using reversed panels here as last panel should be the last element of camera element
    const reversedPanels = [...panels].reverse();
    reversedPanels.forEach((panel, idx) => {
      const nextPanel = reversedPanels[idx - 1];
      const nextPanelEl = nextPanel ? nextPanel.element : null;

      if (panel.element.nextElementSibling !== nextPanelEl) {
        cameraEl.insertBefore(panel.element, nextPanelEl);
      }
    });
  }

  private _insertPanelElements(panels: Panel[], nextSibling: Panel | null) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const nextSiblingElement = nextSibling?.element || null;
    const fragment = document.createDocumentFragment();

    panels.forEach(panel => fragment.appendChild(panel.element));
    cameraElement.insertBefore(fragment, nextSiblingElement);

    return this;
  }

  private _removePanelElements(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    panels.forEach(panel => {
      cameraElement.removeChild(panel.element);
    });

    return this;
  }

  private _removeAllChildsFromCamera() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    // Remove other elements
    while (cameraElement.firstChild) {
      cameraElement.removeChild(cameraElement.firstChild);
    }
  }
}

export default NativeRenderer;
