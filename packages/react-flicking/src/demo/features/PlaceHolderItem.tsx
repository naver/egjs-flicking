import * as React from "react";

class PlaceHolderItem extends React.Component<{ num: number, domRef: React.Ref<HTMLDivElement> }, {loaded: boolean}> {
  public state = {
    loaded: false,
  };

  private _timer: number = -1;

  public render() {
    const num = this.props.num;
    const loaded = this.state.loaded;
    return <div ref={this.props.domRef} className={`infinite infinite${Math.abs(num) % 5} ${loaded ? "" : "placeholder"} flicking-panel`}>{num}</div>;
  }

  public componentDidMount() {
    this._timer = window.setTimeout(() => {
      this.setState({loaded: true});
    }, 1500);
  }

  public componentWillUnmount() {
    clearTimeout(this._timer);
  }
}

export default React.forwardRef<HTMLDivElement, { num: number }>((props, ref) => <PlaceHolderItem
  domRef={ref} {...props}
/>);
