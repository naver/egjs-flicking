import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";
import "../css/bound.css";

export default class Bound extends React.Component<{}> {
  public render() {
    return (
      <div id="bound" className="container">
        <h1>Bound <img src="https://naver.github.io/egjs-flicking/images/bound-dog.png" width="40px" /></h1>
        <ul className="extra">
          <li>Bound the panels so that they are not out of the flicking area.</li>
          <li>This prevents unwanted free space within the flicking area.</li>
        </ul>
        <h2>bound: false</h2>
        <div className="hanger hanger0"></div>
        <Flicking className="flicking flicking0" gap={10}>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
        </Flicking>
        <h2>bound: true</h2>
        <div className="hanger hanger0"></div>
        <Flicking className="flicking flicking1" gap={10} bound={true}>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
        </Flicking>
        <div className="pagination pagination2"></div>
        <pre><code className="hljs html" data-script="flicking1"></code></pre>
      </div>);
  }
  public componentDidMount() {
    insertCode("bound", 1, `
  <Flicking className="flicking flicking1" bound={true}>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
  </Flicking>`);
  }
}
