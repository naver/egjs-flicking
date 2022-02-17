
import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import "../css/infinite.css";

export default class ImageLoadDemo extends React.Component<{}, { show: boolean }> {
  public state = {
    show: false
  };

  public render() {
    console.log("rendering")
    return (
      <div id="image" className="container">
        <button onClick={() => { this.setState({ show: true }); }}>Click me</button>
        {this.state.show && <Flicking circular={true} duration={300} resizeOnContentsReady={true}>
            <img src="https://picsum.photos/seed/1/200/300" />
            <img src="https://picsum.photos/seed/2/200/300" />
            <img src="https://picsum.photos/seed/3/200/300" />
        </Flicking>}
      </div>
    );
  }
}
