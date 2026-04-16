import { PAGINATION } from "../../const";
import { addClass } from "../../utils";

import Renderer from "./Renderer";

class FractionRenderer extends Renderer {
  private _prevIndex: number = -1;
  private _prevTotal: number = -1;

  public destroy(): void {
    this._prevIndex = -1;
    this._prevTotal = -1;
  }

  public render() {
    const flicking = this._flicking;
    const wrapper = this._wrapper;
    const pagination = this._pagination;
    const fractionWrapperClass = `${pagination.classPrefix}-${PAGINATION.FRACTION_WRAPPER_SUFFIX}`;
    const fractionCurrentClass = `${pagination.classPrefix}-${PAGINATION.FRACTION_CURRENT_SUFFIX}`;
    const fractionTotalClass = `${pagination.classPrefix}-${PAGINATION.FRACTION_TOTAL_SUFFIX}`;

    addClass(wrapper, fractionWrapperClass);

    wrapper.innerHTML = pagination.renderFraction(fractionCurrentClass, fractionTotalClass);

    this.update(flicking.index);
  }

  public update(index: number) {
    const flicking = this._flicking;
    const wrapper = this._wrapper;
    const pagination = this._pagination;

    const anchorPoints = flicking.camera.anchorPoints;
    const currentIndex = anchorPoints.length > 0 ? index - anchorPoints[0].panel.index + 1 : 0;
    const anchorCount = anchorPoints.length;

    if (currentIndex === this._prevIndex && anchorCount === this._prevTotal) return;

    const fractionCurrentSelector = `.${pagination.classPrefix}-${PAGINATION.FRACTION_CURRENT_SUFFIX}`;
    const fractionTotalSelector = `.${pagination.classPrefix}-${PAGINATION.FRACTION_TOTAL_SUFFIX}`;

    const currentWrapper = wrapper.querySelector(fractionCurrentSelector) as HTMLElement;
    const totalWrapper = wrapper.querySelector(fractionTotalSelector) as HTMLElement;

    currentWrapper.innerHTML = pagination.fractionCurrentFormat(currentIndex);
    totalWrapper.innerHTML = pagination.fractionTotalFormat(anchorCount);

    this._prevIndex = currentIndex;
    this._prevTotal = anchorCount;
  }
}

export default FractionRenderer;
