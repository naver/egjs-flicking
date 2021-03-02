/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "~/Flicking";
import Panel from "~/core/Panel";
import ElementManipulator from "~/renderer/ElementManipulator";
import { ALIGN } from "~/const/external";
import { getFlickingAttached, getMinusCompensatedIndex, includes, parseElement, toArray } from "~/utils";
import { ElementLike } from "~/type/external";

export interface RendererOptions {
  align: FlickingOptions["align"];
  elementManipulator: ElementManipulator;
}

abstract class Renderer {
  // Internal States
  protected _flicking: Flicking | null;
  protected _elementManipulator: ElementManipulator;
  protected _panels: Panel[];

  // Options
  protected _align: RendererOptions["align"];

  // Internal states Getter
  public get panels() { return this._panels; }
  public get panelCount() { return this._panels.length; }
  public get elementManipulator() { return this._elementManipulator; }

  // Options Getter
  public get align() { return this._align; }

  // Options Setter
  public set align(val: RendererOptions["align"]) {
    this._align = val;

    const panelAlign = this._getPanelAlign();
    this._panels.forEach(panel => { panel.align = panelAlign; });
  }

  public constructor({
    align = ALIGN.CENTER,
    elementManipulator = new ElementManipulator()
  }: Partial<RendererOptions> = {}) {
    this._align = align;
    this._flicking = null;
    this._elementManipulator = elementManipulator;
  }

  public abstract render(): this;

  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._elementManipulator.init(flicking);
    this._collectPanels();
    return this;
  }

  public destroy(): void {
    this._flicking = null;
    this._elementManipulator.destroy();
  }

  public getPanel(index: number): Panel | null {
    return this._panels[index] || null;
  }

  public insert(index: number, element: ElementLike | ElementLike[]): Panel[] {
    const panels = this._panels;
    const elementManipulator = this._elementManipulator;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { camera, control } = flicking;
    const align = this._getPanelAlign();

    const elements = parseElement(element);
    const insertingIdx = getMinusCompensatedIndex(index, panels.length);

    const panelsPushed = panels.slice(insertingIdx);
    const newPanels = elements.map((el, elIdx) => new Panel({ el, index: insertingIdx + elIdx, align, flicking }));

    // Reset the order of the elements first
    elementManipulator.resetPanelElementOrder(panels);

    panels.splice(insertingIdx, 0, ...newPanels);

    // Update panel indexes & positions
    panelsPushed.forEach(panel => {
      panel.increaseIndex(newPanels.length);
      panel.resize();
    });

    // Insert the actual elements as camera element's children
    elementManipulator.insertPanelElements(newPanels, panelsPushed[0] || null);

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

  public remove(index: number, deleteCount: number = 1): Panel[] {
    const panels = this._panels;
    const elementManipulator = this._elementManipulator;
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const { camera, control } = flicking;
    const removingIdx = getMinusCompensatedIndex(index, panels.length);

    const panelsPulled = panels.slice(removingIdx + deleteCount);
    const panelsRemoved = panels.splice(removingIdx, deleteCount);

    const firstRemoved = panelsRemoved[0];
    const lastRemoved = panelsRemoved[panelsRemoved.length - 1];
    // TODO: calc removedSize

    panelsRemoved.forEach(panel => panel.destroy());

    // Reset the order of the elements first
    elementManipulator.resetPanelElementOrder(panels);

    // Update panel indexes & positions
    panelsPulled.forEach(panel => {
      panel.decreaseIndex(panelsRemoved.length);
      panel.moveBy(-removedSize);
    });

    // Remove panel elements
    elementManipulator.removePanelElements(panelsRemoved);

    // Update camera & control
    console.log("before", camera.range.min, camera.range.max);
    camera.updateRange();
    console.log("updated to", camera.range.min, camera.range.max);
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

  public updatePanelSize(): this {
    this._panels.forEach(panel => panel.resize());
    return this;
  }

  protected _collectPanels(): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const cameraElement = flicking.camera.element;

    // Remove all text nodes in the camera element
    this._elementManipulator.removeAllTextNodes(cameraElement);

    const align = this._getPanelAlign();
    const cameraChilds = toArray(cameraElement.children);

    this._panels = cameraChilds.map(
      (el: HTMLElement, index: number) => new Panel({ flicking, el, index, align })
    );
    return this;
  }

  protected _getPanelAlign() {
    const align = this._align;

    return typeof align === "object"
      ? (align as { panel: string | number }).panel
      : align;
  }
}

export default Renderer;
