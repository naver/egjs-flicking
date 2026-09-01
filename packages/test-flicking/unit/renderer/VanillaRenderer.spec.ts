import VanillaElementProvider from "~/core/panel/provider/VanillaElementProvider";
import VirtualPanel from "~/core/panel/VirtualPanel";
import NormalRenderingStrategy from "~/renderer/strategy/NormalRenderingStrategy";
import VanillaRenderer from "~/renderer/VanillaRenderer";
import El from "../helper/El";
import { createFlicking, range } from "../helper/test-util";

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

        expect(prevPanels).toHaveLength(0);
        expect(renderer.panels.length).not.toBe(0);
        expect(renderer.panels.length).toBe(3);
      });

      it("should collect virtual panels when virtual mode is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
          panelsPerView: 1,
          virtual: {
            renderPanel: panel => `Panel ${panel.index}`,
            initialPanelCount: 100
          }
        });

        expect(flicking.virtualEnabled).toBe(true);
        expect(flicking.panels.every(panel => panel instanceof VirtualPanel)).toBe(true);
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

        expect(prevPanels.length).not.toBe(0);
        expect(renderer.panels).toHaveLength(0);
        expect(renderer.panelCount).toBe(0);
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

        expect(element.previousElementSibling).toBe(shouldBePrev.element);
        expect(element.nextElementSibling).toBe(shouldBeNext.element);
      });

      it("should resize the new panels added", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = flicking.renderer;
        const elements = range(5).map(() => El.panel("100%").el);

        const returnVal = renderer.batchInsert({ index: 2, elements, hasDOMInElements: true });

        expect(returnVal.every(panel => panel.size !== 0)).toBe(true);
      });
    });

    describe("render (useCSSOrder)", () => {
      it("should keep DOM order and inject CSS order matching the rendering order", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(5), {
          circular: true,
          useCSSOrder: true
        });

        const cameraChildren = [...flicking.camera.element.children];

        // DOM order stays identical to the original panel order
        expect(cameraChildren).toEqual(flicking.panels.map(panel => panel.element));

        // CSS `order` follows the visual rendering order instead
        flicking.renderer.strategy.getRenderingElementsByOrder(flicking).forEach((el, orderIndex) => {
          expect(el.style.order).toBe(`${orderIndex}`);
        });
      });

      it("should not throw when combined with renderOnlyVisible and keep only visible panels in DOM", async () => {
        // Previously threw a TypeError, as the rendered-only panel array was accessed with global panel indexes
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(5), {
          circular: true,
          useCSSOrder: true,
          renderOnlyVisible: true
        });

        const cameraChildren = [...flicking.camera.element.children];

        expect(cameraChildren.length).toBeGreaterThan(0);
        expect(cameraChildren.length).toBeLessThan(flicking.panelCount);

        // CSS `order` is injected only on the rendered panels, following the visual rendering order
        flicking.renderer.strategy.getRenderingElementsByOrder(flicking).forEach((el, orderIndex) => {
          expect(el.style.order).toBe(`${orderIndex}`);
        });
      });
    });
  });
});
