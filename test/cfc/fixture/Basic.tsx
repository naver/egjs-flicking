import { FlickingOptions } from "@egjs/flicking";
import Flicking from "./DummyFlicking";

const panels = [0, 1, 2];

export default (options: Partial<FlickingOptions> = {}) => <div id="test">
  <div className="flicking-wrapper">
    <Flicking options={options}>
      { panels.map(panel => <div className="panel" key={panel}>Panel {panel}</div>) }
    </Flicking>
  </div>
</div>;
