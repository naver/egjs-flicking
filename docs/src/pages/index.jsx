import React from "react";

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Main from "./Main";

import "@site/src/css/index.css";

export default () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
        <Main />
    </Layout>
  );
}
