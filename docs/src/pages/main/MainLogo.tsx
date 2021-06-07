import React from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

export default () => {
  const plugins = [new AutoPlay()];

  return <div className="container main-logo-container mb-4">
    <div className="main-logo-wrapper">
      <Flicking plugins={plugins} circular={true}
        onMove={e => {
          const panels = e.currentTarget.panels;
          const camera = e.currentTarget.camera;
          const camPos = camera.position - camera.alignPosition - camera.offset;
          const viewportHalf = e.currentTarget.viewport.width / 2;

          camera.element.style.perspectiveOrigin = `${camPos + viewportHalf}px 50%`;

          panels.forEach(panel => {
            (panel.element).style.transform = `translateZ(${Math.abs(panel.outsetProgress) * 100}px) rotateY(${panel.outsetProgress * 15}deg)`;
          });
        }}
      >
        { [...new Array(12).keys()].map((_, idx) => <div key={idx} className="main-logo-box">
          <p className="image is-1by1"></p>
        </div>) }
      </Flicking>
    </div>
    <img className="flicking-logo" src="img/flicking.svg" />
  </div>;
};
