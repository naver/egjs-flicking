import * as React from "react";
import Flicking from "../../react-flicking/Flicking";

export default class PropChange extends React.Component<{}, Record<string, any>> {
  public constructor(props) {
    super(props);

    this.state = {
      align: 0,
      panelsPerView: 5,
      horizontal: true,
      circular: true,
      bound: true,
      adaptive: true,
      noPanelStyleOverride: true,
      moveType: "snap"
    }
  }

  public render() {
    return (
      <div className="container">
        <h1>align</h1>
        <Flicking className="flicking" align={`${this.state.align}%`}>
          <div className="panel panel0"></div>
          <div className="panel panel1"></div>
          <div className="panel panel2"></div>
          <div className="panel panel3"></div>
          <div className="panel panel4"></div>
        </Flicking>
        <button onClick={() => {
          this.setState({ align: (this.state.align + 50) % 150 });
        }}>Change</button>

        <h1>horizontal</h1>
        <Flicking className="flicking" horizontal={this.state.horizontal}>
          <div className="panel panel0"></div>
          <div className="panel panel1"></div>
          <div className="panel panel2"></div>
          <div className="panel panel3"></div>
          <div className="panel panel4"></div>
        </Flicking>
        <button onClick={() => {
          this.setState({ horizontal: !this.state.horizontal });
        }}>Change</button>

        <h1>circular</h1>
        <Flicking className="flicking" circular={this.state.circular}>
          <div className="panel panel0"></div>
          <div className="panel panel1"></div>
          <div className="panel panel2"></div>
          <div className="panel panel3"></div>
          <div className="panel panel4"></div>
        </Flicking>
        <button onClick={() => {
          this.setState({ circular: !this.state.circular });
        }}>Change</button>

        <h1>bound</h1>
        <Flicking className="flicking" bound={this.state.bound}>
          <div className="panel panel0"></div>
          <div className="panel panel1"></div>
          <div className="panel panel2"></div>
          <div className="panel panel3"></div>
          <div className="panel panel4"></div>
        </Flicking>
        <button onClick={() => {
          this.setState({ bound: !this.state.bound });
        }}>Change</button>

        <h1>adaptive</h1>
        <Flicking className="flicking" adaptive={this.state.adaptive}>
          <div className="panel panel0" style={{ height: "200px" }}></div>
          <div className="panel panel1" style={{ height: "300px" }}></div>
          <div className="panel panel2" style={{ height: "400px" }}></div>
          <div className="panel panel3" style={{ height: "500px" }}></div>
          <div className="panel panel4" style={{ height: "600px" }}></div>
        </Flicking>
        <button onClick={() => {
          this.setState({ adaptive: !this.state.adaptive });
        }}>Change</button>

        <h1>panelsPerView</h1>
        <Flicking className="flicking" panelsPerView={this.state.panelsPerView}>
          <div className="panel panel0"></div>
          <div className="panel panel1"></div>
          <div className="panel panel2"></div>
          <div className="panel panel3"></div>
          <div className="panel panel4"></div>
        </Flicking>
        <button onClick={() => {
          this.setState({ panelsPerView: this.state.panelsPerView - 1 });
        }}>Change</button>

        <h1>noPanelStyleOverride</h1>
        <Flicking className="flicking" panelsPerView={5} noPanelStyleOverride={this.state.noPanelStyleOverride}>
          <div className="panel panel0"></div>
          <div className="panel panel1"></div>
          <div className="panel panel2"></div>
          <div className="panel panel3"></div>
          <div className="panel panel4"></div>
        </Flicking>
        <button onClick={() => {
          this.setState({ noPanelStyleOverride: !this.state.noPanelStyleOverride });
        }}>Change</button>

        <h1>moveType</h1>
        <Flicking className="flicking" moveType={this.state.moveType}>
          <div className="panel panel0"></div>
          <div className="panel panel1"></div>
          <div className="panel panel2"></div>
          <div className="panel panel3"></div>
          <div className="panel panel4"></div>
        </Flicking>
        <button onClick={() => {
          this.setState({ moveType: this.state.moveType === "snap" ? "freeScroll" : "snap" });
        }}>Change</button>

        <h1>moveType</h1>
        <Flicking className="flicking" moveType={this.state.moveType}>
          <div className="panel panel0"></div>
          <div className="panel panel1"></div>
          <div className="panel panel2"></div>
          <div className="panel panel3"></div>
          <div className="panel panel4"></div>
        </Flicking>
        <button onClick={() => {
          this.setState({ moveType: this.state.moveType === "snap" ? "freeScroll" : "snap" });
        }}>Change</button>
      </div>
    );
  }

  public componentDidMount() {

  }
}
