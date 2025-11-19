import Wrapped from "../fixture/Wrapped";
import { render } from "@common/renderer";

describe("Rendering", () => {
  it("should render viewport & camera element", async () => {
    await render(Wrapped());

    expect(document.querySelectorAll("#test").length).toEqual(1);
    expect(document.querySelectorAll(".flicking-wrapper").length).toEqual(1);
    expect(document.querySelectorAll(".flicking-viewport").length).toEqual(1);
    expect(document.querySelectorAll(".flicking-camera").length).toEqual(1);
  });

  it("should render panel elements inside it", async () => {
    const flicking = await render(Wrapped());

    expect(document.querySelectorAll(".panel").length).toEqual(3);
    expect(flicking.panels.length).toEqual(3);
  });

  it("should have options defined in it", async () => {
    const flicking = await render(Wrapped({ options: { circular: true, moveType: "freeScroll" } }));

    expect(flicking.circular).toBeTruthy();
    expect(flicking.moveType).toEqual("freeScroll");
  });

  it("should have correct size", async () => {
    const flicking = await render(Wrapped());

    expect(flicking.viewport.width).toEqual(1000);
    expect(flicking.viewport.height).toEqual(300);
    expect(flicking.panels.every(panel => panel.size === 1000 && panel.height === 300)).toBeTruthy();
  });

  describe("rendering with renderOnlyVisible", () => {
    it("should set panel elements reference to the elements that currently rendered", async () => {
      const flicking = await render(Wrapped({ options: { renderOnlyVisible: true } }));
      const visiblePanelEls = flicking.visiblePanels.map(panel => panel.element);

      expect(visiblePanelEls.length).toBeGreaterThan(0);

      visiblePanelEls.forEach(el => {
        expect(el.parentElement).not.toBeNull();
        expect(document.body.contains(el)).toBeTruthy();
      });
    });
  });
});
