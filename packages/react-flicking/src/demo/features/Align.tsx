import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";
import "../css/align.css";

export default class Align extends React.Component<{}> {
  public render() {
    return (
      <div id="align" className="container">
        <h1>Flexible Align</h1>
        <ul className="extra">
          <li>Use Hanger and Anchor to provide customizable alignment.</li>
          <li>The Hanger and Anchor have magnetically bonded effect which allows the panel position to be aligned</li>
          <li><strong>Hanger:</strong> An alignment point within Flicking area. It hangs panel anchors to its position.</li>
          <li><strong>Anchor:</strong> Alignment points based on each panels. Panel's anchor position is determined by this value. <br /> It will be used for a reference point where panel should stop when selected, interacting with hanger position.</li>
        </ul>
        <h2>Center Align (Default)</h2>
        <h3>hanger: 50%, anchor: 50%</h3>
        <div className="hanger hanger0"></div>
        <Flicking className="flicking flicking0">
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
        </Flicking>
        <pre><code className="hljs html" data-script="flicking0"></code></pre>

        <h2>Left Align</h2>
        <h2>hanger: 0, anchor: 0</h2>
        <div className="hanger hanger1"></div>
        <Flicking className="flicking flicking1" hanger={"0"} anchor={"0"}>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
        </Flicking>
        <div className="pagination pagination1"></div>
        <pre><code className="hljs html" data-script="flicking1"></code></pre>

        <h2>Custom Align</h2>
        <h3>hanger: 30%, anchor: 50px</h3>
        <div className="hanger hanger2"></div>
        <Flicking className="flicking flicking2" hanger={"30%"} anchor={"50px"}>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
          <div className="panel"><div className="anchor"></div></div>
        </Flicking>
        <div className="pagination pagination2"></div>
        <pre><code className="hljs html" data-script="flicking2"></code></pre>
      </div>);
  }
  public componentDidMount() {
    insertCode("align", 0, `
  <Flicking className="flicking flicking0">
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
  </Flicking>`);
    insertCode("align", 1, `
  <Flicking className="flicking flicking1" hanger={"0"} anchor={"0"}>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
  </Flicking>`);
    insertCode("align", 2, `
  <Flicking className="flicking flicking2" hanger={"30%"} anchor={"50px"}>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
    <div className="panel"><div className="anchor"></div></div>
  </Flicking>`);
  }
}
