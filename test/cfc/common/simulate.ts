import Flicking, { range } from "@egjs/flicking";
import { fireEvent } from "@testing-library/dom";

export const EASING = {
  linear: function(p: number) { return p; },
  swing: function(p: number) { return 0.5 - Math.cos(p * Math.PI) / 2; },
  quad: function(p: number) { return Math.pow(p, 2); },
  cubic: function(p: number) { return Math.pow(p, 3); },
  quart: function(p: number) { return Math.pow(p, 4); },
  quint: function(p: number) { return Math.pow(p, 5); },
  expo: function(p: number) { return Math.pow(p, 6); }
};

export default (flicking: Flicking, {
  pos = [0, 0],
  deltaX = 0,
  deltaY = 0,
  duration = 500,
  easing = EASING.cubic
}: Partial<{
  pos: [number, number];
  deltaX: number;
  deltaY: number;
  duration: number;
  easing: (p: number) => number;
}> = {}) => {
  const element = flicking.panels[0].element;
  const interval = 1000 / 60; // 60fps
  const loops = Math.ceil(duration / interval);

  loop({
    element,
    pos,
    deltaX,
    deltaY,
    loopCnt: 0,
    loops,
    easing
  });
};

const loop = (ctx: {
  element: HTMLElement;
  pos: [number, number];
  deltaX: number;
  deltaY: number;
  loopCnt: number;
  loops: number;
  easing: (p: number) => number;
}) => {
  const {
    element,
    pos,
    deltaX,
    deltaY,
    loopCnt,
    loops,
    easing
  } = ctx;

  const initialX = pos[0];
  const initialY = pos[1];
  const progress = easing((loopCnt + 1) / loops);
  const x = initialX + deltaX * progress;
  const y = initialY + deltaY * progress;

  const isFirst = (loopCnt === 0);
  const isLast = (loopCnt === loops - 1);

  const eventProps: Partial<MouseEvent> = {
    x,
    y,
    clientX: x,
    clientY: y,
    offsetX: x,
    offsetY: y,
    pageX: x,
    pageY: y,
    screenX: x,
    screenY: y,
    button: 0,
    buttons: 1,
    which: 1,
    isTrusted: true
  };

  if (isFirst) {
    fireEvent.mouseDown(element, eventProps);
  } else if (isLast) {
    fireEvent.mouseUp(element, eventProps);
  } else {
    fireEvent.mouseMove(element, eventProps);
  }

  if (!isLast) {
    setTimeout(() => {
      loop({
        ...ctx,
        loopCnt: loopCnt + 1
      });
    }, 16);
  }
};
