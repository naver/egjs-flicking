/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import React, { ReactNode } from "react";

const ViewportSlot = React.memo((props: { children?: ReactNode }) => <>{props.children}</>);

export default ViewportSlot;
