/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "~/Flicking";
import Panel from "~/core/Panel";
import ExternalManipulator from "~/renderer/ExternalManipulator";
import { ALIGN } from "~/const/external";
import { getFlickingAttached, getMinusCompensatedIndex, includes, parseElement, toArray } from "~/utils";
import { ElementLike } from "~/type/external";

export interface RendererOptions {
  align: FlickingOptions["align"];
  elementManipulator: ExternalManipulator;
}

abstract class Renderer {
  // Internal States
  protected _flicking: Flicking | null;
  protected _elementManipulator: ExternalManipulator;
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
    elementManipulator = new ExternalManipulator()
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

    if (newPanels.length <= 0) return [];

    // Reset the order of the elements first
    elementManipulator.resetPanelElementOrder(panels);

    panels.splice(insertingIdx, 0, ...newPanels);

    // Insert the actual elements as camera element's children
    elementManipulator.insertPanelElements(newPanels, panelsPushed[0] || null);

    // Resize the newly added panels
    newPanels.forEach(panel => panel.resize());

    const insertedSize = this._getPanelSizeSum(newPanels);

    // Update panel indexes & positions
    panelsPushed.forEach(panel => {
      panel.increaseIndex(newPanels.length);
      panel.increasePosition(insertedSize);
    });

    // Update camera & control
    camera.updateRange();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();

    this.render();

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
    const activePanel = control.activePanel;
    const removingIdx = getMinusCompensatedIndex(index, panels.length);

    const panelsPulled = panels.slice(removingIdx + deleteCount);
    const panelsRemoved = panels.splice(removingIdx, deleteCount);

    if (panelsRemoved.length <= 0) return [];

    // Reset the order of the elements first
    elementManipulator.resetPanelElementOrder(panels);

    // Update panel indexes & positions
    const removedSize = this._getPanelSizeSum(panelsRemoved);
    panelsPulled.forEach(panel => {
      panel.decreaseIndex(panelsRemoved.length);
      panel.decreasePosition(removedSize);
    });

    // Remove panel elements
    elementManipulator.removePanelElements(panelsRemoved);
    panelsRemoved.forEach(panel => panel.destroy());

    // Update camera & control
    camera.updateRange();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();

    if (includes(panelsRemoved, activePanel)) {
      control.resetActivePanel();
    }

    this.render();

    // FIXME: fix for animating case
    if (panelsRemoved.length > 0 && !control.animating) {
      const targetPanel = includes(panelsRemoved, activePanel)
        ? (panelsPulled[0] || panels[panels.length - 1])
        : activePanel;

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

  protected _getPanelSizeSum(panels: Panel[]): number {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const firstPanel = panels[0];
    const lastPanel = panels[panels.length - 1];

    const marginDiff = flicking.horizontal
      ? lastPanel.margin.right - firstPanel.margin.left
      : lastPanel.margin.bottom - firstPanel.margin.top;

    return (lastPanel.range.max - firstPanel.range.min) + marginDiff;
  }
}

export default Renderer;
