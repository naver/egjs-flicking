import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";
import "../css/gap.css";

export default class Gap extends React.Component<{}> {
  public render() {
    return (
      <div id="gap" className="container">
        <h1>Gap</h1>
        <ul className="extra">
          <li>You can specify the interval between the frames.</li>
        </ul>
        <h2>Default</h2>
        <Flicking className="flicking flicking0" bound={true}>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
        </Flicking>
        <div className="pagination pagination0"></div>
        <pre><code className="hljs html" data-script="flicking0"></code></pre>
        <h2>gap: 20</h2>
        <Flicking className="flicking flicking1" gap={20} bound={true}>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
        </Flicking>
        <div className="pagination pagination1"></div>
        <pre><code className="hljs html" data-script="flicking1"></code></pre>
      </div>);
  }
  public componentDidMount() {
    insertCode("gap", 0, `
  <Flicking className="flicking flicking0" bound={true}>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
    insertCode("gap", 1, `
  <Flicking className="flicking flicking1" gap={20} bound={true}>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
    <div className="panel"></div>
  </Flicking>`);
  }
}
