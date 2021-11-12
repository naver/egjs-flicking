import { Component } from "react";
import { FlickingEvents, FlickingOptions, Plugin } from "@egjs/flicking";

class DummyFlicking extends Component<{
  tag: string;
  cameraTag: string;
  options: Partial<FlickingOptions>;
  events: Partial<{ [key in keyof FlickingEvents]: (e: FlickingEvents[key]) => any }>;
  plugins: Plugin[];
} & JSX.IntrinsicElements["div"]> {
  public static defaultProps = {
    tag: "div",
    cameraTag: "div",
    options: {},
    events: {},
    plugins: []
  };
}

export default DummyFlicking;
