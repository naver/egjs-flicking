import Flicking, { FlickingOptions } from "~/Flicking";
import Panel, { PanelOptions } from "~/core/panel/Panel";
import ElementPanel from "~/core/panel/ElementPanel";
import { ALIGN, EVENTS } from "~/const/external";

import El from "./El";
import { merge } from "~/utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare let Simulator: any;

export const createSandbox = (id: string): HTMLElement => {
  const tmp = document.createElement("div");

  tmp.className = "_tempSandbox_";
  tmp.id = id;

  document.body.appendChild(tmp);

  return tmp;
};

export const cleanup = () => {
  const elements: HTMLElement[] = [].slice.call(document.querySelectorAll("._tempSandbox_"));
  elements.forEach(v => {
    v.parentNode.removeChild(v);
  });
};

export const createFlicking = async (el: El | any, option: ConstructorParameters<typeof Flicking>[1] = {}): Promise<Flicking> => {
  const sandbox = createSandbox(`flicking-${Date.now()}`);
  const element = el instanceof El ? el.el : el;

  if (el instanceof El) {
    sandbox.appendChild(el.el);
  }

  const flicking = new Flicking(element, option);
  (window as any).flickings.push(flicking);

  if (!flicking.autoInit) return Promise.resolve(flicking);

  return new Promise(resolve => {
    flicking.once(EVENTS.READY, () => resolve(flicking));
  });
};

export const createPanel = async (el: El, panelOption: Partial<PanelOptions> = {}, flickingOption: Partial<FlickingOptions> = {}): Promise<Panel> => {
  const flicking = await createFlicking(El.viewport().add(El.camera()), flickingOption);

  flicking.camera.element.appendChild(el.el);

  return new ElementPanel({ el: el.el, align: ALIGN.CENTER, index: 0, flicking, ...panelOption });
};

export const tick = (time) => {
  (window as any).timer.tick(time);
};

export const range = (end: number): number[] => {
  if (!end || end <= 0) {
    return [];
  }

  return (Array.apply(0, Array(end)) as number[]).map((_, idx) => idx);
};

export const simulate = (el: HTMLElement, option: Partial<{
  pos: [number, number];
  deltaX: number;
  deltaY: number;
  duration: number;
  easing: string;
}> = {}, time: number = 10000): Promise<void> => (
  new Promise<void>(resolve => {
    Simulator.gestures.pan(el, merge({
      pos: [el.offsetLeft + el.offsetWidth / 2, el.offsetTop + el.offsetHeight / 2],
      deltaX: 0,
      deltaY: 0,
      duration: 500,
      easing: "linear"
    }, option), resolve);

    tick(time);
  })
);

export class NullClass {}
