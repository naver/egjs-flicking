/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import AnchorPoint from "../../core/AnchorPoint";
import Panel from "../../core/panel/Panel";
import { parseAlign } from "../../utils";

import CameraMode from "./CameraMode";

class BoundCameraMode extends CameraMode {
  public checkAvailability(): boolean {
    const flicking = this._flicking;
    const renderer = flicking.renderer;

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.panelCount - 1);

    if (!firstPanel || !lastPanel) {
      return false;
    }

    const viewportSize = flicking.camera.size;
    const firstPanelPrev = firstPanel.range.min;
    const lastPanelNext = lastPanel.range.max;
    const panelAreaSize = lastPanelNext - firstPanelPrev;
    const isBiggerThanViewport = viewportSize < panelAreaSize;

    return isBiggerThanViewport;
  }

  public getRange(): { min: number; max: number } {
    const flicking = this._flicking;
    const renderer = flicking.renderer;
    const alignPos = flicking.camera.alignPosition;

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.panelCount - 1);

    if (!firstPanel || !lastPanel) {
      return { min: 0, max: 0 };
    }

    const viewportSize = flicking.camera.size;
    const firstPanelPrev = firstPanel.range.min;
    const lastPanelNext = lastPanel.range.max;
    const panelAreaSize = lastPanelNext - firstPanelPrev;
    const isBiggerThanViewport = viewportSize < panelAreaSize;

    const firstPos = firstPanelPrev + alignPos;
    const lastPos = lastPanelNext - viewportSize + alignPos;

    if (isBiggerThanViewport) {
      return { min: firstPos, max: lastPos };
    } else {
      const align = flicking.camera.align;
      const alignVal = typeof align === "object"
        ? (align as { camera: string | number }).camera
        : align;

      const pos = firstPos + parseAlign(alignVal, lastPos - firstPos);

      return { min: pos, max: pos };
    }
  }

  public getAnchors(): AnchorPoint[] {
    const flicking = this._flicking;
    const camera = flicking.camera;
    const panels = flicking.renderer.panels;

    if (panels.length <= 0) {
      return [];
    }

    const range = flicking.camera.range;
    const reachablePanels = panels.filter(panel => camera.canReach(panel));

    if (reachablePanels.length > 0) {
      const shouldPrependBoundAnchor = reachablePanels[0].position !== range.min;
      const shouldAppendBoundAnchor = reachablePanels[reachablePanels.length - 1].position !== range.max;
      const indexOffset = shouldPrependBoundAnchor ? 1 : 0;

      const newAnchors = reachablePanels.map((panel, idx) => new AnchorPoint({
        index: idx + indexOffset,
        position: panel.position,
        panel
      }));

      if (shouldPrependBoundAnchor) {
        newAnchors.splice(0, 0, new AnchorPoint({
          index: 0,
          position: range.min,
          panel: panels[reachablePanels[0].index - 1]
        }));
      }

      if (shouldAppendBoundAnchor) {
        newAnchors.push(new AnchorPoint({
          index: newAnchors.length,
          position: range.max,
          panel: panels[reachablePanels[reachablePanels.length - 1].index + 1]
        }));
      }

      return newAnchors;
    } else if (range.min !== range.max) {
      // There're more than 2 panels
      const nearestPanelAtMin = this._findNearestPanel(range.min, panels);
      const panelAtMin = nearestPanelAtMin.index === panels.length - 1
        ? nearestPanelAtMin.prev()!
        : nearestPanelAtMin;
      const panelAtMax = panelAtMin.next()!;

      return [
        new AnchorPoint({
          index: 0,
          position: range.min,
          panel: panelAtMin
        }),
        new AnchorPoint({
          index: 1,
          position: range.max,
          panel: panelAtMax
        })
      ];
    } else {
      return [new AnchorPoint({
        index: 0,
        position: range.min,
        panel: this._findNearestPanel(range.min, panels)
      })];
    }
  }

  public findAnchorIncludePosition(position: number): AnchorPoint | null {
    const camera = this._flicking.camera;
    const range = camera.range;
    const anchors = camera.anchorPoints;

    if (anchors.length <= 0) return null;

    if (position <= range.min) {
      return anchors[0];
    } else if (position >= range.max) {
      return anchors[anchors.length - 1];
    } else {
      return super.findAnchorIncludePosition(position);
    }
  }

  private _findNearestPanel(pos: number, panels: Panel[]): Panel {
    let prevDist = Infinity;
    for (let panelIdx = 0; panelIdx < panels.length; panelIdx++) {
      const panel = panels[panelIdx];
      const dist = Math.abs(panel.position - pos);

      if (dist > prevDist) {
        // Return previous anchor
        return panels[panelIdx - 1];
      }

      prevDist = dist;
    }

    // Return last anchor
    return panels[panels.length - 1];
  }
}

export default BoundCameraMode;
