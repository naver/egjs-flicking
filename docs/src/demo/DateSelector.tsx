/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import "../css/demo/date-selector.css";

const days = [...new Array(31).keys()].map((_, idx) => idx);
const years = [...new Array(100).keys()].map((_, idx) => 1970 + idx);

const updateTransform = e => {
  e.currentTarget.panels.forEach(panel => {
    const rotateVal = -panel.progress * 20;
    const sinRot = Math.sin(Math.abs(rotateVal * Math.PI / 180));
    const depth = 150 * sinRot * sinRot;
    panel.element.style.transform = `translateZ(-${depth}px) rotateX(${rotateVal}deg)`;
  });
};

export default () => <>
  <div className="date-demo-wrapper p-4 has-background-black has-text-white">
    <Flicking className="date-flicking" horizontal={false}
      onReady={updateTransform}
      onMove={updateTransform}>
      <div className="date-panel is-size-4 has-text-weight-bold">JAN</div>
      <div className="date-panel is-size-4 has-text-weight-bold">FEB</div>
      <div className="date-panel is-size-4 has-text-weight-bold">MAR</div>
      <div className="date-panel is-size-4 has-text-weight-bold">APR</div>
      <div className="date-panel is-size-4 has-text-weight-bold">MAY</div>
      <div className="date-panel is-size-4 has-text-weight-bold">JUN</div>
      <div className="date-panel is-size-4 has-text-weight-bold">JUL</div>
      <div className="date-panel is-size-4 has-text-weight-bold">AUG</div>
      <div className="date-panel is-size-4 has-text-weight-bold">SEP</div>
      <div className="date-panel is-size-4 has-text-weight-bold">OCT</div>
      <div className="date-panel is-size-4 has-text-weight-bold">NVM</div>
      <div className="date-panel is-size-4 has-text-weight-bold">DEC</div>
      <ViewportSlot>
        <div className="date-panel-border"></div>
        <div className="shadow-top"></div>
        <div className="shadow-bottom"></div>
      </ViewportSlot>
    </Flicking>
    <Flicking className="date-flicking" horizontal={false}
      onReady={updateTransform}
      onMove={updateTransform}>
      { days.map(day => <div key={day} className="date-panel is-size-4 has-text-weight-bold">{day + 1}</div>) }
      <ViewportSlot>
        <div className="date-panel-border"></div>
        <div className="shadow-top"></div>
        <div className="shadow-bottom"></div>
      </ViewportSlot>
    </Flicking>
    <Flicking className="date-flicking" horizontal={false}
      onReady={updateTransform}
      onMove={updateTransform}>
      { years.map(year => <div key={year} className="date-panel is-size-4 has-text-weight-bold">{year}</div>) }
      <ViewportSlot>
        <div className="date-panel-border"></div>
        <div className="shadow-top"></div>
        <div className="shadow-bottom"></div>
      </ViewportSlot>
    </Flicking>
  </div>
  <SourceCode options={{ horizontal: false }} panels={[
    { tag: "div", class: "date-panel", content: "JAN" },
    { tag: "div", class: "date-panel", content: "FEB" },
    { tag: "div", class: "date-panel", content: "MAR" },
    { tag: "div", class: "date-panel", content: "APR" },
    { tag: "div", class: "date-panel", content: "MAY" },
    { tag: "div", class: "date-panel", content: "JUN" },
    { tag: "div", class: "date-panel", content: "JUL" },
    { tag: "div", class: "date-panel", content: "AUG" },
    { tag: "div", class: "date-panel", content: "SEP" },
    { tag: "div", class: "date-panel", content: "OCT" },
    { tag: "div", class: "date-panel", content: "NVM" },
    { tag: "div", class: "date-panel", content: "DEC" }
  ]} methods={{ updateTransform: `e => {
  e.currentTarget.panels.forEach(panel => {
    const rotateVal = -panel.progress * 20;
    const sinRot = Math.sin(Math.abs(rotateVal * Math.PI / 180));
    const depth = 150 * sinRot * sinRot;
    panel.element.style.transform = \`translateZ(-$\{depth}px) rotateX($\{rotateVal}deg)\`;
  });
}` }} events={{ ready: "updateTransform", move: "updateTransform" }} />
</>;
