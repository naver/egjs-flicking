import { adaptReactive, reactive, ReactiveObject, ReactiveSetupAdapter } from "@cfcs/core";
import Flicking from "src/Flicking";

const getIsReachStart = (flicking: Flicking) => flicking.index === 0;
const getIsReachEnd = (flicking: Flicking) =>
  flicking.index === flicking.panelCount - 1;

const getTotalPanelCount = (flicking: Flicking) => flicking.panelCount;
const getCurrentPanelIndex = (flicking: Flicking) => flicking.index;
const getProgress = (flicking: Flicking) =>
  flicking.panelCount > 1
    ? (flicking.camera.progress / (flicking.panelCount - 1)) * 100
    : 100;


export type FlickingStateApi = ReactiveObject<{
  isReachStart: boolean;
  isReachEnd: boolean;
  totalPanelCount: number;
  currentPanelIndex: number;
  progress: number;
  moveTo: (i: number) => Promise<void> | undefined;
}>;


interface FlickingReactiveState {
  isReachStart: boolean;
  isReachEnd: boolean;
  totalPanelCount: number;
  currentPanelIndex: number;
  progress: number;
}

const flickingStateApiAdapter: ReactiveSetupAdapter<FlickingStateApi, FlickingReactiveState, "moveTo"> = ({ onInit, onDestroy }) => {
  let flicking: Flicking | null = null;

  const moveTo = (i: number) => flicking?.moveTo(i);

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
    reactiveObj.progress = getProgress(flicking);
  };

  const onPanelChange = () => {
    if (flicking === null) return;

    reactiveObj.isReachStart = getIsReachStart(flicking);
    reactiveObj.isReachEnd = getIsReachEnd(flicking);

    reactiveObj.currentPanelIndex = getCurrentPanelIndex(flicking);
    reactiveObj.progress = getProgress(flicking);

    reactiveObj.totalPanelCount = getTotalPanelCount(flicking);
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
  });

  onDestroy(() => {
    flicking?.off("changed", onChanged);
    flicking?.off("panelChange", onPanelChange);
  });

  return reactiveObj;
};


const connectFlickingStateApi = (flicking: Flicking) => {
  const obj = adaptReactive(flickingStateApiAdapter, () => ({flicking}));
  obj.mounted();
  const instance = obj.instance();
  obj.init();
  return instance;
};


export { flickingStateApiAdapter, connectFlickingStateApi };
