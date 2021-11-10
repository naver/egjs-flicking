import { Component } from "react";
import { FlickingOptions } from "@egjs/flicking";

class DummyFlicking extends Component<{
  tag: string;
  cameraTag: string;
  options: Partial<FlickingOptions>;
}> {
  public static defaultProps = {
    tag: "div",
    cameraTag: "div",
    options: {}
  };
}

export default DummyFlicking;
