import React from "react";

import Panel from "./Panel";

export default React.forwardRef(({ ...props }: { index: number; color?: string; className?: string }, ref: React.Ref<HTMLAnchorElement>) => <a ref={ref} href="https://naver.com" className="panel-with-link">
  <Panel { ...props } />
</a>);
