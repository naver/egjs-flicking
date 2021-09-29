import VirtualManager from "~/renderer/VirtualManager";

import El from "../helper/El";
import { createFlicking } from "../helper/test-util";

describe("VirtualManager", () => {
  describe("Options", () => {
    describe("renderPanel", () => {
      it("should set visible panel element's innerHTML by its result", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
          panelsPerView: 1,
          virtual: {
            renderPanel: panel => `Panel ${panel.index}`,
            initialPanelCount: 100
          }
        });

        expect(flicking.visiblePanels.length).not.to.equal(0);
        expect(flicking.visiblePanels.every(panel => panel.element.innerHTML === `Panel ${panel.index}`)).to.be.true;
      });
    });

    describe("initialPanelCount", () => {
      it("should create the same number of panels as it", async () => {
        const panelCount = 1234;
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
          panelsPerView: 1,
          virtual: {
            renderPanel: panel => `Panel ${panel.index}`,
            initialPanelCount: panelCount
          }
        });

        expect(flicking.panels.length).to.equal(panelCount);
      });
    });

    describe("panelClass", () => {
      it("should add `panelClass` to the collected elements", async () => {
        const expectedClass = "SOME_PANEL_CLASS_NAME";
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
          panelsPerView: 1,
          virtual: {
            renderPanel: panel => `Panel ${panel.index}`,
            initialPanelCount: 100,
            panelClass: expectedClass
          }
        });
        const virtual = flicking.virtual;

        expect(virtual.elements.every(virtualEl => virtualEl.element.classList.contains(expectedClass))).to.be.true;
      });
    });

    describe("cache", () => {
      it("should use panel's cached innerHTML instead of calling it again", async () => {
        const renderStub = sinon.stub();
        renderStub.returns("SOME_INNERHTML");
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
          panelsPerView: 1,
          virtual: {
            renderPanel: renderStub,
            initialPanelCount: 100,
            cache: true
          }
        });
        const renderer = flicking.renderer;
        const prevRenderCallCount = renderStub.callCount;

        // Render again
        await renderer.forceRenderAllPanels();
        await renderer.render();

        expect(renderStub.callCount).to.equal(prevRenderCallCount);
      });
    });
  });

  describe("Methods", () => {
    describe("render", () => {
      it("should set invisible panel's display to none", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
          panelsPerView: 1,
          virtual: {
            renderPanel: panel => `Panel ${panel.index}`,
            initialPanelCount: 100
          }
        });
        const renderer = flicking.renderer;

        await renderer.render();

        const visibles = flicking.visiblePanels;
        const invisibles = flicking.virtual.elements.filter(virtualEl => visibles.every(visible => visible.element !== virtualEl.element));

        expect(visibles).not.to.be.empty;
        expect(visibles.every(visible => visible.element.style.display !== "none"));
        expect(invisibles.every(invisible => invisible.element.style.display === "none"));
      });
    });
  });

  describe("append", () => {
    it("should create panels by count of it", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
        panelsPerView: 1,
        virtual: {
          renderPanel: panel => `Panel ${panel.index}`,
          initialPanelCount: 100
        }
      });
      const renderer = flicking.virtual;

      renderer.append(100);

      expect(flicking.panels.length).to.equal(200);
    });

    it("should not increase previous panel's indexes", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
        panelsPerView: 1,
        virtual: {
          renderPanel: panel => `Panel ${panel.index}`,
          initialPanelCount: 100
        }
      });
      const prevPanels = [...flicking.panels];
      const renderer = flicking.virtual;

      renderer.append(100);

      expect(prevPanels.every((panel, index) => panel.index === index)).to.be.true;
    });
  });

  describe("prepend", () => {
    it("should create panels by count of it", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
        panelsPerView: 1,
        virtual: {
          renderPanel: panel => `Panel ${panel.index}`,
          initialPanelCount: 100
        }
      });
      const renderer = flicking.virtual;

      renderer.prepend(100);

      expect(flicking.panels.length).to.equal(200);
    });

    it("should increase previous panel's indexes", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
        panelsPerView: 1,
        virtual: {
          renderPanel: panel => `Panel ${panel.index}`,
          initialPanelCount: 100
        }
      });
      const prevPanels = [...flicking.panels];
      const renderer = flicking.virtual;

      renderer.prepend(100);

      expect(prevPanels.every((panel, index) => panel.index === index + 100)).to.be.true;
    });
  });

  describe("insert", () => {
    it("should create panels by count of it", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
        panelsPerView: 1,
        virtual: {
          renderPanel: panel => `Panel ${panel.index}`,
          initialPanelCount: 100
        }
      });
      const renderer = flicking.virtual;

      renderer.prepend(100);

      expect(flicking.panels.length).to.equal(200);
    });

    it("should not increase panel's indexes before it, but only the panels after it", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
        panelsPerView: 1,
        virtual: {
          renderPanel: panel => `Panel ${panel.index}`,
          initialPanelCount: 100
        }
      });
      const prevPanels = [...flicking.panels];
      const renderer = flicking.virtual;

      renderer.insert(50, 100);

      expect(prevPanels.slice(0, 50).every((panel, index) => panel.index === index)).to.be.true;
      expect(prevPanels.slice(50).every((panel, index) => panel.index === index + 50 + 100)).to.be.true;
    });
  });

  describe("remove", () => {
    it("should remove panels by count of it", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
        panelsPerView: 1,
        virtual: {
          renderPanel: panel => `Panel ${panel.index}`,
          initialPanelCount: 100
        }
      });
      const renderer = flicking.virtual;

      renderer.remove(0, 50);

      expect(flicking.panels.length).to.equal(50);
    });

    it("should not decrease panel's indexes before it, but only the panels after it", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL_WITH_PANELS(0), {
        panelsPerView: 1,
        virtual: {
          renderPanel: panel => `Panel ${panel.index}`,
          initialPanelCount: 100
        }
      });
      const prevPanels = [...flicking.panels];
      const renderer = flicking.virtual;

      renderer.remove(50, 1);

      expect(prevPanels.slice(0, 50).every((panel, index) => panel.index === index)).to.be.true;
      expect(prevPanels.slice(51).every((panel, index) => panel.index === index + 51 - 1)).to.be.true;
    });
  });
});
