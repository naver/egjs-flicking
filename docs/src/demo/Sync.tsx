/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef } from "react";
import Flicking from "@egjs/react-flicking";
import "../css/demo/sync.css";

export default () => {
  const flicking0 = useRef<Flicking>();
  const flicking1 = useRef<Flicking>();
  const flicking2 = useRef<Flicking>();

  const update = (flicking: Flicking, progress: number) => {
    flicking.camera.lookAt(flicking.camera.range.min + flicking.camera.rangeDiff * progress);
  };

  return <>
    <Flicking ref={flicking0}
      align="prev"
      onMove={e => {
        const camera = e.currentTarget.camera;
        const progress = (camera.position - camera.range.min) / camera.rangeDiff;
        update(flicking1.current, progress);
        update(flicking2.current, progress);
      }}
      onMoveStart={() => {
        flicking1.current.disableInput();
        flicking2.current.disableInput();
      }}
      onMoveEnd={() => {
        flicking1.current.enableInput();
        flicking2.current.enableInput();
      }}
      onChanged={e => {
        void flicking1.current.moveTo(e.index, 0);
        void flicking2.current.moveTo(e.index, 0);
      }}>
      <div className="flicking-panel has-background-success has-text-white is-size-1" style={{ width: "100px" }}>1</div>
      <div className="flicking-panel has-background-success has-text-white is-size-1" style={{ width: "100px" }}>2</div>
      <div className="flicking-panel has-background-success has-text-white is-size-1" style={{ width: "100px" }}>3</div>
      <div className="flicking-panel has-background-success has-text-white is-size-1" style={{ width: "100px" }}>4</div>
      <div className="flicking-panel has-background-success has-text-white is-size-1" style={{ width: "100px" }}>5</div>
    </Flicking>
    <Flicking ref={flicking1}
      align="prev"
      onMove={e => {
        const camera = e.currentTarget.camera;
        const progress = (camera.position - camera.range.min) / camera.rangeDiff;
        update(flicking0.current, progress);
        update(flicking2.current, progress);
      }}
      onMoveStart={() => {
        flicking0.current.disableInput();
        flicking2.current.disableInput();
      }}
      onMoveEnd={() => {
        flicking0.current.enableInput();
        flicking2.current.enableInput();
      }}
      onChanged={e => {
        void flicking0.current.moveTo(e.index, 0);
        void flicking2.current.moveTo(e.index, 0);
      }}>
      <div className="flicking-panel has-background-info has-text-white is-size-1" style={{ width: "200px" }}>1</div>
      <div className="flicking-panel has-background-info has-text-white is-size-1" style={{ width: "200px" }}>2</div>
      <div className="flicking-panel has-background-info has-text-white is-size-1" style={{ width: "200px" }}>3</div>
      <div className="flicking-panel has-background-info has-text-white is-size-1" style={{ width: "200px" }}>4</div>
      <div className="flicking-panel has-background-info has-text-white is-size-1" style={{ width: "200px" }}>5</div>
    </Flicking>
    <Flicking ref={flicking2}
      align="prev"
      onMove={e => {
        const camera = e.currentTarget.camera;
        const progress = (camera.position - camera.range.min) / camera.rangeDiff;
        update(flicking0.current, progress);
        update(flicking1.current, progress);
      }}
      onMoveStart={() => {
        flicking0.current.disableInput();
        flicking1.current.disableInput();
      }}
      onMoveEnd={() => {
        flicking0.current.enableInput();
        flicking1.current.enableInput();
      }}
      onChanged={e => {
        void flicking0.current.moveTo(e.index, 0);
        void flicking1.current.moveTo(e.index, 0);
      }}>
      <div className="flicking-panel has-background-danger has-text-white is-size-1" style={{ width: "400px" }}>1</div>
      <div className="flicking-panel has-background-danger has-text-white is-size-1" style={{ width: "400px" }}>2</div>
      <div className="flicking-panel has-background-danger has-text-white is-size-1" style={{ width: "400px" }}>3</div>
      <div className="flicking-panel has-background-danger has-text-white is-size-1" style={{ width: "400px" }}>4</div>
      <div className="flicking-panel has-background-danger has-text-white is-size-1" style={{ width: "400px" }}>5</div>
    </Flicking>
  </>;
};
