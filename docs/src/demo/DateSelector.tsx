/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import "../css/demo/date-selector.css";

const updateTransform = e => {
  e.currentTarget.panels.forEach(panel => {
    const rotateVal = -panel.progress * 20;
    const sinRot = Math.sin(Math.abs(rotateVal * Math.PI / 180));
    const depth = 150 * sinRot * sinRot;
    panel.element.style.transform = `translateZ(-${depth}px) rotateX(${rotateVal}deg)`;
  });
};

export const dates = (start: number, count: number) => (Array.apply(0, Array(count)) as number[]).map((_, idx) => <div key={idx} className="date-panel is-size-4 has-text-weight-bold">{start + idx}</div>);

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
      { dates(1, 31) }
      <ViewportSlot>
        <div className="date-panel-border"></div>
        <div className="shadow-top"></div>
        <div className="shadow-bottom"></div>
      </ViewportSlot>
    </Flicking>
    <Flicking className="date-flicking" horizontal={false}
      onReady={updateTransform}
      onMove={updateTransform}>
      { dates(1970, 100) }
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
    { tag: "div", class: "date-panel", content: "DEC" },
    { tag: "div", class: "date-panel-border", content: "", isSlot: true },
    { tag: "div", class: "shadow-top", content: "", isSlot: true },
    { tag: "div", class: "shadow-bottom", content: "", isSlot: true }
  ]} methods={{ updateTransform: `e => {
  e.currentTarget.panels.forEach(panel => {
    const rotateVal = -panel.progress * 20;
    const sinRot = Math.sin(Math.abs(rotateVal * Math.PI / 180));
    const depth = 150 * sinRot * sinRot;
    panel.element.style.transform = \`translateZ(-$\{depth}px) rotateX($\{rotateVal}deg)\`;
  });
}` }} events={{ ready: "updateTransform", move: "updateTransform" }} />
</>;
