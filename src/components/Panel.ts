/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Viewport from "./Viewport";
import { OriginalStyle, FlickingPanel, ElementLike, DestroyOption, BoundingBox } from "../types";
import { DEFAULT_PANEL_CSS, EVENTS } from "../consts";
import { addClass, applyCSS, parseArithmeticExpression, parseElement, getProgress, restoreStyle, hasClass, getBbox } from "../utils";

class Panel implements FlickingPanel {
  public viewport: Viewport;
  public prevSibling: Panel | null;
  public nextSibling: Panel | null;

  protected state: {
    index: number;
    position: number;
    relativeAnchorPosition: number;
    size: number;
    isClone: boolean;
    isVirtual: boolean;
    // Index of cloned panel, zero-based integer(original: -1, cloned: [0, 1, 2, ...])
    // if cloneIndex is 0, that means it's first cloned panel of original panel
    cloneIndex: number;
    originalStyle: OriginalStyle;
    cachedBbox: BoundingBox | null;
  };
  private element: HTMLElement;
  private original?: Panel;
  private clonedPanels: Panel[];

  public constructor(
    element?: HTMLElement | null,
    index?: number,
    viewport?: Viewport,
  ) {
    this.viewport = viewport!;
    this.prevSibling = null;
    this.nextSibling = null;
    this.clonedPanels = [];

    this.state = {
      index: index!,
      position: 0,
      relativeAnchorPosition: 0,
      size: 0,
      isClone: false,
      isVirtual: false,
      cloneIndex: -1,
      originalStyle: {
        className: "",
        style: "",
      },
      cachedBbox: null,
    };
    this.setElement(element);
  }

  public resize(givenBbox?: BoundingBox): void {
    const state = this.state;
    const options = this.viewport.options;
    const bbox = givenBbox
      ? givenBbox
      : this.getBbox();
    this.state.cachedBbox = bbox;
    const prevSize = state.size;

    state.size = options.horizontal
      ? bbox.width
      : bbox.height;

    if (prevSize !== state.size) {
      state.relativeAnchorPosition = parseArithmeticExpression(options.anchor, state.size);
    }

    if (!state.isClone) {
      this.clonedPanels.forEach(panel => {
        const cloneState = panel.state;

        cloneState.size = state.size;
        cloneState.cachedBbox = state.cachedBbox;
        cloneState.relativeAnchorPosition = state.relativeAnchorPosition;
      });
    }
  }

  public unCacheBbox(): void {
    this.state.cachedBbox = null;
  }

  public getProgress() {
    const viewport = this.viewport;
    const options = viewport.options;
    const panelCount = viewport.panelManager.getPanelCount();
    const scrollAreaSize = viewport.getScrollAreaSize();

    const relativeIndex = (options.circular ? Math.floor(this.getPosition() / scrollAreaSize) * panelCount : 0) + this.getIndex();
    const progress = relativeIndex - viewport.getCurrentProgress();

    return progress;
  }

  public getOutsetProgress() {
    const viewport = this.viewport;
    const outsetRange = [
      -this.getSize(),
      viewport.getRelativeHangerPosition() - this.getRelativeAnchorPosition(),
      viewport.getSize(),
    ];
    const relativePanelPosition = this.getPosition() - viewport.getCameraPosition();
    const outsetProgress = getProgress(relativePanelPosition, outsetRange);

    return outsetProgress;
  }

  public getVisibleRatio() {
    const viewport = this.viewport;
    const panelSize = this.getSize();
    const relativePanelPosition = this.getPosition() - viewport.getCameraPosition();
    const rightRelativePanelPosition = relativePanelPosition + panelSize;

    const visibleSize = Math.min(viewport.getSize(), rightRelativePanelPosition) - Math.max(relativePanelPosition, 0);
    const visibleRatio = visibleSize >= 0
      ? visibleSize / panelSize
      : 0;

    return visibleRatio;
  }

  public focus(duration?: number): void {
    const viewport = this.viewport;
    const currentPanel = viewport.getCurrentPanel();
    const hangerPosition = viewport.getHangerPosition();
    const anchorPosition = this.getAnchorPosition();
    if (hangerPosition === anchorPosition || !currentPanel) {
      return;
    }

    const currentPosition = currentPanel.getPosition();
    const eventType = currentPosition === this.getPosition()
      ? ""
      : EVENTS.CHANGE;

    viewport.moveTo(this, viewport.findEstimatedPosition(this), eventType, null, duration);
  }

  public update(updateFunction: ((element: HTMLElement) => any) | null = null, shouldResize: boolean = true): void {
    const identicalPanels = this.getIdenticalPanels();

    if (updateFunction) {
      identicalPanels.forEach(eachPanel => {
        updateFunction(eachPanel.getElement());
      });
    }

    if (shouldResize) {
      identicalPanels.forEach(eachPanel => {
        eachPanel.unCacheBbox();
      });
      this.viewport.addVisiblePanel(this);
      this.viewport.resize();
    }
  }

  public prev(): FlickingPanel | null {
    const viewport = this.viewport;
    const options = viewport.options;
    const prevSibling = this.prevSibling;

    if (!prevSibling) {
      return null;
    }

    const currentIndex = this.getIndex();
    const currentPosition = this.getPosition();
    const prevPanelIndex = prevSibling.getIndex();
    const prevPanelPosition = prevSibling.getPosition();
    const prevPanelSize = prevSibling.getSize();

    const hasEmptyPanelBetween = currentIndex - prevPanelIndex > 1;
    const notYetMinPanel = options.infinite
      && currentIndex > 0
      && prevPanelIndex > currentIndex;

    if (hasEmptyPanelBetween || notYetMinPanel) {
      // Empty panel exists between
      return null;
    }

    const newPosition = currentPosition - prevPanelSize - options.gap;

    let prevPanel = prevSibling;
    if (prevPanelPosition !== newPosition) {
      prevPanel = prevSibling.clone(prevSibling.getCloneIndex(), true);
      prevPanel.setPosition(newPosition);
    }

    return prevPanel;
  }

  public next(): FlickingPanel | null {
    const viewport = this.viewport;
    const options = viewport.options;
    const nextSibling = this.nextSibling;
    const lastIndex = viewport.panelManager.getLastIndex();

    if (!nextSibling) {
      return null;
    }

    const currentIndex = this.getIndex();
    const currentPosition = this.getPosition();
    const nextPanelIndex = nextSibling.getIndex();
    const nextPanelPosition = nextSibling.getPosition();

    const hasEmptyPanelBetween = nextPanelIndex - currentIndex > 1;
    const notYetMaxPanel = options.infinite
      && currentIndex < lastIndex
      && nextPanelIndex < currentIndex;

    if (hasEmptyPanelBetween || notYetMaxPanel) {
      return null;
    }

    const newPosition = currentPosition + this.getSize() + options.gap;

    let nextPanel = nextSibling;
    if (nextPanelPosition !== newPosition) {
      nextPanel = nextSibling.clone(nextSibling.getCloneIndex(), true);
      nextPanel.setPosition(newPosition);
    }

    return nextPanel;
  }

  public insertBefore(element: ElementLike | ElementLike[]): FlickingPanel[] {
    const viewport = this.viewport;
    const parsedElements = parseElement(element);
    const firstPanel = viewport.panelManager.firstPanel()!;
    const prevSibling = this.prevSibling;
    // Finding correct inserting index
    // While it should insert removing empty spaces,
    // It also should have to be bigger than prevSibling' s index
    const targetIndex = prevSibling && firstPanel.getIndex() !== this.getIndex()
      ? Math.max(prevSibling.getIndex() + 1, this.getIndex() - parsedElements.length)
      : Math.max(this.getIndex() - parsedElements.length, 0);

    return viewport.insert(targetIndex, parsedElements);
  }

  public insertAfter(element: ElementLike | ElementLike[]): FlickingPanel[] {
    return this.viewport.insert(this.getIndex() + 1, element);
  }

  public remove(): FlickingPanel {
    this.viewport.remove(this.getIndex());

    return this;
  }

  public destroy(option: Partial<DestroyOption>): void {
    if (!option.preserveUI) {
      const originalStyle = this.state.originalStyle;

      restoreStyle(this.element, originalStyle);
    }

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

  public getBbox(): BoundingBox {
    const state = this.state;
    const viewport = this.viewport;
    const element = this.element;
    const options = viewport.options;

    if (!element) {
      state.cachedBbox = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    } else if (!state.cachedBbox) {
      const wasVisible = Boolean(element.parentNode);
      const cameraElement = viewport.getCameraElement();
      if (!wasVisible) {
        cameraElement.appendChild(element);
        viewport.addVisiblePanel(this);
      }
      state.cachedBbox = getBbox(element, options.useOffset);

      if (!wasVisible && viewport.options.renderExternal) {
        cameraElement.removeChild(element);
      }
    }
    return state.cachedBbox!;
  }

  public isClone(): boolean {
    return this.state.isClone;
  }

  public getOverlappedClass(classes: string[]): string | undefined {
    const element = this.element;

    for (const className of classes) {
      if (hasClass(element, className)) {
        return className;
      }
    }
  }

  public getCloneIndex(): number {
    return this.state.cloneIndex;
  }

  public getClonedPanels(): Panel[] {
    const state = this.state;

    return state.isClone
      ? this.original!.getClonedPanels()
      : this.clonedPanels;
  }

  public getIdenticalPanels(): Panel[] {
    const state = this.state;

    return state.isClone
      ? this.original!.getIdenticalPanels()
      : [this, ...this.clonedPanels];
  }

  public getOriginalPanel(): Panel {
    return this.state.isClone
      ? this.original!
      : this;
  }

  public setIndex(index: number): void {
    const state = this.state;

    state.index = index;
    this.clonedPanels.forEach(panel => panel.state.index = index);
  }

  public setPosition(pos: number): this {
    this.state.position = pos;

    return this;
  }

  public setPositionCSS(offset: number = 0): void {
    if (!this.element) {
      return;
    }
    const state = this.state;
    const pos = state.position;
    const options = this.viewport.options;
    const elementStyle = this.element.style;
    const currentElementStyle = options.horizontal
      ? elementStyle.left
      : elementStyle.top;
    const styleToApply = `${pos - offset}px`;

    if (!state.isVirtual && currentElementStyle !== styleToApply) {
      options.horizontal
        ? elementStyle.left = styleToApply
        : elementStyle.top = styleToApply;
    }
  }

  public clone(cloneIndex: number, isVirtual: boolean = false, element?: HTMLElement | null): Panel {
    const state = this.state;
    const viewport = this.viewport;
    let cloneElement = element;

    if (!cloneElement && this.element) {
      cloneElement = isVirtual ? this.element : this.element.cloneNode(true) as HTMLElement;
    }
    const clonedPanel = new Panel(cloneElement, state.index, viewport);
    const clonedState = clonedPanel.state;

    clonedPanel.original = state.isClone
      ? this.original
      : this;
    clonedState.isClone = true;
    clonedState.isVirtual = isVirtual;
    clonedState.cloneIndex = cloneIndex;
    // Inherit some state values
    clonedState.size = state.size;
    clonedState.relativeAnchorPosition = state.relativeAnchorPosition;
    clonedState.originalStyle = state.originalStyle;
    clonedState.cachedBbox = state.cachedBbox;

    if (!isVirtual) {
      this.clonedPanels.push(clonedPanel);
    } else {
      clonedPanel.prevSibling = this.prevSibling;
      clonedPanel.nextSibling = this.nextSibling;
    }

    return clonedPanel;
  }

  public removeElement(): void {
    if (!this.viewport.options.renderExternal) {
      const element = this.element;
      element.parentNode && element.parentNode.removeChild(element);
    }

    // Do the same thing for clones
    if (!this.state.isClone) {
      this.removeClonedPanelsAfter(0);
    }
  }

  public removeClonedPanelsAfter(start: number): void {
    const options = this.viewport.options;
    const removingPanels = this.clonedPanels.splice(start);

    if (!options.renderExternal) {
      removingPanels.forEach(panel => {
        panel.removeElement();
      });
    }
  }

  public setElement(element?: HTMLElement | null): void {
    if (!element) {
      return;
    }
    const currentElement = this.element;
    if (element !== currentElement) {
      const options = this.viewport.options;

      if (currentElement) {
        if (options.horizontal) {
          element.style.left = currentElement.style.left;
        } else {
          element.style.top = currentElement.style.top;
        }
      } else {
        const originalStyle = this.state.originalStyle;

        originalStyle.className = element.getAttribute("class");
        originalStyle.style = element.getAttribute("style");
      }

      this.element = element;

      if (options.classPrefix) {
        addClass(element, `${options.classPrefix}-panel`);
      }

      // Update size info after applying panel css
      applyCSS(this.element, DEFAULT_PANEL_CSS);
    }
  }
}

export default Panel;
