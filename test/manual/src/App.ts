import "../../css/flicking-inline.css";
import Flicking from "~/index";

class App {
  public constructor() {
    const flicking = new Flicking("#flicking");

    document.getElementById("prev")?.addEventListener("click", () => {
      flicking.prev();
    });

    document.getElementById("next")?.addEventListener("click", () => {
      flicking.next();
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (window as any).flicking = flicking;
  }
}

export default App;

// tslint:disable-next-line
new App();
