import Flicking from "@egjs/flicking";

import Fade from "../../flicking-plugins/src/Fade";
import { cleanup, createFlicking, sandbox } from "./utils";

describe("Fade", () => {
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

  it("should set opacity to 1 for current panel", () => {
    // Given & When
    flicking.addPlugins(new Fade());

    // Then
    expect(flicking.currentPanel.element.style.opacity).toBe("1");
  });

  it("should apply opacity to child elements if a selector is given", () => {
    // Given & When
    flicking.addPlugins(new Fade("p"));

    // Then
    const currentPanelEl = flicking.currentPanel.element;

    expect(currentPanelEl.style.opacity).toBe("");
    expect(currentPanelEl.querySelector("p").style.opacity).toBe("1");
  });

  it("should not set opacity for invisible panels", () => {
    // Given & When
    flicking.addPlugins(new Fade());

    // Then
    expect(flicking.getPanel(1).element.style.opacity).toBe("");
    expect(flicking.getPanel(2).element.style.opacity).toBe("");
  });

  it("should be updated whenever flicking moves", () => {
    // Given
    flicking.addPlugins(new Fade());

    // When
    void flicking.moveTo(1, 0);

    // Then
    expect(flicking.getPanel(1).element.style.opacity).toBe("1");
  });
});
