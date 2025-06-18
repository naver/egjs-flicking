import {
  adaptReactive,
  reactive,
  ReactiveObject,
  ReactiveSetupAdapter
} from "@cfcs/core";

import Flicking from "../Flicking";

const getIsReachStart = (flicking: Flicking) => !flicking.circular && flicking.index === 0;

const getIsReachEnd = (flicking: Flicking) => !flicking.circular && flicking.index === flicking.panelCount - 1;


const getTotalPanelCount = (flicking: Flicking) => flicking.panelCount;
const getCurrentPanelIndex = (flicking: Flicking) => flicking.index;


// Returns the progress percentage based on the current scroll position.
const getProgress = (flicking: Flicking) => {
  const cam = flicking.camera;

  const progressRatio = (cam.position - cam.range.min) / (cam.range.max - cam.range.min);

  const percent = Math.min(Math.max(progressRatio, 0), 1) * 100;

  return percent;
};
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

export type FlickingReactiveObject = ReactiveObject<FlickingReactiveState & FlickingReactiveMethod>;

/**
 * @typedef
 */
export interface FlickingReactiveState {
  /**
   * isReachStart
   * @ko isReachStart
   */
  isReachStart: boolean;
  /**
   * isReachEnd
   * @ko isReachEnd
   */
  isReachEnd: boolean;
  /**
   * totalPanelCount
   * @ko totalPanelCount
   */
  totalPanelCount: number;
  /**
   * currentPanelIndex
   * @ko currentPanelIndex
   */
  currentPanelIndex: number;
  /**
   * totalPanelCount
   * @ko totalPanelCount
   */
  progress: number;
  /**
   * indexProgress
   * @ko indexProgress
   */
  indexProgress: number;
}

export interface FlickingReactiveMethod {
  moveTo: (i: number) => Promise<void>;
}

export interface FlickingReactiveData {
  flicking: Flicking | null;
}

const flickingReactiveAPIAdapter: ReactiveSetupAdapter<
FlickingReactiveObject,
FlickingReactiveState,
"moveTo",
FlickingReactiveData
> = ({ onInit, onDestroy }) => {
  let flicking: Flicking | null = null;

  const moveTo = (i: number) => {
    return flicking ? flicking.moveTo(i) : Promise.reject(new Error("Flicking instance is not available"));
  };

  const reactiveObj: FlickingReactiveObject = reactive({
    isReachStart: false,
    isReachEnd: false,
    totalPanelCount: 0,
    currentPanelIndex: 0,
    progress: 0,
    indexProgress: 0,
    moveTo
  });

  const onChanged = () => {
    if (flicking === null) return;

    reactiveObj.isReachStart = getIsReachStart(flicking);
    reactiveObj.isReachEnd = getIsReachEnd(flicking);
    reactiveObj.currentPanelIndex = getCurrentPanelIndex(flicking);
  };

  const onPanelChange = () => {
    if (flicking === null) return;

    onChanged();
    reactiveObj.totalPanelCount = getTotalPanelCount(flicking);
  };

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

const connectFlickingReactiveAPI = (flicking: Flicking) => {
  const obj = adaptReactive(flickingReactiveAPIAdapter, () => ({ flicking }));
  obj.mounted();
  const instance = obj.instance();
  obj.init();
  return instance;
};

export { flickingReactiveAPIAdapter, connectFlickingReactiveAPI };
