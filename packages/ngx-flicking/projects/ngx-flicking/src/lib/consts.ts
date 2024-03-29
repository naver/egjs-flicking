import { EVENTS } from '@egjs/flicking';

export const EVENT_NAMES = (
  Object.keys(EVENTS) as Array<keyof typeof EVENTS>
).map((key) => EVENTS[key]);
