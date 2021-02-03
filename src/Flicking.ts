/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import ImReady from "@egjs/imready";
import { DiffResult } from "@egjs/list-differ";

import FlickingError from "./core/FlickingError";
import Viewport from "./core/Viewport";
import Panel from "./core/Panel";
import { Control, FreeControl, SnapControl, SnapControlOptions } from "./control";
import { BoundCamera, Camera, CircularCamera, LinearCamera } from "./camera";
import { RawRenderer, Renderer, VisibleRenderer } from "./renderer";

import { EVENTS, ALIGN } from "~/const/external";
import * as ERROR from "~/const/error";
import { getElement } from "~/utils";
import { DEFAULT_MOVE_TYPE_OPTIONS, MOVE_TYPE } from "~/consts";
import {
  FlickingStatus,
  Plugin,
  MoveTypeStringOption,
  MoveTypeObjectOption,
  MoveTypeOption, ReadyEvent, BeforeResizeEvent, AfterResizeEvent
} from "~/types";
import { HoldStartEvent, HoldEndEvent, MoveStartEvent, SelectEvent, MoveEvent, MoveEndEvent, ChangeEvent, RestoreEvent, NeedPanelEvent, VisibleChangeEvent } from "~/type/event";
import { LiteralUnion, ValueOf } from "~/type/internal";
import { ElementLike } from "~/type/external";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type FlickingEvents = {
  [EVENTS.READY]: ReadyEvent;
  [EVENTS.BEFORE_RESIZE]: BeforeResizeEvent;
  [EVENTS.AFTER_RESIZE]: AfterResizeEvent;
  [EVENTS.HOLD_START]: HoldStartEvent;
  [EVENTS.HOLD_END]: HoldEndEvent;
  [EVENTS.MOVE_START]: MoveStartEvent;
  [EVENTS.MOVE]: MoveEvent;
  [EVENTS.MOVE_END]: MoveEndEvent;
  [EVENTS.CHANGE]: ChangeEvent;
  [EVENTS.RESTORE]: RestoreEvent;
  [EVENTS.SELECT]: SelectEvent;
  [EVENTS.NEED_PANEL]: NeedPanelEvent;
  [EVENTS.VISIBLE_CHANGE]: VisibleChangeEvent;
  [EVENTS.CONTENT_ERROR]: void;
};

/**
 * @param element A base element for the eg.Flicking module. When specifying a value as a `string` type, you must specify a css selector string to select the element.<ko>eg.Flicking 모듈을 사용할 기준 요소. `string`타입으로 값 지정시 요소를 선택하기 위한 css 선택자 문자열을 지정해야 한다.</ko>
 * @param options An option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
 * @param {string} [options.classPrefix="eg-flick"] A prefix of class names will be added for the panels, viewport, and camera.<ko>패널들과 뷰포트, 카메라에 추가될 클래스 이름의 접두사.</ko>
 * @param {number} [options.deceleration=0.0075] Deceleration value for panel movement animation for animation triggered by manual user input. A higher value means a shorter running time.<ko>사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
 * @param {boolean} [options.horizontal=true] The direction of panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true: 가로방향, false: 세로방향)</ko>
 * @param {boolean} [options.circular=false] Enables circular mode, which connects first/last panel for continuous scrolling.<ko>순환 모드를 활성화한다. 순환 모드에서는 양 끝의 패널이 서로 연결되어 끊김없는 스크롤이 가능하다.</ko>
 * @param {boolean} [options.infinite=false] Enables infinite mode, which can automatically trigger needPanel until reaching the last panel's index reaches the lastIndex.<ko>무한 모드를 활성화한다. 무한 모드에서는 needPanel 이벤트를 자동으로 트리거한다. 해당 동작은 마지막 패널의 인덱스가 lastIndex와 일치할때까지 일어난다.</ko>
 * @param {number} [options.infiniteThreshold=0] A Threshold from viewport edge before triggering `needPanel` event in infinite mode.<ko>무한 모드에서 `needPanel`이벤트가 발생하기 위한 뷰포트 끝으로부터의 최대 거리.</ko>
 * @param {number} [options.lastIndex=Infinity] Maximum panel index that Flicking can set. Flicking won't trigger `needPanel` when the event's panel index is greater than it.<br/>Also, if the last panel's index reached a given index, you can't add more panels.<ko>Flicking이 설정 가능한 패널의 최대 인덱스. `needPanel` 이벤트에 지정된 인덱스가 최대 패널의 개수보다 같거나 커야 하는 경우에 이벤트를 트리거하지 않게 한다.<br>또한, 마지막 패널의 인덱스가 주어진 인덱스와 동일할 경우, 새로운 패널을 더 이상 추가할 수 없다.</ko>
 * @param {number} [options.threshold=40] Movement threshold to change panel(unit: pixel). It should be dragged above the threshold to change the current panel.<ko>패널 변경을 위한 이동 임계값 (단위: 픽셀). 주어진 값 이상으로 스크롤해야만 패널 변경이 가능하다.</ko>
 * @param {number} [options.duration=100] Duration of the panel movement animation. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
 * @param {function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] An easing function applied to the panel movement animation. Default value is `easeOutCubic`.<ko>패널 이동 애니메이션에 적용할 easing함수. 기본값은 `easeOutCubic`이다.</ko>
 * @param {number} [options.defaultIndex=0] Index of the panel to set as default when initializing. A zero-based integer.<ko>초기화시 지정할 디폴트 패널의 인덱스로, 0부터 시작하는 정수.</ko>
 * @param {string[]} [options.inputType=["touch","mouse"]] Types of input devices to enable.({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption Reference})<ko>활성화할 입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption 참고})</ko>
 * @param {number} [options.thresholdAngle=45] The threshold angle value(0 ~ 90).<br>If the input angle from click/touched position is above or below this value in horizontal and vertical mode each, scrolling won't happen.<ko>스크롤 동작을 막기 위한 임계각(0 ~ 90).<br>클릭/터치한 지점으로부터 계산된 사용자 입력의 각도가 horizontal/vertical 모드에서 각각 크거나 작으면, 스크롤 동작이 이루어지지 않는다.</ko>
 * @param {number|string|number[]|string[]} [options.bounce=[10,10]] The size value of the bounce area. Only can be enabled when `circular=false`.<br>You can set different bounce value for prev/next direction by using array.<br>`number` for px value, and `string` for px, and % value relative to viewport size.(ex - 0, "10px", "20%")<ko>바운스 영역의 크기값. `circular=false`인 경우에만 사용할 수 있다.<br>배열을 통해 prev/next 방향에 대해 서로 다른 바운스 값을 지정 가능하다.<br>`number`를 통해 px값을, `stirng`을 통해 px 혹은 뷰포트 크기 대비 %값을 사용할 수 있다.(ex - 0, "10px", "20%")</ko>
 * @param {boolean} [options.autoResize=false] Whether the `resize` method should be called automatically after a window resize event.<ko>window의 `resize` 이벤트 이후 자동으로 resize()메소드를 호출할지의 여부.</ko>
 * @param {boolean} [options.adaptive=false] Whether the height(horizontal)/width(vertical) of the viewport element reflects the height/width value of the panel after completing the movement.<ko>목적 패널로 이동한 후 그 패널의 높이(horizontal)/너비(vertical)값을 뷰포트 요소의 높이/너비값에 반영할지 여부.</ko>
 * @param {number|""} [options.zIndex=2000] z-index value for viewport element.<ko>뷰포트 엘리먼트의 z-index 값.</ko>
 * @param {boolean} [options.bound=false] Prevent the view from going out of the first/last panel. Only can be enabled when `circular=false`.<ko>뷰가 첫번째와 마지막 패널 밖으로 나가는 것을 막아준다. `circular=false`인 경우에만 사용할 수 있다.</ko>
 * @param {boolean} [options.overflow=false] Disables CSS property `overflow: hidden` in viewport if `true`.<ko>`true`로 설정시 뷰포트에 `overflow: hidden` 속성을 해제한다.</ko>
 * @param {string} [options.hanger="50%"] The reference position of the hanger in the viewport, which hangs panel anchors should be stopped at.<br>It should be provided in px or % value of viewport size.<br>You can combinate those values with plus/minus sign.<br>ex) "50", "100px", "0%", "25% + 100px"<ko>뷰포트 내부의 행어의 위치. 패널의 앵커들이 뷰포트 내에서 멈추는 지점에 해당한다.<br>px값이나, 뷰포트의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
 * @param {string} [options.anchor="50%"] The reference position of the anchor in panels, which can be hanged by viewport hanger.<br>It should be provided in px or % value of panel size.<br>You can combinate those values with plus/minus sign.<br>ex) "50", "100px", "0%", "25% + 100px"<ko>패널 내부의 앵커의 위치. 뷰포트의 행어와 연계하여 패널이 화면 내에서 멈추는 지점을 설정할 수 있다.<br>px값이나, 패널의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
 * @param {number} [options.gap=0] Space value between panels. Should be given in number.(px)<ko>패널간에 부여할 간격의 크기를 나타내는 숫자.(px)</ko>
 * @param {eg.Flicking.MoveTypeOption} [options.moveType="snap"] Movement style by user input. (ex: snap, freeScroll)<ko>사용자 입력에 의한 이동 방식.(ex: snap, freeScroll)</ko>
 * @param {boolean} [options.useOffset=false] Whether to use `offsetWidth`/`offsetHeight` instead of `getBoundingClientRect` for panel/viewport size calculation.<br/>You can use this option to calculate the original panel size when CSS transform is applied to viewport or panel.<br/>⚠️ If panel size is not fixed integer value, there can be a 1px gap between panels.<ko>패널과 뷰포트의 크기를 계산할 때 `offsetWidth`/`offsetHeight`를 `getBoundingClientRect` 대신 사용할지 여부.<br/>패널이나 뷰포트에 CSS transform이 설정되어 있을 때 원래 패널 크기를 계산하려면 옵션을 활성화한다.<br/>⚠️ 패널의 크기가 정수로 고정되어있지 않다면 패널 사이에 1px의 공간이 생길 수 있다.</ko>
 * @param {boolean} [options.renderOnlyVisible=false] Whether to render visible panels only. This can dramatically increase performance when there're many panels.<ko>보이는 패널만 렌더링할지 여부를 설정한다. 패널이 많을 경우에 퍼포먼스를 크게 향상시킬 수 있다.</ko>
 * @param {boolean|string[]} [options.isEqualSize=false] This option indicates whether all panels have the same size(true) of first panel, or it can hold a list of class names that determines panel size.<br/>Enabling this option can increase performance while recalculating panel size.<ko>모든 패널의 크기가 동일한지(true), 혹은 패널 크기를 결정하는 패널 클래스들의 리스트.<br/>이 옵션을 설정하면 패널 크기 재설정시에 성능을 높일 수 있다.</ko>
 * @param {boolean} [options.isConstantSize=false] Whether all panels have a constant size that won't be changed after resize. Enabling this option can increase performance while recalculating panel size.<ko>모든 패널의 크기가 불변인지의 여부. 이 옵션을 'true'로 설정하면 패널 크기 재설정시에 성능을 높일 수 있다.</ko>
 * @param {boolean} [options.renderExternal=false] Whether to use external rendering. It will delegate DOM manipulation and can synchronize the rendered state by calling `sync()` method. You can use this option to use in frameworks like React, Vue, Angular, which has its states and rendering methods.<ko>외부 렌더링을 사용할 지의 여부. 이 옵션을 사용시 렌더링을 외부에 위임할 수 있고, `sync()`를 호출하여 그 상태를 동기화할 수 있다. 이 옵션을 사용하여, React, Vue, Angular 등 자체적인 상태와 렌더링 방법을 갖는 프레임워크에 대응할 수 있다.</ko>
 * @param {boolean} [options.resizeOnContentsReady=false] Whether to resize the Flicking after the image/video elements inside viewport are ready.<br/>Use this property to prevent wrong Flicking layout caused by dynamic image / video sizes.<ko>Flicking 내부의 이미지 / 비디오 엘리먼트들이 전부 로드되었을 때 Flicking의 크기를 재계산하기 위한 옵션.<br/>이미지 / 비디오 크기가 고정 크기가 아닐 경우 사용하여 레이아웃이 잘못되는 것을 방지할 수 있다.</ko>
 * @param {boolean} [options.collectStatistics=true] Whether to collect statistics on how you are using `Flicking`. These statistical data do not contain any personal information and are used only as a basis for the development of a user-friendly product.<ko>어떻게 `Flicking`을 사용하고 있는지에 대한 통계 수집 여부를 나타낸다. 이 통계자료는 개인정보를 포함하고 있지 않으며 오직 사용자 친화적인 제품으로 발전시키기 위한 근거자료로서 활용한다.</ko>
 */
export interface FlickingOptions {
  // UI / LAYOUT
  align: LiteralUnion<ValueOf<typeof ALIGN>> | number | { anchor: number | string; hanger: number | string };
  defaultIndex: number;
  horizontal: boolean;
  circular: boolean;
  bound: boolean;
  adaptive: boolean;
  // EVENT
  needPanelThreshold: number;
  // ANIMATION
  deceleration: number;
  duration: number;
  easing: (x: number) => number;
  // INPUT
  inputType: string[];
  moveType: MoveTypeOption;
  threshold: number;
  interruptable: boolean;
  bounce: number | string | [number | string, number | string];
  iOSEdgeSwipeThreshold: number;
  // PERFORMANCE
  isEqualSize: boolean | string[];
  isConstantSize: boolean;
  renderOnlyVisible: boolean;
  // OTHERS
  autoInit: boolean;
  autoResize: boolean;
}

/**
 * @memberof eg
 * @extends eg.Component
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
 * @requires {@link https://github.com/naver/egjs-component|eg.Component}
 * @requires {@link https://github.com/naver/egjs-axes|eg.Axes}
 * @requires {@link https://github.com/naver/egjs-imready|eg.ImReady}
 * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
 */
class Flicking extends Component<FlickingEvents> {
  /**
   * Version info string
   *
   * @ko 버전정보 문자열
   * @example
   * eg.Flicking.VERSION;  // ex) 3.0.0
   * @memberof eg.Flicking
   */
  public static VERSION = "#__VERSION__#";

  // Core components
  private _viewport: Viewport;
  private _camera: Camera;
  private _control: Control;
  private _renderer: Renderer;
  private _contentsReadyChecker: ImReady | null;

  // Options
  private _align: FlickingOptions["align"];
  private _defaultIndex: FlickingOptions["defaultIndex"];
  private _horizontal: FlickingOptions["horizontal"];
  private _circular: FlickingOptions["circular"];
  private _bound: FlickingOptions["bound"];
  private _adaptive: FlickingOptions["adaptive"];
  private _needPanelThreshold: FlickingOptions["needPanelThreshold"];
  private _deceleration: FlickingOptions["deceleration"];
  private _duration: FlickingOptions["duration"];
  private _easing: FlickingOptions["easing"];
  private _inputType: FlickingOptions["inputType"];
  private _moveType: FlickingOptions["moveType"];
  private _threshold: FlickingOptions["threshold"];
  private _interruptable: FlickingOptions["interruptable"];
  private _bounce: FlickingOptions["bounce"];
  private _iOSEdgeSwipeThreshold: FlickingOptions["iOSEdgeSwipeThreshold"];
  private _isEqualSize: FlickingOptions["isEqualSize"];
  private _isConstantSize: FlickingOptions["isConstantSize"];
  private _renderOnlyVisible: FlickingOptions["renderOnlyVisible"];
  private _autoResize: FlickingOptions["autoResize"];
  private _autoInit: FlickingOptions["autoInit"];

  // Internal State
  private _initialized: boolean;

  public constructor(root: HTMLElement | string, {
    align = ALIGN.CENTER,
    defaultIndex = 0,
    horizontal = true,
    circular = false,
    bound = false,
    adaptive = false,
    needPanelThreshold = 0,
    deceleration = 0.0075,
    duration = 500,
    easing = x => 1 - Math.pow(1 - x, 3),
    inputType = ["mouse", "touch"],
    moveType = "snap",
    threshold = 40,
    interruptable = true,
    bounce = "50%",
    iOSEdgeSwipeThreshold = 30,
    isEqualSize = false,
    isConstantSize = false,
    renderOnlyVisible = false,
    autoInit = true,
    autoResize = true
  }: Partial<FlickingOptions> = {}) {
    super();

    // Internal states
    this._initialized = false;

    // Bind options
    this._align = align;
    this._defaultIndex = defaultIndex;
    this._horizontal = horizontal;
    this._circular = circular;
    this._bound = bound;
    this._adaptive = adaptive;
    this._needPanelThreshold = needPanelThreshold;
    this._deceleration = deceleration;
    this._duration = duration;
    this._easing = easing;
    this._inputType = inputType;
    this._moveType = moveType;
    this._threshold = threshold;
    this._interruptable = interruptable;
    this._bounce = bounce;
    this._iOSEdgeSwipeThreshold = iOSEdgeSwipeThreshold;
    this._isEqualSize = isEqualSize;
    this._isConstantSize = isConstantSize;
    this._renderOnlyVisible = renderOnlyVisible;
    this._autoResize = autoResize;
    this._autoInit = autoInit;

    // Create core components
    this._viewport = new Viewport(getElement(root));
    this._renderer = this._createRenderer();
    this._camera = this._createCamera();
    this._control = this._createControl();
    this._contentsReadyChecker = null;

    if (this._autoInit) {
      this.init();
    }
  }

  /**
   *
   */
  public init(): this {
    if (this._initialized) return this;

    const camera = this._camera;
    const renderer = this._renderer;
    const control = this._control;

    camera.init(this);
    renderer.init(this);
    control.init(this);

    this.resize();

    if (this._autoResize) {
      window.addEventListener("resize", this.resize);
    }

    // Look at initial panel
    const initialPanel = renderer.getPanel(this._defaultIndex) || renderer.getPanel(0);

    if (initialPanel) {
      void control.moveToPanel(initialPanel, 0);
    }

    // Done initializing & emit ready event
    this._initialized = true;
    this.trigger(EVENTS.READY);

    return this;
  }

  /**
   * Return the reference element and all its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).
   *
   * @ko 기준 요소와 그 하위 패널들을 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.
   * @example
   * const flick = new eg.Flicking("#flick");
   * flick.destroy();
   * console.log(flick.moveTo); // null
   */
  public destroy(): void {
    if (!this._initialized) return;

    this.off();
    window.removeEventListener("resize", this.resize);

    this._control.destroy();
    this._camera.destroy();
    this._renderer.destroy();

    this._viewport.destroy();
    this._contentsReadyChecker?.destroy();

    this._initialized = false;
  }

  // Components
  public get control() { return this._control; }
  public get camera() { return this._camera; }
  public get renderer() { return this._renderer; }
  public get viewport() { return this._viewport; }
  // Internal States
  public get initialized() { return this._initialized; }
  // Options Getter
  // UI / LAYOUT
  public get align() { return this._align; }
  public get defaultIndex() { return this._defaultIndex; }
  public get horizontal() { return this._horizontal; }
  public get circular() { return this._circular; }
  public get bound() { return this._bound; }
  public get adaptive() { return this._adaptive; }
  // EVENTS
  public get needPanelThreshold() { return this._needPanelThreshold; }
  // ANIMATION
  public get deceleration() { return this._deceleration; }
  public get easing() { return this._easing; }
  public get duration() { return this._duration; }
  // INPUT
  public get inputType() { return this._inputType; }
  public get moveType() { return this._moveType; }
  public get threshold() { return this._threshold; }
  public get interruptable() { return this._interruptable; }
  public get bounce() { return this._bounce; }
  public get iOSEdgeSwipeThreshold() { return this._iOSEdgeSwipeThreshold; }
  // PERFORMANCE
  public get isEqualSize() { return this._isEqualSize; }
  public get isConstantSize() { return this._isConstantSize; }
  public get renderOnlyVisible() { return this._renderOnlyVisible; }
  // OTHERS
  public get autoInit() { return this._autoInit; }
  public get autoResize() { return this._autoResize; }

  // Options Setter
  // UI / LAYOUT
  public set align(val: FlickingOptions["align"]) {
    this._align = val;
    this._renderer.align = val;
    this._camera.align = val;
  }

  public set defaultIndex(val: FlickingOptions["defaultIndex"]) { this._defaultIndex = val; }
  public set horizontal(val: FlickingOptions["horizontal"]) { this._horizontal = val; }
  public set circular(val: FlickingOptions["circular"]) { this._circular = val; }
  public set bound(val: FlickingOptions["bound"]) { this._bound = val; }
  public set adaptive(val: FlickingOptions["adaptive"]) { this._adaptive = val; }
  // ANIMATION
  public set deceleration(val: FlickingOptions["deceleration"]) { this._deceleration = val; }
  public set easing(val: FlickingOptions["easing"]) { this._easing = val; }
  public set duration(val: FlickingOptions["duration"]) { this._duration = val; }
  // INPUT
  public set inputType(val: FlickingOptions["inputType"]) { this._inputType = val; }
  public set moveType(val: FlickingOptions["moveType"]) { this._moveType = val; }
  public set threshold(val: FlickingOptions["threshold"]) { this._threshold = val; }
  public set interruptable(val: FlickingOptions["interruptable"]) { this._interruptable = val; }
  public set bounce(val: FlickingOptions["bounce"]) { this._bounce = val; }
  public set iOSEdgeSwipeThreshold(val: FlickingOptions["iOSEdgeSwipeThreshold"]) { this._iOSEdgeSwipeThreshold = val; }
  // PERFORMANCE
  public set isEqualSize(val: FlickingOptions["isEqualSize"]) { this._isEqualSize = val; }
  public set isConstantSize(val: FlickingOptions["isConstantSize"]) { this._isConstantSize = val; }
  public set isRenderOnlyVisible(val: FlickingOptions["renderOnlyVisible"]) { this._renderOnlyVisible = val; }
  // OTHERS
  public set autoInit(val: FlickingOptions["autoInit"]) { this._autoInit = val; }
  public set autoResize(val: FlickingOptions["autoResize"]) { this._autoResize = val; }

  /**
   * Move to the previous panel if it exists.
   *
   * @ko 이전 패널이 존재시 해당 패널로 이동한다.
   * @param [duration=options.duration] Duration of the panel movement animation.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
   */
  public prev(duration: number = this._duration) {
    return this.moveTo(this._control.activeIndex - 1, duration);
  }

  /**
   * Move to the next panel if it exists.
   *
   * @ko 다음 패널이 존재시 해당 패널로 이동한다.
   * @param [duration=options.duration] Duration of the panel movement animation(unit: ms).<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
   */
  public next(duration: number = this._duration) {
    return this.moveTo(this._control.activeIndex + 1, duration);
  }

  /**
   * Move to the panel of given index.
   *
   * @ko 주어진 인덱스에 해당하는 패널로 이동한다.
   * @param index The index number of the panel to move.<ko>이동할 패널의 인덱스 번호.</ko>
   * @param duration [duration=options.duration] Duration of the panel movement.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
   */
  public moveTo(index: number, duration: number = this._duration) {
    const renderer = this._renderer;
    const panelCount = renderer.getPanelCount();

    const panel = renderer.getPanel(index);

    if (!panel) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.INDEX_OUT_OF_RANGE(index, 0, panelCount - 1), ERROR.CODE.NOT_ATTACHED_TO_FLICKING));
    }

    if (this.isPlaying()) {
      // TODO: Add new error type
      return Promise.reject();
    }

    return this._control.moveToPanel(panel, duration);
  }

  /**
   * Return index of the current panel. `-1` if no panel exists.
   *
   * @ko 현재 패널의 인덱스 번호를 반환한다. 패널이 하나도 없을 경우 `-1`을 반환한다.
   * @return Current panel's index, zero-based integer.<ko>현재 패널의 인덱스 번호. 0부터 시작하는 정수.</ko>
   */
  public getIndex(): number {
    return this._control.activeIndex;
  }

  /**
   * Return the wrapper element user provided in constructor.
   *
   * @ko 사용자가 생성자에서 제공한 래퍼 엘리먼트를 반환한다.
   * @return Wrapper element user provided.<ko>사용자가 제공한 래퍼 엘리먼트.</ko>
   */
  public getElement(): HTMLElement {
    return this._viewport.element;
  }

  /**
   * Return current panel. `null` if no panel exists.
   *
   * @ko 현재 패널을 반환한다. 패널이 하나도 없을 경우 `null`을 반환한다.
   * @return Current panel.<ko>현재 패널.</ko>
   */
  public getCurrentPanel(): Panel | null {
    return this._control.activePanel;
  }

  /**
   * Return the panel of given index. `null` if it doesn't exists.
   *
   * @ko 주어진 인덱스에 해당하는 패널을 반환한다. 해당 패널이 존재하지 않을 시 `null`이다.
   * @return Panel of given index.<ko>주어진 인덱스에 해당하는 패널.</ko>
   */
  public getPanel(index: number): Panel | null {
    return this._renderer.getPanel(index);
  }

  /**
   * Return all panels.
   *
   * @ko 모든 패널들을 반환한다.
   * @param - Should include cloned panels or not.<ko>복사된 패널들을 포함할지의 여부.</ko>
   * @return All panels.<ko>모든 패널들.</ko>
   */
  public getAllPanels(): Panel[] {
    return this._renderer.getPanels();
  }

  /**
   * Return the panels currently shown in viewport area.
   *
   * @ko 현재 뷰포트 영역에서 보여지고 있는 패널들을 반환한다.
   * @return Panels currently shown in viewport area.<ko>현재 뷰포트 영역에 보여지는 패널들</ko>
   */
  public getVisiblePanels(): Panel[] {
    return [];
  }

  /**
   * Return length of original panels.
   *
   * @ko 원본 패널의 개수를 반환한다.
   * @return Length of original panels.<ko>원본 패널의 개수</ko>
   */
  public getPanelCount(): number {
    return this._renderer.getPanelCount();
  }

  /**
   * Return panel movement animation.
   *
   * @ko 현재 패널 이동 애니메이션이 진행 중인지를 반환한다.
   * @return Is animating or not.<ko>애니메이션 진행 여부.</ko>
   */
  public isPlaying(): boolean {
    return this._control.animating;
  }

  public isHolding(): boolean {
    return this._control.holding;
  }

  /**
   * Unblock input devices.
   *
   * @ko 막았던 입력 장치로부터의 입력을 푼다.
   * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
   */
  public enableInput(): this {
    this._control.controller?.enable();
    return this;
  }

  /**
   * Block input devices.
   *
   * @ko 입력 장치로부터의 입력을 막는다.
   * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
   */
  public disableInput(): this {
    this._control.controller?.disable();
    return this;
  }

  /**
   * Get current flicking status. You can restore current state by giving returned value to [setStatus()]{@link eg.Flicking#setStatus}.
   *
   * @ko 현재 상태 값을 반환한다. 반환받은 값을 [setStatus()]{@link eg.Flicking#setStatus} 메소드의 인자로 지정하면 현재 상태를 복원할 수 있다.
   * @return An object with current status value information.<ko>현재 상태값 정보를 가진 객체.</ko>
   */
  public getStatus(): FlickingStatus {
    return {
      index: -1,
      panels: [],
      position: 0
    };
  }

  /**
   * Restore to the state of the `status`.
   *
   * @ko `status`의 상태로 복원한다.
   * @param status Status value to be restored. You can specify the return value of the [getStatus()]{@link eg.Flicking#getStatus} method.<ko>복원할 상태 값. [getStatus()]{@link eg.Flicking#getStatus}메서드의 반환값을 지정하면 된다.</ko>
   */
  public setStatus(status: FlickingStatus): void {
    return;
  }

  /**
   * Add plugins that can have different effects on Flicking.
   *
   * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가한다.
   * @param - The plugin(s) to add.<ko>추가할 플러그인(들).</ko>
   * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
   */
  public addPlugins(plugins: Plugin | Plugin[]) {
    return this;
  }

  /**
   * Remove plugins from Flicking.
   *
   * @ko 플리킹으로부터 플러그인들을 제거한다.
   * @param - The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
   * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
   */
  public removePlugins(plugins: Plugin | Plugin[]) {
    return this;
  }

  /**
   * Update panels to current state.
   *
   * @ko 패널들을 현재 상태에 맞춰 갱신한다.
   * @method
   * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
   */
  public resize = (): this => {
    const viewport = this._viewport;
    const renderer = this._renderer;
    const camera = this._camera;
    const control = this._control;

    const prevSize = viewport.size;

    this.trigger(EVENTS.BEFORE_RESIZE, {
      ...prevSize,
      element: viewport.element
    });

    viewport.updateSize();
    renderer.updatePanelSize();
    camera.updateRange();
    camera.updateAlignPos();
    control.updateInput();

    const newSize = viewport.size;
    const sizeChanged = newSize.width !== prevSize.width
      || newSize.height !== prevSize.height;

    this.trigger(EVENTS.AFTER_RESIZE, {
      ...newSize,
      prev: prevSize,
      sizeChanged,
      element: viewport.element
    });
    return this;
  };

  /**
   * Add new panels at the end of panels.
   *
   * @ko 제일 끝에 새로운 패널을 추가한다.
   * @param element - Either HTMLElement, HTML string, or array of them.<br>It can be also HTML string of multiple elements with same depth.<ko>HTMLElement 혹은 HTML 문자열, 혹은 그것들의 배열도 가능하다.<br>또한, 같은 depth의 여러 개의 엘리먼트에 해당하는 HTML 문자열도 가능하다.</ko>
   * @return Array of appended panels.<ko>추가된 패널들의 배열</ko>
   * @example
   * // Suppose there were no panels at initialization
   * const flicking = new eg.Flicking("#flick");
   * flicking.append(document.createElement("div")); // Appended at index 0
   * flicking.append("\<div\>Panel\</div\>"); // Appended at index 1
   * flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]); // Appended at index 2, 3
   * // Even this is possible
   * flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>"); // Appended at index 4, 5
   */
  public append(element: ElementLike | ElementLike[]): Panel[] {
    return this._renderer.insert(this._renderer.getPanelCount(), element);
  }

  /**
   * Add new panels at the beginning of panels.
   *
   * @ko 제일 앞에 새로운 패널을 추가한다.
   * @param element - Either HTMLElement, HTML string, or array of them.<br>It can be also HTML string of multiple elements with same depth.<ko>HTMLElement 혹은 HTML 문자열, 혹은 그것들의 배열도 가능하다.<br>또한, 같은 depth의 여러 개의 엘리먼트에 해당하는 HTML 문자열도 가능하다.</ko>
   * @return Array of appended panels.<ko>추가된 패널들의 배열</ko>
   * @example
   * // Suppose there were no panels at initialization
   * const flicking = new eg.Flicking("#flick");
   * flicking.replace(3, document.createElement("div")); // Add new panel at index 3
   * flicking.prepend("\<div\>Panel\</div\>"); // Prepended at index 2
   * flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]); // Prepended at index 0, 1
   * flicking.prepend("\<div\>Panel\</div\>"); // Prepended at index 0, pushing every panels behind it.
   */
  public prepend(element: ElementLike | ElementLike[]): Panel[] {
    return this._renderer.insert(0, element);
  }

  public insert(index: number, element: ElementLike | ElementLike[]): Panel[] {
    return this._renderer.insert(index, element);
  }

  /**
   * Remove panel at target index. This will decrease index of panels behind it.
   *
   * @ko `index`에 해당하는 자리의 패널을 제거한다. 수행시 `index` 이후의 패널들의 인덱스가 감소된다.
   * @param index - Index of panel to remove.<ko>제거할 패널의 인덱스</ko>
   * @param {number} [deleteCount=1] - Number of panels to remove from index.<ko>`index` 이후로 제거할 패널의 개수.</ko>
   * @return Array of removed panels<ko>제거된 패널들의 배열</ko>
   */
  public remove(index: number, deleteCount: number = 1): Panel[] {
    return this._renderer.remove(index, deleteCount);
  }

  /**
   * Get indexes to render. Should be used with `renderOnlyVisible` option.
   * `beforeSync` should be called before this method for a correct result.
   *
   * @private
   * @ko 렌더링이 필요한 인덱스들을 반환한다. `renderOnlyVisible` 옵션과 함께 사용해야 한다. 정확한 결과를 위해선 `beforeSync`를 이전에 호출해야만 합니다.
   * @param - Info object of how panel infos are changed.<ko>패널 정보들의 변경 정보를 담는 오브젝트.</ko>
   * @return Array of indexes to render.<ko>렌더링할 인덱스의 배열</ko>
   */
  public getRenderingIndexes(diffResult: DiffResult<any>): number[] {
    return [];
  }

  private _createControl(): Control {
    const moveType = this._moveType;
    let type: MoveTypeStringOption | undefined;
    let moveTypeOptions: MoveTypeObjectOption | undefined;

    if (typeof moveType === "string" && moveType in DEFAULT_MOVE_TYPE_OPTIONS) {
      type = moveType;
      moveTypeOptions = DEFAULT_MOVE_TYPE_OPTIONS[moveType];
    } else if (typeof moveType !== "string" && moveType.type && moveType.type in DEFAULT_MOVE_TYPE_OPTIONS) {
      type = moveType.type;
      moveTypeOptions = moveType;
    }

    if (!type || !moveTypeOptions) {
      throw new FlickingError(ERROR.MESSAGE.WRONG_OPTION("moveType", JSON.stringify(moveType)), ERROR.CODE.WRONG_OPTION);
    }

    const controlOption = { ...moveTypeOptions };
    switch (type) {
      case MOVE_TYPE.SNAP:
        return new SnapControl(controlOption as SnapControlOptions);
      case MOVE_TYPE.FREE_SCROLL:
        return new FreeControl();
    }
  }

  private _createCamera(): Camera {
    const cameraOption = { align: this._align };

    if (this._circular) {
      return new CircularCamera(cameraOption);
    } else if (this._bound) {
      return new BoundCamera(cameraOption);
    } else {
      return new LinearCamera(cameraOption);
    }
  }

  private _createRenderer(): Renderer {
    const rendererOption = { align: this._align };

    if (this._renderOnlyVisible) {
      return new VisibleRenderer(rendererOption);
    } else {
      return new RawRenderer(rendererOption);
    }
  }
}

export default Flicking;
