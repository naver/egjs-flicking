/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "~/Flicking";
import Panel from "~/core/Panel";
import { getCirculatedIndex, getFlickingAttached, includes, parseElement, toArray } from "~/utils";
import { ALIGN } from "~/const/external";
import { ElementLike } from "~/type/internal";

export interface RendererOptions {
  align: FlickingOptions["align"];
}

abstract class Renderer {
  // Options
  protected _align: FlickingOptions["align"];

  // Internal States
  protected _flicking: Flicking | null;
  protected _panels: Panel[];

  public constructor({
    align = ALIGN.PREV
  }: Partial<RendererOptions> = {}) {
    this._align = align;
    this._panels = [];
    this._flicking = null;
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;
    this._collectPanels();
  }

  public destroy(): this {
    this._flicking = null;
    this._panels = [];
    return this;
  }

  // Options Getter
  public getAlign() { return this._align; }

  // Options Setter
  public setAlign(val: FlickingOptions["align"]) {
    this._align = val;
    this._panels.forEach(panel => panel.setAlign(val));
  }

  public getPanels(): Panel[] {
    return this._panels;
  }

  public getPanel(index: number): Panel | null {
    return this._panels[index] || null;
  }

  public getPanelFromPosition(position: number): Panel | null {
    for (const panel of this._panels) {
      if (panel.include(position)) {
        return panel;
      }
    }

    return null;
  }

  public getPanelCount(): number {
    return this._panels.length;
  }

  public updatePanelSize(): this {
    this._panels.forEach(panel => panel.resize());
    return this;
  }

  public insert(index: number, element: ElementLike | ElementLike[]): Panel[] {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.getCamera();
    const control = flicking.getControl();
    const align = this._getPanelAlign();

    const elements = parseElement(element);
    const insertingIdx = getCirculatedIndex(index, panels.length);

    const panelsPushed = panels.slice(insertingIdx);
    const newPanels = elements.map((el, elIdx) => new Panel({ el, index: insertingIdx + elIdx, align, flicking }));

    panels.splice(insertingIdx, 0, ...newPanels);

    // Update panel indexes
    panelsPushed.forEach(panel => panel.increaeIndex(newPanels.length));

    // Insert the actual elements as camera element's children
    const cameraElement = camera.getElement();
    const nextSiblingPanel = panelsPushed[0]?.getElement() || null;
    const fragment = document.createDocumentFragment();

    newPanels.forEach(panel => fragment.appendChild(panel.getElement()));
    cameraElement.insertBefore(fragment, nextSiblingPanel);

    // Resize the newly added panels
    newPanels.forEach(panel => panel.resize());

    // Update camera range
    camera.updateRange();
    control.updateInput();

    // Move to the first panel added if no panels existed
    if (newPanels.length > 0) {
      const activePanel = control.getActivePanel();

      void control.moveToPanel(activePanel || newPanels[0], 0).catch(() => void 0);
    }

    return newPanels;
  }

  public remove(index: number, deleteCount: number = 1): Panel[] {
    const panels = this._panels;
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.getCamera();
    const control = flicking.getControl();
    const removingIdx = getCirculatedIndex(index, panels.length);

    const panelsPulled = panels.slice(removingIdx + deleteCount);
    const panelsRemoved = panels.splice(removingIdx, deleteCount);

    // Update panel indexes
    panelsPulled.forEach(panel => panel.decreaseIndex(panelsRemoved.length));

    // Remove panel elements
    const cameraElement = camera.getElement();
    panelsRemoved.forEach(panel => {
      cameraElement.removeChild(panel.getElement());
    });

    // Update camera range
    camera.updateRange();
    control.updateInput();
    control.checkActivePanelIsRemoved();

    if (panelsRemoved.length > 0) {
      const activePanel = control.getActivePanel();
      const targetPanel = includes(panelsRemoved, activePanel) ? panelsPulled[0] || panels[panels.length - 1] : activePanel;

      if (targetPanel) {
        void control.moveToPanel(targetPanel, 0).catch(() => void 0);
      }
    }

    return panelsRemoved;
  }

  private _collectPanels(): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const cameraElement = flicking.getCamera().getElement();
    const cameraChilds = toArray(cameraElement.children);

    const align = this._getPanelAlign();

    this._panels = cameraChilds.map(
      (el: HTMLElement, index: number) => new Panel({ flicking, el, index, align })
    );
    return this;
  }

  private _getPanelAlign() {
    const align = this._align;

    return typeof align === "object"
      ? (align as { anchor: string | number }).anchor
      : align;
  }
}

export default Renderer;
