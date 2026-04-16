import Flicking from "@egjs/flicking";
import { vi } from "vitest";

import AutoPlay from "../../flicking-plugins/src/AutoPlay";

import { createFlicking, createFlickingFixture, sandbox, tick, wait } from "./utils";

describe("AutoPlay", () => {
  it("can receive older API of receiving duration and direction", () => {
    // Given & When
    const plugin = new AutoPlay({ duration: 500, direction: "PREV" });

    // Then
    expect(plugin.duration).toBe(500);
    expect(plugin.direction).toBe("PREV");
  });

  it("should call play after initializing", () => {
    // Given
    const plugin = new AutoPlay();
    const flicking = new Flicking(createFlickingFixture());
    const playSpy = vi.spyOn(plugin, "play");

    // When
    flicking.addPlugins(plugin);

    // Then
    expect(playSpy).toHaveBeenCalledOnce();
  });

  it("should not call play after initializing if stopOnInit is true", () => {
    // Given
    const plugin = new AutoPlay({ stopOnInit: true });
    const flicking = new Flicking(createFlickingFixture());
    const playSpy = vi.spyOn(plugin, "play");

    // When
    flicking.addPlugins(plugin);

    // Then
    expect(playSpy).not.toHaveBeenCalled();
    expect(plugin.playing).toBe(false);
  });

  it("should call Flicking's move method after duration", () => {
    // Given
    const plugin = new AutoPlay({ direction: "NEXT", duration: 500 });
    const flicking = new Flicking(createFlickingFixture());
    const nextStub = vi.spyOn(flicking, "next").mockResolvedValue(void 0);

    // When
    flicking.addPlugins(plugin);

    // Then
    expect(nextStub).not.toHaveBeenCalled();
    tick(500);
    expect(nextStub).toHaveBeenCalledOnce();
  });

  it("should apply animationDuration to animation when moving panel", () => {
    // Given
    const plugin = new AutoPlay({ direction: "NEXT", duration: 500, animationDuration: 200 });
    const flicking = new Flicking(createFlickingFixture());
    const nextSpy = vi.spyOn(flicking, "next");

    // When
    flicking.addPlugins(plugin);

    // Then
    expect(nextSpy).not.toHaveBeenCalled();
    tick(500);
    expect(nextSpy).toHaveBeenCalledOnce();
    expect(nextSpy).toHaveBeenNthCalledWith(1, 200);
  });

  it("can stop autoplay if stop is called before duration", () => {
    // Given
    const plugin = new AutoPlay({ direction: "NEXT", duration: 500 });
    const flicking = new Flicking(createFlickingFixture());
    const nextStub = vi.spyOn(flicking, "next").mockResolvedValue(void 0);

    // When
    flicking.addPlugins(plugin);

    // Then
    expect(nextStub).not.toHaveBeenCalled();
    tick(250);
    expect(nextStub).not.toHaveBeenCalled();
    plugin.stop();
    tick(500);
    expect(nextStub).not.toHaveBeenCalled();
  });

  it("should call stop if mouse is entered and stopOnHover is true", () => {
    // Given
    const plugin = new AutoPlay({ stopOnHover: true });
    const flicking = new Flicking(createFlickingFixture());
    const stopSpy = vi.fn();

    plugin.stop = stopSpy;

    // When
    flicking.addPlugins(plugin);
    const wrapper = flicking.element;

    // Then
    expect(stopSpy).toHaveBeenCalledOnce(); // removing previous one
    wrapper.dispatchEvent(new Event("mouseenter"));
    expect(stopSpy).toHaveBeenCalledTimes(2);
  });

  it("should call next after duration if mouse leaved and stopOnHover is true", () => {
    // Given
    const plugin = new AutoPlay({ stopOnHover: true });
    const flicking = new Flicking(createFlickingFixture());
    const nextStub = vi.spyOn(flicking, "next").mockResolvedValue(void 0);

    // When
    flicking.addPlugins(plugin);
    const wrapper = flicking.element;

    // Then
    expect(nextStub).not.toHaveBeenCalled();
    wrapper.dispatchEvent(new Event("mouseleave"));
    tick(2000);
    expect(nextStub).toHaveBeenCalledOnce();
    tick(2000);
    expect(nextStub).toHaveBeenCalledTimes(2);
  });

  it("should call next after delayAfterHover milliseconds when mouse leaved and stopOnHover is true", () => {
    // Given
    const plugin = new AutoPlay({
      direction: "NEXT",
      duration: 1000,
      stopOnHover: true,
      delayAfterHover: 500
    });
    const flicking = new Flicking(createFlickingFixture());
    const nextStub = vi.spyOn(flicking, "next").mockResolvedValue(void 0);

    // When
    flicking.addPlugins(plugin);
    const wrapper = flicking.element;

    // Then
    expect(nextStub).not.toHaveBeenCalled();
    tick(1200);
    expect(nextStub).toHaveBeenCalledOnce();
    wrapper.dispatchEvent(new Event("mouseenter"));
    tick(1200);
    expect(nextStub).toHaveBeenCalledOnce();
    wrapper.dispatchEvent(new Event("mouseleave"));
    tick(700);
    expect(nextStub).toHaveBeenCalledTimes(2);
  });

  it("should detach flicking event handlers when destroyed", () => {
    // Given
    const plugin = new AutoPlay({ stopOnHover: true });
    const flicking = new Flicking(createFlickingFixture());
    const playSpy = vi.fn();
    const stopSpy = vi.fn();

    plugin.play = playSpy;
    plugin.stop = stopSpy;

    // When
    flicking.addPlugins(plugin);
    plugin.destroy();
    playSpy.mockClear();
    stopSpy.mockClear();

    void flicking.next(500);
    tick(500);

    // Then
    expect(playSpy).not.toHaveBeenCalled();
    expect(stopSpy).not.toHaveBeenCalled();
  });

  it("won't call next if Flicking is already moving", () => {
    // Given
    const plugin = new AutoPlay({ duration: 500, stopOnHover: true });
    const flicking = new Flicking(createFlickingFixture());
    const nextStub = vi.spyOn(flicking, "next").mockResolvedValue(void 0);

    // When
    vi.spyOn(flicking, "animating", "get").mockReturnValue(true);

    flicking.addPlugins(plugin);
    tick(1000);

    // Then
    expect(nextStub).not.toHaveBeenCalled();
  });

  it("should apply the status of autoplay to playing property", () => {
    // Given
    const plugin = new AutoPlay({ stopOnHover: true });
    const flicking = new Flicking(createFlickingFixture());

    // When
    flicking.addPlugins(plugin);
    const wrapper = flicking.element;

    // Then
    expect(plugin.playing).toBe(true);
    wrapper.dispatchEvent(new Event("mouseenter"));
    expect(plugin.playing).toBe(false);
    wrapper.dispatchEvent(new Event("mouseleave"));
    expect(plugin.playing).toBe(true);
  });
  (["PREV", "NEXT"] as const).forEach(direction => {
    it(`should call resume ${direction} as much as the ratio-fixed duration when stop playing`, async () => {
      // Given
      const wrapper = sandbox("flick");
      const viewportEl = document.createElement("div");
      viewportEl.style.width = "199px";
      viewportEl.className = "flicking-viewport";
      viewportEl.innerHTML = `
      <div class="flicking-camera">
        <div class="flicking-panel-target" style="display: inline-block; width: 200px; height: 200px;"></div>
        <div style="display: inline-block; width: 200px; height: 200px;"></div>
        <div style="display: inline-block; width: 200px; height: 200px;"></div>
      </div>
    `;
      wrapper.appendChild(viewportEl);

      const plugin = new AutoPlay({
        stopOnHover: true,
        duration: 0,
        direction,
        animationDuration: 1000
      });
      const flicking = await createFlicking(viewportEl, {
        align: "prev",
        moveType: "freeScroll",
        circular: true,
        easing: x => x,
        duration: 1000
      });
      flicking.addPlugins(plugin);
      const flickingWrapper = flicking.element;

      await wait(500);
      const target = flickingWrapper.querySelector(".flicking-panel-target")!;

      // When
      target.dispatchEvent(
        new MouseEvent("mousedown", {
          buttons: 1,
          clientX: 0,
          clientY: 0,
          bubbles: true,
          cancelable: true
        })
      );

      // half (100) 0.5s
      const halfIndex = flicking.currentPanel.index;

      await wait(100);
      target.dispatchEvent(
        new MouseEvent("mouseup", {
          buttons: 1,
          clientX: 0,
          clientY: 0,
          bubbles: true,
          cancelable: true
        })
      );
      await wait(600);

      // half (200) 0.5s
      const nextIndex = flicking.currentPanel.index;

      // Then
      expect(halfIndex).toBe(0);
      if (direction === "PREV") {
        // 0 => 2 (-1)
        expect(nextIndex).toBe(2);
      } else {
        // 0 => 1
        expect(nextIndex).toBe(1);
      }
    });
  });
});
