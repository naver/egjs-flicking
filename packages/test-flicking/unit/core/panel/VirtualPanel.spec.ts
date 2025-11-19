import VirtualPanel from "~/core/panel/VirtualPanel";
import VirtualElementProvider from "~/core/panel/provider/VirtualElementProvider";
import { ALIGN } from "~/const/external";

import El from "../../helper/El";
import { createFlicking } from "../../helper/test-util";

describe("VirtualPanel", () => {
  describe("Properties", () => {
    describe("rendered", () => {
      it("is true on creation", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0));
        const panel = new VirtualPanel({ index: 0, align: ALIGN.CENTER, flicking, elementProvider: new VirtualElementProvider(flicking) });

        expect(panel.rendered).to.be.true;
      });
    });

    describe("cachedInnerHTML", () => {
      it("is null on creation", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0));
        const panel = new VirtualPanel({ index: 0, align: ALIGN.CENTER, flicking, elementProvider: new VirtualElementProvider(flicking) });

        expect(panel.cachedInnerHTML).to.be.null;
      });
    });
  });

  describe("Methods", () => {
    describe("cacheRenderResult", async () => {
      it("should set cachedInnerHTML's value to the given parameter", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0));
        const panel = new VirtualPanel({ index: 0, align: ALIGN.CENTER, flicking, elementProvider: new VirtualElementProvider(flicking) });
        const expected = "NEW_INNERHTML";

        panel.cacheRenderResult(expected);

        expect(panel.cachedInnerHTML).to.equal(expected);
      });
    });

    describe("uncacheRenderResult", async () => {
      it("should set cachedInnerHTML's value to null", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0));
        const panel = new VirtualPanel({ index: 0, align: ALIGN.CENTER, flicking, elementProvider: new VirtualElementProvider(flicking) });

        panel.cacheRenderResult("SOME_RENDER_RESULT");
        panel.uncacheRenderResult();

        expect(panel.cachedInnerHTML).to.be.null;
      });
    });
  });
});
