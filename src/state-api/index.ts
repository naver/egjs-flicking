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

export type FlickingReactiveStateApi = ReactiveObject<FlickingReactiveState  & FlickingReactiveMethod>;

export interface FlickingReactiveState {
  isReachStart: boolean;
  isReachEnd: boolean;
  totalPanelCount: number;
  currentPanelIndex: number;
  progress: number;
}

export interface FlickingReactiveMethod {
  moveTo: (i: number) => Promise<void>;
}

const flickingStateApiAdapter: ReactiveSetupAdapter<FlickingReactiveStateApi, FlickingReactiveState, "moveTo"> = ({ onInit, onDestroy }) => {
  let flicking: Flicking | null = null;

  const moveTo = (i: number) => {
    return flicking ? flicking.moveTo(i) : Promise.reject(new Error("Flicking instance is not available"));
  };

  const reactiveObj = reactive({
    isReachStart: false,
    isReachEnd: false,
    totalPanelCount: 0,
    currentPanelIndex: 0,
    progress: 0,
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

const connectFlickingStateApi = (flicking: Flicking) => {
  const obj = adaptReactive(flickingStateApiAdapter, () => ({ flicking }));
  obj.mounted();
  const instance = obj.instance();
  obj.init();
  return instance;
};

export { flickingStateApiAdapter, connectFlickingStateApi };
