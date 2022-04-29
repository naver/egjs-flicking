/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";
import Panel from "../../core/panel/Panel";
import AnchorPoint from "../../core/AnchorPoint";
import { clamp } from "../../utils";

/**
 * A mode of camera
 */
abstract class CameraMode {
  protected _flicking: Flicking;

  /** */
  public constructor(flicking: Flicking) {
    this._flicking = flicking;
  }

  public abstract checkAvailability(): boolean;
  public abstract getRange(): { min: number; max: number };

  public getAnchors(): AnchorPoint[] {
    const panels = this._flicking.renderer.panels;

    return panels.map((panel, index) => new AnchorPoint({
      index,
      position: panel.position,
      panel
    }));
  }

  public findAnchorIncludePosition(position: number): AnchorPoint | null {
    const anchors = this._flicking.camera.anchorPoints;
    const anchorsIncludingPosition = anchors.filter(anchor => anchor.panel.includePosition(position, true));

    return anchorsIncludingPosition.reduce((nearest: AnchorPoint | null, anchor) => {
      if (!nearest) return anchor;

      return Math.abs(nearest.position - position) < Math.abs(anchor.position - position)
        ? nearest
        : anchor;
    }, null);
  }

  public findNearestAnchor(position: number): AnchorPoint | null {
    const anchors = this._flicking.camera.anchorPoints;

    if (anchors.length <= 0) return null;

    let prevDist = Infinity;
    for (let anchorIdx = 0; anchorIdx < anchors.length; anchorIdx++) {
      const anchor = anchors[anchorIdx];
      const dist = Math.abs(anchor.position - position);

      if (dist > prevDist) {
        // Return previous anchor
        return anchors[anchorIdx - 1];
      }

      prevDist = dist;
    }

    // Return last anchor
    return anchors[anchors.length - 1];
  }

  public clampToReachablePosition(position: number): number {
    const camera = this._flicking.camera;
    const range = camera.range;

    return clamp(position, range.min, range.max);
  }

  public getCircularOffset(): number {
    return 0;
  }

  public canReach(panel: Panel): boolean {
    const camera = this._flicking.camera;
    const range = camera.range;

    if (panel.removed) return false;

    const panelPos = panel.position;

    return panelPos >= range.min && panelPos <= range.max;
  }

  public canSee(panel: Panel): boolean {
    const camera = this._flicking.camera;
    const visibleRange = camera.visibleRange;
    // Should not include margin, as we don't declare what the margin is visible as what the panel is visible.
    return panel.isVisibleOnRange(visibleRange.min, visibleRange.max);
  }
}

export default CameraMode;
