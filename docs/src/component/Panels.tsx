import React from "react";

export default ({ count }) => <>{(Array.apply(0, Array(count)) as number[]).map((_, idx) => <div key={idx} className="flicking-panel has-background-primary has-text-white is-size-1">{ idx + 1 }</div>)}</>;
