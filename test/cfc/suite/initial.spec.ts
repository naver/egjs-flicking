import Basic from "../fixture/Basic";
import { render } from "@common/renderer";

describe("Initial Rendering State", () => {
  it("should render viewport & camera element", async () => {
    const flicking = await render(Basic);

    expect(document.querySelectorAll("#test").length).toEqual(1);
    expect(document.querySelectorAll(".flicking-wrapper").length).toEqual(1);
    expect(document.querySelectorAll(".flicking-viewport").length).toEqual(1);
    expect(document.querySelectorAll(".flicking-camera").length).toEqual(1);
    expect(document.querySelectorAll(".panel").length).toEqual(3);
    expect(flicking.panels.length).toEqual(3);
    expect(flicking.circular).toBeTruthy();
    expect(flicking.moveType).toEqual("freeScroll");
  });
});
