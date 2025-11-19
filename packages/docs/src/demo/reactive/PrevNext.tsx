import React from "react";
import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import Button from "@mui/material/Button";
import Panel from "@site/src/component/Panel";

export default () => {
  const flickingRef = React.createRef<Flicking>();
  const {
    isReachStart,
    isReachEnd,
    moveTo
  } = useFlickingReactiveAPI(flickingRef);

  const handlePrev = () => {
    if (!isReachStart) {
      moveTo(flickingRef.current.index - 1);
    }
  };

  const handleNext = () => {
    if (!isReachEnd) {
      moveTo(flickingRef.current.index + 1);
    }
  };

  return (
    <>
      <Flicking ref={flickingRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <Panel key={index} index={index} />
        ))}
      </Flicking>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={isReachStart}
        >
          Prev
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={isReachEnd}
        >
          Next
        </Button>
      </div>
    </>
  );
}; 