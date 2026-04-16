/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";
import * as AXES from "../constants/internal";
import AnchorPoint from "../core/AnchorPoint";
import * as ERROR from "../error/codes";
import FlickingError from "../error/FlickingError";
import { circulateIndex, clamp, getFlickingAttached } from "../utils";

import Control from "./Control";

/**
 * Options for the {@link SnapControl}
 */
export interface SnapControlOptions {
  /** Maximum number of panels can go after release */
  count: number;
}

/**
 * A {@link Control} that uses a release momentum to choose destination panel
 * @public
 */
class SnapControl extends Control {
  private _count: SnapControlOptions["count"];

  /**
   * Maximum number of panels can go after release
   * @defaultValue Infinity
   */
  public get count(): number {
    return this._count;
  }

  public set count(val: SnapControlOptions["count"]) {
    this._count = val;
  }

  public constructor(options: Partial<SnapControlOptions> = {}) {
    super();

    const { count = Infinity } = options;

    this._count = count;
  }

  /**
   * Move {@link Camera} to the given position
   * @remarks
   * This method calculates the snap target based on the release momentum and threshold settings.
   * @param position - The target position to move
   * @param duration - Duration of the panel movement animation (unit: ms)
   * @param axesEvent - {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-release | release} event of {@link https://naver.github.io/egjs-axes/ | Axes}
   * @fires {@link MovementEvents}
   * @throws {@link MovementErrors}
   * @returns A Promise which will be resolved after reaching the target position
   */
  public moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const activeAnchor = camera.findActiveAnchor();
    const anchorAtCamera = camera.findNearestAnchor(camera.position);
    const state = this._controller.state;

    if (!activeAnchor || !anchorAtCamera) {
      return Promise.reject(
        new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE)
      );
    }

    const snapThreshold = this._calcSnapThreshold(flicking.threshold, position, activeAnchor);

    const posDelta = flicking.animating ? state.delta : position - camera.position;
    const absPosDelta = Math.abs(posDelta);
    const snapDelta =
      axesEvent && axesEvent.delta[AXES.POSITION_KEY] !== 0
        ? Math.abs(axesEvent.delta[AXES.POSITION_KEY])
        : absPosDelta;
    let targetAnchor: AnchorPoint;

    if (snapDelta >= snapThreshold && snapDelta > 0) {
      // Move to anchor at position
      targetAnchor = this._findSnappedAnchor(position, anchorAtCamera);
    } else if (absPosDelta >= flicking.threshold && absPosDelta > 0) {
      // Move to the adjacent panel
      targetAnchor = this._findAdjacentAnchor(position, posDelta, anchorAtCamera);
    } else {
      // Fallback to nearest panel from current camera
      return this.moveToPanel(anchorAtCamera.panel, {
        duration,
        axesEvent
      });
    }

    this._triggerIndexChangeEvent(targetAnchor.panel, position, axesEvent);

    return this._animateToPosition({
      position: camera.clampToReachablePosition(targetAnchor.position),
      duration,
      newActivePanel: targetAnchor.panel,
      axesEvent
    });
  }

  /**
   * @internal
   * @privateRemarks
   * Finds the anchor point to snap to based on the target position and count option.
   */
  private _findSnappedAnchor(position: number, anchorAtCamera: AnchorPoint): AnchorPoint {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const count = this._count;

    const currentPos = camera.position;

    const clampedPosition = camera.clampToReachablePosition(position);
    const anchorAtPosition = camera.findAnchorIncludePosition(clampedPosition);

    if (!anchorAtCamera || !anchorAtPosition) {
      throw new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE);
    }

    if (!Number.isFinite(count)) {
      return anchorAtPosition;
    }

    const panelCount = flicking.panelCount;
    const anchors = camera.anchorPoints;

    let loopCount = Math.sign(position - currentPos) * Math.floor(Math.abs(position - currentPos) / camera.rangeDiff);
    if (
      (position > currentPos && anchorAtPosition.index < anchorAtCamera.index) ||
      (anchorAtPosition.position > anchorAtCamera.position && anchorAtPosition.index === anchorAtCamera.index)
    ) {
      loopCount += 1;
    } else if (
      (position < currentPos && anchorAtPosition.index > anchorAtCamera.index) ||
      (anchorAtPosition.position < anchorAtCamera.position && anchorAtPosition.index === anchorAtCamera.index)
    ) {
      loopCount -= 1;
    }

    const circularIndexOffset = loopCount * panelCount;
    const anchorAtPositionIndex = anchorAtPosition.index + circularIndexOffset;

    if (Math.abs(anchorAtPositionIndex - anchorAtCamera.index) <= count) {
      const anchor = anchors[anchorAtPosition.index];

      return new AnchorPoint({
        index: anchor.index,
        position: anchor.position + loopCount * camera.rangeDiff,
        panel: anchor.panel
      });
    }

    if (flicking.circularEnabled) {
      const targetAnchor =
        anchors[circulateIndex(anchorAtCamera.index + Math.sign(position - currentPos) * count, panelCount)];
      let loop = Math.floor(count / panelCount);

      if (position > currentPos && targetAnchor.index < anchorAtCamera.index) {
        loop += 1;
      } else if (position < currentPos && targetAnchor.index > anchorAtCamera.index) {
        loop -= 1;
      }

      return new AnchorPoint({
        index: targetAnchor.index,
        position: targetAnchor.position + loop * camera.rangeDiff,
        panel: targetAnchor.panel
      });
    } else {
      return anchors[clamp(anchorAtCamera.index + Math.sign(position - currentPos) * count, 0, anchors.length - 1)];
    }
  }

  /**
   * @internal
   * @privateRemarks
   * Finds the adjacent anchor point based on the movement direction.
   */
  private _findAdjacentAnchor(position: number, posDelta: number, anchorAtCamera: AnchorPoint): AnchorPoint {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;

    if (camera.circularEnabled) {
      const anchorIncludePosition = camera.findAnchorIncludePosition(position);

      if (anchorIncludePosition && anchorIncludePosition.position !== anchorAtCamera.position) {
        return anchorIncludePosition;
      }
    }

    const adjacentAnchor =
      (posDelta > 0 ? camera.getNextAnchor(anchorAtCamera) : camera.getPrevAnchor(anchorAtCamera)) ?? anchorAtCamera;

    return adjacentAnchor;
  }

  /**
   * @internal
   * @privateRemarks
   * Calculates the snap threshold based on the panel size and alignment.
   */
  private _calcSnapThreshold(threshold: number, position: number, activeAnchor: AnchorPoint): number {
    const isNextDirection = position > activeAnchor.position;
    const panel = activeAnchor.panel;
    const panelSize = panel.size;
    const alignPos = panel.alignPosition;

    // Minimum distance needed to decide prev/next panel as nearest
    /*
     * |  Prev  |     Next     |
     * |<------>|<------------>|
     * [        |<-Anchor      ]
     */
    return Math.max(
      threshold,
      isNextDirection ? panelSize - alignPos + panel.margin.next : alignPos + panel.margin.prev
    );
  }
}

export default SnapControl;
