/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "../core/Panel";
import { getFlickingAttached, includes } from "../utils";

import RawRenderer from "./RawRenderer";

/**
 * A {@link Renderer} that renders only visible panel elements({@link Camera#visiblePanels visiblePanels}) inside the camera element
 * @ko 현재 카메라의 보이는 패널들({@link Camera#visiblePanels visiblePanels})만을 카메라 엘리먼트 내에 렌더링하는 종류의 {@link Renderer}
 */
class VisibleRenderer extends RawRenderer {
  /**
   * Render visible panel elements inside the camera element
   * @ko 보이는 패널 엘리먼트들을 카메라 엘리먼트 내부에 렌더링합니다
   * @chainable
   * @return {this}
   */
  public render() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const panels = flicking.renderer.panels;
    const visiblePanels = camera.visiblePanels;
    const elementManipulator = this._elementManipulator;

    if (panels.length <= 0 || visiblePanels.length <= 0) {
      camera.offset = 0;
      return this;
    }

    if (flicking.holding) {
      // Do not remove previous visible panel elements
      // As that can stop the touch events on mobile devices
      const wasVisiblePanels = [...panels]
        .filter(panel => panel.element.parentElement === cameraElement && !includes(visiblePanels, panel));
      visiblePanels.push(...wasVisiblePanels);
    }

    const visibleSortedByActualPosition = [...visiblePanels]
      .sort((a, b) => (a.position + a.offset) - (b.position + b.offset));

    if (!flicking.holding) {
      // Remove remaining(removed) elements
      elementManipulator.removeAllChildNodes(cameraElement);
    }
    elementManipulator.insertPanelElements(visibleSortedByActualPosition, null);

    const invisiblePrevPanels = panels
      .filter(panel => !includes(visiblePanels, panel))
      .filter(panel => panel.range.max + panel.offset < camera.visibleRange.min);

    const invisibleSize = this._calcPanelRangeSize(invisiblePrevPanels);

    camera.offset = invisibleSize;

    return this;
  }

  private _calcPanelRangeSize(panels: Panel[]) {
    return panels.reduce((sum, panel) => sum + panel.sizeIncludingMargin, 0);
  }
}

export default VisibleRenderer;
