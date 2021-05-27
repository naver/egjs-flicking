
import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import "../css/infinite.css";
import PlaceHolderItem from "./PlaceHolderItem";
import { insertCode } from "../utils";

export default class InfiniteFlicking extends React.Component<{}, { list0: number[], list1: number[], list2: number[] }> {
  public container?: HTMLElement;
  public state = {
    list0: [0, 1, 2, 3, 4],
    list1: [0, 1, 2, 3, 4],
    list2: [0, 1, 2, 3, 4],
  };

  public render() {
    return (
      <div id="infinite" className="container">
        <h1>Infinite Flicking</h1>
        <h2>Append  &amp; Prepend panel dynamically</h2>
        <ul className="extra">
          <li>You can dynamically add panels to the flicking.</li>
          <li>The panel's indexes are zero-based integer.</li>
          <li>Note: The number displayed above each panel is not panel's index.</li>
        </ul>
        <Flicking className="flicking flicking0" renderOnlyVisible={true}>
          {this.state.list0.map(num => {
            return <div key={num} className={"infinite infinite" + Math.abs(num) % 5}>{num}</div>;
          })}
        </Flicking>
        <div className="buttons">
          <button id="prepend" onClick={e => this.setState(state => {
            const start = state.list0[0] || 0;
            return { list0: [start - 2, start - 1, ...state.list0] };
          })}> Prepend</button>
          <button id="append" onClick={e => this.setState(state => {
            const end = state.list0[state.list0.length - 1] || 0;
            return { list0: [...state.list0, end + 1, end + 2] };
          })}>Append</button>
        </div>
      </div>
    );
  }

  public componentDidMount() {
  }
}
