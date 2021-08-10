import { ALIGN, EVENTS } from "~/const/external";
import Panel, { PanelOptions } from "~/core/panel/Panel";
import ElementPanel from "~/core/panel/ElementPanel";
import Renderer from "~/renderer/Renderer";
import { getFlickingAttached, toArray } from "~/utils";

import El from "../helper/El";
import { createFlicking, range } from "../helper/test-util";

class RendererImpl extends Renderer {
  public async render() { return; }
  public async forceRenderAllPanels() { return; }

  public updateRenderingPanels() {
    this._updateRenderingPanels();
  }

  protected _collectPanels(): void {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const cameraElement = flicking.camera.element;

    // Remove all text nodes in the camera element
    cameraElement.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        cameraElement.removeChild(node);
      }
    });

    const align = this._getPanelAlign();
    const cameraChilds = toArray(cameraElement.children);

    this._panels = cameraChilds.map(
      (el: HTMLElement, index: number) => new ElementPanel({ flicking, el, index, align })
    );
  }

  protected _createPanel(el: any, options: PanelOptions): Panel { return new ElementPanel({ el, ...options }); }
  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null): void {}
  protected _removePanelElements(panels: Panel[]): void {}
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
    describe("getPanel", () => {
      it("should return panel which has same index to given index", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);

        expect(renderer.getPanel(0).index).to.equal(0);
        expect(renderer.getPanel(1).index).to.equal(1);
        expect(renderer.getPanel(2).index).to.equal(2);
      });
    });

    describe("updatePanelSize", () => {
      it("should update panel sizes", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const prevSizes = flicking.panels.map(panel => panel.size);

        flicking.panels.forEach(panel => {
          panel.setSize({ width: 9999 });
        });
        renderer.updatePanelSize();

        const newSizes = flicking.panels.map(panel => panel.size);

        expect(prevSizes.every(size => size !== 9999)).to.be.true;
        expect(newSizes.every(size => size === 9999)).to.be.true;
      });
    });

    describe("batchInsert", () => {
      it("should insert new panels at given position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const prevPanelCount = renderer.panelCount;
        const element = El.panel().el;

        renderer.batchInsert({ index: 2, elements: [element] });

        expect(renderer.panels.length).to.equal(prevPanelCount + 1);
        expect(renderer.panels[2].element).to.equal(element);
      });

      it("should return inserted panels as array", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const elements = range(5).map(() => El.panel().el);

        const returnVal = renderer.batchInsert({ index: 2, elements });

        expect(returnVal.map(panel => panel.element)).to.deep.equal(elements);
      });

      it("should increase pushed panel's indexes", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const element = El.panel().el;
        const notPushed = renderer.panels[0];
        const shouldPushed = renderer.panels.slice(1);
        const prevIndexes = shouldPushed.map(panel => panel.index);

        renderer.batchInsert({ index: 1, elements: [element] });

        expect(shouldPushed.every((panel, idx) => panel.index === prevIndexes[idx] + 1)).to.be.true;
        // Panel 0 is not pushed
        expect(notPushed.index).to.equal(0);
      });

      it("should trigger panelChange event with the panels added", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const element = El.panel().el;
        const panelChangeSpy = sinon.spy();

        flicking.on(EVENTS.PANEL_CHANGE, panelChangeSpy);
        renderer.batchInsert({ index: 1, elements: [element] });

        expect(panelChangeSpy.calledOnce).to.be.true;
        expect(panelChangeSpy.firstCall.args[0].added.length).to.equal(1);
        expect(panelChangeSpy.firstCall.args[0].added[0].element).to.equal(element);
        expect(panelChangeSpy.firstCall.args[0].removed.length).to.equal(0);
      });
    });

    describe("batchRemove", () => {
      it("should remove panels at the given index", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const prevPanels = [...renderer.panels];
        const prevPanelCount = renderer.panelCount;

        renderer.batchRemove({ index: 1, deleteCount: 2 });

        expect(renderer.panels.length).to.equal(prevPanelCount - 2);
        expect(renderer.panels[0]).to.equal(prevPanels[0]);
      });

      it("should return removed panels as array", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const prevPanels = [...renderer.panels];

        const returnVal = renderer.batchRemove({ index: 2, deleteCount: 1 });

        expect(returnVal.length).to.equal(1);
        expect(returnVal[0]).to.deep.equal(prevPanels[2]);
      });

      it("should decrease pulled panel's indexes", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const shouldPulled = renderer.panels[2];
        const prevIndex = shouldPulled.index;

        renderer.batchRemove({ index: 0, deleteCount: 2 });

        expect(prevIndex).to.equal(2);
        expect(shouldPulled.index).to.equal(0);
      });

      it("should trigger panelChange event with the panels removed", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const renderer = new RendererImpl().init(flicking);
        const prevPanels = [...renderer.panels];
        const panelChangeSpy = sinon.spy();

        flicking.on(EVENTS.PANEL_CHANGE, panelChangeSpy);
        renderer.batchRemove({ index: 1, deleteCount: 1 });

        expect(panelChangeSpy.calledOnce).to.be.true;
        expect(panelChangeSpy.firstCall.args[0].added.length).to.equal(0);
        expect(panelChangeSpy.firstCall.args[0].removed.length).to.equal(1);
        expect(panelChangeSpy.firstCall.args[0].removed[0]).to.deep.equal(prevPanels[1]);
      });
    });

    describe("updatePanelSize", () => {
      it("should call resize of every panels with no argument", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: -1 });
        const renderer = new RendererImpl().init(flicking);
        const resizeSpies = renderer.panels.map(panel => sinon.spy(panel, "resize"));

        renderer.updatePanelSize();

        expect(resizeSpies.every(spy => spy.calledOnceWith(undefined)));
      });

      it("should update panel sizes to match the panel sizes to match viewport size when panelsPerView is 1", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 1 });
        const renderer = new RendererImpl().init(flicking);
        const panels = flicking.panels;
        const viewportSize = flicking.camera.size;

        panels.forEach(panel => panel.element.style.width = "100px");
        renderer.updatePanelSize();

        expect(viewportSize).not.equal(100);
        expect(panels.every(panel => panel.size === viewportSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === `${viewportSize}px`)).to.be.true;
      });

      it("should set panel sizes to match the panel sizes to match viewport size when panelsPerView is 1 and margin is applied to the panels", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 1 });
        const renderer = new RendererImpl().init(flicking);
        const panels = flicking.panels;
        const viewportSize = flicking.camera.size;

        panels.forEach(panel => panel.element.style.width = "100px");
        panels.forEach(panel => panel.element.style.marginLeft = "15px");
        panels.forEach(panel => panel.element.style.marginRight = "15px");
        renderer.updatePanelSize();

        expect(viewportSize).not.equal(100);
        expect(panels.every(panel => panel.size === viewportSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === `${viewportSize}px`)).to.be.true;
      });

      it("should update panel sizes to match the panel sizes to match 'viewport size / panelsPerView'", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 4 });
        const renderer = new RendererImpl().init(flicking);
        const panels = flicking.panels;
        const expectedSize = flicking.camera.size / 4;

        panels.forEach(panel => panel.element.style.width = "100px");
        renderer.updatePanelSize();

        expect(expectedSize).not.equal(100);
        expect(panels.every(panel => panel.size === expectedSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === `${expectedSize}px`)).to.be.true;
      });

      it("should update panel sizes to match the panel sizes to match '(viewport size - first panel's margin sum * (panelsPerSize - 1)) / panelsPerView'", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 4 });
        const renderer = new RendererImpl().init(flicking);
        const panels = flicking.panels;
        const firstPanel = panels[0];
        // (viewport size - first panel's margin sum * (panelsPerSize - 1)) / panelsPerView
        const expectedSize = (flicking.camera.size - 20 * 3) / 4;

        panels.forEach(panel => panel.element.style.width = "100px");
        firstPanel.element.style.marginLeft = "15px";
        firstPanel.element.style.marginRight = "5px";
        renderer.updatePanelSize();

        expect(expectedSize).not.equal(100);
        expect(panels.every(panel => panel.size === expectedSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === `${expectedSize}px`)).to.be.true;
      });

      it("should not update panel CSS if noPanelStyleOverride is true", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { panelsPerView: 1, noPanelStyleOverride: true });
        const renderer = new RendererImpl().init(flicking);
        const panels = flicking.panels;
        const viewportSize = flicking.camera.size;

        panels.forEach(panel => panel.element.style.width = "100px");
        renderer.updatePanelSize();

        expect(viewportSize).not.equal(100);
        expect(panels.every(panel => panel.size === viewportSize)).to.be.true;
        expect(panels.every(panel => panel.element.style.width === "100px")).to.be.true;
      });
    });
  });

  describe("updateRenderingPanels", () => {
    it("should always make all panels visible if renderOnlyVisible is false", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { renderOnlyVisible: false });
      const renderer = new RendererImpl().init(flicking);

      flicking.panels.forEach(panel => panel.markForHide());
      renderer.updateRenderingPanels();

      expect(flicking.panels.every(panel => panel.rendered)).to.be.true;
    });

    it("should make only visible panels to be visible if renderOnlyVisible is true", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { renderOnlyVisible: true });
      const renderer = new RendererImpl().init(flicking);

      flicking.panels.forEach(panel => panel.markForHide());
      renderer.updateRenderingPanels();

      const nonVisible = flicking.panels.filter(panel => !flicking.visiblePanels.includes(panel));
      expect(nonVisible.length).to.be.greaterThan(0);
      expect(flicking.visiblePanels.every(panel => panel.rendered)).to.be.true;
      expect(nonVisible.every(panel => !panel.rendered)).to.be.true;
    });
  });
});
