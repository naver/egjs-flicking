/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "~/Flicking";
import Renderer from "~/renderer/Renderer";
import ElementPanel from "~/core/ElementPanel";
import { getFlickingAttached, getMinusCompensatedIndex, includes, parseElement, toArray } from "~/utils";
import { ElementLike } from "~/type/external";
class RawRenderer extends Renderer {
  protected _panels: ElementPanel[];

  public init(flicking: Flicking): this {
    super.init(flicking);
    this._collectPanels();
    return this;
  }

  public render() { return this; }

  public insert(index: number, element: ElementLike | ElementLike[]): ElementPanel[] {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { camera, control } = flicking;
    const align = this._getPanelAlign();

    const elements = parseElement(element);
    const insertingIdx = getMinusCompensatedIndex(index, panels.length);

    const panelsPushed = panels.slice(insertingIdx);
    const newPanels = elements.map((el, elIdx) => new ElementPanel({ el, index: insertingIdx + elIdx, align, flicking }));

    panels.splice(insertingIdx, 0, ...newPanels);

    // Update panel indexes & positions
    panelsPushed.forEach(panel => {
      panel.increaseIndex(newPanels.length);
      panel.resize();
    });

    // Reset the order of the elements
    this.resetPanelElementOrder();

    // Insert the actual elements as camera element's children
    const cameraElement = camera.element;
    const nextSiblingPanel = panelsPushed[0]?.element || null;
    const fragment = document.createDocumentFragment();

    newPanels.forEach(panel => fragment.appendChild(panel.element));
    cameraElement.insertBefore(fragment, nextSiblingPanel);

    // Resize the newly added panels
    newPanels.forEach(panel => panel.resize());

    // Update camera & control
    camera.updateRange();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();

    // Move to the first panel added if no panels existed
    // FIXME: fix for animating case
    if (newPanels.length > 0 && !control.animating) {
      void control.moveToPanel(control.activePanel || newPanels[0], 0).catch(() => void 0);
    }

    return newPanels;
  }

  public remove(index: number, deleteCount: number = 1): ElementPanel[] {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { camera, control } = flicking;
    const removingIdx = getMinusCompensatedIndex(index, panels.length);

    const panelsPulled = panels.slice(removingIdx + deleteCount);
    const panelsRemoved = panels.splice(removingIdx, deleteCount);

    // Update panel indexes
    panelsPulled.forEach(panel => panel.decreaseIndex(panelsRemoved.length));

    // Reset the order of the elements
    this.resetPanelElementOrder();

    // Remove panel elements
    this._removePanelElements(panelsRemoved);

    // Update camera & control
    camera.updateRange();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();

    if (includes(panelsRemoved, control.activePanel)) {
      control.resetActivePanel();
    }

    // FIXME: fix for animating case
    if (panelsRemoved.length > 0 && !control.animating) {
      const activePanel = control.activePanel;
      const targetPanel = includes(panelsRemoved, activePanel) ? panelsPulled[0] || panels[panels.length - 1] : activePanel;

      if (targetPanel) {
        void control.moveToPanel(targetPanel, 0).catch(() => void 0);
      } else {
        // All panels removed
        camera.lookAt(0);
      }
    }

    return panelsRemoved;
  }

  public movePanelElementsToStart(panels: ElementPanel[]) {
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

  public movePanelElementsToEnd(panels: ElementPanel[]) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const camRangeDiff = camera.rangeDiff;

    this._relocatePanelElements(panels, null);

    panels.forEach(panel => {
      panel.increaseOffset(camRangeDiff);
    });

    return this;
  }

  public resetPanelElementOrder() {
    const panels = this._panels;

    this._relocatePanelElements(panels, null);

    panels.forEach(panel => {
      panel.resetOffset();
    });

    return this;
  }

  protected _relocatePanelElements(panels: ElementPanel[], refChild: Node | null) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    const fragment = document.createDocumentFragment();
    panels.forEach(panel => fragment.appendChild(panel.element));

    cameraElement.insertBefore(fragment, refChild);
  }

  protected _removePanelElements(panels: ElementPanel[]) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    panels.forEach(panel => {
      cameraElement.removeChild(panel.element);
    });
  }

  protected _collectPanels(): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const cameraElement = flicking.camera.element;
    const cameraChilds = toArray(cameraElement.childNodes);

    const align = this._getPanelAlign();

    // Remove all text nodes
    cameraChilds.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        cameraElement.removeChild(child);
      }
    });

    this._panels = cameraChilds.map(
      (el: HTMLElement, index: number) => new ElementPanel({ flicking, el, index, align })
    );
    return this;
  }
}

export default RawRenderer;
