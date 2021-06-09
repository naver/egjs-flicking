import { Component } from "preact";
import VanillaFlicking, { FlickingOptions } from "@egjs/flicking";
import { FlickingProps } from "@egjs/react-flicking/declaration/types";

declare class Flicking extends Component<Partial<FlickingProps & FlickingOptions>> {
  public constructor(props: Partial<FlickingProps & FlickingOptions>);
  public render(): any;
}

interface Flicking extends Component<Partial<FlickingProps & FlickingOptions>>, VanillaFlicking {
}
export default Flicking;
