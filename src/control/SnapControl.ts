/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Panel from "../core/panel/Panel";
import FlickingError from "../core/FlickingError";
import { getFlickingAttached } from "../utils";
import * as ERROR from "../const/error";

import Control from "./Control";

/**
 * A {@link Control} that uses a release momentum to choose destination panel
 * @ko 입력을 중단한 시점의 가속도에 영향받아 도달할 패널을 계산하는 이동 방식을 사용하는 {@link Control}
 */
class SnapControl extends Control {
  /**
   * Move {@link Camera} to the given position
   * @ko {@link Camera}를 주어진 좌표로 이동합니다
   * @param {number} position The target position to move<ko>이동할 좌표</ko>
   * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
   * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
   * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
   */
  public async moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    const clampedPosition = camera.clampToReachablePosition(position);
    const anchorAtPosition = camera.findNearestAnchor(clampedPosition);

    if (!anchorAtPosition || !activePanel) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    const prevPos = activePanel.position;

    const isOverThreshold = Math.abs(position - prevPos) >= flicking.threshold;
    const adjacentAnchor = (position > prevPos)
      ? camera.getNextAnchor(anchorAtPosition)
      : camera.getPrevAnchor(anchorAtPosition);

    let targetPos: number;
    let targetPanel: Panel;

    if (isOverThreshold && anchorAtPosition.position !== activePanel.position) {
      // Move to anchor at position
      targetPanel = anchorAtPosition.panel;
      targetPos = anchorAtPosition.position;
    } else if (isOverThreshold && adjacentAnchor) {
      // Move to adjacent anchor
      targetPanel = adjacentAnchor.panel;
      targetPos = adjacentAnchor.position;
    } else {
      // Restore to active panel
      targetPos = camera.clampToReachablePosition(activePanel.position);
      targetPanel = activePanel;
    }

    this._triggerIndexChangeEvent(targetPanel, position, axesEvent);

    return this._animateToPosition({
      position: targetPos,
      duration,
      newActivePanel: targetPanel,
      axesEvent
    });
  }
}

export default SnapControl;
