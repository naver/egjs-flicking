/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "../core/panel/Panel";
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
 * @property {DIRECTION} direction Toggling position<ko>순서를 변경할 방향</ko>
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

  public get offset() { return this._offset - this._circularOffset; }
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
    const anchors = this._anchors;
    const rangeDiff = this.rangeDiff;
    const anchorCount = anchors.length;
    const positionInRange = circulatePosition(position, range.min, range.max);

    let anchorInRange: AnchorPoint | null = super.findAnchorIncludePosition(positionInRange);

    if (anchorCount > 0 && (position === range.min || position === range.max)) {
      const possibleAnchors = [
        anchorInRange,
        new AnchorPoint({
          index: 0,
          position: anchors[0].position + rangeDiff,
          panel: anchors[0].panel
        }),
        new AnchorPoint({
          index: anchorCount - 1,
          position: anchors[anchorCount - 1].position - rangeDiff,
          panel: anchors[anchorCount - 1].panel
        })
      ].filter(anchor => !!anchor) as AnchorPoint[];

      anchorInRange = possibleAnchors.reduce((nearest: AnchorPoint | null, anchor) => {
        if (!nearest) return anchor;

        return Math.abs(nearest.position - position) < Math.abs(anchor.position - position)
          ? nearest
          : anchor;
      }, null);
    }

    if (!anchorInRange) return null;

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
      return visibleInCurrentRange || panel.isVisibleOnRange(visibleRange.min + rangeDiff, visibleRange.max + rangeDiff);
    } else if (visibleRange.max > range.max) {
      return visibleInCurrentRange || panel.isVisibleOnRange(visibleRange.min - rangeDiff, visibleRange.max - rangeDiff);
    }

    return visibleInCurrentRange;
  }

  /**
   * Update {@link Camera#range range} of Camera
   * @ko Camera의 {@link Camera#range range}를 업데이트합니다
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
  public updateRange() {
    const flicking = getFlickingAttached(this._flicking);
    const renderer = flicking.renderer;

    const panels = renderer.panels;
    if (panels.length <= 0) {
      this._resetInternalValues();
      return this;
    }

    const firstPanel = panels[0]!;
    const lastPanel = panels[panels.length - 1]!;
    const firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
    const lastPanelNext = lastPanel.range.max + lastPanel.margin.next;

    const visibleSize = this.size;
    const panelSizeSum = lastPanelNext - firstPanelPrev;

    const canSetCircularMode = panels
      .every(panel => panelSizeSum - panel.size >= visibleSize);
    this._circularEnabled = canSetCircularMode;

    if (canSetCircularMode) {
      this._range = { min: firstPanelPrev, max: lastPanelNext };

      panels.forEach(panel => panel.updateCircularToggleDirection());
    } else {
      this._range = { min: firstPanel.position, max: lastPanel.position };
    }

    this.updateOffset();

    return this;
  }

  public updateOffset() {
    this._updateCircularOffset();

    return super.updateOffset();
  }

  public lookAt(pos: number) {
    const flicking = getFlickingAttached(this._flicking);
    const prevPos = this._position;

    if (pos === prevPos) return super.lookAt(pos);

    const panels = flicking.renderer.panels;
    const toggled = panels.map(panel => panel.toggle(prevPos, pos));

    this._position = pos;
    super.lookAt(pos);

    if (toggled.some(isToggled => isToggled)) {
      void flicking.renderer.render().then(() => {
        this.updateOffset();
      });
    }
  }

  public applyTransform(): this {
    const el = this._el;
    const flicking = getFlickingAttached(this._flicking);

    const actualPosition = this._position - this._alignPos - this._offset + this._circularOffset;

    el.style[this._transform] = flicking.horizontal
      ? `translate(${-actualPosition}px)`
      : `translate(0, ${-actualPosition}px)`;

    return this;
  }

  protected _resetInternalValues() {
    super._resetInternalValues();
    this._circularOffset = 0;
    this._circularEnabled = false;
  }

  private _calcPanelAreaSum(panels: Panel[]) {
    return panels.reduce((sum: number, panel: Panel) => sum + panel.sizeIncludingMargin, 0);
  }

  private _updateCircularOffset() {
    if (!this._circularEnabled) {
      this._circularOffset = 0;
      return;
    }

    const flicking = getFlickingAttached(this._flicking);
    const toggled = flicking.panels.filter(panel => panel.toggled);
    const toggledPrev = toggled.filter(panel => panel.toggleDirection === DIRECTION.PREV);
    const toggledNext = toggled.filter(panel => panel.toggleDirection === DIRECTION.NEXT);

    this._circularOffset = this._calcPanelAreaSum(toggledPrev) - this._calcPanelAreaSum(toggledNext);
  }
}

export default CircularCamera;
