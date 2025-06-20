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
 *
 * @property {boolean} isReachStart - Whether Flicking has reached the first panel<ko>첫 번째 패널에 도달했는지 여부</ko>
 * @property {boolean} isReachEnd - Whether Flicking has reached the last panel<ko>마지막 패널에 도달했는지 여부</ko>
 * @property {number} totalPanelCount - Total number of panels<ko>전체 패널 개수</ko>
 * @property {number} currentPanelIndex - Current active panel index<ko>현재 활성화된 패널의 인덱스</ko>
 * @property {number} progress - Overall scroll progress percentage (0-100)<ko>전체 스크롤 진행률 (0-100)</ko>
 * @property {number} indexProgress - Panel progress with decimal values<ko>패널 간 진행률 (소수점 포함)</ko>
 * @property {function} moveTo - Move to a specific panel index<ko>특정 패널 인덱스로 이동하는 함수</ko>
 */
export type FlickingReactiveObject = ReactiveObject<FlickingReactiveState & FlickingReactiveMethod>;

/**
 * Reactive state properties for Flicking
 * @ko Flicking의 반응형 상태 속성들
 * @interface
 * @property {boolean} isReachStart - Whether Flicking has reached the first panel<ko>첫 번째 패널에 도달했는지 여부</ko>
 * @property {boolean} isReachEnd - Whether Flicking has reached the last panel<ko>마지막 패널에 도달했는지 여부</ko>
 * @property {number} totalPanelCount - Total number of panels<ko>전체 패널 개수</ko>
 * @property {number} currentPanelIndex - Current active panel index<ko>현재 활성화된 패널의 인덱스</ko>
 * @property {number} progress - Overall scroll progress percentage (0-100)<ko>전체 스크롤 진행률 (0-100)</ko>
 * @property {number} indexProgress - Panel progress with decimal values<ko>패널 간 진행률 (소수점 포함)</ko>
 */
export interface FlickingReactiveState {
  /**
   * Whether Flicking has reached the first panel
   * @ko 첫 번째 패널에 도달했는지 여부
   */
  isReachStart: boolean;
  /**
   * Whether Flicking has reached the last panel
   * @ko 마지막 패널에 도달했는지 여부
   */
  isReachEnd: boolean;
  /**
   * Total number of panels
   * @ko 전체 패널 개수
   */
  totalPanelCount: number;
  /**
   * Current active panel index
   * @ko 현재 활성화된 패널의 인덱스
   */
  currentPanelIndex: number;
  /**
   * Overall scroll progress percentage (0-100)
   * @ko 전체 스크롤 진행률 (0-100)
   */
  progress: number;
  /**
   * Panel progress with decimal values
   * @ko 패널 간 진행률 (소수점 포함)
   */
  indexProgress: number;
}

/**
 * Reactive methods for Flicking
 * @ko Flicking의 반응형 메서드들
 * @interface
 * @property {function} moveTo - Move to a specific panel index<ko>특정 패널 인덱스로 이동</ko>
 */
export interface FlickingReactiveMethod {
  /**
   * Move to a specific panel index
   * @ko 특정 패널 인덱스로 이동합니다
   * @param i - Target panel index<ko>목표 패널 인덱스</ko>
   * @returns Promise that resolves when movement is complete<ko>이동이 완료되면 resolve되는 Promise</ko>
   */
  moveTo: (i: number) => Promise<void>;
}

/**
 * Data required for reactive API setup
 * @ko 반응형 API 설정에 필요한 데이터
 * @interface
 * @property {Flicking | null} flicking - Flicking instance or null<ko>Flicking 인스턴스 또는 null</ko>
 */
export interface FlickingReactiveData {
  flicking: Flicking | null;
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
> = ({ onInit, onDestroy, setMethods }) => {
  let flicking: Flicking | null = null;

  // Move to a specific panel index
  const moveTo = (i: number) => {
    if (flicking === null) {
      return Promise.reject(new Error("Flicking instance is not available"));
    }
    if (flicking?.animating) {
      return Promise.resolve();
    }
    return flicking.moveTo(i);
  };
  setMethods(["moveTo"]);

  const reactiveObj: FlickingReactiveObject = reactive({
    isReachStart: false,
    isReachEnd: false,
    totalPanelCount: 0,
    currentPanelIndex: 0,
    progress: 0,
    indexProgress: 0,
    moveTo
  });

  // Update state when panel changes
  const onChanged = () => {
    if (flicking === null) return;

    reactiveObj.isReachStart = getIsReachStart(flicking);
    reactiveObj.isReachEnd = getIsReachEnd(flicking);
    reactiveObj.currentPanelIndex = getCurrentPanelIndex(flicking);
  };

  // Update state when panel count changes
  const onPanelChange = () => {
    if (flicking === null) return;

    onChanged();
    reactiveObj.totalPanelCount = getTotalPanelCount(flicking);
  };

  // Update progress when camera moves
  const onMove = () => {
    if (flicking === null) return;

    reactiveObj.progress = getProgress(flicking);
    reactiveObj.indexProgress = getIndexProgress(flicking);
  };

  onInit((inst, data) => {
    flicking = data.flicking;
    if (flicking === null) return;

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
 * @param flicking - Flicking instance to connect<ko>연결할 Flicking 인스턴스</ko>
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
const connectFlickingReactiveAPI = (flicking: Flicking) => {
  const obj = adaptReactive(flickingReactiveAPIAdapter, () => ({ flicking }));
  obj.mounted();
  const instance = obj.instance();
  obj.init();
  return instance;
};

export { flickingReactiveAPIAdapter, connectFlickingReactiveAPI };
