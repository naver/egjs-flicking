import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// align: "prev"
new Flicking("#flick-prev", { align: "prev" });

// align: "center"
new Flicking("#flick-center", { align: "center" });

// align: "next"
new Flicking("#flick-next", { align: "next" });
