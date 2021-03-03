/*
* Copyright (c) 2015 NAVER Corp.
* egjs projects are licensed under the MIT license
*/
import Component from "@egjs/component";

import Flicking from "~/Flicking";
import Panel from "~/core/Panel";
import { getFlickingAttached } from "~/utils";

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

  public movePanelElementsToStart(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camRangeDiff = flicking.camera.rangeDiff;

    panels.forEach(panel => {
      panel.decreaseOffset(camRangeDiff);
    });

    if (panels.length > 0) {
      this.trigger("orderChanged");
    }
    return this;
  }

  public movePanelElementsToEnd(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camRangeDiff = flicking.camera.rangeDiff;

    panels.forEach(panel => {
      panel.increaseOffset(camRangeDiff);
    });

    if (panels.length > 0) {
      this.trigger("orderChanged");
    }
    return this;
  }

  public resetPanelElementOrder(panels: Panel[]): this {
    panels.forEach(panel => {
      panel.resetOffset();
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
