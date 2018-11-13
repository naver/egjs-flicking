import * as React from 'react';
import './App.css';

import Circular from "./circular";
import CusomEvents from "./customevents";
import InfiniteFlicking from "./infiniteflicking";
import Normal from "./normal";
import Preview from "./preview";


class App extends React.Component {
  public render() {
    return (
      <div className="wrapper">
        <h2>Horizontal</h2>
        <div className="horizontal">
          <p>Non-Circular</p>
          <Normal />
          <p>Circular</p>
          <Circular />
          <p>Preview &amp; Circular</p>
          <Preview />
        </div>
        <h2>Vertical</h2>
        <div className="vertical">
          <p>Non-Circular</p>
          <Normal horizontal={false} />
          <p>Circular</p>
          <Circular horizontal={false} />
          <p>Preview &amp; Circular</p>
          <Preview horizontal={false} previewPadding={[10, 10]} />
        </div>
        <h2>Custom events</h2>
        <div className="horizontal">
          <CusomEvents />
        </div>
        <h2>Infinite Flicking</h2>
        <div className="horizontal">
          <InfiniteFlicking />
        </div>
      </div>
    );
  }
}

export default App;
