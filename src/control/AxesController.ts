/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes, { PanInput, AxesEvents, OnRelease } from "@egjs/axes";

import Flicking from "../Flicking";
import FlickingError from "../core/FlickingError";
import * as AXES from "../const/axes";
import * as ERROR from "../const/error";
import { getFlickingAttached, parseBounce } from "../utils";
import { ControlParams } from "../type/external";

import StateMachine from "./StateMachine";

/**
 * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
 * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 이벤트를 처리하는 컨트롤러 컴포넌트
 * @internal
 */
class AxesController {
  private _flicking: Flicking | null;
  private _axes: Axes | null;
  private _panInput: PanInput | null;
  private _stateMachine: StateMachine;

  private _animatingContext: { start: number; end: number; offset: number };
  private _dragged: boolean;

  /**
   * An {@link https://naver.github.io/egjs-axes/docs/api/Axes Axes} instance
   * @ko {@link https://naver.github.io/egjs-axes/docs/api/Axes Axes}의 인스턴스
   * @type {Axes | null}
   * @see https://naver.github.io/egjs-axes/docs/api/Axes
   * @readonly
   */
  public get axes() { return this._axes; }
  /**
   * An {@link https://naver.github.io/egjs-axes/docs/api/PanInput PanInput} instance
   * @ko {@link https://naver.github.io/egjs-axes/docs/api/PanInput PanInput}의 인스턴스
   * @type {PanInput | null}
   * @see https://naver.github.io/egjs-axes/docs/api/PanInput
   * @readonly
   */
  public get panInput() { return this._panInput; }
  /**
   * @internal
   */
  public get stateMachine() { return this._stateMachine; }
  /**
   * A activated {@link State} that shows the current status of the user input or the animation
   * @ko 현재 활성화된 {@link State} 인스턴스로 사용자 입력 또는 애니메이션 상태를 나타냅니다
   * @type {State}
   */
  public get state() { return this._stateMachine.state; }
  /**
   * A context of the current animation playing
   * @ko 현재 재생중인 애니메이션 정보
   * @type {object}
   * @property {number} start A start position of the animation<ko>애니메이션 시작 지점</ko>
   * @property {number} end A end position of the animation<ko>애니메이션 끝 지점</ko>
   * @property {number} offset camera offset<ko>카메라 오프셋</ko>
   * @readonly
   */
  public get animatingContext() { return this._animatingContext; }
  /**
   * A current control parameters of the Axes instance
   * @ko 활성화된 현재 Axes 패러미터들
   * @type {ControlParams}
   */
  public get controlParams(): ControlParams {
    const axes = this._axes;

    if (!axes) {
      return {
        range: { min: 0, max: 0 },
        position: 0,
        circular: false
      };
    }

    const axis = axes.axis[AXES.POSITION_KEY];

    return {
      range: { min: axis.range![0], max: axis.range![1] },
      circular: (axis.circular as boolean[])[0],
      position: this.position
    };
  }

  /**
   * A Boolean indicating whether the user input is enabled
   * @ko 현재 사용자 입력이 활성화되었는지를 나타내는 값
   * @type {boolean}
   * @readonly
   */
  public get enabled() { return this._panInput?.isEnabled() ?? false; }
  /**
   * Current position value in {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
   * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} 인스턴스 내부의 현재 좌표 값
   * @type {number}
   * @readonly
   */
  public get position() { return this._axes?.get([AXES.POSITION_KEY])[AXES.POSITION_KEY] ?? 0; }
  /**
   * Current range value in {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
   * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} 인스턴스 내부의 현재 이동 범위 값
   * @type {number[]}
   * @readonly
   */
  public get range() { return this._axes?.axis[AXES.POSITION_KEY].range ?? [0, 0]; }
  /**
   * Actual bounce size(px)
   * @ko 적용된 bounce 크기(px 단위)
   * @type {number[]}
   * @readonly
   */
  public get bounce() { return this._axes?.axis[AXES.POSITION_KEY].bounce as number[] | undefined; }

  /** */
  public constructor() {
    this._resetInternalValues();
    this._stateMachine = new StateMachine();
  }

  /**
   * Initialize AxesController
   * @ko AxesController를 초기화합니다
   * @param {Flicking} flicking An instance of Flicking
   * @chainable
   * @return {this}
   */
  public init(flicking: Flicking): this {
    this._flicking = flicking;

    this._axes = new Axes({
      [AXES.POSITION_KEY]: {
        range: [0, 0],
        circular: false,
        bounce: [0, 0]
      }
    }, {
      deceleration: flicking.deceleration,
      interruptable: flicking.interruptable,
      nested: flicking.nested,
      easing: flicking.easing
    });
    this._panInput = new PanInput(flicking.viewport.element, {
      inputType: flicking.inputType,
      threshold: 1,
      iOSEdgeSwipeThreshold: flicking.iOSEdgeSwipeThreshold,
      scale: flicking.horizontal ? [-1, 0] : [0, -1],
      releaseOnScroll: true
    });

    const axes = this._axes;

    axes.connect(flicking.horizontal ? [AXES.POSITION_KEY, ""] : ["", AXES.POSITION_KEY], this._panInput);

    for (const key in AXES.EVENT) {
      const eventType = AXES.EVENT[key] as keyof AxesEvents;

      axes.on(eventType, (e: AxesEvents[typeof eventType]) => {
        this._stateMachine.fire(eventType, {
          flicking,
          axesEvent: e
        });
      });
    }

    return this;
  }

  /**
   * Destroy AxesController and return to initial state
   * @ko AxesController를 초기 상태로 되돌립니다
   * @return {void}
   */
  public destroy(): void {
    if (this._axes) {
      this.removePreventClickHandler();
      this._axes.destroy();
    }

    this._panInput?.destroy();

    this._resetInternalValues();
  }

  /**
   * Enable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 활성화합니다
   * @chainable
   * @return {this}
   */
  public enable(): this {
    this._panInput?.enable();

    return this;
  }

  /**
   * Disable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 막습니다
   * @chainable
   * @return {this}
   */
  public disable(): this {
    this._panInput?.disable();

    return this;
  }

  /**
   * Releases ongoing user input (mouse/touch)
   * @ko 사용자의 현재 입력(마우스/터치)를 중단시킵니다
   * @chainable
   * @return {this}
   */
  public release(): this {
    this._panInput?.release();

    return this;
  }

  /**
   * Change the destination and duration of the animation currently playing
   * @ko 재생 중인 애니메이션의 목적지와 재생 시간을 변경합니다
   * @param {number} position A position to move<ko>이동할 좌표</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @chainable
   * @return {this}
   */
  public updateAnimation(position: number, duration?: number): this {
    this._animatingContext = {
      ...this._animatingContext,
      end: position
    };
    this._axes?.updateAnimation({
      destPos: { [AXES.POSITION_KEY]: position },
      duration
    });

    return this;
  }

  /**
   * Stops the animation currently playing
   * @ko 재생 중인 애니메이션을 중단시킵니다
   * @chainable
   * @return {this}
   */
  public stopAnimation(): this {
    this._axes?.stopAnimation();

    return this;
  }

  /**
   * Update {@link https://naver.github.io/egjs-axes/ @egjs/axes}'s state
   * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 상태를 갱신합니다
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link AxesController#init init} is not called before
   * <ko>{@link AxesController#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
  public update(controlParams: ControlParams): this {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const axes = this._axes!;
    const axis = axes.axis[AXES.POSITION_KEY];

    axis.circular = [controlParams.circular, controlParams.circular];
    axis.range = [controlParams.range.min, controlParams.range.max];
    axis.bounce = parseBounce(flicking.bounce, camera.size);

    axes.axisManager.set({ [AXES.POSITION_KEY]: controlParams.position });

    return this;
  }

  /**
   * Attach a handler to the camera element to prevent click events during animation
   * @ko 카메라 엘리먼트에 애니메이션 도중에 클릭 이벤트를 방지하는 핸들러를 부착합니다
   * @return {this}
   */
  public addPreventClickHandler(): this {
    const flicking = getFlickingAttached(this._flicking);
    const axes = this._axes!;
    const cameraEl = flicking.camera.element;

    axes.on(AXES.EVENT.HOLD, this._onAxesHold);
    axes.on(AXES.EVENT.CHANGE, this._onAxesChange);
    cameraEl.addEventListener("click", this._preventClickWhenDragged, true);

    return this;
  }

  /**
   * Detach a handler to the camera element to prevent click events during animation
   * @ko 카메라 엘리먼트에 애니메이션 도중에 클릭 이벤트를 방지하는 핸들러를 탈착합니다
   * @return {this}
   */
  public removePreventClickHandler(): this {
    const flicking = getFlickingAttached(this._flicking);
    const axes = this._axes!;
    const cameraEl = flicking.camera.element;

    axes.off(AXES.EVENT.HOLD, this._onAxesHold);
    axes.off(AXES.EVENT.CHANGE, this._onAxesChange);
    cameraEl.removeEventListener("click", this._preventClickWhenDragged, true);

    return this;
  }

  /**
   * Run Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} using the given position
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} 메소드를 주어진 좌표를 이용하여 수행합니다
   * @param {number} position A position to move<ko>이동할 좌표</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @param {number} [axesEvent] If provided, it'll use its {@link https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#setTo setTo} method instead<ko>이 값이 주어졌을 경우, 해당 이벤트의 {@link https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#setTo setTo} 메소드를 대신해서 사용합니다.</ko>
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
   */
  public animateTo(position: number, duration: number, axesEvent?: OnRelease): Promise<void> {
    const axes = this._axes;
    const state = this._stateMachine.state;

    if (!axes) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING, ERROR.CODE.NOT_ATTACHED_TO_FLICKING));
    }

    const startPos = axes.get([AXES.POSITION_KEY])[AXES.POSITION_KEY];

    if (startPos === position) {
      const flicking = getFlickingAttached(this._flicking);

      flicking.camera.lookAt(position);

      if (state.targetPanel) {
        flicking.control.setActive(state.targetPanel, flicking.control.activePanel, axesEvent?.isTrusted ?? false);
      }
      return Promise.resolve();
    }

    this._animatingContext = {
      start: startPos,
      end: position,
      offset: 0
    };

    const animate = () => {
      const resetContext = () => {
        this._animatingContext = { start: 0, end: 0, offset: 0 };
      };

      axes.once(AXES.EVENT.FINISH, resetContext);

      if (axesEvent) {
        axesEvent.setTo({ [AXES.POSITION_KEY]: position }, duration);
      } else {
        axes.setTo({ [AXES.POSITION_KEY]: position }, duration);
      }
    };

    return new Promise((resolve, reject) => {
      const animationFinishHandler = () => {
        axes.off(AXES.EVENT.HOLD, interruptionHandler);
        resolve();
      };

      const interruptionHandler = () => {
        axes.off(AXES.EVENT.FINISH, animationFinishHandler);
        reject(new FlickingError(ERROR.MESSAGE.ANIMATION_INTERRUPTED, ERROR.CODE.ANIMATION_INTERRUPTED));
      };

      axes.once(AXES.EVENT.FINISH, animationFinishHandler);
      axes.once(AXES.EVENT.HOLD, interruptionHandler);

      animate();
    });
  }

  public updateDirection() {
    const flicking = getFlickingAttached(this._flicking);
    const axes = this._axes!;
    const panInput = this._panInput!;

    axes.disconnect(panInput);
    axes.connect(flicking.horizontal ? [AXES.POSITION_KEY, ""] : ["", AXES.POSITION_KEY], panInput);

    panInput.options.scale = flicking.horizontal ? [-1, 0] : [0, -1];
  }

  private _resetInternalValues() {
    this._flicking = null;
    this._axes = null;
    this._panInput = null;
    this._animatingContext = { start: 0, end: 0, offset: 0 };
    this._dragged = false;
  }

  private _onAxesHold = () => {
    this._dragged = false;
  };

  private _onAxesChange = () => {
    this._dragged = !!this._panInput?.isEnabled();
  };

  private _preventClickWhenDragged = (e: MouseEvent) => {
    if (this._dragged) {
      e.preventDefault();
      e.stopPropagation();
    }

    this._dragged = false;
  };
}

export default AxesController;
