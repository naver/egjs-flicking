import Flicking from "~/index";
import "../../../css/flicking.css";
import { Fixture } from "../types";

export default (fixture: Fixture) => {
  const { styles, panels, options } = fixture;

  styles.forEach(style => require(`../public/${style}`));

  const wrapperEl = document.createElement("div");
  const viewportEl = document.createElement("div");
  const cameraEl = document.createElement("div");

  viewportEl.className = "flicking-viewport";
  cameraEl.className = "flicking-camera";

  const panelEls = panels.map(panel => {
    const panelEl = document.createElement(panel.tag);

    panelEl.className = panel.class;
    panelEl.innerHTML = panel.text;

    return panelEl;
  });
  panelEls.forEach(panel => cameraEl.appendChild(panel));
  viewportEl.appendChild(cameraEl);

  setTimeout(() => {
    new Flicking(viewportEl, options);
  });

  wrapperEl.appendChild(viewportEl);

  return wrapperEl;
};
