
import { h, Component } from "preact";
import Flicking from "../../preact-flicking/Flicking";
import "../css/infinite.css";
import PlaceHolderItem from "./PlaceHolderItem";
import { insertCode } from "../utils";
import Code from "../Code";

export default class InfiniteFlicking extends Component<{}, { list0: number[], list1: number[], list2: number[] }> {
  public container?: HTMLElement;
  public state = {
    list0: [0, 1, 2, 3, 4],
    list1: [0, 1, 2, 3, 4],
    list2: [0, 1, 2, 3, 4],
  };
  public render() {
    // [3, 4, 0, 1, 2, 5, 6, 7, 8]
    return (
      <div id="infinite" className="container">
        <h1>Infinite Flicking</h1>
        <h2>Append  &amp; Prepend panel dynamically</h2>
        <ul className="extra">
          <li>You can dynamically add panels to the flicking.</li>
          <li>The panel's indexes are zero-based integer.</li>
          <li>Note: The number displayed above each panel is not panel's index.</li>
        </ul>
        <Flicking className="flicking flicking0" gap={10}>
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
        <Code script="flicking0"/>
        <h2>infinite: true &amp; needPanel event</h2>
        <ul className="extra">
          <li>Enabling the infinite option can make <strong>needPanel</strong> event to be triggered when more panels at moving direction should be fetched within <strong>infiniteThreshold</strong> value.</li>
        </ul>
        <Flicking
          className="flicking flicking1" gap={10} infinite={true} infiniteThreshold={50}
          onNeedPanel={() => {
            this.setState(state => {
              const end = state.list1[state.list1.length - 1] || 0;

              return { list1: [...state.list1, end + 1, end + 2] };
            });
          }}
        >
          {this.state.list1.map(num => {
            return <div key={num} className={"infinite infinite" + Math.abs(num) % 5}>{num}</div>;
          })}
        </Flicking>
        <Code script="flicking1"/>
        <h2>infinite: true &amp; placeholder</h2>
        <ul className="extra">
          <li>You can make continuous carousel UI with asynchronous data by adding placeholder panel first, then update panel with fetched data later.</li>
        </ul>
        <Flicking
          className="flicking flicking2" gap={10} infinite={true} moveType={"freeScroll"}
          onNeedPanel={() => {
            this.setState(state => {
              const end = state.list2[state.list2.length - 1] || 0;

              return { list2: [...state.list2, end + 1, end + 2] };
            });
          }}
        >
          {this.state.list2.map(num => {
            return <PlaceHolderItem key={num} num={num} />;
          })}
        </Flicking>
        <Code script="flicking2"/>
      </div>
    );
  }
  public componentDidMount() {
    insertCode("infinite", 0, `
<Flicking className="flicking flicking0" gap={10}>
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
`);
    insertCode("infinite", 1, `
<Flicking
  className="flicking flicking1" gap={10} infinite={true} infiniteThreshold={50}
  onNeedPanel={() => {
    this.setState(state => {
      const end = state.list1[state.list1.length - 1] || 0;

      return { list1: [...state.list1, end + 1, end + 2] };
    });
  }}
>
  {this.state.list1.map(num => {
    return <div key={num} className={"infinite infinite" + Math.abs(num) % 5}>{num}</div>;
  })}
</Flicking>
    `);
    insertCode("infinite", 2, `
<Flicking
  className="flicking flicking2" gap={10} infinite={true} moveType={"freeScroll"}
  onNeedPanel={() => {
    this.setState(state => {
      const end = state.list2[state.list2.length - 1] || 0;

      return { list2: [...state.list2, end + 1, end + 2] };
    });
  }}
>
  {this.state.list2.map(num => {
    return <PlaceHolderItem key={num} num={num} />;
  })}
</Flicking>
    `);
  }
}
