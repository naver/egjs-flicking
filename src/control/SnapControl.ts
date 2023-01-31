/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import FlickingError from "../core/FlickingError";
import AnchorPoint from "../core/AnchorPoint";
import { circulateIndex, clamp, getFlickingAttached } from "../utils";
import * as AXES from "../const/axes";
import * as ERROR from "../const/error";

import Control from "./Control";

/**
 * An options for the {@link SnapControl}
 * @ko {@link SnapControl} 생성시 사용되는 옵션
 * @interface
 * @property {number} count Maximum number of panels can go after release<ko>입력 중단 이후 통과하여 이동할 수 있는 패널의 최대 갯수</ko>
 */
export interface SnapControlOptions {
  count: number;
}

/**
 * A {@link Control} that uses a release momentum to choose destination panel
 * @ko 입력을 중단한 시점의 가속도에 영향받아 도달할 패널을 계산하는 이동 방식을 사용하는 {@link Control}
 */
class SnapControl extends Control {
  private _count: SnapControlOptions["count"];

  /**
   * Maximum number of panels can go after release
   * @ko 입력 중단 이후 통과하여 이동할 수 있는 패널의 최대 갯수
   * @type {number}
   * @default Infinity
   */
  public get count() { return this._count; }

  public set count(val: SnapControlOptions["count"]) { this._count = val; }

  /** */
  public constructor({
    count = Infinity
  }: Partial<SnapControlOptions> = {}) {
    super();

    this._count = count;
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
    const activeAnchor = camera.findActiveAnchor();
    const anchorAtCamera = camera.findNearestAnchor(camera.position);
    const state = this._controller.state;

    if (!activeAnchor || !anchorAtCamera) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    const snapThreshold = this._calcSnapThreshold(position, activeAnchor);

    const posDelta = flicking.animating
      ? state.delta
      : position - camera.position;
    const absPosDelta = Math.abs(posDelta);
    const snapDelta = axesEvent && axesEvent.delta[AXES.POSITION_KEY] !== 0
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

    if (!isFinite(count)) {
      return anchorAtPosition;
    }

    const panelCount = flicking.panelCount;
    const anchors = camera.anchorPoints;

    let loopCount = Math.sign(position - currentPos) * Math.floor(Math.abs(position - currentPos) / camera.rangeDiff);
    if ((position > currentPos && anchorAtPosition.index < anchorAtCamera.index)
      || (anchorAtPosition.position > anchorAtCamera.position && anchorAtPosition.index === anchorAtCamera.index)) {
      loopCount += 1;
    } else if ((position < currentPos && anchorAtPosition.index > anchorAtCamera.index)
      || (anchorAtPosition.position < anchorAtCamera.position && anchorAtPosition.index === anchorAtCamera.index)) {
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
      const targetAnchor = anchors[circulateIndex(anchorAtCamera.index + Math.sign(position - currentPos) * count, panelCount)];
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

  private _findAdjacentAnchor(position: number, posDelta: number, anchorAtCamera: AnchorPoint): AnchorPoint {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;

    if (camera.circularEnabled) {
      const anchorIncludePosition = camera.findAnchorIncludePosition(position);

      if (anchorIncludePosition && anchorIncludePosition.position !== anchorAtCamera.position) {
        return anchorIncludePosition;
      }
    }

    const adjacentAnchor = (posDelta > 0 ? camera.getNextAnchor(anchorAtCamera) : camera.getPrevAnchor(anchorAtCamera)) ?? anchorAtCamera;

    return adjacentAnchor;
  }

  private _calcSnapThreshold(position: number, activeAnchor: AnchorPoint): number {
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
    return isNextDirection
      ? panelSize - alignPos + panel.margin.next
      : alignPos + panel.margin.prev;
  }
}

export default SnapControl;
