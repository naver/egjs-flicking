export const ARROW = {
  PREV_SELECTOR: ".flicking-arrow-prev",
  NEXT_SELECTOR: ".flicking-arrow-next",
  DISABLED_CLASS: "flicking-arrow-disabled"
} as const;

export const PAGINATION = {
  SELECTOR: ".flicking-pagination",
  PREFIX: "flicking-pagination",
  BULLET_WRAPPER_SUFFIX: "bullets",
  BULLET_SUFFIX: "bullet",
  BULLET_ACTIVE_SUFFIX: "bullet-active",
  FRACTION_WRAPPER_SUFFIX: "fraction",
  FRACTION_CURRENT_SUFFIX: "fraction-current",
  FRACTION_TOTAL_SUFFIX: "fraction-total",
  SCROLL_UNINIT_SUFFIX: "uninitialized",
  SCROLL_WRAPPER_SUFFIX: "scroll",
  SCROLL_SLIDER_SUFFIX: "slider",
  SCROLL_PREV_SUFFIX: "bullet-prev",
  SCROLL_NEXT_SUFFIX: "bullet-next",
  TYPE: {
    BULLET: "bullet",
    FRACTION: "fraction",
    SCROLL: "scroll"
  }
} as const;

export const SYNC = {
  TYPE: {
    CAMERA: "camera",
    INDEX: "index"
  }
} as const;
