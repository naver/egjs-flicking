import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";
import { Parallax } from "@egjs/flicking-plugins";
import "../css/plugins.css";
import "../css/parallax.css";

export default class ParallaxDemo extends React.Component<{}> {
  private plugins = [new Parallax("img", 4)];
  public render() {
    return (
      <div id="parallax" className="plugins container">
        <h1>Parallax <a
          href="https://naver.github.io/egjs-flicking-plugins/release/latest/doc/eg.Flicking.plugins.Parallax.html"
          target="_blank">API</a></h1>
        <ul className="extra">
          <li>Parallax effect will be applied to each panel while moving.</li>
        </ul>
        <Flicking
          className="flicking"
          gap={10}
          circular={true}
          plugins={this.plugins}
        >
          <div className="panel">
            <img src="https://naver.github.io/egjs-flicking/images/bg01.jpg" />
          </div>
          <div className="panel">
            <img src="https://naver.github.io/egjs-flicking/images/bg02.jpg" />
          </div>
          <div className="panel">
            <img src="https://naver.github.io/egjs-flicking/images/bg03.jpg" />
          </div>
        </Flicking>
        <div className="pagination"></div>
        <pre><code className="hljs html" data-script="flicking0"></code></pre>
      </div>);
  }
  public componentDidMount() {
    insertCode("parallax", 0, `
import { Parallax } from "@egjs/flicking-plugins";
this.plugins = [new Parallax("img", 4)];

<Flicking
  className="flicking"
  gap={10}
  circular={true}
  plugins={this.plugins}
>
  <div className="panel">
    <img src="https://naver.github.io/egjs-flicking/images/bg01.jpg" />
  </div>
  <div className="panel">
    <img src="https://naver.github.io/egjs-flicking/images/bg02.jpg" />
  </div>
  <div className="panel">
    <img src="https://naver.github.io/egjs-flicking/images/bg03.jpg" />
  </div>
</Flicking>`);
  }
}
