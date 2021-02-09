/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "~/camera/Camera";
import Panel from "~/core/Panel";
import { getFlickingAttached } from "~/utils";

class CircularCamera extends Camera {
  private _circularOffset: number = 0;
  private _circularEnabled: boolean = false;
  private _panelTooglePoints: {
    [pos: number]: Panel;
  } = {};

  public get circularEnabled() { return this._circularEnabled; }

  public clampToReachablePosition(position: number): number {
    // Basically all position is reachable for circular camera
    return this._circularEnabled
      ? position
      : super.clampToReachablePosition(position);
  }

  public getControlParameters() {
    return {
      ...super.getControlParameters(),
      circular: this._circularEnabled
    };
  }

  public updateRange() {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const renderer = flicking.renderer;

    const panels = renderer.getPanels();
    if (panels.length <= 0) {
      this._resetInternalValues();
      return this;
    }

    const firstPanel = panels[0]!;
    const lastPanel = panels[panels.length - 1]!;
    const firstPanelPrev = flicking.horizontal
      ? firstPanel.bbox.left - firstPanel.margin.left
      : firstPanel.bbox.top - firstPanel.margin.top;
    const lastPanelNext = flicking.horizontal
      ? lastPanel.bbox.left + lastPanel.bbox.width + lastPanel.margin.right
      : lastPanel.bbox.top + lastPanel.bbox.height + lastPanel.margin.bottom;

    const isHorizontal = flicking.horizontal;
    const viewport = flicking.viewport;
    const visibleSize = isHorizontal ? viewport.width : viewport.height;
    const panelSizeSum = lastPanelNext - firstPanelPrev;

    const canSetCircularMode = panels
      .every(panel => panelSizeSum - panel.size >= visibleSize);

    if (canSetCircularMode) {
      this._range = { min: firstPanelPrev, max: lastPanelNext };
      const panelTooglePoints = {};
      const alignPos = this._alignPos;
      const shouldBeToggled: Panel[] = [];

      panels.forEach(panel => {
        const range = this._range;
        const minimumVisible = range.min - alignPos;
        const maximumVisible = range.max - alignPos + visibleSize;
        const shouldBeVisibleAtMin = panel.includeRange(maximumVisible - visibleSize, maximumVisible, false);
        const shouldBeVisibleAtMax = panel.includeRange(minimumVisible, minimumVisible + visibleSize, false);

        if (shouldBeVisibleAtMin) {
          panelTooglePoints[panel.range.max - (maximumVisible - visibleSize)] = panel;
          shouldBeToggled.push(panel);
        }
        if (shouldBeVisibleAtMax) {
          panelTooglePoints[panel.range.min - (minimumVisible - visibleSize)] = panel;
        }
      });

      flicking.renderer.movePanelsToStart(shouldBeToggled);
      const panelSizeIncludeMargin = shouldBeToggled.reduce((sum: number, panel: Panel) => {
        const panelMargin = panel.margin;
        return sum + panel.size + (isHorizontal ? panelMargin.right - panelMargin.left : panelMargin.bottom - panelMargin.top);
      }, 0);

      this._circularOffset += panelSizeIncludeMargin;

      this._panelTooglePoints = panelTooglePoints;
    } else {
      this._range = { min: firstPanel.position, max: lastPanel.position };
      this._circularOffset = 0;
      this._panelTooglePoints = {};
    }

    this._circularEnabled = canSetCircularMode;

    return this;
  }

  public lookAt(pos: number) {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const prevPos = this._position;
    const togglePoints = Object.keys(this._panelTooglePoints)
      .map(pointString => parseFloat(pointString))
      .sort((a, b) => a - b);
    const isHorizontal = flicking.horizontal;

    if (pos === prevPos) return super.lookAt(pos);

    if (pos > prevPos) {
      const passedPanels = togglePoints.reduce((passed: Panel[], togglePoint: number) => {
        if (togglePoint > prevPos && togglePoint <= pos) {
          passed.push(this._panelTooglePoints[togglePoint]);
        }
        return passed;
      }, []);

      flicking.renderer.movePanelsToEnd(passedPanels);

      const panelSizeIncludeMargin = passedPanels.reduce((sum: number, panel: Panel) => {
        const panelMargin = panel.margin;
        return sum + panel.size + (isHorizontal ? panelMargin.right - panelMargin.left : panelMargin.bottom - panelMargin.top);
      }, 0);

      this._circularOffset -= panelSizeIncludeMargin;
    } else {
      const passedPanels = togglePoints.reduce((passed: Panel[], togglePoint: number) => {
        if (togglePoint < prevPos && togglePoint >= pos) {
          passed.push(this._panelTooglePoints[togglePoint]);
        }
        return passed;
      }, []);

      flicking.renderer.movePanelsToStart(passedPanels);

      const panelSizeIncludeMargin = passedPanels.reduce((sum: number, panel: Panel) => {
        const panelMargin = panel.margin;
        return sum + panel.size + (isHorizontal ? panelMargin.right - panelMargin.left : panelMargin.bottom - panelMargin.top);
      }, 0);

      this._circularOffset += panelSizeIncludeMargin;
    }

    return super.lookAt(pos);
  }

  protected _applyTransform(): void {
    const el = this._el;
    const flicking = getFlickingAttached(this._flicking, "Camera");

    el.style[this._transform] = flicking.horizontal
      ? `translate(${-(this._position - this._alignPos + this._circularOffset)}px)`
      : `translate(0, ${-(this._position - this._alignPos + this._circularOffset)}px)`;
  }

  protected _resetInternalValues() {
    super._resetInternalValues();
    this._circularOffset = 0;
    this._circularEnabled = false;
    this._panelTooglePoints = {};
  }
}

export default CircularCamera;
