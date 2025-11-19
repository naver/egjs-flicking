import React from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

export default () => {
  const plugins = [new AutoPlay()];
  const updateUI = (flicking: Flicking) => {
    const panels = flicking.panels;
    const camera = flicking.camera;
    const camPos = camera.position - camera.alignPosition - camera.offset;
    const viewportHalf = flicking.viewport.width / 2;

    camera.element.style.perspectiveOrigin = `${camPos + viewportHalf}px 50%`;

    panels.forEach(panel => {
      (panel.element).style.transform = `translateZ(${Math.abs(panel.outsetProgress) * 100}px) rotateY(${panel.outsetProgress * 15}deg)`;
    });
  };

  return <div className="container main-logo-container mb-4">
    <div className="main-logo-wrapper">
      <Flicking plugins={plugins} circular={true}
        onReady={e => updateUI(e.currentTarget)}
        onMove={e => updateUI(e.currentTarget)}
      >
        <div className="main-logo-box"><p className="image is-1by1"></p></div>
        <div className="main-logo-box"><p className="image is-1by1"></p></div>
        <div className="main-logo-box"><p className="image is-1by1"></p></div>
        <div className="main-logo-box"><p className="image is-1by1"></p></div>
        <div className="main-logo-box"><p className="image is-1by1"></p></div>
      </Flicking>
    </div>
    <img className="flicking-logo" src="img/flicking.svg" />
  </div>;
};
