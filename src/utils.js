/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import {window, document} from "./browser";

const utils = {
	/**
	 * Select or create element
	 * @param {String|HTMLElement} param
	 *  when string given is as HTML tag, then create element
	 *  otherwise it returns selected elements
	 * @returns {HTMLElement}
	 */
	$(param) {
		let el = null;

		if (typeof param === "string") {
			// check if string is HTML tag format
			const match = param.match(/^<([a-z]+)\s*([^>]*)>/);

			// creating element
			if (match) {
				el = document.createElement(match[1]);

				// attributes
				match.length === 3 &&
					match[2].split(" ").forEach(v => {
						const attr = v.split("=");

						el.setAttribute(attr[0], attr[1].trim().replace(/(^["']|["']$)/g, ""));
					});
			} else {
				el = document.querySelectorAll(param);

				if (!el.length) {
					el = null;
				} else if (el.length === 1) {
					el = el[0];
				}
			}
		} else if (param.nodeName && param.nodeType === 1) {
			el = param;
		}

		return el;
	},

	/**
	 * Converts to array
	 * @param {HTMLCollection|HTMLElement} el
	 * @returns {Array}
	 */
	toArray(el) {
		return [].slice.call(el);
	},

	/**
	 * Check if is array
	 * @param arr
	 * @returns {Boolean}
	 */
	isArray(arr) {
		return arr && arr.constructor === Array;
	},

	/**
	 * Check if is object
	 * @param {Object} obj
	 * @returns {Boolean}
	 */
	isObject(obj) {
		return obj && !obj.nodeType && typeof obj === "object" && !this.isArray(obj);
	},

	/**
	 * Merge object returning new object
	 * @param {Object} target
	 * @param {Object} objectN
	 * @returns {Object} merged target object
	 * @example
	 *  var target = { a: 1 };
	 *  utils.extend(target, { b: 2, c: 3 });
	 *  target;  // { a: 1, b: 2, c: 3 };
	 */
	extend(target, ...objectN) {
		if (!objectN.length || (objectN.length === 1 && !objectN[0])) {
			return target;
		}

		const source = objectN.shift();

		if (this.isObject(target) && this.isObject(source)) {
			Object.keys(source).forEach(key => {
				const value = source[key];

				if (this.isObject(value)) {
					!target[key] && (target[key] = {});

					target[key] = this.extend(target[key], value);
				} else {
					target[key] = this.isArray(value) ?
						value.concat() : value;
				}
			});
		}

		return this.extend(target, ...objectN);
	},

	/**
	 * Get or set the style value or apply
	 * @param {HTMLElement|Array} el
	 * @param {String|Object} style
	 *  String: return style property value
	 *  Object: set style value
	 * @param {Boolean} getAsNumber Get the value as number
	 * @returns {String|HTMLElement}
	 */
	css(el, style, getAsNumber) {
		if (typeof(style) === "string") {
			const value = window.getComputedStyle(el)[style];

			return getAsNumber ? this.getNumValue(value) : value;
		} else {
			const applyStyle = (target, source) =>
				Object.keys(source).forEach(v => {
					target[v] = source[v];
				});

			this.isArray(el) ?
				el.forEach(v => applyStyle(v.style, style)) :
				applyStyle(el.style, style);
		}

		return el;
	},

	/**
	 * classList
	 * @param {HTMLElement} el target DOM element
	 * @param {String} className class name string to be handled
	 * @param {Boolean} add Add or remove class - true: Add, false: Remove
	 * @return {Boolean} if add param is missing, then return existence of class name
	 */
	classList(el, className, add) {
		const isAddParam = typeof add === "boolean";
		let res;

		if (el.classList) {
			res = el.classList[
				(isAddParam && (add ? "add" : "remove")) || "contains"
			](className);
		} else {
			res = el.className;

			if (isAddParam) {
				if (add && res.indexOf(className) === -1) {
					res = el.className = (`${res} ${className}`).replace(/\s{2,}/g, " ");
				} else if (!add) {
					res = el.className = res.replace(className, "");
				}
			} else {
				res = new RegExp(`\\b${className}\\b`).test(res);
			}
		}

		return res;
	},

	/**
	 * Check and parse value to number
	 * @param {Number|String} val
	 * @param {Number} defVal
	 * @return {Number}
	 */
	getNumValue(val, defVal) {
		let num = val;

		return isNaN(num = parseFloat(num)) ? defVal : num;
	},

	/**
	 * Return unit formatted value
	 * @param {Number|String} val
	 * @return {String} val Value formatted with unit
	 */
	getUnitValue(val) {
		const rx = /(?:[a-z]{2,}|%)$/;

		return (parseFloat(val) || 0) + (String(val).match(rx) || "px");
	},

	/**
	 * Get element's outer value
	 * @param {HTMLElement} el
	 * @param {String} type - [outerWidth|outerHeight]
	 * @returns {Number} outer's value
	 */
	getOuter(el, type) {
		const style = window.getComputedStyle(el);
		let paddingMargin = 0;

		(type === "outerWidth" ?
			["Left", "Right"] :
			["Top", "Bottom"]
		).forEach(dir => {
			["padding", "margin"].forEach(v => {
				paddingMargin += this.getNumValue(style[`${v}${dir}`]);
			});
		});

		return this.getNumValue(style[type.replace("outer", "").toLocaleLowerCase()]) + paddingMargin;
	},

	/**
	 * Get element's outerWidth value with margin
	 * @param {HTMLElement} el
	 * @returns {Number}
	 */
	outerWidth(el) {
		return this.getOuter(el, "outerWidth");
	},

	/**
	 * Get element's outerHeight value with margin
	 * @param {HTMLElement} el
	 * @returns {Number}
	 */
	outerHeight(el) {
		return this.getOuter(el, "outerHeight");
	},

	/**
	 * Returns the syntax of the translate style which is applied to CSS transition properties.
	 *
	 * @ko CSS 트랜지션 속성에 적용할 translate 스타일 구문을 반환한다
	 * @method eg#translate
	 * @param {String} x Distance to move along the X axis <ko>x축을 따라 이동할 거리</ko>
	 * @param {String} y Distance to move along the Y axis <ko>y축을 따라 이동할 거리</ko>
	 * @param {Boolean} [isHA] Force hardware acceleration <ko>하드웨어 가속 사용 여부</ko>
	 * @return {String} Syntax of the translate style <ko>translate 스타일 구문</ko>
	 */
	translate(x, y, isHA) {
		return isHA || false ?
			`translate3d(${x},${y},0)` : `translate(${x},${y})`;
	},

	// 1. user press one position on screen.
	// 2. user moves to the other position on screen.
	// 3. when user releases fingers on screen, 'click' event is fired at previous position.
	hasClickBug() {
		const ua = window.navigator.userAgent;
		const result = /Safari/.test(ua);

		this.hasClickBug = () => result;
		return result;
	}
};

class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass || class {};
	}

	with(...mixins) {
		return mixins.reduce((c, m) => m(c), this.superclass);
	}
}

const Mixin = superclass => new MixinBuilder(superclass);

export {utils, Mixin};
