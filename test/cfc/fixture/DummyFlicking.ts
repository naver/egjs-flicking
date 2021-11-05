import * as React from "react";
import { FlickingOptions } from "@egjs/flicking";

class DummyFlicking extends React.Component<{
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
