/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import React, { ReactNode } from "react";

const CrossGroup = React.forwardRef((props: { children?: ReactNode }, ref: React.Ref<HTMLDivElement>) => <div ref={ref}>{props.children}</div>);

export default CrossGroup;
