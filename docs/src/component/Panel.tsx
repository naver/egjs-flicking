import React from "react";

export default React.forwardRef(({ index, className = "", color = "primary", ...others }: { index: number; color?: string; className?: string }, ref: React.Ref<HTMLDivElement>) => {
  const shouldApplyBlackText = ["warning", "white"];
  const textColor = shouldApplyBlackText.includes(color) ? "dark" : "white";

  return <div ref={ref} className={`flicking-panel has-background-${color} has-text-${textColor} is-size-1 ${className}`} {...others}>
    <span className="flicking-index">{ index + 1 }</span>
  </div>;
});
