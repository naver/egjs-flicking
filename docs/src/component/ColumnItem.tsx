import React from "react";

export default ({ children, is, className }) => {
  const classes = ["column"];

  if (is) {
    classes.push(`is-${is}`);
  }
  if (className) {
    classes.push(className);
  }

  return <div className={classes.join(" ")}>{ children }</div>;
};
