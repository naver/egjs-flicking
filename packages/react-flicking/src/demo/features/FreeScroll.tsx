import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";

export default class FreeScroll extends React.Component<{}> {
  public render() {
    return (
    <div id="free-scroll" className="container">
      <h1>Free Scroll</h1>
      <ul className="extra">
        <li>The panels are freely scrollable.</li>
      </ul>
      <h2>moveType: "freeScroll", deceleration: 0.0075(default)</h2>
      <Flicking className="flicking flicking0" gap={10} circular={true} moveType="freeScroll">
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
      </Flicking>
      <pre><code className="hljs html" data-script="flicking0"></code></pre>
      <h2>moveType: "freeScroll", deceleration: 0.015</h2>
      <Flicking
        className="flicking flicking1"
        gap={10}
        circular={true}
        deceleration={0.015}
        moveType="freeScroll">
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
      </Flicking>
      <pre><code className="hljs html" data-script="flicking1"></code></pre>
    </div>);
  }
  public componentDidMount() {
    insertCode("free-scroll", 0, `
  <Flicking className="flicking flicking0" gap={10} circular={true} moveType="freeScroll">
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
    insertCode("free-scroll", 1, `
<Flicking
  className="flicking flicking1" gap={10}
  circular={true} deceleration={0.015} moveType="freeScroll">
  <div className="panel"></div>
  <div className="panel"></div>
  <div className="panel"></div>
  <div className="panel"></div>
  <div className="panel"></div>
</Flicking>`);
  }
}
