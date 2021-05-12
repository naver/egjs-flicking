import React from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default ({ className = "", html }) => <div className={`shopping-panel ${className}`} dangerouslySetInnerHTML={{ __html: html }}></div>;
