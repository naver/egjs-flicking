/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";
import { ComponentEvent } from "@egjs/component";

import Flicking from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import Panel from "~/core/Panel";
import AxesController from "~/control/AxesController";
import { DIRECTION, EVENTS } from "~/const/external";
import * as ERROR from "~/const/error";
import { getDirection, getFlickingAttached } from "~/utils";

/**
 * A component that manages inputs and animation of Flicking
 * @ko Flicking의 입력 장치 & 애니메이션을 담당하는 컴포넌트
 */
abstract class Control {
  // Internal States
  protected _flicking: Flicking | null;
  protected _controller: AxesController;
  protected _activePanel: Panel | null;

  /**
   * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
   * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 이벤트를 처리하는 컨트롤러 컴포넌트
   * @type {AxesController}
   * @readonly
   */
  public get controller() { return this._controller; }
  /**
   * Index number of the {@link Flicking#currentPanel currentPanel}
   * @ko {@link Flicking#currentPanel currentPanel}의 인덱스 번호
   * @type {number}
   * @default 0
   * @readonly
   */
  public get activeIndex() { return this._activePanel?.index ?? -1; }
  /**
   * Currently active panel
   * @ko 현재 선택된 패널
   * @type {Panel}
   * @readonly
   * @see Panel
   */
  public get activePanel() { return this._activePanel; }
  /**
   * Whether Flicking's animating
   * @ko 현재 애니메이션 동작 여부
   * @type {boolean}
   * @readonly
   */
  public get animating() { return this._controller.state.animating; }
  /**
   * Whether user is clicking or touching
   * @ko 현재 사용자가 클릭/터치중인지 여부
   * @type {boolean}
   * @readonly
   */
  public get holding() { return this._controller.state.holding; }

  /** */
  public constructor() {
    this._flicking = null;
    this._controller = new AxesController();
    this._activePanel = null;
  }

  /**
   * Move {@link Camera} to the given position
   * @ko {@link Camera}를 주어진 좌표로 이동합니다
   * @method
   * @abstract
   * @memberof Control
   * @instance
   * @name moveToPosition
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
   * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
   * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
   * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
   */
  public abstract moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void>;

  /**
   * Initialize Control
   * @ko Control을 초기화합니다
   * @param {Flicking} flicking An instance of Flicking
   * @chainable
   * @return {this}
   */
  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._controller.init(flicking);

    return this;
  }

  /**
   * Destroy Control and return to initial state
   * @ko Control을 초기 상태로 되돌립니다
   * @return {void}
   */
  public destroy(): void {
    this._controller.destroy();

    this._flicking = null;
    this._activePanel = null;
  }

  /**
   * Enable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 활성화합니다
   * @chainable
   * @return {this}
   */
  public enable(): this {
    this._controller.enable();

    return this;
  }

  /**
   * Disable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 막습니다
   * @chainable
   * @return {this}
   */
  public disable(): this {
    this._controller.disable();

    return this;
  }

  /**
   * Update {@link Control#controller controller}'s state
   * @ko {@link Control#controller controller}의 내부 상태를 갱신합니다
   * @chainable
   * @return {this}
   */
  public updateInput(): this {
    this._controller.update();

    return this;
  }

  /**
   * Reset {@link Control#activePanel activePanel} to `null`
   * @ko {@link Control#activePanel activePanel}을 `null`로 초기화합니다
   * @chainable
   * @return {this}
   */
  public resetActivePanel(): this {
    this._activePanel = null;

    return this;
  }

  /**
   * Move {@link Camera} to the given panel
   * @ko {@link Camera}를 해당 패널 위로 이동합니다
   * @param {Panel} panel The target panel to move<ko>이동할 패널</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
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
   * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
   * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
   * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>
   */
  public async moveToPanel(panel: Panel, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const camera = flicking.camera;

    let position = panel.position;

    if (!camera.canReach(panel)) {
      const nearestAnchor = camera.findNearestAnchor(position);

      if (panel.removed || !nearestAnchor) {
        return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(panel.position), ERROR.CODE.POSITION_NOT_REACHABLE));
      }

      // Override position & panel if that panel is not reachable
      position = nearestAnchor.position;
      panel = nearestAnchor.panel;
    }

    this._triggerIndexChangeEvent(panel, panel.position, axesEvent);

    return this._animateToPosition({ position, duration, newActivePanel: panel, axesEvent });
  }

  protected _triggerIndexChangeEvent(panel: Panel, position: number, axesEvent?: OnRelease): void {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const triggeringEvent = panel !== this._activePanel ? EVENTS.WILL_CHANGE : EVENTS.WILL_RESTORE;
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    const event = new ComponentEvent(triggeringEvent, {
      index: panel.index,
      panel,
      isTrusted: axesEvent?.isTrusted || false,
      direction: getDirection(activePanel?.position ?? camera.position, position)
    });
    flicking.trigger(event);

    if (event.isCanceled()) {
      throw new FlickingError(ERROR.MESSAGE.STOP_CALLED_BY_USER, ERROR.CODE.STOP_CALLED_BY_USER);
    }
  }

  protected async _animateToPosition({
    position,
    duration,
    newActivePanel,
    axesEvent
  }: {
    position: number;
    duration: number;
    newActivePanel: Panel;
    axesEvent?: OnRelease;
  }) {
    const currentPanel = this._activePanel;
    const animate = () => this._controller.animateTo(position, duration, axesEvent);
    const isTrusted = axesEvent?.isTrusted || false;

    if (duration === 0) {
      this._setActivePanel(newActivePanel, currentPanel, isTrusted);
      return animate();
    } else {
      return animate().then(() => this._setActivePanel(newActivePanel, currentPanel, isTrusted));
    }
  }

  protected _setActivePanel = (newActivePanel: Panel, prevActivePanel: Panel | null, isTrusted: boolean) => {
    const flicking = getFlickingAttached(this._flicking, "Control");
    this._activePanel = newActivePanel;

    if (newActivePanel !== prevActivePanel) {
      flicking.trigger(new ComponentEvent(EVENTS.CHANGED, {
        index: newActivePanel.index,
        prevIndex: prevActivePanel?.index ?? -1,
        isTrusted,
        direction: prevActivePanel ? getDirection(prevActivePanel.position, newActivePanel.position) : DIRECTION.NONE
      }));
    } else {
      flicking.trigger(new ComponentEvent(EVENTS.RESTORED, {
        isTrusted
      }));
    }
  };
}

export default Control;