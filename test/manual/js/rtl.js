const el = document.querySelector("#flicking")
const flicking = new Flicking(el);

const setDirection = (dir) => {
  el.style.direction = dir.value;
  flicking.camera.updatePanelOrder();
}
