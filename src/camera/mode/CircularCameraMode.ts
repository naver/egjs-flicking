/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "../../core/panel/Panel";
import AnchorPoint from "../../core/AnchorPoint";
import { DIRECTION } from "../../const/external";
import { circulatePosition } from "../../utils";

import CameraMode from "./CameraMode";

/**
 * A {@link Camera} mode that connects the last panel and the first panel, enabling continuous loop
 * @ko 첫번째 패널과 마지막 패널이 이어진 상태로, 무한히 회전할 수 있는 종류의 {@link Camera} 모드
 */
class CircularCameraMode extends CameraMode {
  public checkAvailability(): boolean {
    const flicking = this._flicking;
    const renderer = flicking.renderer;
    const panels = renderer.panels;

    if (panels.length <= 0) {
      return false;
    }

    const firstPanel = panels[0];
    const lastPanel = panels[panels.length - 1];
    const firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
    const lastPanelNext = lastPanel.range.max + lastPanel.margin.next;

    const visibleSize = flicking.camera.size;
    const panelSizeSum = lastPanelNext - firstPanelPrev;

    const canSetCircularMode = panels
      .every(panel => panelSizeSum - panel.size >= visibleSize);

    return canSetCircularMode;
  }

  public getRange(): { min: number; max: number } {
    const flicking = this._flicking;
    const panels = flicking.renderer.panels;

    if (panels.length <= 0) {
      return { min: 0, max: 0 };
    }

    const firstPanel = panels[0];
    const lastPanel = panels[panels.length - 1];
    const firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
    const lastPanelNext = lastPanel.range.max + lastPanel.margin.next;

    return { min: firstPanelPrev, max: lastPanelNext };
  }

  public getAnchors(): AnchorPoint[] {
    const flicking = this._flicking;
    const panels = flicking.renderer.panels;

    return panels.map((panel, index) => new AnchorPoint({
      index,
      position: panel.position,
      panel
    }));
  }

  public findNearestAnchor(position: number): AnchorPoint | null {
    const camera = this._flicking.camera;
    const anchors = camera.anchorPoints;

    if (anchors.length <= 0) return null;

    const camRange = camera.range;
    let minDist = Infinity;
    let minDistIndex = -1;
    for (let anchorIdx = 0; anchorIdx < anchors.length; anchorIdx++) {
      const anchor = anchors[anchorIdx];
      const dist = Math.min(
        Math.abs(anchor.position - position),
        Math.abs(anchor.position - camRange.min + camRange.max - position),
        Math.abs(position - camRange.min + camRange.max - anchor.position)
      );

      if (dist < minDist) {
        minDist = dist;
        minDistIndex = anchorIdx;
      }
    }

    // Return last anchor
    return anchors[minDistIndex];
  }

  public findAnchorIncludePosition(position: number): AnchorPoint | null {
    const camera = this._flicking.camera;
    const range = camera.range;
    const anchors = camera.anchorPoints;
    const rangeDiff = camera.rangeDiff;
    const anchorCount = anchors.length;
    const positionInRange = circulatePosition(position, range.min, range.max);

    let anchorInRange: AnchorPoint | null = super.findAnchorIncludePosition(positionInRange);

    if (anchorCount > 0 && (position === range.min || position === range.max)) {
      const possibleAnchors = [
        anchorInRange,
        new AnchorPoint({
          index: 0,
          position: anchors[0].position + rangeDiff,
          panel: anchors[0].panel
        }),
        new AnchorPoint({
          index: anchorCount - 1,
          position: anchors[anchorCount - 1].position - rangeDiff,
          panel: anchors[anchorCount - 1].panel
        })
      ].filter(anchor => !!anchor) as AnchorPoint[];

      anchorInRange = possibleAnchors.reduce((nearest: AnchorPoint | null, anchor) => {
        if (!nearest) return anchor;

        return Math.abs(nearest.position - position) < Math.abs(anchor.position - position)
          ? nearest
          : anchor;
      }, null);
    }

    if (!anchorInRange) return null;

    if (position < range.min) {
      const loopCount = -Math.floor((range.min - position) / rangeDiff) - 1;

      return new AnchorPoint({
        index: anchorInRange.index,
        position: anchorInRange.position + rangeDiff * loopCount,
        panel: anchorInRange.panel
      });
    } else if (position > range.max) {
      const loopCount = Math.floor((position - range.max) / rangeDiff) + 1;

      return new AnchorPoint({
        index: anchorInRange.index,
        position: anchorInRange.position + rangeDiff * loopCount,
        panel: anchorInRange.panel
      });
    }

    return anchorInRange;
  }

  public getCircularOffset(): number {
    const flicking = this._flicking;
    const camera = flicking.camera;

    if (!camera.circularEnabled) return 0;

    const toggled = flicking.panels.filter(panel => panel.toggled);
    const toggledPrev = toggled.filter(panel => panel.toggleDirection === DIRECTION.PREV);
    const toggledNext = toggled.filter(panel => panel.toggleDirection === DIRECTION.NEXT);

    return this._calcPanelAreaSum(toggledPrev) - this._calcPanelAreaSum(toggledNext);
  }

  public clampToReachablePosition(position: number): number {
    // Basically all position is reachable for circular camera
    return position;
  }

  public canReach(panel: Panel): boolean {
    if (panel.removed) return false;

    // Always reachable on circular mode
    return true;
  }

  public canSee(panel: Panel): boolean {
    const camera = this._flicking.camera;
    const range = camera.range;
    const rangeDiff = camera.rangeDiff;
    const visibleRange = camera.visibleRange;
    const visibleInCurrentRange = super.canSee(panel);

    // Check looped visible area for circular case
    if (visibleRange.min < range.min) {
      return visibleInCurrentRange || panel.isVisibleOnRange(visibleRange.min + rangeDiff, visibleRange.max + rangeDiff);
    } else if (visibleRange.max > range.max) {
      return visibleInCurrentRange || panel.isVisibleOnRange(visibleRange.min - rangeDiff, visibleRange.max - rangeDiff);
    }

    return visibleInCurrentRange;
  }

  private _calcPanelAreaSum(panels: Panel[]) {
    return panels.reduce((sum: number, panel: Panel) => sum + panel.sizeIncludingMargin, 0);
  }
}

export default CircularCameraMode;
