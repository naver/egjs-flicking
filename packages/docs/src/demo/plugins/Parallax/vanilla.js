import Flicking from "@egjs/flicking";
import { Parallax } from "@egjs/flicking-plugins";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick");

flicking.addPlugins(
  new Parallax(".bar-0", 2),
  new Parallax(".bar-1", 2),
  new Parallax(".bar-2", 2),
  new Parallax(".bar-3", 2),
  new Parallax(".bar-4", 2)
);
