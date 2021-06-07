/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable arrow-body-style */
import React, { useState } from "react";
import Flicking from "@egjs/react-flicking";
import "@site/src/css/showcases/keywords.css";

export default () => {
  const [age, setAge] = useState(10);

  return <div className="keywords mb-6" data-age={age}>
    <h2>
      <span className="keywords-title" data-age={age}>'s selected keywords</span>
      <span className="time">
        <span className="hour">13</span>
        <span className="minute">42</span>
        <span className="second">00</span>
      </span>
    </h2>
    <Flicking className="keywords-flicking mb-4" align="prev" circular={true}
      onWillChange={e => {
        /* current panel */
        e.currentTarget.panels.forEach(panel => {
          panel.element.classList.remove("checked");
        });
        /* changing panel */
        e.panel.element.classList.add("checked");

        setAge(parseInt(e.panel.element.dataset.age, 10));
      }}
      onSelect={e => {
        void e.panel.focus();
      }}
    >
      <div data-age="10" className="item checked">Flicking</div>
      <div data-age="10" className="item">Naver</div>
      <div data-age="10" className="item">InfiniteGrid</div>
      <div data-age="10" className="item">View360</div>
      <div data-age="20" className="item">Persist</div>
      <div data-age="20" className="item">Visible</div>
      <div data-age="20" className="item">Component</div>
      <div data-age="20" className="item">Agent</div>
      <div data-age="20" className="item">Axes</div>
      <div data-age="30" className="item">egjs</div>
      <div data-age="30" className="item">PanoViewer</div>
      <div data-age="30" className="item">GridLayout</div>
      <div data-age="30" className="item">Front-End</div>
    </Flicking>
  </div>;
};
