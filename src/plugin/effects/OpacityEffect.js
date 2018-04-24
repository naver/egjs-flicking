/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Plugin from "../Plugin";

/**
 * A plugin to add opacity effect attached with flicking interaction.
 * @ko 플리킹 인터렉션에 따른 투명도 조절 효과 플러그인
 * @alias eg.Flicking.plugin.OpacityEffect
 * @memberof eg.Flicking
 * @see eg.Flicking#plugin
 * @see eg.Flicking#plugins
 * @example
 * ```html
 * <div id="flick">
 * 	<div><p>panel 0 <span class="text">abc</span></p></div>
 * 	<div><p>panel 1 <span class="text">abc</span></p></div>
 * 	<div><p>panel 2 <span class="text">abc</span></p></div>
 * </div>
 * ```
 * ```js
 * // as namespace usage
 * new eg.Flicking("#some")
 *  .plugin([
 *      // Apply opacity effect to '<span>' selector matched elements
 *      new eg.Flicking.plugin.OpacityEffect("span")
 *  ]);
 *
 * // as ESM import usage
 * import Flicking from "@egjs/flicking";
 * import OpacityEffect from "@egjs/flicking/dist/plugin/OpacityEffect";
 *
 * new Flicking("#some")
 *  .plugin([
 *      new OpacityEffect("span")
 *  ]);
 * ```
 */
export default class OpacityEffect extends Plugin {
	/**
	 * Constructor
	 * @param {String} selector Target element selector string <ko>대상 요소 셀렉터 문자열</ko>
	 */
	constructor(selector) {
		super({selector});
	}

	$componentMount() {
		this.details = Plugin.utils.toArray(
			this.$$.$wrapper.querySelectorAll(this.options.selector)
		);

		this._build();
		this.resize();

		return this;
	}

	_build() {
		this.details = [this.details.pop()].concat(this.details);
	}

	resize() {
		this.size = Plugin.utils.css(this.$$.$wrapper, "width", true);
		this.onRestore("resize");
	}

	arrange(type) {
		const utils = Plugin.utils;

		if (type !== "resize") {
			this.details = (type === "next") ?
				this.details.concat(this.details.shift()) :
				[this.details.pop()].concat(this.details);
		}

		utils.css(this.details[1], {opacity: ""});
		utils.classList(this.details[1], "selected", true);

		/next|resize/.test(type) && utils.classList(utils.css(this.details[0], {opacity: ""}), "selected", false);
		/prev|resize/.test(type) && utils.classList(utils.css(this.details[2], {opacity: ""}), "selected", false);
	}

	onFlick(pos, offset) {
		const per = (pos % this.size) / this.size;
		const utils = Plugin.utils;

		if (Math.abs(offset) >= this.size) {
			return;
		}

		const opacity = (offset > 0 && per <= 0.5 && 1 - (2 * per)) ||
			(offset < 0 && per > 0.5 && 2 * (per - 0.5));

		if (opacity !== undefined) {
			utils.css(this.details[1], {opacity});
		}
	}

	onRestore() {
		this.arrange("resize");
	}

	get() {
		return this.details[1];
	}

	getNext() {
		return this.details[2];
	}

	getPrev() {
		return this.details[0];
	}
}
