/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import RawRenderer from "~/renderer/RawRenderer";
import Panel from "~/core/Panel";
import { getFlickingAttached } from "~/utils";

class VisibleRenderer extends RawRenderer {
  public render() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const visiblePanels = camera.visiblePanels;
    const elementManipulator = this._elementManipulator;

    const visibleSortedByActualPosition = [...visiblePanels]
      .sort((a, b) => (a.position + a.offset) - (b.position + b.offset));

    const offsetGtZero = this._panels.filter(panel => panel.offset > 0);
    const visibleOffsetLteZero = visiblePanels.filter(panel => panel.offset <= 0);

    // Remove remaining(removed) elements
    elementManipulator.removeAllChildNodes(cameraElement);
    elementManipulator.insertPanelElements(visibleSortedByActualPosition, null);

    const invisiblePrevPanels = this._panels.slice(0, visibleOffsetLteZero[0]?.index ?? 0);

    const firstPanel = invisiblePrevPanels[0];
    const lastPanel = invisiblePrevPanels[invisiblePrevPanels.length - 1];

    // Calibrate offset created by circular
    const firstGtPanel = offsetGtZero[0];
    const lastGtPanel = offsetGtZero[offsetGtZero.length - 1];

    const invisibleSize = this._calcPanelRangeSize(firstPanel, lastPanel)
      - this._calcPanelRangeSize(firstGtPanel, lastGtPanel);

    camera.offset = invisibleSize;

    return this;
  }

  private _calcPanelRangeSize(firstPanel: Panel | null, lastPanel: Panel | null) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    if (!firstPanel || !lastPanel) {
      return 0;
    }

    return lastPanel.range.max - firstPanel.range.min
      + (flicking.horizontal ? firstPanel.margin.left : firstPanel.margin.top)
      + (flicking.horizontal ? lastPanel.margin.right : lastPanel.margin.bottom);
  }
}

export default VisibleRenderer;
