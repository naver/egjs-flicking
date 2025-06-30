import React from "react";
import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import LinearProgress from "@mui/material/LinearProgress";
import Panel from "@site/src/component/Panel";

export default () => {
  const flickingRef = React.createRef<Flicking>();
  const {
    progress
  } = useFlickingReactiveAPI(flickingRef);

  return (
    <div style={{ width: "100%" }}>
      <Flicking
        ref={flickingRef}
        moveType="freeScroll"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <Panel key={index} index={index} />
        ))}
      </Flicking>

      <div style={{ marginTop: "20px" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ width: "100%" }}
        />
        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Progress: {progress.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}; 