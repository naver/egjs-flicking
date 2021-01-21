import { Component } from "preact";
import { FlickingOptions } from "@egjs/flicking";
import { FlickingProps, FlickingType } from "@egjs/react-flicking/declaration/types";

declare class Flicking extends Component<Partial<FlickingProps & FlickingOptions>> {
  constructor(props: Partial<FlickingProps & FlickingOptions>);
  render(): any;
}

interface Flicking extends Component<Partial<FlickingProps & FlickingOptions>>, FlickingType<Flicking> {
}
export default Flicking;
