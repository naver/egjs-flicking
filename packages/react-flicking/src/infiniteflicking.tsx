import * as React from 'react';
import Flicking, { DIRECTION_LEFT } from "./react-flicking";

const colors = ["#CC66CC", "#66cccc", "#ffc000"];
export default class App extends React.Component {
  public flick: Flicking;
  public log: HTMLElement;
  public state = {
    count: 3,
  }
  public onFlickEnd = (e: any) => {
    if (e.direction === DIRECTION_LEFT && e.no + 1 === this.state.count) {
      this.setState({ count: this.state.count + 1 });
    }
  }
  public renderPanel() {
    const lists = [];
    const count = this.state.count;
    for (let i = 0; i < count; ++i) {
      lists.push(<div key={i} style={{ backgroundColor: colors[i % 3] }} ><p>panel {i}</p></div>)
    }
    return lists;
  }
  public render() {
    return <div className="flick_demo">
      <Flicking id="mflick2"
        className="flick" ref={e => { this.flick = e; (window as any).flick = e; }}
        onFlickEnd={this.onFlickEnd}
      >
        {this.renderPanel()}
      </Flicking>
      <button className="f_btn f_left" onClick={() => this.flick.prev()} >&lt;</button>
      <button className="f_btn f_right" onClick={() => this.flick.next()}>&gt;</button>
    </div>;
  }
}
