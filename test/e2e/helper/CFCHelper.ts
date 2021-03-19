// eslint-disable-next-line @typescript-eslint/no-var-requires
const Helper = require("@codeceptjs/helper");

interface BBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

class CFCHelper extends Helper {
  public async seeElementInViewport(cssSelector: string) {
    const I = this.helpers.Playwright as CodeceptJS.I;

    const viewportBox = await I.grabElementBoundingRect(".flicking-viewport") as BBox;
    const box = await I.grabElementBoundingRect(cssSelector) as BBox;

    const canSee = this._canSee(box, viewportBox);

    if (!canSee) {
      throw new Error("Element is not visible in the current viewport");
    }
  }

  public async dontSeeElementInViewport(cssSelector: string) {
    const I = this.helpers.Playwright as CodeceptJS.I;

    const viewportBox = await I.grabElementBoundingRect(".flicking-viewport") as BBox;
    const box = await I.grabElementBoundingRect(cssSelector) as BBox;

    const canSee = this._canSee(box, viewportBox);

    if (canSee) {
      throw new Error("Element is visible in the current viewport");
    }
  }

  private _canSee(box: BBox, viewportBox: BBox) {
    return box.y < viewportBox.y + viewportBox.height &&
      box.x < viewportBox.x + viewportBox.width &&
      box.y + box.height > viewportBox.y &&
      box.x + box.width > viewportBox.x;
  }
}

export default CFCHelper;
module.exports = CFCHelper;
