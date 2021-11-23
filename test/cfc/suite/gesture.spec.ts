import Wrapped from "../fixture/Wrapped";
import { render } from "@common/renderer";
import simulate from "../common/simulate";
import { waitEvent } from "../common/utils";

describe("Gestures", () => {
  it("should trigger select event with mouse click", async () => {
    const selectSpy = jest.fn();
    const holdStartSpy = jest.fn();
    const holdEndSpy = jest.fn();

    const flicking = await render(Wrapped({
      events: {
        holdStart: holdStartSpy,
        holdEnd: holdEndSpy,
        select: selectSpy
      }
    }));

    void simulate(flicking, { deltaX: 0, deltaY: 0 });

    await waitEvent(flicking, "select");

    expect(holdStartSpy).toHaveBeenCalledTimes(1);
    expect(holdEndSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledTimes(1);
  });

  it("should move to the next panel when moving above threshold", async () => {
    const flicking = await render(Wrapped({ options: { threshold: 40 } }));

    const prevIndex = flicking.index;
    void simulate(flicking, { deltaX: -50, deltaY: 0, duration: 3000 });

    await waitEvent(flicking, "changed");

    const newIndex = flicking.index;

    expect(prevIndex).toEqual(0);
    expect(newIndex).toEqual(1);
  });

  it("should return to the previous panel when moving below threshold", async () => {
    const flicking = await render(Wrapped({ options: { threshold: 40 } }));

    const prevIndex = flicking.index;
    void simulate(flicking, { deltaX: -30, deltaY: 0, duration: 3000 });

    await waitEvent(flicking, "restored");

    const newIndex = flicking.index;

    expect(prevIndex).toEqual(0);
    expect(newIndex).toEqual(0);
  });
});
