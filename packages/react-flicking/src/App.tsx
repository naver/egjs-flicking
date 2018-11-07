import * as React from 'react';
import './App.css';
import Flicking from "./react-flicking";

class App extends React.Component {
  public render() {
    return (
      <Flicking id="wrapper" className="flick">
          <div>
            <p>panel 0</p>
          </div>
          <div>
            <p>panel 1</p>
          </div>
          <div>
            <p>panel 2</p>
          </div>
      </Flicking>
    );
  }
}

export default App;
