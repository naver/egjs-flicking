import { vi } from "vitest";

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
    v.parentNode!.removeChild(v);
  });
};

export const tick = (time: number) => {
  vi.advanceTimersByTime(time);
};

export const waitEvent = (emitter: any, eventName: string) => {
  if (emitter.once) {
    return new Promise(res => {
      emitter.once(eventName, res);
    });
  } else {
    return new Promise(res => {
      emitter.addEventListener(eventName, res, { once: true });
    });
  }
};

export const waitTime = (time: number) => {
  return new Promise(res => {
    (window as any)._real.setTimeout(res, time);
  });
};
