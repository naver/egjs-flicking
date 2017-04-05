/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import {utils} from "../../../src/utils";
import Flicking from "../../../src/flicking";
import FIXTURE from "./fixture";

// Test utility
const tutils = {
	/**
	 * Create fixture DOM
	 * @param id
	 * @returns {Element}
	 */
	createFixture(id) {
		const CSS_ID = "fixture_css";

		if (!document.getElementById(CSS_ID)) {
			const link = document.createElement("link");

			link.id = CSS_ID;
			link.rel = "stylesheet";
			link.href = "/base/test/unit/assets/fixture.css";

			(document.head || document.getElementsByTagName("head")[0]).appendChild(link);
		}

		const $el = sandbox({
			id: `flicking-${Date.now()}`
		});

		$el.innerHTML = FIXTURE[id.replace(/#/g, "").replace(/-/g, "_")];

		return $el.querySelector("div");
	},

	/**
	 * Create Flicking instance
	 * @param element
	 * @param option
	 * @param customEvt
	 */
	create(element, option, customEvt) {
		const $el = typeof(element) === "string" ?
			this.createFixture(element) : element;

		let event = customEvt || {};
		let handler;

		$el.eventFired = [];
		$el.eventDirection = [];

		if (utils.isObject(event)) {
			handler = e => {
				const type = e.eventType;
				const fired = $el.eventFired;
				const direction = $el.eventDirection;

				if (fired.length === 0 || fired[fired.length - 1] !== type) {
					fired.push(type);
					direction.push(e.direction);
				}
			};
		} else if (typeof customEvt === "function") {
			handler = customEvt;
			event = {};
		}

		return new Flicking($el, option || {})
			.on(utils.extend({
				beforeFlickStart: handler,
				flick: handler,
				flickEnd: handler,
				beforeRestore: handler,
				restore: handler
			}, event));
	},

	/**
	 * Run gesture simulator
	 * @param el
	 * @param option
	 * @param callback
	 */
	simulator(el, option, callback) {
		Simulator.gestures.pan(el, utils.extend({
			pos: [50, 50],
			deltaX: -100,
			deltaY: 0,
			duration: 500,
			easing: "linear"
		}, option), callback);
	},

	/**
	 * To resolve transform style value
	 * @param element
	 * @param match
	 * @returns {*|string}
	 */
	$getTransformValue(element, match) {
		const $el = element.style;
		const elStyle = $el.webkitTransform || $el.transform || "";
		const rx = /\(-?(\d+)/;

		return match ? (elStyle.match(rx) || [null, null])[1] : elStyle;
	},

	/**
	 * Get the unique value of given array data
	 * @param {Array} data
	 */
	unique(data) {
		return data.filter((v, i, arr) => {
			return arr.indexOf(v) === i;
		});
	},

	/**
	 * Test hook
	 */
	hooks: {
		before() {
		},

		after() {
			cleanup();
		},
		run() {
			before(this.before);
			after(this.after);
		}
	}
};

export default tutils;
