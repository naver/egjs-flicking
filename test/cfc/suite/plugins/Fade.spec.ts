import { Fade } from "@egjs/flicking-plugins";

import { Horizontal } from "../../fixture";
import { render, cleanup } from "@common/renderer";

describe("Using Flicking with Plugins:Fade", () => {
  afterEach(() => {
    cleanup();
  });

  it("should add the plugin in active panels", async () => {
    const plugin = new Fade();
    const flicking = await render(Horizontal({ plugins: [plugin] }));

    expect(flicking.activePlugins[0]).toEqual(plugin);
  });
});
