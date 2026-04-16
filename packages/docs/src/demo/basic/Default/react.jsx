import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <Flicking align="center">
      <div className="flicking-panel panel-1">1</div>
      <div className="flicking-panel panel-2">2</div>
      <div className="flicking-panel panel-3">3</div>
      <div className="flicking-panel panel-4">4</div>
      <div className="flicking-panel panel-5">5</div>
    </Flicking>
  );
}
