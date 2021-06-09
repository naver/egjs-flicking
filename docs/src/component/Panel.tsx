import React from "react";

export default React.forwardRef(({ index, className = "", color = "primary", ...others }: { index: number; color?: string; className?: string }, ref: React.Ref<HTMLDivElement>) => <div ref={ref} className={`flicking-panel has-background-${color} has-text-${color === "warning" ? "dark" : "white"} is-size-1 ${className}`} {...others}>
  <span className="flicking-index">{ index + 1 }</span>
</div>);
