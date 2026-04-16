interface ScrollContext {
  total: number;
  prevIndex: number;
  sliderIndex: number;
  direction: "NEXT" | "PREV";
  bullets: HTMLElement[];
  moveTo: (index: number) => void;
}

export default ScrollContext;
