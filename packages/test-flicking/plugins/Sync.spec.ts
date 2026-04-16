import Flicking from "@egjs/flicking";

import Sync from "../../flicking-plugins/src/Sync";
import { cleanup, createFlicking, sandbox, simulate, tick } from "./utils";

describe("Sync", () => {
  let flicking0: Flicking;
  let flicking1: Flicking;

  beforeEach(async () => {
    const wrapper0 = sandbox("flick0");
    const viewportEl0 = document.createElement("div");
    viewportEl0.style.width = "199px";
    viewportEl0.className = "flicking-viewport";
    viewportEl0.innerHTML = `
      <div class="flicking-camera">
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
      </div>
    `;
    wrapper0.appendChild(viewportEl0);
    flicking0 = await createFlicking(viewportEl0);

    const wrapper1 = sandbox("flick1");
    const viewportEl1 = document.createElement("div");
    viewportEl1.style.width = "199px";
    viewportEl1.className = "flicking-viewport";
    viewportEl1.innerHTML = `
      <div class="flicking-camera">
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
        <div style="width: 200px; height: 200px;"><p></p></div>
      </div>
    `;
    wrapper1.appendChild(viewportEl1);
    flicking1 = await createFlicking(viewportEl1);
  });

  afterEach(() => {
    cleanup();
    flicking0.destroy();
    flicking1.destroy();
  });

  it("main flicking should move with other flickings", () => {
    // Given
    flicking0.addPlugins(
      new Sync({
        type: "camera",
        synchronizedFlickingOptions: [
          {
            flicking: flicking0
          },
          {
            flicking: flicking1
          }
        ]
      })
    );

    // When
    void flicking0.control.moveToPosition(500, 0);

    // Then
    expect(flicking1.camera.position).toBe(1100);
    expect(flicking1.camera.position).not.toBe(100);
  });

  it("other flickings should move main flicking", () => {
    // Given
    flicking0.addPlugins(
      new Sync({
        type: "camera",
        synchronizedFlickingOptions: [
          {
            flicking: flicking0
          },
          {
            flicking: flicking1
          }
        ]
      })
    );

    // When
    void flicking1.control.moveToPosition(1100, 0);

    // Then
    expect(flicking0.camera.position).toBe(500);
    expect(flicking0.camera.position).not.toBe(100);
  });

  it("active panel should have active class", () => {
    // Given
    flicking0.addPlugins(
      new Sync({
        type: "index",
        synchronizedFlickingOptions: [
          {
            flicking: flicking0,
            isSlidable: true
          },
          {
            flicking: flicking1,
            activeClass: "flicking-thumbnail-active"
          }
        ]
      })
    );

    // When
    void flicking0.moveTo(1, 0);
    tick(1000);

    // Then
    flicking1.panels.forEach((panel, index) => {
      expect(panel.element.classList.contains("flicking-thumbnail-active")).toBe(index === 1);
    });
  });

  it("slidable flicking should move other flickings", () => {
    // Given
    flicking0.addPlugins(
      new Sync({
        type: "index",
        synchronizedFlickingOptions: [
          {
            flicking: flicking0,
            isSlidable: true
          },
          {
            flicking: flicking1
          }
        ]
      })
    );

    // When
    void flicking0.moveTo(2, 0);
    tick(1000);

    // Then
    expect(flicking1.index).toBe(2);
    expect(flicking1.camera.position).toBe(flicking1.panels[2].position);
  });

  it("clickable flicking should move other flickings", async () => {
    // Given
    flicking0.addPlugins(
      new Sync({
        type: "index",
        synchronizedFlickingOptions: [
          {
            flicking: flicking0,
            isClickable: true
          },
          {
            flicking: flicking1
          }
        ]
      })
    );

    // When
    await simulate(flicking0.panels[2].element, { deltaX: 0, deltaY: 0 });
    tick(10000);

    // Then
    expect(flicking1.index).toBe(2);
    expect(flicking1.camera.position).toBe(flicking1.panels[2].position);
  });

  [true, false].forEach(enabled => {
    it(`should check and recover enabled status of flickings (enabled: ${enabled})`, () => {
      // Given
      flicking0.addPlugins(
        new Sync({
          type: "camera",
          synchronizedFlickingOptions: [
            {
              flicking: flicking0
            },
            {
              flicking: flicking1
            }
          ]
        })
      );

      if (!enabled) {
        flicking1.disableInput();
      }

      // When
      void flicking0.control.moveToPosition(500, 0);

      // Then
      expect(flicking1.camera.position).toBe(1100);
      expect(flicking1.control.controller.enabled).toBe(enabled);
    });
  });
});
