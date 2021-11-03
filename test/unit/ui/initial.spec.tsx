import { cfc } from "../helper/test-util";
import Flicking from "../helper/DummyFlicking";

describe.only("Initial Rendering State", () => {
  cfc.it("should render viewport & camera element", async ({ renderer }) => {
    const panels = [0, 1, 2];
    const flicking = await renderer.render(
      <div id="test">
        <div className="flicking-wrapper">
          <Flicking options={{ circular: true }}>
            { panels.map(panel => <div className="panel" key={panel}>Panel {panel}</div>) }
          </Flicking>
        </div>
      </div>
    );

    expect(document.querySelectorAll("#test").length).to.equal(1);
    expect(document.querySelectorAll(".flicking-wrapper").length).to.equal(1);
    expect(document.querySelectorAll(".flicking-viewport").length).to.equal(1);
    expect(document.querySelectorAll(".flicking-camera").length).to.equal(1);
    expect(document.querySelectorAll(".panel").length).to.equal(3);
    expect(flicking.panels.length).to.equal(3);
  });
});
