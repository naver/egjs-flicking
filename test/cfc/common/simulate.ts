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

export default async (flicking: Flicking, {
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

  return new Promise<void>(resolve => {
    loop({
      element,
      pos,
      deltaX,
      deltaY,
      loopCnt: 0,
      loops,
      easing
    }, resolve);
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
}, done: () => void) => {
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

  const touches: Array<Partial<Touch>> = [{
    clientX: x,
    clientY: y,
    pageX: x,
    pageY: y,
    screenX: x,
    screenY: y
  }];

  if (isFirst) {
    fireEvent.touchStart(element, { touches });
  } else if (isLast) {
    fireEvent.touchEnd(element);
  } else {
    fireEvent.touchMove(element, { touches });
  }

  if (!isLast) {
    setTimeout(() => {
      loop({
        ...ctx,
        loopCnt: loopCnt + 1
      }, done);
    }, 16);
  } else {
    done();
  }
};
