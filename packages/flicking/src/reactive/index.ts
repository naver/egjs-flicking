import { adaptReactive, ReactiveObject, ReactiveSetupAdapter, reactive } from "@cfcs/core";

import Flicking from "../Flicking";

// Check if Flicking has reached the first panel
const getIsReachStart = (flicking: Flicking) => !flicking.circular && flicking.index === 0;

// Check if Flicking has reached the last panel
const getIsReachEnd = (flicking: Flicking) => !flicking.circular && flicking.index === flicking.panelCount - 1;

// Get the total number of panels
const getTotalPanelCount = (flicking: Flicking) => flicking.panelCount;

// Get the current active panel index
const getCurrentPanelIndex = (flicking: Flicking) => flicking.index;

// Calculate the overall scroll progress percentage based on the current camera position
const getProgress = (flicking: Flicking) => {
  const cam = flicking.camera;

  const progressRatio = (cam.position - cam.range.min) / (cam.range.max - cam.range.min);

  const percent = Math.min(Math.max(progressRatio, 0), 1) * 100;

  return percent;
};

// Calculate the progress between panels including decimal values
const getIndexProgress = (flicking: Flicking) => {
  const cam = flicking.camera;
  const anchorPoints = cam.anchorPoints;
  const length = anchorPoints.length;
  const cameraPosition = cam.position;
  const isCircular = flicking.circularEnabled;
  let indexProgress = 0;

  const { min, max } = cam.range;
  const firstAnchorPoint = anchorPoints[0];
  const lastAnchorPoint = anchorPoints[length - 1];
  const distanceLastToFirst = max - lastAnchorPoint.position + (firstAnchorPoint.position - min);

  anchorPoints.some((anchorPoint, index) => {
    const anchorPosition = anchorPoint.position;
    const nextAnchorPoint = anchorPoints[index + 1];

    if (index === 0 && cameraPosition <= anchorPosition) {
      if (isCircular) {
        indexProgress = (cameraPosition - anchorPosition) / distanceLastToFirst;
      } else {
        indexProgress = (cameraPosition - anchorPosition) / anchorPoint.panel.size;
      }
    } else if (index === length - 1 && cameraPosition >= anchorPosition) {
      if (isCircular) {
        indexProgress = index + (cameraPosition - anchorPosition) / distanceLastToFirst;
      } else {
        indexProgress = index + (cameraPosition - anchorPosition) / anchorPoint.panel.size;
      }
    } else if (nextAnchorPoint && anchorPosition <= cameraPosition && cameraPosition <= nextAnchorPoint.position) {
      indexProgress = index + (cameraPosition - anchorPosition) / (nextAnchorPoint.position - anchorPosition);
    } else {
      return false;
    }
    return true;
  });

  return indexProgress;
};

/**
 * Reactive object type that combines state and methods for Flicking
 * @remarks
 * This type provides reactive state properties and methods that automatically update
 * when the Flicking instance state changes.
 * @see {@link https://naver.github.io/egjs-flicking/Demos#reactive-api-demo}
 * @example
 * ```jsx
 *   const flickingRef = React.useRef(null);
 *   const {
 *     progress
 *   } = useFlickingReactiveAPI(flickingRef);
 *  ```
 */
export type FlickingReactiveObject = ReactiveObject<FlickingReactiveState & FlickingReactiveMethod>;

/**
 * Reactive state properties for Flicking
 */
export interface FlickingReactiveState {
  /** Whether Flicking has reached the first panel */
  isReachStart: boolean;
  /** Whether Flicking has reached the last panel */
  isReachEnd: boolean;
  /** Total number of panels */
  totalPanelCount: number;
  /** Current active panel index */
  currentPanelIndex: number;
  /** Overall scroll progress percentage (0-100) */
  progress: number;
  /** Panel progress with decimal values */
  indexProgress: number;
}

/**
 * Reactive methods for Flicking
 */
export interface FlickingReactiveMethod {
  /**
   * Move to a specific panel index
   * @param i - Target panel index
   * @returns Promise that resolves when movement is complete
   */
  moveTo: (i: number) => Promise<void>;
}

/**
 * Data required for reactive API setup
 */
export interface FlickingReactiveData {
  /** Flicking instance to connect */
  flicking?: Flicking;
  /** Flicking options used for initialization */
  options?: FlickingReactiveAPIOptions;
}

/**
 * Options for Flicking reactive API that help optimize initial rendering in SSR scenarios
 * @remarks
 * These options allow you to set initial state values before the Flicking instance is fully initialized,
 * preventing unnecessary re-renders when the actual Flicking state is applied.
 * @example
 * ```js
 * const options = {
 *   defaultIndex: 2,
 *   totalPanelCount: 5
 * };
 * const reactiveObj = connectFlickingReactiveAPI(flicking, options);
 * ```
 */
export interface FlickingReactiveAPIOptions {
  /**
   * Initial panel index to start with. This sets the currentPanelIndex and indexProgress initial values.
   * @remarks
   * Also affects isReachStart and isReachEnd initial value setting.
   * @defaultValue 0
   */
  defaultIndex?: number;
  /**
   * Total number of panels in the Flicking instance. This sets the totalPanelCount initial value
   * @remarks
   * Helps prevent layout shifts during SSR hydration.
   * @defaultValue 0
   */
  totalPanelCount?: number;
}

/**
 * Internal reactive API adapter for Flicking that manages state and event listeners
 * @remarks
 * This adapter is used internally by framework-specific packages (react-flicking, vue-flicking, etc.)
 * to provide reactive API support. Users rarely need to use this directly.
 * @param onInit - Callback when reactive object is initialized
 * @param onDestroy - Callback when reactive object is destroyed
 * @param setMethods - Function to set available methods
 * @returns Reactive object with Flicking state and methods
 */
const flickingReactiveAPIAdapter: ReactiveSetupAdapter<
  FlickingReactiveObject,
  FlickingReactiveState,
  "moveTo",
  FlickingReactiveData
> = ({ onInit, onDestroy, setMethods, getProps }) => {
  let flicking: Flicking | undefined;

  // Move to a specific panel index
  const moveTo = (i: number) => {
    if (flicking == null) {
      return Promise.reject(new Error("Flicking instance is not available"));
    }
    if (flicking?.animating) {
      return Promise.resolve();
    }
    return flicking.moveTo(i);
  };
  setMethods(["moveTo"]);

  const options = getProps().options;

  // options를 고려하지 않고 초기값을 설정해도 동작에는 아무런 문제가 없으나, 이 시점의 초기값과 컴포넌트 init 단계에서의 초기값이 다르면 화면 리렌더링이 발생할 수 있으므로
  // 이렇게 미리 옵션을 통해서 예측할 수 있는 부분들은 맞춰둔다.
  const reactiveObj: FlickingReactiveObject = reactive({
    isReachStart: options?.defaultIndex ? options?.defaultIndex === 0 : true,
    isReachEnd:
      options?.totalPanelCount && options?.defaultIndex ? options.defaultIndex === options.totalPanelCount - 1 : false,
    totalPanelCount: options?.totalPanelCount ?? 0,
    currentPanelIndex: options?.defaultIndex ?? 0,
    progress: 0,
    indexProgress: options?.defaultIndex ?? 0,
    moveTo
  });

  // Update state when panel changes
  const onChanged = () => {
    if (flicking === undefined) return;

    reactiveObj.isReachStart = getIsReachStart(flicking);
    reactiveObj.isReachEnd = getIsReachEnd(flicking);
    reactiveObj.currentPanelIndex = getCurrentPanelIndex(flicking);
  };

  // Update state when panel count changes
  const onPanelChange = () => {
    if (flicking === undefined) return;

    onChanged();
    reactiveObj.totalPanelCount = getTotalPanelCount(flicking);
  };

  // Update progress when camera moves
  const onMove = () => {
    if (flicking === undefined) return;

    reactiveObj.progress = getProgress(flicking);
    reactiveObj.indexProgress = getIndexProgress(flicking);
  };

  onInit((inst, data) => {
    flicking = data.flicking;
    if (flicking === undefined) return;

    reactiveObj.isReachStart = getIsReachStart(flicking);
    reactiveObj.isReachEnd = getIsReachEnd(flicking);
    reactiveObj.currentPanelIndex = getCurrentPanelIndex(flicking);
    reactiveObj.progress = getProgress(flicking);

    reactiveObj.totalPanelCount = getTotalPanelCount(flicking);

    flicking?.on("changed", onChanged);
    flicking?.on("panelChange", onPanelChange);
    flicking?.on("move", onMove);
  });

  onDestroy(() => {
    flicking?.off("changed", onChanged);
    flicking?.off("panelChange", onPanelChange);
    flicking?.off("move", onMove);
  });

  return reactiveObj;
};

/**
 * Connect Flicking instance to reactive API
 * @param flicking - Flicking instance to connect
 * @param options - Flicking options
 * @returns Reactive object with Flicking state and methods
 * @example
 * ```js
 * import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
 *
 * const flicking = new Flicking("#el");
 * const reactiveObj = connectFlickingReactiveAPI(flicking);
 *
 * // Access reactive state
 * console.log("Current panel:", reactiveObj.currentPanelIndex);
 * console.log("Progress:", reactiveObj.progress + "%");
 * console.log("Is at start:", reactiveObj.isReachStart);
 * console.log("Is at end:", reactiveObj.isReachEnd);
 * console.log("Total panels:", reactiveObj.totalPanelCount);
 * console.log("Index progress:", reactiveObj.indexProgress);
 *
 * // Subscribe to state changes
 * reactiveObj.subscribe("currentPanelIndex", (nextValue) => {
 *   console.log("Panel changed to:", nextValue);
 * });
 *
 * // Use reactive methods
 * reactiveObj.moveTo(2); // Move to third panel
 * ```
 */
const connectFlickingReactiveAPI = (
  flicking: Flicking,
  options?: FlickingReactiveAPIOptions
): FlickingReactiveObject => {
  const obj = adaptReactive(flickingReactiveAPIAdapter, () => ({ flicking, options }));
  obj.mounted();
  const instance = obj.instance();
  obj.init();
  return instance;
};

export { flickingReactiveAPIAdapter, connectFlickingReactiveAPI };
