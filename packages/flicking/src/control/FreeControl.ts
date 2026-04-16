/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";
import * as ERROR from "../error/codes";
import FlickingError from "../error/FlickingError";
import { getFlickingAttached } from "../utils";

import Control from "./Control";

/**
 * Options for the {@link FreeControl}
 */
export interface FreeControlOptions {
  /** Make scroll animation to stop at the start/end of the scroll area, not going out the bounce area */
  stopAtEdge: boolean;
}

/**
 * A {@link Control} that can be scrolled freely without alignment
 * @public
 */
class FreeControl extends Control {
  private _stopAtEdge: FreeControlOptions["stopAtEdge"];

  /**
   * Make scroll animation to stop at the start/end of the scroll area, not going out the bounce area
   * @defaultValue true
   */
  public get stopAtEdge(): boolean {
    return this._stopAtEdge;
  }

  public set stopAtEdge(val: FreeControlOptions["stopAtEdge"]) {
    this._stopAtEdge = val;
  }

  public constructor(options: Partial<FreeControlOptions> = {}) {
    super();

    const { stopAtEdge = true } = options;

    this._stopAtEdge = stopAtEdge;
  }

  /**
   * Update position after resizing
   * @remarks
   * Unlike the base Control, FreeControl preserves the progress within the panel instead of snapping to the panel position.
   * @param progressInPanel - Previous camera's progress in active panel before resize
   * @throws {@link InitializationErrors}
   */
  public updatePosition(progressInPanel: number): void {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    if (activePanel) {
      const panelRange = activePanel.range;
      const newPosition = panelRange.min + (panelRange.max - panelRange.min) * progressInPanel;

      camera.lookAt(camera.clampToReachablePosition(newPosition));
    }
  }

  /**
   * Move {@link Camera} to the given position
   * @remarks
   * Unlike SnapControl, FreeControl moves to the exact position without snapping to panel boundaries.
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
    const targetPos = camera.clampToReachablePosition(position);

    const anchorAtPosition = camera.findAnchorIncludePosition(targetPos);

    if (!anchorAtPosition) {
      return Promise.reject(
        new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE)
      );
    }

    const targetPanel = anchorAtPosition.panel;

    // Trigger only change event
    if (targetPanel !== this._activePanel) {
      this._triggerIndexChangeEvent(targetPanel, position, axesEvent);
    }

    return this._animateToPosition({
      position: this._stopAtEdge ? targetPos : position,
      duration,
      newActivePanel: targetPanel,
      axesEvent
    });
  }
}

export default FreeControl;
