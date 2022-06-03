/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import React from "react";

const ViewportSlot = React.memo((props: { children?: React.ReactElement[] | React.ReactElement }) => <>{props.children}</>);

export default ViewportSlot;
