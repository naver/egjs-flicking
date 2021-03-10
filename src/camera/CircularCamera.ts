/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "~/camera/Camera";
import Panel from "~/core/Panel";
import AnchorPoint from "~/core/AnchorPoint";
import { DIRECTION } from "~/const/external";
import { ValueOf } from "~/type/internal";
import { circulatePosition, getFlickingAttached } from "~/utils";

export interface TogglePoint {
  panel: Panel;
  direction: ValueOf<typeof DIRECTION>;
  toggled: boolean;
}

class CircularCamera extends Camera {
  private _circularOffset: number = 0;
  private _circularEnabled: boolean = false;
  private _panelTooglePoints: {
    [pos: number]: TogglePoint;
  } = {};

  public get controlParams() { return { range: this._range, position: this._position, circular: this._circularEnabled }; }

  public getPrevAnchor(anchor: AnchorPoint): AnchorPoint | null {
    if (!this._circularEnabled || anchor.index !== 0) return super.getPrevAnchor(anchor);

    const anchors = this._anchors;
    const rangeDiff = this.rangeDiff;
    const lastAnchor = anchors[anchors.length - 1];

    return new AnchorPoint({
      index: lastAnchor.index,
      position: lastAnchor.position - rangeDiff,
      panel: lastAnchor.panel
    });
  }

  public getNextAnchor(anchor: AnchorPoint): AnchorPoint | null {
    const anchors = this._anchors;

    if (!this._circularEnabled || anchor.index !== anchors.length - 1) return super.getNextAnchor(anchor);

    const rangeDiff = this.rangeDiff;
    const firstAnchor = anchors[0];

    return new AnchorPoint({
      index: firstAnchor.index,
      position: firstAnchor.position + rangeDiff,
      panel: firstAnchor.panel
    });
  }

  public findAnchorIncludePosition(position: number): AnchorPoint | null {
    if (!this._circularEnabled) return super.findAnchorIncludePosition(position);

    const range = this._range;
    const positionInRange = circulatePosition(position, range.min, range.max);
    const anchorInRange = super.findAnchorIncludePosition(positionInRange);

    if (!anchorInRange) return null;

    const rangeDiff = this.rangeDiff;

    if (position < range.min) {
      const loopCount = -Math.floor((range.min - position) / rangeDiff) - 1;

      return new AnchorPoint({
        index: anchorInRange.index,
        position: anchorInRange.position + rangeDiff * loopCount,
        panel: anchorInRange.panel
      });
    } else if (position > range.max) {
      const loopCount = Math.floor((position - range.max) / rangeDiff) + 1;

      return new AnchorPoint({
        index: anchorInRange.index,
        position: anchorInRange.position + rangeDiff * loopCount,
        panel: anchorInRange.panel
      });
    }

    return anchorInRange;
  }

  public clampToReachablePosition(position: number): number {
    // Basically all position is reachable for circular camera
    return this._circularEnabled
      ? position
      : super.clampToReachablePosition(position);
  }

  public canReach(panel: Panel): boolean {
    if (panel.removed) return false;

    return this._circularEnabled
      // Always reachable on circular mode
      ? true
      : super.canReach(panel);
  }

  public canSee(panel: Panel): boolean {
    const range = this._range;
    const rangeDiff = this.rangeDiff;
    const visibleRange = this.visibleRange;
    const visibleInCurrentRange = super.canSee(panel);

    if (!this._circularEnabled) {
      return visibleInCurrentRange;
    }

    // Check looped visible area for circular case
    if (visibleRange.min < range.min) {
      return visibleInCurrentRange || panel.includeRange(visibleRange.min + rangeDiff, visibleRange.max + rangeDiff, false);
    } else if (visibleRange.max > range.max) {
      return visibleInCurrentRange || panel.includeRange(visibleRange.min - rangeDiff, visibleRange.max - rangeDiff, false);
    }

    return visibleInCurrentRange;
  }

  public updateRange() {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const renderer = flicking.renderer;

    const panels = renderer.panels;
    if (panels.length <= 0) {
      this._resetInternalValues();
      return this;
    }

    const position = this._position;
    const firstPanel = panels[0]!;
    const lastPanel = panels[panels.length - 1]!;
    const firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
    const lastPanelNext = lastPanel.range.max + lastPanel.margin.next;

    const visibleSize = this.size;
    const panelSizeSum = lastPanelNext - firstPanelPrev;

    const canSetCircularMode = panels
      .every(panel => panelSizeSum - panel.size >= visibleSize);

    if (canSetCircularMode) {
      this._range = { min: firstPanelPrev, max: lastPanelNext };

      const panelTooglePoints: CircularCamera["_panelTooglePoints"] = {};
      const alignPos = this._alignPos;

      const shouldBeToggledPrev: Panel[] = [];
      const togglePointPrev: TogglePoint[] = [];

      const shouldBeToggledNext: Panel[] = [];
      const togglePointNext: TogglePoint[] = [];

      const range = this._range;
      const minimumVisible = range.min - alignPos;
      const maximumVisible = range.max - alignPos + visibleSize;

      panels.forEach(panel => {
        const shouldBeVisibleAtMin = panel.includeRange(maximumVisible - visibleSize, maximumVisible, false);
        const shouldBeVisibleAtMax = panel.includeRange(minimumVisible, minimumVisible + visibleSize, false);

        if (shouldBeVisibleAtMin) {
          const togglePos = panel.range.max + range.min - range.max + alignPos;
          const shouldToggle = togglePos > position;
          const togglePoint = {
            panel,
            direction: DIRECTION.PREV,
            toggled: shouldToggle
          };

          panelTooglePoints[togglePos] = togglePoint;

          if (shouldToggle) {
            shouldBeToggledPrev.push(panel);
            togglePointPrev.push(togglePoint);
          }
        }
        if (shouldBeVisibleAtMax) {
          const togglePos = panel.range.min + range.max - visibleSize + alignPos;
          const shouldToggle = togglePos < position;
          const togglePoint = {
            panel,
            direction: DIRECTION.NEXT,
            toggled: false
          };

          panelTooglePoints[togglePos] = togglePoint;

          if (shouldToggle) {
            shouldBeToggledNext.push(panel);
            togglePointNext.push(togglePoint);
          }
        }
      });

      renderer.elementManipulator.movePanelElementsToStart(shouldBeToggledPrev, togglePointPrev);
      renderer.elementManipulator.movePanelElementsToEnd(shouldBeToggledNext, togglePointNext);

      this._circularOffset = this._calcPanelAreaSum(shouldBeToggledPrev) - this._calcPanelAreaSum(shouldBeToggledNext);
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
    const panelTooglePoints = this._panelTooglePoints;
    const elementManipulator = flicking.renderer.elementManipulator;
    const togglePoints = Object.keys(panelTooglePoints)
      .map(pointString => parseFloat(pointString))
      .sort((a, b) => a - b);

    if (pos === prevPos) return super.lookAt(pos);

    if (pos > prevPos) {
      const togglePointInfos: TogglePoint[] = [];
      const passedPanels = togglePoints.reduce((passed: Panel[], togglePoint: number) => {
        const togglePointInfo = panelTooglePoints[togglePoint];
        const passedPoint = togglePoint >= prevPos && togglePoint <= pos;
        const shouldToggle = (togglePointInfo.direction === DIRECTION.NEXT && !togglePointInfo.toggled)
          || (togglePointInfo.direction === DIRECTION.PREV && togglePointInfo.toggled);

        if (passedPoint && shouldToggle) {
          togglePointInfo.toggled = !togglePointInfo.toggled;
          passed.push(togglePointInfo.panel);
          togglePointInfos.push(togglePointInfo);
        }
        return passed;
      }, []);

      elementManipulator.movePanelElementsToEnd(passedPanels, togglePointInfos);
      this._circularOffset -= this._calcPanelAreaSum(passedPanels);
    } else {
      const togglePointInfos: TogglePoint[] = [];
      const passedPanels = togglePoints.reduce((passed: Panel[], togglePoint: number) => {
        const togglePointInfo = panelTooglePoints[togglePoint];
        const passedPoint = togglePoint <= prevPos && togglePoint >= pos;
        const shouldToggle = (togglePointInfo.direction === DIRECTION.NEXT && togglePointInfo.toggled)
          || (togglePointInfo.direction === DIRECTION.PREV && !togglePointInfo.toggled);

        if (passedPoint && shouldToggle) {
          togglePointInfo.toggled = !togglePointInfo.toggled;
          passed.push(togglePointInfo.panel);
          togglePointInfos.push(togglePointInfo);
        }
        return passed;
      }, []);

      elementManipulator.movePanelElementsToStart(passedPanels, togglePointInfos);
      this._circularOffset += this._calcPanelAreaSum(passedPanels);
    }

    flicking.renderer.render();

    return super.lookAt(pos);
  }

  protected _applyTransform(): void {
    const el = this._el;
    const flicking = getFlickingAttached(this._flicking, "Camera");

    const actualPosition = this._position - this._alignPos - this._offset + this._circularOffset;

    el.style[this._transform] = flicking.horizontal
      ? `translate(${-actualPosition}px)`
      : `translate(0, ${-actualPosition}px)`;
  }

  protected _resetInternalValues() {
    super._resetInternalValues();
    this._circularOffset = 0;
    this._circularEnabled = false;
    this._panelTooglePoints = {};
  }

  private _calcPanelAreaSum(panels: Panel[]) {
    return panels.reduce((sum: number, panel: Panel) => sum + panel.sizeIncludingMargin, 0);
  }
}

export default CircularCamera;
