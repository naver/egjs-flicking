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
      this._moveTo(noValue, duration);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZy5GbGlja2luZy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL2NvbnN0cy5qcyIsIndlYnBhY2s6Ly9lZy5GbGlja2luZy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZWcuRmxpY2tpbmcvLi9zcmMvZXZlbnRIYW5kbGVyLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL0ZsaWNraW5nLmpzIl0sIm5hbWVzIjpbIndpbiIsIndpbmRvdyIsImRvY3VtZW50IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidXRpbHMiLCIkIiwicGFyYW0iLCJlbCIsIm1hdGNoIiwiY3JlYXRlRWxlbWVudCIsImxlbmd0aCIsInNwbGl0IiwiZm9yRWFjaCIsInYiLCJhdHRyIiwic2V0QXR0cmlidXRlIiwidHJpbSIsInJlcGxhY2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwibm9kZU5hbWUiLCJub2RlVHlwZSIsInRvQXJyYXkiLCJzbGljZSIsImNhbGwiLCJpc0FycmF5IiwiYXJyIiwiY29uc3RydWN0b3IiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwiZXh0ZW5kIiwidGFyZ2V0Iiwib2JqZWN0TiIsInNvdXJjZSIsInNoaWZ0IiwiT2JqZWN0Iiwia2V5cyIsImtleSIsInZhbHVlIiwiY29uY2F0IiwiY3NzIiwic3R5bGUiLCJnZXRBc051bWJlciIsInRlc3QiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0TnVtVmFsdWUiLCJhcHBseVN0eWxlIiwiY2xhc3NMaXN0IiwiY2xhc3NOYW1lIiwiYWRkIiwiaXNBZGRQYXJhbSIsInJlcyIsImluZGV4T2YiLCJSZWdFeHAiLCJ2YWwiLCJkZWZWYWwiLCJudW0iLCJpc05hTiIsInBhcnNlRmxvYXQiLCJnZXRVbml0VmFsdWUiLCJyeCIsIlN0cmluZyIsImdldE91dGVyIiwidHlwZSIsInBhZGRpbmdNYXJnaW4iLCJkaXIiLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsInRyYW5zbGF0ZSIsIngiLCJ5IiwiaXNIQSIsImhhc0NsaWNrQnVnIiwidWEiLCJyZXN1bHQiLCJNaXhpbkJ1aWxkZXIiLCJzdXBlcmNsYXNzIiwibWl4aW5zIiwicmVkdWNlIiwiYyIsIm0iLCJNaXhpbiIsIkVWRU5UUyIsImJlZm9yZUZsaWNrU3RhcnQiLCJiZWZvcmVSZXN0b3JlIiwiZmxpY2siLCJmbGlja0VuZCIsInJlc3RvcmUiLCJUUkFOU0ZPUk0iLCJuYW1lIiwic3VwcG9ydCIsImRvY3VtZW50RWxlbWVudCIsIlNVUFBPUlRfV0lMTENIQU5HRSIsIkNTUyIsInN1cHBvcnRzIiwiSVNfQU5EUk9JRDIiLCJEQVRBX0hFSUdIVCIsIkNPTkZJRyIsInBhbmVsIiwiJGxpc3QiLCJpbmRleCIsIm5vIiwiY3VyckluZGV4IiwiY3Vyck5vIiwic2l6ZSIsImNvdW50Iiwib3JpZ0NvdW50IiwiY2hhbmdlZCIsImFuaW1hdGluZyIsIm1pbkNvdW50IiwidG91Y2giLCJob2xkUG9zIiwiZGVzdFBvcyIsImRpc3RhbmNlIiwiZGlyZWN0aW9uIiwibGFzdFBvcyIsImhvbGRpbmciLCJpc1RydXN0ZWQiLCJjdXN0b21FdmVudCIsInJlc3RvcmVDYWxsIiwiZGlyRGF0YSIsImluZGV4VG9Nb3ZlIiwiJGR1bW15QW5jaG9yIiwiT1BUSU9OUyIsImh3QWNjZWxlcmFibGUiLCJwcmVmaXgiLCJkZWNlbGVyYXRpb24iLCJob3Jpem9udGFsIiwiY2lyY3VsYXIiLCJwcmV2aWV3UGFkZGluZyIsImJvdW5jZSIsInRocmVzaG9sZCIsImR1cmF0aW9uIiwicGFuZWxFZmZlY3QiLCJNYXRoIiwicG93IiwiZGVmYXVsdEluZGV4IiwiaW5wdXRUeXBlIiwidGhyZXNob2xkQW5nbGUiLCJhZGFwdGl2ZUhlaWdodCIsInpJbmRleCIsInVzZVRyYW5zbGF0ZSIsIl9ob2xkSGFuZGxlciIsImUiLCJjb25mIiwiX2NvbmYiLCJwb3MiLCJfYWRqdXN0Q29udGFpbmVyQ3NzIiwiX2NoYW5nZUhhbmRsZXIiLCJldmVudFJlcyIsIm1vdmVkUHgiLCJfc2V0UG9pbnRlckV2ZW50cyIsImlucHV0RXZlbnQiLCJvcHRpb25zIiwiYWJzIiwiX3RyaWdnZXJFdmVudCIsIl9zZXRUcmFuc2xhdGUiLCJfcmVsZWFzZUhhbmRsZXIiLCJwYW5lbFNpemUiLCJpc1BsdXNNb3ZlIiwiZGVwYVBvcyIsIm1vdmVUbyIsIl9pc01vdmFibGUiLCJfdHJpZ2dlckJlZm9yZVJlc3RvcmUiLCJzZXRUbyIsIl9hbmltYXRpb25TdGFydEhhbmRsZXIiLCJpc0Zyb21JbnB1dCIsIl9zZXRQaGFzZVZhbHVlIiwic3RvcCIsIl9hbmltYXRpb25FbmRIYW5kbGVyIiwiX3RyaWdnZXJSZXN0b3JlIiwiRmxpY2tpbmciLCJlbGVtZW50IiwiX3ByZWZpeCIsIiR3cmFwcGVyIiwicGx1Z2lucyIsIiRjaGlsZHJlbiIsImNoaWxkcmVuIiwiRXJyb3IiLCJfc2V0T3B0aW9ucyIsIl9zZXRDb25maWciLCJfYnVpbGQiLCJfYmluZEV2ZW50cyIsIl9hcHBseVBhbmVsc0NzcyIsIl9hcnJhbmdlUGFuZWxzIiwiX3NldEhpbnQiLCJfc2V0QWRhcHRpdmVIZWlnaHQiLCJhcnJWYWwiLCJwYWRkaW5nIiwiJG5vZGVzIiwiJGNvbnRhaW5lciIsIm9yaWdQYW5lbFN0eWxlIiwid3JhcHBlciIsImdldEF0dHJpYnV0ZSIsImNvbnRhaW5lciIsImxpc3QiLCJtYXAiLCJ1c2VMYXllckhhY2siLCJldmVudFByZWZpeCIsInB1c2giLCJwYW5lbENvdW50IiwiX3NldFBhZGRpbmciLCJzaXplVmFsdWUiLCJfZ2V0RGF0YUJ5RGlyZWN0aW9uIiwiY3NzVmFsdWUiLCJwb3NpdGlvbiIsIndpZHRoIiwiaGVpZ2h0IiwidG9wIiwiJHBhcmVudCIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsImJveFNpemluZyIsImxlZnQiLCJfYWRkQ2xvbmVQYW5lbHMiLCJfYXhlc0luc3QiLCJyYW5nZSIsImVhc2luZyIsImludGVycnVwdGFibGUiLCJfc2V0RGVmYXVsdFBhbmVsIiwiYnVpbGQiLCJwYWRkaW5nU3VtIiwiYSIsInJldmVyc2UiLCJqb2luIiwib3ZlcmZsb3ciLCJwYWRkaW5nVHlwZSIsIndyYXBwZXJTaXplIiwibWF4IiwiY2xvbmVDb3VudCIsImNsb25lTm9kZXMiLCJjbG9uZU5vZGUiLCJfbW92ZVBhbmVsUG9zaXRpb24iLCJhcHBlbmQiLCJsaXN0VG9Nb3ZlIiwic3BsaWNlIiwibGFzdEluZGV4IiwiY29vcmRzIiwiYmFzZUluZGV4IiwiX2dldEJhc2VQb3NpdGlvbkluZGV4IiwiX3NldFBhbmVsTm8iLCJfc2V0QXhlcyIsInNvcnQiLCJfYXJyYW5nZVBhbmVsUG9zaXRpb24iLCJfYXBwbHlQYW5lbHNQb3MiLCJiaW5kIiwiX3NldE1vdmVTdHlsZSIsIiRlbCIsImNvb3Jkc1ZhbHVlIiwidHJhbnNmb3JtIiwiJGVsZW1lbnQiLCJkdW1teUFuY2hvckNsYXNzTmFtZSIsImkiLCJwaGFzZSIsInRvVmFsdWUiLCJwYWRkaW5nVG9wIiwidG8iLCJfZ2V0Q29vcmRzVmFsdWUiLCJmb2N1cyIsIm1ldGhvZCIsIndpbGxDaGFuZ2UiLCJkYXRhIiwibmV4dCIsImZsb29yIiwiYXhlc0luc3QiLCJfcGFuSW5wdXQiLCJzY2FsZSIsIm9uIiwiaG9sZCIsImNoYW5nZSIsInJlbGVhc2UiLCJhbmltYXRpb25TdGFydCIsImFuaW1hdGlvbkVuZCIsImNvbm5lY3QiLCJkaXNhYmxlSW5wdXQiLCJvZmYiLCIkcGFuZWwiLCJESVJFQ1RJT05fTEVGVCIsIkRJUkVDVElPTl9SSUdIVCIsIiRmaXJzdCIsInF1ZXJ5U2VsZWN0b3IiLCJfZ2V0TnVtQnlEaXJlY3Rpb24iLCJfcmV2ZXJ0UGFuZWxObyIsInBvaW50ZXIiLCJwb2ludGVyRXZlbnRzIiwicHJldmVudFN5c3RlbUV2ZW50IiwiaXNNb3ZhYmxlIiwiY3VyclBvcyIsImF4aXMiLCJnZXQiLCJ0cmlnZ2VyIiwiZXZlbnRUeXBlIiwiX2dldEVsZW1lbnQiLCJwaHlzaWNhbCIsInRvdGFsIiwiY3VycmVudEluZGV4IiwiX3NldFZhbHVlVG9Nb3ZlIiwiZ2V0SW5kZXgiLCJnZXRFbGVtZW50IiwiZ2V0TmV4dEVsZW1lbnQiLCJnZXROZXh0SW5kZXgiLCJnZXRBbGxFbGVtZW50cyIsImdldFByZXZFbGVtZW50IiwiZ2V0UHJldkluZGV4IiwiaXNQbGF5aW5nIiwiX21vdmVQYW5lbEJ5UGhhc2UiLCJkdXJhdGlvblZhbHVlIiwiX21vdmVUbyIsInByZXYiLCJub1ZhbHVlIiwiaXNQb3NpdGl2ZSIsInJlc2l6ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImVuYWJsZUlucHV0IiwiZW5hYmxlIiwiZGlzYWJsZSIsImdldFN0YXR1cyIsInN0cmluZ2lmeSIsInJ4U3R5bGUiLCJzdGF0dXMiLCJjc3NUZXh0IiwiaHRtbCIsImlubmVySFRNTCIsIkpTT04iLCJzZXRTdGF0dXMiLCJzdGF0dXNWYWx1ZSIsImlzQWRhcHRpdmVIZWlnaHQiLCJwYXJzZSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCIsIiRjb21wb25lbnRXaWxsVW5tb3VudCIsInBsdWdpbiIsInAiLCJmaWx0ZXIiLCIkY29tcG9uZW50V2lsbE1vdW50IiwiVkVSU0lPTiIsImNvbnN0cyIsIkRJUkVDVElPTl9OT05FIiwiRElSRUNUSU9OX1VQIiwiRElSRUNUSU9OX0RPV04iLCJESVJFQ1RJT05fSE9SSVpPTlRBTCIsIkRJUkVDVElPTl9WRVJUSUNBTCIsIkRJUkVDVElPTl9BTEwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFJQTtBQUVBLElBQUlBLEdBQUo7O0FBRUEsSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2xDO0FBQ0FELEtBQUcsR0FBRztBQUNMRSxZQUFRLEVBQUUsRUFETDtBQUVMQyxhQUFTLEVBQUU7QUFDVkMsZUFBUyxFQUFFO0FBREQ7QUFGTixHQUFOO0FBTUEsQ0FSRCxNQVFPO0FBQ05KLEtBQUcsR0FBR0MsTUFBTjtBQUNBO0FBQ0Q7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LDJCQUFJLENBQUNBLGtCO0FBdnNEYjFLLFUsQ0FtdERiMkssYSxHQUFnQiwyQkFBSSxDQUFDQSxhO1NBbnREUjNLLFEiLCJmaWxlIjoiMC4wODM4YjE4ODZiZmFmZjMwMDg4ZC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblxubGV0IHdpbjtcblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0Ly8gd2luZG93IGlzIHVuZGVmaW5lZCBpbiBub2RlLmpzXG5cdHdpbiA9IHtcblx0XHRkb2N1bWVudDoge30sXG5cdFx0bmF2aWdhdG9yOiB7XG5cdFx0XHR1c2VyQWdlbnQ6IFwiXCJcblx0XHR9XG5cdH07XG59IGVsc2Uge1xuXHR3aW4gPSB3aW5kb3c7XG59XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby1uZXN0ZWQtdGVybmFyeSAqL1xuXG5jb25zdCBkb2N1bWVudCA9IHdpbi5kb2N1bWVudDtcblxuZXhwb3J0IHtcblx0d2luIGFzIHdpbmRvdyxcblx0ZG9jdW1lbnRcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBOQVZFUiBDb3JwLlxuICogZWdqcyBwcm9qZWN0cyBhcmUgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7d2luZG93LCBkb2N1bWVudH0gZnJvbSBcIi4vYnJvd3NlclwiO1xuXG5jb25zdCB1dGlscyA9IHtcblx0LyoqXG5cdCAqIFNlbGVjdCBvciBjcmVhdGUgZWxlbWVudFxuXHQgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gcGFyYW1cblx0ICogIHdoZW4gc3RyaW5nIGdpdmVuIGlzIGFzIEhUTUwgdGFnLCB0aGVuIGNyZWF0ZSBlbGVtZW50XG5cdCAqICBvdGhlcndpc2UgaXQgcmV0dXJucyBzZWxlY3RlZCBlbGVtZW50c1xuXHQgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG5cdCAqL1xuXHQkKHBhcmFtKSB7XG5cdFx0bGV0IGVsID0gbnVsbDtcblxuXHRcdGlmICh0eXBlb2YgcGFyYW0gPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdC8vIGNoZWNrIGlmIHN0cmluZyBpcyBIVE1MIHRhZyBmb3JtYXRcblx0XHRcdGNvbnN0IG1hdGNoID0gcGFyYW0ubWF0Y2goL148KFthLXpdKylcXHMqKFtePl0qKT4vKTtcblxuXHRcdFx0Ly8gY3JlYXRpbmcgZWxlbWVudFxuXHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChtYXRjaFsxXSk7XG5cblx0XHRcdFx0Ly8gYXR0cmlidXRlc1xuXHRcdFx0XHRtYXRjaC5sZW5ndGggPT09IDMgJiZcblx0XHRcdFx0XHRtYXRjaFsyXS5zcGxpdChcIiBcIikuZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGF0dHIgPSB2LnNwbGl0KFwiPVwiKTtcblxuXHRcdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKGF0dHJbMF0sIGF0dHJbMV0udHJpbSgpLnJlcGxhY2UoLyheW1wiJ118W1wiJ10kKS9nLCBcIlwiKSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW0pO1xuXG5cdFx0XHRcdGlmICghZWwubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZWwgPSBudWxsO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVsLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdGVsID0gZWxbMF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHBhcmFtLm5vZGVOYW1lICYmIHBhcmFtLm5vZGVUeXBlID09PSAxKSB7XG5cdFx0XHRlbCA9IHBhcmFtO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbDtcblx0fSxcblxuXHQvKipcblx0ICogQ29udmVydHMgdG8gYXJyYXlcblx0ICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbnxIVE1MRWxlbWVudH0gZWxcblx0ICogQHJldHVybnMge0FycmF5fVxuXHQgKi9cblx0dG9BcnJheShlbCkge1xuXHRcdHJldHVybiBbXS5zbGljZS5jYWxsKGVsKTtcblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgaWYgaXMgYXJyYXlcblx0ICogQHBhcmFtIGFyclxuXHQgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICovXG5cdGlzQXJyYXkoYXJyKSB7XG5cdFx0cmV0dXJuIGFyciAmJiBhcnIuY29uc3RydWN0b3IgPT09IEFycmF5O1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDaGVjayBpZiBpcyBvYmplY3Rcblx0ICogQHBhcmFtIHtPYmplY3R9IG9ialxuXHQgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICovXG5cdGlzT2JqZWN0KG9iaikge1xuXHRcdHJldHVybiBvYmogJiYgIW9iai5ub2RlVHlwZSAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmICF0aGlzLmlzQXJyYXkob2JqKTtcblx0fSxcblxuXHQvKipcblx0ICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcblx0ICogQHBhcmFtIHtPYmplY3R9IG9iamVjdE5cblx0ICogQHJldHVybnMge09iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3Rcblx0ICogQGV4YW1wbGVcblx0ICogIHZhciB0YXJnZXQgPSB7IGE6IDEgfTtcblx0ICogIHV0aWxzLmV4dGVuZCh0YXJnZXQsIHsgYjogMiwgYzogMyB9KTtcblx0ICogIHRhcmdldDsgIC8vIHsgYTogMSwgYjogMiwgYzogMyB9O1xuXHQgKi9cblx0ZXh0ZW5kKHRhcmdldCwgLi4ub2JqZWN0Tikge1xuXHRcdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xuXHRcdFx0cmV0dXJuIHRhcmdldDtcblx0XHR9XG5cblx0XHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XG5cblx0XHRpZiAodGhpcy5pc09iamVjdCh0YXJnZXQpICYmIHRoaXMuaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlW2tleV07XG5cblx0XHRcdFx0aWYgKHRoaXMuaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRcdFx0IXRhcmdldFtrZXldICYmICh0YXJnZXRba2V5XSA9IHt9KTtcblxuXHRcdFx0XHRcdHRhcmdldFtrZXldID0gdGhpcy5leHRlbmQodGFyZ2V0W2tleV0sIHZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0YXJnZXRba2V5XSA9IHRoaXMuaXNBcnJheSh2YWx1ZSkgP1xuXHRcdFx0XHRcdFx0dmFsdWUuY29uY2F0KCkgOiB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZXh0ZW5kKHRhcmdldCwgLi4ub2JqZWN0Tik7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBvciBzZXQgdGhlIHN0eWxlIHZhbHVlIG9yIGFwcGx5XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8QXJyYXl9IGVsXG5cdCAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gc3R5bGVcblx0ICogIFN0cmluZzogcmV0dXJuIHN0eWxlIHByb3BlcnR5IHZhbHVlXG5cdCAqICBPYmplY3Q6IHNldCBzdHlsZSB2YWx1ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGdldEFzTnVtYmVyIEdldCB0aGUgdmFsdWUgYXMgbnVtYmVyXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd8SFRNTEVsZW1lbnR9XG5cdCAqL1xuXHRjc3MoZWwsIHN0eWxlLCBnZXRBc051bWJlcikge1xuXHRcdGlmICh0eXBlb2Yoc3R5bGUpID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRsZXQgdmFsdWUgPSBlbC5zdHlsZVtzdHlsZV07XG5cblx0XHRcdGlmICghdmFsdWUgfHwgdmFsdWUgPT09IFwiYXV0b1wiIHx8ICgvXFxkLy50ZXN0KHZhbHVlKSAmJiAhL1xcZChweCk/JC8udGVzdCh2YWx1ZSkpKSB7XG5cdFx0XHRcdHZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpW3N0eWxlXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGdldEFzTnVtYmVyID8gdGhpcy5nZXROdW1WYWx1ZSh2YWx1ZSkgOiB2YWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgYXBwbHlTdHlsZSA9ICh0YXJnZXQsIHNvdXJjZSkgPT5cblx0XHRcdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0XHRcdHRhcmdldFt2XSA9IHNvdXJjZVt2XTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuaXNBcnJheShlbCkgP1xuXHRcdFx0XHRlbC5mb3JFYWNoKHYgPT4gYXBwbHlTdHlsZSh2LnN0eWxlLCBzdHlsZSkpIDpcblx0XHRcdFx0YXBwbHlTdHlsZShlbC5zdHlsZSwgc3R5bGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbDtcblx0fSxcblxuXHQvKipcblx0ICogY2xhc3NMaXN0XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIHRhcmdldCBET00gZWxlbWVudFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIGNsYXNzIG5hbWUgc3RyaW5nIHRvIGJlIGhhbmRsZWRcblx0ICogQHBhcmFtIHtCb29sZWFufSBhZGQgQWRkIG9yIHJlbW92ZSBjbGFzcyAtIHRydWU6IEFkZCwgZmFsc2U6IFJlbW92ZVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufSBpZiBhZGQgcGFyYW0gaXMgbWlzc2luZywgdGhlbiByZXR1cm4gZXhpc3RlbmNlIG9mIGNsYXNzIG5hbWVcblx0ICovXG5cdGNsYXNzTGlzdChlbCwgY2xhc3NOYW1lLCBhZGQpIHtcblx0XHRjb25zdCBpc0FkZFBhcmFtID0gdHlwZW9mIGFkZCA9PT0gXCJib29sZWFuXCI7XG5cdFx0bGV0IHJlcztcblxuXHRcdGlmIChlbC5jbGFzc0xpc3QpIHtcblx0XHRcdHJlcyA9IGVsLmNsYXNzTGlzdFtcblx0XHRcdFx0KGlzQWRkUGFyYW0gJiYgKGFkZCA/IFwiYWRkXCIgOiBcInJlbW92ZVwiKSkgfHwgXCJjb250YWluc1wiXG5cdFx0XHRdKGNsYXNzTmFtZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlcyA9IGVsLmNsYXNzTmFtZTtcblxuXHRcdFx0aWYgKGlzQWRkUGFyYW0pIHtcblx0XHRcdFx0aWYgKGFkZCAmJiByZXMuaW5kZXhPZihjbGFzc05hbWUpID09PSAtMSkge1xuXHRcdFx0XHRcdHJlcyA9IGVsLmNsYXNzTmFtZSA9IChgJHtyZXN9ICR7Y2xhc3NOYW1lfWApLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFhZGQpIHtcblx0XHRcdFx0XHRyZXMgPSBlbC5jbGFzc05hbWUgPSByZXMucmVwbGFjZShjbGFzc05hbWUsIFwiXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXMgPSBuZXcgUmVnRXhwKGBcXFxcYiR7Y2xhc3NOYW1lfVxcXFxiYCkudGVzdChyZXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXM7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENoZWNrIGFuZCBwYXJzZSB2YWx1ZSB0byBudW1iZXJcblx0ICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSB2YWxcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRlZlZhbFxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9XG5cdCAqL1xuXHRnZXROdW1WYWx1ZSh2YWwsIGRlZlZhbCkge1xuXHRcdGxldCBudW0gPSB2YWw7XG5cblx0XHRyZXR1cm4gaXNOYU4obnVtID0gcGFyc2VGbG9hdChudW0pKSA/IGRlZlZhbCA6IG51bTtcblx0fSxcblxuXHQvKipcblx0ICogUmV0dXJuIHVuaXQgZm9ybWF0dGVkIHZhbHVlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gdmFsXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gdmFsIFZhbHVlIGZvcm1hdHRlZCB3aXRoIHVuaXRcblx0ICovXG5cdGdldFVuaXRWYWx1ZSh2YWwpIHtcblx0XHRjb25zdCByeCA9IC8oPzpbYS16XXsyLH18JSkkLztcblxuXHRcdHJldHVybiAocGFyc2VGbG9hdCh2YWwpIHx8IDApICsgKFN0cmluZyh2YWwpLm1hdGNoKHJ4KSB8fCBcInB4XCIpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgZWxlbWVudCdzIG91dGVyIHZhbHVlXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gW291dGVyV2lkdGh8b3V0ZXJIZWlnaHRdXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IG91dGVyJ3MgdmFsdWVcblx0ICovXG5cdGdldE91dGVyKGVsLCB0eXBlKSB7XG5cdFx0bGV0IHBhZGRpbmdNYXJnaW4gPSAwO1xuXG5cdFx0KHR5cGUgPT09IFwib3V0ZXJXaWR0aFwiID9cblx0XHRcdFtcIkxlZnRcIiwgXCJSaWdodFwiXSA6XG5cdFx0XHRbXCJUb3BcIiwgXCJCb3R0b21cIl1cblx0XHQpLmZvckVhY2goZGlyID0+IHtcblx0XHRcdFtcInBhZGRpbmdcIiwgXCJtYXJnaW5cIl0uZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0cGFkZGluZ01hcmdpbiArPSB0aGlzLmNzcyhlbCwgYCR7dn0ke2Rpcn1gLCB0cnVlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXMuY3NzKGVsLCB0eXBlLnJlcGxhY2UoXCJvdXRlclwiLCBcIlwiKS50b0xvY2FsZUxvd2VyQ2FzZSgpLCB0cnVlKSArIHBhZGRpbmdNYXJnaW47XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBlbGVtZW50J3Mgb3V0ZXJXaWR0aCB2YWx1ZSB3aXRoIG1hcmdpblxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfVxuXHQgKi9cblx0b3V0ZXJXaWR0aChlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE91dGVyKGVsLCBcIm91dGVyV2lkdGhcIik7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBlbGVtZW50J3Mgb3V0ZXJIZWlnaHQgdmFsdWUgd2l0aCBtYXJnaW5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcblx0ICogQHJldHVybnMge051bWJlcn1cblx0ICovXG5cdG91dGVySGVpZ2h0KGVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3V0ZXIoZWwsIFwib3V0ZXJIZWlnaHRcIik7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHN5bnRheCBvZiB0aGUgdHJhbnNsYXRlIHN0eWxlIHdoaWNoIGlzIGFwcGxpZWQgdG8gQ1NTIHRyYW5zaXRpb24gcHJvcGVydGllcy5cblx0ICpcblx0ICogQGtvIENTUyDtirjrnpzsp4DshZgg7IaN7ISx7JeQIOyggeyaqe2VoCB0cmFuc2xhdGUg7Iqk7YOA7J28IOq1rOusuOydhCDrsJjtmZjtlZzri6Rcblx0ICogQG1ldGhvZCBlZyN0cmFuc2xhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHggRGlzdGFuY2UgdG8gbW92ZSBhbG9uZyB0aGUgWCBheGlzIDxrbz547LaV7J2EIOuUsOudvCDsnbTrj5ntlaAg6rGw66asPC9rbz5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHkgRGlzdGFuY2UgdG8gbW92ZSBhbG9uZyB0aGUgWSBheGlzIDxrbz557LaV7J2EIOuUsOudvCDsnbTrj5ntlaAg6rGw66asPC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbaXNIQV0gRm9yY2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uIDxrbz7tlZjrk5zsm6jslrQg6rCA7IaNIOyCrOyaqSDsl6zrtoA8L2tvPlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IFN5bnRheCBvZiB0aGUgdHJhbnNsYXRlIHN0eWxlIDxrbz50cmFuc2xhdGUg7Iqk7YOA7J28IOq1rOusuDwva28+XG5cdCAqL1xuXHR0cmFuc2xhdGUoeCwgeSwgaXNIQSkge1xuXHRcdHJldHVybiBpc0hBIHx8IGZhbHNlID9cblx0XHRcdGB0cmFuc2xhdGUzZCgke3h9LCR7eX0sMClgIDogYHRyYW5zbGF0ZSgke3h9LCR7eX0pYDtcblx0fSxcblxuXHQvLyAxLiB1c2VyIHByZXNzIG9uZSBwb3NpdGlvbiBvbiBzY3JlZW4uXG5cdC8vIDIuIHVzZXIgbW92ZXMgdG8gdGhlIG90aGVyIHBvc2l0aW9uIG9uIHNjcmVlbi5cblx0Ly8gMy4gd2hlbiB1c2VyIHJlbGVhc2VzIGZpbmdlcnMgb24gc2NyZWVuLCAnY2xpY2snIGV2ZW50IGlzIGZpcmVkIGF0IHByZXZpb3VzIHBvc2l0aW9uLlxuXHRoYXNDbGlja0J1ZygpIHtcblx0XHRjb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuXHRcdGNvbnN0IHJlc3VsdCA9IC9pUGhvbmV8aVBhZC8udGVzdCh1YSk7XG5cblx0XHR0aGlzLmhhc0NsaWNrQnVnID0gKCkgPT4gcmVzdWx0O1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cbmNsYXNzIE1peGluQnVpbGRlciB7XG5cdGNvbnN0cnVjdG9yKHN1cGVyY2xhc3MpIHtcblx0XHR0aGlzLnN1cGVyY2xhc3MgPSBzdXBlcmNsYXNzIHx8IGNsYXNzIHt9O1xuXHR9XG5cblx0d2l0aCguLi5taXhpbnMpIHtcblx0XHRyZXR1cm4gbWl4aW5zLnJlZHVjZSgoYywgbSkgPT4gbShjKSwgdGhpcy5zdXBlcmNsYXNzKTtcblx0fVxufVxuXG5jb25zdCBNaXhpbiA9IHN1cGVyY2xhc3MgPT4gbmV3IE1peGluQnVpbGRlcihzdXBlcmNsYXNzKTtcblxuZXhwb3J0IHt1dGlscywgTWl4aW59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge3dpbmRvdyBhcyBnbG9iYWwsIGRvY3VtZW50IGFzIGRvY30gZnJvbSBcIi4vYnJvd3NlclwiO1xuXG4vLyBkZWZpbmUgY3VzdG9tIGV2ZW50cyBuYW1lXG5jb25zdCBFVkVOVFMgPSB7XG5cdGJlZm9yZUZsaWNrU3RhcnQ6IFwiYmVmb3JlRmxpY2tTdGFydFwiLFxuXHRiZWZvcmVSZXN0b3JlOiBcImJlZm9yZVJlc3RvcmVcIixcblx0ZmxpY2s6IFwiZmxpY2tcIixcblx0ZmxpY2tFbmQ6IFwiZmxpY2tFbmRcIixcblx0cmVzdG9yZTogXCJyZXN0b3JlXCJcbn07XG5cbi8vIGNoZWNrIGZvciB0aGUgdHJhbnNmb3JtIHByb3BlcnR5XG5jb25zdCBUUkFOU0ZPUk0gPSB7XG5cdG5hbWU6IFwidHJhbnNmb3JtXCJcbn07XG5cblRSQU5TRk9STS5zdXBwb3J0ID0gKCgpID0+IHtcblx0aWYgKCFkb2MuZG9jdW1lbnRFbGVtZW50KSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IHN0eWxlID0gZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblxuXHRyZXR1cm4gVFJBTlNGT1JNLm5hbWUgaW4gc3R5bGUgfHwgKFRSQU5TRk9STS5uYW1lID0gXCJ3ZWJraXRUcmFuc2Zvcm1cIikgaW4gc3R5bGU7XG59KSgpO1xuXG4vLyBjaGVjayBmb3Igd2lsbC1jaGFuZ2Ugc3VwcG9ydFxuY29uc3QgU1VQUE9SVF9XSUxMQ0hBTkdFID0gZ2xvYmFsLkNTUyAmJiBnbG9iYWwuQ1NTLnN1cHBvcnRzICYmXG5cdGdsb2JhbC5DU1Muc3VwcG9ydHMoXCJ3aWxsLWNoYW5nZVwiLCBcInRyYW5zZm9ybVwiKTtcblxuLy8gY2hlY2sgZm9yIEFuZHJvaWQgMi54XG5jb25zdCBJU19BTkRST0lEMiA9IC9BbmRyb2lkIDJcXC4vLnRlc3QoZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vLyBkYXRhLWhlaWdodCBhdHRyaWJ1dGUncyBuYW1lIGZvciBhZGFwdGl2ZUhlaWdodCBvcHRpb25cbmNvbnN0IERBVEFfSEVJR0hUID0gXCJkYXRhLWhlaWdodFwiO1xuXG5leHBvcnQge1xuXHRFVkVOVFMsXG5cdFRSQU5TRk9STSxcblx0U1VQUE9SVF9XSUxMQ0hBTkdFLFxuXHRJU19BTkRST0lEMixcblx0REFUQV9IRUlHSFRcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBOQVZFUiBDb3JwLlxuICogZWdqcyBwcm9qZWN0cyBhcmUgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8vIGludGVybmFsIGNvbmZpZyB2YWx1ZXNcbmNvbnN0IENPTkZJRyA9IHtcblx0cGFuZWw6IHtcblx0XHQkbGlzdDogbnVsbCwgICAgICAgIC8vIHBhbmVsIGxpc3Rcblx0XHRpbmRleDogMCxcdFx0XHQvLyBkb20gaW5kZXggdXNlZCBhbW9uZyBwcm9jZXNzXG5cdFx0bm86IDAsXHRcdFx0XHQvLyBwYW5lbCBubyB1c2VkIGFtb25nIHByb2Nlc3Ncblx0XHRjdXJySW5kZXg6IDAsICAgICAgIC8vIGN1cnJlbnQgcGh5c2ljYWwgZG9tIGluZGV4XG5cdFx0Y3Vyck5vOiAwLCAgICAgICAgICAvLyBjdXJyZW50IGxvZ2ljYWwgcGFuZWwgbnVtYmVyXG5cdFx0c2l6ZTogMCxcdFx0XHQvLyBwYW5lbCBzaXplXG5cdFx0Y291bnQ6IDAsXHRcdFx0Ly8gdG90YWwgcGh5c2ljYWwgcGFuZWwgY291bnRcblx0XHRvcmlnQ291bnQ6IDAsXHRcdC8vIHRvdGFsIGNvdW50IG9mIGdpdmVuIG9yaWdpbmFsIHBhbmVsc1xuXHRcdGNoYW5nZWQ6IGZhbHNlLFx0XHQvLyBpZiBwYW5lbCBjaGFuZ2VkXG5cdFx0YW5pbWF0aW5nOiBmYWxzZSxcdC8vIGN1cnJlbnQgYW5pbWF0aW5nIHN0YXR1cyBib29sZWFuXG5cdFx0bWluQ291bnQ6IDMgICAgICAgICAvLyBtaW5pbXVtIHBhbmVsIGNvdW50XG5cdH0sXG5cdHRvdWNoOiB7XG5cdFx0aG9sZFBvczogMCwgICAgICAgICAvLyBob2xkIHgseSBjb29yZGluYXRlXG5cdFx0ZGVzdFBvczogMCxcdCAgICAgICAgLy8gZGVzdGluYXRpb24geCx5IGNvb3JkaW5hdGVcblx0XHRkaXN0YW5jZTogMCxcdFx0Ly8gdG91Y2ggZGlzdGFuY2UgcGl4ZWwgb2Ygc3RhcnQgdG8gZW5kIHRvdWNoXG5cdFx0ZGlyZWN0aW9uOiBudWxsLFx0Ly8gdG91Y2ggZGlyZWN0aW9uXG5cdFx0bGFzdFBvczogMCxcdFx0XHQvLyB0byBkZXRlcm1pbmUgbW92ZSBvbiBob2xkaW5nXG5cdFx0aG9sZGluZzogZmFsc2UsXG5cdFx0aXNUcnVzdGVkOiBmYWxzZSAgICAvLyBpZiBldmVudCB3YXMgaW5zdGFudGlhdGVkIGJ5IHVzZXIncyBhY3Rpb24gZXhwbGljaXRseVxuXHR9LFxuXHRjdXN0b21FdmVudDogeyAgICAgICAgICAvLyBmb3IgY3VzdG9tIGV2ZW50cyB2YWx1ZVxuXHRcdGZsaWNrOiB0cnVlLFxuXHRcdHJlc3RvcmU6IGZhbHNlLFxuXHRcdHJlc3RvcmVDYWxsOiBmYWxzZVxuXHR9LFxuXHRkaXJEYXRhOiBbXSxcdFx0XHQvLyBkaXJlY3Rpb24gY29uc3RhbnQgdmFsdWUgYWNjb3JkaW5nIGhvcml6b250YWwgb3IgdmVydGljYWxcblx0aW5kZXhUb01vdmU6IDAsXG5cdCRkdW1teUFuY2hvcjogbnVsbCAgICAgIC8vIEZvciBidWdneSBsaW5rIGhpZ2hsaWdodGluZyBvbiBBbmRyb2lkIDIueFxufTtcblxuXG4vLyBkZWZhdWx0IG9wdGlvbnNcbmNvbnN0IE9QVElPTlMgPSB7XG5cdGh3QWNjZWxlcmFibGU6IHRydWUsICAgIC8vIHNldCBmb3IgaHcgYWNjZWxlcmF0aW9uIChzZWUgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vbmV0aWwvYzFkMWI2N2UxYzE5MjYzNjRjMDcwOWYxMTBhMDliNDQgZm9yIG9sZCBkZXZpY2VzIHN1cHBvcnQpXG5cdHByZWZpeDogXCJlZy1mbGlja1wiLCAgICAgLy8gcHJlZml4IHZhbHVlIG9mIGNsYXNzIG5hbWVcblx0ZGVjZWxlcmF0aW9uOiAwLjAwMDYsICAgLy8gZGVjZWxlcmF0aW9uIHZhbHVlXG5cdGhvcml6b250YWw6IHRydWUsICAgICAgIC8vIG1vdmUgZGlyZWN0aW9uICh0cnVlID09IGhvcml6b250YWwsIGZhbHNlID09IHZlcnRpY2FsKVxuXHRjaXJjdWxhcjogZmFsc2UsICAgICAgICAvLyBjaXJjdWxhciBtb2RlLiBJbiB0aGlzIG1vZGUgYXQgbGVhc3QgMyBwYW5lbHMgYXJlIHJlcXVpcmVkLlxuXHRwcmV2aWV3UGFkZGluZzogbnVsbCwgICAvLyBwcmV2aWV3IHBhZGRpbmcgdmFsdWUgaW4gbGVmdCh1cCkgdG8gcmlnaHQoZG93bikgb3JkZXIuIEluIHRoaXMgbW9kZSBhdCBsZWFzdCA1IHBhbmVscyBhcmUgcmVxdWlyZWQuXG5cdGJvdW5jZTogbnVsbCwgICAgICAgICAgIC8vIGJvdW5jZSB2YWx1ZSBpbiBsZWZ0KHVwKSB0byByaWdodChkb3duKSBvcmRlci4gV29ya3Mgb25seSBpbiBub24tY2lyY3VsYXIgbW9kZS5cblx0dGhyZXNob2xkOiA0MCwgICAgICAgICAgLy8gdGhlIGRpc3RhbmNlIHBpeGVsIHRocmVzaG9sZCB2YWx1ZSBmb3IgY2hhbmdlIHBhbmVsXG5cdGR1cmF0aW9uOiAxMDAsICAgICAgICAgIC8vIGR1cmF0aW9uIG1zIGZvciBhbmltYXRpb25cblx0cGFuZWxFZmZlY3Q6IHggPT4gMSAtIE1hdGgucG93KDEgLSB4LCAzKSwgIC8vIGVhc2luZyBmdW5jdGlvbiBmb3IgcGFuZWwgY2hhbmdlIGFuaW1hdGlvblxuXHRkZWZhdWx0SW5kZXg6IDAsICAgICAgICAvLyBpbml0aWFsIHBhbmVsIGluZGV4IHRvIGJlIHNob3duXG5cdGlucHV0VHlwZTogWyAgICAgICAgICAgIC8vIGlucHV0IHR5cGVcblx0XHRcInRvdWNoXCIsIFwibW91c2VcIlxuXHRdLFxuXHR0aHJlc2hvbGRBbmdsZTogNDUsICAgICAvLyB0aGUgdGhyZXNob2xkIHZhbHVlIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIHVzZXIgYWN0aW9uIGlzIGhvcml6b250YWwgb3IgdmVydGljYWwgKDB+OTApXG5cdGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSwgIC8vIFNldCBjb250YWluZXIncyBoZWlnaHQgYmUgYWRhcHRpdmUgYWNjb3JkaW5nIHBhbmVsJ3MgaGVpZ2h0XG5cdHpJbmRleDogMjAwMCwgICAgICAgICAgIC8vIHotaW5kZXggdmFsdWUgZm9yIGNvbnRhaW5lciBlbGVtZW50XG5cdHVzZVRyYW5zbGF0ZTogdHJ1ZSAgICAgIC8vIHVzZSBvZiB0cmFuc2xhdGUgb24gcGFuZWwgbW92ZXNcbn07XG5cbmV4cG9ydCB7XG5cdENPTkZJRyxcblx0T1BUSU9OU1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtFVkVOVFN9IGZyb20gXCIuL2NvbnN0c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBzdXBlcmNsYXNzID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG5cdC8qKlxuXHQgKiAnaG9sZCcgZXZlbnQgaGFuZGxlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2hvbGRIYW5kbGVyKGUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCB0b3VjaCA9IGNvbmYudG91Y2g7XG5cdFx0Y29uc3QgaG9sZFBvcyA9IGUucG9zLmZsaWNrO1xuXG5cdFx0dG91Y2guaG9sZFBvcyA9IGhvbGRQb3M7XG5cdFx0dG91Y2guaG9sZGluZyA9IHRydWU7XG5cdFx0dG91Y2guaXNUcnVzdGVkID0gdHJ1ZTtcblx0XHRjb25mLnBhbmVsLmNoYW5nZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhcInN0YXJ0XCIsIGhvbGRQb3MpO1xuXHR9XG5cblx0LyoqXG5cdCAqICdjaGFuZ2UnIGV2ZW50IGhhbmRsZXJcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9jaGFuZ2VIYW5kbGVyKGUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCB0b3VjaCA9IGNvbmYudG91Y2g7XG5cdFx0Y29uc3QgcG9zID0gZS5wb3MuZmxpY2s7XG5cdFx0Y29uc3QgaG9sZFBvcyA9IHRvdWNoLmhvbGRQb3M7XG5cdFx0bGV0IGRpcmVjdGlvbjtcblx0XHRsZXQgZXZlbnRSZXMgPSBudWxsO1xuXHRcdGxldCBtb3ZlZFB4O1xuXG5cdFx0dGhpcy5fc2V0UG9pbnRlckV2ZW50cyhlKTsgIC8vIGZvciBcImNsaWNrXCIgYnVnXG5cblx0XHQvKipcblx0XHQgKiBBbiBldmVudCB0aGF0IG9jY3VycyB3aGVuZXZlciB0aGUgcGFuZWwncyBjb29yZGluYXRlIHZhbHVlIGNoYW5nZXMuIEl0IG9jY3VycyBpbiB0aGUgZm9sbG93aW5nIGNhc2VzLjxicj48YnI+MS4gV2hlbiB0aGUgdXNlciBpcyBpbnB1dGluZyB0aGUgbW92ZS48YnI+Mi4gV2hlbiBtb3ZpbmcgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsIGFmdGVyIHlvdSBoYXZlIGZpbmlzaGVkIGlucHV0aW5nIHRoZSBtb3ZlIGluIHN0ZXAgMS48YnI+My4gV2hlbiB0aGUgY3VycmVudCBwYW5lbCBpcyBtb3ZpbmcgdG8gaXRzIG9yaWdpbmFsIHBvc2l0aW9uIGFmdGVyIHRoZSBtb3ZlbWVudCBpcyBmaW5pc2hlZCBpbiBzdGVwIDEuPGJyPjQuIE1vdmluZyB0byB0aGUgZGVzdGluYXRpb24gcGFuZWwgYnkgY2FsbGluZyB0aGUgYG1vdmVUbygpYCwgYHByZXYoKWAsIGBuZXh0KClgICBtZXRob2QuIChEbyBub3QgcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IGV2ZW50Lilcblx0XHQgKiBAa28g7Yyo64SQ7J2YIOyijO2RnOqwkuydtCDrs4DtlaAg65WM66eI64ukIOuwnOyDne2VmOuKlCDsnbTrsqTtirguIOyVhOuemOydmCDqsr3smrDsl5Ag67Cc7IOd7ZWc64ukLjxicj48YnI+MS4g7IKs7Jqp7J6Q6rCAIOydtOuPmShtb3ZlKSDslaHshZgg7J6F66Cl7KSR7J28IOuVjC48YnI+Mi4gMeuyiOyXkOyEnCDsnbTrj5kobW92ZSkg7JWh7IWYIOyeheugpeydtCDrgZ3rgpjqs6Ag66qp7KCBIO2MqOuEkOuhnCDsnbTrj5nspJHsnbwg65WMLjxicj4zLiAx67KI7JeQ7IScIOydtOuPmShtb3ZlKSDslaHshZgg7J6F66Cl7J20IOuBneuCmOqzoCDtmITsnqwg7Yyo64SQ7J2YIOybkOuemCDsnITsuZjroZwg7J2064+Z7KSR7J28IOuVjC48YnI+NC4gYG1vdmVUbygpYCwgYHByZXYoKWAsIGBuZXh0KClgLCDrqZTshJzrk5zrpbwg7Zi47Lac7ZWY7JesIOuqqeyggSDtjKjrhJDroZwg7J2064+Z7KSR7J28IOuVjC4gKFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0feydtOuypO2KuOydmCDquLDrs7jrj5nsnpHsnYQg66eJ7KeAIOyViuyVhOyVvCDtlZzri6QuKTxicj41LiBgcmVzdG9yZSgpYCDrqZTshJzrk5zrpbwg7Zi47Lac7ZWY7JesIO2YhOyerCDtjKjrhJDsnbQg7JuQ656YIOychOy5mOuhnCDsnbTrj5nspJHsnbwg65WMLiAoW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR97J2067Kk7Yq47J2YIOq4sOuzuOuPmeyekSDrsKnsp4Ag7KCE7KCcLilcblx0XHQgKiBAbmFtZSBlZy5GbGlja2luZyNmbGlja1xuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBldmVudFR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50PGtvPuydtOuypO2KuCDrqoU8L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNUcnVzdGVkIHRydWUgd2hlbiB0aGUgZXZlbnQgd2FzIGdlbmVyYXRlZCBieSBhIHVzZXIgYWN0aW9uKGBcIm1vdXNlXCJgIG9yIGBcInRvdWNoXCJgKSBvdGhlcndpc2UgZmFsc2U8a28+7IKs7Jqp7J6QIOyVoeyFmChgXCJtb3VzZVwiYCDrmJDripQgYFwidG91Y2hcImAp7JeQIOydmO2VtCDsnbTrsqTtirjqsIAg7IOd7ISx65CcIOqyveyasCBgdHJ1ZWAuIOq3uCDsmbjripQgYGZhbHNlYDwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IG5vIEluZGV4IG51bWJlciBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50LiBTZWUgdGhlIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH0gbWV0aG9kLjxrbz7tmITsnqwg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi4LiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh966mU7ISc65OcIOywuOyhsC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaXJlY3Rpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiBJZiBgaG9yaXpvbnRhbD10cnVlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBJZiBgaG9yaXpvbnRhbD1mYWxzZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48a28+7Yyo64SQIOydtOuPmSDrsKntlqUuIGBob3Jpem9udGFsPXRydWVgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gYGhvcml6b250YWw9ZmFsc2VgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwb3MgY3VycmVudCBjb29yZGluYXRlIDxrbz7tmITsnqwg7KKM7ZGcLjwva28+XG5cdFx0ICogQHByb3BlcnR5IHtCb29sZWFufSBob2xkaW5nIFdoZXRoZXIgdGhlIHVzZXIgaXMgaW5wdXRpbmcgdGhyb3VnaCB0aGUgaW5wdXQgZGV2aWNlLiAoV2hldGhlciBpdCBpcyAnbW91c2Vkb3duJyBmb3IgYSBtb3VzZSBkZXZpY2Ugb3IgJ3RvdWNobW92ZScgZm9yIGEgdG91Y2ggZGV2aWNlLik8a28+7IKs7Jqp7J6Q6rCAIOyeheugpSDsnqXsuZjrpbwg7Ya17ZW0IOyeheugpeykkeyduOyngCDsl6zrtoAuICjrp4jsmrDsiqQg7J6l7LmY652866m0ICdtb3VzZWRvd24nIOyXrOu2gCwg7YSw7LmYIOyepey5mOudvOuptCAndG91Y2htb3ZlJyDsl6zrtoApPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGlzdGFuY2UgRGlzdGFuY2UgdmFsdWUgZnJvbSB0aGUgdG91Y2ggc3RhcnRpbmcgcG9pbnQuIElmIHRoZSBgZGlyZWN0aW9uYCBwcm9wZXJ0eSB2YWx1ZSBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9LCBpdCByZXR1cm5zIGEgcG9zaXRpdmUgbnVtYmVyLiB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059IHJldHVybnMgYSBuZWdhdGl2ZSB2YWx1ZS48a28+7YSw7LmYIOyLnOyekeygkOycvOuhnOu2gO2EsCDsnbTrj5ntlZwg6rGw66asIOqwki4gYGRpcmVjdGlvbmDsho3shLHqsJLsnbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH3snbTrqbQg7JaR7IiY66W8LCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfeydtOuptCDsnYzsiJjrpbwg67CY7ZmY7ZWc64ukLjwva28+XG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpiZWZvcmVSZXN0b3JlXG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNyZXN0b3JlXG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0XG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja0VuZFxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjbW92ZVRvXG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNwcmV2XG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNuZXh0XG5cdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFRoZSBvcmRlciBvZiBldmVudCBvY2N1cnJlbmNlLlxuXHRcdFx0ICog7J2067Kk7Yq4IOuwnOyDnSDsiJzshJxcblx0XHRcdCAqIGBgYGphdmFzY3JpcHRcblx0XHRcdCAqIC8vIFdoZW4gbW92aW5nIHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbC5cblx0XHRcdCAqIC8vIOuqqeyggSDtjKjrhJDroZwg7J2064+Z7ZWgIOuVjC5cblx0XHRcdCAqIGJlZm9yZUZsaWNrU3RhcnQgKG9uY2UpID4gZmxpY2sgKG1hbnkgdGltZXMpID4gZmxpY2tFbmQgKG9uY2UpXG5cdFx0XHQgKlxuXHRcdFx0ICogLy8gV2hlbiB0aGUgcmVzdG9yZSBvcGVyYXRpb24uXG5cdFx0XHQgKiAvLyDrs7Xsm5Ag64+Z7J6R7J28IOuVjC5cblx0XHRcdCAqIGJlZm9yZVJlc3RvcmUgKG9uY2UpID4gZmxpY2sgKG1hbnkgdGltZXMpID4gcmVzdG9yZSAob25jZSlcblx0XHRcdCAqIGBgYFxuXHRcdCAqL1xuXHRcdGlmIChlLmlucHV0RXZlbnQpIHtcblx0XHRcdGRpcmVjdGlvbiA9IGUuaW5wdXRFdmVudC5kaXJlY3Rpb247XG5cblx0XHRcdC8vIEFkanVzdCBkaXJlY3Rpb24gaW4gY2FzZSBvZiBkaWFnb25hbCB0b3VjaCBtb3ZlXG5cdFx0XHRtb3ZlZFB4ID0gZS5pbnB1dEV2ZW50W3RoaXMub3B0aW9ucy5ob3Jpem9udGFsID8gXCJkZWx0YVhcIiA6IFwiZGVsdGFZXCJdO1xuXG5cdFx0XHRpZiAoIX5jb25mLmRpckRhdGEuaW5kZXhPZihkaXJlY3Rpb24pKSB7XG5cdFx0XHRcdGRpcmVjdGlvbiA9IGNvbmYuZGlyRGF0YVsrKE1hdGguYWJzKHRvdWNoLmxhc3RQb3MpIDw9IG1vdmVkUHgpXTtcblx0XHRcdH1cblxuXHRcdFx0dG91Y2gubGFzdFBvcyA9IG1vdmVkUHg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvdWNoLmxhc3RQb3MgPSBudWxsO1xuXHRcdH1cblxuXHRcdGNvbmYuY3VzdG9tRXZlbnQuZmxpY2sgJiYgKGV2ZW50UmVzID1cblx0XHRcdHRoaXMuX3RyaWdnZXJFdmVudChFVkVOVFMuZmxpY2ssIHtcblx0XHRcdFx0cG9zLFxuXHRcdFx0XHRob2xkaW5nOiBlLmhvbGRpbmcsXG5cdFx0XHRcdGRpcmVjdGlvbjogZGlyZWN0aW9uIHx8IHRvdWNoLmRpcmVjdGlvbixcblx0XHRcdFx0ZGlzdGFuY2U6IHRvdWNoLmlzVHJ1c3RlZCA/IHBvcyAtIGhvbGRQb3MgOiBudWxsXG5cdFx0XHR9KVxuXHRcdCk7XG5cblx0XHQoZXZlbnRSZXMgfHwgZXZlbnRSZXMgPT09IG51bGwpICYmIHRoaXMuX3NldFRyYW5zbGF0ZShbLXBvcywgMF0pO1xuXHR9XG5cblx0LyoqXG5cdCAqICdyZWxlYXNlJyBldmVudCBoYW5kbGVyXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfcmVsZWFzZUhhbmRsZXIoZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHRvdWNoID0gY29uZi50b3VjaDtcblx0XHRjb25zdCBob2xkUG9zID0gdG91Y2guaG9sZFBvcztcblx0XHRjb25zdCBwYW5lbFNpemUgPSBjb25mLnBhbmVsLnNpemU7XG5cdFx0Y29uc3QgY3VzdG9tRXZlbnQgPSBjb25mLmN1c3RvbUV2ZW50O1xuXHRcdGNvbnN0IGlzUGx1c01vdmUgPSB0b3VjaC5ob2xkUG9zIDwgZS5kZXBhUG9zLmZsaWNrO1xuXG5cdFx0dG91Y2guZGlzdGFuY2UgPSBlLmRlcGFQb3MuZmxpY2sgLSBob2xkUG9zO1xuXHRcdHRvdWNoLmRpcmVjdGlvbiA9IGNvbmYuZGlyRGF0YVsrIShpc1BsdXNNb3ZlKV07XG5cdFx0dG91Y2guZGVzdFBvcyA9IGhvbGRQb3MgKyAoaXNQbHVzTW92ZSA/IHBhbmVsU2l6ZSA6IC1wYW5lbFNpemUpO1xuXG5cdFx0Y29uc3QgZGlzdGFuY2UgPSB0b3VjaC5kaXN0YW5jZTtcblx0XHRsZXQgZHVyYXRpb24gPSB0aGlzLm9wdGlvbnMuZHVyYXRpb247XG5cdFx0bGV0IG1vdmVUbyA9IGhvbGRQb3M7XG5cblx0XHRpZiAodGhpcy5faXNNb3ZhYmxlKCkpIHtcblx0XHRcdCFjdXN0b21FdmVudC5yZXN0b3JlQ2FsbCAmJiAoY3VzdG9tRXZlbnQucmVzdG9yZSA9IGZhbHNlKTtcblx0XHRcdG1vdmVUbyA9IHRvdWNoLmRlc3RQb3M7XG5cdFx0fSBlbHNlIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPiAwKSB7XG5cdFx0XHR0aGlzLl90cmlnZ2VyQmVmb3JlUmVzdG9yZShlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZHVyYXRpb24gPSAwO1xuXHRcdH1cblxuXHRcdC8vIHRyaWdnZXIgYW5pbWF0aW9uXG5cdFx0ZS5zZXRUbyh7ZmxpY2s6IG1vdmVUb30sIGR1cmF0aW9uKTtcblxuXHRcdGRpc3RhbmNlID09PSAwICYmIHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhcImVuZFwiKTtcblx0XHR0b3VjaC5ob2xkaW5nID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zZXRQb2ludGVyRXZlbnRzKCk7ICAvLyBmb3IgXCJjbGlja1wiIGJ1Z1xuXHR9XG5cblx0LyoqXG5cdCAqICdhbmltYXRpb25TdGFydCcgZXZlbnQgaGFuZGxlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2FuaW1hdGlvblN0YXJ0SGFuZGxlcihlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IGN1c3RvbUV2ZW50ID0gY29uZi5jdXN0b21FdmVudDtcblx0XHRjb25zdCBpc0Zyb21JbnB1dCA9IGUuaW5wdXRFdmVudCB8fCBjb25mLnRvdWNoLmxhc3RQb3M7XG5cblx0XHQvLyB3aGVuIGFuaW1hdGlvbiB3YXMgc3RhcnRlZCBieSBpbnB1dCBhY3Rpb25cblx0XHRpZiAoIWN1c3RvbUV2ZW50LnJlc3RvcmVDYWxsICYmIGlzRnJvbUlucHV0ICYmXG5cdFx0XHR0aGlzLl9zZXRQaGFzZVZhbHVlKFwic3RhcnRcIiwge1xuXHRcdFx0XHRkZXBhUG9zOiBlLmRlcGFQb3MuZmxpY2ssXG5cdFx0XHRcdGRlc3RQb3M6IGUuZGVzdFBvcy5mbGlja1xuXHRcdFx0fSkgPT09IGZhbHNlKSB7XG5cdFx0XHRlLnN0b3AoKTtcblx0XHR9XG5cblx0XHRpZiAoaXNGcm9tSW5wdXQpIHtcblx0XHRcdGUuZHVyYXRpb24gPSB0aGlzLm9wdGlvbnMuZHVyYXRpb247XG5cblx0XHRcdGUuZGVzdFBvcy5mbGljayA9XG5cdFx0XHRcdHBhbmVsLnNpemUgKiAoXG5cdFx0XHRcdFx0cGFuZWwuaW5kZXggKyBjb25mLmluZGV4VG9Nb3ZlXG5cdFx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cGFuZWwuYW5pbWF0aW5nID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiAnYW5pbWF0aW9uRW5kJyBldmVudCBoYW5kbGVyXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfYW5pbWF0aW9uRW5kSGFuZGxlcigpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblxuXHRcdGNvbmYucGFuZWwuYW5pbWF0aW5nID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zZXRQaGFzZVZhbHVlKFwiZW5kXCIpO1xuXHRcdHRoaXMuX3RyaWdnZXJSZXN0b3JlKCk7XG5cblx0XHQvLyByZXNldCBpc1RydXN0ZWRcblx0XHRjb25mLnRvdWNoLmlzVHJ1c3RlZCA9IGZhbHNlO1xuXHR9XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZWdqcy9jb21wb25lbnRcIjtcbmltcG9ydCBBeGVzLCB7UGFuSW5wdXR9IGZyb20gXCJAZWdqcy9heGVzXCI7XG5pbXBvcnQge3V0aWxzLCBNaXhpbn0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7XG5cdEVWRU5UUyxcblx0VFJBTlNGT1JNLFxuXHRTVVBQT1JUX1dJTExDSEFOR0UsXG5cdElTX0FORFJPSUQyLFxuXHREQVRBX0hFSUdIVFxufSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7Q09ORklHLCBPUFRJT05TfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7ZG9jdW1lbnR9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCBldmVudEhhbmRsZXIgZnJvbSBcIi4vZXZlbnRIYW5kbGVyXCI7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBlZy5GbGlja2luZyBjbGFzcy4gQ3JlYXRlIGEgZmxpY2tpbmcgVUkgdGhhdCBzd2VlcHMgYSBzaWRlLWJ5LXNpZGUgcGFuZWwgd2l0aCBtb3VzZSBtb3ZlIG9yIHRvdWNoIG1vdmUgaW5wdXQgYW5kIG1vdmVzIHRvIHRoZSBuZXh0IG9yIHByZXZpb3VzIHBhbmVsLlxuICogQGtvIGVnLkZsaWNraW5nIO2BtOuemOyKpOydmCDsnbjsiqTthLTsiqTrpbwg7IOd7ISx7ZWc64ukLiDrgpjrnoDtnogg67Cw7LmY7ZWcIO2MqOuEkOydhCDrp4jsmrDsiqQg7J2064+ZKG1vdmUpIO2YueydgCDthLDsuZgg7J2064+ZKG1vdmUpIOyeheugpeydhCDrsJvslYQg7JO47Ja0IOuEmOqyqCDri6TsnYwg7Yyo64SQ7J2064KYIOydtOyghCDtjKjrhJDroZwg7J2064+Z7ZWY64qUIFVJ66W8IOunjOuToOuLpC5cbiAqIEBhbGlhcyBlZy5GbGlja2luZ1xuICogQGV4dGVuZHMgZWcuQ29tcG9uZW50XG4gKiBAcmVxdWlyZXMge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXZlci9lZ2pzLWNvbXBvbmVudHxlZy5Db21wb25lbnR9XG4gKiBAcmVxdWlyZXMge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXZlci9lZ2pzLWF4ZXN8ZWcuQXhlc31cbiAqIEBzZWUgRWFzaW5nIEZ1bmN0aW9ucyBDaGVhdCBTaGVldCB7QGxpbmsgaHR0cDovL2Vhc2luZ3MubmV0L30gPGtvPuydtOynlSDtlajsiJggQ2hlYXQgU2hlZXQge0BsaW5rIGh0dHA6Ly9lYXNpbmdzLm5ldC99PC9rbz5cbiAqIEBzZWUgSWYgeW91IHdhbnQgdG8gdHJ5IGEgZGlmZmVyZW50IGVhc2luZyBmdW5jdGlvbiwgdXNlIHRoZSBqUXVlcnkgZWFzaW5nIHBsdWdpbiAoe0BsaW5rIGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZ30pIG9yIHRoZSBqUXVlcnkgVUkgZWFzaW5nIGxpYnJhcnkgKHtAbGluayBodHRwczovL2pxdWVyeXVpLmNvbS9lYXNpbmd9KS4gPGtvPuuLpOuluCBlYXNpbmcg7ZWo7IiY66W8IOyCrOyaqe2VmOugpOuptCBqUXVlcnkgZWFzaW5nIO2UjOufrOq3uOyduCh7QGxpbmsgaHR0cDovL2dzZ2QuY28udWsvc2FuZGJveC9qcXVlcnkvZWFzaW5nfSnsnbTrgpgsIGpRdWVyeSBVSSBlYXNpbmcg65287J2067iM65+s66asKHtAbGluayBodHRwczovL2pxdWVyeXVpLmNvbS9lYXNpbmd9KeulvCDsgqzsmqntlZzri6Q8L2tvPlxuICogQHRocm93cyB7RXJyb3J9IEFuIEVycm9yIG9jY3VyIHdoZW4gZ2l2ZW4gYmFzZSBlbGVtZW50IGRvZXNuJ3QgZXhpc3Qgb3IgaXQgaGFzbid0IHByb3BlciBET00gc3RydWN0dXJlIHRvIGJlIGluaXRpYWxpemVkLiA8a28+7KO87Ja07KeEIOq4sOuzuCDsmpTshozqsIAg7KG07J6s7ZWY7KeAIOyViuqxsOuCmCDstIjquLDtmZQg7ZWgIOyggeygiO2VnCBET00g6rWs7KGw6rCA7JeG64qUIOqyveyasCDsmKTrpZjqsIAg67Cc7IOd7ZWc64ukLjwva28+XG4gKiBAc3VwcG9ydCB7XCJpZVwiOiBcIjEwK1wiLCBcImNoXCIgOiBcImxhdGVzdFwiLCBcImZmXCIgOiBcImxhdGVzdFwiLCAgXCJzZlwiIDogXCJsYXRlc3RcIiAsIFwiZWRnZVwiIDogXCJsYXRlc3RcIiwgXCJpb3NcIiA6IFwiNytcIiwgXCJhblwiIDogXCIyLjMrIChleGNlcHQgMy54KVwifVxuICogQGV4YW1wbGVcbiAqIEEgY29tbW9uIGV4YW1wbGUuXG4gKiDsnbzrsJjsoIHsnbgg7JiILlxuICogYGBgaHRtbFxuICogPGRpdiBpZD1cImZsaWNrXCI+XG4gKiBcdDxkaXY+PHA+cGFuZWwgMDwvcD48L2Rpdj5cbiAqIFx0PGRpdj48cD5wYW5lbCAxPC9wPjwvZGl2PlxuICogXHQ8ZGl2PjxwPnBhbmVsIDI8L3A+PC9kaXY+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogYGBgamF2YXNjcmlwdFxuICogLy8gRXhhbXBsZXMgdG8gb21pdCBhbmQgb21pdCBvcHRpb25hbCBvcHRpb25zLlxuICogLy8g7IOd65616rCA64ql7ZWcIOyYteyFmOydgCDsg53rnrXtlZjqs6Ag7IOd7ISx7ZWY64qUIOyYiC5cbiAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKTtcbiAqXG4gKiAvLyBBbiBleGFtcGxlIG9mIHNwZWNpZnlpbmcgYW5kIGdlbmVyYXRpbmcgdmFsdWVzIGZvciBhbGwgb3B0aW9uYWwgcGFyYW1ldGVycy5cbiAqIC8vIOuqqOuToCDsmLXshZjsnZgg6rCS7J2EIOyngOygle2VmOqzoCDsg53shLHtlZjripQg7JiILlxuICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIsIHtcbiAqIFx0aHdBY2NlbGVyYWJsZTogdHJ1ZSxcbiAqIFx0cHJlZml4OiBcImVnLWZsaWNrXCIsXG4gKiBcdGRlY2VsZXJhdGlvbjogMC4wMDA2LFxuICogXHRob3Jpem9udGFsOiB0cnVlLFxuICogXHRjaXJjdWxhcjogZmFsc2UsXG4gKiBcdHByZXZpZXdQYWRkaW5nOiBbMTAsIFwiMTUlXCJdLCAvLyBhbHNvIGFzIFwiMTBweFwiLCAxNSBvciBcIjE1JVwiIGNhbiBiZSBhcHBsaWVkLlxuICogXHRib3VuY2U6IFsxMCwgMTBdLFxuICogXHR0aHJlc2hvbGQ6IDQwLFxuICogXHRkdXJhdGlvbjogMTAwLFxuICogXHRwYW5lbEVmZmVjdDogeCA9PiAxIC0gTWF0aC5wb3coMSAtIHgsIDMpLFxuICogXHRkZWZhdWx0SW5kZXg6IDAsXG4gKiBcdGlucHV0VHlwZTogW1widG91Y2hcIiwgXCJtb3VzZVwiXSxcbiAqIFx0dGhyZXNob2xkQW5nbGU6IDQ1LFxuICogXHRhZGFwdGl2ZUhlaWdodDogZmFsc2VcbiAqIH0pO1xuICogYGBgXG4gKiBAZXhhbXBsZVxuICogRXhhbXBsZSBvZiBjb25zdHJ1Y3RvciBlbGVtZW50IHBhcmFtZXRlciB2YWx1ZSBzcGVjaWZpY2F0aW9uLlxuICog7IOd7ISx7J6QIGVsZW1lbnQg7YyM652866+47YSwIOqwkiDsp4DsoJUg7JiILlxuICogYGBgamF2YXNjcmlwdFxuICogLy8gQW4gZXhhbXBsZSBvZiBhc3NpZ25pbmcgSFRNTEVsZW1lbnQgdG8gYW4gZWxlbWVudCBwYXJhbWV0ZXIuXG4gKiAvLyBlbGVtZW50IO2MjOudvOuvuO2EsOyXkCBIVE1MRWxlbWVudOulvCDsp4DsoJXtlZjripQg7JiILlxuICogbmV3IGVnLkZsaWNraW5nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxpY2tcIikpO1xuICpcbiAqIC8vIEFuIGV4YW1wbGUgb2YgYXNzaWduaW5nIGEgalF1ZXJ5IG9iamVjdCB0byBhbiBlbGVtZW50IHBhcmFtZXRlci5cbiAqIC8vIGVsZW1lbnQg7YyM652866+47YSw7JeQIGpRdWVyeeqwneyytOulvCDsp4DsoJXtlZjripQg7JiILlxuICogbmV3IGVnLkZsaWNraW5nKCQoXCIjZmxpY2tcIilbMF0pO1xuICpcbiAqIC8vIEFuIGV4YW1wbGUgb2YgYXNzaWduaW5nIGEgY3NzIHNlbGVjdG9yIHN0cmluZyB0byBhbiBlbGVtZW50IHBhcmFtZXRlci5cbiAqIC8vIGVsZW1lbnQg7YyM652866+47YSw7JeQIGNzcyDshKDtg53snpAg66y47J6Q7Je07J2EIOyngOygle2VmOuKlCDsmIguXG4gKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG4gKiBgYGBcbiAqIEBleGFtcGxlXG4gKiBQYW5lbCBlbGVtZW50IGRlZmluaXRpb24gbG9jYXRpb24gZXhhbXBsZS5cbiAqIO2MqOuEkCDsmpTshowg7KCV7J2YIOychOy5mCDsmIguXG4gKiBgYGBodG1sXG4gKiA8IS0tQW4gZXhhbXBsZSBvZiBkZWZpbmluZyBhIHBhbmVsIGVsZW1lbnQgYXMgYSBjaGlsZCBvZiBhIGJhc2UgZWxlbWVudC4tLT5cbiAqIDwhLS3tjKjrhJAg7JqU7IaM66W8IOq4sOykgCDsmpTshozsnZgg7J6Q7Iud7Jy866GcIOygleydmO2VnCDsmIguLS0+XG4gKiA8ZGl2IGlkPVwiZmxpY2tcIj5cbiAqIFx0PGRpdj48cD5wYW5lbCAwPC9wPjwvZGl2PlxuICogXHQ8ZGl2PjxwPnBhbmVsIDE8L3A+PC9kaXY+XG4gKiBcdDxkaXY+PHA+cGFuZWwgMjwvcD48L2Rpdj5cbiAqIDwvZGl2PlxuICpcbiAqIDwhLS1BbiBleGFtcGxlIG9mIGRlZmluaW5nIGEgcGFuZWwgZWxlbWVudCBhcyBhIGNoaWxkIG9mIGEgY29udGFpbmVyIGVsZW1lbnQuLS0+XG4gKiA8IS0t7Yyo64SQIOyalOyGjOulvCDsu6jthYzsnbTrhIgg7JqU7IaM7J2YIOyekOyLneycvOuhnCDsoJXsnZjtlZwg7JiILi0tPlxuICogPGRpdiBpZD1cImZsaWNrMlwiPlxuICogXHQ8ZGl2IGNsYXNzPVwiZWctZmxpY2stY29udGFpbmVyXCI+XG4gKiBcdFx0PGRpdj48cD5wYW5lbCAwPC9wPjwvZGl2PlxuICogXHRcdDxkaXY+PHA+cGFuZWwgMTwvcD48L2Rpdj5cbiAqIFx0XHQ8ZGl2PjxwPnBhbmVsIDI8L3A+PC9kaXY+XG4gKiBcdDxkaXY+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogQGV4YW1wbGVcbiAqIEFuIGV4YW1wbGUgd2hlcmUgb25seSBvbmUgcGFuZWwgaXMgZGVmaW5lZCBhbmQgY3JlYXRlZCB3aXRoIGEgY2lyY3VsYXIuXG4gKiDtjKjrhJDsnYQg7ZWY64KY66eMIOygleydmO2VmOqzoCDsiJztmZjsnLzroZwg7IOd7ISx7ZWY64qUIOyYiC5cbiAqIGBgYGh0bWxcbiAqIDxkaXYgaWQ9XCJmbGlja1wiPlxuICogXHQ8ZGl2PjxwPnBhbmVsIDA8L3A+PC9kaXY+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogYGBgamF2YXNjcmlwdFxuICogLy8gSWYgdGhlIG51bWJlciBvZiBkZWZpbmVkIHBhbmVscyBpcyBsZXNzIHRoYW4gdGhlIG1pbmltdW0gbnVtYmVyIHJlcXVpcmVkIGZvciB0aGUgY2lyY3VsYXRpb24gb3BlcmF0aW9uLCB0aGUgbmVjZXNzYXJ5IG51bWJlciBvZiBwYW5lbCBlbGVtZW50cyBhcmUgZ2VuZXJhdGVkLlxuICogLy8g7KCV7J2Y65CcIO2MqOuEkOydmCDsiJjqsIAg7Iic7ZmY64+Z7J6R7JeQIO2VhOyalO2VnCDstZzshowg6rCc7IiY67O064ukIOyggeycvOuptCDtlYTsmpTtlZwg7IiY66eM7YG87J2YIO2MqOuEkCDsmpTshozqsIAg7IOd7ISx65Cc64ukLlxuICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIsIHtcbiAqIFx0Y2lyY3VsYXI6IHRydWVcbiAqIH0pXG4gKiBgYGBcbiAqIEBleGFtcGxlXG4gKiBGb3IgZXJyb3Igb2NjdXJyZW5jZSBleGFtcGxlLiBUaGVyZSBpcyBubyBwYW5lbCBlbGVtZW50LlxuICog7Jik66WYIOuwnOyDnSDsmIguIO2MqOuEkCDsmpTshozqsIAg7ZWY64KY64+EIOyXhuuKlCDqsr3smrAuXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGlkPVwiZmxpY2tcIj48L2Rpdj5cbiAqIGBgYFxuICogYGBgamF2YXNjcmlwdFxuICogdHJ5e1xuICogXHRuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG4gKiB9IGNhdGNoKGUpIHtcbiAqIFx0Ly8gQW4gZXJyb3Igb2NjdXJzIGJlY2F1c2UgdGhlcmUgYXJlIG5vIGNoaWxkIGVsZW1lbnRzIGluIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAqXHQvLyDquLDspIAg7JqU7IaM7JWI7JeQIOyekOyLnSDsmpTshozqsIAg7ZWY64KY64+EIOyXhuycvOuvgOuhnCDsl5Drn6zqsIAg67Cc7IOd7ZWc64ukLlxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsaWNraW5nIGV4dGVuZHMgTWl4aW4oQ29tcG9uZW50KS53aXRoKGV2ZW50SGFuZGxlcikge1xuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IGVsZW1lbnQgQSBiYXNlIGVsZW1lbnQgZm9yIHRoZSBlZy5GbGlja2luZyBtb2R1bGUuIFdoZW4gc3BlY2lmeWluZyBhIHZhbHVlIGFzIGEgYFN0cmluZ2AgdHlwZSwgeW91IG11c3Qgc3BlY2lmeSBhIGNzcyBzZWxlY3RvciBzdHJpbmcgdG8gc2VsZWN0IHRoZSBlbGVtZW50Ljxrbz5lZy5GbGlja2luZyDrqqjrk4jsnYQg7IKs7Jqp7ZWgIOq4sOykgCDsmpTshowuIGBTdHJpbmdg7YOA7J6F7Jy866GcIOqwkiDsp4DsoJXsi5wg7JqU7IaM66W8IOyEoO2Dne2VmOq4sCDsnITtlZwgY3NzIOyEoO2DneyekCDrrLjsnpDsl7TsnYQg7KeA7KCV7ZW07JW8IO2VnOuLpC48L2tvPlxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb24gb2JqZWN0IG9mIHRoZSBlZy5GbGlja2luZyBtb2R1bGU8a28+ZWcuRmxpY2tpbmcg66qo65OI7J2YIOyYteyFmCDqsJ3ssrQ8L2tvPlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmh3QWNjZWxlcmFibGU9dHJ1ZV0gRm9yY2UgaGFyZHdhcmUgY29tcG9zaXRpbmcuPGtvPu2VmOuTnOybqOyWtCDqsIDsho0g7IKs7JqpIOyXrOu2gC48L2tvPlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucHJlZml4PVwiZWctZmxpY2tcIl0gQSBwcmVmaXggZm9yIGNsYXNzIG5hbWVzIG9mIHRoZSBwYW5lbCBlbGVtZW50cy48a28+7Yyo64SQIOyalOyGjOydmCDtgbTrnpjsiqQg7J2066aEIOygkeuRkOyCrC48L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGVjZWxlcmF0aW9uPTAuMDAwNl0gRGVjZWxlcmF0aW9uIG9mIHRoZSBhbmltYXRpb24gd2hlcmUgYWNjZWxlcmF0aW9uIGlzIG1hbnVhbGx5IGVuYWJsZWQgYnkgdXNlci4gQSBoaWdoZXIgdmFsdWUgaW5kaWNhdGVzIHNob3J0ZXIgcnVubmluZyB0aW1lLjxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOqwgOyGjeuPhOqwgCDsoIHsmqnrkJwg7JWg64uI66mU7J207IWY7J2YIOqwkOyGjeuPhC4g6rCS7J20IOuGkuydhOyImOuhnSDslaDri4jrqZTsnbTshZgg7Iuk7ZaJIOyLnOqwhOydtCDsp6fslYTsp4Tri6QuPC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ob3Jpem9udGFsPXRydWVdIERpcmVjdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQuICh0cnVlOiBob3Jpem9udGFsLCBmYWxzZTogdmVydGljYWwpPGtvPu2MqOuEkCDsnbTrj5kg67Cp7ZalLiAodHJ1ZSDqsIDroZzrsKntlqUsIGZhbHNlIOyEuOuhnOuwqe2WpSk8L2tvPlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyPWZhbHNlXSBXaGV0aGVyIHRvIGxldCB0aGUgZmlyc3QgcGFuZWwgZmxpY2sgcmlnaHQgdG8gdGhlIGVuZCBwYW5lbCAobGV0IHRoZSBsZWZ0IHBhbmVsIGZsaWNrIGZyb20gdGhlIGVuZCBwYW5lbCB0byBtb3ZlIHRvIHRoZSBmaXJzdCBwYW5lbCkuIChUaGUgdGVybSAnY2lyY3VsYXRpb24nKTxrbz7ssqsg7Yyo64SQ7JeQ7IScIOyasCDslaHshZgg7J6F66Cl7ZWY7JesIOuBnSDtjKjrhJDroZwg7J2064+Z7ZWY6rKMIO2VoOyngOyZgCDrgZ0g7Yyo64SQ7JeQ7IScIOyasCDslaHshZgg7J6F66Cl7ZWY7JesIOyyqyDtjKjrhJDroZwg7J2064+Z7ZWg7ZWY6rKMIO2VoOyngCDsl6zrtoAuICjthrXsua0gJ+yInO2ZmCcpPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfEFycmF5fSBbb3B0aW9ucy5wcmV2aWV3UGFkZGluZz1bMCwwXV0gVGhlIHByZXZpZXcgc2l6ZSB2YWx1ZShpZiBubyB1bml0IGlzIGdpdmVuLCBkZWZhdWx0cyB0byBgcHhgKSBmb3IgdGhlIHByZXZpb3VzIG9yIG5leHQgcGFuZWwuPGJyPi0gSWYgdGhlIGRpcmVjdGlvbiBpcyBzZXQgdG8gXCJob3Jpem9udGFsXCIsIHRoZSBwcmV2aWV3IHNlY3Rpb24gd2lsbCBiZSBkaXNwbGF5ZWQgb24gdGhlIGxlZnQgYW5kIHJpZ2h0IG9mIHRoZSBwYW5lbC48YnI+LSBJZiB0aGUgZGlyZWN0aW9uIGlzIHNldCB0byBcInZlcnRpY2FsXCIsIGl0IHdpbGwgYmUgZGlzcGxheWVkIG9uIHRoZSB0b3AgYW5kIGJvdHRvbSBvZiB0aGUgcGFuZWwuPGtvPuydtOyghCDtjKjrhJDqs7wg64uk7J2MIO2MqOuEkOydhCDrr7jrpqwg67O064qUIOyYgeyXreydmCDtgazquLAg6rCSKOuLqOychOqwgCDsp4DsoJXrkJjsp4Ag7JWK64qUIOqyveyasCwgYHB4YOuhnCDsp4DsoJUpLjxicj7tjKjrhJAg7J2064+ZIOuwqe2WpeydtCDqsIDroZwg67Cp7Zal7J2066m0IO2MqOuEkCDsoozsmrDsl5AsIOyEuOuhnCDrsKntlqXsnbTrqbQg7Yyo64SQIOyDge2VmOyXkCDrr7jrpqwg67O064qUIOyYgeyXreydtCDrgpjtg4Drgpzri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ8QXJyYXl9IFtvcHRpb25zLmJvdW5jZT1bMTAsMTBdXSBUaGUgc2l6ZSB2YWx1ZSh1bml0OiBwaXhlbCkgb2YgdGhlIGJvdW5jZSBhcmVhLiBJZiBgY2lyY3VsYXI9ZmFsc2VgLCB0aGUgcGFuZWwgY2FuIGJlIG1vdmVkIGJ5IHRoaXMgdmFsdWUgd2hlbiBpbnB1dHRpbmcgYSByaWdodCBnZXN0dXJlIGluIHRoZSBmaXJzdCBwYW5lbCBvciBpbnB1dHRpbmcgYSBsZWZ0IGdlc3R1cmUgaW4gdGhlIGVuZCBwYW5lbC4gV2hlbiB0aGUgaW5wdXQgaXMgY29tcGxldGVkIHdoaWxlIG1vdmluZywgaXQgcmV0dXJucyB0byBpdHMgb3JpZ2luYWwgcG9zaXRpb24uPGtvPuuwlOyatOyKpCDsmIHsl63snZgg7YGs6riw6rCSKOuLqOychDog7ZS97IWAKS4gYGNpcmN1bGFyPWZhbHNlYOyduCDqsr3smrAsIOyyqyDtjKjrhJDsl5DshJwg7JqwIOyVoeyFmCDsnoXroKXsi5wsIOuBnSDtjKjrhJDsl5DshJwg7KKMIOyVoeyFmCDsnoXroKXsi5wg7J20IOqwkiDrp4ztgbzrp4wg7Yyo64SQ7J20IOydtOuPme2VoCDsiJgg7J6I6rOgIOydtOuPme2VnCDsg4Htg5zsl5DshJwg7J6F66Cl7J2EIOuniOy5mOuptCDsm5Drnpgg7J6Q66as66GcIOuPjOyVhOyYqOuLpC48L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGhyZXNob2xkPTQwXSBNb3ZlbWVudCB0aHJlc2hvbGQgdG8gZGVzdGluYXRpb24gcGFuZWwodW5pdDogcGl4ZWwpLiBBIHBhbmVsIGVsZW1lbnQgbXVzdCBiZSBkcmFnZ2VkIGJleW9uZCB0aGUgdGhyZXNob2xkIHRvIG1vdmUgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsLjxrbz7rqqnsoIEg7Yyo64SQ66Gc7J2YIOydtOuPmSDsnoTqs4TqsJIgKOuLqOychDog7ZS97IWAKS4g7Yyo64SQIOyalOyGjOulvCDsnoTqs4TqsJIg7J207IOB7Jy866GcIOuBjOyWtOuLpCDrhpPslYTslbzrp4zsnbQg66qp7KCBIO2MqOuEkOuhnCDsnbTrj5ntlZzri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTEwMF0gRHVyYXRpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiAodW5pdDogbXMpPGtvPu2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQuKOuLqOychDogbXMpPC9rbz5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucGFuZWxFZmZlY3Q9eCA9PiAxIC0gTWF0aC5wb3coMSAtIHgsIDMpXSBUaGUgZWFzaW5nIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGEgcGFuZWwgbW92aW5nIGFuaW1hdGlvbi4gVGhlIGRlZmF1bHQgZnVuY3Rpb24gaXMgZWFzZU91dEN1YmljLjxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmOyXkCDsoIHsmqntlaAgYGVhc2luZ2DtlajsiJguIOq4sOuzuOqwkuydgCBgZWFzZU91dEN1YmljYOydtOuLpC48L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGVmYXVsdEluZGV4PTBdIFRoZSBwYW5lbCBpbmRleCBudW1iZXIgdG8gc3BlY2lmeSB3aGVuIGluaXRpYWxpemluZyB0aGUgbW9kdWxlLiBBIHplcm8tYmFzZWQgaW50ZWdlci48a28+66qo65OIIOy0iOq4sO2ZlOyLnCDsp4DsoJXtlaAg7Yyo64SQIOyduOuNseyKpCDrsojtmLguIDDrtoDthLAg7Iuc7J6R7ZWY64qUIOygleyImC48L2tvPlxuXHQgKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5pbnB1dFR5cGU9W1widG91Y2gsXCJtb3VzZVwiXV0gVHlwZXMgb2YgaW5wdXQgZGV2aWNlcy4gKHtAbGluayBodHRwczovL25hdmVyLmdpdGh1Yi5pby9lZ2pzLWF4ZXMvcmVsZWFzZS9sYXRlc3QvZG9jL2VnLkF4ZXMuUGFuSW5wdXQuaHRtbHxlZy5BeGVzLlBhbklucHV0IFJlZmVyZW5jZX0pPGJyPi0gXCJ0b3VjaFwiOiBBIHRvdWNoIGlucHV0IGRldmljZS48YnI+LSBcIm1vdXNlXCI6IEEgbW91c2UuPGtvPuyeheugpSDsnqXsuZgg7KKF66WYLiAoe0BsaW5rIGh0dHBzOi8vbmF2ZXIuZ2l0aHViLmlvL2VnanMtYXhlcy9yZWxlYXNlL2xhdGVzdC9kb2MvZWcuQXhlcy5QYW5JbnB1dC5odG1sfGVnLkF4ZXMuUGFuSW5wdXQg7LC46rOgfSk8YnI+LSBcInRvdWNoXCI6IO2EsOy5mCDsnoXroKUg7J6l7LmYLjxicj4tIFwibW91c2VcIjog66eI7Jqw7IqkLjwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGRBbmdsZT00NV0gVGhlIHRocmVzaG9sZCB2YWx1ZSB0aGF0IGRldGVybWluZXMgd2hldGhlciB1c2VyIGlucHV0IGlzIGhvcml6b250YWwgb3IgdmVydGljYWwuICgwIH4gOTApPGtvPuyCrOyaqeyekOydmCDsnoXroKXsnbQg6rCA66GcIOuwqe2WpeyduOyngCDshLjroZwg67Cp7Zal7J247KeAIO2MkOuLqO2VmOuKlCDquLDspIAg6rCB64+EICgwIH4gOTApPC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hZGFwdGl2ZUhlaWdodD1mYWxzZV0gV2hldGhlciB0aGUgaGVpZ2h0IG9mIHRoZSBjb250YWluZXIgZWxlbWVudCByZWZsZWN0cyB0aGUgaGVpZ2h0IHZhbHVlIG9mIHRoZSBwYW5lbCBhZnRlciBjb21wbGV0aW5nIHRoZSBtb3ZlbWVudC48YnI+KE5vdGU6IG9uIEFuZHJvaWQgNC4xLnggc3RvY2sgYnJvd3NlciwgaGFzIHJlbmRlcmluZyBidWcgd2hpY2ggbm90IGNvcnJlY3RseSByZW5kZXIgaGVpZ2h0IHZhbHVlIG9uIHBhbmVsIHdpdGggc2luZ2xlIG5vZGUuIFRvIGF2b2lkIGp1c3QgYXBwZW5kIGFub3RoZXIgZW1wdHkgbm9kZSBhdCB0aGUgZW5kLik8a28+66qp7KCBIO2MqOuEkOuhnCDsnbTrj5ntlZwg7ZuEIOq3uCDtjKjrhJDsnZgg64aS7J206rCS7J2EIOy7qO2FjOydtOuEiCDsmpTshozsnZgg64aS7J206rCS7JeQIOuwmOyYge2VoOyngCDsl6zrtoAuPGJyPijssLjqs6A6IEFuZHJvaWQgNC4xLngg7Iqk7YahIOu4jOudvOyasOyggOyXkOyEnCDri6jsnbwg64W465Oc66GcIOq1rOyEseuQnCDtjKjrhJDsnZgg64aS7J206rCSIOuzgOqyveydtCDsoJzrjIDroZwg66CM642U66eBIOuQmOyngCDslYrripQg67KE6re46rCAIOyeiOydjC4g67mE7Ja07J6I64qUIOuFuOuTnOulvCDstpTqsIDtlZjrqbQg7ZW06rKw7J20IOqwgOuKpe2VmOuLpC4pPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnpJbmRleD0yMDAwXSB6LWluZGV4IHZhbHVlIGZvciBjb250YWluZXIgZWxlbWVudDxrbz7su6jthYzsnbTrhIgg7JqU7IaM7J2YIHotaW5kZXgg6rCSPC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy51c2VUcmFuc2xhdGU9dHJ1ZV0gVXNlIGNzcyB0cmFuc2xhdGUgbWV0aG9kIG9uIHBhbmVsIG1vdmVzLiBXaGVuIHNldCB0byAnZmFsc2UnLCBpdCdsbCB1c2UgdG9wL2xlZnQgaW5zdGVhZC48a28+7Yyo64SQIOydtOuPmeyLnCBDU1MgdHJhbnNsYXRlIOyCrOyaqSDsl6zrtoAuICdmYWxzZSfroZwg7ISk7KCVIOyLnCwgdG9wL2xlZnQg7IaN7ISx7J2EIOyCrOyaqTwva28+XG5cdCovXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMsIF9wcmVmaXgpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy4kd3JhcHBlciA9IHV0aWxzLiQoZWxlbWVudCk7XG5cdFx0dGhpcy5wbHVnaW5zID0gW107XG5cblx0XHRjb25zdCAkY2hpbGRyZW4gPSB0aGlzLiR3cmFwcGVyICYmIHRoaXMuJHdyYXBwZXIuY2hpbGRyZW47XG5cblx0XHRpZiAoIXRoaXMuJHdyYXBwZXIgfHwgISRjaGlsZHJlbiB8fCAhJGNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUgdmFsaWRhdGVMaW5lQnJlYWtzLCBtYXhpbXVtTGluZUxlbmd0aFxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiR2l2ZW4gYmFzZSBlbGVtZW50IGRvZXNuJ3QgZXhpc3Qgb3IgaXQgaGFzbid0IHByb3BlciBET00gc3RydWN0dXJlIHRvIGJlIGluaXRpYWxpemVkLlwiKTtcblxuXHRcdFx0Ly8gZXNsaW50LWVuYWJsZSB2YWxpZGF0ZUxpbmVCcmVha3MsIG1heGltdW1MaW5lTGVuZ3RoXG5cdFx0fVxuXG5cdFx0dGhpcy5fc2V0T3B0aW9ucyhvcHRpb25zKTtcblx0XHR0aGlzLl9zZXRDb25maWcoJGNoaWxkcmVuLCBfcHJlZml4KTtcblxuXHRcdCF1dGlscy5oYXNDbGlja0J1ZygpICYmICh0aGlzLl9zZXRQb2ludGVyRXZlbnRzID0gKCkgPT4ge30pO1xuXG5cdFx0dGhpcy5fYnVpbGQoKTtcblx0XHR0aGlzLl9iaW5kRXZlbnRzKHRydWUpO1xuXG5cdFx0dGhpcy5fYXBwbHlQYW5lbHNDc3MoKTtcblx0XHR0aGlzLl9hcnJhbmdlUGFuZWxzKCk7XG5cblx0XHR0aGlzLm9wdGlvbnMuaHdBY2NlbGVyYWJsZSAmJiBTVVBQT1JUX1dJTExDSEFOR0UgJiYgdGhpcy5fc2V0SGludCgpO1xuXHRcdHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCAmJiB0aGlzLl9zZXRBZGFwdGl2ZUhlaWdodCgpO1xuXG5cdFx0dGhpcy5fYWRqdXN0Q29udGFpbmVyQ3NzKFwiZW5kXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBvcHRpb25zIHZhbHVlc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKi9cblx0X3NldE9wdGlvbnMob3B0aW9ucykge1xuXHRcdC8vIGRlZmF1bHQgdmFsdWUgb2YgcHJldmlld1BhZGRpbmcgYW5kIGJvdW5jZVxuXHRcdGNvbnN0IGFyclZhbCA9IHtcblx0XHRcdHByZXZpZXdQYWRkaW5nOiBbMCwgMF0sXG5cdFx0XHRib3VuY2U6IFsxMCwgMTBdXG5cdFx0fTtcblxuXHRcdHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCh1dGlscy5leHRlbmQoe30sIE9QVElPTlMpLCBhcnJWYWwsIG9wdGlvbnMpO1xuXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gYXJyVmFsKSB7XG5cdFx0XHRsZXQgdmFsID0gdGhpcy5vcHRpb25zW2tleV07XG5cblx0XHRcdGlmICgvKG51bWJlcnxzdHJpbmcpLy50ZXN0KHR5cGVvZiB2YWwpKSB7XG5cdFx0XHRcdHZhbCA9IFt2YWwsIHZhbF07XG5cdFx0XHR9IGVsc2UgaWYgKCF1dGlscy5pc0FycmF5KHZhbCkpIHtcblx0XHRcdFx0dmFsID0gYXJyVmFsW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMub3B0aW9uc1trZXldID0gdmFsO1xuXHRcdH1cblxuXHRcdC8vIGJsb2NrIHVzZSBvZiB0cmFuc2xhdGUgZm9yIEFuZHJvaWQyIGVudmlyb25tZW50XG5cdFx0aWYgKElTX0FORFJPSUQyKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMudXNlVHJhbnNsYXRlID0gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBjb25maWcgdmFsdWVzXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259ICRjaGlsZHJlbiB3cmFwcGVycycgY2hpbGRyZW4gZWxlbWVudHNcblx0ICogQHBhcmFtIHtTdHJpbmd9IF9wcmVmaXggZXZlbnQgcHJlZml4XG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHQgKi9cblx0X3NldENvbmZpZygkY2hpbGRyZW4sIF9wcmVmaXgpIHtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0IHBhZGRpbmcgPSBvcHRpb25zLnByZXZpZXdQYWRkaW5nO1xuXHRcdGxldCAkbm9kZXMgPSAkY2hpbGRyZW47XG5cblx0XHRpZiAodXRpbHMuY2xhc3NMaXN0KCRub2Rlc1swXSwgYCR7b3B0aW9ucy5wcmVmaXh9LWNvbnRhaW5lcmApKSB7XG5cdFx0XHQkbm9kZXMgPSAkbm9kZXNbMF07XG5cdFx0XHR0aGlzLiRjb250YWluZXIgPSAkbm9kZXM7XG5cdFx0XHQkbm9kZXMgPSAkbm9kZXMuY2hpbGRyZW47XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0byBhcnJheVxuXHRcdCRub2RlcyA9IHV0aWxzLnRvQXJyYXkoJG5vZGVzKTtcblxuXHRcdC8vIGNvbmZpZyB2YWx1ZVxuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mID0gdXRpbHMuZXh0ZW5kKHV0aWxzLmV4dGVuZCh7fSwgQ09ORklHKSwge1xuXHRcdFx0cGFuZWw6IHtcblx0XHRcdFx0JGxpc3Q6ICRub2Rlcyxcblx0XHRcdFx0bWluQ291bnQ6IHBhZGRpbmdbMF0gKyBwYWRkaW5nWzFdID4gMCA/IDUgOiAzICAvLyBtaW5pbXVtIHBhbmVsIGNvdW50XG5cdFx0XHR9LFxuXHRcdFx0Ly8gcmVtZW1iZXIgb3JpZ2luYWwgY2xhc3MgYW5kIGlubGluZSBzdHlsZSBpbiBjYXNlIG9mIHJlc3RvcmF0aW9uIG9uIGRlc3Ryb3koKVxuXHRcdFx0b3JpZ1BhbmVsU3R5bGU6IHtcblx0XHRcdFx0d3JhcHBlcjoge1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogdGhpcy4kd3JhcHBlci5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBudWxsLFxuXHRcdFx0XHRcdHN0eWxlOiB0aGlzLiR3cmFwcGVyLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpIHx8IG51bGxcblx0XHRcdFx0fSxcblx0XHRcdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAodGhpcy4kY29udGFpbmVyICYmIHRoaXMuJGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSkgfHwgbnVsbCxcblx0XHRcdFx0XHRzdHlsZTogKHRoaXMuJGNvbnRhaW5lciAmJiB0aGlzLiRjb250YWluZXIuZ2V0QXR0cmlidXRlKFwic3R5bGVcIikpIHx8IG51bGxcblx0XHRcdFx0fSxcblx0XHRcdFx0bGlzdDogJG5vZGVzLm1hcCh2ID0+ICh7XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiB2LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IG51bGwsXG5cdFx0XHRcdFx0c3R5bGU6IHYuZ2V0QXR0cmlidXRlKFwic3R5bGVcIikgfHwgbnVsbFxuXHRcdFx0XHR9KSlcblx0XHRcdH0sXG5cdFx0XHR1c2VMYXllckhhY2s6IG9wdGlvbnMuaHdBY2NlbGVyYWJsZSAmJiAhU1VQUE9SVF9XSUxMQ0hBTkdFLFxuXHRcdFx0ZXZlbnRQcmVmaXg6IF9wcmVmaXggfHwgXCJcIlxuXHRcdH0pO1xuXG5cdFx0W1tcIkxFRlRcIiwgXCJSSUdIVFwiXSwgW1wiVVBcIiwgXCJET1dOXCJdXVsrIW9wdGlvbnMuaG9yaXpvbnRhbF1cblx0XHRcdC5mb3JFYWNoKHYgPT4gY29uZi5kaXJEYXRhLnB1c2goQXhlc1tgRElSRUNUSU9OXyR7dn1gXSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGFuZCBzZXQgcGFuZWwgbm9kZXMgdG8gbWFrZSBmbGlja2luZyBzdHJ1Y3R1cmVcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9idWlsZCgpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCAkY2hpbGRyZW4gPSBwYW5lbC4kbGlzdDtcblx0XHRjb25zdCBwYWRkaW5nID0gb3B0aW9ucy5wcmV2aWV3UGFkZGluZy5jb25jYXQoKTtcblx0XHRjb25zdCBwcmVmaXggPSBvcHRpb25zLnByZWZpeDtcblx0XHRjb25zdCBob3Jpem9udGFsID0gb3B0aW9ucy5ob3Jpem9udGFsO1xuXHRcdGxldCBwYW5lbENvdW50ID0gcGFuZWwuY291bnQgPSBwYW5lbC5vcmlnQ291bnQgPSAkY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGNvbnN0IGJvdW5jZSA9IG9wdGlvbnMuYm91bmNlO1xuXG5cdFx0dGhpcy5fc2V0UGFkZGluZyhwYWRkaW5nLCB0cnVlKTtcblx0XHRjb25zdCBzaXplVmFsdWUgPSB0aGlzLl9nZXREYXRhQnlEaXJlY3Rpb24oW3BhbmVsLnNpemUsIFwiMTAwJVwiXSk7XG5cblx0XHQvLyBjb250YWluZXIgZWxlbWVudCBzdHlsZVxuXHRcdGNvbnN0IGNzc1ZhbHVlID0ge1xuXHRcdFx0cG9zaXRpb246IFwicmVsYXRpdmVcIixcblx0XHRcdHpJbmRleDogb3B0aW9ucy56SW5kZXggfHwgMjAwMCxcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcblx0XHRcdGhlaWdodDogXCIxMDAlXCJcblx0XHR9O1xuXG5cdFx0aG9yaXpvbnRhbCAmJiAoY3NzVmFsdWUudG9wID0gXCIwcHhcIik7XG5cblx0XHRpZiAodGhpcy4kY29udGFpbmVyKSB7XG5cdFx0XHR1dGlscy5jc3ModGhpcy4kY29udGFpbmVyLCBjc3NWYWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0ICRwYXJlbnQgPSAkY2hpbGRyZW5bMF0ucGFyZW50Tm9kZTtcblx0XHRcdGNvbnN0ICRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdFx0XHQkY29udGFpbmVyLmNsYXNzTmFtZSA9IGAke3ByZWZpeH0tY29udGFpbmVyYDtcblx0XHRcdHV0aWxzLmNzcygkY29udGFpbmVyLCBjc3NWYWx1ZSk7XG5cblx0XHRcdCRjaGlsZHJlbi5mb3JFYWNoKHYgPT4gJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2KSk7XG5cblx0XHRcdCRwYXJlbnQuYXBwZW5kQ2hpbGQoJGNvbnRhaW5lcik7XG5cdFx0XHR0aGlzLiRjb250YWluZXIgPSAkY29udGFpbmVyO1xuXHRcdH1cblxuXHRcdC8vIHBhbmVscycgY3NzIHZhbHVlc1xuXHRcdCRjaGlsZHJlbi5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0dXRpbHMuY2xhc3NMaXN0KHYsIGAke3ByZWZpeH0tcGFuZWxgLCB0cnVlKTtcblxuXHRcdFx0dXRpbHMuY3NzKHYsIHtcblx0XHRcdFx0cG9zaXRpb246IFwiYWJzb2x1dGVcIixcblx0XHRcdFx0d2lkdGg6IHV0aWxzLmdldFVuaXRWYWx1ZShzaXplVmFsdWVbMF0pLFxuXHRcdFx0XHRoZWlnaHQ6IHV0aWxzLmdldFVuaXRWYWx1ZShzaXplVmFsdWVbMV0pLFxuXHRcdFx0XHRib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuXHRcdFx0XHR0b3A6IDAsXG5cdFx0XHRcdGxlZnQ6IDBcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHRoaXMuX2FkZENsb25lUGFuZWxzKCkpIHtcblx0XHRcdHBhbmVsQ291bnQgPSBwYW5lbC5jb3VudCA9IChcblx0XHRcdFx0cGFuZWwuJGxpc3QgPSB1dGlscy50b0FycmF5KHRoaXMuJGNvbnRhaW5lci5jaGlsZHJlbilcblx0XHRcdCkubGVuZ3RoO1xuXHRcdH1cblxuXHRcdC8vIGNyZWF0ZSBBeGVzIGluc3RhbmNlXG5cdFx0dGhpcy5fYXhlc0luc3QgPSBuZXcgQXhlcyh7XG5cdFx0XHRmbGljazoge1xuXHRcdFx0XHRyYW5nZTogWzAsIHBhbmVsLnNpemUgKiAocGFuZWxDb3VudCAtIDEpXSxcblx0XHRcdFx0Ym91bmNlXG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0ZWFzaW5nOiBvcHRpb25zLnBhbmVsRWZmZWN0LFxuXHRcdFx0ZGVjZWxlcmF0aW9uOiBvcHRpb25zLmRlY2VsZXJhdGlvbixcblx0XHRcdGludGVycnVwdGFibGU6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHR0aGlzLl9zZXREZWZhdWx0UGFuZWwob3B0aW9ucy5kZWZhdWx0SW5kZXgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBwcmV2aWV3IHBhZGRpbmcgdmFsdWVcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gcGFkZGluZ1xuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGJ1aWxkXG5cdCAqL1xuXHRfc2V0UGFkZGluZyhwYWRkaW5nLCBidWlsZCkge1xuXHRcdGNvbnN0ICR3cmFwcGVyID0gdGhpcy4kd3JhcHBlcjtcblx0XHRjb25zdCBob3Jpem9udGFsID0gdGhpcy5vcHRpb25zLmhvcml6b250YWw7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IHBhZGRpbmdTdW0gPSBwYWRkaW5nLnJlZHVjZSgoYSwgYykgPT4gcGFyc2VGbG9hdChhKSArIHBhcnNlRmxvYXQoYykpO1xuXHRcdGNvbnN0IGNzc1ZhbHVlID0ge307XG5cblx0XHRpZiAocGFkZGluZ1N1bSB8fCAhYnVpbGQpIHtcblx0XHRcdGhvcml6b250YWwgJiYgcGFkZGluZy5yZXZlcnNlKCk7XG5cblx0XHRcdGNzc1ZhbHVlLnBhZGRpbmcgPSBgJHtob3Jpem9udGFsID8gXCIwIFwiIDogXCJcIn0ke1xuXHRcdFx0XHQvLyBhZGQgJ3B4JyB1bml0IGlmIG5vdCBwcmVzZW50XG5cdFx0XHRcdHBhZGRpbmcubWFwKHYgPT4gKGlzTmFOKHYpID8gdiA6IGAke3Z9cHhgKSlcblx0XHRcdFx0XHQuam9pbihcIiAwIFwiKVxuXHRcdFx0fWA7XG5cdFx0fVxuXG5cdFx0aWYgKGJ1aWxkKSB7XG5cdFx0XHRjc3NWYWx1ZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cdFx0XHRjc3NWYWx1ZS5ib3hTaXppbmcgPSBcImJvcmRlci1ib3hcIjtcblx0XHR9XG5cblx0XHRPYmplY3Qua2V5cyhjc3NWYWx1ZSkubGVuZ3RoICYmIHV0aWxzLmNzcygkd3JhcHBlciwgY3NzVmFsdWUpO1xuXG5cdFx0Y29uc3QgcGFkZGluZ1R5cGUgPSBob3Jpem9udGFsID8gW1wiTGVmdFwiLCBcIlJpZ2h0XCJdIDogW1wiVG9wXCIsIFwiQm90dG9tXCJdO1xuXHRcdGNvbnN0IHdyYXBwZXJTaXplID0gTWF0aC5tYXgoXG5cdFx0XHQkd3JhcHBlcltgb2Zmc2V0JHtob3Jpem9udGFsID8gXCJXaWR0aFwiIDogXCJIZWlnaHRcIn1gXSxcblx0XHRcdHV0aWxzLmNzcygkd3JhcHBlciwgaG9yaXpvbnRhbCA/IFwid2lkdGhcIiA6IFwiaGVpZ2h0XCIsIHRydWUpXG5cdFx0KTtcblxuXHRcdHBhbmVsLnNpemUgPSB3cmFwcGVyU2l6ZSAtIChcblx0XHRcdHV0aWxzLmNzcygkd3JhcHBlciwgYHBhZGRpbmcke3BhZGRpbmdUeXBlWzBdfWAsIHRydWUpICtcblx0XHRcdHV0aWxzLmNzcygkd3JhcHBlciwgYHBhZGRpbmcke3BhZGRpbmdUeXBlWzFdfWAsIHRydWUpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUbyBmdWxmaWxsIG1pbmltdW0gcGFuZWwgY291bnQgY2xvbmluZyBvcmlnaW5hbCBub2RlIHdoZW4gY2lyY3VsYXIgb3IgcHJldmlld1BhZGRpbmcgb3B0aW9uIGFyZSBzZXRcblx0ICogQHByaXZhdGVcblx0ICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSA6IGFkZGVkIGNsb25lIG5vZGUsIGZhbHNlIDogbm90IGFkZGVkXG5cdCAqL1xuXHRfYWRkQ2xvbmVQYW5lbHMoKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IHBhbmVsQ291bnQgPSBwYW5lbC5vcmlnQ291bnQ7XG5cdFx0Y29uc3QgY2xvbmVDb3VudCA9IHBhbmVsLm1pbkNvdW50IC0gcGFuZWxDb3VudDtcblx0XHRjb25zdCBsaXN0ID0gcGFuZWwuJGxpc3Q7XG5cdFx0bGV0IGNsb25lTm9kZXM7XG5cblx0XHQvLyBpZiBwYW5lbHMgYXJlIGdpdmVuIGxlc3MgdGhhbiByZXF1aXJlZCB3aGVuIGNpcmN1bGFyIG9wdGlvbiBpcyBzZXQsIHRoZW4gY2xvbmUgbm9kZSB0byBhcHBseSBjaXJjdWxhciBtb2RlXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jaXJjdWxhciAmJiBwYW5lbENvdW50IDwgcGFuZWwubWluQ291bnQpIHtcblx0XHRcdGNsb25lTm9kZXMgPSBsaXN0Lm1hcCh2ID0+IHYuY2xvbmVOb2RlKHRydWUpKTtcblxuXHRcdFx0d2hpbGUgKGNsb25lTm9kZXMubGVuZ3RoIDwgY2xvbmVDb3VudCkge1xuXHRcdFx0XHRjbG9uZU5vZGVzID0gY2xvbmVOb2Rlcy5jb25jYXQoXG5cdFx0XHRcdFx0bGlzdC5tYXAodiA9PiB2LmNsb25lTm9kZSh0cnVlKSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Y2xvbmVOb2Rlcy5mb3JFYWNoKHYgPT4gdGhpcy4kY29udGFpbmVyLmFwcGVuZENoaWxkKHYpKTtcblxuXHRcdFx0cmV0dXJuICEhY2xvbmVOb2Rlcy5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmUgcGFuZWwncyBwb3NpdGlvbiB3aXRoaW4gYXJyYXlcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IGVsZW1lbnQgY291bnRzIHRvIG1vdmVcblx0ICogQHBhcmFtIHtCb29sZWFufSBhcHBlbmQgd2hlcmUgdGhlIGxpc3QgdG8gYmUgYXBwZW5kZWQobW92ZWQpICh0cnVlOiB0byB0aGUgZW5kLCBmYWxzZTogdG8gdGhlIGJlZ2lubmluZylcblx0ICovXG5cdF9tb3ZlUGFuZWxQb3NpdGlvbihjb3VudCwgYXBwZW5kKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IGxpc3QgPSBwYW5lbC4kbGlzdDtcblx0XHRjb25zdCBsaXN0VG9Nb3ZlID0gbGlzdC5zcGxpY2UoYXBwZW5kID8gMCA6IHBhbmVsLmNvdW50IC0gY291bnQsIGNvdW50KTtcblxuXHRcdHBhbmVsLiRsaXN0ID0gYXBwZW5kID9cblx0XHRcdGxpc3QuY29uY2F0KGxpc3RUb01vdmUpIDpcblx0XHRcdGxpc3RUb01vdmUuY29uY2F0KGxpc3QpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBkZWZhdWx0IHBhbmVsIHRvIHNob3dcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG5cdCAqL1xuXHRfc2V0RGVmYXVsdFBhbmVsKGluZGV4KSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IGxhc3RJbmRleCA9IHBhbmVsLmNvdW50IC0gMTtcblx0XHRsZXQgY29vcmRzO1xuXHRcdGxldCBiYXNlSW5kZXg7XG5cblx0XHRpZiAodGhpcy5vcHRpb25zLmNpcmN1bGFyKSB7XG5cdFx0XHQvLyBpZiBkZWZhdWx0IGluZGV4IGlzIGdpdmVuLCB0aGVuIG1vdmUgY29ycmVzcG9uZCBwYW5lbCB0byB0aGUgZmlyc3QgcG9zaXRpb25cblx0XHRcdGlmIChpbmRleCA+IDAgJiYgaW5kZXggPD0gbGFzdEluZGV4KSB7XG5cdFx0XHRcdHRoaXMuX21vdmVQYW5lbFBvc2l0aW9uKGluZGV4LCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gc2V0IGZpcnN0IHBhbmVsJ3MgcG9zaXRpb24gYWNjb3JkaW5nIHBoeXNpY2FsIG5vZGUgbGVuZ3RoXG5cdFx0XHRiYXNlSW5kZXggPSB0aGlzLl9nZXRCYXNlUG9zaXRpb25JbmRleCgpO1xuXHRcdFx0dGhpcy5fbW92ZVBhbmVsUG9zaXRpb24oYmFzZUluZGV4LCBmYWxzZSk7XG5cblx0XHRcdHRoaXMuX3NldFBhbmVsTm8oe1xuXHRcdFx0XHRubzogaW5kZXgsXG5cdFx0XHRcdGN1cnJObzogaW5kZXhcblx0XHRcdH0pO1xuXHRcdFx0Ly8gaWYgZGVmYXVsdEluZGV4IG9wdGlvbiBpcyBnaXZlbiwgdGhlbiBtb3ZlIHRvIHRoYXQgaW5kZXggcGFuZWxcblx0XHR9IGVsc2UgaWYgKGluZGV4ID4gMCAmJiBpbmRleCA8PSBsYXN0SW5kZXgpIHtcblx0XHRcdHRoaXMuX3NldFBhbmVsTm8oe1xuXHRcdFx0XHRpbmRleCxcblx0XHRcdFx0bm86IGluZGV4LFxuXHRcdFx0XHRjdXJySW5kZXg6IGluZGV4LFxuXHRcdFx0XHRjdXJyTm86IGluZGV4XG5cdFx0XHR9KTtcblxuXHRcdFx0Y29vcmRzID0gWy0ocGFuZWwuc2l6ZSAqIGluZGV4KSwgMF07XG5cblx0XHRcdHRoaXMuX3NldFRyYW5zbGF0ZShjb29yZHMpO1xuXHRcdFx0dGhpcy5fc2V0QXhlcyhcInNldFRvXCIsIE1hdGguYWJzKGNvb3Jkc1swXSksIDApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBcnJhbmdlIHBhbmVscycgcG9zaXRpb25cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtCb29sZWFufSBzb3J0IE5lZWQgdG8gc29ydCBwYW5lbCdzIHBvc2l0aW9uXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFRvTW92ZSBOdW1iZXIgdG8gbW92ZSBmcm9tIGN1cnJlbnQgcG9zaXRpb24gKG5lZ2F0aXZlOiBsZWZ0LCBwb3NpdGl2ZTogcmlnaHQpXG5cdCAqL1xuXHRfYXJyYW5nZVBhbmVscyhzb3J0LCBpbmRleFRvTW92ZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCB0b3VjaCA9IGNvbmYudG91Y2g7XG5cdFx0Y29uc3QgZGlyRGF0YSA9IGNvbmYuZGlyRGF0YTtcblx0XHRsZXQgYmFzZUluZGV4O1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jaXJjdWxhcikge1xuXHRcdFx0Ly8gd2hlbiBhcnJhbmdpbmcgcGFuZWxzLCBzZXQgZmxhZyB0byBub3QgdHJpZ2dlciBmbGljayBjdXN0b20gZXZlbnRcblx0XHRcdGNvbmYuY3VzdG9tRXZlbnQuZmxpY2sgPSBmYWxzZTtcblxuXHRcdFx0Ly8gbW92ZSBlbGVtZW50cyBhY2NvcmRpbmcgZGlyZWN0aW9uXG5cdFx0XHRpZiAoc29ydCkge1xuXHRcdFx0XHRpbmRleFRvTW92ZSAmJiAodG91Y2guZGlyZWN0aW9uID0gZGlyRGF0YVsrIShpbmRleFRvTW92ZSA+IDApXSk7XG5cdFx0XHRcdHRoaXMuX2FycmFuZ2VQYW5lbFBvc2l0aW9uKHRvdWNoLmRpcmVjdGlvbiwgaW5kZXhUb01vdmUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzZXQgaW5kZXggZm9yIGJhc2UgZWxlbWVudCdzIHBvc2l0aW9uXG5cdFx0XHRiYXNlSW5kZXggPSB0aGlzLl9nZXRCYXNlUG9zaXRpb25JbmRleCgpO1xuXG5cdFx0XHR0aGlzLl9zZXRQYW5lbE5vKHtcblx0XHRcdFx0aW5kZXg6IGJhc2VJbmRleCxcblx0XHRcdFx0Y3VyckluZGV4OiBiYXNlSW5kZXhcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBhcnJhbmdlIEF4ZXMnIGNvb3JkIHBvc2l0aW9uXG5cdFx0XHRjb25mLmN1c3RvbUV2ZW50LmZsaWNrID0gISF0aGlzLl9zZXRBeGVzKFwic2V0VG9cIiwgcGFuZWwuc2l6ZSAqIHBhbmVsLmluZGV4LCAwKTtcblx0XHR9XG5cblx0XHR0aGlzLl9hcHBseVBhbmVsc1BvcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBlYWNoIHBhbmVsJ3MgcG9zaXRpb24gaW4gRE9NXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfYXBwbHlQYW5lbHNQb3MoKSB7XG5cdFx0dGhpcy5fY29uZi5wYW5lbC4kbGlzdC5mb3JFYWNoKHRoaXMuX2FwcGx5UGFuZWxzQ3NzLmJpbmQodGhpcykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBDU1Mgc3R5bGUgdmFsdWVzIHRvIG1vdmUgZWxlbWVudHNcblx0ICpcblx0ICogSW5pdGlhbGl6ZSBzZXR0aW5nIHVwIGNoZWNraW5nIGlmIGJyb3dzZXIgc3VwcG9ydCB0cmFuc2Zvcm0gY3NzIHByb3BlcnR5LlxuXHQgKiBJZiBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCB0cmFuc2Zvcm0sIHRoZW4gdXNlIGxlZnQvdG9wIHByb3BlcnRpZXMgaW5zdGVhZC5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gJGVsXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvb3Jkc1ZhbHVlXG5cdCAqL1xuXHRfc2V0TW92ZVN0eWxlKCRlbCwgY29vcmRzVmFsdWUpIHtcblx0XHRjb25zdCB0cmFuc2Zvcm0gPSBUUkFOU0ZPUk07XG5cdFx0Y29uc3QgdXNlTGF5ZXJIYWNrID0gdGhpcy5fY29uZi51c2VMYXllckhhY2s7XG5cblx0XHR0aGlzLl9zZXRNb3ZlU3R5bGUgPSB0cmFuc2Zvcm0uc3VwcG9ydCA/XG5cdFx0XHQoJGVsZW1lbnQsIGNvb3JkcykgPT4ge1xuXHRcdFx0XHR1dGlscy5jc3MoJGVsZW1lbnQsIHtcblx0XHRcdFx0XHRbdHJhbnNmb3JtLm5hbWVdOiB1dGlscy50cmFuc2xhdGUoY29vcmRzWzBdLCBjb29yZHNbMV0sIHVzZUxheWVySGFjaylcblx0XHRcdFx0fSk7XG5cdFx0XHR9IDogKCRlbGVtZW50LCBjb29yZHMpID0+IHtcblx0XHRcdFx0dXRpbHMuY3NzKCRlbGVtZW50LCB7bGVmdDogY29vcmRzWzBdLCB0b3A6IGNvb3Jkc1sxXX0pO1xuXHRcdFx0fTtcblxuXHRcdHRoaXMuX3NldE1vdmVTdHlsZSgkZWwsIGNvb3Jkc1ZhbHVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsYmFjayBmdW5jdGlvbiBmb3IgYXBwbHlpbmcgQ1NTIHZhbHVlcyB0byBlYWNoIHBhbmVsc1xuXHQgKiBOZWVkIHRvIGJlIGluaXRpYWxpemVkIGJlZm9yZSB1c2UsIHRvIHNldCB1cCBmb3IgQW5kcm9pZCAyLnggYnJvd3NlcnMgb3Igb3RoZXJzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2FwcGx5UGFuZWxzQ3NzKCkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IGR1bW15QW5jaG9yQ2xhc3NOYW1lID0gXCJfX2R1bW15X2FuY2hvclwiO1xuXHRcdGNvbnN0IHVzZVRyYW5zbGF0ZSA9IHRoaXMub3B0aW9ucy51c2VUcmFuc2xhdGU7XG5cblx0XHRpZiAoIXVzZVRyYW5zbGF0ZSkge1xuXHRcdFx0aWYgKElTX0FORFJPSUQyKSB7XG5cdFx0XHRcdGNvbmYuJGR1bW15QW5jaG9yID0gdXRpbHMuJChgLiR7ZHVtbXlBbmNob3JDbGFzc05hbWV9YCk7XG5cblx0XHRcdFx0IWNvbmYuJGR1bW15QW5jaG9yICYmIHRoaXMuJHdyYXBwZXIuYXBwZW5kQ2hpbGQoXG5cdFx0XHRcdFx0Y29uZi4kZHVtbXlBbmNob3IgPSB1dGlscy4kKGA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCIke2R1bW15QW5jaG9yQ2xhc3NOYW1lfVwiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjBweDt3aWR0aDowcHhcIj5gKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9hcHBseVBhbmVsc0NzcyA9IGZ1bmN0aW9uKHYsIGkpIHtcblx0XHRcdFx0Y29uc3QgY29vcmRzID0gdGhpcy5fZ2V0RGF0YUJ5RGlyZWN0aW9uKFxuXHRcdFx0XHRcdFtgJHt0aGlzLl9jb25mLnBhbmVsLnNpemUgKiBpfXB4YCwgMF1cblx0XHRcdFx0KTtcblxuXHRcdFx0XHR1dGlscy5jc3Modiwge1xuXHRcdFx0XHRcdGxlZnQ6IGNvb3Jkc1swXSxcblx0XHRcdFx0XHR0b3A6IGNvb3Jkc1sxXVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2FwcGx5UGFuZWxzQ3NzID0gZnVuY3Rpb24odiwgaSkge1xuXHRcdFx0XHRjb25zdCBjb29yZHMgPSB0aGlzLl9nZXREYXRhQnlEaXJlY3Rpb24oW1xuXHRcdFx0XHRcdFRSQU5TRk9STS5zdXBwb3J0ID9cblx0XHRcdFx0XHRcdGAkezEwMCAqIGl9JWAgOlxuXHRcdFx0XHRcdFx0YCR7dGhpcy5fY29uZi5wYW5lbC5zaXplICogaX1weGAsIDBcblx0XHRcdFx0XSk7XG5cblx0XHRcdFx0dGhpcy5fc2V0TW92ZVN0eWxlKHYsIGNvb3Jkcyk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBZGp1c3QgY29udGFpbmVyJ3MgY3NzIHZhbHVlIHRvIGhhbmRsZSBBbmRyb2lkIDIueCBsaW5rIGhpZ2hsaWdodGluZyBidWdcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHBoYXNlXG5cdCAqICAgIHN0YXJ0IC0gc2V0IGxlZnQvdG9wIHZhbHVlIHRvIDBcblx0ICogICAgZW5kIC0gc2V0IHRyYW5zbGF0ZSB2YWx1ZSB0byAwXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHRvVmFsdWUgY29vcmRpbmF0ZSB2YWx1ZVxuXHQgKi9cblx0X2FkanVzdENvbnRhaW5lckNzcyhwaGFzZSwgdG9WYWx1ZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0IHVzZVRyYW5zbGF0ZSA9IG9wdGlvbnMudXNlVHJhbnNsYXRlO1xuXHRcdGNvbnN0IGhvcml6b250YWwgPSBvcHRpb25zLmhvcml6b250YWw7XG5cdFx0Y29uc3QgcGFkZGluZ1RvcCA9IG9wdGlvbnMucHJldmlld1BhZGRpbmdbMF07XG5cdFx0bGV0IGNvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lcjtcblx0XHRsZXQgdG8gPSB0b1ZhbHVlO1xuXHRcdGxldCB2YWx1ZTtcblxuXHRcdGlmICghdXNlVHJhbnNsYXRlKSB7XG5cdFx0XHRpZiAoIXRvKSB7XG5cdFx0XHRcdHRvID0gLXBhbmVsLnNpemUgKiBwYW5lbC5pbmRleDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHBoYXNlID09PSBcInN0YXJ0XCIpIHtcblx0XHRcdFx0Y29udGFpbmVyID0gY29udGFpbmVyLnN0eWxlO1xuXHRcdFx0XHR2YWx1ZSA9IHBhcnNlRmxvYXQoY29udGFpbmVyW2hvcml6b250YWwgPyBcImxlZnRcIiA6IFwidG9wXCJdKTtcblxuXHRcdFx0XHRpZiAoaG9yaXpvbnRhbCkge1xuXHRcdFx0XHRcdHZhbHVlICYmIChjb250YWluZXIubGVmdCA9IFwiMHB4XCIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlICE9PSBwYWRkaW5nVG9wICYmIChjb250YWluZXIudG9wID0gXCIwcHhcIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9zZXRUcmFuc2xhdGUoWy10bywgMF0pO1xuXHRcdFx0fSBlbHNlIGlmIChwaGFzZSA9PT0gXCJlbmRcIikge1xuXHRcdFx0XHR0byA9IHRoaXMuX2dldENvb3Jkc1ZhbHVlKFt0bywgMF0pO1xuXG5cdFx0XHRcdHV0aWxzLmNzcyhjb250YWluZXIsIHtcblx0XHRcdFx0XHRsZWZ0OiB0by54LFxuXHRcdFx0XHRcdHRvcDogdG8ueSxcblx0XHRcdFx0XHRbVFJBTlNGT1JNLm5hbWVdOiB1dGlscy50cmFuc2xhdGUoMCwgMCwgY29uZi51c2VMYXllckhhY2spXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGNvbmYuJGR1bW15QW5jaG9yICYmIGNvbmYuJGR1bW15QW5jaG9yLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBBeGVzIGNvb3JkIHZhbHVlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2Rcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGZsaWNrIGRlc3RpbmF0aW9uIHZhbHVlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuXHQgKiBAcmV0dXJuIHtlZy5BeGVzfSBBeGVzIGluc3RhbmNlXG5cdCAqL1xuXHRfc2V0QXhlcyhtZXRob2QsIGZsaWNrLCBkdXJhdGlvbikge1xuXHRcdHJldHVybiB0aGlzLl9heGVzSW5zdFttZXRob2RdKHtmbGlja30sIGR1cmF0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgaGludCBmb3IgYnJvd3NlciB0byBkZWNpZGUgZWZmaWNpZW50IHdheSBvZiBkb2luZyB0cmFuc2Zvcm0gY2hhbmdlcyhvciBhbmltYXRpb24pXG5cdCAqIGh0dHBzOi8vZGV2Lm9wZXJhLmNvbS9hcnRpY2xlcy9jc3Mtd2lsbC1jaGFuZ2UtcHJvcGVydHkvXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfc2V0SGludCgpIHtcblx0XHRjb25zdCBzdHlsZSA9IHt3aWxsQ2hhbmdlOiBcInRyYW5zZm9ybVwifTtcblxuXHRcdHV0aWxzLmNzcyh0aGlzLiRjb250YWluZXIsIHN0eWxlKTtcblx0XHR1dGlscy5jc3ModGhpcy5fY29uZi5wYW5lbC4kbGlzdCwgc3R5bGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBkYXRhIGFjY29yZGluZyBvcHRpb25zLmhvcml6b250YWwgdmFsdWVcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gdmFsdWUgcHJpbWFyeSBkYXRhIHRvIGhhbmRsZVxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cdF9nZXREYXRhQnlEaXJlY3Rpb24odmFsdWUpIHtcblx0XHRjb25zdCBkYXRhID0gdmFsdWUuY29uY2F0KCk7XG5cblx0XHQhdGhpcy5vcHRpb25zLmhvcml6b250YWwgJiYgZGF0YS5yZXZlcnNlKCk7XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZSBub2Rlc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGRpcmVjdGlvblxuXHQgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhUb01vdmVcblx0ICovXG5cdF9hcnJhbmdlUGFuZWxQb3NpdGlvbihkaXJlY3Rpb24sIGluZGV4VG9Nb3ZlKSB7XG5cdFx0Y29uc3QgbmV4dCA9IGRpcmVjdGlvbiA9PT0gdGhpcy5fY29uZi5kaXJEYXRhWzBdO1xuXG5cdFx0dGhpcy5fbW92ZVBhbmVsUG9zaXRpb24oTWF0aC5hYnMoaW5kZXhUb01vdmUgfHwgMSksIG5leHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYmFzZSBwb3NpdGlvbiBpbmRleCBvZiB0aGUgcGFuZWxcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9nZXRCYXNlUG9zaXRpb25JbmRleCgpIHtcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih0aGlzLl9jb25mLnBhbmVsLmNvdW50IC8gMiAtIDAuMSk7XG5cdH1cblxuXHQvKipcblx0ICogQmluZCBldmVudHNcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtCb29sZWFufSBiaW5kXG5cdCAqL1xuXHRfYmluZEV2ZW50cyhiaW5kKSB7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCAkd3JhcHBlciA9IHRoaXMuJHdyYXBwZXI7XG5cdFx0Y29uc3QgYXhlc0luc3QgPSB0aGlzLl9heGVzSW5zdDtcblxuXHRcdGlmIChiaW5kKSB7XG5cdFx0XHR0aGlzLl9wYW5JbnB1dCA9IG5ldyBQYW5JbnB1dCgkd3JhcHBlciwge1xuXHRcdFx0XHRpbnB1dFR5cGU6IG9wdGlvbnMuaW5wdXRUeXBlLFxuXHRcdFx0XHR0aHJlc2hvbGRBbmdsZTogb3B0aW9ucy50aHJlc2hvbGRBbmdsZSxcblx0XHRcdFx0c2NhbGU6IHRoaXMuX2dldERhdGFCeURpcmVjdGlvbihbLTEsIDBdKVxuXHRcdFx0fSk7XG5cblx0XHRcdGF4ZXNJbnN0Lm9uKHtcblx0XHRcdFx0aG9sZDogdGhpcy5faG9sZEhhbmRsZXIuYmluZCh0aGlzKSxcblx0XHRcdFx0Y2hhbmdlOiB0aGlzLl9jaGFuZ2VIYW5kbGVyLmJpbmQodGhpcyksXG5cdFx0XHRcdHJlbGVhc2U6IHRoaXMuX3JlbGVhc2VIYW5kbGVyLmJpbmQodGhpcyksXG5cdFx0XHRcdGFuaW1hdGlvblN0YXJ0OiB0aGlzLl9hbmltYXRpb25TdGFydEhhbmRsZXIuYmluZCh0aGlzKSxcblx0XHRcdFx0YW5pbWF0aW9uRW5kOiB0aGlzLl9hbmltYXRpb25FbmRIYW5kbGVyLmJpbmQodGhpcylcblx0XHRcdH0pLmNvbm5lY3QodGhpcy5fZ2V0RGF0YUJ5RGlyZWN0aW9uKFtcImZsaWNrXCIsIFwiXCJdKSwgdGhpcy5fcGFuSW5wdXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmRpc2FibGVJbnB1dCgpO1xuXHRcdFx0YXhlc0luc3Qub2ZmKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBjb250YWluZXIncyBoZWlnaHQgdmFsdWUgYWNjb3JkaW5nIHRvIGNoaWxkcmVuJ3MgaGVpZ2h0XG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaXJlY3Rpb25cblx0ICovXG5cdF9zZXRBZGFwdGl2ZUhlaWdodChkaXJlY3Rpb24pIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBpbmRleFRvTW92ZSA9IGNvbmYuaW5kZXhUb01vdmU7XG5cdFx0bGV0ICRjaGlsZHJlbjtcblx0XHRsZXQgaGVpZ2h0O1xuXG5cdFx0Y29uc3QgJHBhbmVsID0gaW5kZXhUb01vdmUgPT09IDAgP1xuXG5cdFx0XHQvLyBwYW5lbCBtb3ZlZCBieSAxXG5cdFx0XHR0aGlzW2BnZXQke1xuXHRcdFx0XHQoZGlyZWN0aW9uID09PSBBeGVzLkRJUkVDVElPTl9MRUZUICYmIFwiTmV4dFwiKSB8fFxuXHRcdFx0XHQoZGlyZWN0aW9uID09PSBBeGVzLkRJUkVDVElPTl9SSUdIVCAmJiBcIlByZXZcIikgfHwgXCJcIlxuXHRcdFx0fUVsZW1lbnRgXSgpIDpcblxuXHRcdFx0Ly8gcGFuZWwgbW92ZWQgYnkgLm1vdmVUbygpXG5cdFx0XHRjb25mLnBhbmVsLiRsaXN0W1xuXHRcdFx0XHRjb25mLnBhbmVsLmN1cnJJbmRleCArIGluZGV4VG9Nb3ZlXG5cdFx0XHRdO1xuXG5cdFx0Y29uc3QgJGZpcnN0ID0gJHBhbmVsLnF1ZXJ5U2VsZWN0b3IoXCI6Zmlyc3QtY2hpbGRcIik7XG5cblx0XHRpZiAoJGZpcnN0KSB7XG5cdFx0XHRoZWlnaHQgPSAkZmlyc3QuZ2V0QXR0cmlidXRlKERBVEFfSEVJR0hUKTtcblxuXHRcdFx0aWYgKCFoZWlnaHQpIHtcblx0XHRcdFx0JGNoaWxkcmVuID0gJHBhbmVsLmNoaWxkcmVuO1xuXG5cdFx0XHRcdGhlaWdodCA9IHV0aWxzLm91dGVySGVpZ2h0KFxuXHRcdFx0XHRcdCRjaGlsZHJlbi5sZW5ndGggPiAxID8gKCRwYW5lbC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIiwgJHBhbmVsKSA6ICRmaXJzdFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGhlaWdodCA+IDAgJiYgJGZpcnN0LnNldEF0dHJpYnV0ZShEQVRBX0hFSUdIVCwgaGVpZ2h0KTtcblx0XHRcdH1cblxuXHRcdFx0aGVpZ2h0ID4gMCAmJiAodGhpcy4kd3JhcHBlci5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVHJpZ2dlciBiZWZvcmVSZXN0b3JlIGV2ZW50XG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBlIGV2ZW50IG9iamVjdFxuXHQgKi9cblx0X3RyaWdnZXJCZWZvcmVSZXN0b3JlKGUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCB0b3VjaCA9IGNvbmYudG91Y2g7XG5cblx0XHQvLyByZXZlcnNlIGRpcmVjdGlvbiB2YWx1ZSB3aGVuIHJlc3RvcmVcblx0XHR0b3VjaC5kaXJlY3Rpb24gPSArY29uZi5kaXJEYXRhLmpvaW4oXCJcIikucmVwbGFjZSh0b3VjaC5kaXJlY3Rpb24sIFwiXCIpO1xuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBldmVudCBvY2N1cnMgYmVmb3JlIHRoZSBjdXJyZW50IHBhbmVsIHN0YXJ0cyB0byByZXR1cm4gdG8gaXRzIG9yaWdpbmFsIHBvc2l0aW9uLiBGb2xsb3dlcyBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfSBhbmQgW3Jlc3RvcmVde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OnJlc3RvcmV9IGV2ZW50cy4gVGhlIGNvbmRpdGlvbnMgb2Ygb2NjdXJyZW5jZSBhcmUgYXMgZm9sbG93cy48YnI+PGJyPjEuIFRoZSB1c2VyIGhhcyBmaW5pc2hlZCBpbnB1dCBidXQgZG9lcyBub3QgZXhjZWVkIHRoZSBwYW5lbCBtb3ZlbWVudCB0aHJlc2hvbGQuPGJyPjIuIENhbGwgdGhlIFtyZXN0b3JlKClde0BsaW5rIGVnLkZsaWNraW5nI3Jlc3RvcmV9IG1ldGhvZC4gKFByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSBldmVudC4pXG5cdFx0ICogQGtvIO2YhOyerCDtjKjrhJDsnbQg7JuQ656YIOychOy5mOuhnCDrkJjrj4zslYTqsIDquLAg7Iuc7J6R7KCE7JeQIOuwnOyDne2VmOuKlCDsnbTrsqTtirjsnbTri6QuIOuSpOydtOyWtCBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfeqzvCBbcmVzdG9yZV17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6cmVzdG9yZX3snbTrsqTtirjqsIAg67Cc7IOd7ZWc64ukLiDrsJzsg53sobDqsbTsnYAg7JWE656Y7JmAIOqwmeuLpC48YnI+PGJyPjEuIOyCrOyaqeyekCDsnoXroKXsnbQg64Gd64Ks64qU642wIO2MqOuEkCDsnbTrj5kg7J6E6rOE7KCQ7J2EIOuEmOyngCDslYrsnYAg6rK97JqwLjxicj4yLiBbcmVzdG9yZSgpXXtAbGluayBlZy5GbGlja2luZyNyZXN0b3JlfSDrqZTshJzrk5wg7Zi47LacLihbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH0g7J2067Kk7Yq47J2YIOq4sOuzuOuPmeyekSDrsKnsp4Ag7KCE7KCcKVxuXHRcdCAqIEBuYW1lIGVnLkZsaWNraW5nI2JlZm9yZVJlc3RvcmVcblx0XHQgKiBAZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge1N0cmluZ30gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudCA8a28+7J2067Kk7Yq4IOuqhTwva28+XG5cdFx0ICogQHByb3BlcnR5IHtCb29sZWFufSBpc1RydXN0ZWQgYHRydWVgIHdoZW4gdGhlIGV2ZW50IHdhcyBnZW5lcmF0ZWQgYnkgYSB1c2VyIGFjdGlvbihcIm1vdXNlXCIgb3IgXCJ0b3VjaFwiKSBvdGhlcndpc2UgYGZhbHNlYC48a28+7IKs7Jqp7J6QIOyVoeyFmChcIm1vdXNlXCIg65iQ64qUIFwidG91Y2hcIinsl5Ag7J2Y7ZW0IOydtOuypO2KuOqwgCDsg53shLHrkJwg6rK97JqwIGB0cnVlYC4g6re4IOyZuOuKlCBgZmFsc2VgLjwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IG5vIEluZGV4IG51bWJlciBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50LiBTZWUgdGhlIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH0gbWV0aG9kLjxrbz7tmITsnqwg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi4LiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh966mU7ISc65OcIOywuOyhsC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaXJlY3Rpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiBJZiBgaG9yaXpvbnRhbD10cnVlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBJZiBgaG9yaXpvbnRhbD1mYWxzZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48a28+7Yyo64SQIOydtOuPmSDrsKntlqUuIGBob3Jpem9udGFsPXRydWVgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gYGhvcml6b250YWw9ZmFsc2VgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkZXBhUG9zIFN0YXJ0aW5nIGNvb3JkaW5hdGUuIDxrbz7stpzrsJzsoJAg7KKM7ZGcLjwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRlc3RQb3MgRGVzdGluYXRpb24gY29vcmRpbmF0ZS4gPGtvPuuPhOywqeygkCDsooztkZwuPC9rbz5cblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrXG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpyZXN0b3JlXG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNyZXN0b3JlXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyBUaGUgb3JkZXIgb2YgZXZlbnQgb2NjdXJyZW5jZS5cblx0XHQgKiAvLyDsnbTrsqTtirgg67Cc7IOdIOyInOyEnFxuXHRcdCAqIGJlZm9yZVJlc3RvcmUgKG9uY2UpID4gZmxpY2sgKG1hbnkgdGltZXMpID4gcmVzdG9yZSAob25jZSlcblx0XHQgKi9cblx0XHRjb25mLmN1c3RvbUV2ZW50LnJlc3RvcmUgPSB0aGlzLl90cmlnZ2VyRXZlbnQoRVZFTlRTLmJlZm9yZVJlc3RvcmUsIHtcblx0XHRcdGRlcGFQb3M6IGUuZGVwYVBvcy5mbGljayxcblx0XHRcdGRlc3RQb3M6IGUuZGVzdFBvcy5mbGlja1xuXHRcdH0pO1xuXG5cdFx0aWYgKCFjb25mLmN1c3RvbUV2ZW50LnJlc3RvcmUpIHtcblx0XHRcdFwic3RvcFwiIGluIGUgJiYgZS5zdG9wKCk7XG5cdFx0XHRjb25mLnBhbmVsLmFuaW1hdGluZyA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUcmlnZ2VyIHJlc3RvcmUgZXZlbnRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF90cmlnZ2VyUmVzdG9yZSgpIHtcblx0XHRjb25zdCBjdXN0b21FdmVudCA9IHRoaXMuX2NvbmYuY3VzdG9tRXZlbnQ7XG5cblx0XHQvKipcblx0XHQgKiBUaGUgZXZlbnQgdGhhdCBvY2N1cnMgYWZ0ZXIgY29tcGxldGluZyB0aGUgbW92ZSBieSBbcmVzdG9yZSgpXXtAbGluayBlZy5GbGlja2luZyNyZXN0b3JlfSBtZXRob2QuXG5cdFx0ICogQGtvIFtyZXN0b3JlKClde0BsaW5rIGVnLkZsaWNraW5nI3Jlc3RvcmV9IOuplOyEnOuTnOyXkCDsnZjtlbQg7Yyo64SQ7J20IOybkOuemCDsnITsuZjroZwg7J2064+Z7J2EIOyZhOujjO2VnCDri6TsnYwg67Cc7IOd7ZWY64qUIOydtOuypO2KuC5cblx0XHQgKiBAbmFtZSBlZy5GbGlja2luZyNyZXN0b3JlXG5cdFx0ICogQGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtTdHJpbmd9IGV2ZW50VHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgPGtvPuydtOuypO2KuCDrqoU8L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNUcnVzdGVkIGB0cnVlYCB3aGVuIHRoZSBldmVudCB3YXMgZ2VuZXJhdGVkIGJ5IGEgdXNlciBhY3Rpb24oXCJtb3VzZVwiIG9yIFwidG91Y2hcIikgb3RoZXJ3aXNlIGBmYWxzZWAuPGtvPuyCrOyaqeyekCDslaHshZgoXCJtb3VzZVwiIOuYkOuKlCBcInRvdWNoXCIp7JeQIOydmO2VtCDsnbTrsqTtirjqsIAg7IOd7ISx65CcIOqyveyasCBgdHJ1ZWAuIOq3uCDsmbjripQgYGZhbHNlYC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBubyBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gU2VlIHRoZSBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IG1ldGhvZC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGlyZWN0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudC4gSWYgYGhvcml6b250YWw9dHJ1ZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gSWYgYGhvcml6b250YWw9ZmFsc2VgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPGtvPu2MqOuEkCDsnbTrj5kg67Cp7ZalLiBgaG9yaXpvbnRhbD10cnVlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIGBob3Jpem9udGFsPWZhbHNlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPC9rbz5cblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZVJlc3RvcmVcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrXG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNyZXN0b3JlXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiAvLyBUaGUgb3JkZXIgb2YgZXZlbnQgb2NjdXJyZW5jZS5cblx0XHQgKiAvLyDsnbTrsqTtirgg67Cc7IOdIOyInOyEnFxuXHRcdCAqIGJlZm9yZVJlc3RvcmUgKG9uY2UpID4gZmxpY2sgKG1hbnkgdGltZXMpID4gcmVzdG9yZSAob25jZSlcblx0XHQgKi9cblx0XHRjdXN0b21FdmVudC5yZXN0b3JlICYmIHRoaXMuX3RyaWdnZXJFdmVudChFVkVOVFMucmVzdG9yZSk7XG5cdFx0Y3VzdG9tRXZlbnQucmVzdG9yZSA9IGN1c3RvbUV2ZW50LnJlc3RvcmVDYWxsID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHZhbHVlIHdoZW4gcGFuZWwgY2hhbmdlc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcGhhc2UgLSBbc3RhcnR8ZW5kXVxuXHQgKiBAcGFyYW0ge09iamVjdH0gcG9zXG5cdCAqL1xuXHRfc2V0UGhhc2VWYWx1ZShwaGFzZSwgcG9zKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCBwYW5lbCA9IGNvbmYucGFuZWw7XG5cdFx0Y29uc3QgdXNlVHJhbnNsYXRlID0gb3B0aW9ucy51c2VUcmFuc2xhdGU7XG5cblx0XHRpZiAocGhhc2UgPT09IFwic3RhcnRcIiAmJiAocGFuZWwuY2hhbmdlZCA9IHRoaXMuX2lzTW92YWJsZSgpKSkge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBBbiBldmVudCB0aGF0IG9jY3VycyBiZWZvcmUgYSB1c2VyIGFjdGlvbiBvciBbbW92ZVRvKClde0BsaW5rIGVnLkZsaWNraW5nI21vdmVUb30sIFtwcmV2KClde0BsaW5rIGVnLkZsaWNraW5nI3ByZXZ9LCBbbmV4dCgpXXtAbGluayBlZy5GbGlja2luZyNuZXh0fSBtZXRob2QgaW5pdGlhdGVzIGEgbW92ZSB0byB0aGUgZGVzdGluYXRpb24gcGFuZWwuIElmIHlvdSBkbyBub3QgcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvciwgdGhlbiBtYW55IFtmbGlja117QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2t9IGV2ZW50cyBhbmQgb25lIFtmbGlja0VuZF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmR9IGV2ZW50IHdpbGwgb2NjdXIuXG5cdFx0XHQgKiBAa28g7IKs7Jqp7J6QIOyVoeyFmCDtmLnsnYAgW21vdmVUbygpXXtAbGluayBlZy5GbGlja2luZyNtb3ZlVG99LCBbcHJldigpXXtAbGluayBlZy5GbGlja2luZyNwcmV2fSwgW25leHQoKV17QGxpbmsgZWcuRmxpY2tpbmcjbmV4dH0g66mU7ISc65Oc7JeQIOydmO2VtCDrqqnsoIEg7Yyo64SQ66Gc7J2YIOydtOuPmSDsi5zsnpHsoIQg67Cc7IOd7ZWY64qUIOydtOuypO2KuC4g6riw67O464+Z7J6R7J2EIOunieyngCDslYrripTri6TrqbQg65Kk7J207Ja0IOuLpOyImOydmCBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfeydtOuypO2KuOyZgCDqt7gg65KkIO2VnCDrsojsnZggW2ZsaWNrRW5kXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja0VuZH3snbTrsqTtirjqsIAg67Cc7IOd7ZWc64ukLlxuXHRcdFx0ICogQG5hbWUgZWcuRmxpY2tpbmcjYmVmb3JlRmxpY2tTdGFydFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAcHJvcGVydHkge1N0cmluZ30gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudCA8a28+7J2067Kk7Yq4IOuqhTwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVHJ1c3RlZCBgdHJ1ZWAgd2hlbiB0aGUgZXZlbnQgd2FzIGdlbmVyYXRlZCBieSBhIHVzZXIgYWN0aW9uKFwibW91c2VcIiBvciBcInRvdWNoXCIpIG90aGVyd2lzZSBgZmFsc2VgLjxrbz7sgqzsmqnsnpAg7JWh7IWYKFwibW91c2VcIiDrmJDripQgXCJ0b3VjaFwiKeyXkCDsnZjtlbQg7J2067Kk7Yq46rCAIOyDneyEseuQnCDqsr3smrAgYHRydWVgLiDqt7gg7Jm464qUIGBmYWxzZWA8L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IG5vIEluZGV4IG51bWJlciBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50LiBTZWUgdGhlIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH0gbWV0aG9kLjxrbz7tmITsnqwg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi4LiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh966mU7ISc65OcIOywuOyhsC48L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpcmVjdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQuIElmIGBob3Jpem9udGFsPXRydWVgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIElmIGBob3Jpem9udGFsPWZhbHNlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljxrbz7tjKjrhJAg7J2064+ZIOuwqe2WpS4gYGhvcml6b250YWw9dHJ1ZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBgaG9yaXpvbnRhbD1mYWxzZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGVwYVBvcyBTdGFydGluZyBjb29yZGluYXRlLiA8a28+7Lac67Cc7KCQIOyijO2RnC48L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRlc3RQb3MgRGVzdGluYXRpb24gY29vcmRpbmF0ZS4gPGtvPuuPhOywqeygkCDsooztkZwuPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHN0b3AgQ2FuY2VscyB0aGUgZGVmYXVsdCBhY3Rpb24uIChEZWZhdWx0IGFjdGlvbjogTW92ZSB0byBkZXN0aW5hdGlvbiBwYW5lbC4pIFRoZSBwYW5lbCBlbGVtZW50IHN0YXlzIGF0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2FsbCB0byBgc3RvcCgpYC4gVG8gcmV0dXJuIHRvIHRoZSBvcmlnaW5hbCBwb3NpdGlvbiwgeW91IG11c3QgY2FsbCB0aGUgW3Jlc3RvcmUoKV17QGxpbmsgZWcuRmxpY2tpbmcjcmVzdG9yZX0gbWV0aG9kLjxrbz7quLDrs7jrj5nsnpHsnYQg7Leo7IaM7ZWc64ukLiAo6riw67O464+Z7J6ROiDrqqnsoIEg7Yyo64SQ66Gc7J2YIOydtOuPmS4pIO2MqOuEkCDsmpTshozqsIAgYHN0b3AoKWDtmLjstpzsi5zsoJDsnZgg7JyE7LmY7JeQIOuouOusvOufrCDsnojripTri6QuIOybkOuemCDsnpDrpqzroZwg65CY64+M66as66Ck66m0IFtyZXN0b3JlKClde0BsaW5rIGVnLkZsaWNraW5nI3Jlc3RvcmV9IOuplOyEnOuTnOulvCDtmLjstpztlbTslbwg7ZWc64ukLjwva28+XG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrXG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrRW5kXG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI21vdmVUb1xuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNwcmV2XG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI25leHRcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAvLyBUaGUgb3JkZXIgb2YgZXZlbnQgb2NjdXJyZW5jZS5cblx0XHRcdCAqIC8vIOydtOuypO2KuCDrsJzsg50g7Iic7IScXG5cdFx0XHQgKiBiZWZvcmVGbGlja1N0YXJ0IChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IGZsaWNrRW5kIChvbmNlKVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIC8vIEFuIGV4YW1wbGUgdG8gcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvci5cblx0XHRcdCAqIC8vIOq4sOuzuOuPmeyekeydhCDrp4nripQg7JiILlxuXHRcdFx0ICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpLm9uKFwiYmVmb3JlRmxpY2tTdGFydFwiLCBlID0+IHtcblx0XHRcdCAqIFx0ZS5zdG9wKCk7XG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqL1xuXHRcdFx0aWYgKCF0aGlzLl90cmlnZ2VyRXZlbnQoRVZFTlRTLmJlZm9yZUZsaWNrU3RhcnQsIHBvcykpIHtcblx0XHRcdFx0cGFuZWwuY2hhbmdlZCA9IHBhbmVsLmFuaW1hdGluZyA9IGZhbHNlO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zLmFkYXB0aXZlSGVpZ2h0ICYmIHRoaXMuX3NldEFkYXB0aXZlSGVpZ2h0KGNvbmYudG91Y2guZGlyZWN0aW9uKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uZi5pbmRleFRvTW92ZSA9PT0gMCAmJiB0aGlzLl9zZXRQYW5lbE5vKCk7XG5cdFx0fSBlbHNlIGlmIChwaGFzZSA9PT0gXCJlbmRcIikge1xuXHRcdFx0aWYgKG9wdGlvbnMuY2lyY3VsYXIgJiYgcGFuZWwuY2hhbmdlZCkge1xuXHRcdFx0XHR0aGlzLl9hcnJhbmdlUGFuZWxzKHRydWUsIGNvbmYuaW5kZXhUb01vdmUpO1xuXHRcdFx0fVxuXG5cdFx0XHR1c2VUcmFuc2xhdGUgJiYgdGhpcy5fc2V0VHJhbnNsYXRlKFstcGFuZWwuc2l6ZSAqIHBhbmVsLmluZGV4LCAwXSk7XG5cdFx0XHRjb25mLnRvdWNoLmRpc3RhbmNlID0gY29uZi5pbmRleFRvTW92ZSA9IDA7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIGV2ZW50IHRoYXQgb2NjdXJzIGFmdGVyIGNvbXBsZXRpbmcgdGhlIG1vdmUgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsLiBJdCBvY2N1cnMgaW4gdGhlIGZvbGxvd2luZyBjYXNlcy48YnI+PGJyPi0gQWZ0ZXIgY29tcGxldGluZyB0aGUgbW92ZW1lbnQgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsIGJ5IHVzZXIncyBtb3ZlIGlucHV0Ljxicj4tIGBtb3ZlVG8oKWAsIGBwcmV2KClgLCBgbmV4dCgpYCBtZXRob2QgY2FsbC4gKEl0IGRvZXMgbm90IG9jY3VyIGlmIHlvdSBoYXZlIGRpc2FibGVkIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH0gZXZlbnQuKVxuXHRcdFx0ICogQGtvIOuqqeyggSDtjKjrhJDroZzsnZgg7J2064+Z7J2EIOyZhOujjO2VnCDri6TsnYwg67Cc7IOd7ZWY64qUIOydtOuypO2KuC4g7JWE656Y7J2YIOqyveyasOyXkCDrsJzsg53tlZzri6QuPGJyPjxicj4tIOyCrOyaqeyekOydmCDsnbTrj5kobW92ZSkg7JWh7IWYIOyeheugpeyXkCDsnZjtlZwg66qp7KCBIO2MqOuEkOuhnOydmCDsnbTrj5nsmYTro4wg7ZuELjxicj4tIGBtb3ZlVG8oKWAsIGBwcmV2KClgLCBgbmV4dCgpYCDrqZTshJzrk5wg7Zi47LacLihbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH3snbTrsqTtirjsnZgg6riw67O464+Z7J6R7J2EIOunieyVmOuLpOuptCDrsJzsg53tlZjsp4Ag7JWK64qU64ukLilcblx0XHRcdCAqIEBuYW1lIGVnLkZsaWNraW5nI2ZsaWNrRW5kXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBldmVudFR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50Ljxrbz7snbTrsqTtirgg66qFPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNUcnVzdGVkIGB0cnVlYCB3aGVuIHRoZSBldmVudCB3YXMgZ2VuZXJhdGVkIGJ5IGEgdXNlciBhY3Rpb24oXCJtb3VzZVwiIG9yIFwidG91Y2hcIikgb3RoZXJ3aXNlIGBmYWxzZWAuPGtvPuyCrOyaqeyekCDslaHshZgoXCJtb3VzZVwiIOuYkOuKlCBcInRvdWNoXCIp7JeQIOydmO2VtCDsnbTrsqTtirjqsIAg7IOd7ISx65CcIOqyveyasCBgdHJ1ZWAuIOq3uCDsmbjripQgYGZhbHNlYC48L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IG5vIEluZGV4IG51bWJlciBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50LiBTZWUgdGhlIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH0gbWV0aG9kLjxrbz7tmITsnqwg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi4LiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh966mU7ISc65OcIOywuOyhsC48L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpcmVjdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQuIElmIGBob3Jpem9udGFsPXRydWVgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIElmIGBob3Jpem9udGFsPWZhbHNlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljxrbz7tjKjrhJAg7J2064+ZIOuwqe2WpS4gYGhvcml6b250YWw9dHJ1ZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBgaG9yaXpvbnRhbD1mYWxzZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljwva28+XG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnRcblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tcblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjbW92ZVRvXG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI3ByZXZcblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjbmV4dFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIC8vIFRoZSBvcmRlciBvZiBldmVudCBvY2N1cnJlbmNlLlxuXHRcdFx0ICogLy8g7J2067Kk7Yq4IOuwnOyDnSDsiJzshJxcblx0XHRcdCAqIGJlZm9yZUZsaWNrU3RhcnQgKG9uY2UpID4gZmxpY2sgKG1hbnkgdGltZXMpID4gZmxpY2tFbmQgKG9uY2UpXG5cdFx0XHQgKi9cblx0XHRcdHBhbmVsLmNoYW5nZWQgJiYgdGhpcy5fdHJpZ2dlckV2ZW50KEVWRU5UUy5mbGlja0VuZCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fYWRqdXN0Q29udGFpbmVyQ3NzKHBoYXNlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgcG9zaXRpdmUgb3IgbmVnYXRpdmUgYWNjb3JkaW5nIGRpcmVjdGlvblxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2dldE51bUJ5RGlyZWN0aW9uKCkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXG5cdFx0cmV0dXJuIGNvbmYudG91Y2guZGlyZWN0aW9uID09PSBjb25mLmRpckRhdGFbMF0gPyAxIDogLTE7XG5cdH1cblxuXHQvKipcblx0ICogUmV2ZXJ0IHBhbmVsIG51bWJlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X3JldmVydFBhbmVsTm8oKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IG51bSA9IHRoaXMuX2dldE51bUJ5RGlyZWN0aW9uKCk7XG5cblx0XHRjb25zdCBpbmRleCA9IHBhbmVsLmN1cnJJbmRleCA+PSAwID8gcGFuZWwuY3VyckluZGV4IDogcGFuZWwuaW5kZXggLSBudW07XG5cdFx0Y29uc3Qgbm8gPSBwYW5lbC5jdXJyTm8gPj0gMCA/IHBhbmVsLmN1cnJObyA6IHBhbmVsLm5vIC0gbnVtO1xuXG5cdFx0dGhpcy5fc2V0UGFuZWxObyh7XG5cdFx0XHRpbmRleCxcblx0XHRcdG5vXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBwYW5lbCBudW1iZXJcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtPYmplY3R9IG9iaiBudW1iZXIgb2JqZWN0XG5cdCAqL1xuXHRfc2V0UGFuZWxObyhvYmopIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3QgY291bnQgPSBwYW5lbC5vcmlnQ291bnQgLSAxO1xuXHRcdGNvbnN0IG51bSA9IHRoaXMuX2dldE51bUJ5RGlyZWN0aW9uKCk7XG5cblx0XHRpZiAodXRpbHMuaXNPYmplY3Qob2JqKSkge1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdHBhbmVsW2tleV0gPSBvYmpba2V5XTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcmVtZW1iZXIgY3VycmVudCB2YWx1ZVxuXHRcdFx0cGFuZWwuY3VyckluZGV4ID0gcGFuZWwuaW5kZXg7XG5cdFx0XHRwYW5lbC5jdXJyTm8gPSBwYW5lbC5ubztcblxuXHRcdFx0cGFuZWwuaW5kZXggKz0gbnVtO1xuXHRcdFx0cGFuZWwubm8gKz0gbnVtO1xuXHRcdH1cblxuXHRcdGlmIChwYW5lbC5ubyA+IGNvdW50KSB7XG5cdFx0XHRwYW5lbC5ubyA9IDA7XG5cdFx0fSBlbHNlIGlmIChwYW5lbC5ubyA8IDApIHtcblx0XHRcdHBhbmVsLm5vID0gY291bnQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBwb2ludGVyRXZlbnRzIGNzcyBwcm9wZXJ0eSBvbiBjb250YWluZXIgZWxlbWVudCBkdWUgdG8gdGhlIGlPUyBjbGljayBidWdcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtFdmVudH0gZVxuXHQgKi9cblx0X3NldFBvaW50ZXJFdmVudHMoZSkge1xuXHRcdGNvbnN0ICRjb250YWluZXIgPSB0aGlzLiRjb250YWluZXI7XG5cdFx0Y29uc3QgcG9pbnRlciA9IHV0aWxzLmNzcygkY29udGFpbmVyLCBcInBvaW50ZXJFdmVudHNcIik7XG5cdFx0bGV0IHBvaW50ZXJFdmVudHM7XG5cblx0XHRpZiAoZSAmJiBlLmhvbGRpbmcgJiZcblx0XHRcdGUuaW5wdXRFdmVudCAmJiBlLmlucHV0RXZlbnQucHJldmVudFN5c3RlbUV2ZW50ICYmXG5cdFx0XHRwb2ludGVyICE9PSBcIm5vbmVcIlxuXHRcdCkge1xuXHRcdFx0cG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuXHRcdH0gZWxzZSBpZiAoIWUgJiYgcG9pbnRlciAhPT0gXCJhdXRvXCIpIHtcblx0XHRcdHBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcblx0XHR9XG5cblx0XHRwb2ludGVyRXZlbnRzICYmIHV0aWxzLmNzcygkY29udGFpbmVyLCB7cG9pbnRlckV2ZW50c30pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBjb29yZGluYXRlIHZhbHVlIHdpdGggdW5pdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0gY29vcmRzVmFsdWUge0FycmF5fSB4LHkgbnVtZXJpYyB2YWx1ZVxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IHgseSBjb29yZGluYXRlIHZhbHVlIHdpdGggdW5pdFxuXHQgKi9cblx0X2dldENvb3Jkc1ZhbHVlKGNvb3Jkc1ZhbHVlKSB7XG5cdFx0Ly8gdGhlIHBhcmFtIGNvbWVzIGFzIFsgdmFsLCAwIF0sIHdoYXRldmVyIHRoZSBkaXJlY3Rpb24uIFNvIHJlb3JkZXIgdGhlIHZhbHVlIGRlcGVuZCB0aGUgZGlyZWN0aW9uLlxuXHRcdGNvbnN0IGNvb3JkcyA9IHRoaXMuX2dldERhdGFCeURpcmVjdGlvbihjb29yZHNWYWx1ZSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0eDogdXRpbHMuZ2V0VW5pdFZhbHVlKGNvb3Jkc1swXSksXG5cdFx0XHR5OiB1dGlscy5nZXRVbml0VmFsdWUoY29vcmRzWzFdKVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRyYW5zbGF0ZSBwcm9wZXJ0eSB2YWx1ZVxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb29yZHNWYWx1ZSBjb29yZGluYXRlIHgseSB2YWx1ZVxuXHQgKi9cblx0X3NldFRyYW5zbGF0ZShjb29yZHNWYWx1ZSkge1xuXHRcdGNvbnN0IGNvb3JkcyA9IHRoaXMuX2dldENvb3Jkc1ZhbHVlKGNvb3Jkc1ZhbHVlKTtcblxuXHRcdHRoaXMuX3NldE1vdmVTdHlsZSh0aGlzLiRjb250YWluZXIsIFtjb29yZHMueCwgY29vcmRzLnldKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBpZiBwYW5lbCBwYXNzZWQgdGhyb3VnaCB0aHJlc2hvbGQgcGl4ZWxcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9pc01vdmFibGUoKSB7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCBheGVzSW5zdCA9IHRoaXMuX2F4ZXNJbnN0O1xuXHRcdGNvbnN0IGlzTW92YWJsZSA9IE1hdGguYWJzKHRoaXMuX2NvbmYudG91Y2guZGlzdGFuY2UpID49IG9wdGlvbnMudGhyZXNob2xkO1xuXHRcdGxldCBtYXg7XG5cdFx0bGV0IGN1cnJQb3M7XG5cblx0XHRpZiAoIW9wdGlvbnMuY2lyY3VsYXIgJiYgaXNNb3ZhYmxlKSB7XG5cdFx0XHRtYXggPSBheGVzSW5zdC5heGlzLmZsaWNrLnJhbmdlWzFdO1xuXHRcdFx0Y3VyclBvcyA9IGF4ZXNJbnN0LmdldCgpLmZsaWNrO1xuXG5cdFx0XHQvLyBpZiBjdXJyZW50IHBvc2l0aW9uIG91dCBvZiByYW5nZVxuXHRcdFx0aWYgKGN1cnJQb3MgPCAwIHx8IGN1cnJQb3MgPiBtYXgpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBpc01vdmFibGU7XG5cdH1cblxuXHQvKipcblx0ICogVHJpZ2dlciBjdXN0b20gZXZlbnRzXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gZXZlbnQgbmFtZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0gLSBhZGRpdGlvbmFsIGV2ZW50IHZhbHVlXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAqL1xuXHRfdHJpZ2dlckV2ZW50KG5hbWUsIHBhcmFtKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXG5cdFx0Ly8gcGFzcyBjaGFuZ2VkIHBhbmVsIG5vIG9ubHkgb24gJ2ZsaWNrRW5kJyBldmVudFxuXHRcdGlmIChuYW1lID09PSBFVkVOVFMuZmxpY2tFbmQpIHtcblx0XHRcdHBhbmVsLmN1cnJObyA9IHBhbmVsLm5vO1xuXHRcdFx0cGFuZWwuY3VyckluZGV4ID0gcGFuZWwuaW5kZXg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMudHJpZ2dlcihjb25mLmV2ZW50UHJlZml4ICsgbmFtZSwgdXRpbHMuZXh0ZW5kKHtcblx0XHRcdGV2ZW50VHlwZTogbmFtZSxcblx0XHRcdG5vOiBwYW5lbC5jdXJyTm8sXG5cdFx0XHRkaXJlY3Rpb246IGNvbmYudG91Y2guZGlyZWN0aW9uLFxuXHRcdFx0aXNUcnVzdGVkOiBjb25mLnRvdWNoLmlzVHJ1c3RlZFxuXHRcdH0sIHBhcmFtKSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IG5leHQvcHJldiBwYW5lbCBlbGVtZW50L2luZGV4LlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGRpcmVjdGlvblxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGVsZW1lbnQgLSB0cnVlOnRvIGdldCBlbGVtZW50LCBmYWxzZTp0byBnZXQgaW5kZXhcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHBoeXNpY2FsIC0gdHJ1ZSA6IHBoeXNpY2FsLCBmYWxzZSA6IGxvZ2ljYWwgKEBkZXByZWNhdGVkIHNpbmNlIDIuMi4wKVxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudHxOdW1iZXJ9XG5cdCAqL1xuXHRfZ2V0RWxlbWVudChkaXJlY3Rpb24sIGVsZW1lbnQsIHBoeXNpY2FsKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IGNpcmN1bGFyID0gdGhpcy5vcHRpb25zLmNpcmN1bGFyO1xuXHRcdGNvbnN0IHBvcyA9IHBhbmVsLmN1cnJJbmRleDtcblx0XHRjb25zdCBuZXh0ID0gZGlyZWN0aW9uID09PSB0aGlzLl9jb25mLmRpckRhdGFbMF07XG5cdFx0bGV0IHJlc3VsdCA9IG51bGw7XG5cdFx0bGV0IHRvdGFsO1xuXHRcdGxldCBpbmRleDtcblxuXHRcdGlmIChwaHlzaWNhbCkge1xuXHRcdFx0dG90YWwgPSBwYW5lbC5jb3VudDtcblx0XHRcdGluZGV4ID0gcG9zO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b3RhbCA9IHBhbmVsLm9yaWdDb3VudDtcblx0XHRcdGluZGV4ID0gcGFuZWwuY3Vyck5vO1xuXHRcdH1cblxuXHRcdGNvbnN0IGN1cnJlbnRJbmRleCA9IGluZGV4O1xuXG5cdFx0aWYgKG5leHQpIHtcblx0XHRcdGlmIChpbmRleCA8IHRvdGFsIC0gMSkge1xuXHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0fSBlbHNlIGlmIChjaXJjdWxhcikge1xuXHRcdFx0XHRpbmRleCA9IDA7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChpbmRleCA+IDApIHtcblx0XHRcdFx0aW5kZXgtLTtcblx0XHRcdH0gZWxzZSBpZiAoY2lyY3VsYXIpIHtcblx0XHRcdFx0aW5kZXggPSB0b3RhbCAtIDE7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGN1cnJlbnRJbmRleCAhPT0gaW5kZXgpIHtcblx0XHRcdHJlc3VsdCA9IGVsZW1lbnQgPyBwYW5lbC4kbGlzdFtuZXh0ID8gcG9zICsgMSA6IHBvcyAtIDFdIDogaW5kZXg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdmFsdWUgdG8gZm9yY2UgbW92ZSBwYW5lbHMgd2hlbiBkdXJhdGlvbiBpcyAwXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gbmV4dFxuXHQgKi9cblx0X3NldFZhbHVlVG9Nb3ZlKG5leHQpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblxuXHRcdGNvbmYudG91Y2guZGlzdGFuY2UgPSB0aGlzLm9wdGlvbnMudGhyZXNob2xkICsgMTtcblx0XHRjb25mLnRvdWNoLmRpcmVjdGlvbiA9IGNvbmYuZGlyRGF0YVsrIW5leHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG51bWJlciBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50LlxuXHQgKiBAa28g7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuOulvCDrsJjtmZjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0SW5kZXhcblx0ICogQHBhcmFtIHtCb29sZWFufSBbcGh5c2ljYWw9ZmFsc2VdIEBkZXByZWNhdGVkIHNpbmNlIDIuMi4wPGJyPjxicj5UeXBlcyBvZiBpbmRleCBudW1iZXJzLjxicj4tIHRydWUgKFBoeXNpY2FsKTogTWF0aC5mbG9vcih7VG90YWwgbnVtYmVyIG9mIHBhbmVsc30gLyAyIC0gMC4xKSB2YWx1ZS4gKEluY3JlYXNlIGJ5IDEgZm9yIGV2ZXJ5IHR3byBwYW5lbHMuKSBJZiB0aGUgY2lyY3VsYXIgb3B0aW9uIGlzIGZhbHNlLCBpdCBlcXVhbHMgcGh5c2ljYWw9ZmFsc2UuPGJyPi0gZmFsc2UgKExvZ2ljYWwpOiBUaGUgdmFsdWUgb2YgaG93IHRoZSBjb250ZW50KGlubmVySFRNTCkgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudCBpcyBpbiB0aGUgZGVmaW5lZCBvcmRlciBvZiB0aGUgcGFuZWwgZWxlbWVudHMuPGtvPkBkZXByZWNhdGVkIHNpbmNlIDIuMi4wPGJyPjxicj7snbjrjbHsiqQg67KI7Zi47J2YIOyiheulmC48YnI+LSB0cnVlICjrrLzrpqzsoIEpOiBgTWF0aC5mbG9vcih77Yyo64SQIOy0nSDqsJzsiJh9IC8gMiAtIDAuMSlgIOqwki4gKO2MqOuEkOydtCAy6rCcIOuKmOyWtOuCoCDrlYzrp4jri6QgMeyUqSDspp3qsIApIGBjaXJjdWxhcmDsmLXshZjsnbQgYGZhbHNlYOydtOuptCBgcGh5c2ljYWw9ZmFsc2Vg7JmAIOuPmeydvO2VnCDqsJIuPGJyPi0gZmFsc2UgKOuFvOumrOyggSk6IO2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOy7qO2FkO2KuChpbm5lckhUTUwp6rCAICftjKjrhJAg7JqU7IaM65Ok7J2YIOygleydmOuQnCDsiJzshJwn7JeQ7IScIOuqhyDrsojsp7jsnbjsp4Dsl5Ag64yA7ZWcIOqwki48L2tvPlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9IEluZGV4IG51bWJlciBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50LiBBIHplcm8tYmFzZWQgaW50ZWdlci48a28+7ZiE7J6sIO2MqOuEkOydmCDsnbjrjbHsiqQg67KI7Zi4LiAw67aA7YSwIOyLnOyeke2VmOuKlCDsoJXsiJguPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRQcmV2SW5kZXhcblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXROZXh0SW5kZXhcblx0ICogQGV4YW1wbGVcblx0ICogYGBgaHRtbFxuXHQgKiA8ZGl2IGlkPVwiZmxpY2tcIj5cblx0ICogXHQ8ZGl2PjxwPnBhbmVsIDA8L3A+PC9kaXY+XG5cdCAqIFx0PGRpdj48cD5wYW5lbCAxPC9wPjwvZGl2PlxuXHQgKiBcdDxkaXY+PHA+cGFuZWwgMjwvcD48L2Rpdj5cblx0ICogXHQ8ZGl2PjxwPnBhbmVsIDM8L3A+PC9kaXY+XG5cdCAqIDwvZGl2PlxuXHQgKiBgYGBcblx0ICogYGBgamF2YXNjcmlwdFxuXHQgKiAvLyBjaXJjdWxhciBvZmYgYW5kIGxlZnQgZmxpY2tpbmcuXG5cdCAqIC8vIOyInO2ZmOydhCDrgYTqs6Ag7KKMIO2UjOumrO2CuS5cblx0ICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpLm9uKFwiZmxpY2tFbmRcIiwge2N1cnJlbnRUYXJnZXR9ID0+IHtcblx0ICogXHRjb25zb2xlLmxvZyhjdXJyZW50VGFyZ2V0LmdldEluZGV4KCkpOyAvLyAxID4gMiA+IDNcblx0ICogXHRjb25zb2xlLmxvZyhjdXJyZW50VGFyZ2V0LmdldEluZGV4KHRydWUpKTsgLy8gMSA+IDIgPiAzXG5cdCAqIH07XG5cdCAqXG5cdCAqIC8vIGNpcmN1bGFyIG9uIGFuZCBsZWZ0IGZsaWNraW5nLlxuXHQgKiAvLyDsiJztmZjsnYQg7Lyc6rOgIOyijCDtlIzrpqztgrkuXG5cdCAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiLCB7Y2lyY3VsYXI6IHRydWV9KS5vbihcImZsaWNrRW5kXCIsIHtjdXJyZW50VGFyZ2V0fSA9PiB7XG5cdCAqIFx0Y29uc29sZS5sb2coY3VycmVudFRhcmdldC5nZXRJbmRleCgpKTsgLy8gMSA+IDIgPiAzID4gMCA+IDEgPiAyID4gMyA+IDAgLi4uXG5cdCAqIFx0Y29uc29sZS5sb2coY3VycmVudFRhcmdldC5nZXRJbmRleCh0cnVlKSk7IC8vIDEgPiAxID4gMSA+IDEgPiAxID4gMSA+IDEgPiAxIC4uLlxuXHQgKiB9O1xuXHQgKiBgYGBcblx0ICogQGV4YW1wbGVcblx0ICogYGBgaHRtbFxuXHQgKiA8IS0tRGVmaW5lIG9ubHkgdHdvIHBhbmVscy4tLT5cblx0ICogPCEtLe2MqOuEkOydhCDrkZAg6rCc66eMIOygleydmO2VnOuLpC4tLT5cblx0ICogPGRpdiBpZD1cImZsaWNrMlwiPlxuXHQgKiBcdDxkaXY+PHA+cGFuZWwgMDwvcD48L2Rpdj5cblx0ICogXHQ8ZGl2PjxwPnBhbmVsIDE8L3A+PC9kaXY+XG5cdCAqIDwvZGl2PlxuXHQgKiBgYGBcblx0ICogYGBgamF2YXNjcmlwdFxuXHQgKiAvLyAoSW4gdGhlIGNhc2Ugb2YgY2lyY3VsYXRpb24pIElmIHRoZSBudW1iZXIgb2YgZGVmaW5lZCBwYW5lbCBlbGVtZW50cyBpcyBsZXNzIHRoYW4gdGhlIG1pbmltdW0gbnVtYmVyIHJlcXVpcmVkLCB0aGUgbnVtYmVyIG9mIHBhbmVscyBpcyBjcmVhdGVkLlxuXHQgKiAvLyBUaGVyZWZvcmUsIGl0IGlzIGRlc2NyaWJlZCBhcyAndGhlIG51bWJlciBvZiBwYW5lbCBkZWZpbml0aW9ucyBvZiB0aGUgY29udGVudHMgb2YgdGhlIHBhbmVsLidcblx0ICogLy8gKOyInO2ZmOyduCDqsr3smrApIOygleydmOuQnCDtjKjrhJAg7JqU7IaM7J2YIOqwnOyImOqwgCDtlYTsmpQg7LWc7IaM6rCc7IiY67O064ukIOyggeycvOuptCDqt7gg7IiY66eM7YG87J2YIO2MqOuEkOydhCDsg53shLHtlZzri6QuXG5cdCAqIC8vIOq3uOugh+q4sCDrlYzrrLjsl5AgJ+2MqOuEkOydtCDri7Tqs6Ag7J6I64qUIOy7qO2FkO2KuOydmCDtjKjrhJAg7KCV7J2YIOyInOyEseyDgeydmCDrsojtmLgn65286rOgIOyEpOuqhe2VnOuLpC5cblx0ICogY29uc3QgZmxpY2sgPSBuZXcgZWcuRmxpY2tpbmcoXCJmbGljazJcIiwge1xuXHQgKiBcdGNpcmN1bGFyOiB0cnVlXG5cdCAqIH0pO1xuXHQgKlxuXHQgKiAvLyBUaGUgY29udGVudCBvZiB0aGUgY3VycmVudCBwYW5lbCBpcyB0aGUgZmlyc3QgaW4gdGhlIHBhbmVsIGRlZmluaXRpb24gb3JkZXIuXG5cdCAqIC8vIO2YhOyerCDtjKjrhJDsnbQg64u06rOgIOyeiOuKlCDsu6jthZDtirjripQg7Yyo64SQIOygleydmCDsiJzshJzsg4Eg7LKrIOuyiOynuOydtOuLpC5cblx0ICogZmxpY2suZ2V0SW5kZXgoKTsgLy8gMFxuXHQgKlxuXHQgKiAvLyBUaGUgY29udGVudCBvZiB0aGUgbmV4dCBwYW5lbCBpcyB0aGUgc2Vjb25kIGluIHRoZSBwYW5lbCBkZWZpbml0aW9uIG9yZGVyLlxuXHQgKiAvLyDri6TsnYwg7Yyo64SQ7J20IOuLtOqzoCDsnojripQg7Luo7YWQ7Yq464qUIO2MqOuEkCDsoJXsnZgg7Iic7ISc7IOBIOuRkCDrsojsp7jsnbTri6QuXG5cdCAqIGZsaWNrLmdldE5leHRJbmRleCgpOyAvLyAxXG5cdCAqXG5cdCAqIC8vIFRoZSBjb250ZW50IG9mIHRoZSBwcmV2aW91cyBwYW5lbCBpcyB0aGUgc2Vjb25kIGluIHRoZSBwYW5lbCBkZWZpbml0aW9uIG9yZGVyLlxuXHQgKiAvLyDsnbTsoIQg7Yyo64SQ7J20IOuLtOqzoCDsnojripQg7Luo7YWQ7Yq464qUIO2MqOuEkCDsoJXsnZgg7Iic7ISc7IOBIOuRkCDrsojsp7jsnbTri6QuXG5cdCAqIGZsaWNrLmdldFByZXZJbmRleCgpOyAvLyAxXG5cdCAqIGBgYFxuXHQgKi9cblx0Z2V0SW5kZXgocGh5c2ljYWwpIHtcblx0XHRyZXR1cm4gdGhpcy5fY29uZi5wYW5lbFtwaHlzaWNhbCA/IFwiY3VyckluZGV4XCIgOiBcImN1cnJOb1wiXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSByZWZlcmVuY2Ugb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC5cblx0ICogQGtvIO2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOugiO2NvOufsOyKpOulvCDrsJjtmZjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0RWxlbWVudFxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gQ3VycmVudCBwYW5lbCBlbGVtZW50Ljxrbz7tmITsnqwg7Yyo64SQIOyalOyGjC48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldFByZXZFbGVtZW50XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0TmV4dEVsZW1lbnRcblx0ICovXG5cdGdldEVsZW1lbnQoKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXG5cdFx0cmV0dXJuIHBhbmVsLiRsaXN0W3BhbmVsLmN1cnJJbmRleF07XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVmZXJlbmNlIG9mIHRoZSBuZXh0IHBhbmVsIGVsZW1lbnQuXG5cdCAqIEBrbyDri6TsnYwg7Yyo64SQIOyalOyGjOydmCDroIjtjbzrn7DsiqTrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldE5leHRFbGVtZW50XG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fG51bGx9IE5leHQgcGFuZWwgZWxlbWVudCBvciBgbnVsbGAgaWYgaXQgZG9lcyBub3QgZXhpc3QuPGtvPuuLpOydjCDtjKjrhJAg7JqU7IaMLiDtjKjrhJDsnbQg7JeG7Jy866m0IGBudWxsYOydhCDrsJjtmZjtlZzri6QuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRFbGVtZW50XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0UHJldkVsZW1lbnRcblx0ICovXG5cdGdldE5leHRFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLl9nZXRFbGVtZW50KHRoaXMuX2NvbmYuZGlyRGF0YVswXSwgdHJ1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgaW5kZXggbnVtYmVyIG9mIHRoZSBuZXh0IHBhbmVsIGVsZW1lbnQuXG5cdCAqIEBrbyDri6TsnYwg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi466W8IOuwmO2ZmO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNnZXROZXh0SW5kZXhcblx0ICogQHBhcmFtIHtCb29sZWFufSBbcGh5c2ljYWw9ZmFsc2VdIEBkZXByZWNhdGVkIHNpbmNlIDIuMi4wPGJyPjxicj5UeXBlcyBvZiBpbmRleCBudW1iZXJzPGJyPi0gdHJ1ZSAoUGh5c2ljYWwpOiBQbHVzIG9uZSBvZiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IHJldHVybiB2YWx1ZS48YnI+LSBmYWxzZSAoTG9naWNhbCk6IFRoZSB2YWx1ZSBvZiBob3cgdGhlIGNvbnRlbnQoaW5uZXJIVE1MKSBvZiB0aGUgbmV4dCBwYW5lbCBlbGVtZW50IGlzIGluIHRoZSBkZWZpbmVkIG9yZGVyIG9mIHRoZSBwYW5lbCBlbGVtZW50cy48a28+QGRlcHJlY2F0ZWQgc2luY2UgMi4yLjA8YnI+PGJyPuyduOuNseyKpCDrsojtmLjsnZgg7KKF66WYLjxicj4tIHRydWUgKOusvOumrOyggSk6IFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH0g67CY7ZmY6rCS7JeQIDHsnYQg642U7ZWcIOqwki48YnI+LSBmYWxzZSAo64W866as7KCBKTog64uk7J2MIO2MqOuEkCDsmpTshozsnZgg7Luo7YWQ7Yq4KGlubmVySFRNTCnqsIAgJ+2MqOuEkCDsmpTshozrk6TsnZgg7KCV7J2Y65CcIOyInOyEnCfsl5DshJwg66qHIOuyiOynuOyduOyngOyXkCDrjIDtlZwg6rCSLjwva28+XG5cdCAqIEByZXR1cm4ge051bWJlcnxudWxsfSBJbmRleCBudW1iZXIgb2YgdGhlIG5leHQgcGFuZWwgZWxlbWVudCBvciBudWxsIGlmIGl0IGRvZXMgbm90IGV4aXN0LiBBIHplcm8tYmFzZWQgaW50ZWdlci48a28+64uk7J2MIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gMOu2gO2EsCDsi5zsnpHtlZjripQg7KCV7IiYLiDtjKjrhJDsnbQg7JeG7Jy866m0IGBudWxsYOydhCDrsJjtmZjtlZzri6QuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRJbmRleFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldFByZXZJbmRleFxuXHQgKi9cblx0Z2V0TmV4dEluZGV4KHBoeXNpY2FsKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2dldEVsZW1lbnQodGhpcy5fY29uZi5kaXJEYXRhWzBdLCBmYWxzZSwgcGh5c2ljYWwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSByZWZlcmVuY2UgdG8gYWxsIHBhbmVsIGVsZW1lbnRzLlxuXHQgKiBAa28g66qo65OgIO2MqOuEkCDsmpTshozsnZgg66CI7Y2865+w7Iqk66W8IOuwmO2ZmO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNnZXRBbGxFbGVtZW50c1xuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfSBXaG9sZSBwYW5lbCBlbGVtZW50cy48a28+66qo65OgIO2MqOuEkCDsmpTshowuPC9rbz5cblx0ICovXG5cdGdldEFsbEVsZW1lbnRzKCkge1xuXHRcdHJldHVybiB0aGlzLl9jb25mLnBhbmVsLiRsaXN0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHJlZmVyZW5jZSBvZiB0aGUgcHJldmlvdXMgcGFuZWwgZWxlbWVudC5cblx0ICogQGtvIOydtOyghCDtjKjrhJAg7JqU7IaM7J2YIOugiO2NvOufsOyKpOulvCDrsJjtmZjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0UHJldkVsZW1lbnRcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR8bnVsbH0gUHJldmlvdXMgcGFuZWwgZWxlbWVudCBvciBgbnVsbGAgaWYgaXQgZG9lcyBub3QgZXhpc3QuPGtvPuydtOyghCDtjKjrhJAg7JqU7IaMLiDtjKjrhJDsnbQg7JeG7Jy866m0IGBudWxsYOydhCDrsJjtmZjtlZzri6QuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRFbGVtZW50XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0TmV4dEVsZW1lbnRcblx0ICovXG5cdGdldFByZXZFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLl9nZXRFbGVtZW50KHRoaXMuX2NvbmYuZGlyRGF0YVsxXSwgdHJ1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgaW5kZXggbnVtYmVyIG9mIHRoZSBwcmV2aW91cyBwYW5lbCBlbGVtZW50LlxuXHQgKiBAa28g7J207KCEIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuOulvCDrsJjtmZjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0UHJldkluZGV4XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BoeXNpY2FsPWZhbHNlXSBAZGVwcmVjYXRlZCBzaW5jZSAyLjIuMDxicj48YnI+VHlwZXMgb2YgaW5kZXggbnVtYmVyczxicj4tIHRydWUgKFBoeXNpY2FsKTogTWludXMgb25lIG9mIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH0gcmV0dXJuIHZhbHVlLjxicj4tIGZhbHNlIChMb2dpY2FsKTogVGhlIHZhbHVlIG9mIGhvdyB0aGUgY29udGVudChpbm5lckhUTUwpIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQgaXMgaW4gdGhlIGRlZmluZWQgb3JkZXIgb2YgdGhlIHBhbmVsIGVsZW1lbnRzLjxrbz5AZGVwcmVjYXRlZCBzaW5jZSAyLjIuMDxicj48YnI+7J24642x7IqkIOuyiO2YuOydmCDsooXrpZg8YnI+LSB0cnVlICjrrLzrpqzsoIEpOiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IOuwmO2ZmOqwkuyXkCAx7J2EIOu6gCDqsJIuPGJyPi0gZmFsc2UgKOuFvOumrOyggSk6IOydtOyghCDtjKjrhJAg7JqU7IaM7J2YIOy7qO2FkO2KuChpbm5lckhUTUwp6rCAICftjKjrhJAg7JqU7IaM65Ok7J2YIOygleydmOuQnCDsiJzshJwn7JeQ7IScIOuqhyDrsojsp7jsnbjsp4Dsl5Ag64yA7ZWcIOqwki48L2tvPlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ8bnVsbH0gUHJldmlvdXMgZWxlbWVudCBpbmRleCB2YWx1ZSBvciBudWxsIGlmIG5vIG1vcmUgZWxlbWVudCBleGlzdC4gQSB6ZXJvLWJhc2VkIGludGVnZXIuPGtvPuydtOyghCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLguIDDrtoDthLAg7Iuc7J6R7ZWY64qUIOygleyImC4g7Yyo64SQ7J20IOyXhuuKlCDqsr3smrDripQgYG51bGxgLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0SW5kZXhcblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXROZXh0SW5kZXhcblx0ICovXG5cdGdldFByZXZJbmRleChwaHlzaWNhbCkge1xuXHRcdHJldHVybiB0aGlzLl9nZXRFbGVtZW50KHRoaXMuX2NvbmYuZGlyRGF0YVsxXSwgZmFsc2UsIHBoeXNpY2FsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgYW5pbWF0ZWQgcGFuZWwgaXMgcGxheWluZy5cblx0ICogQGtvIO2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWY7J20IOynhO2WiSDspJHsnbjsp4Ag7ZmV7J247ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2lzUGxheWluZ1xuXHQgKiBAcmV0dXJuIHtCb29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYW5pbWF0ZWQgcGFuZWwgaXMgcGxheWluZyA8a28+7Yyo64SQIOydtOuPmSDslaDri4jrqZTsnbTshZgg7KeE7ZaJIOykkSDsl6zrtoA8L2tvPlxuXHQgKi9cblx0aXNQbGF5aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9jb25mLnBhbmVsLmFuaW1hdGluZztcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlIHBhbmVsIGFwcGx5aW5nIHN0YXJ0L2VuZCBwaGFzZSB2YWx1ZVxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIEF4ZXMnIG1ldGhvZCBuYW1lXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB0byBkZXN0aW5hdGlvbiB2YWx1ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25WYWx1ZSBkdXJhdGlvbiB2YWx1ZVxuXHQgKi9cblx0X21vdmVQYW5lbEJ5UGhhc2UobWV0aG9kLCB0bywgZHVyYXRpb25WYWx1ZSkge1xuXHRcdGNvbnN0IGR1cmF0aW9uID0gdXRpbHMuZ2V0TnVtVmFsdWUoZHVyYXRpb25WYWx1ZSwgdGhpcy5vcHRpb25zLmR1cmF0aW9uKTtcblxuXHRcdGlmICh0aGlzLl9zZXRQaGFzZVZhbHVlKFwic3RhcnRcIikgIT09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLl9zZXRBeGVzKG1ldGhvZCwgdG8sIGR1cmF0aW9uKTtcblx0XHRcdCFkdXJhdGlvbiAmJiB0aGlzLl9zZXRQaGFzZVZhbHVlKFwiZW5kXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyBhbiBlbGVtZW50IHRvIHRoZSBuZXh0IHBhbmVsLiBJZiBgaG9yaXpvbnRhbD10cnVlYGlzIHJpZ2h0IHBhbmVsLiBJZiBgaG9yaXpvbnRhbD1mYWxzZWBpcyBsb3dlciBwYW5lbC5cblx0ICogQGtvIOuLpOydjCDtjKjrhJDroZwg7J2064+Z7ZWc64ukLiBgaG9yaXpvbnRhbD10cnVlYOydtOuptCDsmrDsuKEg7Yyo64SQLiBgaG9yaXpvbnRhbD1mYWxzZWDsnbTrqbQg7ZWY7LihIO2MqOuEkC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNuZXh0XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249b3B0aW9ucy5kdXJhdGlvbl0gRHVyYXRpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50ICh1bml0OiBtcykgPGtvPu2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQo64uo7JyEOiBtcyk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNiZWZvcmVGbGlja1N0YXJ0XG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNmbGlja1xuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZmxpY2tFbmRcblx0ICogQHNlZSBlZy5GbGlja2luZyNtb3ZlVG9cblx0ICogQHNlZSBlZy5GbGlja2luZyNwcmV2XG5cdCAqL1xuXHRuZXh0KGR1cmF0aW9uKSB7XG5cdFx0Y29uc3QgaW5kZXggPSB0aGlzLmdldE5leHRJbmRleCgpO1xuXG5cdFx0aWYgKHR5cGVvZiBpbmRleCAhPT0gXCJudW1iZXJcIikge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9tb3ZlVG8oaW5kZXgsIGR1cmF0aW9uLCBBeGVzLkRJUkVDVElPTl9SSUdIVCk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgYW4gZWxlbWVudCB0byB0aGUgcHJldmlvdXMgcGFuZWwuIElmIGBob3Jpem9udGFsPXRydWVgaXMgbGVmdCBwYW5lbC4gSWYgYGhvcml6b250YWw9ZmFsc2VgaXMgdXBwZXIgcGFuZWwuXG5cdCAqIEBrbyDsnbTsoIQg7Yyo64SQ66GcIOydtOuPme2VnOuLpC4gYGhvcml6b250YWw9dHJ1ZWDsnbTrqbQg7KKM7LihIO2MqOuEkC4gYGhvcml6b250YWw9ZmFsc2Vg7J2066m0IOyDgey4oSDtjKjrhJAuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjcHJldlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uPW9wdGlvbnMuZHVyYXRpb25dIER1cmF0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudCAodW5pdDogbXMpIDxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCEKOuLqOychDogbXMpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNiZWZvcmVGbGlja1N0YXJ0XG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNmbGlja1xuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZmxpY2tFbmRcblx0ICogQHNlZSBlZy5GbGlja2luZyNtb3ZlVG9cblx0ICogQHNlZSBlZy5GbGlja2luZyNuZXh0XG5cdCAqL1xuXHRwcmV2KGR1cmF0aW9uKSB7XG5cdFx0Y29uc3QgaW5kZXggPSB0aGlzLmdldFByZXZJbmRleCgpO1xuXG5cdFx0aWYgKHR5cGVvZiBpbmRleCAhPT0gXCJudW1iZXJcIikge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9tb3ZlVG8oaW5kZXgsIGR1cmF0aW9uLCBBeGVzLkRJUkVDVElPTl9MRUZUKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0byB0aGUgcGFuZWwgaW4gdGhlIG9yZGVyIHNwZWNpZmllZCBpbiBgbm9WYWx1ZWAuIElmIG5vVmFsdWUgaXMgZXF1YWwgdG8gdGhlIGN1cnJlbnQgbG9naWNhbCBpbmRleCBudW1iZXJpbmcsIG5vIGFjdGlvbiBpcyB0YWtlbi4gW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9LCBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfSwgW2ZsaWNrRW5kXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja0VuZH0gZXZlbnRzIG9jY3VyIG9uZSBhZnRlciB0aGUgb3RoZXIuXG5cdCAqIEBrbyBgbm9WYWx1ZWDsl5Ag7KeA7KCV7ZWcIOyInOyEnOydmCDtjKjrhJDroZwg7J2064+Z7ZWc64ukLiBgbm9WYWx1ZWDqsJLsnbQg7ZiE7J6s7J2YIOuFvOumrOyggSDsnbjrjbHsiqQg67KI7Zi47JmAIOqwmeuLpOuptCDslYTrrLTrj5nsnpEg7ZWY7KeAIOyViuuKlOuLpC4gW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9LCBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfSwgW2ZsaWNrRW5kXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja0VuZH0g7J2067Kk7Yq46rCAIOywqOuhgOuhnCDrsJzsg53tlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjbW92ZVRvXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBub1ZhbHVlIFRoZSBsb2dpY2FsIGluZGV4IG51bWJlciBvZiB0aGUgcGFuZWwgZWxlbWVudCB0byBiZSBtb3ZlZC4gKEJhc2VkIG9uIHRoZSBkZWZpbmVkIG9yZGVyIG9mIHRoZSBwYW5lbCBlbGVtZW50cy4pPGtvPuydtOuPme2VoCDtjKjrhJAg7JqU7IaM7J2YIOuFvOumrOyggSDsnbjrjbHsiqQg67KI7Zi4LiAoW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuKTwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249b3B0aW9ucy5kdXJhdGlvbl0gRHVyYXRpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50ICh1bml0OiBtcykgPGtvPu2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQo64uo7JyEOiBtcyk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2JlZm9yZUZsaWNrU3RhcnRcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2ZsaWNrXG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNmbGlja0VuZFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI3ByZXZcblx0ICogQHNlZSBlZy5GbGlja2luZyNuZXh0XG5cdCAqL1xuXHRtb3ZlVG8obm9WYWx1ZSwgZHVyYXRpb24pIHtcblx0XHR0aGlzLl9tb3ZlVG8obm9WYWx1ZSwgZHVyYXRpb24pO1xuXHR9XG5cdF9tb3ZlVG8obm9WYWx1ZSwgZHVyYXRpb24sIGRpcmVjdGlvbikge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblx0XHRjb25zdCBjdXJyZW50SW5kZXggPSBwYW5lbC5pbmRleDtcblx0XHRsZXQgaW5kZXhUb01vdmU7XG5cdFx0bGV0IGlzUG9zaXRpdmU7XG5cdFx0bGV0IG5vID0gbm9WYWx1ZTtcblxuXHRcdG5vID0gdXRpbHMuZ2V0TnVtVmFsdWUobm8sIC0xKTtcblxuXHRcdGlmIChubyA8IDAgfHwgbm8gPj0gcGFuZWwub3JpZ0NvdW50IHx8IG5vID09PSBwYW5lbC5ubyB8fFxuXHRcdFx0cGFuZWwuYW5pbWF0aW5nIHx8IGNvbmYudG91Y2guaG9sZGluZykge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0aW5kZXhUb01vdmUgPSBubyAtIChjaXJjdWxhciA/IHBhbmVsLm5vIDogY3VycmVudEluZGV4KTtcblx0XHRpZiAoZGlyZWN0aW9uID09PSBBeGVzLkRJUkVDVElPTl9SSUdIVCAmJiBpbmRleFRvTW92ZSA8IDApIHtcblx0XHRcdGluZGV4VG9Nb3ZlICs9IHBhbmVsLm9yaWdDb3VudDtcblx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gQXhlcy5ESVJFQ1RJT05fTEVGVCAmJiBpbmRleFRvTW92ZSA+IDApIHtcblx0XHRcdGluZGV4VG9Nb3ZlIC09IHBhbmVsLm9yaWdDb3VudDtcblx0XHR9XG5cdFx0aXNQb3NpdGl2ZSA9IGluZGV4VG9Nb3ZlID4gMDtcblxuXHRcdC8vIGNoZWNrIGZvciByZWFsIHBhbmVsIGNvdW50IHdoaWNoIGNhbiBiZSBtb3ZlZCBvbiBlYWNoIHNpZGVzIGluIGNpcmN1bGFyIG1vZGVcblx0XHRpZiAoY2lyY3VsYXIgJiZcblx0XHRcdE1hdGguYWJzKGluZGV4VG9Nb3ZlKSA+XG5cdFx0XHQoaXNQb3NpdGl2ZSA/IHBhbmVsLmNvdW50IC0gKGN1cnJlbnRJbmRleCArIDEpIDogY3VycmVudEluZGV4KSkge1xuXHRcdFx0aW5kZXhUb01vdmUgKz0gKGlzUG9zaXRpdmUgPyAtMSA6IDEpICogcGFuZWwuY291bnQ7XG5cdFx0XHRpc1Bvc2l0aXZlID0gaW5kZXhUb01vdmUgPiAwO1xuXHRcdH1cblxuXHRcdHRoaXMuX3NldFBhbmVsTm8oY2lyY3VsYXIgPyB7bm99IDoge25vLCBpbmRleDogbm99KTtcblx0XHR0aGlzLl9jb25mLmluZGV4VG9Nb3ZlID0gaW5kZXhUb01vdmU7XG5cdFx0dGhpcy5fc2V0VmFsdWVUb01vdmUoaXNQb3NpdGl2ZSk7XG5cblx0XHR0aGlzLl9tb3ZlUGFuZWxCeVBoYXNlKFxuXHRcdFx0Y2lyY3VsYXIgPyBcInNldEJ5XCIgOiBcInNldFRvXCIsXG5cdFx0XHRwYW5lbC5zaXplICogKGNpcmN1bGFyID8gaW5kZXhUb01vdmUgOiBubyksXG5cdFx0XHRkdXJhdGlvblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBsZW5ndGggb2YgdGhlIHBhbmVsIGlzIHVwZGF0ZWQgYWNjb3JkaW5nIHRvIHRoZSBiYXNlIGVsZW1lbnQuIElmIGBob3Jpem9udGFsPXRydWVgIGlzIGhvcml6b250YWwuIElmIGBob3Jpem9udGFsPWZhbHNlYCBpcyB2ZXJ0aWNhbC5cblx0ICogQGtvIO2MqOuEkOydmCDqsIDroZwg7Zi57J2AIOyEuOuhnCDquLjsnbTrpbwg6riw7KSA7JqU7IaM7JeQIOunnuy2sCDqsLHsi6DtlZzri6QuIGBob3Jpem9udGFsPXRydWVg7J2066m0IOqwgOuhnCwgYGhvcml6b250YWw9ZmFsc2Vg7J2066m0IOyEuOuhnC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNyZXNpemVcblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBleGFtcGxlXG5cdCAqIGNvbnN0IGZsaWNrID0gbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIsIHtcblx0ICogXHRwcmV2aWV3UGFkZGluZzogWzEwLCAxMF1cblx0ICogfSk7XG5cdCAqXG5cdCAqIC8vIFdoZW4gZGV2aWNlIG9yaWVudGFpb24gY2hhbmdlcy5cblx0ICogLy8g64uo66eQ6riw66W8IO2ajOyghO2WiOydhCDrlYwuXG5cdCAqIGZsaWNrLnJlc2l6ZSgpO1xuXHQgKlxuXHQgKiAvLyBPciB3aGVuIGNoYW5nZXMgcHJldmlld1BhZGRpbmcgb3B0aW9uIGZyb20gaXRzIG9yaWdpbmFsIHZhbHVlLlxuXHQgKiAvLyDrmJDripQgcHJldmlld1BhZGRpbmfsmLXshZjqsJLsnYQg67OA6rK97ZaI7J2EIOuVjC5cblx0ICogZmxpY2sub3B0aW9ucy5wcmV2aWV3UGFkZGluZyA9IFsyMCwgMzBdO1xuXHQgKiBmbGljay5yZXNpemUoKTtcblx0ICovXG5cdHJlc2l6ZSgpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCBob3Jpem9udGFsID0gb3B0aW9ucy5ob3Jpem9udGFsO1xuXHRcdGNvbnN0IHVzZVRyYW5zbGF0ZSA9IG9wdGlvbnMudXNlVHJhbnNsYXRlO1xuXHRcdGxldCBwYW5lbFNpemU7XG5cblx0XHRpZiAoIXRoaXMuaXNQbGF5aW5nKCkpIHtcblx0XHRcdGlmICh1dGlscy5pc0FycmF5KG9wdGlvbnMucHJldmlld1BhZGRpbmcpICYmIHR5cGVvZigrb3B0aW9ucy5wcmV2aWV3UGFkZGluZy5qb2luKFwiXCIpKSA9PT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHR0aGlzLl9zZXRQYWRkaW5nKG9wdGlvbnMucHJldmlld1BhZGRpbmcuY29uY2F0KCkpO1xuXHRcdFx0XHRwYW5lbFNpemUgPSBwYW5lbC5zaXplO1xuXHRcdFx0fSBlbHNlIGlmIChob3Jpem9udGFsKSB7XG5cdFx0XHRcdHBhbmVsU2l6ZSA9IHBhbmVsLnNpemUgPSB1dGlscy5jc3ModGhpcy4kd3JhcHBlciwgXCJ3aWR0aFwiLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVzaXplIHBhbmVsIGVsZW1lbnRzXG5cdFx0XHR1dGlscy5jc3MocGFuZWwuJGxpc3QsIHtcblx0XHRcdFx0W2hvcml6b250YWwgPyBcIndpZHRoXCIgOiBcImhlaWdodFwiXTogdXRpbHMuZ2V0VW5pdFZhbHVlKHBhbmVsU2l6ZSlcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyByZW1vdmUgZGF0YS1oZWlnaHQgYXR0cmlidXRlIGFuZCByZS1ldmFsdWF0ZSBwYW5lbCdzIGhlaWdodFxuXHRcdFx0aWYgKG9wdGlvbnMuYWRhcHRpdmVIZWlnaHQpIHtcblx0XHRcdFx0Y29uc3QgJHBhbmVsID0gdGhpcy4kY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYFske0RBVEFfSEVJR0hUfV1gKTtcblxuXHRcdFx0XHRpZiAoJHBhbmVsLmxlbmd0aCkge1xuXHRcdFx0XHRcdHV0aWxzLnRvQXJyYXkoJHBhbmVsKVxuXHRcdFx0XHRcdFx0LmZvckVhY2godiA9PiB2LnJlbW92ZUF0dHJpYnV0ZShEQVRBX0hFSUdIVCkpO1xuXG5cdFx0XHRcdFx0dGhpcy5fc2V0QWRhcHRpdmVIZWlnaHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9heGVzSW5zdC5heGlzLmZsaWNrLnJhbmdlID0gWzAsIHBhbmVsU2l6ZSAqIChwYW5lbC5jb3VudCAtIDEpXTtcblx0XHRcdHRoaXMuX3NldEF4ZXMoXCJzZXRUb1wiLCBwYW5lbFNpemUgKiBwYW5lbC5pbmRleCwgMCk7XG5cblx0XHRcdGlmICghdXNlVHJhbnNsYXRlKSB7XG5cdFx0XHRcdHRoaXMuX2FwcGx5UGFuZWxzUG9zKCk7XG5cdFx0XHRcdHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhcImVuZFwiKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHBhbmVsIHRvIGl0cyBvcmlnaW5hbCBwb3NpdGlvbi4gKEl0IG9ubHkgd29ya3Mgd2hlbiB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IGV2ZW50IGlzIGNhbmNlbGVkLikgW2JlZm9yZVJlc3RvcmVde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZVJlc3RvcmV9LCBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfSwgW3Jlc3RvcmVde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OnJlc3RvcmV9IGV2ZW50cyBhcmUgb2NjdXIgaW4gb3JkZXIuXG5cdCAqIEBrbyDtjKjrhJDsnZgg7JyE7LmY66W8IOybkOuemCDsnpDrpqzroZwg65CY64+M66aw64ukLiAoW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IOydtOuypO2KuOydmCDquLDrs7jrj5nsnpHsnYQg7Leo7IaM7ZWcIOqyveyasOyXkOunjCDrj5nsnpHtlaguKSBbYmVmb3JlUmVzdG9yZV17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlUmVzdG9yZX0sIFtmbGlja117QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2t9LCBbcmVzdG9yZV17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6cmVzdG9yZX0g7J2067Kk7Yq46rCAIOywqOuhgOuhnCDrsJzsg53tlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uVmFsdWU9b3B0aW9ucy5kdXJhdGlvbl0gRHVyYXRpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50ICh1bml0OiBtcyk8a28+7Yyo64SQIOydtOuPmSDslaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlUmVzdG9yZVxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2V2ZW50OnJlc3RvcmVcblx0ICogQGV4YW1wbGVcblx0ICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpLm9uKFwiYmVmb3JlRmxpY2tTdGFydFwiLCBlID0+IHtcblx0ICogXHRpZiAoZS5ubyA9PT0gMikge1xuXHQgKiBcdFx0Ly8gQ2FuY2VscyB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgJ2JlZm9yZUZsaWNrU3RhcnQnIGV2ZW50LlxuXHQgKiBcdFx0Ly8gJ2JlZm9yZUZsaWNrU3RhcnQnIOydtOuypO2KuCDquLDrs7jrj5nsnpEg7Leo7IaMLlxuXHQgKiBcdFx0ZS5zdG9wKCk7XG5cdCAqXG5cdCAqIFx0XHQvLyBSZXR1cm4gdG8gb3JpZ2luYWwgcG9zaXRpb24uXG5cdCAqIFx0XHQvLyDsm5Drnpgg7J6Q66as66GcIOuQmOuPjOumvC5cblx0ICogXHRcdHRoaXMucmVzdG9yZSgxMDApO1xuXHQgKiBcdH1cblx0ICogfSk7XG5cdCAqL1xuXHRyZXN0b3JlKGR1cmF0aW9uVmFsdWUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBwYW5lbCA9IGNvbmYucGFuZWw7XG5cdFx0Y29uc3QgY3VyclBvcyA9IHRoaXMuX2F4ZXNJbnN0LmdldCgpLmZsaWNrO1xuXHRcdGxldCBkdXJhdGlvbiA9IGR1cmF0aW9uVmFsdWU7XG5cdFx0bGV0IGRlc3RQb3M7XG5cblx0XHQvLyBjaGVjayBpZiB0aGUgcGFuZWwgaXNuJ3QgaW4gcmlnaHQgcG9zaXRpb25cblx0XHRpZiAoY3VyclBvcyAhPT0gcGFuZWwuY3VyckluZGV4ICogcGFuZWwuc2l6ZSkge1xuXHRcdFx0Y29uZi5jdXN0b21FdmVudC5yZXN0b3JlQ2FsbCA9IHRydWU7XG5cdFx0XHRkdXJhdGlvbiA9IHV0aWxzLmdldE51bVZhbHVlKGR1cmF0aW9uLCB0aGlzLm9wdGlvbnMuZHVyYXRpb24pO1xuXG5cdFx0XHR0aGlzLl9yZXZlcnRQYW5lbE5vKCk7XG5cdFx0XHRkZXN0UG9zID0gcGFuZWwuc2l6ZSAqIHBhbmVsLmluZGV4O1xuXG5cdFx0XHR0aGlzLl90cmlnZ2VyQmVmb3JlUmVzdG9yZSh7ZGVwYVBvczogY3VyclBvcywgZGVzdFBvc30pO1xuXHRcdFx0dGhpcy5fc2V0QXhlcyhcInNldFRvXCIsIGRlc3RQb3MsIGR1cmF0aW9uKTtcblxuXHRcdFx0aWYgKCFkdXJhdGlvbikge1xuXHRcdFx0XHR0aGlzLl9hZGp1c3RDb250YWluZXJDc3MoXCJlbmRcIik7XG5cdFx0XHRcdHRoaXMuX3RyaWdnZXJSZXN0b3JlKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHRvIGhhbmRsZSBvbiBhcGkgY2FsbFxuXHRcdH0gZWxzZSBpZiAocGFuZWwuY2hhbmdlZCkge1xuXHRcdFx0dGhpcy5fcmV2ZXJ0UGFuZWxObygpO1xuXHRcdFx0Y29uZi50b3VjaC5kaXN0YW5jZSA9IGNvbmYuaW5kZXhUb01vdmUgPSAwO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBpbnB1dCBmcm9tIHRoZSBpbnB1dCBkZXZpY2UgaXMgbm90IGJsb2NrZWQgc28gdGhhdCB0aGUgcGFuZWwgY2FuIGJlIG1vdmVkIGJ5IHRoZSBpbnB1dCBkZXZpY2UuXG5cdCAqIEBrbyDrp4nslZjrjZgg7J6F66ClIOyepey5mOuhnOu2gO2EsOydmCDsnoXroKXsnYQg7ZG864ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2VuYWJsZUlucHV0XG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNkaXNhYmxlSW5wdXRcblx0ICovXG5cdGVuYWJsZUlucHV0KCkge1xuXHRcdHRoaXMuX3BhbklucHV0LmVuYWJsZSgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBpbnB1dCBmcm9tIHRoZSBpbnB1dCBkZXZpY2UgaXMgYmxvY2tlZCBzbyB0aGF0IHRoZSBwYW5lbCBpcyBub3QgbW92ZWQgYnkgdGhlIGlucHV0IGRldmljZS5cblx0ICogQGtvIO2MqOuEkOydtCDsnoXroKUg7J6l7LmY7JeQIOydmO2VtCDsm4Dsp4HsnbTsp4Ag7JWK64+E66GdIOyeheugpSDsnqXsuZjroZzrtoDthLDsnZgg7J6F66Cl7J2EIOunieuKlOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNkaXNhYmxlSW5wdXRcblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2VuYWJsZUlucHV0XG5cdCAqL1xuXHRkaXNhYmxlSW5wdXQoKSB7XG5cdFx0dGhpcy5fcGFuSW5wdXQuZGlzYWJsZSgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBjdXJyZW50IGZsaWNraW5nIHN0YXR1cy4gSWYgdGhlIHJldHVybmVkIHZhbHVlIGlzIHNwZWNpZmllZCBhcyBhIFtzZXRTdGF0dXMoKV17QGxpbmsgZWcuRmxpY2tpbmcjc2V0U3RhdHVzfSBtZXRob2QgYXJndW1lbnQsIGl0IGNhbiBiZSByZXR1cm5lZCB0byBpdHMgdmFsdWUgc3RhdGUuXG5cdCAqIEBrbyDtmITsnqwg7IOB7YOcIOqwkuydhCDrsJjtmZjtlZzri6QuIOuwmO2ZmOuwm+ydgCDqsJLsnYQgW3NldFN0YXR1cygpXXtAbGluayBlZy5GbGlja2luZyNzZXRTdGF0dXN9IOuplOyEnOuTnCDsnbjsnpDroZwg7KeA7KCV7ZWY66m0IOq3uCDqsJIg7IOB7YOc66GcIOuQmOuPjOumtCDsiJgg7J6I64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldFN0YXR1c1xuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtzdHJpbmdpZnldIFNldCB0cnVlIGlmIHdhbnQgZ2V0IHN0cmluZ2lmaWVkIHN0YXR1cyB2YWx1ZS48a28+dHJ1ZSDsp4DsoJXsi5wganNvbuusuOyekOyXtCDtmJXtg5zroZwg67CY7ZmY7ZWc64ukLjwva28+XG5cdCAqIEByZXR1cm4ge1N0YXR1c3xTdHJpbmd9IEFuIG9iamVjdCB3aXRoIGN1cnJlbnQgc3RhdGUgdmFsdWUgaW5mb3JtYXRpb24uPGtvPu2YhOyerCDsg4Htg5zqsJIg7KCV67O066W8IOqwgOynhCDqsJ3ssrQuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNzZXRTdGF0dXNcblx0ICogQGV4YW1wbGVcblx0ICogY29uc3QgZmxpY2sgPSBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG5cdCAqIGNvbnN0IHN0YXR1cyA9IGZsaWNrLmdldFN0YXR1cygpO1xuXHQgKiBjb25zdCBqc29uU3RhdXMgPSBmbGljay5nZXRTdGF0dXModHJ1ZSk7XG5cdCAqXG5cdCAqIGNvbnNvbGUubG9nKHN0YXR1cyk7IC8vIHtwYW5lbDogey4uLn0sICRsaXN0OiBBcnJheSg3KX1cblx0ICogY29uc29sZS5sb2coanNvblN0YXR1cyk7IC8vIFwie1xcXCJwYW5lbFxcXCI6e1xcXCJpbmRleFxcXCI6MyxcXFwibm9cXFwiOjYsXFxcImN1cnJJbmRleFxcXCI6MyxcXFwiY3Vyck5vXFxcIjo2fSxcXFwiJGxpc3RcXFwiOlt7XFxcInN0eWxlXFxcIjpcXFwiYmFja2dyb3VuZC1jb2xvcjogcmdiKDE1NSwgNDksIDEzNyk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCAzJmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9LHtcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTEsIDE3MiwgOTEpOyBwb3NpdGlvbjogYWJzb2x1dGU7ICBoZWlnaHQ6IDEwMCU7XFxcIixcXFwiY2xhc3NOYW1lXFxcIjpcXFwiZWctZmxpY2stcGFuZWxcXFwiLFxcXCJodG1sXFxcIjpcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Jmx0O3AmZ3Q7cGFuZWwgNCZsdDsvcCZndDtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXFwifSx7XFxcInN0eWxlXFxcIjpcXFwiYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNiwgMzgsIDI0MSk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCA1Jmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9LHtcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQxLCAxMzksIDI0KTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDYmbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn0se1xcXCJzdHlsZVxcXCI6XFxcImJhY2tncm91bmQtY29sb3I6IHJnYigyMDQsIDEwMiwgMjA0KTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDAmbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn0se1xcXCJzdHlsZVxcXCI6XFxcImJhY2tncm91bmQtY29sb3I6IHJnYig1NCwgNTMsIDE1Nik7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCAxJmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9LHtcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk2LCAyMTgsIDcyKTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDImbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn1dfVwiXG5cdCAqL1xuXHQvKipcblx0ICogVGhlIHJldHVybiB2YWx1ZSBzcGVjaWZpY2F0aW9uIG9mIHRoZSBnZXRTdGF0dXMgKCkgbWV0aG9kLlxuXHQgKiBAa28gZ2V0U3RhdHVzKCkg66mU7ISc65Oc7J2YIOuwmO2ZmOqwkiDrqoXshLguXG5cdCAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXR1c1xuXHQgKiBAcHJvcGVydHkge09iamVjdH0gcGFuZWwgY3VycmVudCBwYW5lbCBwb3NpdGlvbjxrbz7tmITsnqwg7Yyo64SQIOychOy5mDwva28+XG5cdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYW5lbC5pbmRleCBQaHlzaWNhbCBpbmRleCBudW1iZXIuPGtvPuusvOumrOyggSDsnbjrjbHsiqQg67KI7Zi4Ljwva28+XG5cdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYW5lbC5jdXJySW5kZXggQ3VycmVudCBwaHlzaWNhbCBpbmRleCBudW1iZXIuPGtvPu2YhOyerCDrrLzrpqzsoIEg7J24642x7IqkIOuyiO2YuC48L2tvPlxuXHQgKiBAcHJvcGVydHkge051bWJlcn0gcGFuZWwubm8gTG9naWNhbCBpbmRleCBudW1iZXIuPGtvPuuFvOumrOyggSDsnbjrjbHsiqQg67KI7Zi4Ljwva28+XG5cdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYW5lbC5jdXJyTm8gQ3VycmVudCBsb2dpY2FsIGluZGV4IG51bWJlci48a28+7ZiE7J6sIOuFvOumrOyggSDsnbjrjbHsiqQg67KI7Zi4Ljwva28+XG5cdCAqIEBwcm9wZXJ0eSB7QXJyYXkuPHtzdHlsZTogU3RyaW5nLCBjbGFzc05hbWU6IFN0cmluZywgaHRtbDogU3RyaW5nfT59ICRsaXN0IHBhbmVsJ3MgaHRtbDxrbz7tjKjrhJAg7KCV67O0PC9rbz5cblx0ICogQHByb3BlcnR5IHtPYmplY3R9ICRsaXN0Lm9iaiBGb3IgY29udmVuaWVuY2UsIHRoZSBlbGVtZW50IGlzIGRlbm90ZWQgYnkgb2JqLjxrbz7tjrjsnZjsg4Eg7JuQ7IaM66W8IG9iauuhnCDtkZzquLDtlag8L2tvPlxuXHQgKiBAcHJvcGVydHkge1N0cmluZ30gJGxpc3Qub2JqLnN0eWxlIFRoZSB2YWx1ZSBvZiB0aGUgc3R5bGUgYXR0cmlidXRlIG9mIHRoZSBwYW5lbCBlbGVtZW50LiAoJ3RyYW5zZm9ybScsICdsZWZ0JywgJ3RvcCcsICd3aWxsLWNoYW5nZScsICdib3gtc2l6aW5nJywgJ3dpZHRoJyBzdHlsZSBoYXMgYmVlbiBkZWxldGVkLik8a28+7Yyo64SQIOyalOyGjOydmCBzdHlsZSDsho3shLEg6rCSLiAoJ3RyYW5zZm9ybScsICdsZWZ0JywgJ3RvcCcsICd3aWxsLWNoYW5nZScsICdib3gtc2l6aW5nJywgJ3dpZHRoJyBzdHlsZeydgCDsgq3soJzrkKgpPC9rbz5cblx0ICogQHByb3BlcnR5IHtTdHJpbmd9ICRsaXN0Lm9iai5jbGFzc05hbWUgVGhlIGNsYXNzIG5hbWUgb2YgdGhlIHBhbmVsIGVsZW1lbnQuPGtvPu2MqOuEkCDsmpTshozsnZggY2xhc3Mg7J2066aELjwva28+XG5cdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSAkbGlzdC5vYmouaHRtbCBUaGUgaW5uZXJIVE1MIHZhbHVlIG9mIHRoZSBwYW5lbCBlbGVtZW50Ljxrbz7tjKjrhJAg7JqU7IaM7J2YIGlubmVySFRNTCDqsJIuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRJbmRleFxuXHQgKi9cblx0Z2V0U3RhdHVzKHN0cmluZ2lmeSkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCByeFN0eWxlID0gLygoPzotd2Via2l0LSk/dHJhbnNmb3JtfGxlZnR8dG9wfHdpbGwtY2hhbmdlfGJveC1zaXppbmd8d2lkdGgpOlteO10qOy9nO1xuXHRcdGNvbnN0IHN0YXR1cyA9IHtcblx0XHRcdC8vIGN1cnJlbnQgcGFuZWwgcG9zaXRpb25cblx0XHRcdHBhbmVsOiB7XG5cdFx0XHRcdGluZGV4OiBwYW5lbC5pbmRleCxcblx0XHRcdFx0bm86IHBhbmVsLm5vLFxuXHRcdFx0XHRjdXJySW5kZXg6IHBhbmVsLmN1cnJJbmRleCxcblx0XHRcdFx0Y3Vyck5vOiBwYW5lbC5jdXJyTm9cblx0XHRcdH0sXG5cblx0XHRcdC8vIHBhbmVsJ3MgaHRtbFxuXHRcdFx0JGxpc3Q6IHBhbmVsLiRsaXN0Lm1hcCh2ID0+ICh7XG5cdFx0XHRcdHN0eWxlOiB2LnN0eWxlLmNzc1RleHQucmVwbGFjZShyeFN0eWxlLCBcIlwiKS50cmltKCksXG5cdFx0XHRcdGNsYXNzTmFtZTogdi5jbGFzc05hbWUsXG5cdFx0XHRcdGh0bWw6IHYuaW5uZXJIVE1MXG5cdFx0XHR9KSlcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHN0cmluZ2lmeSA/XG5cdFx0XHRKU09OLnN0cmluZ2lmeShzdGF0dXMpIDogc3RhdHVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc3RvcmUgdG8gdGhlIHN0YXRlIG9mIHRoZSBgc3RhdHVzVmFsdWVgLlxuXHQgKiBAa28gYHN0YXR1c1ZhbHVlYOydmCDsg4Htg5zroZwg67O17JuQ7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI3NldFN0YXR1c1xuXHQgKiBAcGFyYW0ge1N0YXR1c3xTdHJpbmd9IHN0YXR1c1ZhbHVlIFN0YXR1cyB2YWx1ZSB0byBiZSByZXN0b3JlZC4gWW91IGNhbiBzcGVjaWZ5IHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIFtnZXRTdGF0dXMoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0U3RhdHVzfSBtZXRob2QuPGtvPuuzteybkO2VoCDsg4Htg5wg6rCSLiBbZ2V0U3RhdHVzKClde0BsaW5rIGVnLkZsaWNraW5nI2dldFN0YXR1c33rqZTshJzrk5wg67CY7ZmY6rCS7J2EIOyngOygle2VmOuptCDrkJzri6QuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRTdGF0dXNcblx0ICogQGV4YW1wbGVcblx0ICogY29uc3QgZmxpY2sgPSBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG5cdCAqIGNvbnN0IHN0YXR1cyA9IGZsaWNrLmdldFN0YXR1cygpO1xuXHQgKlxuXHQgKiAvLyBNb3ZlIHRvIGFyYml0cmFyeSBwYW5lbC5cblx0ICogLy8g7J6E7J2YIO2MqOuEkOuhnCDsnbTrj5lcblx0ICogZmxpY2subW92ZVRvKDIpO1xuXHQgKlxuXHQgKiAvLyBSZXN0b3JlIHRvIHN0YXR1cy5cblx0ICogLy8gc3RhdHVzIOyDge2DnOuhnCDrs7Xsm5Bcblx0ICogZmxpY2suc2V0U3RhdHVzKHN0YXR1cyk7XG5cdCAqL1xuXHRzZXRTdGF0dXMoc3RhdHVzVmFsdWUpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3QgaXNBZGFwdGl2ZUhlaWdodCA9IHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodDtcblx0XHRjb25zdCBzdGF0dXMgPSB0eXBlb2Ygc3RhdHVzVmFsdWUgPT09IFwic3RyaW5nXCIgP1xuXHRcdFx0SlNPTi5wYXJzZShzdGF0dXNWYWx1ZSkgOiBzdGF0dXNWYWx1ZTtcblxuXHRcdGlmIChzdGF0dXMpIHtcblx0XHRcdGZvciAoY29uc3QgeCBpbiBzdGF0dXMucGFuZWwpIHtcblx0XHRcdFx0eCBpbiBwYW5lbCAmJiAocGFuZWxbeF0gPSBzdGF0dXMucGFuZWxbeF0pO1xuXHRcdFx0fVxuXG5cdFx0XHRwYW5lbC4kbGlzdC5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBzdGF0dXMuJGxpc3RbaV07XG5cdFx0XHRcdGNvbnN0IHN0eWxlID0gZGF0YS5zdHlsZTtcblx0XHRcdFx0Y29uc3QgY2xhc3NOYW1lID0gZGF0YS5jbGFzc05hbWU7XG5cdFx0XHRcdGNvbnN0IGh0bWwgPSBkYXRhLmh0bWw7XG5cblx0XHRcdFx0c3R5bGUgJiYgKHYuc3R5bGUuY3NzVGV4dCArPSBzdHlsZSk7XG5cdFx0XHRcdGNsYXNzTmFtZSAmJiAodi5jbGFzc05hbWUgPSBjbGFzc05hbWUpO1xuXHRcdFx0XHRodG1sICYmICh2LmlubmVySFRNTCA9IGh0bWwpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlzQWRhcHRpdmVIZWlnaHQgJiYgdGhpcy5fc2V0QWRhcHRpdmVIZWlnaHQoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVmZXJlbmNlIGVsZW1lbnQgYW5kIGl0cyBjaGlsZHJlbiB0byB0aGUgc3RhdGUgdGhleSB3ZXJlIGluIGJlZm9yZSB0aGUgaW5zdGFuY2Ugd2FzIGNyZWF0ZWQuIFJlbW92ZSBhbGwgYXR0YWNoZWQgZXZlbnQgaGFuZGxlcnMuIFNwZWNpZnkgYG51bGxgIGZvciBhbGwgYXR0cmlidXRlcyBvZiB0aGUgaW5zdGFuY2UgKGluY2x1ZGluZyBpbmhlcml0ZWQgYXR0cmlidXRlcykuPGJyPklmIHBsdWdpbiBpc24ndCBlbXB0eSwgYWxzbyByZXNldCBhbGwgcGx1Z2lucyByZWdpc3RlcmVkLlxuXHQgKiBAa28g6riw7KSAIOyalOyGjOyZgCDqt7gg7ZWY7JyEIOyalOyGjOulvCDsnbjsiqTthLTsiqQg7IOd7ISx7KCE7J2YIOyDge2DnOuhnCDrkJjrj4zrprDri6QuIOu2gOywqeuQnCDrqqjrk6Ag7J2067Kk7Yq4IO2VuOuTpOufrOulvCDtg4jqsbDtlZzri6QuIOyduOyKpO2EtOyKpOydmCDrqqjrk6Ag7IaN7ISxKOyDgeyGjeuwm+ydgCDsho3shLHtj6ztlagp7JeQIGBudWxsYOydhCDsp4DsoJXtlZzri6QuPGJyPu2UjOufrOq3uOyduOydtCDruYTslrTsnojsp4Ag7JWK64uk66m0LCDtlIzrn6zqt7jsnbjrj4Qg66qo65GQIOumrOyFi+2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNkZXN0cm95XG5cdCAqIEBleGFtcGxlXG5cdCAqIGNvbnN0IGZsaWNrID0gbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpO1xuXHQgKiBmbGljay5kZXN0cm95KCk7XG5cdCAqIGNvbnNvbGUubG9nKGZsaWNrLm1vdmVUbyk7IC8vIG51bGxcblx0ICovXG5cdGRlc3Ryb3koKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3Qgb3JpZ1BhbmVsU3R5bGUgPSBjb25mLm9yaWdQYW5lbFN0eWxlO1xuXHRcdGNvbnN0IHdyYXBwZXIgPSBvcmlnUGFuZWxTdHlsZS53cmFwcGVyO1xuXHRcdGNvbnN0IGNvbnRhaW5lciA9IG9yaWdQYW5lbFN0eWxlLmNvbnRhaW5lcjtcblx0XHRjb25zdCBsaXN0ID0gb3JpZ1BhbmVsU3R5bGUubGlzdDtcblxuXHRcdC8vIHVuYmluZCBldmVudHNcblx0XHR0aGlzLl9iaW5kRXZlbnRzKGZhbHNlKTtcblx0XHR0aGlzLm9mZigpO1xuXG5cdFx0Ly8gZGVzdHJveSBlZy5BeGVzIGluc3RhbmNlXG5cdFx0dGhpcy5fYXhlc0luc3QuZGVzdHJveSgpO1xuXHRcdHRoaXMuX3BhbklucHV0LmRlc3Ryb3koKTtcblxuXHRcdC8vIHVud3JhcCBjb250YWluZXIgZWxlbWVudCBhbmQgcmVzdG9yZSBvcmlnaW5hbCBpbmxpbmUgc3R5bGVcblx0XHQvLyByZXN0b3JlIHdyYXBwZXIgc3R5bGVcblx0XHRjb25zdCAkd3JhcHBlciA9IHRoaXMuJHdyYXBwZXI7XG5cblx0XHQkd3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB3cmFwcGVyLmNsYXNzTmFtZSk7XG5cdFx0JHdyYXBwZXJbd3JhcHBlci5zdHlsZSA/IFwic2V0QXR0cmlidXRlXCIgOiBcInJlbW92ZUF0dHJpYnV0ZVwiXShcInN0eWxlXCIsIHdyYXBwZXIuc3R5bGUpO1xuXG5cdFx0Ly8gcmVzdG9yZSBjb250YWluZXIgc3R5bGVcblx0XHRjb25zdCAkY29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyO1xuXHRcdGNvbnN0ICRjaGlsZHJlbiA9IFtdXG5cdFx0XHQuc2xpY2UuY2FsbCgkY29udGFpbmVyLmNoaWxkcmVuKTtcblxuXHRcdGlmIChvcmlnUGFuZWxTdHlsZS5jb250YWluZXIuY2xhc3NOYW1lKSB7XG5cdFx0XHQkY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbnRhaW5lci5jbGFzc05hbWUpO1xuXHRcdFx0JGNvbnRhaW5lcltjb250YWluZXIuc3R5bGUgPyBcInNldEF0dHJpYnV0ZVwiIDogXCJyZW1vdmVBdHRyaWJ1dGVcIl0oXCJzdHlsZVwiLCBjb250YWluZXIuc3R5bGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkY2hpbGRyZW4uZm9yRWFjaCh2ID0+ICR3cmFwcGVyLmFwcGVuZENoaWxkKHYpKTtcblx0XHRcdCRjb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkY29udGFpbmVyKTtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMCwgJGVsOyAoJGVsID0gJGNoaWxkcmVuW2ldKTsgaSsrKSB7XG5cdFx0XHRpZiAoaSA+IGxpc3QubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHQkZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZWwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgY2xhc3NOYW1lID0gbGlzdFtpXS5jbGFzc05hbWU7XG5cdFx0XHRcdGNvbnN0IHN0eWxlID0gbGlzdFtpXS5zdHlsZTtcblxuXHRcdFx0XHQkZWxbY2xhc3NOYW1lID8gXCJzZXRBdHRyaWJ1dGVcIiA6IFwicmVtb3ZlQXR0cmlidXRlXCJdKFwiY2xhc3NcIiwgY2xhc3NOYW1lKTtcblx0XHRcdFx0JGVsW3N0eWxlID8gXCJzZXRBdHRyaWJ1dGVcIiA6IFwicmVtb3ZlQXR0cmlidXRlXCJdKFwic3R5bGVcIiwgc3R5bGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHJlbGVhc2UgcGx1Z2luIHJlc291cmNlc1xuXHRcdHRoaXMucGx1Z2lucy5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0dGhpcy5wbHVnaW5zW3ZdLiRjb21wb25lbnRXaWxsVW5tb3VudCgpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gcmVsZWFzZSByZXNvdXJjZXNcblx0XHRmb3IgKGNvbnN0IHggaW4gdGhpcykge1xuXHRcdFx0dGhpc1t4XSA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVyIHBsdWdpbiB0byBiZSB1c2VkLlxuXHQgKiBAa28g7IKs7Jqp65CgIO2UjOufrOq3uOyduOydhCDrk7HroZ3tlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjcGx1Z2luXG5cdCAqIEBleGFtcGxlXG5cdCAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKS5wbHVnaW4oW1xuXHQgKiAgICAgbmV3IGVnLkZsaWNraW5nLnBsdWdpbi5PcGFjaXR5RWZmZWN0KFwic3BhblwiKSxcblx0ICogICAgIC4uLlxuXHQgKiBdKTtcblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0cGx1Z2luKGxpc3QpIHtcblx0XHRsaXN0LmZvckVhY2gocCA9PiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIEEgbGlzdCBvZiBwbHVnaW5zIHVzZWQuXG5cdFx0XHQgKiBAa28g7IKs7Jqp65CcIO2UjOufrOq3uOyduCDrqqnroZ1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7QXJyYXl9IHBsdWdpbnMgQW4gYXJyYXkgb2YgcGx1Z2luIGluc3RhbmNlcyA8a28+7ZSM65+s6re47J24IOyduOyKpO2EtOyKpCDrsLDsl7Q8L2tvPlxuXHRcdFx0ICogQG5hbWUgcGx1Z2luc1xuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQGluc3RhbmNlXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogY29uc3QgZmxpY2sgPSBuZXcgZWcuRmxpY2tpbmcoIC4uLiApLnBsdWdpbihbIC4uLiBdKTtcblx0XHRcdCAqXG5cdFx0XHQgKiBmbGljay5wbHVnaW5zOyAvLyBbIC4uLiBdIC0gYXJyYXkgb2YgcGx1Z2luc1xuXHRcdFx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdFx0XHQgKi9cblx0XHRcdGlmICh0aGlzLnBsdWdpbnMuZmlsdGVyKHYgPT4gdi5jb25zdHJ1Y3RvciA9PT0gcC5jb25zdHJ1Y3RvcikubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRoaXMucGx1Z2lucy5wdXNoKHAuJGNvbXBvbmVudFdpbGxNb3VudCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBDb2xsZWN0aW9uIG9mIHV0aWxpdGllcyB1c2VkIGludGVybmFsbHlcblx0ICogQGtvIOuCtOu2gOyXkOyEnCDsgqzsmqnrkJjripQg7Jyg7Yu466as7YuwIOuqqOydjFxuXHQgKiBAbmFtZSB1dGlsc1xuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHByaXZhdGVcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHN0YXRpYyB1dGlscyA9IHV0aWxzO1xuXHQvKipcblx0ICogVmVyc2lvbiBpbmZvIHN0cmluZ1xuXHQgKiBAa28g67KE7KCE7KCV67O0IOusuOyekOyXtFxuXHQgKiBAbmFtZSBWRVJTSU9OXG5cdCAqIEBzdGF0aWNcblx0ICogQHR5cGUge1N0cmluZ31cblx0ICogQGV4YW1wbGVcblx0ICogZWcuRmxpY2tpbmcuVkVSU0lPTjsgIC8vIGV4KSAyLjIuMFxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICovXG5cdHN0YXRpYyBWRVJTSU9OID0gXCIyLjQuMi1zbmFwc2hvdFwiO1xuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgdXNlZCBpbnRlcm5hbGx5XG5cdCAqIEBrbyDrgrTrtoDsl5DshJwg7IKs7Jqp65CY64qUIOyDgeyImCDqsJJcblx0ICogQG5hbWUgY29uc3RzXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0c3RhdGljIGNvbnN0cyA9IHtcblx0XHRFVkVOVFMsXG5cdFx0VFJBTlNGT1JNLFxuXHRcdFNVUFBPUlRfV0lMTENIQU5HRSxcblx0XHRJU19BTkRST0lEMlxuXHR9O1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3Igbm9uZSBkaXJlY3Rpb24uXG5cdCAqIEBrbyBub25lIOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX05PTkVcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDFcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fTk9ORSA9IEF4ZXMuRElSRUNUSU9OX05PTkU7XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciBsZWZ0IGRpcmVjdGlvbi5cblx0ICogQGtvIGxlZnQg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fTEVGVFxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgMlxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9MRUZUID0gQXhlcy5ESVJFQ1RJT05fTEVGVDtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIHJpZ2h0IGRpcmVjdGlvbi5cblx0ICogQGtvIHJpZ2h0IOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX1JJR0hUXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCA0XG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX1JJR0hUID0gQXhlcy5ESVJFQ1RJT05fUklHSFQ7XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciB1cCBkaXJlY3Rpb24uXG5cdCAqIEBrbyB1cCDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9VUFxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgOFxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9VUCA9IEF4ZXMuRElSRUNUSU9OX1VQO1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3IgZG93biBkaXJlY3Rpb24uXG5cdCAqIEBrbyBkb3duIOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX0RPV05cblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDE2XG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX0RPV04gPSBBeGVzLkRJUkVDVElPTl9ET1dOO1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3IgaG9yaXpvbnRhbCBkaXJlY3Rpb24uXG5cdCAqIEBrbyBob3Jpem9udGFsIOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX0hPUklaT05UQUxcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDZcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fSE9SSVpPTlRBTCA9IEF4ZXMuRElSRUNUSU9OX0hPUklaT05UQUw7XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciB2ZXJ0aWNhbCBkaXJlY3Rpb24uXG5cdCAqIEBrbyB2ZXJ0aWNhbCDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9WRVJUSUNBTFxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgMjRcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fVkVSVElDQUwgPSBBeGVzLkRJUkVDVElPTl9WRVJUSUNBTDtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIGFsbCBkaXJlY3Rpb24uXG5cdCAqIEBrbyBhbGwg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fQUxMXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCAzMFxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9BTEwgPSBBeGVzLkRJUkVDVElPTl9BTEw7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9