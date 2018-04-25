/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Plugin from "../Plugin";

/**
 * A plugin to add horizontal parallax effect attached with flicking interaction.
 * @ko 플리킹 인터렉션에 따른 가로유형 패럴렉스 효과 플러그인
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

		// set panel element's style
		utils.css(this.getInstanceConf().panel.$list, {overflow: "hidden"});

		// set targeted element's style
		this.imgs.forEach((v, i) => {
			let x = -50;

			if (i === 0) {
				x = 50;
			} else if (i === 1) {
				x = 0;
			}

			this.useWillChange && utils.css(v, {willChange: "transform"});
			this._setTranslate(v, `${x}%`, 0);
		});
	}

	_setTranslate(el, x, y) {
		Plugin.utils.css(el, {
			transform:
				Plugin.utils.translate.apply(null,
					this.$$._getDataByDirection([x, y]).concat(this.useLayerHack)
				)
		});

		return el;
	}

	arrange(type) {
		if (type !== "resize") {
			this.imgs = (type === "next") ?
				this.imgs.concat(this.imgs.shift()) :
				[this.imgs.pop()].concat(this.imgs);
		}

		this._setTranslate(this.imgs[1], 0, 0);

		/next|resize/.test(type) && this._setTranslate(this.imgs[2], "50%", 0);
		/prev|resize/.test(type) && this._setTranslate(this.imgs[0], "-50%", 0);
	}

	onFlick(e, distance) {
		const pos = e.pos;
		const maxRange = this.size;
		const delta = (pos % maxRange) / 2;
		const siblingDelta = -(maxRange / 2 - delta);

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
		return this.imgs[1];
	}
}
