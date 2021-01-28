/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "./Camera";

class BoundCamera extends Camera {
  public updateRange() {
    return this;
  }
}

export default BoundCamera;
