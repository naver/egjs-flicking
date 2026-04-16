import React from "react";

import styles from "./frameworks.module.css";

export default () => {
  return (
    <div className="columns mb-2">
      <div className="column">
        <div className="framework-logo button is-fullwidth is-info">
          <div className="framework-logo-wrapper mr-2">
            <img src="img/icons/react.svg" />
          </div>
          <span>React</span>
        </div>
      </div>
      <div className="column">
        <div className={`framework-logo button is-fullwidth ${styles["is-vue3"]}`}>
          <div className="framework-logo-wrapper mr-2">
            <img src="img/icons/vue.svg" />
          </div>
          <span>Vue 3</span>
        </div>
      </div>
      <div className="column">
        <div className="framework-logo button is-fullwidth is-dark">
          <div className="framework-logo-wrapper mr-2">
            <img src="img/icons/javascript.svg" />
          </div>
          <span>Vanilla JS</span>
        </div>
      </div>
    </div>
  );
};
