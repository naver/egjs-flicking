import React from "react";
import Flicking from "@egjs/react-flicking";
import { FrameGrid } from "@egjs/react-grid";
import "@site/src/css/demo/grid.css";

export default () => <>
  <Flicking className="py-4 mb-4" circular={true}>
    <div className="grid-panel has-background-primary has-text-white">1</div>
    <FrameGrid className="grid-panel" gap={10} frame={[[1, 1, 2, 2], [3, 3, 2, 2], [4, 4, 4, 5]]}>
      <div className="has-background-warning has-text-white">2</div>
      <div className="has-background-danger has-text-white">3</div>
      <div className="has-background-info has-text-white">4</div>
      <div className="has-background-success has-text-white">5</div>
      <div className="has-background-grey has-text-white">6</div>
    </FrameGrid>
    <div className="grid-panel has-background-grey-darker has-text-white">7</div>
    <FrameGrid className="grid-panel" gap={10} frame={[[1, 1, 1, 1], [3, 3, 2, 2], [4, 5, 5, 6]]}>
      <div className="has-background-light has-text-black ">8</div>
      <div className="has-background-grey has-text-white">9</div>
      <div className="has-background-info has-text-white">10</div>
      <div className="has-background-success has-text-white">11</div>
      <div className="has-background-warning has-text-white">12</div>
      <div className="has-background-danger has-text-white">13</div>
    </FrameGrid>
  </Flicking>
</>;
