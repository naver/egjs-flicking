/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Plugin from "../Plugin";

/**
 * A plugin to add horizontal parallax effect attached with flicking interaction.
 * - Should be targeted only one element per panel.
 * - It can't be used with `previewPadding` option.
 * @ko 플리킹 인터렉션에 따른 가로유형 패럴렉스 효과 플러그인.
 * - 각 패널당 한 개의 요소만 지정되어야 한다.
 * - `previewPadding` 옵션과 같이 사용될 수 없다.
 * @alias eg.Flicking.plugin.ParallaxEffect
 * @memberof eg.Flicking.plugin
 * @see eg.Flicking#plugin
 * @see eg.Flicking#plugins
 * @example
 * ```html
 * <div id="flick">
 * 	<div><p style="background-image:url(a.png)">panel 0</p></div>
 * 	<div><p style="background-image:url(b.png)">panel 1</p></div>
 * 	<div><p style="background-image:url(c.png)">panel 2</p></div>
 * </div>
 * ```
 * ```js
 * // as namespace usage
 * new eg.Flicking("#some")
 *  .plugin([
 *      // Apply parallax effect to '<p>' selector matched elements
 *      new eg.Flicking.plugin.ParallaxEffect("p")
 *  ]);
 *
 * // as ESM import usage
 * import Flicking from "@egjs/flicking";
 * import {ParallaxEffect} from "@egjs/flicking-plugins";
 *
 * new Flicking("#some")
 *  .plugin([
 *      new ParallaxEffect("p")
 *  ]);
 * ```
 */
export default class ParallaxEffect extends Plugin {
	/**
	 * Constructor
	 * @param {String} selector Target selector string within panel element<ko>패널 내에 위치한 대상 요소 셀렉터 문자열</ko>
	 */
	constructor(selector) {
		super({selector});
	}

	$componentMount() {
		// select target elements
		this.imgs = this.$$.getAllElements().map(
			v => v.querySelector(this.options.selector)
		);

		this.resize();
		this._build();

		return this;
	}

	_build() {
		const utils = Plugin.utils;
		const currIndex = this._getCurrIndex();

		// set panel element's style
		utils.css(this.getInstanceConf().panel.$list, {overflow: "hidden"});

		// set targeted element's style
		this.imgs.forEach((v, i) => {
			let x = -50;

			if (currIndex > i) {
				x = 50;
			} else if (currIndex === i) {
				x = 0;
			}

			this.useWillChange && utils.css(v, {willChange: "transform"});
			this._setTranslate(v, `${x}%`, 0);
		});
	}

	_setTranslate(el, x, y) {
		el && Plugin.utils.css(el, {
			transform:
				Plugin.utils.translate.apply(null,
					this.$$._getDataByDirection([x, y]).concat(this.useLayerHack)
				)
		});

		return el;
	}


	_getCurrIndex() {
		return this.getInstanceConf().panel.currIndex;
	}

	_getPanel() {
		const index = this._getCurrIndex();

		return {
			prev: this.imgs[index - 1],
			curr: this.imgs[index],
			next: this.imgs[index + 1]
		};
	}

	arrange(type) {
		if (this.$$.options.circular && type !== "resize") {
			this.imgs = (type === "next") ?
				this.imgs.concat(this.imgs.shift()) :
				[this.imgs.pop()].concat(this.imgs);
		}

		const panel = this._getPanel();

		// update panel's translate
		this._setTranslate(panel.curr, 0, 0);

		/next|resize/.test(type) && this._setTranslate(panel.next, "50%", 0);
		/prev|resize/.test(type) && this._setTranslate(panel.prev, "-50%", 0);
	}

	onFlick(e, distance) {
		const pos = e.pos;
		const maxRange = this.size;
		const delta = (pos % maxRange) / 2;
		const siblingDelta = -(maxRange / 2 - delta);

		if (Math.abs(distance) >= maxRange) {
			return;
		}

		const panel = this._getPanel();
		const update = [];

		if (distance > 0 && panel.next) {
			update.push({el: panel.curr, x: delta});
			update.push({el: panel.next, x: siblingDelta});
		} else if (distance < 0 && panel.prev) {
			update.push({el: panel.curr, x: siblingDelta});
			update.push({el: panel.prev, x: delta});
		}

		update.forEach(v => this._setTranslate(v.el, `${v.x}px`, 0));
	}

	onRestore() {
		this.arrange("resize");
	}

	resize() {
		this.size = this.getInstanceConf().panel.size;
		this.onRestore("resize");
	}

	get() {
		return this.imgs[this._getCurrIndex()];
	}
}
