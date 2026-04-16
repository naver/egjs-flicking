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
    const bullets = this._bullets;
    const bulletClass = this._bulletClass;
    const activeClass = this._activeClass;
    const prevIndex = this._prevIndex;
    const anchorPoints = flicking.camera.anchorPoints;
    const renderBullet = pagination.renderBullet;
    const renderActiveBullet = pagination.renderActiveBullet;

    if (anchorPoints.length <= 0) return;

    const anchorOffset = anchorPoints[0].panel.index;
    const activeBulletIndex = index - anchorOffset;

    if (prevIndex === activeBulletIndex) return;

    if (renderActiveBullet) {
      const prevBullet = bullets[prevIndex];
      if (prevBullet) {
        const newBullet = this._createBulletFromString(renderBullet(bulletClass, prevIndex), prevIndex);
        prevBullet.parentElement!.replaceChild(newBullet, prevBullet);
        bullets[prevIndex] = newBullet;
      }

      const activeBullet = bullets[activeBulletIndex];
      const newActiveBullet = this._createBulletFromString(
        renderActiveBullet(`${bulletClass} ${activeClass}`, activeBulletIndex),
        activeBulletIndex
      );

      wrapper.replaceChild(newActiveBullet, activeBullet);
      bullets[activeBulletIndex] = newActiveBullet;
    } else {
      const activeBullet = bullets[activeBulletIndex];
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
