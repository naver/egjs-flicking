import React from "react";

import Panel from "./Panel";

export default (count: number) => (Array.apply(0, Array(count)) as number[]).map((_, idx) => <Panel key={idx} index={idx} />);
