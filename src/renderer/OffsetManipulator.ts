import Panel from "~/core/Panel";
import ExternalManipulator from "~/renderer/ExternalManipulator";
import { TogglePoint } from "~/camera/CircularCamera";
import { getFlickingAttached } from "~/utils";

class OffsetManipulator extends ExternalManipulator {
  public movePanelElementsToStart(panels: Panel[], togglePoints: TogglePoint[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.circular && !flicking.renderOnlyVisible) {
      panels.forEach((panel, idx) => {
        if (togglePoints[idx].toggled) {
          panel.element.style.order = "-1";
        } else {
          panel.element.style.order = "0";
        }
      });
    }

    return super.movePanelElementsToStart(panels, togglePoints);
  }

  public movePanelElementsToEnd(panels: Panel[], togglePoints: TogglePoint[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.circular && !flicking.renderOnlyVisible) {
      panels.forEach((panel, idx) => {
        if (togglePoints[idx].toggled) {
          panel.element.style.order = "1";
        } else {
          panel.element.style.order = "0";
        }
      });
    }

    return super.movePanelElementsToEnd(panels, togglePoints);
  }

  public resetPanelElementOrder(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.circular && !flicking.renderOnlyVisible) {
      panels.forEach(panel => {
        panel.element.style.order = "0";
      });
    }

    return super.resetPanelElementOrder(panels);
  }
}

export default OffsetManipulator;
