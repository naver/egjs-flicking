import { vi } from "vitest";

/**
 * Touch 이벤트를 생성/디스패치하는 simulate 함수.
 * - new Event(type, init) 사용 (모던 API)
 * - touches/changedTouches/targetTouches를 plain 객체 배열로 수동 할당
 * - identifier: 0 고정, 좌표 Math.round(), loop=1부터 시작
 * - position 공식: pos + (delta * progress) * easing(progress)
 *   → linear easing에서 quadratic 이동 (pos + delta * progress²)
 */
export const simulate = (
  el: HTMLElement,
  option: Partial<{
    pos: [number, number];
    deltaX: number;
    deltaY: number;
    duration: number;
    easing: (p: number) => number;
  }> = {},
  time: number = 10000
): Promise<void> => {
  const {
    pos = [el.offsetLeft + el.offsetWidth / 2, el.offsetTop + el.offsetHeight / 2],
    deltaX = 0,
    deltaY = 0,
    duration = 500,
    easing = (p: number) => p // linear
  } = option;

  const interval = 10;
  const loops = Math.ceil(duration / interval);

  return new Promise<void>(resolve => {
    let loop = 1;

    const step = () => {
      const progress = loop / loops;
      const easingVal = easing(progress);
      const x = Math.round(pos[0] + deltaX * progress * easingVal);
      const y = Math.round(pos[1] + deltaY * progress * easingVal);

      const isFirst = loop === 1;
      const isLast = loop === loops;

      const touch = {
        pageX: x,
        pageY: y,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        target: el,
        identifier: 0
      };

      const makeTouchList = (items: any[]) => {
        const list = [...items] as any;
        list.identifiedTouch = list.item = function (index: number) {
          return this[index] || {};
        };
        return list;
      };

      const touchList = makeTouchList([touch]);
      const targetTouches = makeTouchList([touch]);

      if (isFirst) {
        const event = new Event("touchstart", { bubbles: true, cancelable: true }) as any;
        event.touches = touchList;
        event.changedTouches = targetTouches;
        event.targetTouches = targetTouches;
        el.dispatchEvent(event);
      } else if (isLast) {
        const event = new Event("touchend", { bubbles: true, cancelable: true }) as any;
        event.touches = makeTouchList([]);
        event.changedTouches = makeTouchList([touch]);
        event.targetTouches = makeTouchList([]);
        el.dispatchEvent(event);
        resolve();
        return;
      } else {
        const event = new Event("touchmove", { bubbles: true, cancelable: true }) as any;
        event.touches = touchList;
        event.changedTouches = targetTouches;
        event.targetTouches = targetTouches;
        el.dispatchEvent(event);
      }

      loop++;
      setTimeout(step, interval);
    };

    step();
    if (time > 0) {
      vi.advanceTimersByTime(time);
    }
  });
};
