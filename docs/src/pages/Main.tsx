/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
// @ts-ignore
import Link from "@docusaurus/Link";
// @ts-ignore
import useBaseUrl from "@docusaurus/useBaseUrl";

import FavoriteIcon from "../../static/img/icons/favorite.svg";
import StarIcon from "../../static/img/icons/star.svg";

import MainLogo from "./main/MainLogo";
import Features from "./main/Features";
import Frameworks from "./main/Frameworks";

export default () => <>
  <header className="my-4">
    <div className="hero" style={{ overflow: "hidden" }}>
      <MainLogo />
      <div className="block is-flex is-justify-content-center">
        <Link
          className="button mr-2"
          to={useBaseUrl("docs/")}>
            🚀 Get Started
        </Link>
        <Link
          className="button pl-5"
          style={{ borderRadius: "4px 0 0 4px" }}
          to="https://github.com/naver/egjs-flicking">
          <span className="icon is-small mr-2">
            <img src="img/icons/github.svg" />
          </span>
          <span>GitHub</span>
        </Link>
        <Link
          className="button"
          style={{ borderRadius: "0 4px 4px 0", borderLeft: "0" }}
          to="https://github.com/naver/egjs-flicking/stargazers">
          <img src="img/icons/star.svg" />
          <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/naver/egjs-flicking?color=%23ffffff&label=%20&style=for-the-badge" />
        </Link>
      </div>
    </div>
  </header>
  <article className="container mb-6">
    <div className="block mb-6">
      <p className="title"><FavoriteIcon className="main-icon" /> Framework Ready</p>
      <p className="subtitle">Use Flicking in your favorite framework!</p>
      <Frameworks />
    </div>
    <div className="block my-6">
      <p className="title"><StarIcon className="main-icon" /> Features</p>
      <Features />
    </div>
  </article>
  <footer>
    <div className="hero is-medium is-warning">
      <div className="hero-body container">
        <p className="title has-text-dark is-flex is-align-items-center">
          <img className="icon is-medium mr-3" src="img/icons/task_alt.svg" />
          <span>Ready to get started?</span>
        </p>
        <p className="subtitle has-text-dark">Check our Options & Demos to see what you can do with Flicking</p>
        <Link
          className="button is-white m-1"
          to={useBaseUrl("docs/")}>
            🚀 Get Started
        </Link>
        <Link
          className="button is-link m-1"
          to={useBaseUrl("docs/api/Flicking/")}>
            📄 API
        </Link>
        <Link
          className="button is-link m-1"
          to={useBaseUrl("options/")}>
            ⚙️ Options
        </Link>
        <Link
          className="button is-link m-1"
          to={useBaseUrl("demos/")}>
            ✨ Demos
        </Link>
        <Link
          className="button is-link m-1"
          to={useBaseUrl("plugins/")}>
            🛠️ Plugins
        </Link>
        <Link
          className="button is-link m-1"
          to={useBaseUrl("showcases/")}>
            🎭 Showcases
        </Link>
        <Link
          className="button is-link m-1"
          to={useBaseUrl("presets/")}>
            💡 Presets
        </Link>
      </div>
    </div>
  </footer>
</>;
