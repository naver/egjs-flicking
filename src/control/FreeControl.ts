/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import FlickingError from "../core/FlickingError";
import * as ERROR from "../const/error";
import { getFlickingAttached } from "../utils";

import Control from "./Control";

/**
 * An options for the {@link FreeControl}
 * @ko {@link FreeControl} 생성시 사용되는 옵션
 * @interface
 * @property {boolean} stopAtEdge Make scroll animation to stop at the start/end of the scroll area, not going out the bounce area
 * <ko>스크롤 애니메이션을 스크롤 영역의 시작과 끝부분에서 멈추도록 하여, 바운스 영역을 넘어가지 않도록 합니다</ko>
 */
export interface FreeControlOptions {
  stopAtEdge: boolean;
}

/**
 * A {@link Control} that can be scrolled freely without alignment
 * @ko 패널이 정해진 지점에 정렬되지 않고, 자유롭게 스크롤할 수 있는 이동 방식을 사용하는 {@link Control}
 */
class FreeControl extends Control {
  private _stopAtEdge: FreeControlOptions["stopAtEdge"];

  /**
   * Make scroll animation to stop at the start/end of the scroll area, not going out the bounce area
   * @ko 스크롤 애니메이션을 스크롤 영역의 시작과 끝부분에서 멈추도록 하여, 바운스 영역을 넘어가지 않도록 합니다
   * @type {boolean}
   * @default true
   */
  public get stopAtEdge() { return this._stopAtEdge; }

  public set stopAtEdge(val: FreeControlOptions["stopAtEdge"]) { this._stopAtEdge = val; }

  /** */
  public constructor({
    stopAtEdge = true
  }: Partial<FreeControlOptions> = {}) {
    super();

    this._stopAtEdge = stopAtEdge;
  }

  /**
   * Update position after resizing
   * @ko resize 이후에 position을 업데이트합니다
   * @param {number} progressInPanel Previous camera's progress in active panel before resize<ko>Resize 이전 현재 선택된 패널 내에서의 카메라 progress 값</ko>
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @chainable
   * @return {Promise<void>}
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
  public moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking);

    const camera = flicking.camera;
    const targetPos = camera.clampToReachablePosition(position);

    const anchorAtPosition = camera.findAnchorIncludePosition(targetPos);

    if (!anchorAtPosition) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    const targetPanel = anchorAtPosition.panel;

    // Trigger only change event
    if (targetPanel !== this._activePanel) {
      this._triggerIndexChangeEvent(targetPanel, position, axesEvent);
    }

    return this._animateToPosition({ position: this._stopAtEdge ? targetPos : position, duration, newActivePanel: targetPanel, axesEvent });
  }
}

export default FreeControl;
