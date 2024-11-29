import * as React from "react";
import CrossFlicking from "../../react-flicking/CrossFlicking";
import "../css/cross.css";

export default class Cross extends React.Component<{}> {
  public render() {
    return (
      <div id="cross" className="container">
        <CrossFlicking className="flicking" preventDefaultOnDrag={true}>
          <div data-cross-groupkey="0" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/11.jpg" />
            방송 1A
          </div>
          <div data-cross-groupkey="0" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/12.jpg" />
            방송 1B
          </div>
          <div data-cross-groupkey="0" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/13.jpg" />
            방송 1C
          </div>
          <div data-cross-groupkey="0" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/14.jpg" />
            방송 1D
          </div>
          <div data-cross-groupkey="0" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/15.jpg" />
            방송 1E
          </div>
          <div data-cross-groupkey="1" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/16.jpg" />
            축구 2A
          </div>
          <div data-cross-groupkey="1" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/17.jpg" />
            축구 2B
          </div>
          <div data-cross-groupkey="1" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/18.jpg" />
            축구 2C
          </div>
          <div data-cross-groupkey="1" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/19.jpg" />
            축구 2D
          </div>
          <div data-cross-groupkey="1" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/39.jpg" />
            축구 2E
          </div>
          <div data-cross-groupkey="2" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/21.jpg" />
            패션 3A
          </div>
          <div data-cross-groupkey="2" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/22.jpg" />
            패션 3B
          </div>
          <div data-cross-groupkey="2" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/38.jpg" />
            패션 3C
          </div>
          <div data-cross-groupkey="2" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/24.jpg" />
            패션 3D
          </div>
          <div data-cross-groupkey="2" className="panel">
            <img src="https://naver.github.io/egjs-infinitegrid/assets/image/25.jpg" />
            패션 3E
          </div>
        </CrossFlicking>
      </div>
    );
  }
}
