/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
// @ts-ignore
import Link from "@docusaurus/Link";
// @ts-ignore
import useBaseUrl from "@docusaurus/useBaseUrl";

export default () => <div className="columns">
  <div className="column">
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/typescript.svg" />
        </figure>
        <span className="subtitle has-text-black">Typescript</span>
      </div>
      <div className="block">
        <p>Flicking is fully written in <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>, and every classes, properties, and events are correctly typed and exported.</p>
      </div>
    </div>
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/nuxt.svg" />
        </figure>
        <span className="subtitle has-text-black">SSR</span>
      </div>
      <div className="block">
        Flicking is designed to support Server-Side Rendering(SSR), and can be used with famous SSR frameworks like <a href="https://nextjs.org/" target="_blank">Next.js</a> or <a href="https://nuxtjs.org/" target="_blank">Nuxt.js</a>.
      </div>
    </div>
  </div>
  <div className="column">
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/books.svg" />
        </figure>
        <span className="subtitle has-text-black">Rich API</span>
      </div>
      <div className="block">
        <p>Flicking comes with a rich API. You can use it to create your own customized Flicking & Plugins.</p>
        <p>
          Check our <Link to={useBaseUrl("docs/api/Flicking")}>API Docs</Link>
        </p>
      </div>
    </div>
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/extension.svg" />
        </figure>
        <span className="subtitle has-text-black">Plugins</span>
      </div>
      <div className="block">
        <p>Flicking can be enhanced with a set of plugins, like AutoPlay, Fade, and Parallax.</p>
        <p>
          See more at <Link to={useBaseUrl("plugins")}>Plugins</Link>
        </p>
      </div>
    </div>
  </div>
  <div className="column">
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/internetexplorer.svg" />
        </figure>
        <span className="subtitle has-text-black">Supports IE9+ (With polyfills)</span>
      </div>
      <div>
        <p>With the Promise polyfill and flicking-inline CSS, Flicking can support Internet Explorer 9+</p>
        <p>⚠️ IE 11+ for Angular & Svelte</p>
      </div>
    </div>
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/arrow_right.svg" />
        </figure>
        <span className="subtitle has-text-black">Progress</span>
      </div>
      <div className="block">
        <p>Flicking supports progress, which can help to create the most fluent & smooth animation along the panel movement.</p>
        <ul>
          <li><Link to={useBaseUrl("docs/api/Camera#progress")}>camera.progress</Link></li>
          <li><Link to={useBaseUrl("docs/api/Panel#progress")}>panel.progress</Link></li>
          <li><Link to={useBaseUrl("docs/api/Panel#outsetProgress")}>panel.outsetProgress</Link></li>
        </ul>
      </div>
    </div>
  </div>
</div>;
