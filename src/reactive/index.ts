import {
  adaptReactive,
  reactive,
  ReactiveObject,
  ReactiveSetupAdapter
} from "@cfcs/core";

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
  const distanceLastToFirst = (max - lastAnchorPoint.position) + (firstAnchorPoint.position - min);

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
    } else if (nextAnchorPoint && anchorPosition <=  cameraPosition && cameraPosition <= nextAnchorPoint.position) {
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
 * This type provides reactive state properties and methods that automatically update
 * when the Flicking instance state changes.
 * @ko Flicking의 상태와 메서드를 결합한 반응형 객체 타입
 * 이 타입은 Flicking 인스턴스의 상태가 변경될 때 자동으로 업데이트되는
 * 반응형 상태 속성들과 메서드들을 제공합니다.
 * @typedef
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
 * @ko Flicking의 반응형 상태 속성들
 * @typedef
 */
export interface FlickingReactiveState {
  /**
   * Whether Flicking has reached the first panel<ko>첫 번째 패널에 도달했는지 여부</ko>
   */
  isReachStart: boolean;
  /**
   * Whether Flicking has reached the last panel<ko>마지막 패널에 도달했는지 여부</ko>
   */
  isReachEnd: boolean;
  /**
   * Total number of panels<ko>전체 패널 개수</ko>
   */
  totalPanelCount: number;
  /**
   * Current active panel index<ko>현재 활성화된 패널의 인덱스</ko>
   */
  currentPanelIndex: number;
  /**
   * Overall scroll progress percentage (0-100)<ko>전체 스크롤 진행률 (0-100)</ko>
   */
  progress: number;
  /**
   * Panel progress with decimal values<ko>소수점을 포함한 패널 진행률</ko>
   */
  indexProgress: number;
}

/**
 * Reactive methods for Flicking
 * @ko Flicking의 반응형 메서드들
 * @typedef
 */
export interface FlickingReactiveMethod {
  /**
   * Move to a specific panel index<ko>특정 패널 인덱스로 이동</ko>
   * @param i - Target panel index<ko>목표 패널 인덱스</ko>
   * @returns Promise that resolves when movement is complete<ko>이동이 완료되면 resolve되는 Promise</ko>
   */
  moveTo: (i: number) => Promise<void>;
}

/**
 * Data required for reactive API setup
 * @ko 반응형 API 설정에 필요한 데이터
 * @typedef
 */
export interface FlickingReactiveData {
  /**
   * Flicking instance to connect<ko>연결할 Flicking 인스턴스</ko>
   */
  flicking?: Flicking;
  /**
   * Flicking options used for initialization<ko>초기화에 사용되는 Flicking 옵션</ko>
   */
  options?: FlickingReactiveAPIOptions;
}

/**
 * Options for Flicking reactive API that help optimize initial rendering in SSR scenarios
 * These options allow you to set initial state values before the Flicking instance is fully initialized,
 * preventing unnecessary re-renders when the actual Flicking state is applied.
 * @ko SSR 상황 등에서 초기 렌더링을 최적화할 수 있게 하는 Flicking 반응형 API 옵션
 * 이 옵션들을 통해 Flicking 인스턴스가 완전히 초기화되기 전에 초기 상태 값을 설정할 수 있어,
 * 실제 Flicking 상태가 적용될 때 불필요한 리렌더링을 방지할 수 있습니다.
 * @typedef
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
   * Also affects isReachStart calculation (true when defaultIndex is 0).
   * @ko 시작할 초기 패널 인덱스. currentPanelIndex와 indexProgress의 초기값을 설정합니다.
   * 또한 isReachStart 계산에도 영향을 줍니다 (defaultIndex가 0일 때 true).
   * @default 0
   */
  defaultIndex?: number;
  /**
   * Total number of panels in the Flicking instance. This sets the totalPanelCount initial value
   * and helps prevent layout shifts during SSR hydration.
   * @ko Flicking 인스턴스의 전체 패널 개수. totalPanelCount의 초기값을 설정하며
   * SSR 하이드레이션 과정에서 레이아웃 시프트를 방지하는 데 도움이 됩니다.
   * @default 0
   */
  totalPanelCount?: number;
}


/**
 * Internal reactive API adapter for Flicking that manages state and event listeners
 * This adapter is used internally by framework-specific packages (react-flicking, vue-flicking, etc.)
 * to provide reactive API support. Users rarely need to use this directly.
 * @ko Flicking의 상태와 이벤트 리스너를 관리하는 내부 반응형 API 어댑터
 * 이 어댑터는 react-flicking, vue-flicking 등의 프레임워크별 패키지에서 내부적으로 사용되어
 * 반응형 API 지원을 제공합니다. 사용자가 직접 사용할 일은 거의 없습니다.
 * @param onInit - Callback when reactive object is initialized<ko>반응형 객체가 초기화될 때 호출되는 콜백</ko>
 * @param onDestroy - Callback when reactive object is destroyed<ko>반응형 객체가 파괴될 때 호출되는 콜백</ko>
 * @param setMethods - Function to set available methods<ko>사용 가능한 메서드를 설정하는 함수</ko>
 * @returns Reactive object with Flicking state and methods<ko>Flicking 상태와 메서드를 포함한 반응형 객체</ko>
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
    isReachEnd: (options?.totalPanelCount && options?.defaultIndex) ? (options.defaultIndex === options.totalPanelCount - 1) : false,
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
 * @ko Flicking 인스턴스를 반응형 API에 연결합니다
 * @param {Flicking} flicking - Flicking instance to connect<ko>연결할 Flicking 인스턴스</ko>
 * @param {FlickingReactiveAPIOptions} [options] - Flicking options<ko>Flicking 옵션</ko>
 * @returns {FlickingReactiveObject} Reactive object with Flicking state and methods<ko>Flicking 상태와 메서드를 포함한 반응형 객체</ko>
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
const connectFlickingReactiveAPI = (flicking: Flicking, options?: FlickingReactiveAPIOptions) => {
  const obj = adaptReactive(flickingReactiveAPIAdapter, () => ({ flicking, options }));
  obj.mounted();
  const instance = obj.instance();
  obj.init();
  return instance;
};

export { flickingReactiveAPIAdapter, connectFlickingReactiveAPI };
