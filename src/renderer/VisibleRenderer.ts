/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import RawRenderer from "~/renderer/RawRenderer";
import Panel from "~/core/Panel";
import { findIndex, getFlickingAttached } from "~/utils";

class VisibleRenderer extends RawRenderer {
  public render() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const panels = flicking.renderer.panels;
    const visiblePanels = camera.visiblePanels;
    const elementManipulator = this._elementManipulator;

    if (panels.length <= 0 || visiblePanels.length <= 0) {
      camera.offset = 0;
      return this;
    }

    const panelsSortedByActualPosition = [...panels]
      .sort((a, b) => (a.position + a.offset) - (b.position + b.offset));
    const visibleSortedByActualPosition = [...visiblePanels]
      .sort((a, b) => (a.position + a.offset) - (b.position + b.offset));

    // Remove remaining(removed) elements
    elementManipulator.removeAllChildNodes(cameraElement);
    elementManipulator.insertPanelElements(visibleSortedByActualPosition, null);

    const firstVisibleIdx = findIndex(panelsSortedByActualPosition, panel => panel.index === visibleSortedByActualPosition[0].index);

    const invisiblePrevPanels = panelsSortedByActualPosition.slice(0, firstVisibleIdx);

    const invisibleSize = this._calcPanelRangeSize(invisiblePrevPanels);

    camera.offset = invisibleSize;

    return this;
  }

  private _calcPanelRangeSize(panels: Panel[]) {
    return panels.reduce((sum, panel) => sum + panel.sizeIncludingMargin, 0);
  }
}

export default VisibleRenderer;
