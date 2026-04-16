import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const GROUPS = [
  { name: "Group A", colors: ["#e74c3c", "#c0392b", "#e67e22"] },
  { name: "Group B", colors: ["#3498db", "#2980b9", "#1abc9c"] },
  { name: "Group C", colors: ["#2ecc71", "#27ae60", "#16a085"] }
];

const outerCamera = document.querySelector("#outer .flicking-camera");

GROUPS.forEach((group, gi) => {
  const outerPanel = document.createElement("div");
  outerPanel.className = "outer-panel";

  const label = document.createElement("div");
  label.className = "group-label";
  label.textContent = `${group.name} (swipe vertically to switch groups)`;
  outerPanel.appendChild(label);

  const innerViewport = document.createElement("div");
  innerViewport.className = "flicking-viewport";
  innerViewport.id = `inner-${gi}`;
  const innerCamera = document.createElement("div");
  innerCamera.className = "flicking-camera";
  innerViewport.appendChild(innerCamera);

  group.colors.forEach((color, pi) => {
    const panel = document.createElement("div");
    panel.className = "inner-panel";
    panel.style.background = color;
    panel.innerHTML = `<span>${group.name}-${pi + 1}</span><span class="panel-subtitle">swipe horizontally</span>`;
    innerCamera.appendChild(panel);
  });

  outerPanel.appendChild(innerViewport);
  outerCamera.appendChild(outerPanel);
});

const outerFlicking = new Flicking("#outer", {
  horizontal: false,
  moveType: "strict",
  bound: true,
  align: "prev"
});

GROUPS.forEach((_, gi) => {
  new Flicking(`#inner-${gi}`, {
    nested: true,
    moveType: "strict",
    bound: true,
    align: "prev"
  });
});

const infoBar = document.querySelector(".info-bar");
outerFlicking.on("changed", e => {
  infoBar.textContent = `Current group: ${GROUPS[e.index].name} (vertical: switch groups / horizontal: navigate within group)`;
});
