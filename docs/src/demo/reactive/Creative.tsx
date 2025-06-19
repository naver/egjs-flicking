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
    <Flicking ref={flickingRef} style={{ maxWidth: "300px" }}>
      {[0, 1, 2, 3, 4].map((index) => {
        const childProgress = (index - indexProgress + length * 1.5) % length -  length * 0.5;
        const pos = childProgress < 0 ? `${-childProgress * 100}%` : "0px";
        const scale = childProgress < 0 ? `${Math.max(0, 1 - Math.abs(childProgress))}` : 1;

        return <Panel key={index} index={index} style={{
          width: "100%",
          transform: `translate(${pos}) scale(${scale})`
        }} />;
      })}
    </Flicking>
  );
};
