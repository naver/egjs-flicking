import { render } from "@common/renderer";
import { vi } from "vitest";
import { simulate } from "../../shared/simulate";
import Wrapped from "../fixture/Wrapped";

describe("Gestures", () => {
  it("should trigger select event with mouse click", async () => {
    const selectSpy = vi.fn();
    const holdStartSpy = vi.fn();
    const holdEndSpy = vi.fn();

    const flicking = await render(
      Wrapped({
        events: {
          holdStart: holdStartSpy,
          holdEnd: holdEndSpy,
          select: selectSpy
        }
      })
    );

    await simulate(flicking.panels[0].element, { deltaX: 0, deltaY: 0 });

    expect(holdStartSpy).toHaveBeenCalledTimes(1);
    expect(holdEndSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledTimes(1);
  });

  it("should move to the next panel when moving above threshold", async () => {
    const flicking = await render(Wrapped({ options: { threshold: 40 } }));

    const prevIndex = flicking.index;
    await simulate(flicking.panels[0].element, { deltaX: -50, deltaY: 0, duration: 3000 });

    const newIndex = flicking.index;

    expect(prevIndex).toEqual(0);
    expect(newIndex).toEqual(1);
  });

  it("should return to the previous panel when moving below threshold", async () => {
    const flicking = await render(Wrapped({ options: { threshold: 40 } }));

    const prevIndex = flicking.index;
    await simulate(flicking.panels[0].element, { deltaX: -30, deltaY: 0, duration: 3000 });

    const newIndex = flicking.index;

    expect(prevIndex).toEqual(0);
    expect(newIndex).toEqual(0);
  });
});
