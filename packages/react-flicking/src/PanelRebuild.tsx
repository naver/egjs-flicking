import * as React from 'react';
import Flicking from "./react-flicking";

export default class App extends React.Component<{horizontal?: boolean, previewPadding?: number[]}> {
  public flick: Flicking;
  public state = {
    list: [0, 1, 2]
  };

  public render() {
    return <div>
        <div className="flick_demo">
          <Flicking id="mflick1" className="flick" circular={true} previewPadding={[50, 50]} {...this.props}  defaultIndex={3} ref={e => { this.flick = e; }}>
            {this.state.list.map(num => {
                return <div key={num} style={{backgroundColor: this.getRandomColor()}} ><p>{num}</p></div>;
            })}
          </Flicking>
          <button className="f_btn f_left" onClick={() => this.flick.prev()} >&lt;</button>
          <button className="f_btn f_right" onClick={() => this.flick.next()}>&gt;</button>
        </div>
        <div>
          <button className="update" onClick={
            () => {
              this.setState({
                list: [3, 4, 5]
              });

              // `rebuild()` should be called after rendered.
              setTimeout(() => {
                this.flick.rebuild()
              });
            }
          }>Update</button>
        </div>
      </div>
  }

  public getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
