/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef, useState, useEffect } from "react";
import Flicking from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import { Sync } from "@egjs/flicking-plugins";

import JSCode from "./Sync-code/camera/js";
import ReactCode from "./Sync-code/camera/react";
import VueCode from "./Sync-code/camera/vue";
import AngularCode from "./Sync-code/camera/angular";
import SvelteCode from "./Sync-code/camera/svelte";

import JSCode_Index from "./Sync-code/index/js";
import ReactCode_Index from "./Sync-code/index/react";
import VueCode_Index from "./Sync-code/index/vue";
import AngularCode_Index from "./Sync-code/index/angular";
import SvelteCode_Index from "./Sync-code/index/svelte";

export default () => {
  const flicking0 = useRef<Flicking>();
  const flicking1 = useRef<Flicking>();
  const flicking2 = useRef<Flicking>();

  const flicking3 = useRef<Flicking>();
  const flicking4 = useRef<Flicking>();

  const [plugins, setPlugins] = useState([]);
  const [plugins2, setPlugins2] = useState([]);

  useEffect(() => {
    setPlugins([new Sync({
      type: "camera",
      synchronizedFlickingOptions: [
        {
          flicking: flicking0.current,
          isClickable: false
        },
        {
          flicking: flicking1.current,
          isClickable: false
        },
        {
          flicking: flicking2.current,
          isClickable: false
        }
      ]
    })]);

    setPlugins2([new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        {
          flicking: flicking3.current,
          isSlidable: true
        },
        {
          flicking: flicking4.current,
          isClickable: true,
          activeClass: "active"
        }
      ]
    })]);
  }, []);

  return <><div className="has-background-grey-lighter p-4 mb-4">
    <Flicking ref={flicking0}
      className="mb-4"
      align="prev"
      bound={true}
      bounce={30}
      plugins={plugins} >
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
      bounce={30}>
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
      bounce={30}>
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
  </div>

  <SourceCode
    options={{ bound: true, bounce: 30, align: "prev" }} panels={[]}
    js={JSCode}
    react={ReactCode}
    vue={VueCode}
    vue3={VueCode}
    angular={AngularCode}
    preact={ReactCode}
    svelte={SvelteCode}
  />

  <div className="p-4 mb-4">
    <Flicking ref={flicking3}
      className="mb-4"
      bounce={30}
      plugins={plugins2} >
      <div className="flicking-panel full has-background-primary">
        <img className="panel-image" src={require("@site/static/img/demo/bg01.jpg").default} />
      </div>
      <div className="flicking-panel full has-background-primary">
        <img className="panel-image" src={require("@site/static/img/demo/bg02.jpg").default} />
      </div>
      <div className="flicking-panel full has-background-primary">
        <img className="panel-image" src={require("@site/static/img/demo/bg03.jpg").default} />
      </div>
      <div className="flicking-panel full has-background-primary">
        <img className="panel-image" src={require("@site/static/img/demo/bg04.jpg").default} />
      </div>
      <div className="flicking-panel full has-background-primary">
        <img className="panel-image" src={require("@site/static/img/demo/bg05.jpg").default} />
      </div>
      <div className="flicking-panel full has-background-primary">
        <img className="panel-image" src={require("@site/static/img/demo/bg06.jpg").default} />
      </div>
    </Flicking>
    <Flicking ref={flicking4}
      bound={true}
      moveType="freeScroll"
      bounce={30}>
      <div className="flicking-panel thumb has-background-primary">
        <img className="thumb-image" src={require("@site/static/img/demo/bg01.jpg").default} />
      </div>
      <div className="flicking-panel thumb has-background-primary">
        <img className="thumb-image" src={require("@site/static/img/demo/bg02.jpg").default} />
      </div>
      <div className="flicking-panel thumb has-background-primary">
        <img className="thumb-image" src={require("@site/static/img/demo/bg03.jpg").default} />
      </div>
      <div className="flicking-panel thumb has-background-primary">
        <img className="thumb-image" src={require("@site/static/img/demo/bg04.jpg").default} />
      </div>
      <div className="flicking-panel thumb has-background-primary">
        <img className="thumb-image" src={require("@site/static/img/demo/bg05.jpg").default} />
      </div>
      <div className="flicking-panel thumb has-background-primary">
        <img className="thumb-image" src={require("@site/static/img/demo/bg06.jpg").default} />
      </div>
    </Flicking>
  </div>

  <SourceCode
    options={{ bound: true, bounce: 30, align: "prev" }} panels={[]}
    js={JSCode_Index}
    react={ReactCode_Index}
    vue={VueCode_Index}
    vue3={VueCode_Index}
    angular={AngularCode_Index}
    preact={ReactCode_Index}
    svelte={SvelteCode_Index}
  />

  </>;
};
