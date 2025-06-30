import React from "react";
import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import Pagination from "@mui/material/Pagination";
import Panel from "@site/src/component/Panel";

export default () => {
  const flickingRef = React.createRef<Flicking>();
  const {
    currentPanelIndex,
    totalPanelCount,
    moveTo
  } = useFlickingReactiveAPI(flickingRef);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    // MUI Pagination은 1부터 시작하므로 0부터 시작하는 인덱스로 변환
    moveTo(page - 1);
  };

  return (
    <>
      <Flicking ref={flickingRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <Panel key={index} index={index} />
        ))}
      </Flicking>
      <Pagination
        page={currentPanelIndex + 1}
        count={totalPanelCount}
        onChange={handlePageChange}
        color="primary"
        size="large"
      />
    </>
  );
}; 