import GridRenderingStrategy from "~/renderer/RenderingStrategy/GridRenderingStrategy";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";

import { createFlicking } from "../../helper/test-util";
import El from "../../helper/El";

describe("GridRenderingStrategy", () => {
  describe("Methods", () => {
    describe("updateRenderingPanels", () => {
      it("should always make all panels visible", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const strategy = new GridRenderingStrategy();

        flicking.panels.forEach(panel => panel.markForHide());
        strategy.updateRenderingPanels(flicking);

        expect(flicking.panels.every(panel => panel.rendered)).to.be.true;
      });
    });

    describe("updatePanelSizes", () => {
      it("should throw an error with code WRONG_OPTION if panelsPerView is 0 or lower", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const strategy = new GridRenderingStrategy();

        expect(() => strategy.updatePanelSizes(flicking))
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.WRONG_OPTION);
      });

      it("should update panel sizes to match the panel sizes to match viewport size when panelsPerView is 1", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 1 });
        const strategy = new GridRenderingStrategy();
        const panels = flicking.panels;
        const viewportSize = flicking.camera.size;

        panels.forEach(panel => panel.element.style.width = "100px");
        strategy.updatePanelSizes(flicking);

        expect(viewportSize).not.equal(100);
        expect(panels.every(panel => panel.size === viewportSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === `${viewportSize}px`)).to.be.true;
      });

      it("should set panel sizes to match the panel sizes to match viewport size when panelsPerView is 1 and margin is applied to the panels", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 1 });
        const strategy = new GridRenderingStrategy();
        const panels = flicking.panels;
        const viewportSize = flicking.camera.size;

        panels.forEach(panel => panel.element.style.width = "100px");
        panels.forEach(panel => panel.element.style.marginLeft = "15px");
        panels.forEach(panel => panel.element.style.marginRight = "15px");
        strategy.updatePanelSizes(flicking);

        expect(viewportSize).not.equal(100);
        expect(panels.every(panel => panel.size === viewportSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === `${viewportSize}px`)).to.be.true;
      });

      it("should update panel sizes to match the panel sizes to match 'viewport size / panelsPerView'", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 4 });
        const strategy = new GridRenderingStrategy();
        const panels = flicking.panels;
        const expectedSize = flicking.camera.size / 4;

        panels.forEach(panel => panel.element.style.width = "100px");
        strategy.updatePanelSizes(flicking);

        expect(expectedSize).not.equal(100);
        expect(panels.every(panel => panel.size === expectedSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === `${expectedSize}px`)).to.be.true;
      });

      it("should update panel sizes to match the panel sizes to match '(viewport size - first panel's margin sum * (panelsPerSize - 1)) / panelsPerView'", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 4 });
        const strategy = new GridRenderingStrategy();
        const panels = flicking.panels;
        const firstPanel = panels[0];
        // (viewport size - first panel's margin sum * (panelsPerSize - 1)) / panelsPerView
        const expectedSize = (flicking.camera.size - 20 * 3) / 4;

        panels.forEach(panel => panel.element.style.width = "100px");
        firstPanel.element.style.marginLeft = "15px";
        firstPanel.element.style.marginRight = "5px";
        strategy.updatePanelSizes(flicking);

        expect(expectedSize).not.equal(100);
        expect(panels.every(panel => panel.size === expectedSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === `${expectedSize}px`)).to.be.true;
      });

      it("should not update panel CSS if noPanelStyleOverride is true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 1, noPanelStyleOverride: true });
        const strategy = new GridRenderingStrategy();
        const panels = flicking.panels;
        const viewportSize = flicking.camera.size;

        panels.forEach(panel => panel.element.style.width = "100px");
        strategy.updatePanelSizes(flicking);

        expect(viewportSize).not.equal(100);
        expect(panels.every(panel => panel.size === viewportSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === "100px")).to.be.true;
      });
    });
  });
});
