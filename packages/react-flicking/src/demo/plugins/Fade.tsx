import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";
import { Fade } from "@egjs/flicking-plugins";
import "../css/plugins.css";

export default class FadeDemo extends React.Component<{}> {
  private plugins = [new Fade()];
  public render() {
    return (
      <div id="fade" className="plugins container">
      <h1>Fade<a href="https://naver.github.io/egjs-flicking-plugins/release/latest/doc/eg.Flicking.plugins.Fade.html"
              target="_blank">API</a></h1>
      <ul className="extra">
          <li>You can give fade in / out effect while moving panels. </li>
      </ul>
      <Flicking
        className="flicking"
        circular={true}
        gap={10}
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
    insertCode("fade", 0, `
import { Fade } from "@egjs/flicking-plugins";
this.plugins = [new Fade()];

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
