import { ALIGN } from "~/constants/values";
import VirtualElementProvider from "~/core/panel/provider/VirtualElementProvider";
import VirtualPanel from "~/core/panel/VirtualPanel";

import El from "../../helper/El";
import { createFlicking } from "../../helper/test-util";

describe("VirtualPanel", () => {
  describe("Properties", () => {
    describe("rendered", () => {
      it("is true on creation", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0));
        const panel = new VirtualPanel({
          index: 0,
          align: ALIGN.CENTER,
          flicking,
          elementProvider: new VirtualElementProvider(flicking)
        });

        expect(panel.rendered).toBe(true);
      });
    });

    describe("cachedInnerHTML", () => {
      it("is null on creation", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0));
        const panel = new VirtualPanel({
          index: 0,
          align: ALIGN.CENTER,
          flicking,
          elementProvider: new VirtualElementProvider(flicking)
        });

        expect(panel.cachedInnerHTML).toBeNull();
      });
    });
  });

  describe("Methods", () => {
    describe("cacheRenderResult", async () => {
      it("should set cachedInnerHTML's value to the given parameter", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0));
        const panel = new VirtualPanel({
          index: 0,
          align: ALIGN.CENTER,
          flicking,
          elementProvider: new VirtualElementProvider(flicking)
        });
        const expected = "NEW_INNERHTML";

        panel.cacheRenderResult(expected);

        expect(panel.cachedInnerHTML).toBe(expected);
      });
    });

    describe("uncacheRenderResult", async () => {
      it("should set cachedInnerHTML's value to null", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0));
        const panel = new VirtualPanel({
          index: 0,
          align: ALIGN.CENTER,
          flicking,
          elementProvider: new VirtualElementProvider(flicking)
        });

        panel.cacheRenderResult("SOME_RENDER_RESULT");
        panel.uncacheRenderResult();

        expect(panel.cachedInnerHTML).toBeNull();
      });
    });
  });
});
