import { cfc } from "../preprocess/cfc";
import Flicking from "../helper/DummyFlicking";

cfc.describe("Initial Rendering State", () => {
  const panels = [0, 1, 2];

  cfc.it(
    "should render viewport & camera element",
    <div id="test">
      <div className="flicking-wrapper">
        <Flicking options={{ circular: true }}>
          { panels.map(panel => <div className="panel" key={panel}>Panel {panel}</div>) }
        </Flicking>
      </div>
    </div>,
    async ({ flicking }) => {
      expect(document.querySelectorAll("#test").length).to.equal(1);
      expect(document.querySelectorAll(".flicking-wrapper").length).to.equal(1);
      expect(document.querySelectorAll(".flicking-viewport").length).to.equal(1);
      expect(document.querySelectorAll(".flicking-camera").length).to.equal(1);
      expect(document.querySelectorAll(".panel").length).to.equal(3);
      expect(flicking.panels.length).to.equal(3);
    }
  );
});
