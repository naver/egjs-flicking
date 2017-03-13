/*!
 * All-in-one packaged file for ease use of '@egjs/flicking' with below dependencies.
 * NOTE: This is not an official distribution file and is only for user convenience.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Flicking"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Flicking"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint-disable no-new-func */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func */

var document = win.document;

exports.window = win;
exports.document = document;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.IS_ANDROID2 = exports.SUPPORT_WILLCHANGE = exports.SUPPORT_TRANSFORM = exports.EVENTS = undefined;

var _browser = __webpack_require__(0);

// define custom events name
var EVENTS = {
	beforeFlickStart: "beforeFlickStart",
	beforeRestore: "beforeRestore",
	flick: "flick",
	flickEnd: "flickEnd",
	restore: "restore"
};

// check for css transform support
// doc, global import
var SUPPORT_TRANSFORM = function () {
	var style = _browser.document.documentElement.style;

	return "transform" in style || "webkitTransform" in style;
}();

// check for will-change support
var SUPPORT_WILLCHANGE = _browser.window.CSS && _browser.window.CSS.supports && _browser.window.CSS.supports("will-change", "transform");

// check for Android 2.x
var IS_ANDROID2 = /Android 5\./.test(navigator.userAgent);

exports.EVENTS = EVENTS;
exports.SUPPORT_TRANSFORM = SUPPORT_TRANSFORM;
exports.SUPPORT_WILLCHANGE = SUPPORT_WILLCHANGE;
exports.IS_ANDROID2 = IS_ANDROID2;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _component = __webpack_require__(6);

var _component2 = _interopRequireDefault(_component);

var _movablecoord = __webpack_require__(7);

var _movablecoord2 = _interopRequireDefault(_movablecoord);

var _utils = __webpack_require__(5);

var _consts = __webpack_require__(1);

var consts = _interopRequireWildcard(_consts);

var _config = __webpack_require__(3);

var _eventHandler = __webpack_require__(4);

var _eventHandler2 = _interopRequireDefault(_eventHandler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flicking = function (_Mixin$with) {
	_inherits(Flicking, _Mixin$with);

	/**
  * Constructor
  * @param {HTMLElement|String} element - base element or selector
  * @param {Object} options
  */
	function Flicking(element, options, _prefix) {
		_classCallCheck(this, Flicking);

		var _this = _possibleConstructorReturn(this, _Mixin$with.call(this));

		_this.$wrapper = _utils.utils.$(element);
		var $children = _this.$wrapper && _this.$wrapper.children;

		if (!_this.$wrapper || !$children || !$children.length) {
			// eslint-disable validateLineBreaks, maximumLineLength
			throw new Error("Given base element doesn't exist or it hasn't proper DOM structure to be initialized.");

			// eslint-enable validateLineBreaks, maximumLineLength
		}

		_this._setOptions(options);
		_this._setConfig($children, _prefix);

		!_utils.utils.hasClickBug() && (_this._setPointerEvents = function () {});

		_this._build();
		_this._bindEvents(true);

		_this._applyPanelsCss();
		_this._arrangePanels();

		_this.options.hwAccelerable && consts.SUPPORT_WILLCHANGE && _this._setHint();
		_this.options.adaptiveHeight && _this._setAdaptiveHeight();

		_this._adjustContainerCss("end");
		return _this;
	}

	Flicking.prototype._events = function _events() {
		return consts.EVENTS;
	};

	/**
  * Set options values
  * @param {Object} options
  */


	Flicking.prototype._setOptions = function _setOptions(options) {
		// default value of previewPadding and bounce
		var arrVal = {
			previewPadding: [0, 0],
			bounce: [10, 10]
		};

		this.options = Object.assign(_config.OPTIONS, arrVal, options);

		for (var key in arrVal) {
			var val = this.options[key];

			if (Number.isInteger(val)) {
				val = [val, val];
			} else if (!Array.isArray(val)) {
				val = arrVal[key];
			}

			this.options[key] = val;
		}
	};

	/**
  * Set config values
  * @param {HTMLCollection} $children wrappers' children elements
  * @param {String} _prefix event prefix
  * @return {HTMLElement}
  */


	Flicking.prototype._setConfig = function _setConfig($children, _prefix) {
		var options = this.options;
		var padding = options.previewPadding;
		var $nodes = $children;

		if ($nodes[0].classList.contains(options.prefix + "-container")) {
			$nodes = $nodes[0];
			this.$container = $nodes;
			$nodes = $nodes.children;
		}

		// convert to array
		$nodes = [].slice.call($nodes);

		// config value
		var conf = this._conf = _utils.utils.extend(_config.CONFIG, {
			panel: {
				$list: $nodes,
				minCount: padding[0] + padding[1] > 0 ? 5 : 3 // minimum panel count
			},
			// remember original class and inline style in case of restoration on destroy()
			origPanelStyle: {
				wrapper: {
					className: this.$wrapper.getAttribute("class") || null,
					style: this.$wrapper.getAttribute("style") || null
				},
				list: $nodes.map(function (v) {
					return {
						className: v.getAttribute("class") || null,
						style: v.getAttribute("style") || null
					};
				})
			},
			useLayerHack: options.hwAccelerable && !consts.SUPPORT_WILLCHANGE,
			eventPrefix: _prefix || ""
		});

		[["LEFT", "RIGHT"], ["UP", "DOWN"]][+!options.horizontal].forEach(function (v) {
			return conf.dirData.push(_movablecoord2.default["DIRECTION_" + v]);
		});
	};

	/**
  * Build and set panel nodes to make flicking structure
  */


	Flicking.prototype._build = function _build() {
		var panel = this._conf.panel;
		var options = this.options;
		var $children = panel.$list;
		var padding = options.previewPadding.concat();
		var prefix = options.prefix;
		var horizontal = options.horizontal;
		var panelCount = panel.count = panel.origCount = $children.length;
		var bounce = options.bounce;

		this._setPadding(padding, true);
		var sizeValue = this._getDataByDirection([panel.size, "100%"]);

		// create container element
		var cssValue = "position:relative;z-index:2000;width:100%;height:100%;" + (horizontal ? "" : "top:0;");

		if (this.$container) {
			this.$container.setAttribute("style", cssValue);
		} else {
			var $parent = $children[0].parentNode;
			var $container = document.createElement("div");

			$container.className = prefix + "-container";
			$container.setAttribute("style", cssValue);
			$children.forEach(function (v) {
				return $container.appendChild(v);
			});

			$parent.appendChild($container);
			this.$container = $container;
		}

		// panels' css values
		$children.forEach(function (v) {
			v.classList.add(prefix + "-panel");

			_utils.utils.css(v, {
				position: "absolute",
				width: _utils.utils.getUnitValue(sizeValue[0]),
				height: _utils.utils.getUnitValue(sizeValue[1]),
				boxSizing: "border-box",
				top: 0,
				left: 0
			});
		});

		if (this._addClonePanels()) {
			panelCount = panel.count = (panel.$list = [].slice.call(this.$container.children)).length;
		}

		// create MovableCoord instance
		this._mcInst = new _movablecoord2.default({
			min: [0, 0],
			max: this._getDataByDirection([panel.size * (panelCount - 1), 0]),
			margin: 0,
			circular: false,
			easing: options.panelEffect,
			deceleration: options.deceleration,
			bounce: this._getDataByDirection([0, bounce[1], 0, bounce[0]])
		});

		this._setDefaultPanel(options.defaultIndex);
	};

	/**
  * Set preview padding value
  * @param {Array} padding
  * @param {Boolean} build
  */


	Flicking.prototype._setPadding = function _setPadding(padding, build) {
		var horizontal = this.options.horizontal;
		var panel = this._conf.panel;
		var paddingSum = padding[0] + padding[1];
		var cssValue = {};

		if (paddingSum || !build) {
			cssValue.padding = horizontal ? "0 " + padding.reverse().join("px 0 ") + "px" : padding.join("px 0 ") + "px";
		}

		if (build) {
			cssValue.overflow = "hidden";
			cssValue.boxSizing = "border-box";
		}

		Object.keys(cssValue).length && _utils.utils.css(this.$wrapper, cssValue);

		var wrapperStyle = getComputedStyle(this.$wrapper);
		var paddingType = horizontal ? ["Left", "Right"] : ["Top", "Bottom"];

		panel.size = _utils.utils.getNumValue(wrapperStyle[horizontal ? "width" : "height"]) - (_utils.utils.getNumValue(wrapperStyle["padding" + paddingType[0]]) + _utils.utils.getNumValue(wrapperStyle["padding" + paddingType[1]]));
	};

	/**
  * To fulfill minimum panel count cloning original node when circular or previewPadding option are set
  * @return {Boolean} true : added clone node, false : not added
  */


	Flicking.prototype._addClonePanels = function _addClonePanels() {
		var _this2 = this;

		var panel = this._conf.panel;
		var panelCount = panel.origCount;
		var cloneCount = panel.minCount - panelCount;
		var list = panel.$list;
		var cloneNodes = void 0;

		// if panels are given less than required when circular option is set, then clone node to apply circular mode
		if (this.options.circular && panelCount < panel.minCount) {
			cloneNodes = list.map(function (v) {
				return v.cloneNode(true);
			});

			while (cloneNodes.length < cloneCount) {
				cloneNodes = cloneNodes.concat(list.map(function (v) {
					return v.cloneNode(true);
				}));
			}

			cloneNodes.forEach(function (v) {
				return _this2.$container.appendChild(v);
			});

			return !!cloneNodes.length;
		}

		return false;
	};

	/**
  * Move panel's position within array
  * @param {Number} count element counts to move
  * @param {Boolean} append where the list to be appended(moved) (true: to the end, false: to the beginning)
  */


	Flicking.prototype._movePanelPosition = function _movePanelPosition(count, append) {
		var panel = this._conf.panel;
		var list = panel.$list;
		var listToMove = list.splice(append ? 0 : panel.count - count, count);

		panel.$list = append ? list.concat(listToMove) : listToMove.concat(list);
	};

	/**
  * Set default panel to show
  * @param {Number} index
  */


	Flicking.prototype._setDefaultPanel = function _setDefaultPanel(index) {
		var panel = this._conf.panel;
		var lastIndex = panel.count - 1;
		var coords = void 0;
		var baseIndex = void 0;

		if (this.options.circular) {
			// if default index is given, then move correspond panel to the first position
			if (index > 0 && index <= lastIndex) {
				this._movePanelPosition(index, true);
			}

			// set first panel's position according physical node length
			baseIndex = this._getBasePositionIndex();
			this._movePanelPosition(baseIndex, false);

			this._setPanelNo({
				no: index,
				currNo: index
			});
		} else {
			// if defaultIndex option is given, then move to that index panel
			if (index > 0 && index <= lastIndex) {
				this._setPanelNo({
					index: index,
					no: index,
					currIndex: index,
					currNo: index
				});

				coords = [-(panel.size * index), 0];

				this._setTranslate(coords);
				this._setMovableCoord("setTo", [Math.abs(coords[0]), Math.abs(coords[1])], true, 0);
			}
		}
	};

	/**
  * Arrange panels' position
  * @param {Boolean} sort Need to sort panel's position
  * @param {Number} indexToMove Number to move from current position (negative: left, positive: right)
  */


	Flicking.prototype._arrangePanels = function _arrangePanels(sort, indexToMove) {
		var conf = this._conf;
		var panel = conf.panel;
		var touch = conf.touch;
		var dirData = conf.dirData;
		var baseIndex = void 0;

		if (this.options.circular) {
			// when arranging panels, set flag to not trigger flick custom event
			conf.customEvent.flick = false;

			// move elements according direction
			if (sort) {
				indexToMove && (touch.direction = dirData[+!(indexToMove > 0)]);
				this._arrangePanelPosition(touch.direction, indexToMove);
			}

			// set index for base element's position
			baseIndex = this._getBasePositionIndex();

			this._setPanelNo({
				index: baseIndex,
				currIndex: baseIndex
			});

			// arrange MovableCoord's coord position
			conf.customEvent.flick = !!this._setMovableCoord("setTo", [panel.size * panel.index, 0], true, 0);
		}

		this._applyPanelsPos();
	};

	/**
  * Set each panel's position in DOM
  */


	Flicking.prototype._applyPanelsPos = function _applyPanelsPos() {
		this._conf.panel.$list.forEach(this._applyPanelsCss.bind(this));
	};

	/**
  * Set CSS style values to move elements
  *
  * Initialize setting up checking if browser support transform css property.
  * If browser doesn't support transform, then use left/top properties instead.
  * @param {HTMLElement} $element
  * @param {Array} coords
  */


	Flicking.prototype._setMoveStyle = function _setMoveStyle($el, coordsValue) {
		this._setMoveStyle = consts.SUPPORT_TRANSFORM ? function moveStyle($element, coords) {
			_utils.utils.css($element, {
				transform: _utils.utils.translate(coords[0], coords[1], this._conf.useLayerHack)
			});
		} : function ($element, coords) {
			_utils.utils.css($element, { left: coords[0], top: coords[1] });
		};

		this._setMoveStyle($el, coordsValue);
	};

	/**
  * Callback function for applying CSS values to each panels
  *
  * Need to be initialized before use, to set up for Android 2.x browsers or others.
  */


	Flicking.prototype._applyPanelsCss = function _applyPanelsCss() {
		var conf = this._conf;
		var dummyAnchorClassName = "__dummy_anchor";

		if (consts.IS_ANDROID2) {
			conf.$dummyAnchor = _utils.utils.$("." + dummyAnchorClassName);

			!conf.$dummyAnchor.length && this.$wrapper.appendChild(conf.$dummyAnchor = _utils.utils.$("<a href=\"javascript:void(0)\"\n\t\t\t\t\t\tclass=\"" + dummyAnchorClassName + "\"\n\t\t\t\t\t\tstyle=\"position:absolute;height:0px;width:0px\">"));

			this._applyPanelsCss = function applyCss(v, i) {
				var coords = this._getDataByDirection([this._conf.panel.size * i + "px", 0]);

				_utils.utils.css(v, {
					left: coords[0],
					top: coords[1]
				});
			};
		} else {
			this._applyPanelsCss = function applyCss(v, i) {
				var coords = this._getDataByDirection([consts.SUPPORT_TRANSFORM ? 100 * i + "%" : this._conf.panel.size * i + "px", 0]);

				this._setMoveStyle(v, coords);
			};
		}
	};

	/**
  * Adjust container's css value to handle Android 2.x link highlighting bug
  *
  * @param {String} phase
  *    start - set left/top value to 0
  *    end - set translate value to 0
  * @param {Array} coordValue coordinate value
  */


	Flicking.prototype._adjustContainerCss = function _adjustContainerCss(phase, coordValue) {
		var conf = this._conf;
		var panel = conf.panel;
		var options = this.options;
		var horizontal = options.horizontal;
		var paddingTop = options.previewPadding[0];
		var container = this.$container;
		var coords = coordValue;
		var value = void 0;

		if (consts.IS_ANDROID2) {
			if (!coords) {
				coords = [-panel.size * panel.index, 0];
			}

			if (phase === "start") {
				container = container[0].style;
				value = parseInt(container[horizontal ? "left" : "top"], 10);

				if (horizontal) {
					value && (container.left = 0);
				} else {
					value !== paddingTop && (container.top = "0px");
				}

				this._setTranslate([-coords[+!options.horizontal], 0]);
			} else if (phase === "end") {
				coords = this._getCoordsValue(coords);

				_utils.utils.css(container, {
					left: coords.x,
					top: coords.y,
					transform: _utils.utils.translate(0, 0, conf.useLayerHack)
				});

				conf.$dummyAnchor[0].focus();
			}
		}
	};

	/**
  * Set MovableCoord coord value
  * @param {String} method
  * @param {Array} coordValue
  * @param {Boolean} isDirVal
  * @param {Number} duration
  * @return {eg.MovableCoord} MovableCoord instance
  */


	Flicking.prototype._setMovableCoord = function _setMovableCoord(method, coordValue, isDirVal, duration) {
		var coord = coordValue;

		if (isDirVal) {
			coord = this._getDataByDirection(coord);
		}

		return this._mcInst[method](coord[0], coord[1], duration);
	};

	/**
  * Set hint for browser to decide efficient way of doing transform changes(or animation)
  * https://dev.opera.com/articles/css-will-change-property/
  */


	Flicking.prototype._setHint = function _setHint() {
		var style = { willChange: "transform" };

		_utils.utils.css(this.$container, style);
		_utils.utils.css(this._conf.panel.$list, style);
	};

	/**
  * Get data according options.horizontal value
  *
  * @param {Array} value primary data to handle
  * @return {Array}
  */


	Flicking.prototype._getDataByDirection = function _getDataByDirection(value) {
		var data = value.concat();

		!this.options.horizontal && data.reverse();
		return data;
	};

	/**
  * Move nodes
  * @param {Boolean} direction
  * @param {Number} indexToMove
  */


	Flicking.prototype._arrangePanelPosition = function _arrangePanelPosition(direction, indexToMove) {
		var next = direction === this._conf.dirData[0];

		this._movePanelPosition(Math.abs(indexToMove || 1), next);
	};

	/**
  * Get the base position index of the panel
  */


	Flicking.prototype._getBasePositionIndex = function _getBasePositionIndex() {
		return Math.floor(this._conf.panel.count / 2 - 0.1);
	};

	/**
  * Bind events
  * @param {Boolean} bind
  */


	Flicking.prototype._bindEvents = function _bindEvents(bind) {
		var options = this.options;
		var $wrapper = this.$wrapper;
		var mcInst = this._mcInst;

		if (bind) {
			mcInst.bind($wrapper, {
				scale: this._getDataByDirection([-1, 0]),
				direction: _movablecoord2.default["DIRECTION_" + (options.horizontal ? "HORIZONTAL" : "VERTICAL")],
				interruptable: false,
				inputType: options.inputType,
				thresholdAngle: options.thresholdAngle
			}).on({
				hold: this._holdHandler.bind(this),
				change: this._changeHandler.bind(this),
				release: this._releaseHandler.bind(this),
				animationStart: this._animationStartHandler.bind(this),
				animationEnd: this._animationEndHandler.bind(this)
			});
		} else {
			mcInst.unbind($wrapper).off();
		}
	};

	/**
  * Set container's height value according to children's height
  * @param {Number} direction
  */


	Flicking.prototype._setAdaptiveHeight = function _setAdaptiveHeight(direction) {
		var dataName = "data-height";
		var conf = this._conf;
		var indexToMove = conf.indexToMove;
		var $children = void 0;
		var height = void 0;

		var $panel = indexToMove === 0 ?

		// panel moved by 1
		this["get" + (direction === _movablecoord2.default.DIRECTION_LEFT && "Next" || direction === _movablecoord2.default.DIRECTION_RIGHT && "Prev" || "") + "Element"]() :

		// panel moved by .moveTo()
		conf.panel.$list[conf.panel.currIndex + indexToMove];

		var $first = $panel.querySelector(":first-child");

		height = $first.getAttribute(dataName);

		if (!height) {
			$children = $panel.children;
			height = _utils.utils.outerHeight($children.length > 1 ? $panel.forEach(function (v) {
				return v.style.height = "auto";
			}) : $first);

			$first.setAttribute(dataName, height);
		}

		this.$wrapper.style.height = height + "px";
	};

	/**
  * Trigger beforeRestore event
  * @param {Object} e event object
  */


	Flicking.prototype._triggerBeforeRestore = function _triggerBeforeRestore(e) {
		var conf = this._conf;
		var touch = conf.touch;

		// reverse direction value when restore
		touch.direction = ~~conf.dirData.join("").replace(touch.direction, "");

		/**
   * This event is fired before an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached
   * @ko 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원되기 전에 발생하는 이벤트
   * @name eg.Flicking#beforeRestore
   * @event
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {String} param.eventType The name of the event <ko>이름명</ko>
   * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다. (@deprecated since 1.3.0)</ko>
   * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
   * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
   * @param {Array} param.depaPos Start coordinate <ko>출발점 좌표</ko>
   * @param {Number} param.depaPos.0 x-coordinate <ko>x 좌표</ko>
   * @param {Number} param.depaPos.1 y-coordinate <ko>y 좌표</ko>
   * @param {Array} param.destPos End coordinate <ko>도착점 좌표</ko>
   * @param {Number} param.destPos.0 x-coordinate <ko>x 좌표</ko>
   * @param {Number} param.destPos.1 y-coordinate <ko>y 좌표</ko>
   */
		conf.customEvent.restore = this._triggerEvent(consts.EVENTS.beforeRestore, {
			depaPos: e.depaPos,
			destPos: e.destPos
		});

		if (!conf.customEvent.restore) {
			"stop" in e && e.stop();
			conf.panel.animating = false;
		}
	};

	/**
  * Trigger restore event
  */


	Flicking.prototype._triggerRestore = function _triggerRestore() {
		var customEvent = this._conf.customEvent;

		/**
   * This event is fired after an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached.
   * @ko 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원된 다음 발생하는 이벤트
   * @name eg.Flicking#restore
   * @event
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {String} param.eventType The name of the event <ko>이름명</ko>
   * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM(@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
   * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
   * @param {Number} param.direction Direction of the panel move (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
   */
		customEvent.restore && this._triggerEvent(consts.EVENTS.restore);
		customEvent.restoreCall = false;
	};

	/**
  * Set value when panel changes
  * @param {String} phase - [start|end]
  * @param {Object} pos
  */


	Flicking.prototype._setPhaseValue = function _setPhaseValue(phase, pos) {
		var conf = this._conf;
		var options = this.options;
		var panel = conf.panel;

		if (phase === "start" && (panel.changed = this._isMovable())) {
			/**
    * This event is fired before flicking starts
    * @ko 플리킹이 시작하기 전에 발생하는 이벤트
    * @name eg.Flicking#beforeFlickStart
    * @event
    * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
    * @param {String} param.eventType The name of the event <ko>이름명</ko>
    * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
    * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
    * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>−	이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
    * @param {Array} param.depaPos Start coordinate <ko>출발점 좌표</ko>
    * @param {Number} param.depaPos.0 x-coordinate <ko>x 좌표</ko>
    * @param {Number} param.depaPos.1 y-coordinate <ko>y 좌표</ko>
    * @param {Array} param.destPos End coordinate <ko>도착점 좌표</ko>
    * @param {Number} param.destPos.0 x-coordinate <ko>x 좌표</ko>
    * @param {Number} param.destPos.1 y-coordinate <ko>y 좌표</ko>
    */
			if (!this._triggerEvent(consts.EVENTS.beforeFlickStart, pos)) {
				panel.changed = panel.animating = false;
				return false;
			} else {
				options.adaptiveHeight && this._setAdaptiveHeight(conf.touch.direction);
			}

			conf.indexToMove === 0 && this._setPanelNo();
		} else if (phase === "end") {
			if (options.circular && panel.changed) {
				this._arrangePanels(true, conf.indexToMove);
			}

			!consts.IS_ANDROID2 && this._setTranslate([-panel.size * panel.index, 0]);
			conf.touch.distance = conf.indexToMove = 0;

			/**
    * This event is fired after panel moves.
    * @ko 패널이 이동한 다음 발생하는 이벤트
    * @name eg.Flicking#flickEnd
    * @event
    * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
    * @param {String} param.eventType The name of the event <ko>이름명</ko>
    * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
    * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
    * @param {Number} param.direction Direction of the movemen (see eg.MovableCoord.DIRECTION_* constant) <ko>−	이동 방향(eg.MovableCoord.DIRECTION_* constant 참고</ko>
    */
			panel.changed && this._triggerEvent(consts.EVENTS.flickEnd);
		}

		!(phase === "start" && pos === undefined) && this._adjustContainerCss(phase);
		return true;
	};

	/**
  * Get positive or negative according direction
  */


	Flicking.prototype._getNumByDirection = function _getNumByDirection() {
		var conf = this._conf;

		return conf.touch.direction === conf.dirData[0] ? 1 : -1;
	};

	/**
  * Revert panel number
  */


	Flicking.prototype._revertPanelNo = function _revertPanelNo() {
		var panel = this._conf.panel;
		var num = this._getNumByDirection();

		var index = panel.currIndex >= 0 ? panel.currIndex : panel.index - num;
		var no = panel.currNo >= 0 ? panel.currNo : panel.no - num;

		this._setPanelNo({
			index: index,
			no: no
		});
	};

	/**
  * Set the panel number
  * @param {Object} obj number object
  */


	Flicking.prototype._setPanelNo = function _setPanelNo(obj) {
		var panel = this._conf.panel;
		var count = panel.origCount - 1;
		var num = this._getNumByDirection();

		if (_utils.utils.isObject(obj)) {
			for (var key in obj) {
				panel[key] = obj[key];
			}
		} else {
			// remember current value
			panel.currIndex = panel.index;
			panel.currNo = panel.no;

			panel.index += num;
			panel.no += num;
		}

		if (panel.no > count) {
			panel.no = 0;
		} else if (panel.no < 0) {
			panel.no = count;
		}
	};

	/**
  * Set pointerEvents css property on container element due to the iOS click bug
  * @param {Event} e
  */


	Flicking.prototype._setPointerEvents = function _setPointerEvents(e) {
		var pointer = _utils.utils.css(this.$container, "pointerEvents");
		var val = void 0;

		if (e && e.holding && e.hammerEvent && e.hammerEvent.preventSystemEvent && pointer !== "none") {
			val = "none";
		} else if (!e && pointer !== "auto") {
			val = "auto";
		}

		val && _utils.utils.css(this.$container, { pointerEvents: val });
	};

	/**
  * Get coordinate value with unit
  * @param coords {Array} x,y numeric value
  * @return {Object} x,y coordinate value with unit
  */


	Flicking.prototype._getCoordsValue = function _getCoordsValue(coordsValue) {
		// the param comes as [ val, 0 ], whatever the direction. So reorder the value depend the direction.
		var coords = this._getDataByDirection(coordsValue);

		return {
			x: _utils.utils.getUnitValue(coords[0]),
			y: _utils.utils.getUnitValue(coords[1])
		};
	};

	/**
  * Set translate property value
  * @param {Array} coords coordinate x,y value
  */


	Flicking.prototype._setTranslate = function _setTranslate(coordsValue) {
		var coords = this._getCoordsValue(coordsValue);

		this._setMoveStyle(this.$container, [coords.x, coords.y]);
	};

	/**
  * Return unit formatted value
  * @param {Number|String} val
  * @return {String} val Value formatted with unit
  */


	Flicking.prototype._getUnitValue = function _getUnitValue(val) {
		var rx = /(?:[a-z]{2,}|%)$/;

		return (parseInt(val, 10) || 0) + (String(val).match(rx) || "px");
	};

	/**
  * Check if panel passed through threshold pixel
  */


	Flicking.prototype._isMovable = function _isMovable() {
		var options = this.options;
		var mcInst = this._mcInst;
		var isMovable = Math.abs(this._conf.touch.distance) >= options.threshold;
		var max = void 0;
		var currPos = void 0;

		if (!options.circular && isMovable) {
			max = this._getDataByDirection(mcInst.options.max)[0];
			currPos = this._getDataByDirection(mcInst.get())[0];

			// if current position out of range
			if (currPos < 0 || currPos > max) {
				return false;
			}
		}

		return isMovable;
	};

	/**
  * Trigger custom events
  * @param {String} name - event name
  * @param {Object} param - additional event value
  * @return {Boolean}
  */


	Flicking.prototype._triggerEvent = function _triggerEvent(name, param) {
		var conf = this._conf;
		var panel = conf.panel;

		// pass changed panel no only on 'flickEnd' event
		if (name === consts.EVENTS.flickEnd) {
			panel.currNo = panel.no;
			panel.currIndex = panel.index;
		}

		return this.trigger(conf.eventPrefix + name, Object.assign({
			eventType: name,
			index: panel.currIndex,
			no: panel.currNo,
			direction: conf.touch.direction
		}, param));
	};

	/**
  * Get next/prev panel element/index.
  * @param {Boolean} direction
  * @param {Boolean} element - true:to get element, false:to get index
  * @param {Number} physical - true : physical, false : logical
  * @return {HTMLElement|Number}
  */


	Flicking.prototype._getElement = function _getElement(direction, element, physical) {
		var panel = this._conf.panel;
		var circular = this.options.circular;
		var pos = panel.currIndex;
		var next = direction === this._conf.dirData[0];
		var result = null;
		var total = void 0;
		var index = void 0;

		if (physical) {
			total = panel.count;
			index = pos;
		} else {
			total = panel.origCount;
			index = panel.currNo;
		}

		var currentIndex = index;

		if (next) {
			if (index < total - 1) {
				index++;
			} else if (circular) {
				index = 0;
			}
		} else {
			if (index > 0) {
				index--;
			} else if (circular) {
				index = total - 1;
			}
		}

		if (currentIndex !== index) {
			result = element ? panel.$list[next ? pos + 1 : pos - 1] : index;
		}

		return result;
	};

	/**
  * Set value to force move panels when duration is 0
  * @param {Boolean} next
  */


	Flicking.prototype._setValueToMove = function _setValueToMove(next) {
		var conf = this._conf;

		conf.touch.distance = this.options.threshold + 1;
		conf.touch.direction = conf.dirData[+!next];
	};

	/**
  * Returns the index number of the current panel element.
  * @ko 현재 패널 엘리먼트의 인덱스 번호를 반환한다
  * @method eg.Flicking#getIndex
  * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
  * @return {Number} Index number of the current panel element <ko>현재 패널의 인덱스 번호</ko>
  */


	Flicking.prototype.getIndex = function getIndex(physical) {
		return this._conf.panel[physical ? "currIndex" : "currNo"];
	};

	/**
  * Returns the reference of the current panel element.
  * @ko 현재 패널 엘리먼트의 레퍼런스를 반환한다
  * @method eg.Flicking#getElement
  * @return {HTMLElement} Current element <ko>현재 엘리먼트</ko>
  */


	Flicking.prototype.getElement = function getElement() {
		var panel = this._conf.panel;

		return panel.$list[panel.currIndex];
	};

	/**
  * Returns the reference of the next panel element.
  * @ko 다음 패널 엘리먼트의 레퍼런스를 반환한다.
  * @method eg.Flicking#getNextElement
  * @return {HTMLElement|null} Next panel element or null if it does not exist.<ko>다음 패널 엘리먼트. 패널이 없으면 'null'을 반환한다.</ko>
  */


	Flicking.prototype.getNextElement = function getNextElement() {
		return this._getElement(this._conf.dirData[0], true);
	};

	/**
  * Returns the index number of the next panel element.
  * @ko 다음 패널 엘리먼트의 인덱스 번호를 반환한다
  * @method eg.Flicking#getNextIndex
  * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
  * @return {Number|null} Index number of the next panel element or null if it does not exist. <ko>다음 패널 엘리먼트의 인덱스 번호. 패널이 없으면 'null'을 반환한다</ko>
  */


	Flicking.prototype.getNextIndex = function getNextIndex(physical) {
		return this._getElement(this._conf.dirData[0], false, physical);
	};

	/**
  * Returns the references of whole panel elements.
  * @ko 패널을 구성하는 모든 엘리먼트의 레퍼런스를 반환한다
  * @method eg.Flicking#getAllElements
  * @return {HTMLElement} Whole panel elements <ko>모든 패널 엘리먼트</ko>
  */


	Flicking.prototype.getAllElements = function getAllElements() {
		return this._conf.panel.$list;
	};

	/**
  * Returns the reference of the previous panel element.
  * @ko 이전 패널 엘리먼트의 레퍼런스를 반환한다.
  * @method eg.Flicking#getPrevElement
  * @return {HTMLElement|null} Previous panel element or null if it does not exist. <ko>이전 패널 엘리먼트. 패널이 없으면 'null'을 반환한다</ko>
  */


	Flicking.prototype.getPrevElement = function getPrevElement() {
		return this._getElement(this._conf.dirData[1], true);
	};

	/**
  * Returns the index number of the previous panel element.
  * @ko 이전 패널 엘리먼트의 인덱스 번호를 반환한다
  * @method eg.Flicking#getPrevIndex
  * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
  * @return {Number|null} Previous element index value or null if no more element exist<ko>이전 패널 인덱스 번호. 패널이 없는 경우에는 null</ko>
  */


	Flicking.prototype.getPrevIndex = function getPrevIndex(physical) {
		return this._getElement(this._conf.dirData[1], false, physical);
	};

	/**
  * Returns the total number of whole panel elements.
  * @ko 전체 패널 엘리먼트의 개수를 반환한다
  * @method eg.Flicking#getTotalCount
  * @deprecated since 1.3.0
  * @param {Boolean} [physical=false] Number of elements relative to (true: DOM, false: panel content)<ko>엘리먼트 개수의 기준(true: DOM 엘리먼트 기준, false: 패널 콘텐츠 기준)</ko>
  * @return {Number} Total number of whole panel elements <ko>모든 패널 엘리먼트의 개수</ko>
  */


	Flicking.prototype.getTotalCount = function getTotalCount(physical) {
		return this._conf.panel[physical ? "count" : "origCount"];
	};

	/**
  * Checks whether the animated panel is playing.
  * @ko 패널 이동 애니메이션이 진행 중인지 확인한다.
  * @method eg.Flicking#isPlaying
  * @return {Boolean} Indicates whether the animated panel is playing <ko>패널 이동 애니메이션 진행 중 여부</ko>
  */


	Flicking.prototype.isPlaying = function isPlaying() {
		return this._conf.panel.animating;
	};

	/**
  * Move panel to the given direction
  * @param {Boolean} next
  * @param {Number} duration
  */


	Flicking.prototype._movePanel = function _movePanel(next, duration) {
		var conf = this._conf;
		var panel = conf.panel;
		var options = this.options;

		if (panel.animating || conf.touch.holding) {
			return undefined;
		}

		this._setValueToMove(next);

		if (options.circular || this[next ? "getNextIndex" : "getPrevIndex"]() != null) {
			this._movePanelByPhase("setBy", [panel.size * (next ? 1 : -1), 0], duration);
		}

		return this;
	};

	/**
  * Move panel applying start/end phase value
  * @param {String} method movableCoord method name
  * @param {Object} coords coordinate array value
  * @param {Number} durationValue duration value
  */


	Flicking.prototype._movePanelByPhase = function _movePanelByPhase(method, coords, durationValue) {
		var duration = _utils.utils.getNumValue(durationValue, this.options.duration);

		if (this._setPhaseValue("start") !== false) {
			this._setMovableCoord(method, coords, true, duration);
			!duration && this._setPhaseValue("end");
		}
	};

	/**
  * Moves an element to the next panel.
  * @ko 다음 패널로 이동한다.
  * @method eg.Flicking#next
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.next = function next(duration) {
		return this._movePanel(true, duration);
	};

	/**
  * Moves an element to the previous panel.
  * @ko 이전 패널로 이동한다.
  * @method eg.Flicking#prev
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.prev = function prev(duration) {
		return this._movePanel(false, duration);
	};

	/**
  * Moves an element to the indicated panel.
  * @ko 지정한 패널로 이동한다.
  * @method eg.Flicking#moveTo
  * @param {Number} no Logical index number of the target panel element, which is relative to the panel content. <ko>이동할 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.moveTo = function moveTo(noValue, duration) {
		var conf = this._conf;
		var panel = conf.panel;
		var circular = this.options.circular;
		var currentIndex = panel.index;
		var indexToMove = void 0;
		var isPositive = void 0;
		var no = noValue;

		no = _utils.utils.getNumValue(no, -1);

		if (no < 0 || no >= panel.origCount || no === panel.no || panel.animating || conf.touch.holding) {
			return this;
		}

		indexToMove = no - (circular ? panel.no : currentIndex);
		isPositive = indexToMove > 0;

		// check for real panel count which can be moved on each sides in circular mode
		if (circular && Math.abs(indexToMove) > (isPositive ? panel.count - (currentIndex + 1) : currentIndex)) {
			indexToMove += (isPositive ? -1 : 1) * panel.count;
			isPositive = indexToMove > 0;
		}

		this._setPanelNo(circular ? { no: no } : { no: no, index: no });
		this._conf.indexToMove = indexToMove;
		this._setValueToMove(isPositive);

		this._movePanelByPhase(circular ? "setBy" : "setTo", [panel.size * (circular ? indexToMove : no), 0], duration);

		return this;
	};

	/**
  * Update panel's previewPadding size according options.previewPadding
  */


	Flicking.prototype._checkPadding = function _checkPadding() {
		var options = this.options;
		var previewPadding = options.previewPadding.concat();
		var padding = _utils.utils.css(this.$wrapper, "padding").split(" ");

		options.horizontal && padding.reverse();

		// get current padding value
		padding = [padding[0]].push(padding[padding.length === 2 ? 0 : 2]).map(function (v) {
			return parseInt(v, 10);
		});

		// update padding when current and given are different
		if (previewPadding.length === 2 && previewPadding[0] !== padding[0] || previewPadding[1] !== padding[1]) {
			this._setPadding(previewPadding);
		}
	};

	/**
  * Updates the size of the panel.
  * @ko 패널의 크기를 갱신한다
  * @method eg.Flicking#resize
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  let some = new eg.Flicking("#mflick", {
 				previewPadding: [10,10]
 			});
 	 // when device orientaion changes
  some.resize();
 	 // or when changes previewPadding option from its original value
  some.options.previewPadding = [20, 30];
  some.resize();
  */


	Flicking.prototype.resize = function resize() {
		var _utils$css;

		var conf = this._conf;
		var options = this.options;
		var panel = conf.panel;
		var horizontal = options.horizontal;
		var panelSize = void 0;

		if (~~options.previewPadding.join("")) {
			this._checkPadding();
			panelSize = panel.size;
		} else if (horizontal) {
			panelSize = panel.size = _utils.utils.css(this.$wrapper, "width");
		}

		var maxCoords = this._getDataByDirection([panelSize * (panel.count - 1), 0]);

		// resize elements
		horizontal && _utils.utils.css(this.$container, { width: maxCoords[0] + panelSize + "px" });
		_utils.utils.css(panel.$list, (_utils$css = {}, _utils$css[horizontal ? "width" : "height"] = panelSize, _utils$css));

		this._mcInst.options.max = maxCoords;
		this._setMovableCoord("setTo", [panelSize * panel.index, 0], true, 0);

		if (consts.IS_ANDROID2) {
			this._applyPanelsPos();
			this._adjustContainerCss("end");
		}

		return this;
	};

	/**
  * Restores an element to its original position when it movement stops while the element is not dragged until a certain distance threshold is reached.
  * @ko 다음 패널로 바뀌기 전에 패널 이동이 멈췄을 때 원래 패널로 복원한다
  * @method eg.Flicking#restore
  * @param {Number} [durationValue=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * let some = new eg.Flicking("#mflick").on({
  *				beforeFlickStart : function(e) {
  *					if(e.no === 2) {
  *						e.stop();  // stop flicking
  *						this.restore(100);  // restoring to previous position
  *					}
  *				}
  *			);
  */


	Flicking.prototype.restore = function restore(durationValue) {
		var conf = this._conf;
		var panel = conf.panel;
		var currPos = this._getDataByDirection(this._mcInst.get());
		var duration = durationValue;
		var destPos = void 0;

		// check if the panel isn't in right position
		if (currPos[0] !== panel.currIndex * panel.size) {
			conf.customEvent.restoreCall = true;
			duration = _utils.utils.getNumValue(duration, this.options.duration);

			this._revertPanelNo();
			destPos = this._getDataByDirection([panel.size * panel.index, 0]);

			this._triggerBeforeRestore({ depaPos: currPos, destPos: destPos });
			this._setMovableCoord("setTo", destPos, true, duration);

			if (!duration) {
				this._adjustContainerCss("end");
				this._triggerRestore();
			}

			// to handle on api call
		} else if (panel.changed) {
			this._revertPanelNo();
			conf.touch.distance = conf.indexToMove = 0;
		}

		return this;
	};

	/**
  * Enables input devices.
  * @ko 입력 장치를 사용할 수 있게 한다
  * @method eg.Flicking#enableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.enableInput = function enableInput() {
		this._mcInst.enableInput();
		return this;
	};

	/**
  * Disables input devices.
  * @ko 입력 장치를 사용할 수 없게 한다.
  * @method eg.Flicking#disableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.disableInput = function disableInput() {
		this._mcInst.disableInput();
		return this;
	};

	/**
  * Destroys elements, properties, and events used in a panel.
  * @ko 패널에 사용한 엘리먼트와 속성, 이벤트를 해제한다
  * @method eg.Flicking#destroy
  */


	Flicking.prototype.destroy = function destroy() {
		var conf = this._conf;
		var origPanelStyle = conf.origPanelStyle;
		var wrapper = origPanelStyle.wrapper;
		var list = origPanelStyle.list;

		// unwrap container element and restore original inline style
		this.$wrapper.setAttribute("class", wrapper.className);
		this.$wrapper.setAttribute("style", wrapper.style);

		var $children = [].slice.call(this.$container.children);

		for (var i = 0, el; el = $children[i]; i++) {
			if (i > list.length - 1) {
				el.parentNode.removeChild(el);
				break;
			}

			el.setAttribute("class", list[i].className);
			el.setAttribute("style", list[i].style);
		}

		// unbind events
		this._bindEvents(false);
		this.off();

		// release resources
		for (var x in this) {
			this[x] = null;
		}
	};

	return Flicking;
}((0, _utils.Mixin)(_component2.default).with(_eventHandler2.default));

exports.default = Flicking;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// internal config values
var CONFIG = {
	panel: {
		$list: null, // panel list
		index: 0, // dom index used among process
		no: 0, // panel no used among process
		currIndex: 0, // current physical dom index
		currNo: 0, // current logical panel number
		size: 0, // panel size
		count: 0, // total physical panel count
		origCount: 0, // total count of given original panels
		changed: false, // if panel changed
		animating: false, // current animating status boolean
		minCount: 3 // minimum panel count
	},
	touch: {
		holdPos: [0, 0], // hold x,y coordinate
		destPos: [0, 0], // destination x,y coordinate
		distance: 0, // touch distance pixel of start to end touch
		direction: null, // touch direction
		lastPos: 0, // to determine move on holding
		holding: false
	},
	customEvent: { // for custom events value
		flick: true,
		restore: false,
		restoreCall: false
	},
	dirData: [], // direction constant value according horizontal or vertical
	indexToMove: 0,
	$dummyAnchor: null // For buggy link highlighting on Android 2.x
};

// default options
var OPTIONS = {
	hwAccelerable: true, // ns.isHWAccelerable(),  // check weather hw acceleration is available
	prefix: "eg-flick", // prefix value of class name
	deceleration: 0.0006, // deceleration value
	horizontal: true, // move direction (true == horizontal, false == vertical)
	circular: false, // circular mode. In this mode at least 3 panels are required.
	previewPadding: null, // preview padding value in left(up) to right(down) order. In this mode at least 5 panels are required.
	bounce: null, // bounce value in left(up) to right(down) order. Works only in non-circular mode.
	threshold: 40, // the distance pixel threshold value for change panel
	duration: 100, // duration ms for animation
	panelEffect: function panelEffect(x) {
		return 1 - Math.pow(1 - x, 3);
	}, // easing function for panel change animation
	defaultIndex: 0, // initial panel index to be shown
	inputType: [// input type
	"touch", "mouse"],
	thresholdAngle: 45, // the threshold value that determines whether user action is horizontal or vertical (0~90)
	adaptiveHeight: false // Set container's height be adaptive according panel's height
};

exports.CONFIG = CONFIG;
exports.OPTIONS = OPTIONS;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _consts = __webpack_require__(1);

var consts = _interopRequireWildcard(_consts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			_classCallCheck(this, _class);

			return _possibleConstructorReturn(this, _superclass.apply(this, arguments));
		}

		/**
   * 'hold' event handler
   */
		_class.prototype._holdHandler = function _holdHandler(e) {
			var conf = this._conf;

			conf.touch.holdPos = e.pos;
			conf.touch.holding = true;
			conf.panel.changed = false;

			this._adjustContainerCss("start", e.pos);
		};

		/**
   * 'change' event handler
   */


		_class.prototype._changeHandler = function _changeHandler(e) {
			var conf = this._conf;
			var touch = conf.touch;
			var posIndex = +!this.options.horizontal;
			var pos = e.pos[posIndex];
			var holdPos = touch.holdPos[posIndex];
			var direction = void 0;
			var eventRes = null;
			var movedPx = void 0;

			this._setPointerEvents(e); // for "click" bug

			/**
    * This event is fired when panel moves.
    * @ko 패널이 이동할 때 발생하는 이벤트
    * @name eg.Flicking#flick
    * @event
    * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
    * @param {String} param.eventType The name of the event<ko>이름명</ko>
    * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
    * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
    * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
    * @param {Array} param.pos Start coordinate <ko>출발점 좌표</ko>
    * @param {Number} param.pos.0 x-coordinate <ko>x 좌표</ko>
    * @param {Number} param.pos.1 y-coordinate <ko>y 좌표</ko>
    * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device. <ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
    * @param {Number} param.distance Distance moved from then starting point. According the move direction, positive on eg.MovableCoord.DIRECTION_LEFT/UP and negative on eg.MovableCoord.DIRECTION_RIGHT/DOWN <ko>시작점부터 이동된 거리의 값. 이동 방향에 따라 eg.MovableCoord.DIRECTION_LEFT/UP의 경우 양수를 eg.MovableCoord.DIRECTION_RIGHT/DOWN의 경우는 음수를 반환</ko>
    */
			if (e.hammerEvent) {
				direction = e.hammerEvent.direction;

				// Adjust direction in case of diagonal touch move
				movedPx = e.hammerEvent[this.options.horizontal ? "deltaX" : "deltaY"];

				if (!~conf.dirData.indexOf(direction)) {
					direction = conf.dirData[+(Math.abs(touch.lastPos) <= movedPx)];
				}

				touch.lastPos = movedPx;
			} else {
				touch.lastPos = null;
			}

			conf.customEvent.flick && (eventRes = this._triggerEvent(consts.EVENTS.flick, {
				pos: e.pos,
				holding: e.holding,
				direction: direction || touch.direction,
				distance: pos - (holdPos || (touch.holdPos[posIndex] = pos))
			}));

			(eventRes || eventRes === null) && this._setTranslate([-pos, 0]);
		};

		/**
   * 'release' event handler
   */


		_class.prototype._releaseHandler = function _releaseHandler(e) {
			var touch = this._conf.touch;
			var pos = e.destPos;
			var posIndex = +!this.options.horizontal;
			var holdPos = touch.holdPos[posIndex];
			var panelSize = this._conf.panel.size;

			touch.distance = e.depaPos[posIndex] - touch.holdPos[posIndex];

			touch.direction = this._conf.dirData[+!(touch.holdPos[posIndex] < e.depaPos[posIndex])];

			pos[posIndex] = Math.max(holdPos - panelSize, Math.min(holdPos, pos[posIndex]));

			touch.destPos[posIndex] = pos[posIndex] = Math.round(pos[posIndex] / panelSize) * panelSize;

			touch.distance === 0 && this._adjustContainerCss("end");
			touch.holding = false;

			this._setPointerEvents(); // for "click" bug
		};

		/**
   * 'animationStart' event handler
   */


		_class.prototype._animationStartHandler = function _animationStartHandler(e) {
			var conf = this._conf;
			var panel = conf.panel;
			var customEvent = conf.customEvent;

			panel.animating = true;

			if (!customEvent.restoreCall && e.hammerEvent && this._setPhaseValue("start", {
				depaPos: e.depaPos,
				destPos: e.destPos
			}) === false) {
				e.stop();
			}

			if (e.hammerEvent) {
				e.duration = this.options.duration;

				e.destPos[+!this.options.horizontal] = panel.size * (panel.index + conf.indexToMove);
			}

			if (this._isMovable()) {
				!customEvent.restoreCall && (customEvent.restore = false);
			} else {
				this._triggerBeforeRestore(e);
			}
		};

		/**
   * 'animationEnd' event handler
   */


		_class.prototype._animationEndHandler = function _animationEndHandler() {
			this._setPhaseValue("end");

			this._conf.panel.animating = false;
			this._triggerRestore();
		};

		return _class;
	}(superclass);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mixin = exports.utils = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _browser = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = {
	/**
  * Select or create element
  * @param {String|HTMLElement} param
  *  when string given is as HTML tag, then create element
  *  otherwise it returns selected elements
  * @returns {HTMLElement}
  */
	$: function $(param) {
		var el = null;

		if (typeof param === "string") {
			// check if string is HTML tag format
			var match = param.match(/^<([a-z]+)\s*([^>]*)>/);

			// creating element
			if (match) {
				el = _browser.document.createElement(match[1]);

				// attributes
				match.length === 3 && match[2].split(" ").forEach(function (v) {
					var attr = v.split("=");

					el.setAttribute(attr[0], attr[1]);
				});
			} else {
				el = _browser.document.querySelectorAll(param);
				el = el.length === 1 ? el[0] : el;
			}
		} else if (param.nodeName && param.nodeType === 1) {
			el = param;
		}

		return el;
	},


	/**
  * Check if is object
  * @param {Object} obj
  * @returns {Boolean}
  */
	isObject: function isObject(obj) {
		return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && !Array.isArray(obj) && obj !== null;
	},


	/**
  * Merge object
  * @param {Object} target
  * @param {Object} source
  * @returns {Object} merged target object
  * @example
  *  var target = { a: 1 };
  *  c3p.extend(target, { b: 2, c: 3 });
  *  target;  // { a: 1, b: 2, c: 3 };
  */
	extend: function extend(target, source) {
		if (this.isObject(target) && this.isObject(source)) {
			for (var key in source) {
				if (this.isObject(source[key])) {
					var _Object$assign;

					!target[key] && Object.assign(target, (_Object$assign = {}, _Object$assign[key] = {}, _Object$assign));
					this.extend(target[key], source[key]);
				} else {
					var _Object$assign2;

					Object.assign(target, (_Object$assign2 = {}, _Object$assign2[key] = source[key], _Object$assign2));
				}
			}
		}
		return target;
	},


	/**
  * Get the style value or apply
  * @param {HTMLElement} el
  * @param {String|Object} style
  *  String: return style property value
  *  Object: set style value
  * @parma {Boolean} getAsNumber - get the value as number
  * @returns {String|HTMLElement}
  */
	css: function css(el, style, getAsNumber) {
		if (typeof style === "string") {
			var value = getComputedStyle(el)[style];

			return getAsNumber ? this.getNumValue(value) : value;
		} else {
			Array.isArray(el) ? el.forEach(function (v) {
				return Object.assign(v.style, style);
			}) : Object.assign(el.style, style);
		}

		return el;
	},


	/**
  * Check and parse value to number
  * @param {Number|String} val
  * @param {Number} defVal
  * @return {Number}
  */
	getNumValue: function getNumValue(val, defVal) {
		var num = val;

		return isNaN(num = parseInt(num, 10)) ? defVal : num;
	},


	/**
  * Return unit formatted value
  * @param {Number|String} val
  * @return {String} val Value formatted with unit
  */
	getUnitValue: function getUnitValue(val) {
		var rx = /(?:[a-z]{2,}|%)$/;

		return (parseInt(val, 10) || 0) + (String(val).match(rx) || "px");
	},


	/**
  * Get element's outerHeight value with margin
  * @param {HTMLElement} el
  * @returns {number}
  */
	outerHeight: function outerHeight(el) {
		var height = el.offsetHeight;
		var style = getComputedStyle(el);

		height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);

		return height;
	},


	/**
  * Checks whether hardware acceleration is enabled.
  *
  * @ko 하드웨어 가속을 사용할 수 있는 환경인지 확인한다
  * @method eg#isHWAccelerable
  * @return {Boolean} Indicates whether hardware acceleration is enabled. <ko>하드웨어 가속 사용 가능 여부</ko>
  * @example
  eg.isHWAccelerable();  // Returns 'true' when hardware acceleration is supported
 	 // also, you can control return value
  eg.hook.isHWAccelerable = function(defalutVal,agent) {
 if(agent.os.name === "ios") {
 // if os is 'ios', return value is 'false'
 return false;
 } else if(agent.browser.name === "chrome" ) {
 // if browser is 'chrome', return value is 'true'
 return true;
 }
 return defaultVal;
 }
  */
	isHWAccelerable: function isHWAccelerable() {
		var ua = _browser.window.navigator.userAgent;
		var result = false;
		var match = void 0;

		// chrome 25- has a text blur bug (except Samsung's sbrowser)
		if (match = ua.match(/Chrome\/(\d+)/)) {
			result = match[1] >= "25";
		} else if (/ie|edge|firefox|safari|inapp/.test(ua)) {
			result = true;
		} else if (match = ua.match(/Android ([\d.]+)/)) {
			var version = match[1];
			var useragent = (ua.match(/\(.*\)/) || [null])[0];

			// android 4.1+ blacklist
			// EK-GN120 : Galaxy Camera, SM-G386F : Galaxy Core LTE
			// SHW-M420 : Galaxy Nexus , SHW-M200 : NexusS , GT-S7562 : Galaxy S duos
			result = version >= "4.1.0" && !/EK-GN120|SM-G386F/.test(useragent) || version >= "4.0.3" && /SHW-|SHV-|GT-|SCH-|SGH-|SPH-|LG-F160|LG-F100|LG-F180|LG-F200|EK-|IM-A|LG-F240|LG-F260/.test(useragent) && !/SHW-M420|SHW-M200|GT-S7562/.test(useragent);
		}

		this.isHWAccelerable = function () {
			return result;
		};
		return result;
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
  * @example
  eg.translate('10px', '200%');  // translate(10px,200%);
  eg.translate('10px', '200%', true);  // translate3d(10px,200%,0);
  */
	translate: function translate(x, y, isHA) {
		return isHA || false ? "translate3d(" + x + "," + y + ",0)" : "translate(" + x + "," + y + ")";
	},


	// 1. user press one position on screen.
	// 2. user moves to the other position on screen.
	// 3. when user releases fingers on screen, 'click' event is fired at previous position.
	hasClickBug: function hasClickBug() {
		var ua = _browser.window.navigator.userAgent;
		var result = /Safari/.test(ua);

		this.hasClickBug = function () {
			return result;
		};
		return result;
	}
};

var MixinBuilder = function () {
	function MixinBuilder(superclass) {
		_classCallCheck(this, MixinBuilder);

		this.superclass = superclass || function () {
			function _class() {
				_classCallCheck(this, _class);
			}

			return _class;
		}();
	}

	MixinBuilder.prototype.with = function _with() {
		for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
			mixins[_key] = arguments[_key];
		}

		return mixins.reduce(function (c, m) {
			return m(c);
		}, this.superclass);
	};

	return MixinBuilder;
}();

var Mixin = function Mixin(superclass) {
	return new MixinBuilder(superclass);
};

exports.utils = utils;
exports.Mixin = Mixin;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Component"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A class used to manage events and options in a component
 * @class
 * @group egjs
 * @name eg.Component
 * @ko 컴포넌트의 이벤트와 옵션을 관리할 수 있게 하는 클래스
 *
 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 */
var Component = exports.Component = function () {
	function Component() {
		_classCallCheck(this, Component);

		this._eventHandler = {};
		this._options = {};
	}
	/**
  * Sets options in a component or returns them.
  * @ko 컴포넌트에 옵션을 설정하거나 옵션을 반환한다
  * @method eg.Component#option
  * @param {String} key The key of the option<ko>옵션의 키</ko>
  * @param {Object} [value] The option value that corresponds to a given key <ko>키에 해당하는 옵션값</ko>
  * @return {eg.Component|Object} An instance, an option value, or an option object of a component itself.<br>- If both key and value are used to set an option, it returns an instance of a component itself.<br>- If only a key is specified for the parameter, it returns the option value corresponding to a given key.<br>- If nothing is specified, it returns an option object. <ko>컴포넌트 자신의 인스턴스나 옵션값, 옵션 객체.<br>- 키와 값으로 옵션을 설정하면 컴포넌트 자신의 인스턴스를 반환한다.<br>- 파라미터에 키만 설정하면 키에 해당하는 옵션값을 반환한다.<br>- 파라미터에 아무것도 설정하지 않으면 옵션 객체를 반환한다.</ko>
  * @example
 	 class Some extends eg.Component{
 		}
 	 const some = new Some({
 		"foo": 1,
 		"bar": 2
 	});
 	 some.option("foo"); // return 1
  some.option("foo",3); // return some instance
  some.option(); // return options object.
  some.option({
 		"foo" : 10,
 		"bar" : 20,
 		"baz" : 30
 	}); // return some instance.
  */


	_createClass(Component, [{
		key: "option",
		value: function option() {
			if (arguments.length >= 2) {
				var _key = arguments.length <= 0 ? undefined : arguments[0];
				var value = arguments.length <= 1 ? undefined : arguments[1];
				this._options[_key] = value;
				return this;
			}

			var key = arguments.length <= 0 ? undefined : arguments[0];
			if (typeof key === "string") {
				return this._options[key];
			}

			if (arguments.length === 0) {
				return this._options;
			}

			var options = key;
			this._options = options;

			return this;
		}
		/**
   * Triggers a custom event.
   * @ko 커스텀 이벤트를 발생시킨다
   * @method eg.Component#trigger
   * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
   * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
   * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다.</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.trigger("hi");// fire hi event.
  		}
  	}
   */

	}, {
		key: "trigger",
		value: function trigger(eventName) {
			var customEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var handlerList = this._eventHandler[eventName] || [];
			var hasHandlerList = handlerList.length > 0;

			if (!hasHandlerList) {
				return true;
			}

			// If detach method call in handler in first time then handeler list calls.
			handlerList = handlerList.concat();

			customEvent.eventType = eventName;

			var isCanceled = false;
			var arg = [customEvent];
			var i = void 0;

			customEvent.stop = function () {
				return isCanceled = true;
			};

			for (var _len = arguments.length, restParam = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
				restParam[_key2 - 2] = arguments[_key2];
			}

			if (restParam.length >= 1) {
				arg = arg.concat(restParam);
			}

			for (i in handlerList) {
				handlerList[i].apply(this, arg);
			}

			return !isCanceled;
		}
		/**
   * Executed event just one time.
   * @ko 이벤트가 한번만 실행된다.
   * @method eg.Component#once
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
  		hi(){
  			alert("hi");
  		}
  		thing(){
  			this.once("hi", this.hi);
  		}
  	}
  	 var some = new Some();
   some.thing();
   some.trigger("hi");
   // fire alert("hi");
   some.trigger("hi");
   // Nothing happens
   */

	}, {
		key: "once",
		value: function once(eventName, handlerToAttach) {
			var _this = this;

			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var i = void 0;
				for (i in eventHash) {
					this.once(i, eventHash[i]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				(function () {
					var self = _this;
					_this.on(eventName, function listener() {
						for (var _len2 = arguments.length, arg = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
							arg[_key3] = arguments[_key3];
						}

						handlerToAttach.apply(self, arg);
						self.off(eventName, listener);
					});
				})();
			}

			return this;
		}

		/**
   * Checks whether an event has been attached to a component.
   * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
   * @method eg.Component#hasOn
   * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
   * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.hasOn("hi");// check hi event.
  		}
  	}
   */

	}, {
		key: "hasOn",
		value: function hasOn(eventName) {
			return !!this._eventHandler[eventName];
		}

		/**
   * Attaches an event to a component.
   * @ko 컴포넌트에 이벤트를 등록한다.
   * @method eg.Component#on
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.on("hi",this.hi); //attach event
  		}
  	}
   */

	}, {
		key: "on",
		value: function on(eventName, handlerToAttach) {
			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var name = void 0;
				for (name in eventHash) {
					this.on(name, eventHash[name]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				var handlerList = this._eventHandler[eventName];

				if (typeof handlerList === "undefined") {
					handlerList = this._eventHandler[eventName] = [];
				}

				handlerList.push(handlerToAttach);
			}

			return this;
		}
		/**
   * Detaches an event from the component.
   * @ko 컴포넌트에 등록된 이벤트를 해제한다
   * @method eg.Component#off
   * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
   * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.off("hi",this.hi); //detach event
  		}
  	}
   */

	}, {
		key: "off",
		value: function off(eventName, handlerToDetach) {
			// All event detach.
			if (typeof eventName === "undefined") {
				this._eventHandler = {};
				return this;
			}

			// All handler of specific event detach.
			if (typeof handlerToDetach === "undefined") {
				if (typeof eventName === "string") {
					this._eventHandler[eventName] = undefined;
					return this;
				} else {
					var eventHash = eventName;
					var name = void 0;
					for (name in eventHash) {
						this.off(name, eventHash[name]);
					}
					return this;
				}
			}

			// The handler of specific event detach.
			var handlerList = this._eventHandler[eventName];
			if (handlerList) {
				var k = void 0;
				var handlerFunction = void 0;
				for (k = 0, handlerFunction; handlerFunction = handlerList[k]; k++) {
					if (handlerFunction === handlerToDetach) {
						handlerList = handlerList.splice(k, 1);
						break;
					}
				}
			}

			return this;
		}
	}]);

	return Component;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _component = __webpack_require__(0);

module.exports = _component.Component;

/***/ })
/******/ ]);
});
//# sourceMappingURL=component.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * All-in-one packaged file for ease use of '@egjs/movablecoord' with below dependencies.
 * NOTE: This is not an official distribution file and is only for user convenience.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MovableCoord"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["MovableCoord"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORT_TOUCH = exports.UNIQUEKEY = exports.DIRECTION = undefined;

var _browser = __webpack_require__(1);

/**
 * @name eg.MovableCoord.DIRECTION_NONE
 * @constant
 * @type {Number}
 */
/**
 * @name eg.MovableCoord.DIRECTION_LEFT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_RIGHT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_UP
 * @constant
 * @type {Number}
 */
/**
 * @name eg.MovableCoord.DIRECTION_DOWN
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_HORIZONTAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_VERTICAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_ALL
 * @constant
 * @type {Number}
*/
var direction = {
  DIRECTION_NONE: 1,
  DIRECTION_LEFT: 2,
  DIRECTION_RIGHT: 4,
  DIRECTION_UP: 8,
  DIRECTION_DOWN: 16,
  DIRECTION_HORIZONTAL: 2 | 4,
  DIRECTION_VERTICAL: 8 | 16
};

direction.DIRECTION_ALL = direction.DIRECTION_HORIZONTAL | direction.DIRECTION_VERTICAL;
var DIRECTION = exports.DIRECTION = direction;
var UNIQUEKEY = exports.UNIQUEKEY = "__MOVABLECOORD__";
var SUPPORT_TOUCH = exports.SUPPORT_TOUCH = "ontouchstart" in _browser.window;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-new-func */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func */

exports.window = win;
var document = exports.document = win.document;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _consts = __webpack_require__(0);

var Coordinate = {
	// get user's direction
	getDirectionByAngle: function getDirectionByAngle(angle, thresholdAngle) {
		if (thresholdAngle < 0 || thresholdAngle > 90) {
			return _consts.DIRECTION.DIRECTION_NONE;
		}
		var toAngle = Math.abs(angle);

		return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ? _consts.DIRECTION.DIRECTION_VERTICAL : _consts.DIRECTION.DIRECTION_HORIZONTAL;
	},
	isHorizontal: function isHorizontal(direction, userDirection) {
		return direction === _consts.DIRECTION.DIRECTION_ALL || direction & _consts.DIRECTION.DIRECTION_HORIZONTAL && userDirection & _consts.DIRECTION.DIRECTION_HORIZONTAL;
	},
	isVertical: function isVertical(direction, userDirection) {
		return direction === _consts.DIRECTION.DIRECTION_ALL || direction & _consts.DIRECTION.DIRECTION_VERTICAL && userDirection & _consts.DIRECTION.DIRECTION_VERTICAL;
	},
	getPointOfIntersection: function getPointOfIntersection(depaPos, destPos, min, max, circular, bounce) {
		var boxLT = [min[0] - bounce[3], min[1] - bounce[0]];
		var boxRB = [max[0] + bounce[1], max[1] + bounce[2]];
		var toDestPos = destPos.concat();

		var xd = destPos[0] - depaPos[0];
		var yd = destPos[1] - depaPos[1];

		if (!circular[3]) {
			toDestPos[0] = Math.max(boxLT[0], toDestPos[0]);
		} // left
		if (!circular[1]) {
			toDestPos[0] = Math.min(boxRB[0], toDestPos[0]);
		} // right
		toDestPos[1] = xd ? depaPos[1] + yd / xd * (toDestPos[0] - depaPos[0]) : toDestPos[1];

		if (!circular[0]) {
			toDestPos[1] = Math.max(boxLT[1], toDestPos[1]);
		} // up
		if (!circular[2]) {
			toDestPos[1] = Math.min(boxRB[1], toDestPos[1]);
		} // down
		toDestPos[0] = yd ? depaPos[0] + xd / yd * (toDestPos[1] - depaPos[1]) : toDestPos[0];
		return [Math.min(max[0], Math.max(min[0], toDestPos[0])), Math.min(max[1], Math.max(min[1], toDestPos[1]))];
	},

	// determine outside
	isOutside: function isOutside(pos, min, max) {
		return pos[0] < min[0] || pos[1] < min[1] || pos[0] > max[0] || pos[1] > max[1];
	},

	// from outside to outside
	isOutToOut: function isOutToOut(pos, destPos, min, max) {
		return (pos[0] < min[0] || pos[0] > max[0] || pos[1] < min[1] || pos[1] > max[1]) && (destPos[0] < min[0] || destPos[0] > max[0] || destPos[1] < min[1] || destPos[1] > max[1]);
	},
	getNextOffsetPos: function getNextOffsetPos(speeds, deceleration) {
		var normalSpeed = Math.sqrt(speeds[0] * speeds[0] + speeds[1] * speeds[1]);
		var duration = Math.abs(normalSpeed / -deceleration);

		return [speeds[0] / 2 * duration, speeds[1] / 2 * duration];
	},
	getDurationFromPos: function getDurationFromPos(pos, deceleration) {
		var normalPos = Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1]);
		var duration = Math.sqrt(normalPos / deceleration * 2);

		// when duration is under 100, then value is zero
		return duration < 100 ? 0 : duration;
	},
	isCircular: function isCircular(destPos, min, max, circular) {
		return circular[0] && destPos[1] < min[1] || circular[1] && destPos[0] > max[0] || circular[2] && destPos[1] > max[1] || circular[3] && destPos[0] < min[0];
	},
	getCircularPos: function getCircularPos(pos, min, max, circular) {
		var toPos = pos.concat();

		if (circular[0] && toPos[1] < min[1]) {
			// up
			toPos[1] = (toPos[1] - min[1]) % (max[1] - min[1] + 1) + max[1];
		}
		if (circular[1] && toPos[0] > max[0]) {
			// right
			toPos[0] = (toPos[0] - min[0]) % (max[0] - min[0] + 1) + min[0];
		}
		if (circular[2] && toPos[1] > max[1]) {
			// down
			toPos[1] = (toPos[1] - min[1]) % (max[1] - min[1] + 1) + min[1];
		}
		if (circular[3] && toPos[0] < min[0]) {
			// left
			toPos[0] = (toPos[0] - min[0]) % (max[0] - min[0] + 1) + max[0];
		}

		toPos[0] = +toPos[0].toFixed(5);
		toPos[1] = +toPos[1].toFixed(5);
		return toPos;
	}
};

exports.default = Coordinate;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.utils = exports.Mixin = undefined;

var _browser = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = {
	getElement: function getElement(el) {
		if (typeof el === "string") {
			return _browser.document.querySelector(el);
		} else if (_browser.window.jQuery && el instanceof jQuery) {
			// if you were using jQuery
			return el.length > 0 ? el[0] : null;
		} else {
			return el;
		}
	}
};

var MixinBuilder = function () {
	function MixinBuilder(superclass) {
		_classCallCheck(this, MixinBuilder);

		this.superclass = superclass || function () {
			function _class() {
				_classCallCheck(this, _class);
			}

			return _class;
		}();
	}

	MixinBuilder.prototype.with = function _with() {
		for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
			mixins[_key] = arguments[_key];
		}

		return mixins.reduce(function (c, m) {
			return m(c);
		}, this.superclass);
	};

	return MixinBuilder;
}();

var Mixin = function Mixin(superclass) {
	return new MixinBuilder(superclass);
};

exports.Mixin = Mixin;
exports.utils = utils;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _component = __webpack_require__(8);

var _component2 = _interopRequireDefault(_component);

var _hammerManager = __webpack_require__(7);

var _hammerManager2 = _interopRequireDefault(_hammerManager);

var _eventHandler = __webpack_require__(6);

var _eventHandler2 = _interopRequireDefault(_eventHandler);

var _animationHandler = __webpack_require__(5);

var _animationHandler2 = _interopRequireDefault(_animationHandler);

var _consts = __webpack_require__(0);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions. You can implement a user interface by applying the logical coordinates provided. For more information on the eg.MovableCoord module, see demos.
 * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치로 전달 받은 사용자의 동작을 가상 좌표계의 논리적 좌표로 변경하는 모듈. 사용자의 동작으로 애니메이션이 일어나면 시간순으로 변경되는 좌표 정보도 제공한다. 변경된 논리적 좌표를 반영해 UI를 구현할 수 있다. eg.MovableCoord 모듈의 자세한 작동 방식은 데모를 참고한다.
 * @class
 * @name eg.MovableCoord
 * @extends eg.Component
 *
 * @param {Object} options The option object of the eg.MovableCoord module<ko>eg.MovableCoord 모듈의 옵션 객체</ko>
 * @param {Array} options.min The minimum value of X and Y coordinates <ko>좌표계의 최솟값</ko>
 * @param {Number} [options.min.0=0] The X coordinate of the minimum <ko>최소 x좌표</ko>
 * @param {Number} [options.min.1=0] The Y coordinate of the minimum <ko>최소 y좌표</ko>
 *
 * @param {Array} options.max The maximum value of X and Y coordinates <ko>좌표계의 최댓값</ko>
 * @param {Number} [options.max.0=100] The X coordinate of the maximum<ko>최대 x좌표</ko>
 * @param {Number} [options.max.1=100] The Y coordinate of the maximum<ko>최대 y좌표</ko>
 *
 * @param {Array} options.bounce The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
 * @param {Boolean} [options.bounce.0=10] The size of top area <ko>위쪽 바운스 영역의 크기</ko>
 * @param {Boolean} [options.bounce.1=10] The size of right area <ko>오른쪽 바운스 영역의 크기</ko>
 * @param {Boolean} [options.bounce.2=10] The size of bottom area <ko>아래쪽 바운스 영역의 크기</ko>
 * @param {Boolean} [options.bounce.3=10] The size of left area <ko>왼쪽 바운스 영역의 크기</ko>
 *
 * @param {Array} options.margin The size of accessible space outside the coordinate area. If an element is dragged outside the coordinate area and then dropped, the coordinates of the element are returned back into the coordinate area. The size of margins that can be exceeded <ko>−	좌표 영역을 넘어 이동할 수 있는 바깥 영역의 크기. 사용자가 좌표를 바깥 영역까지 끌었다가 놓으면 좌표가 좌표 영역 안으로 들어온다.</ko>
 * @param {Boolean} [options.margin.0=0] The size of top margin <ko>위쪽 바깥 영역의 크기</ko>
 * @param {Boolean} [options.margin.1=0] The size of right margin <ko>오른쪽 바깥 영역의 크기</ko>
 * @param {Boolean} [options.margin.2=0] The size of bottom margin <ko>아래쪽 바깥 영역의 크기</ko>
 * @param {Boolean} [options.margin.3=0] The size of left margin <ko>왼쪽 바깥 영역의 크기</ko>
 * @param {Array} options.circular Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
 * @param {Boolean} [options.circular.0=false] Indicates whether to circulate to top <ko>위로 순환 여부</ko>
 * @param {Boolean} [options.circular.1=false] Indicates whether to circulate to right <ko>오른쪽으로 순환 여부</ko>
 * @param {Boolean} [options.circular.2=false] Indicates whether to circulate to bottom  <ko>아래로 순환 여부</ko>
 * @param {Boolean} [options.circular.3=false] Indicates whether to circulate to left  <ko>왼쪽으로 순환 여부</ko>
 *
 * @param {Function} [options.easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
 * @param {Number} [options.maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
 * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
 * @see HammerJS {@link http://hammerjs.github.io}
 * @see • Hammer.JS applies specific CSS properties by default when creating an instance (See {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}). The eg.MovableCoord module removes all default CSS properties provided by Hammer.JS <ko>Hammer.JS는 인스턴스를 생성할 때 기본으로 특정 CSS 속성을 적용한다(참고: @link{http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}). 특정한 상황에서는 Hammer.JS의 속성 때문에 사용성에 문제가 있을 수 있다. eg.MovableCoord 모듈은 Hammer.JS의 기본 CSS 속성을 모두 제거했다</ko>
 *
 * @codepen {"id":"jPPqeR", "ko":"MovableCoord Cube 예제", "en":"MovableCoord Cube example", "collectionId":"AKpkGW", "height": 403}
 *
 * @see Easing Functions Cheat Sheet {@link http://easings.net/}
 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}) <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@lin https://jqueryui.com/easing})를 사용한다</ko>
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
var MovableCoord = function (_Mixin$with) {
	_inherits(MovableCoord, _Mixin$with);

	function MovableCoord(options) {
		_classCallCheck(this, MovableCoord);

		var _this = _possibleConstructorReturn(this, _Mixin$with.call(this));

		Object.assign(_this.options = {
			min: [0, 0],
			max: [100, 100],
			bounce: [10, 10, 10, 10],
			margin: [0, 0, 0, 0],
			circular: [false, false, false, false],
			easing: function easeOutCubic(x) {
				return 1 - Math.pow(1 - x, 3);
			},
			maximumDuration: Infinity,
			deceleration: 0.0006
		}, options);
		_this._reviseOptions();
		_this._hammerManager = new _hammerManager2.default();
		_this._pos = _this.options.min.concat();
		return _this;
	}

	/**
  * Registers an element to use the eg.MovableCoord module.
  * @ko eg.MovableCoord 모듈을 사용할 엘리먼트를 등록한다
  * @method eg.MovableCoord#bind
  * @param {HTMLElement|String|jQuery} element An element to use the eg.MovableCoord module<ko>−	eg.MovableCoord 모듈을 사용할 엘리먼트</ko>
  * @param {Object} options The option object of the bind() method <ko>bind() 메서드의 옵션 객체</ko>
  * @param {Number} [options.direction=eg.MovableCoord.DIRECTION_ALL] Coordinate direction that a user can move<br>- eg.MovableCoord.DIRECTION_ALL: All directions available.<br>- eg.MovableCoord.DIRECTION_HORIZONTAL: Horizontal direction only.<br>- eg.MovableCoord.DIRECTION_VERTICAL: Vertical direction only<ko>사용자의 동작으로 움직일 수 있는 좌표의 방향.<br>- eg.MovableCoord.DIRECTION_ALL: 모든 방향으로 움직일 수 있다.<br>- eg.MovableCoord.DIRECTION_HORIZONTAL: 가로 방향으로만 움직일 수 있다.<br>- eg.MovableCoord.DIRECTION_VERTICAL: 세로 방향으로만 움직일 수 있다.</ko>
  * @param {Array} options.scale Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
  * @param {Number} [options.scale.0=1] X-axis scale <ko>x축 배율</ko>
  * @param {Number} [options.scale.1=1] Y-axis scale <ko>y축 배율</ko>
  * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
  * @param {Number} [options.interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>진행 중인 애니메이션 중지 가능 여부.<br>- true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.<br>- false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
  * @param {Array} [options.inputType] Types of input devices. (default: ["touch", "mouse"])<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.(기본값: ["touch", "mouse"])<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
  *
  * @return {eg.MovableCoord} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	MovableCoord.prototype.bind = function bind(element, options) {
		this._hammerManager.add(element, options, this);
		return this;
	};
	/**
  * Detaches an element using the eg.MovableCoord module.
  * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트를 해제한다
  * @method eg.MovableCoord#unbind
  * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is detached<ko>eg.MovableCoord 모듈을 해제할 엘리먼트</ko>
  * @return {eg.MovableCoord} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	MovableCoord.prototype.unbind = function unbind(element) {
		this._hammerManager.remove(element);
		return this;
	};

	/**
  * get a hammer instance from elements using the eg.MovableCoord module.
  * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트에서 hammer 객체를 얻는다
  * @method eg.MovableCoord#getHammer
  * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is using<ko>eg.MovableCoord 모듈을 사용하는 엘리먼트</ko>
  * @return {Hammer|null} An instance of Hammer.JS<ko>Hammer.JS의 인스턴스</ko>
  */


	MovableCoord.prototype.getHammer = function getHammer(element) {
		return this._hammerManager.getHammer(element);
	};

	/**
  * Enables input devices
  * @ko 입력 장치를 사용할 수 있게 한다
  * @method eg.MovableCoord#enableInput
  * @param {HTMLElement|String|jQuery} [element] An element from which the eg.MovableCoord module is using (if the element parameter is not present, it applies to all binded elements)<ko>eg.MovableCoord 모듈을 	사용하는 엘리먼트 (element 파라미터가 존재하지 않을 경우, 바인드된 모든 엘리먼트에 적용된다)</ko>
  * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
 */


	MovableCoord.prototype.enableInput = function enableInput(element) {
		return this._hammerManager.inputControl(true, element);
	};

	/**
  * Disables input devices
  * @ko 입력 장치를 사용할 수 없게 한다.
  * @method eg.MovableCoord#disableInput
  * @param {HTMLElement|String|jQuery} [element] An element from which the eg.MovableCoord module is using (if the element parameter is not present, it applies to all binded elements)<<ko>eg.MovableCoord 모듈을 	사용하는 엘리먼트 (element 파라미터가 존재하지 않을 경우, 바인드된 모든 엘리먼트에 적용된다)</ko>
  * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
  */


	MovableCoord.prototype.disableInput = function disableInput(element) {
		return this._hammerManager.inputControl(false, element);
	};

	// set up 'css' expression


	MovableCoord.prototype._reviseOptions = function _reviseOptions() {
		var _this2 = this;

		var key = void 0;

		["bounce", "margin", "circular"].forEach(function (v) {
			key = _this2.options[v];
			if (key != null) {
				if (key.constructor === Array) {
					_this2.options[v] = key.length === 2 ? key.concat(key) : key.concat();
				} else if (/string|number|boolean/.test(typeof key === "undefined" ? "undefined" : _typeof(key))) {
					_this2.options[v] = [key, key, key, key];
				} else {
					_this2.options[v] = null;
				}
			}
		});
	};

	/**
  * Returns the current position of the logical coordinates.
  * @ko 논리적 좌표의 현재 위치를 반환한다
  * @method eg.MovableCoord#get
  * @return {Array} pos <ko>좌표</ko>
  * @return {Number} pos.0 The X coordinate <ko>x 좌표</ko>
  * @return {Number} pos.1 The Y coordinate <ko>y 좌표</ko>
  */


	MovableCoord.prototype.get = function get() {
		return this._pos.concat();
	};

	/**
  * Destroys elements, properties, and events used in a module.
  * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
  * @method eg.MovableCoord#destroy
  */


	MovableCoord.prototype.destroy = function destroy() {
		this.off();
		this._hammerManager.destroy();
	};

	return MovableCoord;
}((0, _utils.Mixin)(_component2.default).with(_eventHandler2.default, _animationHandler2.default));

Object.assign(MovableCoord, _consts.DIRECTION);
MovableCoord.VERSION = "2.0.0-beta";
exports.default = MovableCoord;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _coordinate = __webpack_require__(2);

var _coordinate2 = _interopRequireDefault(_coordinate);

var _browser = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, _superclass.call(this));

			_this._raf = null;
			_this._animateParam = null;
			_this._animationEnd = _this._animationEnd.bind(_this); // for caching
			_this._restore = _this._restore.bind(_this); // for caching
			return _this;
		}

		_class.prototype._grab = function _grab(min, max, circular) {
			if (this._animateParam) {
				this.trigger("animationEnd");
				var orgPos = this.get();

				var pos = _coordinate2.default.getCircularPos(this.get(), min, max, circular);

				if (pos[0] !== orgPos[0] || pos[1] !== orgPos[1]) {
					this._setPosAndTriggerChange(pos, true);
				}
				this._animateParam = null;
				this._raf && _browser.window.cancelAnimationFrame(this._raf);
				this._raf = null;
			}
		};

		_class.prototype._prepareParam = function _prepareParam(absPos, duration, hammerEvent) {
			var pos = this.get();
			var min = this.options.min;
			var max = this.options.max;
			var circular = this.options.circular;
			var maximumDuration = this.options.maximumDuration;
			var destPos = _coordinate2.default.getPointOfIntersection(pos, absPos, min, max, circular, this.options.bounce);

			destPos = _coordinate2.default.isOutToOut(pos, destPos, min, max) ? pos : destPos;

			var distance = [Math.abs(destPos[0] - pos[0]), Math.abs(destPos[1] - pos[1])];
			var newDuration = duration == null ? _coordinate2.default.getDurationFromPos(distance, this.options.deceleration) : duration;

			newDuration = maximumDuration > newDuration ? newDuration : maximumDuration;
			return {
				depaPos: pos.concat(),
				destPos: destPos.concat(),
				isBounce: _coordinate2.default.isOutside(destPos, min, max),
				isCircular: _coordinate2.default.isCircular(absPos, min, max, circular),
				duration: newDuration,
				distance: distance,
				hammerEvent: hammerEvent || null,
				done: this._animationEnd
			};
		};

		_class.prototype._restore = function _restore(complete, hammerEvent) {
			var pos = this.get();
			var min = this.options.min;
			var max = this.options.max;

			this._animate(this._prepareParam([Math.min(max[0], Math.max(min[0], pos[0])), Math.min(max[1], Math.max(min[1], pos[1]))], null, hammerEvent), complete);
		};

		_class.prototype._animationEnd = function _animationEnd() {
			this._animateParam = null;
			var orgPos = this.get();
			var nextPos = _coordinate2.default.getCircularPos([Math.round(orgPos[0]), Math.round(orgPos[1])], this.options.min, this.options.max, this.options.circular);

			this.setTo.apply(this, nextPos);
			this._setInterrupt(false);
			/**
    * This event is fired when animation ends.
    * @ko 에니메이션이 끝났을 때 발생한다.
    * @name eg.MovableCoord#animationEnd
    * @event
    */
			this.trigger("animationEnd");
		};

		_class.prototype._animate = function _animate(param, complete) {
			this._animateParam = Object.assign({}, param);
			this._animateParam.startTime = new Date().getTime();
			if (param.duration) {
				var info = this._animateParam;
				var self = this;

				(function loop() {
					/* eslint-disable no-underscore-dangle */
					self._raf = null;
					if (self._frame(info) >= 1) {
						// deferred.resolve();
						complete();
						return;
					} // animationEnd
					self._raf = _browser.window.requestAnimationFrame(loop);
					/* eslint-enable no-underscore-dangle */
				})();
			} else {
				this._setPosAndTriggerChange(param.destPos, false);
				complete();
			}
		};

		_class.prototype._animateTo = function _animateTo(absPos, duration, hammerEvent) {
			var _this2 = this;

			var param = this._prepareParam(absPos, duration, hammerEvent);
			var retTrigger = this.trigger("animationStart", param);

			// You can't stop the 'animationStart' event when 'circular' is true.
			if (param.isCircular && !retTrigger) {
				throw new Error("You can't stop the 'animation' event when 'circular' is true.");
			}

			if (retTrigger) {
				var queue = [];
				var dequeue = function dequeue() {
					var task = queue.shift();

					task && task.call(this);
				};

				if (param.depaPos[0] !== param.destPos[0] || param.depaPos[1] !== param.destPos[1]) {
					queue.push(function () {
						return _this2._animate(param, dequeue);
					});
				}
				if (_coordinate2.default.isOutside(param.destPos, this.options.min, this.options.max)) {
					queue.push(function () {
						return _this2._restore(dequeue, hammerEvent);
					});
				}
				queue.push(function () {
					return _this2._animationEnd();
				});
				dequeue();
			}
		};

		// animation frame (0~1)


		_class.prototype._frame = function _frame(param) {
			var curTime = new Date() - param.startTime;
			var easingPer = this._easing(curTime / param.duration);
			var pos = [param.depaPos[0], param.depaPos[1]];

			for (var i = 0; i < 2; i++) {
				pos[i] !== param.destPos[i] && (pos[i] += (param.destPos[i] - pos[i]) * easingPer);
			}
			pos = _coordinate2.default.getCircularPos(pos, this.options.min, this.options.max, this.options.circular);
			this._setPosAndTriggerChange(pos, false);
			return easingPer;
		};

		// trigger 'change' event


		_class.prototype._setPosAndTriggerChange = function _setPosAndTriggerChange(position, holding, e) {
			/**
    * This event is fired when coordinate changes.
    * @ko 좌표가 변경됐을 때 발생하는 이벤트
    * @name eg.MovableCoord#change
    * @event
    *
    * @param {Object} param The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
    * @param {Array} param.position departure coordinate  <ko>좌표</ko>
    * @param {Number} param.position.0 The X coordinate <ko>x 좌표</ko>
    * @param {Number} param.pos.1 The Y coordinate <ko>y 좌표</ko>
    * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
    * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
    *
    */
			this._pos = position.concat();
			this.trigger("change", {
				pos: position.concat(),
				holding: holding,
				hammerEvent: e || null
			});
		};

		_class.prototype._easing = function _easing(p) {
			return p > 1 ? 1 : this.options.easing(p);
		};

		/**
   * Moves an element to specific coordinates.
   * @ko 좌표를 이동한다.
   * @method eg.MovableCoord#setTo
   * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
   * @param {Number} y The Y coordinate to move to  <ko>이동할 y좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
   */


		_class.prototype.setTo = function setTo(x, y) {
			var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			var toX = x;
			var toY = y;
			var min = this.options.min;
			var max = this.options.max;
			var circular = this.options.circular;

			this._grab(min, max, circular);
			var pos = this.get();

			if (x === pos[0] && y === pos[1]) {
				return this;
			}

			this._setInterrupt(true);
			if (x !== pos[0]) {
				if (!circular[3]) {
					toX = Math.max(min[0], toX);
				}
				if (!circular[1]) {
					toX = Math.min(max[0], toX);
				}
			}
			if (y !== pos[1]) {
				if (!circular[0]) {
					toY = Math.max(min[1], toY);
				}
				if (!circular[2]) {
					toY = Math.min(max[1], toY);
				}
			}
			if (duration) {
				this._animateTo([toX, toY], duration);
			} else {
				this._pos = _coordinate2.default.getCircularPos([toX, toY], min, max, circular);
				this._setPosAndTriggerChange(this._pos, false);
				this._setInterrupt(false);
			}
			return this;
		};

		/**
   * Moves an element from the current coordinates to specific coordinates. The change event is fired when the method is executed.
   * @ko 현재 좌표를 기준으로 좌표를 이동한다. 메서드가 실행되면 change 이벤트가 발생한다
   * @method eg.MovableCoord#setBy
   * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
   * @param {Number} y The Y coordinate to move to <ko>이동할 y좌표</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
   * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
   */


		_class.prototype.setBy = function setBy(x, y) {
			var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			return this.setTo(x != null ? this._pos[0] + x : this._pos[0], y != null ? this._pos[1] + y : this._pos[1], duration);
		};

		return _class;
	}(superclass);
};

module.exports = exports["default"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _coordinate = __webpack_require__(2);

var _coordinate2 = _interopRequireDefault(_coordinate);

var _consts = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, _superclass.call(this));

			_this._status = {
				grabOutside: false, // check whether user's action started on outside
				currentHammer: null, // current hammer instance
				currentOptions: {}, // current bind options
				moveDistance: null, // a position of the first user's action
				prevented: false //  check whether the animation event was prevented
			};
			return _this;
		}

		_class.prototype._setCurrentTarget = function _setCurrentTarget(hammer, options) {
			this._status.currentOptions = options;
			this._status.currentHanmmer = hammer;
		};

		// panstart event handler


		_class.prototype._start = function _start(e) {
			if (!this._status.currentOptions.interruptable && this._status.prevented) {
				return;
			}
			var pos = this.get();
			var min = this.options.min;
			var max = this.options.max;

			this._setInterrupt(true);
			this._grab(min, max, this.options.circular);
			/**
    * This event is fired when a user holds an element on the screen of the device.
    * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
    * @name eg.MovableCoord#hold
    * @event
    * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
    * @param {Array} param.pos coordinate <ko>좌표 정보</ko>
    * @param {Number} param.pos.0 The X coordinate<ko>x 좌표</ko>
    * @param {Number} param.pos.1 The Y coordinate<ko>y 좌표</ko>
    * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
    *
    */
			this.trigger("hold", {
				pos: pos.concat(),
				hammerEvent: e
			});

			this._status.moveDistance = pos.concat();
			this._status.grabOutside = _coordinate2.default.isOutside(pos, min, max);
		};

		// panmove event handler


		_class.prototype._move = function _move(e) {
			if (!this._isInterrupting() || !this._status.moveDistance) {
				return;
			}
			var pos = this.get(true);
			var min = this.options.min;
			var max = this.options.max;
			var bounce = this.options.bounce;
			var margin = this.options.margin;
			var currentOptions = this._status.currentOptions;
			var direction = currentOptions.direction;
			var scale = currentOptions.scale;
			var userDirection = _coordinate2.default.getDirectionByAngle(e.angle, currentOptions.thresholdAngle);
			var out = [margin[0] + bounce[0], margin[1] + bounce[1], margin[2] + bounce[2], margin[3] + bounce[3]];
			var prevent = false;

			// not support offset properties in Hammerjs - start
			var prevInput = this._status.currentHanmmer.session.prevInput;

			/* eslint-disable no-param-reassign */
			if (prevInput) {
				e.offsetX = e.deltaX - prevInput.deltaX;
				e.offsetY = e.deltaY - prevInput.deltaY;
			} else {
				e.offsetX = e.offsetY = 0;
			}

			// not support offset properties in Hammerjs - end
			if (_coordinate2.default.isHorizontal(direction, userDirection)) {
				this._status.moveDistance[0] += e.offsetX * scale[0];
				prevent = true;
			}
			if (_coordinate2.default.isVertical(direction, userDirection)) {
				this._status.moveDistance[1] += e.offsetY * scale[1];
				prevent = true;
			}
			if (prevent) {
				e.srcEvent.preventDefault();
				e.srcEvent.stopPropagation();
			}
			e.preventSystemEvent = prevent;
			/* eslint-enable no-param-reassign */

			pos[0] = this._status.moveDistance[0];
			pos[1] = this._status.moveDistance[1];
			pos = _coordinate2.default.getCircularPos(pos, min, max, this.options.circular);

			// from outside to inside
			if (this._status.grabOutside && !_coordinate2.default.isOutside(pos, min, max)) {
				this._status.grabOutside = false;
			}

			// when move pointer is held in outside
			var tv = void 0;
			var tn = void 0;
			var tx = void 0;

			if (this._status.grabOutside) {
				tn = min[0] - out[3];
				tx = max[0] + out[1];
				tv = pos[0];
				pos[0] = tv > tx ? tx : tv < tn ? tn : tv;
				tn = min[1] - out[0];
				tx = max[1] + out[2];
				tv = pos[1];
				pos[1] = tv > tx ? tx : tv < tn ? tn : tv;
			} else {
				// when start pointer is held in inside
				// get a initialization slope value to prevent smooth animation.
				var initSlope = this._easing(0.00001) / 0.00001;

				if (pos[1] < min[1]) {
					// up
					tv = (min[1] - pos[1]) / (out[0] * initSlope);
					pos[1] = min[1] - this._easing(tv) * out[0];
				} else if (pos[1] > max[1]) {
					// down
					tv = (pos[1] - max[1]) / (out[2] * initSlope);
					pos[1] = max[1] + this._easing(tv) * out[2];
				}
				if (pos[0] < min[0]) {
					// left
					tv = (min[0] - pos[0]) / (out[3] * initSlope);
					pos[0] = min[0] - this._easing(tv) * out[3];
				} else if (pos[0] > max[0]) {
					// right
					tv = (pos[0] - max[0]) / (out[1] * initSlope);
					pos[0] = max[0] + this._easing(tv) * out[1];
				}
			}
			this._setPosAndTriggerChange(pos, true, e);
		};

		// panend event handler


		_class.prototype._end = function _end(e) {
			var pos = this.get();

			if (!this._isInterrupting() || !this._status.moveDistance) {
				return;
			}

			// Abort the animating post process when "tap" occurs
			if (e.distance === 0 /* e.type === "tap" */) {
					this._setInterrupt(false);
					this.trigger("release", {
						depaPos: pos.concat(),
						destPos: pos.concat(),
						hammerEvent: e || null
					});
				} else {
				var direction = this._status.currentOptions.direction;
				var scale = this._status.currentOptions.scale;
				var vX = Math.abs(e.velocityX);
				var vY = Math.abs(e.velocityY);

				!(direction & _consts.DIRECTION.DIRECTION_HORIZONTAL) && (vX = 0);
				!(direction & _consts.DIRECTION.DIRECTION_VERTICAL) && (vY = 0);

				var offset = _coordinate2.default.getNextOffsetPos([vX * (e.deltaX < 0 ? -1 : 1) * scale[0], vY * (e.deltaY < 0 ? -1 : 1) * scale[1]], this.options.deceleration);
				var destPos = [pos[0] + offset[0], pos[1] + offset[1]];

				destPos = _coordinate2.default.getPointOfIntersection(pos, destPos, this.options.min, this.options.max, this.options.circular, this.options.bounce);
				/**
     * This event is fired when a user release an element on the screen of the device.
     * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
     * @name eg.MovableCoord#release
     * @event
     *
     * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @param {Array} param.depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표현재 </ko>
     * @param {Number} param.depaPos.0 The X coordinate <ko> x 좌표</ko>
     * @param {Number} param.depaPos.1 The Y coordinate <ko> y 좌표</ko>
     * @param {Array} param.destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
     * @param {Number} param.destPos.0 The X coordinate <ko>x 좌표</ko>
     * @param {Number} param.destPos.1 The Y coordinate <ko>y 좌표</ko>
     * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다</ko>
     *
     */
				this.trigger("release", {
					depaPos: pos.concat(),
					destPos: destPos,
					hammerEvent: e || null
				});
				if (pos[0] !== destPos[0] || pos[1] !== destPos[1]) {
					this._animateTo(destPos, null, e || null);
				} else {
					this._setInterrupt(false);
				}
			}
			this._status.moveDistance = null;
		};

		_class.prototype._isInterrupting = function _isInterrupting() {
			// when interruptable is 'true', return value is always 'true'.
			return this._status.currentOptions.interruptable || this._status.prevented;
		};

		_class.prototype._setInterrupt = function _setInterrupt(prevented) {
			!this._status.currentOptions.interruptable && (this._status.prevented = prevented);
		};

		return _class;
	}(superclass);
};

module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _hammerjs = __webpack_require__(9);

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var _utils = __webpack_require__(3);

var _consts = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof _hammerjs2.default === "undefined") {
	throw new Error("The Hammerjs must be loaded before eg.MovableCoord.\nhttp://hammerjs.github.io/");
}

var HammerManager = function () {
	function HammerManager() {
		_classCallCheck(this, HammerManager);

		this._hammers = {};
	}

	HammerManager.prototype._createHammer = function _createHammer(el, bindOptions, inputClass, handler) {
		try {
			// create Hammer
			return this._attachHammerEvents(new _hammerjs2.default.Manager(el, {
				recognizers: [[_hammerjs2.default.Pan, {
					direction: bindOptions.direction,
					threshold: 0
				}]],

				// css properties were removed due to usablility issue
				// http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
				cssProps: {
					userSelect: "none",
					touchSelect: "none",
					touchCallout: "none",
					userDrag: "none"
				},
				inputClass: inputClass
			}), bindOptions, handler);
		} catch (e) {
			return null;
		}
	};

	HammerManager.prototype.add = function add(element, options, handler) {
		var el = _utils.utils.getElement(element);
		var keyValue = el.getAttribute(_consts.UNIQUEKEY);
		var bindOptions = Object.assign({
			direction: _consts.DIRECTION.DIRECTION_ALL,
			scale: [1, 1],
			thresholdAngle: 45,
			interruptable: true,
			inputType: ["touch", "mouse"]
		}, options);
		var inputClass = this.convertInputType(bindOptions.inputType);

		if (!inputClass) {
			return;
		}

		if (keyValue) {
			this._hammers[keyValue].hammer.destroy();
		} else {
			keyValue = Math.round(Math.random() * new Date().getTime());
		}
		this._hammers[keyValue] = {
			hammer: this._createHammer(el, bindOptions, inputClass, handler),
			el: el,
			options: bindOptions
		};
		el.setAttribute(_consts.UNIQUEKEY, keyValue);
	};

	HammerManager.prototype.remove = function remove(element) {
		var el = _utils.utils.getElement(element);
		var key = el.getAttribute(_consts.UNIQUEKEY);

		if (key) {
			this._hammers[key].hammer.destroy();
			delete this._hammers[key];
			el.removeAttribute(_consts.UNIQUEKEY);
		}
	};

	HammerManager.prototype.getHammer = function getHammer(element) {
		var data = this.get(element);

		return data ? data.hammer : null;
	};

	HammerManager.prototype.get = function get(element) {
		var el = _utils.utils.getElement(element);
		var key = el ? el.getAttribute(_consts.UNIQUEKEY) : null;

		if (key && this._hammers[key]) {
			return this._hammers[key];
		} else {
			return null;
		}
	};

	HammerManager.prototype._attachHammerEvents = function _attachHammerEvents(hammer, options, handler) {
		var enable = hammer.get("pan").options.enable;

		/* eslint-disable no-underscore-dangle */
		return hammer.on("hammer.input", function (e) {
			if (e.isFirst) {
				// apply options each
				handler._setCurrentTarget(hammer, options);
				enable && handler._start(e);
			} else if (e.isFinal) {
				// substitute .on("panend tap", this._panend); Because it(tap, panend) cannot catch vertical(horizontal) movement on HORIZONTAL(VERTICAL) mode.
				enable && handler._end(e);
			}
		}).on("panstart panmove", function (e) {
			return handler._move(e);
		});
		/* eslint-enable no-underscore-dangle */
	};

	HammerManager.prototype._detachHammerEvents = function _detachHammerEvents(hammer) {
		hammer.off("hammer.input panstart panmove panend");
	};

	HammerManager.prototype.convertInputType = function convertInputType() {
		var inputType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		var hasTouch = false;
		var hasMouse = false;
		var inputs = inputType || [];

		inputs.forEach(function (v) {
			switch (v) {
				case "mouse":
					hasMouse = true;break;
				case "touch":
					hasTouch = _consts.SUPPORT_TOUCH;
			}
		});

		return hasTouch && _hammerjs2.default.TouchInput || hasMouse && _hammerjs2.default.MouseInput || null;
	};

	HammerManager.prototype.inputControl = function inputControl(isEnable, element) {
		var option = {
			enable: isEnable
		};

		if (element) {
			var hammer = this.getHammer(element);

			hammer && hammer.get("pan").set(option);
		} else {
			// for multi
			for (var p in this._hammers) {
				this._hammers[p].hammer.get("pan").set(option);
			}
		}
		return this;
	};

	HammerManager.prototype.destroy = function destroy() {
		for (var p in this._hammers) {
			this._hammers[p].hammer.destroy();
			this._hammers[p].el.removeAttribute(_consts.UNIQUEKEY);
			delete this._hammers[p];
		}
		this._hammers = {};
	};

	return HammerManager;
}();

exports.default = HammerManager;
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Component"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A class used to manage events and options in a component
 * @class
 * @group egjs
 * @name eg.Component
 * @ko 컴포넌트의 이벤트와 옵션을 관리할 수 있게 하는 클래스
 *
 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 */
var Component = exports.Component = function () {
	function Component() {
		_classCallCheck(this, Component);

		this._eventHandler = {};
		this._options = {};
	}
	/**
  * Sets options in a component or returns them.
  * @ko 컴포넌트에 옵션을 설정하거나 옵션을 반환한다
  * @method eg.Component#option
  * @param {String} key The key of the option<ko>옵션의 키</ko>
  * @param {Object} [value] The option value that corresponds to a given key <ko>키에 해당하는 옵션값</ko>
  * @return {eg.Component|Object} An instance, an option value, or an option object of a component itself.<br>- If both key and value are used to set an option, it returns an instance of a component itself.<br>- If only a key is specified for the parameter, it returns the option value corresponding to a given key.<br>- If nothing is specified, it returns an option object. <ko>컴포넌트 자신의 인스턴스나 옵션값, 옵션 객체.<br>- 키와 값으로 옵션을 설정하면 컴포넌트 자신의 인스턴스를 반환한다.<br>- 파라미터에 키만 설정하면 키에 해당하는 옵션값을 반환한다.<br>- 파라미터에 아무것도 설정하지 않으면 옵션 객체를 반환한다.</ko>
  * @example
 	 class Some extends eg.Component{
 		}
 	 const some = new Some({
 		"foo": 1,
 		"bar": 2
 	});
 	 some.option("foo"); // return 1
  some.option("foo",3); // return some instance
  some.option(); // return options object.
  some.option({
 		"foo" : 10,
 		"bar" : 20,
 		"baz" : 30
 	}); // return some instance.
  */


	_createClass(Component, [{
		key: "option",
		value: function option() {
			if (arguments.length >= 2) {
				var _key = arguments.length <= 0 ? undefined : arguments[0];
				var value = arguments.length <= 1 ? undefined : arguments[1];
				this._options[_key] = value;
				return this;
			}

			var key = arguments.length <= 0 ? undefined : arguments[0];
			if (typeof key === "string") {
				return this._options[key];
			}

			if (arguments.length === 0) {
				return this._options;
			}

			var options = key;
			this._options = options;

			return this;
		}
		/**
   * Triggers a custom event.
   * @ko 커스텀 이벤트를 발생시킨다
   * @method eg.Component#trigger
   * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
   * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
   * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다.</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.trigger("hi");// fire hi event.
  		}
  	}
   */

	}, {
		key: "trigger",
		value: function trigger(eventName) {
			var customEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var handlerList = this._eventHandler[eventName] || [];
			var hasHandlerList = handlerList.length > 0;

			if (!hasHandlerList) {
				return true;
			}

			// If detach method call in handler in first time then handeler list calls.
			handlerList = handlerList.concat();

			customEvent.eventType = eventName;

			var isCanceled = false;
			var arg = [customEvent];
			var i = void 0;

			customEvent.stop = function () {
				return isCanceled = true;
			};

			for (var _len = arguments.length, restParam = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
				restParam[_key2 - 2] = arguments[_key2];
			}

			if (restParam.length >= 1) {
				arg = arg.concat(restParam);
			}

			for (i in handlerList) {
				handlerList[i].apply(this, arg);
			}

			return !isCanceled;
		}
		/**
   * Executed event just one time.
   * @ko 이벤트가 한번만 실행된다.
   * @method eg.Component#once
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
  		hi(){
  			alert("hi");
  		}
  		thing(){
  			this.once("hi", this.hi);
  		}
  	}
  	 var some = new Some();
   some.thing();
   some.trigger("hi");
   // fire alert("hi");
   some.trigger("hi");
   // Nothing happens
   */

	}, {
		key: "once",
		value: function once(eventName, handlerToAttach) {
			var _this = this;

			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var i = void 0;
				for (i in eventHash) {
					this.once(i, eventHash[i]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				(function () {
					var self = _this;
					_this.on(eventName, function listener() {
						for (var _len2 = arguments.length, arg = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
							arg[_key3] = arguments[_key3];
						}

						handlerToAttach.apply(self, arg);
						self.off(eventName, listener);
					});
				})();
			}

			return this;
		}

		/**
   * Checks whether an event has been attached to a component.
   * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
   * @method eg.Component#hasOn
   * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
   * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.hasOn("hi");// check hi event.
  		}
  	}
   */

	}, {
		key: "hasOn",
		value: function hasOn(eventName) {
			return !!this._eventHandler[eventName];
		}

		/**
   * Attaches an event to a component.
   * @ko 컴포넌트에 이벤트를 등록한다.
   * @method eg.Component#on
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.on("hi",this.hi); //attach event
  		}
  	}
   */

	}, {
		key: "on",
		value: function on(eventName, handlerToAttach) {
			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var name = void 0;
				for (name in eventHash) {
					this.on(name, eventHash[name]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				var handlerList = this._eventHandler[eventName];

				if (typeof handlerList === "undefined") {
					handlerList = this._eventHandler[eventName] = [];
				}

				handlerList.push(handlerToAttach);
			}

			return this;
		}
		/**
   * Detaches an event from the component.
   * @ko 컴포넌트에 등록된 이벤트를 해제한다
   * @method eg.Component#off
   * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
   * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.off("hi",this.hi); //detach event
  		}
  	}
   */

	}, {
		key: "off",
		value: function off(eventName, handlerToDetach) {
			// All event detach.
			if (typeof eventName === "undefined") {
				this._eventHandler = {};
				return this;
			}

			// All handler of specific event detach.
			if (typeof handlerToDetach === "undefined") {
				if (typeof eventName === "string") {
					this._eventHandler[eventName] = undefined;
					return this;
				} else {
					var eventHash = eventName;
					var name = void 0;
					for (name in eventHash) {
						this.off(name, eventHash[name]);
					}
					return this;
				}
			}

			// The handler of specific event detach.
			var handlerList = this._eventHandler[eventName];
			if (handlerList) {
				var k = void 0;
				var handlerFunction = void 0;
				for (k = 0, handlerFunction; handlerFunction = handlerList[k]; k++) {
					if (handlerFunction === handlerToDetach) {
						handlerList = handlerList.splice(k, 1);
						break;
					}
				}
			}

			return this;
		}
	}]);

	return Component;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _component = __webpack_require__(0);

module.exports = _component.Component;

/***/ })
/******/ ]);
});
//# sourceMappingURL=component.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return Hammer;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _movableCoord = __webpack_require__(4);

var _movableCoord2 = _interopRequireDefault(_movableCoord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _movableCoord2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5OWY3NzE0OWQ4OGQxNThkZjU0MiIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb29yZGluYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92YWJsZUNvb3JkLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb25IYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbW1lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9AZWdqcy9jb21wb25lbnQvZGlzdC9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oYW1tZXJqcy9oYW1tZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRpcmVjdGlvbiIsIkRJUkVDVElPTl9OT05FIiwiRElSRUNUSU9OX0xFRlQiLCJESVJFQ1RJT05fUklHSFQiLCJESVJFQ1RJT05fVVAiLCJESVJFQ1RJT05fRE9XTiIsIkRJUkVDVElPTl9IT1JJWk9OVEFMIiwiRElSRUNUSU9OX1ZFUlRJQ0FMIiwiRElSRUNUSU9OX0FMTCIsIkRJUkVDVElPTiIsIlVOSVFVRUtFWSIsIlNVUFBPUlRfVE9VQ0giLCJ3aW4iLCJ3aW5kb3ciLCJNYXRoIiwic2VsZiIsIkZ1bmN0aW9uIiwiZG9jdW1lbnQiLCJDb29yZGluYXRlIiwiZ2V0RGlyZWN0aW9uQnlBbmdsZSIsImFuZ2xlIiwidGhyZXNob2xkQW5nbGUiLCJ0b0FuZ2xlIiwiYWJzIiwiaXNIb3Jpem9udGFsIiwidXNlckRpcmVjdGlvbiIsImlzVmVydGljYWwiLCJnZXRQb2ludE9mSW50ZXJzZWN0aW9uIiwiZGVwYVBvcyIsImRlc3RQb3MiLCJtaW4iLCJtYXgiLCJjaXJjdWxhciIsImJvdW5jZSIsImJveExUIiwiYm94UkIiLCJ0b0Rlc3RQb3MiLCJjb25jYXQiLCJ4ZCIsInlkIiwiaXNPdXRzaWRlIiwicG9zIiwiaXNPdXRUb091dCIsImdldE5leHRPZmZzZXRQb3MiLCJzcGVlZHMiLCJkZWNlbGVyYXRpb24iLCJub3JtYWxTcGVlZCIsInNxcnQiLCJkdXJhdGlvbiIsImdldER1cmF0aW9uRnJvbVBvcyIsIm5vcm1hbFBvcyIsImlzQ2lyY3VsYXIiLCJnZXRDaXJjdWxhclBvcyIsInRvUG9zIiwidG9GaXhlZCIsInV0aWxzIiwiZ2V0RWxlbWVudCIsImVsIiwicXVlcnlTZWxlY3RvciIsImpRdWVyeSIsImxlbmd0aCIsIk1peGluQnVpbGRlciIsInN1cGVyY2xhc3MiLCJ3aXRoIiwibWl4aW5zIiwicmVkdWNlIiwiYyIsIm0iLCJNaXhpbiIsIk1vdmFibGVDb29yZCIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJtYXJnaW4iLCJlYXNpbmciLCJlYXNlT3V0Q3ViaWMiLCJ4IiwicG93IiwibWF4aW11bUR1cmF0aW9uIiwiSW5maW5pdHkiLCJfcmV2aXNlT3B0aW9ucyIsIl9oYW1tZXJNYW5hZ2VyIiwiX3BvcyIsImJpbmQiLCJlbGVtZW50IiwiYWRkIiwidW5iaW5kIiwicmVtb3ZlIiwiZ2V0SGFtbWVyIiwiZW5hYmxlSW5wdXQiLCJpbnB1dENvbnRyb2wiLCJkaXNhYmxlSW5wdXQiLCJrZXkiLCJmb3JFYWNoIiwidiIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJ0ZXN0IiwiZ2V0IiwiZGVzdHJveSIsIm9mZiIsIlZFUlNJT04iLCJfcmFmIiwiX2FuaW1hdGVQYXJhbSIsIl9hbmltYXRpb25FbmQiLCJfcmVzdG9yZSIsIl9ncmFiIiwidHJpZ2dlciIsIm9yZ1BvcyIsIl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJfcHJlcGFyZVBhcmFtIiwiYWJzUG9zIiwiaGFtbWVyRXZlbnQiLCJkaXN0YW5jZSIsIm5ld0R1cmF0aW9uIiwiaXNCb3VuY2UiLCJkb25lIiwiY29tcGxldGUiLCJfYW5pbWF0ZSIsIm5leHRQb3MiLCJyb3VuZCIsInNldFRvIiwiX3NldEludGVycnVwdCIsInBhcmFtIiwic3RhcnRUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJpbmZvIiwibG9vcCIsIl9mcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9hbmltYXRlVG8iLCJyZXRUcmlnZ2VyIiwiRXJyb3IiLCJxdWV1ZSIsImRlcXVldWUiLCJ0YXNrIiwic2hpZnQiLCJjYWxsIiwicHVzaCIsImN1clRpbWUiLCJlYXNpbmdQZXIiLCJfZWFzaW5nIiwiaSIsInBvc2l0aW9uIiwiaG9sZGluZyIsImUiLCJwIiwieSIsInRvWCIsInRvWSIsInNldEJ5IiwiX3N0YXR1cyIsImdyYWJPdXRzaWRlIiwiY3VycmVudEhhbW1lciIsImN1cnJlbnRPcHRpb25zIiwibW92ZURpc3RhbmNlIiwicHJldmVudGVkIiwiX3NldEN1cnJlbnRUYXJnZXQiLCJoYW1tZXIiLCJjdXJyZW50SGFubW1lciIsIl9zdGFydCIsImludGVycnVwdGFibGUiLCJfbW92ZSIsIl9pc0ludGVycnVwdGluZyIsInNjYWxlIiwib3V0IiwicHJldmVudCIsInByZXZJbnB1dCIsInNlc3Npb24iLCJvZmZzZXRYIiwiZGVsdGFYIiwib2Zmc2V0WSIsImRlbHRhWSIsInNyY0V2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50U3lzdGVtRXZlbnQiLCJ0diIsInRuIiwidHgiLCJpbml0U2xvcGUiLCJfZW5kIiwidlgiLCJ2ZWxvY2l0eVgiLCJ2WSIsInZlbG9jaXR5WSIsIm9mZnNldCIsIkhhbW1lck1hbmFnZXIiLCJfaGFtbWVycyIsIl9jcmVhdGVIYW1tZXIiLCJiaW5kT3B0aW9ucyIsImlucHV0Q2xhc3MiLCJoYW5kbGVyIiwiX2F0dGFjaEhhbW1lckV2ZW50cyIsIk1hbmFnZXIiLCJyZWNvZ25pemVycyIsIlBhbiIsInRocmVzaG9sZCIsImNzc1Byb3BzIiwidXNlclNlbGVjdCIsInRvdWNoU2VsZWN0IiwidG91Y2hDYWxsb3V0IiwidXNlckRyYWciLCJrZXlWYWx1ZSIsImdldEF0dHJpYnV0ZSIsImlucHV0VHlwZSIsImNvbnZlcnRJbnB1dFR5cGUiLCJyYW5kb20iLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkYXRhIiwiZW5hYmxlIiwib24iLCJpc0ZpcnN0IiwiaXNGaW5hbCIsIl9kZXRhY2hIYW1tZXJFdmVudHMiLCJoYXNUb3VjaCIsImhhc01vdXNlIiwiaW5wdXRzIiwiVG91Y2hJbnB1dCIsIk1vdXNlSW5wdXQiLCJpc0VuYWJsZSIsIm9wdGlvbiIsInNldCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7QUFFQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQSxJQUFNQSxZQUFZO0FBQ2pCQyxrQkFB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QUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RUw7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSw0QkFBNEIsOEJBQThCOztBQUUxRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FB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O0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCLEVBQUU7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLG1HQUFtRyxHQUFHO0FBQ3RHOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFBQTtBQUNMLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7QUNsbEZEOzs7Ozs7QUFFQXFDLE9BQU9DLE9BQVAsMEIiLCJmaWxlIjoibW92YWJsZWNvb3JkLnBrZ2QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJNb3ZhYmxlQ29vcmRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZWdcIl0gPSByb290W1wiZWdcIl0gfHwge30sIHJvb3RbXCJlZ1wiXVtcIk1vdmFibGVDb29yZFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTlmNzcxNDlkODhkMTU4ZGY1NDIiLCJpbXBvcnQge3dpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fTk9ORVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fTEVGVFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9SSUdIVFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9VUFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG4vKipcbiAqIEBuYW1lIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fRE9XTlxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbi8qKlxuICogQG5hbWUgZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9IT1JJWk9OVEFMXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1ZFUlRJQ0FMXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4qL1xuLyoqXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0FMTFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuKi9cbmNvbnN0IGRpcmVjdGlvbiA9IHtcblx0RElSRUNUSU9OX05PTkU6IDEsXG5cdERJUkVDVElPTl9MRUZUOiAyLFxuXHRESVJFQ1RJT05fUklHSFQ6IDQsXG5cdERJUkVDVElPTl9VUDogOCxcblx0RElSRUNUSU9OX0RPV046IDE2LFxuXHRESVJFQ1RJT05fSE9SSVpPTlRBTDogMiB8IDQsXG5cdERJUkVDVElPTl9WRVJUSUNBTDogOCB8IDE2XG59O1xuXG5kaXJlY3Rpb24uRElSRUNUSU9OX0FMTCA9IGRpcmVjdGlvbi5ESVJFQ1RJT05fSE9SSVpPTlRBTCB8XG5cdGRpcmVjdGlvbi5ESVJFQ1RJT05fVkVSVElDQUw7XG5leHBvcnQgY29uc3QgRElSRUNUSU9OID0gZGlyZWN0aW9uO1xuZXhwb3J0IGNvbnN0IFVOSVFVRUtFWSA9IFwiX19NT1ZBQkxFQ09PUkRfX1wiO1xuZXhwb3J0IGNvbnN0IFNVUFBPUlRfVE9VQ0ggPSBcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdztcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0cy5qcyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jICovXG5jb25zdCB3aW4gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5NYXRoID09PSBNYXRoID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5NYXRoID09PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMgKi9cblxuZXhwb3J0IHt3aW4gYXMgd2luZG93fTtcbmV4cG9ydCBjb25zdCBkb2N1bWVudCA9IHdpbi5kb2N1bWVudDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9icm93c2VyLmpzIiwiaW1wb3J0IHtESVJFQ1RJT059IGZyb20gXCIuL2NvbnN0c1wiO1xuXG5jb25zdCBDb29yZGluYXRlID0ge1xuXHQvLyBnZXQgdXNlcidzIGRpcmVjdGlvblxuXHRnZXREaXJlY3Rpb25CeUFuZ2xlKGFuZ2xlLCB0aHJlc2hvbGRBbmdsZSkge1xuXHRcdGlmICh0aHJlc2hvbGRBbmdsZSA8IDAgfHwgdGhyZXNob2xkQW5nbGUgPiA5MCkge1xuXHRcdFx0cmV0dXJuIERJUkVDVElPTi5ESVJFQ1RJT05fTk9ORTtcblx0XHR9XG5cdFx0Y29uc3QgdG9BbmdsZSA9IE1hdGguYWJzKGFuZ2xlKTtcblxuXHRcdHJldHVybiB0b0FuZ2xlID4gdGhyZXNob2xkQW5nbGUgJiYgdG9BbmdsZSA8IDE4MCAtIHRocmVzaG9sZEFuZ2xlID9cblx0XHRcdFx0RElSRUNUSU9OLkRJUkVDVElPTl9WRVJUSUNBTCA6IERJUkVDVElPTi5ESVJFQ1RJT05fSE9SSVpPTlRBTDtcblx0fSxcblx0aXNIb3Jpem9udGFsKGRpcmVjdGlvbiwgdXNlckRpcmVjdGlvbikge1xuXHRcdHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTi5ESVJFQ1RJT05fQUxMIHx8XG5cdFx0XHQoZGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9IT1JJWk9OVEFMICYmXG5cdFx0XHR1c2VyRGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9IT1JJWk9OVEFMKTtcblx0fSxcblx0aXNWZXJ0aWNhbChkaXJlY3Rpb24sIHVzZXJEaXJlY3Rpb24pIHtcblx0XHRyZXR1cm4gZGlyZWN0aW9uID09PSBESVJFQ1RJT04uRElSRUNUSU9OX0FMTCB8fFxuXHRcdFx0KGRpcmVjdGlvbiAmIERJUkVDVElPTi5ESVJFQ1RJT05fVkVSVElDQUwgJiZcblx0XHRcdHVzZXJEaXJlY3Rpb24gJiBESVJFQ1RJT04uRElSRUNUSU9OX1ZFUlRJQ0FMKTtcblx0fSxcblx0Z2V0UG9pbnRPZkludGVyc2VjdGlvbihkZXBhUG9zLCBkZXN0UG9zLCBtaW4sIG1heCwgY2lyY3VsYXIsIGJvdW5jZSkge1xuXHRcdGNvbnN0IGJveExUID0gW21pblswXSAtIGJvdW5jZVszXSwgbWluWzFdIC0gYm91bmNlWzBdXTtcblx0XHRjb25zdCBib3hSQiA9IFttYXhbMF0gKyBib3VuY2VbMV0sIG1heFsxXSArIGJvdW5jZVsyXV07XG5cdFx0Y29uc3QgdG9EZXN0UG9zID0gZGVzdFBvcy5jb25jYXQoKTtcblxuXHRcdGNvbnN0IHhkID0gZGVzdFBvc1swXSAtIGRlcGFQb3NbMF07XG5cdFx0Y29uc3QgeWQgPSBkZXN0UG9zWzFdIC0gZGVwYVBvc1sxXTtcblxuXHRcdGlmICghY2lyY3VsYXJbM10pIHtcblx0XHRcdHRvRGVzdFBvc1swXSA9IE1hdGgubWF4KGJveExUWzBdLCB0b0Rlc3RQb3NbMF0pO1xuXHRcdH0gLy8gbGVmdFxuXHRcdGlmICghY2lyY3VsYXJbMV0pIHtcblx0XHRcdHRvRGVzdFBvc1swXSA9IE1hdGgubWluKGJveFJCWzBdLCB0b0Rlc3RQb3NbMF0pO1xuXHRcdH0gLy8gcmlnaHRcblx0XHR0b0Rlc3RQb3NbMV0gPSB4ZCA/IGRlcGFQb3NbMV0gKyB5ZCAvIHhkICogKHRvRGVzdFBvc1swXSAtIGRlcGFQb3NbMF0pIDpcblx0XHRcdFx0XHRcdHRvRGVzdFBvc1sxXTtcblxuXHRcdGlmICghY2lyY3VsYXJbMF0pIHtcblx0XHRcdHRvRGVzdFBvc1sxXSA9IE1hdGgubWF4KGJveExUWzFdLCB0b0Rlc3RQb3NbMV0pO1xuXHRcdH0gLy8gdXBcblx0XHRpZiAoIWNpcmN1bGFyWzJdKSB7XG5cdFx0XHR0b0Rlc3RQb3NbMV0gPSBNYXRoLm1pbihib3hSQlsxXSwgdG9EZXN0UG9zWzFdKTtcblx0XHR9IC8vIGRvd25cblx0XHR0b0Rlc3RQb3NbMF0gPSB5ZCA/IGRlcGFQb3NbMF0gKyB4ZCAvIHlkICogKHRvRGVzdFBvc1sxXSAtIGRlcGFQb3NbMV0pIDpcblx0XHRcdFx0XHRcdHRvRGVzdFBvc1swXTtcblx0XHRyZXR1cm4gW1xuXHRcdFx0TWF0aC5taW4obWF4WzBdLCBNYXRoLm1heChtaW5bMF0sIHRvRGVzdFBvc1swXSkpLFxuXHRcdFx0TWF0aC5taW4obWF4WzFdLCBNYXRoLm1heChtaW5bMV0sIHRvRGVzdFBvc1sxXSkpXG5cdFx0XTtcblx0fSxcblx0Ly8gZGV0ZXJtaW5lIG91dHNpZGVcblx0aXNPdXRzaWRlKHBvcywgbWluLCBtYXgpIHtcblx0XHRyZXR1cm4gcG9zWzBdIDwgbWluWzBdIHx8IHBvc1sxXSA8IG1pblsxXSB8fFxuXHRcdFx0cG9zWzBdID4gbWF4WzBdIHx8IHBvc1sxXSA+IG1heFsxXTtcblx0fSxcblx0Ly8gZnJvbSBvdXRzaWRlIHRvIG91dHNpZGVcblx0aXNPdXRUb091dChwb3MsIGRlc3RQb3MsIG1pbiwgbWF4KSB7XG5cdFx0cmV0dXJuIChwb3NbMF0gPCBtaW5bMF0gfHwgcG9zWzBdID4gbWF4WzBdIHx8XG5cdFx0XHRwb3NbMV0gPCBtaW5bMV0gfHwgcG9zWzFdID4gbWF4WzFdKSAmJlxuXHRcdFx0KGRlc3RQb3NbMF0gPCBtaW5bMF0gfHwgZGVzdFBvc1swXSA+IG1heFswXSB8fFxuXHRcdFx0ZGVzdFBvc1sxXSA8IG1pblsxXSB8fCBkZXN0UG9zWzFdID4gbWF4WzFdKTtcblx0fSxcblx0Z2V0TmV4dE9mZnNldFBvcyhzcGVlZHMsIGRlY2VsZXJhdGlvbikge1xuXHRcdGNvbnN0IG5vcm1hbFNwZWVkID0gTWF0aC5zcXJ0KFxuXHRcdFx0c3BlZWRzWzBdICogc3BlZWRzWzBdICsgc3BlZWRzWzFdICogc3BlZWRzWzFdXG5cdFx0KTtcblx0XHRjb25zdCBkdXJhdGlvbiA9IE1hdGguYWJzKG5vcm1hbFNwZWVkIC8gLWRlY2VsZXJhdGlvbik7XG5cblx0XHRyZXR1cm4gW1xuXHRcdFx0c3BlZWRzWzBdIC8gMiAqIGR1cmF0aW9uLFxuXHRcdFx0c3BlZWRzWzFdIC8gMiAqIGR1cmF0aW9uXG5cdFx0XTtcblx0fSxcblx0Z2V0RHVyYXRpb25Gcm9tUG9zKHBvcywgZGVjZWxlcmF0aW9uKSB7XG5cdFx0Y29uc3Qgbm9ybWFsUG9zID0gTWF0aC5zcXJ0KHBvc1swXSAqIHBvc1swXSArIHBvc1sxXSAqIHBvc1sxXSk7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSBNYXRoLnNxcnQoXG5cdFx0XHRub3JtYWxQb3MgLyBkZWNlbGVyYXRpb24gKiAyXG5cdFx0KTtcblxuXHRcdC8vIHdoZW4gZHVyYXRpb24gaXMgdW5kZXIgMTAwLCB0aGVuIHZhbHVlIGlzIHplcm9cblx0XHRyZXR1cm4gZHVyYXRpb24gPCAxMDAgPyAwIDogZHVyYXRpb247XG5cdH0sXG5cdGlzQ2lyY3VsYXIoZGVzdFBvcywgbWluLCBtYXgsIGNpcmN1bGFyKSB7XG5cdFx0cmV0dXJuIChjaXJjdWxhclswXSAmJiBkZXN0UG9zWzFdIDwgbWluWzFdKSB8fFxuXHRcdFx0XHQoY2lyY3VsYXJbMV0gJiYgZGVzdFBvc1swXSA+IG1heFswXSkgfHxcblx0XHRcdFx0KGNpcmN1bGFyWzJdICYmIGRlc3RQb3NbMV0gPiBtYXhbMV0pIHx8XG5cdFx0XHRcdChjaXJjdWxhclszXSAmJiBkZXN0UG9zWzBdIDwgbWluWzBdKTtcblx0fSxcblx0Z2V0Q2lyY3VsYXJQb3MocG9zLCBtaW4sIG1heCwgY2lyY3VsYXIpIHtcblx0XHRjb25zdCB0b1BvcyA9IHBvcy5jb25jYXQoKTtcblxuXHRcdGlmIChjaXJjdWxhclswXSAmJiB0b1Bvc1sxXSA8IG1pblsxXSkgeyAvLyB1cFxuXHRcdFx0dG9Qb3NbMV0gPSAodG9Qb3NbMV0gLSBtaW5bMV0pICUgKG1heFsxXSAtIG1pblsxXSArIDEpICsgbWF4WzFdO1xuXHRcdH1cblx0XHRpZiAoY2lyY3VsYXJbMV0gJiYgdG9Qb3NbMF0gPiBtYXhbMF0pIHsgLy8gcmlnaHRcblx0XHRcdHRvUG9zWzBdID0gKHRvUG9zWzBdIC0gbWluWzBdKSAlIChtYXhbMF0gLSBtaW5bMF0gKyAxKSArIG1pblswXTtcblx0XHR9XG5cdFx0aWYgKGNpcmN1bGFyWzJdICYmIHRvUG9zWzFdID4gbWF4WzFdKSB7IC8vIGRvd25cblx0XHRcdHRvUG9zWzFdID0gKHRvUG9zWzFdIC0gbWluWzFdKSAlIChtYXhbMV0gLSBtaW5bMV0gKyAxKSArIG1pblsxXTtcblx0XHR9XG5cdFx0aWYgKGNpcmN1bGFyWzNdICYmIHRvUG9zWzBdIDwgbWluWzBdKSB7IC8vIGxlZnRcblx0XHRcdHRvUG9zWzBdID0gKHRvUG9zWzBdIC0gbWluWzBdKSAlIChtYXhbMF0gLSBtaW5bMF0gKyAxKSArIG1heFswXTtcblx0XHR9XG5cblx0XHR0b1Bvc1swXSA9ICt0b1Bvc1swXS50b0ZpeGVkKDUpO1xuXHRcdHRvUG9zWzFdID0gK3RvUG9zWzFdLnRvRml4ZWQoNSk7XG5cdFx0cmV0dXJuIHRvUG9zO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb29yZGluYXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Nvb3JkaW5hdGUuanMiLCJpbXBvcnQge3dpbmRvdywgZG9jdW1lbnR9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuY29uc3QgdXRpbHMgPSB7XG5cdGdldEVsZW1lbnQoZWwpIHtcblx0XHRpZiAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG5cdFx0fSBlbHNlIGlmICh3aW5kb3cualF1ZXJ5ICYmIChlbCBpbnN0YW5jZW9mIGpRdWVyeSkpIHtcblx0XHRcdC8vIGlmIHlvdSB3ZXJlIHVzaW5nIGpRdWVyeVxuXHRcdFx0cmV0dXJuIGVsLmxlbmd0aCA+IDAgPyBlbFswXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBlbDtcblx0XHR9XG5cdH1cbn07XG5cbmNsYXNzIE1peGluQnVpbGRlciB7XG5cdGNvbnN0cnVjdG9yKHN1cGVyY2xhc3MpIHtcblx0XHR0aGlzLnN1cGVyY2xhc3MgPSBzdXBlcmNsYXNzIHx8IGNsYXNzIHt9O1xuXHR9XG5cdHdpdGgoLi4ubWl4aW5zKSB7XG5cdFx0cmV0dXJuIG1peGlucy5yZWR1Y2UoKGMsIG0pID0+IG0oYyksIHRoaXMuc3VwZXJjbGFzcyk7XG5cdH1cbn1cblxuY29uc3QgTWl4aW4gPSBzdXBlcmNsYXNzID0+IG5ldyBNaXhpbkJ1aWxkZXIoc3VwZXJjbGFzcyk7XG5cbmV4cG9ydCB7TWl4aW4sIHV0aWxzfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy5qcyIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBlZ2pzL2NvbXBvbmVudFwiO1xuaW1wb3J0IEhhbW1lck1hbmFnZXIgZnJvbSBcIi4vaGFtbWVyTWFuYWdlclwiO1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tIFwiLi9ldmVudEhhbmRsZXJcIjtcbmltcG9ydCBBbmltYXRpb25IYW5kbGVyIGZyb20gXCIuL2FuaW1hdGlvbkhhbmRsZXJcIjtcbmltcG9ydCB7RElSRUNUSU9OfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7TWl4aW59IGZyb20gXCIuL3V0aWxzXCI7XG5cbi8qKlxuICogQSBtb2R1bGUgdXNlZCB0byBjaGFuZ2UgdGhlIGluZm9ybWF0aW9uIG9mIHVzZXIgYWN0aW9uIGVudGVyZWQgYnkgdmFyaW91cyBpbnB1dCBkZXZpY2VzIHN1Y2ggYXMgdG91Y2ggc2NyZWVuIG9yIG1vdXNlIGludG8gbG9naWNhbCBjb29yZGluYXRlcyB3aXRoaW4gdGhlIHZpcnR1YWwgY29vcmRpbmF0ZSBzeXN0ZW0uIFRoZSBjb29yZGluYXRlIGluZm9ybWF0aW9uIHNvcnRlZCBieSB0aW1lIGV2ZW50cyBvY2N1cnJlZCBpcyBwcm92aWRlZCBpZiBhbmltYXRpb25zIGFyZSBtYWRlIGJ5IHVzZXIgYWN0aW9ucy4gWW91IGNhbiBpbXBsZW1lbnQgYSB1c2VyIGludGVyZmFjZSBieSBhcHBseWluZyB0aGUgbG9naWNhbCBjb29yZGluYXRlcyBwcm92aWRlZC4gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUsIHNlZSBkZW1vcy5cbiAqIEBrbyDthLDsuZgg7J6F66ClIOyepey5mOuCmCDrp4jsmrDsiqTsmYAg6rCZ7J2AIOuLpOyWke2VnCDsnoXroKUg7J6l7LmY66GcIOyghOuLrCDrsJvsnYAg7IKs7Jqp7J6Q7J2YIOuPmeyekeydhCDqsIDsg4Eg7KKM7ZGc6rOE7J2YIOuFvOumrOyggSDsooztkZzroZwg67OA6rK97ZWY64qUIOuqqOuTiC4g7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDslaDri4jrqZTsnbTshZjsnbQg7J287Ja064KY66m0IOyLnOqwhOyInOycvOuhnCDrs4Dqsr3rkJjripQg7KKM7ZGcIOygleuztOuPhCDsoJzqs7XtlZzri6QuIOuzgOqyveuQnCDrhbzrpqzsoIEg7KKM7ZGc66W8IOuwmOyYge2VtCBVSeulvCDqtaztmITtlaAg7IiYIOyeiOuLpC4gZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydmCDsnpDshLjtlZwg7J6R64+ZIOuwqeyLneydgCDrjbDrqqjrpbwg7LC46rOg7ZWc64ukLlxuICogQGNsYXNzXG4gKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmRcbiAqIEBleHRlbmRzIGVnLkNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb24gb2JqZWN0IG9mIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlPGtvPmVnLk1vdmFibGVDb29yZCDrqqjrk4jsnZgg7Ji17IWYIOqwneyytDwva28+XG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLm1pbiBUaGUgbWluaW11bSB2YWx1ZSBvZiBYIGFuZCBZIGNvb3JkaW5hdGVzIDxrbz7sooztkZzqs4TsnZgg7LWc7Iaf6rCSPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW4uMD0wXSBUaGUgWCBjb29yZGluYXRlIG9mIHRoZSBtaW5pbXVtIDxrbz7stZzshowgeOyijO2RnDwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluLjE9MF0gVGhlIFkgY29vcmRpbmF0ZSBvZiB0aGUgbWluaW11bSA8a28+7LWc7IaMIHnsooztkZw8L2tvPlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubWF4IFRoZSBtYXhpbXVtIHZhbHVlIG9mIFggYW5kIFkgY29vcmRpbmF0ZXMgPGtvPuyijO2RnOqzhOydmCDstZzrjJPqsJI8L2tvPlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heC4wPTEwMF0gVGhlIFggY29vcmRpbmF0ZSBvZiB0aGUgbWF4aW11bTxrbz7stZzrjIAgeOyijO2RnDwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4LjE9MTAwXSBUaGUgWSBjb29yZGluYXRlIG9mIHRoZSBtYXhpbXVtPGtvPuy1nOuMgCB57KKM7ZGcPC9rbz5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmJvdW5jZSBUaGUgc2l6ZSBvZiBib3VuY2luZyBhcmVhLiBUaGUgY29vcmRpbmF0ZXMgY2FuIGV4Y2VlZCB0aGUgY29vcmRpbmF0ZSBhcmVhIGFzIG11Y2ggYXMgdGhlIGJvdW5jaW5nIGFyZWEgYmFzZWQgb24gdXNlciBhY3Rpb24uIElmIHRoZSBjb29yZGluYXRlcyBkb2VzIG5vdCBleGNlZWQgdGhlIGJvdW5jaW5nIGFyZWEgd2hlbiBhbiBlbGVtZW50IGlzIGRyYWdnZWQsIHRoZSBjb29yZGluYXRlcyB3aGVyZSBib3VuY2luZyBlZmZlY3RzIGFyZSBhcHBsaWVkIGFyZSByZXR1bmVkIGJhY2sgaW50byB0aGUgY29vcmRpbmF0ZSBhcmVhPGtvPuuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwLiDsgqzsmqnsnpDsnZgg64+Z7J6R7JeQIOuUsOudvCDsooztkZzqsIAg7KKM7ZGcIOyYgeyXreydhCDrhJjslrQg67CU7Jq07IqkIOyYgeyXreydmCDtgazquLDrp4ztgbwg642UIOydtOuPme2VoCDsiJgg7J6I64ukLiDsgqzsmqnsnpDqsIAg64GM7Ja064ukIOuGk+uKlCDrj5nsnpHsnYQg7ZaI7J2EIOuVjCDsooztkZzqsIAg67CU7Jq07IqkIOyYgeyXreyXkCDsnojsnLzrqbQsIOuwlOyatOyKpCDtmqjqs7zqsIAg7KCB7Jqp65CcIOyijO2RnOqwgCDri6Tsi5wg7KKM7ZGcIOyYgeyXrSDslYjsnLzroZwg65Ok7Ja07Jio64ukPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYm91bmNlLjA9MTBdIFRoZSBzaXplIG9mIHRvcCBhcmVhIDxrbz7snITsqr0g67CU7Jq07IqkIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ib3VuY2UuMT0xMF0gVGhlIHNpemUgb2YgcmlnaHQgYXJlYSA8a28+7Jik66W47Kq9IOuwlOyatOyKpCDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYm91bmNlLjI9MTBdIFRoZSBzaXplIG9mIGJvdHRvbSBhcmVhIDxrbz7slYTrnpjsqr0g67CU7Jq07IqkIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ib3VuY2UuMz0xMF0gVGhlIHNpemUgb2YgbGVmdCBhcmVhIDxrbz7smbzsqr0g67CU7Jq07IqkIOyYgeyXreydmCDtgazquLA8L2tvPlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubWFyZ2luIFRoZSBzaXplIG9mIGFjY2Vzc2libGUgc3BhY2Ugb3V0c2lkZSB0aGUgY29vcmRpbmF0ZSBhcmVhLiBJZiBhbiBlbGVtZW50IGlzIGRyYWdnZWQgb3V0c2lkZSB0aGUgY29vcmRpbmF0ZSBhcmVhIGFuZCB0aGVuIGRyb3BwZWQsIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgZWxlbWVudCBhcmUgcmV0dXJuZWQgYmFjayBpbnRvIHRoZSBjb29yZGluYXRlIGFyZWEuIFRoZSBzaXplIG9mIG1hcmdpbnMgdGhhdCBjYW4gYmUgZXhjZWVkZWQgPGtvPuKIklx07KKM7ZGcIOyYgeyXreydhCDrhJjslrQg7J2064+Z7ZWgIOyImCDsnojripQg67CU6rmlIOyYgeyXreydmCDtgazquLAuIOyCrOyaqeyekOqwgCDsooztkZzrpbwg67CU6rmlIOyYgeyXreq5jOyngCDrgYzsl4jri6TqsIAg64aT7Jy866m0IOyijO2RnOqwgCDsooztkZwg7JiB7JetIOyViOycvOuhnCDrk6TslrTsmKjri6QuPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFyZ2luLjA9MF0gVGhlIHNpemUgb2YgdG9wIG1hcmdpbiA8a28+7JyE7Kq9IOuwlOq5pSDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFyZ2luLjE9MF0gVGhlIHNpemUgb2YgcmlnaHQgbWFyZ2luIDxrbz7smKTrpbjsqr0g67CU6rmlIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXJnaW4uMj0wXSBUaGUgc2l6ZSBvZiBib3R0b20gbWFyZ2luIDxrbz7slYTrnpjsqr0g67CU6rmlIOyYgeyXreydmCDtgazquLA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXJnaW4uMz0wXSBUaGUgc2l6ZSBvZiBsZWZ0IG1hcmdpbiA8a28+7Jm87Kq9IOuwlOq5pSDsmIHsl63snZgg7YGs6riwPC9rbz5cbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY2lyY3VsYXIgSW5kaWNhdGVzIHdoZXRoZXIgYSBjaXJjdWxhciBlbGVtZW50IGlzIGF2YWlsYWJsZS4gSWYgaXQgaXMgc2V0IHRvIFwidHJ1ZVwiIGFuZCBhbiBlbGVtZW50IGlzIGRyYWdnZWQgb3V0c2lkZSB0aGUgY29vcmRpbmF0ZSBhcmVhLCB0aGUgZWxlbWVudCB3aWxsIGFwcGVhciBvbiB0aGUgb3RoZXIgc2lkZS48a28+7Iic7ZmYIOyXrOu2gC4gJ3RydWUn66GcIOyEpOygle2VnCDrsKntlqXsnZgg7KKM7ZGcIOyYgeyXrSDrsJbsnLzroZwg7JeY66as66i87Yq46rCAIOydtOuPme2VmOuptCDrsJjrjIAg67Cp7Zal7JeQ7IScIOyXmOumrOuovO2KuOqwgCDrgpjtg4Drgpzri6Q8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhci4wPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0byBjaXJjdWxhdGUgdG8gdG9wIDxrbz7snITroZwg7Iic7ZmYIOyXrOu2gDwva28+XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyLjE9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRvIGNpcmN1bGF0ZSB0byByaWdodCA8a28+7Jik66W47Kq97Jy866GcIOyInO2ZmCDsl6zrtoA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhci4yPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0byBjaXJjdWxhdGUgdG8gYm90dG9tICA8a28+7JWE656Y66GcIOyInO2ZmCDsl6zrtoA8L2tvPlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhci4zPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0byBjaXJjdWxhdGUgdG8gbGVmdCAgPGtvPuyZvOyqveycvOuhnCDsiJztmZgg7Jes67aAPC9rbz5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5lYXNpbmc9ZWFzaW5nLmVhc2VPdXRDdWJpY10gVGhlIGVhc2luZyBmdW5jdGlvbiB0byBhcHBseSB0byBhbiBhbmltYXRpb24gPGtvPuyVoOuLiOuplOydtOyFmOyXkCDsoIHsmqntlaAgZWFzaW5nIO2VqOyImDwva28+XG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4aW11bUR1cmF0aW9uPUluZmluaXR5XSBNYXhpbXVtIGR1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gPGtvPuqwgOyGjeuPhOyXkCDsnZjtlbQg7JWg64uI66mU7J207IWY7J20IOuPmeyeke2VoCDrlYzsnZgg7LWc64yAIOyijO2RnCDsnbTrj5kg7Iuc6rCEPC9rbz5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kZWNlbGVyYXRpb249MC4wMDA2XSBEZWNlbGVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiB3aGVyZSBhY2NlbGVyYXRpb24gaXMgbWFudWFsbHkgZW5hYmxlZCBieSB1c2VyLiBBIGhpZ2hlciB2YWx1ZSBpbmRpY2F0ZXMgc2hvcnRlciBydW5uaW5nIHRpbWUuIDxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOqwgOyGjeuPhOqwgCDsoIHsmqnrkJwg7JWg64uI66mU7J207IWY7J2YIOqwkOyGjeuPhC4g6rCS7J20IOuGkuydhOyImOuhnSDslaDri4jrqZTsnbTshZgg7Iuk7ZaJIOyLnOqwhOydtCDsp6fslYTsp4Tri6Q8L2tvPlxuICogQHNlZSBIYW1tZXJKUyB7QGxpbmsgaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pb31cbiAqIEBzZWUg4oCiIEhhbW1lci5KUyBhcHBsaWVzIHNwZWNpZmljIENTUyBwcm9wZXJ0aWVzIGJ5IGRlZmF1bHQgd2hlbiBjcmVhdGluZyBhbiBpbnN0YW5jZSAoU2VlIHtAbGluayBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2pzZG9jL0hhbW1lci5kZWZhdWx0cy5jc3NQcm9wcy5odG1sfSkuIFRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlIHJlbW92ZXMgYWxsIGRlZmF1bHQgQ1NTIHByb3BlcnRpZXMgcHJvdmlkZWQgYnkgSGFtbWVyLkpTIDxrbz5IYW1tZXIuSlPripQg7J247Iqk7YS07Iqk66W8IOyDneyEse2VoCDrlYwg6riw67O47Jy866GcIO2KueyglSBDU1Mg7IaN7ISx7J2EIOyggeyaqe2VnOuLpCjssLjqs6A6IEBsaW5re2h0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vanNkb2MvSGFtbWVyLmRlZmF1bHRzLmNzc1Byb3BzLmh0bWx9KS4g7Yq57KCV7ZWcIOyDge2ZqeyXkOyEnOuKlCBIYW1tZXIuSlPsnZgg7IaN7ISxIOuVjOusuOyXkCDsgqzsmqnshLHsl5Ag66y47KCc6rCAIOyeiOydhCDsiJgg7J6I64ukLiBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2AIEhhbW1lci5KU+ydmCDquLDrs7ggQ1NTIOyGjeyEseydhCDrqqjrkZAg7KCc6rGw7ZaI64ukPC9rbz5cbiAqXG4gKiBAY29kZXBlbiB7XCJpZFwiOlwialBQcWVSXCIsIFwia29cIjpcIk1vdmFibGVDb29yZCBDdWJlIOyYiOygnFwiLCBcImVuXCI6XCJNb3ZhYmxlQ29vcmQgQ3ViZSBleGFtcGxlXCIsIFwiY29sbGVjdGlvbklkXCI6XCJBS3BrR1dcIiwgXCJoZWlnaHRcIjogNDAzfVxuICpcbiAqIEBzZWUgRWFzaW5nIEZ1bmN0aW9ucyBDaGVhdCBTaGVldCB7QGxpbmsgaHR0cDovL2Vhc2luZ3MubmV0L31cbiAqIEBzZWUgSWYgeW91IHdhbnQgdG8gdHJ5IGEgZGlmZmVyZW50IGVhc2luZyBmdW5jdGlvbiwgdXNlIHRoZSBqUXVlcnkgZWFzaW5nIHBsdWdpbiAoe0BsaW5rIGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZ30pIG9yIHRoZSBqUXVlcnkgVUkgZWFzaW5nIGxpYnJhcnkgKHtAbGluayBodHRwczovL2pxdWVyeXVpLmNvbS9lYXNpbmd9KSA8a28+64uk66W4IGVhc2luZyDtlajsiJjrpbwg7IKs7Jqp7ZWY66Ck66m0IGpRdWVyeSBlYXNpbmcg7ZSM65+s6re47J24KHtAbGluayBodHRwOi8vZ3NnZC5jby51ay9zYW5kYm94L2pxdWVyeS9lYXNpbmd9KeydtOuCmCwgalF1ZXJ5IFVJIGVhc2luZyDrnbzsnbTruIzrn6zrpqwoe0BsaW4gaHR0cHM6Ly9qcXVlcnl1aS5jb20vZWFzaW5nfSnrpbwg7IKs7Jqp7ZWc64ukPC9rbz5cbiAqXG4gKiBAc3VwcG9ydCB7XCJpZVwiOiBcIjEwK1wiLCBcImNoXCIgOiBcImxhdGVzdFwiLCBcImZmXCIgOiBcImxhdGVzdFwiLCAgXCJzZlwiIDogXCJsYXRlc3RcIiwgXCJlZGdlXCIgOiBcImxhdGVzdFwiLCBcImlvc1wiIDogXCI3K1wiLCBcImFuXCIgOiBcIjIuMysgKGV4Y2VwdCAzLngpXCJ9XG4gKi9cbmNvbnN0IE1vdmFibGVDb29yZCA9IGNsYXNzIE1vdmFibGVDb29yZFxuZXh0ZW5kcyBNaXhpbihDb21wb25lbnQpLndpdGgoRXZlbnRIYW5kbGVyLCBBbmltYXRpb25IYW5kbGVyKSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zID0ge1xuXHRcdFx0bWluOiBbMCwgMF0sXG5cdFx0XHRtYXg6IFsxMDAsIDEwMF0sXG5cdFx0XHRib3VuY2U6IFsxMCwgMTAsIDEwLCAxMF0sXG5cdFx0XHRtYXJnaW46IFswLCAwLCAwLCAwXSxcblx0XHRcdGNpcmN1bGFyOiBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuXHRcdFx0ZWFzaW5nOiBmdW5jdGlvbiBlYXNlT3V0Q3ViaWMoeCkge1xuXHRcdFx0XHRyZXR1cm4gMSAtIE1hdGgucG93KDEgLSB4LCAzKTtcblx0XHRcdH0sXG5cdFx0XHRtYXhpbXVtRHVyYXRpb246IEluZmluaXR5LFxuXHRcdFx0ZGVjZWxlcmF0aW9uOiAwLjAwMDZcblx0XHR9LCBvcHRpb25zKTtcblx0XHR0aGlzLl9yZXZpc2VPcHRpb25zKCk7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlciA9IG5ldyBIYW1tZXJNYW5hZ2VyKCk7XG5cdFx0dGhpcy5fcG9zID0gdGhpcy5vcHRpb25zLm1pbi5jb25jYXQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlcnMgYW4gZWxlbWVudCB0byB1c2UgdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUuXG5cdCAqIEBrbyBlZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VoCDsl5jrpqzrqLztirjrpbwg65Ox66Gd7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2JpbmRcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBlbGVtZW50IEFuIGVsZW1lbnQgdG8gdXNlIHRoZSBlZy5Nb3ZhYmxlQ29vcmQgbW9kdWxlPGtvPuKIklx0ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDsgqzsmqntlaAg7JeY66as66i87Yq4PC9rbz5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbiBvYmplY3Qgb2YgdGhlIGJpbmQoKSBtZXRob2QgPGtvPmJpbmQoKSDrqZTshJzrk5zsnZgg7Ji17IWYIOqwneyytDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kaXJlY3Rpb249ZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9BTExdIENvb3JkaW5hdGUgZGlyZWN0aW9uIHRoYXQgYSB1c2VyIGNhbiBtb3ZlPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9BTEw6IEFsbCBkaXJlY3Rpb25zIGF2YWlsYWJsZS48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX0hPUklaT05UQUw6IEhvcml6b250YWwgZGlyZWN0aW9uIG9ubHkuPGJyPi0gZWcuTW92YWJsZUNvb3JkLkRJUkVDVElPTl9WRVJUSUNBTDogVmVydGljYWwgZGlyZWN0aW9uIG9ubHk8a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDsm4Dsp4Hsnbwg7IiYIOyeiOuKlCDsooztkZzsnZgg67Cp7ZalLjxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fQUxMOiDrqqjrk6Ag67Cp7Zal7Jy866GcIOybgOyngeydvCDsiJgg7J6I64ukLjxicj4tIGVnLk1vdmFibGVDb29yZC5ESVJFQ1RJT05fSE9SSVpPTlRBTDog6rCA66GcIOuwqe2WpeycvOuhnOunjCDsm4Dsp4Hsnbwg7IiYIOyeiOuLpC48YnI+LSBlZy5Nb3ZhYmxlQ29vcmQuRElSRUNUSU9OX1ZFUlRJQ0FMOiDshLjroZwg67Cp7Zal7Jy866Gc66eMIOybgOyngeydvCDsiJgg7J6I64ukLjwva28+XG5cdCAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuc2NhbGUgQ29vcmRpbmF0ZSBzY2FsZSB0aGF0IGEgdXNlciBjYW4gbW92ZTxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOydtOuPme2VmOuKlCDsooztkZzsnZgg67Cw7JyoPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjYWxlLjA9MV0gWC1heGlzIHNjYWxlIDxrbz547LaVIOuwsOycqDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY2FsZS4xPTFdIFktYXhpcyBzY2FsZSA8a28+eey2lSDrsLDsnKg8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGhyZXNob2xkQW5nbGU9NDVdIFRoZSB0aHJlc2hvbGQgdmFsdWUgdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdXNlciBhY3Rpb24gaXMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCAoMH45MCkgPGtvPuyCrOyaqeyekOydmCDrj5nsnpHsnbQg6rCA66GcIOuwqe2WpeyduOyngCDshLjroZwg67Cp7Zal7J247KeAIO2MkOuLqO2VmOuKlCDquLDspIAg6rCB64+EKDB+OTApPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmludGVycnVwdGFibGU9dHJ1ZV0gSW5kaWNhdGVzIHdoZXRoZXIgYW4gYW5pbWF0aW9uIGlzIGludGVycnVwdGlibGUuPGJyPi0gdHJ1ZTogSXQgY2FuIGJlIHBhdXNlZCBvciBzdG9wcGVkIGJ5IHVzZXIgYWN0aW9uIG9yIHRoZSBBUEkuPGJyPi0gZmFsc2U6IEl0IGNhbm5vdCBiZSBwYXVzZWQgb3Igc3RvcHBlZCBieSB1c2VyIGFjdGlvbiBvciB0aGUgQVBJIHdoaWxlIGl0IGlzIHJ1bm5pbmcuPGtvPuynhO2WiSDspJHsnbgg7JWg64uI66mU7J207IWYIOykkeyngCDqsIDriqUg7Jes67aALjxicj4tIHRydWU6IOyCrOyaqeyekOydmCDrj5nsnpHsnbTrgpggQVBJ66GcIOyVoOuLiOuplOydtOyFmOydhCDspJHsp4DtlaAg7IiYIOyeiOuLpC48YnI+LSBmYWxzZTog7JWg64uI66mU7J207IWY7J20IOynhO2WiSDspJHsnbwg65WM64qUIOyCrOyaqeyekOydmCDrj5nsnpHsnbTrgpggQVBJ6rCAIOyggeyaqeuQmOyngCDslYrripTri6Q8L2tvPlxuXHQgKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5pbnB1dFR5cGVdIFR5cGVzIG9mIGlucHV0IGRldmljZXMuIChkZWZhdWx0OiBbXCJ0b3VjaFwiLCBcIm1vdXNlXCJdKTxicj4tIHRvdWNoOiBUb3VjaCBzY3JlZW48YnI+LSBtb3VzZTogTW91c2UgPGtvPuyeheugpSDsnqXsuZgg7KKF66WYLijquLDrs7jqsJI6IFtcInRvdWNoXCIsIFwibW91c2VcIl0pPGJyPi0gdG91Y2g6IO2EsOy5mCDsnoXroKUg7J6l7LmYPGJyPi0gbW91c2U6IOuniOyasOyKpDwva28+XG5cdCAqXG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRiaW5kKGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHR0aGlzLl9oYW1tZXJNYW5hZ2VyLmFkZChlbGVtZW50LCBvcHRpb25zLCB0aGlzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKipcblx0ICogRGV0YWNoZXMgYW4gZWxlbWVudCB1c2luZyB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZS5cblx0ICogQGtvIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuOulvCDtlbTsoJztlZzri6Rcblx0ICogQG1ldGhvZCBlZy5Nb3ZhYmxlQ29vcmQjdW5iaW5kXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGpRdWVyeX0gZWxlbWVudCBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgZGV0YWNoZWQ8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCDtlbTsoJztlaAg7JeY66as66i87Yq4PC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0dW5iaW5kKGVsZW1lbnQpIHtcblx0XHR0aGlzLl9oYW1tZXJNYW5hZ2VyLnJlbW92ZShlbGVtZW50KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBnZXQgYSBoYW1tZXIgaW5zdGFuY2UgZnJvbSBlbGVtZW50cyB1c2luZyB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZS5cblx0ICogQGtvIGVnLk1vdmFibGVDb29yZCDrqqjrk4jsnYQg7IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuOyXkOyEnCBoYW1tZXIg6rCd7LK066W8IOyWu+uKlOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNnZXRIYW1tZXJcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8alF1ZXJ5fSBlbGVtZW50IEFuIGVsZW1lbnQgZnJvbSB3aGljaCB0aGUgZWcuTW92YWJsZUNvb3JkIG1vZHVsZSBpcyB1c2luZzxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirg8L2tvPlxuXHQgKiBAcmV0dXJuIHtIYW1tZXJ8bnVsbH0gQW4gaW5zdGFuY2Ugb2YgSGFtbWVyLkpTPGtvPkhhbW1lci5KU+ydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0Z2V0SGFtbWVyKGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5faGFtbWVyTWFuYWdlci5nZXRIYW1tZXIoZWxlbWVudCk7XG5cdH1cblxuXHQvKipcblx0ICogRW5hYmxlcyBpbnB1dCBkZXZpY2VzXG5cdCAqIEBrbyDsnoXroKUg7J6l7LmY66W8IOyCrOyaqe2VoCDsiJgg7J6I6rKMIO2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNlbmFibGVJbnB1dFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IFtlbGVtZW50XSBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgdXNpbmcgKGlmIHRoZSBlbGVtZW50IHBhcmFtZXRlciBpcyBub3QgcHJlc2VudCwgaXQgYXBwbGllcyB0byBhbGwgYmluZGVkIGVsZW1lbnRzKTxrbz5lZy5Nb3ZhYmxlQ29vcmQg66qo65OI7J2EIFx07IKs7Jqp7ZWY64qUIOyXmOumrOuovO2KuCAoZWxlbWVudCDtjIzrnbzrr7jthLDqsIAg7KG07J6s7ZWY7KeAIOyViuydhCDqsr3smrAsIOuwlOyduOuTnOuQnCDrqqjrk6Ag7JeY66as66i87Yq47JeQIOyggeyaqeuQnOuLpCk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5Nb3ZhYmxlQ29vcmR9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCovXG5cdGVuYWJsZUlucHV0KGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5faGFtbWVyTWFuYWdlci5pbnB1dENvbnRyb2wodHJ1ZSwgZWxlbWVudCk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzYWJsZXMgaW5wdXQgZGV2aWNlc1xuXHQgKiBAa28g7J6F66ClIOyepey5mOulvCDsgqzsmqntlaAg7IiYIOyXhuqyjCDtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2Rpc2FibGVJbnB1dFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xqUXVlcnl9IFtlbGVtZW50XSBBbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGVnLk1vdmFibGVDb29yZCBtb2R1bGUgaXMgdXNpbmcgKGlmIHRoZSBlbGVtZW50IHBhcmFtZXRlciBpcyBub3QgcHJlc2VudCwgaXQgYXBwbGllcyB0byBhbGwgYmluZGVkIGVsZW1lbnRzKTw8a28+ZWcuTW92YWJsZUNvb3JkIOuqqOuTiOydhCBcdOyCrOyaqe2VmOuKlCDsl5jrpqzrqLztirggKGVsZW1lbnQg7YyM652866+47YSw6rCAIOyhtOyerO2VmOyngCDslYrsnYQg6rK97JqwLCDrsJTsnbjrk5zrkJwg66qo65OgIOyXmOumrOuovO2KuOyXkCDsoIHsmqnrkJzri6QpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuTW92YWJsZUNvb3JkfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0ZGlzYWJsZUlucHV0KGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5faGFtbWVyTWFuYWdlci5pbnB1dENvbnRyb2woZmFsc2UsIGVsZW1lbnQpO1xuXHR9XG5cblx0Ly8gc2V0IHVwICdjc3MnIGV4cHJlc3Npb25cblx0X3JldmlzZU9wdGlvbnMoKSB7XG5cdFx0bGV0IGtleTtcblxuXHRcdFtcImJvdW5jZVwiLCBcIm1hcmdpblwiLCBcImNpcmN1bGFyXCJdLmZvckVhY2godiA9PiB7XG5cdFx0XHRrZXkgPSB0aGlzLm9wdGlvbnNbdl07XG5cdFx0XHRpZiAoa2V5ICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKGtleS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnNbdl0gPSBrZXkubGVuZ3RoID09PSAyID9cblx0XHRcdFx0XHRcdGtleS5jb25jYXQoa2V5KSA6IGtleS5jb25jYXQoKTtcblx0XHRcdFx0fSBlbHNlIGlmICgvc3RyaW5nfG51bWJlcnxib29sZWFuLy50ZXN0KHR5cGVvZiBrZXkpKSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zW3ZdID0gW2tleSwga2V5LCBrZXksIGtleV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zW3ZdID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIGxvZ2ljYWwgY29vcmRpbmF0ZXMuXG5cdCAqIEBrbyDrhbzrpqzsoIEg7KKM7ZGc7J2YIO2YhOyerCDsnITsuZjrpbwg67CY7ZmY7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI2dldFxuXHQgKiBAcmV0dXJuIHtBcnJheX0gcG9zIDxrbz7sooztkZw8L2tvPlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9IHBvcy4wIFRoZSBYIGNvb3JkaW5hdGUgPGtvPngg7KKM7ZGcPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfSBwb3MuMSBUaGUgWSBjb29yZGluYXRlIDxrbz55IOyijO2RnDwva28+XG5cdCAqL1xuXHRnZXQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3Bvcy5jb25jYXQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXN0cm95cyBlbGVtZW50cywgcHJvcGVydGllcywgYW5kIGV2ZW50cyB1c2VkIGluIGEgbW9kdWxlLlxuXHQgKiBAa28g66qo65OI7JeQIOyCrOyaqe2VnCDsl5jrpqzrqLztirjsmYAg7IaN7ISxLCDsnbTrsqTtirjrpbwg7ZW07KCc7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNkZXN0cm95XG5cdCAqL1xuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMub2ZmKCk7XG5cdFx0dGhpcy5faGFtbWVyTWFuYWdlci5kZXN0cm95KCk7XG5cdH1cbn07XG5cbk9iamVjdC5hc3NpZ24oTW92YWJsZUNvb3JkLCBESVJFQ1RJT04pO1xuTW92YWJsZUNvb3JkLlZFUlNJT04gPSBcIjIuMC4wLWJldGFcIjtcbmV4cG9ydCBkZWZhdWx0IE1vdmFibGVDb29yZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb3ZhYmxlQ29vcmQuanMiLCJpbXBvcnQgQ29vcmRpbmF0ZSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XG5pbXBvcnQge3dpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBzdXBlcmNsYXNzID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fcmFmID0gbnVsbDtcblx0XHR0aGlzLl9hbmltYXRlUGFyYW0gPSBudWxsO1xuXHRcdHRoaXMuX2FuaW1hdGlvbkVuZCA9IHRoaXMuX2FuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1x0Ly8gZm9yIGNhY2hpbmdcblx0XHR0aGlzLl9yZXN0b3JlID0gdGhpcy5fcmVzdG9yZS5iaW5kKHRoaXMpO1x0Ly8gZm9yIGNhY2hpbmdcblx0fVxuXG5cdF9ncmFiKG1pbiwgbWF4LCBjaXJjdWxhcikge1xuXHRcdGlmICh0aGlzLl9hbmltYXRlUGFyYW0pIHtcblx0XHRcdHRoaXMudHJpZ2dlcihcImFuaW1hdGlvbkVuZFwiKTtcblx0XHRcdGNvbnN0IG9yZ1BvcyA9IHRoaXMuZ2V0KCk7XG5cblx0XHRcdGNvbnN0IHBvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3ModGhpcy5nZXQoKSwgbWluLCBtYXgsIGNpcmN1bGFyKTtcblxuXHRcdFx0aWYgKHBvc1swXSAhPT0gb3JnUG9zWzBdIHx8IHBvc1sxXSAhPT0gb3JnUG9zWzFdKSB7XG5cdFx0XHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UocG9zLCB0cnVlKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2FuaW1hdGVQYXJhbSA9IG51bGw7XG5cdFx0XHR0aGlzLl9yYWYgJiYgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3JhZik7XG5cdFx0XHR0aGlzLl9yYWYgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdF9wcmVwYXJlUGFyYW0oYWJzUG9zLCBkdXJhdGlvbiwgaGFtbWVyRXZlbnQpIHtcblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblx0XHRjb25zdCBtYXhpbXVtRHVyYXRpb24gPSB0aGlzLm9wdGlvbnMubWF4aW11bUR1cmF0aW9uO1xuXHRcdGxldCBkZXN0UG9zID0gQ29vcmRpbmF0ZS5nZXRQb2ludE9mSW50ZXJzZWN0aW9uKFxuXHRcdFx0cG9zLCBhYnNQb3MsIG1pbiwgbWF4LCBjaXJjdWxhciwgdGhpcy5vcHRpb25zLmJvdW5jZSk7XG5cblx0XHRkZXN0UG9zID0gQ29vcmRpbmF0ZS5pc091dFRvT3V0KHBvcywgZGVzdFBvcywgbWluLCBtYXgpID8gcG9zIDogZGVzdFBvcztcblxuXHRcdGNvbnN0IGRpc3RhbmNlID0gW1xuXHRcdFx0TWF0aC5hYnMoZGVzdFBvc1swXSAtIHBvc1swXSksXG5cdFx0XHRNYXRoLmFicyhkZXN0UG9zWzFdIC0gcG9zWzFdKVxuXHRcdF07XG5cdFx0bGV0IG5ld0R1cmF0aW9uID0gZHVyYXRpb24gPT0gbnVsbCA/IENvb3JkaW5hdGUuZ2V0RHVyYXRpb25Gcm9tUG9zKFxuXHRcdFx0ZGlzdGFuY2UsIHRoaXMub3B0aW9ucy5kZWNlbGVyYXRpb24pIDogZHVyYXRpb247XG5cblx0XHRuZXdEdXJhdGlvbiA9IG1heGltdW1EdXJhdGlvbiA+IG5ld0R1cmF0aW9uID8gbmV3RHVyYXRpb24gOiBtYXhpbXVtRHVyYXRpb247XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRlcGFQb3M6IHBvcy5jb25jYXQoKSxcblx0XHRcdGRlc3RQb3M6IGRlc3RQb3MuY29uY2F0KCksXG5cdFx0XHRpc0JvdW5jZTogQ29vcmRpbmF0ZS5pc091dHNpZGUoZGVzdFBvcywgbWluLCBtYXgpLFxuXHRcdFx0aXNDaXJjdWxhcjogQ29vcmRpbmF0ZS5pc0NpcmN1bGFyKGFic1BvcywgbWluLCBtYXgsIGNpcmN1bGFyKSxcblx0XHRcdGR1cmF0aW9uOiBuZXdEdXJhdGlvbixcblx0XHRcdGRpc3RhbmNlLFxuXHRcdFx0aGFtbWVyRXZlbnQ6IGhhbW1lckV2ZW50IHx8IG51bGwsXG5cdFx0XHRkb25lOiB0aGlzLl9hbmltYXRpb25FbmRcblx0XHR9O1xuXHR9XG5cblx0X3Jlc3RvcmUoY29tcGxldGUsIGhhbW1lckV2ZW50KSB7XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblx0XHRjb25zdCBtaW4gPSB0aGlzLm9wdGlvbnMubWluO1xuXHRcdGNvbnN0IG1heCA9IHRoaXMub3B0aW9ucy5tYXg7XG5cblx0XHR0aGlzLl9hbmltYXRlKHRoaXMuX3ByZXBhcmVQYXJhbShbXG5cdFx0XHRNYXRoLm1pbihtYXhbMF0sIE1hdGgubWF4KG1pblswXSwgcG9zWzBdKSksXG5cdFx0XHRNYXRoLm1pbihtYXhbMV0sIE1hdGgubWF4KG1pblsxXSwgcG9zWzFdKSlcblx0XHRdLCBudWxsLCBoYW1tZXJFdmVudCksIGNvbXBsZXRlKTtcblx0fVxuXG5cdF9hbmltYXRpb25FbmQoKSB7XG5cdFx0dGhpcy5fYW5pbWF0ZVBhcmFtID0gbnVsbDtcblx0XHRjb25zdCBvcmdQb3MgPSB0aGlzLmdldCgpO1xuXHRcdGNvbnN0IG5leHRQb3MgPSBDb29yZGluYXRlLmdldENpcmN1bGFyUG9zKFtcblx0XHRcdE1hdGgucm91bmQob3JnUG9zWzBdKSxcblx0XHRcdE1hdGgucm91bmQob3JnUG9zWzFdKVxuXHRcdF0sIHRoaXMub3B0aW9ucy5taW4sIHRoaXMub3B0aW9ucy5tYXgsIHRoaXMub3B0aW9ucy5jaXJjdWxhcik7XG5cblx0XHR0aGlzLnNldFRvKC4uLm5leHRQb3MpO1xuXHRcdHRoaXMuX3NldEludGVycnVwdChmYWxzZSk7XG5cdFx0LyoqXG5cdFx0ICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGFuaW1hdGlvbiBlbmRzLlxuXHRcdCAqIEBrbyDsl5Dri4jrqZTsnbTshZjsnbQg64Gd64Ks7J2EIOuVjCDrsJzsg53tlZzri6QuXG5cdFx0ICogQG5hbWUgZWcuTW92YWJsZUNvb3JkI2FuaW1hdGlvbkVuZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqL1xuXHRcdHRoaXMudHJpZ2dlcihcImFuaW1hdGlvbkVuZFwiKTtcblx0fVxuXG5cdF9hbmltYXRlKHBhcmFtLCBjb21wbGV0ZSkge1xuXHRcdHRoaXMuX2FuaW1hdGVQYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtKTtcblx0XHR0aGlzLl9hbmltYXRlUGFyYW0uc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdFx0aWYgKHBhcmFtLmR1cmF0aW9uKSB7XG5cdFx0XHRjb25zdCBpbmZvID0gdGhpcy5fYW5pbWF0ZVBhcmFtO1xuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRcdChmdW5jdGlvbiBsb29wKCkge1xuXHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXHRcdFx0XHRzZWxmLl9yYWYgPSBudWxsO1xuXHRcdFx0XHRpZiAoc2VsZi5fZnJhbWUoaW5mbykgPj0gMSkge1xuXHRcdFx0XHRcdC8vIGRlZmVycmVkLnJlc29sdmUoKTtcblx0XHRcdFx0XHRjb21wbGV0ZSgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSAvLyBhbmltYXRpb25FbmRcblx0XHRcdFx0c2VsZi5fcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXHRcdFx0fSkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwYXJhbS5kZXN0UG9zLCBmYWxzZSk7XG5cdFx0XHRjb21wbGV0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdF9hbmltYXRlVG8oYWJzUG9zLCBkdXJhdGlvbiwgaGFtbWVyRXZlbnQpIHtcblx0XHRjb25zdCBwYXJhbSA9IHRoaXMuX3ByZXBhcmVQYXJhbShhYnNQb3MsIGR1cmF0aW9uLCBoYW1tZXJFdmVudCk7XG5cdFx0Y29uc3QgcmV0VHJpZ2dlciA9IHRoaXMudHJpZ2dlcihcImFuaW1hdGlvblN0YXJ0XCIsIHBhcmFtKTtcblxuXHRcdC8vIFlvdSBjYW4ndCBzdG9wIHRoZSAnYW5pbWF0aW9uU3RhcnQnIGV2ZW50IHdoZW4gJ2NpcmN1bGFyJyBpcyB0cnVlLlxuXHRcdGlmIChwYXJhbS5pc0NpcmN1bGFyICYmICFyZXRUcmlnZ2VyKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFwiWW91IGNhbid0IHN0b3AgdGhlICdhbmltYXRpb24nIGV2ZW50IHdoZW4gJ2NpcmN1bGFyJyBpcyB0cnVlLlwiXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChyZXRUcmlnZ2VyKSB7XG5cdFx0XHRjb25zdCBxdWV1ZSA9IFtdO1xuXHRcdFx0Y29uc3QgZGVxdWV1ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zdCB0YXNrID0gcXVldWUuc2hpZnQoKTtcblxuXHRcdFx0XHR0YXNrICYmIHRhc2suY2FsbCh0aGlzKTtcblx0XHRcdH07XG5cblx0XHRcdGlmIChwYXJhbS5kZXBhUG9zWzBdICE9PSBwYXJhbS5kZXN0UG9zWzBdIHx8XG5cdFx0XHRcdHBhcmFtLmRlcGFQb3NbMV0gIT09IHBhcmFtLmRlc3RQb3NbMV0pIHtcblx0XHRcdFx0cXVldWUucHVzaCgoKSA9PiB0aGlzLl9hbmltYXRlKHBhcmFtLCBkZXF1ZXVlKSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoQ29vcmRpbmF0ZS5pc091dHNpZGUoXG5cdFx0XHRcdHBhcmFtLmRlc3RQb3MsIHRoaXMub3B0aW9ucy5taW4sIHRoaXMub3B0aW9ucy5tYXgpKSB7XG5cdFx0XHRcdHF1ZXVlLnB1c2goKCkgPT4gdGhpcy5fcmVzdG9yZShkZXF1ZXVlLCBoYW1tZXJFdmVudCkpO1xuXHRcdFx0fVxuXHRcdFx0cXVldWUucHVzaCgoKSA9PiB0aGlzLl9hbmltYXRpb25FbmQoKSk7XG5cdFx0XHRkZXF1ZXVlKCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gYW5pbWF0aW9uIGZyYW1lICgwfjEpXG5cdF9mcmFtZShwYXJhbSkge1xuXHRcdGNvbnN0IGN1clRpbWUgPSBuZXcgRGF0ZSgpIC0gcGFyYW0uc3RhcnRUaW1lO1xuXHRcdGNvbnN0IGVhc2luZ1BlciA9IHRoaXMuX2Vhc2luZyhjdXJUaW1lIC8gcGFyYW0uZHVyYXRpb24pO1xuXHRcdGxldCBwb3MgPSBbcGFyYW0uZGVwYVBvc1swXSwgcGFyYW0uZGVwYVBvc1sxXV07XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xuXHRcdFx0KHBvc1tpXSAhPT0gcGFyYW0uZGVzdFBvc1tpXSkgJiZcblx0XHRcdChwb3NbaV0gKz0gKHBhcmFtLmRlc3RQb3NbaV0gLSBwb3NbaV0pICogZWFzaW5nUGVyKTtcblx0XHR9XG5cdFx0cG9zID0gQ29vcmRpbmF0ZS5nZXRDaXJjdWxhclBvcyhcblx0XHRcdHBvcywgdGhpcy5vcHRpb25zLm1pbiwgdGhpcy5vcHRpb25zLm1heCwgdGhpcy5vcHRpb25zLmNpcmN1bGFyKTtcblx0XHR0aGlzLl9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHBvcywgZmFsc2UpO1xuXHRcdHJldHVybiBlYXNpbmdQZXI7XG5cdH1cblxuXHQvLyB0cmlnZ2VyICdjaGFuZ2UnIGV2ZW50XG5cdF9zZXRQb3NBbmRUcmlnZ2VyQ2hhbmdlKHBvc2l0aW9uLCBob2xkaW5nLCBlKSB7XG5cdFx0LyoqXG5cdFx0ICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGNvb3JkaW5hdGUgY2hhbmdlcy5cblx0XHQgKiBAa28g7KKM7ZGc6rCAIOuzgOqyveuQkOydhCDrlYwg67Cc7IOd7ZWY64qUIOydtOuypO2KuFxuXHRcdCAqIEBuYW1lIGVnLk1vdmFibGVDb29yZCNjaGFuZ2Vcblx0XHQgKiBAZXZlbnRcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSBUaGUgb2JqZWN0IG9mIGRhdGEgdG8gYmUgc2VudCB3aGVuIHRoZSBldmVudCBpcyBmaXJlZCA8a28+7J2067Kk7Yq46rCAIOuwnOyDne2VoCDrlYwg7KCE64us65CY64qUIOuNsOydtO2EsCDqsJ3ssrQ8L2tvPlxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtLnBvc2l0aW9uIGRlcGFydHVyZSBjb29yZGluYXRlICA8a28+7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ucG9zaXRpb24uMCBUaGUgWCBjb29yZGluYXRlIDxrbz54IOyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLnBvcy4xIFRoZSBZIGNvb3JkaW5hdGUgPGtvPnkg7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IHBhcmFtLmhvbGRpbmcgSW5kaWNhdGVzIHdoZXRoZXIgYSB1c2VyIGhvbGRzIGFuIGVsZW1lbnQgb24gdGhlIHNjcmVlbiBvZiB0aGUgZGV2aWNlLjxrbz7sgqzsmqnsnpDqsIAg6riw6riw7J2YIO2ZlOuptOydhCDriITrpbTqs6Ag7J6I64qU7KeAIOyXrOu2gDwva28+XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtLmhhbW1lckV2ZW50IFRoZSBldmVudCBpbmZvcm1hdGlvbiBvZiBIYW1tZXIuSlMuIEl0IHJldHVybnMgbnVsbCBpZiB0aGUgZXZlbnQgaXMgZmlyZWQgdGhyb3VnaCBhIGNhbGwgdG8gdGhlIHNldFRvKCkgb3Igc2V0QnkoKSBtZXRob2QuPGtvPkhhbW1lci5KU+ydmCDsnbTrsqTtirgg7KCV67O0LiBzZXRUbygpIOuplOyEnOuTnOuCmCBzZXRCeSgpIOuplOyEnOuTnOulvCDtmLjstpztlbQg7J2067Kk7Yq46rCAIOuwnOyDne2WiOydhCDrlYzripQgJ251bGwn7J2EIOuwmO2ZmO2VnOuLpC48L2tvPlxuXHRcdCAqXG5cdFx0ICovXG5cdFx0dGhpcy5fcG9zID0gcG9zaXRpb24uY29uY2F0KCk7XG5cdFx0dGhpcy50cmlnZ2VyKFwiY2hhbmdlXCIsIHtcblx0XHRcdHBvczogcG9zaXRpb24uY29uY2F0KCksXG5cdFx0XHRob2xkaW5nLFxuXHRcdFx0aGFtbWVyRXZlbnQ6IGUgfHwgbnVsbFxuXHRcdH0pO1xuXHR9XG5cblx0X2Vhc2luZyhwKSB7XG5cdFx0cmV0dXJuIHAgPiAxID8gMSA6IHRoaXMub3B0aW9ucy5lYXNpbmcocCk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgYW4gZWxlbWVudCB0byBzcGVjaWZpYyBjb29yZGluYXRlcy5cblx0ICogQGtvIOyijO2RnOulvCDsnbTrj5ntlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuTW92YWJsZUNvb3JkI3NldFRvXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB4IFRoZSBYIGNvb3JkaW5hdGUgdG8gbW92ZSB0byA8a28+7J2064+Z7ZWgIHjsooztkZw8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0geSBUaGUgWSBjb29yZGluYXRlIHRvIG1vdmUgdG8gIDxrbz7snbTrj5ntlaAgeeyijO2RnDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249MF0gRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiAodW5pdDogbXMpIDxrbz7slaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7snpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdHNldFRvKHgsIHksIGR1cmF0aW9uID0gMCkge1xuXHRcdGxldCB0b1ggPSB4O1xuXHRcdGxldCB0b1kgPSB5O1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblxuXHRcdHRoaXMuX2dyYWIobWluLCBtYXgsIGNpcmN1bGFyKTtcblx0XHRjb25zdCBwb3MgPSB0aGlzLmdldCgpO1xuXG5cdFx0aWYgKHggPT09IHBvc1swXSAmJiB5ID09PSBwb3NbMV0pIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX3NldEludGVycnVwdCh0cnVlKTtcblx0XHRpZiAoeCAhPT0gcG9zWzBdKSB7XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzNdKSB7XG5cdFx0XHRcdHRvWCA9IE1hdGgubWF4KG1pblswXSwgdG9YKTtcblx0XHRcdH1cblx0XHRcdGlmICghY2lyY3VsYXJbMV0pIHtcblx0XHRcdFx0dG9YID0gTWF0aC5taW4obWF4WzBdLCB0b1gpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoeSAhPT0gcG9zWzFdKSB7XG5cdFx0XHRpZiAoIWNpcmN1bGFyWzBdKSB7XG5cdFx0XHRcdHRvWSA9IE1hdGgubWF4KG1pblsxXSwgdG9ZKTtcblx0XHRcdH1cblx0XHRcdGlmICghY2lyY3VsYXJbMl0pIHtcblx0XHRcdFx0dG9ZID0gTWF0aC5taW4obWF4WzFdLCB0b1kpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoZHVyYXRpb24pIHtcblx0XHRcdHRoaXMuX2FuaW1hdGVUbyhbdG9YLCB0b1ldLCBkdXJhdGlvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3MoW3RvWCwgdG9ZXSwgbWluLCBtYXgsIGNpcmN1bGFyKTtcblx0XHRcdHRoaXMuX3NldFBvc0FuZFRyaWdnZXJDaGFuZ2UodGhpcy5fcG9zLCBmYWxzZSk7XG5cdFx0XHR0aGlzLl9zZXRJbnRlcnJ1cHQoZmFsc2UpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyBhbiBlbGVtZW50IGZyb20gdGhlIGN1cnJlbnQgY29vcmRpbmF0ZXMgdG8gc3BlY2lmaWMgY29vcmRpbmF0ZXMuIFRoZSBjaGFuZ2UgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWV0aG9kIGlzIGV4ZWN1dGVkLlxuXHQgKiBAa28g7ZiE7J6sIOyijO2RnOulvCDquLDspIDsnLzroZwg7KKM7ZGc66W8IOydtOuPme2VnOuLpC4g66mU7ISc65Oc6rCAIOyLpO2WieuQmOuptCBjaGFuZ2Ug7J2067Kk7Yq46rCAIOuwnOyDne2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnLk1vdmFibGVDb29yZCNzZXRCeVxuXHQgKiBAcGFyYW0ge051bWJlcn0geCBUaGUgWCBjb29yZGluYXRlIHRvIG1vdmUgdG8gPGtvPuydtOuPme2VoCB47KKM7ZGcPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgVGhlIFkgY29vcmRpbmF0ZSB0byBtb3ZlIHRvIDxrbz7snbTrj5ntlaAgeeyijO2RnDwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249MF0gRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiAodW5pdDogbXMpIDxrbz7slaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLk1vdmFibGVDb29yZH0gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7snpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdHNldEJ5KHgsIHksIGR1cmF0aW9uID0gMCkge1xuXHRcdHJldHVybiB0aGlzLnNldFRvKFxuXHRcdFx0eCAhPSBudWxsID8gdGhpcy5fcG9zWzBdICsgeCA6IHRoaXMuX3Bvc1swXSxcblx0XHRcdHkgIT0gbnVsbCA/IHRoaXMuX3Bvc1sxXSArIHkgOiB0aGlzLl9wb3NbMV0sXG5cdFx0XHRkdXJhdGlvblxuXHRcdCk7XG5cdH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYW5pbWF0aW9uSGFuZGxlci5qcyIsImltcG9ydCBDb29yZGluYXRlIGZyb20gXCIuL2Nvb3JkaW5hdGVcIjtcbmltcG9ydCB7RElSRUNUSU9OfSBmcm9tIFwiLi9jb25zdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3N0YXR1cyA9IHtcblx0XHRcdGdyYWJPdXRzaWRlOiBmYWxzZSxcdFx0Ly8gY2hlY2sgd2hldGhlciB1c2VyJ3MgYWN0aW9uIHN0YXJ0ZWQgb24gb3V0c2lkZVxuXHRcdFx0Y3VycmVudEhhbW1lcjogbnVsbCxcdFx0Ly8gY3VycmVudCBoYW1tZXIgaW5zdGFuY2Vcblx0XHRcdGN1cnJlbnRPcHRpb25zOiB7fSxcdFx0Ly8gY3VycmVudCBiaW5kIG9wdGlvbnNcblx0XHRcdG1vdmVEaXN0YW5jZTogbnVsbCxcdFx0Ly8gYSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgdXNlcidzIGFjdGlvblxuXHRcdFx0cHJldmVudGVkOiBmYWxzZVx0XHQvLyAgY2hlY2sgd2hldGhlciB0aGUgYW5pbWF0aW9uIGV2ZW50IHdhcyBwcmV2ZW50ZWRcblx0XHR9O1xuXHR9XG5cblx0X3NldEN1cnJlbnRUYXJnZXQoaGFtbWVyLCBvcHRpb25zKSB7XG5cdFx0dGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLl9zdGF0dXMuY3VycmVudEhhbm1tZXIgPSBoYW1tZXI7XG5cdH1cblxuXHQvLyBwYW5zdGFydCBldmVudCBoYW5kbGVyXG5cdF9zdGFydChlKSB7XG5cdFx0aWYgKCF0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuaW50ZXJydXB0YWJsZSAmJiB0aGlzLl9zdGF0dXMucHJldmVudGVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IHBvcyA9IHRoaXMuZ2V0KCk7XG5cdFx0Y29uc3QgbWluID0gdGhpcy5vcHRpb25zLm1pbjtcblx0XHRjb25zdCBtYXggPSB0aGlzLm9wdGlvbnMubWF4O1xuXG5cdFx0dGhpcy5fc2V0SW50ZXJydXB0KHRydWUpO1xuXHRcdHRoaXMuX2dyYWIobWluLCBtYXgsIHRoaXMub3B0aW9ucy5jaXJjdWxhcik7XG5cdFx0LyoqXG5cdFx0ICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGEgdXNlciBob2xkcyBhbiBlbGVtZW50IG9uIHRoZSBzY3JlZW4gb2YgdGhlIGRldmljZS5cblx0XHQgKiBAa28g7IKs7Jqp7J6Q6rCAIOq4sOq4sOydmCDtmZTrqbTsl5Ag7IaQ7J2EIOuMgOqzoCDsnojsnYQg65WMIOuwnOyDne2VmOuKlCDsnbTrsqTtirhcblx0XHQgKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQjaG9sZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSBUaGUgb2JqZWN0IG9mIGRhdGEgdG8gYmUgc2VudCB3aGVuIHRoZSBldmVudCBpcyBmaXJlZDxrbz7snbTrsqTtirjqsIAg67Cc7IOd7ZWgIOuVjCDsoITri6zrkJjripQg642w7J207YSwIOqwneyytDwva28+XG5cdFx0ICogQHBhcmFtIHtBcnJheX0gcGFyYW0ucG9zIGNvb3JkaW5hdGUgPGtvPuyijO2RnCDsoJXrs7Q8L2tvPlxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5wb3MuMCBUaGUgWCBjb29yZGluYXRlPGtvPngg7KKM7ZGcPC9rbz5cblx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ucG9zLjEgVGhlIFkgY29vcmRpbmF0ZTxrbz55IOyijO2RnDwva28+XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtLmhhbW1lckV2ZW50IFRoZSBldmVudCBpbmZvcm1hdGlvbiBvZiBIYW1tZXIuSlMuIEl0IHJldHVybnMgbnVsbCBpZiB0aGUgZXZlbnQgaXMgZmlyZWQgdGhyb3VnaCBhIGNhbGwgdG8gdGhlIHNldFRvKCkgb3Igc2V0QnkoKSBtZXRob2QuPGtvPkhhbW1lci5KU+ydmCDsnbTrsqTtirgg7KCV67O0LiBzZXRUbygpIOuplOyEnOuTnOuCmCBzZXRCeSgpIOuplOyEnOuTnOulvCDtmLjstpztlbQg7J2067Kk7Yq46rCAIOuwnOyDne2WiOydhCDrlYzripQgJ251bGwn7J2EIOuwmO2ZmO2VnOuLpC48L2tvPlxuXHRcdCAqXG5cdFx0ICovXG5cdFx0dGhpcy50cmlnZ2VyKFwiaG9sZFwiLCB7XG5cdFx0XHRwb3M6IHBvcy5jb25jYXQoKSxcblx0XHRcdGhhbW1lckV2ZW50OiBlXG5cdFx0fSk7XG5cblx0XHR0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlID0gcG9zLmNvbmNhdCgpO1xuXHRcdHRoaXMuX3N0YXR1cy5ncmFiT3V0c2lkZSA9IENvb3JkaW5hdGUuaXNPdXRzaWRlKHBvcywgbWluLCBtYXgpO1xuXHR9XG5cblx0Ly8gcGFubW92ZSBldmVudCBoYW5kbGVyXG5cdF9tb3ZlKGUpIHtcblx0XHRpZiAoIXRoaXMuX2lzSW50ZXJydXB0aW5nKCkgfHwgIXRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IHBvcyA9IHRoaXMuZ2V0KHRydWUpO1xuXHRcdGNvbnN0IG1pbiA9IHRoaXMub3B0aW9ucy5taW47XG5cdFx0Y29uc3QgbWF4ID0gdGhpcy5vcHRpb25zLm1heDtcblx0XHRjb25zdCBib3VuY2UgPSB0aGlzLm9wdGlvbnMuYm91bmNlO1xuXHRcdGNvbnN0IG1hcmdpbiA9IHRoaXMub3B0aW9ucy5tYXJnaW47XG5cdFx0Y29uc3QgY3VycmVudE9wdGlvbnMgPSB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnM7XG5cdFx0Y29uc3QgZGlyZWN0aW9uID0gY3VycmVudE9wdGlvbnMuZGlyZWN0aW9uO1xuXHRcdGNvbnN0IHNjYWxlID0gY3VycmVudE9wdGlvbnMuc2NhbGU7XG5cdFx0Y29uc3QgdXNlckRpcmVjdGlvbiA9IENvb3JkaW5hdGUuZ2V0RGlyZWN0aW9uQnlBbmdsZShcblx0XHRcdGUuYW5nbGUsIGN1cnJlbnRPcHRpb25zLnRocmVzaG9sZEFuZ2xlKTtcblx0XHRjb25zdCBvdXQgPSBbXG5cdFx0XHRtYXJnaW5bMF0gKyBib3VuY2VbMF0sXG5cdFx0XHRtYXJnaW5bMV0gKyBib3VuY2VbMV0sXG5cdFx0XHRtYXJnaW5bMl0gKyBib3VuY2VbMl0sXG5cdFx0XHRtYXJnaW5bM10gKyBib3VuY2VbM11cblx0XHRdO1xuXHRcdGxldCBwcmV2ZW50ID0gZmFsc2U7XG5cblx0XHQvLyBub3Qgc3VwcG9ydCBvZmZzZXQgcHJvcGVydGllcyBpbiBIYW1tZXJqcyAtIHN0YXJ0XG5cdFx0Y29uc3QgcHJldklucHV0ID0gdGhpcy5fc3RhdHVzLmN1cnJlbnRIYW5tbWVyLnNlc3Npb24ucHJldklucHV0O1xuXG5cdFx0LyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblx0XHRpZiAocHJldklucHV0KSB7XG5cdFx0XHRlLm9mZnNldFggPSBlLmRlbHRhWCAtIHByZXZJbnB1dC5kZWx0YVg7XG5cdFx0XHRlLm9mZnNldFkgPSBlLmRlbHRhWSAtIHByZXZJbnB1dC5kZWx0YVk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGUub2Zmc2V0WCA9IGUub2Zmc2V0WSA9IDA7XG5cdFx0fVxuXG5cdFx0Ly8gbm90IHN1cHBvcnQgb2Zmc2V0IHByb3BlcnRpZXMgaW4gSGFtbWVyanMgLSBlbmRcblx0XHRpZiAoQ29vcmRpbmF0ZS5pc0hvcml6b250YWwoZGlyZWN0aW9uLCB1c2VyRGlyZWN0aW9uKSkge1xuXHRcdFx0dGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZVswXSArPSAoZS5vZmZzZXRYICogc2NhbGVbMF0pO1xuXHRcdFx0cHJldmVudCA9IHRydWU7XG5cdFx0fVxuXHRcdGlmIChDb29yZGluYXRlLmlzVmVydGljYWwoZGlyZWN0aW9uLCB1c2VyRGlyZWN0aW9uKSkge1xuXHRcdFx0dGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZVsxXSArPSAoZS5vZmZzZXRZICogc2NhbGVbMV0pO1xuXHRcdFx0cHJldmVudCA9IHRydWU7XG5cdFx0fVxuXHRcdGlmIChwcmV2ZW50KSB7XG5cdFx0XHRlLnNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRlLnNyY0V2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0XHRlLnByZXZlbnRTeXN0ZW1FdmVudCA9IHByZXZlbnQ7XG5cdFx0LyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5cdFx0cG9zWzBdID0gdGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZVswXTtcblx0XHRwb3NbMV0gPSB0aGlzLl9zdGF0dXMubW92ZURpc3RhbmNlWzFdO1xuXHRcdHBvcyA9IENvb3JkaW5hdGUuZ2V0Q2lyY3VsYXJQb3MocG9zLCBtaW4sIG1heCwgdGhpcy5vcHRpb25zLmNpcmN1bGFyKTtcblxuXHRcdC8vIGZyb20gb3V0c2lkZSB0byBpbnNpZGVcblx0XHRpZiAodGhpcy5fc3RhdHVzLmdyYWJPdXRzaWRlICYmICFDb29yZGluYXRlLmlzT3V0c2lkZShwb3MsIG1pbiwgbWF4KSkge1xuXHRcdFx0dGhpcy5fc3RhdHVzLmdyYWJPdXRzaWRlID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gd2hlbiBtb3ZlIHBvaW50ZXIgaXMgaGVsZCBpbiBvdXRzaWRlXG5cdFx0bGV0IHR2O1xuXHRcdGxldCB0bjtcblx0XHRsZXQgdHg7XG5cblx0XHRpZiAodGhpcy5fc3RhdHVzLmdyYWJPdXRzaWRlKSB7XG5cdFx0XHR0biA9IG1pblswXSAtIG91dFszXTtcblx0XHRcdHR4ID0gbWF4WzBdICsgb3V0WzFdO1xuXHRcdFx0dHYgPSBwb3NbMF07XG5cdFx0XHRwb3NbMF0gPSB0diA+IHR4ID8gdHggOiAodHYgPCB0biA/IHRuIDogdHYpO1xuXHRcdFx0dG4gPSBtaW5bMV0gLSBvdXRbMF07XG5cdFx0XHR0eCA9IG1heFsxXSArIG91dFsyXTtcblx0XHRcdHR2ID0gcG9zWzFdO1xuXHRcdFx0cG9zWzFdID0gdHYgPiB0eCA/IHR4IDogKHR2IDwgdG4gPyB0biA6IHR2KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gd2hlbiBzdGFydCBwb2ludGVyIGlzIGhlbGQgaW4gaW5zaWRlXG5cdFx0XHQvLyBnZXQgYSBpbml0aWFsaXphdGlvbiBzbG9wZSB2YWx1ZSB0byBwcmV2ZW50IHNtb290aCBhbmltYXRpb24uXG5cdFx0XHRjb25zdCBpbml0U2xvcGUgPSB0aGlzLl9lYXNpbmcoMC4wMDAwMSkgLyAwLjAwMDAxO1xuXG5cdFx0XHRpZiAocG9zWzFdIDwgbWluWzFdKSB7IC8vIHVwXG5cdFx0XHRcdHR2ID0gKG1pblsxXSAtIHBvc1sxXSkgLyAob3V0WzBdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzFdID0gbWluWzFdIC0gdGhpcy5fZWFzaW5nKHR2KSAqIG91dFswXTtcblx0XHRcdH0gZWxzZSBpZiAocG9zWzFdID4gbWF4WzFdKSB7IC8vIGRvd25cblx0XHRcdFx0dHYgPSAocG9zWzFdIC0gbWF4WzFdKSAvIChvdXRbMl0gKiBpbml0U2xvcGUpO1xuXHRcdFx0XHRwb3NbMV0gPSBtYXhbMV0gKyB0aGlzLl9lYXNpbmcodHYpICogb3V0WzJdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc1swXSA8IG1pblswXSkgeyAvLyBsZWZ0XG5cdFx0XHRcdHR2ID0gKG1pblswXSAtIHBvc1swXSkgLyAob3V0WzNdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzBdID0gbWluWzBdIC0gdGhpcy5fZWFzaW5nKHR2KSAqIG91dFszXTtcblx0XHRcdH0gZWxzZSBpZiAocG9zWzBdID4gbWF4WzBdKSB7IC8vIHJpZ2h0XG5cdFx0XHRcdHR2ID0gKHBvc1swXSAtIG1heFswXSkgLyAob3V0WzFdICogaW5pdFNsb3BlKTtcblx0XHRcdFx0cG9zWzBdID0gbWF4WzBdICsgdGhpcy5fZWFzaW5nKHR2KSAqIG91dFsxXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fc2V0UG9zQW5kVHJpZ2dlckNoYW5nZShwb3MsIHRydWUsIGUpO1xuXHR9XG5cblx0Ly8gcGFuZW5kIGV2ZW50IGhhbmRsZXJcblx0X2VuZChlKSB7XG5cdFx0Y29uc3QgcG9zID0gdGhpcy5nZXQoKTtcblxuXHRcdGlmICghdGhpcy5faXNJbnRlcnJ1cHRpbmcoKSB8fCAhdGhpcy5fc3RhdHVzLm1vdmVEaXN0YW5jZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEFib3J0IHRoZSBhbmltYXRpbmcgcG9zdCBwcm9jZXNzIHdoZW4gXCJ0YXBcIiBvY2N1cnNcblx0XHRpZiAoZS5kaXN0YW5jZSA9PT0gMCAvKiBlLnR5cGUgPT09IFwidGFwXCIgKi8pIHtcblx0XHRcdHRoaXMuX3NldEludGVycnVwdChmYWxzZSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJyZWxlYXNlXCIsIHtcblx0XHRcdFx0ZGVwYVBvczogcG9zLmNvbmNhdCgpLFxuXHRcdFx0XHRkZXN0UG9zOiBwb3MuY29uY2F0KCksXG5cdFx0XHRcdGhhbW1lckV2ZW50OiBlIHx8IG51bGxcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBkaXJlY3Rpb24gPSB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuZGlyZWN0aW9uO1xuXHRcdFx0Y29uc3Qgc2NhbGUgPSB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuc2NhbGU7XG5cdFx0XHRsZXQgdlggPSBNYXRoLmFicyhlLnZlbG9jaXR5WCk7XG5cdFx0XHRsZXQgdlkgPSBNYXRoLmFicyhlLnZlbG9jaXR5WSk7XG5cblx0XHRcdCEoZGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9IT1JJWk9OVEFMKSAmJiAodlggPSAwKTtcblx0XHRcdCEoZGlyZWN0aW9uICYgRElSRUNUSU9OLkRJUkVDVElPTl9WRVJUSUNBTCkgJiYgKHZZID0gMCk7XG5cblx0XHRcdGNvbnN0IG9mZnNldCA9IENvb3JkaW5hdGUuZ2V0TmV4dE9mZnNldFBvcyhbXG5cdFx0XHRcdHZYICogKGUuZGVsdGFYIDwgMCA/IC0xIDogMSkgKiBzY2FsZVswXSxcblx0XHRcdFx0dlkgKiAoZS5kZWx0YVkgPCAwID8gLTEgOiAxKSAqIHNjYWxlWzFdXG5cdFx0XHRdLCB0aGlzLm9wdGlvbnMuZGVjZWxlcmF0aW9uKTtcblx0XHRcdGxldCBkZXN0UG9zID0gW3Bvc1swXSArIG9mZnNldFswXSwgcG9zWzFdICsgb2Zmc2V0WzFdXTtcblxuXHRcdFx0ZGVzdFBvcyA9IENvb3JkaW5hdGUuZ2V0UG9pbnRPZkludGVyc2VjdGlvbihwb3MsIGRlc3RQb3MsXG5cdFx0XHRcdHRoaXMub3B0aW9ucy5taW4sIHRoaXMub3B0aW9ucy5tYXgsXG5cdFx0XHRcdHRoaXMub3B0aW9ucy5jaXJjdWxhciwgdGhpcy5vcHRpb25zLmJvdW5jZSk7XG5cdFx0XHQvKipcblx0XHRcdCAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIHVzZXIgcmVsZWFzZSBhbiBlbGVtZW50IG9uIHRoZSBzY3JlZW4gb2YgdGhlIGRldmljZS5cblx0XHRcdCAqIEBrbyDsgqzsmqnsnpDqsIAg6riw6riw7J2YIO2ZlOuptOyXkOyEnCDshpDsnYQg65eQ7J2EIOuVjCDrsJzsg53tlZjripQg7J2067Kk7Yq4XG5cdFx0XHQgKiBAbmFtZSBlZy5Nb3ZhYmxlQ29vcmQjcmVsZWFzZVxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIFRoZSBvYmplY3Qgb2YgZGF0YSB0byBiZSBzZW50IHdoZW4gdGhlIGV2ZW50IGlzIGZpcmVkPGtvPuydtOuypO2KuOqwgCDrsJzsg53tlaAg65WMIOyghOuLrOuQmOuKlCDrjbDsnbTthLAg6rCd7LK0PC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtLmRlcGFQb3MgVGhlIGNvb3JkaW5hdGVzIHdoZW4gcmVsZWFzaW5nIGFuIGVsZW1lbnQ8a28+7IaQ7J2EIOuXkOydhCDrlYzsnZgg7KKM7ZGc7ZiE7J6sIDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0uZGVwYVBvcy4wIFRoZSBYIGNvb3JkaW5hdGUgPGtvPiB4IOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0uZGVwYVBvcy4xIFRoZSBZIGNvb3JkaW5hdGUgPGtvPiB5IOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBwYXJhbS5kZXN0UG9zIFRoZSBjb29yZGluYXRlcyB0byBtb3ZlIHRvIGFmdGVyIHJlbGVhc2luZyBhbiBlbGVtZW50PGtvPuyGkOydhCDrl4Ag65Kk7JeQIOydtOuPme2VoCDsooztkZw8L2tvPlxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLmRlc3RQb3MuMCBUaGUgWCBjb29yZGluYXRlIDxrbz54IOyijO2RnDwva28+XG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0uZGVzdFBvcy4xIFRoZSBZIGNvb3JkaW5hdGUgPGtvPnkg7KKM7ZGcPC9rbz5cblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbS5oYW1tZXJFdmVudCBUaGUgZXZlbnQgaW5mb3JtYXRpb24gb2YgSGFtbWVyLkpTLiBJdCByZXR1cm5zIG51bGwgaWYgdGhlIGV2ZW50IGlzIGZpcmVkIHRocm91Z2ggYSBjYWxsIHRvIHRoZSBzZXRUbygpIG9yIHNldEJ5KCkgbWV0aG9kLjxrbz5IYW1tZXIuSlPsnZgg7J2067Kk7Yq4IOygleuztC4gc2V0VG8oKSDrqZTshJzrk5zrgpggc2V0QnkoKSDrqZTshJzrk5zrpbwg7Zi47Lac7ZW0IOydtOuypO2KuOqwgCDrsJzsg53tlojsnYQg65WM64qUICdudWxsJ+ydhCDrsJjtmZjtlZzri6Q8L2tvPlxuXHRcdFx0ICpcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKFwicmVsZWFzZVwiLCB7XG5cdFx0XHRcdGRlcGFQb3M6IHBvcy5jb25jYXQoKSxcblx0XHRcdFx0ZGVzdFBvcyxcblx0XHRcdFx0aGFtbWVyRXZlbnQ6IGUgfHwgbnVsbFxuXHRcdFx0fSk7XG5cdFx0XHRpZiAocG9zWzBdICE9PSBkZXN0UG9zWzBdIHx8IHBvc1sxXSAhPT0gZGVzdFBvc1sxXSkge1xuXHRcdFx0XHR0aGlzLl9hbmltYXRlVG8oZGVzdFBvcywgbnVsbCwgZSB8fCBudWxsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3NldEludGVycnVwdChmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3N0YXR1cy5tb3ZlRGlzdGFuY2UgPSBudWxsO1xuXHR9XG5cblx0X2lzSW50ZXJydXB0aW5nKCkge1xuXHRcdC8vIHdoZW4gaW50ZXJydXB0YWJsZSBpcyAndHJ1ZScsIHJldHVybiB2YWx1ZSBpcyBhbHdheXMgJ3RydWUnLlxuXHRcdHJldHVybiB0aGlzLl9zdGF0dXMuY3VycmVudE9wdGlvbnMuaW50ZXJydXB0YWJsZSB8fCB0aGlzLl9zdGF0dXMucHJldmVudGVkO1xuXHR9XG5cblx0X3NldEludGVycnVwdChwcmV2ZW50ZWQpIHtcblx0XHQhdGhpcy5fc3RhdHVzLmN1cnJlbnRPcHRpb25zLmludGVycnVwdGFibGUgJiZcblx0XHQodGhpcy5fc3RhdHVzLnByZXZlbnRlZCA9IHByZXZlbnRlZCk7XG5cdH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXZlbnRIYW5kbGVyLmpzIiwiaW1wb3J0IEhhbW1lciBmcm9tIFwiaGFtbWVyanNcIjtcbmltcG9ydCB7dXRpbHN9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge0RJUkVDVElPTiwgVU5JUVVFS0VZLCBTVVBQT1JUX1RPVUNIfSBmcm9tIFwiLi9jb25zdHNcIjtcblxuaWYgKHR5cGVvZiBIYW1tZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0dGhyb3cgbmV3IEVycm9yKGBUaGUgSGFtbWVyanMgbXVzdCBiZSBsb2FkZWQgYmVmb3JlIGVnLk1vdmFibGVDb29yZC5cXG5odHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2ApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW1tZXJNYW5hZ2VyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5faGFtbWVycyA9IHt9O1xuXHR9XG5cblx0X2NyZWF0ZUhhbW1lcihlbCwgYmluZE9wdGlvbnMsIGlucHV0Q2xhc3MsIGhhbmRsZXIpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gY3JlYXRlIEhhbW1lclxuXHRcdFx0cmV0dXJuIHRoaXMuX2F0dGFjaEhhbW1lckV2ZW50cyhuZXcgSGFtbWVyLk1hbmFnZXIoZWwsIHtcblx0XHRcdFx0cmVjb2duaXplcnM6IFtcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRIYW1tZXIuUGFuLCB7XG5cdFx0XHRcdFx0XHRcdGRpcmVjdGlvbjogYmluZE9wdGlvbnMuZGlyZWN0aW9uLFxuXHRcdFx0XHRcdFx0XHR0aHJlc2hvbGQ6IDBcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdF0sXG5cblx0XHRcdFx0Ly8gY3NzIHByb3BlcnRpZXMgd2VyZSByZW1vdmVkIGR1ZSB0byB1c2FibGlsaXR5IGlzc3VlXG5cdFx0XHRcdC8vIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vanNkb2MvSGFtbWVyLmRlZmF1bHRzLmNzc1Byb3BzLmh0bWxcblx0XHRcdFx0Y3NzUHJvcHM6IHtcblx0XHRcdFx0XHR1c2VyU2VsZWN0OiBcIm5vbmVcIixcblx0XHRcdFx0XHR0b3VjaFNlbGVjdDogXCJub25lXCIsXG5cdFx0XHRcdFx0dG91Y2hDYWxsb3V0OiBcIm5vbmVcIixcblx0XHRcdFx0XHR1c2VyRHJhZzogXCJub25lXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0aW5wdXRDbGFzc1xuXHRcdFx0fSksIGJpbmRPcHRpb25zLCBoYW5kbGVyKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRhZGQoZWxlbWVudCwgb3B0aW9ucywgaGFuZGxlcikge1xuXHRcdGNvbnN0IGVsID0gdXRpbHMuZ2V0RWxlbWVudChlbGVtZW50KTtcblx0XHRsZXQga2V5VmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUoVU5JUVVFS0VZKTtcblx0XHRjb25zdCBiaW5kT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0ZGlyZWN0aW9uOiBESVJFQ1RJT04uRElSRUNUSU9OX0FMTCxcblx0XHRcdHNjYWxlOiBbMSwgMV0sXG5cdFx0XHR0aHJlc2hvbGRBbmdsZTogNDUsXG5cdFx0XHRpbnRlcnJ1cHRhYmxlOiB0cnVlLFxuXHRcdFx0aW5wdXRUeXBlOiBbXCJ0b3VjaFwiLCBcIm1vdXNlXCJdXG5cdFx0fSwgb3B0aW9ucyk7XG5cdFx0Y29uc3QgaW5wdXRDbGFzcyA9IHRoaXMuY29udmVydElucHV0VHlwZShiaW5kT3B0aW9ucy5pbnB1dFR5cGUpO1xuXG5cdFx0aWYgKCFpbnB1dENsYXNzKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGtleVZhbHVlKSB7XG5cdFx0XHR0aGlzLl9oYW1tZXJzW2tleVZhbHVlXS5oYW1tZXIuZGVzdHJveSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRrZXlWYWx1ZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcblx0XHR9XG5cdFx0dGhpcy5faGFtbWVyc1trZXlWYWx1ZV0gPSB7XG5cdFx0XHRoYW1tZXI6IHRoaXMuX2NyZWF0ZUhhbW1lcihcblx0XHRcdFx0ZWwsXG5cdFx0XHRcdGJpbmRPcHRpb25zLFxuXHRcdFx0XHRpbnB1dENsYXNzLFxuXHRcdFx0XHRoYW5kbGVyXG5cdFx0XHQpLFxuXHRcdFx0ZWwsXG5cdFx0XHRvcHRpb25zOiBiaW5kT3B0aW9uc1xuXHRcdH07XG5cdFx0ZWwuc2V0QXR0cmlidXRlKFVOSVFVRUtFWSwga2V5VmFsdWUpO1xuXHR9XG5cblx0cmVtb3ZlKGVsZW1lbnQpIHtcblx0XHRjb25zdCBlbCA9IHV0aWxzLmdldEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0Y29uc3Qga2V5ID0gZWwuZ2V0QXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cblx0XHRpZiAoa2V5KSB7XG5cdFx0XHR0aGlzLl9oYW1tZXJzW2tleV0uaGFtbWVyLmRlc3Ryb3koKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9oYW1tZXJzW2tleV07XG5cdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoVU5JUVVFS0VZKTtcblx0XHR9XG5cdH1cblxuXHRnZXRIYW1tZXIoZWxlbWVudCkge1xuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLmdldChlbGVtZW50KTtcblxuXHRcdHJldHVybiBkYXRhID8gZGF0YS5oYW1tZXIgOiBudWxsO1xuXHR9XG5cblx0Z2V0KGVsZW1lbnQpIHtcblx0XHRjb25zdCBlbCA9IHV0aWxzLmdldEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0Y29uc3Qga2V5ID0gZWwgPyBlbC5nZXRBdHRyaWJ1dGUoVU5JUVVFS0VZKSA6IG51bGw7XG5cblx0XHRpZiAoa2V5ICYmIHRoaXMuX2hhbW1lcnNba2V5XSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2hhbW1lcnNba2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0X2F0dGFjaEhhbW1lckV2ZW50cyhoYW1tZXIsIG9wdGlvbnMsIGhhbmRsZXIpIHtcblx0XHRjb25zdCBlbmFibGUgPSBoYW1tZXIuZ2V0KFwicGFuXCIpLm9wdGlvbnMuZW5hYmxlO1xuXG5cdFx0LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblx0XHRyZXR1cm4gaGFtbWVyXG5cdFx0XHQub24oXCJoYW1tZXIuaW5wdXRcIiwgZSA9PiB7XG5cdFx0XHRcdGlmIChlLmlzRmlyc3QpIHtcblx0XHRcdFx0XHQvLyBhcHBseSBvcHRpb25zIGVhY2hcblx0XHRcdFx0XHRoYW5kbGVyLl9zZXRDdXJyZW50VGFyZ2V0KGhhbW1lciwgb3B0aW9ucyk7XG5cdFx0XHRcdFx0ZW5hYmxlICYmIGhhbmRsZXIuX3N0YXJ0KGUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGUuaXNGaW5hbCkge1xuXHRcdFx0XHRcdC8vIHN1YnN0aXR1dGUgLm9uKFwicGFuZW5kIHRhcFwiLCB0aGlzLl9wYW5lbmQpOyBCZWNhdXNlIGl0KHRhcCwgcGFuZW5kKSBjYW5ub3QgY2F0Y2ggdmVydGljYWwoaG9yaXpvbnRhbCkgbW92ZW1lbnQgb24gSE9SSVpPTlRBTChWRVJUSUNBTCkgbW9kZS5cblx0XHRcdFx0XHRlbmFibGUgJiYgaGFuZGxlci5fZW5kKGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5vbihcInBhbnN0YXJ0IHBhbm1vdmVcIiwgZSA9PiBoYW5kbGVyLl9tb3ZlKGUpKTtcblx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cdH1cblxuXHRfZGV0YWNoSGFtbWVyRXZlbnRzKGhhbW1lcikge1xuXHRcdGhhbW1lci5vZmYoXCJoYW1tZXIuaW5wdXQgcGFuc3RhcnQgcGFubW92ZSBwYW5lbmRcIik7XG5cdH1cblxuXHRjb252ZXJ0SW5wdXRUeXBlKGlucHV0VHlwZSA9IFtdKSB7XG5cdFx0bGV0IGhhc1RvdWNoID0gZmFsc2U7XG5cdFx0bGV0IGhhc01vdXNlID0gZmFsc2U7XG5cdFx0Y29uc3QgaW5wdXRzID0gaW5wdXRUeXBlIHx8IFtdO1xuXG5cdFx0aW5wdXRzLmZvckVhY2godiA9PiB7XG5cdFx0XHRzd2l0Y2ggKHYpIHtcblx0XHRcdFx0Y2FzZSBcIm1vdXNlXCIgOiBoYXNNb3VzZSA9IHRydWU7IGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidG91Y2hcIiA6IGhhc1RvdWNoID0gU1VQUE9SVF9UT1VDSDtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBoYXNUb3VjaCAmJiBIYW1tZXIuVG91Y2hJbnB1dCB8fCBoYXNNb3VzZSAmJiBIYW1tZXIuTW91c2VJbnB1dCB8fCBudWxsO1xuXHR9XG5cblx0aW5wdXRDb250cm9sKGlzRW5hYmxlLCBlbGVtZW50KSB7XG5cdFx0Y29uc3Qgb3B0aW9uID0ge1xuXHRcdFx0ZW5hYmxlOiBpc0VuYWJsZVxuXHRcdH07XG5cblx0XHRpZiAoZWxlbWVudCkge1xuXHRcdFx0Y29uc3QgaGFtbWVyID0gdGhpcy5nZXRIYW1tZXIoZWxlbWVudCk7XG5cblx0XHRcdGhhbW1lciAmJiBoYW1tZXIuZ2V0KFwicGFuXCIpLnNldChvcHRpb24pO1xuXHRcdH0gZWxzZSB7IC8vIGZvciBtdWx0aVxuXHRcdFx0Zm9yIChjb25zdCBwIGluIHRoaXMuX2hhbW1lcnMpIHtcblx0XHRcdFx0dGhpcy5faGFtbWVyc1twXS5oYW1tZXIuZ2V0KFwicGFuXCIpLnNldChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0Zm9yIChjb25zdCBwIGluIHRoaXMuX2hhbW1lcnMpIHtcblx0XHRcdHRoaXMuX2hhbW1lcnNbcF0uaGFtbWVyLmRlc3Ryb3koKTtcblx0XHRcdHRoaXMuX2hhbW1lcnNbcF0uZWwucmVtb3ZlQXR0cmlidXRlKFVOSVFVRUtFWSk7XG5cdFx0XHRkZWxldGUgdGhpcy5faGFtbWVyc1twXTtcblx0XHR9XG5cdFx0dGhpcy5faGFtbWVycyA9IHt9O1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGFtbWVyTWFuYWdlci5qcyIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkNvbXBvbmVudFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJlZ1wiXSA9IHJvb3RbXCJlZ1wiXSB8fCB7fSwgcm9vdFtcImVnXCJdW1wiQ29tcG9uZW50XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEEgY2xhc3MgdXNlZCB0byBtYW5hZ2UgZXZlbnRzIGFuZCBvcHRpb25zIGluIGEgY29tcG9uZW50XG4gKiBAY2xhc3NcbiAqIEBncm91cCBlZ2pzXG4gKiBAbmFtZSBlZy5Db21wb25lbnRcbiAqIEBrbyDsu7Ttj6zrhIztirjsnZgg7J2067Kk7Yq47JmAIOyYteyFmOydhCDqtIDrpqztlaAg7IiYIOyeiOqyjCDtlZjripQg7YG0656Y7IqkXG4gKlxuICogQHN1cHBvcnQge1wiaWVcIjogXCI3K1wiLCBcImNoXCIgOiBcImxhdGVzdFwiLCBcImZmXCIgOiBcImxhdGVzdFwiLCAgXCJzZlwiIDogXCJsYXRlc3RcIiwgXCJlZGdlXCIgOiBcImxhdGVzdFwiLCBcImlvc1wiIDogXCI3K1wiLCBcImFuXCIgOiBcIjIuMSsgKGV4Y2VwdCAzLngpXCJ9XG4gKi9cbnZhciBDb21wb25lbnQgPSBleHBvcnRzLkNvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb21wb25lbnQpO1xuXG5cdFx0dGhpcy5fZXZlbnRIYW5kbGVyID0ge307XG5cdFx0dGhpcy5fb3B0aW9ucyA9IHt9O1xuXHR9XG5cdC8qKlxuICAqIFNldHMgb3B0aW9ucyBpbiBhIGNvbXBvbmVudCBvciByZXR1cm5zIHRoZW0uXG4gICogQGtvIOy7tO2PrOuEjO2KuOyXkCDsmLXshZjsnYQg7ISk7KCV7ZWY6rGw64KYIOyYteyFmOydhCDrsJjtmZjtlZzri6RcbiAgKiBAbWV0aG9kIGVnLkNvbXBvbmVudCNvcHRpb25cbiAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG9wdGlvbjxrbz7smLXshZjsnZgg7YKkPC9rbz5cbiAgKiBAcGFyYW0ge09iamVjdH0gW3ZhbHVlXSBUaGUgb3B0aW9uIHZhbHVlIHRoYXQgY29ycmVzcG9uZHMgdG8gYSBnaXZlbiBrZXkgPGtvPu2CpOyXkCDtlbTri7ntlZjripQg7Ji17IWY6rCSPC9rbz5cbiAgKiBAcmV0dXJuIHtlZy5Db21wb25lbnR8T2JqZWN0fSBBbiBpbnN0YW5jZSwgYW4gb3B0aW9uIHZhbHVlLCBvciBhbiBvcHRpb24gb2JqZWN0IG9mIGEgY29tcG9uZW50IGl0c2VsZi48YnI+LSBJZiBib3RoIGtleSBhbmQgdmFsdWUgYXJlIHVzZWQgdG8gc2V0IGFuIG9wdGlvbiwgaXQgcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBpdHNlbGYuPGJyPi0gSWYgb25seSBhIGtleSBpcyBzcGVjaWZpZWQgZm9yIHRoZSBwYXJhbWV0ZXIsIGl0IHJldHVybnMgdGhlIG9wdGlvbiB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIGEgZ2l2ZW4ga2V5Ljxicj4tIElmIG5vdGhpbmcgaXMgc3BlY2lmaWVkLCBpdCByZXR1cm5zIGFuIG9wdGlvbiBvYmplY3QuIDxrbz7su7Ttj6zrhIztirgg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpOuCmCDsmLXshZjqsJIsIOyYteyFmCDqsJ3ssrQuPGJyPi0g7YKk7JmAIOqwkuycvOuhnCDsmLXshZjsnYQg7ISk7KCV7ZWY66m0IOy7tO2PrOuEjO2KuCDsnpDsi6DsnZgg7J247Iqk7YS07Iqk66W8IOuwmO2ZmO2VnOuLpC48YnI+LSDtjIzrnbzrr7jthLDsl5Ag7YKk66eMIOyEpOygle2VmOuptCDtgqTsl5Ag7ZW064u57ZWY64qUIOyYteyFmOqwkuydhCDrsJjtmZjtlZzri6QuPGJyPi0g7YyM652866+47YSw7JeQIOyVhOustOqyg+uPhCDshKTsoJXtlZjsp4Ag7JWK7Jy866m0IOyYteyFmCDqsJ3ssrTrpbwg67CY7ZmY7ZWc64ukLjwva28+XG4gICogQGV4YW1wbGVcbiBcdCBjbGFzcyBTb21lIGV4dGVuZHMgZWcuQ29tcG9uZW50e1xuIFx0XHR9XG4gXHQgY29uc3Qgc29tZSA9IG5ldyBTb21lKHtcbiBcdFx0XCJmb29cIjogMSxcbiBcdFx0XCJiYXJcIjogMlxuIFx0fSk7XG4gXHQgc29tZS5vcHRpb24oXCJmb29cIik7IC8vIHJldHVybiAxXG4gIHNvbWUub3B0aW9uKFwiZm9vXCIsMyk7IC8vIHJldHVybiBzb21lIGluc3RhbmNlXG4gIHNvbWUub3B0aW9uKCk7IC8vIHJldHVybiBvcHRpb25zIG9iamVjdC5cbiAgc29tZS5vcHRpb24oe1xuIFx0XHRcImZvb1wiIDogMTAsXG4gXHRcdFwiYmFyXCIgOiAyMCxcbiBcdFx0XCJiYXpcIiA6IDMwXG4gXHR9KTsgLy8gcmV0dXJuIHNvbWUgaW5zdGFuY2UuXG4gICovXG5cblxuXHRfY3JlYXRlQ2xhc3MoQ29tcG9uZW50LCBbe1xuXHRcdGtleTogXCJvcHRpb25cIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gb3B0aW9uKCkge1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xuXHRcdFx0XHR2YXIgX2tleSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1swXTtcblx0XHRcdFx0dmFyIHZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzFdO1xuXHRcdFx0XHR0aGlzLl9vcHRpb25zW19rZXldID0gdmFsdWU7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIga2V5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzBdO1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX29wdGlvbnNba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX29wdGlvbnM7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBvcHRpb25zID0ga2V5O1xuXHRcdFx0dGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHQvKipcbiAgICogVHJpZ2dlcnMgYSBjdXN0b20gZXZlbnQuXG4gICAqIEBrbyDsu6TsiqTthYAg7J2067Kk7Yq466W8IOuwnOyDneyLnO2CqOuLpFxuICAgKiBAbWV0aG9kIGVnLkNvbXBvbmVudCN0cmlnZ2VyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGN1c3RvbSBldmVudCB0byBiZSB0cmlnZ2VyZWQgPGtvPuuwnOyDne2VoCDsu6TsiqTthYAg7J2067Kk7Yq47J2YIOydtOumhDwva28+XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdXN0b21FdmVudCBFdmVudCBkYXRhIHRvIGJlIHNlbnQgd2hlbiB0cmlnZ2VyaW5nIGEgY3VzdG9tIGV2ZW50IDxrbz7su6TsiqTthYAg7J2067Kk7Yq46rCAIOuwnOyDne2VoCDrlYwg7KCE64us7ZWgIOuNsOydtO2EsDwva28+XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IEluZGljYXRlcyB3aGV0aGVyIHRoZSBldmVudCBoYXMgb2NjdXJyZWQuIElmIHRoZSBzdG9wKCkgbWV0aG9kIGlzIGNhbGxlZCBieSBhIGN1c3RvbSBldmVudCBoYW5kbGVyLCBpdCB3aWxsIHJldHVybiBmYWxzZSBhbmQgcHJldmVudCB0aGUgZXZlbnQgZnJvbSBvY2N1cnJpbmcuIDxrbz7snbTrsqTtirgg67Cc7IOdIOyXrOu2gC4g7Luk7Iqk7YWAIOydtOuypO2KuCDtlbjrk6Trn6zsl5DshJwgc3RvcCgpIOuplOyEnOuTnOulvCDtmLjstpztlZjrqbQgJ2ZhbHNlJ+ulvCDrsJjtmZjtlZjqs6Ag7J2067Kk7Yq4IOuwnOyDneydhCDspJHri6jtlZzri6QuPC9rbz5cbiAgICogQGV4YW1wbGVcbiAgIGNsYXNzIFNvbWUgZXh0ZW5kcyBlZy5Db21wb25lbnR7XG4gIFx0XHRzb21lKCl7XG4gIFx0XHRcdHRoaXMudHJpZ2dlcihcImhpXCIpOy8vIGZpcmUgaGkgZXZlbnQuXG4gIFx0XHR9XG4gIFx0fVxuICAgKi9cblxuXHR9LCB7XG5cdFx0a2V5OiBcInRyaWdnZXJcIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUpIHtcblx0XHRcdHZhciBjdXN0b21FdmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cblx0XHRcdHZhciBoYW5kbGVyTGlzdCA9IHRoaXMuX2V2ZW50SGFuZGxlcltldmVudE5hbWVdIHx8IFtdO1xuXHRcdFx0dmFyIGhhc0hhbmRsZXJMaXN0ID0gaGFuZGxlckxpc3QubGVuZ3RoID4gMDtcblxuXHRcdFx0aWYgKCFoYXNIYW5kbGVyTGlzdCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgZGV0YWNoIG1ldGhvZCBjYWxsIGluIGhhbmRsZXIgaW4gZmlyc3QgdGltZSB0aGVuIGhhbmRlbGVyIGxpc3QgY2FsbHMuXG5cdFx0XHRoYW5kbGVyTGlzdCA9IGhhbmRsZXJMaXN0LmNvbmNhdCgpO1xuXG5cdFx0XHRjdXN0b21FdmVudC5ldmVudFR5cGUgPSBldmVudE5hbWU7XG5cblx0XHRcdHZhciBpc0NhbmNlbGVkID0gZmFsc2U7XG5cdFx0XHR2YXIgYXJnID0gW2N1c3RvbUV2ZW50XTtcblx0XHRcdHZhciBpID0gdm9pZCAwO1xuXG5cdFx0XHRjdXN0b21FdmVudC5zdG9wID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gaXNDYW5jZWxlZCA9IHRydWU7XG5cdFx0XHR9O1xuXG5cdFx0XHRmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcmVzdFBhcmFtID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjsgX2tleTIrKykge1xuXHRcdFx0XHRyZXN0UGFyYW1bX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyZXN0UGFyYW0ubGVuZ3RoID49IDEpIHtcblx0XHRcdFx0YXJnID0gYXJnLmNvbmNhdChyZXN0UGFyYW0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGkgaW4gaGFuZGxlckxpc3QpIHtcblx0XHRcdFx0aGFuZGxlckxpc3RbaV0uYXBwbHkodGhpcywgYXJnKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICFpc0NhbmNlbGVkO1xuXHRcdH1cblx0XHQvKipcbiAgICogRXhlY3V0ZWQgZXZlbnQganVzdCBvbmUgdGltZS5cbiAgICogQGtvIOydtOuypO2KuOqwgCDtlZzrsojrp4wg7Iuk7ZaJ65Cc64ukLlxuICAgKiBAbWV0aG9kIGVnLkNvbXBvbmVudCNvbmNlXG4gICAqIEBwYXJhbSB7ZXZlbnROYW1lfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIGF0dGFjaGVkIDxrbz7rk7HroZ3tlaAg7J2067Kk7Yq47J2YIOydtOumhDwva28+XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJUb0F0dGFjaCBUaGUgaGFuZGxlciBmdW5jdGlvbiBvZiB0aGUgZXZlbnQgdG8gYmUgYXR0YWNoZWQgPGtvPuuTseuhne2VoCDsnbTrsqTtirjsnZgg7ZW465Ok65+sIO2VqOyImDwva28+XG4gICAqIEByZXR1cm4ge2VnLkNvbXBvbmVudH0gQW4gaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgaXRzZWxmPGtvPuy7tO2PrOuEjO2KuCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cbiAgICogQGV4YW1wbGVcbiAgIGNsYXNzIFNvbWUgZXh0ZW5kcyBlZy5Db21wb25lbnR7XG4gIFx0XHRoaSgpe1xuICBcdFx0XHRhbGVydChcImhpXCIpO1xuICBcdFx0fVxuICBcdFx0dGhpbmcoKXtcbiAgXHRcdFx0dGhpcy5vbmNlKFwiaGlcIiwgdGhpcy5oaSk7XG4gIFx0XHR9XG4gIFx0fVxuICBcdCB2YXIgc29tZSA9IG5ldyBTb21lKCk7XG4gICBzb21lLnRoaW5nKCk7XG4gICBzb21lLnRyaWdnZXIoXCJoaVwiKTtcbiAgIC8vIGZpcmUgYWxlcnQoXCJoaVwiKTtcbiAgIHNvbWUudHJpZ2dlcihcImhpXCIpO1xuICAgLy8gTm90aGluZyBoYXBwZW5zXG4gICAqL1xuXG5cdH0sIHtcblx0XHRrZXk6IFwib25jZVwiLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvbmNlKGV2ZW50TmFtZSwgaGFuZGxlclRvQXR0YWNoKSB7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0XHRpZiAoKHR5cGVvZiBldmVudE5hbWUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihldmVudE5hbWUpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgaGFuZGxlclRvQXR0YWNoID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBldmVudEhhc2ggPSBldmVudE5hbWU7XG5cdFx0XHRcdHZhciBpID0gdm9pZCAwO1xuXHRcdFx0XHRmb3IgKGkgaW4gZXZlbnRIYXNoKSB7XG5cdFx0XHRcdFx0dGhpcy5vbmNlKGksIGV2ZW50SGFzaFtpXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBldmVudE5hbWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGhhbmRsZXJUb0F0dGFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIHNlbGYgPSBfdGhpcztcblx0XHRcdFx0XHRfdGhpcy5vbihldmVudE5hbWUsIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmcgPSBBcnJheShfbGVuMiksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMjsgX2tleTMrKykge1xuXHRcdFx0XHRcdFx0XHRhcmdbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aGFuZGxlclRvQXR0YWNoLmFwcGx5KHNlbGYsIGFyZyk7XG5cdFx0XHRcdFx0XHRzZWxmLm9mZihldmVudE5hbWUsIGxpc3RlbmVyKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSkoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0LyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIGFuIGV2ZW50IGhhcyBiZWVuIGF0dGFjaGVkIHRvIGEgY29tcG9uZW50LlxuICAgKiBAa28g7Lu07Y+s64SM7Yq47JeQIOydtOuypO2KuOqwgCDrk7HroZ3rkJDripTsp4Ag7ZmV7J247ZWc64ukLlxuICAgKiBAbWV0aG9kIGVnLkNvbXBvbmVudCNoYXNPblxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBiZSBhdHRhY2hlZCA8a28+65Ox66GdIOyXrOu2gOulvCDtmZXsnbjtlaAg7J2067Kk7Yq47J2YIOydtOumhDwva28+XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IEluZGljYXRlcyB3aGV0aGVyIHRoZSBldmVudCBpcyBhdHRhY2hlZC4gPGtvPuydtOuypO2KuCDrk7HroZ0g7Jes67aAPC9rbz5cbiAgICogQGV4YW1wbGVcbiAgIGNsYXNzIFNvbWUgZXh0ZW5kcyBlZy5Db21wb25lbnR7XG4gIFx0XHRzb21lKCl7XG4gIFx0XHRcdHRoaXMuaGFzT24oXCJoaVwiKTsvLyBjaGVjayBoaSBldmVudC5cbiAgXHRcdH1cbiAgXHR9XG4gICAqL1xuXG5cdH0sIHtcblx0XHRrZXk6IFwiaGFzT25cIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFzT24oZXZlbnROYW1lKSB7XG5cdFx0XHRyZXR1cm4gISF0aGlzLl9ldmVudEhhbmRsZXJbZXZlbnROYW1lXTtcblx0XHR9XG5cblx0XHQvKipcbiAgICogQXR0YWNoZXMgYW4gZXZlbnQgdG8gYSBjb21wb25lbnQuXG4gICAqIEBrbyDsu7Ttj6zrhIztirjsl5Ag7J2067Kk7Yq466W8IOuTseuhne2VnOuLpC5cbiAgICogQG1ldGhvZCBlZy5Db21wb25lbnQjb25cbiAgICogQHBhcmFtIHtldmVudE5hbWV9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYmUgYXR0YWNoZWQgPGtvPuuTseuhne2VoCDsnbTrsqTtirjsnZgg7J2066aEPC9rbz5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclRvQXR0YWNoIFRoZSBoYW5kbGVyIGZ1bmN0aW9uIG9mIHRoZSBldmVudCB0byBiZSBhdHRhY2hlZCA8a28+65Ox66Gd7ZWgIOydtOuypO2KuOydmCDtlbjrk6Trn6wg7ZWo7IiYPC9rbz5cbiAgICogQHJldHVybiB7ZWcuQ29tcG9uZW50fSBBbiBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBpdHNlbGY8a28+7Lu07Y+s64SM7Yq4IOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuICAgKiBAZXhhbXBsZVxuICAgY2xhc3MgU29tZSBleHRlbmRzIGVnLkNvbXBvbmVudHtcbiAgIFx0XHRoaSgpe1xuICBcdFx0XHRjb25zb2xlLmxvZyhcImhpXCIpO1xuICAgXHRcdH1cbiAgXHRcdHNvbWUoKXtcbiAgXHRcdFx0dGhpcy5vbihcImhpXCIsdGhpcy5oaSk7IC8vYXR0YWNoIGV2ZW50XG4gIFx0XHR9XG4gIFx0fVxuICAgKi9cblxuXHR9LCB7XG5cdFx0a2V5OiBcIm9uXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50TmFtZSwgaGFuZGxlclRvQXR0YWNoKSB7XG5cdFx0XHRpZiAoKHR5cGVvZiBldmVudE5hbWUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihldmVudE5hbWUpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgaGFuZGxlclRvQXR0YWNoID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHZhciBldmVudEhhc2ggPSBldmVudE5hbWU7XG5cdFx0XHRcdHZhciBuYW1lID0gdm9pZCAwO1xuXHRcdFx0XHRmb3IgKG5hbWUgaW4gZXZlbnRIYXNoKSB7XG5cdFx0XHRcdFx0dGhpcy5vbihuYW1lLCBldmVudEhhc2hbbmFtZV0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgZXZlbnROYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBoYW5kbGVyVG9BdHRhY2ggPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHR2YXIgaGFuZGxlckxpc3QgPSB0aGlzLl9ldmVudEhhbmRsZXJbZXZlbnROYW1lXTtcblxuXHRcdFx0XHRpZiAodHlwZW9mIGhhbmRsZXJMaXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0aGFuZGxlckxpc3QgPSB0aGlzLl9ldmVudEhhbmRsZXJbZXZlbnROYW1lXSA9IFtdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aGFuZGxlckxpc3QucHVzaChoYW5kbGVyVG9BdHRhY2gpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0LyoqXG4gICAqIERldGFjaGVzIGFuIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudC5cbiAgICogQGtvIOy7tO2PrOuEjO2KuOyXkCDrk7HroZ3rkJwg7J2067Kk7Yq466W8IO2VtOygnO2VnOuLpFxuICAgKiBAbWV0aG9kIGVnLkNvbXBvbmVudCNvZmZcbiAgICogQHBhcmFtIHtldmVudE5hbWV9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYmUgZGV0YWNoZWQgPGtvPu2VtOygnO2VoCDsnbTrsqTtirjsnZgg7J2066aEPC9rbz5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclRvRGV0YWNoIFRoZSBoYW5kbGVyIGZ1bmN0aW9uIG9mIHRoZSBldmVudCB0byBiZSBkZXRhY2hlZCA8a28+7ZW07KCc7ZWgIOydtOuypO2KuOydmCDtlbjrk6Trn6wg7ZWo7IiYPC9rbz5cbiAgICogQHJldHVybiB7ZWcuQ29tcG9uZW50fSBBbiBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBpdHNlbGYgPGtvPuy7tO2PrOuEjO2KuCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cbiAgICogQGV4YW1wbGVcbiAgIGNsYXNzIFNvbWUgZXh0ZW5kcyBlZy5Db21wb25lbnR7XG4gICBcdFx0aGkoKXtcbiAgXHRcdFx0Y29uc29sZS5sb2coXCJoaVwiKTtcbiAgIFx0XHR9XG4gIFx0XHRzb21lKCl7XG4gIFx0XHRcdHRoaXMub2ZmKFwiaGlcIix0aGlzLmhpKTsgLy9kZXRhY2ggZXZlbnRcbiAgXHRcdH1cbiAgXHR9XG4gICAqL1xuXG5cdH0sIHtcblx0XHRrZXk6IFwib2ZmXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9mZihldmVudE5hbWUsIGhhbmRsZXJUb0RldGFjaCkge1xuXHRcdFx0Ly8gQWxsIGV2ZW50IGRldGFjaC5cblx0XHRcdGlmICh0eXBlb2YgZXZlbnROYW1lID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHRoaXMuX2V2ZW50SGFuZGxlciA9IHt9O1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWxsIGhhbmRsZXIgb2Ygc3BlY2lmaWMgZXZlbnQgZGV0YWNoLlxuXHRcdFx0aWYgKHR5cGVvZiBoYW5kbGVyVG9EZXRhY2ggPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBldmVudE5hbWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHR0aGlzLl9ldmVudEhhbmRsZXJbZXZlbnROYW1lXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgZXZlbnRIYXNoID0gZXZlbnROYW1lO1xuXHRcdFx0XHRcdHZhciBuYW1lID0gdm9pZCAwO1xuXHRcdFx0XHRcdGZvciAobmFtZSBpbiBldmVudEhhc2gpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50SGFzaFtuYW1lXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRoZSBoYW5kbGVyIG9mIHNwZWNpZmljIGV2ZW50IGRldGFjaC5cblx0XHRcdHZhciBoYW5kbGVyTGlzdCA9IHRoaXMuX2V2ZW50SGFuZGxlcltldmVudE5hbWVdO1xuXHRcdFx0aWYgKGhhbmRsZXJMaXN0KSB7XG5cdFx0XHRcdHZhciBrID0gdm9pZCAwO1xuXHRcdFx0XHR2YXIgaGFuZGxlckZ1bmN0aW9uID0gdm9pZCAwO1xuXHRcdFx0XHRmb3IgKGsgPSAwLCBoYW5kbGVyRnVuY3Rpb247IGhhbmRsZXJGdW5jdGlvbiA9IGhhbmRsZXJMaXN0W2tdOyBrKyspIHtcblx0XHRcdFx0XHRpZiAoaGFuZGxlckZ1bmN0aW9uID09PSBoYW5kbGVyVG9EZXRhY2gpIHtcblx0XHRcdFx0XHRcdGhhbmRsZXJMaXN0ID0gaGFuZGxlckxpc3Quc3BsaWNlKGssIDEpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0fV0pO1xuXG5cdHJldHVybiBDb21wb25lbnQ7XG59KCk7XG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgX2NvbXBvbmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbXBvbmVudC5Db21wb25lbnQ7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9AZWdqcy9jb21wb25lbnQvZGlzdC9jb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiEgSGFtbWVyLkpTIC0gdjIuMC43IC0gMjAxNi0wNC0yMlxuICogaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgSm9yaWsgVGFuZ2VsZGVyO1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlICovXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgZXhwb3J0TmFtZSwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxudmFyIFZFTkRPUl9QUkVGSVhFUyA9IFsnJywgJ3dlYmtpdCcsICdNb3onLCAnTVMnLCAnbXMnLCAnbyddO1xudmFyIFRFU1RfRUxFTUVOVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG52YXIgVFlQRV9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG5cbnZhciByb3VuZCA9IE1hdGgucm91bmQ7XG52YXIgYWJzID0gTWF0aC5hYnM7XG52YXIgbm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogc2V0IGEgdGltZW91dCB3aXRoIGEgZ2l2ZW4gc2NvcGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZW91dFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHNldFRpbWVvdXRDb250ZXh0KGZuLCB0aW1lb3V0LCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoYmluZEZuKGZuLCBjb250ZXh0KSwgdGltZW91dCk7XG59XG5cbi8qKlxuICogaWYgdGhlIGFyZ3VtZW50IGlzIGFuIGFycmF5LCB3ZSB3YW50IHRvIGV4ZWN1dGUgdGhlIGZuIG9uIGVhY2ggZW50cnlcbiAqIGlmIGl0IGFpbnQgYW4gYXJyYXkgd2UgZG9uJ3Qgd2FudCB0byBkbyBhIHRoaW5nLlxuICogdGhpcyBpcyB1c2VkIGJ5IGFsbCB0aGUgbWV0aG9kcyB0aGF0IGFjY2VwdCBhIHNpbmdsZSBhbmQgYXJyYXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp8QXJyYXl9IGFyZ1xuICogQHBhcmFtIHtTdHJpbmd9IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHRdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaW52b2tlQXJyYXlBcmcoYXJnLCBmbiwgY29udGV4dCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgZWFjaChhcmcsIGNvbnRleHRbZm5dLCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiB3YWxrIG9iamVjdHMgYW5kIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKi9cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIHZhciBpO1xuXG4gICAgaWYgKCFvYmopIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChvYmouZm9yRWFjaCkge1xuICAgICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgb2JqLmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoaSkgJiYgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogd3JhcCBhIG1ldGhvZCB3aXRoIGEgZGVwcmVjYXRpb24gd2FybmluZyBhbmQgc3RhY2sgdHJhY2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHdyYXBwaW5nIHRoZSBzdXBwbGllZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGRlcHJlY2F0ZShtZXRob2QsIG5hbWUsIG1lc3NhZ2UpIHtcbiAgICB2YXIgZGVwcmVjYXRpb25NZXNzYWdlID0gJ0RFUFJFQ0FURUQgTUVUSE9EOiAnICsgbmFtZSArICdcXG4nICsgbWVzc2FnZSArICcgQVQgXFxuJztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlID0gbmV3IEVycm9yKCdnZXQtc3RhY2stdHJhY2UnKTtcbiAgICAgICAgdmFyIHN0YWNrID0gZSAmJiBlLnN0YWNrID8gZS5zdGFjay5yZXBsYWNlKC9eW15cXChdKz9bXFxuJF0vZ20sICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMrYXRcXHMrL2dtLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eT2JqZWN0Ljxhbm9ueW1vdXM+XFxzKlxcKC9nbSwgJ3thbm9ueW1vdXN9KClAJykgOiAnVW5rbm93biBTdGFjayBUcmFjZSc7XG5cbiAgICAgICAgdmFyIGxvZyA9IHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS53YXJuIHx8IHdpbmRvdy5jb25zb2xlLmxvZyk7XG4gICAgICAgIGlmIChsb2cpIHtcbiAgICAgICAgICAgIGxvZy5jYWxsKHdpbmRvdy5jb25zb2xlLCBkZXByZWNhdGlvbk1lc3NhZ2UsIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBleHRlbmQgb2JqZWN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIGluIGRlc3Qgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSB0aGUgb25lcyBpbiBzcmMuXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gey4uLk9iamVjdH0gb2JqZWN0c190b19hc3NpZ25cbiAqIEByZXR1cm5zIHtPYmplY3R9IHRhcmdldFxuICovXG52YXIgYXNzaWduO1xuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG59IGVsc2Uge1xuICAgIGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG59XG5cbi8qKlxuICogZXh0ZW5kIG9iamVjdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyBpbiBkZXN0IHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgdGhlIG9uZXMgaW4gc3JjLlxuICogQHBhcmFtIHtPYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW21lcmdlPWZhbHNlXVxuICogQHJldHVybnMge09iamVjdH0gZGVzdFxuICovXG52YXIgZXh0ZW5kID0gZGVwcmVjYXRlKGZ1bmN0aW9uIGV4dGVuZChkZXN0LCBzcmMsIG1lcmdlKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzcmMpO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGtleXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICghbWVyZ2UgfHwgKG1lcmdlICYmIGRlc3Rba2V5c1tpXV0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIGRlc3Rba2V5c1tpXV0gPSBzcmNba2V5c1tpXV07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gZGVzdDtcbn0sICdleHRlbmQnLCAnVXNlIGBhc3NpZ25gLicpO1xuXG4vKipcbiAqIG1lcmdlIHRoZSB2YWx1ZXMgZnJvbSBzcmMgaW4gdGhlIGRlc3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgdGhhdCBleGlzdCBpbiBkZXN0IHdpbGwgbm90IGJlIG92ZXJ3cml0dGVuIGJ5IHNyY1xuICogQHBhcmFtIHtPYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAqIEByZXR1cm5zIHtPYmplY3R9IGRlc3RcbiAqL1xudmFyIG1lcmdlID0gZGVwcmVjYXRlKGZ1bmN0aW9uIG1lcmdlKGRlc3QsIHNyYykge1xuICAgIHJldHVybiBleHRlbmQoZGVzdCwgc3JjLCB0cnVlKTtcbn0sICdtZXJnZScsICdVc2UgYGFzc2lnbmAuJyk7XG5cbi8qKlxuICogc2ltcGxlIGNsYXNzIGluaGVyaXRhbmNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGlsZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gYmFzZVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzXVxuICovXG5mdW5jdGlvbiBpbmhlcml0KGNoaWxkLCBiYXNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIGJhc2VQID0gYmFzZS5wcm90b3R5cGUsXG4gICAgICAgIGNoaWxkUDtcblxuICAgIGNoaWxkUCA9IGNoaWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoYmFzZVApO1xuICAgIGNoaWxkUC5jb25zdHJ1Y3RvciA9IGNoaWxkO1xuICAgIGNoaWxkUC5fc3VwZXIgPSBiYXNlUDtcblxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGFzc2lnbihjaGlsZFAsIHByb3BlcnRpZXMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBzaW1wbGUgZnVuY3Rpb24gYmluZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGJpbmRGbihmbiwgY29udGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBib3VuZEZuKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIGxldCBhIGJvb2xlYW4gdmFsdWUgYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgbXVzdCByZXR1cm4gYSBib29sZWFuXG4gKiB0aGlzIGZpcnN0IGl0ZW0gaW4gYXJncyB3aWxsIGJlIHVzZWQgYXMgdGhlIGNvbnRleHRcbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gdmFsXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJnc11cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBib29sT3JGbih2YWwsIGFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PSBUWVBFX0ZVTkNUSU9OKSB7XG4gICAgICAgIHJldHVybiB2YWwuYXBwbHkoYXJncyA/IGFyZ3NbMF0gfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbn1cblxuLyoqXG4gKiB1c2UgdGhlIHZhbDIgd2hlbiB2YWwxIGlzIHVuZGVmaW5lZFxuICogQHBhcmFtIHsqfSB2YWwxXG4gKiBAcGFyYW0geyp9IHZhbDJcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBpZlVuZGVmaW5lZCh2YWwxLCB2YWwyKSB7XG4gICAgcmV0dXJuICh2YWwxID09PSB1bmRlZmluZWQpID8gdmFsMiA6IHZhbDE7XG59XG5cbi8qKlxuICogYWRkRXZlbnRMaXN0ZW5lciB3aXRoIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICovXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycyh0YXJnZXQsIHR5cGVzLCBoYW5kbGVyKSB7XG4gICAgZWFjaChzcGxpdFN0cih0eXBlcyksIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIHJlbW92ZUV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIGVhY2goc3BsaXRTdHIodHlwZXMpLCBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBmaW5kIGlmIGEgbm9kZSBpcyBpbiB0aGUgZ2l2ZW4gcGFyZW50XG4gKiBAbWV0aG9kIGhhc1BhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBoYXNQYXJlbnQobm9kZSwgcGFyZW50KSB7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogc21hbGwgaW5kZXhPZiB3cmFwcGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmluZFxuICogQHJldHVybnMge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGluU3RyKHN0ciwgZmluZCkge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihmaW5kKSA+IC0xO1xufVxuXG4vKipcbiAqIHNwbGl0IHN0cmluZyBvbiB3aGl0ZXNwYWNlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7QXJyYXl9IHdvcmRzXG4gKi9cbmZ1bmN0aW9uIHNwbGl0U3RyKHN0cikge1xuICAgIHJldHVybiBzdHIudHJpbSgpLnNwbGl0KC9cXHMrL2cpO1xufVxuXG4vKipcbiAqIGZpbmQgaWYgYSBhcnJheSBjb250YWlucyB0aGUgb2JqZWN0IHVzaW5nIGluZGV4T2Ygb3IgYSBzaW1wbGUgcG9seUZpbGxcbiAqIEBwYXJhbSB7QXJyYXl9IHNyY1xuICogQHBhcmFtIHtTdHJpbmd9IGZpbmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZmluZEJ5S2V5XVxuICogQHJldHVybiB7Qm9vbGVhbnxOdW1iZXJ9IGZhbHNlIHdoZW4gbm90IGZvdW5kLCBvciB0aGUgaW5kZXhcbiAqL1xuZnVuY3Rpb24gaW5BcnJheShzcmMsIGZpbmQsIGZpbmRCeUtleSkge1xuICAgIGlmIChzcmMuaW5kZXhPZiAmJiAhZmluZEJ5S2V5KSB7XG4gICAgICAgIHJldHVybiBzcmMuaW5kZXhPZihmaW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgc3JjLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKChmaW5kQnlLZXkgJiYgc3JjW2ldW2ZpbmRCeUtleV0gPT0gZmluZCkgfHwgKCFmaW5kQnlLZXkgJiYgc3JjW2ldID09PSBmaW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG59XG5cbi8qKlxuICogY29udmVydCBhcnJheS1saWtlIG9iamVjdHMgdG8gcmVhbCBhcnJheXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheShvYmopIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqLCAwKTtcbn1cblxuLyoqXG4gKiB1bmlxdWUgYXJyYXkgd2l0aCBvYmplY3RzIGJhc2VkIG9uIGEga2V5IChsaWtlICdpZCcpIG9yIGp1c3QgYnkgdGhlIGFycmF5J3MgdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IHNyYyBbe2lkOjF9LHtpZDoyfSx7aWQ6MX1dXG4gKiBAcGFyYW0ge1N0cmluZ30gW2tleV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NvcnQ9RmFsc2VdXG4gKiBAcmV0dXJucyB7QXJyYXl9IFt7aWQ6MX0se2lkOjJ9XVxuICovXG5mdW5jdGlvbiB1bmlxdWVBcnJheShzcmMsIGtleSwgc29ydCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHZhciBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgc3JjLmxlbmd0aCkge1xuICAgICAgICB2YXIgdmFsID0ga2V5ID8gc3JjW2ldW2tleV0gOiBzcmNbaV07XG4gICAgICAgIGlmIChpbkFycmF5KHZhbHVlcywgdmFsKSA8IDApIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChzcmNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlc1tpXSA9IHZhbDtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmIChzb3J0KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5zb3J0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5zb3J0KGZ1bmN0aW9uIHNvcnRVbmlxdWVBcnJheShhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFba2V5XSA+IGJba2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8qKlxuICogZ2V0IHRoZSBwcmVmaXhlZCBwcm9wZXJ0eVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcmV0dXJucyB7U3RyaW5nfFVuZGVmaW5lZH0gcHJlZml4ZWRcbiAqL1xuZnVuY3Rpb24gcHJlZml4ZWQob2JqLCBwcm9wZXJ0eSkge1xuICAgIHZhciBwcmVmaXgsIHByb3A7XG4gICAgdmFyIGNhbWVsUHJvcCA9IHByb3BlcnR5WzBdLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKTtcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IFZFTkRPUl9QUkVGSVhFUy5sZW5ndGgpIHtcbiAgICAgICAgcHJlZml4ID0gVkVORE9SX1BSRUZJWEVTW2ldO1xuICAgICAgICBwcm9wID0gKHByZWZpeCkgPyBwcmVmaXggKyBjYW1lbFByb3AgOiBwcm9wZXJ0eTtcblxuICAgICAgICBpZiAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBnZXQgYSB1bmlxdWUgaWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHVuaXF1ZUlkXG4gKi9cbnZhciBfdW5pcXVlSWQgPSAxO1xuZnVuY3Rpb24gdW5pcXVlSWQoKSB7XG4gICAgcmV0dXJuIF91bmlxdWVJZCsrO1xufVxuXG4vKipcbiAqIGdldCB0aGUgd2luZG93IG9iamVjdCBvZiBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RG9jdW1lbnRWaWV3fFdpbmRvd31cbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93Rm9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgdmFyIGRvYyA9IGVsZW1lbnQub3duZXJEb2N1bWVudCB8fCBlbGVtZW50O1xuICAgIHJldHVybiAoZG9jLmRlZmF1bHRWaWV3IHx8IGRvYy5wYXJlbnRXaW5kb3cgfHwgd2luZG93KTtcbn1cblxudmFyIE1PQklMRV9SRUdFWCA9IC9tb2JpbGV8dGFibGV0fGlwKGFkfGhvbmV8b2QpfGFuZHJvaWQvaTtcblxudmFyIFNVUFBPUlRfVE9VQ0ggPSAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KTtcbnZhciBTVVBQT1JUX1BPSU5URVJfRVZFTlRTID0gcHJlZml4ZWQod2luZG93LCAnUG9pbnRlckV2ZW50JykgIT09IHVuZGVmaW5lZDtcbnZhciBTVVBQT1JUX09OTFlfVE9VQ0ggPSBTVVBQT1JUX1RPVUNIICYmIE1PQklMRV9SRUdFWC50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG52YXIgSU5QVVRfVFlQRV9UT1VDSCA9ICd0b3VjaCc7XG52YXIgSU5QVVRfVFlQRV9QRU4gPSAncGVuJztcbnZhciBJTlBVVF9UWVBFX01PVVNFID0gJ21vdXNlJztcbnZhciBJTlBVVF9UWVBFX0tJTkVDVCA9ICdraW5lY3QnO1xuXG52YXIgQ09NUFVURV9JTlRFUlZBTCA9IDI1O1xuXG52YXIgSU5QVVRfU1RBUlQgPSAxO1xudmFyIElOUFVUX01PVkUgPSAyO1xudmFyIElOUFVUX0VORCA9IDQ7XG52YXIgSU5QVVRfQ0FOQ0VMID0gODtcblxudmFyIERJUkVDVElPTl9OT05FID0gMTtcbnZhciBESVJFQ1RJT05fTEVGVCA9IDI7XG52YXIgRElSRUNUSU9OX1JJR0hUID0gNDtcbnZhciBESVJFQ1RJT05fVVAgPSA4O1xudmFyIERJUkVDVElPTl9ET1dOID0gMTY7XG5cbnZhciBESVJFQ1RJT05fSE9SSVpPTlRBTCA9IERJUkVDVElPTl9MRUZUIHwgRElSRUNUSU9OX1JJR0hUO1xudmFyIERJUkVDVElPTl9WRVJUSUNBTCA9IERJUkVDVElPTl9VUCB8IERJUkVDVElPTl9ET1dOO1xudmFyIERJUkVDVElPTl9BTEwgPSBESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTDtcblxudmFyIFBST1BTX1hZID0gWyd4JywgJ3knXTtcbnZhciBQUk9QU19DTElFTlRfWFkgPSBbJ2NsaWVudFgnLCAnY2xpZW50WSddO1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSW5wdXQobWFuYWdlciwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5lbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIHRoaXMudGFyZ2V0ID0gbWFuYWdlci5vcHRpb25zLmlucHV0VGFyZ2V0O1xuXG4gICAgLy8gc21hbGxlciB3cmFwcGVyIGFyb3VuZCB0aGUgaGFuZGxlciwgZm9yIHRoZSBzY29wZSBhbmQgdGhlIGVuYWJsZWQgc3RhdGUgb2YgdGhlIG1hbmFnZXIsXG4gICAgLy8gc28gd2hlbiBkaXNhYmxlZCB0aGUgaW5wdXQgZXZlbnRzIGFyZSBjb21wbGV0ZWx5IGJ5cGFzc2VkLlxuICAgIHRoaXMuZG9tSGFuZGxlciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGlmIChib29sT3JGbihtYW5hZ2VyLm9wdGlvbnMuZW5hYmxlLCBbbWFuYWdlcl0pKSB7XG4gICAgICAgICAgICBzZWxmLmhhbmRsZXIoZXYpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG59XG5cbklucHV0LnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzaG91bGQgaGFuZGxlIHRoZSBpbnB1dEV2ZW50IGRhdGEgYW5kIHRyaWdnZXIgdGhlIGNhbGxiYWNrXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHsgfSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV2RWwgJiYgYWRkRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiYgYWRkRXZlbnRMaXN0ZW5lcnModGhpcy50YXJnZXQsIHRoaXMuZXZUYXJnZXQsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZXaW4gJiYgYWRkRXZlbnRMaXN0ZW5lcnMoZ2V0V2luZG93Rm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpLCB0aGlzLmV2V2luLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV2RWwgJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy50YXJnZXQsIHRoaXMuZXZUYXJnZXQsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZXaW4gJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoZ2V0V2luZG93Rm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpLCB0aGlzLmV2V2luLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogY3JlYXRlIG5ldyBpbnB1dCB0eXBlIG1hbmFnZXJcbiAqIGNhbGxlZCBieSB0aGUgTWFuYWdlciBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtIYW1tZXJ9IG1hbmFnZXJcbiAqIEByZXR1cm5zIHtJbnB1dH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRJbnN0YW5jZShtYW5hZ2VyKSB7XG4gICAgdmFyIFR5cGU7XG4gICAgdmFyIGlucHV0Q2xhc3MgPSBtYW5hZ2VyLm9wdGlvbnMuaW5wdXRDbGFzcztcblxuICAgIGlmIChpbnB1dENsYXNzKSB7XG4gICAgICAgIFR5cGUgPSBpbnB1dENsYXNzO1xuICAgIH0gZWxzZSBpZiAoU1VQUE9SVF9QT0lOVEVSX0VWRU5UUykge1xuICAgICAgICBUeXBlID0gUG9pbnRlckV2ZW50SW5wdXQ7XG4gICAgfSBlbHNlIGlmIChTVVBQT1JUX09OTFlfVE9VQ0gpIHtcbiAgICAgICAgVHlwZSA9IFRvdWNoSW5wdXQ7XG4gICAgfSBlbHNlIGlmICghU1VQUE9SVF9UT1VDSCkge1xuICAgICAgICBUeXBlID0gTW91c2VJbnB1dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBUeXBlID0gVG91Y2hNb3VzZUlucHV0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IChUeXBlKShtYW5hZ2VyLCBpbnB1dEhhbmRsZXIpO1xufVxuXG4vKipcbiAqIGhhbmRsZSBpbnB1dCBldmVudHNcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGlucHV0SGFuZGxlcihtYW5hZ2VyLCBldmVudFR5cGUsIGlucHV0KSB7XG4gICAgdmFyIHBvaW50ZXJzTGVuID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoO1xuICAgIHZhciBjaGFuZ2VkUG9pbnRlcnNMZW4gPSBpbnB1dC5jaGFuZ2VkUG9pbnRlcnMubGVuZ3RoO1xuICAgIHZhciBpc0ZpcnN0ID0gKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIChwb2ludGVyc0xlbiAtIGNoYW5nZWRQb2ludGVyc0xlbiA9PT0gMCkpO1xuICAgIHZhciBpc0ZpbmFsID0gKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmIChwb2ludGVyc0xlbiAtIGNoYW5nZWRQb2ludGVyc0xlbiA9PT0gMCkpO1xuXG4gICAgaW5wdXQuaXNGaXJzdCA9ICEhaXNGaXJzdDtcbiAgICBpbnB1dC5pc0ZpbmFsID0gISFpc0ZpbmFsO1xuXG4gICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgbWFuYWdlci5zZXNzaW9uID0ge307XG4gICAgfVxuXG4gICAgLy8gc291cmNlIGV2ZW50IGlzIHRoZSBub3JtYWxpemVkIHZhbHVlIG9mIHRoZSBkb21FdmVudHNcbiAgICAvLyBsaWtlICd0b3VjaHN0YXJ0LCBtb3VzZXVwLCBwb2ludGVyZG93bidcbiAgICBpbnB1dC5ldmVudFR5cGUgPSBldmVudFR5cGU7XG5cbiAgICAvLyBjb21wdXRlIHNjYWxlLCByb3RhdGlvbiBldGNcbiAgICBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KTtcblxuICAgIC8vIGVtaXQgc2VjcmV0IGV2ZW50XG4gICAgbWFuYWdlci5lbWl0KCdoYW1tZXIuaW5wdXQnLCBpbnB1dCk7XG5cbiAgICBtYW5hZ2VyLnJlY29nbml6ZShpbnB1dCk7XG4gICAgbWFuYWdlci5zZXNzaW9uLnByZXZJbnB1dCA9IGlucHV0O1xufVxuXG4vKipcbiAqIGV4dGVuZCB0aGUgZGF0YSB3aXRoIHNvbWUgdXNhYmxlIHByb3BlcnRpZXMgbGlrZSBzY2FsZSwgcm90YXRlLCB2ZWxvY2l0eSBldGNcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYW5hZ2VyXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUlucHV0RGF0YShtYW5hZ2VyLCBpbnB1dCkge1xuICAgIHZhciBzZXNzaW9uID0gbWFuYWdlci5zZXNzaW9uO1xuICAgIHZhciBwb2ludGVycyA9IGlucHV0LnBvaW50ZXJzO1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIHN0b3JlIHRoZSBmaXJzdCBpbnB1dCB0byBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGFuZCBkaXJlY3Rpb25cbiAgICBpZiAoIXNlc3Npb24uZmlyc3RJbnB1dCkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0SW5wdXQgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG4gICAgfVxuXG4gICAgLy8gdG8gY29tcHV0ZSBzY2FsZSBhbmQgcm90YXRpb24gd2UgbmVlZCB0byBzdG9yZSB0aGUgbXVsdGlwbGUgdG91Y2hlc1xuICAgIGlmIChwb2ludGVyc0xlbmd0aCA+IDEgJiYgIXNlc3Npb24uZmlyc3RNdWx0aXBsZSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG4gICAgfSBlbHNlIGlmIChwb2ludGVyc0xlbmd0aCA9PT0gMSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZmlyc3RJbnB1dCA9IHNlc3Npb24uZmlyc3RJbnB1dDtcbiAgICB2YXIgZmlyc3RNdWx0aXBsZSA9IHNlc3Npb24uZmlyc3RNdWx0aXBsZTtcbiAgICB2YXIgb2Zmc2V0Q2VudGVyID0gZmlyc3RNdWx0aXBsZSA/IGZpcnN0TXVsdGlwbGUuY2VudGVyIDogZmlyc3RJbnB1dC5jZW50ZXI7XG5cbiAgICB2YXIgY2VudGVyID0gaW5wdXQuY2VudGVyID0gZ2V0Q2VudGVyKHBvaW50ZXJzKTtcbiAgICBpbnB1dC50aW1lU3RhbXAgPSBub3coKTtcbiAgICBpbnB1dC5kZWx0YVRpbWUgPSBpbnB1dC50aW1lU3RhbXAgLSBmaXJzdElucHV0LnRpbWVTdGFtcDtcblxuICAgIGlucHV0LmFuZ2xlID0gZ2V0QW5nbGUob2Zmc2V0Q2VudGVyLCBjZW50ZXIpO1xuICAgIGlucHV0LmRpc3RhbmNlID0gZ2V0RGlzdGFuY2Uob2Zmc2V0Q2VudGVyLCBjZW50ZXIpO1xuXG4gICAgY29tcHV0ZURlbHRhWFkoc2Vzc2lvbiwgaW5wdXQpO1xuICAgIGlucHV0Lm9mZnNldERpcmVjdGlvbiA9IGdldERpcmVjdGlvbihpbnB1dC5kZWx0YVgsIGlucHV0LmRlbHRhWSk7XG5cbiAgICB2YXIgb3ZlcmFsbFZlbG9jaXR5ID0gZ2V0VmVsb2NpdHkoaW5wdXQuZGVsdGFUaW1lLCBpbnB1dC5kZWx0YVgsIGlucHV0LmRlbHRhWSk7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WCA9IG92ZXJhbGxWZWxvY2l0eS54O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eVkgPSBvdmVyYWxsVmVsb2NpdHkueTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHkgPSAoYWJzKG92ZXJhbGxWZWxvY2l0eS54KSA+IGFicyhvdmVyYWxsVmVsb2NpdHkueSkpID8gb3ZlcmFsbFZlbG9jaXR5LnggOiBvdmVyYWxsVmVsb2NpdHkueTtcblxuICAgIGlucHV0LnNjYWxlID0gZmlyc3RNdWx0aXBsZSA/IGdldFNjYWxlKGZpcnN0TXVsdGlwbGUucG9pbnRlcnMsIHBvaW50ZXJzKSA6IDE7XG4gICAgaW5wdXQucm90YXRpb24gPSBmaXJzdE11bHRpcGxlID8gZ2V0Um90YXRpb24oZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpIDogMDtcblxuICAgIGlucHV0Lm1heFBvaW50ZXJzID0gIXNlc3Npb24ucHJldklucHV0ID8gaW5wdXQucG9pbnRlcnMubGVuZ3RoIDogKChpbnB1dC5wb2ludGVycy5sZW5ndGggPlxuICAgICAgICBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVycykgPyBpbnB1dC5wb2ludGVycy5sZW5ndGggOiBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVycyk7XG5cbiAgICBjb21wdXRlSW50ZXJ2YWxJbnB1dERhdGEoc2Vzc2lvbiwgaW5wdXQpO1xuXG4gICAgLy8gZmluZCB0aGUgY29ycmVjdCB0YXJnZXRcbiAgICB2YXIgdGFyZ2V0ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIGlmIChoYXNQYXJlbnQoaW5wdXQuc3JjRXZlbnQudGFyZ2V0LCB0YXJnZXQpKSB7XG4gICAgICAgIHRhcmdldCA9IGlucHV0LnNyY0V2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgaW5wdXQudGFyZ2V0ID0gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBjb21wdXRlRGVsdGFYWShzZXNzaW9uLCBpbnB1dCkge1xuICAgIHZhciBjZW50ZXIgPSBpbnB1dC5jZW50ZXI7XG4gICAgdmFyIG9mZnNldCA9IHNlc3Npb24ub2Zmc2V0RGVsdGEgfHwge307XG4gICAgdmFyIHByZXZEZWx0YSA9IHNlc3Npb24ucHJldkRlbHRhIHx8IHt9O1xuICAgIHZhciBwcmV2SW5wdXQgPSBzZXNzaW9uLnByZXZJbnB1dCB8fCB7fTtcblxuICAgIGlmIChpbnB1dC5ldmVudFR5cGUgPT09IElOUFVUX1NUQVJUIHx8IHByZXZJbnB1dC5ldmVudFR5cGUgPT09IElOUFVUX0VORCkge1xuICAgICAgICBwcmV2RGVsdGEgPSBzZXNzaW9uLnByZXZEZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IHByZXZJbnB1dC5kZWx0YVggfHwgMCxcbiAgICAgICAgICAgIHk6IHByZXZJbnB1dC5kZWx0YVkgfHwgMFxuICAgICAgICB9O1xuXG4gICAgICAgIG9mZnNldCA9IHNlc3Npb24ub2Zmc2V0RGVsdGEgPSB7XG4gICAgICAgICAgICB4OiBjZW50ZXIueCxcbiAgICAgICAgICAgIHk6IGNlbnRlci55XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaW5wdXQuZGVsdGFYID0gcHJldkRlbHRhLnggKyAoY2VudGVyLnggLSBvZmZzZXQueCk7XG4gICAgaW5wdXQuZGVsdGFZID0gcHJldkRlbHRhLnkgKyAoY2VudGVyLnkgLSBvZmZzZXQueSk7XG59XG5cbi8qKlxuICogdmVsb2NpdHkgaXMgY2FsY3VsYXRlZCBldmVyeSB4IG1zXG4gKiBAcGFyYW0ge09iamVjdH0gc2Vzc2lvblxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVJbnRlcnZhbElucHV0RGF0YShzZXNzaW9uLCBpbnB1dCkge1xuICAgIHZhciBsYXN0ID0gc2Vzc2lvbi5sYXN0SW50ZXJ2YWwgfHwgaW5wdXQsXG4gICAgICAgIGRlbHRhVGltZSA9IGlucHV0LnRpbWVTdGFtcCAtIGxhc3QudGltZVN0YW1wLFxuICAgICAgICB2ZWxvY2l0eSwgdmVsb2NpdHlYLCB2ZWxvY2l0eVksIGRpcmVjdGlvbjtcblxuICAgIGlmIChpbnB1dC5ldmVudFR5cGUgIT0gSU5QVVRfQ0FOQ0VMICYmIChkZWx0YVRpbWUgPiBDT01QVVRFX0lOVEVSVkFMIHx8IGxhc3QudmVsb2NpdHkgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgdmFyIGRlbHRhWCA9IGlucHV0LmRlbHRhWCAtIGxhc3QuZGVsdGFYO1xuICAgICAgICB2YXIgZGVsdGFZID0gaW5wdXQuZGVsdGFZIC0gbGFzdC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIHYgPSBnZXRWZWxvY2l0eShkZWx0YVRpbWUsIGRlbHRhWCwgZGVsdGFZKTtcbiAgICAgICAgdmVsb2NpdHlYID0gdi54O1xuICAgICAgICB2ZWxvY2l0eVkgPSB2Lnk7XG4gICAgICAgIHZlbG9jaXR5ID0gKGFicyh2LngpID4gYWJzKHYueSkpID8gdi54IDogdi55O1xuICAgICAgICBkaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oZGVsdGFYLCBkZWx0YVkpO1xuXG4gICAgICAgIHNlc3Npb24ubGFzdEludGVydmFsID0gaW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXNlIGxhdGVzdCB2ZWxvY2l0eSBpbmZvIGlmIGl0IGRvZXNuJ3Qgb3ZlcnRha2UgYSBtaW5pbXVtIHBlcmlvZFxuICAgICAgICB2ZWxvY2l0eSA9IGxhc3QudmVsb2NpdHk7XG4gICAgICAgIHZlbG9jaXR5WCA9IGxhc3QudmVsb2NpdHlYO1xuICAgICAgICB2ZWxvY2l0eVkgPSBsYXN0LnZlbG9jaXR5WTtcbiAgICAgICAgZGlyZWN0aW9uID0gbGFzdC5kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgaW5wdXQudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICBpbnB1dC52ZWxvY2l0eVggPSB2ZWxvY2l0eVg7XG4gICAgaW5wdXQudmVsb2NpdHlZID0gdmVsb2NpdHlZO1xuICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBzaW1wbGUgY2xvbmUgZnJvbSB0aGUgaW5wdXQgdXNlZCBmb3Igc3RvcmFnZSBvZiBmaXJzdElucHV0IGFuZCBmaXJzdE11bHRpcGxlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9IGNsb25lZElucHV0RGF0YVxuICovXG5mdW5jdGlvbiBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCkge1xuICAgIC8vIG1ha2UgYSBzaW1wbGUgY29weSBvZiB0aGUgcG9pbnRlcnMgYmVjYXVzZSB3ZSB3aWxsIGdldCBhIHJlZmVyZW5jZSBpZiB3ZSBkb24ndFxuICAgIC8vIHdlIG9ubHkgbmVlZCBjbGllbnRYWSBmb3IgdGhlIGNhbGN1bGF0aW9uc1xuICAgIHZhciBwb2ludGVycyA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGlucHV0LnBvaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICBwb2ludGVyc1tpXSA9IHtcbiAgICAgICAgICAgIGNsaWVudFg6IHJvdW5kKGlucHV0LnBvaW50ZXJzW2ldLmNsaWVudFgpLFxuICAgICAgICAgICAgY2xpZW50WTogcm91bmQoaW5wdXQucG9pbnRlcnNbaV0uY2xpZW50WSlcbiAgICAgICAgfTtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHRpbWVTdGFtcDogbm93KCksXG4gICAgICAgIHBvaW50ZXJzOiBwb2ludGVycyxcbiAgICAgICAgY2VudGVyOiBnZXRDZW50ZXIocG9pbnRlcnMpLFxuICAgICAgICBkZWx0YVg6IGlucHV0LmRlbHRhWCxcbiAgICAgICAgZGVsdGFZOiBpbnB1dC5kZWx0YVlcbiAgICB9O1xufVxuXG4vKipcbiAqIGdldCB0aGUgY2VudGVyIG9mIGFsbCB0aGUgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtPYmplY3R9IGNlbnRlciBjb250YWlucyBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGdldENlbnRlcihwb2ludGVycykge1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIG5vIG5lZWQgdG8gbG9vcCB3aGVuIG9ubHkgb25lIHRvdWNoXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiByb3VuZChwb2ludGVyc1swXS5jbGllbnRYKSxcbiAgICAgICAgICAgIHk6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHggPSAwLCB5ID0gMCwgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBwb2ludGVyc0xlbmd0aCkge1xuICAgICAgICB4ICs9IHBvaW50ZXJzW2ldLmNsaWVudFg7XG4gICAgICAgIHkgKz0gcG9pbnRlcnNbaV0uY2xpZW50WTtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHJvdW5kKHggLyBwb2ludGVyc0xlbmd0aCksXG4gICAgICAgIHk6IHJvdW5kKHkgLyBwb2ludGVyc0xlbmd0aClcbiAgICB9O1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgdmVsb2NpdHkgYmV0d2VlbiB0d28gcG9pbnRzLiB1bml0IGlzIGluIHB4IHBlciBtcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVRpbWVcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybiB7T2JqZWN0fSB2ZWxvY2l0eSBgeGAgYW5kIGB5YFxuICovXG5mdW5jdGlvbiBnZXRWZWxvY2l0eShkZWx0YVRpbWUsIHgsIHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4IC8gZGVsdGFUaW1lIHx8IDAsXG4gICAgICAgIHk6IHkgLyBkZWx0YVRpbWUgfHwgMFxuICAgIH07XG59XG5cbi8qKlxuICogZ2V0IHRoZSBkaXJlY3Rpb24gYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge051bWJlcn0gZGlyZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIERJUkVDVElPTl9OT05FO1xuICAgIH1cblxuICAgIGlmIChhYnMoeCkgPj0gYWJzKHkpKSB7XG4gICAgICAgIHJldHVybiB4IDwgMCA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgIH1cbiAgICByZXR1cm4geSA8IDAgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFic29sdXRlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtPYmplY3R9IHAxIHt4LCB5fVxuICogQHBhcmFtIHtPYmplY3R9IHAyIHt4LCB5fVxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBkaXN0YW5jZVxuICovXG5mdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIsIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcykge1xuICAgICAgICBwcm9wcyA9IFBST1BTX1hZO1xuICAgIH1cbiAgICB2YXIgeCA9IHAyW3Byb3BzWzBdXSAtIHAxW3Byb3BzWzBdXSxcbiAgICAgICAgeSA9IHAyW3Byb3BzWzFdXSAtIHAxW3Byb3BzWzFdXTtcblxuICAgIHJldHVybiBNYXRoLnNxcnQoKHggKiB4KSArICh5ICogeSkpO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgYW5nbGUgYmV0d2VlbiB0d28gY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMVxuICogQHBhcmFtIHtPYmplY3R9IHAyXG4gKiBAcGFyYW0ge0FycmF5fSBbcHJvcHNdIGNvbnRhaW5pbmcgeCBhbmQgeSBrZXlzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGFuZ2xlXG4gKi9cbmZ1bmN0aW9uIGdldEFuZ2xlKHAxLCBwMiwgcHJvcHMpIHtcbiAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgIHByb3BzID0gUFJPUFNfWFk7XG4gICAgfVxuICAgIHZhciB4ID0gcDJbcHJvcHNbMF1dIC0gcDFbcHJvcHNbMF1dLFxuICAgICAgICB5ID0gcDJbcHJvcHNbMV1dIC0gcDFbcHJvcHNbMV1dO1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHksIHgpICogMTgwIC8gTWF0aC5QSTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHJvdGF0aW9uIGRlZ3JlZXMgYmV0d2VlbiB0d28gcG9pbnRlcnNldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YXJ0IGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBlbmQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gcm90YXRpb25cbiAqL1xuZnVuY3Rpb24gZ2V0Um90YXRpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBnZXRBbmdsZShlbmRbMV0sIGVuZFswXSwgUFJPUFNfQ0xJRU5UX1hZKSArIGdldEFuZ2xlKHN0YXJ0WzFdLCBzdGFydFswXSwgUFJPUFNfQ0xJRU5UX1hZKTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHNjYWxlIGZhY3RvciBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogbm8gc2NhbGUgaXMgMSwgYW5kIGdvZXMgZG93biB0byAwIHdoZW4gcGluY2hlZCB0b2dldGhlciwgYW5kIGJpZ2dlciB3aGVuIHBpbmNoZWQgb3V0XG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHNjYWxlXG4gKi9cbmZ1bmN0aW9uIGdldFNjYWxlKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZ2V0RGlzdGFuY2UoZW5kWzBdLCBlbmRbMV0sIFBST1BTX0NMSUVOVF9YWSkgLyBnZXREaXN0YW5jZShzdGFydFswXSwgc3RhcnRbMV0sIFBST1BTX0NMSUVOVF9YWSk7XG59XG5cbnZhciBNT1VTRV9JTlBVVF9NQVAgPSB7XG4gICAgbW91c2Vkb3duOiBJTlBVVF9TVEFSVCxcbiAgICBtb3VzZW1vdmU6IElOUFVUX01PVkUsXG4gICAgbW91c2V1cDogSU5QVVRfRU5EXG59O1xuXG52YXIgTU9VU0VfRUxFTUVOVF9FVkVOVFMgPSAnbW91c2Vkb3duJztcbnZhciBNT1VTRV9XSU5ET1dfRVZFTlRTID0gJ21vdXNlbW92ZSBtb3VzZXVwJztcblxuLyoqXG4gKiBNb3VzZSBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gTW91c2VJbnB1dCgpIHtcbiAgICB0aGlzLmV2RWwgPSBNT1VTRV9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gTU9VU0VfV0lORE9XX0VWRU5UUztcblxuICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlOyAvLyBtb3VzZWRvd24gc3RhdGVcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2XG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gTUVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBNT1VTRV9JTlBVVF9NQVBbZXYudHlwZV07XG5cbiAgICAgICAgLy8gb24gc3RhcnQgd2Ugd2FudCB0byBoYXZlIHRoZSBsZWZ0IG1vdXNlIGJ1dHRvbiBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiBldi5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfTU9WRSAmJiBldi53aGljaCAhPT0gMSkge1xuICAgICAgICAgICAgZXZlbnRUeXBlID0gSU5QVVRfRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmICghdGhpcy5wcmVzc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBQT0lOVEVSX0lOUFVUX01BUCA9IHtcbiAgICBwb2ludGVyZG93bjogSU5QVVRfU1RBUlQsXG4gICAgcG9pbnRlcm1vdmU6IElOUFVUX01PVkUsXG4gICAgcG9pbnRlcnVwOiBJTlBVVF9FTkQsXG4gICAgcG9pbnRlcmNhbmNlbDogSU5QVVRfQ0FOQ0VMLFxuICAgIHBvaW50ZXJvdXQ6IElOUFVUX0NBTkNFTFxufTtcblxuLy8gaW4gSUUxMCB0aGUgcG9pbnRlciB0eXBlcyBpcyBkZWZpbmVkIGFzIGFuIGVudW1cbnZhciBJRTEwX1BPSU5URVJfVFlQRV9FTlVNID0ge1xuICAgIDI6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgMzogSU5QVVRfVFlQRV9QRU4sXG4gICAgNDogSU5QVVRfVFlQRV9NT1VTRSxcbiAgICA1OiBJTlBVVF9UWVBFX0tJTkVDVCAvLyBzZWUgaHR0cHM6Ly90d2l0dGVyLmNvbS9qYWNvYnJvc3NpL3N0YXR1cy80ODA1OTY0Mzg0ODk4OTA4MTZcbn07XG5cbnZhciBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ3BvaW50ZXJkb3duJztcbnZhciBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAncG9pbnRlcm1vdmUgcG9pbnRlcnVwIHBvaW50ZXJjYW5jZWwnO1xuXG4vLyBJRTEwIGhhcyBwcmVmaXhlZCBzdXBwb3J0LCBhbmQgY2FzZS1zZW5zaXRpdmVcbmlmICh3aW5kb3cuTVNQb2ludGVyRXZlbnQgJiYgIXdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ01TUG9pbnRlckRvd24nO1xuICAgIFBPSU5URVJfV0lORE9XX0VWRU5UUyA9ICdNU1BvaW50ZXJNb3ZlIE1TUG9pbnRlclVwIE1TUG9pbnRlckNhbmNlbCc7XG59XG5cbi8qKlxuICogUG9pbnRlciBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gUG9pbnRlckV2ZW50SW5wdXQoKSB7XG4gICAgdGhpcy5ldkVsID0gUE9JTlRFUl9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gUE9JTlRFUl9XSU5ET1dfRVZFTlRTO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuc3RvcmUgPSAodGhpcy5tYW5hZ2VyLnNlc3Npb24ucG9pbnRlckV2ZW50cyA9IFtdKTtcbn1cblxuaW5oZXJpdChQb2ludGVyRXZlbnRJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2XG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gUEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHRoaXMuc3RvcmU7XG4gICAgICAgIHZhciByZW1vdmVQb2ludGVyID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGV2ZW50VHlwZU5vcm1hbGl6ZWQgPSBldi50eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnbXMnLCAnJyk7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBQT0lOVEVSX0lOUFVUX01BUFtldmVudFR5cGVOb3JtYWxpemVkXTtcbiAgICAgICAgdmFyIHBvaW50ZXJUeXBlID0gSUUxMF9QT0lOVEVSX1RZUEVfRU5VTVtldi5wb2ludGVyVHlwZV0gfHwgZXYucG9pbnRlclR5cGU7XG5cbiAgICAgICAgdmFyIGlzVG91Y2ggPSAocG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSCk7XG5cbiAgICAgICAgLy8gZ2V0IGluZGV4IG9mIHRoZSBldmVudCBpbiB0aGUgc3RvcmVcbiAgICAgICAgdmFyIHN0b3JlSW5kZXggPSBpbkFycmF5KHN0b3JlLCBldi5wb2ludGVySWQsICdwb2ludGVySWQnKTtcblxuICAgICAgICAvLyBzdGFydCBhbmQgbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiAoZXYuYnV0dG9uID09PSAwIHx8IGlzVG91Y2gpKSB7XG4gICAgICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXNoKGV2KTtcbiAgICAgICAgICAgICAgICBzdG9yZUluZGV4ID0gc3RvcmUubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICAgICAgcmVtb3ZlUG9pbnRlciA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpdCBub3QgZm91bmQsIHNvIHRoZSBwb2ludGVyIGhhc24ndCBiZWVuIGRvd24gKHNvIGl0J3MgcHJvYmFibHkgYSBob3ZlcilcbiAgICAgICAgaWYgKHN0b3JlSW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICBzdG9yZVtzdG9yZUluZGV4XSA9IGV2O1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBzdG9yZSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBwb2ludGVyVHlwZSxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVtb3ZlUG9pbnRlcikge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gdGhlIHN0b3JlXG4gICAgICAgICAgICBzdG9yZS5zcGxpY2Uoc3RvcmVJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxudmFyIFNJTkdMRV9UT1VDSF9JTlBVVF9NQVAgPSB7XG4gICAgdG91Y2hzdGFydDogSU5QVVRfU1RBUlQsXG4gICAgdG91Y2htb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHRvdWNoZW5kOiBJTlBVVF9FTkQsXG4gICAgdG91Y2hjYW5jZWw6IElOUFVUX0NBTkNFTFxufTtcblxudmFyIFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQnO1xudmFyIFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBUb3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gU2luZ2xlVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChTaW5nbGVUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFRFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgdHlwZSA9IFNJTkdMRV9UT1VDSF9JTlBVVF9NQVBbZXYudHlwZV07XG5cbiAgICAgICAgLy8gc2hvdWxkIHdlIGhhbmRsZSB0aGUgdG91Y2ggZXZlbnRzP1xuICAgICAgICBpZiAodHlwZSA9PT0gSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdWNoZXMgPSBub3JtYWxpemVTaW5nbGVUb3VjaGVzLmNhbGwodGhpcywgZXYsIHR5cGUpO1xuXG4gICAgICAgIC8vIHdoZW4gZG9uZSwgcmVzZXQgdGhlIHN0YXJ0ZWQgc3RhdGVcbiAgICAgICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiB0b3VjaGVzWzBdLmxlbmd0aCAtIHRvdWNoZXNbMV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCB0eXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogdG91Y2hlc1swXSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogdG91Y2hlc1sxXSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEB0aGlzIHtUb3VjaElucHV0fVxuICogQHBhcmFtIHtPYmplY3R9IGV2XG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZSBmbGFnXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfEFycmF5fSBbYWxsLCBjaGFuZ2VkXVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVTaW5nbGVUb3VjaGVzKGV2LCB0eXBlKSB7XG4gICAgdmFyIGFsbCA9IHRvQXJyYXkoZXYudG91Y2hlcyk7XG4gICAgdmFyIGNoYW5nZWQgPSB0b0FycmF5KGV2LmNoYW5nZWRUb3VjaGVzKTtcblxuICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgYWxsID0gdW5pcXVlQXJyYXkoYWxsLmNvbmNhdChjaGFuZ2VkKSwgJ2lkZW50aWZpZXInLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2FsbCwgY2hhbmdlZF07XG59XG5cbnZhciBUT1VDSF9JTlBVVF9NQVAgPSB7XG4gICAgdG91Y2hzdGFydDogSU5QVVRfU1RBUlQsXG4gICAgdG91Y2htb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHRvdWNoZW5kOiBJTlBVVF9FTkQsXG4gICAgdG91Y2hjYW5jZWw6IElOUFVUX0NBTkNFTFxufTtcblxudmFyIFRPVUNIX1RBUkdFVF9FVkVOVFMgPSAndG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWwnO1xuXG4vKipcbiAqIE11bHRpLXVzZXIgdG91Y2ggZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFRvdWNoSW5wdXQoKSB7XG4gICAgdGhpcy5ldlRhcmdldCA9IFRPVUNIX1RBUkdFVF9FVkVOVFM7XG4gICAgdGhpcy50YXJnZXRJZHMgPSB7fTtcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoVG91Y2hJbnB1dCwgSW5wdXQsIHtcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBNVEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciB0eXBlID0gVE9VQ0hfSU5QVVRfTUFQW2V2LnR5cGVdO1xuICAgICAgICB2YXIgdG91Y2hlcyA9IGdldFRvdWNoZXMuY2FsbCh0aGlzLCBldiwgdHlwZSk7XG4gICAgICAgIGlmICghdG91Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiB0b3VjaGVzWzFdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIGdldFRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsVG91Y2hlcyA9IHRvQXJyYXkoZXYudG91Y2hlcyk7XG4gICAgdmFyIHRhcmdldElkcyA9IHRoaXMudGFyZ2V0SWRzO1xuXG4gICAgLy8gd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSB0b3VjaCwgdGhlIHByb2Nlc3MgY2FuIGJlIHNpbXBsaWZpZWRcbiAgICBpZiAodHlwZSAmIChJTlBVVF9TVEFSVCB8IElOUFVUX01PVkUpICYmIGFsbFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRhcmdldElkc1thbGxUb3VjaGVzWzBdLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFthbGxUb3VjaGVzLCBhbGxUb3VjaGVzXTtcbiAgICB9XG5cbiAgICB2YXIgaSxcbiAgICAgICAgdGFyZ2V0VG91Y2hlcyxcbiAgICAgICAgY2hhbmdlZFRvdWNoZXMgPSB0b0FycmF5KGV2LmNoYW5nZWRUb3VjaGVzKSxcbiAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMgPSBbXSxcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG5cbiAgICAvLyBnZXQgdGFyZ2V0IHRvdWNoZXMgZnJvbSB0b3VjaGVzXG4gICAgdGFyZ2V0VG91Y2hlcyA9IGFsbFRvdWNoZXMuZmlsdGVyKGZ1bmN0aW9uKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiBoYXNQYXJlbnQodG91Y2gudGFyZ2V0LCB0YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgLy8gY29sbGVjdCB0b3VjaGVzXG4gICAgaWYgKHR5cGUgPT09IElOUFVUX1NUQVJUKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRhcmdldFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXJnZXRJZHNbdGFyZ2V0VG91Y2hlc1tpXS5pZGVudGlmaWVyXSA9IHRydWU7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgY2hhbmdlZCB0b3VjaGVzIHRvIG9ubHkgY29udGFpbiB0b3VjaGVzIHRoYXQgZXhpc3QgaW4gdGhlIGNvbGxlY3RlZCB0YXJnZXQgaWRzXG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBjaGFuZ2VkVG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHRhcmdldElkc1tjaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyXSkge1xuICAgICAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMucHVzaChjaGFuZ2VkVG91Y2hlc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhbnVwIHJlbW92ZWQgdG91Y2hlc1xuICAgICAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgICAgICBkZWxldGUgdGFyZ2V0SWRzW2NoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoIWNoYW5nZWRUYXJnZXRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgLy8gbWVyZ2UgdGFyZ2V0VG91Y2hlcyB3aXRoIGNoYW5nZWRUYXJnZXRUb3VjaGVzIHNvIGl0IGNvbnRhaW5zIEFMTCB0b3VjaGVzLCBpbmNsdWRpbmcgJ2VuZCcgYW5kICdjYW5jZWwnXG4gICAgICAgIHVuaXF1ZUFycmF5KHRhcmdldFRvdWNoZXMuY29uY2F0KGNoYW5nZWRUYXJnZXRUb3VjaGVzKSwgJ2lkZW50aWZpZXInLCB0cnVlKSxcbiAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXNcbiAgICBdO1xufVxuXG4vKipcbiAqIENvbWJpbmVkIHRvdWNoIGFuZCBtb3VzZSBpbnB1dFxuICpcbiAqIFRvdWNoIGhhcyBhIGhpZ2hlciBwcmlvcml0eSB0aGVuIG1vdXNlLCBhbmQgd2hpbGUgdG91Y2hpbmcgbm8gbW91c2UgZXZlbnRzIGFyZSBhbGxvd2VkLlxuICogVGhpcyBiZWNhdXNlIHRvdWNoIGRldmljZXMgYWxzbyBlbWl0IG1vdXNlIGV2ZW50cyB3aGlsZSBkb2luZyBhIHRvdWNoLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuXG52YXIgREVEVVBfVElNRU9VVCA9IDI1MDA7XG52YXIgREVEVVBfRElTVEFOQ0UgPSAyNTtcblxuZnVuY3Rpb24gVG91Y2hNb3VzZUlucHV0KCkge1xuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgaGFuZGxlciA9IGJpbmRGbih0aGlzLmhhbmRsZXIsIHRoaXMpO1xuICAgIHRoaXMudG91Y2ggPSBuZXcgVG91Y2hJbnB1dCh0aGlzLm1hbmFnZXIsIGhhbmRsZXIpO1xuICAgIHRoaXMubW91c2UgPSBuZXcgTW91c2VJbnB1dCh0aGlzLm1hbmFnZXIsIGhhbmRsZXIpO1xuXG4gICAgdGhpcy5wcmltYXJ5VG91Y2ggPSBudWxsO1xuICAgIHRoaXMubGFzdFRvdWNoZXMgPSBbXTtcbn1cblxuaW5oZXJpdChUb3VjaE1vdXNlSW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGFuZCB0b3VjaCBldmVudHNcbiAgICAgKiBAcGFyYW0ge0hhbW1lcn0gbWFuYWdlclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dEV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFRNRWhhbmRsZXIobWFuYWdlciwgaW5wdXRFdmVudCwgaW5wdXREYXRhKSB7XG4gICAgICAgIHZhciBpc1RvdWNoID0gKGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNIKSxcbiAgICAgICAgICAgIGlzTW91c2UgPSAoaW5wdXREYXRhLnBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfTU9VU0UpO1xuXG4gICAgICAgIGlmIChpc01vdXNlICYmIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMgJiYgaW5wdXREYXRhLnNvdXJjZUNhcGFiaWxpdGllcy5maXJlc1RvdWNoRXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIHdlJ3JlIGluIGEgdG91Y2ggZXZlbnQsIHJlY29yZCB0b3VjaGVzIHRvICBkZS1kdXBlIHN5bnRoZXRpYyBtb3VzZSBldmVudFxuICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgICAgcmVjb3JkVG91Y2hlcy5jYWxsKHRoaXMsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNNb3VzZSAmJiBpc1N5bnRoZXRpY0V2ZW50LmNhbGwodGhpcywgaW5wdXREYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayhtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudG91Y2guZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm1vdXNlLmRlc3Ryb3koKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gcmVjb3JkVG91Y2hlcyhldmVudFR5cGUsIGV2ZW50RGF0YSkge1xuICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICB0aGlzLnByaW1hcnlUb3VjaCA9IGV2ZW50RGF0YS5jaGFuZ2VkUG9pbnRlcnNbMF0uaWRlbnRpZmllcjtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIHNldExhc3RUb3VjaC5jYWxsKHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRMYXN0VG91Y2goZXZlbnREYXRhKSB7XG4gICAgdmFyIHRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXTtcblxuICAgIGlmICh0b3VjaC5pZGVudGlmaWVyID09PSB0aGlzLnByaW1hcnlUb3VjaCkge1xuICAgICAgICB2YXIgbGFzdFRvdWNoID0ge3g6IHRvdWNoLmNsaWVudFgsIHk6IHRvdWNoLmNsaWVudFl9O1xuICAgICAgICB0aGlzLmxhc3RUb3VjaGVzLnB1c2gobGFzdFRvdWNoKTtcbiAgICAgICAgdmFyIGx0cyA9IHRoaXMubGFzdFRvdWNoZXM7XG4gICAgICAgIHZhciByZW1vdmVMYXN0VG91Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpID0gbHRzLmluZGV4T2YobGFzdFRvdWNoKTtcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzZXRUaW1lb3V0KHJlbW92ZUxhc3RUb3VjaCwgREVEVVBfVElNRU9VVCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1N5bnRoZXRpY0V2ZW50KGV2ZW50RGF0YSkge1xuICAgIHZhciB4ID0gZXZlbnREYXRhLnNyY0V2ZW50LmNsaWVudFgsIHkgPSBldmVudERhdGEuc3JjRXZlbnQuY2xpZW50WTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGFzdFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHQgPSB0aGlzLmxhc3RUb3VjaGVzW2ldO1xuICAgICAgICB2YXIgZHggPSBNYXRoLmFicyh4IC0gdC54KSwgZHkgPSBNYXRoLmFicyh5IC0gdC55KTtcbiAgICAgICAgaWYgKGR4IDw9IERFRFVQX0RJU1RBTkNFICYmIGR5IDw9IERFRFVQX0RJU1RBTkNFKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBQUkVGSVhFRF9UT1VDSF9BQ1RJT04gPSBwcmVmaXhlZChURVNUX0VMRU1FTlQuc3R5bGUsICd0b3VjaEFjdGlvbicpO1xudmFyIE5BVElWRV9UT1VDSF9BQ1RJT04gPSBQUkVGSVhFRF9UT1VDSF9BQ1RJT04gIT09IHVuZGVmaW5lZDtcblxuLy8gbWFnaWNhbCB0b3VjaEFjdGlvbiB2YWx1ZVxudmFyIFRPVUNIX0FDVElPTl9DT01QVVRFID0gJ2NvbXB1dGUnO1xudmFyIFRPVUNIX0FDVElPTl9BVVRPID0gJ2F1dG8nO1xudmFyIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04gPSAnbWFuaXB1bGF0aW9uJzsgLy8gbm90IGltcGxlbWVudGVkXG52YXIgVE9VQ0hfQUNUSU9OX05PTkUgPSAnbm9uZSc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9YID0gJ3Bhbi14JztcbnZhciBUT1VDSF9BQ1RJT05fUEFOX1kgPSAncGFuLXknO1xudmFyIFRPVUNIX0FDVElPTl9NQVAgPSBnZXRUb3VjaEFjdGlvblByb3BzKCk7XG5cbi8qKlxuICogVG91Y2ggQWN0aW9uXG4gKiBzZXRzIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eSBvciB1c2VzIHRoZSBqcyBhbHRlcm5hdGl2ZVxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBUb3VjaEFjdGlvbihtYW5hZ2VyLCB2YWx1ZSkge1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy5zZXQodmFsdWUpO1xufVxuXG5Ub3VjaEFjdGlvbi5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IHRoZSB0b3VjaEFjdGlvbiB2YWx1ZSBvbiB0aGUgZWxlbWVudCBvciBlbmFibGUgdGhlIHBvbHlmaWxsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBmaW5kIG91dCB0aGUgdG91Y2gtYWN0aW9uIGJ5IHRoZSBldmVudCBoYW5kbGVyc1xuICAgICAgICBpZiAodmFsdWUgPT0gVE9VQ0hfQUNUSU9OX0NPTVBVVEUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jb21wdXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTkFUSVZFX1RPVUNIX0FDVElPTiAmJiB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZSAmJiBUT1VDSF9BQ1RJT05fTUFQW3ZhbHVlXSkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGVbUFJFRklYRURfVE9VQ0hfQUNUSU9OXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHZhbHVlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBqdXN0IHJlLXNldCB0aGUgdG91Y2hBY3Rpb24gdmFsdWVcbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLm1hbmFnZXIub3B0aW9ucy50b3VjaEFjdGlvbik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNvbXB1dGUgdGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgYmFzZWQgb24gdGhlIHJlY29nbml6ZXIncyBzZXR0aW5nc1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgY29tcHV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY3Rpb25zID0gW107XG4gICAgICAgIGVhY2godGhpcy5tYW5hZ2VyLnJlY29nbml6ZXJzLCBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICBpZiAoYm9vbE9yRm4ocmVjb2duaXplci5vcHRpb25zLmVuYWJsZSwgW3JlY29nbml6ZXJdKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChyZWNvZ25pemVyLmdldFRvdWNoQWN0aW9uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNsZWFuVG91Y2hBY3Rpb25zKGFjdGlvbnMuam9pbignICcpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdGhpcyBtZXRob2QgaXMgY2FsbGVkIG9uIGVhY2ggaW5wdXQgY3ljbGUgYW5kIHByb3ZpZGVzIHRoZSBwcmV2ZW50aW5nIG9mIHRoZSBicm93c2VyIGJlaGF2aW9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgcHJldmVudERlZmF1bHRzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc3JjRXZlbnQgPSBpbnB1dC5zcmNFdmVudDtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlucHV0Lm9mZnNldERpcmVjdGlvbjtcblxuICAgICAgICAvLyBpZiB0aGUgdG91Y2ggYWN0aW9uIGRpZCBwcmV2ZW50ZWQgb25jZSB0aGlzIHNlc3Npb25cbiAgICAgICAgaWYgKHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZCkge1xuICAgICAgICAgICAgc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xuICAgICAgICB2YXIgaGFzTm9uZSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9OT05FKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgICAgIHZhciBoYXNQYW5ZID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9ZKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1ldO1xuICAgICAgICB2YXIgaGFzUGFuWCA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWCkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9YXTtcblxuICAgICAgICBpZiAoaGFzTm9uZSkge1xuICAgICAgICAgICAgLy9kbyBub3QgcHJldmVudCBkZWZhdWx0cyBpZiB0aGlzIGlzIGEgdGFwIGdlc3R1cmVcblxuICAgICAgICAgICAgdmFyIGlzVGFwUG9pbnRlciA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgICAgIHZhciBpc1RhcE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCAyO1xuICAgICAgICAgICAgdmFyIGlzVGFwVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgMjUwO1xuXG4gICAgICAgICAgICBpZiAoaXNUYXBQb2ludGVyICYmIGlzVGFwTW92ZW1lbnQgJiYgaXNUYXBUb3VjaFRpbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSB7XG4gICAgICAgICAgICAvLyBgcGFuLXggcGFuLXlgIG1lYW5zIGJyb3dzZXIgaGFuZGxlcyBhbGwgc2Nyb2xsaW5nL3Bhbm5pbmcsIGRvIG5vdCBwcmV2ZW50XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzTm9uZSB8fFxuICAgICAgICAgICAgKGhhc1BhblkgJiYgZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHx8XG4gICAgICAgICAgICAoaGFzUGFuWCAmJiBkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50U3JjKHNyY0V2ZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsIHByZXZlbnREZWZhdWx0IHRvIHByZXZlbnQgdGhlIGJyb3dzZXIncyBkZWZhdWx0IGJlaGF2aW9yIChzY3JvbGxpbmcgaW4gbW9zdCBjYXNlcylcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3JjRXZlbnRcbiAgICAgKi9cbiAgICBwcmV2ZW50U3JjOiBmdW5jdGlvbihzcmNFdmVudCkge1xuICAgICAgICB0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wcmV2ZW50ZWQgPSB0cnVlO1xuICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogd2hlbiB0aGUgdG91Y2hBY3Rpb25zIGFyZSBjb2xsZWN0ZWQgdGhleSBhcmUgbm90IGEgdmFsaWQgdmFsdWUsIHNvIHdlIG5lZWQgdG8gY2xlYW4gdGhpbmdzIHVwLiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uc1xuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGNsZWFuVG91Y2hBY3Rpb25zKGFjdGlvbnMpIHtcbiAgICAvLyBub25lXG4gICAgaWYgKGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9OT05FKSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgdmFyIGhhc1BhblggPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1gpO1xuICAgIHZhciBoYXNQYW5ZID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9ZKTtcblxuICAgIC8vIGlmIGJvdGggcGFuLXggYW5kIHBhbi15IGFyZSBzZXQgKGRpZmZlcmVudCByZWNvZ25pemVyc1xuICAgIC8vIGZvciBkaWZmZXJlbnQgZGlyZWN0aW9ucywgZS5nLiBob3Jpem9udGFsIHBhbiBidXQgdmVydGljYWwgc3dpcGU/KVxuICAgIC8vIHdlIG5lZWQgbm9uZSAoYXMgb3RoZXJ3aXNlIHdpdGggcGFuLXggcGFuLXkgY29tYmluZWQgbm9uZSBvZiB0aGVzZVxuICAgIC8vIHJlY29nbml6ZXJzIHdpbGwgd29yaywgc2luY2UgdGhlIGJyb3dzZXIgd291bGQgaGFuZGxlIGFsbCBwYW5uaW5nXG4gICAgaWYgKGhhc1BhblggJiYgaGFzUGFuWSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgLy8gcGFuLXggT1IgcGFuLXlcbiAgICBpZiAoaGFzUGFuWCB8fCBoYXNQYW5ZKSB7XG4gICAgICAgIHJldHVybiBoYXNQYW5YID8gVE9VQ0hfQUNUSU9OX1BBTl9YIDogVE9VQ0hfQUNUSU9OX1BBTl9ZO1xuICAgIH1cblxuICAgIC8vIG1hbmlwdWxhdGlvblxuICAgIGlmIChpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OKSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTjtcbiAgICB9XG5cbiAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX0FVVE87XG59XG5cbmZ1bmN0aW9uIGdldFRvdWNoQWN0aW9uUHJvcHMoKSB7XG4gICAgaWYgKCFOQVRJVkVfVE9VQ0hfQUNUSU9OKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHRvdWNoTWFwID0ge307XG4gICAgdmFyIGNzc1N1cHBvcnRzID0gd2luZG93LkNTUyAmJiB3aW5kb3cuQ1NTLnN1cHBvcnRzO1xuICAgIFsnYXV0bycsICdtYW5pcHVsYXRpb24nLCAncGFuLXknLCAncGFuLXgnLCAncGFuLXggcGFuLXknLCAnbm9uZSddLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XG5cbiAgICAgICAgLy8gSWYgY3NzLnN1cHBvcnRzIGlzIG5vdCBzdXBwb3J0ZWQgYnV0IHRoZXJlIGlzIG5hdGl2ZSB0b3VjaC1hY3Rpb24gYXNzdW1lIGl0IHN1cHBvcnRzXG4gICAgICAgIC8vIGFsbCB2YWx1ZXMuIFRoaXMgaXMgdGhlIGNhc2UgZm9yIElFIDEwIGFuZCAxMS5cbiAgICAgICAgdG91Y2hNYXBbdmFsXSA9IGNzc1N1cHBvcnRzID8gd2luZG93LkNTUy5zdXBwb3J0cygndG91Y2gtYWN0aW9uJywgdmFsKSA6IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdWNoTWFwO1xufVxuXG4vKipcbiAqIFJlY29nbml6ZXIgZmxvdyBleHBsYWluZWQ7ICpcbiAqIEFsbCByZWNvZ25pemVycyBoYXZlIHRoZSBpbml0aWFsIHN0YXRlIG9mIFBPU1NJQkxFIHdoZW4gYSBpbnB1dCBzZXNzaW9uIHN0YXJ0cy5cbiAqIFRoZSBkZWZpbml0aW9uIG9mIGEgaW5wdXQgc2Vzc2lvbiBpcyBmcm9tIHRoZSBmaXJzdCBpbnB1dCB1bnRpbCB0aGUgbGFzdCBpbnB1dCwgd2l0aCBhbGwgaXQncyBtb3ZlbWVudCBpbiBpdC4gKlxuICogRXhhbXBsZSBzZXNzaW9uIGZvciBtb3VzZS1pbnB1dDogbW91c2Vkb3duIC0+IG1vdXNlbW92ZSAtPiBtb3VzZXVwXG4gKlxuICogT24gZWFjaCByZWNvZ25pemluZyBjeWNsZSAoc2VlIE1hbmFnZXIucmVjb2duaXplKSB0aGUgLnJlY29nbml6ZSgpIG1ldGhvZCBpcyBleGVjdXRlZFxuICogd2hpY2ggZGV0ZXJtaW5lcyB3aXRoIHN0YXRlIGl0IHNob3VsZCBiZS5cbiAqXG4gKiBJZiB0aGUgcmVjb2duaXplciBoYXMgdGhlIHN0YXRlIEZBSUxFRCwgQ0FOQ0VMTEVEIG9yIFJFQ09HTklaRUQgKGVxdWFscyBFTkRFRCksIGl0IGlzIHJlc2V0IHRvXG4gKiBQT1NTSUJMRSB0byBnaXZlIGl0IGFub3RoZXIgY2hhbmdlIG9uIHRoZSBuZXh0IGN5Y2xlLlxuICpcbiAqICAgICAgICAgICAgICAgUG9zc2libGVcbiAqICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICArLS0tLS0rLS0tLS0tLS0tLS0tLS0tK1xuICogICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICArLS0tLS0rLS0tLS0rICAgICAgICAgICAgICAgfFxuICogICAgICB8ICAgICAgICAgICB8ICAgICAgICAgICAgICAgfFxuICogICBGYWlsZWQgICAgICBDYW5jZWxsZWQgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLStcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICBSZWNvZ25pemVkICAgICAgIEJlZ2FuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRlZC9SZWNvZ25pemVkXG4gKi9cbnZhciBTVEFURV9QT1NTSUJMRSA9IDE7XG52YXIgU1RBVEVfQkVHQU4gPSAyO1xudmFyIFNUQVRFX0NIQU5HRUQgPSA0O1xudmFyIFNUQVRFX0VOREVEID0gODtcbnZhciBTVEFURV9SRUNPR05JWkVEID0gU1RBVEVfRU5ERUQ7XG52YXIgU1RBVEVfQ0FOQ0VMTEVEID0gMTY7XG52YXIgU1RBVEVfRkFJTEVEID0gMzI7XG5cbi8qKlxuICogUmVjb2duaXplclxuICogRXZlcnkgcmVjb2duaXplciBuZWVkcyB0byBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBSZWNvZ25pemVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdGhpcy5pZCA9IHVuaXF1ZUlkKCk7XG5cbiAgICB0aGlzLm1hbmFnZXIgPSBudWxsO1xuXG4gICAgLy8gZGVmYXVsdCBpcyBlbmFibGUgdHJ1ZVxuICAgIHRoaXMub3B0aW9ucy5lbmFibGUgPSBpZlVuZGVmaW5lZCh0aGlzLm9wdGlvbnMuZW5hYmxlLCB0cnVlKTtcblxuICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcblxuICAgIHRoaXMuc2ltdWx0YW5lb3VzID0ge307XG4gICAgdGhpcy5yZXF1aXJlRmFpbCA9IFtdO1xufVxuXG5SZWNvZ25pemVyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgZGVmYXVsdHM6IHt9LFxuXG4gICAgLyoqXG4gICAgICogc2V0IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1JlY29nbml6ZXJ9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIGFsc28gdXBkYXRlIHRoZSB0b3VjaEFjdGlvbiwgaW4gY2FzZSBzb21ldGhpbmcgY2hhbmdlZCBhYm91dCB0aGUgZGlyZWN0aW9ucy9lbmFibGVkIHN0YXRlXG4gICAgICAgIHRoaXMubWFuYWdlciAmJiB0aGlzLm1hbmFnZXIudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdyZWNvZ25pemVXaXRoJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNpbXVsdGFuZW91cyA9IHRoaXMuc2ltdWx0YW5lb3VzO1xuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGlmICghc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0pIHtcbiAgICAgICAgICAgIHNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdID0gb3RoZXJSZWNvZ25pemVyO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlY29nbml6ZVdpdGgodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRyb3AgdGhlIHNpbXVsdGFuZW91cyBsaW5rLiBpdCBkb2VzbnQgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdkcm9wUmVjb2duaXplV2l0aCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemVyIGNhbiBvbmx5IHJ1biB3aGVuIGFuIG90aGVyIGlzIGZhaWxpbmdcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVxdWlyZUZhaWx1cmU6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVxdWlyZUZhaWx1cmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVxdWlyZUZhaWwgPSB0aGlzLnJlcXVpcmVGYWlsO1xuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGlmIChpbkFycmF5KHJlcXVpcmVGYWlsLCBvdGhlclJlY29nbml6ZXIpID09PSAtMSkge1xuICAgICAgICAgICAgcmVxdWlyZUZhaWwucHVzaChvdGhlclJlY29nbml6ZXIpO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkcm9wIHRoZSByZXF1aXJlRmFpbHVyZSBsaW5rLiBpdCBkb2VzIG5vdCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZXF1aXJlRmFpbHVyZTogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdkcm9wUmVxdWlyZUZhaWx1cmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIHZhciBpbmRleCA9IGluQXJyYXkodGhpcy5yZXF1aXJlRmFpbCwgb3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWlyZUZhaWwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaGFzIHJlcXVpcmUgZmFpbHVyZXMgYm9vbGVhblxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhc1JlcXVpcmVGYWlsdXJlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCA+IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGlmIHRoZSByZWNvZ25pemVyIGNhbiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuUmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFlvdSBzaG91bGQgdXNlIGB0cnlFbWl0YCBpbnN0ZWFkIG9mIGBlbWl0YCBkaXJlY3RseSB0byBjaGVja1xuICAgICAqIHRoYXQgYWxsIHRoZSBuZWVkZWQgcmVjb2duaXplcnMgaGFzIGZhaWxlZCBiZWZvcmUgZW1pdHRpbmcuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYubWFuYWdlci5lbWl0KGV2ZW50LCBpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAncGFuc3RhcnQnIGFuZCAncGFubW92ZSdcbiAgICAgICAgaWYgKHN0YXRlIDwgU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50ICsgc3RhdGVTdHIoc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50KTsgLy8gc2ltcGxlICdldmVudE5hbWUnIGV2ZW50c1xuXG4gICAgICAgIGlmIChpbnB1dC5hZGRpdGlvbmFsRXZlbnQpIHsgLy8gYWRkaXRpb25hbCBldmVudChwYW5sZWZ0LCBwYW5yaWdodCwgcGluY2hpbiwgcGluY2hvdXQuLi4pXG4gICAgICAgICAgICBlbWl0KGlucHV0LmFkZGl0aW9uYWxFdmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYW5lbmQgYW5kIHBhbmNhbmNlbFxuICAgICAgICBpZiAoc3RhdGUgPj0gU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50ICsgc3RhdGVTdHIoc3RhdGUpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGF0IGFsbCB0aGUgcmVxdWlyZSBmYWlsdXJlIHJlY29nbml6ZXJzIGhhcyBmYWlsZWQsXG4gICAgICogaWYgdHJ1ZSwgaXQgZW1pdHMgYSBnZXN0dXJlIGV2ZW50LFxuICAgICAqIG90aGVyd2lzZSwgc2V0dXAgdGhlIHN0YXRlIHRvIEZBSUxFRC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICB0cnlFbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5jYW5FbWl0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGl0J3MgZmFpbGluZyBhbnl3YXlcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FuIHdlIGVtaXQ/XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuRW1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5yZXF1aXJlRmFpbFtpXS5zdGF0ZSAmIChTVEFURV9GQUlMRUQgfCBTVEFURV9QT1NTSUJMRSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplOiBmdW5jdGlvbihpbnB1dERhdGEpIHtcbiAgICAgICAgLy8gbWFrZSBhIG5ldyBjb3B5IG9mIHRoZSBpbnB1dERhdGFcbiAgICAgICAgLy8gc28gd2UgY2FuIGNoYW5nZSB0aGUgaW5wdXREYXRhIHdpdGhvdXQgbWVzc2luZyB1cCB0aGUgb3RoZXIgcmVjb2duaXplcnNcbiAgICAgICAgdmFyIGlucHV0RGF0YUNsb25lID0gYXNzaWduKHt9LCBpbnB1dERhdGEpO1xuXG4gICAgICAgIC8vIGlzIGlzIGVuYWJsZWQgYW5kIGFsbG93IHJlY29nbml6aW5nP1xuICAgICAgICBpZiAoIWJvb2xPckZuKHRoaXMub3B0aW9ucy5lbmFibGUsIFt0aGlzLCBpbnB1dERhdGFDbG9uZV0pKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXQgd2hlbiB3ZSd2ZSByZWFjaGVkIHRoZSBlbmRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiAoU1RBVEVfUkVDT0dOSVpFRCB8IFNUQVRFX0NBTkNFTExFRCB8IFNUQVRFX0ZBSUxFRCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnByb2Nlc3MoaW5wdXREYXRhQ2xvbmUpO1xuXG4gICAgICAgIC8vIHRoZSByZWNvZ25pemVyIGhhcyByZWNvZ25pemVkIGEgZ2VzdHVyZVxuICAgICAgICAvLyBzbyB0cmlnZ2VyIGFuIGV2ZW50XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEIHwgU1RBVEVfQ0FOQ0VMTEVEKSkge1xuICAgICAgICAgICAgdGhpcy50cnlFbWl0KGlucHV0RGF0YUNsb25lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIHN0YXRlIG9mIHRoZSByZWNvZ25pemVyXG4gICAgICogdGhlIGFjdHVhbCByZWNvZ25pemluZyBoYXBwZW5zIGluIHRoaXMgbWV0aG9kXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICogQHJldHVybnMge0NvbnN0fSBTVEFURVxuICAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0RGF0YSkgeyB9LCAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgcHJlZmVycmVkIHRvdWNoLWFjdGlvblxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHsgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGxlZCB3aGVuIHRoZSBnZXN0dXJlIGlzbid0IGFsbG93ZWQgdG8gcmVjb2duaXplXG4gICAgICogbGlrZSB3aGVuIGFub3RoZXIgaXMgYmVpbmcgcmVjb2duaXplZCBvciBpdCBpcyBkaXNhYmxlZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkgeyB9XG59O1xuXG4vKipcbiAqIGdldCBhIHVzYWJsZSBzdHJpbmcsIHVzZWQgYXMgZXZlbnQgcG9zdGZpeFxuICogQHBhcmFtIHtDb25zdH0gc3RhdGVcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHN0YXRlU3RyKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlICYgU1RBVEVfQ0FOQ0VMTEVEKSB7XG4gICAgICAgIHJldHVybiAnY2FuY2VsJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9DSEFOR0VEKSB7XG4gICAgICAgIHJldHVybiAnbW92ZSc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0JFR0FOKSB7XG4gICAgICAgIHJldHVybiAnc3RhcnQnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogZGlyZWN0aW9uIGNvbnMgdG8gc3RyaW5nXG4gKiBAcGFyYW0ge0NvbnN0fSBkaXJlY3Rpb25cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGRpcmVjdGlvblN0cihkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9ET1dOKSB7XG4gICAgICAgIHJldHVybiAnZG93bic7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX1VQKSB7XG4gICAgICAgIHJldHVybiAndXAnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9MRUZUKSB7XG4gICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX1JJR0hUKSB7XG4gICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogZ2V0IGEgcmVjb2duaXplciBieSBuYW1lIGlmIGl0IGlzIGJvdW5kIHRvIGEgbWFuYWdlclxuICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gb3RoZXJSZWNvZ25pemVyXG4gKiBAcGFyYW0ge1JlY29nbml6ZXJ9IHJlY29nbml6ZXJcbiAqIEByZXR1cm5zIHtSZWNvZ25pemVyfVxuICovXG5mdW5jdGlvbiBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgcmVjb2duaXplcikge1xuICAgIHZhciBtYW5hZ2VyID0gcmVjb2duaXplci5tYW5hZ2VyO1xuICAgIGlmIChtYW5hZ2VyKSB7XG4gICAgICAgIHJldHVybiBtYW5hZ2VyLmdldChvdGhlclJlY29nbml6ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gb3RoZXJSZWNvZ25pemVyO1xufVxuXG4vKipcbiAqIFRoaXMgcmVjb2duaXplciBpcyBqdXN0IHVzZWQgYXMgYSBiYXNlIGZvciB0aGUgc2ltcGxlIGF0dHJpYnV0ZSByZWNvZ25pemVycy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBBdHRyUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoQXR0clJlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDFcbiAgICAgICAgICovXG4gICAgICAgIHBvaW50ZXJzOiAxXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gY2hlY2sgaWYgaXQgdGhlIHJlY29nbml6ZXIgcmVjZWl2ZXMgdmFsaWQgaW5wdXQsIGxpa2UgaW5wdXQuZGlzdGFuY2UgPiAxMC5cbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gcmVjb2duaXplZFxuICAgICAqL1xuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9uUG9pbnRlcnMgPSB0aGlzLm9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHJldHVybiBvcHRpb25Qb2ludGVycyA9PT0gMCB8fCBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvblBvaW50ZXJzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzIHRoZSBpbnB1dCBhbmQgcmV0dXJuIHRoZSBzdGF0ZSBmb3IgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7Kn0gU3RhdGVcbiAgICAgKi9cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gaW5wdXQuZXZlbnRUeXBlO1xuXG4gICAgICAgIHZhciBpc1JlY29nbml6ZWQgPSBzdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQpO1xuICAgICAgICB2YXIgaXNWYWxpZCA9IHRoaXMuYXR0clRlc3QoaW5wdXQpO1xuXG4gICAgICAgIC8vIG9uIGNhbmNlbCBpbnB1dCBhbmQgd2UndmUgcmVjb2duaXplZCBiZWZvcmUsIHJldHVybiBTVEFURV9DQU5DRUxMRURcbiAgICAgICAgaWYgKGlzUmVjb2duaXplZCAmJiAoZXZlbnRUeXBlICYgSU5QVVRfQ0FOQ0VMIHx8ICFpc1ZhbGlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfQ0FOQ0VMTEVEO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUmVjb2duaXplZCB8fCBpc1ZhbGlkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfRU5ERUQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEoc3RhdGUgJiBTVEFURV9CRUdBTikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DSEFOR0VEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUGFuXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBhbmQgbW92ZWQgaW4gdGhlIGFsbG93ZWQgZGlyZWN0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQYW5SZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBYID0gbnVsbDtcbiAgICB0aGlzLnBZID0gbnVsbDtcbn1cblxuaW5oZXJpdChQYW5SZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGFuUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGFuJyxcbiAgICAgICAgdGhyZXNob2xkOiAxMCxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0FMTFxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChUT1VDSF9BQ1RJT05fUEFOX1kpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChUT1VDSF9BQ1RJT05fUEFOX1gpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25zO1xuICAgIH0sXG5cbiAgICBkaXJlY3Rpb25UZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdmFyIGhhc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gaW5wdXQuZGlzdGFuY2U7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbnB1dC5kaXJlY3Rpb247XG4gICAgICAgIHZhciB4ID0gaW5wdXQuZGVsdGFYO1xuICAgICAgICB2YXIgeSA9IGlucHV0LmRlbHRhWTtcblxuICAgICAgICAvLyBsb2NrIHRvIGF4aXM/XG4gICAgICAgIGlmICghKGRpcmVjdGlvbiAmIG9wdGlvbnMuZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoeCA9PT0gMCkgPyBESVJFQ1RJT05fTk9ORSA6ICh4IDwgMCkgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcbiAgICAgICAgICAgICAgICBoYXNNb3ZlZCA9IHggIT0gdGhpcy5wWDtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGlucHV0LmRlbHRhWCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICh5ID09PSAwKSA/IERJUkVDVElPTl9OT05FIDogKHkgPCAwKSA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xuICAgICAgICAgICAgICAgIGhhc01vdmVkID0geSAhPSB0aGlzLnBZO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoaW5wdXQuZGVsdGFZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbnB1dC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHJldHVybiBoYXNNb3ZlZCAmJiBkaXN0YW5jZSA+IG9wdGlvbnMudGhyZXNob2xkICYmIGRpcmVjdGlvbiAmIG9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIEF0dHJSZWNvZ25pemVyLnByb3RvdHlwZS5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTiB8fCAoISh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pICYmIHRoaXMuZGlyZWN0aW9uVGVzdChpbnB1dCkpKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcblxuICAgICAgICB0aGlzLnBYID0gaW5wdXQuZGVsdGFYO1xuICAgICAgICB0aGlzLnBZID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQuZGlyZWN0aW9uKTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQaW5jaFxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXJzIGFyZSBtb3ZpbmcgdG93YXJkICh6b29tLWluKSBvciBhd2F5IGZyb20gZWFjaCBvdGhlciAoem9vbS1vdXQpLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQaW5jaFJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChQaW5jaFJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3BpbmNoJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQuc2NhbGUgLSAxKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHwgdGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LnNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgICB2YXIgaW5PdXQgPSBpbnB1dC5zY2FsZSA8IDEgPyAnaW4nIDogJ291dCc7XG4gICAgICAgICAgICBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBpbk91dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFByZXNzXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBmb3IgeCBtcyB3aXRob3V0IGFueSBtb3ZlbWVudC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQcmVzc1JlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbn1cblxuaW5oZXJpdChQcmVzc1JlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFByZXNzUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncHJlc3MnLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgdGltZTogMjUxLCAvLyBtaW5pbWFsIHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgcHJlc3NlZFxuICAgICAgICB0aHJlc2hvbGQ6IDkgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9BVVRPXTtcbiAgICB9LFxuXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHZhciB2YWxpZFBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICB2YXIgdmFsaWRNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgb3B0aW9ucy50aHJlc2hvbGQ7XG4gICAgICAgIHZhciB2YWxpZFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPiBvcHRpb25zLnRpbWU7XG5cbiAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcblxuICAgICAgICAvLyB3ZSBvbmx5IGFsbG93IGxpdHRsZSBtb3ZlbWVudFxuICAgICAgICAvLyBhbmQgd2UndmUgcmVhY2hlZCBhbiBlbmQgZXZlbnQsIHNvIGEgdGFwIGlzIHBvc3NpYmxlXG4gICAgICAgIGlmICghdmFsaWRNb3ZlbWVudCB8fCAhdmFsaWRQb2ludGVycyB8fCAoaW5wdXQuZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgIXZhbGlkVGltZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBTVEFURV9SRUNPR05JWkVEKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQgJiYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCArICd1cCcsIGlucHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBSb3RhdGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0d28gb3IgbW9yZSBwb2ludGVyIGFyZSBtb3ZpbmcgaW4gYSBjaXJjdWxhciBtb3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFJvdGF0ZVJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChSb3RhdGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUm90YXRlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncm90YXRlJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQucm90YXRpb24pID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCB8fCB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFN3aXBlXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgbW92aW5nIGZhc3QgKHZlbG9jaXR5KSwgd2l0aCBlbm91Z2ggZGlzdGFuY2UgaW4gdGhlIGFsbG93ZWQgZGlyZWN0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBTd2lwZVJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChTd2lwZVJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBTd2lwZVJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3N3aXBlJyxcbiAgICAgICAgdGhyZXNob2xkOiAxMCxcbiAgICAgICAgdmVsb2NpdHk6IDAuMyxcbiAgICAgICAgZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTCxcbiAgICAgICAgcG9pbnRlcnM6IDFcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUGFuUmVjb2duaXplci5wcm90b3R5cGUuZ2V0VG91Y2hBY3Rpb24uY2FsbCh0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgdmVsb2NpdHk7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIChESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIGRpcmVjdGlvbiAmIGlucHV0Lm9mZnNldERpcmVjdGlvbiAmJlxuICAgICAgICAgICAgaW5wdXQuZGlzdGFuY2UgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkICYmXG4gICAgICAgICAgICBpbnB1dC5tYXhQb2ludGVycyA9PSB0aGlzLm9wdGlvbnMucG9pbnRlcnMgJiZcbiAgICAgICAgICAgIGFicyh2ZWxvY2l0eSkgPiB0aGlzLm9wdGlvbnMudmVsb2NpdHkgJiYgaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gZGlyZWN0aW9uU3RyKGlucHV0Lm9mZnNldERpcmVjdGlvbik7XG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCArIGRpcmVjdGlvbiwgaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQSB0YXAgaXMgZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG9pbmcgYSBzbWFsbCB0YXAvY2xpY2suIE11bHRpcGxlIHRhcHMgYXJlIHJlY29nbml6ZWQgaWYgdGhleSBvY2N1clxuICogYmV0d2VlbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwgYW5kIHBvc2l0aW9uLiBUaGUgZGVsYXkgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIHJlY29nbml6ZSBtdWx0aS10YXBzIHdpdGhvdXQgZmlyaW5nXG4gKiBhIHNpbmdsZSB0YXAuXG4gKlxuICogVGhlIGV2ZW50RGF0YSBmcm9tIHRoZSBlbWl0dGVkIGV2ZW50IGNvbnRhaW5zIHRoZSBwcm9wZXJ0eSBgdGFwQ291bnRgLCB3aGljaCBjb250YWlucyB0aGUgYW1vdW50IG9mXG4gKiBtdWx0aS10YXBzIGJlaW5nIHJlY29nbml6ZWQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gVGFwUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBwcmV2aW91cyB0aW1lIGFuZCBjZW50ZXIsXG4gICAgLy8gdXNlZCBmb3IgdGFwIGNvdW50aW5nXG4gICAgdGhpcy5wVGltZSA9IGZhbHNlO1xuICAgIHRoaXMucENlbnRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbiAgICB0aGlzLmNvdW50ID0gMDtcbn1cblxuaW5oZXJpdChUYXBSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3RhcCcsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICB0YXBzOiAxLFxuICAgICAgICBpbnRlcnZhbDogMzAwLCAvLyBtYXggdGltZSBiZXR3ZWVuIHRoZSBtdWx0aS10YXAgdGFwc1xuICAgICAgICB0aW1lOiAyNTAsIC8vIG1heCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIGRvd24gKGxpa2UgZmluZ2VyIG9uIHRoZSBzY3JlZW4pXG4gICAgICAgIHRocmVzaG9sZDogOSwgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICAgICAgcG9zVGhyZXNob2xkOiAxMCAvLyBhIG11bHRpLXRhcCBjYW4gYmUgYSBiaXQgb2ZmIHRoZSBpbml0aWFsIHBvc2l0aW9uXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OXTtcbiAgICB9LFxuXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcblxuICAgICAgICBpZiAoKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSAmJiAodGhpcy5jb3VudCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZSBvbmx5IGFsbG93IGxpdHRsZSBtb3ZlbWVudFxuICAgICAgICAvLyBhbmQgd2UndmUgcmVhY2hlZCBhbiBlbmQgZXZlbnQsIHNvIGEgdGFwIGlzIHBvc3NpYmxlXG4gICAgICAgIGlmICh2YWxpZE1vdmVtZW50ICYmIHZhbGlkVG91Y2hUaW1lICYmIHZhbGlkUG9pbnRlcnMpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC5ldmVudFR5cGUgIT0gSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHZhbGlkSW50ZXJ2YWwgPSB0aGlzLnBUaW1lID8gKGlucHV0LnRpbWVTdGFtcCAtIHRoaXMucFRpbWUgPCBvcHRpb25zLmludGVydmFsKSA6IHRydWU7XG4gICAgICAgICAgICB2YXIgdmFsaWRNdWx0aVRhcCA9ICF0aGlzLnBDZW50ZXIgfHwgZ2V0RGlzdGFuY2UodGhpcy5wQ2VudGVyLCBpbnB1dC5jZW50ZXIpIDwgb3B0aW9ucy5wb3NUaHJlc2hvbGQ7XG5cbiAgICAgICAgICAgIHRoaXMucFRpbWUgPSBpbnB1dC50aW1lU3RhbXA7XG4gICAgICAgICAgICB0aGlzLnBDZW50ZXIgPSBpbnB1dC5jZW50ZXI7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRNdWx0aVRhcCB8fCAhdmFsaWRJbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgICAgIC8vIGlmIHRhcCBjb3VudCBtYXRjaGVzIHdlIGhhdmUgcmVjb2duaXplZCBpdCxcbiAgICAgICAgICAgIC8vIGVsc2UgaXQgaGFzIGJlZ2FuIHJlY29nbml6aW5nLi4uXG4gICAgICAgICAgICB2YXIgdGFwQ291bnQgPSB0aGlzLmNvdW50ICUgb3B0aW9ucy50YXBzO1xuICAgICAgICAgICAgaWYgKHRhcENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gZmFpbGluZyByZXF1aXJlbWVudHMsIGltbWVkaWF0ZWx5IHRyaWdnZXIgdGhlIHRhcCBldmVudFxuICAgICAgICAgICAgICAgIC8vIG9yIHdhaXQgYXMgbG9uZyBhcyB0aGUgbXVsdGl0YXAgaW50ZXJ2YWwgdG8gdHJpZ2dlclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNSZXF1aXJlRmFpbHVyZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgb3B0aW9ucy5pbnRlcnZhbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgZmFpbFRpbWVvdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zLmludGVydmFsLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGFwQ291bnQgPSB0aGlzLmNvdW50O1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBTaW1wbGUgd2F5IHRvIGNyZWF0ZSBhIG1hbmFnZXIgd2l0aCBhIGRlZmF1bHQgc2V0IG9mIHJlY29nbml6ZXJzLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEhhbW1lcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5yZWNvZ25pemVycyA9IGlmVW5kZWZpbmVkKG9wdGlvbnMucmVjb2duaXplcnMsIEhhbW1lci5kZWZhdWx0cy5wcmVzZXQpO1xuICAgIHJldHVybiBuZXcgTWFuYWdlcihlbGVtZW50LCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBAY29uc3Qge3N0cmluZ31cbiAqL1xuSGFtbWVyLlZFUlNJT04gPSAnMi4wLjcnO1xuXG4vKipcbiAqIGRlZmF1bHQgc2V0dGluZ3NcbiAqIEBuYW1lc3BhY2VcbiAqL1xuSGFtbWVyLmRlZmF1bHRzID0ge1xuICAgIC8qKlxuICAgICAqIHNldCBpZiBET00gZXZlbnRzIGFyZSBiZWluZyB0cmlnZ2VyZWQuXG4gICAgICogQnV0IHRoaXMgaXMgc2xvd2VyIGFuZCB1bnVzZWQgYnkgc2ltcGxlIGltcGxlbWVudGF0aW9ucywgc28gZGlzYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGRvbUV2ZW50czogZmFsc2UsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgZm9yIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eS9mYWxsYmFjay5cbiAgICAgKiBXaGVuIHNldCB0byBgY29tcHV0ZWAgaXQgd2lsbCBtYWdpY2FsbHkgc2V0IHRoZSBjb3JyZWN0IHZhbHVlIGJhc2VkIG9uIHRoZSBhZGRlZCByZWNvZ25pemVycy5cbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IGNvbXB1dGVcbiAgICAgKi9cbiAgICB0b3VjaEFjdGlvbjogVE9VQ0hfQUNUSU9OX0NPTVBVVEUsXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgZW5hYmxlOiB0cnVlLFxuXG4gICAgLyoqXG4gICAgICogRVhQRVJJTUVOVEFMIEZFQVRVUkUgLS0gY2FuIGJlIHJlbW92ZWQvY2hhbmdlZFxuICAgICAqIENoYW5nZSB0aGUgcGFyZW50IGlucHV0IHRhcmdldCBlbGVtZW50LlxuICAgICAqIElmIE51bGwsIHRoZW4gaXQgaXMgYmVpbmcgc2V0IHRoZSB0byBtYWluIGVsZW1lbnQuXG4gICAgICogQHR5cGUge051bGx8RXZlbnRUYXJnZXR9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGlucHV0VGFyZ2V0OiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogZm9yY2UgYW4gaW5wdXQgY2xhc3NcbiAgICAgKiBAdHlwZSB7TnVsbHxGdW5jdGlvbn1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgaW5wdXRDbGFzczogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcmVjb2duaXplciBzZXR1cCB3aGVuIGNhbGxpbmcgYEhhbW1lcigpYFxuICAgICAqIFdoZW4gY3JlYXRpbmcgYSBuZXcgTWFuYWdlciB0aGVzZSB3aWxsIGJlIHNraXBwZWQuXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHByZXNldDogW1xuICAgICAgICAvLyBSZWNvZ25pemVyQ2xhc3MsIG9wdGlvbnMsIFtyZWNvZ25pemVXaXRoLCAuLi5dLCBbcmVxdWlyZUZhaWx1cmUsIC4uLl1cbiAgICAgICAgW1JvdGF0ZVJlY29nbml6ZXIsIHtlbmFibGU6IGZhbHNlfV0sXG4gICAgICAgIFtQaW5jaFJlY29nbml6ZXIsIHtlbmFibGU6IGZhbHNlfSwgWydyb3RhdGUnXV0sXG4gICAgICAgIFtTd2lwZVJlY29nbml6ZXIsIHtkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMfV0sXG4gICAgICAgIFtQYW5SZWNvZ25pemVyLCB7ZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTH0sIFsnc3dpcGUnXV0sXG4gICAgICAgIFtUYXBSZWNvZ25pemVyXSxcbiAgICAgICAgW1RhcFJlY29nbml6ZXIsIHtldmVudDogJ2RvdWJsZXRhcCcsIHRhcHM6IDJ9LCBbJ3RhcCddXSxcbiAgICAgICAgW1ByZXNzUmVjb2duaXplcl1cbiAgICBdLFxuXG4gICAgLyoqXG4gICAgICogU29tZSBDU1MgcHJvcGVydGllcyBjYW4gYmUgdXNlZCB0byBpbXByb3ZlIHRoZSB3b3JraW5nIG9mIEhhbW1lci5cbiAgICAgKiBBZGQgdGhlbSB0byB0aGlzIG1ldGhvZCBhbmQgdGhleSB3aWxsIGJlIHNldCB3aGVuIGNyZWF0aW5nIGEgbmV3IE1hbmFnZXIuXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqL1xuICAgIGNzc1Byb3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlcyB0ZXh0IHNlbGVjdGlvbiB0byBpbXByb3ZlIHRoZSBkcmFnZ2luZyBnZXN0dXJlLiBNYWlubHkgZm9yIGRlc2t0b3AgYnJvd3NlcnMuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlIHRoZSBXaW5kb3dzIFBob25lIGdyaXBwZXJzIHdoZW4gcHJlc3NpbmcgYW4gZWxlbWVudC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB0b3VjaFNlbGVjdDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlcyB0aGUgZGVmYXVsdCBjYWxsb3V0IHNob3duIHdoZW4geW91IHRvdWNoIGFuZCBob2xkIGEgdG91Y2ggdGFyZ2V0LlxuICAgICAgICAgKiBPbiBpT1MsIHdoZW4geW91IHRvdWNoIGFuZCBob2xkIGEgdG91Y2ggdGFyZ2V0IHN1Y2ggYXMgYSBsaW5rLCBTYWZhcmkgZGlzcGxheXNcbiAgICAgICAgICogYSBjYWxsb3V0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGxpbmsuIFRoaXMgcHJvcGVydHkgYWxsb3dzIHlvdSB0byBkaXNhYmxlIHRoYXQgY2FsbG91dC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB0b3VjaENhbGxvdXQ6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmaWVzIHdoZXRoZXIgem9vbWluZyBpcyBlbmFibGVkLiBVc2VkIGJ5IElFMTA+XG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgY29udGVudFpvb21pbmc6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmaWVzIHRoYXQgYW4gZW50aXJlIGVsZW1lbnQgc2hvdWxkIGJlIGRyYWdnYWJsZSBpbnN0ZWFkIG9mIGl0cyBjb250ZW50cy4gTWFpbmx5IGZvciBkZXNrdG9wIGJyb3dzZXJzLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJEcmFnOiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE92ZXJyaWRlcyB0aGUgaGlnaGxpZ2h0IGNvbG9yIHNob3duIHdoZW4gdGhlIHVzZXIgdGFwcyBhIGxpbmsgb3IgYSBKYXZhU2NyaXB0XG4gICAgICAgICAqIGNsaWNrYWJsZSBlbGVtZW50IGluIGlPUy4gVGhpcyBwcm9wZXJ0eSBvYmV5cyB0aGUgYWxwaGEgdmFsdWUsIGlmIHNwZWNpZmllZC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ3JnYmEoMCwwLDAsMCknXG4gICAgICAgICAqL1xuICAgICAgICB0YXBIaWdobGlnaHRDb2xvcjogJ3JnYmEoMCwwLDAsMCknXG4gICAgfVxufTtcblxudmFyIFNUT1AgPSAxO1xudmFyIEZPUkNFRF9TVE9QID0gMjtcblxuLyoqXG4gKiBNYW5hZ2VyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTWFuYWdlcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCBIYW1tZXIuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0ID0gdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0IHx8IGVsZW1lbnQ7XG5cbiAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgdGhpcy5yZWNvZ25pemVycyA9IFtdO1xuICAgIHRoaXMub2xkQ3NzUHJvcHMgPSB7fTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5pbnB1dCA9IGNyZWF0ZUlucHV0SW5zdGFuY2UodGhpcyk7XG4gICAgdGhpcy50b3VjaEFjdGlvbiA9IG5ldyBUb3VjaEFjdGlvbih0aGlzLCB0aGlzLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuXG4gICAgdG9nZ2xlQ3NzUHJvcHModGhpcywgdHJ1ZSk7XG5cbiAgICBlYWNoKHRoaXMub3B0aW9ucy5yZWNvZ25pemVycywgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB2YXIgcmVjb2duaXplciA9IHRoaXMuYWRkKG5ldyAoaXRlbVswXSkoaXRlbVsxXSkpO1xuICAgICAgICBpdGVtWzJdICYmIHJlY29nbml6ZXIucmVjb2duaXplV2l0aChpdGVtWzJdKTtcbiAgICAgICAgaXRlbVszXSAmJiByZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKGl0ZW1bM10pO1xuICAgIH0sIHRoaXMpO1xufVxuXG5NYW5hZ2VyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIE9wdGlvbnMgdGhhdCBuZWVkIGEgbGl0dGxlIG1vcmUgc2V0dXBcbiAgICAgICAgaWYgKG9wdGlvbnMudG91Y2hBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaW5wdXRUYXJnZXQpIHtcbiAgICAgICAgICAgIC8vIENsZWFuIHVwIGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVycyBhbmQgcmVpbml0aWFsaXplXG4gICAgICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudGFyZ2V0ID0gb3B0aW9ucy5pbnB1dFRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBzdG9wIHJlY29nbml6aW5nIGZvciB0aGlzIHNlc3Npb24uXG4gICAgICogVGhpcyBzZXNzaW9uIHdpbGwgYmUgZGlzY2FyZGVkLCB3aGVuIGEgbmV3IFtpbnB1dF1zdGFydCBldmVudCBpcyBmaXJlZC5cbiAgICAgKiBXaGVuIGZvcmNlZCwgdGhlIHJlY29nbml6ZXIgY3ljbGUgaXMgc3RvcHBlZCBpbW1lZGlhdGVseS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZV1cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbihmb3JjZSkge1xuICAgICAgICB0aGlzLnNlc3Npb24uc3RvcHBlZCA9IGZvcmNlID8gRk9SQ0VEX1NUT1AgOiBTVE9QO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBydW4gdGhlIHJlY29nbml6ZXJzIVxuICAgICAqIGNhbGxlZCBieSB0aGUgaW5wdXRIYW5kbGVyIGZ1bmN0aW9uIG9uIGV2ZXJ5IG1vdmVtZW50IG9mIHRoZSBwb2ludGVycyAodG91Y2hlcylcbiAgICAgKiBpdCB3YWxrcyB0aHJvdWdoIGFsbCB0aGUgcmVjb2duaXplcnMgYW5kIHRyaWVzIHRvIGRldGVjdCB0aGUgZ2VzdHVyZSB0aGF0IGlzIGJlaW5nIG1hZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplOiBmdW5jdGlvbihpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLnNlc3Npb247XG4gICAgICAgIGlmIChzZXNzaW9uLnN0b3BwZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJ1biB0aGUgdG91Y2gtYWN0aW9uIHBvbHlmaWxsXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24ucHJldmVudERlZmF1bHRzKGlucHV0RGF0YSk7XG5cbiAgICAgICAgdmFyIHJlY29nbml6ZXI7XG4gICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG5cbiAgICAgICAgLy8gdGhpcyBob2xkcyB0aGUgcmVjb2duaXplciB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgIC8vIHNvIHRoZSByZWNvZ25pemVyJ3Mgc3RhdGUgbmVlZHMgdG8gYmUgQkVHQU4sIENIQU5HRUQsIEVOREVEIG9yIFJFQ09HTklaRURcbiAgICAgICAgLy8gaWYgbm8gcmVjb2duaXplciBpcyBkZXRlY3RpbmcgYSB0aGluZywgaXQgaXMgc2V0IHRvIGBudWxsYFxuICAgICAgICB2YXIgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplcjtcblxuICAgICAgICAvLyByZXNldCB3aGVuIHRoZSBsYXN0IHJlY29nbml6ZXIgaXMgcmVjb2duaXplZFxuICAgICAgICAvLyBvciB3aGVuIHdlJ3JlIGluIGEgbmV3IHNlc3Npb25cbiAgICAgICAgaWYgKCFjdXJSZWNvZ25pemVyIHx8IChjdXJSZWNvZ25pemVyICYmIGN1clJlY29nbml6ZXIuc3RhdGUgJiBTVEFURV9SRUNPR05JWkVEKSkge1xuICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgcmVjb2duaXplcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZWNvZ25pemVyID0gcmVjb2duaXplcnNbaV07XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3V0IGlmIHdlIGFyZSBhbGxvd2VkIHRyeSB0byByZWNvZ25pemUgdGhlIGlucHV0IGZvciB0aGlzIG9uZS5cbiAgICAgICAgICAgIC8vIDEuICAgYWxsb3cgaWYgdGhlIHNlc3Npb24gaXMgTk9UIGZvcmNlZCBzdG9wcGVkIChzZWUgdGhlIC5zdG9wKCkgbWV0aG9kKVxuICAgICAgICAgICAgLy8gMi4gICBhbGxvdyBpZiB3ZSBzdGlsbCBoYXZlbid0IHJlY29nbml6ZWQgYSBnZXN0dXJlIGluIHRoaXMgc2Vzc2lvbiwgb3IgdGhlIHRoaXMgcmVjb2duaXplciBpcyB0aGUgb25lXG4gICAgICAgICAgICAvLyAgICAgIHRoYXQgaXMgYmVpbmcgcmVjb2duaXplZC5cbiAgICAgICAgICAgIC8vIDMuICAgYWxsb3cgaWYgdGhlIHJlY29nbml6ZXIgaXMgYWxsb3dlZCB0byBydW4gc2ltdWx0YW5lb3VzIHdpdGggdGhlIGN1cnJlbnQgcmVjb2duaXplZCByZWNvZ25pemVyLlxuICAgICAgICAgICAgLy8gICAgICB0aGlzIGNhbiBiZSBzZXR1cCB3aXRoIHRoZSBgcmVjb2duaXplV2l0aCgpYCBtZXRob2Qgb24gdGhlIHJlY29nbml6ZXIuXG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5zdG9wcGVkICE9PSBGT1JDRURfU1RPUCAmJiAoIC8vIDFcbiAgICAgICAgICAgICAgICAgICAgIWN1clJlY29nbml6ZXIgfHwgcmVjb2duaXplciA9PSBjdXJSZWNvZ25pemVyIHx8IC8vIDJcbiAgICAgICAgICAgICAgICAgICAgcmVjb2duaXplci5jYW5SZWNvZ25pemVXaXRoKGN1clJlY29nbml6ZXIpKSkgeyAvLyAzXG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZWNvZ25pemUoaW5wdXREYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZXNldCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGUgcmVjb2duaXplciBoYXMgYmVlbiByZWNvZ25pemluZyB0aGUgaW5wdXQgYXMgYSB2YWxpZCBnZXN0dXJlLCB3ZSB3YW50IHRvIHN0b3JlIHRoaXMgb25lIGFzIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBhY3RpdmUgcmVjb2duaXplci4gYnV0IG9ubHkgaWYgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIGFuIGFjdGl2ZSByZWNvZ25pemVyXG4gICAgICAgICAgICBpZiAoIWN1clJlY29nbml6ZXIgJiYgcmVjb2duaXplci5zdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRCkpIHtcbiAgICAgICAgICAgICAgICBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyID0gcmVjb2duaXplcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBnZXQgYSByZWNvZ25pemVyIGJ5IGl0cyBldmVudCBuYW1lLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcnxOdWxsfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAocmVjb2duaXplciBpbnN0YW5jZW9mIFJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWNvZ25pemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlY29nbml6ZXJzW2ldLm9wdGlvbnMuZXZlbnQgPT0gcmVjb2duaXplcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWNvZ25pemVyc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYWRkIGEgcmVjb2duaXplciB0byB0aGUgbWFuYWdlclxuICAgICAqIGV4aXN0aW5nIHJlY29nbml6ZXJzIHdpdGggdGhlIHNhbWUgZXZlbnQgbmFtZSB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcnxNYW5hZ2VyfVxuICAgICAqL1xuICAgIGFkZDogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcocmVjb2duaXplciwgJ2FkZCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBleGlzdGluZ1xuICAgICAgICB2YXIgZXhpc3RpbmcgPSB0aGlzLmdldChyZWNvZ25pemVyLm9wdGlvbnMuZXZlbnQpO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGV4aXN0aW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVjb2duaXplcnMucHVzaChyZWNvZ25pemVyKTtcbiAgICAgICAgcmVjb2duaXplci5tYW5hZ2VyID0gdGhpcztcblxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGEgcmVjb2duaXplciBieSBuYW1lIG9yIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtNYW5hZ2VyfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcocmVjb2duaXplciwgJ3JlbW92ZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY29nbml6ZXIgPSB0aGlzLmdldChyZWNvZ25pemVyKTtcblxuICAgICAgICAvLyBsZXQncyBtYWtlIHN1cmUgdGhpcyByZWNvZ25pemVyIGV4aXN0c1xuICAgICAgICBpZiAocmVjb2duaXplcikge1xuICAgICAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGluQXJyYXkocmVjb2duaXplcnMsIHJlY29nbml6ZXIpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVjb2duaXplcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvbjogZnVuY3Rpb24oZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIGVhY2goc3BsaXRTdHIoZXZlbnRzKSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XSA9IGhhbmRsZXJzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XS5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCBldmVudCwgbGVhdmUgZW1pdCBibGFuayB0byByZW1vdmUgYWxsIGhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtoYW5kbGVyXVxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvZmY6IGZ1bmN0aW9uKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIGVhY2goc3BsaXRTdHIoZXZlbnRzKSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBoYW5kbGVyc1tldmVudF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XSAmJiBoYW5kbGVyc1tldmVudF0uc3BsaWNlKGluQXJyYXkoaGFuZGxlcnNbZXZlbnRdLCBoYW5kbGVyKSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZW1pdCBldmVudCB0byB0aGUgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBlbWl0OiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gdHJpZ2dlciBkb20gZXZlbnRzXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG9tRXZlbnRzKSB7XG4gICAgICAgICAgICB0cmlnZ2VyRG9tRXZlbnQoZXZlbnQsIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm8gaGFuZGxlcnMsIHNvIHNraXAgaXQgYWxsXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNbZXZlbnRdICYmIHRoaXMuaGFuZGxlcnNbZXZlbnRdLnNsaWNlKCk7XG4gICAgICAgIGlmICghaGFuZGxlcnMgfHwgIWhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS50eXBlID0gZXZlbnQ7XG4gICAgICAgIGRhdGEucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRhdGEuc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tpXShkYXRhKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXN0cm95IHRoZSBtYW5hZ2VyIGFuZCB1bmJpbmRzIGFsbCBldmVudHNcbiAgICAgKiBpdCBkb2Vzbid0IHVuYmluZCBkb20gZXZlbnRzLCB0aGF0IGlzIHRoZSB1c2VyIG93biByZXNwb25zaWJpbGl0eVxuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgJiYgdG9nZ2xlQ3NzUHJvcHModGhpcywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogYWRkL3JlbW92ZSB0aGUgY3NzIHByb3BlcnRpZXMgYXMgZGVmaW5lZCBpbiBtYW5hZ2VyLm9wdGlvbnMuY3NzUHJvcHNcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtCb29sZWFufSBhZGRcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlQ3NzUHJvcHMobWFuYWdlciwgYWRkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgaWYgKCFlbGVtZW50LnN0eWxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHByb3A7XG4gICAgZWFjaChtYW5hZ2VyLm9wdGlvbnMuY3NzUHJvcHMsIGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHByb3AgPSBwcmVmaXhlZChlbGVtZW50LnN0eWxlLCBuYW1lKTtcbiAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSA9IGVsZW1lbnQuc3R5bGVbcHJvcF07XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSB8fCAnJztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghYWRkKSB7XG4gICAgICAgIG1hbmFnZXIub2xkQ3NzUHJvcHMgPSB7fTtcbiAgICB9XG59XG5cbi8qKlxuICogdHJpZ2dlciBkb20gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqL1xuZnVuY3Rpb24gdHJpZ2dlckRvbUV2ZW50KGV2ZW50LCBkYXRhKSB7XG4gICAgdmFyIGdlc3R1cmVFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGdlc3R1cmVFdmVudC5pbml0RXZlbnQoZXZlbnQsIHRydWUsIHRydWUpO1xuICAgIGdlc3R1cmVFdmVudC5nZXN0dXJlID0gZGF0YTtcbiAgICBkYXRhLnRhcmdldC5kaXNwYXRjaEV2ZW50KGdlc3R1cmVFdmVudCk7XG59XG5cbmFzc2lnbihIYW1tZXIsIHtcbiAgICBJTlBVVF9TVEFSVDogSU5QVVRfU1RBUlQsXG4gICAgSU5QVVRfTU9WRTogSU5QVVRfTU9WRSxcbiAgICBJTlBVVF9FTkQ6IElOUFVUX0VORCxcbiAgICBJTlBVVF9DQU5DRUw6IElOUFVUX0NBTkNFTCxcblxuICAgIFNUQVRFX1BPU1NJQkxFOiBTVEFURV9QT1NTSUJMRSxcbiAgICBTVEFURV9CRUdBTjogU1RBVEVfQkVHQU4sXG4gICAgU1RBVEVfQ0hBTkdFRDogU1RBVEVfQ0hBTkdFRCxcbiAgICBTVEFURV9FTkRFRDogU1RBVEVfRU5ERUQsXG4gICAgU1RBVEVfUkVDT0dOSVpFRDogU1RBVEVfUkVDT0dOSVpFRCxcbiAgICBTVEFURV9DQU5DRUxMRUQ6IFNUQVRFX0NBTkNFTExFRCxcbiAgICBTVEFURV9GQUlMRUQ6IFNUQVRFX0ZBSUxFRCxcblxuICAgIERJUkVDVElPTl9OT05FOiBESVJFQ1RJT05fTk9ORSxcbiAgICBESVJFQ1RJT05fTEVGVDogRElSRUNUSU9OX0xFRlQsXG4gICAgRElSRUNUSU9OX1JJR0hUOiBESVJFQ1RJT05fUklHSFQsXG4gICAgRElSRUNUSU9OX1VQOiBESVJFQ1RJT05fVVAsXG4gICAgRElSRUNUSU9OX0RPV046IERJUkVDVElPTl9ET1dOLFxuICAgIERJUkVDVElPTl9IT1JJWk9OVEFMOiBESVJFQ1RJT05fSE9SSVpPTlRBTCxcbiAgICBESVJFQ1RJT05fVkVSVElDQUw6IERJUkVDVElPTl9WRVJUSUNBTCxcbiAgICBESVJFQ1RJT05fQUxMOiBESVJFQ1RJT05fQUxMLFxuXG4gICAgTWFuYWdlcjogTWFuYWdlcixcbiAgICBJbnB1dDogSW5wdXQsXG4gICAgVG91Y2hBY3Rpb246IFRvdWNoQWN0aW9uLFxuXG4gICAgVG91Y2hJbnB1dDogVG91Y2hJbnB1dCxcbiAgICBNb3VzZUlucHV0OiBNb3VzZUlucHV0LFxuICAgIFBvaW50ZXJFdmVudElucHV0OiBQb2ludGVyRXZlbnRJbnB1dCxcbiAgICBUb3VjaE1vdXNlSW5wdXQ6IFRvdWNoTW91c2VJbnB1dCxcbiAgICBTaW5nbGVUb3VjaElucHV0OiBTaW5nbGVUb3VjaElucHV0LFxuXG4gICAgUmVjb2duaXplcjogUmVjb2duaXplcixcbiAgICBBdHRyUmVjb2duaXplcjogQXR0clJlY29nbml6ZXIsXG4gICAgVGFwOiBUYXBSZWNvZ25pemVyLFxuICAgIFBhbjogUGFuUmVjb2duaXplcixcbiAgICBTd2lwZTogU3dpcGVSZWNvZ25pemVyLFxuICAgIFBpbmNoOiBQaW5jaFJlY29nbml6ZXIsXG4gICAgUm90YXRlOiBSb3RhdGVSZWNvZ25pemVyLFxuICAgIFByZXNzOiBQcmVzc1JlY29nbml6ZXIsXG5cbiAgICBvbjogYWRkRXZlbnRMaXN0ZW5lcnMsXG4gICAgb2ZmOiByZW1vdmVFdmVudExpc3RlbmVycyxcbiAgICBlYWNoOiBlYWNoLFxuICAgIG1lcmdlOiBtZXJnZSxcbiAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBpbmhlcml0OiBpbmhlcml0LFxuICAgIGJpbmRGbjogYmluZEZuLFxuICAgIHByZWZpeGVkOiBwcmVmaXhlZFxufSk7XG5cbi8vIHRoaXMgcHJldmVudHMgZXJyb3JzIHdoZW4gSGFtbWVyIGlzIGxvYWRlZCBpbiB0aGUgcHJlc2VuY2Ugb2YgYW4gQU1EXG4vLyAgc3R5bGUgbG9hZGVyIGJ1dCBieSBzY3JpcHQgdGFnLCBub3QgYnkgdGhlIGxvYWRlci5cbnZhciBmcmVlR2xvYmFsID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB7fSkpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbmZyZWVHbG9iYWwuSGFtbWVyID0gSGFtbWVyO1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gSGFtbWVyO1xuICAgIH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBIYW1tZXI7XG59IGVsc2Uge1xuICAgIHdpbmRvd1tleHBvcnROYW1lXSA9IEhhbW1lcjtcbn1cblxufSkod2luZG93LCBkb2N1bWVudCwgJ0hhbW1lcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2hhbW1lcmpzL2hhbW1lci5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCBNb3ZhYmxlQ29vcmQgZnJvbSBcIi4vbW92YWJsZUNvb3JkXCI7XG5cbm1vZHVsZS5leHBvcnRzID0gTW92YWJsZUNvb3JkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _flicking = __webpack_require__(2);

var _flicking2 = _interopRequireDefault(_flicking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _flicking2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=flicking.pkgd.js.map