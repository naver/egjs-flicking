import { ALIGN } from "~/const/external";
import Renderer from "~/renderer/Renderer";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";

import El from "../helper/El";
import { createFlicking, range } from "../helper/test-util";

class RendererImpl extends Renderer {
  public render() { return this; }
}

describe("Renderer", () => {
  describe("Properties", () => {
    it("has empty array as a default panels", () => {
      expect(new RendererImpl().panels).to.deep.equal([]);
    });

    it("has 0 as a default panelCount", () => {
      expect(new RendererImpl().panelCount).to.equal(0);
    });
  });

  describe("Options", () => {
    it(`has ${ALIGN.CENTER} as a default align value`, () => {
      expect(new RendererImpl().align).to.equal(ALIGN.CENTER);
    });

    it("should have the same align value in constructor", () => {
      expect(new RendererImpl({ align: ALIGN.NEXT }).align).equals(ALIGN.NEXT);
    });

    it("can be changed anytime", () => {
      const renderer = new RendererImpl({ align: ALIGN.PREV });

      renderer.align = "300px";

      expect(renderer.align).to.equal("300px");
    });
  });

  describe("Methods", () => {
    describe("init", () => {
      it("should create panels from camera elements on initialization", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl();

        const prevPanels = [...renderer.panels];

        renderer.init(flicking);

        expect(prevPanels).to.be.empty;
        expect(renderer.panels).not.to.be.empty;
        expect(renderer.panels.length).to.equal(3);
      });
    });

    describe("destroy", () => {
      it("should reset panels", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);

        const prevPanels = [...renderer.panels];

        renderer.destroy();

        expect(prevPanels).not.to.be.empty;
        expect(renderer.panels).to.be.empty;
        expect(renderer.panelCount).to.equal(0);
      });
    });

    describe("getPanel", () => {
      it("should return panel which has same index to given index", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);

        expect(renderer.getPanel(0).index).to.equal(0);
        expect(renderer.getPanel(1).index).to.equal(1);
        expect(renderer.getPanel(2).index).to.equal(2);
      });
    });

    describe("updatePanelSize", () => {
      it("should update panel sizes", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const prevSizes = renderer.panels.map(panel => panel.size);

        renderer.updatePanelSize();

        const newSizes = renderer.panels.map(panel => panel.size);

        expect(prevSizes.every(size => size === 0)).to.be.true;
        expect(newSizes.every(size => size !== 0)).to.be.true;
      });
    });

    describe("insert", () => {
      it("should insert new panels at given position", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const prevPanelCount = renderer.panelCount;
        const element = El.panel().el;

        renderer.insert(2, element);

        expect(renderer.panels.length).to.equal(prevPanelCount + 1);
        expect(renderer.panels[2].element).to.equal(element);
      });

      it("should return inserted panels as array", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const elements = range(5).map(() => El.panel().el);

        const returnVal = renderer.insert(2, elements);

        expect(returnVal.map(panel => panel.element)).to.deep.equal(elements);
      });

      it("should increase pushed panel's indexes", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const element = El.panel().el;
        const notPushed = renderer.panels[0];
        const shouldPushed = renderer.panels.slice(1);
        const prevIndexes = shouldPushed.map(panel => panel.index);

        renderer.insert(1, element);

        expect(shouldPushed.every((panel, idx) => panel.index === prevIndexes[idx] + 1)).to.be.true;
        // Panel 0 is not pushed
        expect(notPushed.index).to.equal(0);
      });

      it("should place inserted element to have correct siblings", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const element = El.panel().el;

        const shouldBePrev = renderer.panels[0];
        const shouldBeNext = renderer.panels[1];

        renderer.insert(1, element);

        expect(element.previousElementSibling).to.equal(shouldBePrev.element);
        expect(element.nextElementSibling).to.equal(shouldBeNext.element);
      });
    });
  });
});
