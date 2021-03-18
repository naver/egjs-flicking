import Flicking, { FlickingOptions } from "../../../src";
import "../../../css/flicking.css";

export default (options: Partial<FlickingOptions>, panels: string[]) => {
  const wrapperEl = document.createElement("div");
  const viewportEl = document.createElement("div");
  const cameraEl = document.createElement("div");

  viewportEl.className = "flicking-viewport";
  cameraEl.className = "flicking-camera";

  const tempEl = document.createElement("div");
  tempEl.innerHTML = panels.join("");

  const panelEls = [].slice.call(tempEl.children) as HTMLElement[];
  panelEls.forEach(panel => cameraEl.appendChild(panel));
  viewportEl.appendChild(cameraEl);

  setTimeout(() => {
    new Flicking(viewportEl);
  });

  wrapperEl.appendChild(viewportEl);

  return wrapperEl;
};
