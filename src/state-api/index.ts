import {
  adaptReactive,
  reactive,
  ReactiveObject,
  ReactiveSetupAdapter
} from "@cfcs/core";

import Flicking from "../Flicking";

const getIsReachStart = (flicking: Flicking) => flicking.index === 0;
const getIsReachEnd = (flicking: Flicking) =>
  flicking.index === flicking.panelCount - 1;

const getTotalPanelCount = (flicking: Flicking) => flicking.panelCount;
const getCurrentPanelIndex = (flicking: Flicking) => flicking.index;

// Returns the progress percentage based on the current panel index.
const getProgressByPanelIndex = (flicking: Flicking) =>
  flicking.panelCount > 1
    ? (flicking.index / (flicking.panelCount - 1)) * 100
    : 100;

// Returns the progress percentage based on the current scroll position.
const getProgressByScrollPos = (flicking: Flicking) => {
  const cam = flicking.camera;

  const progressRatio = (cam.position - cam.range.min) / (cam.range.max - cam.range.min);

  const percent = Math.min(Math.max(progressRatio, 0), 1) * 100;

  return percent;
};

export type FlickingStateApi = ReactiveObject<{
  isReachStart: boolean;
  isReachEnd: boolean;
  totalPanelCount: number;
  currentPanelIndex: number;
  indexProgress: number;
  scrollProgress: number;
  moveTo: (i: number) => Promise<void> | undefined;
}>;

export interface FlickingReactiveState {
  isReachStart: boolean;
  isReachEnd: boolean;
  totalPanelCount: number;
  currentPanelIndex: number;
  indexProgress: number;
  scrollProgress: number;
}

const flickingStateApiAdapter: ReactiveSetupAdapter<FlickingStateApi, FlickingReactiveState, "moveTo"> = ({ onInit, onDestroy }) => {
  let flicking: Flicking | null = null;

  const moveTo = (i: number) => flicking?.moveTo(i);

  const reactiveObj = reactive({
    isReachStart: false,
    isReachEnd: false,
    totalPanelCount: 0,
    currentPanelIndex: 0,
    indexProgress: 0,
    scrollProgress: 0,
    moveTo
  });

  const onChanged = () => {
    if (flicking === null) return;

    reactiveObj.isReachStart = getIsReachStart(flicking);
    reactiveObj.isReachEnd = getIsReachEnd(flicking);
    reactiveObj.currentPanelIndex = getCurrentPanelIndex(flicking);
    reactiveObj.indexProgress = getProgressByPanelIndex(flicking);
    reactiveObj.scrollProgress = getProgressByScrollPos(flicking);
  };

  const onPanelChange = () => {
    if (flicking === null) return;

    onChanged();
    reactiveObj.totalPanelCount = getTotalPanelCount(flicking);
  };

  onInit((inst, data) => {
    flicking = data.flicking;
    if (flicking === null) return;

    reactiveObj.isReachStart = getIsReachStart(flicking);
    reactiveObj.isReachEnd = getIsReachEnd(flicking);
    reactiveObj.currentPanelIndex = getCurrentPanelIndex(flicking);
    reactiveObj.indexProgress = getProgressByPanelIndex(flicking);
    reactiveObj.scrollProgress = getProgressByScrollPos(flicking);

    reactiveObj.totalPanelCount = getTotalPanelCount(flicking);

    flicking?.on("changed", onChanged);
    flicking?.on("panelChange", onPanelChange);
  });

  onDestroy(() => {
    flicking?.off("changed", onChanged);
    flicking?.off("panelChange", onPanelChange);
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
