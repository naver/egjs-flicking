import Flicking from "./DummyFlicking";
import Fixture from "./Fixture";

const panels = [0, 1, 2];

/**
 * ```html
 * <div id="test">
 *   <div class="flicking-wrapper">
 *     <!-- size: (1000, 300) -->
 *     <Flicking>
 *       <div class="panel">Panel 0</div>
 *       <div class="panel">Panel 1</div>
 *       <div class="panel">Panel 2</div>
 *     </Flicking>
 *   </div>
 * </div>
 * ```
 */
const Basic: Fixture = (options, events) => (
  <div id="test">
    <div className="flicking-wrapper">
      <Flicking options={options} events={events} style={{ width: "1000px", height: "300px" }}>
        { panels.map(panel => <div className="panel" key={panel} style={{ width: "1000px", height: "300px" }}>Panel {panel}</div>) }
      </Flicking>
    </div>
  </div>
);

export default Basic;
