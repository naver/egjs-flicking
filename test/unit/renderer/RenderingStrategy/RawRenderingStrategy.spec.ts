import RawRenderingStrategy from "~/renderer/RenderingStrategy/RawRenderingStrategy";

import { createFlicking } from "../../helper/test-util";
import El from "../../helper/El";

describe("GridRenderingStrategy", () => {
  describe("Methods", () => {
    describe("updateRenderingPanels", () => {
      it("should always make all panels visible", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const strategy = new RawRenderingStrategy();

        flicking.panels.forEach(panel => panel.markForHide());
        strategy.updateRenderingPanels(flicking);

        expect(flicking.panels.every(panel => panel.rendered)).to.be.true;
      });
    });
  });
});
