import { CrossFlicking } from "~/CrossFlicking";
import { ALIGN } from "~/constants/values";
import Panel, { PanelOptions } from "~/core/panel/Panel";
import VanillaElementProvider from "~/core/panel/provider/VanillaElementProvider";
import { EVENTS } from "~/event";
import Flicking, { FlickingOptions } from "~/Flicking";
import { createSandbox } from "../../shared/utils";
import El from "./El";

export { simulate } from "../../shared/simulate";
export { cleanup, createSandbox, tick, waitEvent, waitTime } from "../../shared/utils";

export const createFlicking = async (
  el: El | any,
  option: ConstructorParameters<typeof Flicking>[1] = {}
): Promise<Flicking> => {
  const sandbox = createSandbox(`flicking-${Date.now()}`);
  const element = el instanceof El ? el.el : el;

  if (el instanceof El) {
    sandbox.appendChild(el.el);
  }

  const flicking = new Flicking(element, option);
  (window as any).flickings.push(flicking);

  if (!flicking.autoInit) return Promise.resolve(flicking);

  return new Promise(resolve => {
    flicking.once(EVENTS.READY, () => resolve(flicking));
  });
};

export const createPanel = async (
  el: El,
  panelOption: Partial<PanelOptions> = {},
  flickingOption: Partial<FlickingOptions> = {}
): Promise<Panel> => {
  const flicking = await createFlicking(El.viewport().add(El.camera()), flickingOption);

  flicking.camera.element.appendChild(el.el);

  return new Panel({
    elementProvider: new VanillaElementProvider(el.el),
    align: ALIGN.CENTER,
    index: 0,
    flicking,
    ...panelOption
  });
};

export const createCrossFlicking = async (
  el: El | any,
  option: ConstructorParameters<typeof CrossFlicking>[1] = {}
): Promise<CrossFlicking> => {
  const sandbox = createSandbox(`flicking-${Date.now()}`);
  const element = el instanceof El ? el.el : el;

  if (el instanceof El) {
    sandbox.appendChild(el.el);
  }

  const wantsAutoInit = option.autoInit !== false;

  // Force autoInit: false so we can await the full init() chain.
  // CrossFlicking.init() chains .then() on super.init() to create the cross structure,
  // so the READY event fires BEFORE the cross structure is set up.
  const flicking = new CrossFlicking(element, { ...option, autoInit: false });
  (window as any).flickings.push(flicking);

  if (!wantsAutoInit) return flicking;

  // Await full init chain (including cross structure creation)
  await flicking.init();

  // Fix: _createCrossStructure() removes all inline styles from panels.
  // In browser mode, .flicking-viewport.vertical gets display:inline-flex (from CSS),
  // causing panels to have 0 width without explicit sizing.
  // Restore panel widths to match the viewport width and reposition camera.
  const viewportWidth = flicking.element.offsetWidth;
  if (viewportWidth > 0) {
    flicking.panels.forEach(panel => {
      if (!panel.element.style.width) {
        panel.element.style.width = `${viewportWidth}px`;
      }
    });
    await flicking.resize();
    // After resize, move camera to the current panel's correct position.
    // resize() recalculates panel positions but doesn't reposition the camera
    // to match the current panel's anchor (it was at 0 from when panels had no size).
    await flicking.moveTo(flicking.index, 0);
  }

  return flicking;
};

export const range = (end: number): number[] => {
  if (!end || end <= 0) {
    return [];
  }

  return (Array.apply(0, Array(end)) as number[]).map((_, idx) => idx);
};

export class NullClass {}
