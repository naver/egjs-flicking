/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "~/camera/Camera";
import AnchorPoint from "~/core/AnchorPoint";
import { find, findRight, getFlickingAttached } from "~/utils";

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
   * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
  public updateRange() {
    const flicking = getFlickingAttached(this._flicking, "Camera");
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
    const canSetBoundMode = viewportSize < panelAreaSize;

    if (canSetBoundMode) {
      this._range = { min: firstPanelPrev + alignPos, max: lastPanelNext - alignPos };
    } else {
      this._range = { min: firstPanel.position, max: lastPanel.position };
    }

    return this;
  }

  public updateAnchors(): this {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const panels = flicking.renderer.panels;

    if (panels.length <= 0) {
      this._anchors = [];
      return this;
    }

    const range = this._range;
    const reachablePanels = panels.filter(panel => this.canReach(panel));
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
        panel: find(panels, panel => panel.includePosition(range.min))!
      }));
    }

    if (shouldAppendBoundAnchor) {
      newAnchors.push(new AnchorPoint({
        index: newAnchors.length,
        position: range.max,
        panel: findRight(panels, panel => panel.includePosition(range.min))!
      }));
    }

    this._anchors = newAnchors;

    return this;
  }
}

export default BoundCamera;
