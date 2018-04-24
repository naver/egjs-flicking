/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Plugin from "../Plugin";

/**
 * A plugin to add parallax effect attached with flicking interaction.
 * @ko 플리킹 인터렉션에 따른 패럴렉스 효과 플러그인
 * @alias eg.Flicking.plugin.ParallaxEffect
 * @memberof eg.Flicking
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
 * import ParallaxEffect from "@egjs/flicking/dist/plugin/ParallaxEffect";
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
		this.imgs = this.$$.getAllElements().map(
			v => v.querySelector(this.options.selector)
		);

		this.resize();
		this._build();

		return this;
	}

	_build() {
		const $$ = this.$$;
		const utils = Plugin.utils;
		const consts = Plugin.consts;
		const needToHint = this.options.hwAccelerable && consts.SUPPORT_WILLCHANGE;

		// set panel element's style
		utils.css($$._conf.panel.$list, {overflow: "hidden"});

		// set targeted element's style
		this.imgs.forEach((v, i) => {
			let x = -50;

			if (i === 0) {
				x = 50;
			} else if (i === 1) {
				x = 0;
			}

			needToHint && utils.css(v, {willChange: "transform"});
			utils.css(v, {transform: utils.translate(`${x}%`, 0, this.options.useLayerHack)});
		});
	}

	arrange(type) {
		const utils = Plugin.utils;
		const useLayerHack = this.options.useLayerHack;

		if (type !== "resize") {
			this.imgs = (type === "next") ?
				this.imgs.concat(this.imgs.shift()) :
				[this.imgs.pop()].concat(this.imgs);
		}

		utils.css(this.imgs[1], {transform: utils.translate(0, 0, useLayerHack)});

		/next|resize/.test(type) && utils.css(this.imgs[2], {transform: utils.translate("50%", 0, useLayerHack)});
		/prev|resize/.test(type) && utils.css(this.imgs[0], {transform: utils.translate("-50%", 0, useLayerHack)});
	}

	onFlick(e, distance) {
		const utils = Plugin.utils;
		const pos = e.pos;
		const maxRange = this.size;
		const delta = (pos % maxRange) / 2;
		const siblingDelta = -(maxRange / 2 - delta);
		const useLayerHack = this.options.useLayerHack;

		if (Math.abs(distance) >= maxRange) {
			return;
		}

		const update = [];

		if (distance > 0) {
			update.push({el: this.imgs[1], x: delta});
			update.push({el: this.imgs[2], x: siblingDelta});
		} else if (distance < 0) {
			update.push({el: this.imgs[1], x: siblingDelta});
			update.push({el: this.imgs[0], x: delta});
		}

		update.forEach(v => {
			utils.css(v.el, {transform: utils.translate(`${v.x}px`, 0, useLayerHack)});
		});
	}

	onRestore() {
		this.arrange("resize");
	}

	resize() {
		this.size = this.$$._conf.panel.size;
		this.onRestore("resize");
	}

	get() {
		return this.imgs[1];
	}

	getNext() {
		return this.imgs[2];
	}

	getPrev() {
		return this.imgs[0];
	}
}
