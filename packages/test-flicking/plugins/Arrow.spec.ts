import Flicking from "@egjs/flicking";
import { vi } from "vitest";
import Arrow from "../../flicking-plugins/src/Arrow";

import { cleanup, createArrowFixture } from "./utils";

describe("Arrow", () => {
  afterEach(() => {
    cleanup();
  });

  it("should add touch start listener with passive: true", async () => {
    // Given
    const flicking = new Flicking(createArrowFixture(), { autoInit: false });
    const plugin = new Arrow();

    // When
    const prevArrow = flicking.element.querySelector(".flicking-arrow-prev");
    const nextArrow = flicking.element.querySelector(".flicking-arrow-next");
    const prevEventsSpy = vi.spyOn(prevArrow, "addEventListener");
    const nextEventsSpy = vi.spyOn(nextArrow, "addEventListener");

    flicking.addPlugins(plugin);
    await flicking.init();

    // Then
    const prevTouchCalls = prevEventsSpy.mock.calls.filter(([type]) => type === "touchstart");
    const nextTouchCalls = nextEventsSpy.mock.calls.filter(([type]) => type === "touchstart");

    expect(prevTouchCalls.length).toBeGreaterThan(0);
    expect(nextTouchCalls.length).toBeGreaterThan(0);
    expect(
      prevTouchCalls.every(([type, _, options]) => {
        return type === "touchstart" && options && (options as AddEventListenerOptions).passive;
      })
    ).toBe(true);
    expect(
      nextTouchCalls.every(([type, _, options]) => {
        return type === "touchstart" && options && (options as AddEventListenerOptions).passive;
      })
    ).toBe(true);
  });
});
