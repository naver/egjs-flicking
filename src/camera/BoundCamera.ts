/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "../core/panel/Panel";
import AnchorPoint from "../core/AnchorPoint";
import { getFlickingAttached, parseAlign } from "../utils";

import Camera from "./Camera";

/**
 * A {@link Camera} that set range not to go out of the first/last panel, so it won't show empty spaces before/after the first/last panel
 * @ko 첫번째와 마지막 패널 밖으로 넘어가지 못하도록 범위를 설정하여, 첫번째/마지막 패널 전/후의 빈 공간을 보이지 않도록 하는 종류의 {@link Camera}
 */
class BoundCamera extends Camera {
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
    const alignPos = this._alignPos;

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.panelCount - 1);

    if (!firstPanel || !lastPanel) {
      this._range = { min: 0, max: 0 };
      return this;
    }

    const viewportSize = this.size;
    const firstPanelPrev = firstPanel.range.min;
    const lastPanelNext = lastPanel.range.max;
    const panelAreaSize = lastPanelNext - firstPanelPrev;
    const isBiggerThanViewport = viewportSize < panelAreaSize;

    const firstPos = firstPanelPrev + alignPos;
    const lastPos = lastPanelNext - viewportSize + alignPos;

    if (isBiggerThanViewport) {
      this._range = { min: firstPos, max: lastPos };
    } else {
      const align = this._align;
      const alignVal = typeof align === "object"
        ? (align as { camera: string | number }).camera
        : align;

      const pos = firstPos + parseAlign(alignVal, lastPos - firstPos);

      this._range = { min: pos, max: pos };
    }

    return this;
  }

  public updateAnchors(): this {
    const flicking = getFlickingAttached(this._flicking);
    const panels = flicking.renderer.panels;

    if (panels.length <= 0) {
      this._anchors = [];
      return this;
    }

    const range = this._range;
    const reachablePanels = panels.filter(panel => this.canReach(panel));

    if (reachablePanels.length > 0) {
      const shouldPrependBoundAnchor = reachablePanels[0].position !== range.min;
      const shouldAppendBoundAnchor = reachablePanels[reachablePanels.length - 1].position !== range.max;
      const indexOffset = shouldPrependBoundAnchor ? 1 : 0;

      const newAnchors = reachablePanels.map((panel, idx) => new AnchorPoint({
        index: idx + indexOffset,
        position: panel.position,
        panel
      }));

      if (shouldPrependBoundAnchor) {
        newAnchors.splice(0, 0, new AnchorPoint({
          index: 0,
          position: range.min,
          panel: panels[reachablePanels[0].index - 1]
        }));
      }

      if (shouldAppendBoundAnchor) {
        newAnchors.push(new AnchorPoint({
          index: newAnchors.length,
          position: range.max,
          panel: panels[reachablePanels[reachablePanels.length - 1].index + 1]
        }));
      }

      this._anchors = newAnchors;
    } else if (range.min !== range.max) {
      // There're more than 2 panels
      const nearestPanelAtMin = this._findNearestPanel(range.min, panels);
      const panelAtMin = nearestPanelAtMin.index === panels.length - 1
        ? nearestPanelAtMin.prev()!
        : nearestPanelAtMin;
      const panelAtMax = panelAtMin.next()!;

      this._anchors = [
        new AnchorPoint({
          index: 0,
          position: range.min,
          panel: panelAtMin
        }),
        new AnchorPoint({
          index: 1,
          position: range.max,
          panel: panelAtMax
        })
      ];
    } else {
      this._anchors = [new AnchorPoint({
        index: 0,
        position: range.min,
        panel: this._findNearestPanel(range.min, panels)
      })];
    }

    return this;
  }

  public findAnchorIncludePosition(position: number): AnchorPoint | null {
    const range = this._range;
    const anchors = this._anchors;

    if (anchors.length <= 0) return null;

    if (position <= range.min) {
      return anchors[0];
    } else if (position >= range.max) {
      return anchors[anchors.length - 1];
    } else {
      return super.findAnchorIncludePosition(position);
    }
  }

  private _findNearestPanel(pos: number, panels: Panel[]): Panel {
    let prevDist = Infinity;
    for (let panelIdx = 0; panelIdx < panels.length; panelIdx++) {
      const panel = panels[panelIdx];
      const dist = Math.abs(panel.position - pos);

      if (dist > prevDist) {
        // Return previous anchor
        return panels[panelIdx - 1];
      }

      prevDist = dist;
    }

    // Return last anchor
    return panels[panels.length - 1];
  }
}

export default BoundCamera;
