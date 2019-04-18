import { OriginalStyle, FlickingOptions } from "../types";
import { DEFAULT_PANEL_CSS } from "../consts";
import { addClass, applyCSS, parseArithmeticExpression } from "../utils";

class Panel {
  public prevSibling: Panel | null;
  public nextSibling: Panel | null;

  private element: HTMLElement;
  private state: {
    index: number;
    position: number;
    relativeAnchorPosition: number;
    size: number;
    isClone: boolean;
    // Index of cloned panel, zero-based integer(original: -1, cloned: [0, 1, 2, ...])
    // if cloneIndex is 0, that means it's first cloned panel of original panel
    cloneIndex: number;
    originalStyle: OriginalStyle;
    clonedPanels: Panel[];
    cachedBbox: ClientRect | null;
  };
  private options: FlickingOptions;
  private original?: Panel;

  public constructor(
    element: HTMLElement,
    index: number,
    options: FlickingOptions,
  ) {
    this.element = element;
    this.prevSibling = null;
    this.nextSibling = null;

    this.state = {
      index,
      position: 0,
      relativeAnchorPosition: 0,
      size: 0,
      clonedPanels: [],
      isClone: false,
      cloneIndex: -1,
      originalStyle: {
        className: element.getAttribute("class") || null,
        style: element.getAttribute("style") || null,
      },
      cachedBbox: null,
    };
    this.options = options;

    if (options.classPrefix) {
      addClass(element, `${options.classPrefix}-panel`);
    }

    // Update size info after applying panel css
    applyCSS(this.element, DEFAULT_PANEL_CSS);
  }

  public resize(): void {
    const state = this.state;
    const bbox = this.getBbox();

    state.size = this.options.horizontal
      ? bbox.width
      : bbox.height;
    state.relativeAnchorPosition = parseArithmeticExpression(this.options.anchor, state.size);

    if (!state.isClone) {
      state.clonedPanels.forEach(panel => panel.resize());
    }
  }

  public reset(): void {
    this.state.cachedBbox = null;
  }

  public destroy(): void {
    const el = this.element;
    const originalStyle = this.state.originalStyle;

    originalStyle.className
      ? el.setAttribute("class", originalStyle.className)
      : el.removeAttribute("class");
    originalStyle.style
      ? el.setAttribute("style", originalStyle.style)
      : el.removeAttribute("style");

    // release resources
    for (const x in this) {
      (this as any)[x] = null;
    }
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public getAnchorPosition(): number {
    return this.state.position + this.state.relativeAnchorPosition;
  }

  public getRelativeAnchorPosition(): number {
    return this.state.relativeAnchorPosition;
  }

  public getIndex(): number {
    return this.state.index;
  }

  public getPosition(): number {
    return this.state.position;
  }

  public getSize(): number {
    return this.state.size;
  }

  public getBbox(): ClientRect {
    const state = this.state;
    if (!state.cachedBbox) {
      state.cachedBbox = this.element.getBoundingClientRect();
    }
    return state.cachedBbox;
  }

  public isClone(): boolean {
    return this.state.isClone;
  }

  public getCloneIndex(): number {
    return this.state.cloneIndex;
  }

  public getClonedPanels(): Panel[] {
    const state = this.state;

    return state.isClone
      ? this.original!.getClonedPanels()
      : state.clonedPanels;
  }

  public getIdenticalPanels(): Panel[] {
    const state = this.state;

    return state.isClone
      ? this.original!.getIdenticalPanels()
      : [this, ...state.clonedPanels];
  }

  public getOriginalPanel(): Panel {
    return this.state.isClone
      ? this.original!
      : this;
  }

  public setIndex(index: number) {
    const state = this.state;

    state.index = index;
    state.clonedPanels.forEach(panel => panel.state.index = index);
  }

  public setPosition(pos: number) {
    const state = this.state;
    const options = this.options;
    const elementStyle = this.element.style;

    state.position = pos;
    options.horizontal
      ? elementStyle.left = `${pos}px`
      : elementStyle.top = `${pos}px`;
  }

  public clone(cloneIndex: number): Panel {
    const state = this.state;

    const cloneElement = this.element.cloneNode(true) as HTMLElement;
    const clonedPanel = new Panel(cloneElement, state.index, this.options);
    const clonedState = clonedPanel.state;

    clonedPanel.original = this;
    clonedState.isClone = true;
    clonedState.cloneIndex = cloneIndex;
    // Inherit some state values
    clonedState.size = state.size;
    clonedState.relativeAnchorPosition = state.relativeAnchorPosition;
    clonedState.originalStyle = state.originalStyle;
    clonedState.cachedBbox = state.cachedBbox;
    state.clonedPanels.push(clonedPanel);

    return clonedPanel;
  }

  public remove(): void {
    const element = this.element;
    element.parentNode!.removeChild(element);

    if (!this.state.isClone) {
      this.removeClonedPanelsAfter(0);
    }
  }

  public removeClonedPanelsAfter(start: number): void {
    const state = this.state;
    const removingPanels = state.clonedPanels.splice(start);

    removingPanels.forEach(panel => {
      panel.remove();
    });
  }
}

export default Panel;
