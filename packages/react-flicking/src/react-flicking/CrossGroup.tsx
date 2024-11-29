/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import React, { ReactNode, HTMLAttributes } from "react";

interface CrossGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const CrossGroup = React.forwardRef<HTMLDivElement, CrossGroupProps>(
  ({ children, ...rest }, ref) => (
    <div ref={ref} {...rest}>
      {children}
    </div>
  )
);

export default CrossGroup;
