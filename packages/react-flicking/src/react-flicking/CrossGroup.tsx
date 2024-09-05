/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import React, { ReactNode } from "react";

const CrossGroup = React.memo((props: { children?: ReactNode }) => <>{props.children}</>);

export default CrossGroup;
