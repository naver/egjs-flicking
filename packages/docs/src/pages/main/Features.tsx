/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-expect-error
import Link from "@docusaurus/Link";
// @ts-expect-error
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

import styles from "./features.module.css";

const features = [
  {
    title: "Framework",
    icon: "img/icons/react.svg",
    desc: "Use Flicking with React, Vue 3, or Vanilla JS.",
    link: { label: "Quick Start", to: "docs/guide/quickstart" }
  },
  {
    title: "TypeScript",
    icon: "img/icons/typescript.svg",
    desc: "Fully typed API with exported types for all classes, properties, and events.",
    link: { label: "API Docs", to: "docs/api/classes/Flicking" }
  },
  {
    title: "SSR Ready",
    icon: "img/icons/nuxt.svg",
    desc: "Designed for Server-Side Rendering. Works with Next.js and Nuxt.",
    link: { label: "SSR Guide", to: "docs/guide/ssr" }
  },
  {
    title: "Plugins",
    icon: "img/icons/extension.svg",
    desc: "AutoPlay, Fade, Parallax, Arrow, Pagination and more.",
    link: { label: "See Plugins", to: "docs/demos/plugins/fade" }
  },
  {
    title: "Reactive API",
    icon: "img/icons/arrow_right.svg",
    desc: "Track camera and panel progress to build dynamic animations and custom UI.",
    link: { label: "See Demos", to: "docs/demos/reactive/progress-bar" }
  }
];

export default () => (
  <div className="columns">
    {features.map(f => (
      <div key={f.title} className={`column is-flex ${styles["column-one-fifth"]}`}>
        <div className="box is-flex-grow-1">
          <div className="block is-flex is-flex-direction-row is-align-items-center">
            <figure className="image is-32x32 mx-5">
              <img src={f.icon} />
            </figure>
            <span className="subtitle has-text-black">{f.title}</span>
          </div>
          <div className="block">
            <p>{f.desc}</p>
            {f.link && (
              <p>
                <Link to={useBaseUrl(f.link.to)}>{f.link.label}</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);
