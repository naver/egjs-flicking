/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "~/camera/Camera";
import Panel from "~/core/Panel";
import { getFlickingAttached } from "~/utils";

class CircularCamera extends Camera {
  private _circularOffset: number = 0;
  private _toggledPanels: Panel[];

  public clampToReachablePosition(position: number): number {
    // Basically all position is reachable for circular camera
    return position;
  }

  public updateRange() {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const renderer = flicking.renderer;
    const camera = flicking.camera;

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.getPanelCount() - 1);
    if (!firstPanel || !lastPanel) {
      this._range = { min: 0, max: 0 };
      return this;
    }

    const firstPanelPrev = flicking.horizontal
      ? firstPanel.bbox.left - firstPanel.margin.left
      : firstPanel.bbox.top - firstPanel.margin.top;
    const lastPanelNext = flicking.horizontal
      ? lastPanel.bbox.right + lastPanel.margin.right
      : lastPanel.bbox.bottom + lastPanel.margin.bottom;

    const viewportSize = flicking.viewport.size;
    const cameraAlignPos = camera.alignPosition;
    const cameraSize = flicking.horizontal ? viewportSize.width : viewportSize.height;

    const visibleAreaOnFirstPanel = {
      min: firstPanelPrev - cameraAlignPos,
      max: firstPanelPrev - cameraAlignPos + cameraSize
    };
    const visibleAreaOnLastPanel = {
      min: lastPanelNext - cameraAlignPos,
      max: lastPanelNext - cameraAlignPos + cameraSize
    };

    const invisiblePanelsOnFirstPanel = renderer.getPanels()
      .filter(panel => !panel.includeRange(visibleAreaOnFirstPanel.min, visibleAreaOnFirstPanel.max, false));
    const invisiblePanelsOnLastPanel = renderer.getPanels()
      .filter(panel => !panel.includeRange(visibleAreaOnLastPanel.min, visibleAreaOnLastPanel.max, false));

    let canSetCircularMode: boolean;
    if (invisiblePanelsOnFirstPanel.length <= 0 || invisiblePanelsOnLastPanel.length <= 0) {
      canSetCircularMode = false;
    } else {
      canSetCircularMode = this._getSizeSumOfPanels(invisiblePanelsOnFirstPanel) >= cameraAlignPos
        && this._getSizeSumOfPanels(invisiblePanelsOnLastPanel) >= cameraSize - cameraAlignPos;
    }

    if (canSetCircularMode) {
      this._range = { min: firstPanelPrev, max: lastPanelNext };
    } else {
      this._range = { min: firstPanel.position, max: lastPanel.position };
    }

    return this;
  }

  private _getSizeSumOfPanels(panels: Panel[]): number {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const firstPanel = panels[0];
    const lastPanel = panels[panels.length - 1];

    return flicking.horizontal
      ? lastPanel.bbox.right - firstPanel.bbox.left
      : lastPanel.bbox.bottom - firstPanel.bbox.top;
  }
}

export default CircularCamera;
