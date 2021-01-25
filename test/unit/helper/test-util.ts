import Flicking from "~/Flicking";
import El from "./El";

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

export const createFlicking = (el: El | any, option: ConstructorParameters<typeof Flicking>[1] = {}): Flicking => {
  const sandbox = createSandbox(`flicking-${Date.now()}`);
  const element = el instanceof El ? el.el : el;

  if (el instanceof El) {
    sandbox.appendChild(el.el);
  }

  const flicking = new Flicking(element, option);

  (window as any).flickings.push(flicking);

  return flicking;
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

export class NullClass {}
