import { Component } from "react";
import { FlickingEvents, FlickingOptions } from "@egjs/flicking";

class DummyFlicking extends Component<{
  tag: string;
  cameraTag: string;
  options: Partial<FlickingOptions>;
  events: Partial<{ [key in keyof FlickingEvents]: (e: FlickingEvents[key]) => any }>;
} & JSX.IntrinsicElements["div"]> {
  public static defaultProps = {
    tag: "div",
    cameraTag: "div",
    options: {},
    events: {}
  };
}

export default DummyFlicking;
