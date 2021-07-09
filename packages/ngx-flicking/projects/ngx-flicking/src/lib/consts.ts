import { EVENTS } from "@egjs/flicking";

export const EVENT_NAMES = Object.keys(EVENTS).map((key: keyof typeof EVENTS) => EVENTS[key]);
