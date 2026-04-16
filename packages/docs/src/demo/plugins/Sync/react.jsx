import { Sync } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import { useEffect, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const IMAGES = [
  "https://picsum.photos/seed/sync1/600/300",
  "https://picsum.photos/seed/sync2/600/300",
  "https://picsum.photos/seed/sync3/600/300",
  "https://picsum.photos/seed/sync4/600/300",
  "https://picsum.photos/seed/sync5/600/300",
  "https://picsum.photos/seed/sync6/600/300"
];

export default function App() {
  const mainRef = useRef(null);
  const thumbRef = useRef(null);
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    if (mainRef.current && thumbRef.current) {
      setPlugins([
        new Sync({
          type: "index",
          synchronizedFlickingOptions: [
            { flicking: mainRef.current, isSlidable: true },
            { flicking: thumbRef.current, isClickable: true, activeClass: "active" }
          ]
        })
      ]);
    }
  }, []);

  return (
    <div>
      <Flicking ref={mainRef} plugins={plugins} bounce={30} preventDefaultOnDrag={true}>
        {IMAGES.map((src, i) => (
          <div className="main-panel" key={i}>
            <img src={src} />
          </div>
        ))}
      </Flicking>
      <Flicking
        ref={thumbRef}
        className="thumb-flicking"
        bound={true}
        bounce={30}
        moveType="freeScroll"
        preventDefaultOnDrag={true}
      >
        {IMAGES.map((src, i) => (
          <div className="thumb-panel" key={i}>
            <img src={src} />
          </div>
        ))}
      </Flicking>
    </div>
  );
}
