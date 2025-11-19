import VanillaRenderer from "~/renderer/VanillaRenderer";
import Panel from "~/core/panel/Panel";
import VirtualPanel from "~/core/panel/VirtualPanel";
import VanillaElementProvider from "~/core/panel/provider/VanillaElementProvider";

import El from "../helper/El";
import { createFlicking, range } from "../helper/test-util";
import NormalRenderingStrategy from "~/renderer/strategy/NormalRenderingStrategy";

describe("NativeRenderer", () => {
  describe("Methods", () => {
    describe("init", () => {
      it("should create panels from camera elements on initialization", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new VanillaRenderer({
          strategy: new NormalRenderingStrategy({
            providerCtor: VanillaElementProvider
          })
        });

        const prevPanels = [...renderer.panels];

        renderer.init(flicking);

        expect(prevPanels).to.be.empty;
        expect(renderer.panels).not.to.be.empty;
        expect(renderer.panels.length).to.equal(3);
      });

      it("should collect virtual panels when virtual mode is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
          panelsPerView: 1,
          virtual: {
            renderPanel: panel => `Panel ${panel.index}`,
            initialPanelCount: 100
          }
        });

        expect(flicking.virtualEnabled).to.be.true;
        expect(flicking.panels.every(panel => panel instanceof VirtualPanel)).to.be.true;
      });
    });

    describe("destroy", () => {
      it("should reset panels", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new VanillaRenderer({
          strategy: new NormalRenderingStrategy({
            providerCtor: VanillaElementProvider
          })
        }).init(flicking);

        const prevPanels = [...renderer.panels];

        renderer.destroy();

        expect(prevPanels).not.to.be.empty;
        expect(renderer.panels).to.be.empty;
        expect(renderer.panelCount).to.equal(0);
      });
    });

    describe("batchInsert", () => {
      it("should place inserted element to have correct siblings", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = flicking.renderer;
        const element = El.panel().el;

        const shouldBePrev = renderer.panels[0];
        const shouldBeNext = renderer.panels[1];

        renderer.batchInsert({ index: 1, elements: [element], hasDOMInElements: true });
        await renderer.render();

        expect(element.previousElementSibling).to.equal(shouldBePrev.element);
        expect(element.nextElementSibling).to.equal(shouldBeNext.element);
      });

      it("should resize the new panels added", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = flicking.renderer;
        const elements = range(5).map(() => El.panel("100%").el);

        const returnVal = renderer.batchInsert({ index: 2, elements, hasDOMInElements: true });

        expect(returnVal.every(panel => panel.size !== 0)).to.be.true;
      });
    });
  });
});
