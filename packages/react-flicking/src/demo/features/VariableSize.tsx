import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";
import "../css/variable-size.css";

export default class VariableSize extends React.Component<{}> {
  public render() {
    return (
      <div id="variable-size" className="container">
        <h1>Multiple Panel &amp; Variable Size</h1>
        <ul className="extra">
          <li>You can place multiple panels in the flicking area.</li>
          <li>You can specify various sizes for each panel.</li>
        </ul>
        <Flicking className="flicking flicking0" circular={true} gap={10}>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
        </Flicking>
        <pre><code className="hljs html" data-script="flicking0"></code></pre>
      </div>);
  }
  public componentDidMount() {
    insertCode("variable-size", 0, `
  <Flicking className="flicking flicking0" circular={true} gap={10}>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
  }
}
