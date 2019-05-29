import { Component, ComponentChild } from "preact";

export class CloneComponent extends Component {
  public render() {
    return (this.props.children as any)[0];
  }
}
