import { Fixture } from "../../types";

const fixture: Fixture = {
  options: {
    panelsPerView: 3,
    align: "prev"
  },
  panels: [
    { tag: "div", class: "flicking-panel", text: "" },
    { tag: "div", class: "flicking-panel", text: "" },
    { tag: "div", class: "flicking-panel", text: "" }
  ],
  styles: [
    "css/grid.css"
  ]
};

export default fixture;
