import { range } from "../../../src/utils";
import Flicking from "./DummyFlicking";
import Fixture from "./Fixture";

const panels = range(5);

/**
 * ```html
 * <!-- size: (1000, 300) -->
 * <Flicking>
 *   <!-- size: (300, 300) -->
 *   <div class="panel">Panel 0</div>
 *   <div class="panel">Panel 1</div>
 *   <div class="panel">Panel 2</div>
 *   <div class="panel">Panel 3</div>
 *   <div class="panel">Panel 4</div>
 * </Flicking>
 * ```
 */
const Horizontal: Fixture = ({ options, events, plugins } = {}) => (
  <Flicking options={options} events={events} plugins={plugins} style={{ width: "1000px", height: "300px" }}>
    { panels.map(panel => <div className="panel" key={panel} style={{ width: "300px", height: "300px" }}>Panel {panel}</div>) }
  </Flicking>
);

export default Horizontal;
