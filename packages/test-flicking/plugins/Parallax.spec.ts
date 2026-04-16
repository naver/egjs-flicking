import Flicking from "@egjs/flicking";

import Parallax from "../../flicking-plugins/src/Parallax";
import { cleanup, createFlicking, sandbox } from "./utils";

describe("Parallax", () => {
  let flicking: Flicking;

  beforeEach(async () => {
    const wrapper = sandbox("flick");
    const viewportEl = document.createElement("div");
    viewportEl.style.width = "199px";
    viewportEl.className = "flicking-viewport";
    viewportEl.innerHTML = `
      <div class="flicking-camera">
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
      </div>
    `;
    wrapper.appendChild(viewportEl);
    flicking = await createFlicking(viewportEl);
  });

  afterEach(() => {
    cleanup();
    flicking.destroy();
  });

  it("should apply transform for visible panels", () => {
    // Given & When
    flicking.addPlugins(new Parallax());

    // Then
    const visiblePanels = flicking.visiblePanels;

    visiblePanels.forEach(panel => {
      expect(panel.element.style.transform).not.toBe("");
    });
  });

  it("should apply opacity to child elements if a selector is given", () => {
    // Given & When
    flicking.addPlugins(new Parallax("p"));

    // Then
    const visiblePanels = flicking.visiblePanels;
    visiblePanels.forEach(panel => {
      expect(panel.element.querySelector("p").style.transform).not.toBe("");
    });
  });

  it("should not set opacity for invisible panels", () => {
    // Given & When
    flicking.addPlugins(new Parallax());

    // Then
    expect(flicking.getPanel(1).element.style.transform).toBe("");
    expect(flicking.getPanel(2).element.style.transform).toBe("");
  });

  it("should be updated whenever flicking moves", () => {
    // Given
    flicking.addPlugins(new Parallax());

    // When
    void flicking.moveTo(1, 0);

    // Then
    expect(flicking.getPanel(1).element.style.transform).not.toBe("");
  });
});
