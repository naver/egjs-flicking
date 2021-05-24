/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "../core/Panel";
import AnchorPoint from "../core/AnchorPoint";
import { DIRECTION } from "../const/external";
import { circulatePosition, getFlickingAttached } from "../utils";
import { ValueOf } from "../type/internal";

import Camera from "./Camera";

/**
 * A data of the position that changes order of the panel elements
 * @ko 패널 엘리먼트 순서가 변경되는 좌표의 데이터
 * @interface
 * @property {Panel} panel Toggling panel<ko>순서를 변경할 패널</ko>
 * @property {Constants.DIRECTION} direction Toggling position<ko>순서를 변경할 방향</ko>
 * @property {boolean} toggled Whether the panel has toggled its position to `direction`<ko>`direction` 방향으로 패널 위치를 변경했는지 여부를 나타내는 값</ko>
 */
export interface TogglePoint {
  panel: Panel;
  direction: ValueOf<typeof DIRECTION>;
  toggled: boolean;
}

/**
 * A {@link Camera} that connects the last panel and the first panel, enabling continuous loop
 * @ko 첫번째 패널과 마지막 패널이 이어진 상태로, 무한히 회전할 수 있는 종류의 {@link Camera}
 */
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

  /**
   * Update {@link Camera#range range} of Camera
   * @ko Camera의 {@link Camera#range range}를 업데이트합니다
   * @chainable
   * @throws {FlickingError}
   * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
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

    this._position = pos;
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
