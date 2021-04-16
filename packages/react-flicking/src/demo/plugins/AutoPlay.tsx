import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import { insertCode } from "../utils";
import { Fade, AutoPlay } from "@egjs/flicking-plugins";
import "../css/plugins.css";

export default class AutoPlayDemo extends React.Component<{}> {
  private plugins = [new Fade(), new AutoPlay({ duration: 2000, direction: "NEXT" })];
  public render() {
    return (
      <div id="autoplay" className="plugins container">
      <h1>AutoPlay<a href="https://naver.github.io/egjs-flicking-plugins/release/latest/doc/eg.Flicking.plugins.AutoPlay.html"
              target="_blank">API</a></h1>
      <ul className="extra">
          <li>You can set flicking to move to the next/previous panel periodically.</li>
      </ul>
      <Flicking
        className="flicking"
        circular={true}
        gap={10}
        duration={500}
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
    insertCode("autoplay", 0, `
import { Fade, AutoPlay } from "@egjs/flicking-plugins";
this.plugins = [new Fade(), new AutoPlay(2000, "NEXT")];

<Flicking
  className="flicking"
  circular={true}
  gap={10}
  duration={500}
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
