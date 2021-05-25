import React from "react";

export default ({ index, className = "", color = "primary", ...others }: { index: number; color?: string; className?: string }) => <div className={`flicking-panel has-background-${color} has-text-${color === "warning" ? "dark" : "white"} is-size-1 ${className}`} {...others}>
  <span className="flicking-index">{ index + 1 }</span>
</div>;
