/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component, { ComponentEvent } from "@egjs/component";

import FlickingError from "./core/FlickingError";
import Viewport from "./core/Viewport";
import AutoResizer from "./core/AutoResizer";
import { Panel } from "./core/panel";
import { VanillaElementProvider } from "./core/panel/provider";
import VirtualManager, { VirtualOptions } from "./core/VirtualManager";
import { Control, SnapControl, SnapControlOptions, FreeControl, StrictControl, FreeControlOptions, StrictControlOptions } from "./control";
import { Camera } from "./camera";
import { Renderer, VanillaRenderer, ExternalRenderer, RendererOptions, NormalRenderingStrategy, VirtualRenderingStrategy } from "./renderer";
import { EVENTS, ALIGN, MOVE_TYPE, DIRECTION, CIRCULAR_FALLBACK } from "./const/external";
import * as ERROR from "./const/error";
import { findIndex, getElement, includes, parseElement } from "./utils";
import { HoldStartEvent, HoldEndEvent, MoveStartEvent, SelectEvent, MoveEvent, MoveEndEvent, WillChangeEvent, WillRestoreEvent, NeedPanelEvent, VisibleChangeEvent, ReachEdgeEvent, ReadyEvent, AfterResizeEvent, BeforeResizeEvent, ChangedEvent, RestoredEvent, PanelChangeEvent } from "./type/event";
import { LiteralUnion, ValueOf } from "./type/internal";
import { ElementLike, Plugin, Status, MoveTypeOptions } from "./type/external";

/**
 * @interface
 */
export interface FlickingEvents {
  [EVENTS.READY]: ReadyEvent;
  [EVENTS.BEFORE_RESIZE]: BeforeResizeEvent;
  [EVENTS.AFTER_RESIZE]: AfterResizeEvent;
  [EVENTS.HOLD_START]: HoldStartEvent;
  [EVENTS.HOLD_END]: HoldEndEvent;
  [EVENTS.MOVE_START]: MoveStartEvent;
  [EVENTS.MOVE]: MoveEvent;
  [EVENTS.MOVE_END]: MoveEndEvent;
  [EVENTS.WILL_CHANGE]: WillChangeEvent;
  [EVENTS.CHANGED]: ChangedEvent;
  [EVENTS.WILL_RESTORE]: WillRestoreEvent;
  [EVENTS.RESTORED]: RestoredEvent;
  [EVENTS.SELECT]: SelectEvent;
  [EVENTS.NEED_PANEL]: NeedPanelEvent;
  [EVENTS.VISIBLE_CHANGE]: VisibleChangeEvent;
  [EVENTS.REACH_EDGE]: ReachEdgeEvent;
  [EVENTS.PANEL_CHANGE]: PanelChangeEvent;
}

/**
 * @interface
 */
export interface FlickingOptions {
  // UI / LAYOUT
  align: LiteralUnion<ValueOf<typeof ALIGN>> | number | { panel: number | string; camera: number | string };
  defaultIndex: number;
  horizontal: boolean;
  circular: boolean;
  circularFallback: LiteralUnion<ValueOf<typeof CIRCULAR_FALLBACK>>;
  bound: boolean;
  adaptive: boolean;
  panelsPerView: number;
  noPanelStyleOverride: boolean;
  resizeOnContentsReady: boolean;
  // EVENT
  needPanelThreshold: number;
  preventEventsBeforeInit: boolean;
  // ANIMATION
  deceleration: number;
  duration: number;
  easing: (x: number) => number;
  // INPUT
  inputType: string[];
  moveType: ValueOf<typeof MOVE_TYPE> | MoveTypeOptions<ValueOf<typeof MOVE_TYPE>>;
  threshold: number;
  interruptable: boolean;
  bounce: number | string | [number | string, number | string];
  iOSEdgeSwipeThreshold: number;
  preventClickOnDrag: boolean;
  disableOnInit: boolean;
  // PERFORMANCE
  renderOnlyVisible: boolean;
  virtual: VirtualOptions | null;
  // OTHERS
  autoInit: boolean;
  autoResize: boolean;
  useResizeObserver: boolean;
  externalRenderer: ExternalRenderer | null;
  // @deprecated
  renderExternal: {
    renderer: new (options: RendererOptions) => ExternalRenderer;
    rendererOptions: RendererOptions;
  } | null;
}

/**
 * @extends Component
 * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
 * @requires {@link https://github.com/naver/egjs-component|@egjs/component}
 * @requires {@link https://github.com/naver/egjs-axes|@egjs/axes}
 */
class Flicking extends Component<FlickingEvents> {
  /**
   * Version info string
   * @ko 버전정보 문자열
   * @type {string}
   * @readonly
   * @example
   * ```ts
   * Flicking.VERSION;  // ex) 4.0.0
   * ```
   */
  public static VERSION = "#__VERSION__#";

  // Core components
  private _viewport: Viewport;
  private _autoResizer: AutoResizer;
  private _camera: Camera;
  private _control: Control;
  private _renderer: Renderer;
  private _virtualManager: VirtualManager;

  // Options
  private _align: FlickingOptions["align"];
  private _defaultIndex: FlickingOptions["defaultIndex"];
  private _horizontal: FlickingOptions["horizontal"];
  private _circular: FlickingOptions["circular"];
  private _circularFallback: FlickingOptions["circularFallback"];
  private _bound: FlickingOptions["bound"];
  private _adaptive: FlickingOptions["adaptive"];
  private _panelsPerView: FlickingOptions["panelsPerView"];
  private _noPanelStyleOverride: FlickingOptions["noPanelStyleOverride"];
  private _resizeOnContentsReady: FlickingOptions["resizeOnContentsReady"];
  private _virtual: FlickingOptions["virtual"];

  private _needPanelThreshold: FlickingOptions["needPanelThreshold"];
  private _preventEventsBeforeInit: FlickingOptions["preventEventsBeforeInit"];

  private _deceleration: FlickingOptions["deceleration"];
  private _duration: FlickingOptions["duration"];
  private _easing: FlickingOptions["easing"];

  private _inputType: FlickingOptions["inputType"];
  private _moveType: FlickingOptions["moveType"];
  private _threshold: FlickingOptions["threshold"];
  private _interruptable: FlickingOptions["interruptable"];
  private _bounce: FlickingOptions["bounce"];
  private _iOSEdgeSwipeThreshold: FlickingOptions["iOSEdgeSwipeThreshold"];
  private _preventClickOnDrag: FlickingOptions["preventClickOnDrag"];
  private _disableOnInit: FlickingOptions["disableOnInit"];

  private _renderOnlyVisible: FlickingOptions["renderOnlyVisible"];

  private _autoInit: FlickingOptions["autoInit"];
  private _autoResize: FlickingOptions["autoResize"];
  private _useResizeObserver: FlickingOptions["useResizeObserver"];
  private _externalRenderer: FlickingOptions["externalRenderer"];
  private _renderExternal: FlickingOptions["renderExternal"];

  // Internal State
  private _initialized: boolean;
  private _plugins: Plugin[];

  // Components
  /**
   * {@link Control} instance of the Flicking
   * @ko 현재 Flicking에 활성화된 {@link Control} 인스턴스
   * @type {Control}
   * @default SnapControl
   * @readonly
   * @see Control
   * @see SnapControl
   * @see FreeControl
   */
  public get control() { return this._control; }
  /**
   * {@link Camera} instance of the Flicking
   * @ko 현재 Flicking에 활성화된 {@link Camera} 인스턴스
   * @type {Camera}
   * @default LinearCamera
   * @readonly
   * @see Camera
   * @see LinearCamera
   * @see BoundCamera
   * @see CircularCamera
   */
  public get camera() { return this._camera; }
  /**
   * {@link Renderer} instance of the Flicking
   * @ko 현재 Flicking에 활성화된 {@link Renderer} 인스턴스
   * @type {Renderer}
   * @default VanillaRenderer
   * @readonly
   * @see Renderer
   * @see VanillaRenderer
   * @see ExternalRenderer
   */
  public get renderer() { return this._renderer; }
  /**
   * A component that manages viewport size
   * @ko 뷰포트 크기 정보를 담당하는 컴포넌트
   * @type {Viewport}
   * @readonly
   * @see Viewport
   */
  public get viewport() { return this._viewport; }
  // Internal States
  /**
   * Whether Flicking's {@link Flicking#init init()} is called.
   * This is `true` when {@link Flicking#init init()} is called, and is `false` after calling {@link Flicking#destroy destroy()}.
   * @ko Flicking의 {@link Flicking#init init()}이 호출되었는지를 나타내는 멤버 변수.
   * 이 값은 {@link Flicking#init init()}이 호출되었으면 `true`로 변하고, {@link Flicking#destroy destroy()}호출 이후에 다시 `false`로 변경됩니다.
   * @type {boolean}
   * @default false
   * @readonly
   */
  public get initialized() { return this._initialized; }
  /**
   * Whether the `circular` option is enabled.
   * The {@link Flicking#circular circular} option can't be enabled when sum of the panel sizes are too small.
   * @ko {@link Flicking#circular circular} 옵션이 활성화되었는지 여부를 나타내는 멤버 변수.
   * {@link Flicking#circular circular} 옵션은 패널의 크기의 합이 충분하지 않을 경우 비활성화됩니다.
   * @type {boolean}
   * @default false
   * @readonly
   */
  public get circularEnabled() { return this._camera.circularEnabled; }
  /**
   * Whether the `virtual` option is enabled.
   * The {@link Flicking#virtual virtual} option can't be enabled when  {@link Flicking#panelsPerView panelsPerView} is less or equal than zero.
   * @ko {@link Flicking#virtual virtual} 옵션이 활성화되었는지 여부를 나타내는 멤버 변수.
   * {@link Flicking#virtual virtual} 옵션은 {@link Flicking#panelsPerView panelsPerView} 옵션의 값이 0보다 같거나 작으면 비활성화됩니다.
   * @type {boolean}
   * @default false
   * @readonly
   */
  public get virtualEnabled() { return this._panelsPerView > 0 && this._virtual != null; }
  /**
   * Index number of the {@link Flicking#currentPanel currentPanel}
   * @ko {@link Flicking#currentPanel currentPanel}의 인덱스 번호
   * @type {number}
   * @default 0
   * @readonly
   */
  public get index() { return this._control.activeIndex; }
  /**
   * The root(`.flicking-viewport`) element
   * @ko root(`.flicking-viewport`) 엘리먼트
   * @type {HTMLElement}
   * @readonly
   */
  public get element() { return this._viewport.element; }
  /**
   * Currently active panel
   * @ko 현재 선택된 패널
   * @type {Panel}
   * @readonly
   * @see Panel
   */
  public get currentPanel() { return this._control.activePanel; }
  /**
   * Array of panels
   * @ko 전체 패널들의 배열
   * @type {Panel[]}
   * @readonly
   * @see Panel
   */
  public get panels() { return this._renderer.panels; }
  /**
   * Count of panels
   * @ko 전체 패널의 개수
   * @type {number}
   * @readonly
   */
  public get panelCount() { return this._renderer.panelCount; }
  /**
   * Array of panels that is visible at the current position
   * @ko 현재 보이는 패널의 배열
   * @type {Panel[]}
   * @readonly
   * @see Panel
   */
  public get visiblePanels() { return this._camera.visiblePanels; }
  /**
   * Whether Flicking's animating
   * @ko 현재 애니메이션 동작 여부
   * @type {boolean}
   * @readonly
   */
  public get animating() { return this._control.animating; }
  /**
   * Whether user is clicking or touching
   * @ko 현재 사용자가 클릭/터치중인지 여부
   * @type {boolean}
   * @readonly
   */
  public get holding() { return this._control.holding; }
  /**
   * A current list of activated plugins
   * @ko 현재 활성화된 플러그인 목록
   * @type {Plugin[]}
   * @readonly
   */
  public get activePlugins() { return this._plugins; }

  // Options Getter
  // UI / LAYOUT
  /**
   * Align position of the panels within viewport. You can set different values each for the panel and camera
   * @ko 뷰포트 내에서 패널 정렬방식을 설정하는 옵션. 카메라와 패널 개별로 옵션을 설정할 수도 있습니다
   * @type {ALIGN | string | number | { panel: string | number, camera: string | number }}
   * @property {ALIGN | string | number} panel The align value for each {@link Panel}s<ko>개개의 {@link Panel}에 적용할 값</ko>
   * @property {ALIGN | string | number} camera The align value for {@link Camera}<ko>{@link Camera}에 적용할 값</ko>
   * @default "center"
   * @example
   * ```ts
   * const possibleOptions = [
   *   // Literal strings
   *   "prev", "center", "next",
   *   // % values, applied to both panel & camera
   *   "0%", "25%", "42%",
   *   // px values, arithmetic calculation with (+/-) is also allowed.
   *   "0px", "100px", "50% - 25px",
   *   // numbers, same to number + px ("0px", "100px")
   *   0, 100, 1000,
   *   // Setting a different value for panel & camera
   *   { panel: "10%", camera: "25%" }
   * ];
   *
   * possibleOptions.forEach(align => {
   *   new Flicking("#el", { align });
   * });
   * ```
   */
  public get align() { return this._align; }
  /**
   * Index of the panel to move when Flicking's {@link Flicking#init init()} is called. A zero-based integer
   * @ko Flicking의 {@link Flicking#init init()}이 호출될 때 이동할 디폴트 패널의 인덱스로, 0부터 시작하는 정수입니다
   * @type {number}
   * @default 0
   */
  public get defaultIndex() { return this._defaultIndex; }
  /**
   * Direction of panel movement (true: horizontal, false: vertical)
   * @ko 패널 이동 방향 (true: 가로방향, false: 세로방향)
   * @type {boolean}
   * @default true
   */
  public get horizontal() { return this._horizontal; }
  /**
   * Enables circular(continuous loop) mode, which connects first/last panel for continuous scrolling.
   * @ko 순환 모드를 활성화합니다. 순환 모드에서는 양 끝의 패널이 서로 연결되어 끊김없는 스크롤이 가능합니다.
   * @type {boolean}
   * @default false
   */
  public get circular() { return this._circular; }
  /**
   * Set panel control mode for the case when circular cannot be enabled.
   * "linear" will set the view's range from the top of the first panel to the top of the last panel.
   * "bound" will prevent the view from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel.
   * @ko 순환 모드 사용 불가능시 사용할 패널 조작 범위 설정 방식을 변경합니다.
   * "linear" 사용시 시점이 첫번째 엘리먼트 위에서부터 마지막 엘리먼트 위까지 움직일 수 있도록 설정합니다.
   * "bound" 사용시 시점이 첫번째 엘리먼트와 마지막 엘리먼트의 끝과 끝 사이에서 움직일 수 있도록 설정합니다.
   * @see CIRCULAR_FALLBACK
   * @type {string}
   * @default "linear"
   */
  public get circularFallback() { return this._circularFallback; }
  /**
   * Prevent the view(camera element) from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel
   * Only can be enabled when `circular=false`
   * @ko 뷰(카메라 엘리먼트)가 첫번째와 마지막 패널 밖으로 넘어가지 못하게 하여, 첫번째/마지막 패널 전/후의 빈 공간을 보이지 않도록 하는 옵션입니다
   * `circular=false`인 경우에만 사용할 수 있습니다
   * @type {boolean}
   * @default false
   */
  public get bound() { return this._bound; }
  /**
   * Update height of the viewport element after movement same to the height of the panel below. This can be only enabled when `horizontal=true`
   * @ko 이동한 후 뷰포트 엘리먼트의 크기를 현재 패널의 높이와 동일하게 설정합니다. `horizontal=true`인 경우에만 사용할 수 있습니다.
   * @type {boolean}
   * @default false
   */
  public get adaptive() { return this._adaptive; }
  /**
   * A visible number of panels on viewport. Enabling this option will automatically resize panel size
   * @ko 한 화면에 보이는 패널의 개수. 이 옵션을 활성화할 경우 패널의 크기를 강제로 재조정합니다
   * @type {number}
   * @default -1
   */
  public get panelsPerView() { return this._panelsPerView; }
  /**
   * Enabling this option will not change `width/height` style of the panels if {@link Flicking#panelsPerView} is enabled.
   * This behavior can be useful in terms of performance when you're manually managing all panel sizes
   * @ko 이 옵션을 활성화할 경우, {@link Flicking#panelsPerView} 옵션이 활성화되었을 때 패널의 `width/height` 스타일을 변경하지 않도록 설정합니다.
   * 모든 패널들의 크기를 직접 관리하고 있을 경우, 이 옵션을 활성화하면 성능면에서 유리할 수 있습니다
   * @type {boolean}
   * @default false
   */
  public get noPanelStyleOverride() { return this._noPanelStyleOverride; }
  /**
   * Enabling this option will automatically call {@link Flicking#resize} when all image/video inside panels are loaded.
   * This can be useful when you have contents inside Flicking that changes its size when it's loaded
   * @ko 이 옵션을 활성화할 경우, Flicking 패널 내부의 이미지/비디오들이 로드되었을 때 자동으로 {@link Flicking#resize}를 호출합니다.
   * 이 동작은 Flicking 내부에 로드 전/후로 크기가 변하는 콘텐츠를 포함하고 있을 때 유용하게 사용하실 수 있습니다.
   * @type {boolean}
   * @default false
   */
  public get resizeOnContentsReady() { return this._resizeOnContentsReady; }
  // EVENTS
  /**
   * A Threshold from viewport edge before triggering `needPanel` event
   * @ko `needPanel`이벤트가 발생하기 위한 뷰포트 끝으로부터의 최대 거리
   * @type {number}
   * @default 0
   */
  public get needPanelThreshold() { return this._needPanelThreshold; }
  /**
   * When enabled, events are not triggered before `ready` when initializing
   * @ko 활성화할 경우 초기화시 `ready` 이벤트 이전의 이벤트가 발생하지 않습니다.
   * @type {boolean}
   * @default true
   */
  public get preventEventsBeforeInit() { return this._preventEventsBeforeInit; }
  // ANIMATION
  /**
   * Deceleration value for panel movement animation which is triggered by user input. A higher value means a shorter animation time
   * @ko 사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아집니다
   * @type {number}
   * @default 0.0075
   */
  public get deceleration() { return this._deceleration; }
  /**
   * An easing function applied to the panel movement animation. Default value is `easeOutCubic`
   * @ko 패널 이동 애니메이션에 적용할 easing 함수. 기본값은 `easeOutCubic`이다
   * @type {function}
   * @default x => 1 - Math.pow(1 - x, 3)
   * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
   */
  public get easing() { return this._easing; }
  /**
   * Default duration of the animation (ms)
   * @ko 디폴트 애니메이션 재생 시간 (ms)
   * @type {number}
   * @default 500
   */
  public get duration() { return this._duration; }
  // INPUT
  /**
   * Types of input devices to enable
   * @ko 활성화할 입력 장치 종류
   * @type {string[]}
   * @default ["touch", "mouse"]
   * @see {@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption Possible values (PanInputOption#inputType)}
   * <ko>{@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption 가능한 값들 (PanInputOption#inputType)}</ko>
   */
  public get inputType() { return this._inputType; }
  /**
   * Movement style by user input. This will change instance type of {@link Flicking#control}
   * You can use the values of the constant {@link MOVE_TYPE}
   * @ko 사용자 입력에 의한 이동 방식. 이 값에 따라 {@link Flicking#control}의 인스턴스 타입이 결정됩니다
   * 상수 {@link MOVE_TYPE}에 정의된 값들을 이용할 수 있습니다
   * @type {MOVE_TYPE | Pair<string, object>}
   * @default "snap"
   * @example
   * |moveType|control|options|
   * |:---:|:---:|:---:|
   * |"snap"|{@link SnapControl}||
   * |"freeScroll"|{@link FreeControl}|{@link FreeControlOptions}|
   *
   * ```ts
   * import Flicking, { MOVE_TYPE } from "@egjs/flicking";
   *
   * const flicking = new Flicking({
   *   moveType: MOVE_TYPE.SNAP
   * });
   * ```
   *
   * ```ts
   * const flicking = new Flicking({
   *   // If you want more specific settings for the moveType
   *   // [moveType, options for that moveType]
   *   // In this case, it's ["freeScroll", FreeControlOptions]
   *   moveType: [MOVE_TYPE.FREE_SCROLL, { stopAtEdge: true }]
   * });
   * ```
   */
  public get moveType() { return this._moveType; }
  /**
   * Movement threshold to change panel (unit: px). It should be dragged above the threshold to change the current panel.
   * @ko 패널 변경을 위한 이동 임계값 (단위: px). 주어진 값 이상으로 스크롤해야만 패널 변경이 가능하다.
   * @type {number}
   * @default 40
   */
  public get threshold() { return this._threshold; }
  /**
   * Set animation to be interruptable by click/touch.
   * @ko 사용자의 클릭/터치로 인해 애니메이션을 도중에 멈출 수 있도록 설정합니다.
   * @type {boolean}
   * @default true
   */
  public get interruptable() { return this._interruptable; }
  /**
   * The size value of the bounce area. Only can be enabled when `circular=false`.
   * You can set different bounce value for prev/next direction by using array.
   * `number` for px value, and `string` for px, and % value relative to viewport size.
   * You have to call {@link Control#updateInput} after changing this to take effect.
   * @ko Flicking이 최대 영역을 넘어서 갈 수 있는 최대 크기. `circular=false`인 경우에만 사용할 수 있습니다.
   * 배열을 통해 prev/next 방향에 대해 서로 다른 바운스 값을 지정할 수 있습니다.
   * `number`를 통해 px값을, `stirng`을 통해 px 혹은 뷰포트 크기 대비 %값을 사용할 수 있습니다.
   * 이 값을 변경시 {@link Control#updateInput}를 호출해야 합니다.
   * @type {string | number | Array<string | number>}
   * @default "20%"
   * @example
   * ```ts
   * const possibleOptions = [
   *   // % values, relative to viewport element(".flicking-viewport")'s size
   *   "0%", "25%", "42%",
   *   // px values, arithmetic calculation with (+/-) is also allowed.
   *   "0px", "100px", "50% - 25px",
   *   // numbers, same to number + px ("0px", "100px")
   *   0, 100, 1000
   * ];
   * ```
   *
   * @example
   * ```ts
   * const flicking = new Flicking("#el", { bounce: "20%" });
   *
   * flicking.bounce = "100%";
   * flicking.control.updateInput(); // Call this to update!
   * ```
   */
  public get bounce() { return this._bounce; }
  /**
   * Size of the area from the right edge in iOS safari (in px) which enables swipe-back or swipe-forward
   * @ko iOS Safari에서 swipe를 통한 뒤로가기/앞으로가기를 활성화하는 오른쪽 끝으로부터의 영역의 크기 (px)
   * @type {number}
   * @default 30
   */
  public get iOSEdgeSwipeThreshold() { return this._iOSEdgeSwipeThreshold; }
  /**
   * Automatically prevent `click` event if the user has dragged at least a single pixel on the viewport element
   * @ko 사용자가 뷰포트 영역을 1픽셀이라도 드래그했을 경우 자동으로 {@link https://developer.mozilla.org/ko/docs/Web/API/Element/click_event click} 이벤트를 취소합니다
   * @type {boolean}
   * @default true
   */
  public get preventClickOnDrag() { return this._preventClickOnDrag; }
  /**
   * Automatically call {@link Flicking#disableInput disableInput()} on initialization
   * @ko Flicking init시에 {@link Flicking#disableInput disableInput()}을 바로 호출합니다
   * @type {boolean}
   * @default false
   */
  public get disableOnInit() { return this._disableOnInit; }
  // PERFORMANCE
  /**
   * Whether to render visible panels only. This can dramatically increase performance when there're many panels
   * @ko 보이는 패널만 렌더링할지 여부를 설정합니다. 패널이 많을 경우에 퍼포먼스를 크게 향상시킬 수 있습니다
   * @type {boolean}
   * @default false
   */
  public get renderOnlyVisible() { return this._renderOnlyVisible; }
  /**
   * By enabling this option, it will reduce memory consumption by restricting the number of DOM elements to `panelsPerView + 1`
   * Must be used with `panelsPerview`.
   * After Flicking's initialized, this property can be used to add/remove the panel count.
   * @ko 이 옵션을 활성화할 경우 패널 엘리먼트의 개수를 `panelsPerView + 1` 개로 고정함으로써, 메모리 사용량을 줄일 수 있습니다.
   * `panelsPerView` 옵션과 함께 사용되어야만 합니다.
   * Flicking 초기화 이후에, 이 프로퍼티는 렌더링하는 패널의 개수를 추가/제거하기 위해 사용될 수 있습니다.
   * @type {VirtualManager}
   * @property {function} renderPanel A rendering function for the panel element's innerHTML<ko>패널 엘리먼트의 innerHTML을 렌더링하는 함수</ko>
   * @property {number} initialPanelCount Initial panel count to render<ko>최초로 렌더링할 패널의 개수</ko>
   * @property {boolean} [cache=false] Whether to cache rendered panel's innerHTML<ko>렌더링된 패널의 innerHTML 정보를 캐시할지 여부</ko>
   * @property {string} [panelClass="flicking-panel"] The class name that will be applied to rendered panel elements<ko>렌더링되는 패널 엘리먼트에 적용될 클래스 이름</ko>
   * @example
   * ```ts
   * import Flicking, { VirtualPanel } from "@egjs/flicking";
   *
   * const flicking = new Flicking("#some_el", {
   *   panelsPerView: 3,
   *   virtual: {
   *     renderPanel: (panel: VirtualPanel, index: number) => `Panel ${index}`,
   *     initialPanelCount: 100
   *   }
   * });
   *
   * // Add 100 virtual panels (at the end)
   * flicking.virtual.append(100);
   *
   * // Remove 100 virtual panels from 0 to 100
   * flicking.virtual.remove(0, 100);
   * ```
   */
  public get virtual() { return this._virtualManager; }

  // OTHERS
  /**
   * Call {@link Flicking#init init()} automatically when creating Flicking's instance
   * @ko Flicking 인스턴스를 생성할 때 자동으로 {@link Flicking#init init()}를 호출합니다
   * @type {boolean}
   * @default true
   * @readonly
   */
  public get autoInit() { return this._autoInit; }
  /**
   * Whether to automatically call {@link Flicking#resize resize()} when the viewport element(.flicking-viewport)'s size is changed
   * @ko 뷰포트 엘리먼트(.flicking-viewport)의 크기 변경시 {@link Flicking#resize resize()} 메소드를 자동으로 호출할지 여부를 설정합니다
   * @type {boolean}
   * @default true
   */
  public get autoResize() { return this._autoResize; }
  /**
   * Whether to listen {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver ResizeObserver}'s event instead of Window's {@link https://developer.mozilla.org/ko/docs/Web/API/Window/resize_event resize} event when using the `autoResize` option
   * @ko autoResize 옵션 사용시 {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver ResizeObserver}의 이벤트를 Window객체의 {@link https://developer.mozilla.org/ko/docs/Web/API/Window/resize_event resize} 이벤트 대신 수신할지 여부를 설정합니다
   * @type {boolean}
   * @default true
   */
  public get useResizeObserver() { return this._useResizeObserver; }
  /**
   * This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.
   * @ko 프레임워크(React, Vue, Angular, ...)에서만 사용하는 옵션으로, 자동으로 설정되므로 따로 사용하실 필요 없습니다!
   * @default null
   * @internal
   * @readonly
   */
  public get externalRenderer() { return this._externalRenderer; }
  /**
   * This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.
   * @ko 프레임워크(React, Vue, Angular, ...)에서만 사용하는 옵션으로, 자동으로 설정되므로 따로 사용하실 필요 없습니다!
   * @default null
   * @internal
   * @readonly
   * @deprecated
   */
  public get renderExternal() { return this._renderExternal; }

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
  public set panelsPerView(val: FlickingOptions["panelsPerView"]) { this._panelsPerView = val; }
  public set noPanelStyleOverride(val: FlickingOptions["noPanelStyleOverride"]) { this._noPanelStyleOverride = val; }
  public set resizeOnContentsReady(val: FlickingOptions["resizeOnContentsReady"]) { this._resizeOnContentsReady = val; }
  // EVENTS
  public set needPanelThreshold(val: FlickingOptions["needPanelThreshold"]) { this._needPanelThreshold = val; }
  public set preventEventsBeforeInit(val: FlickingOptions["preventEventsBeforeInit"]) { this._preventEventsBeforeInit = val; }
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
  public set preventClickOnDrag(val: FlickingOptions["preventClickOnDrag"]) {
    const prevVal = this._preventClickOnDrag;

    if (val === prevVal) return;

    const controller = this._control.controller;

    if (val) {
      controller.addPreventClickHandler();
    } else {
      controller.removePreventClickHandler();
    }

    this._preventClickOnDrag = val;
  }

  public set disableOnInit(val: FlickingOptions["disableOnInit"]) { this._disableOnInit = val; }
  // PERFORMANCE
  public set renderOnlyVisible(val: FlickingOptions["renderOnlyVisible"]) { this._renderOnlyVisible = val; }
  // OTHERS
  public set autoResize(val: FlickingOptions["autoResize"]) {
    this._autoResize = val;

    if (val) {
      this._autoResizer.enable();
    } else {
      this._autoResizer.disable();
    }
  }

  public set useResizeObserver(val: FlickingOptions["useResizeObserver"]) {
    this._useResizeObserver = val;

    if (this._autoResize) {
      this._autoResizer.enable();
    }
  }

  /**
   * @param root A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string
   * <ko>Flicking을 초기화할 HTMLElement로, `string` 타입으로 지정시 css 선택자 문자열을 지정해야 합니다.</ko>
   * @param {object} [options={}] An options object for Flicking.<ko>Flicking에 적용할 옵션 오브젝트</ko>
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE WRONG_TYPE}|When the root is not either string or HTMLElement|
   * |{@link ERROR_CODE ELEMENT_NOT_FOUND}|When the element with given CSS selector does not exist|
   * <ko>
   *
   * |code|조건|
   * |---|---|
   * |{@link ERROR_CODE WRONG_TYPE}|루트 엘리먼트가 string이나 HTMLElement가 아닐 경우|
   * |{@link ERROR_CODE ELEMENT_NOT_FOUND}|주어진 CSS selector로 엘리먼트를 찾지 못했을 경우|
   *
   * </ko>
   * @example
   * ```ts
   * import Flicking from "@egjs/flicking";
   *
   * // Creating new instance of Flicking with HTMLElement
   * const flicking = new Flicking(document.querySelector(".flicking-viewport"), { circular: true });
   *
   * // Creating new instance of Flicking with CSS selector
   * const flicking2 = new Flicking(".flicking-viewport", { circular: true });
   * ```
   */
  public constructor(root: HTMLElement | string, {
    align = ALIGN.CENTER,
    defaultIndex = 0,
    horizontal = true,
    circular = false,
    circularFallback = CIRCULAR_FALLBACK.LINEAR,
    bound = false,
    adaptive = false,
    panelsPerView = -1,
    noPanelStyleOverride = false,
    resizeOnContentsReady = false,
    needPanelThreshold = 0,
    preventEventsBeforeInit = true,
    deceleration = 0.0075,
    duration = 500,
    easing = x => 1 - Math.pow(1 - x, 3),
    inputType = ["mouse", "touch"],
    moveType = "snap",
    threshold = 40,
    interruptable = true,
    bounce = "20%",
    iOSEdgeSwipeThreshold = 30,
    preventClickOnDrag = true,
    disableOnInit = false,
    renderOnlyVisible = false,
    virtual = null,
    autoInit = true,
    autoResize = true,
    useResizeObserver = true,
    externalRenderer = null,
    renderExternal = null
  }: Partial<FlickingOptions> = {}) {
    super();

    // Internal states
    this._initialized = false;
    this._plugins = [];

    // Bind options
    this._align = align;
    this._defaultIndex = defaultIndex;
    this._horizontal = horizontal;
    this._circular = circular;
    this._circularFallback = circularFallback;
    this._bound = bound;
    this._adaptive = adaptive;
    this._panelsPerView = panelsPerView;
    this._noPanelStyleOverride = noPanelStyleOverride;
    this._resizeOnContentsReady = resizeOnContentsReady;
    this._virtual = virtual;
    this._needPanelThreshold = needPanelThreshold;
    this._preventEventsBeforeInit = preventEventsBeforeInit;
    this._deceleration = deceleration;
    this._duration = duration;
    this._easing = easing;
    this._inputType = inputType;
    this._moveType = moveType;
    this._threshold = threshold;
    this._interruptable = interruptable;
    this._bounce = bounce;
    this._iOSEdgeSwipeThreshold = iOSEdgeSwipeThreshold;
    this._preventClickOnDrag = preventClickOnDrag;
    this._disableOnInit = disableOnInit;
    this._renderOnlyVisible = renderOnlyVisible;
    this._autoInit = autoInit;
    this._autoResize = autoResize;
    this._useResizeObserver = useResizeObserver;
    this._externalRenderer = externalRenderer;
    this._renderExternal = renderExternal;

    // Create core components
    this._viewport = new Viewport(getElement(root));
    this._autoResizer = new AutoResizer(this);
    this._renderer = this._createRenderer();
    this._camera = this._createCamera();
    this._control = this._createControl();
    this._virtualManager = new VirtualManager(this, virtual);

    if (this._autoInit) {
      void this.init();
    }
  }

  /**
   * Initialize Flicking and move to the default index
   * This is automatically called on Flicking's constructor when `autoInit` is true(default)
   * @ko Flicking을 초기화하고, 디폴트 인덱스로 이동합니다
   * 이 메소드는 `autoInit` 옵션이 true(default)일 경우 Flicking이 생성될 때 자동으로 호출됩니다
   * @fires Flicking#ready
   * @return {this}
   */
  public async init(): Promise<void> {
    if (this._initialized) return;

    const camera = this._camera;
    const renderer = this._renderer;
    const control = this._control;
    const virtualManager = this._virtualManager;
    const originalTrigger = this.trigger;
    const preventEventsBeforeInit = this._preventEventsBeforeInit;

    camera.init(this);
    virtualManager.init();
    renderer.init(this);
    control.init(this);

    if (preventEventsBeforeInit) {
      this.trigger = () => this;
    }

    await this.resize();

    // Look at initial panel
    await this._moveToInitialPanel();

    if (this._autoResize) {
      this._autoResizer.enable();
    }
    if (this._preventClickOnDrag) {
      control.controller.addPreventClickHandler();
    }
    if (this._disableOnInit) {
      this.disableInput();
    }
    renderer.checkPanelContentsReady(renderer.panels);

    this._plugins.forEach(plugin => plugin.init(this));

    // Done initializing & emit ready event
    this._initialized = true;
    if (preventEventsBeforeInit) {
      this.trigger = originalTrigger;
    }
    this.trigger(new ComponentEvent(EVENTS.READY));

    return;
  }

  /**
   * Destroy Flicking and remove all event handlers
   * @ko Flicking과 하위 컴포넌트들을 초기 상태로 되돌리고, 부착된 모든 이벤트 핸들러를 제거합니다
   * @return {void}
   */
  public destroy(): void {
    this.off();

    this._autoResizer.disable();
    this._control.destroy();
    this._camera.destroy();
    this._renderer.destroy();

    this._plugins.forEach(plugin => plugin.destroy());

    this._initialized = false;
  }

  /**
   * Move to the previous panel (current index - 1)
   * @ko 이전 패널로 이동합니다 (현재 인덱스 - 1)
   * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms)<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
   * @async
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
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the previous panel does not exist|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|이전 패널이 존재하지 않을 경우|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the previous panel<ko>이전 패널 도달시에 resolve되는 Promise</ko>
   */
  public prev(duration: number = this._duration): Promise<void> {
    return this.moveTo(this._control.activePanel?.prev()?.index ?? -1, duration, DIRECTION.PREV);
  }

  /**
   * Move to the next panel (current index + 1)
   * @ko 다음 패널로 이동합니다 (현재 인덱스 + 1)
   * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
   * @async
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
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the next panel does not exist|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|다음 패널이 존재하지 않을 경우|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the next panel<ko>다음 패널 도달시에 resolve되는 Promise</ko>
   */
  public next(duration: number = this._duration) {
    return this.moveTo(this._control.activePanel?.next()?.index ?? this._renderer.panelCount, duration, DIRECTION.NEXT);
  }

  /**
   * Move to the panel with given index
   * @ko 주어진 인덱스에 해당하는 패널로 이동합니다
   * @param {number} index The index of the panel to move<ko>이동할 패널의 인덱스</ko>
   * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
   * @param {DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
   * @async
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
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the root is not either string or HTMLElement|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|해당 인덱스를 가진 패널이 존재하지 않을 경우|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>
   */
  public moveTo(index: number, duration: number = this._duration, direction: ValueOf<typeof DIRECTION> = DIRECTION.NONE) {
    const renderer = this._renderer;
    const panelCount = renderer.panelCount;

    const panel = renderer.getPanel(index);

    if (!panel) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.INDEX_OUT_OF_RANGE(index, 0, panelCount - 1), ERROR.CODE.INDEX_OUT_OF_RANGE));
    }

    if (this._control.animating) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.ANIMATION_ALREADY_PLAYING, ERROR.CODE.ANIMATION_ALREADY_PLAYING));
    }

    return this._control.moveToPanel(panel, {
      duration,
      direction
    });
  }

  /**
   * Return the {@link Panel} at the given index. `null` if it doesn't exists.
   * @ko 주어진 인덱스에 해당하는 {@link Panel}을 반환합니다. 주어진 인덱스에 해당하는 패널이 존재하지 않을 경우 `null`을 반환합니다.
   * @return {Panel | null} Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>
   * @see Panel
   * @example
   * ```ts
   * const panel = flicking.getPanel(0);
   * // Which is a shorthand to...
   * const samePanel = flicking.panels[0];
   * ```
   */
  public getPanel(index: number): Panel | null {
    return this._renderer.getPanel(index);
  }

  /**
   * Enable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 활성화합니다
   * @return {this}
   */
  public enableInput(): this {
    this._control.enable();
    return this;
  }

  /**
   * Disable input from the user (mouse/touch)
   * @ko 사용자의 입력(마우스/터치)를 막습니다
   * @return {this}
   */
  public disableInput(): this {
    this._control.disable();
    return this;
  }

  /**
   * Get current flicking status. You can restore current state by giving returned value to {@link Flicking#setStatus setStatus()}
   * @ko 현재 상태를 반환합니다. 반환받은 값을 {@link Flicking#setStatus setStatus()} 메소드의 인자로 지정하면 현재 상태를 복원할 수 있습니다
   * @param {object} options Status retrieving options<ko>Status 반환 옵션</ko>
   * @param {boolean} [options.index=true] Include current panel index to the returning status. Camera will automatically move to the given index when the {@link Flicking#setStatus setStatus} is called<ko>현재 패널 인덱스를 반환값에 포함시킵니다. {@link Flicking#setStatus setStatus} 호출시 자동으로 해당 인덱스로 카메라를 움직입니다</ko>
   * @param {boolean} [options.position=true] Include camera position to the returning status. This works only when the {@link Flicking#moveType moveType} is `freeScroll`<ko>카메라의 현재 위치를 반환값에 포함시킵니다. 이 옵션은 {@link Flicking#moveType moveType}이 `freeScroll`일 경우에만 동작합니다</ko>
   * @param {boolean} [options.includePanelHTML=false] Include panel's `outerHTML` to the returning status<ko>패널의 `outerHTML`을 반환값에 포함시킵니다</ko>
   * @param {boolean} [options.visiblePanelsOnly=false] Include only {@link Flicking#visiblePanel visiblePanel}'s HTML. This option is available only when the `includePanelHTML` is true
   * <ko>현재 보이는 패널({@link Flicking#visiblePanel visiblePanel})의 HTML만 반환합니다. `includePanelHTML`이 `true`일 경우에만 동작합니다.</ko>
   * @return {Status} An object with current status value information<ko>현재 상태값 정보를 가진 객체.</ko>
   */
  public getStatus({
    index = true,
    position = true,
    includePanelHTML = false,
    visiblePanelsOnly = false
  }: Partial<{
    index: boolean;
    position: boolean;
    includePanelHTML: boolean;
    visiblePanelsOnly: boolean;
  }> = {}): Status {
    const camera = this._camera;
    const panels = visiblePanelsOnly ? this.visiblePanels : this.panels;

    const status: Status = {
      panels: panels.map(panel => {
        const panelInfo: Status["panels"][0] = { index: panel.index };

        if (includePanelHTML) {
          panelInfo.html = panel.element.outerHTML;
        }

        return panelInfo;
      })
    };

    if (index) {
      status.index = this.index;
    }
    if (position) {
      const nearestAnchor = camera.findNearestAnchor(camera.position);

      if (nearestAnchor) {
        status.position = {
          panel: nearestAnchor.panel.index,
          progressInPanel: camera.getProgressInPanel(nearestAnchor.panel)
        };
      }

    }

    if (visiblePanelsOnly) {
      const visiblePanels = this.visiblePanels;

      status.visibleOffset = visiblePanels[0]?.index ?? 0;
    }

    return status;
  }

  /**
   * Restore to the state of the given {@link Status}
   * @ko 주어진 {@link Status}의 상태로 복원합니다
   * @param {Partial<Status>} status Status value to be restored. You should use the return value of the {@link Flicking#getStatus getStatus()} method<ko>복원할 상태 값. {@link Flicking#getStatus getStatus()} 메서드의 반환값을 지정하면 됩니다</ko>
   * @return {void}
   */
  public setStatus(status: Status): void {
    if (!this._initialized) {
      throw new FlickingError(ERROR.MESSAGE.NOT_INITIALIZED, ERROR.CODE.NOT_INITIALIZED);
    }

    const {
      index,
      position,
      visibleOffset,
      panels
    } = status;

    const renderer = this._renderer;
    const control = this._control;

    // Can't add/remove panels on external rendering
    if (panels[0]?.html && !this._renderExternal) {
      renderer.batchRemove({ index: 0, deleteCount: this.panels.length, hasDOMInElements: true });
      renderer.batchInsert({ index: 0, elements: parseElement(panels.map(panel => panel.html!)), hasDOMInElements: true });
    }

    if (index) {
      const panelIndex = visibleOffset
        ? index - visibleOffset
        : index;

      void this.moveTo(panelIndex, 0).catch(() => void 0);
    }

    if (position && this._moveType === MOVE_TYPE.FREE_SCROLL) {
      const { panel, progressInPanel } = position;
      const panelIndex = visibleOffset
        ? panel - visibleOffset
        : panel;
      const panelRange = renderer.panels[panelIndex].range;
      const newCameraPos = panelRange.min + (panelRange.max - panelRange.min) * progressInPanel;

      void control.moveToPosition(newCameraPos, 0).catch(() => void 0);
    }
  }

  /**
   * Add plugins that can have different effects on Flicking
   * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가합니다
   * @param {...Plugin} plugins The plugin(s) to add<ko>추가할 플러그인(들)</ko>
   * @return {this}
   * @see https://github.com/naver/egjs-flicking-plugins
   */
  public addPlugins(...plugins: Plugin[]) {
    if (this._initialized) {
      plugins.forEach(item => item.init(this));
    }

    this._plugins.push(...plugins);

    return this;
  }

  /**
   * Remove plugins from Flicking.
   * @ko 플리킹으로부터 플러그인들을 제거합니다.
   * @param {...Plugin} plugin The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
   * @return {this}
   * @see https://github.com/naver/egjs-flicking-plugins
   */
  public removePlugins(...plugins: Plugin[]) {
    plugins.forEach(item => {
      const foundIndex = findIndex(this._plugins, val => val === item);

      if (foundIndex >= 0) {
        item.destroy();
        this._plugins.splice(foundIndex, 1);
      }
    });

    return this;
  }

  /**
   * Update viewport/panel sizes
   * @ko 패널 및 뷰포트의 크기를 갱신합니다
   * @method
   * @fires Flicking#beforeResize
   * @fires Flicking#afterResize
   * @return {this}
   */
  public async resize(): Promise<void> {
    const viewport = this._viewport;
    const renderer = this._renderer;
    const camera = this._camera;
    const control = this._control;

    const activePanel = control.activePanel;
    const prevWidth = viewport.width;
    const prevHeight = viewport.height;
    const prevProgressInPanel = activePanel
      ? camera.getProgressInPanel(activePanel)
      : 0;

    this.trigger(new ComponentEvent(EVENTS.BEFORE_RESIZE, {
      width: prevWidth,
      height: prevHeight,
      element: viewport.element
    }));

    viewport.resize();
    await renderer.forceRenderAllPanels(); // Render all panel elements, to update sizes
    renderer.updatePanelSize();
    camera.updateAlignPos();
    camera.updateRange();
    camera.updateAnchors();
    await renderer.render();

    if (control.animating) {
      // TODO:
    } else {
      control.updatePosition(prevProgressInPanel);
      control.updateInput();
    }

    const newWidth = viewport.width;
    const newHeight = viewport.height;
    const sizeChanged = newWidth !== prevWidth || newHeight !== prevHeight;

    this.trigger(new ComponentEvent(EVENTS.AFTER_RESIZE, {
      width: viewport.width,
      height: viewport.height,
      prev: {
        width: prevWidth,
        height: prevHeight
      },
      sizeChanged,
      element: viewport.element
    }));
  }

  /**
   * Add new panels after the last panel
   * @ko 패널 목록의 제일 끝에 새로운 패널들을 추가합니다
   * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
   * @return {Panel[]} An array of appended panels<ko>추가된 패널들의 배열</ko>
   * @see Panel
   * @see ElementLike
   * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
   * @example
   * ```ts
   * const flicking = new Flicking("#flick");
   * // These are possible parameters
   * flicking.append(document.createElement("div"));
   * flicking.append("\<div\>Panel\</div\>");
   * flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]);
   * // Even this is possible
   * flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
   * ```
   */
  public append(element: ElementLike | ElementLike[]): Panel[] {
    return this.insert(this._renderer.panelCount, element);
  }

  /**
   * Add new panels before the first panel
   * This will increase index of panels after by the number of panels added
   * @ko 패널 목록의 제일 앞(index 0)에 새로운 패널들을 추가합니다
   * 추가한 패널의 개수만큼 기존 패널들의 인덱스가 증가합니다.
   * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
   * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
   * @see Panel
   * @see ElementLike
   * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
   * @example
   * ```ts
   * const flicking = new eg.Flicking("#flick");
   * flicking.prepend(document.createElement("div"));
   * flicking.prepend("\<div\>Panel\</div\>");
   * flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]);
   * // Even this is possible
   * flicking.prepend("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
   * ```
   */
  public prepend(element: ElementLike | ElementLike[]): Panel[] {
    return this.insert(0, element);
  }

  /**
   * Insert new panels at given index
   * This will increase index of panels after by the number of panels added
   * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
   * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
   * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
   * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
   * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
   * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
   * @example
   * ```ts
   * const flicking = new eg.Flicking("#flick");
   * flicking.insert(0, document.createElement("div"));
   * flicking.insert(2, "\<div\>Panel\</div\>");
   * flicking.insert(1, ["\<div\>Panel\</div\>", document.createElement("div")]);
   * // Even this is possible
   * flicking.insert(3, "\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
   * ```
   */
  public insert(index: number, element: ElementLike | ElementLike[]): Panel[] {
    if (this._renderExternal) {
      throw new FlickingError(ERROR.MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, ERROR.CODE.NOT_ALLOWED_IN_FRAMEWORK);
    }

    return this._renderer.batchInsert({ index, elements: parseElement(element), hasDOMInElements: true });
  }

  /**
   * Remove the panel at the given index
   * This will decrease index of panels after by the number of panels removed
   * @ko 주어진 인덱스의 패널을 제거합니다
   * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
   * @param {number} index Index of panel to remove<ko>제거할 패널의 인덱스</ko>
   * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
   * @return {Panel[]} An array of removed panels<ko>제거된 패널들의 배열</ko>
   */
  public remove(index: number, deleteCount: number = 1): Panel[] {
    if (this._renderExternal) {
      throw new FlickingError(ERROR.MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, ERROR.CODE.NOT_ALLOWED_IN_FRAMEWORK);
    }

    return this._renderer.batchRemove({ index, deleteCount, hasDOMInElements: true });
  }

  private _createControl(): Control {
    const moveType = this._moveType;
    const moveTypes = Object.keys(MOVE_TYPE).map(key => MOVE_TYPE[key] as ValueOf<typeof MOVE_TYPE>);

    const moveTypeStr = Array.isArray(moveType)
      ? moveType[0]
      : moveType;

    const moveTypeOptions = Array.isArray(moveType)
      ? moveType[1] ?? {}
      : {};

    if (!includes(moveTypes, moveTypeStr)) {
      throw new FlickingError(ERROR.MESSAGE.WRONG_OPTION("moveType", JSON.stringify(moveType)), ERROR.CODE.WRONG_OPTION);
    }

    switch (moveTypeStr) {
      case MOVE_TYPE.SNAP:
        return new SnapControl(moveTypeOptions as SnapControlOptions);
      case MOVE_TYPE.FREE_SCROLL:
        return new FreeControl(moveTypeOptions as FreeControlOptions);
      case MOVE_TYPE.STRICT:
        return new StrictControl(moveTypeOptions as StrictControlOptions);
    }
  }

  private _createCamera(): Camera {
    if (this._circular && this._bound) {
      // eslint-disable-next-line no-console
      console.warn("\"circular\" and \"bound\" option cannot be used together, ignoring bound.");
    }

    return new Camera({
      align: this._align
    });
  }

  private _createRenderer(): Renderer {
    const externalRenderer = this._externalRenderer;
    if (this._virtual && this._panelsPerView <= 0) {
      // eslint-disable-next-line no-console
      console.warn("\"virtual\" and \"panelsPerView\" option should be used together, ignoring virtual.");
    }

    return externalRenderer
      ? externalRenderer
      : this._renderExternal
        ? this._createExternalRenderer()
        : this._createVanillaRenderer();
  }

  private _createExternalRenderer(): ExternalRenderer {
    const {
      renderer,
      rendererOptions
    } = this._renderExternal!;

    return new (renderer)({ align: this._align, ...rendererOptions });
  }

  private _createVanillaRenderer(): VanillaRenderer {
    const virtual = this.virtualEnabled;

    return new VanillaRenderer({
      align: this._align,
      strategy: virtual
        ? new VirtualRenderingStrategy()
        : new NormalRenderingStrategy({
          providerCtor: VanillaElementProvider
        })
    });
  }

  private async _moveToInitialPanel(): Promise<void> {
    const renderer = this._renderer;
    const control = this._control;
    const initialPanel = renderer.getPanel(this._defaultIndex) || renderer.getPanel(0);

    if (!initialPanel) return;

    control.setActive(initialPanel, null, false);

    return control.moveToPanel(initialPanel, {
      duration: 0
    });
  }
}

export default Flicking;
