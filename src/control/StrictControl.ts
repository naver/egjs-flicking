/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Panel from "../core/panel/Panel";
import FlickingError from "../core/FlickingError";
import { clamp, getFlickingAttached, getMinusCompensatedIndex, isBetween } from "../utils";
import * as ERROR from "../const/error";

import Control from "./Control";
/**
 * An options for the {@link StrictControl}
 * @ko {@link StrictControl} 생성시 사용되는 옵션
 * @interface
 * @property {number} count Maximum number of panels that can be moved at a time<ko>최대로 움직일 수 있는 패널의 개수</ko>
 */
export interface StrictControlOptions {
  count: number;
}

/**
 * A {@link Control} that allow you to select the maximum number of panels to move at a time
 * @ko 한번에 최대로 이동할 패널의 개수를 선택 가능한 {@link Control}
 */
class StrictControl extends Control {
  private _count: number;
  private _indexRange: { min: number; max: number };

  /**
   * Maximum number of panels that can be moved at a time
   * @ko 최대로 움직일 수 있는 패널의 개수
   * @type {number}
   * @default 1
   */
  public get count() { return this._count; }

  public set count(val: StrictControlOptions["count"]) { this._count = val; }

  /** */
  public constructor({
    count = 1
  }: Partial<StrictControlOptions> = {}) {
    super();

    this._count = count;
    this._resetIndexRange();
  }

  /**
   * Destroy Control and return to initial state
   * @ko Control을 초기 상태로 되돌립니다
   * @return {void}
   */
  public destroy() {
    super.destroy();

    this._resetIndexRange();
  }

  /**
   * Update {@link Control#controller controller}'s state
   * @ko {@link Control#controller controller}의 내부 상태를 갱신합니다
   * @chainable
   * @return {this}
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
        ? getMinusCompensatedIndex((prevPanelIndex + 1) % panelCount - 1, panelCount)
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

  public async moveToPanel(panel: Panel, options: Parameters<Control["moveToPanel"]>[1]): Promise<void> {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const controller = this._controller;

    controller.update(camera.controlParams);

    return super.moveToPanel(panel, options);
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
    const activePanel = this._activePanel;
    const axesRange = this._controller.range;
    const indexRange = this._indexRange;
    const cameraRange = camera.range;
    const state = this._controller.state;

    const clampedPosition = clamp(camera.clampToReachablePosition(position), axesRange[0], axesRange[1]);
    const anchorAtPosition = camera.findAnchorIncludePosition(clampedPosition);

    if (!anchorAtPosition || !activePanel) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    const prevPos = activePanel.position;
    const posDelta = flicking.animating
      ? state.delta
      : position - camera.position;

    const isOverThreshold = Math.abs(posDelta) >= flicking.threshold;
    const adjacentAnchor = (position > prevPos)
      ? camera.getNextAnchor(anchorAtPosition)
      : camera.getPrevAnchor(anchorAtPosition);

    let targetPos: number;
    let targetPanel: Panel;

    const anchors = camera.anchorPoints;
    const firstAnchor = anchors[0];
    const lastAnchor = anchors[anchors.length - 1];

    const shouldBounceToFirst = position <= cameraRange.min && isBetween(firstAnchor.panel.index, indexRange.min, indexRange.max);
    const shouldBounceToLast = position >= cameraRange.max && isBetween(lastAnchor.panel.index, indexRange.min, indexRange.max);

    const isAdjacent = adjacentAnchor && (indexRange.min <= indexRange.max
      ? isBetween(adjacentAnchor.index, indexRange.min, indexRange.max)
      : adjacentAnchor.index >= indexRange.min || adjacentAnchor.index <= indexRange.max);

    if (shouldBounceToFirst || shouldBounceToLast) {
      // In bounce area
      const targetAnchor = position < cameraRange.min ? firstAnchor : lastAnchor;

      targetPanel = targetAnchor.panel;
      targetPos = targetAnchor.position;
    } else if (isOverThreshold && anchorAtPosition.position !== activePanel.position) {
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
        return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
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

  private _resetIndexRange() {
    this._indexRange = { min: 0, max: 0 };
  }
}

export default StrictControl;
