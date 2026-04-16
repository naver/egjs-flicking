import Flicking from "@egjs/flicking";
import { Sync } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const IMAGES = [
  "https://picsum.photos/seed/sync1/600/300",
  "https://picsum.photos/seed/sync2/600/300",
  "https://picsum.photos/seed/sync3/600/300",
  "https://picsum.photos/seed/sync4/600/300",
  "https://picsum.photos/seed/sync5/600/300",
  "https://picsum.photos/seed/sync6/600/300"
];

const mainCamera = document.querySelector("#main .flicking-camera");
const thumbCamera = document.querySelector("#thumb .flicking-camera");

IMAGES.forEach(src => {
  const mainPanel = document.createElement("div");
  mainPanel.className = "main-panel";
  mainPanel.innerHTML = `<img src="${src}" />`;
  mainCamera.appendChild(mainPanel);

  const thumbPanel = document.createElement("div");
  thumbPanel.className = "thumb-panel";
  thumbPanel.innerHTML = `<img src="${src}" />`;
  thumbCamera.appendChild(thumbPanel);
});

const mainFlicking = new Flicking("#main", { bounce: 30, preventDefaultOnDrag: true });
const thumbFlicking = new Flicking("#thumb", {
  bound: true,
  bounce: 30,
  moveType: "freeScroll",
  preventDefaultOnDrag: true
});

mainFlicking.addPlugins(
  new Sync({
    type: "index",
    synchronizedFlickingOptions: [
      { flicking: mainFlicking, isSlidable: true },
      { flicking: thumbFlicking, isClickable: true, activeClass: "active" }
    ]
  })
);
