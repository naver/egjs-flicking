import Flicking from "@egjs/flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick", {
  circular: true,
  preventDefaultOnDrag: true
});

flicking.addPlugins(
  new AutoPlay({
    duration: 2000,
    direction: "NEXT",
    stopOnHover: true
  })
);
