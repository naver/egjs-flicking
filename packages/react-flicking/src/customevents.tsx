import * as React from 'react';
import Flicking from "./react-flicking";

export default class App extends React.Component {
  public flick: Flicking;
  public log: HTMLElement;
  public isEnd: boolean = false;
  public count: number = 1;
  public handle = (e: any) => {
    const log = this.log;

    if (this.isEnd) {
      log.innerHTML = "";
      this.count = 1;
    }

    log.innerHTML = (this.count++) + ": <span class=red>" + e.eventType + "</span> event fired.<br>" + log.innerHTML;
    this.isEnd = /^(flickEnd|restore)$/.test(e.eventType);
  }
  public render() {
    return <div className="customevent_demo">
      <div className="flick_demo">
        <Flicking id="mflick2"
          className="flick" circular={true} defaultIndex={1} {...this.props} ref={e => { this.flick = e; }}
          onFlick={this.handle}
          onFlickEnd={this.handle}
          onBeforeFlickStart={this.handle}
          onBeforeRestore={this.handle}
          onRestore={this.handle}
        >
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
      </div>
      <div id="log" className="log" ref={e => (this.log = e)} />
    </div>;
  }
}
