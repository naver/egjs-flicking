import * as React from "react";
import Flicking from "../../react-flicking";
import "./Example.css";

const Example: React.FC = () => {
  return (
    <div className="demo-container">
      <h2>Basic Flicking Demo</h2>
      <Flicking
        className="flicking"
        circular={false}
        moveType="snap"
        align="center"
      >
        <div className="panel">1</div>
        <div className="panel">2</div>
        <div className="panel">3</div>
        <div className="panel">4</div>
        <div className="panel">5</div>
      </Flicking>
    </div>
  );
};

export default Example;
