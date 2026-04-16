/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component, { ComponentEvent } from "@egjs/component";
import { Camera } from "./camera";
import { ALIGN, CIRCULAR_FALLBACK, DIRECTION, MOVE_TYPE } from "./constants/values";
import {
  Control,
  FreeControl,
  FreeControlOptions,
  SnapControl,
  SnapControlOptions,
  StrictControl,
  StrictControlOptions
} from "./control";
import AutoResizer from "./core/AutoResizer";
import { Panel } from "./core/panel";
import { VanillaElementProvider } from "./core/panel/provider";
import Viewport from "./core/Viewport";
import VirtualManager, { VirtualOptions } from "./core/VirtualManager";
import * as ERROR from "./error/codes";
import FlickingError from "./error/FlickingError";
import { EVENTS } from "./event/names";
import { FlickingEvents } from "./event/types";
import {
  ExternalRenderer,
  NormalRenderingStrategy,
  Renderer,
  RendererOptions,
  VanillaRenderer,
  VirtualRenderingStrategy
} from "./renderer";
import { ElementLike, MoveTypeOptions, Plugin, Status } from "./types/external";
import { LiteralUnion, ValueOf } from "./types/internal";
import { findIndex, getElement, includes, parseElement } from "./utils";

/**
 * Options for the Flicking component
 * @public
 */
export interface FlickingOptions {
  // UI / LAYOUT
  /**
   * Align position of the panels within viewport. You can set different values each for the panel and camera.
   * @remarks
   * Possible values include
   *
   * - literal strings ("prev", "center", "next")
   *
   * - percentage values ("0%", "25%")
   *
   * - pixel values ("0px", "100px")
   *
   * - arithmetic expressions ("50% - 25px")
   *
   * - numbers
   *
   * - an object with separate `panel` and `camera` alignment values
   *
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
   * @accepts {@link ALIGN}
   * @defaultValue "center"
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/alignment | Demo: Alignment}
   */
  align: LiteralUnion<ValueOf<typeof ALIGN>> | number | { panel: number | string; camera: number | string };

  /**
   * Index of the panel to move when Flicking's {@link Flicking.init | init()} is called. A zero-based integer.
   * @defaultValue 0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/default-index | Demo: Default Index}
   */
  defaultIndex: number;

  /**
   * Direction of panel movement. `true` for horizontal, `false` for vertical.
   *
   * @remarks
   * In vanilla JS, you must manually add the `vertical` class to the viewport element when using vertical mode.
   * React and Vue wrappers add this class automatically.
   *
   * @example
   * ```ts
   * // Vanilla JS: add "vertical" class to the viewport element
   * // <div class="flicking-viewport vertical">
   * //   <div class="flicking-camera">...</div>
   * // </div>
   * const flicking = new Flicking("#my-flicking", {
   *   horizontal: false
   * });
   * ```
   *
   * @defaultValue true
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/vertical | Demo: Vertical}
   */
  horizontal: boolean;

  /**
   * Enables circular (continuous loop) mode, which connects first/last panel for continuous scrolling.
   * @dependency Mutual Exclusive - {@link FlickingOptions.bound | bound}. When both are true, circular takes precedence and bound will be ignored.
   * @dependency Conditional - Total panel size must be ≥ viewport size. If not met, automatically falls back to {@link FlickingOptions.circularFallback | circularFallback} mode.
   * @dependency Related - {@link FlickingOptions.circularFallback | circularFallback} determines fallback behavior when circular cannot be enabled
   *
   * @defaultValue false
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/circular | Demo: Circular}
   */
  circular: boolean;

  /**
   * Set panel control mode for the case when circular cannot be enabled.
   * @dependency Requires - Only takes effect when {@link FlickingOptions.circular | circular} is true but activation requirements are not met (total panel size < viewport size)
   *
   * @remarks
   * - "linear": The view's range is set from the top of the first panel to the top of the last panel.
   * - "bound": Prevents the view from going out of the first/last panel, hiding empty spaces.
   *
   * @accepts {@link CIRCULAR_FALLBACK}
   * @defaultValue "linear"
   *
   * @since 4.5.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/circular | Demo: Circular}
   */
  circularFallback: LiteralUnion<ValueOf<typeof CIRCULAR_FALLBACK>>;

  /**
   * Prevent the view (camera element) from going out of the first/last panel.
   * @dependency Mutual Exclusive - {@link FlickingOptions.circular | circular}. When circular is true, this option is ignored.
   * @dependency Related - Works with {@link FlickingOptions.bounce | bounce} for bounce effect at boundaries
   *
   * @defaultValue false
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/bound | Demo: Bound}
   */
  bound: boolean;

  /**
   * Update height of the viewport element after movement same to the height of the panel below.
   * @dependency Conditional - Only works when {@link FlickingOptions.horizontal | horizontal} is true. When horizontal is false, this option has no effect.
   *
   * @defaultValue false
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/adaptive | Demo: Adaptive}
   */
  adaptive: boolean;

  /**
   * A visible number of panels on viewport. Enabling this option will force the panel to resize.
   * @remarks
   * When set to -1, automatically calculates based on panel sizes.
   *
   * @dependency Related - Affects how {@link FlickingOptions.align | align} calculates panel positions
   * @dependency Requires - Required for {@link FlickingOptions.virtual | virtual} to work (must be > 0)
   * @dependency Related - Works with {@link FlickingOptions.noPanelStyleOverride | noPanelStyleOverride} to prevent style modifications
   *
   * @defaultValue -1
   *
   * @since 4.2.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/panels-per-view | Demo: Panels Per View}
   */
  panelsPerView: number;

  /**
   * When enabled, prevents modifying the panel's `width/height` styles when {@link Flicking.panelsPerView | panelsPerView} is enabled.
   * Enabling this option can improve performance if you are manually managing all panel sizes.
   * @defaultValue false
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/panels-per-view | Demo: Panels Per View}
   */
  noPanelStyleOverride: boolean;

  /**
   * When enabled, automatically calls {@link Flicking.resize} when images/videos inside Flicking panels are loaded.
   * This is useful when Flicking contains content that changes size before and after loading.
   * @defaultValue false
   * @since 4.3.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/resize-on-contents-ready | Demo: Resize On Contents Ready}
   */
  resizeOnContentsReady: boolean;

  /**
   * Enable nested Flicking mode to allow parent Flicking to move when reaching boundaries.
   * @remarks
   * When Flicking is nested inside another Flicking, enabling this option allows the parent
   * Flicking to move in the same direction after the nested Flicking reaches the first or last panel.
   *
   * This option is not required if the parent and nested Flicking have different horizontal options.
   *
   * @defaultValue false
   *
   * @since 4.7.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/nested | Demo: Nested}
   */
  nested: boolean;

  // EVENT
  /**
   * A threshold from the viewport edge to trigger the `needPanel` event.
   * @defaultValue 0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/infinite-scroll | Demo: Infinite Scroll}
   */
  needPanelThreshold: number;

  /**
   * When enabled, disables events before the `ready` event during initialization.
   * @defaultValue true
   * @since 4.2.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/auto-init | Demo: Auto Init}
   */
  preventEventsBeforeInit: boolean;

  // ANIMATION
  /**
   * Deceleration of panel movement animation with momentum applied by user interaction (input).
   * Higher values result in a shorter animation duration.
   * @defaultValue 0.0075
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/deceleration | Demo: Deceleration}
   */
  deceleration: number;

  /**
   * Default duration of the animation in milliseconds.
   * @defaultValue 500
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/duration | Demo: Duration}
   */
  duration: number;

  /**
   * An easing function applied to the panel movement animation.
   * @defaultValue "easeOutCubic" (x => 1 - Math.pow(1 - x, 3))
   * @see {@link http://easings.net/ | Easing Functions Cheat Sheet}
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/easing | Demo: Easing}
   */
  easing: (x: number) => number;

  // INPUT
  /**
   * Types of input devices to enable.
   * @defaultValue ["touch", "mouse"]
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/input-type | Demo: Input Type}
   */
  inputType: string[];

  /**
   * Movement style by user input. Determines the instance type of {@link Flicking.control | control}.
   * @remarks
   * - "snap": Uses {@link SnapControl}
   *
   * - "freeScroll": Uses {@link FreeControl} with {@link FreeControlOptions}
   *
   * - "strict": Uses {@link StrictControl} with {@link StrictControlOptions}
   * @accepts {@link MOVE_TYPE}
   * @example
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
   * @defaultValue "snap"
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/movement-types | Demo: Movement Types}
   */
  moveType: ValueOf<typeof MOVE_TYPE> | MoveTypeOptions<ValueOf<typeof MOVE_TYPE>>;

  /**
   * Movement threshold to change panels (unit: px). Panels will only change after scrolling beyond this value.
   * @defaultValue 40
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/threshold | Demo: Threshold}
   */
  threshold: number;

  /**
   * Minimum distance to recognize user input (unit: px). Panels will only move after scrolling beyond this value.
   * @defaultValue 1
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/threshold | Demo: Threshold}
   */
  dragThreshold: number;

  /**
   * The minimum distance for animation to proceed.
   * @remarks
   * If the distance to be moved is less than `animationThreshold`, the movement proceeds immediately without animation (duration: 0).
   * @defaultValue 0.5
   * @since 4.15.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/animation-threshold | Demo: Animation Threshold}
   */
  animationThreshold: number;

  /**
   * Using `useCSSOrder` does not change the DOM order, but the `order` CSS property changes the order on the screen.
   * @remarks
   * When `circular` is used, the DOM order changes depending on the position.
   * When using `iframe`, you can prevent reloading when the DOM order changes.
   * In svelte, CSS order is always used.
   * @defaultValue false
   * @since 4.15.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/use-css-order | Demo: CSS Order}
   */
  useCSSOrder: boolean;

  /**
   * Allows stopping animations with user click/touch input.
   * @defaultValue true
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/interruptable | Demo: Interruptable}
   */
  interruptable: boolean;

  /**
   * The size value of the bounce area.
   * @dependency Conditional - Only can be enabled when {@link FlickingOptions.circular | circular} is false
   * @dependency Related - Works with {@link FlickingOptions.bound | bound} to provide bounce effect at panel boundaries
   *
   * @remarks
   * You can set different bounce value for prev/next direction by using array.
   * Use `number` for px value, and `string` for px or % value relative to viewport size.
   * You have to call {@link Control.updateInput | updateInput()} after changing this value to take effect.
   *
   * @example
   * ```ts
   * const possibleOptions = [
   *   "0%", "25%", "42%",           // % values
   *   "0px", "100px", "50% - 25px", // px values with arithmetic
   *   0, 100, 1000                  // numbers (same as px)
   * ];
   * ```
   *
   * @defaultValue "20%"
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/bound | Demo: Bound}
   */
  bounce: number | string | [number | string, number | string];

  /**
   * Size of the area from the right edge in iOS Safari (in px) that enables swipe-back or swipe-forward.
   * @defaultValue 30
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/input-type | Demo: Input Type}
   */
  iOSEdgeSwipeThreshold: number;

  /**
   * Automatically cancels {@link https://developer.mozilla.org/ko/docs/Web/API/Element/click_event | click} events when the user drags the viewport by any amount.
   * @defaultValue true
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/prevent-click | Demo: Prevent Click}
   */
  preventClickOnDrag: boolean;

  /**
   * Whether to use the {@link https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault | preventDefault} when the user starts dragging
   * @defaultValue false
   * @since 4.11.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/prevent-click | Demo: Prevent Click}
   */
  preventDefaultOnDrag: boolean;

  /**
   * Automatically call {@link Flicking.disableInput | disableInput()} during initialization.
   * @defaultValue false
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/disable-input | Demo: Disable Input}
   */
  disableOnInit: boolean;

  /**
   * Change active panel index on mouse/touch hold while animating.
   * @remarks
   * `index` of the `willChange`/`willRestore` event will be used as new index.
   * @defaultValue false
   * @since 4.8.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/interruptable | Demo: Interruptable}
   */
  changeOnHold: boolean;

  // PERFORMANCE
  /**
   * When enabled, only renders visible panels. Can significantly improve performance with many panels.
   * @defaultValue false
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/render-only-visible | Demo: Render Only Visible}
   */
  renderOnlyVisible: boolean;

  /**
   * When enabled, restricts the number of panel elements to `panelsPerView + 1` to reduce memory usage.
   * @dependency Requires - Must be used with {@link FlickingOptions.panelsPerView | panelsPerView}. When panelsPerView is -1 (auto), this option is ignored.
   *
   * @remarks
   * After Flicking initialization, this property can be used to add or remove the number of rendered panels.
   *
   * The option object contains:
   * - `renderPanel`: A rendering function for the panel element's innerHTML
   * - `initialPanelCount`: Initial panel count to render
   * - `cache` (optional, default: false): Whether to cache rendered panel's innerHTML
   * - `panelClass` (optional, default: "flicking-panel"): The class name for rendered panel elements
   *
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
   *
   * @defaultValue null
   *
   * @since 4.4.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/virtual-scroll | Demo: Virtual Scroll}
   */
  virtual: VirtualOptions | null;

  // OTHERS
  /**
   * Call {@link Flicking.init | init()} automatically when creating Flicking's instance.
   * @defaultValue true
   * @readonly
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/auto-init | Demo: Auto Init}
   */
  autoInit: boolean;

  /**
   * Whether to automatically call {@link Flicking.resize | resize()} when the viewport element (.flicking-viewport) size is changed.
   * @defaultValue true
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/auto-resize | Demo: Auto Resize}
   */
  autoResize: boolean;

  /**
   * Whether to listen {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver | ResizeObserver}'s event instead of Window's {@link https://developer.mozilla.org/ko/docs/Web/API/Window/resize_event | resize} event when using the `autoResize` option
   * @defaultValue true
   * @since 4.4.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/auto-resize | Demo: Auto Resize}
   */
  useResizeObserver: boolean;

  /**
   * Delays size recalculation from `autoResize` by the given time in milliseconds.
   * @remarks
   * If the size is changed again while being delayed, it cancels the previous one and delays from the beginning again.
   * This can increase performance by preventing `resize` being called too often.
   * @defaultValue 0
   * @since 4.6.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/resize-debounce | Demo: Resize Debounce}
   */
  resizeDebounce: number;

  /**
   * Whether to use ResizeObserver to observe the size of the panel element.
   * @dependency Conditional - Only available when {@link FlickingOptions.useResizeObserver | useResizeObserver} is enabled
   *
   * @remarks
   * This option guarantees that the resize event is triggered when the size of the panel element is changed.
   *
   * @since 4.13.1
   * @defaultValue false
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/observe-panel-resize | Demo: Observe Panel Resize}
   */
  observePanelResize: boolean;

  /**
   * The maximum time for size recalculation delay when using `resizeDebounce`, in milliseconds.
   * @remarks
   * This guarantees that size recalculation is performed at least once every (n)ms.
   * @defaultValue 100
   * @since 4.6.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/resize-debounce | Demo: Resize Debounce}
   */
  maxResizeDebounce: number;

  /**
   * By enabling this, Flicking will calculate all internal size with CSS width computed with getComputedStyle.
   * @remarks
   * This can prevent 1px offset issue in some cases where panel size has the fractional part.
   * All sizes will have the original size before CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform | transform} is applied on the element.
   * @defaultValue false
   * @since 4.9.0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/fractional-size | Demo: Fractional Size}
   */
  useFractionalSize: boolean;

  /**
   * This is an option for the frameworks (React, Vue, Angular, ...).
   * Don't set it as it's automatically managed by Flicking.
   * @defaultValue null
   * @internal
   * @readonly
   */
  externalRenderer: ExternalRenderer | null;

  /**
   * This option works only when autoResize is set to true.
   * @internal
   * @defaultValue false
   */
  optimizeSizeUpdate: boolean;

  /**
   * @deprecated Use {@link FlickingOptions.externalRenderer | externalRenderer} instead
   */
  renderExternal: {
    renderer: new (options: RendererOptions) => ExternalRenderer;
    rendererOptions: RendererOptions;
  } | null;
}

/**
 * Parameters for {@link Flicking.getStatus}
 * @public
 */
export interface GetStatusParams {
  /**
   * Include current panel index
   * @defaultValue true
   */
  index?: boolean;
  /**
   * Include camera position. Only works when {@link FlickingOptions.moveType | moveType} is `freeScroll`
   * @defaultValue true
   */
  position?: boolean;
  /**
   * Include panel's `outerHTML`
   * @defaultValue false
   */
  includePanelHTML?: boolean;
  /**
   * Include only visible panels' HTML. Only available when `includePanelHTML` is `true`
   * @defaultValue false
   */
  visiblePanelsOnly?: boolean;
}

class Flicking extends Component<FlickingEvents> {
  /**
   * Version info string
   * @example
   * ```ts
   * Flicking.VERSION;  // ex) 4.0.0
   * ```
   */
  public static readonly VERSION: string = "#__VERSION__#";

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
  private _nested: FlickingOptions["nested"];

  private _needPanelThreshold: FlickingOptions["needPanelThreshold"];
  private _preventEventsBeforeInit: FlickingOptions["preventEventsBeforeInit"];

  private _deceleration: FlickingOptions["deceleration"];
  private _duration: FlickingOptions["duration"];
  private _easing: FlickingOptions["easing"];

  private _inputType: FlickingOptions["inputType"];
  private _moveType: FlickingOptions["moveType"];
  private _threshold: FlickingOptions["threshold"];
  private _dragThreshold: FlickingOptions["dragThreshold"];
  private _animationThreshold: FlickingOptions["animationThreshold"];
  private _useCSSOrder: FlickingOptions["useCSSOrder"];
  private _interruptable: FlickingOptions["interruptable"];
  private _bounce: FlickingOptions["bounce"];
  private _iOSEdgeSwipeThreshold: FlickingOptions["iOSEdgeSwipeThreshold"];
  private _preventClickOnDrag: FlickingOptions["preventClickOnDrag"];
  private _preventDefaultOnDrag: FlickingOptions["preventDefaultOnDrag"];
  private _disableOnInit: FlickingOptions["disableOnInit"];
  private _changeOnHold: FlickingOptions["changeOnHold"];

  private _renderOnlyVisible: FlickingOptions["renderOnlyVisible"];

  private _autoInit: FlickingOptions["autoInit"];
  private _autoResize: FlickingOptions["autoResize"];
  private _useResizeObserver: FlickingOptions["useResizeObserver"];
  private _resizeDebounce: FlickingOptions["resizeDebounce"];
  private _observePanelResize: FlickingOptions["observePanelResize"];
  private _maxResizeDebounce: FlickingOptions["maxResizeDebounce"];
  private _useFractionalSize: FlickingOptions["useFractionalSize"];
  private _externalRenderer: FlickingOptions["externalRenderer"];
  private _renderExternal: FlickingOptions["renderExternal"];
  private _optimizeSizeUpdate: FlickingOptions["optimizeSizeUpdate"];

  // Internal State
  private _initialized: boolean;
  private _plugins: Plugin[];
  private _isResizing: boolean;
  private _scheduleResize = false;

  // Components
  /**
   * {@link Control} instance that manages user input and panel movement animations
   * @remarks
   * The concrete Control implementation is selected based on {@link FlickingOptions.moveType | moveType} option.
   * @privateRemarks
   * The control instance is created during construction by {@link Flicking._createControl}.
   * @readonly
   */
  public get control(): Control {
    return this._control;
  }

  /**
   * {@link Camera} instance that manages actual movement and positioning inside the viewport
   * @remarks
   * The concrete Camera implementation is selected based on {@link FlickingOptions.circular} and {@link FlickingOptions.bound} options.
   * @privateRemarks
   * The camera instance is created during construction by {@link Flicking._createCamera}.
   * @readonly
   */
  public get camera(): Camera {
    return this._camera;
  }

  /**
   * {@link Renderer} instance that manages panels and their elements
   * @remarks
   * The concrete Renderer implementation is selected based on {@link Flicking.externalRenderer} and {@link FlickingOptions.virtual} options.
   * @privateRemarks
   * The renderer instance is created during construction by {@link Flicking._createRenderer}.
   * @readonly
   */
  public get renderer(): Renderer {
    return this._renderer;
  }

  /**
   * {@link Viewport} instance that manages viewport size and element
   * @privateRemarks
   * The viewport instance is created during construction by {@link Flicking} constructor.
   * @readonly
   */
  public get viewport(): Viewport {
    return this._viewport;
  }

  /**
   * {@link AutoResizer} instance that detects size changes and triggers resize when {@link FlickingOptions.autoResize | autoResize} option is enabled
   * @privateRemarks
   * The autoResizer instance is created during construction by {@link Flicking} constructor.
   * @readonly
   */
  public get autoResizer(): AutoResizer {
    return this._autoResizer;
  }

  // Internal States
  /**
   * Whether Flicking's {@link Flicking.init} is called.
   * @remarks
   * This is `true` when {@link Flicking.init} is called, and is `false` after calling {@link Flicking.destroy}.
   * Use this to check if Flicking is ready before calling certain methods that require initialization.
   * @defaultValue false
   * @readonly
   * @example
   * ```ts
   * if (flicking.initialized) {
   *   flicking.setStatus(status);
   * } else {
   *   await flicking.init();
   *   flicking.setStatus(status);
   * }
   * ```
   */
  public get initialized(): boolean {
    return this._initialized;
  }

  /**
   * Whether the circular mode is actually enabled.
   * @remarks
   * The {@link FlickingOptions.circular} option may not be enabled when the sum of panel sizes is too small.
   * This property reflects the actual enabled state, which may differ from the {@link FlickingOptions.circular} option value.
   * @defaultValue false
   * @readonly
   */
  public get circularEnabled(): boolean {
    return this._camera.circularEnabled;
  }

  /**
   * Whether the virtual mode is actually enabled.
   * @remarks
   * The {@link FlickingOptions.virtual} option may not be enabled when {@link FlickingOptions.panelsPerView} is less than or equal to zero.
   * This property reflects the actual enabled state, which may differ from the {@link FlickingOptions.virtual} option value.
   * @defaultValue false
   * @readonly
   */
  public get virtualEnabled(): boolean {
    return this._panelsPerView > 0 && this._virtual != null;
  }

  /**
   * Index of the currently active panel.
   * @remarks
   * Returns -1 when there is no active panel. This is a shorthand for `Flicking.currentPanel.index`.
   * @readonly
   */
  public get index(): number {
    return this._control.activeIndex;
  }

  /**
   * The root viewport element (`.flicking-viewport`).
   * @remarks
   * This is the element passed to the Flicking constructor. It is a shorthand for `Flicking.viewport.element`.
   * @readonly
   */
  public get element(): HTMLElement {
    return this._viewport.element;
  }

  /**
   * The currently active panel.
   * @remarks
   * Returns `null` when there is no active panel. This is a shorthand for `Flicking.control.activePanel`.
   * @readonly
   */
  public get currentPanel(): Panel | null {
    return this._control.activePanel;
  }

  /**
   * Array of all panels.
   * @remarks
   * This is a shorthand for `Flicking.renderer.panels`.
   * @readonly
   */
  public get panels(): Panel[] {
    return this._renderer.panels;
  }

  /**
   * Total number of panels.
   * @remarks
   * This is a shorthand for `Flicking.renderer.panelCount`.
   * @readonly
   */
  public get panelCount(): number {
    return this._renderer.panelCount;
  }

  /**
   * Array of panels that are currently visible in the viewport.
   * @remarks
   * This is a shorthand for `Flicking.camera.visiblePanels`.
   * @readonly
   */
  public get visiblePanels(): Panel[] {
    return this._camera.visiblePanels;
  }

  /**
   * Whether Flicking is currently animating.
   * @remarks
   * This is a shorthand for `Flicking.control.animating`.
   * @readonly
   */
  public get animating(): boolean {
    return this._control.animating;
  }

  /**
   * Whether the user is currently clicking or touching the viewport.
   * @remarks
   * This is a shorthand for `Flicking.control.holding`.
   * @readonly
   */
  public get holding(): boolean {
    return this._control.holding;
  }

  /**
   * Array of currently activated plugins.
   * @remarks
   * Plugins are added via {@link Flicking.addPlugins} and removed via {@link Flicking.removePlugins}.
   * @readonly
   */
  public get activePlugins(): Plugin[] {
    return this._plugins;
  }

  // Options Getter
  // UI / LAYOUT
  /** Current value of the {@link FlickingOptions.align | align} option. */
  public get align(): FlickingOptions["align"] {
    return this._align;
  }

  /** Current value of the {@link FlickingOptions.defaultIndex | defaultIndex} option. */
  public get defaultIndex(): FlickingOptions["defaultIndex"] {
    return this._defaultIndex;
  }

  /** Current value of the {@link FlickingOptions.horizontal | horizontal} option. */
  public get horizontal(): FlickingOptions["horizontal"] {
    return this._horizontal;
  }

  /** Current value of the {@link FlickingOptions.circular | circular} option. */
  public get circular(): FlickingOptions["circular"] {
    return this._circular;
  }

  /**
   * Current value of the {@link FlickingOptions.circularFallback | circularFallback} option.
   * @since 4.5.0
   */
  public get circularFallback(): FlickingOptions["circularFallback"] {
    return this._circularFallback;
  }

  /** Current value of the {@link FlickingOptions.bound | bound} option. */
  public get bound(): FlickingOptions["bound"] {
    return this._bound;
  }

  /** Current value of the {@link FlickingOptions.adaptive | adaptive} option. */
  public get adaptive(): FlickingOptions["adaptive"] {
    return this._adaptive;
  }

  /**
   * Current value of the {@link FlickingOptions.panelsPerView | panelsPerView} option.
   * @since 4.2.0
   */
  public get panelsPerView(): FlickingOptions["panelsPerView"] {
    return this._panelsPerView;
  }

  /** Current value of the {@link FlickingOptions.noPanelStyleOverride | noPanelStyleOverride} option. */
  public get noPanelStyleOverride(): FlickingOptions["noPanelStyleOverride"] {
    return this._noPanelStyleOverride;
  }

  /**
   * Current value of the {@link FlickingOptions.resizeOnContentsReady | resizeOnContentsReady} option.
   * @since 4.3.0
   */
  public get resizeOnContentsReady(): FlickingOptions["resizeOnContentsReady"] {
    return this._resizeOnContentsReady;
  }

  /**
   * Current value of the {@link FlickingOptions.nested | nested} option.
   * @since 4.7.0
   */
  public get nested(): FlickingOptions["nested"] {
    return this._nested;
  }

  // EVENTS
  /** Current value of the {@link FlickingOptions.needPanelThreshold | needPanelThreshold} option. */
  public get needPanelThreshold(): FlickingOptions["needPanelThreshold"] {
    return this._needPanelThreshold;
  }

  /**
   * Current value of the {@link FlickingOptions.preventEventsBeforeInit | preventEventsBeforeInit} option.
   * @since 4.2.0
   */
  public get preventEventsBeforeInit(): FlickingOptions["preventEventsBeforeInit"] {
    return this._preventEventsBeforeInit;
  }

  // ANIMATION
  /** Current value of the {@link FlickingOptions.deceleration | deceleration} option. */
  public get deceleration(): FlickingOptions["deceleration"] {
    return this._deceleration;
  }

  /** Current value of the {@link FlickingOptions.easing | easing} option. */
  public get easing(): FlickingOptions["easing"] {
    return this._easing;
  }

  /** Current value of the {@link FlickingOptions.duration | duration} option. */
  public get duration(): FlickingOptions["duration"] {
    return this._duration;
  }

  // INPUT
  /** Current value of the {@link FlickingOptions.inputType | inputType} option. */
  public get inputType(): FlickingOptions["inputType"] {
    return this._inputType;
  }

  /** Current value of the {@link FlickingOptions.moveType | moveType} option. */
  public get moveType(): FlickingOptions["moveType"] {
    return this._moveType;
  }

  /** Current value of the {@link FlickingOptions.threshold | threshold} option. */
  public get threshold(): FlickingOptions["threshold"] {
    return this._threshold;
  }

  /** Current value of the {@link FlickingOptions.dragThreshold | dragThreshold} option. */
  public get dragThreshold(): FlickingOptions["dragThreshold"] {
    return this._dragThreshold;
  }

  /**
   * Current value of the {@link FlickingOptions.animationThreshold | animationThreshold} option.
   * @since 4.15.0
   */
  public get animationThreshold() {
    return this._animationThreshold;
  }

  /**
   * Current value of the {@link FlickingOptions.useCSSOrder | useCSSOrder} option.
   * @since 4.15.0
   */
  public get useCSSOrder() {
    return this._useCSSOrder;
  }

  /** Current value of the {@link FlickingOptions.interruptable | interruptable} option. */
  public get interruptable(): FlickingOptions["interruptable"] {
    return this._interruptable;
  }

  /** Current value of the {@link FlickingOptions.bounce | bounce} option. */
  public get bounce(): FlickingOptions["bounce"] {
    return this._bounce;
  }

  /** Current value of the {@link FlickingOptions.iOSEdgeSwipeThreshold | iOSEdgeSwipeThreshold} option. */
  public get iOSEdgeSwipeThreshold(): FlickingOptions["iOSEdgeSwipeThreshold"] {
    return this._iOSEdgeSwipeThreshold;
  }

  /** Current value of the {@link FlickingOptions.preventClickOnDrag | preventClickOnDrag} option. */
  public get preventClickOnDrag(): FlickingOptions["preventClickOnDrag"] {
    return this._preventClickOnDrag;
  }

  /**
   * Current value of the {@link FlickingOptions.preventDefaultOnDrag | preventDefaultOnDrag} option.
   * @since 4.11.0
   */
  public get preventDefaultOnDrag(): FlickingOptions["preventDefaultOnDrag"] {
    return this._preventDefaultOnDrag;
  }

  /** Current value of the {@link FlickingOptions.disableOnInit | disableOnInit} option. */
  public get disableOnInit(): FlickingOptions["disableOnInit"] {
    return this._disableOnInit;
  }

  /**
   * Current value of the {@link FlickingOptions.changeOnHold | changeOnHold} option.
   * @since 4.8.0
   */
  public get changeOnHold(): FlickingOptions["changeOnHold"] {
    return this._changeOnHold;
  }

  // PERFORMANCE
  /** Current value of the {@link FlickingOptions.renderOnlyVisible | renderOnlyVisible} option. */
  public get renderOnlyVisible(): FlickingOptions["renderOnlyVisible"] {
    return this._renderOnlyVisible;
  }

  /**
   * {@link VirtualManager} instance that manages virtual panels
   * @privateRemarks
   * The virtualManager instance is created during construction by {@link Flicking} constructor.
   * @readonly
   */
  public get virtual(): VirtualManager {
    return this._virtualManager;
  }

  // OTHERS
  /** Current value of the {@link FlickingOptions.autoInit | autoInit} option. */
  public get autoInit(): FlickingOptions["autoInit"] {
    return this._autoInit;
  }

  /** Current value of the {@link FlickingOptions.autoResize | autoResize} option. */
  public get autoResize(): FlickingOptions["autoResize"] {
    return this._autoResize;
  }

  /**
   * Current value of the {@link FlickingOptions.useResizeObserver | useResizeObserver} option.
   * @since 4.4.0
   */
  public get useResizeObserver(): FlickingOptions["useResizeObserver"] {
    return this._useResizeObserver;
  }

  /**
   * Current value of the {@link FlickingOptions.observePanelResize | observePanelResize} option.
   * @since 4.13.1
   */
  public get observePanelResize(): FlickingOptions["observePanelResize"] {
    return this._observePanelResize;
  }

  /**
   * Current value of the {@link FlickingOptions.resizeDebounce | resizeDebounce} option.
   * @since 4.6.0
   */
  public get resizeDebounce(): FlickingOptions["resizeDebounce"] {
    return this._resizeDebounce;
  }

  /**
   * Current value of the {@link FlickingOptions.maxResizeDebounce | maxResizeDebounce} option.
   * @since 4.6.0
   */
  public get maxResizeDebounce(): FlickingOptions["maxResizeDebounce"] {
    return this._maxResizeDebounce;
  }

  /**
   * Current value of the {@link FlickingOptions.useFractionalSize | useFractionalSize} option.
   * @since 4.9.0
   */
  public get useFractionalSize(): FlickingOptions["useFractionalSize"] {
    return this._useFractionalSize;
  }

  /** Current value of the {@link FlickingOptions.externalRenderer | externalRenderer} option. */
  public get externalRenderer(): FlickingOptions["externalRenderer"] {
    return this._externalRenderer;
  }

  /**
   * @deprecated Use {@link Flicking.externalRenderer | externalRenderer} instead.
   * Current value of the {@link FlickingOptions.renderExternal | renderExternal} option.
   */
  public get renderExternal(): FlickingOptions["renderExternal"] {
    return this._renderExternal;
  }

  /** @internal */
  public get optimizeSizeUpdate(): FlickingOptions["optimizeSizeUpdate"] {
    return this._optimizeSizeUpdate;
  }

  // Options Setter
  // UI / LAYOUT
  /**
   * Sets {@link FlickingOptions.align}.
   * @privateRemarks
   * Setting this value updates the renderer and camera alignment, and triggers a resize operation.
   */
  public set align(val: FlickingOptions["align"]) {
    this._align = val;
    this._renderer.align = val;
    this._camera.align = val;
    void this.resize();
  }

  public set defaultIndex(val: FlickingOptions["defaultIndex"]) {
    this._defaultIndex = val;
  }

  /**
   * Sets {@link FlickingOptions.horizontal}.
   * @privateRemarks
   * Setting this value updates the control direction and triggers a resize operation.
   */
  public set horizontal(val: FlickingOptions["horizontal"]) {
    this._horizontal = val;
    this._control.controller.updateDirection();
    void this.resize();
  }

  /**
   * Sets {@link FlickingOptions.circular}.
   * @privateRemarks
   * Setting this value triggers a resize operation to recalculate panel positions.
   */
  public set circular(val: FlickingOptions["circular"]) {
    this._circular = val;
    void this.resize();
  }

  /**
   * Sets {@link FlickingOptions.bound}.
   * @privateRemarks
   * Setting this value triggers a resize operation to recalculate panel positions.
   */
  public set bound(val: FlickingOptions["bound"]) {
    this._bound = val;
    void this.resize();
  }

  /**
   * Sets {@link FlickingOptions.adaptive}.
   * @privateRemarks
   * Setting this value triggers a resize operation to recalculate panel sizes.
   */
  public set adaptive(val: FlickingOptions["adaptive"]) {
    this._adaptive = val;
    void this.resize();
  }

  /**
   * Sets {@link FlickingOptions.panelsPerView}.
   * @privateRemarks
   * Setting this value triggers a resize operation to recalculate panel sizes.
   */
  public set panelsPerView(val: FlickingOptions["panelsPerView"]) {
    this._panelsPerView = val;
    void this.resize();
  }

  /**
   * Sets {@link FlickingOptions.noPanelStyleOverride}.
   * @privateRemarks
   * Setting this value triggers a resize operation to update panel styles.
   */
  public set noPanelStyleOverride(val: FlickingOptions["noPanelStyleOverride"]) {
    this._noPanelStyleOverride = val;
    void this.resize();
  }

  /**
   * Sets {@link FlickingOptions.resizeOnContentsReady}.
   * @privateRemarks
   * When set to `true`, immediately checks all panels for content readiness.
   */
  public set resizeOnContentsReady(val: FlickingOptions["resizeOnContentsReady"]) {
    this._resizeOnContentsReady = val;
    if (val) {
      this._renderer.checkPanelContentsReady(this._renderer.panels);
    }
  }

  /**
   * Sets {@link FlickingOptions.nested}.
   * @privateRemarks
   * Setting this value updates the control's axes options.
   */
  public set nested(val: FlickingOptions["nested"]) {
    this._nested = val;
    const axes = this._control.controller.axes;

    if (axes) {
      axes.options.nested = val;
    }
  }

  // EVENTS
  public set needPanelThreshold(val: FlickingOptions["needPanelThreshold"]) {
    this._needPanelThreshold = val;
  }

  public set preventEventsBeforeInit(val: FlickingOptions["preventEventsBeforeInit"]) {
    this._preventEventsBeforeInit = val;
  }

  // ANIMATION
  /**
   * Sets {@link FlickingOptions.deceleration}.
   * @privateRemarks
   * Setting this value updates the control's axes deceleration option.
   */
  public set deceleration(val: FlickingOptions["deceleration"]) {
    this._deceleration = val;
    const axes = this._control.controller.axes;

    if (axes) {
      axes.options.deceleration = val;
    }
  }

  /**
   * Sets {@link FlickingOptions.easing}.
   * @privateRemarks
   * Setting this value updates the control's axes easing option.
   */
  public set easing(val: FlickingOptions["easing"]) {
    this._easing = val;
    const axes = this._control.controller.axes;

    if (axes) {
      axes.options.easing = val;
    }
  }

  public set duration(val: FlickingOptions["duration"]) {
    this._duration = val;
  }

  // INPUT
  /**
   * Sets {@link FlickingOptions.inputType}.
   * @privateRemarks
   * Setting this value updates the control's pan input options.
   */
  public set inputType(val: FlickingOptions["inputType"]) {
    this._inputType = val;
    const panInput = this._control.controller.panInput;

    if (panInput) {
      panInput.options.inputType = val;
    }
  }

  /**
   * Sets {@link FlickingOptions.moveType}.
   * @privateRemarks
   * Setting this value creates a new Control instance based on the moveType and preserves the current panel position and progress.
   */
  public set moveType(val: FlickingOptions["moveType"]) {
    this._moveType = val;

    const prevControl = this._control;
    const newControl = this._createControl();
    const activePanel = prevControl.activePanel;
    newControl.copy(prevControl);

    const prevProgressInPanel = activePanel ? this._camera.getProgressInPanel(activePanel) : 0;

    this._control = newControl;
    this._control.updatePosition(prevProgressInPanel);
    this._control.updateInput();
  }

  public set threshold(val: FlickingOptions["threshold"]) {
    this._threshold = val;
  }

  /**
   * Sets {@link FlickingOptions.dragThreshold}.
   * @privateRemarks
   * Setting this value updates the control's pan input threshold option.
   */
  public set dragThreshold(val: FlickingOptions["dragThreshold"]) {
    this._dragThreshold = val;
    const panInput = this._control.controller.panInput;

    if (panInput) {
      panInput.options.threshold = val;
    }
  }

  /**
   * Sets {@link FlickingOptions.animationThreshold}.
   */
  public set animationThreshold(val: FlickingOptions["animationThreshold"]) {
    this._animationThreshold = val;
  }

  /**
   * Sets {@link FlickingOptions.useCSSOrder}.
   */
  public set useCSSOrder(val: FlickingOptions["useCSSOrder"]) {
    this._useCSSOrder = val;
  }

  /**
   * Sets {@link FlickingOptions.interruptable}.
   * @privateRemarks
   * Setting this value updates the control's axes interruptable option.
   */
  public set interruptable(val: FlickingOptions["interruptable"]) {
    this._interruptable = val;

    const axes = this._control.controller.axes;

    if (axes) {
      axes.options.interruptable = val;
    }
  }

  /**
   * Sets {@link FlickingOptions.bounce}.
   * @privateRemarks
   * Setting this value updates the control input configuration.
   */
  public set bounce(val: FlickingOptions["bounce"]) {
    this._bounce = val;
    this._control.updateInput();
  }

  /**
   * Sets {@link FlickingOptions.iOSEdgeSwipeThreshold}.
   * @privateRemarks
   * Setting this value updates the control's pan input iOS edge swipe threshold option.
   */
  public set iOSEdgeSwipeThreshold(val: FlickingOptions["iOSEdgeSwipeThreshold"]) {
    this._iOSEdgeSwipeThreshold = val;
    const panInput = this._control.controller.panInput;

    if (panInput) {
      panInput.options.iOSEdgeSwipeThreshold = val;
    }
  }

  /**
   * Sets {@link FlickingOptions.preventClickOnDrag}.
   * @privateRemarks
   * Setting this value adds or removes the prevent click handler from the control.
   */
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

  /**
   * Sets {@link FlickingOptions.preventDefaultOnDrag}.
   * @privateRemarks
   * Setting this value updates the control's pan input preventDefaultOnDrag option.
   */
  public set preventDefaultOnDrag(val: FlickingOptions["preventDefaultOnDrag"]) {
    this._preventDefaultOnDrag = val;
    const panInput = this._control.controller.panInput;

    if (panInput) {
      panInput.options.preventDefaultOnDrag = val;
    }
  }

  public set disableOnInit(val: FlickingOptions["disableOnInit"]) {
    this._disableOnInit = val;
  }

  public set changeOnHold(val: FlickingOptions["changeOnHold"]) {
    this._changeOnHold = val;
  }

  // PERFORMANCE
  /**
   * Sets {@link FlickingOptions.renderOnlyVisible}.
   * @privateRemarks
   * Setting this value triggers an immediate render operation.
   */
  public set renderOnlyVisible(val: FlickingOptions["renderOnlyVisible"]) {
    this._renderOnlyVisible = val;
    void this._renderer.render();
  }

  // OTHERS
  /**
   * Sets {@link FlickingOptions.autoResize}.
   * @privateRemarks
   * Setting this value enables or disables the auto resizer if Flicking is already initialized.
   */
  public set autoResize(val: FlickingOptions["autoResize"]) {
    this._autoResize = val;

    if (!this._initialized) {
      return;
    }

    if (val) {
      this._autoResizer.enable();
    } else {
      this._autoResizer.disable();
    }
  }

  /**
   * Sets {@link FlickingOptions.useResizeObserver}.
   * @privateRemarks
   * Setting this value re-enables the auto resizer if Flicking is initialized and autoResize is enabled.
   */
  public set useResizeObserver(val: FlickingOptions["useResizeObserver"]) {
    this._useResizeObserver = val;

    if (this._initialized && this._autoResize) {
      this._autoResizer.enable();
    }
  }

  /**
   * Sets {@link FlickingOptions.observePanelResize}.
   * @privateRemarks
   * Setting this value starts or stops observing panel sizes if Flicking is initialized and autoResize is enabled.
   */
  public set observePanelResize(val: FlickingOptions["observePanelResize"]) {
    this._observePanelResize = val;

    if (this._initialized && this._autoResize) {
      if (val) {
        this._autoResizer.observePanels();
      } else {
        this._autoResizer.unobservePanels();
      }
    }
  }

  public set optimizeSizeUpdate(val: FlickingOptions["optimizeSizeUpdate"]) {
    this._optimizeSizeUpdate = val;
  }

  /** Creates a new Flicking instance
   * @param root - A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string
   * @param options - A {@link FlickingOptions} object
   * @throws {@link InitializationErrors}
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
  public constructor(root: HTMLElement | string, options: Partial<FlickingOptions> = {}) {
    super();

    // Destructure options with default values
    const {
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
      nested = false,
      needPanelThreshold = 0,
      preventEventsBeforeInit = true,
      deceleration = 0.0075,
      duration = 500,
      easing = x => 1 - (1 - x) ** 3,
      inputType = ["mouse", "touch"],
      moveType = "snap",
      threshold = 40,
      dragThreshold = 1,
      interruptable = true,
      bounce = "20%",
      iOSEdgeSwipeThreshold = 30,
      preventClickOnDrag = true,
      preventDefaultOnDrag = false,
      disableOnInit = false,
      changeOnHold = false,
      renderOnlyVisible = false,
      virtual = null,
      autoInit = true,
      autoResize = true,
      useResizeObserver = true,
      resizeDebounce = 0,
      observePanelResize = false,
      maxResizeDebounce = 100,
      useFractionalSize = false,
      externalRenderer = null,
      renderExternal = null,
      optimizeSizeUpdate = false,
      animationThreshold = 0.5,
      useCSSOrder = false
    } = options;

    // Internal states
    this._initialized = false;
    this._plugins = [];
    this._isResizing = false;

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
    this._nested = nested;
    this._virtual = virtual;
    this._needPanelThreshold = needPanelThreshold;
    this._preventEventsBeforeInit = preventEventsBeforeInit;
    this._deceleration = deceleration;
    this._duration = duration;
    this._easing = easing;
    this._inputType = inputType;
    this._moveType = moveType;
    this._threshold = threshold;
    this._dragThreshold = dragThreshold;
    this._interruptable = interruptable;
    this._bounce = bounce;
    this._iOSEdgeSwipeThreshold = iOSEdgeSwipeThreshold;
    this._preventClickOnDrag = preventClickOnDrag;
    this._preventDefaultOnDrag = preventDefaultOnDrag;
    this._disableOnInit = disableOnInit;
    this._changeOnHold = changeOnHold;
    this._renderOnlyVisible = renderOnlyVisible;
    this._autoInit = autoInit;
    this._autoResize = autoResize;
    this._useResizeObserver = useResizeObserver;
    this._resizeDebounce = resizeDebounce;
    this._maxResizeDebounce = maxResizeDebounce;
    this._observePanelResize = observePanelResize;
    this._useFractionalSize = useFractionalSize;
    this._externalRenderer = externalRenderer;
    this._renderExternal = renderExternal;
    this._optimizeSizeUpdate = optimizeSizeUpdate;
    this._animationThreshold = animationThreshold;
    this._useCSSOrder = useCSSOrder;

    // Create core components
    this._viewport = new Viewport(this, getElement(root));
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
   * Initialize Flicking and move to the default index.
   * @remarks
   * This method is automatically called in the constructor when {@link FlickingOptions.autoInit | autoInit} is `true` (default).
   * If Flicking is already initialized, this method returns immediately without doing anything.
   * @fires {@link ReadyEvent}
   * @returns Promise that resolves when initialization is complete
   */
  public init(): Promise<void> {
    if (this._initialized) return Promise.resolve();

    const camera = this._camera;
    const renderer = this._renderer;
    const control = this._control;
    const virtualManager = this._virtualManager;
    const originalTrigger = this.trigger;
    const preventEventsBeforeInit = this._preventEventsBeforeInit;

    camera.init();
    virtualManager.init();
    renderer.init(this);
    control.init(this);

    if (preventEventsBeforeInit) {
      this.trigger = () => this;
    }

    this._initialResize();

    // Look at initial panel
    this._moveToInitialPanel();
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
    this._initialized = true;

    return renderer.render().then(() => {
      // Done initializing & emit ready event
      this._plugins.forEach(plugin => plugin.init(this));

      if (preventEventsBeforeInit) {
        this.trigger = originalTrigger;
      }
      this.trigger(new ComponentEvent(EVENTS.READY));
    });
  }

  /**
   * Destroy Flicking and remove all event handlers.
   * @remarks
   * This method cleans up all resources including event handlers, components, and plugins.
   * After calling this method, {@link Flicking.initialized} will be `false` and the instance should not be used.
   */
  public destroy(): void {
    this.off();

    this._autoResizer.disable();
    this._control.destroy();
    this._camera.destroy();
    this._renderer.destroy();

    this._plugins.forEach(plugin => plugin.destroy());

    this._scheduleResize = false;
    this._initialized = false;
    this._isResizing = false;
  }

  /**
   * Move to the previous panel (current index - 1).
   * @param duration - Duration of the panel movement animation (unit: ms). Defaults to {@link FlickingOptions.duration}
   * @fires {@link MovementEvents}
   * @throws {@link MovementErrors}
   * @returns Promise that resolves after reaching the previous panel
   */
  public prev(duration: number = this._duration): Promise<void> {
    return this.moveTo(this._control.activePanel?.prev()?.index ?? -1, duration, DIRECTION.PREV);
  }

  /**
   * Move to the next panel (current index + 1).
   * @param duration - Duration of the panel movement animation (unit: ms). Defaults to {@link FlickingOptions.duration}
   * @fires {@link MovementEvents}
   * @throws {@link MovementErrors}
   * @returns Promise that resolves after reaching the next panel
   */
  public next(duration: number = this._duration): Promise<void> {
    return this.moveTo(this._control.activePanel?.next()?.index ?? this._renderer.panelCount, duration, DIRECTION.NEXT);
  }

  /**
   * Move to the panel with the given index.
   * @param index - The index of the panel to move to
   * @param duration - Duration of the animation (unit: ms). Defaults to {@link FlickingOptions.duration}
   * @param direction - Direction to move (circular mode only). Defaults to {@link DIRECTION.NONE}
   * @fires {@link MovementEvents}
   * @throws {@link MovementErrors}
   * @returns Promise that resolves after reaching the target panel
   */
  public moveTo(
    index: number,
    duration: number = this._duration,
    direction: ValueOf<typeof DIRECTION> = DIRECTION.NONE
  ): Promise<void> {
    const renderer = this._renderer;
    const panelCount = renderer.panelCount;

    const panel = renderer.getPanel(index);

    if (!panel) {
      return Promise.reject(
        new FlickingError(ERROR.MESSAGE.INDEX_OUT_OF_RANGE(index, 0, panelCount - 1), ERROR.CODE.INDEX_OUT_OF_RANGE)
      );
    }

    if (this._control.animating) {
      return Promise.reject(
        new FlickingError(ERROR.MESSAGE.ANIMATION_ALREADY_PLAYING, ERROR.CODE.ANIMATION_ALREADY_PLAYING)
      );
    }

    if (this._control.holding) {
      this._control.controller.release();
    }

    return this._control.moveToPanel(panel, {
      duration,
      direction
    });
  }

  /**
   * Change the destination and duration of the animation currently playing.
   * @remarks
   * This method does nothing if no animation is currently playing.
   * @param index - The index of the panel to move to
   * @param duration - Duration of the animation (unit: ms)
   * @param direction - Direction to move. Only available when {@link FlickingOptions.circular} is enabled
   * @since 4.10.0
   * @throws {@link AnimationUpdateErrors}
   */
  public updateAnimation(index: number, duration?: number, direction?: ValueOf<typeof DIRECTION>): void {
    if (!this._control.animating) {
      return;
    }

    const renderer = this._renderer;
    const panelCount = renderer.panelCount;

    const panel = renderer.getPanel(index);

    if (!panel) {
      throw new FlickingError(
        ERROR.MESSAGE.INDEX_OUT_OF_RANGE(index, 0, panelCount - 1),
        ERROR.CODE.INDEX_OUT_OF_RANGE
      );
    }

    this._control.updateAnimation(panel, duration, direction);
  }

  /**
   * Stop the animation currently playing.
   * @remarks
   * This method does nothing if no animation is currently playing.
   * @since 4.10.0
   * @fires {@link MoveEndEvent}
   */
  public stopAnimation(): void {
    if (!this._control.animating) {
      return;
    }

    this._control.stopAnimation();
  }

  /**
   * Get the panel at the given index.
   * @param index - The index of the panel to get
   * @returns The panel at the given index, or `null` if it doesn't exist. This is a shorthand for `Flicking.renderer.getPanel(index)`.
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
   * Enable user input (mouse/touch).
   * @remarks
   * This is a shorthand for `Flicking.control.enable`.
   * @returns The current instance for method chaining
   */
  public enableInput(): this {
    this._control.enable();
    return this;
  }

  /**
   * Disable user input (mouse/touch).
   * @remarks
   * This is a shorthand for `Flicking.control.disable`.
   * @returns The current instance for method chaining
   */
  public disableInput(): this {
    this._control.disable();
    return this;
  }

  /**
   * Get the current Flicking status.
   * @param options - {@link GetStatusParams}
   * @returns Status object that can be used with {@link Flicking.setStatus} to restore the state
   */
  public getStatus(options: GetStatusParams = {}): Status {
    // Destructure options with default values
    const { index = true, position = true, includePanelHTML = false, visiblePanelsOnly = false } = options;

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
   * Restore Flicking to the state of the given {@link Status}.
   * @param status - {@link Status}
   * @throws {@link StatusRestoreErrors}
   */
  public setStatus(status: Status): void {
    if (!this._initialized) {
      throw new FlickingError(ERROR.MESSAGE.NOT_INITIALIZED, ERROR.CODE.NOT_INITIALIZED);
    }

    const { index, position, visibleOffset, panels } = status;

    const renderer = this._renderer;
    const control = this._control;

    // Can't add/remove panels on external rendering
    if (panels[0]?.html && !this._renderExternal) {
      renderer.batchRemove({
        index: 0,
        deleteCount: this.panels.length,
        hasDOMInElements: true
      });
      renderer.batchInsert({
        index: 0,
        elements: parseElement(panels.map(panel => panel.html!)),
        hasDOMInElements: true
      });
    }

    if (index != null) {
      const panelIndex = visibleOffset ? index - visibleOffset : index;

      void this.moveTo(panelIndex, 0).catch(() => void 0);
    }

    if (position && this._moveType === MOVE_TYPE.FREE_SCROLL) {
      const { panel, progressInPanel } = position;
      const panelIndex = visibleOffset ? panel - visibleOffset : panel;
      const panelRange = renderer.panels[panelIndex].range;
      const newCameraPos = panelRange.min + (panelRange.max - panelRange.min) * progressInPanel;

      void control.moveToPosition(newCameraPos, 0).catch(() => void 0);
    }
  }

  /**
   * Add plugins to Flicking.
   * @remarks
   * Plugins are automatically initialized if Flicking is already initialized.
   * @param plugins - {@link Plugin}
   * @returns The current instance for method chaining
   * @see https://github.com/naver/egjs-flicking-plugins
   */
  public addPlugins(...plugins: Plugin[]): this {
    if (this._initialized) {
      plugins.forEach(item => item.init(this));
    }

    this._plugins.push(...plugins);

    return this;
  }

  /**
   * Remove plugins from Flicking.
   * @param plugins - {@link Plugin}
   * @returns The current instance for method chaining
   * @see https://github.com/naver/egjs-flicking-plugins
   */
  public removePlugins(...plugins: Plugin[]): this {
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
   * Update viewport and panel sizes.
   * @remarks
   * This method does nothing if a resize is already in progress.
   * @fires {@link ResizeEvents}
   * @returns Promise that resolves when resize is complete
   */
  public async resize(): Promise<void> {
    if (!this._initialized) {
      return;
    }
    if (this._isResizing) {
      // resize를 연속으로 발생하면 무시하기에 마지막 viewport를 사이즈를 알 수 없음.
      // resize를 1번 더 실행할 수 잇는 스케줄링 등록
      this._scheduleResize = true;
      return;
    }

    this._scheduleResize = false;
    this._isResizing = true;

    const viewport = this._viewport;
    const renderer = this._renderer;
    const camera = this._camera;
    const control = this._control;

    const activePanel = control.activePanel;
    const prevWidth = viewport.width;
    const prevHeight = viewport.height;
    const prevProgressInPanel = activePanel ? camera.getProgressInPanel(activePanel) : 0;

    this.trigger(
      new ComponentEvent(EVENTS.BEFORE_RESIZE, {
        width: prevWidth,
        height: prevHeight,
        element: viewport.element
      })
    );

    viewport.resize();

    // 뷰포트 사이즈가 변경되었을 때 내부의 패널 사이즈들도 전부 업데이트 되어야 하므로 패널들을 전부 리렌더링한다.
    // optimizeSizeUpdate가 true일 경우에는 플리킹 방향에 대응되는 뷰포트 사이즈 요소가 변경되었을 때만 패널들을 리렌더링한다.
    // 자세한 사항은 optimizeSizeUpdate 옵션의 설명을 참고.
    if (this._optimizeSizeUpdate) {
      if ((this.horizontal && viewport.width !== prevWidth) || (!this.horizontal && viewport.height !== prevHeight)) {
        await renderer.forceRenderAllPanels();
      }
    } else {
      await renderer.forceRenderAllPanels(); // Render all panel elements, to update sizes
    }

    if (!this._initialized) {
      return;
    }
    renderer.updatePanelSize();
    camera.updateAlignPos();
    camera.updateRange();
    camera.updateAnchors();
    camera.updateAdaptiveHeight();
    camera.updatePanelOrder();
    camera.updateOffset();
    await renderer.render();

    if (!this._initialized) {
      return;
    }

    if (control.animating) {
      // TODO:
    } else {
      control.updatePosition(prevProgressInPanel);
      control.updateInput();
    }

    const newWidth = viewport.width;
    const newHeight = viewport.height;
    const sizeChanged = newWidth !== prevWidth || newHeight !== prevHeight;

    this.trigger(
      new ComponentEvent(EVENTS.AFTER_RESIZE, {
        width: viewport.width,
        height: viewport.height,
        prev: {
          width: prevWidth,
          height: prevHeight
        },
        sizeChanged,
        element: viewport.element
      })
    );

    this._isResizing = false;

    // 연속으로 resize를 호출하는 경우를 대비하기 위해서 스케줄링 반영
    if (this._scheduleResize) {
      void this.resize();
    }
    return;
  }

  /**
   * Add new panels after the last panel.
   * @param element - A new HTMLElement, outerHTML string, or an array of both
   * @throws {@link DOMManipulationErrors}
   * @returns Array of appended panels
   * @example
   * ```ts
   * const flicking = new Flicking("#flick");
   * flicking.append(document.createElement("div"));
   * flicking.append("<div>Panel</div>");
   * flicking.append(["<div>Panel</div>", document.createElement("div")]);
   * ```
   */
  public append(element: ElementLike | ElementLike[]): Panel[] {
    return this.insert(this._renderer.panelCount, element);
  }

  /**
   * Add new panels before the first panel.
   * @remarks
   * This will increase the index of existing panels by the number of panels added.
   * @param element - A new HTMLElement, outerHTML string, or an array of both
   * @throws {@link DOMManipulationErrors}
   * @returns Array of prepended panels
   * @example
   * ```ts
   * const flicking = new Flicking("#flick");
   * flicking.prepend(document.createElement("div"));
   * flicking.prepend("<div>Panel</div>");
   * flicking.prepend(["<div>Panel</div>", document.createElement("div")]);
   * ```
   */
  public prepend(element: ElementLike | ElementLike[]): Panel[] {
    return this.insert(0, element);
  }

  /**
   * Insert new panels at the given index.
   * @remarks
   * This will increase the index of panels at or after the given index by the number of panels added.
   * @param index - Index to insert new panels at
   * @param element - A new HTMLElement, outerHTML string, or an array of both
   * @throws {@link DOMManipulationErrors}
   * @returns Array of inserted panels
   * @example
   * ```ts
   * const flicking = new Flicking("#flick");
   * flicking.insert(0, document.createElement("div"));
   * flicking.insert(2, "<div>Panel</div>");
   * flicking.insert(1, ["<div>Panel</div>", document.createElement("div")]);
   * ```
   */
  public insert(index: number, element: ElementLike | ElementLike[]): Panel[] {
    if (this._renderExternal) {
      throw new FlickingError(ERROR.MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, ERROR.CODE.NOT_ALLOWED_IN_FRAMEWORK);
    }

    return this._renderer.batchInsert({
      index,
      elements: parseElement(element),
      hasDOMInElements: true
    });
  }

  /**
   * Remove panels starting from the given index.
   * @remarks
   * This will decrease the index of panels after the removed ones by the number of panels removed.
   * @param index - Index of the first panel to remove
   * @param deleteCount - Number of panels to remove. Defaults to `1`
   * @throws {@link DOMManipulationErrors}
   * @returns Array of removed panels
   */
  public remove(index: number, deleteCount: number = 1): Panel[] {
    if (this._renderExternal) {
      throw new FlickingError(ERROR.MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, ERROR.CODE.NOT_ALLOWED_IN_FRAMEWORK);
    }

    return this._renderer.batchRemove({
      index,
      deleteCount,
      hasDOMInElements: true
    });
  }

  /**
   * Factory method to create the appropriate Control implementation based on moveType option.
   * @internal
   * @privateRemarks
   * Called during constructor and when moveType option is changed. The moveType option must be set before calling this method.
   * Throws error if moveType is invalid.
   */
  private _createControl(): Control {
    const moveType = this._moveType;
    const moveTypes = Object.keys(MOVE_TYPE).map(key => MOVE_TYPE[key] as ValueOf<typeof MOVE_TYPE>);

    const moveTypeStr = Array.isArray(moveType) ? moveType[0] : moveType;

    const moveTypeOptions = Array.isArray(moveType) ? (moveType[1] ?? {}) : {};

    if (!includes(moveTypes, moveTypeStr)) {
      throw new FlickingError(
        ERROR.MESSAGE.WRONG_OPTION("moveType", JSON.stringify(moveType)),
        ERROR.CODE.WRONG_OPTION
      );
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

  /**
   * Factory method to create Camera instance for managing viewport movement and positioning.
   * @internal
   * @privateRemarks
   * Called during constructor. The align option must be set before calling this method.
   * Warns if both circular and bound options are enabled (bound is ignored).
   */
  private _createCamera(): Camera {
    if (this._circular && this._bound) {
      // eslint-disable-next-line no-console
      console.warn('"circular" and "bound" option cannot be used together, ignoring bound.');
    }

    return new Camera(this, {
      align: this._align
    });
  }

  /**
   * Factory method to create the appropriate Renderer implementation based on externalRenderer and virtual options.
   * @internal
   * @privateRemarks
   * Called during constructor. Selects ExternalRenderer if externalRenderer is provided, otherwise creates VanillaRenderer or ExternalRenderer based on renderExternal option.
   * Warns if virtual is enabled without panelsPerView.
   */
  private _createRenderer(): Renderer {
    const externalRenderer = this._externalRenderer;
    if (this._virtual && this._panelsPerView <= 0) {
      // eslint-disable-next-line no-console
      console.warn('"virtual" and "panelsPerView" option should be used together, ignoring virtual.');
    }

    return externalRenderer
      ? externalRenderer
      : this._renderExternal
        ? this._createExternalRenderer()
        : this._createVanillaRenderer();
  }

  /**
   * Factory method to create ExternalRenderer from renderExternal option (deprecated).
   * @internal
   * @privateRemarks
   * Called by _createRenderer when renderExternal option is set. The renderExternal option must not be null and must contain renderer class and options.
   */
  private _createExternalRenderer(): ExternalRenderer {
    const { renderer, rendererOptions } = this._renderExternal!;

    return new renderer({ align: this._align, ...rendererOptions });
  }

  /**
   * Factory method to create VanillaRenderer for vanilla JavaScript rendering.
   * @internal
   * @privateRemarks
   * Called by _createRenderer when neither externalRenderer nor renderExternal is set.
   * Uses VirtualRenderingStrategy if virtual is enabled, otherwise NormalRenderingStrategy.
   */
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

  /**
   * Move camera to the initial panel position based on defaultIndex option.
   * @internal
   * @privateRemarks
   * Called during init() method, after _initialResize(). Requires camera, renderer, and control to be already initialized.
   * Throws error if the initial panel position is not reachable.
   */
  private _moveToInitialPanel(): void {
    const renderer = this._renderer;
    const control = this._control;
    const camera = this._camera;
    const defaultPanel = renderer.getPanel(this._defaultIndex) || renderer.getPanel(0);

    if (!defaultPanel) return;

    const nearestAnchor = camera.findNearestAnchor(defaultPanel.position);
    const initialPanel =
      nearestAnchor &&
      defaultPanel.position !== nearestAnchor.panel.position &&
      defaultPanel.index !== nearestAnchor.panel.index
        ? nearestAnchor.panel
        : defaultPanel;
    control.setActive(initialPanel, null, false);

    if (!nearestAnchor) {
      throw new FlickingError(
        ERROR.MESSAGE.POSITION_NOT_REACHABLE(initialPanel.position),
        ERROR.CODE.POSITION_NOT_REACHABLE
      );
    }

    let position = initialPanel.position;

    if (!camera.canReach(initialPanel)) {
      position = nearestAnchor.position;
    }

    camera.lookAt(position);
    control.updateInput();
    camera.updateOffset();
  }

  /**
   * Calculate initial viewport and panel sizes during initialization.
   * @internal
   * @privateRemarks
   * Called during init() method, before _moveToInitialPanel(). This is separate from the regular resize() to avoid triggering events before initialization is complete.
   * Requires viewport, renderer, camera, and control to be already initialized. Triggers BEFORE_RESIZE and AFTER_RESIZE events.
   */
  private _initialResize() {
    const viewport = this._viewport;
    const renderer = this._renderer;
    const camera = this._camera;
    const control = this._control;

    this.trigger(
      new ComponentEvent(EVENTS.BEFORE_RESIZE, {
        width: 0,
        height: 0,
        element: viewport.element
      })
    );

    viewport.resize();
    renderer.updatePanelSize();
    camera.updateAlignPos();
    camera.updateRange();
    camera.updateAnchors();
    camera.updateOffset();
    control.updateInput();

    const newWidth = viewport.width;
    const newHeight = viewport.height;
    const sizeChanged = newWidth !== 0 || newHeight !== 0;

    this.trigger(
      new ComponentEvent(EVENTS.AFTER_RESIZE, {
        width: viewport.width,
        height: viewport.height,
        prev: {
          width: 0,
          height: 0
        },
        sizeChanged,
        element: viewport.element
      })
    );
  }
}

export default Flicking;
