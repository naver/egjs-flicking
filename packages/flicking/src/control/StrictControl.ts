/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Panel from "../core/panel/Panel";
import * as ERROR from "../error/codes";
import FlickingError from "../error/FlickingError";
import { clamp, getFlickingAttached, getMinusCompensatedIndex, isBetween } from "../utils";

import Control, { MoveToPanelParams } from "./Control";
/**
 * Options for the {@link StrictControl}
 */
export interface StrictControlOptions {
  /** Maximum number of panels that can be moved at a time */
  count: number;
}

/**
 * A {@link Control} that allows you to select the maximum number of panels to move at a time
 * @since 4.2.0
 * @public
 */
class StrictControl extends Control {
  private _count: number;
  private _indexRange: { min: number; max: number };

  /**
   * Maximum number of panels that can be moved at a time
   * @defaultValue 1
   */
  public get count(): number {
    return this._count;
  }

  public set count(val: StrictControlOptions["count"]) {
    this._count = val;
  }

  public constructor(options: Partial<StrictControlOptions> = {}) {
    super();

    const { count = 1 } = options;

    this._count = count;
    this._resetIndexRange();
  }

  /**
   * Destroy Control and return to initial state
   * @remarks
   * This method also resets the index range used for movement constraints.
   */
  public destroy() {
    super.destroy();

    this._resetIndexRange();
  }

  /**
   * Update {@link Control.controller | controller}'s state
   * @remarks
   * StrictControl limits the movement range based on the {@link StrictControlOptions.count | count} option.
   * @returns The current instance for method chaining
   */
  public updateInput(): this {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const renderer = flicking.renderer;
    const controller = this._controller;
    const controlParams = camera.controlParams;
    const count = this._count;

    const activePanel = controller.state.animating
      ? camera.findNearestAnchor(camera.position)?.panel
      : this._activePanel;

    if (!activePanel) {
      controller.update(controlParams);
      this._resetIndexRange();
      return this;
    }

    const cameraRange = controlParams.range;
    const currentPos = activePanel.position;
    const currentIndex = activePanel.index;
    const panelCount = renderer.panelCount;

    let prevPanelIndex = currentIndex - count;
    let nextPanelIndex = currentIndex + count;

    if (prevPanelIndex < 0) {
      prevPanelIndex = flicking.circularEnabled
        ? getMinusCompensatedIndex(((prevPanelIndex + 1) % panelCount) - 1, panelCount)
        : clamp(prevPanelIndex, 0, panelCount - 1);
    }
    if (nextPanelIndex >= panelCount) {
      nextPanelIndex = flicking.circularEnabled
        ? nextPanelIndex % panelCount
        : clamp(nextPanelIndex, 0, panelCount - 1);
    }

    const prevPanel = renderer.panels[prevPanelIndex];
    const nextPanel = renderer.panels[nextPanelIndex];

    let prevPos = Math.max(prevPanel.position, cameraRange.min);
    let nextPos = Math.min(nextPanel.position, cameraRange.max);

    if (prevPos > currentPos) {
      prevPos -= camera.rangeDiff;
    }
    if (nextPos < currentPos) {
      nextPos += camera.rangeDiff;
    }

    controlParams.range = {
      min: prevPos,
      max: nextPos
    };

    if (controlParams.circular) {
      if (controlParams.position < prevPos) {
        controlParams.position += camera.rangeDiff;
      }

      if (controlParams.position > nextPos) {
        controlParams.position -= camera.rangeDiff;
      }
    }

    controlParams.circular = false;
    controller.update(controlParams);

    this._indexRange = {
      min: prevPanel.index,
      max: nextPanel.index
    };

    return this;
  }

  public async moveToPanel(panel: Panel, options: MoveToPanelParams): Promise<void> {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const controller = this._controller;

    controller.update(camera.controlParams);

    return super.moveToPanel(panel, options);
  }

  /**
   * Move {@link Camera} to the given position
   * @remarks
   * StrictControl restricts movement to panels within the allowed index range based on the count option.
   * @param position - The target position to move
   * @param duration - Duration of the panel movement animation (unit: ms)
   * @param axesEvent - {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-release | release} event of {@link https://naver.github.io/egjs-axes/ | Axes}
   * @fires {@link MovementEvents}
   * @throws {@link MovementErrors}
   * @returns A Promise which will be resolved after reaching the target position
   */
  public moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void> {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const currentPanel = this._nextPanel ?? this._activePanel;
    const axesRange = this._controller.range;
    const indexRange = this._indexRange;
    const cameraRange = camera.range;
    const state = this._controller.state;

    const clampedPosition = clamp(camera.clampToReachablePosition(position), axesRange[0], axesRange[1]);
    const anchorAtPosition = camera.findAnchorIncludePosition(clampedPosition);

    if (!anchorAtPosition || !currentPanel) {
      return Promise.reject(
        new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE)
      );
    }

    const prevPos = currentPanel.position;
    const posDelta = flicking.animating ? state.delta : position - camera.position;

    const isOverThreshold = Math.abs(posDelta) >= flicking.threshold;
    const adjacentAnchor =
      position > prevPos ? camera.getNextAnchor(anchorAtPosition) : camera.getPrevAnchor(anchorAtPosition);

    let targetPos: number;
    let targetPanel: Panel;

    const anchors = camera.anchorPoints;
    const firstAnchor = anchors[0];
    const lastAnchor = anchors[anchors.length - 1];

    // position이 bounce으로 인하여 범위를 넘어가야 동작하도록 변경
    const shouldBounceToFirst =
      position < cameraRange.min && isBetween(firstAnchor.panel.index, indexRange.min, indexRange.max);
    const shouldBounceToLast =
      position > cameraRange.max && isBetween(lastAnchor.panel.index, indexRange.min, indexRange.max);

    const isAdjacent =
      adjacentAnchor &&
      (indexRange.min <= indexRange.max
        ? isBetween(adjacentAnchor.index, indexRange.min, indexRange.max)
        : adjacentAnchor.index >= indexRange.min || adjacentAnchor.index <= indexRange.max);

    if (shouldBounceToFirst || shouldBounceToLast) {
      // In bounce area
      const targetAnchor = position < cameraRange.min ? firstAnchor : lastAnchor;

      targetPanel = targetAnchor.panel;
      targetPos = targetAnchor.position;
    } else if (isOverThreshold && anchorAtPosition.position !== currentPanel.position) {
      // Move to anchor at position
      targetPanel = anchorAtPosition.panel;
      targetPos = anchorAtPosition.position;
    } else if (isOverThreshold && isAdjacent) {
      // Move to adjacent anchor
      targetPanel = adjacentAnchor!.panel;
      targetPos = adjacentAnchor!.position;
    } else {
      // Fallback to nearest panel from current camera
      const anchorAtCamera = camera.findNearestAnchor(camera.position);
      if (!anchorAtCamera) {
        return Promise.reject(
          new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE)
        );
      }
      return this.moveToPanel(anchorAtCamera.panel, {
        duration,
        axesEvent
      });
    }

    this._triggerIndexChangeEvent(targetPanel, position, axesEvent);

    return this._animateToPosition({
      position: targetPos,
      duration,
      newActivePanel: targetPanel,
      axesEvent
    });
  }

  public setActive = (newActivePanel: Panel, prevActivePanel: Panel | null, isTrusted: boolean) => {
    super.setActive(newActivePanel, prevActivePanel, isTrusted);
    this.updateInput();
  };

  /**
   * @internal
   * @privateRemarks
   * Resets the index range to default values.
   */
  private _resetIndexRange() {
    this._indexRange = { min: 0, max: 0 };
  }
}

export default StrictControl;
