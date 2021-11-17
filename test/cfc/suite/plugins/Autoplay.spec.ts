import { AutoPlay } from "@egjs/flicking-plugins";

import { Horizontal } from "../../fixture";
import { render } from "@common/renderer";
import { wait } from "../../common/utils";

describe("Plugins:AutoPlay", () => {
  it("should add the plugin in active panels", async () => {
    const plugin = new AutoPlay();
    const flicking = await render(Horizontal({ plugins: [plugin] }));

    expect(flicking.activePlugins[0]).toEqual(plugin);
  });

  it("should call flicking's next after the given duration", async () => {
    const plugin = new AutoPlay({ duration: 2000 });
    const flicking = await render(Horizontal({ plugins: [plugin] }));

    expect(flicking.animating).toBeFalsy();

    await wait(1900);

    expect(flicking.animating).toBeFalsy();

    void wait(100).then(() => {
      expect(flicking.animating).toBeTruthy();
    });
  });
});
