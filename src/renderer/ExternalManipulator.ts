/*
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/
import Component from "@egjs/component";

import Flicking from "~/Flicking";
import Panel from "~/core/Panel";
import { getFlickingAttached } from "~/utils";
import CircularCamera, { TogglePoint } from "~/camera/CircularCamera";

/* eslint-disable @typescript-eslint/no-unused-vars */
class ExternalManipulator extends Component<{
  orderChanged: void;
}> {
  protected _flicking: Flicking | null;

  public constructor() {
    super();
    this._flicking = null;
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;
  }

  public destroy() {
    this._flicking = null;
  }

  public insertPanelElements(panels: Panel[], nextSibling: Panel | null): this {
    // DO NOTHING
    return this;
  }

  public movePanelElementsToStart(panels: Panel[], togglePoints: TogglePoint[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camRangeDiff = flicking.camera.rangeDiff;

    panels.forEach((panel, idx) => {
      panel.decreaseOffset(camRangeDiff);
      if (togglePoints[idx].toggled) {
        panel.element.style.order = "-1";
      } else {
        panel.element.style.order = "0";
      }
    });

    if (panels.length > 0) {
      this.trigger("orderChanged");
    }
    return this;
  }

  public movePanelElementsToEnd(panels: Panel[], togglePoints: TogglePoint[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camRangeDiff = flicking.camera.rangeDiff;

    panels.forEach((panel, idx) => {
      panel.increaseOffset(camRangeDiff);

      if (togglePoints[idx].toggled) {
        panel.element.style.order = "1";
      } else {
        panel.element.style.order = "0";
      }
    });

    if (panels.length > 0) {
      this.trigger("orderChanged");
    }
    return this;
  }

  public resetPanelElementOrder(panels: Panel[]): this {
    panels.forEach(panel => {
      panel.resetOffset();
      panel.element.style.order = "0";
    });

    if (panels.length > 0) {
      this.trigger("orderChanged");
    }
    return this;
  }

  public removePanelElements(panels: Panel[]): this {
    // DO NOTHING
    return this;
  }

  public removeAllChildNodes(element: HTMLElement): this {
    // DO NOTHING
    return this;
  }

  public removeAllTextNodes(element: HTMLElement): this {
    // DO NOTHING
    return this;
  }
}

export default ExternalManipulator;
