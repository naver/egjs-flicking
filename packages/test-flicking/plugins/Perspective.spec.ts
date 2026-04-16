import Flicking from "@egjs/flicking";

import Perspective from "../../flicking-plugins/src/Perspective";
import { cleanup, createFlicking, sandbox } from "./utils";

describe("Perspective", () => {
  let flicking: Flicking;

  beforeEach(async () => {
    const wrapper = sandbox("flick");
    wrapper.style.width = "199px";
    wrapper.classList.add("flicking-viewport");
    wrapper.innerHTML = `
      <div class="flicking-camera">
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
      </div>
    `;
    flicking = await createFlicking(wrapper);
  });

  afterEach(() => {
    cleanup();
    flicking.destroy();
  });

  it("should set transform to default for current panel", () => {
    // Given & When
    flicking.addPlugins(new Perspective());

    // Then
    expect(flicking.currentPanel.element.style.transform).toBe(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    );
  });

  it("should set transform to default that except perspective for current panel when allocated other arguments", () => {
    // Given & When
    flicking.addPlugins(new Perspective({ perspective: 500, rotate: 0.5, scale: 0.5 }));

    // Then
    expect(flicking.currentPanel.element.style.transform).toBe(
      "perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)"
    );
  });

  it("should apply transform to child elements if a selector is given", () => {
    // Given & When
    flicking.addPlugins(new Perspective({ selector: "p" }));

    // Then
    const currentPanelEl = flicking.currentPanel.element;

    expect(currentPanelEl.style.transform).toBe("");
    expect(currentPanelEl.querySelector("p").style.transform).toBe(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    );
  });

  it("should not set transform for invisible panels", () => {
    // Given & When
    flicking.addPlugins(new Perspective());

    // Then
    expect(flicking.getPanel(1).element.style.transform).toBe("");
    expect(flicking.getPanel(2).element.style.transform).toBe("");
  });

  it("should be updated whenever flicking moves", () => {
    // Given
    flicking.addPlugins(new Perspective());

    // When
    void flicking.moveTo(1, 0);

    // Then
    expect(flicking.getPanel(1).element.style.transform).toBe(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    );
  });
});
