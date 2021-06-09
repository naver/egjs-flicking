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

  return <div className="has-background-grey-lighter p-4">
    <Flicking ref={flicking0}
      className="mb-4"
      align="prev"
      bound={true}
      bounce={30}
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
        flicking1.current.control.updateInput();
        flicking2.current.enableInput();
        flicking2.current.control.updateInput();
      }}>
      <span className="button mr-2 is-white">🍎 Apple</span>
      <span className="button mr-2 is-white">🍉 Watermelon</span>
      <span className="button mr-2 is-white">🥝 Kiwi</span>
      <span className="button mr-2 is-white">🍌 Banana</span>
      <span className="button mr-2 is-white">🍊 Orange</span>
      <span className="button mr-2 is-white">🍋 Lemon</span>
      <span className="button mr-2 is-white">🍈 Melon</span>
      <span className="button mr-2 is-white">🍑 Peach</span>
      <span className="button mr-2 is-white">🍍 Pineapple</span>
      <span className="button mr-2 is-white">🍓 Strawberry</span>
      <span className="button mr-2 is-white">🍒 Cherry</span>
    </Flicking>
    <Flicking ref={flicking1}
      className="mb-4"
      align="prev"
      bound={true}
      bounce={30}
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
        flicking0.current.control.updateInput();
        flicking2.current.enableInput();
        flicking2.current.control.updateInput();
      }}>
      <span className="button mr-2 is-white">🍔 Hamburger</span>
      <span className="button mr-2 is-white">🍕 Pizza</span>
      <span className="button mr-2 is-white">🍞 Bread</span>
      <span className="button mr-2 is-white">🍜 Ramen</span>
      <span className="button mr-2 is-white">🍦 Ice cream</span>
      <span className="button mr-2 is-white">🍮 Pudding</span>
      <span className="button mr-2 is-white">🍩 Donut</span>
      <span className="button mr-2 is-white">🍪 Cookie</span>
      <span className="button mr-2 is-white">🍚 Rice</span>
      <span className="button mr-2 is-white">🧀 Cheese</span>
      <span className="button mr-2 is-white">🌭 Hot dog</span>
      <span className="button mr-2 is-white">🥓 Bacon</span>
      <span className="button mr-2 is-white">🥪 Sandwich</span>
    </Flicking>
    <Flicking ref={flicking2}
      align="prev"
      bound={true}
      bounce={30}
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
        flicking0.current.control.updateInput();
        flicking1.current.enableInput();
        flicking1.current.control.updateInput();
      }}>
      <span className="button mr-2 is-white">🥛 Milk</span>
      <span className="button mr-2 is-white">☕ Coffee</span>
      <span className="button mr-2 is-white">🍵 Green tea</span>
      <span className="button mr-2 is-white">🍺 Beer</span>
      <span className="button mr-2 is-white">🧃 Juice</span>
      <span className="button mr-2 is-white">🍷 Wine</span>
      <span className="button mr-2 is-white">🥃 Whisky</span>
      <span className="button mr-2 is-white">🍸 Cocktail</span>
      <span className="button mr-2 is-white">🍶 Sake</span>
    </Flicking>
  </div>;
};
