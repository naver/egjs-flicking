import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";
import "../css/align.css";

export default class Snap extends React.Component<{}> {
  public render() {
    return (
      <div id="snap" className="container">
        <h1>Snap</h1>
        <ul className="extra">
          <li>You can decide how many panels can be passed on a single snap.</li>
        </ul>
        <h2>Default (count: 1)</h2>
        <Flicking className="flicking flicking0" gap={10} circular={true}>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
        </Flicking>
        <div className="pagination pagination0"></div>
        <pre><code className="hljs html" data-script="flicking0"></code></pre>
        <h2>count: 3</h2>
        <Flicking className="flicking flicking1" gap={10} circular={true} moveType={{ type: "snap", count: 3 }}>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
        </Flicking>
        <div className="pagination pagination1"></div>
        <pre><code className="hljs html" data-script="flicking1"></code></pre>
        <h2>count: Infinity</h2>
        <Flicking className="flicking flicking2" gap={10} circular={true} moveType={{ type: "snap", count: Infinity }}>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
        </Flicking>
        <div className="pagination pagination2"></div>
        <pre><code className="hljs html" data-script="flicking2"></code></pre>
      </div>);
  }
  public componentDidMount() {
    insertCode("snap", 0, `
  <Flicking className="flicking flicking0" gap={10} circular={true}>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
    insertCode("snap", 1, `
  <Flicking
    className="flicking flicking1" gap={10} circular={true}
    moveType={{ type: "snap", count: 3 }}>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
    insertCode("snap", 2, `
  <Flicking
    className="flicking flicking2" gap={10} circular={true}
    moveType={{ type: "snap", count: Infinity }}>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
  }
}
