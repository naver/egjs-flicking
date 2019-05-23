import * as React from "react";

export default class PlaceHolderItem extends React.Component<{num: number}, {loaded: boolean}> {
  public state = {
    loaded: false,
  };
  public render() {
    const num = this.props.num;
    const loaded = this.state.loaded;
    return <div className={`infinite infinite${Math.abs(num) % 5} ${loaded ? "" : "placeholder"}`}>{num}</div>;
  }
  public componentDidMount() {
    setTimeout(() => {
      this.setState({loaded: true});
    }, 1500);
  }
}
