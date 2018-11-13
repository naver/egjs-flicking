import { ParallaxEffect } from "@egjs/flicking-plugins";
import * as React from 'react';
import Flicking from "./react-flicking";


export default class App extends React.Component<{ horizontal?: boolean }> {
  public flick: Flicking;
  public render() {
    return <div className="flick_demo">
      <Flicking id="OpacityEffect" prefix="plugin" className="plugin" circular={true}  {...this.props} ref={e => { this.flick = e; }}>
        <div>
          <p style={{ backgroundImage: "url(https://naver.github.io/egjs-flicking/assets/img/bg01.jpg)" }}>
            Layer 1<br />
            <span className="text">description</span>
          </p>
        </div>
        <div>
          <p style={{ backgroundImage: "url(https://naver.github.io/egjs-flicking/assets/img/bg02.jpg)" }}>
            Layer 2<br />
            <span className="text">description</span>
          </p>
        </div>
        <div>
          <p style={{ backgroundImage: "url(https://naver.github.io/egjs-flicking/assets/img/bg03.jpg)" }}>
            Layer 3<br />
            <span className="text">description</span>
          </p>
        </div>
      </Flicking >
      <button className="f_btn f_left" onClick={() => this.flick.prev()} >&lt;</button>
      <button className="f_btn f_right" onClick={() => this.flick.next()}>&gt;</button>
    </div >;
  }
  public componentDidMount() { 
    this.flick.plugin([new ParallaxEffect("p")]);
  }
}
