import Flicking, { EVENTS } from "@egjs/flicking";

export { simulate } from "../shared/simulate";
export { cleanup, createSandbox as sandbox, tick, waitEvent } from "../shared/utils";

export const createFlickingFixture = () => {
  const viewport = document.createElement("div");
  const camera = document.createElement("div");
  const panels = [0, 1, 2].map(() => document.createElement("div"));

  viewport.className = "flicking-viewport";
  camera.className = "flicking-camera";

  viewport.appendChild(camera);
  panels.forEach(panel => camera.appendChild(panel));

  return viewport;
};

export const createPaginationFixture = () => {
  const defaultFixture = createFlickingFixture();
  const paginationWrapper = document.createElement("div");

  paginationWrapper.className = "flicking-pagination";
  defaultFixture.appendChild(paginationWrapper);

  return defaultFixture;
};

export const createArrowFixture = () => {
  const defaultFixture = createFlickingFixture();
  const prevArrow = document.createElement("span");
  const nextArrow = document.createElement("span");

  prevArrow.className = "flicking-arrow-prev";
  nextArrow.className = "flicking-arrow-next";

  defaultFixture.appendChild(prevArrow);
  defaultFixture.appendChild(nextArrow);

  return defaultFixture;
};

export const createFlicking = async (
  el: HTMLElement,
  option: ConstructorParameters<typeof Flicking>[1] = {}
): Promise<Flicking> => {
  const flicking = new Flicking(el, option);

  if (!flicking.autoInit) return Promise.resolve(flicking);

  return new Promise(resolve => {
    flicking.once(EVENTS.READY, () => resolve(flicking));
  });
};

import { tick } from "../shared/utils";

export const wait = (time = 100) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, time);
    tick(time);
  });
