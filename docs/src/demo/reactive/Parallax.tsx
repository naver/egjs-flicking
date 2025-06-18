import React from "react";
import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";

export default () => {
  const flickingRef = React.createRef<Flicking>();
  const {
    indexProgress
  } = useFlickingReactiveAPI(flickingRef);

  return (
    <Flicking ref={flickingRef}>
      {[0, 1, 2, 3, 4].map((index) => {

        const childProgress = index - indexProgress;
        const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);

        return <div className={"flicking-panel skelton-panel has-background-primary is-size-1"}>
          <span className="skeleton-bar skeleton-bar-size4" style={{
            transform: `translate(${childProgress * 180}px)`,
            opacity
          }}></span>
          <span className="skeleton-bar skeleton-bar-size1" style={{
            transform: `translate(${childProgress * 160}px)`,
            opacity
          }}></span>
          <span className="skeleton-bar skeleton-bar-size3" style={{
            transform: `translate(${childProgress * 140}px)`,
            opacity
          }}></span>
          <span className="skeleton-bar skeleton-bar-size2" style={{
            transform: `translate(${childProgress * 120}px)`,
            opacity
          }}></span>
          <span className="skeleton-bar skeleton-bar-size3" style={{
            transform: `translate(${childProgress * 100}px)`,
            opacity
          }}></span>
        </div>;
      })}
    </Flicking>
  );
};
