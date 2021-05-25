/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
// @ts-ignore
import Link from "@docusaurus/Link";
// @ts-ignore
import useBaseUrl from "@docusaurus/useBaseUrl";
// @ts-ignore
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return <header>
    <div className="container">
      <img className="flicking-logo" src="img/flicking.svg" />
      <p className="hero__subtitle">{siteConfig.tagline}</p>
      <Link
        className="button is-outlined is-primary"
        to={useBaseUrl("docs/")}>
        Get Started
      </Link>
    </div>
  </header>;
};
