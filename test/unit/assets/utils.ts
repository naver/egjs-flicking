import Component from "@egjs/component";
import Flicking from "../../../src/Flicking";
import { merge, counter } from "../../../src/utils";
import { EVENTS } from "../../../src/consts";
import { FlickingEvent, FlickingOptions } from "../../../src/types";

export function createFixture(type: string): HTMLElement {
  const cssId = "fixture_css";

  if (!document.getElementById(cssId)) {
    const link = document.createElement("link");

    link.id = cssId;
    link.rel = "stylesheet";
    link.href = "/base/test/unit/assets/fixture.css";

    (document.head || document.getElementsByTagName("head")[0]).appendChild(link);
  }

  const el = sandbox({
    id: `flicking-${Date.now()}`,
  });

  el.innerHTML = type;

  return el.querySelector(".wrapper");
}

export function createFlicking(type: string, option: Partial<FlickingOptions> = {}) {
  const el = createFixture(type);

  const events: FlickingEvent[] = [];
  const eventFired: string[] = [];
  const eventDirection: string[] = [];

  const handler = (e: FlickingEvent) => {
    const eventType = e.type;

    if (eventFired.length === 0 || eventFired[eventFired.length - 1] !== eventType) {
      events.push(e);
      eventFired.push(eventType);
      eventDirection.push(e.direction);
    }
  };

  const handlerMappedEvents = Object.keys(EVENTS)
    .reduce((mappedObject, eventType) => {
      mappedObject[EVENTS[eventType]] = handler;
      return mappedObject;
    }, {});

  return {
    element: el,
    instance: new Flicking(el, option || {}).on(handlerMappedEvents),
    events,
    eventFired,
    eventDirection,
  };
}

export function cleanup() {
  const elements: HTMLElement[] = [].slice.call(document.querySelectorAll("._tempSandbox_"));
  elements.forEach(v => {
    v.parentNode.removeChild(v);
  });
}

declare var Simulator: any;
export function simulate(el: HTMLElement, option?: object): Promise<void> {
  let targetElement = el.querySelector(".eg-flick-viewport");

  if (!targetElement) {
    targetElement = el;
  }

  return new Promise<void>(resolve => {
    Simulator.gestures.pan(targetElement, merge({
      pos: [50, 15],
      deltaX: 0,
      deltaY: 0,
      duration: 500,
      easing: "linear",
    }, option), resolve);
  });
}

export function waitFor(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function waitEvent(component: Component, eventName: string) {
  return new Promise(resolve => {
    component.once(eventName, e => {
      resolve(e);
    });
  });
}

const sandbox = (obj: object | string, prop?: object): HTMLElement => {
  const tmp = document.createElement("div");
  tmp.className = "_tempSandbox_";
  if (typeof obj === "string") {
    tmp.id = obj;
  } else {
    tmp.id = "sandbox";
  }

  if (typeof obj === "object" || typeof prop === "object") {
    const attrs = typeof prop === "object" ? prop : obj;
    for (const p in attrs as object) {
      if (/class|className/.test(p)) {
        tmp.setAttribute(p, attrs[p] + " _tempSandbox_");
      } else {
        tmp.setAttribute(p, attrs[p]);
      }
    }
  }
  return document.body.appendChild(tmp);
};

export const genRandomHEXColor = () => {
  return counter(3)
    .map(() => Math.floor(Math.random() * 255).toString(16))
    .map(val => `0${val}`.substring(val.length - 1))
    .join("");
};

export const createHorizontalElement = (sizePercent: number = 100) => {
  const element = document.createElement("div");
  element.style.width = `${sizePercent}%`;
  element.style.backgroundColor = `#${genRandomHEXColor()}`;

  return element;
};
