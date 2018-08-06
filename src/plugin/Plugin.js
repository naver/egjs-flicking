/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../Flicking.js";

// is to through pass Flicking's utils & constants to plugins
const utils = Flicking.utils;
const consts = utils.extend(utils.extend({}, Flicking.consts), {
	DIRECTION_NONE: Flicking.DIRECTION_NONE,
	DIRECTION_LEFT: Flicking.DIRECTION_LEFT,
	DIRECTION_RIGHT: Flicking.DIRECTION_RIGHT,
	DIRECTION_UP: Flicking.DIRECTION_UP,
	DIRECTION_DOWN: Flicking.DIRECTION_DOWN,
	DIRECTION_HORIZONTAL: Flicking.DIRECTION_HORIZONTAL,
	DIRECTION_VERTICAL: Flicking.DIRECTION_VERTICAL,
	DIRECTION_ALL: Flicking.DIRECTION_ALL
});

/**
 * Base class to generate flicking plugin
 * Lifecycle: componentWillMount --> componentMount --> componentDidMount --> componentWillUnmount
 * @ko Flicking 플러그인을 생성하기 위한 기본 클래스
 * @alias eg.Flicking.plugin
 * @private
 */
export default class Plugin {
	/**
	 * Constructor
	 * @param {Object} options Option object <ko>옵션 객체</ko>
	 */
	constructor(options = {}) {
		this.options = options;
	}

	/**
	 * Before mounting. It's init point from Flicking instance
	 * @param {Flicking} instance Flicking instance
	 * @returns {Plugin}
	 */
	$componentWillMount(instance) {
		this.$$ = instance;

		// get hint and layer-hack setting
		this.useWillChange = instance.$container.style.willChange === "transform";
		this.useLayerHack = this.getInstanceConf().useLayerHack;

		this.bindEvents();
		this.$componentMount();
		this.$componentDidMount();

		return this;
	}

	/**
	 * After mounting
	 * @return {Plugin}
	 */
	$componentDidMount() {
		return this;
	}

	/**
	 * Before the destroy
	 */
	$componentWillUnmount() {
		Object.keys(this).forEach(v => {
			this[v] = null;
		});
	}

	getInstanceConf() {
		return this.$$._conf;
	}

	/**
	 * Bind flicking custom events
	 */
	bindEvents() {
		this.$$.on({
			flick: this._onFlick.bind(this),
			flickEnd: this._onFlickEnd.bind(this),
			restore: this._onRestore.bind(this)
		});
	}

	/**
	 * 'flick' event handler
	 * @param {Object} e
	 * @private
	 */
	_onFlick(e) {
		const pos = e.pos;
		const distance = e.distance || pos - this.$$._conf.panel.size;

		this.onFlick && this.onFlick(e, distance);
	}

	/**
	 * 'flickEnd' event handler
	 * @param {Object} e
	 * @private
	 */
	_onFlickEnd(e) {
		const type = (e.direction & consts.DIRECTION_LEFT && "next") ||
			(e.direction & consts.DIRECTION_RIGHT && "prev") || "";

		type && this.arrange && this.arrange(type);
		this.onFlickEnd && this.onFlickEnd(e);
	}

	/**
	 * 'restore' event handler
	 * @param {Object} e
	 * @private
	 */
	_onRestore(e) {
		this.onRestore && this.onRestore(e);
	}

	/**
	 * Constant to expose Flicking's utility
	 * @ko Flicking 유틸리티
	 * @name utils
	 * @memberof Plugin
	 * @static
	 * @constant
	 * @type {Object}
	 * @private
	 */
	static utils = utils;

	/**
	 * Constant to expose Flicking's constant value
	 * @ko Flicking 상수 값
	 * @name utils
	 * @memberof Plugin
	 * @static
	 * @constant
	 * @type {Object}
	 * @private
	 */
	static consts = consts;

	/**
	 * Version info string
	 * @ko 버전정보 문자열
	 * @name VERSION
	 * @memberof Plugin
	 * @static
	 * @type {String}
	 * @example
	 * eg.Flicking.plugin.OpacityEffect.VERSION;  // ex) 2.2.0
	 */
	static VERSION = "#__VERSION__#";
}
