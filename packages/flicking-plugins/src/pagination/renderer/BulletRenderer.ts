import { PAGINATION } from "../../const";
import { addClass, removeClass } from "../../utils";

import Renderer from "./Renderer";

class BulletRenderer extends Renderer {
  private _bullets: HTMLElement[] = [];
  private _prevIndex: number = -1;

  private get _bulletClass() {
    const pagination = this._pagination;
    return `${pagination.classPrefix}-${PAGINATION.BULLET_SUFFIX}`;
  }

  private get _activeClass() {
    const pagination = this._pagination;
    return `${pagination.classPrefix}-${PAGINATION.BULLET_ACTIVE_SUFFIX}`;
  }

  public destroy() {
    this._bullets = [];
    this._prevIndex = -1;
  }

  public render() {
    const flicking = this._flicking;
    const pagination = this._pagination;
    const wrapper = this._wrapper;
    const bulletClass = this._bulletClass;
    const activeClass = this._activeClass;
    const renderBullet = pagination.renderBullet;
    const renderActiveBullet = pagination.renderActiveBullet;
    const bulletWrapperClass = `${pagination.classPrefix}-${PAGINATION.BULLET_WRAPPER_SUFFIX}`;
    const anchorPoints = flicking.camera.anchorPoints;

    addClass(wrapper, bulletWrapperClass);
    this._prevIndex = -1;

    wrapper.innerHTML = anchorPoints
      .map((anchorPoint, index) => {
        if (renderActiveBullet && anchorPoint.panel.index === flicking.index) {
          return renderActiveBullet(bulletClass, index);
        } else {
          return renderBullet(bulletClass, index);
        }
      })
      .join("\n");

    const bullets = [].slice.call(wrapper.children) as HTMLElement[];

    bullets.forEach((bullet, index) => {
      const anchorPoint = anchorPoints[index];

      if (anchorPoint.panel.index === flicking.index) {
        addClass(bullet, activeClass);
        this._prevIndex = index;
      }

      this._addBulletEvents(bullet, index);
    });

    this._bullets = bullets;
  }

  public update(index: number) {
    const flicking = this._flicking;
    const pagination = this._pagination;
    const wrapper = this._wrapper;
    const bulletClass = this._bulletClass;
    const activeClass = this._activeClass;
    const anchorPoints = flicking.camera.anchorPoints;
    const renderBullet = pagination.renderBullet;
    const renderActiveBullet = pagination.renderActiveBullet;

    if (anchorPoints.length <= 0) return;

    // Anchors can change without panelChange (e.g. on resize), so redraw bullets to match them
    if (this._bullets.length !== anchorPoints.length) {
      this.render();
    }

    const bullets = this._bullets;
    const prevIndex = this._prevIndex;

    const anchorOffset = anchorPoints[0].panel.index;
    const activeBulletIndex = index - anchorOffset;

    const activeBullet = bullets[activeBulletIndex];

    if (prevIndex === activeBulletIndex || !activeBullet) return;

    if (renderActiveBullet) {
      const prevBullet = bullets[prevIndex];
      if (prevBullet) {
        const newBullet = this._createBulletFromString(renderBullet(bulletClass, prevIndex), prevIndex);
        prevBullet.parentElement!.replaceChild(newBullet, prevBullet);
        bullets[prevIndex] = newBullet;
      }

      const newActiveBullet = this._createBulletFromString(
        renderActiveBullet(`${bulletClass} ${activeClass}`, activeBulletIndex),
        activeBulletIndex
      );

      wrapper.replaceChild(newActiveBullet, activeBullet);
      bullets[activeBulletIndex] = newActiveBullet;
    } else {
      const prevBullet = bullets[prevIndex];

      if (prevBullet) {
        removeClass(prevBullet, activeClass);
      }

      addClass(activeBullet, activeClass);
    }

    this._prevIndex = activeBulletIndex;
  }
}

export default BulletRenderer;
