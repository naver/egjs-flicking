import * as React from "react";
import Flicking from "../../react-flicking/Flicking";
import ViewportSlot from "../../react-flicking/ViewportSlot";
import { Arrow } from "@egjs/flicking-plugins";
import "../css/plugins.css";

export default class ArrowDemo extends React.Component<{}> {
  private plugins = [new Arrow()];
  public render() {
    return (
    <div id="arrow" className="container">
      <Flicking
        className="flicking"
        circular={true}
        gap={10}
        duration={500}
        plugins={this.plugins}
      >
        <div className="panel panel0"></div>
        <div className="panel panel1"></div>
        <div className="panel panel2"></div>
        <div className="panel panel3"></div>
        <div className="panel panel4"></div>
        <ViewportSlot>
          <span slot="viewport" className="flicking-arrow-prev"></span>
          <span slot="viewport" className="flicking-arrow-next"></span>
        </ViewportSlot>
      </Flicking>
  </div>);
  }
}
