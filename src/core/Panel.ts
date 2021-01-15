/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Flicking from "~/Flicking";
import { addClass, applyCSS, parseArithmeticExpression, getProgress, restoreStyle, hasClass, getBbox } from "../utils";
import { DEFAULT_PANEL_CSS } from "../consts";
import { OriginalStyle, FlickingPanel, DestroyOption, BoundingBox } from "../types";

export interface PanelOption {
  element: HTMLElement;
  index: number;
  flicking: Flicking;
}

class Panel implements FlickingPanel {
  private _flicking: Flicking;
  private _element: HTMLElement;

  private _prevSibling: Panel | null;
  private _nextSibling: Panel | null;

  private _index: number;
  private _position: number;
  private _alignPos: number;
  private _width: number;
  private _height: number;
  private _originalStyle: OriginalStyle;

  public constructor({
    element,
    index,
    flicking
  }: PanelOption) {
    this._flicking = flicking;
    this._element = element;

    this._prevSibling = null;
    this._nextSibling = null;

    this._index = index;
    this._position = 0;
    this._alignPos = 0;
    this._width = 0;
    this._height = 0;
    this._originalStyle = {
      className: "",
      style: ""
    };

    this._applyDefaultCSS();
  }

  public destroy(option: Partial<DestroyOption>): void {
    if (!option.preserveUI) {
      const originalStyle = this._originalStyle;

      restoreStyle(this._element, originalStyle);
    }

    // release resources
    // eslint-disable-next-line guard-for-in
    for (const x in this) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (this as any)[x] = null;
    }
  }

  public resize(givenBbox?: BoundingBox): void {
    const options = this._flicking.options;
    const bbox = givenBbox
      ? givenBbox
      : getBbox(this._element, options.useOffset);

    this._width = bbox.width;
    this._height = bbox.height;

    this._alignPos = parseArithmeticExpression(options.anchor, options.horizontal ? bbox.width : bbox.height);
  }

  public getElement(): HTMLElement {
    return this._element;
  }

  public getIndex(): number {
    return this._index;
  }

  public getPosition(): number {
    return this._position;
  }

  public getAnchorPosition(): number {
    return this._position + this._alignPos;
  }

  public getSize(): number {
    const options = this._flicking.options;

    return options.horizontal ? this._width : this._height;
  }

  public getWidth(): number {
    return this._width;
  }

  public getHeight(): number {
    return this._height;
  }

  public getProgress() {
    const options = this._flicking.options;
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
      viewport.getSize()
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

  public relocate(position: number) {
    this._position = position;
    this._applyPositionCSS();
  }

  public focus(duration?: number): void {
    this._flicking.moveTo(this._index, duration);
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

  public getOverlappedClass(classes: string[]): string | undefined {
    const element = this._element;

    for (const className of classes) {
      if (hasClass(element, className)) {
        return className;
      }
    }
  }

  private _applyDefaultCSS() {
    const element = this._element;
    const originalStyle = this._originalStyle;
    const classPrefix = this._flicking.options.classPrefix;

    originalStyle.className = element.getAttribute("class") as string;
    originalStyle.style = element.getAttribute("style") as string;

    if (classPrefix) {
      addClass(element, `${classPrefix}-panel`);
    }

    // Update size info after applying panel css
    applyCSS(element, DEFAULT_PANEL_CSS);
  }

  private _applyPositionCSS() {
    const element = this._element;
    const isHorizontal = this._flicking.options.horizontal;
    const styleToApply = `${this._position}px`;

    if (isHorizontal) {
      element.style.left = styleToApply;
    } else {
      element.style.top = styleToApply;
    }
  }
}

export default Panel;
