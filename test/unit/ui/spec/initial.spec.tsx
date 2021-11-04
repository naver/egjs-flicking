import { expect } from "chai";
import Flicking from "../../helper/DummyFlicking";
import type FixtureRenderer from "../../helper/FixtureRenderer";

declare global {
  const cfc: {
    it: (title: string, fn?: ({ renderer }: { renderer: FixtureRenderer }) => Promise<void>) => void;
  };
}

describe("Initial Rendering State", () => {
  const panels = [0, 1, 2];

  cfc.it("should render viewport & camera element", async ({ renderer }) => {
    const flicking = await renderer.render(
      <div id="test">
        <div className="flicking-wrapper">
          <Flicking options={{ circular: true, moveType: "freeScroll" }}>
            { panels.map(panel => <div className="panel" key={panel}>Panel {panel}</div>) }
          </Flicking>
        </div>
      </div>
    );

    console.log(
      document.querySelectorAll("#test").length,
      document.querySelectorAll(".flicking-wrapper").length,
      document.querySelectorAll(".flicking-viewport").length,
      document.querySelectorAll(".flicking-camera").length,
      document.querySelectorAll(".panel").length,
      flicking.panels.length,
      flicking.circular,
      flicking.moveType
    );

    expect(document.querySelectorAll("#test").length).to.equal(1);
    expect(document.querySelectorAll(".flicking-wrapper").length).to.equal(1);
    expect(document.querySelectorAll(".flicking-viewport").length).to.equal(1);
    expect(document.querySelectorAll(".flicking-camera").length).to.equal(1);
    expect(document.querySelectorAll(".panel").length).to.equal(3);
    expect(flicking.panels.length).to.equal(3);
    expect(flicking.circular).to.be.true;
    expect(flicking.moveType).to.equal("freeScroll");
  });
});
