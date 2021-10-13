/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ElementProvider from "./ElementProvider";

interface ExternalElementProvider extends ElementProvider {
  rendered: boolean;
  show(): any;
  hide(): any;
}

export default ExternalElementProvider;
