import Flicking from "./DummyFlicking";

const panels = [0, 1, 2];

export default <div id="test">
  <div className="flicking-wrapper">
    <Flicking options={{ circular: true, moveType: "freeScroll" }}>
      { panels.map(panel => <div className="panel" key={panel}>Panel {panel}</div>) }
    </Flicking>
  </div>
</div>;
