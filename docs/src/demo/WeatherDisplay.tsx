/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import Sunny from "@site/static/img/demo/sunny.svg";
import Cloudy from "@site/static/img/demo/cloudy.svg";
import Rainy from "@site/static/img/demo/rainy.svg";
import "../css/demo/weather-display.css";

export default () => {
  const plugins = [new AutoPlay()];

  return <Flicking className="weather-display my-6" circular={true} horizontal={false} plugins={plugins}>
    <div className="weather-panel">
      <span className="has-text-weight-bold">21/05/17</span> <Sunny /><span>Sunny</span><span className="has-text-info">14.0°</span><span>/</span><span className="has-text-danger">17.0°</span>
    </div>
    <div className="weather-panel">
      <span className="has-text-weight-bold">21/05/18</span> <Cloudy /><span>Cloudy</span><span className="has-text-info">13.0°</span><span>/</span><span className="has-text-danger">23.0°</span>
    </div>
    <div className="weather-panel">
      <span className="has-text-weight-bold">21/05/19</span> <Rainy /><span>Rainy</span><span className="has-text-info">11.0°</span><span>/</span><span className="has-text-danger">19.0°</span>
    </div>
  </Flicking>;
};
