import { DIRECTION } from "@egjs/flicking";

import { PAGINATION } from "../../const";
import { addClass, removeClass } from "../../utils";

import Renderer from "./Renderer";

class ScrollBulletRenderer extends Renderer {
  private _bullets: HTMLElement[] = [];
  private _bulletSize: number = 0;
  private _previousIndex: number = -1;
  private _sliderIndex: number = -1;

  public destroy(): void {
    this._bullets = [];
    this._bulletSize = 0;
    this._previousIndex = -1;
    this._sliderIndex = -1;
  }

  public render() {
    const wrapper = this._wrapper;
    const flicking = this._flicking;
    const pagination = this._pagination;
    const renderBullet = pagination.renderBullet;
    const anchorPoints = flicking.camera.anchorPoints;

    const dynamicWrapperClass = `${pagination.classPrefix}-${PAGINATION.SCROLL_WRAPPER_SUFFIX}`;
    const bulletClass = `${pagination.classPrefix}-${PAGINATION.BULLET_SUFFIX}`;
    const sliderClass = `${pagination.classPrefix}-${PAGINATION.SCROLL_SLIDER_SUFFIX}`;
    const uninitClass = `${pagination.classPrefix}-${PAGINATION.SCROLL_UNINIT_SUFFIX}`;

    const sliderEl = document.createElement("div");

    addClass(sliderEl, sliderClass);
    addClass(wrapper, uninitClass);
    addClass(wrapper, dynamicWrapperClass);
    wrapper.appendChild(sliderEl);

    sliderEl.innerHTML = anchorPoints.map((_, index) => renderBullet(bulletClass, index)).join("\n");

    const bullets = [].slice.call(sliderEl.children) as HTMLElement[];

    bullets.forEach((bullet, index) => {
      this._addBulletEvents(bullet, index);
    });

    if (bullets.length <= 0) return;

    const bulletStyle = getComputedStyle(bullets[0]);
    const bulletSize =
      bullets[0].clientWidth + parseFloat(bulletStyle.marginLeft) + parseFloat(bulletStyle.marginRight);

    wrapper.style.width = `${bulletSize * pagination.bulletCount}px`;

    this._bullets = bullets;
    this._bulletSize = bulletSize;
    this._previousIndex = -1;

    this.update(this._flicking.index);

    window.requestAnimationFrame(() => {
      removeClass(wrapper, uninitClass);
    });
  }

  public update(index: number) {
    const pagination = this._pagination;
    const flicking = this._flicking;
    const bullets = this._bullets;
    const prevIndex = this._previousIndex;

    const renderBullet = pagination.renderBullet;
    const renderActiveBullet = pagination.renderActiveBullet;

    const anchorPoints = flicking.camera.anchorPoints;
    const anchorOffset = anchorPoints[0].panel.index;
    const activeIndex = index - anchorOffset;

    if (anchorPoints.length <= 0) return;

    const bulletClass = `${pagination.classPrefix}-${PAGINATION.BULLET_SUFFIX}`;
    const bulletActiveClass = `${pagination.classPrefix}-${PAGINATION.BULLET_ACTIVE_SUFFIX}`;
    const prevClassPrefix = `${pagination.classPrefix}-${PAGINATION.SCROLL_PREV_SUFFIX}`;
    const nextClassPrefix = `${pagination.classPrefix}-${PAGINATION.SCROLL_NEXT_SUFFIX}`;
    const bulletPrevClass = (offset: number) => `${prevClassPrefix}${offset > 1 ? offset : ""}`;
    const bulletNextClass = (offset: number) => `${nextClassPrefix}${offset > 1 ? offset : ""}`;

    const prevClassRegex = new RegExp(`^${prevClassPrefix}`);
    const nextClassRegex = new RegExp(`^${nextClassPrefix}`);

    if (renderActiveBullet) {
      const prevBullet = bullets[prevIndex];
      if (prevBullet) {
        const newBullet = this._createBulletFromString(renderBullet(bulletClass, prevIndex), prevIndex);
        prevBullet.parentElement!.replaceChild(newBullet, prevBullet);
        bullets[prevIndex] = newBullet;
      }

      const activeBullet = bullets[activeIndex];
      if (activeBullet) {
        const newActiveBullet = this._createBulletFromString(renderActiveBullet(bulletClass, activeIndex), activeIndex);

        activeBullet.parentElement!.replaceChild(newActiveBullet, activeBullet);
        bullets[activeIndex] = newActiveBullet;
      }
    }

    bullets.forEach((bullet, idx) => {
      const indexOffset = idx - activeIndex;
      const classList = bullet.className.split(" ");

      for (const className of classList) {
        if (className === bulletActiveClass || prevClassRegex.test(className) || nextClassRegex.test(className)) {
          removeClass(bullet, className);
        }
      }

      if (indexOffset === 0) {
        addClass(bullet, bulletActiveClass);
      } else if (indexOffset > 0) {
        addClass(bullet, bulletNextClass(Math.abs(indexOffset)));
      } else {
        addClass(bullet, bulletPrevClass(Math.abs(indexOffset)));
      }
    });

    pagination.scrollOnChange(activeIndex, {
      total: bullets.length,
      prevIndex,
      sliderIndex: this._sliderIndex,
      direction: activeIndex > prevIndex ? DIRECTION.NEXT : DIRECTION.PREV,
      bullets: [...bullets],
      moveTo: this.moveTo
    });

    this._previousIndex = activeIndex;
  }

  public moveTo = (index: number): void => {
    const pagination = this._pagination;
    const sliderEl = this._wrapper.firstElementChild as HTMLElement;
    const bulletSize = this._bulletSize;
    const wrapperSize = bulletSize * pagination.bulletCount;

    sliderEl.style.transform = `translate(${wrapperSize / 2 - (index + 0.5) * bulletSize}px)`;
    this._sliderIndex = index;
  };
}

export default ScrollBulletRenderer;
