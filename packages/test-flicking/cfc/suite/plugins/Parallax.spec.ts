import { Parallax } from "@egjs/flicking-plugins";

import { Horizontal } from "../../fixture";
import { render } from "@common/renderer";

describe("Plugins:Parallax", () => {
  it("should add the plugin in active panels", async () => {
    const plugin = new Parallax();
    const flicking = await render(Horizontal({ plugins: [plugin] }));

    expect(flicking.activePlugins[0]).toEqual(plugin);
  });

  it("should set the 'transform' style for panels", async () => {
    const flicking = await render(Horizontal({ plugins: [new Parallax()] }));

    // Actual values of opacity should be tested on the plugins repo
    expect(flicking.panels.every(panel => panel.element.style.transform != null)).toBeTruthy();
  });
});
