import React from "react";
import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import Panel from "../../component/Panel";

export default () => {
  const flickingRef = React.createRef<Flicking>();
  const {
    indexProgress
  } = useFlickingReactiveAPI(flickingRef);

  const length = 5;
  return (
    <Flicking ref={flickingRef} circular={true} className="flicking-coverflow">
      {[0, 1, 2, 3, 4].map((index) => {
        const childProgress = (index - indexProgress + length * 1.5) % length -  length * 0.5;
        const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);

        return <Panel key={index} index={index} style={{
          transformOrigin: `${50 - childProgress * 50}% 50%`,
          transform: `rotateY(${-childProgress * 50}deg) scale(${scale})`
        }} />;
      })}
    </Flicking>
  );
};
