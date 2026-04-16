/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-expect-error
import Link from "@docusaurus/Link";
// @ts-expect-error
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

import StarIcon from "../../static/img/icons/star.svg";
import Features from "./main/Features";
import MainLogo from "./main/MainLogo";

export default () => (
  <>
    <header className="my-4">
      <div className="hero" style={{ overflow: "hidden" }}>
        <MainLogo />
        <p className="subtitle has-text-centered has-text-grey-dark mb-4">
          Reliable, flexible and extendable carousel component.
        </p>
        <div className="block is-flex is-justify-content-center">
          <Link className="button mr-2" to={useBaseUrl("docs/guide/quickstart")}>
            🚀 Get Started
          </Link>
          <Link
            className="button pl-5"
            style={{ borderRadius: "4px 0 0 4px" }}
            to="https://github.com/naver/egjs-flicking"
          >
            <span className="icon is-small mr-2">
              <img src="img/icons/github.svg" />
            </span>
            <span>GitHub</span>
          </Link>
          <Link
            className="button"
            style={{ borderRadius: "0 4px 4px 0", borderLeft: "0" }}
            to="https://github.com/naver/egjs-flicking/stargazers"
          >
            <img src="img/icons/star.svg" />
            <img
              alt="GitHub Repo stars"
              src="https://img.shields.io/github/stars/naver/egjs-flicking?color=%23ffffff&label=%20&style=for-the-badge"
            />
          </Link>
        </div>
      </div>
    </header>
    <article className="container mb-6">
      <div className="block my-6">
        <p className="title">
          <StarIcon className="main-icon" /> Features
        </p>
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
          <div className="columns mt-3">
            <div className="column">
              <p className="title is-5 has-text-dark">🚀 Guide</p>
              <p className="has-text-dark">Installation, quick start, and framework setup for React and Vue 3.</p>
              <Link className="button is-white mt-3" to={useBaseUrl("docs/guide/quickstart")}>
                Get Started
              </Link>
            </div>
            <div className="column">
              <p className="title is-5 has-text-dark">✨ Demos</p>
              <p className="has-text-dark">
                Circular, AutoPlay, Fade, Parallax, Virtual Scroll and more — with a built-in live code editor.
              </p>
              <Link className="button is-white mt-3" to={useBaseUrl("docs/demos/basic/default")}>
                Explore Demos
              </Link>
            </div>
            <div className="column">
              <p className="title is-5 has-text-dark">📄 API</p>
              <p className="has-text-dark">Full reference for all classes, options, events, and properties.</p>
              <Link className="button is-white mt-3" to={useBaseUrl("docs/api/classes/Flicking")}>
                API Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
);
