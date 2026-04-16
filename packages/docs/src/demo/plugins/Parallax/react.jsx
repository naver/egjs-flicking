import { Parallax } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const plugins = [
  new Parallax(".bar-0", 2),
  new Parallax(".bar-1", 2),
  new Parallax(".bar-2", 2),
  new Parallax(".bar-3", 2),
  new Parallax(".bar-4", 2)
];

export default function App() {
  return (
    <Flicking plugins={plugins}>
      {[0, 1, 2, 3, 4].map(i => (
        <div className="skeleton-panel" key={i}>
          <span className="skeleton-bar bar-0" />
          <span className="skeleton-bar bar-1" />
          <span className="skeleton-bar bar-2" />
          <span className="skeleton-bar bar-3" />
          <span className="skeleton-bar bar-4" />
        </div>
      ))}
    </Flicking>
  );
}
