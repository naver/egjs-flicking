import Flicking from "./DummyFlicking";
import Fixture from "./Fixture";

const panels = [0, 1, 2];

const Basic: Fixture = (options, events) => (
  <div id="test">
    <div className="flicking-wrapper">
      <Flicking options={options} events={events}>
        { panels.map(panel => <div className="panel" key={panel}>Panel {panel}</div>) }
      </Flicking>
    </div>
  </div>
);

export default Basic;
