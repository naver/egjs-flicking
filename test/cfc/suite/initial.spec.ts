import Basic from "../fixture/Basic";
import { render, cleanup } from "@common/renderer";

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
});
