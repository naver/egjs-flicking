import * as React from 'react';
import Flicking from "./react-flicking";

export default class App extends React.Component<{horizontal?: boolean}> {
  public flick: Flicking;
  public render() {
    return <div className="flick_demo">
    <Flicking id="mflick1" {...this.props} className="flick" ref={e => { this.flick = e; }}>
      <div style={{ backgroundColor: "#CC66CC" }}>
        <p>panel 0</p>
      </div>
      <div style={{ backgroundColor: "#66cccc" }}>
        <p>panel 1</p>
      </div>
      <div style={{ backgroundColor: "#ffc000" }}>
        <p>panel 2</p>
      </div>
    </Flicking>
    <button className="f_btn f_left" onClick={() => this.flick.prev()} >&lt;</button>
    <button className="f_btn f_right" onClick={() => this.flick.next()}>&gt;</button>
  </div>;
  }
}
