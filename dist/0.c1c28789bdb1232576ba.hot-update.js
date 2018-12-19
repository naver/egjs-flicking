webpackHotUpdate(0,{

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external {"commonjs":"@egjs/component","commonjs2":"@egjs/component","amd":"@egjs/component","root":["eg","Component"]}
var component_root_eg_Component_ = __webpack_require__(17);
var component_root_eg_Component_default = /*#__PURE__*/__webpack_require__.n(component_root_eg_Component_);

// EXTERNAL MODULE: external {"commonjs":"@egjs/axes","commonjs2":"@egjs/axes","amd":"@egjs/axes","root":["eg","Axes"]}
var axes_root_eg_Axes_ = __webpack_require__(18);
var axes_root_eg_Axes_default = /*#__PURE__*/__webpack_require__.n(axes_root_eg_Axes_);

// CONCATENATED MODULE: ./src/browser.js
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* eslint-disable no-new-func, no-nested-ternary */
var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {
    document: {},
    navigator: {
      userAgent: ""
    }
  };
} else {
  win = window;
}
/* eslint-enable no-new-func, no-nested-ternary */


var browser_document = win.document;

// CONCATENATED MODULE: ./src/utils.js
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

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
      var match = param.match(/^<([a-z]+)\s*([^>]*)>/); // creating element

      if (match) {
        el = browser_document.createElement(match[1]); // attributes

        match.length === 3 && match[2].split(" ").forEach(function (v) {
          var attr = v.split("=");
          el.setAttribute(attr[0], attr[1].trim().replace(/(^["']|["']$)/g, ""));
        });
      } else {
        el = browser_document.querySelectorAll(param);

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
  toArray: function toArray(el) {
    return [].slice.call(el);
  },

  /**
   * Check if is array
   * @param arr
   * @returns {Boolean}
   */
  isArray: function isArray(arr) {
    return arr && arr.constructor === Array;
  },

  /**
   * Check if is object
   * @param {Object} obj
   * @returns {Boolean}
   */
  isObject: function isObject(obj) {
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
  extend: function extend(target) {
    var _this = this;

    for (var _len = arguments.length, objectN = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      objectN[_key - 1] = arguments[_key];
    }

    if (!objectN.length || objectN.length === 1 && !objectN[0]) {
      return target;
    }

    var source = objectN.shift();

    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(function (key) {
        var value = source[key];

        if (_this.isObject(value)) {
          !target[key] && (target[key] = {});
          target[key] = _this.extend(target[key], value);
        } else {
          target[key] = _this.isArray(value) ? value.concat() : value;
        }
      });
    }

    return this.extend.apply(this, [target].concat(objectN));
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
  css: function css(el, style, getAsNumber) {
    if (typeof style === "string") {
      var value = el.style[style];

      if (!value || value === "auto" || /\d/.test(value) && !/\d(px)?$/.test(value)) {
        value = win.getComputedStyle(el)[style];
      }

      return getAsNumber ? this.getNumValue(value) : value;
    } else {
      var applyStyle = function applyStyle(target, source) {
        return Object.keys(source).forEach(function (v) {
          target[v] = source[v];
        });
      };

      this.isArray(el) ? el.forEach(function (v) {
        return applyStyle(v.style, style);
      }) : applyStyle(el.style, style);
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
  classList: function classList(el, className, add) {
    var isAddParam = typeof add === "boolean";
    var res;

    if (el.classList) {
      res = el.classList[isAddParam && (add ? "add" : "remove") || "contains"](className);
    } else {
      res = el.className;

      if (isAddParam) {
        if (add && res.indexOf(className) === -1) {
          res = el.className = (res + " " + className).replace(/\s{2,}/g, " ");
        } else if (!add) {
          res = el.className = res.replace(className, "");
        }
      } else {
        res = new RegExp("\\b" + className + "\\b").test(res);
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
  getNumValue: function getNumValue(val, defVal) {
    var num = val;
    return isNaN(num = parseFloat(num)) ? defVal : num;
  },

  /**
   * Return unit formatted value
   * @param {Number|String} val
   * @return {String} val Value formatted with unit
   */
  getUnitValue: function getUnitValue(val) {
    var rx = /(?:[a-z]{2,}|%)$/;
    return (parseFloat(val) || 0) + (String(val).match(rx) || "px");
  },

  /**
   * Get element's outer value
   * @param {HTMLElement} el
   * @param {String} type - [outerWidth|outerHeight]
   * @returns {Number} outer's value
   */
  getOuter: function getOuter(el, type) {
    var _this2 = this;

    var paddingMargin = 0;
    (type === "outerWidth" ? ["Left", "Right"] : ["Top", "Bottom"]).forEach(function (dir) {
      ["padding", "margin"].forEach(function (v) {
        paddingMargin += _this2.css(el, "" + v + dir, true);
      });
    });
    return this.css(el, type.replace("outer", "").toLocaleLowerCase(), true) + paddingMargin;
  },

  /**
   * Get element's outerWidth value with margin
   * @param {HTMLElement} el
   * @returns {Number}
   */
  outerWidth: function outerWidth(el) {
    return this.getOuter(el, "outerWidth");
  },

  /**
   * Get element's outerHeight value with margin
   * @param {HTMLElement} el
   * @returns {Number}
   */
  outerHeight: function outerHeight(el) {
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
  translate: function translate(x, y, isHA) {
    return isHA || false ? "translate3d(" + x + "," + y + ",0)" : "translate(" + x + "," + y + ")";
  },
  // 1. user press one position on screen.
  // 2. user moves to the other position on screen.
  // 3. when user releases fingers on screen, 'click' event is fired at previous position.
  hasClickBug: function hasClickBug() {
    var ua = win.navigator.userAgent;
    var result = /iPhone|iPad/.test(ua);

    this.hasClickBug = function () {
      return result;
    };

    return result;
  }
};

var MixinBuilder =
/*#__PURE__*/
function () {
  function MixinBuilder(superclass) {
    this.superclass = superclass ||
    /*#__PURE__*/
    function () {
      function _class() {}

      return _class;
    }();
  }

  var _proto = MixinBuilder.prototype;

  _proto["with"] = function _with() {
    for (var _len2 = arguments.length, mixins = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      mixins[_key2] = arguments[_key2];
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


// CONCATENATED MODULE: ./src/consts.js
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
 // define custom events name

var EVENTS = {
  beforeFlickStart: "beforeFlickStart",
  beforeRestore: "beforeRestore",
  flick: "flick",
  flickEnd: "flickEnd",
  restore: "restore"
}; // check for the transform property

var TRANSFORM = {
  name: "transform"
};

TRANSFORM.support = function () {
  if (!browser_document.documentElement) {
    return false;
  }

  var style = browser_document.documentElement.style;
  return TRANSFORM.name in style || (TRANSFORM.name = "webkitTransform") in style;
}(); // check for will-change support


var SUPPORT_WILLCHANGE = win.CSS && win.CSS.supports && win.CSS.supports("will-change", "transform"); // check for Android 2.x

var IS_ANDROID2 = /Android 2\./.test(win.navigator.userAgent); // data-height attribute's name for adaptiveHeight option

var DATA_HEIGHT = "data-height";

// CONCATENATED MODULE: ./src/config.js
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
// internal config values
var CONFIG = {
  panel: {
    $list: null,
    // panel list
    index: 0,
    // dom index used among process
    no: 0,
    // panel no used among process
    currIndex: 0,
    // current physical dom index
    currNo: 0,
    // current logical panel number
    size: 0,
    // panel size
    count: 0,
    // total physical panel count
    origCount: 0,
    // total count of given original panels
    changed: false,
    // if panel changed
    animating: false,
    // current animating status boolean
    minCount: 3 // minimum panel count

  },
  touch: {
    holdPos: 0,
    // hold x,y coordinate
    destPos: 0,
    // destination x,y coordinate
    distance: 0,
    // touch distance pixel of start to end touch
    direction: null,
    // touch direction
    lastPos: 0,
    // to determine move on holding
    holding: false,
    isTrusted: false // if event was instantiated by user's action explicitly

  },
  customEvent: {
    // for custom events value
    flick: true,
    restore: false,
    restoreCall: false
  },
  dirData: [],
  // direction constant value according horizontal or vertical
  indexToMove: 0,
  $dummyAnchor: null // For buggy link highlighting on Android 2.x

}; // default options

var OPTIONS = {
  hwAccelerable: true,
  // set for hw acceleration (see https://gist.github.com/netil/c1d1b67e1c1926364c0709f110a09b44 for old devices support)
  prefix: "eg-flick",
  // prefix value of class name
  deceleration: 0.0006,
  // deceleration value
  horizontal: true,
  // move direction (true == horizontal, false == vertical)
  circular: false,
  // circular mode. In this mode at least 3 panels are required.
  previewPadding: null,
  // preview padding value in left(up) to right(down) order. In this mode at least 5 panels are required.
  bounce: null,
  // bounce value in left(up) to right(down) order. Works only in non-circular mode.
  threshold: 40,
  // the distance pixel threshold value for change panel
  duration: 100,
  // duration ms for animation
  panelEffect: function panelEffect(x) {
    return 1 - Math.pow(1 - x, 3);
  },
  // easing function for panel change animation
  defaultIndex: 0,
  // initial panel index to be shown
  inputType: [// input type
  "touch", "mouse"],
  thresholdAngle: 45,
  // the threshold value that determines whether user action is horizontal or vertical (0~90)
  adaptiveHeight: false,
  // Set container's height be adaptive according panel's height
  zIndex: 2000,
  // z-index value for container element
  useTranslate: true // use of translate on panel moves

};

// CONCATENATED MODULE: ./src/eventHandler.js
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* harmony default export */ var eventHandler = (function (superclass) {
  return (
    /*#__PURE__*/
    function (_superclass) {
      _inheritsLoose(_class, _superclass);

      function _class() {
        return _superclass.apply(this, arguments) || this;
      }

      var _proto = _class.prototype;

      /**
       * 'hold' event handler
       * @private
       */
      _proto._holdHandler = function _holdHandler(e) {
        var conf = this._conf;
        var touch = conf.touch;
        var holdPos = e.pos.flick;
        touch.holdPos = holdPos;
        touch.holding = true;
        touch.isTrusted = true;
        conf.panel.changed = false;

        this._adjustContainerCss("start", holdPos);
      };
      /**
       * 'change' event handler
       * @private
       */


      _proto._changeHandler = function _changeHandler(e) {
        var conf = this._conf;
        var touch = conf.touch;
        var pos = e.pos.flick;
        var holdPos = touch.holdPos;
        var direction;
        var eventRes = null;
        var movedPx;

        this._setPointerEvents(e); // for "click" bug

        /**
         * An event that occurs whenever the panel's coordinate value changes. It occurs in the following cases.<br><br>1. When the user is inputing the move.<br>2. When moving to the destination panel after you have finished inputing the move in step 1.<br>3. When the current panel is moving to its original position after the movement is finished in step 1.<br>4. Moving to the destination panel by calling the `moveTo()`, `prev()`, `next()`  method. (Do not prevent the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event.)
         * @ko 패널의 좌표값이 변할 때마다 발생하는 이벤트. 아래의 경우에 발생한다.<br><br>1. 사용자가 이동(move) 액션 입력중일 때.<br>2. 1번에서 이동(move) 액션 입력이 끝나고 목적 패널로 이동중일 때.<br>3. 1번에서 이동(move) 액션 입력이 끝나고 현재 패널의 원래 위치로 이동중일 때.<br>4. `moveTo()`, `prev()`, `next()`, 메서드를 호출하여 목적 패널로 이동중일 때. ([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}이벤트의 기본동작을 막지 않아야 한다.)<br>5. `restore()` 메서드를 호출하여 현재 패널이 원래 위치로 이동중일 때. ([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}이벤트의 기본동작 방지 전제.)
         * @name eg.Flicking#flick
         * @event
         * @property {String} eventType The name of the event<ko>이벤트 명</ko>
         * @property {Boolean} isTrusted true when the event was generated by a user action(`"mouse"` or `"touch"`) otherwise false<ko>사용자 액션(`"mouse"` 또는 `"touch"`)에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`</ko>
         * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
         * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
         * @property {Number} pos current coordinate <ko>현재 좌표.</ko>
         * @property {Boolean} holding Whether the user is inputing through the input device. (Whether it is 'mousedown' for a mouse device or 'touchmove' for a touch device.)<ko>사용자가 입력 장치를 통해 입력중인지 여부. (마우스 장치라면 'mousedown' 여부, 터치 장치라면 'touchmove' 여부)</ko>
         * @property {Number} distance Distance value from the touch starting point. If the `direction` property value is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_UP}, it returns a positive number. {@link eg.Flicking.DIRECTION_RIGHT} or {@link eg.Flicking.DIRECTION_DOWN} returns a negative value.<ko>터치 시작점으로부터 이동한 거리 값. `direction`속성값이 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_UP}이면 양수를, {@link eg.Flicking.DIRECTION_RIGHT} 혹은 {@link eg.Flicking.DIRECTION_DOWN}이면 음수를 반환한다.</ko>
         * @see eg.Flicking#event:beforeRestore
         * @see eg.Flicking#restore
         * @see eg.Flicking#event:beforeFlickStart
         * @see eg.Flicking#event:flickEnd
         * @see eg.Flicking#moveTo
         * @see eg.Flicking#prev
         * @see eg.Flicking#next
         * @example
        	 * The order of event occurrence.
        	 * 이벤트 발생 순서
        	 * ```javascript
        	 * // When moving to the destination panel.
        	 * // 목적 패널로 이동할 때.
        	 * beforeFlickStart (once) > flick (many times) > flickEnd (once)
        	 *
        	 * // When the restore operation.
        	 * // 복원 동작일 때.
        	 * beforeRestore (once) > flick (many times) > restore (once)
        	 * ```
         */


        if (e.inputEvent) {
          direction = e.inputEvent.direction; // Adjust direction in case of diagonal touch move

          movedPx = e.inputEvent[this.options.horizontal ? "deltaX" : "deltaY"];

          if (!~conf.dirData.indexOf(direction)) {
            direction = conf.dirData[+(Math.abs(touch.lastPos) <= movedPx)];
          }

          touch.lastPos = movedPx;
        } else {
          touch.lastPos = null;
        }

        conf.customEvent.flick && (eventRes = this._triggerEvent(EVENTS.flick, {
          pos: pos,
          holding: e.holding,
          direction: direction || touch.direction,
          distance: touch.isTrusted ? pos - holdPos : null
        }));
        (eventRes || eventRes === null) && this._setTranslate([-pos, 0]);
      };
      /**
       * 'release' event handler
       * @private
       */


      _proto._releaseHandler = function _releaseHandler(e) {
        var conf = this._conf;
        var touch = conf.touch;
        var holdPos = touch.holdPos;
        var panelSize = conf.panel.size;
        var customEvent = conf.customEvent;
        var isPlusMove = touch.holdPos < e.depaPos.flick;
        touch.distance = e.depaPos.flick - holdPos;
        touch.direction = conf.dirData[+!isPlusMove];
        touch.destPos = holdPos + (isPlusMove ? panelSize : -panelSize);
        var distance = touch.distance;
        var duration = this.options.duration;
        var moveTo = holdPos;

        if (this._isMovable()) {
          !customEvent.restoreCall && (customEvent.restore = false);
          moveTo = touch.destPos;
        } else if (Math.abs(distance) > 0) {
          this._triggerBeforeRestore(e);
        } else {
          duration = 0;
        } // trigger animation


        e.setTo({
          flick: moveTo
        }, duration);
        distance === 0 && this._adjustContainerCss("end");
        touch.holding = false;

        this._setPointerEvents(); // for "click" bug

      };
      /**
       * 'animationStart' event handler
       * @private
       */


      _proto._animationStartHandler = function _animationStartHandler(e) {
        var conf = this._conf;
        var panel = conf.panel;
        var customEvent = conf.customEvent;
        var isFromInput = e.inputEvent || conf.touch.lastPos; // when animation was started by input action

        if (!customEvent.restoreCall && isFromInput && this._setPhaseValue("start", {
          depaPos: e.depaPos.flick,
          destPos: e.destPos.flick
        }) === false) {
          e.stop();
        }

        if (isFromInput) {
          e.duration = this.options.duration;
          e.destPos.flick = panel.size * (panel.index + conf.indexToMove);
        }

        panel.animating = true;
      };
      /**
       * 'animationEnd' event handler
       * @private
       */


      _proto._animationEndHandler = function _animationEndHandler() {
        var conf = this._conf;
        conf.panel.animating = false;

        this._setPhaseValue("end");

        this._triggerRestore(); // reset isTrusted


        conf.touch.isTrusted = false;
      };

      return _class;
    }(superclass)
  );
});
// CONCATENATED MODULE: ./src/Flicking.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Flicking_Flicking; });
function Flicking_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */







/**
 * Create an instance of the eg.Flicking class. Create a flicking UI that sweeps a side-by-side panel with mouse move or touch move input and moves to the next or previous panel.
 * @ko eg.Flicking 클래스의 인스턴스를 생성한다. 나란히 배치한 패널을 마우스 이동(move) 혹은 터치 이동(move) 입력을 받아 쓸어 넘겨 다음 패널이나 이전 패널로 이동하는 UI를 만든다.
 * @alias eg.Flicking
 * @extends eg.Component
 * @requires {@link https://github.com/naver/egjs-component|eg.Component}
 * @requires {@link https://github.com/naver/egjs-axes|eg.Axes}
 * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}). <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@link https://jqueryui.com/easing})를 사용한다</ko>
 * @throws {Error} An Error occur when given base element doesn't exist or it hasn't proper DOM structure to be initialized. <ko>주어진 기본 요소가 존재하지 않거나 초기화 할 적절한 DOM 구조가없는 경우 오류가 발생한다.</ko>
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 * @example
 * A common example.
 * 일반적인 예.
 * ```html
 * <div id="flick">
 * 	<div><p>panel 0</p></div>
 * 	<div><p>panel 1</p></div>
 * 	<div><p>panel 2</p></div>
 * </div>
 * ```
 * ```javascript
 * // Examples to omit and omit optional options.
 * // 생략가능한 옵션은 생략하고 생성하는 예.
 * new eg.Flicking("#flick");
 *
 * // An example of specifying and generating values for all optional parameters.
 * // 모든 옵션의 값을 지정하고 생성하는 예.
 * new eg.Flicking("#flick", {
 * 	hwAccelerable: true,
 * 	prefix: "eg-flick",
 * 	deceleration: 0.0006,
 * 	horizontal: true,
 * 	circular: false,
 * 	previewPadding: [10, "15%"], // also as "10px", 15 or "15%" can be applied.
 * 	bounce: [10, 10],
 * 	threshold: 40,
 * 	duration: 100,
 * 	panelEffect: x => 1 - Math.pow(1 - x, 3),
 * 	defaultIndex: 0,
 * 	inputType: ["touch", "mouse"],
 * 	thresholdAngle: 45,
 * 	adaptiveHeight: false
 * });
 * ```
 * @example
 * Example of constructor element parameter value specification.
 * 생성자 element 파라미터 값 지정 예.
 * ```javascript
 * // An example of assigning HTMLElement to an element parameter.
 * // element 파라미터에 HTMLElement를 지정하는 예.
 * new eg.Flicking(document.getElementById("flick"));
 *
 * // An example of assigning a jQuery object to an element parameter.
 * // element 파라미터에 jQuery객체를 지정하는 예.
 * new eg.Flicking($("#flick")[0]);
 *
 * // An example of assigning a css selector string to an element parameter.
 * // element 파라미터에 css 선택자 문자열을 지정하는 예.
 * new eg.Flicking("#flick");
 * ```
 * @example
 * Panel element definition location example.
 * 패널 요소 정의 위치 예.
 * ```html
 * <!--An example of defining a panel element as a child of a base element.-->
 * <!--패널 요소를 기준 요소의 자식으로 정의한 예.-->
 * <div id="flick">
 * 	<div><p>panel 0</p></div>
 * 	<div><p>panel 1</p></div>
 * 	<div><p>panel 2</p></div>
 * </div>
 *
 * <!--An example of defining a panel element as a child of a container element.-->
 * <!--패널 요소를 컨테이너 요소의 자식으로 정의한 예.-->
 * <div id="flick2">
 * 	<div class="eg-flick-container">
 * 		<div><p>panel 0</p></div>
 * 		<div><p>panel 1</p></div>
 * 		<div><p>panel 2</p></div>
 * 	<div>
 * </div>
 * ```
 * @example
 * An example where only one panel is defined and created with a circular.
 * 패널을 하나만 정의하고 순환으로 생성하는 예.
 * ```html
 * <div id="flick">
 * 	<div><p>panel 0</p></div>
 * </div>
 * ```
 * ```javascript
 * // If the number of defined panels is less than the minimum number required for the circulation operation, the necessary number of panel elements are generated.
 * // 정의된 패널의 수가 순환동작에 필요한 최소 개수보다 적으면 필요한 수만큼의 패널 요소가 생성된다.
 * new eg.Flicking("#flick", {
 * 	circular: true
 * })
 * ```
 * @example
 * For error occurrence example. There is no panel element.
 * 오류 발생 예. 패널 요소가 하나도 없는 경우.
 * ```html
 * <div id="flick"></div>
 * ```
 * ```javascript
 * try{
 * 	new eg.Flicking("#flick");
 * } catch(e) {
 * 	// An error occurs because there are no child elements in the reference element.
 *	// 기준 요소안에 자식 요소가 하나도 없으므로 에러가 발생한다.
 * }
 * ```
 */

var Flicking_Flicking =
/*#__PURE__*/
function () {
  var Flicking =
  /*#__PURE__*/
  function (_Mixin$with) {
    Flicking_inheritsLoose(Flicking, _Mixin$with);

    /**
     * Constructor
     * @param {HTMLElement|String} element A base element for the eg.Flicking module. When specifying a value as a `String` type, you must specify a css selector string to select the element.<ko>eg.Flicking 모듈을 사용할 기준 요소. `String`타입으로 값 지정시 요소를 선택하기 위한 css 선택자 문자열을 지정해야 한다.</ko>
     * @param {Object} [options] The option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
     * @param {Boolean} [options.hwAccelerable=true] Force hardware compositing.<ko>하드웨어 가속 사용 여부.</ko>
     * @param {String} [options.prefix="eg-flick"] A prefix for class names of the panel elements.<ko>패널 요소의 클래스 이름 접두사.</ko>
     * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time.<ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
     * @param {Boolean} [options.horizontal=true] Direction of the panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true 가로방향, false 세로방향)</ko>
     * @param {Boolean} [options.circular=false] Whether to let the first panel flick right to the end panel (let the left panel flick from the end panel to move to the first panel). (The term 'circulation')<ko>첫 패널에서 우 액션 입력하여 끝 패널로 이동하게 할지와 끝 패널에서 우 액션 입력하여 첫 패널로 이동할하게 할지 여부. (통칭 '순환')</ko>
     * @param {Number|String|Array} [options.previewPadding=[0,0]] The preview size value(if no unit is given, defaults to `px`) for the previous or next panel.<br>- If the direction is set to "horizontal", the preview section will be displayed on the left and right of the panel.<br>- If the direction is set to "vertical", it will be displayed on the top and bottom of the panel.<ko>이전 패널과 다음 패널을 미리 보는 영역의 크기 값(단위가 지정되지 않는 경우, `px`로 지정).<br>패널 이동 방향이 가로 방향이면 패널 좌우에, 세로 방향이면 패널 상하에 미리 보는 영역이 나타난다.</ko>
     * @param {Number|Array} [options.bounce=[10,10]] The size value(unit: pixel) of the bounce area. If `circular=false`, the panel can be moved by this value when inputting a right gesture in the first panel or inputting a left gesture in the end panel. When the input is completed while moving, it returns to its original position.<ko>바운스 영역의 크기값(단위: 픽셀). `circular=false`인 경우, 첫 패널에서 우 액션 입력시, 끝 패널에서 좌 액션 입력시 이 값 만큼만 패널이 이동할 수 있고 이동한 상태에서 입력을 마치면 원래 자리로 돌아온다.</ko>
     * @param {Number} [options.threshold=40] Movement threshold to destination panel(unit: pixel). A panel element must be dragged beyond the threshold to move to the destination panel.<ko>목적 패널로의 이동 임계값 (단위: 픽셀). 패널 요소를 임계값 이상으로 끌어다 놓아야만이 목적 패널로 이동한다.</ko>
     * @param {Number} [options.duration=100] Duration of the panel movement. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
     * @param {Function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] The easing function to apply to a panel moving animation. The default function is easeOutCubic.<ko>패널 이동 애니메이션에 적용할 `easing`함수. 기본값은 `easeOutCubic`이다.</ko>
     * @param {Number} [options.defaultIndex=0] The panel index number to specify when initializing the module. A zero-based integer.<ko>모듈 초기화시 지정할 패널 인덱스 번호. 0부터 시작하는 정수.</ko>
     * @param {Array} [options.inputType=["touch,"mouse"]] Types of input devices. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput Reference})<br>- "touch": A touch input device.<br>- "mouse": A mouse.<ko>입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput 참고})<br>- "touch": 터치 입력 장치.<br>- "mouse": 마우스.</ko>
     * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user input is horizontal or vertical. (0 ~ 90)<ko>사용자의 입력이 가로 방향인지 세로 방향인지 판단하는 기준 각도 (0 ~ 90)</ko>
     * @param {Boolean} [options.adaptiveHeight=false] Whether the height of the container element reflects the height value of the panel after completing the movement.<br>(Note: on Android 4.1.x stock browser, has rendering bug which not correctly render height value on panel with single node. To avoid just append another empty node at the end.)<ko>목적 패널로 이동한 후 그 패널의 높이값을 컨테이너 요소의 높이값에 반영할지 여부.<br>(참고: Android 4.1.x 스톡 브라우저에서 단일 노드로 구성된 패널의 높이값 변경이 제대로 렌더링 되지 않는 버그가 있음. 비어있는 노드를 추가하면 해결이 가능하다.)</ko>
     * @param {Number} [options.zIndex=2000] z-index value for container element<ko>컨테이너 요소의 z-index 값</ko>
     * @param {Boolean} [options.useTranslate=true] Use css translate method on panel moves. When set to 'false', it'll use top/left instead.<ko>패널 이동시 CSS translate 사용 여부. 'false'로 설정 시, top/left 속성을 사용</ko>
    */
    function Flicking(element, options, _prefix) {
      var _this;

      _this = _Mixin$with.call(this) || this;
      _this.$wrapper = utils.$(element);
      _this.plugins = [];
      var $children = _this.$wrapper && _this.$wrapper.children;

      if (!_this.$wrapper || !$children || !$children.length) {
        // eslint-disable validateLineBreaks, maximumLineLength
        throw new Error("Given base element doesn't exist or it hasn't proper DOM structure to be initialized."); // eslint-enable validateLineBreaks, maximumLineLength
      }

      _this._setOptions(options);

      _this._setConfig($children, _prefix);

      !utils.hasClickBug() && (_this._setPointerEvents = function () {});

      _this._build();

      _this._bindEvents(true);

      _this._applyPanelsCss();

      _this._arrangePanels();

      _this.options.hwAccelerable && SUPPORT_WILLCHANGE && _this._setHint();
      _this.options.adaptiveHeight && _this._setAdaptiveHeight();

      _this._adjustContainerCss("end");

      return _this;
    }
    /**
     * Set options values
     * @private
     * @param {Object} options
     */


    var _proto = Flicking.prototype;

    _proto._setOptions = function _setOptions(options) {
      // default value of previewPadding and bounce
      var arrVal = {
        previewPadding: [0, 0],
        bounce: [10, 10]
      };
      this.options = utils.extend(utils.extend({}, OPTIONS), arrVal, options);

      for (var key in arrVal) {
        var val = this.options[key];

        if (/(number|string)/.test(typeof val)) {
          val = [val, val];
        } else if (!utils.isArray(val)) {
          val = arrVal[key];
        }

        this.options[key] = val;
      } // block use of translate for Android2 environment


      if (IS_ANDROID2) {
        this.options.useTranslate = false;
      }
    };
    /**
     * Set config values
     * @private
     * @param {HTMLCollection} $children wrappers' children elements
     * @param {String} _prefix event prefix
     * @return {HTMLElement}
     */


    _proto._setConfig = function _setConfig($children, _prefix) {
      var options = this.options;
      var padding = options.previewPadding;
      var $nodes = $children;

      if (utils.classList($nodes[0], options.prefix + "-container")) {
        $nodes = $nodes[0];
        this.$container = $nodes;
        $nodes = $nodes.children;
      } // convert to array


      $nodes = utils.toArray($nodes); // config value

      var conf = this._conf = utils.extend(utils.extend({}, CONFIG), {
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
          container: {
            className: this.$container && this.$container.getAttribute("class") || null,
            style: this.$container && this.$container.getAttribute("style") || null
          },
          list: $nodes.map(function (v) {
            return {
              className: v.getAttribute("class") || null,
              style: v.getAttribute("style") || null
            };
          })
        },
        useLayerHack: options.hwAccelerable && !SUPPORT_WILLCHANGE,
        eventPrefix: _prefix || ""
      });
      [["LEFT", "RIGHT"], ["UP", "DOWN"]][+!options.horizontal].forEach(function (v) {
        return conf.dirData.push(axes_root_eg_Axes_default.a["DIRECTION_" + v]);
      });
    };
    /**
     * Build and set panel nodes to make flicking structure
     * @private
     */


    _proto._build = function _build() {
      var panel = this._conf.panel;
      var options = this.options;
      var $children = panel.$list;
      var padding = options.previewPadding.concat();
      var prefix = options.prefix;
      var horizontal = options.horizontal;
      var panelCount = panel.count = panel.origCount = $children.length;
      var bounce = options.bounce;

      this._setPadding(padding, true);

      var sizeValue = this._getDataByDirection([panel.size, "100%"]); // container element style


      var cssValue = {
        position: "relative",
        zIndex: options.zIndex || 2000,
        width: "100%",
        height: "100%"
      };
      horizontal && (cssValue.top = "0px");

      if (this.$container) {
        utils.css(this.$container, cssValue);
      } else {
        var $parent = $children[0].parentNode;
        var $container = browser_document.createElement("div");
        $container.className = prefix + "-container";
        utils.css($container, cssValue);
        $children.forEach(function (v) {
          return $container.appendChild(v);
        });
        $parent.appendChild($container);
        this.$container = $container;
      } // panels' css values


      $children.forEach(function (v) {
        utils.classList(v, prefix + "-panel", true);
        utils.css(v, {
          position: "absolute",
          width: utils.getUnitValue(sizeValue[0]),
          height: utils.getUnitValue(sizeValue[1]),
          boxSizing: "border-box",
          top: 0,
          left: 0
        });
      });

      if (this._addClonePanels()) {
        panelCount = panel.count = (panel.$list = utils.toArray(this.$container.children)).length;
      } // create Axes instance


      this._axesInst = new axes_root_eg_Axes_default.a({
        flick: {
          range: [0, panel.size * (panelCount - 1)],
          bounce: bounce
        }
      }, {
        easing: options.panelEffect,
        deceleration: options.deceleration,
        interruptable: false
      });

      this._setDefaultPanel(options.defaultIndex);
    };
    /**
     * Set preview padding value
     * @private
     * @param {Array} padding
     * @param {Boolean} build
     */


    _proto._setPadding = function _setPadding(padding, build) {
      var $wrapper = this.$wrapper;
      var horizontal = this.options.horizontal;
      var panel = this._conf.panel;
      var paddingSum = padding.reduce(function (a, c) {
        return parseFloat(a) + parseFloat(c);
      });
      var cssValue = {};

      if (paddingSum || !build) {
        horizontal && padding.reverse();
        cssValue.padding = "" + (horizontal ? "0 " : "") + // add 'px' unit if not present
        padding.map(function (v) {
          return isNaN(v) ? v : v + "px";
        }).join(" 0 ");
      }

      if (build) {
        cssValue.overflow = "hidden";
        cssValue.boxSizing = "border-box";
      }

      Object.keys(cssValue).length && utils.css($wrapper, cssValue);
      var paddingType = horizontal ? ["Left", "Right"] : ["Top", "Bottom"];
      var wrapperSize = Math.max($wrapper["offset" + (horizontal ? "Width" : "Height")], utils.css($wrapper, horizontal ? "width" : "height", true));
      panel.size = wrapperSize - (utils.css($wrapper, "padding" + paddingType[0], true) + utils.css($wrapper, "padding" + paddingType[1], true));
    };
    /**
     * To fulfill minimum panel count cloning original node when circular or previewPadding option are set
     * @private
     * @return {Boolean} true : added clone node, false : not added
     */


    _proto._addClonePanels = function _addClonePanels() {
      var _this2 = this;

      var panel = this._conf.panel;
      var panelCount = panel.origCount;
      var cloneCount = panel.minCount - panelCount;
      var list = panel.$list;
      var cloneNodes; // if panels are given less than required when circular option is set, then clone node to apply circular mode

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
     * @private
     * @param {Number} count element counts to move
     * @param {Boolean} append where the list to be appended(moved) (true: to the end, false: to the beginning)
     */


    _proto._movePanelPosition = function _movePanelPosition(count, append) {
      var panel = this._conf.panel;
      var list = panel.$list;
      var listToMove = list.splice(append ? 0 : panel.count - count, count);
      panel.$list = append ? list.concat(listToMove) : listToMove.concat(list);
    };
    /**
     * Set default panel to show
     * @private
     * @param {Number} index
     */


    _proto._setDefaultPanel = function _setDefaultPanel(index) {
      var panel = this._conf.panel;
      var lastIndex = panel.count - 1;
      var coords;
      var baseIndex;

      if (this.options.circular) {
        // if default index is given, then move correspond panel to the first position
        if (index > 0 && index <= lastIndex) {
          this._movePanelPosition(index, true);
        } // set first panel's position according physical node length


        baseIndex = this._getBasePositionIndex();

        this._movePanelPosition(baseIndex, false);

        this._setPanelNo({
          no: index,
          currNo: index
        }); // if defaultIndex option is given, then move to that index panel

      } else if (index > 0 && index <= lastIndex) {
        this._setPanelNo({
          index: index,
          no: index,
          currIndex: index,
          currNo: index
        });

        coords = [-(panel.size * index), 0];

        this._setTranslate(coords);

        this._setAxes("setTo", Math.abs(coords[0]), 0);
      }
    };
    /**
     * Arrange panels' position
     * @private
     * @param {Boolean} sort Need to sort panel's position
     * @param {Number} indexToMove Number to move from current position (negative: left, positive: right)
     */


    _proto._arrangePanels = function _arrangePanels(sort, indexToMove) {
      var conf = this._conf;
      var panel = conf.panel;
      var touch = conf.touch;
      var dirData = conf.dirData;
      var baseIndex;

      if (this.options.circular) {
        // when arranging panels, set flag to not trigger flick custom event
        conf.customEvent.flick = false; // move elements according direction

        if (sort) {
          indexToMove && (touch.direction = dirData[+!(indexToMove > 0)]);

          this._arrangePanelPosition(touch.direction, indexToMove);
        } // set index for base element's position


        baseIndex = this._getBasePositionIndex();

        this._setPanelNo({
          index: baseIndex,
          currIndex: baseIndex
        }); // arrange Axes' coord position


        conf.customEvent.flick = !!this._setAxes("setTo", panel.size * panel.index, 0);
      }

      this._applyPanelsPos();
    };
    /**
     * Set each panel's position in DOM
     * @private
     */


    _proto._applyPanelsPos = function _applyPanelsPos() {
      this._conf.panel.$list.forEach(this._applyPanelsCss.bind(this));
    };
    /**
     * Set CSS style values to move elements
     *
     * Initialize setting up checking if browser support transform css property.
     * If browser doesn't support transform, then use left/top properties instead.
     * @private
     * @param {HTMLElement} $el
     * @param {Array} coordsValue
     */


    _proto._setMoveStyle = function _setMoveStyle($el, coordsValue) {
      var transform = TRANSFORM;
      var useLayerHack = this._conf.useLayerHack;
      this._setMoveStyle = transform.support ? function ($element, coords) {
        var _utils$css;

        utils.css($element, (_utils$css = {}, _utils$css[transform.name] = utils.translate(coords[0], coords[1], useLayerHack), _utils$css));
      } : function ($element, coords) {
        utils.css($element, {
          left: coords[0],
          top: coords[1]
        });
      };

      this._setMoveStyle($el, coordsValue);
    };
    /**
     * Callback function for applying CSS values to each panels
     * Need to be initialized before use, to set up for Android 2.x browsers or others.
     * @private
     */


    _proto._applyPanelsCss = function _applyPanelsCss() {
      var conf = this._conf;
      var dummyAnchorClassName = "__dummy_anchor";
      var useTranslate = this.options.useTranslate;

      if (!useTranslate) {
        if (IS_ANDROID2) {
          conf.$dummyAnchor = utils.$("." + dummyAnchorClassName);
          !conf.$dummyAnchor && this.$wrapper.appendChild(conf.$dummyAnchor = utils.$("<a href=\"javascript:void(0)\" class=\"" + dummyAnchorClassName + "\" style=\"position:absolute;height:0px;width:0px\">"));
        }

        this._applyPanelsCss = function (v, i) {
          var coords = this._getDataByDirection([this._conf.panel.size * i + "px", 0]);

          utils.css(v, {
            left: coords[0],
            top: coords[1]
          });
        };
      } else {
        this._applyPanelsCss = function (v, i) {
          var coords = this._getDataByDirection([TRANSFORM.support ? 100 * i + "%" : this._conf.panel.size * i + "px", 0]);

          this._setMoveStyle(v, coords);
        };
      }
    };
    /**
     * Adjust container's css value to handle Android 2.x link highlighting bug
     * @private
     * @param {String} phase
     *    start - set left/top value to 0
     *    end - set translate value to 0
     * @param {Array} toValue coordinate value
     */


    _proto._adjustContainerCss = function _adjustContainerCss(phase, toValue) {
      var conf = this._conf;
      var panel = conf.panel;
      var options = this.options;
      var useTranslate = options.useTranslate;
      var horizontal = options.horizontal;
      var paddingTop = options.previewPadding[0];
      var container = this.$container;
      var to = toValue;
      var value;

      if (!useTranslate) {
        if (!to) {
          to = -panel.size * panel.index;
        }

        if (phase === "start") {
          container = container.style;
          value = parseFloat(container[horizontal ? "left" : "top"]);

          if (horizontal) {
            value && (container.left = "0px");
          } else {
            value !== paddingTop && (container.top = "0px");
          }

          this._setTranslate([-to, 0]);
        } else if (phase === "end") {
          var _utils$css2;

          to = this._getCoordsValue([to, 0]);
          utils.css(container, (_utils$css2 = {
            left: to.x,
            top: to.y
          }, _utils$css2[TRANSFORM.name] = utils.translate(0, 0, conf.useLayerHack), _utils$css2));
          conf.$dummyAnchor && conf.$dummyAnchor.focus();
        }
      }
    };
    /**
     * Set Axes coord value
     * @private
     * @param {String} method
     * @param {Number} flick destination value
     * @param {Number} duration
     * @return {eg.Axes} Axes instance
     */


    _proto._setAxes = function _setAxes(method, flick, duration) {
      return this._axesInst[method]({
        flick: flick
      }, duration);
    };
    /**
     * Set hint for browser to decide efficient way of doing transform changes(or animation)
     * https://dev.opera.com/articles/css-will-change-property/
     * @private
     */


    _proto._setHint = function _setHint() {
      var style = {
        willChange: "transform"
      };
      utils.css(this.$container, style);
      utils.css(this._conf.panel.$list, style);
    };
    /**
     * Get data according options.horizontal value
     * @private
     * @param {Array} value primary data to handle
     * @return {Array}
     */


    _proto._getDataByDirection = function _getDataByDirection(value) {
      var data = value.concat();
      !this.options.horizontal && data.reverse();
      return data;
    };
    /**
     * Move nodes
     * @private
     * @param {Boolean} direction
     * @param {Number} indexToMove
     */


    _proto._arrangePanelPosition = function _arrangePanelPosition(direction, indexToMove) {
      var next = direction === this._conf.dirData[0];

      this._movePanelPosition(Math.abs(indexToMove || 1), next);
    };
    /**
     * Get the base position index of the panel
     * @private
     */


    _proto._getBasePositionIndex = function _getBasePositionIndex() {
      return Math.floor(this._conf.panel.count / 2 - 0.1);
    };
    /**
     * Bind events
     * @private
     * @param {Boolean} bind
     */


    _proto._bindEvents = function _bindEvents(bind) {
      var options = this.options;
      var $wrapper = this.$wrapper;
      var axesInst = this._axesInst;

      if (bind) {
        this._panInput = new axes_root_eg_Axes_["PanInput"]($wrapper, {
          inputType: options.inputType,
          thresholdAngle: options.thresholdAngle,
          scale: this._getDataByDirection([-1, 0])
        });
        axesInst.on({
          hold: this._holdHandler.bind(this),
          change: this._changeHandler.bind(this),
          release: this._releaseHandler.bind(this),
          animationStart: this._animationStartHandler.bind(this),
          animationEnd: this._animationEndHandler.bind(this)
        }).connect(this._getDataByDirection(["flick", ""]), this._panInput);
      } else {
        this.disableInput();
        axesInst.off();
      }
    };
    /**
     * Set container's height value according to children's height
     * @private
     * @param {Number} direction
     */


    _proto._setAdaptiveHeight = function _setAdaptiveHeight(direction) {
      var conf = this._conf;
      var indexToMove = conf.indexToMove;
      var $children;
      var height;
      var $panel = indexToMove === 0 ? // panel moved by 1
      this["get" + (direction === axes_root_eg_Axes_default.a.DIRECTION_LEFT && "Next" || direction === axes_root_eg_Axes_default.a.DIRECTION_RIGHT && "Prev" || "") + "Element"]() : // panel moved by .moveTo()
      conf.panel.$list[conf.panel.currIndex + indexToMove];
      var $first = $panel.querySelector(":first-child");

      if ($first) {
        height = $first.getAttribute(DATA_HEIGHT);

        if (!height) {
          $children = $panel.children;
          height = utils.outerHeight($children.length > 1 ? ($panel.style.height = "auto", $panel) : $first);
          height > 0 && $first.setAttribute(DATA_HEIGHT, height);
        }

        height > 0 && (this.$wrapper.style.height = height + "px");
      }
    };
    /**
     * Trigger beforeRestore event
     * @private
     * @param {Object} e event object
     */


    _proto._triggerBeforeRestore = function _triggerBeforeRestore(e) {
      var conf = this._conf;
      var touch = conf.touch; // reverse direction value when restore

      touch.direction = +conf.dirData.join("").replace(touch.direction, "");
      /**
       * This event occurs before the current panel starts to return to its original position. Followes [flick]{@link eg.Flicking#event:flick} and [restore]{@link eg.Flicking#event:restore} events. The conditions of occurrence are as follows.<br><br>1. The user has finished input but does not exceed the panel movement threshold.<br>2. Call the [restore()]{@link eg.Flicking#restore} method. (Prevent the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event.)
       * @ko 현재 패널이 원래 위치로 되돌아가기 시작전에 발생하는 이벤트이다. 뒤이어 [flick]{@link eg.Flicking#event:flick}과 [restore]{@link eg.Flicking#event:restore}이벤트가 발생한다. 발생조건은 아래와 같다.<br><br>1. 사용자 입력이 끝났는데 패널 이동 임계점을 넘지 않은 경우.<br>2. [restore()]{@link eg.Flicking#restore} 메서드 호출.([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} 이벤트의 기본동작 방지 전제)
       * @name eg.Flicking#beforeRestore
       * @event
       * @property {String} eventType The name of the event <ko>이벤트 명</ko>
       * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
       * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
       * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
       * @property {Number} depaPos Starting coordinate. <ko>출발점 좌표.</ko>
       * @property {Number} destPos Destination coordinate. <ko>도착점 좌표.</ko>
       * @see eg.Flicking#event:flick
       * @see eg.Flicking#event:restore
       * @see eg.Flicking#restore
       * @example
       * // The order of event occurrence.
       * // 이벤트 발생 순서
       * beforeRestore (once) > flick (many times) > restore (once)
       */

      conf.customEvent.restore = this._triggerEvent(EVENTS.beforeRestore, {
        depaPos: e.depaPos.flick,
        destPos: e.destPos.flick
      });

      if (!conf.customEvent.restore) {
        "stop" in e && e.stop();
        conf.panel.animating = false;
      }
    };
    /**
     * Trigger restore event
     * @private
     */


    _proto._triggerRestore = function _triggerRestore() {
      var customEvent = this._conf.customEvent;
      /**
       * The event that occurs after completing the move by [restore()]{@link eg.Flicking#restore} method.
       * @ko [restore()]{@link eg.Flicking#restore} 메서드에 의해 패널이 원래 위치로 이동을 완료한 다음 발생하는 이벤트.
       * @name eg.Flicking#restore
       * @event
       * @property {String} eventType The name of the event <ko>이벤트 명</ko>
       * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
       * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
       * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
       * @see eg.Flicking#event:beforeRestore
       * @see eg.Flicking#event:flick
       * @see eg.Flicking#restore
       * @example
       * // The order of event occurrence.
       * // 이벤트 발생 순서
       * beforeRestore (once) > flick (many times) > restore (once)
       */

      customEvent.restore && this._triggerEvent(EVENTS.restore);
      customEvent.restore = customEvent.restoreCall = false;
    };
    /**
     * Set value when panel changes
     * @private
     * @param {String} phase - [start|end]
     * @param {Object} pos
     */


    _proto._setPhaseValue = function _setPhaseValue(phase, pos) {
      var conf = this._conf;
      var options = this.options;
      var panel = conf.panel;
      var useTranslate = options.useTranslate;

      if (phase === "start" && (panel.changed = this._isMovable())) {
        /**
         * An event that occurs before a user action or [moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next} method initiates a move to the destination panel. If you do not prevent the default behavior, then many [flick]{@link eg.Flicking#event:flick} events and one [flickEnd]{@link eg.Flicking#event:flickEnd} event will occur.
         * @ko 사용자 액션 혹은 [moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next} 메서드에 의해 목적 패널로의 이동 시작전 발생하는 이벤트. 기본동작을 막지 않는다면 뒤이어 다수의 [flick]{@link eg.Flicking#event:flick}이벤트와 그 뒤 한 번의 [flickEnd]{@link eg.Flicking#event:flickEnd}이벤트가 발생한다.
         * @name eg.Flicking#beforeFlickStart
         * @event
         * @property {String} eventType The name of the event <ko>이벤트 명</ko>
         * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`</ko>
         * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
         * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
         * @property {Number} depaPos Starting coordinate. <ko>출발점 좌표.</ko>
         * @property {Number} destPos Destination coordinate. <ko>도착점 좌표.</ko>
         * @property {Function} stop Cancels the default action. (Default action: Move to destination panel.) The panel element stays at the position of the call to `stop()`. To return to the original position, you must call the [restore()]{@link eg.Flicking#restore} method.<ko>기본동작을 취소한다. (기본동작: 목적 패널로의 이동.) 패널 요소가 `stop()`호출시점의 위치에 머물러 있는다. 원래 자리로 되돌리려면 [restore()]{@link eg.Flicking#restore} 메서드를 호출해야 한다.</ko>
         * @see eg.Flicking#event:flick
         * @see eg.Flicking#event:flickEnd
         * @see eg.Flicking#moveTo
         * @see eg.Flicking#prev
         * @see eg.Flicking#next
         * @example
         * // The order of event occurrence.
         * // 이벤트 발생 순서
         * beforeFlickStart (once) > flick (many times) > flickEnd (once)
         * @example
         * // An example to prevent the default behavior.
         * // 기본동작을 막는 예.
         * new eg.Flicking("#flick").on("beforeFlickStart", e => {
         * 	e.stop();
         * });
         */
        if (!this._triggerEvent(EVENTS.beforeFlickStart, pos)) {
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

        useTranslate && this._setTranslate([-panel.size * panel.index, 0]);
        conf.touch.distance = conf.indexToMove = 0;
        /**
         * The event that occurs after completing the move to the destination panel. It occurs in the following cases.<br><br>- After completing the movement to the destination panel by user's move input.<br>- `moveTo()`, `prev()`, `next()` method call. (It does not occur if you have disabled the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event.)
         * @ko 목적 패널로의 이동을 완료한 다음 발생하는 이벤트. 아래의 경우에 발생한다.<br><br>- 사용자의 이동(move) 액션 입력에 의한 목적 패널로의 이동완료 후.<br>- `moveTo()`, `prev()`, `next()` 메서드 호출.([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}이벤트의 기본동작을 막았다면 발생하지 않는다.)
         * @name eg.Flicking#flickEnd
         * @event
         * @property {String} eventType The name of the event.<ko>이벤트 명</ko>
         * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
         * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
         * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
         * @see eg.Flicking#event:beforeFlickStart
         * @see eg.Flicking#event:flick
         * @see eg.Flicking#moveTo
         * @see eg.Flicking#prev
         * @see eg.Flicking#next
         * @example
         * // The order of event occurrence.
         * // 이벤트 발생 순서
         * beforeFlickStart (once) > flick (many times) > flickEnd (once)
         */

        panel.changed && this._triggerEvent(EVENTS.flickEnd);
      }

      this._adjustContainerCss(phase);

      return true;
    };
    /**
     * Get positive or negative according direction
     * @private
     */


    _proto._getNumByDirection = function _getNumByDirection() {
      var conf = this._conf;
      return conf.touch.direction === conf.dirData[0] ? 1 : -1;
    };
    /**
     * Revert panel number
     * @private
     */


    _proto._revertPanelNo = function _revertPanelNo() {
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
     * @private
     * @param {Object} obj number object
     */


    _proto._setPanelNo = function _setPanelNo(obj) {
      var panel = this._conf.panel;
      var count = panel.origCount - 1;

      var num = this._getNumByDirection();

      if (utils.isObject(obj)) {
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
     * @private
     * @param {Event} e
     */


    _proto._setPointerEvents = function _setPointerEvents(e) {
      var $container = this.$container;
      var pointer = utils.css($container, "pointerEvents");
      var pointerEvents;

      if (e && e.holding && e.inputEvent && e.inputEvent.preventSystemEvent && pointer !== "none") {
        pointerEvents = "none";
      } else if (!e && pointer !== "auto") {
        pointerEvents = "auto";
      }

      pointerEvents && utils.css($container, {
        pointerEvents: pointerEvents
      });
    };
    /**
     * Get coordinate value with unit
     * @private
     * @param coordsValue {Array} x,y numeric value
     * @return {Object} x,y coordinate value with unit
     */


    _proto._getCoordsValue = function _getCoordsValue(coordsValue) {
      // the param comes as [ val, 0 ], whatever the direction. So reorder the value depend the direction.
      var coords = this._getDataByDirection(coordsValue);

      return {
        x: utils.getUnitValue(coords[0]),
        y: utils.getUnitValue(coords[1])
      };
    };
    /**
     * Set translate property value
     * @private
     * @param {Array} coordsValue coordinate x,y value
     */


    _proto._setTranslate = function _setTranslate(coordsValue) {
      var coords = this._getCoordsValue(coordsValue);

      this._setMoveStyle(this.$container, [coords.x, coords.y]);
    };
    /**
     * Check if panel passed through threshold pixel
     * @private
     */


    _proto._isMovable = function _isMovable() {
      var options = this.options;
      var axesInst = this._axesInst;
      var isMovable = Math.abs(this._conf.touch.distance) >= options.threshold;
      var max;
      var currPos;

      if (!options.circular && isMovable) {
        max = axesInst.axis.flick.range[1];
        currPos = axesInst.get().flick; // if current position out of range

        if (currPos < 0 || currPos > max) {
          return false;
        }
      }

      return isMovable;
    };
    /**
     * Trigger custom events
     * @private
     * @param {String} name - event name
     * @param {Object} param - additional event value
     * @return {Boolean}
     */


    _proto._triggerEvent = function _triggerEvent(name, param) {
      var conf = this._conf;
      var panel = conf.panel; // pass changed panel no only on 'flickEnd' event

      if (name === EVENTS.flickEnd) {
        panel.currNo = panel.no;
        panel.currIndex = panel.index;
      }

      return this.trigger(conf.eventPrefix + name, utils.extend({
        eventType: name,
        no: panel.currNo,
        direction: conf.touch.direction,
        isTrusted: conf.touch.isTrusted
      }, param));
    };
    /**
     * Get next/prev panel element/index.
     * @private
     * @param {Boolean} direction
     * @param {Boolean} element - true:to get element, false:to get index
     * @param {Number} physical - true : physical, false : logical (@deprecated since 2.2.0)
     * @return {HTMLElement|Number}
     */


    _proto._getElement = function _getElement(direction, element, physical) {
      var panel = this._conf.panel;
      var circular = this.options.circular;
      var pos = panel.currIndex;
      var next = direction === this._conf.dirData[0];
      var result = null;
      var total;
      var index;

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
     * @private
     * @param {Boolean} next
     */


    _proto._setValueToMove = function _setValueToMove(next) {
      var conf = this._conf;
      conf.touch.distance = this.options.threshold + 1;
      conf.touch.direction = conf.dirData[+!next];
    };
    /**
     * Returns the index number of the current panel element.
     * @ko 현재 패널 요소의 인덱스 번호를 반환한다.
     * @method eg.Flicking#getIndex
     * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers.<br>- true (Physical): Math.floor({Total number of panels} / 2 - 0.1) value. (Increase by 1 for every two panels.) If the circular option is false, it equals physical=false.<br>- false (Logical): The value of how the content(innerHTML) of the current panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류.<br>- true (물리적): `Math.floor({패널 총 개수} / 2 - 0.1)` 값. (패널이 2개 늘어날 때마다 1씩 증가) `circular`옵션이 `false`이면 `physical=false`와 동일한 값.<br>- false (논리적): 현재 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
     * @return {Number} Index number of the current panel element. A zero-based integer.<ko>현재 패널의 인덱스 번호. 0부터 시작하는 정수.</ko>
     * @see eg.Flicking#getPrevIndex
     * @see eg.Flicking#getNextIndex
     * @example
     * ```html
     * <div id="flick">
     * 	<div><p>panel 0</p></div>
     * 	<div><p>panel 1</p></div>
     * 	<div><p>panel 2</p></div>
     * 	<div><p>panel 3</p></div>
     * </div>
     * ```
     * ```javascript
     * // circular off and left flicking.
     * // 순환을 끄고 좌 플리킹.
     * new eg.Flicking("#flick").on("flickEnd", {currentTarget} => {
     * 	console.log(currentTarget.getIndex()); // 1 > 2 > 3
     * 	console.log(currentTarget.getIndex(true)); // 1 > 2 > 3
     * };
     *
     * // circular on and left flicking.
     * // 순환을 켜고 좌 플리킹.
     * new eg.Flicking("#flick", {circular: true}).on("flickEnd", {currentTarget} => {
     * 	console.log(currentTarget.getIndex()); // 1 > 2 > 3 > 0 > 1 > 2 > 3 > 0 ...
     * 	console.log(currentTarget.getIndex(true)); // 1 > 1 > 1 > 1 > 1 > 1 > 1 > 1 ...
     * };
     * ```
     * @example
     * ```html
     * <!--Define only two panels.-->
     * <!--패널을 두 개만 정의한다.-->
     * <div id="flick2">
     * 	<div><p>panel 0</p></div>
     * 	<div><p>panel 1</p></div>
     * </div>
     * ```
     * ```javascript
     * // (In the case of circulation) If the number of defined panel elements is less than the minimum number required, the number of panels is created.
     * // Therefore, it is described as 'the number of panel definitions of the contents of the panel.'
     * // (순환인 경우) 정의된 패널 요소의 개수가 필요 최소개수보다 적으면 그 수만큼의 패널을 생성한다.
     * // 그렇기 때문에 '패널이 담고 있는 컨텐트의 패널 정의 순성상의 번호'라고 설명한다.
     * const flick = new eg.Flicking("flick2", {
     * 	circular: true
     * });
     *
     * // The content of the current panel is the first in the panel definition order.
     * // 현재 패널이 담고 있는 컨텐트는 패널 정의 순서상 첫 번째이다.
     * flick.getIndex(); // 0
     *
     * // The content of the next panel is the second in the panel definition order.
     * // 다음 패널이 담고 있는 컨텐트는 패널 정의 순서상 두 번째이다.
     * flick.getNextIndex(); // 1
     *
     * // The content of the previous panel is the second in the panel definition order.
     * // 이전 패널이 담고 있는 컨텐트는 패널 정의 순서상 두 번째이다.
     * flick.getPrevIndex(); // 1
     * ```
     */


    _proto.getIndex = function getIndex(physical) {
      return this._conf.panel[physical ? "currIndex" : "currNo"];
    };
    /**
     * Returns the reference of the current panel element.
     * @ko 현재 패널 요소의 레퍼런스를 반환한다.
     * @method eg.Flicking#getElement
     * @return {HTMLElement} Current panel element.<ko>현재 패널 요소.</ko>
     * @see eg.Flicking#getPrevElement
     * @see eg.Flicking#getNextElement
     */


    _proto.getElement = function getElement() {
      var panel = this._conf.panel;
      return panel.$list[panel.currIndex];
    };
    /**
     * Returns the reference of the next panel element.
     * @ko 다음 패널 요소의 레퍼런스를 반환한다.
     * @method eg.Flicking#getNextElement
     * @return {HTMLElement|null} Next panel element or `null` if it does not exist.<ko>다음 패널 요소. 패널이 없으면 `null`을 반환한다.</ko>
     * @see eg.Flicking#getElement
     * @see eg.Flicking#getPrevElement
     */


    _proto.getNextElement = function getNextElement() {
      return this._getElement(this._conf.dirData[0], true);
    };
    /**
     * Returns the index number of the next panel element.
     * @ko 다음 패널 요소의 인덱스 번호를 반환한다.
     * @method eg.Flicking#getNextIndex
     * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers<br>- true (Physical): Plus one of [getIndex()]{@link eg.Flicking#getIndex} return value.<br>- false (Logical): The value of how the content(innerHTML) of the next panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류.<br>- true (물리적): [getIndex()]{@link eg.Flicking#getIndex} 반환값에 1을 더한 값.<br>- false (논리적): 다음 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
     * @return {Number|null} Index number of the next panel element or null if it does not exist. A zero-based integer.<ko>다음 패널 요소의 인덱스 번호. 0부터 시작하는 정수. 패널이 없으면 `null`을 반환한다.</ko>
     * @see eg.Flicking#getIndex
     * @see eg.Flicking#getPrevIndex
     */


    _proto.getNextIndex = function getNextIndex(physical) {
      return this._getElement(this._conf.dirData[0], false, physical);
    };
    /**
     * Returns a reference to all panel elements.
     * @ko 모든 패널 요소의 레퍼런스를 반환한다.
     * @method eg.Flicking#getAllElements
     * @return {HTMLElement[]} Whole panel elements.<ko>모든 패널 요소.</ko>
     */


    _proto.getAllElements = function getAllElements() {
      return this._conf.panel.$list;
    };
    /**
     * Returns the reference of the previous panel element.
     * @ko 이전 패널 요소의 레퍼런스를 반환한다.
     * @method eg.Flicking#getPrevElement
     * @return {HTMLElement|null} Previous panel element or `null` if it does not exist.<ko>이전 패널 요소. 패널이 없으면 `null`을 반환한다.</ko>
     * @see eg.Flicking#getElement
     * @see eg.Flicking#getNextElement
     */


    _proto.getPrevElement = function getPrevElement() {
      return this._getElement(this._conf.dirData[1], true);
    };
    /**
     * Returns the index number of the previous panel element.
     * @ko 이전 패널 요소의 인덱스 번호를 반환한다.
     * @method eg.Flicking#getPrevIndex
     * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers<br>- true (Physical): Minus one of [getIndex()]{@link eg.Flicking#getIndex} return value.<br>- false (Logical): The value of how the content(innerHTML) of the current panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류<br>- true (물리적): [getIndex()]{@link eg.Flicking#getIndex} 반환값에 1을 뺀 값.<br>- false (논리적): 이전 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
     * @return {Number|null} Previous element index value or null if no more element exist. A zero-based integer.<ko>이전 패널 요소의 인덱스 번호. 0부터 시작하는 정수. 패널이 없는 경우는 `null`.</ko>
     * @see eg.Flicking#getIndex
     * @see eg.Flicking#getNextIndex
     */


    _proto.getPrevIndex = function getPrevIndex(physical) {
      return this._getElement(this._conf.dirData[1], false, physical);
    };
    /**
     * Checks whether the animated panel is playing.
     * @ko 패널 이동 애니메이션이 진행 중인지 확인한다.
     * @method eg.Flicking#isPlaying
     * @return {Boolean} Indicates whether the animated panel is playing <ko>패널 이동 애니메이션 진행 중 여부</ko>
     */


    _proto.isPlaying = function isPlaying() {
      return this._conf.panel.animating;
    };
    /**
     * Move panel applying start/end phase value
     * @private
     * @param {String} method Axes' method name
     * @param {Number} to destination value
     * @param {Number} durationValue duration value
     */


    _proto._movePanelByPhase = function _movePanelByPhase(method, to, durationValue) {
      var duration = utils.getNumValue(durationValue, this.options.duration);

      if (this._setPhaseValue("start") !== false) {
        this._setAxes(method, to, duration);

        !duration && this._setPhaseValue("end");
      }
    };
    /**
     * Moves an element to the next panel. If `horizontal=true`is right panel. If `horizontal=false`is lower panel.
     * @ko 다음 패널로 이동한다. `horizontal=true`이면 우측 패널. `horizontal=false`이면 하측 패널.
     * @method eg.Flicking#next
     * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @fires eg.Flicking#beforeFlickStart
     * @fires eg.Flicking#flick
     * @fires eg.Flicking#flickEnd
     * @see eg.Flicking#moveTo
     * @see eg.Flicking#prev
     */


    _proto.next = function next(duration) {
      var index = this.getNextIndex();

      if (typeof index !== "number") {
        return this;
      }

      return this._moveTo(index, duration, axes_root_eg_Axes_default.a.DIRECTION_RIGHT);
    };
    /**
     * Moves an element to the previous panel. If `horizontal=true`is left panel. If `horizontal=false`is upper panel.
     * @ko 이전 패널로 이동한다. `horizontal=true`이면 좌측 패널. `horizontal=false`이면 상측 패널.
     * @method eg.Flicking#prev
     * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
     * @fires eg.Flicking#beforeFlickStart
     * @fires eg.Flicking#flick
     * @fires eg.Flicking#flickEnd
     * @see eg.Flicking#moveTo
     * @see eg.Flicking#next
     */


    _proto.prev = function prev(duration) {
      var index = this.getPrevIndex();

      if (typeof index !== "number") {
        return this;
      }

      return this._moveTo(index, duration, axes_root_eg_Axes_default.a.DIRECTION_LEFT);
    };
    /**
     * Moves to the panel in the order specified in `noValue`. If noValue is equal to the current logical index numbering, no action is taken. [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}, [flick]{@link eg.Flicking#event:flick}, [flickEnd]{@link eg.Flicking#event:flickEnd} events occur one after the other.
     * @ko `noValue`에 지정한 순서의 패널로 이동한다. `noValue`값이 현재의 논리적 인덱스 번호와 같다면 아무동작 하지 않는다. [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}, [flick]{@link eg.Flicking#event:flick}, [flickEnd]{@link eg.Flicking#event:flickEnd} 이벤트가 차례로 발생한다.
     * @method eg.Flicking#moveTo
     * @param {Number} noValue The logical index number of the panel element to be moved. (Based on the defined order of the panel elements.)<ko>이동할 패널 요소의 논리적 인덱스 번호. ([getIndex()]{@link eg.Flicking#getIndex}메서드 참조.)</ko>
     * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
     * @fires eg.Flicking#beforeFlickStart
     * @fires eg.Flicking#flick
     * @fires eg.Flicking#flickEnd
     * @see eg.Flicking#prev
     * @see eg.Flicking#next
     */


    _proto.moveTo = function moveTo(noValue, duration) {
      return this._moveTo(noValue, duration);
    };

    _proto._moveTo = function _moveTo(noValue, duration, direction) {
      var conf = this._conf;
      var panel = conf.panel;
      var circular = this.options.circular;
      var currentIndex = panel.index;
      var indexToMove;
      var isPositive;
      var no = noValue;
      no = utils.getNumValue(no, -1);

      if (no < 0 || no >= panel.origCount || no === panel.no || panel.animating || conf.touch.holding) {
        return this;
      }

      indexToMove = no - (circular ? panel.no : currentIndex);

      if (direction === axes_root_eg_Axes_default.a.DIRECTION_RIGHT && indexToMove < 0) {
        indexToMove += panel.origCount;
      } else if (direction === axes_root_eg_Axes_default.a.DIRECTION_LEFT && indexToMove > 0) {
        indexToMove -= panel.origCount;
      }

      isPositive = indexToMove > 0; // check for real panel count which can be moved on each sides in circular mode

      if (circular && Math.abs(indexToMove) > (isPositive ? panel.count - (currentIndex + 1) : currentIndex)) {
        indexToMove += (isPositive ? -1 : 1) * panel.count;
        isPositive = indexToMove > 0;
      }

      this._setPanelNo(circular ? {
        no: no
      } : {
        no: no,
        index: no
      });

      this._conf.indexToMove = indexToMove;

      this._setValueToMove(isPositive);

      this._movePanelByPhase(circular ? "setBy" : "setTo", panel.size * (circular ? indexToMove : no), duration);

      return this;
    };
    /**
     * The horizontal or vertical length of the panel is updated according to the base element. If `horizontal=true` is horizontal. If `horizontal=false` is vertical.
     * @ko 패널의 가로 혹은 세로 길이를 기준요소에 맞춰 갱신한다. `horizontal=true`이면 가로, `horizontal=false`이면 세로.
     * @method eg.Flicking#resize
     * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
     * @example
     * const flick = new eg.Flicking("#flick", {
     * 	previewPadding: [10, 10]
     * });
     *
     * // When device orientaion changes.
     * // 단말기를 회전했을 때.
     * flick.resize();
     *
     * // Or when changes previewPadding option from its original value.
     * // 또는 previewPadding옵션값을 변경했을 때.
     * flick.options.previewPadding = [20, 30];
     * flick.resize();
     */


    _proto.resize = function resize() {
      var conf = this._conf;
      var options = this.options;
      var panel = conf.panel;
      var horizontal = options.horizontal;
      var useTranslate = options.useTranslate;
      var panelSize;

      if (!this.isPlaying()) {
        var _utils$css3;

        if (utils.isArray(options.previewPadding) && typeof +options.previewPadding.join("") === "number") {
          this._setPadding(options.previewPadding.concat());

          panelSize = panel.size;
        } else if (horizontal) {
          panelSize = panel.size = utils.css(this.$wrapper, "width", true);
        } // resize panel elements


        utils.css(panel.$list, (_utils$css3 = {}, _utils$css3[horizontal ? "width" : "height"] = utils.getUnitValue(panelSize), _utils$css3)); // remove data-height attribute and re-evaluate panel's height

        if (options.adaptiveHeight) {
          var $panel = this.$container.querySelectorAll("[" + DATA_HEIGHT + "]");

          if ($panel.length) {
            utils.toArray($panel).forEach(function (v) {
              return v.removeAttribute(DATA_HEIGHT);
            });

            this._setAdaptiveHeight();
          }
        }

        this._axesInst.axis.flick.range = [0, panelSize * (panel.count - 1)];

        this._setAxes("setTo", panelSize * panel.index, 0);

        if (!useTranslate) {
          this._applyPanelsPos();

          this._adjustContainerCss("end");
        }
      }

      return this;
    };
    /**
     * Return the panel to its original position. (It only works when the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event is canceled.) [beforeRestore]{@link eg.Flicking#event:beforeRestore}, [flick]{@link eg.Flicking#event:flick}, [restore]{@link eg.Flicking#event:restore} events are occur in order.
     * @ko 패널의 위치를 원래 자리로 되돌린다. ([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} 이벤트의 기본동작을 취소한 경우에만 동작함.) [beforeRestore]{@link eg.Flicking#event:beforeRestore}, [flick]{@link eg.Flicking#event:flick}, [restore]{@link eg.Flicking#event:restore} 이벤트가 차례로 발생한다.
     * @method eg.Flicking#restore
     * @param {Number} [durationValue=options.duration] Duration of the panel movement (unit: ms)<ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
     * @fires eg.Flicking#event:beforeRestore
     * @fires eg.Flicking#event:flick
     * @fires eg.Flicking#event:restore
     * @example
     * new eg.Flicking("#flick").on("beforeFlickStart", e => {
     * 	if (e.no === 2) {
     * 		// Cancels the default behavior of the 'beforeFlickStart' event.
     * 		// 'beforeFlickStart' 이벤트 기본동작 취소.
     * 		e.stop();
     *
     * 		// Return to original position.
     * 		// 원래 자리로 되돌림.
     * 		this.restore(100);
     * 	}
     * });
     */


    _proto.restore = function restore(durationValue) {
      var conf = this._conf;
      var panel = conf.panel;

      var currPos = this._axesInst.get().flick;

      var duration = durationValue;
      var destPos; // check if the panel isn't in right position

      if (currPos !== panel.currIndex * panel.size) {
        conf.customEvent.restoreCall = true;
        duration = utils.getNumValue(duration, this.options.duration);

        this._revertPanelNo();

        destPos = panel.size * panel.index;

        this._triggerBeforeRestore({
          depaPos: currPos,
          destPos: destPos
        });

        this._setAxes("setTo", destPos, duration);

        if (!duration) {
          this._adjustContainerCss("end");

          this._triggerRestore();
        } // to handle on api call

      } else if (panel.changed) {
        this._revertPanelNo();

        conf.touch.distance = conf.indexToMove = 0;
      }

      return this;
    };
    /**
     * The input from the input device is not blocked so that the panel can be moved by the input device.
     * @ko 막았던 입력 장치로부터의 입력을 푼다.
     * @method eg.Flicking#enableInput
     * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @see eg.Flicking#disableInput
     */


    _proto.enableInput = function enableInput() {
      this._panInput.enable();

      return this;
    };
    /**
     * The input from the input device is blocked so that the panel is not moved by the input device.
     * @ko 패널이 입력 장치에 의해 움직이지 않도록 입력 장치로부터의 입력을 막는다.
     * @method eg.Flicking#disableInput
     * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @see eg.Flicking#enableInput
     */


    _proto.disableInput = function disableInput() {
      this._panInput.disable();

      return this;
    };
    /**
     * Get current flicking status. If the returned value is specified as a [setStatus()]{@link eg.Flicking#setStatus} method argument, it can be returned to its value state.
     * @ko 현재 상태 값을 반환한다. 반환받은 값을 [setStatus()]{@link eg.Flicking#setStatus} 메서드 인자로 지정하면 그 값 상태로 되돌릴 수 있다.
     * @method eg.Flicking#getStatus
     * @param {Boolean} [stringify] Set true if want get stringified status value.<ko>true 지정시 json문자열 형태로 반환한다.</ko>
     * @return {Status|String} An object with current state value information.<ko>현재 상태값 정보를 가진 객체.</ko>
     * @see eg.Flicking#setStatus
     * @example
     * const flick = new eg.Flicking("#flick");
     * const status = flick.getStatus();
     * const jsonStaus = flick.getStatus(true);
     *
     * console.log(status); // {panel: {...}, $list: Array(7)}
     * console.log(jsonStatus); // "{\"panel\":{\"index\":3,\"no\":6,\"currIndex\":3,\"currNo\":6},\"$list\":[{\"style\":\"background-color: rgb(155, 49, 137); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 3&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(51, 172, 91); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 4&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(116, 38, 241); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 5&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(141, 139, 24); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 6&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(204, 102, 204); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 0&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(54, 53, 156); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 1&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(196, 218, 72); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 2&lt;/p&gt;\n\t\t\t\t\t\t\"}]}"
     */

    /**
     * The return value specification of the getStatus () method.
     * @ko getStatus() 메서드의 반환값 명세.
     * @typedef {Object} Status
     * @property {Object} panel current panel position<ko>현재 패널 위치</ko>
     * @property {Number} panel.index Physical index number.<ko>물리적 인덱스 번호.</ko>
     * @property {Number} panel.currIndex Current physical index number.<ko>현재 물리적 인덱스 번호.</ko>
     * @property {Number} panel.no Logical index number.<ko>논리적 인덱스 번호.</ko>
     * @property {Number} panel.currNo Current logical index number.<ko>현재 논리적 인덱스 번호.</ko>
     * @property {Array.<{style: String, className: String, html: String}>} $list panel's html<ko>패널 정보</ko>
     * @property {Object} $list.obj For convenience, the element is denoted by obj.<ko>편의상 원소를 obj로 표기함</ko>
     * @property {String} $list.obj.style The value of the style attribute of the panel element. ('transform', 'left', 'top', 'will-change', 'box-sizing', 'width' style has been deleted.)<ko>패널 요소의 style 속성 값. ('transform', 'left', 'top', 'will-change', 'box-sizing', 'width' style은 삭제됨)</ko>
     * @property {String} $list.obj.className The class name of the panel element.<ko>패널 요소의 class 이름.</ko>
     * @property {String} $list.obj.html The innerHTML value of the panel element.<ko>패널 요소의 innerHTML 값.</ko>
     * @see eg.Flicking#getIndex
     */


    _proto.getStatus = function getStatus(stringify) {
      var panel = this._conf.panel;
      var rxStyle = /((?:-webkit-)?transform|left|top|will-change|box-sizing|width):[^;]*;/g;
      var status = {
        // current panel position
        panel: {
          index: panel.index,
          no: panel.no,
          currIndex: panel.currIndex,
          currNo: panel.currNo
        },
        // panel's html
        $list: panel.$list.map(function (v) {
          return {
            style: v.style.cssText.replace(rxStyle, "").trim(),
            className: v.className,
            html: v.innerHTML
          };
        })
      };
      return stringify ? JSON.stringify(status) : status;
    };
    /**
     * Restore to the state of the `statusValue`.
     * @ko `statusValue`의 상태로 복원한다.
     * @method eg.Flicking#setStatus
     * @param {Status|String} statusValue Status value to be restored. You can specify the return value of the [getStatus()]{@link eg.Flicking#getStatus} method.<ko>복원할 상태 값. [getStatus()]{@link eg.Flicking#getStatus}메서드 반환값을 지정하면 된다.</ko>
     * @see eg.Flicking#getStatus
     * @example
     * const flick = new eg.Flicking("#flick");
     * const status = flick.getStatus();
     *
     * // Move to arbitrary panel.
     * // 임의 패널로 이동
     * flick.moveTo(2);
     *
     * // Restore to status.
     * // status 상태로 복원
     * flick.setStatus(status);
     */


    _proto.setStatus = function setStatus(statusValue) {
      var panel = this._conf.panel;
      var isAdaptiveHeight = this.options.adaptiveHeight;
      var status = typeof statusValue === "string" ? JSON.parse(statusValue) : statusValue;

      if (status) {
        for (var x in status.panel) {
          x in panel && (panel[x] = status.panel[x]);
        }

        panel.$list.forEach(function (v, i) {
          var data = status.$list[i];
          var style = data.style;
          var className = data.className;
          var html = data.html;
          style && (v.style.cssText += style);
          className && (v.className = className);
          html && (v.innerHTML = html);
        });
        isAdaptiveHeight && this._setAdaptiveHeight();
      }
    };
    /**
     * Returns the reference element and its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).<br>If plugin isn't empty, also reset all plugins registered.
     * @ko 기준 요소와 그 하위 요소를 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.<br>플러그인이 비어있지 않다면, 플러그인도 모두 리셋한다.
     * @method eg.Flicking#destroy
     * @example
     * const flick = new eg.Flicking("#flick");
     * flick.destroy();
     * console.log(flick.moveTo); // null
     */


    _proto.destroy = function destroy() {
      var _this3 = this;

      var conf = this._conf;
      var origPanelStyle = conf.origPanelStyle;
      var wrapper = origPanelStyle.wrapper;
      var container = origPanelStyle.container;
      var list = origPanelStyle.list; // unbind events

      this._bindEvents(false);

      this.off(); // destroy eg.Axes instance

      this._axesInst.destroy();

      this._panInput.destroy(); // unwrap container element and restore original inline style
      // restore wrapper style


      var $wrapper = this.$wrapper;
      $wrapper.setAttribute("class", wrapper.className);
      $wrapper[wrapper.style ? "setAttribute" : "removeAttribute"]("style", wrapper.style); // restore container style

      var $container = this.$container;
      var $children = [].slice.call($container.children);

      if (origPanelStyle.container.className) {
        $container.setAttribute("class", container.className);
        $container[container.style ? "setAttribute" : "removeAttribute"]("style", container.style);
      } else {
        $children.forEach(function (v) {
          return $wrapper.appendChild(v);
        });
        $container.parentNode.removeChild($container);
      }

      for (var i = 0, $el; $el = $children[i]; i++) {
        if (i > list.length - 1) {
          $el.parentNode.removeChild($el);
        } else {
          var className = list[i].className;
          var style = list[i].style;
          $el[className ? "setAttribute" : "removeAttribute"]("class", className);
          $el[style ? "setAttribute" : "removeAttribute"]("style", style);
        }
      } // release plugin resources


      this.plugins.forEach(function (v) {
        _this3.plugins[v].$componentWillUnmount();
      }); // release resources

      for (var x in this) {
        this[x] = null;
      }
    };
    /**
     * Register plugin to be used.
     * @ko 사용될 플러그인을 등록한다.
     * @method eg.Flicking#plugin
     * @example
     * new eg.Flicking("#flick").plugin([
     *     new eg.Flicking.plugin.OpacityEffect("span"),
     *     ...
     * ]);
     * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    _proto.plugin = function plugin(list) {
      var _this4 = this;

      list.forEach(function (p) {
        /**
         * A list of plugins used.
         * @ko 사용된 플러그인 목록
         * @property {Array} plugins An array of plugin instances <ko>플러그인 인스턴스 배열</ko>
         * @name plugins
         * @type {Array}
         * @instance
         * @example
         * const flick = new eg.Flicking( ... ).plugin([ ... ]);
         *
         * flick.plugins; // [ ... ] - array of plugins
         * @memberof eg.Flicking
         */
        if (_this4.plugins.filter(function (v) {
          return v.constructor === p.constructor;
        }).length === 0) {
          _this4.plugins.push(p.$componentWillMount(_this4));
        }
      });
      return this;
    };
    /**
     * Collection of utilities used internally
     * @ko 내부에서 사용되는 유틸리티 모음
     * @name utils
     * @memberof eg.Flicking
     * @static
     * @constant
     * @private
     * @type {Object}
     */


    return Flicking;
  }(Mixin(component_root_eg_Component_default.a)["with"](eventHandler));

  Flicking.utils = utils;
  Flicking.VERSION = "2.4.2-snapshot";
  Flicking.consts = {
    EVENTS: EVENTS,
    TRANSFORM: TRANSFORM,
    SUPPORT_WILLCHANGE: SUPPORT_WILLCHANGE,
    IS_ANDROID2: IS_ANDROID2
  };
  Flicking.DIRECTION_NONE = axes_root_eg_Axes_default.a.DIRECTION_NONE;
  Flicking.DIRECTION_LEFT = axes_root_eg_Axes_default.a.DIRECTION_LEFT;
  Flicking.DIRECTION_RIGHT = axes_root_eg_Axes_default.a.DIRECTION_RIGHT;
  Flicking.DIRECTION_UP = axes_root_eg_Axes_default.a.DIRECTION_UP;
  Flicking.DIRECTION_DOWN = axes_root_eg_Axes_default.a.DIRECTION_DOWN;
  Flicking.DIRECTION_HORIZONTAL = axes_root_eg_Axes_default.a.DIRECTION_HORIZONTAL;
  Flicking.DIRECTION_VERTICAL = axes_root_eg_Axes_default.a.DIRECTION_VERTICAL;
  Flicking.DIRECTION_ALL = axes_root_eg_Axes_default.a.DIRECTION_ALL;
  return Flicking;
}();



/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZy5GbGlja2luZy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL2NvbnN0cy5qcyIsIndlYnBhY2s6Ly9lZy5GbGlja2luZy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZWcuRmxpY2tpbmcvLi9zcmMvZXZlbnRIYW5kbGVyLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL0ZsaWNraW5nLmpzIl0sIm5hbWVzIjpbIndpbiIsIndpbmRvdyIsImRvY3VtZW50IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidXRpbHMiLCIkIiwicGFyYW0iLCJlbCIsIm1hdGNoIiwiY3JlYXRlRWxlbWVudCIsImxlbmd0aCIsInNwbGl0IiwiZm9yRWFjaCIsInYiLCJhdHRyIiwic2V0QXR0cmlidXRlIiwidHJpbSIsInJlcGxhY2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwibm9kZU5hbWUiLCJub2RlVHlwZSIsInRvQXJyYXkiLCJzbGljZSIsImNhbGwiLCJpc0FycmF5IiwiYXJyIiwiY29uc3RydWN0b3IiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwiZXh0ZW5kIiwidGFyZ2V0Iiwib2JqZWN0TiIsInNvdXJjZSIsInNoaWZ0IiwiT2JqZWN0Iiwia2V5cyIsImtleSIsInZhbHVlIiwiY29uY2F0IiwiY3NzIiwic3R5bGUiLCJnZXRBc051bWJlciIsInRlc3QiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0TnVtVmFsdWUiLCJhcHBseVN0eWxlIiwiY2xhc3NMaXN0IiwiY2xhc3NOYW1lIiwiYWRkIiwiaXNBZGRQYXJhbSIsInJlcyIsImluZGV4T2YiLCJSZWdFeHAiLCJ2YWwiLCJkZWZWYWwiLCJudW0iLCJpc05hTiIsInBhcnNlRmxvYXQiLCJnZXRVbml0VmFsdWUiLCJyeCIsIlN0cmluZyIsImdldE91dGVyIiwidHlwZSIsInBhZGRpbmdNYXJnaW4iLCJkaXIiLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsInRyYW5zbGF0ZSIsIngiLCJ5IiwiaXNIQSIsImhhc0NsaWNrQnVnIiwidWEiLCJyZXN1bHQiLCJNaXhpbkJ1aWxkZXIiLCJzdXBlcmNsYXNzIiwibWl4aW5zIiwicmVkdWNlIiwiYyIsIm0iLCJNaXhpbiIsIkVWRU5UUyIsImJlZm9yZUZsaWNrU3RhcnQiLCJiZWZvcmVSZXN0b3JlIiwiZmxpY2siLCJmbGlja0VuZCIsInJlc3RvcmUiLCJUUkFOU0ZPUk0iLCJuYW1lIiwic3VwcG9ydCIsImRvY3VtZW50RWxlbWVudCIsIlNVUFBPUlRfV0lMTENIQU5HRSIsIkNTUyIsInN1cHBvcnRzIiwiSVNfQU5EUk9JRDIiLCJEQVRBX0hFSUdIVCIsIkNPTkZJRyIsInBhbmVsIiwiJGxpc3QiLCJpbmRleCIsIm5vIiwiY3VyckluZGV4IiwiY3Vyck5vIiwic2l6ZSIsImNvdW50Iiwib3JpZ0NvdW50IiwiY2hhbmdlZCIsImFuaW1hdGluZyIsIm1pbkNvdW50IiwidG91Y2giLCJob2xkUG9zIiwiZGVzdFBvcyIsImRpc3RhbmNlIiwiZGlyZWN0aW9uIiwibGFzdFBvcyIsImhvbGRpbmciLCJpc1RydXN0ZWQiLCJjdXN0b21FdmVudCIsInJlc3RvcmVDYWxsIiwiZGlyRGF0YSIsImluZGV4VG9Nb3ZlIiwiJGR1bW15QW5jaG9yIiwiT1BUSU9OUyIsImh3QWNjZWxlcmFibGUiLCJwcmVmaXgiLCJkZWNlbGVyYXRpb24iLCJob3Jpem9udGFsIiwiY2lyY3VsYXIiLCJwcmV2aWV3UGFkZGluZyIsImJvdW5jZSIsInRocmVzaG9sZCIsImR1cmF0aW9uIiwicGFuZWxFZmZlY3QiLCJNYXRoIiwicG93IiwiZGVmYXVsdEluZGV4IiwiaW5wdXRUeXBlIiwidGhyZXNob2xkQW5nbGUiLCJhZGFwdGl2ZUhlaWdodCIsInpJbmRleCIsInVzZVRyYW5zbGF0ZSIsIl9ob2xkSGFuZGxlciIsImUiLCJjb25mIiwiX2NvbmYiLCJwb3MiLCJfYWRqdXN0Q29udGFpbmVyQ3NzIiwiX2NoYW5nZUhhbmRsZXIiLCJldmVudFJlcyIsIm1vdmVkUHgiLCJfc2V0UG9pbnRlckV2ZW50cyIsImlucHV0RXZlbnQiLCJvcHRpb25zIiwiYWJzIiwiX3RyaWdnZXJFdmVudCIsIl9zZXRUcmFuc2xhdGUiLCJfcmVsZWFzZUhhbmRsZXIiLCJwYW5lbFNpemUiLCJpc1BsdXNNb3ZlIiwiZGVwYVBvcyIsIm1vdmVUbyIsIl9pc01vdmFibGUiLCJfdHJpZ2dlckJlZm9yZVJlc3RvcmUiLCJzZXRUbyIsIl9hbmltYXRpb25TdGFydEhhbmRsZXIiLCJpc0Zyb21JbnB1dCIsIl9zZXRQaGFzZVZhbHVlIiwic3RvcCIsIl9hbmltYXRpb25FbmRIYW5kbGVyIiwiX3RyaWdnZXJSZXN0b3JlIiwiRmxpY2tpbmciLCJlbGVtZW50IiwiX3ByZWZpeCIsIiR3cmFwcGVyIiwicGx1Z2lucyIsIiRjaGlsZHJlbiIsImNoaWxkcmVuIiwiRXJyb3IiLCJfc2V0T3B0aW9ucyIsIl9zZXRDb25maWciLCJfYnVpbGQiLCJfYmluZEV2ZW50cyIsIl9hcHBseVBhbmVsc0NzcyIsIl9hcnJhbmdlUGFuZWxzIiwiX3NldEhpbnQiLCJfc2V0QWRhcHRpdmVIZWlnaHQiLCJhcnJWYWwiLCJwYWRkaW5nIiwiJG5vZGVzIiwiJGNvbnRhaW5lciIsIm9yaWdQYW5lbFN0eWxlIiwid3JhcHBlciIsImdldEF0dHJpYnV0ZSIsImNvbnRhaW5lciIsImxpc3QiLCJtYXAiLCJ1c2VMYXllckhhY2siLCJldmVudFByZWZpeCIsInB1c2giLCJwYW5lbENvdW50IiwiX3NldFBhZGRpbmciLCJzaXplVmFsdWUiLCJfZ2V0RGF0YUJ5RGlyZWN0aW9uIiwiY3NzVmFsdWUiLCJwb3NpdGlvbiIsIndpZHRoIiwiaGVpZ2h0IiwidG9wIiwiJHBhcmVudCIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsImJveFNpemluZyIsImxlZnQiLCJfYWRkQ2xvbmVQYW5lbHMiLCJfYXhlc0luc3QiLCJyYW5nZSIsImVhc2luZyIsImludGVycnVwdGFibGUiLCJfc2V0RGVmYXVsdFBhbmVsIiwiYnVpbGQiLCJwYWRkaW5nU3VtIiwiYSIsInJldmVyc2UiLCJqb2luIiwib3ZlcmZsb3ciLCJwYWRkaW5nVHlwZSIsIndyYXBwZXJTaXplIiwibWF4IiwiY2xvbmVDb3VudCIsImNsb25lTm9kZXMiLCJjbG9uZU5vZGUiLCJfbW92ZVBhbmVsUG9zaXRpb24iLCJhcHBlbmQiLCJsaXN0VG9Nb3ZlIiwic3BsaWNlIiwibGFzdEluZGV4IiwiY29vcmRzIiwiYmFzZUluZGV4IiwiX2dldEJhc2VQb3NpdGlvbkluZGV4IiwiX3NldFBhbmVsTm8iLCJfc2V0QXhlcyIsInNvcnQiLCJfYXJyYW5nZVBhbmVsUG9zaXRpb24iLCJfYXBwbHlQYW5lbHNQb3MiLCJiaW5kIiwiX3NldE1vdmVTdHlsZSIsIiRlbCIsImNvb3Jkc1ZhbHVlIiwidHJhbnNmb3JtIiwiJGVsZW1lbnQiLCJkdW1teUFuY2hvckNsYXNzTmFtZSIsImkiLCJwaGFzZSIsInRvVmFsdWUiLCJwYWRkaW5nVG9wIiwidG8iLCJfZ2V0Q29vcmRzVmFsdWUiLCJmb2N1cyIsIm1ldGhvZCIsIndpbGxDaGFuZ2UiLCJkYXRhIiwibmV4dCIsImZsb29yIiwiYXhlc0luc3QiLCJfcGFuSW5wdXQiLCJzY2FsZSIsIm9uIiwiaG9sZCIsImNoYW5nZSIsInJlbGVhc2UiLCJhbmltYXRpb25TdGFydCIsImFuaW1hdGlvbkVuZCIsImNvbm5lY3QiLCJkaXNhYmxlSW5wdXQiLCJvZmYiLCIkcGFuZWwiLCJESVJFQ1RJT05fTEVGVCIsIkRJUkVDVElPTl9SSUdIVCIsIiRmaXJzdCIsInF1ZXJ5U2VsZWN0b3IiLCJfZ2V0TnVtQnlEaXJlY3Rpb24iLCJfcmV2ZXJ0UGFuZWxObyIsInBvaW50ZXIiLCJwb2ludGVyRXZlbnRzIiwicHJldmVudFN5c3RlbUV2ZW50IiwiaXNNb3ZhYmxlIiwiY3VyclBvcyIsImF4aXMiLCJnZXQiLCJ0cmlnZ2VyIiwiZXZlbnRUeXBlIiwiX2dldEVsZW1lbnQiLCJwaHlzaWNhbCIsInRvdGFsIiwiY3VycmVudEluZGV4IiwiX3NldFZhbHVlVG9Nb3ZlIiwiZ2V0SW5kZXgiLCJnZXRFbGVtZW50IiwiZ2V0TmV4dEVsZW1lbnQiLCJnZXROZXh0SW5kZXgiLCJnZXRBbGxFbGVtZW50cyIsImdldFByZXZFbGVtZW50IiwiZ2V0UHJldkluZGV4IiwiaXNQbGF5aW5nIiwiX21vdmVQYW5lbEJ5UGhhc2UiLCJkdXJhdGlvblZhbHVlIiwiX21vdmVUbyIsInByZXYiLCJub1ZhbHVlIiwiaXNQb3NpdGl2ZSIsInJlc2l6ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImVuYWJsZUlucHV0IiwiZW5hYmxlIiwiZGlzYWJsZSIsImdldFN0YXR1cyIsInN0cmluZ2lmeSIsInJ4U3R5bGUiLCJzdGF0dXMiLCJjc3NUZXh0IiwiaHRtbCIsImlubmVySFRNTCIsIkpTT04iLCJzZXRTdGF0dXMiLCJzdGF0dXNWYWx1ZSIsImlzQWRhcHRpdmVIZWlnaHQiLCJwYXJzZSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCIsIiRjb21wb25lbnRXaWxsVW5tb3VudCIsInBsdWdpbiIsInAiLCJmaWx0ZXIiLCIkY29tcG9uZW50V2lsbE1vdW50IiwiVkVSU0lPTiIsImNvbnN0cyIsIkRJUkVDVElPTl9OT05FIiwiRElSRUNUSU9OX1VQIiwiRElSRUNUSU9OX0RPV04iLCJESVJFQ1RJT05fSE9SSVpPTlRBTCIsIkRJUkVDVElPTl9WRVJUSUNBTCIsIkRJUkVDVElPTl9BTEwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFJQTtBQUVBLElBQUlBLEdBQUo7O0FBRUEsSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2xDO0FBQ0FELEtBQUcsR0FBRztBQUNMRSxZQUFRLEVBQUUsRUFETDtBQUVMQyxhQUFTLEVBQUU7QUFDVkMsZUFBUyxFQUFFO0FBREQ7QUFGTixHQUFOO0FBTUEsQ0FSRCxNQVFPO0FBQ05KLEtBQUcsR0FBR0MsTUFBTjtBQUNBO0FBQ0Q7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SyxrQixHQUFxQiwyQkFBSSxDQUFDQSxrQjtBQXZzRGIxSyxVLENBbXREYjJLLGEsR0FBZ0IsMkJBQUksQ0FBQ0EsYTtTQW50RFIzSyxRIiwiZmlsZSI6IjAuYzFjMjg3ODliZGIxMjMyNTc2YmEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5cbmxldCB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdC8vIHdpbmRvdyBpcyB1bmRlZmluZWQgaW4gbm9kZS5qc1xuXHR3aW4gPSB7XG5cdFx0ZG9jdW1lbnQ6IHt9LFxuXHRcdG5hdmlnYXRvcjoge1xuXHRcdFx0dXNlckFnZW50OiBcIlwiXG5cdFx0fVxuXHR9O1xufSBlbHNlIHtcblx0d2luID0gd2luZG93O1xufVxuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblxuY29uc3QgZG9jdW1lbnQgPSB3aW4uZG9jdW1lbnQ7XG5cbmV4cG9ydCB7XG5cdHdpbiBhcyB3aW5kb3csXG5cdGRvY3VtZW50XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge3dpbmRvdywgZG9jdW1lbnR9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuY29uc3QgdXRpbHMgPSB7XG5cdC8qKlxuXHQgKiBTZWxlY3Qgb3IgY3JlYXRlIGVsZW1lbnRcblx0ICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR9IHBhcmFtXG5cdCAqICB3aGVuIHN0cmluZyBnaXZlbiBpcyBhcyBIVE1MIHRhZywgdGhlbiBjcmVhdGUgZWxlbWVudFxuXHQgKiAgb3RoZXJ3aXNlIGl0IHJldHVybnMgc2VsZWN0ZWQgZWxlbWVudHNcblx0ICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuXHQgKi9cblx0JChwYXJhbSkge1xuXHRcdGxldCBlbCA9IG51bGw7XG5cblx0XHRpZiAodHlwZW9mIHBhcmFtID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHQvLyBjaGVjayBpZiBzdHJpbmcgaXMgSFRNTCB0YWcgZm9ybWF0XG5cdFx0XHRjb25zdCBtYXRjaCA9IHBhcmFtLm1hdGNoKC9ePChbYS16XSspXFxzKihbXj5dKik+Lyk7XG5cblx0XHRcdC8vIGNyZWF0aW5nIGVsZW1lbnRcblx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobWF0Y2hbMV0pO1xuXG5cdFx0XHRcdC8vIGF0dHJpYnV0ZXNcblx0XHRcdFx0bWF0Y2gubGVuZ3RoID09PSAzICYmXG5cdFx0XHRcdFx0bWF0Y2hbMl0uc3BsaXQoXCIgXCIpLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBhdHRyID0gdi5zcGxpdChcIj1cIik7XG5cblx0XHRcdFx0XHRcdGVsLnNldEF0dHJpYnV0ZShhdHRyWzBdLCBhdHRyWzFdLnRyaW0oKS5yZXBsYWNlKC8oXltcIiddfFtcIiddJCkvZywgXCJcIikpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtKTtcblxuXHRcdFx0XHRpZiAoIWVsLmxlbmd0aCkge1xuXHRcdFx0XHRcdGVsID0gbnVsbDtcblx0XHRcdFx0fSBlbHNlIGlmIChlbC5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRlbCA9IGVsWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChwYXJhbS5ub2RlTmFtZSAmJiBwYXJhbS5ub2RlVHlwZSA9PT0gMSkge1xuXHRcdFx0ZWwgPSBwYXJhbTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZWw7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRvIGFycmF5XG5cdCAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb258SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEByZXR1cm5zIHtBcnJheX1cblx0ICovXG5cdHRvQXJyYXkoZWwpIHtcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChlbCk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIGlzIGFycmF5XG5cdCAqIEBwYXJhbSBhcnJcblx0ICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAqL1xuXHRpc0FycmF5KGFycikge1xuXHRcdHJldHVybiBhcnIgJiYgYXJyLmNvbnN0cnVjdG9yID09PSBBcnJheTtcblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgaWYgaXMgb2JqZWN0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0ICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAqL1xuXHRpc09iamVjdChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiAhdGhpcy5pc0FycmF5KG9iaik7XG5cdH0sXG5cblx0LyoqXG5cdCAqIE1lcmdlIG9iamVjdCByZXR1cm5pbmcgbmV3IG9iamVjdFxuXHQgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3ROXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XG5cdCAqIEBleGFtcGxlXG5cdCAqICB2YXIgdGFyZ2V0ID0geyBhOiAxIH07XG5cdCAqICB1dGlscy5leHRlbmQodGFyZ2V0LCB7IGI6IDIsIGM6IDMgfSk7XG5cdCAqICB0YXJnZXQ7ICAvLyB7IGE6IDEsIGI6IDIsIGM6IDMgfTtcblx0ICovXG5cdGV4dGVuZCh0YXJnZXQsIC4uLm9iamVjdE4pIHtcblx0XHRpZiAoIW9iamVjdE4ubGVuZ3RoIHx8IChvYmplY3ROLmxlbmd0aCA9PT0gMSAmJiAhb2JqZWN0TlswXSkpIHtcblx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc291cmNlID0gb2JqZWN0Ti5zaGlmdCgpO1xuXG5cdFx0aWYgKHRoaXMuaXNPYmplY3QodGFyZ2V0KSAmJiB0aGlzLmlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHRcdGlmICh0aGlzLmlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XG5cblx0XHRcdFx0XHR0YXJnZXRba2V5XSA9IHRoaXMuZXh0ZW5kKHRhcmdldFtrZXldLCB2YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFyZ2V0W2tleV0gPSB0aGlzLmlzQXJyYXkodmFsdWUpID9cblx0XHRcdFx0XHRcdHZhbHVlLmNvbmNhdCgpIDogdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmV4dGVuZCh0YXJnZXQsIC4uLm9iamVjdE4pO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgb3Igc2V0IHRoZSBzdHlsZSB2YWx1ZSBvciBhcHBseVxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEFycmF5fSBlbFxuXHQgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHN0eWxlXG5cdCAqICBTdHJpbmc6IHJldHVybiBzdHlsZSBwcm9wZXJ0eSB2YWx1ZVxuXHQgKiAgT2JqZWN0OiBzZXQgc3R5bGUgdmFsdWVcblx0ICogQHBhcmFtIHtCb29sZWFufSBnZXRBc051bWJlciBHZXQgdGhlIHZhbHVlIGFzIG51bWJlclxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfEhUTUxFbGVtZW50fVxuXHQgKi9cblx0Y3NzKGVsLCBzdHlsZSwgZ2V0QXNOdW1iZXIpIHtcblx0XHRpZiAodHlwZW9mKHN0eWxlKSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0bGV0IHZhbHVlID0gZWwuc3R5bGVbc3R5bGVdO1xuXG5cdFx0XHRpZiAoIXZhbHVlIHx8IHZhbHVlID09PSBcImF1dG9cIiB8fCAoL1xcZC8udGVzdCh2YWx1ZSkgJiYgIS9cXGQocHgpPyQvLnRlc3QodmFsdWUpKSkge1xuXHRcdFx0XHR2YWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVtzdHlsZV07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBnZXRBc051bWJlciA/IHRoaXMuZ2V0TnVtVmFsdWUodmFsdWUpIDogdmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGFwcGx5U3R5bGUgPSAodGFyZ2V0LCBzb3VyY2UpID0+XG5cdFx0XHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0XHR0YXJnZXRbdl0gPSBzb3VyY2Vbdl07XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmlzQXJyYXkoZWwpID9cblx0XHRcdFx0ZWwuZm9yRWFjaCh2ID0+IGFwcGx5U3R5bGUodi5zdHlsZSwgc3R5bGUpKSA6XG5cdFx0XHRcdGFwcGx5U3R5bGUoZWwuc3R5bGUsIHN0eWxlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZWw7XG5cdH0sXG5cblx0LyoqXG5cdCAqIGNsYXNzTGlzdFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0YXJnZXQgRE9NIGVsZW1lbnRcblx0ICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBjbGFzcyBuYW1lIHN0cmluZyB0byBiZSBoYW5kbGVkXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYWRkIEFkZCBvciByZW1vdmUgY2xhc3MgLSB0cnVlOiBBZGQsIGZhbHNlOiBSZW1vdmVcblx0ICogQHJldHVybiB7Qm9vbGVhbn0gaWYgYWRkIHBhcmFtIGlzIG1pc3NpbmcsIHRoZW4gcmV0dXJuIGV4aXN0ZW5jZSBvZiBjbGFzcyBuYW1lXG5cdCAqL1xuXHRjbGFzc0xpc3QoZWwsIGNsYXNzTmFtZSwgYWRkKSB7XG5cdFx0Y29uc3QgaXNBZGRQYXJhbSA9IHR5cGVvZiBhZGQgPT09IFwiYm9vbGVhblwiO1xuXHRcdGxldCByZXM7XG5cblx0XHRpZiAoZWwuY2xhc3NMaXN0KSB7XG5cdFx0XHRyZXMgPSBlbC5jbGFzc0xpc3RbXG5cdFx0XHRcdChpc0FkZFBhcmFtICYmIChhZGQgPyBcImFkZFwiIDogXCJyZW1vdmVcIikpIHx8IFwiY29udGFpbnNcIlxuXHRcdFx0XShjbGFzc05hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXMgPSBlbC5jbGFzc05hbWU7XG5cblx0XHRcdGlmIChpc0FkZFBhcmFtKSB7XG5cdFx0XHRcdGlmIChhZGQgJiYgcmVzLmluZGV4T2YoY2xhc3NOYW1lKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRyZXMgPSBlbC5jbGFzc05hbWUgPSAoYCR7cmVzfSAke2NsYXNzTmFtZX1gKS5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKTtcblx0XHRcdFx0fSBlbHNlIGlmICghYWRkKSB7XG5cdFx0XHRcdFx0cmVzID0gZWwuY2xhc3NOYW1lID0gcmVzLnJlcGxhY2UoY2xhc3NOYW1lLCBcIlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzID0gbmV3IFJlZ0V4cChgXFxcXGIke2NsYXNzTmFtZX1cXFxcYmApLnRlc3QocmVzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDaGVjayBhbmQgcGFyc2UgdmFsdWUgdG8gbnVtYmVyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gdmFsXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWZWYWxcblx0ICogQHJldHVybiB7TnVtYmVyfVxuXHQgKi9cblx0Z2V0TnVtVmFsdWUodmFsLCBkZWZWYWwpIHtcblx0XHRsZXQgbnVtID0gdmFsO1xuXG5cdFx0cmV0dXJuIGlzTmFOKG51bSA9IHBhcnNlRmxvYXQobnVtKSkgPyBkZWZWYWwgOiBudW07XG5cdH0sXG5cblx0LyoqXG5cdCAqIFJldHVybiB1bml0IGZvcm1hdHRlZCB2YWx1ZVxuXHQgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHZhbFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IHZhbCBWYWx1ZSBmb3JtYXR0ZWQgd2l0aCB1bml0XG5cdCAqL1xuXHRnZXRVbml0VmFsdWUodmFsKSB7XG5cdFx0Y29uc3QgcnggPSAvKD86W2Etel17Mix9fCUpJC87XG5cblx0XHRyZXR1cm4gKHBhcnNlRmxvYXQodmFsKSB8fCAwKSArIChTdHJpbmcodmFsKS5tYXRjaChyeCkgfHwgXCJweFwiKTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0IGVsZW1lbnQncyBvdXRlciB2YWx1ZVxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFtvdXRlcldpZHRofG91dGVySGVpZ2h0XVxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBvdXRlcidzIHZhbHVlXG5cdCAqL1xuXHRnZXRPdXRlcihlbCwgdHlwZSkge1xuXHRcdGxldCBwYWRkaW5nTWFyZ2luID0gMDtcblxuXHRcdCh0eXBlID09PSBcIm91dGVyV2lkdGhcIiA/XG5cdFx0XHRbXCJMZWZ0XCIsIFwiUmlnaHRcIl0gOlxuXHRcdFx0W1wiVG9wXCIsIFwiQm90dG9tXCJdXG5cdFx0KS5mb3JFYWNoKGRpciA9PiB7XG5cdFx0XHRbXCJwYWRkaW5nXCIsIFwibWFyZ2luXCJdLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdHBhZGRpbmdNYXJnaW4gKz0gdGhpcy5jc3MoZWwsIGAke3Z9JHtkaXJ9YCwgdHJ1ZSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzLmNzcyhlbCwgdHlwZS5yZXBsYWNlKFwib3V0ZXJcIiwgXCJcIikudG9Mb2NhbGVMb3dlckNhc2UoKSwgdHJ1ZSkgKyBwYWRkaW5nTWFyZ2luO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgZWxlbWVudCdzIG91dGVyV2lkdGggdmFsdWUgd2l0aCBtYXJnaW5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcblx0ICogQHJldHVybnMge051bWJlcn1cblx0ICovXG5cdG91dGVyV2lkdGgoZWwpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPdXRlcihlbCwgXCJvdXRlcldpZHRoXCIpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgZWxlbWVudCdzIG91dGVySGVpZ2h0IHZhbHVlIHdpdGggbWFyZ2luXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9XG5cdCAqL1xuXHRvdXRlckhlaWdodChlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE91dGVyKGVsLCBcIm91dGVySGVpZ2h0XCIpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBzeW50YXggb2YgdGhlIHRyYW5zbGF0ZSBzdHlsZSB3aGljaCBpcyBhcHBsaWVkIHRvIENTUyB0cmFuc2l0aW9uIHByb3BlcnRpZXMuXG5cdCAqXG5cdCAqIEBrbyBDU1Mg7Yq4656c7KeA7IWYIOyGjeyEseyXkCDsoIHsmqntlaAgdHJhbnNsYXRlIOyKpO2DgOydvCDqtazrrLjsnYQg67CY7ZmY7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcjdHJhbnNsYXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB4IERpc3RhbmNlIHRvIG1vdmUgYWxvbmcgdGhlIFggYXhpcyA8a28+eOy2leydhCDrlLDrnbwg7J2064+Z7ZWgIOqxsOumrDwva28+XG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB5IERpc3RhbmNlIHRvIG1vdmUgYWxvbmcgdGhlIFkgYXhpcyA8a28+eey2leydhCDrlLDrnbwg7J2064+Z7ZWgIOqxsOumrDwva28+XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzSEFdIEZvcmNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiA8a28+7ZWY65Oc7Juo7Ja0IOqwgOyGjSDsgqzsmqkg7Jes67aAPC9rbz5cblx0ICogQHJldHVybiB7U3RyaW5nfSBTeW50YXggb2YgdGhlIHRyYW5zbGF0ZSBzdHlsZSA8a28+dHJhbnNsYXRlIOyKpO2DgOydvCDqtazrrLg8L2tvPlxuXHQgKi9cblx0dHJhbnNsYXRlKHgsIHksIGlzSEEpIHtcblx0XHRyZXR1cm4gaXNIQSB8fCBmYWxzZSA/XG5cdFx0XHRgdHJhbnNsYXRlM2QoJHt4fSwke3l9LDApYCA6IGB0cmFuc2xhdGUoJHt4fSwke3l9KWA7XG5cdH0sXG5cblx0Ly8gMS4gdXNlciBwcmVzcyBvbmUgcG9zaXRpb24gb24gc2NyZWVuLlxuXHQvLyAyLiB1c2VyIG1vdmVzIHRvIHRoZSBvdGhlciBwb3NpdGlvbiBvbiBzY3JlZW4uXG5cdC8vIDMuIHdoZW4gdXNlciByZWxlYXNlcyBmaW5nZXJzIG9uIHNjcmVlbiwgJ2NsaWNrJyBldmVudCBpcyBmaXJlZCBhdCBwcmV2aW91cyBwb3NpdGlvbi5cblx0aGFzQ2xpY2tCdWcoKSB7XG5cdFx0Y29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblx0XHRjb25zdCByZXN1bHQgPSAvaVBob25lfGlQYWQvLnRlc3QodWEpO1xuXG5cdFx0dGhpcy5oYXNDbGlja0J1ZyA9ICgpID0+IHJlc3VsdDtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG59O1xuXG5jbGFzcyBNaXhpbkJ1aWxkZXIge1xuXHRjb25zdHJ1Y3RvcihzdXBlcmNsYXNzKSB7XG5cdFx0dGhpcy5zdXBlcmNsYXNzID0gc3VwZXJjbGFzcyB8fCBjbGFzcyB7fTtcblx0fVxuXG5cdHdpdGgoLi4ubWl4aW5zKSB7XG5cdFx0cmV0dXJuIG1peGlucy5yZWR1Y2UoKGMsIG0pID0+IG0oYyksIHRoaXMuc3VwZXJjbGFzcyk7XG5cdH1cbn1cblxuY29uc3QgTWl4aW4gPSBzdXBlcmNsYXNzID0+IG5ldyBNaXhpbkJ1aWxkZXIoc3VwZXJjbGFzcyk7XG5cbmV4cG9ydCB7dXRpbHMsIE1peGlufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHt3aW5kb3cgYXMgZ2xvYmFsLCBkb2N1bWVudCBhcyBkb2N9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuLy8gZGVmaW5lIGN1c3RvbSBldmVudHMgbmFtZVxuY29uc3QgRVZFTlRTID0ge1xuXHRiZWZvcmVGbGlja1N0YXJ0OiBcImJlZm9yZUZsaWNrU3RhcnRcIixcblx0YmVmb3JlUmVzdG9yZTogXCJiZWZvcmVSZXN0b3JlXCIsXG5cdGZsaWNrOiBcImZsaWNrXCIsXG5cdGZsaWNrRW5kOiBcImZsaWNrRW5kXCIsXG5cdHJlc3RvcmU6IFwicmVzdG9yZVwiXG59O1xuXG4vLyBjaGVjayBmb3IgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0eVxuY29uc3QgVFJBTlNGT1JNID0ge1xuXHRuYW1lOiBcInRyYW5zZm9ybVwiXG59O1xuXG5UUkFOU0ZPUk0uc3VwcG9ydCA9ICgoKSA9PiB7XG5cdGlmICghZG9jLmRvY3VtZW50RWxlbWVudCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCBzdHlsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cblx0cmV0dXJuIFRSQU5TRk9STS5uYW1lIGluIHN0eWxlIHx8IChUUkFOU0ZPUk0ubmFtZSA9IFwid2Via2l0VHJhbnNmb3JtXCIpIGluIHN0eWxlO1xufSkoKTtcblxuLy8gY2hlY2sgZm9yIHdpbGwtY2hhbmdlIHN1cHBvcnRcbmNvbnN0IFNVUFBPUlRfV0lMTENIQU5HRSA9IGdsb2JhbC5DU1MgJiYgZ2xvYmFsLkNTUy5zdXBwb3J0cyAmJlxuXHRnbG9iYWwuQ1NTLnN1cHBvcnRzKFwid2lsbC1jaGFuZ2VcIiwgXCJ0cmFuc2Zvcm1cIik7XG5cbi8vIGNoZWNrIGZvciBBbmRyb2lkIDIueFxuY29uc3QgSVNfQU5EUk9JRDIgPSAvQW5kcm9pZCAyXFwuLy50ZXN0KGdsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLy8gZGF0YS1oZWlnaHQgYXR0cmlidXRlJ3MgbmFtZSBmb3IgYWRhcHRpdmVIZWlnaHQgb3B0aW9uXG5jb25zdCBEQVRBX0hFSUdIVCA9IFwiZGF0YS1oZWlnaHRcIjtcblxuZXhwb3J0IHtcblx0RVZFTlRTLFxuXHRUUkFOU0ZPUk0sXG5cdFNVUFBPUlRfV0lMTENIQU5HRSxcblx0SVNfQU5EUk9JRDIsXG5cdERBVEFfSEVJR0hUXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vLyBpbnRlcm5hbCBjb25maWcgdmFsdWVzXG5jb25zdCBDT05GSUcgPSB7XG5cdHBhbmVsOiB7XG5cdFx0JGxpc3Q6IG51bGwsICAgICAgICAvLyBwYW5lbCBsaXN0XG5cdFx0aW5kZXg6IDAsXHRcdFx0Ly8gZG9tIGluZGV4IHVzZWQgYW1vbmcgcHJvY2Vzc1xuXHRcdG5vOiAwLFx0XHRcdFx0Ly8gcGFuZWwgbm8gdXNlZCBhbW9uZyBwcm9jZXNzXG5cdFx0Y3VyckluZGV4OiAwLCAgICAgICAvLyBjdXJyZW50IHBoeXNpY2FsIGRvbSBpbmRleFxuXHRcdGN1cnJObzogMCwgICAgICAgICAgLy8gY3VycmVudCBsb2dpY2FsIHBhbmVsIG51bWJlclxuXHRcdHNpemU6IDAsXHRcdFx0Ly8gcGFuZWwgc2l6ZVxuXHRcdGNvdW50OiAwLFx0XHRcdC8vIHRvdGFsIHBoeXNpY2FsIHBhbmVsIGNvdW50XG5cdFx0b3JpZ0NvdW50OiAwLFx0XHQvLyB0b3RhbCBjb3VudCBvZiBnaXZlbiBvcmlnaW5hbCBwYW5lbHNcblx0XHRjaGFuZ2VkOiBmYWxzZSxcdFx0Ly8gaWYgcGFuZWwgY2hhbmdlZFxuXHRcdGFuaW1hdGluZzogZmFsc2UsXHQvLyBjdXJyZW50IGFuaW1hdGluZyBzdGF0dXMgYm9vbGVhblxuXHRcdG1pbkNvdW50OiAzICAgICAgICAgLy8gbWluaW11bSBwYW5lbCBjb3VudFxuXHR9LFxuXHR0b3VjaDoge1xuXHRcdGhvbGRQb3M6IDAsICAgICAgICAgLy8gaG9sZCB4LHkgY29vcmRpbmF0ZVxuXHRcdGRlc3RQb3M6IDAsXHQgICAgICAgIC8vIGRlc3RpbmF0aW9uIHgseSBjb29yZGluYXRlXG5cdFx0ZGlzdGFuY2U6IDAsXHRcdC8vIHRvdWNoIGRpc3RhbmNlIHBpeGVsIG9mIHN0YXJ0IHRvIGVuZCB0b3VjaFxuXHRcdGRpcmVjdGlvbjogbnVsbCxcdC8vIHRvdWNoIGRpcmVjdGlvblxuXHRcdGxhc3RQb3M6IDAsXHRcdFx0Ly8gdG8gZGV0ZXJtaW5lIG1vdmUgb24gaG9sZGluZ1xuXHRcdGhvbGRpbmc6IGZhbHNlLFxuXHRcdGlzVHJ1c3RlZDogZmFsc2UgICAgLy8gaWYgZXZlbnQgd2FzIGluc3RhbnRpYXRlZCBieSB1c2VyJ3MgYWN0aW9uIGV4cGxpY2l0bHlcblx0fSxcblx0Y3VzdG9tRXZlbnQ6IHsgICAgICAgICAgLy8gZm9yIGN1c3RvbSBldmVudHMgdmFsdWVcblx0XHRmbGljazogdHJ1ZSxcblx0XHRyZXN0b3JlOiBmYWxzZSxcblx0XHRyZXN0b3JlQ2FsbDogZmFsc2Vcblx0fSxcblx0ZGlyRGF0YTogW10sXHRcdFx0Ly8gZGlyZWN0aW9uIGNvbnN0YW50IHZhbHVlIGFjY29yZGluZyBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG5cdGluZGV4VG9Nb3ZlOiAwLFxuXHQkZHVtbXlBbmNob3I6IG51bGwgICAgICAvLyBGb3IgYnVnZ3kgbGluayBoaWdobGlnaHRpbmcgb24gQW5kcm9pZCAyLnhcbn07XG5cblxuLy8gZGVmYXVsdCBvcHRpb25zXG5jb25zdCBPUFRJT05TID0ge1xuXHRod0FjY2VsZXJhYmxlOiB0cnVlLCAgICAvLyBzZXQgZm9yIGh3IGFjY2VsZXJhdGlvbiAoc2VlIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL25ldGlsL2MxZDFiNjdlMWMxOTI2MzY0YzA3MDlmMTEwYTA5YjQ0IGZvciBvbGQgZGV2aWNlcyBzdXBwb3J0KVxuXHRwcmVmaXg6IFwiZWctZmxpY2tcIiwgICAgIC8vIHByZWZpeCB2YWx1ZSBvZiBjbGFzcyBuYW1lXG5cdGRlY2VsZXJhdGlvbjogMC4wMDA2LCAgIC8vIGRlY2VsZXJhdGlvbiB2YWx1ZVxuXHRob3Jpem9udGFsOiB0cnVlLCAgICAgICAvLyBtb3ZlIGRpcmVjdGlvbiAodHJ1ZSA9PSBob3Jpem9udGFsLCBmYWxzZSA9PSB2ZXJ0aWNhbClcblx0Y2lyY3VsYXI6IGZhbHNlLCAgICAgICAgLy8gY2lyY3VsYXIgbW9kZS4gSW4gdGhpcyBtb2RlIGF0IGxlYXN0IDMgcGFuZWxzIGFyZSByZXF1aXJlZC5cblx0cHJldmlld1BhZGRpbmc6IG51bGwsICAgLy8gcHJldmlldyBwYWRkaW5nIHZhbHVlIGluIGxlZnQodXApIHRvIHJpZ2h0KGRvd24pIG9yZGVyLiBJbiB0aGlzIG1vZGUgYXQgbGVhc3QgNSBwYW5lbHMgYXJlIHJlcXVpcmVkLlxuXHRib3VuY2U6IG51bGwsICAgICAgICAgICAvLyBib3VuY2UgdmFsdWUgaW4gbGVmdCh1cCkgdG8gcmlnaHQoZG93bikgb3JkZXIuIFdvcmtzIG9ubHkgaW4gbm9uLWNpcmN1bGFyIG1vZGUuXG5cdHRocmVzaG9sZDogNDAsICAgICAgICAgIC8vIHRoZSBkaXN0YW5jZSBwaXhlbCB0aHJlc2hvbGQgdmFsdWUgZm9yIGNoYW5nZSBwYW5lbFxuXHRkdXJhdGlvbjogMTAwLCAgICAgICAgICAvLyBkdXJhdGlvbiBtcyBmb3IgYW5pbWF0aW9uXG5cdHBhbmVsRWZmZWN0OiB4ID0+IDEgLSBNYXRoLnBvdygxIC0geCwgMyksICAvLyBlYXNpbmcgZnVuY3Rpb24gZm9yIHBhbmVsIGNoYW5nZSBhbmltYXRpb25cblx0ZGVmYXVsdEluZGV4OiAwLCAgICAgICAgLy8gaW5pdGlhbCBwYW5lbCBpbmRleCB0byBiZSBzaG93blxuXHRpbnB1dFR5cGU6IFsgICAgICAgICAgICAvLyBpbnB1dCB0eXBlXG5cdFx0XCJ0b3VjaFwiLCBcIm1vdXNlXCJcblx0XSxcblx0dGhyZXNob2xkQW5nbGU6IDQ1LCAgICAgLy8gdGhlIHRocmVzaG9sZCB2YWx1ZSB0aGF0IGRldGVybWluZXMgd2hldGhlciB1c2VyIGFjdGlvbiBpcyBob3Jpem9udGFsIG9yIHZlcnRpY2FsICgwfjkwKVxuXHRhZGFwdGl2ZUhlaWdodDogZmFsc2UsICAvLyBTZXQgY29udGFpbmVyJ3MgaGVpZ2h0IGJlIGFkYXB0aXZlIGFjY29yZGluZyBwYW5lbCdzIGhlaWdodFxuXHR6SW5kZXg6IDIwMDAsICAgICAgICAgICAvLyB6LWluZGV4IHZhbHVlIGZvciBjb250YWluZXIgZWxlbWVudFxuXHR1c2VUcmFuc2xhdGU6IHRydWUgICAgICAvLyB1c2Ugb2YgdHJhbnNsYXRlIG9uIHBhbmVsIG1vdmVzXG59O1xuXG5leHBvcnQge1xuXHRDT05GSUcsXG5cdE9QVElPTlNcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBOQVZFUiBDb3JwLlxuICogZWdqcyBwcm9qZWN0cyBhcmUgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7RVZFTlRTfSBmcm9tIFwiLi9jb25zdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXHQvKipcblx0ICogJ2hvbGQnIGV2ZW50IGhhbmRsZXJcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9ob2xkSGFuZGxlcihlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgdG91Y2ggPSBjb25mLnRvdWNoO1xuXHRcdGNvbnN0IGhvbGRQb3MgPSBlLnBvcy5mbGljaztcblxuXHRcdHRvdWNoLmhvbGRQb3MgPSBob2xkUG9zO1xuXHRcdHRvdWNoLmhvbGRpbmcgPSB0cnVlO1xuXHRcdHRvdWNoLmlzVHJ1c3RlZCA9IHRydWU7XG5cdFx0Y29uZi5wYW5lbC5jaGFuZ2VkID0gZmFsc2U7XG5cblx0XHR0aGlzLl9hZGp1c3RDb250YWluZXJDc3MoXCJzdGFydFwiLCBob2xkUG9zKTtcblx0fVxuXG5cdC8qKlxuXHQgKiAnY2hhbmdlJyBldmVudCBoYW5kbGVyXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfY2hhbmdlSGFuZGxlcihlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgdG91Y2ggPSBjb25mLnRvdWNoO1xuXHRcdGNvbnN0IHBvcyA9IGUucG9zLmZsaWNrO1xuXHRcdGNvbnN0IGhvbGRQb3MgPSB0b3VjaC5ob2xkUG9zO1xuXHRcdGxldCBkaXJlY3Rpb247XG5cdFx0bGV0IGV2ZW50UmVzID0gbnVsbDtcblx0XHRsZXQgbW92ZWRQeDtcblxuXHRcdHRoaXMuX3NldFBvaW50ZXJFdmVudHMoZSk7ICAvLyBmb3IgXCJjbGlja1wiIGJ1Z1xuXG5cdFx0LyoqXG5cdFx0ICogQW4gZXZlbnQgdGhhdCBvY2N1cnMgd2hlbmV2ZXIgdGhlIHBhbmVsJ3MgY29vcmRpbmF0ZSB2YWx1ZSBjaGFuZ2VzLiBJdCBvY2N1cnMgaW4gdGhlIGZvbGxvd2luZyBjYXNlcy48YnI+PGJyPjEuIFdoZW4gdGhlIHVzZXIgaXMgaW5wdXRpbmcgdGhlIG1vdmUuPGJyPjIuIFdoZW4gbW92aW5nIHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbCBhZnRlciB5b3UgaGF2ZSBmaW5pc2hlZCBpbnB1dGluZyB0aGUgbW92ZSBpbiBzdGVwIDEuPGJyPjMuIFdoZW4gdGhlIGN1cnJlbnQgcGFuZWwgaXMgbW92aW5nIHRvIGl0cyBvcmlnaW5hbCBwb3NpdGlvbiBhZnRlciB0aGUgbW92ZW1lbnQgaXMgZmluaXNoZWQgaW4gc3RlcCAxLjxicj40LiBNb3ZpbmcgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsIGJ5IGNhbGxpbmcgdGhlIGBtb3ZlVG8oKWAsIGBwcmV2KClgLCBgbmV4dCgpYCAgbWV0aG9kLiAoRG8gbm90IHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSBldmVudC4pXG5cdFx0ICogQGtvIO2MqOuEkOydmCDsooztkZzqsJLsnbQg67OA7ZWgIOuVjOuniOuLpCDrsJzsg53tlZjripQg7J2067Kk7Yq4LiDslYTrnpjsnZgg6rK97Jqw7JeQIOuwnOyDne2VnOuLpC48YnI+PGJyPjEuIOyCrOyaqeyekOqwgCDsnbTrj5kobW92ZSkg7JWh7IWYIOyeheugpeykkeydvCDrlYwuPGJyPjIuIDHrsojsl5DshJwg7J2064+ZKG1vdmUpIOyVoeyFmCDsnoXroKXsnbQg64Gd64KY6rOgIOuqqeyggSDtjKjrhJDroZwg7J2064+Z7KSR7J28IOuVjC48YnI+My4gMeuyiOyXkOyEnCDsnbTrj5kobW92ZSkg7JWh7IWYIOyeheugpeydtCDrgZ3rgpjqs6Ag7ZiE7J6sIO2MqOuEkOydmCDsm5Drnpgg7JyE7LmY66GcIOydtOuPmeykkeydvCDrlYwuPGJyPjQuIGBtb3ZlVG8oKWAsIGBwcmV2KClgLCBgbmV4dCgpYCwg66mU7ISc65Oc66W8IO2YuOy2nO2VmOyXrCDrqqnsoIEg7Yyo64SQ66GcIOydtOuPmeykkeydvCDrlYwuIChbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH3snbTrsqTtirjsnZgg6riw67O464+Z7J6R7J2EIOunieyngCDslYrslYTslbwg7ZWc64ukLik8YnI+NS4gYHJlc3RvcmUoKWAg66mU7ISc65Oc66W8IO2YuOy2nO2VmOyXrCDtmITsnqwg7Yyo64SQ7J20IOybkOuemCDsnITsuZjroZwg7J2064+Z7KSR7J28IOuVjC4gKFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0feydtOuypO2KuOydmCDquLDrs7jrj5nsnpEg67Cp7KeAIOyghOygnC4pXG5cdFx0ICogQG5hbWUgZWcuRmxpY2tpbmcjZmxpY2tcblx0XHQgKiBAZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge1N0cmluZ30gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudDxrbz7snbTrsqTtirgg66qFPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVHJ1c3RlZCB0cnVlIHdoZW4gdGhlIGV2ZW50IHdhcyBnZW5lcmF0ZWQgYnkgYSB1c2VyIGFjdGlvbihgXCJtb3VzZVwiYCBvciBgXCJ0b3VjaFwiYCkgb3RoZXJ3aXNlIGZhbHNlPGtvPuyCrOyaqeyekCDslaHshZgoYFwibW91c2VcImAg65iQ64qUIGBcInRvdWNoXCJgKeyXkCDsnZjtlbQg7J2067Kk7Yq46rCAIOyDneyEseuQnCDqsr3smrAgYHRydWVgLiDqt7gg7Jm464qUIGBmYWxzZWA8L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBubyBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gU2VlIHRoZSBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IG1ldGhvZC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGlyZWN0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudC4gSWYgYGhvcml6b250YWw9dHJ1ZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gSWYgYGhvcml6b250YWw9ZmFsc2VgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPGtvPu2MqOuEkCDsnbTrj5kg67Cp7ZalLiBgaG9yaXpvbnRhbD10cnVlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIGBob3Jpem9udGFsPWZhbHNlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gcG9zIGN1cnJlbnQgY29vcmRpbmF0ZSA8a28+7ZiE7J6sIOyijO2RnC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaG9sZGluZyBXaGV0aGVyIHRoZSB1c2VyIGlzIGlucHV0aW5nIHRocm91Z2ggdGhlIGlucHV0IGRldmljZS4gKFdoZXRoZXIgaXQgaXMgJ21vdXNlZG93bicgZm9yIGEgbW91c2UgZGV2aWNlIG9yICd0b3VjaG1vdmUnIGZvciBhIHRvdWNoIGRldmljZS4pPGtvPuyCrOyaqeyekOqwgCDsnoXroKUg7J6l7LmY66W8IO2Gte2VtCDsnoXroKXspJHsnbjsp4Ag7Jes67aALiAo66eI7Jqw7IqkIOyepey5mOudvOuptCAnbW91c2Vkb3duJyDsl6zrtoAsIO2EsOy5mCDsnqXsuZjrnbzrqbQgJ3RvdWNobW92ZScg7Jes67aAKTwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpc3RhbmNlIERpc3RhbmNlIHZhbHVlIGZyb20gdGhlIHRvdWNoIHN0YXJ0aW5nIHBvaW50LiBJZiB0aGUgYGRpcmVjdGlvbmAgcHJvcGVydHkgdmFsdWUgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSwgaXQgcmV0dXJucyBhIHBvc2l0aXZlIG51bWJlci4ge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfSByZXR1cm5zIGEgbmVnYXRpdmUgdmFsdWUuPGtvPu2EsOy5mCDsi5zsnpHsoJDsnLzroZzrtoDthLAg7J2064+Z7ZWcIOqxsOumrCDqsJIuIGBkaXJlY3Rpb25g7IaN7ISx6rCS7J20IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB97J2066m0IOyWkeyImOulvCwge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn3snbTrqbQg7J2M7IiY66W8IOuwmO2ZmO2VnOuLpC48L2tvPlxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlUmVzdG9yZVxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydFxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmRcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI21vdmVUb1xuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcHJldlxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjbmV4dFxuXHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiBUaGUgb3JkZXIgb2YgZXZlbnQgb2NjdXJyZW5jZS5cblx0XHRcdCAqIOydtOuypO2KuCDrsJzsg50g7Iic7IScXG5cdFx0XHQgKiBgYGBqYXZhc2NyaXB0XG5cdFx0XHQgKiAvLyBXaGVuIG1vdmluZyB0byB0aGUgZGVzdGluYXRpb24gcGFuZWwuXG5cdFx0XHQgKiAvLyDrqqnsoIEg7Yyo64SQ66GcIOydtOuPme2VoCDrlYwuXG5cdFx0XHQgKiBiZWZvcmVGbGlja1N0YXJ0IChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IGZsaWNrRW5kIChvbmNlKVxuXHRcdFx0ICpcblx0XHRcdCAqIC8vIFdoZW4gdGhlIHJlc3RvcmUgb3BlcmF0aW9uLlxuXHRcdFx0ICogLy8g67O17JuQIOuPmeyekeydvCDrlYwuXG5cdFx0XHQgKiBiZWZvcmVSZXN0b3JlIChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IHJlc3RvcmUgKG9uY2UpXG5cdFx0XHQgKiBgYGBcblx0XHQgKi9cblx0XHRpZiAoZS5pbnB1dEV2ZW50KSB7XG5cdFx0XHRkaXJlY3Rpb24gPSBlLmlucHV0RXZlbnQuZGlyZWN0aW9uO1xuXG5cdFx0XHQvLyBBZGp1c3QgZGlyZWN0aW9uIGluIGNhc2Ugb2YgZGlhZ29uYWwgdG91Y2ggbW92ZVxuXHRcdFx0bW92ZWRQeCA9IGUuaW5wdXRFdmVudFt0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbCA/IFwiZGVsdGFYXCIgOiBcImRlbHRhWVwiXTtcblxuXHRcdFx0aWYgKCF+Y29uZi5kaXJEYXRhLmluZGV4T2YoZGlyZWN0aW9uKSkge1xuXHRcdFx0XHRkaXJlY3Rpb24gPSBjb25mLmRpckRhdGFbKyhNYXRoLmFicyh0b3VjaC5sYXN0UG9zKSA8PSBtb3ZlZFB4KV07XG5cdFx0XHR9XG5cblx0XHRcdHRvdWNoLmxhc3RQb3MgPSBtb3ZlZFB4O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b3VjaC5sYXN0UG9zID0gbnVsbDtcblx0XHR9XG5cblx0XHRjb25mLmN1c3RvbUV2ZW50LmZsaWNrICYmIChldmVudFJlcyA9XG5cdFx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoRVZFTlRTLmZsaWNrLCB7XG5cdFx0XHRcdHBvcyxcblx0XHRcdFx0aG9sZGluZzogZS5ob2xkaW5nLFxuXHRcdFx0XHRkaXJlY3Rpb246IGRpcmVjdGlvbiB8fCB0b3VjaC5kaXJlY3Rpb24sXG5cdFx0XHRcdGRpc3RhbmNlOiB0b3VjaC5pc1RydXN0ZWQgPyBwb3MgLSBob2xkUG9zIDogbnVsbFxuXHRcdFx0fSlcblx0XHQpO1xuXG5cdFx0KGV2ZW50UmVzIHx8IGV2ZW50UmVzID09PSBudWxsKSAmJiB0aGlzLl9zZXRUcmFuc2xhdGUoWy1wb3MsIDBdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiAncmVsZWFzZScgZXZlbnQgaGFuZGxlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X3JlbGVhc2VIYW5kbGVyKGUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCB0b3VjaCA9IGNvbmYudG91Y2g7XG5cdFx0Y29uc3QgaG9sZFBvcyA9IHRvdWNoLmhvbGRQb3M7XG5cdFx0Y29uc3QgcGFuZWxTaXplID0gY29uZi5wYW5lbC5zaXplO1xuXHRcdGNvbnN0IGN1c3RvbUV2ZW50ID0gY29uZi5jdXN0b21FdmVudDtcblx0XHRjb25zdCBpc1BsdXNNb3ZlID0gdG91Y2guaG9sZFBvcyA8IGUuZGVwYVBvcy5mbGljaztcblxuXHRcdHRvdWNoLmRpc3RhbmNlID0gZS5kZXBhUG9zLmZsaWNrIC0gaG9sZFBvcztcblx0XHR0b3VjaC5kaXJlY3Rpb24gPSBjb25mLmRpckRhdGFbKyEoaXNQbHVzTW92ZSldO1xuXHRcdHRvdWNoLmRlc3RQb3MgPSBob2xkUG9zICsgKGlzUGx1c01vdmUgPyBwYW5lbFNpemUgOiAtcGFuZWxTaXplKTtcblxuXHRcdGNvbnN0IGRpc3RhbmNlID0gdG91Y2guZGlzdGFuY2U7XG5cdFx0bGV0IGR1cmF0aW9uID0gdGhpcy5vcHRpb25zLmR1cmF0aW9uO1xuXHRcdGxldCBtb3ZlVG8gPSBob2xkUG9zO1xuXG5cdFx0aWYgKHRoaXMuX2lzTW92YWJsZSgpKSB7XG5cdFx0XHQhY3VzdG9tRXZlbnQucmVzdG9yZUNhbGwgJiYgKGN1c3RvbUV2ZW50LnJlc3RvcmUgPSBmYWxzZSk7XG5cdFx0XHRtb3ZlVG8gPSB0b3VjaC5kZXN0UG9zO1xuXHRcdH0gZWxzZSBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpID4gMCkge1xuXHRcdFx0dGhpcy5fdHJpZ2dlckJlZm9yZVJlc3RvcmUoZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGR1cmF0aW9uID0gMDtcblx0XHR9XG5cblx0XHQvLyB0cmlnZ2VyIGFuaW1hdGlvblxuXHRcdGUuc2V0VG8oe2ZsaWNrOiBtb3ZlVG99LCBkdXJhdGlvbik7XG5cblx0XHRkaXN0YW5jZSA9PT0gMCAmJiB0aGlzLl9hZGp1c3RDb250YWluZXJDc3MoXCJlbmRcIik7XG5cdFx0dG91Y2guaG9sZGluZyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc2V0UG9pbnRlckV2ZW50cygpOyAgLy8gZm9yIFwiY2xpY2tcIiBidWdcblx0fVxuXG5cdC8qKlxuXHQgKiAnYW5pbWF0aW9uU3RhcnQnIGV2ZW50IGhhbmRsZXJcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9hbmltYXRpb25TdGFydEhhbmRsZXIoZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCBjdXN0b21FdmVudCA9IGNvbmYuY3VzdG9tRXZlbnQ7XG5cdFx0Y29uc3QgaXNGcm9tSW5wdXQgPSBlLmlucHV0RXZlbnQgfHwgY29uZi50b3VjaC5sYXN0UG9zO1xuXG5cdFx0Ly8gd2hlbiBhbmltYXRpb24gd2FzIHN0YXJ0ZWQgYnkgaW5wdXQgYWN0aW9uXG5cdFx0aWYgKCFjdXN0b21FdmVudC5yZXN0b3JlQ2FsbCAmJiBpc0Zyb21JbnB1dCAmJlxuXHRcdFx0dGhpcy5fc2V0UGhhc2VWYWx1ZShcInN0YXJ0XCIsIHtcblx0XHRcdFx0ZGVwYVBvczogZS5kZXBhUG9zLmZsaWNrLFxuXHRcdFx0XHRkZXN0UG9zOiBlLmRlc3RQb3MuZmxpY2tcblx0XHRcdH0pID09PSBmYWxzZSkge1xuXHRcdFx0ZS5zdG9wKCk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzRnJvbUlucHV0KSB7XG5cdFx0XHRlLmR1cmF0aW9uID0gdGhpcy5vcHRpb25zLmR1cmF0aW9uO1xuXG5cdFx0XHRlLmRlc3RQb3MuZmxpY2sgPVxuXHRcdFx0XHRwYW5lbC5zaXplICogKFxuXHRcdFx0XHRcdHBhbmVsLmluZGV4ICsgY29uZi5pbmRleFRvTW92ZVxuXHRcdFx0XHQpO1xuXHRcdH1cblxuXHRcdHBhbmVsLmFuaW1hdGluZyA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogJ2FuaW1hdGlvbkVuZCcgZXZlbnQgaGFuZGxlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2FuaW1hdGlvbkVuZEhhbmRsZXIoKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cblx0XHRjb25mLnBhbmVsLmFuaW1hdGluZyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc2V0UGhhc2VWYWx1ZShcImVuZFwiKTtcblx0XHR0aGlzLl90cmlnZ2VyUmVzdG9yZSgpO1xuXG5cdFx0Ly8gcmVzZXQgaXNUcnVzdGVkXG5cdFx0Y29uZi50b3VjaC5pc1RydXN0ZWQgPSBmYWxzZTtcblx0fVxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGVnanMvY29tcG9uZW50XCI7XG5pbXBvcnQgQXhlcywge1BhbklucHV0fSBmcm9tIFwiQGVnanMvYXhlc1wiO1xuaW1wb3J0IHt1dGlscywgTWl4aW59IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge1xuXHRFVkVOVFMsXG5cdFRSQU5TRk9STSxcblx0U1VQUE9SVF9XSUxMQ0hBTkdFLFxuXHRJU19BTkRST0lEMixcblx0REFUQV9IRUlHSFRcbn0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQge0NPTkZJRywgT1BUSU9OU30gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQge2RvY3VtZW50fSBmcm9tIFwiLi9icm93c2VyXCI7XG5pbXBvcnQgZXZlbnRIYW5kbGVyIGZyb20gXCIuL2V2ZW50SGFuZGxlclwiO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgZWcuRmxpY2tpbmcgY2xhc3MuIENyZWF0ZSBhIGZsaWNraW5nIFVJIHRoYXQgc3dlZXBzIGEgc2lkZS1ieS1zaWRlIHBhbmVsIHdpdGggbW91c2UgbW92ZSBvciB0b3VjaCBtb3ZlIGlucHV0IGFuZCBtb3ZlcyB0byB0aGUgbmV4dCBvciBwcmV2aW91cyBwYW5lbC5cbiAqIEBrbyBlZy5GbGlja2luZyDtgbTrnpjsiqTsnZgg7J247Iqk7YS07Iqk66W8IOyDneyEse2VnOuLpC4g64KY656A7Z6IIOuwsOy5mO2VnCDtjKjrhJDsnYQg66eI7Jqw7IqkIOydtOuPmShtb3ZlKSDtmLnsnYAg7YSw7LmYIOydtOuPmShtb3ZlKSDsnoXroKXsnYQg67Cb7JWEIOyTuOyWtCDrhJjqsqgg64uk7J2MIO2MqOuEkOydtOuCmCDsnbTsoIQg7Yyo64SQ66GcIOydtOuPme2VmOuKlCBVSeulvCDrp4zrk6Dri6QuXG4gKiBAYWxpYXMgZWcuRmxpY2tpbmdcbiAqIEBleHRlbmRzIGVnLkNvbXBvbmVudFxuICogQHJlcXVpcmVzIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbmF2ZXIvZWdqcy1jb21wb25lbnR8ZWcuQ29tcG9uZW50fVxuICogQHJlcXVpcmVzIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbmF2ZXIvZWdqcy1heGVzfGVnLkF4ZXN9XG4gKiBAc2VlIEVhc2luZyBGdW5jdGlvbnMgQ2hlYXQgU2hlZXQge0BsaW5rIGh0dHA6Ly9lYXNpbmdzLm5ldC99IDxrbz7snbTsp5Ug7ZWo7IiYIENoZWF0IFNoZWV0IHtAbGluayBodHRwOi8vZWFzaW5ncy5uZXQvfTwva28+XG4gKiBAc2VlIElmIHlvdSB3YW50IHRvIHRyeSBhIGRpZmZlcmVudCBlYXNpbmcgZnVuY3Rpb24sIHVzZSB0aGUgalF1ZXJ5IGVhc2luZyBwbHVnaW4gKHtAbGluayBodHRwOi8vZ3NnZC5jby51ay9zYW5kYm94L2pxdWVyeS9lYXNpbmd9KSBvciB0aGUgalF1ZXJ5IFVJIGVhc2luZyBsaWJyYXJ5ICh7QGxpbmsgaHR0cHM6Ly9qcXVlcnl1aS5jb20vZWFzaW5nfSkuIDxrbz7ri6TrpbggZWFzaW5nIO2VqOyImOulvCDsgqzsmqntlZjroKTrqbQgalF1ZXJ5IGVhc2luZyDtlIzrn6zqt7jsnbgoe0BsaW5rIGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZ30p7J2064KYLCBqUXVlcnkgVUkgZWFzaW5nIOudvOydtOu4jOufrOumrCh7QGxpbmsgaHR0cHM6Ly9qcXVlcnl1aS5jb20vZWFzaW5nfSnrpbwg7IKs7Jqp7ZWc64ukPC9rbz5cbiAqIEB0aHJvd3Mge0Vycm9yfSBBbiBFcnJvciBvY2N1ciB3aGVuIGdpdmVuIGJhc2UgZWxlbWVudCBkb2Vzbid0IGV4aXN0IG9yIGl0IGhhc24ndCBwcm9wZXIgRE9NIHN0cnVjdHVyZSB0byBiZSBpbml0aWFsaXplZC4gPGtvPuyjvOyWtOynhCDquLDrs7gg7JqU7IaM6rCAIOyhtOyerO2VmOyngCDslYrqsbDrgpgg7LSI6riw7ZmUIO2VoCDsoIHsoIjtlZwgRE9NIOq1rOyhsOqwgOyXhuuKlCDqsr3smrAg7Jik66WY6rCAIOuwnOyDne2VnOuLpC48L2tvPlxuICogQHN1cHBvcnQge1wiaWVcIjogXCIxMCtcIiwgXCJjaFwiIDogXCJsYXRlc3RcIiwgXCJmZlwiIDogXCJsYXRlc3RcIiwgIFwic2ZcIiA6IFwibGF0ZXN0XCIgLCBcImVkZ2VcIiA6IFwibGF0ZXN0XCIsIFwiaW9zXCIgOiBcIjcrXCIsIFwiYW5cIiA6IFwiMi4zKyAoZXhjZXB0IDMueClcIn1cbiAqIEBleGFtcGxlXG4gKiBBIGNvbW1vbiBleGFtcGxlLlxuICog7J2867CY7KCB7J24IOyYiC5cbiAqIGBgYGh0bWxcbiAqIDxkaXYgaWQ9XCJmbGlja1wiPlxuICogXHQ8ZGl2PjxwPnBhbmVsIDA8L3A+PC9kaXY+XG4gKiBcdDxkaXY+PHA+cGFuZWwgMTwvcD48L2Rpdj5cbiAqIFx0PGRpdj48cD5wYW5lbCAyPC9wPjwvZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqIGBgYGphdmFzY3JpcHRcbiAqIC8vIEV4YW1wbGVzIHRvIG9taXQgYW5kIG9taXQgb3B0aW9uYWwgb3B0aW9ucy5cbiAqIC8vIOyDneueteqwgOuKpe2VnCDsmLXshZjsnYAg7IOd65617ZWY6rOgIOyDneyEse2VmOuKlCDsmIguXG4gKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG4gKlxuICogLy8gQW4gZXhhbXBsZSBvZiBzcGVjaWZ5aW5nIGFuZCBnZW5lcmF0aW5nIHZhbHVlcyBmb3IgYWxsIG9wdGlvbmFsIHBhcmFtZXRlcnMuXG4gKiAvLyDrqqjrk6Ag7Ji17IWY7J2YIOqwkuydhCDsp4DsoJXtlZjqs6Ag7IOd7ISx7ZWY64qUIOyYiC5cbiAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiLCB7XG4gKiBcdGh3QWNjZWxlcmFibGU6IHRydWUsXG4gKiBcdHByZWZpeDogXCJlZy1mbGlja1wiLFxuICogXHRkZWNlbGVyYXRpb246IDAuMDAwNixcbiAqIFx0aG9yaXpvbnRhbDogdHJ1ZSxcbiAqIFx0Y2lyY3VsYXI6IGZhbHNlLFxuICogXHRwcmV2aWV3UGFkZGluZzogWzEwLCBcIjE1JVwiXSwgLy8gYWxzbyBhcyBcIjEwcHhcIiwgMTUgb3IgXCIxNSVcIiBjYW4gYmUgYXBwbGllZC5cbiAqIFx0Ym91bmNlOiBbMTAsIDEwXSxcbiAqIFx0dGhyZXNob2xkOiA0MCxcbiAqIFx0ZHVyYXRpb246IDEwMCxcbiAqIFx0cGFuZWxFZmZlY3Q6IHggPT4gMSAtIE1hdGgucG93KDEgLSB4LCAzKSxcbiAqIFx0ZGVmYXVsdEluZGV4OiAwLFxuICogXHRpbnB1dFR5cGU6IFtcInRvdWNoXCIsIFwibW91c2VcIl0sXG4gKiBcdHRocmVzaG9sZEFuZ2xlOiA0NSxcbiAqIFx0YWRhcHRpdmVIZWlnaHQ6IGZhbHNlXG4gKiB9KTtcbiAqIGBgYFxuICogQGV4YW1wbGVcbiAqIEV4YW1wbGUgb2YgY29uc3RydWN0b3IgZWxlbWVudCBwYXJhbWV0ZXIgdmFsdWUgc3BlY2lmaWNhdGlvbi5cbiAqIOyDneyEseyekCBlbGVtZW50IO2MjOudvOuvuO2EsCDqsJIg7KeA7KCVIOyYiC5cbiAqIGBgYGphdmFzY3JpcHRcbiAqIC8vIEFuIGV4YW1wbGUgb2YgYXNzaWduaW5nIEhUTUxFbGVtZW50IHRvIGFuIGVsZW1lbnQgcGFyYW1ldGVyLlxuICogLy8gZWxlbWVudCDtjIzrnbzrr7jthLDsl5AgSFRNTEVsZW1lbnTrpbwg7KeA7KCV7ZWY64qUIOyYiC5cbiAqIG5ldyBlZy5GbGlja2luZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsaWNrXCIpKTtcbiAqXG4gKiAvLyBBbiBleGFtcGxlIG9mIGFzc2lnbmluZyBhIGpRdWVyeSBvYmplY3QgdG8gYW4gZWxlbWVudCBwYXJhbWV0ZXIuXG4gKiAvLyBlbGVtZW50IO2MjOudvOuvuO2EsOyXkCBqUXVlcnnqsJ3ssrTrpbwg7KeA7KCV7ZWY64qUIOyYiC5cbiAqIG5ldyBlZy5GbGlja2luZygkKFwiI2ZsaWNrXCIpWzBdKTtcbiAqXG4gKiAvLyBBbiBleGFtcGxlIG9mIGFzc2lnbmluZyBhIGNzcyBzZWxlY3RvciBzdHJpbmcgdG8gYW4gZWxlbWVudCBwYXJhbWV0ZXIuXG4gKiAvLyBlbGVtZW50IO2MjOudvOuvuO2EsOyXkCBjc3Mg7ISg7YOd7J6QIOusuOyekOyXtOydhCDsp4DsoJXtlZjripQg7JiILlxuICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpO1xuICogYGBgXG4gKiBAZXhhbXBsZVxuICogUGFuZWwgZWxlbWVudCBkZWZpbml0aW9uIGxvY2F0aW9uIGV4YW1wbGUuXG4gKiDtjKjrhJAg7JqU7IaMIOygleydmCDsnITsuZgg7JiILlxuICogYGBgaHRtbFxuICogPCEtLUFuIGV4YW1wbGUgb2YgZGVmaW5pbmcgYSBwYW5lbCBlbGVtZW50IGFzIGEgY2hpbGQgb2YgYSBiYXNlIGVsZW1lbnQuLS0+XG4gKiA8IS0t7Yyo64SQIOyalOyGjOulvCDquLDspIAg7JqU7IaM7J2YIOyekOyLneycvOuhnCDsoJXsnZjtlZwg7JiILi0tPlxuICogPGRpdiBpZD1cImZsaWNrXCI+XG4gKiBcdDxkaXY+PHA+cGFuZWwgMDwvcD48L2Rpdj5cbiAqIFx0PGRpdj48cD5wYW5lbCAxPC9wPjwvZGl2PlxuICogXHQ8ZGl2PjxwPnBhbmVsIDI8L3A+PC9kaXY+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8IS0tQW4gZXhhbXBsZSBvZiBkZWZpbmluZyBhIHBhbmVsIGVsZW1lbnQgYXMgYSBjaGlsZCBvZiBhIGNvbnRhaW5lciBlbGVtZW50Li0tPlxuICogPCEtLe2MqOuEkCDsmpTshozrpbwg7Luo7YWM7J2064SIIOyalOyGjOydmCDsnpDsi53snLzroZwg7KCV7J2Y7ZWcIOyYiC4tLT5cbiAqIDxkaXYgaWQ9XCJmbGljazJcIj5cbiAqIFx0PGRpdiBjbGFzcz1cImVnLWZsaWNrLWNvbnRhaW5lclwiPlxuICogXHRcdDxkaXY+PHA+cGFuZWwgMDwvcD48L2Rpdj5cbiAqIFx0XHQ8ZGl2PjxwPnBhbmVsIDE8L3A+PC9kaXY+XG4gKiBcdFx0PGRpdj48cD5wYW5lbCAyPC9wPjwvZGl2PlxuICogXHQ8ZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqIEBleGFtcGxlXG4gKiBBbiBleGFtcGxlIHdoZXJlIG9ubHkgb25lIHBhbmVsIGlzIGRlZmluZWQgYW5kIGNyZWF0ZWQgd2l0aCBhIGNpcmN1bGFyLlxuICog7Yyo64SQ7J2EIO2VmOuCmOunjCDsoJXsnZjtlZjqs6Ag7Iic7ZmY7Jy866GcIOyDneyEse2VmOuKlCDsmIguXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGlkPVwiZmxpY2tcIj5cbiAqIFx0PGRpdj48cD5wYW5lbCAwPC9wPjwvZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqIGBgYGphdmFzY3JpcHRcbiAqIC8vIElmIHRoZSBudW1iZXIgb2YgZGVmaW5lZCBwYW5lbHMgaXMgbGVzcyB0aGFuIHRoZSBtaW5pbXVtIG51bWJlciByZXF1aXJlZCBmb3IgdGhlIGNpcmN1bGF0aW9uIG9wZXJhdGlvbiwgdGhlIG5lY2Vzc2FyeSBudW1iZXIgb2YgcGFuZWwgZWxlbWVudHMgYXJlIGdlbmVyYXRlZC5cbiAqIC8vIOygleydmOuQnCDtjKjrhJDsnZgg7IiY6rCAIOyInO2ZmOuPmeyekeyXkCDtlYTsmpTtlZwg7LWc7IaMIOqwnOyImOuztOuLpCDsoIHsnLzrqbQg7ZWE7JqU7ZWcIOyImOunjO2BvOydmCDtjKjrhJAg7JqU7IaM6rCAIOyDneyEseuQnOuLpC5cbiAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiLCB7XG4gKiBcdGNpcmN1bGFyOiB0cnVlXG4gKiB9KVxuICogYGBgXG4gKiBAZXhhbXBsZVxuICogRm9yIGVycm9yIG9jY3VycmVuY2UgZXhhbXBsZS4gVGhlcmUgaXMgbm8gcGFuZWwgZWxlbWVudC5cbiAqIOyYpOulmCDrsJzsg50g7JiILiDtjKjrhJAg7JqU7IaM6rCAIO2VmOuCmOuPhCDsl4bripQg6rK97JqwLlxuICogYGBgaHRtbFxuICogPGRpdiBpZD1cImZsaWNrXCI+PC9kaXY+XG4gKiBgYGBcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHRyeXtcbiAqIFx0bmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpO1xuICogfSBjYXRjaChlKSB7XG4gKiBcdC8vIEFuIGVycm9yIG9jY3VycyBiZWNhdXNlIHRoZXJlIGFyZSBubyBjaGlsZCBlbGVtZW50cyBpbiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQuXG4gKlx0Ly8g6riw7KSAIOyalOyGjOyViOyXkCDsnpDsi50g7JqU7IaM6rCAIO2VmOuCmOuPhCDsl4bsnLzrr4DroZwg7JeQ65+s6rCAIOuwnOyDne2VnOuLpC5cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGlja2luZyBleHRlbmRzIE1peGluKENvbXBvbmVudCkud2l0aChldmVudEhhbmRsZXIpIHtcblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfSBlbGVtZW50IEEgYmFzZSBlbGVtZW50IGZvciB0aGUgZWcuRmxpY2tpbmcgbW9kdWxlLiBXaGVuIHNwZWNpZnlpbmcgYSB2YWx1ZSBhcyBhIGBTdHJpbmdgIHR5cGUsIHlvdSBtdXN0IHNwZWNpZnkgYSBjc3Mgc2VsZWN0b3Igc3RyaW5nIHRvIHNlbGVjdCB0aGUgZWxlbWVudC48a28+ZWcuRmxpY2tpbmcg66qo65OI7J2EIOyCrOyaqe2VoCDquLDspIAg7JqU7IaMLiBgU3RyaW5nYO2DgOyeheycvOuhnCDqsJIg7KeA7KCV7IucIOyalOyGjOulvCDshKDtg53tlZjquLAg7JyE7ZWcIGNzcyDshKDtg53snpAg66y47J6Q7Je07J2EIOyngOygle2VtOyVvCDtlZzri6QuPC9rbz5cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9uIG9iamVjdCBvZiB0aGUgZWcuRmxpY2tpbmcgbW9kdWxlPGtvPmVnLkZsaWNraW5nIOuqqOuTiOydmCDsmLXshZgg6rCd7LK0PC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5od0FjY2VsZXJhYmxlPXRydWVdIEZvcmNlIGhhcmR3YXJlIGNvbXBvc2l0aW5nLjxrbz7tlZjrk5zsm6jslrQg6rCA7IaNIOyCrOyaqSDsl6zrtoAuPC9rbz5cblx0ICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnByZWZpeD1cImVnLWZsaWNrXCJdIEEgcHJlZml4IGZvciBjbGFzcyBuYW1lcyBvZiB0aGUgcGFuZWwgZWxlbWVudHMuPGtvPu2MqOuEkCDsmpTshozsnZgg7YG0656Y7IqkIOydtOumhCDsoJHrkZDsgqwuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlY2VsZXJhdGlvbj0wLjAwMDZdIERlY2VsZXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIHdoZXJlIGFjY2VsZXJhdGlvbiBpcyBtYW51YWxseSBlbmFibGVkIGJ5IHVzZXIuIEEgaGlnaGVyIHZhbHVlIGluZGljYXRlcyBzaG9ydGVyIHJ1bm5pbmcgdGltZS48a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDqsIDsho3rj4TqsIAg7KCB7Jqp65CcIOyVoOuLiOuplOydtOyFmOydmCDqsJDsho3rj4QuIOqwkuydtCDrhpLsnYTsiJjroZ0g7JWg64uI66mU7J207IWYIOyLpO2WiSDsi5zqsITsnbQg7Ken7JWE7KeE64ukLjwva28+XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaG9yaXpvbnRhbD10cnVlXSBEaXJlY3Rpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiAodHJ1ZTogaG9yaXpvbnRhbCwgZmFsc2U6IHZlcnRpY2FsKTxrbz7tjKjrhJAg7J2064+ZIOuwqe2WpS4gKHRydWUg6rCA66Gc67Cp7ZalLCBmYWxzZSDshLjroZzrsKntlqUpPC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhcj1mYWxzZV0gV2hldGhlciB0byBsZXQgdGhlIGZpcnN0IHBhbmVsIGZsaWNrIHJpZ2h0IHRvIHRoZSBlbmQgcGFuZWwgKGxldCB0aGUgbGVmdCBwYW5lbCBmbGljayBmcm9tIHRoZSBlbmQgcGFuZWwgdG8gbW92ZSB0byB0aGUgZmlyc3QgcGFuZWwpLiAoVGhlIHRlcm0gJ2NpcmN1bGF0aW9uJyk8a28+7LKrIO2MqOuEkOyXkOyEnCDsmrAg7JWh7IWYIOyeheugpe2VmOyXrCDrgZ0g7Yyo64SQ66GcIOydtOuPme2VmOqyjCDtlaDsp4DsmYAg64GdIO2MqOuEkOyXkOyEnCDsmrAg7JWh7IWYIOyeheugpe2VmOyXrCDssqsg7Yyo64SQ66GcIOydtOuPme2VoO2VmOqyjCDtlaDsp4Ag7Jes67aALiAo7Ya17LmtICfsiJztmZgnKTwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ3xBcnJheX0gW29wdGlvbnMucHJldmlld1BhZGRpbmc9WzAsMF1dIFRoZSBwcmV2aWV3IHNpemUgdmFsdWUoaWYgbm8gdW5pdCBpcyBnaXZlbiwgZGVmYXVsdHMgdG8gYHB4YCkgZm9yIHRoZSBwcmV2aW91cyBvciBuZXh0IHBhbmVsLjxicj4tIElmIHRoZSBkaXJlY3Rpb24gaXMgc2V0IHRvIFwiaG9yaXpvbnRhbFwiLCB0aGUgcHJldmlldyBzZWN0aW9uIHdpbGwgYmUgZGlzcGxheWVkIG9uIHRoZSBsZWZ0IGFuZCByaWdodCBvZiB0aGUgcGFuZWwuPGJyPi0gSWYgdGhlIGRpcmVjdGlvbiBpcyBzZXQgdG8gXCJ2ZXJ0aWNhbFwiLCBpdCB3aWxsIGJlIGRpc3BsYXllZCBvbiB0aGUgdG9wIGFuZCBib3R0b20gb2YgdGhlIHBhbmVsLjxrbz7snbTsoIQg7Yyo64SQ6rO8IOuLpOydjCDtjKjrhJDsnYQg66+466asIOuztOuKlCDsmIHsl63snZgg7YGs6riwIOqwkijri6jsnITqsIAg7KeA7KCV65CY7KeAIOyViuuKlCDqsr3smrAsIGBweGDroZwg7KeA7KCVKS48YnI+7Yyo64SQIOydtOuPmSDrsKntlqXsnbQg6rCA66GcIOuwqe2WpeydtOuptCDtjKjrhJAg7KKM7Jqw7JeQLCDshLjroZwg67Cp7Zal7J2066m0IO2MqOuEkCDsg4HtlZjsl5Ag66+466asIOuztOuKlCDsmIHsl63snbQg64KY7YOA64Kc64ukLjwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfEFycmF5fSBbb3B0aW9ucy5ib3VuY2U9WzEwLDEwXV0gVGhlIHNpemUgdmFsdWUodW5pdDogcGl4ZWwpIG9mIHRoZSBib3VuY2UgYXJlYS4gSWYgYGNpcmN1bGFyPWZhbHNlYCwgdGhlIHBhbmVsIGNhbiBiZSBtb3ZlZCBieSB0aGlzIHZhbHVlIHdoZW4gaW5wdXR0aW5nIGEgcmlnaHQgZ2VzdHVyZSBpbiB0aGUgZmlyc3QgcGFuZWwgb3IgaW5wdXR0aW5nIGEgbGVmdCBnZXN0dXJlIGluIHRoZSBlbmQgcGFuZWwuIFdoZW4gdGhlIGlucHV0IGlzIGNvbXBsZXRlZCB3aGlsZSBtb3ZpbmcsIGl0IHJldHVybnMgdG8gaXRzIG9yaWdpbmFsIHBvc2l0aW9uLjxrbz7rsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sOqwkijri6jsnIQ6IO2UveyFgCkuIGBjaXJjdWxhcj1mYWxzZWDsnbgg6rK97JqwLCDssqsg7Yyo64SQ7JeQ7IScIOyasCDslaHshZgg7J6F66Cl7IucLCDrgZ0g7Yyo64SQ7JeQ7IScIOyijCDslaHshZgg7J6F66Cl7IucIOydtCDqsJIg66eM7YG866eMIO2MqOuEkOydtCDsnbTrj5ntlaAg7IiYIOyeiOqzoCDsnbTrj5ntlZwg7IOB7YOc7JeQ7IScIOyeheugpeydhCDrp4jsuZjrqbQg7JuQ656YIOyekOumrOuhnCDrj4zslYTsmKjri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnRocmVzaG9sZD00MF0gTW92ZW1lbnQgdGhyZXNob2xkIHRvIGRlc3RpbmF0aW9uIHBhbmVsKHVuaXQ6IHBpeGVsKS4gQSBwYW5lbCBlbGVtZW50IG11c3QgYmUgZHJhZ2dlZCBiZXlvbmQgdGhlIHRocmVzaG9sZCB0byBtb3ZlIHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbC48a28+66qp7KCBIO2MqOuEkOuhnOydmCDsnbTrj5kg7J6E6rOE6rCSICjri6jsnIQ6IO2UveyFgCkuIO2MqOuEkCDsmpTshozrpbwg7J6E6rOE6rCSIOydtOyDgeycvOuhnCDrgYzslrTri6Qg64aT7JWE7JW866eM7J20IOuqqeyggSDtjKjrhJDroZwg7J2064+Z7ZWc64ukLjwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xMDBdIER1cmF0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudC4gKHVuaXQ6IG1zKTxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCELijri6jsnIQ6IG1zKTwva28+XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnBhbmVsRWZmZWN0PXggPT4gMSAtIE1hdGgucG93KDEgLSB4LCAzKV0gVGhlIGVhc2luZyBmdW5jdGlvbiB0byBhcHBseSB0byBhIHBhbmVsIG1vdmluZyBhbmltYXRpb24uIFRoZSBkZWZhdWx0IGZ1bmN0aW9uIGlzIGVhc2VPdXRDdWJpYy48a28+7Yyo64SQIOydtOuPmSDslaDri4jrqZTsnbTshZjsl5Ag7KCB7Jqp7ZWgIGBlYXNpbmdg7ZWo7IiYLiDquLDrs7jqsJLsnYAgYGVhc2VPdXRDdWJpY2DsnbTri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlZmF1bHRJbmRleD0wXSBUaGUgcGFuZWwgaW5kZXggbnVtYmVyIHRvIHNwZWNpZnkgd2hlbiBpbml0aWFsaXppbmcgdGhlIG1vZHVsZS4gQSB6ZXJvLWJhc2VkIGludGVnZXIuPGtvPuuqqOuTiCDstIjquLDtmZTsi5wg7KeA7KCV7ZWgIO2MqOuEkCDsnbjrjbHsiqQg67KI7Zi4LiAw67aA7YSwIOyLnOyeke2VmOuKlCDsoJXsiJguPC9rbz5cblx0ICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuaW5wdXRUeXBlPVtcInRvdWNoLFwibW91c2VcIl1dIFR5cGVzIG9mIGlucHV0IGRldmljZXMuICh7QGxpbmsgaHR0cHM6Ly9uYXZlci5naXRodWIuaW8vZWdqcy1heGVzL3JlbGVhc2UvbGF0ZXN0L2RvYy9lZy5BeGVzLlBhbklucHV0Lmh0bWx8ZWcuQXhlcy5QYW5JbnB1dCBSZWZlcmVuY2V9KTxicj4tIFwidG91Y2hcIjogQSB0b3VjaCBpbnB1dCBkZXZpY2UuPGJyPi0gXCJtb3VzZVwiOiBBIG1vdXNlLjxrbz7snoXroKUg7J6l7LmYIOyiheulmC4gKHtAbGluayBodHRwczovL25hdmVyLmdpdGh1Yi5pby9lZ2pzLWF4ZXMvcmVsZWFzZS9sYXRlc3QvZG9jL2VnLkF4ZXMuUGFuSW5wdXQuaHRtbHxlZy5BeGVzLlBhbklucHV0IOywuOqzoH0pPGJyPi0gXCJ0b3VjaFwiOiDthLDsuZgg7J6F66ClIOyepey5mC48YnI+LSBcIm1vdXNlXCI6IOuniOyasOyKpC48L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGhyZXNob2xkQW5nbGU9NDVdIFRoZSB0aHJlc2hvbGQgdmFsdWUgdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdXNlciBpbnB1dCBpcyBob3Jpem9udGFsIG9yIHZlcnRpY2FsLiAoMCB+IDkwKTxrbz7sgqzsmqnsnpDsnZgg7J6F66Cl7J20IOqwgOuhnCDrsKntlqXsnbjsp4Ag7IS466GcIOuwqe2WpeyduOyngCDtjJDri6jtlZjripQg6riw7KSAIOqwgeuPhCAoMCB+IDkwKTwva28+XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWRhcHRpdmVIZWlnaHQ9ZmFsc2VdIFdoZXRoZXIgdGhlIGhlaWdodCBvZiB0aGUgY29udGFpbmVyIGVsZW1lbnQgcmVmbGVjdHMgdGhlIGhlaWdodCB2YWx1ZSBvZiB0aGUgcGFuZWwgYWZ0ZXIgY29tcGxldGluZyB0aGUgbW92ZW1lbnQuPGJyPihOb3RlOiBvbiBBbmRyb2lkIDQuMS54IHN0b2NrIGJyb3dzZXIsIGhhcyByZW5kZXJpbmcgYnVnIHdoaWNoIG5vdCBjb3JyZWN0bHkgcmVuZGVyIGhlaWdodCB2YWx1ZSBvbiBwYW5lbCB3aXRoIHNpbmdsZSBub2RlLiBUbyBhdm9pZCBqdXN0IGFwcGVuZCBhbm90aGVyIGVtcHR5IG5vZGUgYXQgdGhlIGVuZC4pPGtvPuuqqeyggSDtjKjrhJDroZwg7J2064+Z7ZWcIO2bhCDqt7gg7Yyo64SQ7J2YIOuGkuydtOqwkuydhCDsu6jthYzsnbTrhIgg7JqU7IaM7J2YIOuGkuydtOqwkuyXkCDrsJjsmIHtlaDsp4Ag7Jes67aALjxicj4o7LC46rOgOiBBbmRyb2lkIDQuMS54IOyKpO2GoSDruIzrnbzsmrDsoIDsl5DshJwg64uo7J28IOuFuOuTnOuhnCDqtazshLHrkJwg7Yyo64SQ7J2YIOuGkuydtOqwkiDrs4Dqsr3snbQg7KCc64yA66GcIOugjOuNlOungSDrkJjsp4Ag7JWK64qUIOuyhOq3uOqwgCDsnojsnYwuIOu5hOyWtOyeiOuKlCDrhbjrk5zrpbwg7LaU6rCA7ZWY66m0IO2VtOqysOydtCDqsIDriqXtlZjri6QuKTwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MjAwMF0gei1pbmRleCB2YWx1ZSBmb3IgY29udGFpbmVyIGVsZW1lbnQ8a28+7Luo7YWM7J2064SIIOyalOyGjOydmCB6LWluZGV4IOqwkjwva28+XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudXNlVHJhbnNsYXRlPXRydWVdIFVzZSBjc3MgdHJhbnNsYXRlIG1ldGhvZCBvbiBwYW5lbCBtb3Zlcy4gV2hlbiBzZXQgdG8gJ2ZhbHNlJywgaXQnbGwgdXNlIHRvcC9sZWZ0IGluc3RlYWQuPGtvPu2MqOuEkCDsnbTrj5nsi5wgQ1NTIHRyYW5zbGF0ZSDsgqzsmqkg7Jes67aALiAnZmFsc2Un66GcIOyEpOyglSDsi5wsIHRvcC9sZWZ0IOyGjeyEseydhCDsgqzsmqk8L2tvPlxuXHQqL1xuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zLCBfcHJlZml4KSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuJHdyYXBwZXIgPSB1dGlscy4kKGVsZW1lbnQpO1xuXHRcdHRoaXMucGx1Z2lucyA9IFtdO1xuXG5cdFx0Y29uc3QgJGNoaWxkcmVuID0gdGhpcy4kd3JhcHBlciAmJiB0aGlzLiR3cmFwcGVyLmNoaWxkcmVuO1xuXG5cdFx0aWYgKCF0aGlzLiR3cmFwcGVyIHx8ICEkY2hpbGRyZW4gfHwgISRjaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlIHZhbGlkYXRlTGluZUJyZWFrcywgbWF4aW11bUxpbmVMZW5ndGhcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkdpdmVuIGJhc2UgZWxlbWVudCBkb2Vzbid0IGV4aXN0IG9yIGl0IGhhc24ndCBwcm9wZXIgRE9NIHN0cnVjdHVyZSB0byBiZSBpbml0aWFsaXplZC5cIik7XG5cblx0XHRcdC8vIGVzbGludC1lbmFibGUgdmFsaWRhdGVMaW5lQnJlYWtzLCBtYXhpbXVtTGluZUxlbmd0aFxuXHRcdH1cblxuXHRcdHRoaXMuX3NldE9wdGlvbnMob3B0aW9ucyk7XG5cdFx0dGhpcy5fc2V0Q29uZmlnKCRjaGlsZHJlbiwgX3ByZWZpeCk7XG5cblx0XHQhdXRpbHMuaGFzQ2xpY2tCdWcoKSAmJiAodGhpcy5fc2V0UG9pbnRlckV2ZW50cyA9ICgpID0+IHt9KTtcblxuXHRcdHRoaXMuX2J1aWxkKCk7XG5cdFx0dGhpcy5fYmluZEV2ZW50cyh0cnVlKTtcblxuXHRcdHRoaXMuX2FwcGx5UGFuZWxzQ3NzKCk7XG5cdFx0dGhpcy5fYXJyYW5nZVBhbmVscygpO1xuXG5cdFx0dGhpcy5vcHRpb25zLmh3QWNjZWxlcmFibGUgJiYgU1VQUE9SVF9XSUxMQ0hBTkdFICYmIHRoaXMuX3NldEhpbnQoKTtcblx0XHR0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgJiYgdGhpcy5fc2V0QWRhcHRpdmVIZWlnaHQoKTtcblxuXHRcdHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhcImVuZFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgb3B0aW9ucyB2YWx1ZXNcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICovXG5cdF9zZXRPcHRpb25zKG9wdGlvbnMpIHtcblx0XHQvLyBkZWZhdWx0IHZhbHVlIG9mIHByZXZpZXdQYWRkaW5nIGFuZCBib3VuY2Vcblx0XHRjb25zdCBhcnJWYWwgPSB7XG5cdFx0XHRwcmV2aWV3UGFkZGluZzogWzAsIDBdLFxuXHRcdFx0Ym91bmNlOiBbMTAsIDEwXVxuXHRcdH07XG5cblx0XHR0aGlzLm9wdGlvbnMgPSB1dGlscy5leHRlbmQodXRpbHMuZXh0ZW5kKHt9LCBPUFRJT05TKSwgYXJyVmFsLCBvcHRpb25zKTtcblxuXHRcdGZvciAoY29uc3Qga2V5IGluIGFyclZhbCkge1xuXHRcdFx0bGV0IHZhbCA9IHRoaXMub3B0aW9uc1trZXldO1xuXG5cdFx0XHRpZiAoLyhudW1iZXJ8c3RyaW5nKS8udGVzdCh0eXBlb2YgdmFsKSkge1xuXHRcdFx0XHR2YWwgPSBbdmFsLCB2YWxdO1xuXHRcdFx0fSBlbHNlIGlmICghdXRpbHMuaXNBcnJheSh2YWwpKSB7XG5cdFx0XHRcdHZhbCA9IGFyclZhbFtrZXldO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLm9wdGlvbnNba2V5XSA9IHZhbDtcblx0XHR9XG5cblx0XHQvLyBibG9jayB1c2Ugb2YgdHJhbnNsYXRlIGZvciBBbmRyb2lkMiBlbnZpcm9ubWVudFxuXHRcdGlmIChJU19BTkRST0lEMikge1xuXHRcdFx0dGhpcy5vcHRpb25zLnVzZVRyYW5zbGF0ZSA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgY29uZmlnIHZhbHVlc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSAkY2hpbGRyZW4gd3JhcHBlcnMnIGNoaWxkcmVuIGVsZW1lbnRzXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBfcHJlZml4IGV2ZW50IHByZWZpeFxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cblx0ICovXG5cdF9zZXRDb25maWcoJGNoaWxkcmVuLCBfcHJlZml4KSB7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCBwYWRkaW5nID0gb3B0aW9ucy5wcmV2aWV3UGFkZGluZztcblx0XHRsZXQgJG5vZGVzID0gJGNoaWxkcmVuO1xuXG5cdFx0aWYgKHV0aWxzLmNsYXNzTGlzdCgkbm9kZXNbMF0sIGAke29wdGlvbnMucHJlZml4fS1jb250YWluZXJgKSkge1xuXHRcdFx0JG5vZGVzID0gJG5vZGVzWzBdO1xuXHRcdFx0dGhpcy4kY29udGFpbmVyID0gJG5vZGVzO1xuXHRcdFx0JG5vZGVzID0gJG5vZGVzLmNoaWxkcmVuO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdG8gYXJyYXlcblx0XHQkbm9kZXMgPSB1dGlscy50b0FycmF5KCRub2Rlcyk7XG5cblx0XHQvLyBjb25maWcgdmFsdWVcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZiA9IHV0aWxzLmV4dGVuZCh1dGlscy5leHRlbmQoe30sIENPTkZJRyksIHtcblx0XHRcdHBhbmVsOiB7XG5cdFx0XHRcdCRsaXN0OiAkbm9kZXMsXG5cdFx0XHRcdG1pbkNvdW50OiBwYWRkaW5nWzBdICsgcGFkZGluZ1sxXSA+IDAgPyA1IDogMyAgLy8gbWluaW11bSBwYW5lbCBjb3VudFxuXHRcdFx0fSxcblx0XHRcdC8vIHJlbWVtYmVyIG9yaWdpbmFsIGNsYXNzIGFuZCBpbmxpbmUgc3R5bGUgaW4gY2FzZSBvZiByZXN0b3JhdGlvbiBvbiBkZXN0cm95KClcblx0XHRcdG9yaWdQYW5lbFN0eWxlOiB7XG5cdFx0XHRcdHdyYXBwZXI6IHtcblx0XHRcdFx0XHRjbGFzc05hbWU6IHRoaXMuJHdyYXBwZXIuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgbnVsbCxcblx0XHRcdFx0XHRzdHlsZTogdGhpcy4kd3JhcHBlci5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKSB8fCBudWxsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogKHRoaXMuJGNvbnRhaW5lciAmJiB0aGlzLiRjb250YWluZXIuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikpIHx8IG51bGwsXG5cdFx0XHRcdFx0c3R5bGU6ICh0aGlzLiRjb250YWluZXIgJiYgdGhpcy4kY29udGFpbmVyLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpKSB8fCBudWxsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxpc3Q6ICRub2Rlcy5tYXAodiA9PiAoe1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogdi5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBudWxsLFxuXHRcdFx0XHRcdHN0eWxlOiB2LmdldEF0dHJpYnV0ZShcInN0eWxlXCIpIHx8IG51bGxcblx0XHRcdFx0fSkpXG5cdFx0XHR9LFxuXHRcdFx0dXNlTGF5ZXJIYWNrOiBvcHRpb25zLmh3QWNjZWxlcmFibGUgJiYgIVNVUFBPUlRfV0lMTENIQU5HRSxcblx0XHRcdGV2ZW50UHJlZml4OiBfcHJlZml4IHx8IFwiXCJcblx0XHR9KTtcblxuXHRcdFtbXCJMRUZUXCIsIFwiUklHSFRcIl0sIFtcIlVQXCIsIFwiRE9XTlwiXV1bKyFvcHRpb25zLmhvcml6b250YWxdXG5cdFx0XHQuZm9yRWFjaCh2ID0+IGNvbmYuZGlyRGF0YS5wdXNoKEF4ZXNbYERJUkVDVElPTl8ke3Z9YF0pKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZCBhbmQgc2V0IHBhbmVsIG5vZGVzIHRvIG1ha2UgZmxpY2tpbmcgc3RydWN0dXJlXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfYnVpbGQoKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgJGNoaWxkcmVuID0gcGFuZWwuJGxpc3Q7XG5cdFx0Y29uc3QgcGFkZGluZyA9IG9wdGlvbnMucHJldmlld1BhZGRpbmcuY29uY2F0KCk7XG5cdFx0Y29uc3QgcHJlZml4ID0gb3B0aW9ucy5wcmVmaXg7XG5cdFx0Y29uc3QgaG9yaXpvbnRhbCA9IG9wdGlvbnMuaG9yaXpvbnRhbDtcblx0XHRsZXQgcGFuZWxDb3VudCA9IHBhbmVsLmNvdW50ID0gcGFuZWwub3JpZ0NvdW50ID0gJGNoaWxkcmVuLmxlbmd0aDtcblx0XHRjb25zdCBib3VuY2UgPSBvcHRpb25zLmJvdW5jZTtcblxuXHRcdHRoaXMuX3NldFBhZGRpbmcocGFkZGluZywgdHJ1ZSk7XG5cdFx0Y29uc3Qgc2l6ZVZhbHVlID0gdGhpcy5fZ2V0RGF0YUJ5RGlyZWN0aW9uKFtwYW5lbC5zaXplLCBcIjEwMCVcIl0pO1xuXG5cdFx0Ly8gY29udGFpbmVyIGVsZW1lbnQgc3R5bGVcblx0XHRjb25zdCBjc3NWYWx1ZSA9IHtcblx0XHRcdHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG5cdFx0XHR6SW5kZXg6IG9wdGlvbnMuekluZGV4IHx8IDIwMDAsXG5cdFx0XHR3aWR0aDogXCIxMDAlXCIsXG5cdFx0XHRoZWlnaHQ6IFwiMTAwJVwiXG5cdFx0fTtcblxuXHRcdGhvcml6b250YWwgJiYgKGNzc1ZhbHVlLnRvcCA9IFwiMHB4XCIpO1xuXG5cdFx0aWYgKHRoaXMuJGNvbnRhaW5lcikge1xuXHRcdFx0dXRpbHMuY3NzKHRoaXMuJGNvbnRhaW5lciwgY3NzVmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCAkcGFyZW50ID0gJGNoaWxkcmVuWzBdLnBhcmVudE5vZGU7XG5cdFx0XHRjb25zdCAkY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHRcdFx0JGNvbnRhaW5lci5jbGFzc05hbWUgPSBgJHtwcmVmaXh9LWNvbnRhaW5lcmA7XG5cdFx0XHR1dGlscy5jc3MoJGNvbnRhaW5lciwgY3NzVmFsdWUpO1xuXG5cdFx0XHQkY2hpbGRyZW4uZm9yRWFjaCh2ID0+ICRjb250YWluZXIuYXBwZW5kQ2hpbGQodikpO1xuXG5cdFx0XHQkcGFyZW50LmFwcGVuZENoaWxkKCRjb250YWluZXIpO1xuXHRcdFx0dGhpcy4kY29udGFpbmVyID0gJGNvbnRhaW5lcjtcblx0XHR9XG5cblx0XHQvLyBwYW5lbHMnIGNzcyB2YWx1ZXNcblx0XHQkY2hpbGRyZW4uZm9yRWFjaCh2ID0+IHtcblx0XHRcdHV0aWxzLmNsYXNzTGlzdCh2LCBgJHtwcmVmaXh9LXBhbmVsYCwgdHJ1ZSk7XG5cblx0XHRcdHV0aWxzLmNzcyh2LCB7XG5cdFx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG5cdFx0XHRcdHdpZHRoOiB1dGlscy5nZXRVbml0VmFsdWUoc2l6ZVZhbHVlWzBdKSxcblx0XHRcdFx0aGVpZ2h0OiB1dGlscy5nZXRVbml0VmFsdWUoc2l6ZVZhbHVlWzFdKSxcblx0XHRcdFx0Ym94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0dG9wOiAwLFxuXHRcdFx0XHRsZWZ0OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGlmICh0aGlzLl9hZGRDbG9uZVBhbmVscygpKSB7XG5cdFx0XHRwYW5lbENvdW50ID0gcGFuZWwuY291bnQgPSAoXG5cdFx0XHRcdHBhbmVsLiRsaXN0ID0gdXRpbHMudG9BcnJheSh0aGlzLiRjb250YWluZXIuY2hpbGRyZW4pXG5cdFx0XHQpLmxlbmd0aDtcblx0XHR9XG5cblx0XHQvLyBjcmVhdGUgQXhlcyBpbnN0YW5jZVxuXHRcdHRoaXMuX2F4ZXNJbnN0ID0gbmV3IEF4ZXMoe1xuXHRcdFx0ZmxpY2s6IHtcblx0XHRcdFx0cmFuZ2U6IFswLCBwYW5lbC5zaXplICogKHBhbmVsQ291bnQgLSAxKV0sXG5cdFx0XHRcdGJvdW5jZVxuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGVhc2luZzogb3B0aW9ucy5wYW5lbEVmZmVjdCxcblx0XHRcdGRlY2VsZXJhdGlvbjogb3B0aW9ucy5kZWNlbGVyYXRpb24sXG5cdFx0XHRpbnRlcnJ1cHRhYmxlOiBmYWxzZVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5fc2V0RGVmYXVsdFBhbmVsKG9wdGlvbnMuZGVmYXVsdEluZGV4KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgcHJldmlldyBwYWRkaW5nIHZhbHVlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHBhZGRpbmdcblx0ICogQHBhcmFtIHtCb29sZWFufSBidWlsZFxuXHQgKi9cblx0X3NldFBhZGRpbmcocGFkZGluZywgYnVpbGQpIHtcblx0XHRjb25zdCAkd3JhcHBlciA9IHRoaXMuJHdyYXBwZXI7XG5cdFx0Y29uc3QgaG9yaXpvbnRhbCA9IHRoaXMub3B0aW9ucy5ob3Jpem9udGFsO1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBwYWRkaW5nU3VtID0gcGFkZGluZy5yZWR1Y2UoKGEsIGMpID0+IHBhcnNlRmxvYXQoYSkgKyBwYXJzZUZsb2F0KGMpKTtcblx0XHRjb25zdCBjc3NWYWx1ZSA9IHt9O1xuXG5cdFx0aWYgKHBhZGRpbmdTdW0gfHwgIWJ1aWxkKSB7XG5cdFx0XHRob3Jpem9udGFsICYmIHBhZGRpbmcucmV2ZXJzZSgpO1xuXG5cdFx0XHRjc3NWYWx1ZS5wYWRkaW5nID0gYCR7aG9yaXpvbnRhbCA/IFwiMCBcIiA6IFwiXCJ9JHtcblx0XHRcdFx0Ly8gYWRkICdweCcgdW5pdCBpZiBub3QgcHJlc2VudFxuXHRcdFx0XHRwYWRkaW5nLm1hcCh2ID0+IChpc05hTih2KSA/IHYgOiBgJHt2fXB4YCkpXG5cdFx0XHRcdFx0LmpvaW4oXCIgMCBcIilcblx0XHRcdH1gO1xuXHRcdH1cblxuXHRcdGlmIChidWlsZCkge1xuXHRcdFx0Y3NzVmFsdWUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHRcdFx0Y3NzVmFsdWUuYm94U2l6aW5nID0gXCJib3JkZXItYm94XCI7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmtleXMoY3NzVmFsdWUpLmxlbmd0aCAmJiB1dGlscy5jc3MoJHdyYXBwZXIsIGNzc1ZhbHVlKTtcblxuXHRcdGNvbnN0IHBhZGRpbmdUeXBlID0gaG9yaXpvbnRhbCA/IFtcIkxlZnRcIiwgXCJSaWdodFwiXSA6IFtcIlRvcFwiLCBcIkJvdHRvbVwiXTtcblx0XHRjb25zdCB3cmFwcGVyU2l6ZSA9IE1hdGgubWF4KFxuXHRcdFx0JHdyYXBwZXJbYG9mZnNldCR7aG9yaXpvbnRhbCA/IFwiV2lkdGhcIiA6IFwiSGVpZ2h0XCJ9YF0sXG5cdFx0XHR1dGlscy5jc3MoJHdyYXBwZXIsIGhvcml6b250YWwgPyBcIndpZHRoXCIgOiBcImhlaWdodFwiLCB0cnVlKVxuXHRcdCk7XG5cblx0XHRwYW5lbC5zaXplID0gd3JhcHBlclNpemUgLSAoXG5cdFx0XHR1dGlscy5jc3MoJHdyYXBwZXIsIGBwYWRkaW5nJHtwYWRkaW5nVHlwZVswXX1gLCB0cnVlKSArXG5cdFx0XHR1dGlscy5jc3MoJHdyYXBwZXIsIGBwYWRkaW5nJHtwYWRkaW5nVHlwZVsxXX1gLCB0cnVlKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogVG8gZnVsZmlsbCBtaW5pbXVtIHBhbmVsIGNvdW50IGNsb25pbmcgb3JpZ2luYWwgbm9kZSB3aGVuIGNpcmN1bGFyIG9yIHByZXZpZXdQYWRkaW5nIG9wdGlvbiBhcmUgc2V0XG5cdCAqIEBwcml2YXRlXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgOiBhZGRlZCBjbG9uZSBub2RlLCBmYWxzZSA6IG5vdCBhZGRlZFxuXHQgKi9cblx0X2FkZENsb25lUGFuZWxzKCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBwYW5lbENvdW50ID0gcGFuZWwub3JpZ0NvdW50O1xuXHRcdGNvbnN0IGNsb25lQ291bnQgPSBwYW5lbC5taW5Db3VudCAtIHBhbmVsQ291bnQ7XG5cdFx0Y29uc3QgbGlzdCA9IHBhbmVsLiRsaXN0O1xuXHRcdGxldCBjbG9uZU5vZGVzO1xuXG5cdFx0Ly8gaWYgcGFuZWxzIGFyZSBnaXZlbiBsZXNzIHRoYW4gcmVxdWlyZWQgd2hlbiBjaXJjdWxhciBvcHRpb24gaXMgc2V0LCB0aGVuIGNsb25lIG5vZGUgdG8gYXBwbHkgY2lyY3VsYXIgbW9kZVxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY2lyY3VsYXIgJiYgcGFuZWxDb3VudCA8IHBhbmVsLm1pbkNvdW50KSB7XG5cdFx0XHRjbG9uZU5vZGVzID0gbGlzdC5tYXAodiA9PiB2LmNsb25lTm9kZSh0cnVlKSk7XG5cblx0XHRcdHdoaWxlIChjbG9uZU5vZGVzLmxlbmd0aCA8IGNsb25lQ291bnQpIHtcblx0XHRcdFx0Y2xvbmVOb2RlcyA9IGNsb25lTm9kZXMuY29uY2F0KFxuXHRcdFx0XHRcdGxpc3QubWFwKHYgPT4gdi5jbG9uZU5vZGUodHJ1ZSkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdGNsb25lTm9kZXMuZm9yRWFjaCh2ID0+IHRoaXMuJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2KSk7XG5cblx0XHRcdHJldHVybiAhIWNsb25lTm9kZXMubGVuZ3RoO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlIHBhbmVsJ3MgcG9zaXRpb24gd2l0aGluIGFycmF5XG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBlbGVtZW50IGNvdW50cyB0byBtb3ZlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYXBwZW5kIHdoZXJlIHRoZSBsaXN0IHRvIGJlIGFwcGVuZGVkKG1vdmVkKSAodHJ1ZTogdG8gdGhlIGVuZCwgZmFsc2U6IHRvIHRoZSBiZWdpbm5pbmcpXG5cdCAqL1xuXHRfbW92ZVBhbmVsUG9zaXRpb24oY291bnQsIGFwcGVuZCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBsaXN0ID0gcGFuZWwuJGxpc3Q7XG5cdFx0Y29uc3QgbGlzdFRvTW92ZSA9IGxpc3Quc3BsaWNlKGFwcGVuZCA/IDAgOiBwYW5lbC5jb3VudCAtIGNvdW50LCBjb3VudCk7XG5cblx0XHRwYW5lbC4kbGlzdCA9IGFwcGVuZCA/XG5cdFx0XHRsaXN0LmNvbmNhdChsaXN0VG9Nb3ZlKSA6XG5cdFx0XHRsaXN0VG9Nb3ZlLmNvbmNhdChsaXN0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgZGVmYXVsdCBwYW5lbCB0byBzaG93XG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuXHQgKi9cblx0X3NldERlZmF1bHRQYW5lbChpbmRleCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBsYXN0SW5kZXggPSBwYW5lbC5jb3VudCAtIDE7XG5cdFx0bGV0IGNvb3Jkcztcblx0XHRsZXQgYmFzZUluZGV4O1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jaXJjdWxhcikge1xuXHRcdFx0Ly8gaWYgZGVmYXVsdCBpbmRleCBpcyBnaXZlbiwgdGhlbiBtb3ZlIGNvcnJlc3BvbmQgcGFuZWwgdG8gdGhlIGZpcnN0IHBvc2l0aW9uXG5cdFx0XHRpZiAoaW5kZXggPiAwICYmIGluZGV4IDw9IGxhc3RJbmRleCkge1xuXHRcdFx0XHR0aGlzLl9tb3ZlUGFuZWxQb3NpdGlvbihpbmRleCwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNldCBmaXJzdCBwYW5lbCdzIHBvc2l0aW9uIGFjY29yZGluZyBwaHlzaWNhbCBub2RlIGxlbmd0aFxuXHRcdFx0YmFzZUluZGV4ID0gdGhpcy5fZ2V0QmFzZVBvc2l0aW9uSW5kZXgoKTtcblx0XHRcdHRoaXMuX21vdmVQYW5lbFBvc2l0aW9uKGJhc2VJbmRleCwgZmFsc2UpO1xuXG5cdFx0XHR0aGlzLl9zZXRQYW5lbE5vKHtcblx0XHRcdFx0bm86IGluZGV4LFxuXHRcdFx0XHRjdXJyTm86IGluZGV4XG5cdFx0XHR9KTtcblx0XHRcdC8vIGlmIGRlZmF1bHRJbmRleCBvcHRpb24gaXMgZ2l2ZW4sIHRoZW4gbW92ZSB0byB0aGF0IGluZGV4IHBhbmVsXG5cdFx0fSBlbHNlIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPD0gbGFzdEluZGV4KSB7XG5cdFx0XHR0aGlzLl9zZXRQYW5lbE5vKHtcblx0XHRcdFx0aW5kZXgsXG5cdFx0XHRcdG5vOiBpbmRleCxcblx0XHRcdFx0Y3VyckluZGV4OiBpbmRleCxcblx0XHRcdFx0Y3Vyck5vOiBpbmRleFxuXHRcdFx0fSk7XG5cblx0XHRcdGNvb3JkcyA9IFstKHBhbmVsLnNpemUgKiBpbmRleCksIDBdO1xuXG5cdFx0XHR0aGlzLl9zZXRUcmFuc2xhdGUoY29vcmRzKTtcblx0XHRcdHRoaXMuX3NldEF4ZXMoXCJzZXRUb1wiLCBNYXRoLmFicyhjb29yZHNbMF0pLCAwKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQXJyYW5nZSBwYW5lbHMnIHBvc2l0aW9uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc29ydCBOZWVkIHRvIHNvcnQgcGFuZWwncyBwb3NpdGlvblxuXHQgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhUb01vdmUgTnVtYmVyIHRvIG1vdmUgZnJvbSBjdXJyZW50IHBvc2l0aW9uIChuZWdhdGl2ZTogbGVmdCwgcG9zaXRpdmU6IHJpZ2h0KVxuXHQgKi9cblx0X2FycmFuZ2VQYW5lbHMoc29ydCwgaW5kZXhUb01vdmUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBwYW5lbCA9IGNvbmYucGFuZWw7XG5cdFx0Y29uc3QgdG91Y2ggPSBjb25mLnRvdWNoO1xuXHRcdGNvbnN0IGRpckRhdGEgPSBjb25mLmRpckRhdGE7XG5cdFx0bGV0IGJhc2VJbmRleDtcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY2lyY3VsYXIpIHtcblx0XHRcdC8vIHdoZW4gYXJyYW5naW5nIHBhbmVscywgc2V0IGZsYWcgdG8gbm90IHRyaWdnZXIgZmxpY2sgY3VzdG9tIGV2ZW50XG5cdFx0XHRjb25mLmN1c3RvbUV2ZW50LmZsaWNrID0gZmFsc2U7XG5cblx0XHRcdC8vIG1vdmUgZWxlbWVudHMgYWNjb3JkaW5nIGRpcmVjdGlvblxuXHRcdFx0aWYgKHNvcnQpIHtcblx0XHRcdFx0aW5kZXhUb01vdmUgJiYgKHRvdWNoLmRpcmVjdGlvbiA9IGRpckRhdGFbKyEoaW5kZXhUb01vdmUgPiAwKV0pO1xuXHRcdFx0XHR0aGlzLl9hcnJhbmdlUGFuZWxQb3NpdGlvbih0b3VjaC5kaXJlY3Rpb24sIGluZGV4VG9Nb3ZlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gc2V0IGluZGV4IGZvciBiYXNlIGVsZW1lbnQncyBwb3NpdGlvblxuXHRcdFx0YmFzZUluZGV4ID0gdGhpcy5fZ2V0QmFzZVBvc2l0aW9uSW5kZXgoKTtcblxuXHRcdFx0dGhpcy5fc2V0UGFuZWxObyh7XG5cdFx0XHRcdGluZGV4OiBiYXNlSW5kZXgsXG5cdFx0XHRcdGN1cnJJbmRleDogYmFzZUluZGV4XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gYXJyYW5nZSBBeGVzJyBjb29yZCBwb3NpdGlvblxuXHRcdFx0Y29uZi5jdXN0b21FdmVudC5mbGljayA9ICEhdGhpcy5fc2V0QXhlcyhcInNldFRvXCIsIHBhbmVsLnNpemUgKiBwYW5lbC5pbmRleCwgMCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fYXBwbHlQYW5lbHNQb3MoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgZWFjaCBwYW5lbCdzIHBvc2l0aW9uIGluIERPTVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2FwcGx5UGFuZWxzUG9zKCkge1xuXHRcdHRoaXMuX2NvbmYucGFuZWwuJGxpc3QuZm9yRWFjaCh0aGlzLl9hcHBseVBhbmVsc0Nzcy5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgQ1NTIHN0eWxlIHZhbHVlcyB0byBtb3ZlIGVsZW1lbnRzXG5cdCAqXG5cdCAqIEluaXRpYWxpemUgc2V0dGluZyB1cCBjaGVja2luZyBpZiBicm93c2VyIHN1cHBvcnQgdHJhbnNmb3JtIGNzcyBwcm9wZXJ0eS5cblx0ICogSWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgdHJhbnNmb3JtLCB0aGVuIHVzZSBsZWZ0L3RvcCBwcm9wZXJ0aWVzIGluc3RlYWQuXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9ICRlbFxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb29yZHNWYWx1ZVxuXHQgKi9cblx0X3NldE1vdmVTdHlsZSgkZWwsIGNvb3Jkc1ZhbHVlKSB7XG5cdFx0Y29uc3QgdHJhbnNmb3JtID0gVFJBTlNGT1JNO1xuXHRcdGNvbnN0IHVzZUxheWVySGFjayA9IHRoaXMuX2NvbmYudXNlTGF5ZXJIYWNrO1xuXG5cdFx0dGhpcy5fc2V0TW92ZVN0eWxlID0gdHJhbnNmb3JtLnN1cHBvcnQgP1xuXHRcdFx0KCRlbGVtZW50LCBjb29yZHMpID0+IHtcblx0XHRcdFx0dXRpbHMuY3NzKCRlbGVtZW50LCB7XG5cdFx0XHRcdFx0W3RyYW5zZm9ybS5uYW1lXTogdXRpbHMudHJhbnNsYXRlKGNvb3Jkc1swXSwgY29vcmRzWzFdLCB1c2VMYXllckhhY2spXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSA6ICgkZWxlbWVudCwgY29vcmRzKSA9PiB7XG5cdFx0XHRcdHV0aWxzLmNzcygkZWxlbWVudCwge2xlZnQ6IGNvb3Jkc1swXSwgdG9wOiBjb29yZHNbMV19KTtcblx0XHRcdH07XG5cblx0XHR0aGlzLl9zZXRNb3ZlU3R5bGUoJGVsLCBjb29yZHNWYWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGJhY2sgZnVuY3Rpb24gZm9yIGFwcGx5aW5nIENTUyB2YWx1ZXMgdG8gZWFjaCBwYW5lbHNcblx0ICogTmVlZCB0byBiZSBpbml0aWFsaXplZCBiZWZvcmUgdXNlLCB0byBzZXQgdXAgZm9yIEFuZHJvaWQgMi54IGJyb3dzZXJzIG9yIG90aGVycy5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9hcHBseVBhbmVsc0NzcygpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBkdW1teUFuY2hvckNsYXNzTmFtZSA9IFwiX19kdW1teV9hbmNob3JcIjtcblx0XHRjb25zdCB1c2VUcmFuc2xhdGUgPSB0aGlzLm9wdGlvbnMudXNlVHJhbnNsYXRlO1xuXG5cdFx0aWYgKCF1c2VUcmFuc2xhdGUpIHtcblx0XHRcdGlmIChJU19BTkRST0lEMikge1xuXHRcdFx0XHRjb25mLiRkdW1teUFuY2hvciA9IHV0aWxzLiQoYC4ke2R1bW15QW5jaG9yQ2xhc3NOYW1lfWApO1xuXG5cdFx0XHRcdCFjb25mLiRkdW1teUFuY2hvciAmJiB0aGlzLiR3cmFwcGVyLmFwcGVuZENoaWxkKFxuXHRcdFx0XHRcdGNvbmYuJGR1bW15QW5jaG9yID0gdXRpbHMuJChgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiJHtkdW1teUFuY2hvckNsYXNzTmFtZX1cIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlO2hlaWdodDowcHg7d2lkdGg6MHB4XCI+YClcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fYXBwbHlQYW5lbHNDc3MgPSBmdW5jdGlvbih2LCBpKSB7XG5cdFx0XHRcdGNvbnN0IGNvb3JkcyA9IHRoaXMuX2dldERhdGFCeURpcmVjdGlvbihcblx0XHRcdFx0XHRbYCR7dGhpcy5fY29uZi5wYW5lbC5zaXplICogaX1weGAsIDBdXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0dXRpbHMuY3NzKHYsIHtcblx0XHRcdFx0XHRsZWZ0OiBjb29yZHNbMF0sXG5cdFx0XHRcdFx0dG9wOiBjb29yZHNbMV1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9hcHBseVBhbmVsc0NzcyA9IGZ1bmN0aW9uKHYsIGkpIHtcblx0XHRcdFx0Y29uc3QgY29vcmRzID0gdGhpcy5fZ2V0RGF0YUJ5RGlyZWN0aW9uKFtcblx0XHRcdFx0XHRUUkFOU0ZPUk0uc3VwcG9ydCA/XG5cdFx0XHRcdFx0XHRgJHsxMDAgKiBpfSVgIDpcblx0XHRcdFx0XHRcdGAke3RoaXMuX2NvbmYucGFuZWwuc2l6ZSAqIGl9cHhgLCAwXG5cdFx0XHRcdF0pO1xuXG5cdFx0XHRcdHRoaXMuX3NldE1vdmVTdHlsZSh2LCBjb29yZHMpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQWRqdXN0IGNvbnRhaW5lcidzIGNzcyB2YWx1ZSB0byBoYW5kbGUgQW5kcm9pZCAyLnggbGluayBoaWdobGlnaHRpbmcgYnVnXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwaGFzZVxuXHQgKiAgICBzdGFydCAtIHNldCBsZWZ0L3RvcCB2YWx1ZSB0byAwXG5cdCAqICAgIGVuZCAtIHNldCB0cmFuc2xhdGUgdmFsdWUgdG8gMFxuXHQgKiBAcGFyYW0ge0FycmF5fSB0b1ZhbHVlIGNvb3JkaW5hdGUgdmFsdWVcblx0ICovXG5cdF9hZGp1c3RDb250YWluZXJDc3MocGhhc2UsIHRvVmFsdWUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBwYW5lbCA9IGNvbmYucGFuZWw7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCB1c2VUcmFuc2xhdGUgPSBvcHRpb25zLnVzZVRyYW5zbGF0ZTtcblx0XHRjb25zdCBob3Jpem9udGFsID0gb3B0aW9ucy5ob3Jpem9udGFsO1xuXHRcdGNvbnN0IHBhZGRpbmdUb3AgPSBvcHRpb25zLnByZXZpZXdQYWRkaW5nWzBdO1xuXHRcdGxldCBjb250YWluZXIgPSB0aGlzLiRjb250YWluZXI7XG5cdFx0bGV0IHRvID0gdG9WYWx1ZTtcblx0XHRsZXQgdmFsdWU7XG5cblx0XHRpZiAoIXVzZVRyYW5zbGF0ZSkge1xuXHRcdFx0aWYgKCF0bykge1xuXHRcdFx0XHR0byA9IC1wYW5lbC5zaXplICogcGFuZWwuaW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwaGFzZSA9PT0gXCJzdGFydFwiKSB7XG5cdFx0XHRcdGNvbnRhaW5lciA9IGNvbnRhaW5lci5zdHlsZTtcblx0XHRcdFx0dmFsdWUgPSBwYXJzZUZsb2F0KGNvbnRhaW5lcltob3Jpem9udGFsID8gXCJsZWZ0XCIgOiBcInRvcFwiXSk7XG5cblx0XHRcdFx0aWYgKGhvcml6b250YWwpIHtcblx0XHRcdFx0XHR2YWx1ZSAmJiAoY29udGFpbmVyLmxlZnQgPSBcIjBweFwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSAhPT0gcGFkZGluZ1RvcCAmJiAoY29udGFpbmVyLnRvcCA9IFwiMHB4XCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fc2V0VHJhbnNsYXRlKFstdG8sIDBdKTtcblx0XHRcdH0gZWxzZSBpZiAocGhhc2UgPT09IFwiZW5kXCIpIHtcblx0XHRcdFx0dG8gPSB0aGlzLl9nZXRDb29yZHNWYWx1ZShbdG8sIDBdKTtcblxuXHRcdFx0XHR1dGlscy5jc3MoY29udGFpbmVyLCB7XG5cdFx0XHRcdFx0bGVmdDogdG8ueCxcblx0XHRcdFx0XHR0b3A6IHRvLnksXG5cdFx0XHRcdFx0W1RSQU5TRk9STS5uYW1lXTogdXRpbHMudHJhbnNsYXRlKDAsIDAsIGNvbmYudXNlTGF5ZXJIYWNrKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjb25mLiRkdW1teUFuY2hvciAmJiBjb25mLiRkdW1teUFuY2hvci5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgQXhlcyBjb29yZCB2YWx1ZVxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBmbGljayBkZXN0aW5hdGlvbiB2YWx1ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cblx0ICogQHJldHVybiB7ZWcuQXhlc30gQXhlcyBpbnN0YW5jZVxuXHQgKi9cblx0X3NldEF4ZXMobWV0aG9kLCBmbGljaywgZHVyYXRpb24pIHtcblx0XHRyZXR1cm4gdGhpcy5fYXhlc0luc3RbbWV0aG9kXSh7ZmxpY2t9LCBkdXJhdGlvbik7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGhpbnQgZm9yIGJyb3dzZXIgdG8gZGVjaWRlIGVmZmljaWVudCB3YXkgb2YgZG9pbmcgdHJhbnNmb3JtIGNoYW5nZXMob3IgYW5pbWF0aW9uKVxuXHQgKiBodHRwczovL2Rldi5vcGVyYS5jb20vYXJ0aWNsZXMvY3NzLXdpbGwtY2hhbmdlLXByb3BlcnR5L1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X3NldEhpbnQoKSB7XG5cdFx0Y29uc3Qgc3R5bGUgPSB7d2lsbENoYW5nZTogXCJ0cmFuc2Zvcm1cIn07XG5cblx0XHR1dGlscy5jc3ModGhpcy4kY29udGFpbmVyLCBzdHlsZSk7XG5cdFx0dXRpbHMuY3NzKHRoaXMuX2NvbmYucGFuZWwuJGxpc3QsIHN0eWxlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgZGF0YSBhY2NvcmRpbmcgb3B0aW9ucy5ob3Jpem9udGFsIHZhbHVlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIHByaW1hcnkgZGF0YSB0byBoYW5kbGVcblx0ICogQHJldHVybiB7QXJyYXl9XG5cdCAqL1xuXHRfZ2V0RGF0YUJ5RGlyZWN0aW9uKHZhbHVlKSB7XG5cdFx0Y29uc3QgZGF0YSA9IHZhbHVlLmNvbmNhdCgpO1xuXG5cdFx0IXRoaXMub3B0aW9ucy5ob3Jpem9udGFsICYmIGRhdGEucmV2ZXJzZSgpO1xuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmUgbm9kZXNcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtCb29sZWFufSBkaXJlY3Rpb25cblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4VG9Nb3ZlXG5cdCAqL1xuXHRfYXJyYW5nZVBhbmVsUG9zaXRpb24oZGlyZWN0aW9uLCBpbmRleFRvTW92ZSkge1xuXHRcdGNvbnN0IG5leHQgPSBkaXJlY3Rpb24gPT09IHRoaXMuX2NvbmYuZGlyRGF0YVswXTtcblxuXHRcdHRoaXMuX21vdmVQYW5lbFBvc2l0aW9uKE1hdGguYWJzKGluZGV4VG9Nb3ZlIHx8IDEpLCBuZXh0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGJhc2UgcG9zaXRpb24gaW5kZXggb2YgdGhlIHBhbmVsXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfZ2V0QmFzZVBvc2l0aW9uSW5kZXgoKSB7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5fY29uZi5wYW5lbC5jb3VudCAvIDIgLSAwLjEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpbmQgZXZlbnRzXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYmluZFxuXHQgKi9cblx0X2JpbmRFdmVudHMoYmluZCkge1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgJHdyYXBwZXIgPSB0aGlzLiR3cmFwcGVyO1xuXHRcdGNvbnN0IGF4ZXNJbnN0ID0gdGhpcy5fYXhlc0luc3Q7XG5cblx0XHRpZiAoYmluZCkge1xuXHRcdFx0dGhpcy5fcGFuSW5wdXQgPSBuZXcgUGFuSW5wdXQoJHdyYXBwZXIsIHtcblx0XHRcdFx0aW5wdXRUeXBlOiBvcHRpb25zLmlucHV0VHlwZSxcblx0XHRcdFx0dGhyZXNob2xkQW5nbGU6IG9wdGlvbnMudGhyZXNob2xkQW5nbGUsXG5cdFx0XHRcdHNjYWxlOiB0aGlzLl9nZXREYXRhQnlEaXJlY3Rpb24oWy0xLCAwXSlcblx0XHRcdH0pO1xuXG5cdFx0XHRheGVzSW5zdC5vbih7XG5cdFx0XHRcdGhvbGQ6IHRoaXMuX2hvbGRIYW5kbGVyLmJpbmQodGhpcyksXG5cdFx0XHRcdGNoYW5nZTogdGhpcy5fY2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpLFxuXHRcdFx0XHRyZWxlYXNlOiB0aGlzLl9yZWxlYXNlSGFuZGxlci5iaW5kKHRoaXMpLFxuXHRcdFx0XHRhbmltYXRpb25TdGFydDogdGhpcy5fYW5pbWF0aW9uU3RhcnRIYW5kbGVyLmJpbmQodGhpcyksXG5cdFx0XHRcdGFuaW1hdGlvbkVuZDogdGhpcy5fYW5pbWF0aW9uRW5kSGFuZGxlci5iaW5kKHRoaXMpXG5cdFx0XHR9KS5jb25uZWN0KHRoaXMuX2dldERhdGFCeURpcmVjdGlvbihbXCJmbGlja1wiLCBcIlwiXSksIHRoaXMuX3BhbklucHV0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5kaXNhYmxlSW5wdXQoKTtcblx0XHRcdGF4ZXNJbnN0Lm9mZigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgY29udGFpbmVyJ3MgaGVpZ2h0IHZhbHVlIGFjY29yZGluZyB0byBjaGlsZHJlbidzIGhlaWdodFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGlyZWN0aW9uXG5cdCAqL1xuXHRfc2V0QWRhcHRpdmVIZWlnaHQoZGlyZWN0aW9uKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgaW5kZXhUb01vdmUgPSBjb25mLmluZGV4VG9Nb3ZlO1xuXHRcdGxldCAkY2hpbGRyZW47XG5cdFx0bGV0IGhlaWdodDtcblxuXHRcdGNvbnN0ICRwYW5lbCA9IGluZGV4VG9Nb3ZlID09PSAwID9cblxuXHRcdFx0Ly8gcGFuZWwgbW92ZWQgYnkgMVxuXHRcdFx0dGhpc1tgZ2V0JHtcblx0XHRcdFx0KGRpcmVjdGlvbiA9PT0gQXhlcy5ESVJFQ1RJT05fTEVGVCAmJiBcIk5leHRcIikgfHxcblx0XHRcdFx0KGRpcmVjdGlvbiA9PT0gQXhlcy5ESVJFQ1RJT05fUklHSFQgJiYgXCJQcmV2XCIpIHx8IFwiXCJcblx0XHRcdH1FbGVtZW50YF0oKSA6XG5cblx0XHRcdC8vIHBhbmVsIG1vdmVkIGJ5IC5tb3ZlVG8oKVxuXHRcdFx0Y29uZi5wYW5lbC4kbGlzdFtcblx0XHRcdFx0Y29uZi5wYW5lbC5jdXJySW5kZXggKyBpbmRleFRvTW92ZVxuXHRcdFx0XTtcblxuXHRcdGNvbnN0ICRmaXJzdCA9ICRwYW5lbC5xdWVyeVNlbGVjdG9yKFwiOmZpcnN0LWNoaWxkXCIpO1xuXG5cdFx0aWYgKCRmaXJzdCkge1xuXHRcdFx0aGVpZ2h0ID0gJGZpcnN0LmdldEF0dHJpYnV0ZShEQVRBX0hFSUdIVCk7XG5cblx0XHRcdGlmICghaGVpZ2h0KSB7XG5cdFx0XHRcdCRjaGlsZHJlbiA9ICRwYW5lbC5jaGlsZHJlbjtcblxuXHRcdFx0XHRoZWlnaHQgPSB1dGlscy5vdXRlckhlaWdodChcblx0XHRcdFx0XHQkY2hpbGRyZW4ubGVuZ3RoID4gMSA/ICgkcGFuZWwuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCIsICRwYW5lbCkgOiAkZmlyc3Rcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRoZWlnaHQgPiAwICYmICRmaXJzdC5zZXRBdHRyaWJ1dGUoREFUQV9IRUlHSFQsIGhlaWdodCk7XG5cdFx0XHR9XG5cblx0XHRcdGhlaWdodCA+IDAgJiYgKHRoaXMuJHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRyaWdnZXIgYmVmb3JlUmVzdG9yZSBldmVudFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gZSBldmVudCBvYmplY3Rcblx0ICovXG5cdF90cmlnZ2VyQmVmb3JlUmVzdG9yZShlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgdG91Y2ggPSBjb25mLnRvdWNoO1xuXG5cdFx0Ly8gcmV2ZXJzZSBkaXJlY3Rpb24gdmFsdWUgd2hlbiByZXN0b3JlXG5cdFx0dG91Y2guZGlyZWN0aW9uID0gK2NvbmYuZGlyRGF0YS5qb2luKFwiXCIpLnJlcGxhY2UodG91Y2guZGlyZWN0aW9uLCBcIlwiKTtcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgZXZlbnQgb2NjdXJzIGJlZm9yZSB0aGUgY3VycmVudCBwYW5lbCBzdGFydHMgdG8gcmV0dXJuIHRvIGl0cyBvcmlnaW5hbCBwb3NpdGlvbi4gRm9sbG93ZXMgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja30gYW5kIFtyZXN0b3JlXXtAbGluayBlZy5GbGlja2luZyNldmVudDpyZXN0b3JlfSBldmVudHMuIFRoZSBjb25kaXRpb25zIG9mIG9jY3VycmVuY2UgYXJlIGFzIGZvbGxvd3MuPGJyPjxicj4xLiBUaGUgdXNlciBoYXMgZmluaXNoZWQgaW5wdXQgYnV0IGRvZXMgbm90IGV4Y2VlZCB0aGUgcGFuZWwgbW92ZW1lbnQgdGhyZXNob2xkLjxicj4yLiBDYWxsIHRoZSBbcmVzdG9yZSgpXXtAbGluayBlZy5GbGlja2luZyNyZXN0b3JlfSBtZXRob2QuIChQcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH0gZXZlbnQuKVxuXHRcdCAqIEBrbyDtmITsnqwg7Yyo64SQ7J20IOybkOuemCDsnITsuZjroZwg65CY64+M7JWE6rCA6riwIOyLnOyekeyghOyXkCDrsJzsg53tlZjripQg7J2067Kk7Yq47J2064ukLiDrkqTsnbTslrQgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja33qs7wgW3Jlc3RvcmVde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OnJlc3RvcmV97J2067Kk7Yq46rCAIOuwnOyDne2VnOuLpC4g67Cc7IOd7KGw6rG07J2AIOyVhOuemOyZgCDqsJnri6QuPGJyPjxicj4xLiDsgqzsmqnsnpAg7J6F66Cl7J20IOuBneuCrOuKlOuNsCDtjKjrhJAg7J2064+ZIOyehOqzhOygkOydhCDrhJjsp4Ag7JWK7J2AIOqyveyasC48YnI+Mi4gW3Jlc3RvcmUoKV17QGxpbmsgZWcuRmxpY2tpbmcjcmVzdG9yZX0g66mU7ISc65OcIO2YuOy2nC4oW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IOydtOuypO2KuOydmCDquLDrs7jrj5nsnpEg67Cp7KeAIOyghOygnClcblx0XHQgKiBAbmFtZSBlZy5GbGlja2luZyNiZWZvcmVSZXN0b3JlXG5cdFx0ICogQGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtTdHJpbmd9IGV2ZW50VHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgPGtvPuydtOuypO2KuCDrqoU8L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNUcnVzdGVkIGB0cnVlYCB3aGVuIHRoZSBldmVudCB3YXMgZ2VuZXJhdGVkIGJ5IGEgdXNlciBhY3Rpb24oXCJtb3VzZVwiIG9yIFwidG91Y2hcIikgb3RoZXJ3aXNlIGBmYWxzZWAuPGtvPuyCrOyaqeyekCDslaHshZgoXCJtb3VzZVwiIOuYkOuKlCBcInRvdWNoXCIp7JeQIOydmO2VtCDsnbTrsqTtirjqsIAg7IOd7ISx65CcIOqyveyasCBgdHJ1ZWAuIOq3uCDsmbjripQgYGZhbHNlYC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBubyBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gU2VlIHRoZSBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IG1ldGhvZC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGlyZWN0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudC4gSWYgYGhvcml6b250YWw9dHJ1ZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gSWYgYGhvcml6b250YWw9ZmFsc2VgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPGtvPu2MqOuEkCDsnbTrj5kg67Cp7ZalLiBgaG9yaXpvbnRhbD10cnVlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIGBob3Jpem9udGFsPWZhbHNlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGVwYVBvcyBTdGFydGluZyBjb29yZGluYXRlLiA8a28+7Lac67Cc7KCQIOyijO2RnC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkZXN0UG9zIERlc3RpbmF0aW9uIGNvb3JkaW5hdGUuIDxrbz7rj4TssKnsoJAg7KKM7ZGcLjwva28+XG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja1xuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6cmVzdG9yZVxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gVGhlIG9yZGVyIG9mIGV2ZW50IG9jY3VycmVuY2UuXG5cdFx0ICogLy8g7J2067Kk7Yq4IOuwnOyDnSDsiJzshJxcblx0XHQgKiBiZWZvcmVSZXN0b3JlIChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IHJlc3RvcmUgKG9uY2UpXG5cdFx0ICovXG5cdFx0Y29uZi5jdXN0b21FdmVudC5yZXN0b3JlID0gdGhpcy5fdHJpZ2dlckV2ZW50KEVWRU5UUy5iZWZvcmVSZXN0b3JlLCB7XG5cdFx0XHRkZXBhUG9zOiBlLmRlcGFQb3MuZmxpY2ssXG5cdFx0XHRkZXN0UG9zOiBlLmRlc3RQb3MuZmxpY2tcblx0XHR9KTtcblxuXHRcdGlmICghY29uZi5jdXN0b21FdmVudC5yZXN0b3JlKSB7XG5cdFx0XHRcInN0b3BcIiBpbiBlICYmIGUuc3RvcCgpO1xuXHRcdFx0Y29uZi5wYW5lbC5hbmltYXRpbmcgPSBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVHJpZ2dlciByZXN0b3JlIGV2ZW50XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfdHJpZ2dlclJlc3RvcmUoKSB7XG5cdFx0Y29uc3QgY3VzdG9tRXZlbnQgPSB0aGlzLl9jb25mLmN1c3RvbUV2ZW50O1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIGV2ZW50IHRoYXQgb2NjdXJzIGFmdGVyIGNvbXBsZXRpbmcgdGhlIG1vdmUgYnkgW3Jlc3RvcmUoKV17QGxpbmsgZWcuRmxpY2tpbmcjcmVzdG9yZX0gbWV0aG9kLlxuXHRcdCAqIEBrbyBbcmVzdG9yZSgpXXtAbGluayBlZy5GbGlja2luZyNyZXN0b3JlfSDrqZTshJzrk5zsl5Ag7J2Y7ZW0IO2MqOuEkOydtCDsm5Drnpgg7JyE7LmY66GcIOydtOuPmeydhCDsmYTro4ztlZwg64uk7J2MIOuwnOyDne2VmOuKlCDsnbTrsqTtirguXG5cdFx0ICogQG5hbWUgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBldmVudFR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IDxrbz7snbTrsqTtirgg66qFPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVHJ1c3RlZCBgdHJ1ZWAgd2hlbiB0aGUgZXZlbnQgd2FzIGdlbmVyYXRlZCBieSBhIHVzZXIgYWN0aW9uKFwibW91c2VcIiBvciBcInRvdWNoXCIpIG90aGVyd2lzZSBgZmFsc2VgLjxrbz7sgqzsmqnsnpAg7JWh7IWYKFwibW91c2VcIiDrmJDripQgXCJ0b3VjaFwiKeyXkCDsnZjtlbQg7J2067Kk7Yq46rCAIOyDneyEseuQnCDqsr3smrAgYHRydWVgLiDqt7gg7Jm464qUIGBmYWxzZWAuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gbm8gSW5kZXggbnVtYmVyIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuIFNlZSB0aGUgW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSBtZXRob2QuPGtvPu2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLguIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH3rqZTshJzrk5wg7LC47KGwLjwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpcmVjdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQuIElmIGBob3Jpem9udGFsPXRydWVgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIElmIGBob3Jpem9udGFsPWZhbHNlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljxrbz7tjKjrhJAg7J2064+ZIOuwqe2WpS4gYGhvcml6b250YWw9dHJ1ZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBgaG9yaXpvbnRhbD1mYWxzZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljwva28+XG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpiZWZvcmVSZXN0b3JlXG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja1xuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gVGhlIG9yZGVyIG9mIGV2ZW50IG9jY3VycmVuY2UuXG5cdFx0ICogLy8g7J2067Kk7Yq4IOuwnOyDnSDsiJzshJxcblx0XHQgKiBiZWZvcmVSZXN0b3JlIChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IHJlc3RvcmUgKG9uY2UpXG5cdFx0ICovXG5cdFx0Y3VzdG9tRXZlbnQucmVzdG9yZSAmJiB0aGlzLl90cmlnZ2VyRXZlbnQoRVZFTlRTLnJlc3RvcmUpO1xuXHRcdGN1c3RvbUV2ZW50LnJlc3RvcmUgPSBjdXN0b21FdmVudC5yZXN0b3JlQ2FsbCA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB2YWx1ZSB3aGVuIHBhbmVsIGNoYW5nZXNcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHBoYXNlIC0gW3N0YXJ0fGVuZF1cblx0ICogQHBhcmFtIHtPYmplY3R9IHBvc1xuXHQgKi9cblx0X3NldFBoYXNlVmFsdWUocGhhc2UsIHBvcykge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IHVzZVRyYW5zbGF0ZSA9IG9wdGlvbnMudXNlVHJhbnNsYXRlO1xuXG5cdFx0aWYgKHBoYXNlID09PSBcInN0YXJ0XCIgJiYgKHBhbmVsLmNoYW5nZWQgPSB0aGlzLl9pc01vdmFibGUoKSkpIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogQW4gZXZlbnQgdGhhdCBvY2N1cnMgYmVmb3JlIGEgdXNlciBhY3Rpb24gb3IgW21vdmVUbygpXXtAbGluayBlZy5GbGlja2luZyNtb3ZlVG99LCBbcHJldigpXXtAbGluayBlZy5GbGlja2luZyNwcmV2fSwgW25leHQoKV17QGxpbmsgZWcuRmxpY2tpbmcjbmV4dH0gbWV0aG9kIGluaXRpYXRlcyBhIG1vdmUgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsLiBJZiB5b3UgZG8gbm90IHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IsIHRoZW4gbWFueSBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfSBldmVudHMgYW5kIG9uZSBbZmxpY2tFbmRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrRW5kfSBldmVudCB3aWxsIG9jY3VyLlxuXHRcdFx0ICogQGtvIOyCrOyaqeyekCDslaHshZgg7Zi57J2AIFttb3ZlVG8oKV17QGxpbmsgZWcuRmxpY2tpbmcjbW92ZVRvfSwgW3ByZXYoKV17QGxpbmsgZWcuRmxpY2tpbmcjcHJldn0sIFtuZXh0KClde0BsaW5rIGVnLkZsaWNraW5nI25leHR9IOuplOyEnOuTnOyXkCDsnZjtlbQg66qp7KCBIO2MqOuEkOuhnOydmCDsnbTrj5kg7Iuc7J6R7KCEIOuwnOyDne2VmOuKlCDsnbTrsqTtirguIOq4sOuzuOuPmeyekeydhCDrp4nsp4Ag7JWK64qU64uk66m0IOuSpOydtOyWtCDri6TsiJjsnZggW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja33snbTrsqTtirjsmYAg6re4IOuSpCDtlZwg67KI7J2YIFtmbGlja0VuZF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmR97J2067Kk7Yq46rCAIOuwnOyDne2VnOuLpC5cblx0XHRcdCAqIEBuYW1lIGVnLkZsaWNraW5nI2JlZm9yZUZsaWNrU3RhcnRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQHByb3BlcnR5IHtTdHJpbmd9IGV2ZW50VHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgPGtvPuydtOuypO2KuCDrqoU8L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtCb29sZWFufSBpc1RydXN0ZWQgYHRydWVgIHdoZW4gdGhlIGV2ZW50IHdhcyBnZW5lcmF0ZWQgYnkgYSB1c2VyIGFjdGlvbihcIm1vdXNlXCIgb3IgXCJ0b3VjaFwiKSBvdGhlcndpc2UgYGZhbHNlYC48a28+7IKs7Jqp7J6QIOyVoeyFmChcIm1vdXNlXCIg65iQ64qUIFwidG91Y2hcIinsl5Ag7J2Y7ZW0IOydtOuypO2KuOqwgCDsg53shLHrkJwg6rK97JqwIGB0cnVlYC4g6re4IOyZuOuKlCBgZmFsc2VgPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBubyBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gU2VlIHRoZSBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IG1ldGhvZC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaXJlY3Rpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiBJZiBgaG9yaXpvbnRhbD10cnVlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBJZiBgaG9yaXpvbnRhbD1mYWxzZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48a28+7Yyo64SQIOydtOuPmSDrsKntlqUuIGBob3Jpem9udGFsPXRydWVgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gYGhvcml6b250YWw9ZmFsc2VgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRlcGFQb3MgU3RhcnRpbmcgY29vcmRpbmF0ZS4gPGtvPuy2nOuwnOygkCDsooztkZwuPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkZXN0UG9zIERlc3RpbmF0aW9uIGNvb3JkaW5hdGUuIDxrbz7rj4TssKnsoJAg7KKM7ZGcLjwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBzdG9wIENhbmNlbHMgdGhlIGRlZmF1bHQgYWN0aW9uLiAoRGVmYXVsdCBhY3Rpb246IE1vdmUgdG8gZGVzdGluYXRpb24gcGFuZWwuKSBUaGUgcGFuZWwgZWxlbWVudCBzdGF5cyBhdCB0aGUgcG9zaXRpb24gb2YgdGhlIGNhbGwgdG8gYHN0b3AoKWAuIFRvIHJldHVybiB0byB0aGUgb3JpZ2luYWwgcG9zaXRpb24sIHlvdSBtdXN0IGNhbGwgdGhlIFtyZXN0b3JlKClde0BsaW5rIGVnLkZsaWNraW5nI3Jlc3RvcmV9IG1ldGhvZC48a28+6riw67O464+Z7J6R7J2EIOy3qOyGjO2VnOuLpC4gKOq4sOuzuOuPmeyekTog66qp7KCBIO2MqOuEkOuhnOydmCDsnbTrj5kuKSDtjKjrhJAg7JqU7IaM6rCAIGBzdG9wKClg7Zi47Lac7Iuc7KCQ7J2YIOychOy5mOyXkCDrqLjrrLzrn6wg7J6I64qU64ukLiDsm5Drnpgg7J6Q66as66GcIOuQmOuPjOumrOugpOuptCBbcmVzdG9yZSgpXXtAbGluayBlZy5GbGlja2luZyNyZXN0b3JlfSDrqZTshJzrk5zrpbwg7Zi47Lac7ZW07JW8IO2VnOuLpC48L2tvPlxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja1xuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja0VuZFxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNtb3ZlVG9cblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcHJldlxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNuZXh0XG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogLy8gVGhlIG9yZGVyIG9mIGV2ZW50IG9jY3VycmVuY2UuXG5cdFx0XHQgKiAvLyDsnbTrsqTtirgg67Cc7IOdIOyInOyEnFxuXHRcdFx0ICogYmVmb3JlRmxpY2tTdGFydCAob25jZSkgPiBmbGljayAobWFueSB0aW1lcykgPiBmbGlja0VuZCAob25jZSlcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAvLyBBbiBleGFtcGxlIHRvIHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IuXG5cdFx0XHQgKiAvLyDquLDrs7jrj5nsnpHsnYQg66eJ64qUIOyYiC5cblx0XHRcdCAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKS5vbihcImJlZm9yZUZsaWNrU3RhcnRcIiwgZSA9PiB7XG5cdFx0XHQgKiBcdGUuc3RvcCgpO1xuXHRcdFx0ICogfSk7XG5cdFx0XHQgKi9cblx0XHRcdGlmICghdGhpcy5fdHJpZ2dlckV2ZW50KEVWRU5UUy5iZWZvcmVGbGlja1N0YXJ0LCBwb3MpKSB7XG5cdFx0XHRcdHBhbmVsLmNoYW5nZWQgPSBwYW5lbC5hbmltYXRpbmcgPSBmYWxzZTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3B0aW9ucy5hZGFwdGl2ZUhlaWdodCAmJiB0aGlzLl9zZXRBZGFwdGl2ZUhlaWdodChjb25mLnRvdWNoLmRpcmVjdGlvbik7XG5cdFx0XHR9XG5cblx0XHRcdGNvbmYuaW5kZXhUb01vdmUgPT09IDAgJiYgdGhpcy5fc2V0UGFuZWxObygpO1xuXHRcdH0gZWxzZSBpZiAocGhhc2UgPT09IFwiZW5kXCIpIHtcblx0XHRcdGlmIChvcHRpb25zLmNpcmN1bGFyICYmIHBhbmVsLmNoYW5nZWQpIHtcblx0XHRcdFx0dGhpcy5fYXJyYW5nZVBhbmVscyh0cnVlLCBjb25mLmluZGV4VG9Nb3ZlKTtcblx0XHRcdH1cblxuXHRcdFx0dXNlVHJhbnNsYXRlICYmIHRoaXMuX3NldFRyYW5zbGF0ZShbLXBhbmVsLnNpemUgKiBwYW5lbC5pbmRleCwgMF0pO1xuXHRcdFx0Y29uZi50b3VjaC5kaXN0YW5jZSA9IGNvbmYuaW5kZXhUb01vdmUgPSAwO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFRoZSBldmVudCB0aGF0IG9jY3VycyBhZnRlciBjb21wbGV0aW5nIHRoZSBtb3ZlIHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbC4gSXQgb2NjdXJzIGluIHRoZSBmb2xsb3dpbmcgY2FzZXMuPGJyPjxicj4tIEFmdGVyIGNvbXBsZXRpbmcgdGhlIG1vdmVtZW50IHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbCBieSB1c2VyJ3MgbW92ZSBpbnB1dC48YnI+LSBgbW92ZVRvKClgLCBgcHJldigpYCwgYG5leHQoKWAgbWV0aG9kIGNhbGwuIChJdCBkb2VzIG5vdCBvY2N1ciBpZiB5b3UgaGF2ZSBkaXNhYmxlZCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IGV2ZW50Lilcblx0XHRcdCAqIEBrbyDrqqnsoIEg7Yyo64SQ66Gc7J2YIOydtOuPmeydhCDsmYTro4ztlZwg64uk7J2MIOuwnOyDne2VmOuKlCDsnbTrsqTtirguIOyVhOuemOydmCDqsr3smrDsl5Ag67Cc7IOd7ZWc64ukLjxicj48YnI+LSDsgqzsmqnsnpDsnZgg7J2064+ZKG1vdmUpIOyVoeyFmCDsnoXroKXsl5Ag7J2Y7ZWcIOuqqeyggSDtjKjrhJDroZzsnZgg7J2064+Z7JmE66OMIO2bhC48YnI+LSBgbW92ZVRvKClgLCBgcHJldigpYCwgYG5leHQoKWAg66mU7ISc65OcIO2YuOy2nC4oW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR97J2067Kk7Yq47J2YIOq4sOuzuOuPmeyekeydhCDrp4nslZjri6TrqbQg67Cc7IOd7ZWY7KeAIOyViuuKlOuLpC4pXG5cdFx0XHQgKiBAbmFtZSBlZy5GbGlja2luZyNmbGlja0VuZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAcHJvcGVydHkge1N0cmluZ30gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudC48a28+7J2067Kk7Yq4IOuqhTwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVHJ1c3RlZCBgdHJ1ZWAgd2hlbiB0aGUgZXZlbnQgd2FzIGdlbmVyYXRlZCBieSBhIHVzZXIgYWN0aW9uKFwibW91c2VcIiBvciBcInRvdWNoXCIpIG90aGVyd2lzZSBgZmFsc2VgLjxrbz7sgqzsmqnsnpAg7JWh7IWYKFwibW91c2VcIiDrmJDripQgXCJ0b3VjaFwiKeyXkCDsnZjtlbQg7J2067Kk7Yq46rCAIOyDneyEseuQnCDqsr3smrAgYHRydWVgLiDqt7gg7Jm464qUIGBmYWxzZWAuPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBubyBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gU2VlIHRoZSBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IG1ldGhvZC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaXJlY3Rpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiBJZiBgaG9yaXpvbnRhbD10cnVlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBJZiBgaG9yaXpvbnRhbD1mYWxzZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48a28+7Yyo64SQIOydtOuPmSDrsKntlqUuIGBob3Jpem9udGFsPXRydWVgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gYGhvcml6b250YWw9ZmFsc2VgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48L2tvPlxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0XG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrXG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI21vdmVUb1xuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNwcmV2XG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI25leHRcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAvLyBUaGUgb3JkZXIgb2YgZXZlbnQgb2NjdXJyZW5jZS5cblx0XHRcdCAqIC8vIOydtOuypO2KuCDrsJzsg50g7Iic7IScXG5cdFx0XHQgKiBiZWZvcmVGbGlja1N0YXJ0IChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IGZsaWNrRW5kIChvbmNlKVxuXHRcdFx0ICovXG5cdFx0XHRwYW5lbC5jaGFuZ2VkICYmIHRoaXMuX3RyaWdnZXJFdmVudChFVkVOVFMuZmxpY2tFbmQpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhwaGFzZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHBvc2l0aXZlIG9yIG5lZ2F0aXZlIGFjY29yZGluZyBkaXJlY3Rpb25cblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9nZXROdW1CeURpcmVjdGlvbigpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblxuXHRcdHJldHVybiBjb25mLnRvdWNoLmRpcmVjdGlvbiA9PT0gY29uZi5kaXJEYXRhWzBdID8gMSA6IC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldmVydCBwYW5lbCBudW1iZXJcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9yZXZlcnRQYW5lbE5vKCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBudW0gPSB0aGlzLl9nZXROdW1CeURpcmVjdGlvbigpO1xuXG5cdFx0Y29uc3QgaW5kZXggPSBwYW5lbC5jdXJySW5kZXggPj0gMCA/IHBhbmVsLmN1cnJJbmRleCA6IHBhbmVsLmluZGV4IC0gbnVtO1xuXHRcdGNvbnN0IG5vID0gcGFuZWwuY3Vyck5vID49IDAgPyBwYW5lbC5jdXJyTm8gOiBwYW5lbC5ubyAtIG51bTtcblxuXHRcdHRoaXMuX3NldFBhbmVsTm8oe1xuXHRcdFx0aW5kZXgsXG5cdFx0XHRub1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgcGFuZWwgbnVtYmVyXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmogbnVtYmVyIG9iamVjdFxuXHQgKi9cblx0X3NldFBhbmVsTm8ob2JqKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IGNvdW50ID0gcGFuZWwub3JpZ0NvdW50IC0gMTtcblx0XHRjb25zdCBudW0gPSB0aGlzLl9nZXROdW1CeURpcmVjdGlvbigpO1xuXG5cdFx0aWYgKHV0aWxzLmlzT2JqZWN0KG9iaikpIHtcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuXHRcdFx0XHRwYW5lbFtrZXldID0gb2JqW2tleV07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHJlbWVtYmVyIGN1cnJlbnQgdmFsdWVcblx0XHRcdHBhbmVsLmN1cnJJbmRleCA9IHBhbmVsLmluZGV4O1xuXHRcdFx0cGFuZWwuY3Vyck5vID0gcGFuZWwubm87XG5cblx0XHRcdHBhbmVsLmluZGV4ICs9IG51bTtcblx0XHRcdHBhbmVsLm5vICs9IG51bTtcblx0XHR9XG5cblx0XHRpZiAocGFuZWwubm8gPiBjb3VudCkge1xuXHRcdFx0cGFuZWwubm8gPSAwO1xuXHRcdH0gZWxzZSBpZiAocGFuZWwubm8gPCAwKSB7XG5cdFx0XHRwYW5lbC5ubyA9IGNvdW50O1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgcG9pbnRlckV2ZW50cyBjc3MgcHJvcGVydHkgb24gY29udGFpbmVyIGVsZW1lbnQgZHVlIHRvIHRoZSBpT1MgY2xpY2sgYnVnXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGVcblx0ICovXG5cdF9zZXRQb2ludGVyRXZlbnRzKGUpIHtcblx0XHRjb25zdCAkY29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyO1xuXHRcdGNvbnN0IHBvaW50ZXIgPSB1dGlscy5jc3MoJGNvbnRhaW5lciwgXCJwb2ludGVyRXZlbnRzXCIpO1xuXHRcdGxldCBwb2ludGVyRXZlbnRzO1xuXG5cdFx0aWYgKGUgJiYgZS5ob2xkaW5nICYmXG5cdFx0XHRlLmlucHV0RXZlbnQgJiYgZS5pbnB1dEV2ZW50LnByZXZlbnRTeXN0ZW1FdmVudCAmJlxuXHRcdFx0cG9pbnRlciAhPT0gXCJub25lXCJcblx0XHQpIHtcblx0XHRcdHBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcblx0XHR9IGVsc2UgaWYgKCFlICYmIHBvaW50ZXIgIT09IFwiYXV0b1wiKSB7XG5cdFx0XHRwb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG5cdFx0fVxuXG5cdFx0cG9pbnRlckV2ZW50cyAmJiB1dGlscy5jc3MoJGNvbnRhaW5lciwge3BvaW50ZXJFdmVudHN9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgY29vcmRpbmF0ZSB2YWx1ZSB3aXRoIHVuaXRcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIGNvb3Jkc1ZhbHVlIHtBcnJheX0geCx5IG51bWVyaWMgdmFsdWVcblx0ICogQHJldHVybiB7T2JqZWN0fSB4LHkgY29vcmRpbmF0ZSB2YWx1ZSB3aXRoIHVuaXRcblx0ICovXG5cdF9nZXRDb29yZHNWYWx1ZShjb29yZHNWYWx1ZSkge1xuXHRcdC8vIHRoZSBwYXJhbSBjb21lcyBhcyBbIHZhbCwgMCBdLCB3aGF0ZXZlciB0aGUgZGlyZWN0aW9uLiBTbyByZW9yZGVyIHRoZSB2YWx1ZSBkZXBlbmQgdGhlIGRpcmVjdGlvbi5cblx0XHRjb25zdCBjb29yZHMgPSB0aGlzLl9nZXREYXRhQnlEaXJlY3Rpb24oY29vcmRzVmFsdWUpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHg6IHV0aWxzLmdldFVuaXRWYWx1ZShjb29yZHNbMF0pLFxuXHRcdFx0eTogdXRpbHMuZ2V0VW5pdFZhbHVlKGNvb3Jkc1sxXSlcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0cmFuc2xhdGUgcHJvcGVydHkgdmFsdWVcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29vcmRzVmFsdWUgY29vcmRpbmF0ZSB4LHkgdmFsdWVcblx0ICovXG5cdF9zZXRUcmFuc2xhdGUoY29vcmRzVmFsdWUpIHtcblx0XHRjb25zdCBjb29yZHMgPSB0aGlzLl9nZXRDb29yZHNWYWx1ZShjb29yZHNWYWx1ZSk7XG5cblx0XHR0aGlzLl9zZXRNb3ZlU3R5bGUodGhpcy4kY29udGFpbmVyLCBbY29vcmRzLngsIGNvb3Jkcy55XSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgaWYgcGFuZWwgcGFzc2VkIHRocm91Z2ggdGhyZXNob2xkIHBpeGVsXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfaXNNb3ZhYmxlKCkge1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgYXhlc0luc3QgPSB0aGlzLl9heGVzSW5zdDtcblx0XHRjb25zdCBpc01vdmFibGUgPSBNYXRoLmFicyh0aGlzLl9jb25mLnRvdWNoLmRpc3RhbmNlKSA+PSBvcHRpb25zLnRocmVzaG9sZDtcblx0XHRsZXQgbWF4O1xuXHRcdGxldCBjdXJyUG9zO1xuXG5cdFx0aWYgKCFvcHRpb25zLmNpcmN1bGFyICYmIGlzTW92YWJsZSkge1xuXHRcdFx0bWF4ID0gYXhlc0luc3QuYXhpcy5mbGljay5yYW5nZVsxXTtcblx0XHRcdGN1cnJQb3MgPSBheGVzSW5zdC5nZXQoKS5mbGljaztcblxuXHRcdFx0Ly8gaWYgY3VycmVudCBwb3NpdGlvbiBvdXQgb2YgcmFuZ2Vcblx0XHRcdGlmIChjdXJyUG9zIDwgMCB8fCBjdXJyUG9zID4gbWF4KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaXNNb3ZhYmxlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRyaWdnZXIgY3VzdG9tIGV2ZW50c1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIGV2ZW50IG5hbWVcblx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIC0gYWRkaXRpb25hbCBldmVudCB2YWx1ZVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblx0X3RyaWdnZXJFdmVudChuYW1lLCBwYXJhbSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblxuXHRcdC8vIHBhc3MgY2hhbmdlZCBwYW5lbCBubyBvbmx5IG9uICdmbGlja0VuZCcgZXZlbnRcblx0XHRpZiAobmFtZSA9PT0gRVZFTlRTLmZsaWNrRW5kKSB7XG5cdFx0XHRwYW5lbC5jdXJyTm8gPSBwYW5lbC5ubztcblx0XHRcdHBhbmVsLmN1cnJJbmRleCA9IHBhbmVsLmluZGV4O1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnRyaWdnZXIoY29uZi5ldmVudFByZWZpeCArIG5hbWUsIHV0aWxzLmV4dGVuZCh7XG5cdFx0XHRldmVudFR5cGU6IG5hbWUsXG5cdFx0XHRubzogcGFuZWwuY3Vyck5vLFxuXHRcdFx0ZGlyZWN0aW9uOiBjb25mLnRvdWNoLmRpcmVjdGlvbixcblx0XHRcdGlzVHJ1c3RlZDogY29uZi50b3VjaC5pc1RydXN0ZWRcblx0XHR9LCBwYXJhbSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBuZXh0L3ByZXYgcGFuZWwgZWxlbWVudC9pbmRleC5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtCb29sZWFufSBkaXJlY3Rpb25cblx0ICogQHBhcmFtIHtCb29sZWFufSBlbGVtZW50IC0gdHJ1ZTp0byBnZXQgZWxlbWVudCwgZmFsc2U6dG8gZ2V0IGluZGV4XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBwaHlzaWNhbCAtIHRydWUgOiBwaHlzaWNhbCwgZmFsc2UgOiBsb2dpY2FsIChAZGVwcmVjYXRlZCBzaW5jZSAyLjIuMClcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR8TnVtYmVyfVxuXHQgKi9cblx0X2dldEVsZW1lbnQoZGlyZWN0aW9uLCBlbGVtZW50LCBwaHlzaWNhbCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblx0XHRjb25zdCBwb3MgPSBwYW5lbC5jdXJySW5kZXg7XG5cdFx0Y29uc3QgbmV4dCA9IGRpcmVjdGlvbiA9PT0gdGhpcy5fY29uZi5kaXJEYXRhWzBdO1xuXHRcdGxldCByZXN1bHQgPSBudWxsO1xuXHRcdGxldCB0b3RhbDtcblx0XHRsZXQgaW5kZXg7XG5cblx0XHRpZiAocGh5c2ljYWwpIHtcblx0XHRcdHRvdGFsID0gcGFuZWwuY291bnQ7XG5cdFx0XHRpbmRleCA9IHBvcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG90YWwgPSBwYW5lbC5vcmlnQ291bnQ7XG5cdFx0XHRpbmRleCA9IHBhbmVsLmN1cnJObztcblx0XHR9XG5cblx0XHRjb25zdCBjdXJyZW50SW5kZXggPSBpbmRleDtcblxuXHRcdGlmIChuZXh0KSB7XG5cdFx0XHRpZiAoaW5kZXggPCB0b3RhbCAtIDEpIHtcblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdH0gZWxzZSBpZiAoY2lyY3VsYXIpIHtcblx0XHRcdFx0aW5kZXggPSAwO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoaW5kZXggPiAwKSB7XG5cdFx0XHRcdGluZGV4LS07XG5cdFx0XHR9IGVsc2UgaWYgKGNpcmN1bGFyKSB7XG5cdFx0XHRcdGluZGV4ID0gdG90YWwgLSAxO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChjdXJyZW50SW5kZXggIT09IGluZGV4KSB7XG5cdFx0XHRyZXN1bHQgPSBlbGVtZW50ID8gcGFuZWwuJGxpc3RbbmV4dCA/IHBvcyArIDEgOiBwb3MgLSAxXSA6IGluZGV4O1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHZhbHVlIHRvIGZvcmNlIG1vdmUgcGFuZWxzIHdoZW4gZHVyYXRpb24gaXMgMFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG5leHRcblx0ICovXG5cdF9zZXRWYWx1ZVRvTW92ZShuZXh0KSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cblx0XHRjb25mLnRvdWNoLmRpc3RhbmNlID0gdGhpcy5vcHRpb25zLnRocmVzaG9sZCArIDE7XG5cdFx0Y29uZi50b3VjaC5kaXJlY3Rpb24gPSBjb25mLmRpckRhdGFbKyFuZXh0XTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC5cblx0ICogQGtvIO2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLjrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldEluZGV4XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BoeXNpY2FsPWZhbHNlXSBAZGVwcmVjYXRlZCBzaW5jZSAyLjIuMDxicj48YnI+VHlwZXMgb2YgaW5kZXggbnVtYmVycy48YnI+LSB0cnVlIChQaHlzaWNhbCk6IE1hdGguZmxvb3Ioe1RvdGFsIG51bWJlciBvZiBwYW5lbHN9IC8gMiAtIDAuMSkgdmFsdWUuIChJbmNyZWFzZSBieSAxIGZvciBldmVyeSB0d28gcGFuZWxzLikgSWYgdGhlIGNpcmN1bGFyIG9wdGlvbiBpcyBmYWxzZSwgaXQgZXF1YWxzIHBoeXNpY2FsPWZhbHNlLjxicj4tIGZhbHNlIChMb2dpY2FsKTogVGhlIHZhbHVlIG9mIGhvdyB0aGUgY29udGVudChpbm5lckhUTUwpIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQgaXMgaW4gdGhlIGRlZmluZWQgb3JkZXIgb2YgdGhlIHBhbmVsIGVsZW1lbnRzLjxrbz5AZGVwcmVjYXRlZCBzaW5jZSAyLjIuMDxicj48YnI+7J24642x7IqkIOuyiO2YuOydmCDsooXrpZguPGJyPi0gdHJ1ZSAo66y866as7KCBKTogYE1hdGguZmxvb3Ioe+2MqOuEkCDstJ0g6rCc7IiYfSAvIDIgLSAwLjEpYCDqsJIuICjtjKjrhJDsnbQgMuqwnCDripjslrTrgqAg65WM66eI64ukIDHslKkg7Kad6rCAKSBgY2lyY3VsYXJg7Ji17IWY7J20IGBmYWxzZWDsnbTrqbQgYHBoeXNpY2FsPWZhbHNlYOyZgCDrj5nsnbztlZwg6rCSLjxicj4tIGZhbHNlICjrhbzrpqzsoIEpOiDtmITsnqwg7Yyo64SQIOyalOyGjOydmCDsu6jthZDtirgoaW5uZXJIVE1MKeqwgCAn7Yyo64SQIOyalOyGjOuTpOydmCDsoJXsnZjrkJwg7Iic7IScJ+yXkOyEnCDrqocg67KI7Ke47J247KeA7JeQIOuMgO2VnCDqsJIuPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfSBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gQSB6ZXJvLWJhc2VkIGludGVnZXIuPGtvPu2YhOyerCDtjKjrhJDsnZgg7J24642x7IqkIOuyiO2YuC4gMOu2gO2EsCDsi5zsnpHtlZjripQg7KCV7IiYLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0UHJldkluZGV4XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0TmV4dEluZGV4XG5cdCAqIEBleGFtcGxlXG5cdCAqIGBgYGh0bWxcblx0ICogPGRpdiBpZD1cImZsaWNrXCI+XG5cdCAqIFx0PGRpdj48cD5wYW5lbCAwPC9wPjwvZGl2PlxuXHQgKiBcdDxkaXY+PHA+cGFuZWwgMTwvcD48L2Rpdj5cblx0ICogXHQ8ZGl2PjxwPnBhbmVsIDI8L3A+PC9kaXY+XG5cdCAqIFx0PGRpdj48cD5wYW5lbCAzPC9wPjwvZGl2PlxuXHQgKiA8L2Rpdj5cblx0ICogYGBgXG5cdCAqIGBgYGphdmFzY3JpcHRcblx0ICogLy8gY2lyY3VsYXIgb2ZmIGFuZCBsZWZ0IGZsaWNraW5nLlxuXHQgKiAvLyDsiJztmZjsnYQg64GE6rOgIOyijCDtlIzrpqztgrkuXG5cdCAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKS5vbihcImZsaWNrRW5kXCIsIHtjdXJyZW50VGFyZ2V0fSA9PiB7XG5cdCAqIFx0Y29uc29sZS5sb2coY3VycmVudFRhcmdldC5nZXRJbmRleCgpKTsgLy8gMSA+IDIgPiAzXG5cdCAqIFx0Y29uc29sZS5sb2coY3VycmVudFRhcmdldC5nZXRJbmRleCh0cnVlKSk7IC8vIDEgPiAyID4gM1xuXHQgKiB9O1xuXHQgKlxuXHQgKiAvLyBjaXJjdWxhciBvbiBhbmQgbGVmdCBmbGlja2luZy5cblx0ICogLy8g7Iic7ZmY7J2EIOy8nOqzoCDsoowg7ZSM66as7YK5LlxuXHQgKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIiwge2NpcmN1bGFyOiB0cnVlfSkub24oXCJmbGlja0VuZFwiLCB7Y3VycmVudFRhcmdldH0gPT4ge1xuXHQgKiBcdGNvbnNvbGUubG9nKGN1cnJlbnRUYXJnZXQuZ2V0SW5kZXgoKSk7IC8vIDEgPiAyID4gMyA+IDAgPiAxID4gMiA+IDMgPiAwIC4uLlxuXHQgKiBcdGNvbnNvbGUubG9nKGN1cnJlbnRUYXJnZXQuZ2V0SW5kZXgodHJ1ZSkpOyAvLyAxID4gMSA+IDEgPiAxID4gMSA+IDEgPiAxID4gMSAuLi5cblx0ICogfTtcblx0ICogYGBgXG5cdCAqIEBleGFtcGxlXG5cdCAqIGBgYGh0bWxcblx0ICogPCEtLURlZmluZSBvbmx5IHR3byBwYW5lbHMuLS0+XG5cdCAqIDwhLS3tjKjrhJDsnYQg65GQIOqwnOunjCDsoJXsnZjtlZzri6QuLS0+XG5cdCAqIDxkaXYgaWQ9XCJmbGljazJcIj5cblx0ICogXHQ8ZGl2PjxwPnBhbmVsIDA8L3A+PC9kaXY+XG5cdCAqIFx0PGRpdj48cD5wYW5lbCAxPC9wPjwvZGl2PlxuXHQgKiA8L2Rpdj5cblx0ICogYGBgXG5cdCAqIGBgYGphdmFzY3JpcHRcblx0ICogLy8gKEluIHRoZSBjYXNlIG9mIGNpcmN1bGF0aW9uKSBJZiB0aGUgbnVtYmVyIG9mIGRlZmluZWQgcGFuZWwgZWxlbWVudHMgaXMgbGVzcyB0aGFuIHRoZSBtaW5pbXVtIG51bWJlciByZXF1aXJlZCwgdGhlIG51bWJlciBvZiBwYW5lbHMgaXMgY3JlYXRlZC5cblx0ICogLy8gVGhlcmVmb3JlLCBpdCBpcyBkZXNjcmliZWQgYXMgJ3RoZSBudW1iZXIgb2YgcGFuZWwgZGVmaW5pdGlvbnMgb2YgdGhlIGNvbnRlbnRzIG9mIHRoZSBwYW5lbC4nXG5cdCAqIC8vICjsiJztmZjsnbgg6rK97JqwKSDsoJXsnZjrkJwg7Yyo64SQIOyalOyGjOydmCDqsJzsiJjqsIAg7ZWE7JqUIOy1nOyGjOqwnOyImOuztOuLpCDsoIHsnLzrqbQg6re4IOyImOunjO2BvOydmCDtjKjrhJDsnYQg7IOd7ISx7ZWc64ukLlxuXHQgKiAvLyDqt7jroIfquLAg65WM66y47JeQICftjKjrhJDsnbQg64u06rOgIOyeiOuKlCDsu6jthZDtirjsnZgg7Yyo64SQIOygleydmCDsiJzshLHsg4HsnZgg67KI7Zi4J+udvOqzoCDshKTrqoXtlZzri6QuXG5cdCAqIGNvbnN0IGZsaWNrID0gbmV3IGVnLkZsaWNraW5nKFwiZmxpY2syXCIsIHtcblx0ICogXHRjaXJjdWxhcjogdHJ1ZVxuXHQgKiB9KTtcblx0ICpcblx0ICogLy8gVGhlIGNvbnRlbnQgb2YgdGhlIGN1cnJlbnQgcGFuZWwgaXMgdGhlIGZpcnN0IGluIHRoZSBwYW5lbCBkZWZpbml0aW9uIG9yZGVyLlxuXHQgKiAvLyDtmITsnqwg7Yyo64SQ7J20IOuLtOqzoCDsnojripQg7Luo7YWQ7Yq464qUIO2MqOuEkCDsoJXsnZgg7Iic7ISc7IOBIOyyqyDrsojsp7jsnbTri6QuXG5cdCAqIGZsaWNrLmdldEluZGV4KCk7IC8vIDBcblx0ICpcblx0ICogLy8gVGhlIGNvbnRlbnQgb2YgdGhlIG5leHQgcGFuZWwgaXMgdGhlIHNlY29uZCBpbiB0aGUgcGFuZWwgZGVmaW5pdGlvbiBvcmRlci5cblx0ICogLy8g64uk7J2MIO2MqOuEkOydtCDri7Tqs6Ag7J6I64qUIOy7qO2FkO2KuOuKlCDtjKjrhJAg7KCV7J2YIOyInOyEnOyDgSDrkZAg67KI7Ke47J2064ukLlxuXHQgKiBmbGljay5nZXROZXh0SW5kZXgoKTsgLy8gMVxuXHQgKlxuXHQgKiAvLyBUaGUgY29udGVudCBvZiB0aGUgcHJldmlvdXMgcGFuZWwgaXMgdGhlIHNlY29uZCBpbiB0aGUgcGFuZWwgZGVmaW5pdGlvbiBvcmRlci5cblx0ICogLy8g7J207KCEIO2MqOuEkOydtCDri7Tqs6Ag7J6I64qUIOy7qO2FkO2KuOuKlCDtjKjrhJAg7KCV7J2YIOyInOyEnOyDgSDrkZAg67KI7Ke47J2064ukLlxuXHQgKiBmbGljay5nZXRQcmV2SW5kZXgoKTsgLy8gMVxuXHQgKiBgYGBcblx0ICovXG5cdGdldEluZGV4KHBoeXNpY2FsKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbmYucGFuZWxbcGh5c2ljYWwgPyBcImN1cnJJbmRleFwiIDogXCJjdXJyTm9cIl07XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVmZXJlbmNlIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuXG5cdCAqIEBrbyDtmITsnqwg7Yyo64SQIOyalOyGjOydmCDroIjtjbzrn7DsiqTrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldEVsZW1lbnRcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9IEN1cnJlbnQgcGFuZWwgZWxlbWVudC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshowuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRQcmV2RWxlbWVudFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldE5leHRFbGVtZW50XG5cdCAqL1xuXHRnZXRFbGVtZW50KCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblxuXHRcdHJldHVybiBwYW5lbC4kbGlzdFtwYW5lbC5jdXJySW5kZXhdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHJlZmVyZW5jZSBvZiB0aGUgbmV4dCBwYW5lbCBlbGVtZW50LlxuXHQgKiBAa28g64uk7J2MIO2MqOuEkCDsmpTshozsnZgg66CI7Y2865+w7Iqk66W8IOuwmO2ZmO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNnZXROZXh0RWxlbWVudFxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudHxudWxsfSBOZXh0IHBhbmVsIGVsZW1lbnQgb3IgYG51bGxgIGlmIGl0IGRvZXMgbm90IGV4aXN0Ljxrbz7ri6TsnYwg7Yyo64SQIOyalOyGjC4g7Yyo64SQ7J20IOyXhuycvOuptCBgbnVsbGDsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0RWxlbWVudFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldFByZXZFbGVtZW50XG5cdCAqL1xuXHRnZXROZXh0RWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0RWxlbWVudCh0aGlzLl9jb25mLmRpckRhdGFbMF0sIHRydWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG51bWJlciBvZiB0aGUgbmV4dCBwYW5lbCBlbGVtZW50LlxuXHQgKiBAa28g64uk7J2MIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuOulvCDrsJjtmZjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0TmV4dEluZGV4XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BoeXNpY2FsPWZhbHNlXSBAZGVwcmVjYXRlZCBzaW5jZSAyLjIuMDxicj48YnI+VHlwZXMgb2YgaW5kZXggbnVtYmVyczxicj4tIHRydWUgKFBoeXNpY2FsKTogUGx1cyBvbmUgb2YgW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSByZXR1cm4gdmFsdWUuPGJyPi0gZmFsc2UgKExvZ2ljYWwpOiBUaGUgdmFsdWUgb2YgaG93IHRoZSBjb250ZW50KGlubmVySFRNTCkgb2YgdGhlIG5leHQgcGFuZWwgZWxlbWVudCBpcyBpbiB0aGUgZGVmaW5lZCBvcmRlciBvZiB0aGUgcGFuZWwgZWxlbWVudHMuPGtvPkBkZXByZWNhdGVkIHNpbmNlIDIuMi4wPGJyPjxicj7snbjrjbHsiqQg67KI7Zi47J2YIOyiheulmC48YnI+LSB0cnVlICjrrLzrpqzsoIEpOiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IOuwmO2ZmOqwkuyXkCAx7J2EIOuNlO2VnCDqsJIuPGJyPi0gZmFsc2UgKOuFvOumrOyggSk6IOuLpOydjCDtjKjrhJAg7JqU7IaM7J2YIOy7qO2FkO2KuChpbm5lckhUTUwp6rCAICftjKjrhJAg7JqU7IaM65Ok7J2YIOygleydmOuQnCDsiJzshJwn7JeQ7IScIOuqhyDrsojsp7jsnbjsp4Dsl5Ag64yA7ZWcIOqwki48L2tvPlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ8bnVsbH0gSW5kZXggbnVtYmVyIG9mIHRoZSBuZXh0IHBhbmVsIGVsZW1lbnQgb3IgbnVsbCBpZiBpdCBkb2VzIG5vdCBleGlzdC4gQSB6ZXJvLWJhc2VkIGludGVnZXIuPGtvPuuLpOydjCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLguIDDrtoDthLAg7Iuc7J6R7ZWY64qUIOygleyImC4g7Yyo64SQ7J20IOyXhuycvOuptCBgbnVsbGDsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0SW5kZXhcblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRQcmV2SW5kZXhcblx0ICovXG5cdGdldE5leHRJbmRleChwaHlzaWNhbCkge1xuXHRcdHJldHVybiB0aGlzLl9nZXRFbGVtZW50KHRoaXMuX2NvbmYuZGlyRGF0YVswXSwgZmFsc2UsIHBoeXNpY2FsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIGFsbCBwYW5lbCBlbGVtZW50cy5cblx0ICogQGtvIOuqqOuToCDtjKjrhJAg7JqU7IaM7J2YIOugiO2NvOufsOyKpOulvCDrsJjtmZjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0QWxsRWxlbWVudHNcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gV2hvbGUgcGFuZWwgZWxlbWVudHMuPGtvPuuqqOuToCDtjKjrhJAg7JqU7IaMLjwva28+XG5cdCAqL1xuXHRnZXRBbGxFbGVtZW50cygpIHtcblx0XHRyZXR1cm4gdGhpcy5fY29uZi5wYW5lbC4kbGlzdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSByZWZlcmVuY2Ugb2YgdGhlIHByZXZpb3VzIHBhbmVsIGVsZW1lbnQuXG5cdCAqIEBrbyDsnbTsoIQg7Yyo64SQIOyalOyGjOydmCDroIjtjbzrn7DsiqTrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldFByZXZFbGVtZW50XG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fG51bGx9IFByZXZpb3VzIHBhbmVsIGVsZW1lbnQgb3IgYG51bGxgIGlmIGl0IGRvZXMgbm90IGV4aXN0Ljxrbz7snbTsoIQg7Yyo64SQIOyalOyGjC4g7Yyo64SQ7J20IOyXhuycvOuptCBgbnVsbGDsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0RWxlbWVudFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldE5leHRFbGVtZW50XG5cdCAqL1xuXHRnZXRQcmV2RWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0RWxlbWVudCh0aGlzLl9jb25mLmRpckRhdGFbMV0sIHRydWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG51bWJlciBvZiB0aGUgcHJldmlvdXMgcGFuZWwgZWxlbWVudC5cblx0ICogQGtvIOydtOyghCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLjrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldFByZXZJbmRleFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtwaHlzaWNhbD1mYWxzZV0gQGRlcHJlY2F0ZWQgc2luY2UgMi4yLjA8YnI+PGJyPlR5cGVzIG9mIGluZGV4IG51bWJlcnM8YnI+LSB0cnVlIChQaHlzaWNhbCk6IE1pbnVzIG9uZSBvZiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IHJldHVybiB2YWx1ZS48YnI+LSBmYWxzZSAoTG9naWNhbCk6IFRoZSB2YWx1ZSBvZiBob3cgdGhlIGNvbnRlbnQoaW5uZXJIVE1MKSBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50IGlzIGluIHRoZSBkZWZpbmVkIG9yZGVyIG9mIHRoZSBwYW5lbCBlbGVtZW50cy48a28+QGRlcHJlY2F0ZWQgc2luY2UgMi4yLjA8YnI+PGJyPuyduOuNseyKpCDrsojtmLjsnZgg7KKF66WYPGJyPi0gdHJ1ZSAo66y866as7KCBKTogW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSDrsJjtmZjqsJLsl5AgMeydhCDruoAg6rCSLjxicj4tIGZhbHNlICjrhbzrpqzsoIEpOiDsnbTsoIQg7Yyo64SQIOyalOyGjOydmCDsu6jthZDtirgoaW5uZXJIVE1MKeqwgCAn7Yyo64SQIOyalOyGjOuTpOydmCDsoJXsnZjrkJwg7Iic7IScJ+yXkOyEnCDrqocg67KI7Ke47J247KeA7JeQIOuMgO2VnCDqsJIuPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfG51bGx9IFByZXZpb3VzIGVsZW1lbnQgaW5kZXggdmFsdWUgb3IgbnVsbCBpZiBubyBtb3JlIGVsZW1lbnQgZXhpc3QuIEEgemVyby1iYXNlZCBpbnRlZ2VyLjxrbz7snbTsoIQg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi4LiAw67aA7YSwIOyLnOyeke2VmOuKlCDsoJXsiJguIO2MqOuEkOydtCDsl4bripQg6rK97Jqw64qUIGBudWxsYC48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldEluZGV4XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0TmV4dEluZGV4XG5cdCAqL1xuXHRnZXRQcmV2SW5kZXgocGh5c2ljYWwpIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0RWxlbWVudCh0aGlzLl9jb25mLmRpckRhdGFbMV0sIGZhbHNlLCBwaHlzaWNhbCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGFuaW1hdGVkIHBhbmVsIGlzIHBsYXlpbmcuXG5cdCAqIEBrbyDtjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmOydtCDsp4Ttlokg7KSR7J247KeAIO2ZleyduO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNpc1BsYXlpbmdcblx0ICogQHJldHVybiB7Qm9vbGVhbn0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGFuaW1hdGVkIHBhbmVsIGlzIHBsYXlpbmcgPGtvPu2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWYIOynhO2WiSDspJEg7Jes67aAPC9rbz5cblx0ICovXG5cdGlzUGxheWluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5fY29uZi5wYW5lbC5hbmltYXRpbmc7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZSBwYW5lbCBhcHBseWluZyBzdGFydC9lbmQgcGhhc2UgdmFsdWVcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBBeGVzJyBtZXRob2QgbmFtZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gdG8gZGVzdGluYXRpb24gdmFsdWVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uVmFsdWUgZHVyYXRpb24gdmFsdWVcblx0ICovXG5cdF9tb3ZlUGFuZWxCeVBoYXNlKG1ldGhvZCwgdG8sIGR1cmF0aW9uVmFsdWUpIHtcblx0XHRjb25zdCBkdXJhdGlvbiA9IHV0aWxzLmdldE51bVZhbHVlKGR1cmF0aW9uVmFsdWUsIHRoaXMub3B0aW9ucy5kdXJhdGlvbik7XG5cblx0XHRpZiAodGhpcy5fc2V0UGhhc2VWYWx1ZShcInN0YXJ0XCIpICE9PSBmYWxzZSkge1xuXHRcdFx0dGhpcy5fc2V0QXhlcyhtZXRob2QsIHRvLCBkdXJhdGlvbik7XG5cdFx0XHQhZHVyYXRpb24gJiYgdGhpcy5fc2V0UGhhc2VWYWx1ZShcImVuZFwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgYW4gZWxlbWVudCB0byB0aGUgbmV4dCBwYW5lbC4gSWYgYGhvcml6b250YWw9dHJ1ZWBpcyByaWdodCBwYW5lbC4gSWYgYGhvcml6b250YWw9ZmFsc2VgaXMgbG93ZXIgcGFuZWwuXG5cdCAqIEBrbyDri6TsnYwg7Yyo64SQ66GcIOydtOuPme2VnOuLpC4gYGhvcml6b250YWw9dHJ1ZWDsnbTrqbQg7Jqw7LihIO2MqOuEkC4gYGhvcml6b250YWw9ZmFsc2Vg7J2066m0IO2VmOy4oSDtjKjrhJAuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjbmV4dFxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uPW9wdGlvbnMuZHVyYXRpb25dIER1cmF0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudCAodW5pdDogbXMpIDxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCEKOuLqOychDogbXMpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjYmVmb3JlRmxpY2tTdGFydFxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZmxpY2tcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2ZsaWNrRW5kXG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjbW92ZVRvXG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjcHJldlxuXHQgKi9cblx0bmV4dChkdXJhdGlvbikge1xuXHRcdGNvbnN0IGluZGV4ID0gdGhpcy5nZXROZXh0SW5kZXgoKTtcblxuXHRcdGlmICh0eXBlb2YgaW5kZXggIT09IFwibnVtYmVyXCIpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fbW92ZVRvKGluZGV4LCBkdXJhdGlvbiwgQXhlcy5ESVJFQ1RJT05fUklHSFQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIGFuIGVsZW1lbnQgdG8gdGhlIHByZXZpb3VzIHBhbmVsLiBJZiBgaG9yaXpvbnRhbD10cnVlYGlzIGxlZnQgcGFuZWwuIElmIGBob3Jpem9udGFsPWZhbHNlYGlzIHVwcGVyIHBhbmVsLlxuXHQgKiBAa28g7J207KCEIO2MqOuEkOuhnCDsnbTrj5ntlZzri6QuIGBob3Jpem9udGFsPXRydWVg7J2066m0IOyijOy4oSDtjKjrhJAuIGBob3Jpem9udGFsPWZhbHNlYOydtOuptCDsg4HsuKEg7Yyo64SQLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI3ByZXZcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtkdXJhdGlvbj1vcHRpb25zLmR1cmF0aW9uXSBEdXJhdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQgKHVuaXQ6IG1zKSA8a28+7Yyo64SQIOydtOuPmSDslaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjYmVmb3JlRmxpY2tTdGFydFxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZmxpY2tcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2ZsaWNrRW5kXG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjbW92ZVRvXG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjbmV4dFxuXHQgKi9cblx0cHJldihkdXJhdGlvbikge1xuXHRcdGNvbnN0IGluZGV4ID0gdGhpcy5nZXRQcmV2SW5kZXgoKTtcblxuXHRcdGlmICh0eXBlb2YgaW5kZXggIT09IFwibnVtYmVyXCIpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fbW92ZVRvKGluZGV4LCBkdXJhdGlvbiwgQXhlcy5ESVJFQ1RJT05fTEVGVCk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdG8gdGhlIHBhbmVsIGluIHRoZSBvcmRlciBzcGVjaWZpZWQgaW4gYG5vVmFsdWVgLiBJZiBub1ZhbHVlIGlzIGVxdWFsIHRvIHRoZSBjdXJyZW50IGxvZ2ljYWwgaW5kZXggbnVtYmVyaW5nLCBubyBhY3Rpb24gaXMgdGFrZW4uIFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSwgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja30sIFtmbGlja0VuZF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmR9IGV2ZW50cyBvY2N1ciBvbmUgYWZ0ZXIgdGhlIG90aGVyLlxuXHQgKiBAa28gYG5vVmFsdWVg7JeQIOyngOygle2VnCDsiJzshJzsnZgg7Yyo64SQ66GcIOydtOuPme2VnOuLpC4gYG5vVmFsdWVg6rCS7J20IO2YhOyerOydmCDrhbzrpqzsoIEg7J24642x7IqkIOuyiO2YuOyZgCDqsJnri6TrqbQg7JWE66y064+Z7J6RIO2VmOyngCDslYrripTri6QuIFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSwgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja30sIFtmbGlja0VuZF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmR9IOydtOuypO2KuOqwgCDssKjroYDroZwg67Cc7IOd7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI21vdmVUb1xuXHQgKiBAcGFyYW0ge051bWJlcn0gbm9WYWx1ZSBUaGUgbG9naWNhbCBpbmRleCBudW1iZXIgb2YgdGhlIHBhbmVsIGVsZW1lbnQgdG8gYmUgbW92ZWQuIChCYXNlZCBvbiB0aGUgZGVmaW5lZCBvcmRlciBvZiB0aGUgcGFuZWwgZWxlbWVudHMuKTxrbz7snbTrj5ntlaAg7Yyo64SQIOyalOyGjOydmCDrhbzrpqzsoIEg7J24642x7IqkIOuyiO2YuC4gKFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH3rqZTshJzrk5wg7LC47KGwLik8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uPW9wdGlvbnMuZHVyYXRpb25dIER1cmF0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudCAodW5pdDogbXMpIDxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCEKOuLqOychDogbXMpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNiZWZvcmVGbGlja1N0YXJ0XG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNmbGlja1xuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZmxpY2tFbmRcblx0ICogQHNlZSBlZy5GbGlja2luZyNwcmV2XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjbmV4dFxuXHQgKi9cblx0bW92ZVRvKG5vVmFsdWUsIGR1cmF0aW9uKSB7XG5cdFx0cmV0dXJuIHRoaXMuX21vdmVUbyhub1ZhbHVlLCBkdXJhdGlvbik7XG5cdH1cblx0X21vdmVUbyhub1ZhbHVlLCBkdXJhdGlvbiwgZGlyZWN0aW9uKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IGNpcmN1bGFyID0gdGhpcy5vcHRpb25zLmNpcmN1bGFyO1xuXHRcdGNvbnN0IGN1cnJlbnRJbmRleCA9IHBhbmVsLmluZGV4O1xuXHRcdGxldCBpbmRleFRvTW92ZTtcblx0XHRsZXQgaXNQb3NpdGl2ZTtcblx0XHRsZXQgbm8gPSBub1ZhbHVlO1xuXG5cdFx0bm8gPSB1dGlscy5nZXROdW1WYWx1ZShubywgLTEpO1xuXG5cdFx0aWYgKG5vIDwgMCB8fCBubyA+PSBwYW5lbC5vcmlnQ291bnQgfHwgbm8gPT09IHBhbmVsLm5vIHx8XG5cdFx0XHRwYW5lbC5hbmltYXRpbmcgfHwgY29uZi50b3VjaC5ob2xkaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRpbmRleFRvTW92ZSA9IG5vIC0gKGNpcmN1bGFyID8gcGFuZWwubm8gOiBjdXJyZW50SW5kZXgpO1xuXHRcdGlmIChkaXJlY3Rpb24gPT09IEF4ZXMuRElSRUNUSU9OX1JJR0hUICYmIGluZGV4VG9Nb3ZlIDwgMCkge1xuXHRcdFx0aW5kZXhUb01vdmUgKz0gcGFuZWwub3JpZ0NvdW50O1xuXHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBBeGVzLkRJUkVDVElPTl9MRUZUICYmIGluZGV4VG9Nb3ZlID4gMCkge1xuXHRcdFx0aW5kZXhUb01vdmUgLT0gcGFuZWwub3JpZ0NvdW50O1xuXHRcdH1cblx0XHRpc1Bvc2l0aXZlID0gaW5kZXhUb01vdmUgPiAwO1xuXG5cdFx0Ly8gY2hlY2sgZm9yIHJlYWwgcGFuZWwgY291bnQgd2hpY2ggY2FuIGJlIG1vdmVkIG9uIGVhY2ggc2lkZXMgaW4gY2lyY3VsYXIgbW9kZVxuXHRcdGlmIChjaXJjdWxhciAmJlxuXHRcdFx0TWF0aC5hYnMoaW5kZXhUb01vdmUpID5cblx0XHRcdChpc1Bvc2l0aXZlID8gcGFuZWwuY291bnQgLSAoY3VycmVudEluZGV4ICsgMSkgOiBjdXJyZW50SW5kZXgpKSB7XG5cdFx0XHRpbmRleFRvTW92ZSArPSAoaXNQb3NpdGl2ZSA/IC0xIDogMSkgKiBwYW5lbC5jb3VudDtcblx0XHRcdGlzUG9zaXRpdmUgPSBpbmRleFRvTW92ZSA+IDA7XG5cdFx0fVxuXG5cdFx0dGhpcy5fc2V0UGFuZWxObyhjaXJjdWxhciA/IHtub30gOiB7bm8sIGluZGV4OiBub30pO1xuXHRcdHRoaXMuX2NvbmYuaW5kZXhUb01vdmUgPSBpbmRleFRvTW92ZTtcblx0XHR0aGlzLl9zZXRWYWx1ZVRvTW92ZShpc1Bvc2l0aXZlKTtcblxuXHRcdHRoaXMuX21vdmVQYW5lbEJ5UGhhc2UoXG5cdFx0XHRjaXJjdWxhciA/IFwic2V0QnlcIiA6IFwic2V0VG9cIixcblx0XHRcdHBhbmVsLnNpemUgKiAoY2lyY3VsYXIgPyBpbmRleFRvTW92ZSA6IG5vKSxcblx0XHRcdGR1cmF0aW9uXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBob3Jpem9udGFsIG9yIHZlcnRpY2FsIGxlbmd0aCBvZiB0aGUgcGFuZWwgaXMgdXBkYXRlZCBhY2NvcmRpbmcgdG8gdGhlIGJhc2UgZWxlbWVudC4gSWYgYGhvcml6b250YWw9dHJ1ZWAgaXMgaG9yaXpvbnRhbC4gSWYgYGhvcml6b250YWw9ZmFsc2VgIGlzIHZlcnRpY2FsLlxuXHQgKiBAa28g7Yyo64SQ7J2YIOqwgOuhnCDtmLnsnYAg7IS466GcIOq4uOydtOulvCDquLDspIDsmpTshozsl5Ag66ee7LawIOqwseyLoO2VnOuLpC4gYGhvcml6b250YWw9dHJ1ZWDsnbTrqbQg6rCA66GcLCBgaG9yaXpvbnRhbD1mYWxzZWDsnbTrqbQg7IS466GcLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI3Jlc2l6ZVxuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQGV4YW1wbGVcblx0ICogY29uc3QgZmxpY2sgPSBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIiwge1xuXHQgKiBcdHByZXZpZXdQYWRkaW5nOiBbMTAsIDEwXVxuXHQgKiB9KTtcblx0ICpcblx0ICogLy8gV2hlbiBkZXZpY2Ugb3JpZW50YWlvbiBjaGFuZ2VzLlxuXHQgKiAvLyDri6jrp5DquLDrpbwg7ZqM7KCE7ZaI7J2EIOuVjC5cblx0ICogZmxpY2sucmVzaXplKCk7XG5cdCAqXG5cdCAqIC8vIE9yIHdoZW4gY2hhbmdlcyBwcmV2aWV3UGFkZGluZyBvcHRpb24gZnJvbSBpdHMgb3JpZ2luYWwgdmFsdWUuXG5cdCAqIC8vIOuYkOuKlCBwcmV2aWV3UGFkZGluZ+yYteyFmOqwkuydhCDrs4Dqsr3tlojsnYQg65WMLlxuXHQgKiBmbGljay5vcHRpb25zLnByZXZpZXdQYWRkaW5nID0gWzIwLCAzMF07XG5cdCAqIGZsaWNrLnJlc2l6ZSgpO1xuXHQgKi9cblx0cmVzaXplKCkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IGhvcml6b250YWwgPSBvcHRpb25zLmhvcml6b250YWw7XG5cdFx0Y29uc3QgdXNlVHJhbnNsYXRlID0gb3B0aW9ucy51c2VUcmFuc2xhdGU7XG5cdFx0bGV0IHBhbmVsU2l6ZTtcblxuXHRcdGlmICghdGhpcy5pc1BsYXlpbmcoKSkge1xuXHRcdFx0aWYgKHV0aWxzLmlzQXJyYXkob3B0aW9ucy5wcmV2aWV3UGFkZGluZykgJiYgdHlwZW9mKCtvcHRpb25zLnByZXZpZXdQYWRkaW5nLmpvaW4oXCJcIikpID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdHRoaXMuX3NldFBhZGRpbmcob3B0aW9ucy5wcmV2aWV3UGFkZGluZy5jb25jYXQoKSk7XG5cdFx0XHRcdHBhbmVsU2l6ZSA9IHBhbmVsLnNpemU7XG5cdFx0XHR9IGVsc2UgaWYgKGhvcml6b250YWwpIHtcblx0XHRcdFx0cGFuZWxTaXplID0gcGFuZWwuc2l6ZSA9IHV0aWxzLmNzcyh0aGlzLiR3cmFwcGVyLCBcIndpZHRoXCIsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZXNpemUgcGFuZWwgZWxlbWVudHNcblx0XHRcdHV0aWxzLmNzcyhwYW5lbC4kbGlzdCwge1xuXHRcdFx0XHRbaG9yaXpvbnRhbCA/IFwid2lkdGhcIiA6IFwiaGVpZ2h0XCJdOiB1dGlscy5nZXRVbml0VmFsdWUocGFuZWxTaXplKVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIHJlbW92ZSBkYXRhLWhlaWdodCBhdHRyaWJ1dGUgYW5kIHJlLWV2YWx1YXRlIHBhbmVsJ3MgaGVpZ2h0XG5cdFx0XHRpZiAob3B0aW9ucy5hZGFwdGl2ZUhlaWdodCkge1xuXHRcdFx0XHRjb25zdCAkcGFuZWwgPSB0aGlzLiRjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgWyR7REFUQV9IRUlHSFR9XWApO1xuXG5cdFx0XHRcdGlmICgkcGFuZWwubGVuZ3RoKSB7XG5cdFx0XHRcdFx0dXRpbHMudG9BcnJheSgkcGFuZWwpXG5cdFx0XHRcdFx0XHQuZm9yRWFjaCh2ID0+IHYucmVtb3ZlQXR0cmlidXRlKERBVEFfSEVJR0hUKSk7XG5cblx0XHRcdFx0XHR0aGlzLl9zZXRBZGFwdGl2ZUhlaWdodCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2F4ZXNJbnN0LmF4aXMuZmxpY2sucmFuZ2UgPSBbMCwgcGFuZWxTaXplICogKHBhbmVsLmNvdW50IC0gMSldO1xuXHRcdFx0dGhpcy5fc2V0QXhlcyhcInNldFRvXCIsIHBhbmVsU2l6ZSAqIHBhbmVsLmluZGV4LCAwKTtcblxuXHRcdFx0aWYgKCF1c2VUcmFuc2xhdGUpIHtcblx0XHRcdFx0dGhpcy5fYXBwbHlQYW5lbHNQb3MoKTtcblx0XHRcdFx0dGhpcy5fYWRqdXN0Q29udGFpbmVyQ3NzKFwiZW5kXCIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgcGFuZWwgdG8gaXRzIG9yaWdpbmFsIHBvc2l0aW9uLiAoSXQgb25seSB3b3JrcyB3aGVuIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH0gZXZlbnQgaXMgY2FuY2VsZWQuKSBbYmVmb3JlUmVzdG9yZV17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlUmVzdG9yZX0sIFtmbGlja117QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2t9LCBbcmVzdG9yZV17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6cmVzdG9yZX0gZXZlbnRzIGFyZSBvY2N1ciBpbiBvcmRlci5cblx0ICogQGtvIO2MqOuEkOydmCDsnITsuZjrpbwg7JuQ656YIOyekOumrOuhnCDrkJjrj4zrprDri6QuIChbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH0g7J2067Kk7Yq47J2YIOq4sOuzuOuPmeyekeydhCDst6jshoztlZwg6rK97Jqw7JeQ66eMIOuPmeyeke2VqC4pIFtiZWZvcmVSZXN0b3JlXXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVSZXN0b3JlfSwgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja30sIFtyZXN0b3JlXXtAbGluayBlZy5GbGlja2luZyNldmVudDpyZXN0b3JlfSDsnbTrsqTtirjqsIAg7LCo66GA66GcIOuwnOyDne2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNyZXN0b3JlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb25WYWx1ZT1vcHRpb25zLmR1cmF0aW9uXSBEdXJhdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQgKHVuaXQ6IG1zKTxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCEKOuLqOychDogbXMpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNldmVudDpiZWZvcmVSZXN0b3JlXG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNldmVudDpmbGlja1xuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZXZlbnQ6cmVzdG9yZVxuXHQgKiBAZXhhbXBsZVxuXHQgKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIikub24oXCJiZWZvcmVGbGlja1N0YXJ0XCIsIGUgPT4ge1xuXHQgKiBcdGlmIChlLm5vID09PSAyKSB7XG5cdCAqIFx0XHQvLyBDYW5jZWxzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSAnYmVmb3JlRmxpY2tTdGFydCcgZXZlbnQuXG5cdCAqIFx0XHQvLyAnYmVmb3JlRmxpY2tTdGFydCcg7J2067Kk7Yq4IOq4sOuzuOuPmeyekSDst6jshowuXG5cdCAqIFx0XHRlLnN0b3AoKTtcblx0ICpcblx0ICogXHRcdC8vIFJldHVybiB0byBvcmlnaW5hbCBwb3NpdGlvbi5cblx0ICogXHRcdC8vIOybkOuemCDsnpDrpqzroZwg65CY64+M66a8LlxuXHQgKiBcdFx0dGhpcy5yZXN0b3JlKDEwMCk7XG5cdCAqIFx0fVxuXHQgKiB9KTtcblx0ICovXG5cdHJlc3RvcmUoZHVyYXRpb25WYWx1ZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCBjdXJyUG9zID0gdGhpcy5fYXhlc0luc3QuZ2V0KCkuZmxpY2s7XG5cdFx0bGV0IGR1cmF0aW9uID0gZHVyYXRpb25WYWx1ZTtcblx0XHRsZXQgZGVzdFBvcztcblxuXHRcdC8vIGNoZWNrIGlmIHRoZSBwYW5lbCBpc24ndCBpbiByaWdodCBwb3NpdGlvblxuXHRcdGlmIChjdXJyUG9zICE9PSBwYW5lbC5jdXJySW5kZXggKiBwYW5lbC5zaXplKSB7XG5cdFx0XHRjb25mLmN1c3RvbUV2ZW50LnJlc3RvcmVDYWxsID0gdHJ1ZTtcblx0XHRcdGR1cmF0aW9uID0gdXRpbHMuZ2V0TnVtVmFsdWUoZHVyYXRpb24sIHRoaXMub3B0aW9ucy5kdXJhdGlvbik7XG5cblx0XHRcdHRoaXMuX3JldmVydFBhbmVsTm8oKTtcblx0XHRcdGRlc3RQb3MgPSBwYW5lbC5zaXplICogcGFuZWwuaW5kZXg7XG5cblx0XHRcdHRoaXMuX3RyaWdnZXJCZWZvcmVSZXN0b3JlKHtkZXBhUG9zOiBjdXJyUG9zLCBkZXN0UG9zfSk7XG5cdFx0XHR0aGlzLl9zZXRBeGVzKFwic2V0VG9cIiwgZGVzdFBvcywgZHVyYXRpb24pO1xuXG5cdFx0XHRpZiAoIWR1cmF0aW9uKSB7XG5cdFx0XHRcdHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhcImVuZFwiKTtcblx0XHRcdFx0dGhpcy5fdHJpZ2dlclJlc3RvcmUoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gdG8gaGFuZGxlIG9uIGFwaSBjYWxsXG5cdFx0fSBlbHNlIGlmIChwYW5lbC5jaGFuZ2VkKSB7XG5cdFx0XHR0aGlzLl9yZXZlcnRQYW5lbE5vKCk7XG5cdFx0XHRjb25mLnRvdWNoLmRpc3RhbmNlID0gY29uZi5pbmRleFRvTW92ZSA9IDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGlucHV0IGZyb20gdGhlIGlucHV0IGRldmljZSBpcyBub3QgYmxvY2tlZCBzbyB0aGF0IHRoZSBwYW5lbCBjYW4gYmUgbW92ZWQgYnkgdGhlIGlucHV0IGRldmljZS5cblx0ICogQGtvIOunieyVmOuNmCDsnoXroKUg7J6l7LmY66Gc67aA7YSw7J2YIOyeheugpeydhCDtkbzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZW5hYmxlSW5wdXRcblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2Rpc2FibGVJbnB1dFxuXHQgKi9cblx0ZW5hYmxlSW5wdXQoKSB7XG5cdFx0dGhpcy5fcGFuSW5wdXQuZW5hYmxlKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGlucHV0IGZyb20gdGhlIGlucHV0IGRldmljZSBpcyBibG9ja2VkIHNvIHRoYXQgdGhlIHBhbmVsIGlzIG5vdCBtb3ZlZCBieSB0aGUgaW5wdXQgZGV2aWNlLlxuXHQgKiBAa28g7Yyo64SQ7J20IOyeheugpSDsnqXsuZjsl5Ag7J2Y7ZW0IOybgOyngeydtOyngCDslYrrj4TroZ0g7J6F66ClIOyepey5mOuhnOu2gO2EsOydmCDsnoXroKXsnYQg66eJ64qU64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2Rpc2FibGVJbnB1dFxuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZW5hYmxlSW5wdXRcblx0ICovXG5cdGRpc2FibGVJbnB1dCgpIHtcblx0XHR0aGlzLl9wYW5JbnB1dC5kaXNhYmxlKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGN1cnJlbnQgZmxpY2tpbmcgc3RhdHVzLiBJZiB0aGUgcmV0dXJuZWQgdmFsdWUgaXMgc3BlY2lmaWVkIGFzIGEgW3NldFN0YXR1cygpXXtAbGluayBlZy5GbGlja2luZyNzZXRTdGF0dXN9IG1ldGhvZCBhcmd1bWVudCwgaXQgY2FuIGJlIHJldHVybmVkIHRvIGl0cyB2YWx1ZSBzdGF0ZS5cblx0ICogQGtvIO2YhOyerCDsg4Htg5wg6rCS7J2EIOuwmO2ZmO2VnOuLpC4g67CY7ZmY67Cb7J2AIOqwkuydhCBbc2V0U3RhdHVzKClde0BsaW5rIGVnLkZsaWNraW5nI3NldFN0YXR1c30g66mU7ISc65OcIOyduOyekOuhnCDsp4DsoJXtlZjrqbQg6re4IOqwkiDsg4Htg5zroZwg65CY64+M66a0IOyImCDsnojri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0U3RhdHVzXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3N0cmluZ2lmeV0gU2V0IHRydWUgaWYgd2FudCBnZXQgc3RyaW5naWZpZWQgc3RhdHVzIHZhbHVlLjxrbz50cnVlIOyngOygleyLnCBqc29u66y47J6Q7Je0IO2Yle2DnOuhnCDrsJjtmZjtlZzri6QuPC9rbz5cblx0ICogQHJldHVybiB7U3RhdHVzfFN0cmluZ30gQW4gb2JqZWN0IHdpdGggY3VycmVudCBzdGF0ZSB2YWx1ZSBpbmZvcm1hdGlvbi48a28+7ZiE7J6sIOyDge2DnOqwkiDsoJXrs7Trpbwg6rCA7KeEIOqwneyytC48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI3NldFN0YXR1c1xuXHQgKiBAZXhhbXBsZVxuXHQgKiBjb25zdCBmbGljayA9IG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKTtcblx0ICogY29uc3Qgc3RhdHVzID0gZmxpY2suZ2V0U3RhdHVzKCk7XG5cdCAqIGNvbnN0IGpzb25TdGF1cyA9IGZsaWNrLmdldFN0YXR1cyh0cnVlKTtcblx0ICpcblx0ICogY29uc29sZS5sb2coc3RhdHVzKTsgLy8ge3BhbmVsOiB7Li4ufSwgJGxpc3Q6IEFycmF5KDcpfVxuXHQgKiBjb25zb2xlLmxvZyhqc29uU3RhdHVzKTsgLy8gXCJ7XFxcInBhbmVsXFxcIjp7XFxcImluZGV4XFxcIjozLFxcXCJub1xcXCI6NixcXFwiY3VyckluZGV4XFxcIjozLFxcXCJjdXJyTm9cXFwiOjZ9LFxcXCIkbGlzdFxcXCI6W3tcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTU1LCA0OSwgMTM3KTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDMmbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn0se1xcXCJzdHlsZVxcXCI6XFxcImJhY2tncm91bmQtY29sb3I6IHJnYig1MSwgMTcyLCA5MSk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCA0Jmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9LHtcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE2LCAzOCwgMjQxKTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDUmbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn0se1xcXCJzdHlsZVxcXCI6XFxcImJhY2tncm91bmQtY29sb3I6IHJnYigxNDEsIDEzOSwgMjQpOyBwb3NpdGlvbjogYWJzb2x1dGU7ICBoZWlnaHQ6IDEwMCU7XFxcIixcXFwiY2xhc3NOYW1lXFxcIjpcXFwiZWctZmxpY2stcGFuZWxcXFwiLFxcXCJodG1sXFxcIjpcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Jmx0O3AmZ3Q7cGFuZWwgNiZsdDsvcCZndDtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXFwifSx7XFxcInN0eWxlXFxcIjpcXFwiYmFja2dyb3VuZC1jb2xvcjogcmdiKDIwNCwgMTAyLCAyMDQpOyBwb3NpdGlvbjogYWJzb2x1dGU7ICBoZWlnaHQ6IDEwMCU7XFxcIixcXFwiY2xhc3NOYW1lXFxcIjpcXFwiZWctZmxpY2stcGFuZWxcXFwiLFxcXCJodG1sXFxcIjpcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Jmx0O3AmZ3Q7cGFuZWwgMCZsdDsvcCZndDtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXFwifSx7XFxcInN0eWxlXFxcIjpcXFwiYmFja2dyb3VuZC1jb2xvcjogcmdiKDU0LCA1MywgMTU2KTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDEmbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn0se1xcXCJzdHlsZVxcXCI6XFxcImJhY2tncm91bmQtY29sb3I6IHJnYigxOTYsIDIxOCwgNzIpOyBwb3NpdGlvbjogYWJzb2x1dGU7ICBoZWlnaHQ6IDEwMCU7XFxcIixcXFwiY2xhc3NOYW1lXFxcIjpcXFwiZWctZmxpY2stcGFuZWxcXFwiLFxcXCJodG1sXFxcIjpcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Jmx0O3AmZ3Q7cGFuZWwgMiZsdDsvcCZndDtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXFwifV19XCJcblx0ICovXG5cdC8qKlxuXHQgKiBUaGUgcmV0dXJuIHZhbHVlIHNwZWNpZmljYXRpb24gb2YgdGhlIGdldFN0YXR1cyAoKSBtZXRob2QuXG5cdCAqIEBrbyBnZXRTdGF0dXMoKSDrqZTshJzrk5zsnZgg67CY7ZmY6rCSIOuqheyEuC5cblx0ICogQHR5cGVkZWYge09iamVjdH0gU3RhdHVzXG5cdCAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBwYW5lbCBjdXJyZW50IHBhbmVsIHBvc2l0aW9uPGtvPu2YhOyerCDtjKjrhJAg7JyE7LmYPC9rbz5cblx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IHBhbmVsLmluZGV4IFBoeXNpY2FsIGluZGV4IG51bWJlci48a28+66y866as7KCBIOyduOuNseyKpCDrsojtmLguPC9rbz5cblx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IHBhbmVsLmN1cnJJbmRleCBDdXJyZW50IHBoeXNpY2FsIGluZGV4IG51bWJlci48a28+7ZiE7J6sIOusvOumrOyggSDsnbjrjbHsiqQg67KI7Zi4Ljwva28+XG5cdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYW5lbC5ubyBMb2dpY2FsIGluZGV4IG51bWJlci48a28+64W866as7KCBIOyduOuNseyKpCDrsojtmLguPC9rbz5cblx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IHBhbmVsLmN1cnJObyBDdXJyZW50IGxvZ2ljYWwgaW5kZXggbnVtYmVyLjxrbz7tmITsnqwg64W866as7KCBIOyduOuNseyKpCDrsojtmLguPC9rbz5cblx0ICogQHByb3BlcnR5IHtBcnJheS48e3N0eWxlOiBTdHJpbmcsIGNsYXNzTmFtZTogU3RyaW5nLCBodG1sOiBTdHJpbmd9Pn0gJGxpc3QgcGFuZWwncyBodG1sPGtvPu2MqOuEkCDsoJXrs7Q8L2tvPlxuXHQgKiBAcHJvcGVydHkge09iamVjdH0gJGxpc3Qub2JqIEZvciBjb252ZW5pZW5jZSwgdGhlIGVsZW1lbnQgaXMgZGVub3RlZCBieSBvYmouPGtvPu2OuOydmOyDgSDsm5Dshozrpbwgb2Jq66GcIO2RnOq4sO2VqDwva28+XG5cdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSAkbGlzdC5vYmouc3R5bGUgVGhlIHZhbHVlIG9mIHRoZSBzdHlsZSBhdHRyaWJ1dGUgb2YgdGhlIHBhbmVsIGVsZW1lbnQuICgndHJhbnNmb3JtJywgJ2xlZnQnLCAndG9wJywgJ3dpbGwtY2hhbmdlJywgJ2JveC1zaXppbmcnLCAnd2lkdGgnIHN0eWxlIGhhcyBiZWVuIGRlbGV0ZWQuKTxrbz7tjKjrhJAg7JqU7IaM7J2YIHN0eWxlIOyGjeyEsSDqsJIuICgndHJhbnNmb3JtJywgJ2xlZnQnLCAndG9wJywgJ3dpbGwtY2hhbmdlJywgJ2JveC1zaXppbmcnLCAnd2lkdGgnIHN0eWxl7J2AIOyCreygnOuQqCk8L2tvPlxuXHQgKiBAcHJvcGVydHkge1N0cmluZ30gJGxpc3Qub2JqLmNsYXNzTmFtZSBUaGUgY2xhc3MgbmFtZSBvZiB0aGUgcGFuZWwgZWxlbWVudC48a28+7Yyo64SQIOyalOyGjOydmCBjbGFzcyDsnbTrpoQuPC9rbz5cblx0ICogQHByb3BlcnR5IHtTdHJpbmd9ICRsaXN0Lm9iai5odG1sIFRoZSBpbm5lckhUTUwgdmFsdWUgb2YgdGhlIHBhbmVsIGVsZW1lbnQuPGtvPu2MqOuEkCDsmpTshozsnZggaW5uZXJIVE1MIOqwki48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldEluZGV4XG5cdCAqL1xuXHRnZXRTdGF0dXMoc3RyaW5naWZ5KSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IHJ4U3R5bGUgPSAvKCg/Oi13ZWJraXQtKT90cmFuc2Zvcm18bGVmdHx0b3B8d2lsbC1jaGFuZ2V8Ym94LXNpemluZ3x3aWR0aCk6W147XSo7L2c7XG5cdFx0Y29uc3Qgc3RhdHVzID0ge1xuXHRcdFx0Ly8gY3VycmVudCBwYW5lbCBwb3NpdGlvblxuXHRcdFx0cGFuZWw6IHtcblx0XHRcdFx0aW5kZXg6IHBhbmVsLmluZGV4LFxuXHRcdFx0XHRubzogcGFuZWwubm8sXG5cdFx0XHRcdGN1cnJJbmRleDogcGFuZWwuY3VyckluZGV4LFxuXHRcdFx0XHRjdXJyTm86IHBhbmVsLmN1cnJOb1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gcGFuZWwncyBodG1sXG5cdFx0XHQkbGlzdDogcGFuZWwuJGxpc3QubWFwKHYgPT4gKHtcblx0XHRcdFx0c3R5bGU6IHYuc3R5bGUuY3NzVGV4dC5yZXBsYWNlKHJ4U3R5bGUsIFwiXCIpLnRyaW0oKSxcblx0XHRcdFx0Y2xhc3NOYW1lOiB2LmNsYXNzTmFtZSxcblx0XHRcdFx0aHRtbDogdi5pbm5lckhUTUxcblx0XHRcdH0pKVxuXHRcdH07XG5cblx0XHRyZXR1cm4gc3RyaW5naWZ5ID9cblx0XHRcdEpTT04uc3RyaW5naWZ5KHN0YXR1cykgOiBzdGF0dXM7XG5cdH1cblxuXHQvKipcblx0ICogUmVzdG9yZSB0byB0aGUgc3RhdGUgb2YgdGhlIGBzdGF0dXNWYWx1ZWAuXG5cdCAqIEBrbyBgc3RhdHVzVmFsdWVg7J2YIOyDge2DnOuhnCDrs7Xsm5DtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjc2V0U3RhdHVzXG5cdCAqIEBwYXJhbSB7U3RhdHVzfFN0cmluZ30gc3RhdHVzVmFsdWUgU3RhdHVzIHZhbHVlIHRvIGJlIHJlc3RvcmVkLiBZb3UgY2FuIHNwZWNpZnkgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgW2dldFN0YXR1cygpXXtAbGluayBlZy5GbGlja2luZyNnZXRTdGF0dXN9IG1ldGhvZC48a28+67O17JuQ7ZWgIOyDge2DnCDqsJIuIFtnZXRTdGF0dXMoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0U3RhdHVzfeuplOyEnOuTnCDrsJjtmZjqsJLsnYQg7KeA7KCV7ZWY66m0IOuQnOuLpC48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldFN0YXR1c1xuXHQgKiBAZXhhbXBsZVxuXHQgKiBjb25zdCBmbGljayA9IG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKTtcblx0ICogY29uc3Qgc3RhdHVzID0gZmxpY2suZ2V0U3RhdHVzKCk7XG5cdCAqXG5cdCAqIC8vIE1vdmUgdG8gYXJiaXRyYXJ5IHBhbmVsLlxuXHQgKiAvLyDsnoTsnZgg7Yyo64SQ66GcIOydtOuPmVxuXHQgKiBmbGljay5tb3ZlVG8oMik7XG5cdCAqXG5cdCAqIC8vIFJlc3RvcmUgdG8gc3RhdHVzLlxuXHQgKiAvLyBzdGF0dXMg7IOB7YOc66GcIOuzteybkFxuXHQgKiBmbGljay5zZXRTdGF0dXMoc3RhdHVzKTtcblx0ICovXG5cdHNldFN0YXR1cyhzdGF0dXNWYWx1ZSkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBpc0FkYXB0aXZlSGVpZ2h0ID0gdGhpcy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0O1xuXHRcdGNvbnN0IHN0YXR1cyA9IHR5cGVvZiBzdGF0dXNWYWx1ZSA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRKU09OLnBhcnNlKHN0YXR1c1ZhbHVlKSA6IHN0YXR1c1ZhbHVlO1xuXG5cdFx0aWYgKHN0YXR1cykge1xuXHRcdFx0Zm9yIChjb25zdCB4IGluIHN0YXR1cy5wYW5lbCkge1xuXHRcdFx0XHR4IGluIHBhbmVsICYmIChwYW5lbFt4XSA9IHN0YXR1cy5wYW5lbFt4XSk7XG5cdFx0XHR9XG5cblx0XHRcdHBhbmVsLiRsaXN0LmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IHN0YXR1cy4kbGlzdFtpXTtcblx0XHRcdFx0Y29uc3Qgc3R5bGUgPSBkYXRhLnN0eWxlO1xuXHRcdFx0XHRjb25zdCBjbGFzc05hbWUgPSBkYXRhLmNsYXNzTmFtZTtcblx0XHRcdFx0Y29uc3QgaHRtbCA9IGRhdGEuaHRtbDtcblxuXHRcdFx0XHRzdHlsZSAmJiAodi5zdHlsZS5jc3NUZXh0ICs9IHN0eWxlKTtcblx0XHRcdFx0Y2xhc3NOYW1lICYmICh2LmNsYXNzTmFtZSA9IGNsYXNzTmFtZSk7XG5cdFx0XHRcdGh0bWwgJiYgKHYuaW5uZXJIVE1MID0gaHRtbCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aXNBZGFwdGl2ZUhlaWdodCAmJiB0aGlzLl9zZXRBZGFwdGl2ZUhlaWdodCgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSByZWZlcmVuY2UgZWxlbWVudCBhbmQgaXRzIGNoaWxkcmVuIHRvIHRoZSBzdGF0ZSB0aGV5IHdlcmUgaW4gYmVmb3JlIHRoZSBpbnN0YW5jZSB3YXMgY3JlYXRlZC4gUmVtb3ZlIGFsbCBhdHRhY2hlZCBldmVudCBoYW5kbGVycy4gU3BlY2lmeSBgbnVsbGAgZm9yIGFsbCBhdHRyaWJ1dGVzIG9mIHRoZSBpbnN0YW5jZSAoaW5jbHVkaW5nIGluaGVyaXRlZCBhdHRyaWJ1dGVzKS48YnI+SWYgcGx1Z2luIGlzbid0IGVtcHR5LCBhbHNvIHJlc2V0IGFsbCBwbHVnaW5zIHJlZ2lzdGVyZWQuXG5cdCAqIEBrbyDquLDspIAg7JqU7IaM7JmAIOq3uCDtlZjsnIQg7JqU7IaM66W8IOyduOyKpO2EtOyKpCDsg53shLHsoITsnZgg7IOB7YOc66GcIOuQmOuPjOumsOuLpC4g67aA7LCp65CcIOuqqOuToCDsnbTrsqTtirgg7ZW465Ok65+s66W8IO2DiOqxsO2VnOuLpC4g7J247Iqk7YS07Iqk7J2YIOuqqOuToCDsho3shLEo7IOB7IaN67Cb7J2AIOyGjeyEse2PrO2VqCnsl5AgYG51bGxg7J2EIOyngOygle2VnOuLpC48YnI+7ZSM65+s6re47J247J20IOu5hOyWtOyeiOyngCDslYrri6TrqbQsIO2UjOufrOq3uOyduOuPhCDrqqjrkZAg66as7IWL7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2Rlc3Ryb3lcblx0ICogQGV4YW1wbGVcblx0ICogY29uc3QgZmxpY2sgPSBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG5cdCAqIGZsaWNrLmRlc3Ryb3koKTtcblx0ICogY29uc29sZS5sb2coZmxpY2subW92ZVRvKTsgLy8gbnVsbFxuXHQgKi9cblx0ZGVzdHJveSgpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBvcmlnUGFuZWxTdHlsZSA9IGNvbmYub3JpZ1BhbmVsU3R5bGU7XG5cdFx0Y29uc3Qgd3JhcHBlciA9IG9yaWdQYW5lbFN0eWxlLndyYXBwZXI7XG5cdFx0Y29uc3QgY29udGFpbmVyID0gb3JpZ1BhbmVsU3R5bGUuY29udGFpbmVyO1xuXHRcdGNvbnN0IGxpc3QgPSBvcmlnUGFuZWxTdHlsZS5saXN0O1xuXG5cdFx0Ly8gdW5iaW5kIGV2ZW50c1xuXHRcdHRoaXMuX2JpbmRFdmVudHMoZmFsc2UpO1xuXHRcdHRoaXMub2ZmKCk7XG5cblx0XHQvLyBkZXN0cm95IGVnLkF4ZXMgaW5zdGFuY2Vcblx0XHR0aGlzLl9heGVzSW5zdC5kZXN0cm95KCk7XG5cdFx0dGhpcy5fcGFuSW5wdXQuZGVzdHJveSgpO1xuXG5cdFx0Ly8gdW53cmFwIGNvbnRhaW5lciBlbGVtZW50IGFuZCByZXN0b3JlIG9yaWdpbmFsIGlubGluZSBzdHlsZVxuXHRcdC8vIHJlc3RvcmUgd3JhcHBlciBzdHlsZVxuXHRcdGNvbnN0ICR3cmFwcGVyID0gdGhpcy4kd3JhcHBlcjtcblxuXHRcdCR3cmFwcGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHdyYXBwZXIuY2xhc3NOYW1lKTtcblx0XHQkd3JhcHBlclt3cmFwcGVyLnN0eWxlID8gXCJzZXRBdHRyaWJ1dGVcIiA6IFwicmVtb3ZlQXR0cmlidXRlXCJdKFwic3R5bGVcIiwgd3JhcHBlci5zdHlsZSk7XG5cblx0XHQvLyByZXN0b3JlIGNvbnRhaW5lciBzdHlsZVxuXHRcdGNvbnN0ICRjb250YWluZXIgPSB0aGlzLiRjb250YWluZXI7XG5cdFx0Y29uc3QgJGNoaWxkcmVuID0gW11cblx0XHRcdC5zbGljZS5jYWxsKCRjb250YWluZXIuY2hpbGRyZW4pO1xuXG5cdFx0aWYgKG9yaWdQYW5lbFN0eWxlLmNvbnRhaW5lci5jbGFzc05hbWUpIHtcblx0XHRcdCRjb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29udGFpbmVyLmNsYXNzTmFtZSk7XG5cdFx0XHQkY29udGFpbmVyW2NvbnRhaW5lci5zdHlsZSA/IFwic2V0QXR0cmlidXRlXCIgOiBcInJlbW92ZUF0dHJpYnV0ZVwiXShcInN0eWxlXCIsIGNvbnRhaW5lci5zdHlsZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRjaGlsZHJlbi5mb3JFYWNoKHYgPT4gJHdyYXBwZXIuYXBwZW5kQ2hpbGQodikpO1xuXHRcdFx0JGNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRjb250YWluZXIpO1xuXHRcdH1cblxuXHRcdGZvciAobGV0IGkgPSAwLCAkZWw7ICgkZWwgPSAkY2hpbGRyZW5baV0pOyBpKyspIHtcblx0XHRcdGlmIChpID4gbGlzdC5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdCRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRlbCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBjbGFzc05hbWUgPSBsaXN0W2ldLmNsYXNzTmFtZTtcblx0XHRcdFx0Y29uc3Qgc3R5bGUgPSBsaXN0W2ldLnN0eWxlO1xuXG5cdFx0XHRcdCRlbFtjbGFzc05hbWUgPyBcInNldEF0dHJpYnV0ZVwiIDogXCJyZW1vdmVBdHRyaWJ1dGVcIl0oXCJjbGFzc1wiLCBjbGFzc05hbWUpO1xuXHRcdFx0XHQkZWxbc3R5bGUgPyBcInNldEF0dHJpYnV0ZVwiIDogXCJyZW1vdmVBdHRyaWJ1dGVcIl0oXCJzdHlsZVwiLCBzdHlsZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gcmVsZWFzZSBwbHVnaW4gcmVzb3VyY2VzXG5cdFx0dGhpcy5wbHVnaW5zLmZvckVhY2godiA9PiB7XG5cdFx0XHR0aGlzLnBsdWdpbnNbdl0uJGNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG5cdFx0fSk7XG5cblx0XHQvLyByZWxlYXNlIHJlc291cmNlc1xuXHRcdGZvciAoY29uc3QgeCBpbiB0aGlzKSB7XG5cdFx0XHR0aGlzW3hdID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVnaXN0ZXIgcGx1Z2luIHRvIGJlIHVzZWQuXG5cdCAqIEBrbyDsgqzsmqnrkKAg7ZSM65+s6re47J247J2EIOuTseuhne2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNwbHVnaW5cblx0ICogQGV4YW1wbGVcblx0ICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpLnBsdWdpbihbXG5cdCAqICAgICBuZXcgZWcuRmxpY2tpbmcucGx1Z2luLk9wYWNpdHlFZmZlY3QoXCJzcGFuXCIpLFxuXHQgKiAgICAgLi4uXG5cdCAqIF0pO1xuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRwbHVnaW4obGlzdCkge1xuXHRcdGxpc3QuZm9yRWFjaChwID0+IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogQSBsaXN0IG9mIHBsdWdpbnMgdXNlZC5cblx0XHRcdCAqIEBrbyDsgqzsmqnrkJwg7ZSM65+s6re47J24IOuqqeuhnVxuXHRcdFx0ICogQHByb3BlcnR5IHtBcnJheX0gcGx1Z2lucyBBbiBhcnJheSBvZiBwbHVnaW4gaW5zdGFuY2VzIDxrbz7tlIzrn6zqt7jsnbgg7J247Iqk7YS07IqkIOuwsOyXtDwva28+XG5cdFx0XHQgKiBAbmFtZSBwbHVnaW5zXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAaW5zdGFuY2Vcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiBjb25zdCBmbGljayA9IG5ldyBlZy5GbGlja2luZyggLi4uICkucGx1Z2luKFsgLi4uIF0pO1xuXHRcdFx0ICpcblx0XHRcdCAqIGZsaWNrLnBsdWdpbnM7IC8vIFsgLi4uIF0gLSBhcnJheSBvZiBwbHVnaW5zXG5cdFx0XHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0XHRcdCAqL1xuXHRcdFx0aWYgKHRoaXMucGx1Z2lucy5maWx0ZXIodiA9PiB2LmNvbnN0cnVjdG9yID09PSBwLmNvbnN0cnVjdG9yKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0dGhpcy5wbHVnaW5zLnB1c2gocC4kY29tcG9uZW50V2lsbE1vdW50KHRoaXMpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbGxlY3Rpb24gb2YgdXRpbGl0aWVzIHVzZWQgaW50ZXJuYWxseVxuXHQgKiBAa28g64K067aA7JeQ7IScIOyCrOyaqeuQmOuKlCDsnKDti7jrpqzti7Ag66qo7J2MXG5cdCAqIEBuYW1lIHV0aWxzXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0c3RhdGljIHV0aWxzID0gdXRpbHM7XG5cdC8qKlxuXHQgKiBWZXJzaW9uIGluZm8gc3RyaW5nXG5cdCAqIEBrbyDrsoTsoITsoJXrs7Qg66y47J6Q7Je0XG5cdCAqIEBuYW1lIFZFUlNJT05cblx0ICogQHN0YXRpY1xuXHQgKiBAdHlwZSB7U3RyaW5nfVxuXHQgKiBAZXhhbXBsZVxuXHQgKiBlZy5GbGlja2luZy5WRVJTSU9OOyAgLy8gZXgpIDIuMi4wXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKi9cblx0c3RhdGljIFZFUlNJT04gPSBcIjIuNC4yLXNuYXBzaG90XCI7XG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSB1c2VkIGludGVybmFsbHlcblx0ICogQGtvIOuCtOu2gOyXkOyEnCDsgqzsmqnrkJjripQg7IOB7IiYIOqwklxuXHQgKiBAbmFtZSBjb25zdHNcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEBwcml2YXRlXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRzdGF0aWMgY29uc3RzID0ge1xuXHRcdEVWRU5UUyxcblx0XHRUUkFOU0ZPUk0sXG5cdFx0U1VQUE9SVF9XSUxMQ0hBTkdFLFxuXHRcdElTX0FORFJPSUQyXG5cdH07XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciBub25lIGRpcmVjdGlvbi5cblx0ICogQGtvIG5vbmUg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fTk9ORVxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgMVxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9OT05FID0gQXhlcy5ESVJFQ1RJT05fTk9ORTtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIGxlZnQgZGlyZWN0aW9uLlxuXHQgKiBAa28gbGVmdCDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9MRUZUXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCAyXG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX0xFRlQgPSBBeGVzLkRJUkVDVElPTl9MRUZUO1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3IgcmlnaHQgZGlyZWN0aW9uLlxuXHQgKiBAa28gcmlnaHQg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fUklHSFRcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDRcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fUklHSFQgPSBBeGVzLkRJUkVDVElPTl9SSUdIVDtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIHVwIGRpcmVjdGlvbi5cblx0ICogQGtvIHVwIOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX1VQXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCA4XG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX1VQID0gQXhlcy5ESVJFQ1RJT05fVVA7XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciBkb3duIGRpcmVjdGlvbi5cblx0ICogQGtvIGRvd24g67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fRE9XTlxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgMTZcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fRE9XTiA9IEF4ZXMuRElSRUNUSU9OX0RPV047XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciBob3Jpem9udGFsIGRpcmVjdGlvbi5cblx0ICogQGtvIGhvcml6b250YWwg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fSE9SSVpPTlRBTFxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgNlxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9IT1JJWk9OVEFMID0gQXhlcy5ESVJFQ1RJT05fSE9SSVpPTlRBTDtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIHZlcnRpY2FsIGRpcmVjdGlvbi5cblx0ICogQGtvIHZlcnRpY2FsIOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX1ZFUlRJQ0FMXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCAyNFxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9WRVJUSUNBTCA9IEF4ZXMuRElSRUNUSU9OX1ZFUlRJQ0FMO1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3IgYWxsIGRpcmVjdGlvbi5cblx0ICogQGtvIGFsbCDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9BTExcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDMwXG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX0FMTCA9IEF4ZXMuRElSRUNUSU9OX0FMTDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=