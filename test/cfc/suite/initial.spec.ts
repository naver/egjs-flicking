import Basic from "../fixture/Basic";
import { render, cleanup } from "@common/renderer";
import simulate from "../common/simulate";
import { waitEvent } from "../common/utils";

describe("Initial Rendering State", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render viewport & camera element", async () => {
    await render(Basic());

    expect(document.querySelectorAll("#test").length).toEqual(1);
    expect(document.querySelectorAll(".flicking-wrapper").length).toEqual(1);
    expect(document.querySelectorAll(".flicking-viewport").length).toEqual(1);
    expect(document.querySelectorAll(".flicking-camera").length).toEqual(1);
  });

  it("should render panel elements inside it", async () => {
    const flicking = await render(Basic());

    expect(document.querySelectorAll(".panel").length).toEqual(3);
    expect(flicking.panels.length).toEqual(3);
  });

  it("should have options defined in it", async () => {
    const flicking = await render(Basic({ circular: true, moveType: "freeScroll" }));

    expect(flicking.circular).toBeTruthy();
    expect(flicking.moveType).toEqual("freeScroll");
  });

  it("should have correct size", async () => {
    const flicking = await render(Basic());

    expect(flicking.viewport.width).toEqual(1000);
    expect(flicking.viewport.height).toEqual(300);
    expect(flicking.panels.every(panel => panel.size === 1000 && panel.height === 300)).toBeTruthy();
  });

  it("should trigger select event with mouse click", async () => {
    const selectSpy = jest.fn();
    const holdStartSpy = jest.fn();
    const holdEndSpy = jest.fn();

    const flicking = await render(Basic({}, {
      holdStart: holdStartSpy,
      holdEnd: holdEndSpy,
      select: selectSpy
    }));

    simulate(flicking, { deltaX: 0, deltaY: 0 });

    await waitEvent(flicking, "select");

    expect(holdStartSpy).toHaveBeenCalledTimes(1);
    expect(holdEndSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledTimes(1);
  });

  it("should move to the next panel when moving above threshold", async () => {
    const flicking = await render(Basic({ threshold: 40 }));

    const prevIndex = flicking.index;
    simulate(flicking, { deltaX: -50, deltaY: 0, duration: 3000 });

    void waitEvent(flicking, "changed")
      .then(() => {
        const newIndex = flicking.index;

        expect(prevIndex).toEqual(0);
        expect(newIndex).toEqual(1);
      });
  });
});
