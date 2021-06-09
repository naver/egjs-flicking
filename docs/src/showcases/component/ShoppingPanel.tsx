import React from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default React.forwardRef(({ className = "", html }: { className: string; html: string }, ref: React.Ref<HTMLDivElement>) => <div ref={ref} className={`shopping-panel ${className}`} dangerouslySetInnerHTML={{ __html: html }}></div>);
