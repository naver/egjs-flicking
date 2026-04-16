import { render } from "@common/renderer";
import { AutoPlay } from "@egjs/flicking-plugins";
import { tick } from "../../../shared/utils";
import { Horizontal } from "../../fixture";

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

    tick(1900);

    expect(flicking.animating).toBeFalsy();

    tick(100);

    expect(flicking.animating).toBeTruthy();
  });
});
