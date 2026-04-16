import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const PAGES = [
  { title: "Page 1", subtitle: "Welcome", color: "#e74c3c" },
  { title: "Page 2", subtitle: "Features", color: "#3498db" },
  { title: "Page 3", subtitle: "Pricing", color: "#2ecc71" },
  { title: "Page 4", subtitle: "Contact", color: "#f39c12" },
  { title: "Page 5", subtitle: "About", color: "#9b59b6" }
];

const camera = document.querySelector(".flicking-camera");
PAGES.forEach(page => {
  const panel = document.createElement("div");
  panel.className = "page-panel";
  panel.style.background = page.color;
  panel.innerHTML = `<span>${page.title}</span><span class="page-subtitle">${page.subtitle}</span>`;
  camera.appendChild(panel);
});

const viewport = document.getElementById("flick");
const btnVertical = document.getElementById("btn-vertical");
const btnHorizontal = document.getElementById("btn-horizontal");

let flicking = new Flicking("#flick", {
  horizontal: false,
  moveType: "strict",
  bound: true,
  align: "prev"
});

btnVertical.addEventListener("click", () => {
  flicking.destroy();
  viewport.classList.add("vertical");
  btnVertical.classList.add("active");
  btnHorizontal.classList.remove("active");
  flicking = new Flicking("#flick", {
    horizontal: false,
    moveType: "strict",
    bound: true,
    align: "prev"
  });
});

btnHorizontal.addEventListener("click", () => {
  flicking.destroy();
  viewport.classList.remove("vertical");
  btnHorizontal.classList.add("active");
  btnVertical.classList.remove("active");
  flicking = new Flicking("#flick", {
    horizontal: true,
    moveType: "strict",
    bound: true,
    align: "prev"
  });
});
