/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Renderer from "./Renderer";

/**
 * A {@link Renderer} that always renders all panel elements inside the camera element
 * @ko 모든 패널 엘리먼트를 카메라 엘리먼트 내에 항상 렌더링하는 종류의 {@link Renderer}
 */
class RawRenderer extends Renderer {
  /**
   * Render panel elements inside the camera element
   * @ko 패널 엘리먼트들을 카메라 엘리먼트 내부에 렌더링합니다
   * @chainable
   * @return {this}
   */
  public render() { return this; }
}

export default RawRenderer;
