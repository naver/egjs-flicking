import VanillaRenderer from "~/renderer/VanillaRenderer";
import El from "helper/El";
import { createFlicking, range } from "../helper/test-util";

describe("NativeRenderer", () => {
  describe("Methods", () => {
    describe("init", () => {
      it("should create panels from camera elements on initialization", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new VanillaRenderer();

        const prevPanels = [...renderer.panels];

        renderer.init(flicking);

        expect(prevPanels).to.be.empty;
        expect(renderer.panels).not.to.be.empty;
        expect(renderer.panels.length).to.equal(3);
      });
    });

    describe("destroy", () => {
      it("should reset panels", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new VanillaRenderer().init(flicking);

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

        renderer.batchInsert({ index: 1, elements: [element] });
        await renderer.render();

        expect(element.previousElementSibling).to.equal(shouldBePrev.element);
        expect(element.nextElementSibling).to.equal(shouldBeNext.element);
      });

      it("should resize the new panels added", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = flicking.renderer;
        const elements = range(5).map(() => El.panel("100%").el);

        const returnVal = renderer.batchInsert({ index: 2, elements });

        expect(returnVal.every(panel => panel.size !== 0)).to.be.true;
      });
    });
  });
});
