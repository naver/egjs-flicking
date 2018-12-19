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

      return this.moveTo(index, duration);
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

      return this.moveTo(index, duration);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZy5GbGlja2luZy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL2NvbnN0cy5qcyIsIndlYnBhY2s6Ly9lZy5GbGlja2luZy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZWcuRmxpY2tpbmcvLi9zcmMvZXZlbnRIYW5kbGVyLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL0ZsaWNraW5nLmpzIl0sIm5hbWVzIjpbIndpbiIsIndpbmRvdyIsImRvY3VtZW50IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidXRpbHMiLCIkIiwicGFyYW0iLCJlbCIsIm1hdGNoIiwiY3JlYXRlRWxlbWVudCIsImxlbmd0aCIsInNwbGl0IiwiZm9yRWFjaCIsInYiLCJhdHRyIiwic2V0QXR0cmlidXRlIiwidHJpbSIsInJlcGxhY2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwibm9kZU5hbWUiLCJub2RlVHlwZSIsInRvQXJyYXkiLCJzbGljZSIsImNhbGwiLCJpc0FycmF5IiwiYXJyIiwiY29uc3RydWN0b3IiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwiZXh0ZW5kIiwidGFyZ2V0Iiwib2JqZWN0TiIsInNvdXJjZSIsInNoaWZ0IiwiT2JqZWN0Iiwia2V5cyIsImtleSIsInZhbHVlIiwiY29uY2F0IiwiY3NzIiwic3R5bGUiLCJnZXRBc051bWJlciIsInRlc3QiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0TnVtVmFsdWUiLCJhcHBseVN0eWxlIiwiY2xhc3NMaXN0IiwiY2xhc3NOYW1lIiwiYWRkIiwiaXNBZGRQYXJhbSIsInJlcyIsImluZGV4T2YiLCJSZWdFeHAiLCJ2YWwiLCJkZWZWYWwiLCJudW0iLCJpc05hTiIsInBhcnNlRmxvYXQiLCJnZXRVbml0VmFsdWUiLCJyeCIsIlN0cmluZyIsImdldE91dGVyIiwidHlwZSIsInBhZGRpbmdNYXJnaW4iLCJkaXIiLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsInRyYW5zbGF0ZSIsIngiLCJ5IiwiaXNIQSIsImhhc0NsaWNrQnVnIiwidWEiLCJyZXN1bHQiLCJNaXhpbkJ1aWxkZXIiLCJzdXBlcmNsYXNzIiwibWl4aW5zIiwicmVkdWNlIiwiYyIsIm0iLCJNaXhpbiIsIkVWRU5UUyIsImJlZm9yZUZsaWNrU3RhcnQiLCJiZWZvcmVSZXN0b3JlIiwiZmxpY2siLCJmbGlja0VuZCIsInJlc3RvcmUiLCJUUkFOU0ZPUk0iLCJuYW1lIiwic3VwcG9ydCIsImRvY3VtZW50RWxlbWVudCIsIlNVUFBPUlRfV0lMTENIQU5HRSIsIkNTUyIsInN1cHBvcnRzIiwiSVNfQU5EUk9JRDIiLCJEQVRBX0hFSUdIVCIsIkNPTkZJRyIsInBhbmVsIiwiJGxpc3QiLCJpbmRleCIsIm5vIiwiY3VyckluZGV4IiwiY3Vyck5vIiwic2l6ZSIsImNvdW50Iiwib3JpZ0NvdW50IiwiY2hhbmdlZCIsImFuaW1hdGluZyIsIm1pbkNvdW50IiwidG91Y2giLCJob2xkUG9zIiwiZGVzdFBvcyIsImRpc3RhbmNlIiwiZGlyZWN0aW9uIiwibGFzdFBvcyIsImhvbGRpbmciLCJpc1RydXN0ZWQiLCJjdXN0b21FdmVudCIsInJlc3RvcmVDYWxsIiwiZGlyRGF0YSIsImluZGV4VG9Nb3ZlIiwiJGR1bW15QW5jaG9yIiwiT1BUSU9OUyIsImh3QWNjZWxlcmFibGUiLCJwcmVmaXgiLCJkZWNlbGVyYXRpb24iLCJob3Jpem9udGFsIiwiY2lyY3VsYXIiLCJwcmV2aWV3UGFkZGluZyIsImJvdW5jZSIsInRocmVzaG9sZCIsImR1cmF0aW9uIiwicGFuZWxFZmZlY3QiLCJNYXRoIiwicG93IiwiZGVmYXVsdEluZGV4IiwiaW5wdXRUeXBlIiwidGhyZXNob2xkQW5nbGUiLCJhZGFwdGl2ZUhlaWdodCIsInpJbmRleCIsInVzZVRyYW5zbGF0ZSIsIl9ob2xkSGFuZGxlciIsImUiLCJjb25mIiwiX2NvbmYiLCJwb3MiLCJfYWRqdXN0Q29udGFpbmVyQ3NzIiwiX2NoYW5nZUhhbmRsZXIiLCJldmVudFJlcyIsIm1vdmVkUHgiLCJfc2V0UG9pbnRlckV2ZW50cyIsImlucHV0RXZlbnQiLCJvcHRpb25zIiwiYWJzIiwiX3RyaWdnZXJFdmVudCIsIl9zZXRUcmFuc2xhdGUiLCJfcmVsZWFzZUhhbmRsZXIiLCJwYW5lbFNpemUiLCJpc1BsdXNNb3ZlIiwiZGVwYVBvcyIsIm1vdmVUbyIsIl9pc01vdmFibGUiLCJfdHJpZ2dlckJlZm9yZVJlc3RvcmUiLCJzZXRUbyIsIl9hbmltYXRpb25TdGFydEhhbmRsZXIiLCJpc0Zyb21JbnB1dCIsIl9zZXRQaGFzZVZhbHVlIiwic3RvcCIsIl9hbmltYXRpb25FbmRIYW5kbGVyIiwiX3RyaWdnZXJSZXN0b3JlIiwiRmxpY2tpbmciLCJlbGVtZW50IiwiX3ByZWZpeCIsIiR3cmFwcGVyIiwicGx1Z2lucyIsIiRjaGlsZHJlbiIsImNoaWxkcmVuIiwiRXJyb3IiLCJfc2V0T3B0aW9ucyIsIl9zZXRDb25maWciLCJfYnVpbGQiLCJfYmluZEV2ZW50cyIsIl9hcHBseVBhbmVsc0NzcyIsIl9hcnJhbmdlUGFuZWxzIiwiX3NldEhpbnQiLCJfc2V0QWRhcHRpdmVIZWlnaHQiLCJhcnJWYWwiLCJwYWRkaW5nIiwiJG5vZGVzIiwiJGNvbnRhaW5lciIsIm9yaWdQYW5lbFN0eWxlIiwid3JhcHBlciIsImdldEF0dHJpYnV0ZSIsImNvbnRhaW5lciIsImxpc3QiLCJtYXAiLCJ1c2VMYXllckhhY2siLCJldmVudFByZWZpeCIsInB1c2giLCJwYW5lbENvdW50IiwiX3NldFBhZGRpbmciLCJzaXplVmFsdWUiLCJfZ2V0RGF0YUJ5RGlyZWN0aW9uIiwiY3NzVmFsdWUiLCJwb3NpdGlvbiIsIndpZHRoIiwiaGVpZ2h0IiwidG9wIiwiJHBhcmVudCIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsImJveFNpemluZyIsImxlZnQiLCJfYWRkQ2xvbmVQYW5lbHMiLCJfYXhlc0luc3QiLCJyYW5nZSIsImVhc2luZyIsImludGVycnVwdGFibGUiLCJfc2V0RGVmYXVsdFBhbmVsIiwiYnVpbGQiLCJwYWRkaW5nU3VtIiwiYSIsInJldmVyc2UiLCJqb2luIiwib3ZlcmZsb3ciLCJwYWRkaW5nVHlwZSIsIndyYXBwZXJTaXplIiwibWF4IiwiY2xvbmVDb3VudCIsImNsb25lTm9kZXMiLCJjbG9uZU5vZGUiLCJfbW92ZVBhbmVsUG9zaXRpb24iLCJhcHBlbmQiLCJsaXN0VG9Nb3ZlIiwic3BsaWNlIiwibGFzdEluZGV4IiwiY29vcmRzIiwiYmFzZUluZGV4IiwiX2dldEJhc2VQb3NpdGlvbkluZGV4IiwiX3NldFBhbmVsTm8iLCJfc2V0QXhlcyIsInNvcnQiLCJfYXJyYW5nZVBhbmVsUG9zaXRpb24iLCJfYXBwbHlQYW5lbHNQb3MiLCJiaW5kIiwiX3NldE1vdmVTdHlsZSIsIiRlbCIsImNvb3Jkc1ZhbHVlIiwidHJhbnNmb3JtIiwiJGVsZW1lbnQiLCJkdW1teUFuY2hvckNsYXNzTmFtZSIsImkiLCJwaGFzZSIsInRvVmFsdWUiLCJwYWRkaW5nVG9wIiwidG8iLCJfZ2V0Q29vcmRzVmFsdWUiLCJmb2N1cyIsIm1ldGhvZCIsIndpbGxDaGFuZ2UiLCJkYXRhIiwibmV4dCIsImZsb29yIiwiYXhlc0luc3QiLCJfcGFuSW5wdXQiLCJzY2FsZSIsIm9uIiwiaG9sZCIsImNoYW5nZSIsInJlbGVhc2UiLCJhbmltYXRpb25TdGFydCIsImFuaW1hdGlvbkVuZCIsImNvbm5lY3QiLCJkaXNhYmxlSW5wdXQiLCJvZmYiLCIkcGFuZWwiLCJESVJFQ1RJT05fTEVGVCIsIkRJUkVDVElPTl9SSUdIVCIsIiRmaXJzdCIsInF1ZXJ5U2VsZWN0b3IiLCJfZ2V0TnVtQnlEaXJlY3Rpb24iLCJfcmV2ZXJ0UGFuZWxObyIsInBvaW50ZXIiLCJwb2ludGVyRXZlbnRzIiwicHJldmVudFN5c3RlbUV2ZW50IiwiaXNNb3ZhYmxlIiwiY3VyclBvcyIsImF4aXMiLCJnZXQiLCJ0cmlnZ2VyIiwiZXZlbnRUeXBlIiwiX2dldEVsZW1lbnQiLCJwaHlzaWNhbCIsInRvdGFsIiwiY3VycmVudEluZGV4IiwiX3NldFZhbHVlVG9Nb3ZlIiwiZ2V0SW5kZXgiLCJnZXRFbGVtZW50IiwiZ2V0TmV4dEVsZW1lbnQiLCJnZXROZXh0SW5kZXgiLCJnZXRBbGxFbGVtZW50cyIsImdldFByZXZFbGVtZW50IiwiZ2V0UHJldkluZGV4IiwiaXNQbGF5aW5nIiwiX21vdmVQYW5lbEJ5UGhhc2UiLCJkdXJhdGlvblZhbHVlIiwicHJldiIsIm5vVmFsdWUiLCJpc1Bvc2l0aXZlIiwicmVzaXplIiwicmVtb3ZlQXR0cmlidXRlIiwiZW5hYmxlSW5wdXQiLCJlbmFibGUiLCJkaXNhYmxlIiwiZ2V0U3RhdHVzIiwic3RyaW5naWZ5IiwicnhTdHlsZSIsInN0YXR1cyIsImNzc1RleHQiLCJodG1sIiwiaW5uZXJIVE1MIiwiSlNPTiIsInNldFN0YXR1cyIsInN0YXR1c1ZhbHVlIiwiaXNBZGFwdGl2ZUhlaWdodCIsInBhcnNlIiwiZGVzdHJveSIsInJlbW92ZUNoaWxkIiwiJGNvbXBvbmVudFdpbGxVbm1vdW50IiwicGx1Z2luIiwicCIsImZpbHRlciIsIiRjb21wb25lbnRXaWxsTW91bnQiLCJWRVJTSU9OIiwiY29uc3RzIiwiRElSRUNUSU9OX05PTkUiLCJESVJFQ1RJT05fVVAiLCJESVJFQ1RJT05fRE9XTiIsIkRJUkVDVElPTl9IT1JJWk9OVEFMIiwiRElSRUNUSU9OX1ZFUlRJQ0FMIiwiRElSRUNUSU9OX0FMTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztBQUlBO0FBRUEsSUFBSUEsR0FBSjs7QUFFQSxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDbEM7QUFDQUQsS0FBRyxHQUFHO0FBQ0xFLFlBQVEsRUFBRSxFQURMO0FBRUxDLGFBQVMsRUFBRTtBQUNWQyxlQUFTLEVBQUU7QUFERDtBQUZOLEdBQU47QUFNQSxDQVJELE1BUU87QUFDTkosS0FBRyxHQUFHQyxNQUFOO0FBQ0E7QUFDRDs7O0FBRUEsSUFB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Ozs7Ozs7O0lBdGtEcUMsS0FBSyxDQUFDLHFDQUFELENBQUwsU0FBc0IsWUFBdEIsQzs7QUFBakJsSyxVLENBZ2xEYnhLLEssR0FBUSxLO0FBaGxES3dLLFUsQ0EybERibUssTyxHQUFVLGdCO0FBM2xER25LLFUsQ0FzbURib0ssTSxHQUFTO0FBQ2Y3UCxVQUFNLEVBQU4sTUFEZTtBQUVmTSxhQUFTLEVBQVQsU0FGZTtBQUdmSSxzQkFBa0IsRUFBbEIsa0JBSGU7QUFJZkcsZUFBVyxFQUFYLFdBQUFBO0FBSmUsRztBQXRtREk0RSxVLENBdW5EYnFLLGMsR0FBaUIsMkJBQUksQ0FBQ0EsYztBQXZuRFRySyxVLENBbW9EYjBHLGMsR0FBaUIsMkJBQUksQ0FBQ0EsYztBQW5vRFQxRyxVLENBK29EYjJHLGUsR0FBa0IsMkJBQUksQ0FBQ0EsZTtBQS9vRFYzRyxVLENBMnBEYnNLLFksR0FBZSwyQkFBSSxDQUFDQSxZO0FBM3BEUHRLLFUsQ0F1cURidUssYyxHQUFpQiwyQkFBSSxDQUFDQSxjO0FBdnFEVHZLLFUsQ0FtckRid0ssb0IsR0FBdUIsMkJBQUksQ0FBQ0Esb0I7QUFuckRmeEssVSxDQStyRGJ5SyxrQixHQUFxQiwyQkFBSSxDQUFDQSxrQjtBQS9yRGJ6SyxVLENBMnNEYjBLLGEsR0FBZ0IsMkJBQUksQ0FBQ0EsYTtTQTNzRFIxSyxRIiwiZmlsZSI6IjAuOGI2YThlMjY3M2NhNzYwMDBkNTIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5cbmxldCB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdC8vIHdpbmRvdyBpcyB1bmRlZmluZWQgaW4gbm9kZS5qc1xuXHR3aW4gPSB7XG5cdFx0ZG9jdW1lbnQ6IHt9LFxuXHRcdG5hdmlnYXRvcjoge1xuXHRcdFx0dXNlckFnZW50OiBcIlwiXG5cdFx0fVxuXHR9O1xufSBlbHNlIHtcblx0d2luID0gd2luZG93O1xufVxuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tbmVzdGVkLXRlcm5hcnkgKi9cblxuY29uc3QgZG9jdW1lbnQgPSB3aW4uZG9jdW1lbnQ7XG5cbmV4cG9ydCB7XG5cdHdpbiBhcyB3aW5kb3csXG5cdGRvY3VtZW50XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge3dpbmRvdywgZG9jdW1lbnR9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuY29uc3QgdXRpbHMgPSB7XG5cdC8qKlxuXHQgKiBTZWxlY3Qgb3IgY3JlYXRlIGVsZW1lbnRcblx0ICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR9IHBhcmFtXG5cdCAqICB3aGVuIHN0cmluZyBnaXZlbiBpcyBhcyBIVE1MIHRhZywgdGhlbiBjcmVhdGUgZWxlbWVudFxuXHQgKiAgb3RoZXJ3aXNlIGl0IHJldHVybnMgc2VsZWN0ZWQgZWxlbWVudHNcblx0ICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuXHQgKi9cblx0JChwYXJhbSkge1xuXHRcdGxldCBlbCA9IG51bGw7XG5cblx0XHRpZiAodHlwZW9mIHBhcmFtID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHQvLyBjaGVjayBpZiBzdHJpbmcgaXMgSFRNTCB0YWcgZm9ybWF0XG5cdFx0XHRjb25zdCBtYXRjaCA9IHBhcmFtLm1hdGNoKC9ePChbYS16XSspXFxzKihbXj5dKik+Lyk7XG5cblx0XHRcdC8vIGNyZWF0aW5nIGVsZW1lbnRcblx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobWF0Y2hbMV0pO1xuXG5cdFx0XHRcdC8vIGF0dHJpYnV0ZXNcblx0XHRcdFx0bWF0Y2gubGVuZ3RoID09PSAzICYmXG5cdFx0XHRcdFx0bWF0Y2hbMl0uc3BsaXQoXCIgXCIpLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBhdHRyID0gdi5zcGxpdChcIj1cIik7XG5cblx0XHRcdFx0XHRcdGVsLnNldEF0dHJpYnV0ZShhdHRyWzBdLCBhdHRyWzFdLnRyaW0oKS5yZXBsYWNlKC8oXltcIiddfFtcIiddJCkvZywgXCJcIikpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtKTtcblxuXHRcdFx0XHRpZiAoIWVsLmxlbmd0aCkge1xuXHRcdFx0XHRcdGVsID0gbnVsbDtcblx0XHRcdFx0fSBlbHNlIGlmIChlbC5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRlbCA9IGVsWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChwYXJhbS5ub2RlTmFtZSAmJiBwYXJhbS5ub2RlVHlwZSA9PT0gMSkge1xuXHRcdFx0ZWwgPSBwYXJhbTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZWw7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRvIGFycmF5XG5cdCAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb258SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEByZXR1cm5zIHtBcnJheX1cblx0ICovXG5cdHRvQXJyYXkoZWwpIHtcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChlbCk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIGlzIGFycmF5XG5cdCAqIEBwYXJhbSBhcnJcblx0ICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAqL1xuXHRpc0FycmF5KGFycikge1xuXHRcdHJldHVybiBhcnIgJiYgYXJyLmNvbnN0cnVjdG9yID09PSBBcnJheTtcblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgaWYgaXMgb2JqZWN0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0ICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAqL1xuXHRpc09iamVjdChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiAhdGhpcy5pc0FycmF5KG9iaik7XG5cdH0sXG5cblx0LyoqXG5cdCAqIE1lcmdlIG9iamVjdCByZXR1cm5pbmcgbmV3IG9iamVjdFxuXHQgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3ROXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XG5cdCAqIEBleGFtcGxlXG5cdCAqICB2YXIgdGFyZ2V0ID0geyBhOiAxIH07XG5cdCAqICB1dGlscy5leHRlbmQodGFyZ2V0LCB7IGI6IDIsIGM6IDMgfSk7XG5cdCAqICB0YXJnZXQ7ICAvLyB7IGE6IDEsIGI6IDIsIGM6IDMgfTtcblx0ICovXG5cdGV4dGVuZCh0YXJnZXQsIC4uLm9iamVjdE4pIHtcblx0XHRpZiAoIW9iamVjdE4ubGVuZ3RoIHx8IChvYmplY3ROLmxlbmd0aCA9PT0gMSAmJiAhb2JqZWN0TlswXSkpIHtcblx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc291cmNlID0gb2JqZWN0Ti5zaGlmdCgpO1xuXG5cdFx0aWYgKHRoaXMuaXNPYmplY3QodGFyZ2V0KSAmJiB0aGlzLmlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHRcdGlmICh0aGlzLmlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XG5cblx0XHRcdFx0XHR0YXJnZXRba2V5XSA9IHRoaXMuZXh0ZW5kKHRhcmdldFtrZXldLCB2YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFyZ2V0W2tleV0gPSB0aGlzLmlzQXJyYXkodmFsdWUpID9cblx0XHRcdFx0XHRcdHZhbHVlLmNvbmNhdCgpIDogdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmV4dGVuZCh0YXJnZXQsIC4uLm9iamVjdE4pO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgb3Igc2V0IHRoZSBzdHlsZSB2YWx1ZSBvciBhcHBseVxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEFycmF5fSBlbFxuXHQgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHN0eWxlXG5cdCAqICBTdHJpbmc6IHJldHVybiBzdHlsZSBwcm9wZXJ0eSB2YWx1ZVxuXHQgKiAgT2JqZWN0OiBzZXQgc3R5bGUgdmFsdWVcblx0ICogQHBhcmFtIHtCb29sZWFufSBnZXRBc051bWJlciBHZXQgdGhlIHZhbHVlIGFzIG51bWJlclxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfEhUTUxFbGVtZW50fVxuXHQgKi9cblx0Y3NzKGVsLCBzdHlsZSwgZ2V0QXNOdW1iZXIpIHtcblx0XHRpZiAodHlwZW9mKHN0eWxlKSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0bGV0IHZhbHVlID0gZWwuc3R5bGVbc3R5bGVdO1xuXG5cdFx0XHRpZiAoIXZhbHVlIHx8IHZhbHVlID09PSBcImF1dG9cIiB8fCAoL1xcZC8udGVzdCh2YWx1ZSkgJiYgIS9cXGQocHgpPyQvLnRlc3QodmFsdWUpKSkge1xuXHRcdFx0XHR2YWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVtzdHlsZV07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBnZXRBc051bWJlciA/IHRoaXMuZ2V0TnVtVmFsdWUodmFsdWUpIDogdmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGFwcGx5U3R5bGUgPSAodGFyZ2V0LCBzb3VyY2UpID0+XG5cdFx0XHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0XHR0YXJnZXRbdl0gPSBzb3VyY2Vbdl07XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmlzQXJyYXkoZWwpID9cblx0XHRcdFx0ZWwuZm9yRWFjaCh2ID0+IGFwcGx5U3R5bGUodi5zdHlsZSwgc3R5bGUpKSA6XG5cdFx0XHRcdGFwcGx5U3R5bGUoZWwuc3R5bGUsIHN0eWxlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZWw7XG5cdH0sXG5cblx0LyoqXG5cdCAqIGNsYXNzTGlzdFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0YXJnZXQgRE9NIGVsZW1lbnRcblx0ICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBjbGFzcyBuYW1lIHN0cmluZyB0byBiZSBoYW5kbGVkXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYWRkIEFkZCBvciByZW1vdmUgY2xhc3MgLSB0cnVlOiBBZGQsIGZhbHNlOiBSZW1vdmVcblx0ICogQHJldHVybiB7Qm9vbGVhbn0gaWYgYWRkIHBhcmFtIGlzIG1pc3NpbmcsIHRoZW4gcmV0dXJuIGV4aXN0ZW5jZSBvZiBjbGFzcyBuYW1lXG5cdCAqL1xuXHRjbGFzc0xpc3QoZWwsIGNsYXNzTmFtZSwgYWRkKSB7XG5cdFx0Y29uc3QgaXNBZGRQYXJhbSA9IHR5cGVvZiBhZGQgPT09IFwiYm9vbGVhblwiO1xuXHRcdGxldCByZXM7XG5cblx0XHRpZiAoZWwuY2xhc3NMaXN0KSB7XG5cdFx0XHRyZXMgPSBlbC5jbGFzc0xpc3RbXG5cdFx0XHRcdChpc0FkZFBhcmFtICYmIChhZGQgPyBcImFkZFwiIDogXCJyZW1vdmVcIikpIHx8IFwiY29udGFpbnNcIlxuXHRcdFx0XShjbGFzc05hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXMgPSBlbC5jbGFzc05hbWU7XG5cblx0XHRcdGlmIChpc0FkZFBhcmFtKSB7XG5cdFx0XHRcdGlmIChhZGQgJiYgcmVzLmluZGV4T2YoY2xhc3NOYW1lKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRyZXMgPSBlbC5jbGFzc05hbWUgPSAoYCR7cmVzfSAke2NsYXNzTmFtZX1gKS5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKTtcblx0XHRcdFx0fSBlbHNlIGlmICghYWRkKSB7XG5cdFx0XHRcdFx0cmVzID0gZWwuY2xhc3NOYW1lID0gcmVzLnJlcGxhY2UoY2xhc3NOYW1lLCBcIlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzID0gbmV3IFJlZ0V4cChgXFxcXGIke2NsYXNzTmFtZX1cXFxcYmApLnRlc3QocmVzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDaGVjayBhbmQgcGFyc2UgdmFsdWUgdG8gbnVtYmVyXG5cdCAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gdmFsXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkZWZWYWxcblx0ICogQHJldHVybiB7TnVtYmVyfVxuXHQgKi9cblx0Z2V0TnVtVmFsdWUodmFsLCBkZWZWYWwpIHtcblx0XHRsZXQgbnVtID0gdmFsO1xuXG5cdFx0cmV0dXJuIGlzTmFOKG51bSA9IHBhcnNlRmxvYXQobnVtKSkgPyBkZWZWYWwgOiBudW07XG5cdH0sXG5cblx0LyoqXG5cdCAqIFJldHVybiB1bml0IGZvcm1hdHRlZCB2YWx1ZVxuXHQgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHZhbFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IHZhbCBWYWx1ZSBmb3JtYXR0ZWQgd2l0aCB1bml0XG5cdCAqL1xuXHRnZXRVbml0VmFsdWUodmFsKSB7XG5cdFx0Y29uc3QgcnggPSAvKD86W2Etel17Mix9fCUpJC87XG5cblx0XHRyZXR1cm4gKHBhcnNlRmxvYXQodmFsKSB8fCAwKSArIChTdHJpbmcodmFsKS5tYXRjaChyeCkgfHwgXCJweFwiKTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0IGVsZW1lbnQncyBvdXRlciB2YWx1ZVxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFtvdXRlcldpZHRofG91dGVySGVpZ2h0XVxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBvdXRlcidzIHZhbHVlXG5cdCAqL1xuXHRnZXRPdXRlcihlbCwgdHlwZSkge1xuXHRcdGxldCBwYWRkaW5nTWFyZ2luID0gMDtcblxuXHRcdCh0eXBlID09PSBcIm91dGVyV2lkdGhcIiA/XG5cdFx0XHRbXCJMZWZ0XCIsIFwiUmlnaHRcIl0gOlxuXHRcdFx0W1wiVG9wXCIsIFwiQm90dG9tXCJdXG5cdFx0KS5mb3JFYWNoKGRpciA9PiB7XG5cdFx0XHRbXCJwYWRkaW5nXCIsIFwibWFyZ2luXCJdLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdHBhZGRpbmdNYXJnaW4gKz0gdGhpcy5jc3MoZWwsIGAke3Z9JHtkaXJ9YCwgdHJ1ZSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzLmNzcyhlbCwgdHlwZS5yZXBsYWNlKFwib3V0ZXJcIiwgXCJcIikudG9Mb2NhbGVMb3dlckNhc2UoKSwgdHJ1ZSkgKyBwYWRkaW5nTWFyZ2luO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgZWxlbWVudCdzIG91dGVyV2lkdGggdmFsdWUgd2l0aCBtYXJnaW5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcblx0ICogQHJldHVybnMge051bWJlcn1cblx0ICovXG5cdG91dGVyV2lkdGgoZWwpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPdXRlcihlbCwgXCJvdXRlcldpZHRoXCIpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXQgZWxlbWVudCdzIG91dGVySGVpZ2h0IHZhbHVlIHdpdGggbWFyZ2luXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9XG5cdCAqL1xuXHRvdXRlckhlaWdodChlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE91dGVyKGVsLCBcIm91dGVySGVpZ2h0XCIpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBzeW50YXggb2YgdGhlIHRyYW5zbGF0ZSBzdHlsZSB3aGljaCBpcyBhcHBsaWVkIHRvIENTUyB0cmFuc2l0aW9uIHByb3BlcnRpZXMuXG5cdCAqXG5cdCAqIEBrbyBDU1Mg7Yq4656c7KeA7IWYIOyGjeyEseyXkCDsoIHsmqntlaAgdHJhbnNsYXRlIOyKpO2DgOydvCDqtazrrLjsnYQg67CY7ZmY7ZWc64ukXG5cdCAqIEBtZXRob2QgZWcjdHJhbnNsYXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB4IERpc3RhbmNlIHRvIG1vdmUgYWxvbmcgdGhlIFggYXhpcyA8a28+eOy2leydhCDrlLDrnbwg7J2064+Z7ZWgIOqxsOumrDwva28+XG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB5IERpc3RhbmNlIHRvIG1vdmUgYWxvbmcgdGhlIFkgYXhpcyA8a28+eey2leydhCDrlLDrnbwg7J2064+Z7ZWgIOqxsOumrDwva28+XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzSEFdIEZvcmNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiA8a28+7ZWY65Oc7Juo7Ja0IOqwgOyGjSDsgqzsmqkg7Jes67aAPC9rbz5cblx0ICogQHJldHVybiB7U3RyaW5nfSBTeW50YXggb2YgdGhlIHRyYW5zbGF0ZSBzdHlsZSA8a28+dHJhbnNsYXRlIOyKpO2DgOydvCDqtazrrLg8L2tvPlxuXHQgKi9cblx0dHJhbnNsYXRlKHgsIHksIGlzSEEpIHtcblx0XHRyZXR1cm4gaXNIQSB8fCBmYWxzZSA/XG5cdFx0XHRgdHJhbnNsYXRlM2QoJHt4fSwke3l9LDApYCA6IGB0cmFuc2xhdGUoJHt4fSwke3l9KWA7XG5cdH0sXG5cblx0Ly8gMS4gdXNlciBwcmVzcyBvbmUgcG9zaXRpb24gb24gc2NyZWVuLlxuXHQvLyAyLiB1c2VyIG1vdmVzIHRvIHRoZSBvdGhlciBwb3NpdGlvbiBvbiBzY3JlZW4uXG5cdC8vIDMuIHdoZW4gdXNlciByZWxlYXNlcyBmaW5nZXJzIG9uIHNjcmVlbiwgJ2NsaWNrJyBldmVudCBpcyBmaXJlZCBhdCBwcmV2aW91cyBwb3NpdGlvbi5cblx0aGFzQ2xpY2tCdWcoKSB7XG5cdFx0Y29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblx0XHRjb25zdCByZXN1bHQgPSAvaVBob25lfGlQYWQvLnRlc3QodWEpO1xuXG5cdFx0dGhpcy5oYXNDbGlja0J1ZyA9ICgpID0+IHJlc3VsdDtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG59O1xuXG5jbGFzcyBNaXhpbkJ1aWxkZXIge1xuXHRjb25zdHJ1Y3RvcihzdXBlcmNsYXNzKSB7XG5cdFx0dGhpcy5zdXBlcmNsYXNzID0gc3VwZXJjbGFzcyB8fCBjbGFzcyB7fTtcblx0fVxuXG5cdHdpdGgoLi4ubWl4aW5zKSB7XG5cdFx0cmV0dXJuIG1peGlucy5yZWR1Y2UoKGMsIG0pID0+IG0oYyksIHRoaXMuc3VwZXJjbGFzcyk7XG5cdH1cbn1cblxuY29uc3QgTWl4aW4gPSBzdXBlcmNsYXNzID0+IG5ldyBNaXhpbkJ1aWxkZXIoc3VwZXJjbGFzcyk7XG5cbmV4cG9ydCB7dXRpbHMsIE1peGlufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHt3aW5kb3cgYXMgZ2xvYmFsLCBkb2N1bWVudCBhcyBkb2N9IGZyb20gXCIuL2Jyb3dzZXJcIjtcblxuLy8gZGVmaW5lIGN1c3RvbSBldmVudHMgbmFtZVxuY29uc3QgRVZFTlRTID0ge1xuXHRiZWZvcmVGbGlja1N0YXJ0OiBcImJlZm9yZUZsaWNrU3RhcnRcIixcblx0YmVmb3JlUmVzdG9yZTogXCJiZWZvcmVSZXN0b3JlXCIsXG5cdGZsaWNrOiBcImZsaWNrXCIsXG5cdGZsaWNrRW5kOiBcImZsaWNrRW5kXCIsXG5cdHJlc3RvcmU6IFwicmVzdG9yZVwiXG59O1xuXG4vLyBjaGVjayBmb3IgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0eVxuY29uc3QgVFJBTlNGT1JNID0ge1xuXHRuYW1lOiBcInRyYW5zZm9ybVwiXG59O1xuXG5UUkFOU0ZPUk0uc3VwcG9ydCA9ICgoKSA9PiB7XG5cdGlmICghZG9jLmRvY3VtZW50RWxlbWVudCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCBzdHlsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cblx0cmV0dXJuIFRSQU5TRk9STS5uYW1lIGluIHN0eWxlIHx8IChUUkFOU0ZPUk0ubmFtZSA9IFwid2Via2l0VHJhbnNmb3JtXCIpIGluIHN0eWxlO1xufSkoKTtcblxuLy8gY2hlY2sgZm9yIHdpbGwtY2hhbmdlIHN1cHBvcnRcbmNvbnN0IFNVUFBPUlRfV0lMTENIQU5HRSA9IGdsb2JhbC5DU1MgJiYgZ2xvYmFsLkNTUy5zdXBwb3J0cyAmJlxuXHRnbG9iYWwuQ1NTLnN1cHBvcnRzKFwid2lsbC1jaGFuZ2VcIiwgXCJ0cmFuc2Zvcm1cIik7XG5cbi8vIGNoZWNrIGZvciBBbmRyb2lkIDIueFxuY29uc3QgSVNfQU5EUk9JRDIgPSAvQW5kcm9pZCAyXFwuLy50ZXN0KGdsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLy8gZGF0YS1oZWlnaHQgYXR0cmlidXRlJ3MgbmFtZSBmb3IgYWRhcHRpdmVIZWlnaHQgb3B0aW9uXG5jb25zdCBEQVRBX0hFSUdIVCA9IFwiZGF0YS1oZWlnaHRcIjtcblxuZXhwb3J0IHtcblx0RVZFTlRTLFxuXHRUUkFOU0ZPUk0sXG5cdFNVUFBPUlRfV0lMTENIQU5HRSxcblx0SVNfQU5EUk9JRDIsXG5cdERBVEFfSEVJR0hUXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vLyBpbnRlcm5hbCBjb25maWcgdmFsdWVzXG5jb25zdCBDT05GSUcgPSB7XG5cdHBhbmVsOiB7XG5cdFx0JGxpc3Q6IG51bGwsICAgICAgICAvLyBwYW5lbCBsaXN0XG5cdFx0aW5kZXg6IDAsXHRcdFx0Ly8gZG9tIGluZGV4IHVzZWQgYW1vbmcgcHJvY2Vzc1xuXHRcdG5vOiAwLFx0XHRcdFx0Ly8gcGFuZWwgbm8gdXNlZCBhbW9uZyBwcm9jZXNzXG5cdFx0Y3VyckluZGV4OiAwLCAgICAgICAvLyBjdXJyZW50IHBoeXNpY2FsIGRvbSBpbmRleFxuXHRcdGN1cnJObzogMCwgICAgICAgICAgLy8gY3VycmVudCBsb2dpY2FsIHBhbmVsIG51bWJlclxuXHRcdHNpemU6IDAsXHRcdFx0Ly8gcGFuZWwgc2l6ZVxuXHRcdGNvdW50OiAwLFx0XHRcdC8vIHRvdGFsIHBoeXNpY2FsIHBhbmVsIGNvdW50XG5cdFx0b3JpZ0NvdW50OiAwLFx0XHQvLyB0b3RhbCBjb3VudCBvZiBnaXZlbiBvcmlnaW5hbCBwYW5lbHNcblx0XHRjaGFuZ2VkOiBmYWxzZSxcdFx0Ly8gaWYgcGFuZWwgY2hhbmdlZFxuXHRcdGFuaW1hdGluZzogZmFsc2UsXHQvLyBjdXJyZW50IGFuaW1hdGluZyBzdGF0dXMgYm9vbGVhblxuXHRcdG1pbkNvdW50OiAzICAgICAgICAgLy8gbWluaW11bSBwYW5lbCBjb3VudFxuXHR9LFxuXHR0b3VjaDoge1xuXHRcdGhvbGRQb3M6IDAsICAgICAgICAgLy8gaG9sZCB4LHkgY29vcmRpbmF0ZVxuXHRcdGRlc3RQb3M6IDAsXHQgICAgICAgIC8vIGRlc3RpbmF0aW9uIHgseSBjb29yZGluYXRlXG5cdFx0ZGlzdGFuY2U6IDAsXHRcdC8vIHRvdWNoIGRpc3RhbmNlIHBpeGVsIG9mIHN0YXJ0IHRvIGVuZCB0b3VjaFxuXHRcdGRpcmVjdGlvbjogbnVsbCxcdC8vIHRvdWNoIGRpcmVjdGlvblxuXHRcdGxhc3RQb3M6IDAsXHRcdFx0Ly8gdG8gZGV0ZXJtaW5lIG1vdmUgb24gaG9sZGluZ1xuXHRcdGhvbGRpbmc6IGZhbHNlLFxuXHRcdGlzVHJ1c3RlZDogZmFsc2UgICAgLy8gaWYgZXZlbnQgd2FzIGluc3RhbnRpYXRlZCBieSB1c2VyJ3MgYWN0aW9uIGV4cGxpY2l0bHlcblx0fSxcblx0Y3VzdG9tRXZlbnQ6IHsgICAgICAgICAgLy8gZm9yIGN1c3RvbSBldmVudHMgdmFsdWVcblx0XHRmbGljazogdHJ1ZSxcblx0XHRyZXN0b3JlOiBmYWxzZSxcblx0XHRyZXN0b3JlQ2FsbDogZmFsc2Vcblx0fSxcblx0ZGlyRGF0YTogW10sXHRcdFx0Ly8gZGlyZWN0aW9uIGNvbnN0YW50IHZhbHVlIGFjY29yZGluZyBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG5cdGluZGV4VG9Nb3ZlOiAwLFxuXHQkZHVtbXlBbmNob3I6IG51bGwgICAgICAvLyBGb3IgYnVnZ3kgbGluayBoaWdobGlnaHRpbmcgb24gQW5kcm9pZCAyLnhcbn07XG5cblxuLy8gZGVmYXVsdCBvcHRpb25zXG5jb25zdCBPUFRJT05TID0ge1xuXHRod0FjY2VsZXJhYmxlOiB0cnVlLCAgICAvLyBzZXQgZm9yIGh3IGFjY2VsZXJhdGlvbiAoc2VlIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL25ldGlsL2MxZDFiNjdlMWMxOTI2MzY0YzA3MDlmMTEwYTA5YjQ0IGZvciBvbGQgZGV2aWNlcyBzdXBwb3J0KVxuXHRwcmVmaXg6IFwiZWctZmxpY2tcIiwgICAgIC8vIHByZWZpeCB2YWx1ZSBvZiBjbGFzcyBuYW1lXG5cdGRlY2VsZXJhdGlvbjogMC4wMDA2LCAgIC8vIGRlY2VsZXJhdGlvbiB2YWx1ZVxuXHRob3Jpem9udGFsOiB0cnVlLCAgICAgICAvLyBtb3ZlIGRpcmVjdGlvbiAodHJ1ZSA9PSBob3Jpem9udGFsLCBmYWxzZSA9PSB2ZXJ0aWNhbClcblx0Y2lyY3VsYXI6IGZhbHNlLCAgICAgICAgLy8gY2lyY3VsYXIgbW9kZS4gSW4gdGhpcyBtb2RlIGF0IGxlYXN0IDMgcGFuZWxzIGFyZSByZXF1aXJlZC5cblx0cHJldmlld1BhZGRpbmc6IG51bGwsICAgLy8gcHJldmlldyBwYWRkaW5nIHZhbHVlIGluIGxlZnQodXApIHRvIHJpZ2h0KGRvd24pIG9yZGVyLiBJbiB0aGlzIG1vZGUgYXQgbGVhc3QgNSBwYW5lbHMgYXJlIHJlcXVpcmVkLlxuXHRib3VuY2U6IG51bGwsICAgICAgICAgICAvLyBib3VuY2UgdmFsdWUgaW4gbGVmdCh1cCkgdG8gcmlnaHQoZG93bikgb3JkZXIuIFdvcmtzIG9ubHkgaW4gbm9uLWNpcmN1bGFyIG1vZGUuXG5cdHRocmVzaG9sZDogNDAsICAgICAgICAgIC8vIHRoZSBkaXN0YW5jZSBwaXhlbCB0aHJlc2hvbGQgdmFsdWUgZm9yIGNoYW5nZSBwYW5lbFxuXHRkdXJhdGlvbjogMTAwLCAgICAgICAgICAvLyBkdXJhdGlvbiBtcyBmb3IgYW5pbWF0aW9uXG5cdHBhbmVsRWZmZWN0OiB4ID0+IDEgLSBNYXRoLnBvdygxIC0geCwgMyksICAvLyBlYXNpbmcgZnVuY3Rpb24gZm9yIHBhbmVsIGNoYW5nZSBhbmltYXRpb25cblx0ZGVmYXVsdEluZGV4OiAwLCAgICAgICAgLy8gaW5pdGlhbCBwYW5lbCBpbmRleCB0byBiZSBzaG93blxuXHRpbnB1dFR5cGU6IFsgICAgICAgICAgICAvLyBpbnB1dCB0eXBlXG5cdFx0XCJ0b3VjaFwiLCBcIm1vdXNlXCJcblx0XSxcblx0dGhyZXNob2xkQW5nbGU6IDQ1LCAgICAgLy8gdGhlIHRocmVzaG9sZCB2YWx1ZSB0aGF0IGRldGVybWluZXMgd2hldGhlciB1c2VyIGFjdGlvbiBpcyBob3Jpem9udGFsIG9yIHZlcnRpY2FsICgwfjkwKVxuXHRhZGFwdGl2ZUhlaWdodDogZmFsc2UsICAvLyBTZXQgY29udGFpbmVyJ3MgaGVpZ2h0IGJlIGFkYXB0aXZlIGFjY29yZGluZyBwYW5lbCdzIGhlaWdodFxuXHR6SW5kZXg6IDIwMDAsICAgICAgICAgICAvLyB6LWluZGV4IHZhbHVlIGZvciBjb250YWluZXIgZWxlbWVudFxuXHR1c2VUcmFuc2xhdGU6IHRydWUgICAgICAvLyB1c2Ugb2YgdHJhbnNsYXRlIG9uIHBhbmVsIG1vdmVzXG59O1xuXG5leHBvcnQge1xuXHRDT05GSUcsXG5cdE9QVElPTlNcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBOQVZFUiBDb3JwLlxuICogZWdqcyBwcm9qZWN0cyBhcmUgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7RVZFTlRTfSBmcm9tIFwiLi9jb25zdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuXHQvKipcblx0ICogJ2hvbGQnIGV2ZW50IGhhbmRsZXJcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9ob2xkSGFuZGxlcihlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgdG91Y2ggPSBjb25mLnRvdWNoO1xuXHRcdGNvbnN0IGhvbGRQb3MgPSBlLnBvcy5mbGljaztcblxuXHRcdHRvdWNoLmhvbGRQb3MgPSBob2xkUG9zO1xuXHRcdHRvdWNoLmhvbGRpbmcgPSB0cnVlO1xuXHRcdHRvdWNoLmlzVHJ1c3RlZCA9IHRydWU7XG5cdFx0Y29uZi5wYW5lbC5jaGFuZ2VkID0gZmFsc2U7XG5cblx0XHR0aGlzLl9hZGp1c3RDb250YWluZXJDc3MoXCJzdGFydFwiLCBob2xkUG9zKTtcblx0fVxuXG5cdC8qKlxuXHQgKiAnY2hhbmdlJyBldmVudCBoYW5kbGVyXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfY2hhbmdlSGFuZGxlcihlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgdG91Y2ggPSBjb25mLnRvdWNoO1xuXHRcdGNvbnN0IHBvcyA9IGUucG9zLmZsaWNrO1xuXHRcdGNvbnN0IGhvbGRQb3MgPSB0b3VjaC5ob2xkUG9zO1xuXHRcdGxldCBkaXJlY3Rpb247XG5cdFx0bGV0IGV2ZW50UmVzID0gbnVsbDtcblx0XHRsZXQgbW92ZWRQeDtcblxuXHRcdHRoaXMuX3NldFBvaW50ZXJFdmVudHMoZSk7ICAvLyBmb3IgXCJjbGlja1wiIGJ1Z1xuXG5cdFx0LyoqXG5cdFx0ICogQW4gZXZlbnQgdGhhdCBvY2N1cnMgd2hlbmV2ZXIgdGhlIHBhbmVsJ3MgY29vcmRpbmF0ZSB2YWx1ZSBjaGFuZ2VzLiBJdCBvY2N1cnMgaW4gdGhlIGZvbGxvd2luZyBjYXNlcy48YnI+PGJyPjEuIFdoZW4gdGhlIHVzZXIgaXMgaW5wdXRpbmcgdGhlIG1vdmUuPGJyPjIuIFdoZW4gbW92aW5nIHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbCBhZnRlciB5b3UgaGF2ZSBmaW5pc2hlZCBpbnB1dGluZyB0aGUgbW92ZSBpbiBzdGVwIDEuPGJyPjMuIFdoZW4gdGhlIGN1cnJlbnQgcGFuZWwgaXMgbW92aW5nIHRvIGl0cyBvcmlnaW5hbCBwb3NpdGlvbiBhZnRlciB0aGUgbW92ZW1lbnQgaXMgZmluaXNoZWQgaW4gc3RlcCAxLjxicj40LiBNb3ZpbmcgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsIGJ5IGNhbGxpbmcgdGhlIGBtb3ZlVG8oKWAsIGBwcmV2KClgLCBgbmV4dCgpYCAgbWV0aG9kLiAoRG8gbm90IHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSBldmVudC4pXG5cdFx0ICogQGtvIO2MqOuEkOydmCDsooztkZzqsJLsnbQg67OA7ZWgIOuVjOuniOuLpCDrsJzsg53tlZjripQg7J2067Kk7Yq4LiDslYTrnpjsnZgg6rK97Jqw7JeQIOuwnOyDne2VnOuLpC48YnI+PGJyPjEuIOyCrOyaqeyekOqwgCDsnbTrj5kobW92ZSkg7JWh7IWYIOyeheugpeykkeydvCDrlYwuPGJyPjIuIDHrsojsl5DshJwg7J2064+ZKG1vdmUpIOyVoeyFmCDsnoXroKXsnbQg64Gd64KY6rOgIOuqqeyggSDtjKjrhJDroZwg7J2064+Z7KSR7J28IOuVjC48YnI+My4gMeuyiOyXkOyEnCDsnbTrj5kobW92ZSkg7JWh7IWYIOyeheugpeydtCDrgZ3rgpjqs6Ag7ZiE7J6sIO2MqOuEkOydmCDsm5Drnpgg7JyE7LmY66GcIOydtOuPmeykkeydvCDrlYwuPGJyPjQuIGBtb3ZlVG8oKWAsIGBwcmV2KClgLCBgbmV4dCgpYCwg66mU7ISc65Oc66W8IO2YuOy2nO2VmOyXrCDrqqnsoIEg7Yyo64SQ66GcIOydtOuPmeykkeydvCDrlYwuIChbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH3snbTrsqTtirjsnZgg6riw67O464+Z7J6R7J2EIOunieyngCDslYrslYTslbwg7ZWc64ukLik8YnI+NS4gYHJlc3RvcmUoKWAg66mU7ISc65Oc66W8IO2YuOy2nO2VmOyXrCDtmITsnqwg7Yyo64SQ7J20IOybkOuemCDsnITsuZjroZwg7J2064+Z7KSR7J28IOuVjC4gKFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0feydtOuypO2KuOydmCDquLDrs7jrj5nsnpEg67Cp7KeAIOyghOygnC4pXG5cdFx0ICogQG5hbWUgZWcuRmxpY2tpbmcjZmxpY2tcblx0XHQgKiBAZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge1N0cmluZ30gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudDxrbz7snbTrsqTtirgg66qFPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVHJ1c3RlZCB0cnVlIHdoZW4gdGhlIGV2ZW50IHdhcyBnZW5lcmF0ZWQgYnkgYSB1c2VyIGFjdGlvbihgXCJtb3VzZVwiYCBvciBgXCJ0b3VjaFwiYCkgb3RoZXJ3aXNlIGZhbHNlPGtvPuyCrOyaqeyekCDslaHshZgoYFwibW91c2VcImAg65iQ64qUIGBcInRvdWNoXCJgKeyXkCDsnZjtlbQg7J2067Kk7Yq46rCAIOyDneyEseuQnCDqsr3smrAgYHRydWVgLiDqt7gg7Jm464qUIGBmYWxzZWA8L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBubyBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gU2VlIHRoZSBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IG1ldGhvZC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGlyZWN0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudC4gSWYgYGhvcml6b250YWw9dHJ1ZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gSWYgYGhvcml6b250YWw9ZmFsc2VgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPGtvPu2MqOuEkCDsnbTrj5kg67Cp7ZalLiBgaG9yaXpvbnRhbD10cnVlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIGBob3Jpem9udGFsPWZhbHNlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gcG9zIGN1cnJlbnQgY29vcmRpbmF0ZSA8a28+7ZiE7J6sIOyijO2RnC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaG9sZGluZyBXaGV0aGVyIHRoZSB1c2VyIGlzIGlucHV0aW5nIHRocm91Z2ggdGhlIGlucHV0IGRldmljZS4gKFdoZXRoZXIgaXQgaXMgJ21vdXNlZG93bicgZm9yIGEgbW91c2UgZGV2aWNlIG9yICd0b3VjaG1vdmUnIGZvciBhIHRvdWNoIGRldmljZS4pPGtvPuyCrOyaqeyekOqwgCDsnoXroKUg7J6l7LmY66W8IO2Gte2VtCDsnoXroKXspJHsnbjsp4Ag7Jes67aALiAo66eI7Jqw7IqkIOyepey5mOudvOuptCAnbW91c2Vkb3duJyDsl6zrtoAsIO2EsOy5mCDsnqXsuZjrnbzrqbQgJ3RvdWNobW92ZScg7Jes67aAKTwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpc3RhbmNlIERpc3RhbmNlIHZhbHVlIGZyb20gdGhlIHRvdWNoIHN0YXJ0aW5nIHBvaW50LiBJZiB0aGUgYGRpcmVjdGlvbmAgcHJvcGVydHkgdmFsdWUgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSwgaXQgcmV0dXJucyBhIHBvc2l0aXZlIG51bWJlci4ge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfSByZXR1cm5zIGEgbmVnYXRpdmUgdmFsdWUuPGtvPu2EsOy5mCDsi5zsnpHsoJDsnLzroZzrtoDthLAg7J2064+Z7ZWcIOqxsOumrCDqsJIuIGBkaXJlY3Rpb25g7IaN7ISx6rCS7J20IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB97J2066m0IOyWkeyImOulvCwge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn3snbTrqbQg7J2M7IiY66W8IOuwmO2ZmO2VnOuLpC48L2tvPlxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlUmVzdG9yZVxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydFxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmRcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI21vdmVUb1xuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcHJldlxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjbmV4dFxuXHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiBUaGUgb3JkZXIgb2YgZXZlbnQgb2NjdXJyZW5jZS5cblx0XHRcdCAqIOydtOuypO2KuCDrsJzsg50g7Iic7IScXG5cdFx0XHQgKiBgYGBqYXZhc2NyaXB0XG5cdFx0XHQgKiAvLyBXaGVuIG1vdmluZyB0byB0aGUgZGVzdGluYXRpb24gcGFuZWwuXG5cdFx0XHQgKiAvLyDrqqnsoIEg7Yyo64SQ66GcIOydtOuPme2VoCDrlYwuXG5cdFx0XHQgKiBiZWZvcmVGbGlja1N0YXJ0IChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IGZsaWNrRW5kIChvbmNlKVxuXHRcdFx0ICpcblx0XHRcdCAqIC8vIFdoZW4gdGhlIHJlc3RvcmUgb3BlcmF0aW9uLlxuXHRcdFx0ICogLy8g67O17JuQIOuPmeyekeydvCDrlYwuXG5cdFx0XHQgKiBiZWZvcmVSZXN0b3JlIChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IHJlc3RvcmUgKG9uY2UpXG5cdFx0XHQgKiBgYGBcblx0XHQgKi9cblx0XHRpZiAoZS5pbnB1dEV2ZW50KSB7XG5cdFx0XHRkaXJlY3Rpb24gPSBlLmlucHV0RXZlbnQuZGlyZWN0aW9uO1xuXG5cdFx0XHQvLyBBZGp1c3QgZGlyZWN0aW9uIGluIGNhc2Ugb2YgZGlhZ29uYWwgdG91Y2ggbW92ZVxuXHRcdFx0bW92ZWRQeCA9IGUuaW5wdXRFdmVudFt0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbCA/IFwiZGVsdGFYXCIgOiBcImRlbHRhWVwiXTtcblxuXHRcdFx0aWYgKCF+Y29uZi5kaXJEYXRhLmluZGV4T2YoZGlyZWN0aW9uKSkge1xuXHRcdFx0XHRkaXJlY3Rpb24gPSBjb25mLmRpckRhdGFbKyhNYXRoLmFicyh0b3VjaC5sYXN0UG9zKSA8PSBtb3ZlZFB4KV07XG5cdFx0XHR9XG5cblx0XHRcdHRvdWNoLmxhc3RQb3MgPSBtb3ZlZFB4O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b3VjaC5sYXN0UG9zID0gbnVsbDtcblx0XHR9XG5cblx0XHRjb25mLmN1c3RvbUV2ZW50LmZsaWNrICYmIChldmVudFJlcyA9XG5cdFx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoRVZFTlRTLmZsaWNrLCB7XG5cdFx0XHRcdHBvcyxcblx0XHRcdFx0aG9sZGluZzogZS5ob2xkaW5nLFxuXHRcdFx0XHRkaXJlY3Rpb246IGRpcmVjdGlvbiB8fCB0b3VjaC5kaXJlY3Rpb24sXG5cdFx0XHRcdGRpc3RhbmNlOiB0b3VjaC5pc1RydXN0ZWQgPyBwb3MgLSBob2xkUG9zIDogbnVsbFxuXHRcdFx0fSlcblx0XHQpO1xuXG5cdFx0KGV2ZW50UmVzIHx8IGV2ZW50UmVzID09PSBudWxsKSAmJiB0aGlzLl9zZXRUcmFuc2xhdGUoWy1wb3MsIDBdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiAncmVsZWFzZScgZXZlbnQgaGFuZGxlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X3JlbGVhc2VIYW5kbGVyKGUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCB0b3VjaCA9IGNvbmYudG91Y2g7XG5cdFx0Y29uc3QgaG9sZFBvcyA9IHRvdWNoLmhvbGRQb3M7XG5cdFx0Y29uc3QgcGFuZWxTaXplID0gY29uZi5wYW5lbC5zaXplO1xuXHRcdGNvbnN0IGN1c3RvbUV2ZW50ID0gY29uZi5jdXN0b21FdmVudDtcblx0XHRjb25zdCBpc1BsdXNNb3ZlID0gdG91Y2guaG9sZFBvcyA8IGUuZGVwYVBvcy5mbGljaztcblxuXHRcdHRvdWNoLmRpc3RhbmNlID0gZS5kZXBhUG9zLmZsaWNrIC0gaG9sZFBvcztcblx0XHR0b3VjaC5kaXJlY3Rpb24gPSBjb25mLmRpckRhdGFbKyEoaXNQbHVzTW92ZSldO1xuXHRcdHRvdWNoLmRlc3RQb3MgPSBob2xkUG9zICsgKGlzUGx1c01vdmUgPyBwYW5lbFNpemUgOiAtcGFuZWxTaXplKTtcblxuXHRcdGNvbnN0IGRpc3RhbmNlID0gdG91Y2guZGlzdGFuY2U7XG5cdFx0bGV0IGR1cmF0aW9uID0gdGhpcy5vcHRpb25zLmR1cmF0aW9uO1xuXHRcdGxldCBtb3ZlVG8gPSBob2xkUG9zO1xuXG5cdFx0aWYgKHRoaXMuX2lzTW92YWJsZSgpKSB7XG5cdFx0XHQhY3VzdG9tRXZlbnQucmVzdG9yZUNhbGwgJiYgKGN1c3RvbUV2ZW50LnJlc3RvcmUgPSBmYWxzZSk7XG5cdFx0XHRtb3ZlVG8gPSB0b3VjaC5kZXN0UG9zO1xuXHRcdH0gZWxzZSBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpID4gMCkge1xuXHRcdFx0dGhpcy5fdHJpZ2dlckJlZm9yZVJlc3RvcmUoZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGR1cmF0aW9uID0gMDtcblx0XHR9XG5cblx0XHQvLyB0cmlnZ2VyIGFuaW1hdGlvblxuXHRcdGUuc2V0VG8oe2ZsaWNrOiBtb3ZlVG99LCBkdXJhdGlvbik7XG5cblx0XHRkaXN0YW5jZSA9PT0gMCAmJiB0aGlzLl9hZGp1c3RDb250YWluZXJDc3MoXCJlbmRcIik7XG5cdFx0dG91Y2guaG9sZGluZyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc2V0UG9pbnRlckV2ZW50cygpOyAgLy8gZm9yIFwiY2xpY2tcIiBidWdcblx0fVxuXG5cdC8qKlxuXHQgKiAnYW5pbWF0aW9uU3RhcnQnIGV2ZW50IGhhbmRsZXJcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9hbmltYXRpb25TdGFydEhhbmRsZXIoZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCBjdXN0b21FdmVudCA9IGNvbmYuY3VzdG9tRXZlbnQ7XG5cdFx0Y29uc3QgaXNGcm9tSW5wdXQgPSBlLmlucHV0RXZlbnQgfHwgY29uZi50b3VjaC5sYXN0UG9zO1xuXG5cdFx0Ly8gd2hlbiBhbmltYXRpb24gd2FzIHN0YXJ0ZWQgYnkgaW5wdXQgYWN0aW9uXG5cdFx0aWYgKCFjdXN0b21FdmVudC5yZXN0b3JlQ2FsbCAmJiBpc0Zyb21JbnB1dCAmJlxuXHRcdFx0dGhpcy5fc2V0UGhhc2VWYWx1ZShcInN0YXJ0XCIsIHtcblx0XHRcdFx0ZGVwYVBvczogZS5kZXBhUG9zLmZsaWNrLFxuXHRcdFx0XHRkZXN0UG9zOiBlLmRlc3RQb3MuZmxpY2tcblx0XHRcdH0pID09PSBmYWxzZSkge1xuXHRcdFx0ZS5zdG9wKCk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzRnJvbUlucHV0KSB7XG5cdFx0XHRlLmR1cmF0aW9uID0gdGhpcy5vcHRpb25zLmR1cmF0aW9uO1xuXG5cdFx0XHRlLmRlc3RQb3MuZmxpY2sgPVxuXHRcdFx0XHRwYW5lbC5zaXplICogKFxuXHRcdFx0XHRcdHBhbmVsLmluZGV4ICsgY29uZi5pbmRleFRvTW92ZVxuXHRcdFx0XHQpO1xuXHRcdH1cblxuXHRcdHBhbmVsLmFuaW1hdGluZyA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogJ2FuaW1hdGlvbkVuZCcgZXZlbnQgaGFuZGxlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2FuaW1hdGlvbkVuZEhhbmRsZXIoKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cblx0XHRjb25mLnBhbmVsLmFuaW1hdGluZyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc2V0UGhhc2VWYWx1ZShcImVuZFwiKTtcblx0XHR0aGlzLl90cmlnZ2VyUmVzdG9yZSgpO1xuXG5cdFx0Ly8gcmVzZXQgaXNUcnVzdGVkXG5cdFx0Y29uZi50b3VjaC5pc1RydXN0ZWQgPSBmYWxzZTtcblx0fVxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGVnanMvY29tcG9uZW50XCI7XG5pbXBvcnQgQXhlcywge1BhbklucHV0fSBmcm9tIFwiQGVnanMvYXhlc1wiO1xuaW1wb3J0IHt1dGlscywgTWl4aW59IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge1xuXHRFVkVOVFMsXG5cdFRSQU5TRk9STSxcblx0U1VQUE9SVF9XSUxMQ0hBTkdFLFxuXHRJU19BTkRST0lEMixcblx0REFUQV9IRUlHSFRcbn0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQge0NPTkZJRywgT1BUSU9OU30gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQge2RvY3VtZW50fSBmcm9tIFwiLi9icm93c2VyXCI7XG5pbXBvcnQgZXZlbnRIYW5kbGVyIGZyb20gXCIuL2V2ZW50SGFuZGxlclwiO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgZWcuRmxpY2tpbmcgY2xhc3MuIENyZWF0ZSBhIGZsaWNraW5nIFVJIHRoYXQgc3dlZXBzIGEgc2lkZS1ieS1zaWRlIHBhbmVsIHdpdGggbW91c2UgbW92ZSBvciB0b3VjaCBtb3ZlIGlucHV0IGFuZCBtb3ZlcyB0byB0aGUgbmV4dCBvciBwcmV2aW91cyBwYW5lbC5cbiAqIEBrbyBlZy5GbGlja2luZyDtgbTrnpjsiqTsnZgg7J247Iqk7YS07Iqk66W8IOyDneyEse2VnOuLpC4g64KY656A7Z6IIOuwsOy5mO2VnCDtjKjrhJDsnYQg66eI7Jqw7IqkIOydtOuPmShtb3ZlKSDtmLnsnYAg7YSw7LmYIOydtOuPmShtb3ZlKSDsnoXroKXsnYQg67Cb7JWEIOyTuOyWtCDrhJjqsqgg64uk7J2MIO2MqOuEkOydtOuCmCDsnbTsoIQg7Yyo64SQ66GcIOydtOuPme2VmOuKlCBVSeulvCDrp4zrk6Dri6QuXG4gKiBAYWxpYXMgZWcuRmxpY2tpbmdcbiAqIEBleHRlbmRzIGVnLkNvbXBvbmVudFxuICogQHJlcXVpcmVzIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbmF2ZXIvZWdqcy1jb21wb25lbnR8ZWcuQ29tcG9uZW50fVxuICogQHJlcXVpcmVzIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbmF2ZXIvZWdqcy1heGVzfGVnLkF4ZXN9XG4gKiBAc2VlIEVhc2luZyBGdW5jdGlvbnMgQ2hlYXQgU2hlZXQge0BsaW5rIGh0dHA6Ly9lYXNpbmdzLm5ldC99IDxrbz7snbTsp5Ug7ZWo7IiYIENoZWF0IFNoZWV0IHtAbGluayBodHRwOi8vZWFzaW5ncy5uZXQvfTwva28+XG4gKiBAc2VlIElmIHlvdSB3YW50IHRvIHRyeSBhIGRpZmZlcmVudCBlYXNpbmcgZnVuY3Rpb24sIHVzZSB0aGUgalF1ZXJ5IGVhc2luZyBwbHVnaW4gKHtAbGluayBodHRwOi8vZ3NnZC5jby51ay9zYW5kYm94L2pxdWVyeS9lYXNpbmd9KSBvciB0aGUgalF1ZXJ5IFVJIGVhc2luZyBsaWJyYXJ5ICh7QGxpbmsgaHR0cHM6Ly9qcXVlcnl1aS5jb20vZWFzaW5nfSkuIDxrbz7ri6TrpbggZWFzaW5nIO2VqOyImOulvCDsgqzsmqntlZjroKTrqbQgalF1ZXJ5IGVhc2luZyDtlIzrn6zqt7jsnbgoe0BsaW5rIGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZ30p7J2064KYLCBqUXVlcnkgVUkgZWFzaW5nIOudvOydtOu4jOufrOumrCh7QGxpbmsgaHR0cHM6Ly9qcXVlcnl1aS5jb20vZWFzaW5nfSnrpbwg7IKs7Jqp7ZWc64ukPC9rbz5cbiAqIEB0aHJvd3Mge0Vycm9yfSBBbiBFcnJvciBvY2N1ciB3aGVuIGdpdmVuIGJhc2UgZWxlbWVudCBkb2Vzbid0IGV4aXN0IG9yIGl0IGhhc24ndCBwcm9wZXIgRE9NIHN0cnVjdHVyZSB0byBiZSBpbml0aWFsaXplZC4gPGtvPuyjvOyWtOynhCDquLDrs7gg7JqU7IaM6rCAIOyhtOyerO2VmOyngCDslYrqsbDrgpgg7LSI6riw7ZmUIO2VoCDsoIHsoIjtlZwgRE9NIOq1rOyhsOqwgOyXhuuKlCDqsr3smrAg7Jik66WY6rCAIOuwnOyDne2VnOuLpC48L2tvPlxuICogQHN1cHBvcnQge1wiaWVcIjogXCIxMCtcIiwgXCJjaFwiIDogXCJsYXRlc3RcIiwgXCJmZlwiIDogXCJsYXRlc3RcIiwgIFwic2ZcIiA6IFwibGF0ZXN0XCIgLCBcImVkZ2VcIiA6IFwibGF0ZXN0XCIsIFwiaW9zXCIgOiBcIjcrXCIsIFwiYW5cIiA6IFwiMi4zKyAoZXhjZXB0IDMueClcIn1cbiAqIEBleGFtcGxlXG4gKiBBIGNvbW1vbiBleGFtcGxlLlxuICog7J2867CY7KCB7J24IOyYiC5cbiAqIGBgYGh0bWxcbiAqIDxkaXYgaWQ9XCJmbGlja1wiPlxuICogXHQ8ZGl2PjxwPnBhbmVsIDA8L3A+PC9kaXY+XG4gKiBcdDxkaXY+PHA+cGFuZWwgMTwvcD48L2Rpdj5cbiAqIFx0PGRpdj48cD5wYW5lbCAyPC9wPjwvZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqIGBgYGphdmFzY3JpcHRcbiAqIC8vIEV4YW1wbGVzIHRvIG9taXQgYW5kIG9taXQgb3B0aW9uYWwgb3B0aW9ucy5cbiAqIC8vIOyDneueteqwgOuKpe2VnCDsmLXshZjsnYAg7IOd65617ZWY6rOgIOyDneyEse2VmOuKlCDsmIguXG4gKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG4gKlxuICogLy8gQW4gZXhhbXBsZSBvZiBzcGVjaWZ5aW5nIGFuZCBnZW5lcmF0aW5nIHZhbHVlcyBmb3IgYWxsIG9wdGlvbmFsIHBhcmFtZXRlcnMuXG4gKiAvLyDrqqjrk6Ag7Ji17IWY7J2YIOqwkuydhCDsp4DsoJXtlZjqs6Ag7IOd7ISx7ZWY64qUIOyYiC5cbiAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiLCB7XG4gKiBcdGh3QWNjZWxlcmFibGU6IHRydWUsXG4gKiBcdHByZWZpeDogXCJlZy1mbGlja1wiLFxuICogXHRkZWNlbGVyYXRpb246IDAuMDAwNixcbiAqIFx0aG9yaXpvbnRhbDogdHJ1ZSxcbiAqIFx0Y2lyY3VsYXI6IGZhbHNlLFxuICogXHRwcmV2aWV3UGFkZGluZzogWzEwLCBcIjE1JVwiXSwgLy8gYWxzbyBhcyBcIjEwcHhcIiwgMTUgb3IgXCIxNSVcIiBjYW4gYmUgYXBwbGllZC5cbiAqIFx0Ym91bmNlOiBbMTAsIDEwXSxcbiAqIFx0dGhyZXNob2xkOiA0MCxcbiAqIFx0ZHVyYXRpb246IDEwMCxcbiAqIFx0cGFuZWxFZmZlY3Q6IHggPT4gMSAtIE1hdGgucG93KDEgLSB4LCAzKSxcbiAqIFx0ZGVmYXVsdEluZGV4OiAwLFxuICogXHRpbnB1dFR5cGU6IFtcInRvdWNoXCIsIFwibW91c2VcIl0sXG4gKiBcdHRocmVzaG9sZEFuZ2xlOiA0NSxcbiAqIFx0YWRhcHRpdmVIZWlnaHQ6IGZhbHNlXG4gKiB9KTtcbiAqIGBgYFxuICogQGV4YW1wbGVcbiAqIEV4YW1wbGUgb2YgY29uc3RydWN0b3IgZWxlbWVudCBwYXJhbWV0ZXIgdmFsdWUgc3BlY2lmaWNhdGlvbi5cbiAqIOyDneyEseyekCBlbGVtZW50IO2MjOudvOuvuO2EsCDqsJIg7KeA7KCVIOyYiC5cbiAqIGBgYGphdmFzY3JpcHRcbiAqIC8vIEFuIGV4YW1wbGUgb2YgYXNzaWduaW5nIEhUTUxFbGVtZW50IHRvIGFuIGVsZW1lbnQgcGFyYW1ldGVyLlxuICogLy8gZWxlbWVudCDtjIzrnbzrr7jthLDsl5AgSFRNTEVsZW1lbnTrpbwg7KeA7KCV7ZWY64qUIOyYiC5cbiAqIG5ldyBlZy5GbGlja2luZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsaWNrXCIpKTtcbiAqXG4gKiAvLyBBbiBleGFtcGxlIG9mIGFzc2lnbmluZyBhIGpRdWVyeSBvYmplY3QgdG8gYW4gZWxlbWVudCBwYXJhbWV0ZXIuXG4gKiAvLyBlbGVtZW50IO2MjOudvOuvuO2EsOyXkCBqUXVlcnnqsJ3ssrTrpbwg7KeA7KCV7ZWY64qUIOyYiC5cbiAqIG5ldyBlZy5GbGlja2luZygkKFwiI2ZsaWNrXCIpWzBdKTtcbiAqXG4gKiAvLyBBbiBleGFtcGxlIG9mIGFzc2lnbmluZyBhIGNzcyBzZWxlY3RvciBzdHJpbmcgdG8gYW4gZWxlbWVudCBwYXJhbWV0ZXIuXG4gKiAvLyBlbGVtZW50IO2MjOudvOuvuO2EsOyXkCBjc3Mg7ISg7YOd7J6QIOusuOyekOyXtOydhCDsp4DsoJXtlZjripQg7JiILlxuICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpO1xuICogYGBgXG4gKiBAZXhhbXBsZVxuICogUGFuZWwgZWxlbWVudCBkZWZpbml0aW9uIGxvY2F0aW9uIGV4YW1wbGUuXG4gKiDtjKjrhJAg7JqU7IaMIOygleydmCDsnITsuZgg7JiILlxuICogYGBgaHRtbFxuICogPCEtLUFuIGV4YW1wbGUgb2YgZGVmaW5pbmcgYSBwYW5lbCBlbGVtZW50IGFzIGEgY2hpbGQgb2YgYSBiYXNlIGVsZW1lbnQuLS0+XG4gKiA8IS0t7Yyo64SQIOyalOyGjOulvCDquLDspIAg7JqU7IaM7J2YIOyekOyLneycvOuhnCDsoJXsnZjtlZwg7JiILi0tPlxuICogPGRpdiBpZD1cImZsaWNrXCI+XG4gKiBcdDxkaXY+PHA+cGFuZWwgMDwvcD48L2Rpdj5cbiAqIFx0PGRpdj48cD5wYW5lbCAxPC9wPjwvZGl2PlxuICogXHQ8ZGl2PjxwPnBhbmVsIDI8L3A+PC9kaXY+XG4gKiA8L2Rpdj5cbiAqXG4gKiA8IS0tQW4gZXhhbXBsZSBvZiBkZWZpbmluZyBhIHBhbmVsIGVsZW1lbnQgYXMgYSBjaGlsZCBvZiBhIGNvbnRhaW5lciBlbGVtZW50Li0tPlxuICogPCEtLe2MqOuEkCDsmpTshozrpbwg7Luo7YWM7J2064SIIOyalOyGjOydmCDsnpDsi53snLzroZwg7KCV7J2Y7ZWcIOyYiC4tLT5cbiAqIDxkaXYgaWQ9XCJmbGljazJcIj5cbiAqIFx0PGRpdiBjbGFzcz1cImVnLWZsaWNrLWNvbnRhaW5lclwiPlxuICogXHRcdDxkaXY+PHA+cGFuZWwgMDwvcD48L2Rpdj5cbiAqIFx0XHQ8ZGl2PjxwPnBhbmVsIDE8L3A+PC9kaXY+XG4gKiBcdFx0PGRpdj48cD5wYW5lbCAyPC9wPjwvZGl2PlxuICogXHQ8ZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqIEBleGFtcGxlXG4gKiBBbiBleGFtcGxlIHdoZXJlIG9ubHkgb25lIHBhbmVsIGlzIGRlZmluZWQgYW5kIGNyZWF0ZWQgd2l0aCBhIGNpcmN1bGFyLlxuICog7Yyo64SQ7J2EIO2VmOuCmOunjCDsoJXsnZjtlZjqs6Ag7Iic7ZmY7Jy866GcIOyDneyEse2VmOuKlCDsmIguXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGlkPVwiZmxpY2tcIj5cbiAqIFx0PGRpdj48cD5wYW5lbCAwPC9wPjwvZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqIGBgYGphdmFzY3JpcHRcbiAqIC8vIElmIHRoZSBudW1iZXIgb2YgZGVmaW5lZCBwYW5lbHMgaXMgbGVzcyB0aGFuIHRoZSBtaW5pbXVtIG51bWJlciByZXF1aXJlZCBmb3IgdGhlIGNpcmN1bGF0aW9uIG9wZXJhdGlvbiwgdGhlIG5lY2Vzc2FyeSBudW1iZXIgb2YgcGFuZWwgZWxlbWVudHMgYXJlIGdlbmVyYXRlZC5cbiAqIC8vIOygleydmOuQnCDtjKjrhJDsnZgg7IiY6rCAIOyInO2ZmOuPmeyekeyXkCDtlYTsmpTtlZwg7LWc7IaMIOqwnOyImOuztOuLpCDsoIHsnLzrqbQg7ZWE7JqU7ZWcIOyImOunjO2BvOydmCDtjKjrhJAg7JqU7IaM6rCAIOyDneyEseuQnOuLpC5cbiAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiLCB7XG4gKiBcdGNpcmN1bGFyOiB0cnVlXG4gKiB9KVxuICogYGBgXG4gKiBAZXhhbXBsZVxuICogRm9yIGVycm9yIG9jY3VycmVuY2UgZXhhbXBsZS4gVGhlcmUgaXMgbm8gcGFuZWwgZWxlbWVudC5cbiAqIOyYpOulmCDrsJzsg50g7JiILiDtjKjrhJAg7JqU7IaM6rCAIO2VmOuCmOuPhCDsl4bripQg6rK97JqwLlxuICogYGBgaHRtbFxuICogPGRpdiBpZD1cImZsaWNrXCI+PC9kaXY+XG4gKiBgYGBcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHRyeXtcbiAqIFx0bmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpO1xuICogfSBjYXRjaChlKSB7XG4gKiBcdC8vIEFuIGVycm9yIG9jY3VycyBiZWNhdXNlIHRoZXJlIGFyZSBubyBjaGlsZCBlbGVtZW50cyBpbiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQuXG4gKlx0Ly8g6riw7KSAIOyalOyGjOyViOyXkCDsnpDsi50g7JqU7IaM6rCAIO2VmOuCmOuPhCDsl4bsnLzrr4DroZwg7JeQ65+s6rCAIOuwnOyDne2VnOuLpC5cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGlja2luZyBleHRlbmRzIE1peGluKENvbXBvbmVudCkud2l0aChldmVudEhhbmRsZXIpIHtcblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfSBlbGVtZW50IEEgYmFzZSBlbGVtZW50IGZvciB0aGUgZWcuRmxpY2tpbmcgbW9kdWxlLiBXaGVuIHNwZWNpZnlpbmcgYSB2YWx1ZSBhcyBhIGBTdHJpbmdgIHR5cGUsIHlvdSBtdXN0IHNwZWNpZnkgYSBjc3Mgc2VsZWN0b3Igc3RyaW5nIHRvIHNlbGVjdCB0aGUgZWxlbWVudC48a28+ZWcuRmxpY2tpbmcg66qo65OI7J2EIOyCrOyaqe2VoCDquLDspIAg7JqU7IaMLiBgU3RyaW5nYO2DgOyeheycvOuhnCDqsJIg7KeA7KCV7IucIOyalOyGjOulvCDshKDtg53tlZjquLAg7JyE7ZWcIGNzcyDshKDtg53snpAg66y47J6Q7Je07J2EIOyngOygle2VtOyVvCDtlZzri6QuPC9rbz5cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9uIG9iamVjdCBvZiB0aGUgZWcuRmxpY2tpbmcgbW9kdWxlPGtvPmVnLkZsaWNraW5nIOuqqOuTiOydmCDsmLXshZgg6rCd7LK0PC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5od0FjY2VsZXJhYmxlPXRydWVdIEZvcmNlIGhhcmR3YXJlIGNvbXBvc2l0aW5nLjxrbz7tlZjrk5zsm6jslrQg6rCA7IaNIOyCrOyaqSDsl6zrtoAuPC9rbz5cblx0ICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnByZWZpeD1cImVnLWZsaWNrXCJdIEEgcHJlZml4IGZvciBjbGFzcyBuYW1lcyBvZiB0aGUgcGFuZWwgZWxlbWVudHMuPGtvPu2MqOuEkCDsmpTshozsnZgg7YG0656Y7IqkIOydtOumhCDsoJHrkZDsgqwuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlY2VsZXJhdGlvbj0wLjAwMDZdIERlY2VsZXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIHdoZXJlIGFjY2VsZXJhdGlvbiBpcyBtYW51YWxseSBlbmFibGVkIGJ5IHVzZXIuIEEgaGlnaGVyIHZhbHVlIGluZGljYXRlcyBzaG9ydGVyIHJ1bm5pbmcgdGltZS48a28+7IKs7Jqp7J6Q7J2YIOuPmeyekeycvOuhnCDqsIDsho3rj4TqsIAg7KCB7Jqp65CcIOyVoOuLiOuplOydtOyFmOydmCDqsJDsho3rj4QuIOqwkuydtCDrhpLsnYTsiJjroZ0g7JWg64uI66mU7J207IWYIOyLpO2WiSDsi5zqsITsnbQg7Ken7JWE7KeE64ukLjwva28+XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaG9yaXpvbnRhbD10cnVlXSBEaXJlY3Rpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiAodHJ1ZTogaG9yaXpvbnRhbCwgZmFsc2U6IHZlcnRpY2FsKTxrbz7tjKjrhJAg7J2064+ZIOuwqe2WpS4gKHRydWUg6rCA66Gc67Cp7ZalLCBmYWxzZSDshLjroZzrsKntlqUpPC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jaXJjdWxhcj1mYWxzZV0gV2hldGhlciB0byBsZXQgdGhlIGZpcnN0IHBhbmVsIGZsaWNrIHJpZ2h0IHRvIHRoZSBlbmQgcGFuZWwgKGxldCB0aGUgbGVmdCBwYW5lbCBmbGljayBmcm9tIHRoZSBlbmQgcGFuZWwgdG8gbW92ZSB0byB0aGUgZmlyc3QgcGFuZWwpLiAoVGhlIHRlcm0gJ2NpcmN1bGF0aW9uJyk8a28+7LKrIO2MqOuEkOyXkOyEnCDsmrAg7JWh7IWYIOyeheugpe2VmOyXrCDrgZ0g7Yyo64SQ66GcIOydtOuPme2VmOqyjCDtlaDsp4DsmYAg64GdIO2MqOuEkOyXkOyEnCDsmrAg7JWh7IWYIOyeheugpe2VmOyXrCDssqsg7Yyo64SQ66GcIOydtOuPme2VoO2VmOqyjCDtlaDsp4Ag7Jes67aALiAo7Ya17LmtICfsiJztmZgnKTwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ3xBcnJheX0gW29wdGlvbnMucHJldmlld1BhZGRpbmc9WzAsMF1dIFRoZSBwcmV2aWV3IHNpemUgdmFsdWUoaWYgbm8gdW5pdCBpcyBnaXZlbiwgZGVmYXVsdHMgdG8gYHB4YCkgZm9yIHRoZSBwcmV2aW91cyBvciBuZXh0IHBhbmVsLjxicj4tIElmIHRoZSBkaXJlY3Rpb24gaXMgc2V0IHRvIFwiaG9yaXpvbnRhbFwiLCB0aGUgcHJldmlldyBzZWN0aW9uIHdpbGwgYmUgZGlzcGxheWVkIG9uIHRoZSBsZWZ0IGFuZCByaWdodCBvZiB0aGUgcGFuZWwuPGJyPi0gSWYgdGhlIGRpcmVjdGlvbiBpcyBzZXQgdG8gXCJ2ZXJ0aWNhbFwiLCBpdCB3aWxsIGJlIGRpc3BsYXllZCBvbiB0aGUgdG9wIGFuZCBib3R0b20gb2YgdGhlIHBhbmVsLjxrbz7snbTsoIQg7Yyo64SQ6rO8IOuLpOydjCDtjKjrhJDsnYQg66+466asIOuztOuKlCDsmIHsl63snZgg7YGs6riwIOqwkijri6jsnITqsIAg7KeA7KCV65CY7KeAIOyViuuKlCDqsr3smrAsIGBweGDroZwg7KeA7KCVKS48YnI+7Yyo64SQIOydtOuPmSDrsKntlqXsnbQg6rCA66GcIOuwqe2WpeydtOuptCDtjKjrhJAg7KKM7Jqw7JeQLCDshLjroZwg67Cp7Zal7J2066m0IO2MqOuEkCDsg4HtlZjsl5Ag66+466asIOuztOuKlCDsmIHsl63snbQg64KY7YOA64Kc64ukLjwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfEFycmF5fSBbb3B0aW9ucy5ib3VuY2U9WzEwLDEwXV0gVGhlIHNpemUgdmFsdWUodW5pdDogcGl4ZWwpIG9mIHRoZSBib3VuY2UgYXJlYS4gSWYgYGNpcmN1bGFyPWZhbHNlYCwgdGhlIHBhbmVsIGNhbiBiZSBtb3ZlZCBieSB0aGlzIHZhbHVlIHdoZW4gaW5wdXR0aW5nIGEgcmlnaHQgZ2VzdHVyZSBpbiB0aGUgZmlyc3QgcGFuZWwgb3IgaW5wdXR0aW5nIGEgbGVmdCBnZXN0dXJlIGluIHRoZSBlbmQgcGFuZWwuIFdoZW4gdGhlIGlucHV0IGlzIGNvbXBsZXRlZCB3aGlsZSBtb3ZpbmcsIGl0IHJldHVybnMgdG8gaXRzIG9yaWdpbmFsIHBvc2l0aW9uLjxrbz7rsJTsmrTsiqQg7JiB7Jet7J2YIO2BrOq4sOqwkijri6jsnIQ6IO2UveyFgCkuIGBjaXJjdWxhcj1mYWxzZWDsnbgg6rK97JqwLCDssqsg7Yyo64SQ7JeQ7IScIOyasCDslaHshZgg7J6F66Cl7IucLCDrgZ0g7Yyo64SQ7JeQ7IScIOyijCDslaHshZgg7J6F66Cl7IucIOydtCDqsJIg66eM7YG866eMIO2MqOuEkOydtCDsnbTrj5ntlaAg7IiYIOyeiOqzoCDsnbTrj5ntlZwg7IOB7YOc7JeQ7IScIOyeheugpeydhCDrp4jsuZjrqbQg7JuQ656YIOyekOumrOuhnCDrj4zslYTsmKjri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnRocmVzaG9sZD00MF0gTW92ZW1lbnQgdGhyZXNob2xkIHRvIGRlc3RpbmF0aW9uIHBhbmVsKHVuaXQ6IHBpeGVsKS4gQSBwYW5lbCBlbGVtZW50IG11c3QgYmUgZHJhZ2dlZCBiZXlvbmQgdGhlIHRocmVzaG9sZCB0byBtb3ZlIHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbC48a28+66qp7KCBIO2MqOuEkOuhnOydmCDsnbTrj5kg7J6E6rOE6rCSICjri6jsnIQ6IO2UveyFgCkuIO2MqOuEkCDsmpTshozrpbwg7J6E6rOE6rCSIOydtOyDgeycvOuhnCDrgYzslrTri6Qg64aT7JWE7JW866eM7J20IOuqqeyggSDtjKjrhJDroZwg7J2064+Z7ZWc64ukLjwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xMDBdIER1cmF0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudC4gKHVuaXQ6IG1zKTxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCELijri6jsnIQ6IG1zKTwva28+XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnBhbmVsRWZmZWN0PXggPT4gMSAtIE1hdGgucG93KDEgLSB4LCAzKV0gVGhlIGVhc2luZyBmdW5jdGlvbiB0byBhcHBseSB0byBhIHBhbmVsIG1vdmluZyBhbmltYXRpb24uIFRoZSBkZWZhdWx0IGZ1bmN0aW9uIGlzIGVhc2VPdXRDdWJpYy48a28+7Yyo64SQIOydtOuPmSDslaDri4jrqZTsnbTshZjsl5Ag7KCB7Jqp7ZWgIGBlYXNpbmdg7ZWo7IiYLiDquLDrs7jqsJLsnYAgYGVhc2VPdXRDdWJpY2DsnbTri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRlZmF1bHRJbmRleD0wXSBUaGUgcGFuZWwgaW5kZXggbnVtYmVyIHRvIHNwZWNpZnkgd2hlbiBpbml0aWFsaXppbmcgdGhlIG1vZHVsZS4gQSB6ZXJvLWJhc2VkIGludGVnZXIuPGtvPuuqqOuTiCDstIjquLDtmZTsi5wg7KeA7KCV7ZWgIO2MqOuEkCDsnbjrjbHsiqQg67KI7Zi4LiAw67aA7YSwIOyLnOyeke2VmOuKlCDsoJXsiJguPC9rbz5cblx0ICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuaW5wdXRUeXBlPVtcInRvdWNoLFwibW91c2VcIl1dIFR5cGVzIG9mIGlucHV0IGRldmljZXMuICh7QGxpbmsgaHR0cHM6Ly9uYXZlci5naXRodWIuaW8vZWdqcy1heGVzL3JlbGVhc2UvbGF0ZXN0L2RvYy9lZy5BeGVzLlBhbklucHV0Lmh0bWx8ZWcuQXhlcy5QYW5JbnB1dCBSZWZlcmVuY2V9KTxicj4tIFwidG91Y2hcIjogQSB0b3VjaCBpbnB1dCBkZXZpY2UuPGJyPi0gXCJtb3VzZVwiOiBBIG1vdXNlLjxrbz7snoXroKUg7J6l7LmYIOyiheulmC4gKHtAbGluayBodHRwczovL25hdmVyLmdpdGh1Yi5pby9lZ2pzLWF4ZXMvcmVsZWFzZS9sYXRlc3QvZG9jL2VnLkF4ZXMuUGFuSW5wdXQuaHRtbHxlZy5BeGVzLlBhbklucHV0IOywuOqzoH0pPGJyPi0gXCJ0b3VjaFwiOiDthLDsuZgg7J6F66ClIOyepey5mC48YnI+LSBcIm1vdXNlXCI6IOuniOyasOyKpC48L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGhyZXNob2xkQW5nbGU9NDVdIFRoZSB0aHJlc2hvbGQgdmFsdWUgdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdXNlciBpbnB1dCBpcyBob3Jpem9udGFsIG9yIHZlcnRpY2FsLiAoMCB+IDkwKTxrbz7sgqzsmqnsnpDsnZgg7J6F66Cl7J20IOqwgOuhnCDrsKntlqXsnbjsp4Ag7IS466GcIOuwqe2WpeyduOyngCDtjJDri6jtlZjripQg6riw7KSAIOqwgeuPhCAoMCB+IDkwKTwva28+XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWRhcHRpdmVIZWlnaHQ9ZmFsc2VdIFdoZXRoZXIgdGhlIGhlaWdodCBvZiB0aGUgY29udGFpbmVyIGVsZW1lbnQgcmVmbGVjdHMgdGhlIGhlaWdodCB2YWx1ZSBvZiB0aGUgcGFuZWwgYWZ0ZXIgY29tcGxldGluZyB0aGUgbW92ZW1lbnQuPGJyPihOb3RlOiBvbiBBbmRyb2lkIDQuMS54IHN0b2NrIGJyb3dzZXIsIGhhcyByZW5kZXJpbmcgYnVnIHdoaWNoIG5vdCBjb3JyZWN0bHkgcmVuZGVyIGhlaWdodCB2YWx1ZSBvbiBwYW5lbCB3aXRoIHNpbmdsZSBub2RlLiBUbyBhdm9pZCBqdXN0IGFwcGVuZCBhbm90aGVyIGVtcHR5IG5vZGUgYXQgdGhlIGVuZC4pPGtvPuuqqeyggSDtjKjrhJDroZwg7J2064+Z7ZWcIO2bhCDqt7gg7Yyo64SQ7J2YIOuGkuydtOqwkuydhCDsu6jthYzsnbTrhIgg7JqU7IaM7J2YIOuGkuydtOqwkuyXkCDrsJjsmIHtlaDsp4Ag7Jes67aALjxicj4o7LC46rOgOiBBbmRyb2lkIDQuMS54IOyKpO2GoSDruIzrnbzsmrDsoIDsl5DshJwg64uo7J28IOuFuOuTnOuhnCDqtazshLHrkJwg7Yyo64SQ7J2YIOuGkuydtOqwkiDrs4Dqsr3snbQg7KCc64yA66GcIOugjOuNlOungSDrkJjsp4Ag7JWK64qUIOuyhOq3uOqwgCDsnojsnYwuIOu5hOyWtOyeiOuKlCDrhbjrk5zrpbwg7LaU6rCA7ZWY66m0IO2VtOqysOydtCDqsIDriqXtlZjri6QuKTwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MjAwMF0gei1pbmRleCB2YWx1ZSBmb3IgY29udGFpbmVyIGVsZW1lbnQ8a28+7Luo7YWM7J2064SIIOyalOyGjOydmCB6LWluZGV4IOqwkjwva28+XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudXNlVHJhbnNsYXRlPXRydWVdIFVzZSBjc3MgdHJhbnNsYXRlIG1ldGhvZCBvbiBwYW5lbCBtb3Zlcy4gV2hlbiBzZXQgdG8gJ2ZhbHNlJywgaXQnbGwgdXNlIHRvcC9sZWZ0IGluc3RlYWQuPGtvPu2MqOuEkCDsnbTrj5nsi5wgQ1NTIHRyYW5zbGF0ZSDsgqzsmqkg7Jes67aALiAnZmFsc2Un66GcIOyEpOyglSDsi5wsIHRvcC9sZWZ0IOyGjeyEseydhCDsgqzsmqk8L2tvPlxuXHQqL1xuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zLCBfcHJlZml4KSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuJHdyYXBwZXIgPSB1dGlscy4kKGVsZW1lbnQpO1xuXHRcdHRoaXMucGx1Z2lucyA9IFtdO1xuXG5cdFx0Y29uc3QgJGNoaWxkcmVuID0gdGhpcy4kd3JhcHBlciAmJiB0aGlzLiR3cmFwcGVyLmNoaWxkcmVuO1xuXG5cdFx0aWYgKCF0aGlzLiR3cmFwcGVyIHx8ICEkY2hpbGRyZW4gfHwgISRjaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlIHZhbGlkYXRlTGluZUJyZWFrcywgbWF4aW11bUxpbmVMZW5ndGhcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkdpdmVuIGJhc2UgZWxlbWVudCBkb2Vzbid0IGV4aXN0IG9yIGl0IGhhc24ndCBwcm9wZXIgRE9NIHN0cnVjdHVyZSB0byBiZSBpbml0aWFsaXplZC5cIik7XG5cblx0XHRcdC8vIGVzbGludC1lbmFibGUgdmFsaWRhdGVMaW5lQnJlYWtzLCBtYXhpbXVtTGluZUxlbmd0aFxuXHRcdH1cblxuXHRcdHRoaXMuX3NldE9wdGlvbnMob3B0aW9ucyk7XG5cdFx0dGhpcy5fc2V0Q29uZmlnKCRjaGlsZHJlbiwgX3ByZWZpeCk7XG5cblx0XHQhdXRpbHMuaGFzQ2xpY2tCdWcoKSAmJiAodGhpcy5fc2V0UG9pbnRlckV2ZW50cyA9ICgpID0+IHt9KTtcblxuXHRcdHRoaXMuX2J1aWxkKCk7XG5cdFx0dGhpcy5fYmluZEV2ZW50cyh0cnVlKTtcblxuXHRcdHRoaXMuX2FwcGx5UGFuZWxzQ3NzKCk7XG5cdFx0dGhpcy5fYXJyYW5nZVBhbmVscygpO1xuXG5cdFx0dGhpcy5vcHRpb25zLmh3QWNjZWxlcmFibGUgJiYgU1VQUE9SVF9XSUxMQ0hBTkdFICYmIHRoaXMuX3NldEhpbnQoKTtcblx0XHR0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgJiYgdGhpcy5fc2V0QWRhcHRpdmVIZWlnaHQoKTtcblxuXHRcdHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhcImVuZFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgb3B0aW9ucyB2YWx1ZXNcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICovXG5cdF9zZXRPcHRpb25zKG9wdGlvbnMpIHtcblx0XHQvLyBkZWZhdWx0IHZhbHVlIG9mIHByZXZpZXdQYWRkaW5nIGFuZCBib3VuY2Vcblx0XHRjb25zdCBhcnJWYWwgPSB7XG5cdFx0XHRwcmV2aWV3UGFkZGluZzogWzAsIDBdLFxuXHRcdFx0Ym91bmNlOiBbMTAsIDEwXVxuXHRcdH07XG5cblx0XHR0aGlzLm9wdGlvbnMgPSB1dGlscy5leHRlbmQodXRpbHMuZXh0ZW5kKHt9LCBPUFRJT05TKSwgYXJyVmFsLCBvcHRpb25zKTtcblxuXHRcdGZvciAoY29uc3Qga2V5IGluIGFyclZhbCkge1xuXHRcdFx0bGV0IHZhbCA9IHRoaXMub3B0aW9uc1trZXldO1xuXG5cdFx0XHRpZiAoLyhudW1iZXJ8c3RyaW5nKS8udGVzdCh0eXBlb2YgdmFsKSkge1xuXHRcdFx0XHR2YWwgPSBbdmFsLCB2YWxdO1xuXHRcdFx0fSBlbHNlIGlmICghdXRpbHMuaXNBcnJheSh2YWwpKSB7XG5cdFx0XHRcdHZhbCA9IGFyclZhbFtrZXldO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLm9wdGlvbnNba2V5XSA9IHZhbDtcblx0XHR9XG5cblx0XHQvLyBibG9jayB1c2Ugb2YgdHJhbnNsYXRlIGZvciBBbmRyb2lkMiBlbnZpcm9ubWVudFxuXHRcdGlmIChJU19BTkRST0lEMikge1xuXHRcdFx0dGhpcy5vcHRpb25zLnVzZVRyYW5zbGF0ZSA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgY29uZmlnIHZhbHVlc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSAkY2hpbGRyZW4gd3JhcHBlcnMnIGNoaWxkcmVuIGVsZW1lbnRzXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBfcHJlZml4IGV2ZW50IHByZWZpeFxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cblx0ICovXG5cdF9zZXRDb25maWcoJGNoaWxkcmVuLCBfcHJlZml4KSB7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCBwYWRkaW5nID0gb3B0aW9ucy5wcmV2aWV3UGFkZGluZztcblx0XHRsZXQgJG5vZGVzID0gJGNoaWxkcmVuO1xuXG5cdFx0aWYgKHV0aWxzLmNsYXNzTGlzdCgkbm9kZXNbMF0sIGAke29wdGlvbnMucHJlZml4fS1jb250YWluZXJgKSkge1xuXHRcdFx0JG5vZGVzID0gJG5vZGVzWzBdO1xuXHRcdFx0dGhpcy4kY29udGFpbmVyID0gJG5vZGVzO1xuXHRcdFx0JG5vZGVzID0gJG5vZGVzLmNoaWxkcmVuO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdG8gYXJyYXlcblx0XHQkbm9kZXMgPSB1dGlscy50b0FycmF5KCRub2Rlcyk7XG5cblx0XHQvLyBjb25maWcgdmFsdWVcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZiA9IHV0aWxzLmV4dGVuZCh1dGlscy5leHRlbmQoe30sIENPTkZJRyksIHtcblx0XHRcdHBhbmVsOiB7XG5cdFx0XHRcdCRsaXN0OiAkbm9kZXMsXG5cdFx0XHRcdG1pbkNvdW50OiBwYWRkaW5nWzBdICsgcGFkZGluZ1sxXSA+IDAgPyA1IDogMyAgLy8gbWluaW11bSBwYW5lbCBjb3VudFxuXHRcdFx0fSxcblx0XHRcdC8vIHJlbWVtYmVyIG9yaWdpbmFsIGNsYXNzIGFuZCBpbmxpbmUgc3R5bGUgaW4gY2FzZSBvZiByZXN0b3JhdGlvbiBvbiBkZXN0cm95KClcblx0XHRcdG9yaWdQYW5lbFN0eWxlOiB7XG5cdFx0XHRcdHdyYXBwZXI6IHtcblx0XHRcdFx0XHRjbGFzc05hbWU6IHRoaXMuJHdyYXBwZXIuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgbnVsbCxcblx0XHRcdFx0XHRzdHlsZTogdGhpcy4kd3JhcHBlci5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKSB8fCBudWxsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogKHRoaXMuJGNvbnRhaW5lciAmJiB0aGlzLiRjb250YWluZXIuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikpIHx8IG51bGwsXG5cdFx0XHRcdFx0c3R5bGU6ICh0aGlzLiRjb250YWluZXIgJiYgdGhpcy4kY29udGFpbmVyLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpKSB8fCBudWxsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxpc3Q6ICRub2Rlcy5tYXAodiA9PiAoe1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogdi5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBudWxsLFxuXHRcdFx0XHRcdHN0eWxlOiB2LmdldEF0dHJpYnV0ZShcInN0eWxlXCIpIHx8IG51bGxcblx0XHRcdFx0fSkpXG5cdFx0XHR9LFxuXHRcdFx0dXNlTGF5ZXJIYWNrOiBvcHRpb25zLmh3QWNjZWxlcmFibGUgJiYgIVNVUFBPUlRfV0lMTENIQU5HRSxcblx0XHRcdGV2ZW50UHJlZml4OiBfcHJlZml4IHx8IFwiXCJcblx0XHR9KTtcblxuXHRcdFtbXCJMRUZUXCIsIFwiUklHSFRcIl0sIFtcIlVQXCIsIFwiRE9XTlwiXV1bKyFvcHRpb25zLmhvcml6b250YWxdXG5cdFx0XHQuZm9yRWFjaCh2ID0+IGNvbmYuZGlyRGF0YS5wdXNoKEF4ZXNbYERJUkVDVElPTl8ke3Z9YF0pKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZCBhbmQgc2V0IHBhbmVsIG5vZGVzIHRvIG1ha2UgZmxpY2tpbmcgc3RydWN0dXJlXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfYnVpbGQoKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgJGNoaWxkcmVuID0gcGFuZWwuJGxpc3Q7XG5cdFx0Y29uc3QgcGFkZGluZyA9IG9wdGlvbnMucHJldmlld1BhZGRpbmcuY29uY2F0KCk7XG5cdFx0Y29uc3QgcHJlZml4ID0gb3B0aW9ucy5wcmVmaXg7XG5cdFx0Y29uc3QgaG9yaXpvbnRhbCA9IG9wdGlvbnMuaG9yaXpvbnRhbDtcblx0XHRsZXQgcGFuZWxDb3VudCA9IHBhbmVsLmNvdW50ID0gcGFuZWwub3JpZ0NvdW50ID0gJGNoaWxkcmVuLmxlbmd0aDtcblx0XHRjb25zdCBib3VuY2UgPSBvcHRpb25zLmJvdW5jZTtcblxuXHRcdHRoaXMuX3NldFBhZGRpbmcocGFkZGluZywgdHJ1ZSk7XG5cdFx0Y29uc3Qgc2l6ZVZhbHVlID0gdGhpcy5fZ2V0RGF0YUJ5RGlyZWN0aW9uKFtwYW5lbC5zaXplLCBcIjEwMCVcIl0pO1xuXG5cdFx0Ly8gY29udGFpbmVyIGVsZW1lbnQgc3R5bGVcblx0XHRjb25zdCBjc3NWYWx1ZSA9IHtcblx0XHRcdHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG5cdFx0XHR6SW5kZXg6IG9wdGlvbnMuekluZGV4IHx8IDIwMDAsXG5cdFx0XHR3aWR0aDogXCIxMDAlXCIsXG5cdFx0XHRoZWlnaHQ6IFwiMTAwJVwiXG5cdFx0fTtcblxuXHRcdGhvcml6b250YWwgJiYgKGNzc1ZhbHVlLnRvcCA9IFwiMHB4XCIpO1xuXG5cdFx0aWYgKHRoaXMuJGNvbnRhaW5lcikge1xuXHRcdFx0dXRpbHMuY3NzKHRoaXMuJGNvbnRhaW5lciwgY3NzVmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCAkcGFyZW50ID0gJGNoaWxkcmVuWzBdLnBhcmVudE5vZGU7XG5cdFx0XHRjb25zdCAkY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHRcdFx0JGNvbnRhaW5lci5jbGFzc05hbWUgPSBgJHtwcmVmaXh9LWNvbnRhaW5lcmA7XG5cdFx0XHR1dGlscy5jc3MoJGNvbnRhaW5lciwgY3NzVmFsdWUpO1xuXG5cdFx0XHQkY2hpbGRyZW4uZm9yRWFjaCh2ID0+ICRjb250YWluZXIuYXBwZW5kQ2hpbGQodikpO1xuXG5cdFx0XHQkcGFyZW50LmFwcGVuZENoaWxkKCRjb250YWluZXIpO1xuXHRcdFx0dGhpcy4kY29udGFpbmVyID0gJGNvbnRhaW5lcjtcblx0XHR9XG5cblx0XHQvLyBwYW5lbHMnIGNzcyB2YWx1ZXNcblx0XHQkY2hpbGRyZW4uZm9yRWFjaCh2ID0+IHtcblx0XHRcdHV0aWxzLmNsYXNzTGlzdCh2LCBgJHtwcmVmaXh9LXBhbmVsYCwgdHJ1ZSk7XG5cblx0XHRcdHV0aWxzLmNzcyh2LCB7XG5cdFx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG5cdFx0XHRcdHdpZHRoOiB1dGlscy5nZXRVbml0VmFsdWUoc2l6ZVZhbHVlWzBdKSxcblx0XHRcdFx0aGVpZ2h0OiB1dGlscy5nZXRVbml0VmFsdWUoc2l6ZVZhbHVlWzFdKSxcblx0XHRcdFx0Ym94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0dG9wOiAwLFxuXHRcdFx0XHRsZWZ0OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGlmICh0aGlzLl9hZGRDbG9uZVBhbmVscygpKSB7XG5cdFx0XHRwYW5lbENvdW50ID0gcGFuZWwuY291bnQgPSAoXG5cdFx0XHRcdHBhbmVsLiRsaXN0ID0gdXRpbHMudG9BcnJheSh0aGlzLiRjb250YWluZXIuY2hpbGRyZW4pXG5cdFx0XHQpLmxlbmd0aDtcblx0XHR9XG5cblx0XHQvLyBjcmVhdGUgQXhlcyBpbnN0YW5jZVxuXHRcdHRoaXMuX2F4ZXNJbnN0ID0gbmV3IEF4ZXMoe1xuXHRcdFx0ZmxpY2s6IHtcblx0XHRcdFx0cmFuZ2U6IFswLCBwYW5lbC5zaXplICogKHBhbmVsQ291bnQgLSAxKV0sXG5cdFx0XHRcdGJvdW5jZVxuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGVhc2luZzogb3B0aW9ucy5wYW5lbEVmZmVjdCxcblx0XHRcdGRlY2VsZXJhdGlvbjogb3B0aW9ucy5kZWNlbGVyYXRpb24sXG5cdFx0XHRpbnRlcnJ1cHRhYmxlOiBmYWxzZVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5fc2V0RGVmYXVsdFBhbmVsKG9wdGlvbnMuZGVmYXVsdEluZGV4KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgcHJldmlldyBwYWRkaW5nIHZhbHVlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHBhZGRpbmdcblx0ICogQHBhcmFtIHtCb29sZWFufSBidWlsZFxuXHQgKi9cblx0X3NldFBhZGRpbmcocGFkZGluZywgYnVpbGQpIHtcblx0XHRjb25zdCAkd3JhcHBlciA9IHRoaXMuJHdyYXBwZXI7XG5cdFx0Y29uc3QgaG9yaXpvbnRhbCA9IHRoaXMub3B0aW9ucy5ob3Jpem9udGFsO1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBwYWRkaW5nU3VtID0gcGFkZGluZy5yZWR1Y2UoKGEsIGMpID0+IHBhcnNlRmxvYXQoYSkgKyBwYXJzZUZsb2F0KGMpKTtcblx0XHRjb25zdCBjc3NWYWx1ZSA9IHt9O1xuXG5cdFx0aWYgKHBhZGRpbmdTdW0gfHwgIWJ1aWxkKSB7XG5cdFx0XHRob3Jpem9udGFsICYmIHBhZGRpbmcucmV2ZXJzZSgpO1xuXG5cdFx0XHRjc3NWYWx1ZS5wYWRkaW5nID0gYCR7aG9yaXpvbnRhbCA/IFwiMCBcIiA6IFwiXCJ9JHtcblx0XHRcdFx0Ly8gYWRkICdweCcgdW5pdCBpZiBub3QgcHJlc2VudFxuXHRcdFx0XHRwYWRkaW5nLm1hcCh2ID0+IChpc05hTih2KSA/IHYgOiBgJHt2fXB4YCkpXG5cdFx0XHRcdFx0LmpvaW4oXCIgMCBcIilcblx0XHRcdH1gO1xuXHRcdH1cblxuXHRcdGlmIChidWlsZCkge1xuXHRcdFx0Y3NzVmFsdWUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHRcdFx0Y3NzVmFsdWUuYm94U2l6aW5nID0gXCJib3JkZXItYm94XCI7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmtleXMoY3NzVmFsdWUpLmxlbmd0aCAmJiB1dGlscy5jc3MoJHdyYXBwZXIsIGNzc1ZhbHVlKTtcblxuXHRcdGNvbnN0IHBhZGRpbmdUeXBlID0gaG9yaXpvbnRhbCA/IFtcIkxlZnRcIiwgXCJSaWdodFwiXSA6IFtcIlRvcFwiLCBcIkJvdHRvbVwiXTtcblx0XHRjb25zdCB3cmFwcGVyU2l6ZSA9IE1hdGgubWF4KFxuXHRcdFx0JHdyYXBwZXJbYG9mZnNldCR7aG9yaXpvbnRhbCA/IFwiV2lkdGhcIiA6IFwiSGVpZ2h0XCJ9YF0sXG5cdFx0XHR1dGlscy5jc3MoJHdyYXBwZXIsIGhvcml6b250YWwgPyBcIndpZHRoXCIgOiBcImhlaWdodFwiLCB0cnVlKVxuXHRcdCk7XG5cblx0XHRwYW5lbC5zaXplID0gd3JhcHBlclNpemUgLSAoXG5cdFx0XHR1dGlscy5jc3MoJHdyYXBwZXIsIGBwYWRkaW5nJHtwYWRkaW5nVHlwZVswXX1gLCB0cnVlKSArXG5cdFx0XHR1dGlscy5jc3MoJHdyYXBwZXIsIGBwYWRkaW5nJHtwYWRkaW5nVHlwZVsxXX1gLCB0cnVlKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogVG8gZnVsZmlsbCBtaW5pbXVtIHBhbmVsIGNvdW50IGNsb25pbmcgb3JpZ2luYWwgbm9kZSB3aGVuIGNpcmN1bGFyIG9yIHByZXZpZXdQYWRkaW5nIG9wdGlvbiBhcmUgc2V0XG5cdCAqIEBwcml2YXRlXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgOiBhZGRlZCBjbG9uZSBub2RlLCBmYWxzZSA6IG5vdCBhZGRlZFxuXHQgKi9cblx0X2FkZENsb25lUGFuZWxzKCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBwYW5lbENvdW50ID0gcGFuZWwub3JpZ0NvdW50O1xuXHRcdGNvbnN0IGNsb25lQ291bnQgPSBwYW5lbC5taW5Db3VudCAtIHBhbmVsQ291bnQ7XG5cdFx0Y29uc3QgbGlzdCA9IHBhbmVsLiRsaXN0O1xuXHRcdGxldCBjbG9uZU5vZGVzO1xuXG5cdFx0Ly8gaWYgcGFuZWxzIGFyZSBnaXZlbiBsZXNzIHRoYW4gcmVxdWlyZWQgd2hlbiBjaXJjdWxhciBvcHRpb24gaXMgc2V0LCB0aGVuIGNsb25lIG5vZGUgdG8gYXBwbHkgY2lyY3VsYXIgbW9kZVxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY2lyY3VsYXIgJiYgcGFuZWxDb3VudCA8IHBhbmVsLm1pbkNvdW50KSB7XG5cdFx0XHRjbG9uZU5vZGVzID0gbGlzdC5tYXAodiA9PiB2LmNsb25lTm9kZSh0cnVlKSk7XG5cblx0XHRcdHdoaWxlIChjbG9uZU5vZGVzLmxlbmd0aCA8IGNsb25lQ291bnQpIHtcblx0XHRcdFx0Y2xvbmVOb2RlcyA9IGNsb25lTm9kZXMuY29uY2F0KFxuXHRcdFx0XHRcdGxpc3QubWFwKHYgPT4gdi5jbG9uZU5vZGUodHJ1ZSkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdGNsb25lTm9kZXMuZm9yRWFjaCh2ID0+IHRoaXMuJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2KSk7XG5cblx0XHRcdHJldHVybiAhIWNsb25lTm9kZXMubGVuZ3RoO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlIHBhbmVsJ3MgcG9zaXRpb24gd2l0aGluIGFycmF5XG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBlbGVtZW50IGNvdW50cyB0byBtb3ZlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYXBwZW5kIHdoZXJlIHRoZSBsaXN0IHRvIGJlIGFwcGVuZGVkKG1vdmVkKSAodHJ1ZTogdG8gdGhlIGVuZCwgZmFsc2U6IHRvIHRoZSBiZWdpbm5pbmcpXG5cdCAqL1xuXHRfbW92ZVBhbmVsUG9zaXRpb24oY291bnQsIGFwcGVuZCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBsaXN0ID0gcGFuZWwuJGxpc3Q7XG5cdFx0Y29uc3QgbGlzdFRvTW92ZSA9IGxpc3Quc3BsaWNlKGFwcGVuZCA/IDAgOiBwYW5lbC5jb3VudCAtIGNvdW50LCBjb3VudCk7XG5cblx0XHRwYW5lbC4kbGlzdCA9IGFwcGVuZCA/XG5cdFx0XHRsaXN0LmNvbmNhdChsaXN0VG9Nb3ZlKSA6XG5cdFx0XHRsaXN0VG9Nb3ZlLmNvbmNhdChsaXN0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgZGVmYXVsdCBwYW5lbCB0byBzaG93XG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuXHQgKi9cblx0X3NldERlZmF1bHRQYW5lbChpbmRleCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBsYXN0SW5kZXggPSBwYW5lbC5jb3VudCAtIDE7XG5cdFx0bGV0IGNvb3Jkcztcblx0XHRsZXQgYmFzZUluZGV4O1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jaXJjdWxhcikge1xuXHRcdFx0Ly8gaWYgZGVmYXVsdCBpbmRleCBpcyBnaXZlbiwgdGhlbiBtb3ZlIGNvcnJlc3BvbmQgcGFuZWwgdG8gdGhlIGZpcnN0IHBvc2l0aW9uXG5cdFx0XHRpZiAoaW5kZXggPiAwICYmIGluZGV4IDw9IGxhc3RJbmRleCkge1xuXHRcdFx0XHR0aGlzLl9tb3ZlUGFuZWxQb3NpdGlvbihpbmRleCwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNldCBmaXJzdCBwYW5lbCdzIHBvc2l0aW9uIGFjY29yZGluZyBwaHlzaWNhbCBub2RlIGxlbmd0aFxuXHRcdFx0YmFzZUluZGV4ID0gdGhpcy5fZ2V0QmFzZVBvc2l0aW9uSW5kZXgoKTtcblx0XHRcdHRoaXMuX21vdmVQYW5lbFBvc2l0aW9uKGJhc2VJbmRleCwgZmFsc2UpO1xuXG5cdFx0XHR0aGlzLl9zZXRQYW5lbE5vKHtcblx0XHRcdFx0bm86IGluZGV4LFxuXHRcdFx0XHRjdXJyTm86IGluZGV4XG5cdFx0XHR9KTtcblx0XHRcdC8vIGlmIGRlZmF1bHRJbmRleCBvcHRpb24gaXMgZ2l2ZW4sIHRoZW4gbW92ZSB0byB0aGF0IGluZGV4IHBhbmVsXG5cdFx0fSBlbHNlIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPD0gbGFzdEluZGV4KSB7XG5cdFx0XHR0aGlzLl9zZXRQYW5lbE5vKHtcblx0XHRcdFx0aW5kZXgsXG5cdFx0XHRcdG5vOiBpbmRleCxcblx0XHRcdFx0Y3VyckluZGV4OiBpbmRleCxcblx0XHRcdFx0Y3Vyck5vOiBpbmRleFxuXHRcdFx0fSk7XG5cblx0XHRcdGNvb3JkcyA9IFstKHBhbmVsLnNpemUgKiBpbmRleCksIDBdO1xuXG5cdFx0XHR0aGlzLl9zZXRUcmFuc2xhdGUoY29vcmRzKTtcblx0XHRcdHRoaXMuX3NldEF4ZXMoXCJzZXRUb1wiLCBNYXRoLmFicyhjb29yZHNbMF0pLCAwKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQXJyYW5nZSBwYW5lbHMnIHBvc2l0aW9uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc29ydCBOZWVkIHRvIHNvcnQgcGFuZWwncyBwb3NpdGlvblxuXHQgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhUb01vdmUgTnVtYmVyIHRvIG1vdmUgZnJvbSBjdXJyZW50IHBvc2l0aW9uIChuZWdhdGl2ZTogbGVmdCwgcG9zaXRpdmU6IHJpZ2h0KVxuXHQgKi9cblx0X2FycmFuZ2VQYW5lbHMoc29ydCwgaW5kZXhUb01vdmUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBwYW5lbCA9IGNvbmYucGFuZWw7XG5cdFx0Y29uc3QgdG91Y2ggPSBjb25mLnRvdWNoO1xuXHRcdGNvbnN0IGRpckRhdGEgPSBjb25mLmRpckRhdGE7XG5cdFx0bGV0IGJhc2VJbmRleDtcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY2lyY3VsYXIpIHtcblx0XHRcdC8vIHdoZW4gYXJyYW5naW5nIHBhbmVscywgc2V0IGZsYWcgdG8gbm90IHRyaWdnZXIgZmxpY2sgY3VzdG9tIGV2ZW50XG5cdFx0XHRjb25mLmN1c3RvbUV2ZW50LmZsaWNrID0gZmFsc2U7XG5cblx0XHRcdC8vIG1vdmUgZWxlbWVudHMgYWNjb3JkaW5nIGRpcmVjdGlvblxuXHRcdFx0aWYgKHNvcnQpIHtcblx0XHRcdFx0aW5kZXhUb01vdmUgJiYgKHRvdWNoLmRpcmVjdGlvbiA9IGRpckRhdGFbKyEoaW5kZXhUb01vdmUgPiAwKV0pO1xuXHRcdFx0XHR0aGlzLl9hcnJhbmdlUGFuZWxQb3NpdGlvbih0b3VjaC5kaXJlY3Rpb24sIGluZGV4VG9Nb3ZlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gc2V0IGluZGV4IGZvciBiYXNlIGVsZW1lbnQncyBwb3NpdGlvblxuXHRcdFx0YmFzZUluZGV4ID0gdGhpcy5fZ2V0QmFzZVBvc2l0aW9uSW5kZXgoKTtcblxuXHRcdFx0dGhpcy5fc2V0UGFuZWxObyh7XG5cdFx0XHRcdGluZGV4OiBiYXNlSW5kZXgsXG5cdFx0XHRcdGN1cnJJbmRleDogYmFzZUluZGV4XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gYXJyYW5nZSBBeGVzJyBjb29yZCBwb3NpdGlvblxuXHRcdFx0Y29uZi5jdXN0b21FdmVudC5mbGljayA9ICEhdGhpcy5fc2V0QXhlcyhcInNldFRvXCIsIHBhbmVsLnNpemUgKiBwYW5lbC5pbmRleCwgMCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fYXBwbHlQYW5lbHNQb3MoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgZWFjaCBwYW5lbCdzIHBvc2l0aW9uIGluIERPTVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2FwcGx5UGFuZWxzUG9zKCkge1xuXHRcdHRoaXMuX2NvbmYucGFuZWwuJGxpc3QuZm9yRWFjaCh0aGlzLl9hcHBseVBhbmVsc0Nzcy5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgQ1NTIHN0eWxlIHZhbHVlcyB0byBtb3ZlIGVsZW1lbnRzXG5cdCAqXG5cdCAqIEluaXRpYWxpemUgc2V0dGluZyB1cCBjaGVja2luZyBpZiBicm93c2VyIHN1cHBvcnQgdHJhbnNmb3JtIGNzcyBwcm9wZXJ0eS5cblx0ICogSWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgdHJhbnNmb3JtLCB0aGVuIHVzZSBsZWZ0L3RvcCBwcm9wZXJ0aWVzIGluc3RlYWQuXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9ICRlbFxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb29yZHNWYWx1ZVxuXHQgKi9cblx0X3NldE1vdmVTdHlsZSgkZWwsIGNvb3Jkc1ZhbHVlKSB7XG5cdFx0Y29uc3QgdHJhbnNmb3JtID0gVFJBTlNGT1JNO1xuXHRcdGNvbnN0IHVzZUxheWVySGFjayA9IHRoaXMuX2NvbmYudXNlTGF5ZXJIYWNrO1xuXG5cdFx0dGhpcy5fc2V0TW92ZVN0eWxlID0gdHJhbnNmb3JtLnN1cHBvcnQgP1xuXHRcdFx0KCRlbGVtZW50LCBjb29yZHMpID0+IHtcblx0XHRcdFx0dXRpbHMuY3NzKCRlbGVtZW50LCB7XG5cdFx0XHRcdFx0W3RyYW5zZm9ybS5uYW1lXTogdXRpbHMudHJhbnNsYXRlKGNvb3Jkc1swXSwgY29vcmRzWzFdLCB1c2VMYXllckhhY2spXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSA6ICgkZWxlbWVudCwgY29vcmRzKSA9PiB7XG5cdFx0XHRcdHV0aWxzLmNzcygkZWxlbWVudCwge2xlZnQ6IGNvb3Jkc1swXSwgdG9wOiBjb29yZHNbMV19KTtcblx0XHRcdH07XG5cblx0XHR0aGlzLl9zZXRNb3ZlU3R5bGUoJGVsLCBjb29yZHNWYWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGJhY2sgZnVuY3Rpb24gZm9yIGFwcGx5aW5nIENTUyB2YWx1ZXMgdG8gZWFjaCBwYW5lbHNcblx0ICogTmVlZCB0byBiZSBpbml0aWFsaXplZCBiZWZvcmUgdXNlLCB0byBzZXQgdXAgZm9yIEFuZHJvaWQgMi54IGJyb3dzZXJzIG9yIG90aGVycy5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9hcHBseVBhbmVsc0NzcygpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBkdW1teUFuY2hvckNsYXNzTmFtZSA9IFwiX19kdW1teV9hbmNob3JcIjtcblx0XHRjb25zdCB1c2VUcmFuc2xhdGUgPSB0aGlzLm9wdGlvbnMudXNlVHJhbnNsYXRlO1xuXG5cdFx0aWYgKCF1c2VUcmFuc2xhdGUpIHtcblx0XHRcdGlmIChJU19BTkRST0lEMikge1xuXHRcdFx0XHRjb25mLiRkdW1teUFuY2hvciA9IHV0aWxzLiQoYC4ke2R1bW15QW5jaG9yQ2xhc3NOYW1lfWApO1xuXG5cdFx0XHRcdCFjb25mLiRkdW1teUFuY2hvciAmJiB0aGlzLiR3cmFwcGVyLmFwcGVuZENoaWxkKFxuXHRcdFx0XHRcdGNvbmYuJGR1bW15QW5jaG9yID0gdXRpbHMuJChgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwiJHtkdW1teUFuY2hvckNsYXNzTmFtZX1cIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlO2hlaWdodDowcHg7d2lkdGg6MHB4XCI+YClcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fYXBwbHlQYW5lbHNDc3MgPSBmdW5jdGlvbih2LCBpKSB7XG5cdFx0XHRcdGNvbnN0IGNvb3JkcyA9IHRoaXMuX2dldERhdGFCeURpcmVjdGlvbihcblx0XHRcdFx0XHRbYCR7dGhpcy5fY29uZi5wYW5lbC5zaXplICogaX1weGAsIDBdXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0dXRpbHMuY3NzKHYsIHtcblx0XHRcdFx0XHRsZWZ0OiBjb29yZHNbMF0sXG5cdFx0XHRcdFx0dG9wOiBjb29yZHNbMV1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9hcHBseVBhbmVsc0NzcyA9IGZ1bmN0aW9uKHYsIGkpIHtcblx0XHRcdFx0Y29uc3QgY29vcmRzID0gdGhpcy5fZ2V0RGF0YUJ5RGlyZWN0aW9uKFtcblx0XHRcdFx0XHRUUkFOU0ZPUk0uc3VwcG9ydCA/XG5cdFx0XHRcdFx0XHRgJHsxMDAgKiBpfSVgIDpcblx0XHRcdFx0XHRcdGAke3RoaXMuX2NvbmYucGFuZWwuc2l6ZSAqIGl9cHhgLCAwXG5cdFx0XHRcdF0pO1xuXG5cdFx0XHRcdHRoaXMuX3NldE1vdmVTdHlsZSh2LCBjb29yZHMpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQWRqdXN0IGNvbnRhaW5lcidzIGNzcyB2YWx1ZSB0byBoYW5kbGUgQW5kcm9pZCAyLnggbGluayBoaWdobGlnaHRpbmcgYnVnXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwaGFzZVxuXHQgKiAgICBzdGFydCAtIHNldCBsZWZ0L3RvcCB2YWx1ZSB0byAwXG5cdCAqICAgIGVuZCAtIHNldCB0cmFuc2xhdGUgdmFsdWUgdG8gMFxuXHQgKiBAcGFyYW0ge0FycmF5fSB0b1ZhbHVlIGNvb3JkaW5hdGUgdmFsdWVcblx0ICovXG5cdF9hZGp1c3RDb250YWluZXJDc3MocGhhc2UsIHRvVmFsdWUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBwYW5lbCA9IGNvbmYucGFuZWw7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCB1c2VUcmFuc2xhdGUgPSBvcHRpb25zLnVzZVRyYW5zbGF0ZTtcblx0XHRjb25zdCBob3Jpem9udGFsID0gb3B0aW9ucy5ob3Jpem9udGFsO1xuXHRcdGNvbnN0IHBhZGRpbmdUb3AgPSBvcHRpb25zLnByZXZpZXdQYWRkaW5nWzBdO1xuXHRcdGxldCBjb250YWluZXIgPSB0aGlzLiRjb250YWluZXI7XG5cdFx0bGV0IHRvID0gdG9WYWx1ZTtcblx0XHRsZXQgdmFsdWU7XG5cblx0XHRpZiAoIXVzZVRyYW5zbGF0ZSkge1xuXHRcdFx0aWYgKCF0bykge1xuXHRcdFx0XHR0byA9IC1wYW5lbC5zaXplICogcGFuZWwuaW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwaGFzZSA9PT0gXCJzdGFydFwiKSB7XG5cdFx0XHRcdGNvbnRhaW5lciA9IGNvbnRhaW5lci5zdHlsZTtcblx0XHRcdFx0dmFsdWUgPSBwYXJzZUZsb2F0KGNvbnRhaW5lcltob3Jpem9udGFsID8gXCJsZWZ0XCIgOiBcInRvcFwiXSk7XG5cblx0XHRcdFx0aWYgKGhvcml6b250YWwpIHtcblx0XHRcdFx0XHR2YWx1ZSAmJiAoY29udGFpbmVyLmxlZnQgPSBcIjBweFwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSAhPT0gcGFkZGluZ1RvcCAmJiAoY29udGFpbmVyLnRvcCA9IFwiMHB4XCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fc2V0VHJhbnNsYXRlKFstdG8sIDBdKTtcblx0XHRcdH0gZWxzZSBpZiAocGhhc2UgPT09IFwiZW5kXCIpIHtcblx0XHRcdFx0dG8gPSB0aGlzLl9nZXRDb29yZHNWYWx1ZShbdG8sIDBdKTtcblxuXHRcdFx0XHR1dGlscy5jc3MoY29udGFpbmVyLCB7XG5cdFx0XHRcdFx0bGVmdDogdG8ueCxcblx0XHRcdFx0XHR0b3A6IHRvLnksXG5cdFx0XHRcdFx0W1RSQU5TRk9STS5uYW1lXTogdXRpbHMudHJhbnNsYXRlKDAsIDAsIGNvbmYudXNlTGF5ZXJIYWNrKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjb25mLiRkdW1teUFuY2hvciAmJiBjb25mLiRkdW1teUFuY2hvci5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgQXhlcyBjb29yZCB2YWx1ZVxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBmbGljayBkZXN0aW5hdGlvbiB2YWx1ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cblx0ICogQHJldHVybiB7ZWcuQXhlc30gQXhlcyBpbnN0YW5jZVxuXHQgKi9cblx0X3NldEF4ZXMobWV0aG9kLCBmbGljaywgZHVyYXRpb24pIHtcblx0XHRyZXR1cm4gdGhpcy5fYXhlc0luc3RbbWV0aG9kXSh7ZmxpY2t9LCBkdXJhdGlvbik7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGhpbnQgZm9yIGJyb3dzZXIgdG8gZGVjaWRlIGVmZmljaWVudCB3YXkgb2YgZG9pbmcgdHJhbnNmb3JtIGNoYW5nZXMob3IgYW5pbWF0aW9uKVxuXHQgKiBodHRwczovL2Rldi5vcGVyYS5jb20vYXJ0aWNsZXMvY3NzLXdpbGwtY2hhbmdlLXByb3BlcnR5L1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X3NldEhpbnQoKSB7XG5cdFx0Y29uc3Qgc3R5bGUgPSB7d2lsbENoYW5nZTogXCJ0cmFuc2Zvcm1cIn07XG5cblx0XHR1dGlscy5jc3ModGhpcy4kY29udGFpbmVyLCBzdHlsZSk7XG5cdFx0dXRpbHMuY3NzKHRoaXMuX2NvbmYucGFuZWwuJGxpc3QsIHN0eWxlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgZGF0YSBhY2NvcmRpbmcgb3B0aW9ucy5ob3Jpem9udGFsIHZhbHVlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIHByaW1hcnkgZGF0YSB0byBoYW5kbGVcblx0ICogQHJldHVybiB7QXJyYXl9XG5cdCAqL1xuXHRfZ2V0RGF0YUJ5RGlyZWN0aW9uKHZhbHVlKSB7XG5cdFx0Y29uc3QgZGF0YSA9IHZhbHVlLmNvbmNhdCgpO1xuXG5cdFx0IXRoaXMub3B0aW9ucy5ob3Jpem9udGFsICYmIGRhdGEucmV2ZXJzZSgpO1xuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmUgbm9kZXNcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtCb29sZWFufSBkaXJlY3Rpb25cblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4VG9Nb3ZlXG5cdCAqL1xuXHRfYXJyYW5nZVBhbmVsUG9zaXRpb24oZGlyZWN0aW9uLCBpbmRleFRvTW92ZSkge1xuXHRcdGNvbnN0IG5leHQgPSBkaXJlY3Rpb24gPT09IHRoaXMuX2NvbmYuZGlyRGF0YVswXTtcblxuXHRcdHRoaXMuX21vdmVQYW5lbFBvc2l0aW9uKE1hdGguYWJzKGluZGV4VG9Nb3ZlIHx8IDEpLCBuZXh0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGJhc2UgcG9zaXRpb24gaW5kZXggb2YgdGhlIHBhbmVsXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfZ2V0QmFzZVBvc2l0aW9uSW5kZXgoKSB7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IodGhpcy5fY29uZi5wYW5lbC5jb3VudCAvIDIgLSAwLjEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpbmQgZXZlbnRzXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gYmluZFxuXHQgKi9cblx0X2JpbmRFdmVudHMoYmluZCkge1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgJHdyYXBwZXIgPSB0aGlzLiR3cmFwcGVyO1xuXHRcdGNvbnN0IGF4ZXNJbnN0ID0gdGhpcy5fYXhlc0luc3Q7XG5cblx0XHRpZiAoYmluZCkge1xuXHRcdFx0dGhpcy5fcGFuSW5wdXQgPSBuZXcgUGFuSW5wdXQoJHdyYXBwZXIsIHtcblx0XHRcdFx0aW5wdXRUeXBlOiBvcHRpb25zLmlucHV0VHlwZSxcblx0XHRcdFx0dGhyZXNob2xkQW5nbGU6IG9wdGlvbnMudGhyZXNob2xkQW5nbGUsXG5cdFx0XHRcdHNjYWxlOiB0aGlzLl9nZXREYXRhQnlEaXJlY3Rpb24oWy0xLCAwXSlcblx0XHRcdH0pO1xuXG5cdFx0XHRheGVzSW5zdC5vbih7XG5cdFx0XHRcdGhvbGQ6IHRoaXMuX2hvbGRIYW5kbGVyLmJpbmQodGhpcyksXG5cdFx0XHRcdGNoYW5nZTogdGhpcy5fY2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpLFxuXHRcdFx0XHRyZWxlYXNlOiB0aGlzLl9yZWxlYXNlSGFuZGxlci5iaW5kKHRoaXMpLFxuXHRcdFx0XHRhbmltYXRpb25TdGFydDogdGhpcy5fYW5pbWF0aW9uU3RhcnRIYW5kbGVyLmJpbmQodGhpcyksXG5cdFx0XHRcdGFuaW1hdGlvbkVuZDogdGhpcy5fYW5pbWF0aW9uRW5kSGFuZGxlci5iaW5kKHRoaXMpXG5cdFx0XHR9KS5jb25uZWN0KHRoaXMuX2dldERhdGFCeURpcmVjdGlvbihbXCJmbGlja1wiLCBcIlwiXSksIHRoaXMuX3BhbklucHV0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5kaXNhYmxlSW5wdXQoKTtcblx0XHRcdGF4ZXNJbnN0Lm9mZigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgY29udGFpbmVyJ3MgaGVpZ2h0IHZhbHVlIGFjY29yZGluZyB0byBjaGlsZHJlbidzIGhlaWdodFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGlyZWN0aW9uXG5cdCAqL1xuXHRfc2V0QWRhcHRpdmVIZWlnaHQoZGlyZWN0aW9uKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgaW5kZXhUb01vdmUgPSBjb25mLmluZGV4VG9Nb3ZlO1xuXHRcdGxldCAkY2hpbGRyZW47XG5cdFx0bGV0IGhlaWdodDtcblxuXHRcdGNvbnN0ICRwYW5lbCA9IGluZGV4VG9Nb3ZlID09PSAwID9cblxuXHRcdFx0Ly8gcGFuZWwgbW92ZWQgYnkgMVxuXHRcdFx0dGhpc1tgZ2V0JHtcblx0XHRcdFx0KGRpcmVjdGlvbiA9PT0gQXhlcy5ESVJFQ1RJT05fTEVGVCAmJiBcIk5leHRcIikgfHxcblx0XHRcdFx0KGRpcmVjdGlvbiA9PT0gQXhlcy5ESVJFQ1RJT05fUklHSFQgJiYgXCJQcmV2XCIpIHx8IFwiXCJcblx0XHRcdH1FbGVtZW50YF0oKSA6XG5cblx0XHRcdC8vIHBhbmVsIG1vdmVkIGJ5IC5tb3ZlVG8oKVxuXHRcdFx0Y29uZi5wYW5lbC4kbGlzdFtcblx0XHRcdFx0Y29uZi5wYW5lbC5jdXJySW5kZXggKyBpbmRleFRvTW92ZVxuXHRcdFx0XTtcblxuXHRcdGNvbnN0ICRmaXJzdCA9ICRwYW5lbC5xdWVyeVNlbGVjdG9yKFwiOmZpcnN0LWNoaWxkXCIpO1xuXG5cdFx0aWYgKCRmaXJzdCkge1xuXHRcdFx0aGVpZ2h0ID0gJGZpcnN0LmdldEF0dHJpYnV0ZShEQVRBX0hFSUdIVCk7XG5cblx0XHRcdGlmICghaGVpZ2h0KSB7XG5cdFx0XHRcdCRjaGlsZHJlbiA9ICRwYW5lbC5jaGlsZHJlbjtcblxuXHRcdFx0XHRoZWlnaHQgPSB1dGlscy5vdXRlckhlaWdodChcblx0XHRcdFx0XHQkY2hpbGRyZW4ubGVuZ3RoID4gMSA/ICgkcGFuZWwuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCIsICRwYW5lbCkgOiAkZmlyc3Rcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRoZWlnaHQgPiAwICYmICRmaXJzdC5zZXRBdHRyaWJ1dGUoREFUQV9IRUlHSFQsIGhlaWdodCk7XG5cdFx0XHR9XG5cblx0XHRcdGhlaWdodCA+IDAgJiYgKHRoaXMuJHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRyaWdnZXIgYmVmb3JlUmVzdG9yZSBldmVudFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gZSBldmVudCBvYmplY3Rcblx0ICovXG5cdF90cmlnZ2VyQmVmb3JlUmVzdG9yZShlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgdG91Y2ggPSBjb25mLnRvdWNoO1xuXG5cdFx0Ly8gcmV2ZXJzZSBkaXJlY3Rpb24gdmFsdWUgd2hlbiByZXN0b3JlXG5cdFx0dG91Y2guZGlyZWN0aW9uID0gK2NvbmYuZGlyRGF0YS5qb2luKFwiXCIpLnJlcGxhY2UodG91Y2guZGlyZWN0aW9uLCBcIlwiKTtcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgZXZlbnQgb2NjdXJzIGJlZm9yZSB0aGUgY3VycmVudCBwYW5lbCBzdGFydHMgdG8gcmV0dXJuIHRvIGl0cyBvcmlnaW5hbCBwb3NpdGlvbi4gRm9sbG93ZXMgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja30gYW5kIFtyZXN0b3JlXXtAbGluayBlZy5GbGlja2luZyNldmVudDpyZXN0b3JlfSBldmVudHMuIFRoZSBjb25kaXRpb25zIG9mIG9jY3VycmVuY2UgYXJlIGFzIGZvbGxvd3MuPGJyPjxicj4xLiBUaGUgdXNlciBoYXMgZmluaXNoZWQgaW5wdXQgYnV0IGRvZXMgbm90IGV4Y2VlZCB0aGUgcGFuZWwgbW92ZW1lbnQgdGhyZXNob2xkLjxicj4yLiBDYWxsIHRoZSBbcmVzdG9yZSgpXXtAbGluayBlZy5GbGlja2luZyNyZXN0b3JlfSBtZXRob2QuIChQcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH0gZXZlbnQuKVxuXHRcdCAqIEBrbyDtmITsnqwg7Yyo64SQ7J20IOybkOuemCDsnITsuZjroZwg65CY64+M7JWE6rCA6riwIOyLnOyekeyghOyXkCDrsJzsg53tlZjripQg7J2067Kk7Yq47J2064ukLiDrkqTsnbTslrQgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja33qs7wgW3Jlc3RvcmVde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OnJlc3RvcmV97J2067Kk7Yq46rCAIOuwnOyDne2VnOuLpC4g67Cc7IOd7KGw6rG07J2AIOyVhOuemOyZgCDqsJnri6QuPGJyPjxicj4xLiDsgqzsmqnsnpAg7J6F66Cl7J20IOuBneuCrOuKlOuNsCDtjKjrhJAg7J2064+ZIOyehOqzhOygkOydhCDrhJjsp4Ag7JWK7J2AIOqyveyasC48YnI+Mi4gW3Jlc3RvcmUoKV17QGxpbmsgZWcuRmxpY2tpbmcjcmVzdG9yZX0g66mU7ISc65OcIO2YuOy2nC4oW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IOydtOuypO2KuOydmCDquLDrs7jrj5nsnpEg67Cp7KeAIOyghOygnClcblx0XHQgKiBAbmFtZSBlZy5GbGlja2luZyNiZWZvcmVSZXN0b3JlXG5cdFx0ICogQGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtTdHJpbmd9IGV2ZW50VHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgPGtvPuydtOuypO2KuCDrqoU8L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNUcnVzdGVkIGB0cnVlYCB3aGVuIHRoZSBldmVudCB3YXMgZ2VuZXJhdGVkIGJ5IGEgdXNlciBhY3Rpb24oXCJtb3VzZVwiIG9yIFwidG91Y2hcIikgb3RoZXJ3aXNlIGBmYWxzZWAuPGtvPuyCrOyaqeyekCDslaHshZgoXCJtb3VzZVwiIOuYkOuKlCBcInRvdWNoXCIp7JeQIOydmO2VtCDsnbTrsqTtirjqsIAg7IOd7ISx65CcIOqyveyasCBgdHJ1ZWAuIOq3uCDsmbjripQgYGZhbHNlYC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBubyBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gU2VlIHRoZSBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IG1ldGhvZC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGlyZWN0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudC4gSWYgYGhvcml6b250YWw9dHJ1ZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gSWYgYGhvcml6b250YWw9ZmFsc2VgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPGtvPu2MqOuEkCDsnbTrj5kg67Cp7ZalLiBgaG9yaXpvbnRhbD10cnVlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIGBob3Jpem9udGFsPWZhbHNlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGVwYVBvcyBTdGFydGluZyBjb29yZGluYXRlLiA8a28+7Lac67Cc7KCQIOyijO2RnC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkZXN0UG9zIERlc3RpbmF0aW9uIGNvb3JkaW5hdGUuIDxrbz7rj4TssKnsoJAg7KKM7ZGcLjwva28+XG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja1xuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6cmVzdG9yZVxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gVGhlIG9yZGVyIG9mIGV2ZW50IG9jY3VycmVuY2UuXG5cdFx0ICogLy8g7J2067Kk7Yq4IOuwnOyDnSDsiJzshJxcblx0XHQgKiBiZWZvcmVSZXN0b3JlIChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IHJlc3RvcmUgKG9uY2UpXG5cdFx0ICovXG5cdFx0Y29uZi5jdXN0b21FdmVudC5yZXN0b3JlID0gdGhpcy5fdHJpZ2dlckV2ZW50KEVWRU5UUy5iZWZvcmVSZXN0b3JlLCB7XG5cdFx0XHRkZXBhUG9zOiBlLmRlcGFQb3MuZmxpY2ssXG5cdFx0XHRkZXN0UG9zOiBlLmRlc3RQb3MuZmxpY2tcblx0XHR9KTtcblxuXHRcdGlmICghY29uZi5jdXN0b21FdmVudC5yZXN0b3JlKSB7XG5cdFx0XHRcInN0b3BcIiBpbiBlICYmIGUuc3RvcCgpO1xuXHRcdFx0Y29uZi5wYW5lbC5hbmltYXRpbmcgPSBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVHJpZ2dlciByZXN0b3JlIGV2ZW50XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfdHJpZ2dlclJlc3RvcmUoKSB7XG5cdFx0Y29uc3QgY3VzdG9tRXZlbnQgPSB0aGlzLl9jb25mLmN1c3RvbUV2ZW50O1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIGV2ZW50IHRoYXQgb2NjdXJzIGFmdGVyIGNvbXBsZXRpbmcgdGhlIG1vdmUgYnkgW3Jlc3RvcmUoKV17QGxpbmsgZWcuRmxpY2tpbmcjcmVzdG9yZX0gbWV0aG9kLlxuXHRcdCAqIEBrbyBbcmVzdG9yZSgpXXtAbGluayBlZy5GbGlja2luZyNyZXN0b3JlfSDrqZTshJzrk5zsl5Ag7J2Y7ZW0IO2MqOuEkOydtCDsm5Drnpgg7JyE7LmY66GcIOydtOuPmeydhCDsmYTro4ztlZwg64uk7J2MIOuwnOyDne2VmOuKlCDsnbTrsqTtirguXG5cdFx0ICogQG5hbWUgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBldmVudFR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IDxrbz7snbTrsqTtirgg66qFPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVHJ1c3RlZCBgdHJ1ZWAgd2hlbiB0aGUgZXZlbnQgd2FzIGdlbmVyYXRlZCBieSBhIHVzZXIgYWN0aW9uKFwibW91c2VcIiBvciBcInRvdWNoXCIpIG90aGVyd2lzZSBgZmFsc2VgLjxrbz7sgqzsmqnsnpAg7JWh7IWYKFwibW91c2VcIiDrmJDripQgXCJ0b3VjaFwiKeyXkCDsnZjtlbQg7J2067Kk7Yq46rCAIOyDneyEseuQnCDqsr3smrAgYHRydWVgLiDqt7gg7Jm464qUIGBmYWxzZWAuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gbm8gSW5kZXggbnVtYmVyIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuIFNlZSB0aGUgW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSBtZXRob2QuPGtvPu2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLguIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH3rqZTshJzrk5wg7LC47KGwLjwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpcmVjdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQuIElmIGBob3Jpem9udGFsPXRydWVgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIElmIGBob3Jpem9udGFsPWZhbHNlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljxrbz7tjKjrhJAg7J2064+ZIOuwqe2WpS4gYGhvcml6b250YWw9dHJ1ZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBgaG9yaXpvbnRhbD1mYWxzZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljwva28+XG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpiZWZvcmVSZXN0b3JlXG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja1xuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogLy8gVGhlIG9yZGVyIG9mIGV2ZW50IG9jY3VycmVuY2UuXG5cdFx0ICogLy8g7J2067Kk7Yq4IOuwnOyDnSDsiJzshJxcblx0XHQgKiBiZWZvcmVSZXN0b3JlIChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IHJlc3RvcmUgKG9uY2UpXG5cdFx0ICovXG5cdFx0Y3VzdG9tRXZlbnQucmVzdG9yZSAmJiB0aGlzLl90cmlnZ2VyRXZlbnQoRVZFTlRTLnJlc3RvcmUpO1xuXHRcdGN1c3RvbUV2ZW50LnJlc3RvcmUgPSBjdXN0b21FdmVudC5yZXN0b3JlQ2FsbCA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB2YWx1ZSB3aGVuIHBhbmVsIGNoYW5nZXNcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHBoYXNlIC0gW3N0YXJ0fGVuZF1cblx0ICogQHBhcmFtIHtPYmplY3R9IHBvc1xuXHQgKi9cblx0X3NldFBoYXNlVmFsdWUocGhhc2UsIHBvcykge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IHVzZVRyYW5zbGF0ZSA9IG9wdGlvbnMudXNlVHJhbnNsYXRlO1xuXG5cdFx0aWYgKHBoYXNlID09PSBcInN0YXJ0XCIgJiYgKHBhbmVsLmNoYW5nZWQgPSB0aGlzLl9pc01vdmFibGUoKSkpIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogQW4gZXZlbnQgdGhhdCBvY2N1cnMgYmVmb3JlIGEgdXNlciBhY3Rpb24gb3IgW21vdmVUbygpXXtAbGluayBlZy5GbGlja2luZyNtb3ZlVG99LCBbcHJldigpXXtAbGluayBlZy5GbGlja2luZyNwcmV2fSwgW25leHQoKV17QGxpbmsgZWcuRmxpY2tpbmcjbmV4dH0gbWV0aG9kIGluaXRpYXRlcyBhIG1vdmUgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsLiBJZiB5b3UgZG8gbm90IHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IsIHRoZW4gbWFueSBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfSBldmVudHMgYW5kIG9uZSBbZmxpY2tFbmRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrRW5kfSBldmVudCB3aWxsIG9jY3VyLlxuXHRcdFx0ICogQGtvIOyCrOyaqeyekCDslaHshZgg7Zi57J2AIFttb3ZlVG8oKV17QGxpbmsgZWcuRmxpY2tpbmcjbW92ZVRvfSwgW3ByZXYoKV17QGxpbmsgZWcuRmxpY2tpbmcjcHJldn0sIFtuZXh0KClde0BsaW5rIGVnLkZsaWNraW5nI25leHR9IOuplOyEnOuTnOyXkCDsnZjtlbQg66qp7KCBIO2MqOuEkOuhnOydmCDsnbTrj5kg7Iuc7J6R7KCEIOuwnOyDne2VmOuKlCDsnbTrsqTtirguIOq4sOuzuOuPmeyekeydhCDrp4nsp4Ag7JWK64qU64uk66m0IOuSpOydtOyWtCDri6TsiJjsnZggW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja33snbTrsqTtirjsmYAg6re4IOuSpCDtlZwg67KI7J2YIFtmbGlja0VuZF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmR97J2067Kk7Yq46rCAIOuwnOyDne2VnOuLpC5cblx0XHRcdCAqIEBuYW1lIGVnLkZsaWNraW5nI2JlZm9yZUZsaWNrU3RhcnRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQHByb3BlcnR5IHtTdHJpbmd9IGV2ZW50VHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgPGtvPuydtOuypO2KuCDrqoU8L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtCb29sZWFufSBpc1RydXN0ZWQgYHRydWVgIHdoZW4gdGhlIGV2ZW50IHdhcyBnZW5lcmF0ZWQgYnkgYSB1c2VyIGFjdGlvbihcIm1vdXNlXCIgb3IgXCJ0b3VjaFwiKSBvdGhlcndpc2UgYGZhbHNlYC48a28+7IKs7Jqp7J6QIOyVoeyFmChcIm1vdXNlXCIg65iQ64qUIFwidG91Y2hcIinsl5Ag7J2Y7ZW0IOydtOuypO2KuOqwgCDsg53shLHrkJwg6rK97JqwIGB0cnVlYC4g6re4IOyZuOuKlCBgZmFsc2VgPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBubyBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gU2VlIHRoZSBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IG1ldGhvZC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaXJlY3Rpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiBJZiBgaG9yaXpvbnRhbD10cnVlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBJZiBgaG9yaXpvbnRhbD1mYWxzZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48a28+7Yyo64SQIOydtOuPmSDrsKntlqUuIGBob3Jpem9udGFsPXRydWVgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gYGhvcml6b250YWw9ZmFsc2VgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRlcGFQb3MgU3RhcnRpbmcgY29vcmRpbmF0ZS4gPGtvPuy2nOuwnOygkCDsooztkZwuPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkZXN0UG9zIERlc3RpbmF0aW9uIGNvb3JkaW5hdGUuIDxrbz7rj4TssKnsoJAg7KKM7ZGcLjwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBzdG9wIENhbmNlbHMgdGhlIGRlZmF1bHQgYWN0aW9uLiAoRGVmYXVsdCBhY3Rpb246IE1vdmUgdG8gZGVzdGluYXRpb24gcGFuZWwuKSBUaGUgcGFuZWwgZWxlbWVudCBzdGF5cyBhdCB0aGUgcG9zaXRpb24gb2YgdGhlIGNhbGwgdG8gYHN0b3AoKWAuIFRvIHJldHVybiB0byB0aGUgb3JpZ2luYWwgcG9zaXRpb24sIHlvdSBtdXN0IGNhbGwgdGhlIFtyZXN0b3JlKClde0BsaW5rIGVnLkZsaWNraW5nI3Jlc3RvcmV9IG1ldGhvZC48a28+6riw67O464+Z7J6R7J2EIOy3qOyGjO2VnOuLpC4gKOq4sOuzuOuPmeyekTog66qp7KCBIO2MqOuEkOuhnOydmCDsnbTrj5kuKSDtjKjrhJAg7JqU7IaM6rCAIGBzdG9wKClg7Zi47Lac7Iuc7KCQ7J2YIOychOy5mOyXkCDrqLjrrLzrn6wg7J6I64qU64ukLiDsm5Drnpgg7J6Q66as66GcIOuQmOuPjOumrOugpOuptCBbcmVzdG9yZSgpXXtAbGluayBlZy5GbGlja2luZyNyZXN0b3JlfSDrqZTshJzrk5zrpbwg7Zi47Lac7ZW07JW8IO2VnOuLpC48L2tvPlxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja1xuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja0VuZFxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNtb3ZlVG9cblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcHJldlxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNuZXh0XG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogLy8gVGhlIG9yZGVyIG9mIGV2ZW50IG9jY3VycmVuY2UuXG5cdFx0XHQgKiAvLyDsnbTrsqTtirgg67Cc7IOdIOyInOyEnFxuXHRcdFx0ICogYmVmb3JlRmxpY2tTdGFydCAob25jZSkgPiBmbGljayAobWFueSB0aW1lcykgPiBmbGlja0VuZCAob25jZSlcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAvLyBBbiBleGFtcGxlIHRvIHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IuXG5cdFx0XHQgKiAvLyDquLDrs7jrj5nsnpHsnYQg66eJ64qUIOyYiC5cblx0XHRcdCAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKS5vbihcImJlZm9yZUZsaWNrU3RhcnRcIiwgZSA9PiB7XG5cdFx0XHQgKiBcdGUuc3RvcCgpO1xuXHRcdFx0ICogfSk7XG5cdFx0XHQgKi9cblx0XHRcdGlmICghdGhpcy5fdHJpZ2dlckV2ZW50KEVWRU5UUy5iZWZvcmVGbGlja1N0YXJ0LCBwb3MpKSB7XG5cdFx0XHRcdHBhbmVsLmNoYW5nZWQgPSBwYW5lbC5hbmltYXRpbmcgPSBmYWxzZTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3B0aW9ucy5hZGFwdGl2ZUhlaWdodCAmJiB0aGlzLl9zZXRBZGFwdGl2ZUhlaWdodChjb25mLnRvdWNoLmRpcmVjdGlvbik7XG5cdFx0XHR9XG5cblx0XHRcdGNvbmYuaW5kZXhUb01vdmUgPT09IDAgJiYgdGhpcy5fc2V0UGFuZWxObygpO1xuXHRcdH0gZWxzZSBpZiAocGhhc2UgPT09IFwiZW5kXCIpIHtcblx0XHRcdGlmIChvcHRpb25zLmNpcmN1bGFyICYmIHBhbmVsLmNoYW5nZWQpIHtcblx0XHRcdFx0dGhpcy5fYXJyYW5nZVBhbmVscyh0cnVlLCBjb25mLmluZGV4VG9Nb3ZlKTtcblx0XHRcdH1cblxuXHRcdFx0dXNlVHJhbnNsYXRlICYmIHRoaXMuX3NldFRyYW5zbGF0ZShbLXBhbmVsLnNpemUgKiBwYW5lbC5pbmRleCwgMF0pO1xuXHRcdFx0Y29uZi50b3VjaC5kaXN0YW5jZSA9IGNvbmYuaW5kZXhUb01vdmUgPSAwO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFRoZSBldmVudCB0aGF0IG9jY3VycyBhZnRlciBjb21wbGV0aW5nIHRoZSBtb3ZlIHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbC4gSXQgb2NjdXJzIGluIHRoZSBmb2xsb3dpbmcgY2FzZXMuPGJyPjxicj4tIEFmdGVyIGNvbXBsZXRpbmcgdGhlIG1vdmVtZW50IHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbCBieSB1c2VyJ3MgbW92ZSBpbnB1dC48YnI+LSBgbW92ZVRvKClgLCBgcHJldigpYCwgYG5leHQoKWAgbWV0aG9kIGNhbGwuIChJdCBkb2VzIG5vdCBvY2N1ciBpZiB5b3UgaGF2ZSBkaXNhYmxlZCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IGV2ZW50Lilcblx0XHRcdCAqIEBrbyDrqqnsoIEg7Yyo64SQ66Gc7J2YIOydtOuPmeydhCDsmYTro4ztlZwg64uk7J2MIOuwnOyDne2VmOuKlCDsnbTrsqTtirguIOyVhOuemOydmCDqsr3smrDsl5Ag67Cc7IOd7ZWc64ukLjxicj48YnI+LSDsgqzsmqnsnpDsnZgg7J2064+ZKG1vdmUpIOyVoeyFmCDsnoXroKXsl5Ag7J2Y7ZWcIOuqqeyggSDtjKjrhJDroZzsnZgg7J2064+Z7JmE66OMIO2bhC48YnI+LSBgbW92ZVRvKClgLCBgcHJldigpYCwgYG5leHQoKWAg66mU7ISc65OcIO2YuOy2nC4oW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR97J2067Kk7Yq47J2YIOq4sOuzuOuPmeyekeydhCDrp4nslZjri6TrqbQg67Cc7IOd7ZWY7KeAIOyViuuKlOuLpC4pXG5cdFx0XHQgKiBAbmFtZSBlZy5GbGlja2luZyNmbGlja0VuZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAcHJvcGVydHkge1N0cmluZ30gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudC48a28+7J2067Kk7Yq4IOuqhTwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVHJ1c3RlZCBgdHJ1ZWAgd2hlbiB0aGUgZXZlbnQgd2FzIGdlbmVyYXRlZCBieSBhIHVzZXIgYWN0aW9uKFwibW91c2VcIiBvciBcInRvdWNoXCIpIG90aGVyd2lzZSBgZmFsc2VgLjxrbz7sgqzsmqnsnpAg7JWh7IWYKFwibW91c2VcIiDrmJDripQgXCJ0b3VjaFwiKeyXkCDsnZjtlbQg7J2067Kk7Yq46rCAIOyDneyEseuQnCDqsr3smrAgYHRydWVgLiDqt7gg7Jm464qUIGBmYWxzZWAuPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBubyBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gU2VlIHRoZSBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IG1ldGhvZC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4feuplOyEnOuTnCDssLjsobAuPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaXJlY3Rpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiBJZiBgaG9yaXpvbnRhbD10cnVlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBJZiBgaG9yaXpvbnRhbD1mYWxzZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48a28+7Yyo64SQIOydtOuPmSDrsKntlqUuIGBob3Jpem9udGFsPXRydWVgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gYGhvcml6b250YWw9ZmFsc2VgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48L2tvPlxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0XG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrXG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI21vdmVUb1xuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNwcmV2XG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI25leHRcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAvLyBUaGUgb3JkZXIgb2YgZXZlbnQgb2NjdXJyZW5jZS5cblx0XHRcdCAqIC8vIOydtOuypO2KuCDrsJzsg50g7Iic7IScXG5cdFx0XHQgKiBiZWZvcmVGbGlja1N0YXJ0IChvbmNlKSA+IGZsaWNrIChtYW55IHRpbWVzKSA+IGZsaWNrRW5kIChvbmNlKVxuXHRcdFx0ICovXG5cdFx0XHRwYW5lbC5jaGFuZ2VkICYmIHRoaXMuX3RyaWdnZXJFdmVudChFVkVOVFMuZmxpY2tFbmQpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhwaGFzZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHBvc2l0aXZlIG9yIG5lZ2F0aXZlIGFjY29yZGluZyBkaXJlY3Rpb25cblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9nZXROdW1CeURpcmVjdGlvbigpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblxuXHRcdHJldHVybiBjb25mLnRvdWNoLmRpcmVjdGlvbiA9PT0gY29uZi5kaXJEYXRhWzBdID8gMSA6IC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldmVydCBwYW5lbCBudW1iZXJcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9yZXZlcnRQYW5lbE5vKCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBudW0gPSB0aGlzLl9nZXROdW1CeURpcmVjdGlvbigpO1xuXG5cdFx0Y29uc3QgaW5kZXggPSBwYW5lbC5jdXJySW5kZXggPj0gMCA/IHBhbmVsLmN1cnJJbmRleCA6IHBhbmVsLmluZGV4IC0gbnVtO1xuXHRcdGNvbnN0IG5vID0gcGFuZWwuY3Vyck5vID49IDAgPyBwYW5lbC5jdXJyTm8gOiBwYW5lbC5ubyAtIG51bTtcblxuXHRcdHRoaXMuX3NldFBhbmVsTm8oe1xuXHRcdFx0aW5kZXgsXG5cdFx0XHRub1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgcGFuZWwgbnVtYmVyXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmogbnVtYmVyIG9iamVjdFxuXHQgKi9cblx0X3NldFBhbmVsTm8ob2JqKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IGNvdW50ID0gcGFuZWwub3JpZ0NvdW50IC0gMTtcblx0XHRjb25zdCBudW0gPSB0aGlzLl9nZXROdW1CeURpcmVjdGlvbigpO1xuXG5cdFx0aWYgKHV0aWxzLmlzT2JqZWN0KG9iaikpIHtcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuXHRcdFx0XHRwYW5lbFtrZXldID0gb2JqW2tleV07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHJlbWVtYmVyIGN1cnJlbnQgdmFsdWVcblx0XHRcdHBhbmVsLmN1cnJJbmRleCA9IHBhbmVsLmluZGV4O1xuXHRcdFx0cGFuZWwuY3Vyck5vID0gcGFuZWwubm87XG5cblx0XHRcdHBhbmVsLmluZGV4ICs9IG51bTtcblx0XHRcdHBhbmVsLm5vICs9IG51bTtcblx0XHR9XG5cblx0XHRpZiAocGFuZWwubm8gPiBjb3VudCkge1xuXHRcdFx0cGFuZWwubm8gPSAwO1xuXHRcdH0gZWxzZSBpZiAocGFuZWwubm8gPCAwKSB7XG5cdFx0XHRwYW5lbC5ubyA9IGNvdW50O1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgcG9pbnRlckV2ZW50cyBjc3MgcHJvcGVydHkgb24gY29udGFpbmVyIGVsZW1lbnQgZHVlIHRvIHRoZSBpT1MgY2xpY2sgYnVnXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGVcblx0ICovXG5cdF9zZXRQb2ludGVyRXZlbnRzKGUpIHtcblx0XHRjb25zdCAkY29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyO1xuXHRcdGNvbnN0IHBvaW50ZXIgPSB1dGlscy5jc3MoJGNvbnRhaW5lciwgXCJwb2ludGVyRXZlbnRzXCIpO1xuXHRcdGxldCBwb2ludGVyRXZlbnRzO1xuXG5cdFx0aWYgKGUgJiYgZS5ob2xkaW5nICYmXG5cdFx0XHRlLmlucHV0RXZlbnQgJiYgZS5pbnB1dEV2ZW50LnByZXZlbnRTeXN0ZW1FdmVudCAmJlxuXHRcdFx0cG9pbnRlciAhPT0gXCJub25lXCJcblx0XHQpIHtcblx0XHRcdHBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcblx0XHR9IGVsc2UgaWYgKCFlICYmIHBvaW50ZXIgIT09IFwiYXV0b1wiKSB7XG5cdFx0XHRwb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG5cdFx0fVxuXG5cdFx0cG9pbnRlckV2ZW50cyAmJiB1dGlscy5jc3MoJGNvbnRhaW5lciwge3BvaW50ZXJFdmVudHN9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgY29vcmRpbmF0ZSB2YWx1ZSB3aXRoIHVuaXRcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIGNvb3Jkc1ZhbHVlIHtBcnJheX0geCx5IG51bWVyaWMgdmFsdWVcblx0ICogQHJldHVybiB7T2JqZWN0fSB4LHkgY29vcmRpbmF0ZSB2YWx1ZSB3aXRoIHVuaXRcblx0ICovXG5cdF9nZXRDb29yZHNWYWx1ZShjb29yZHNWYWx1ZSkge1xuXHRcdC8vIHRoZSBwYXJhbSBjb21lcyBhcyBbIHZhbCwgMCBdLCB3aGF0ZXZlciB0aGUgZGlyZWN0aW9uLiBTbyByZW9yZGVyIHRoZSB2YWx1ZSBkZXBlbmQgdGhlIGRpcmVjdGlvbi5cblx0XHRjb25zdCBjb29yZHMgPSB0aGlzLl9nZXREYXRhQnlEaXJlY3Rpb24oY29vcmRzVmFsdWUpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHg6IHV0aWxzLmdldFVuaXRWYWx1ZShjb29yZHNbMF0pLFxuXHRcdFx0eTogdXRpbHMuZ2V0VW5pdFZhbHVlKGNvb3Jkc1sxXSlcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0cmFuc2xhdGUgcHJvcGVydHkgdmFsdWVcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29vcmRzVmFsdWUgY29vcmRpbmF0ZSB4LHkgdmFsdWVcblx0ICovXG5cdF9zZXRUcmFuc2xhdGUoY29vcmRzVmFsdWUpIHtcblx0XHRjb25zdCBjb29yZHMgPSB0aGlzLl9nZXRDb29yZHNWYWx1ZShjb29yZHNWYWx1ZSk7XG5cblx0XHR0aGlzLl9zZXRNb3ZlU3R5bGUodGhpcy4kY29udGFpbmVyLCBbY29vcmRzLngsIGNvb3Jkcy55XSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgaWYgcGFuZWwgcGFzc2VkIHRocm91Z2ggdGhyZXNob2xkIHBpeGVsXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfaXNNb3ZhYmxlKCkge1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgYXhlc0luc3QgPSB0aGlzLl9heGVzSW5zdDtcblx0XHRjb25zdCBpc01vdmFibGUgPSBNYXRoLmFicyh0aGlzLl9jb25mLnRvdWNoLmRpc3RhbmNlKSA+PSBvcHRpb25zLnRocmVzaG9sZDtcblx0XHRsZXQgbWF4O1xuXHRcdGxldCBjdXJyUG9zO1xuXG5cdFx0aWYgKCFvcHRpb25zLmNpcmN1bGFyICYmIGlzTW92YWJsZSkge1xuXHRcdFx0bWF4ID0gYXhlc0luc3QuYXhpcy5mbGljay5yYW5nZVsxXTtcblx0XHRcdGN1cnJQb3MgPSBheGVzSW5zdC5nZXQoKS5mbGljaztcblxuXHRcdFx0Ly8gaWYgY3VycmVudCBwb3NpdGlvbiBvdXQgb2YgcmFuZ2Vcblx0XHRcdGlmIChjdXJyUG9zIDwgMCB8fCBjdXJyUG9zID4gbWF4KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaXNNb3ZhYmxlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRyaWdnZXIgY3VzdG9tIGV2ZW50c1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIGV2ZW50IG5hbWVcblx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIC0gYWRkaXRpb25hbCBldmVudCB2YWx1ZVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblx0X3RyaWdnZXJFdmVudChuYW1lLCBwYXJhbSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblxuXHRcdC8vIHBhc3MgY2hhbmdlZCBwYW5lbCBubyBvbmx5IG9uICdmbGlja0VuZCcgZXZlbnRcblx0XHRpZiAobmFtZSA9PT0gRVZFTlRTLmZsaWNrRW5kKSB7XG5cdFx0XHRwYW5lbC5jdXJyTm8gPSBwYW5lbC5ubztcblx0XHRcdHBhbmVsLmN1cnJJbmRleCA9IHBhbmVsLmluZGV4O1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnRyaWdnZXIoY29uZi5ldmVudFByZWZpeCArIG5hbWUsIHV0aWxzLmV4dGVuZCh7XG5cdFx0XHRldmVudFR5cGU6IG5hbWUsXG5cdFx0XHRubzogcGFuZWwuY3Vyck5vLFxuXHRcdFx0ZGlyZWN0aW9uOiBjb25mLnRvdWNoLmRpcmVjdGlvbixcblx0XHRcdGlzVHJ1c3RlZDogY29uZi50b3VjaC5pc1RydXN0ZWRcblx0XHR9LCBwYXJhbSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBuZXh0L3ByZXYgcGFuZWwgZWxlbWVudC9pbmRleC5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtCb29sZWFufSBkaXJlY3Rpb25cblx0ICogQHBhcmFtIHtCb29sZWFufSBlbGVtZW50IC0gdHJ1ZTp0byBnZXQgZWxlbWVudCwgZmFsc2U6dG8gZ2V0IGluZGV4XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBwaHlzaWNhbCAtIHRydWUgOiBwaHlzaWNhbCwgZmFsc2UgOiBsb2dpY2FsIChAZGVwcmVjYXRlZCBzaW5jZSAyLjIuMClcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR8TnVtYmVyfVxuXHQgKi9cblx0X2dldEVsZW1lbnQoZGlyZWN0aW9uLCBlbGVtZW50LCBwaHlzaWNhbCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblx0XHRjb25zdCBwb3MgPSBwYW5lbC5jdXJySW5kZXg7XG5cdFx0Y29uc3QgbmV4dCA9IGRpcmVjdGlvbiA9PT0gdGhpcy5fY29uZi5kaXJEYXRhWzBdO1xuXHRcdGxldCByZXN1bHQgPSBudWxsO1xuXHRcdGxldCB0b3RhbDtcblx0XHRsZXQgaW5kZXg7XG5cblx0XHRpZiAocGh5c2ljYWwpIHtcblx0XHRcdHRvdGFsID0gcGFuZWwuY291bnQ7XG5cdFx0XHRpbmRleCA9IHBvcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG90YWwgPSBwYW5lbC5vcmlnQ291bnQ7XG5cdFx0XHRpbmRleCA9IHBhbmVsLmN1cnJObztcblx0XHR9XG5cblx0XHRjb25zdCBjdXJyZW50SW5kZXggPSBpbmRleDtcblxuXHRcdGlmIChuZXh0KSB7XG5cdFx0XHRpZiAoaW5kZXggPCB0b3RhbCAtIDEpIHtcblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdH0gZWxzZSBpZiAoY2lyY3VsYXIpIHtcblx0XHRcdFx0aW5kZXggPSAwO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoaW5kZXggPiAwKSB7XG5cdFx0XHRcdGluZGV4LS07XG5cdFx0XHR9IGVsc2UgaWYgKGNpcmN1bGFyKSB7XG5cdFx0XHRcdGluZGV4ID0gdG90YWwgLSAxO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChjdXJyZW50SW5kZXggIT09IGluZGV4KSB7XG5cdFx0XHRyZXN1bHQgPSBlbGVtZW50ID8gcGFuZWwuJGxpc3RbbmV4dCA/IHBvcyArIDEgOiBwb3MgLSAxXSA6IGluZGV4O1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHZhbHVlIHRvIGZvcmNlIG1vdmUgcGFuZWxzIHdoZW4gZHVyYXRpb24gaXMgMFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG5leHRcblx0ICovXG5cdF9zZXRWYWx1ZVRvTW92ZShuZXh0KSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cblx0XHRjb25mLnRvdWNoLmRpc3RhbmNlID0gdGhpcy5vcHRpb25zLnRocmVzaG9sZCArIDE7XG5cdFx0Y29uZi50b3VjaC5kaXJlY3Rpb24gPSBjb25mLmRpckRhdGFbKyFuZXh0XTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC5cblx0ICogQGtvIO2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLjrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldEluZGV4XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BoeXNpY2FsPWZhbHNlXSBAZGVwcmVjYXRlZCBzaW5jZSAyLjIuMDxicj48YnI+VHlwZXMgb2YgaW5kZXggbnVtYmVycy48YnI+LSB0cnVlIChQaHlzaWNhbCk6IE1hdGguZmxvb3Ioe1RvdGFsIG51bWJlciBvZiBwYW5lbHN9IC8gMiAtIDAuMSkgdmFsdWUuIChJbmNyZWFzZSBieSAxIGZvciBldmVyeSB0d28gcGFuZWxzLikgSWYgdGhlIGNpcmN1bGFyIG9wdGlvbiBpcyBmYWxzZSwgaXQgZXF1YWxzIHBoeXNpY2FsPWZhbHNlLjxicj4tIGZhbHNlIChMb2dpY2FsKTogVGhlIHZhbHVlIG9mIGhvdyB0aGUgY29udGVudChpbm5lckhUTUwpIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQgaXMgaW4gdGhlIGRlZmluZWQgb3JkZXIgb2YgdGhlIHBhbmVsIGVsZW1lbnRzLjxrbz5AZGVwcmVjYXRlZCBzaW5jZSAyLjIuMDxicj48YnI+7J24642x7IqkIOuyiO2YuOydmCDsooXrpZguPGJyPi0gdHJ1ZSAo66y866as7KCBKTogYE1hdGguZmxvb3Ioe+2MqOuEkCDstJ0g6rCc7IiYfSAvIDIgLSAwLjEpYCDqsJIuICjtjKjrhJDsnbQgMuqwnCDripjslrTrgqAg65WM66eI64ukIDHslKkg7Kad6rCAKSBgY2lyY3VsYXJg7Ji17IWY7J20IGBmYWxzZWDsnbTrqbQgYHBoeXNpY2FsPWZhbHNlYOyZgCDrj5nsnbztlZwg6rCSLjxicj4tIGZhbHNlICjrhbzrpqzsoIEpOiDtmITsnqwg7Yyo64SQIOyalOyGjOydmCDsu6jthZDtirgoaW5uZXJIVE1MKeqwgCAn7Yyo64SQIOyalOyGjOuTpOydmCDsoJXsnZjrkJwg7Iic7IScJ+yXkOyEnCDrqocg67KI7Ke47J247KeA7JeQIOuMgO2VnCDqsJIuPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfSBJbmRleCBudW1iZXIgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudC4gQSB6ZXJvLWJhc2VkIGludGVnZXIuPGtvPu2YhOyerCDtjKjrhJDsnZgg7J24642x7IqkIOuyiO2YuC4gMOu2gO2EsCDsi5zsnpHtlZjripQg7KCV7IiYLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0UHJldkluZGV4XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0TmV4dEluZGV4XG5cdCAqIEBleGFtcGxlXG5cdCAqIGBgYGh0bWxcblx0ICogPGRpdiBpZD1cImZsaWNrXCI+XG5cdCAqIFx0PGRpdj48cD5wYW5lbCAwPC9wPjwvZGl2PlxuXHQgKiBcdDxkaXY+PHA+cGFuZWwgMTwvcD48L2Rpdj5cblx0ICogXHQ8ZGl2PjxwPnBhbmVsIDI8L3A+PC9kaXY+XG5cdCAqIFx0PGRpdj48cD5wYW5lbCAzPC9wPjwvZGl2PlxuXHQgKiA8L2Rpdj5cblx0ICogYGBgXG5cdCAqIGBgYGphdmFzY3JpcHRcblx0ICogLy8gY2lyY3VsYXIgb2ZmIGFuZCBsZWZ0IGZsaWNraW5nLlxuXHQgKiAvLyDsiJztmZjsnYQg64GE6rOgIOyijCDtlIzrpqztgrkuXG5cdCAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKS5vbihcImZsaWNrRW5kXCIsIHtjdXJyZW50VGFyZ2V0fSA9PiB7XG5cdCAqIFx0Y29uc29sZS5sb2coY3VycmVudFRhcmdldC5nZXRJbmRleCgpKTsgLy8gMSA+IDIgPiAzXG5cdCAqIFx0Y29uc29sZS5sb2coY3VycmVudFRhcmdldC5nZXRJbmRleCh0cnVlKSk7IC8vIDEgPiAyID4gM1xuXHQgKiB9O1xuXHQgKlxuXHQgKiAvLyBjaXJjdWxhciBvbiBhbmQgbGVmdCBmbGlja2luZy5cblx0ICogLy8g7Iic7ZmY7J2EIOy8nOqzoCDsoowg7ZSM66as7YK5LlxuXHQgKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIiwge2NpcmN1bGFyOiB0cnVlfSkub24oXCJmbGlja0VuZFwiLCB7Y3VycmVudFRhcmdldH0gPT4ge1xuXHQgKiBcdGNvbnNvbGUubG9nKGN1cnJlbnRUYXJnZXQuZ2V0SW5kZXgoKSk7IC8vIDEgPiAyID4gMyA+IDAgPiAxID4gMiA+IDMgPiAwIC4uLlxuXHQgKiBcdGNvbnNvbGUubG9nKGN1cnJlbnRUYXJnZXQuZ2V0SW5kZXgodHJ1ZSkpOyAvLyAxID4gMSA+IDEgPiAxID4gMSA+IDEgPiAxID4gMSAuLi5cblx0ICogfTtcblx0ICogYGBgXG5cdCAqIEBleGFtcGxlXG5cdCAqIGBgYGh0bWxcblx0ICogPCEtLURlZmluZSBvbmx5IHR3byBwYW5lbHMuLS0+XG5cdCAqIDwhLS3tjKjrhJDsnYQg65GQIOqwnOunjCDsoJXsnZjtlZzri6QuLS0+XG5cdCAqIDxkaXYgaWQ9XCJmbGljazJcIj5cblx0ICogXHQ8ZGl2PjxwPnBhbmVsIDA8L3A+PC9kaXY+XG5cdCAqIFx0PGRpdj48cD5wYW5lbCAxPC9wPjwvZGl2PlxuXHQgKiA8L2Rpdj5cblx0ICogYGBgXG5cdCAqIGBgYGphdmFzY3JpcHRcblx0ICogLy8gKEluIHRoZSBjYXNlIG9mIGNpcmN1bGF0aW9uKSBJZiB0aGUgbnVtYmVyIG9mIGRlZmluZWQgcGFuZWwgZWxlbWVudHMgaXMgbGVzcyB0aGFuIHRoZSBtaW5pbXVtIG51bWJlciByZXF1aXJlZCwgdGhlIG51bWJlciBvZiBwYW5lbHMgaXMgY3JlYXRlZC5cblx0ICogLy8gVGhlcmVmb3JlLCBpdCBpcyBkZXNjcmliZWQgYXMgJ3RoZSBudW1iZXIgb2YgcGFuZWwgZGVmaW5pdGlvbnMgb2YgdGhlIGNvbnRlbnRzIG9mIHRoZSBwYW5lbC4nXG5cdCAqIC8vICjsiJztmZjsnbgg6rK97JqwKSDsoJXsnZjrkJwg7Yyo64SQIOyalOyGjOydmCDqsJzsiJjqsIAg7ZWE7JqUIOy1nOyGjOqwnOyImOuztOuLpCDsoIHsnLzrqbQg6re4IOyImOunjO2BvOydmCDtjKjrhJDsnYQg7IOd7ISx7ZWc64ukLlxuXHQgKiAvLyDqt7jroIfquLAg65WM66y47JeQICftjKjrhJDsnbQg64u06rOgIOyeiOuKlCDsu6jthZDtirjsnZgg7Yyo64SQIOygleydmCDsiJzshLHsg4HsnZgg67KI7Zi4J+udvOqzoCDshKTrqoXtlZzri6QuXG5cdCAqIGNvbnN0IGZsaWNrID0gbmV3IGVnLkZsaWNraW5nKFwiZmxpY2syXCIsIHtcblx0ICogXHRjaXJjdWxhcjogdHJ1ZVxuXHQgKiB9KTtcblx0ICpcblx0ICogLy8gVGhlIGNvbnRlbnQgb2YgdGhlIGN1cnJlbnQgcGFuZWwgaXMgdGhlIGZpcnN0IGluIHRoZSBwYW5lbCBkZWZpbml0aW9uIG9yZGVyLlxuXHQgKiAvLyDtmITsnqwg7Yyo64SQ7J20IOuLtOqzoCDsnojripQg7Luo7YWQ7Yq464qUIO2MqOuEkCDsoJXsnZgg7Iic7ISc7IOBIOyyqyDrsojsp7jsnbTri6QuXG5cdCAqIGZsaWNrLmdldEluZGV4KCk7IC8vIDBcblx0ICpcblx0ICogLy8gVGhlIGNvbnRlbnQgb2YgdGhlIG5leHQgcGFuZWwgaXMgdGhlIHNlY29uZCBpbiB0aGUgcGFuZWwgZGVmaW5pdGlvbiBvcmRlci5cblx0ICogLy8g64uk7J2MIO2MqOuEkOydtCDri7Tqs6Ag7J6I64qUIOy7qO2FkO2KuOuKlCDtjKjrhJAg7KCV7J2YIOyInOyEnOyDgSDrkZAg67KI7Ke47J2064ukLlxuXHQgKiBmbGljay5nZXROZXh0SW5kZXgoKTsgLy8gMVxuXHQgKlxuXHQgKiAvLyBUaGUgY29udGVudCBvZiB0aGUgcHJldmlvdXMgcGFuZWwgaXMgdGhlIHNlY29uZCBpbiB0aGUgcGFuZWwgZGVmaW5pdGlvbiBvcmRlci5cblx0ICogLy8g7J207KCEIO2MqOuEkOydtCDri7Tqs6Ag7J6I64qUIOy7qO2FkO2KuOuKlCDtjKjrhJAg7KCV7J2YIOyInOyEnOyDgSDrkZAg67KI7Ke47J2064ukLlxuXHQgKiBmbGljay5nZXRQcmV2SW5kZXgoKTsgLy8gMVxuXHQgKiBgYGBcblx0ICovXG5cdGdldEluZGV4KHBoeXNpY2FsKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbmYucGFuZWxbcGh5c2ljYWwgPyBcImN1cnJJbmRleFwiIDogXCJjdXJyTm9cIl07XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVmZXJlbmNlIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuXG5cdCAqIEBrbyDtmITsnqwg7Yyo64SQIOyalOyGjOydmCDroIjtjbzrn7DsiqTrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldEVsZW1lbnRcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9IEN1cnJlbnQgcGFuZWwgZWxlbWVudC48a28+7ZiE7J6sIO2MqOuEkCDsmpTshowuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRQcmV2RWxlbWVudFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldE5leHRFbGVtZW50XG5cdCAqL1xuXHRnZXRFbGVtZW50KCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblxuXHRcdHJldHVybiBwYW5lbC4kbGlzdFtwYW5lbC5jdXJySW5kZXhdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHJlZmVyZW5jZSBvZiB0aGUgbmV4dCBwYW5lbCBlbGVtZW50LlxuXHQgKiBAa28g64uk7J2MIO2MqOuEkCDsmpTshozsnZgg66CI7Y2865+w7Iqk66W8IOuwmO2ZmO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNnZXROZXh0RWxlbWVudFxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudHxudWxsfSBOZXh0IHBhbmVsIGVsZW1lbnQgb3IgYG51bGxgIGlmIGl0IGRvZXMgbm90IGV4aXN0Ljxrbz7ri6TsnYwg7Yyo64SQIOyalOyGjC4g7Yyo64SQ7J20IOyXhuycvOuptCBgbnVsbGDsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0RWxlbWVudFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldFByZXZFbGVtZW50XG5cdCAqL1xuXHRnZXROZXh0RWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0RWxlbWVudCh0aGlzLl9jb25mLmRpckRhdGFbMF0sIHRydWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG51bWJlciBvZiB0aGUgbmV4dCBwYW5lbCBlbGVtZW50LlxuXHQgKiBAa28g64uk7J2MIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuOulvCDrsJjtmZjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0TmV4dEluZGV4XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BoeXNpY2FsPWZhbHNlXSBAZGVwcmVjYXRlZCBzaW5jZSAyLjIuMDxicj48YnI+VHlwZXMgb2YgaW5kZXggbnVtYmVyczxicj4tIHRydWUgKFBoeXNpY2FsKTogUGx1cyBvbmUgb2YgW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSByZXR1cm4gdmFsdWUuPGJyPi0gZmFsc2UgKExvZ2ljYWwpOiBUaGUgdmFsdWUgb2YgaG93IHRoZSBjb250ZW50KGlubmVySFRNTCkgb2YgdGhlIG5leHQgcGFuZWwgZWxlbWVudCBpcyBpbiB0aGUgZGVmaW5lZCBvcmRlciBvZiB0aGUgcGFuZWwgZWxlbWVudHMuPGtvPkBkZXByZWNhdGVkIHNpbmNlIDIuMi4wPGJyPjxicj7snbjrjbHsiqQg67KI7Zi47J2YIOyiheulmC48YnI+LSB0cnVlICjrrLzrpqzsoIEpOiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IOuwmO2ZmOqwkuyXkCAx7J2EIOuNlO2VnCDqsJIuPGJyPi0gZmFsc2UgKOuFvOumrOyggSk6IOuLpOydjCDtjKjrhJAg7JqU7IaM7J2YIOy7qO2FkO2KuChpbm5lckhUTUwp6rCAICftjKjrhJAg7JqU7IaM65Ok7J2YIOygleydmOuQnCDsiJzshJwn7JeQ7IScIOuqhyDrsojsp7jsnbjsp4Dsl5Ag64yA7ZWcIOqwki48L2tvPlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ8bnVsbH0gSW5kZXggbnVtYmVyIG9mIHRoZSBuZXh0IHBhbmVsIGVsZW1lbnQgb3IgbnVsbCBpZiBpdCBkb2VzIG5vdCBleGlzdC4gQSB6ZXJvLWJhc2VkIGludGVnZXIuPGtvPuuLpOydjCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLguIDDrtoDthLAg7Iuc7J6R7ZWY64qUIOygleyImC4g7Yyo64SQ7J20IOyXhuycvOuptCBgbnVsbGDsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0SW5kZXhcblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRQcmV2SW5kZXhcblx0ICovXG5cdGdldE5leHRJbmRleChwaHlzaWNhbCkge1xuXHRcdHJldHVybiB0aGlzLl9nZXRFbGVtZW50KHRoaXMuX2NvbmYuZGlyRGF0YVswXSwgZmFsc2UsIHBoeXNpY2FsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIGFsbCBwYW5lbCBlbGVtZW50cy5cblx0ICogQGtvIOuqqOuToCDtjKjrhJAg7JqU7IaM7J2YIOugiO2NvOufsOyKpOulvCDrsJjtmZjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0QWxsRWxlbWVudHNcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gV2hvbGUgcGFuZWwgZWxlbWVudHMuPGtvPuuqqOuToCDtjKjrhJAg7JqU7IaMLjwva28+XG5cdCAqL1xuXHRnZXRBbGxFbGVtZW50cygpIHtcblx0XHRyZXR1cm4gdGhpcy5fY29uZi5wYW5lbC4kbGlzdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSByZWZlcmVuY2Ugb2YgdGhlIHByZXZpb3VzIHBhbmVsIGVsZW1lbnQuXG5cdCAqIEBrbyDsnbTsoIQg7Yyo64SQIOyalOyGjOydmCDroIjtjbzrn7DsiqTrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldFByZXZFbGVtZW50XG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fG51bGx9IFByZXZpb3VzIHBhbmVsIGVsZW1lbnQgb3IgYG51bGxgIGlmIGl0IGRvZXMgbm90IGV4aXN0Ljxrbz7snbTsoIQg7Yyo64SQIOyalOyGjC4g7Yyo64SQ7J20IOyXhuycvOuptCBgbnVsbGDsnYQg67CY7ZmY7ZWc64ukLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0RWxlbWVudFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldE5leHRFbGVtZW50XG5cdCAqL1xuXHRnZXRQcmV2RWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0RWxlbWVudCh0aGlzLl9jb25mLmRpckRhdGFbMV0sIHRydWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGluZGV4IG51bWJlciBvZiB0aGUgcHJldmlvdXMgcGFuZWwgZWxlbWVudC5cblx0ICogQGtvIOydtOyghCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLjrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldFByZXZJbmRleFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtwaHlzaWNhbD1mYWxzZV0gQGRlcHJlY2F0ZWQgc2luY2UgMi4yLjA8YnI+PGJyPlR5cGVzIG9mIGluZGV4IG51bWJlcnM8YnI+LSB0cnVlIChQaHlzaWNhbCk6IE1pbnVzIG9uZSBvZiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh9IHJldHVybiB2YWx1ZS48YnI+LSBmYWxzZSAoTG9naWNhbCk6IFRoZSB2YWx1ZSBvZiBob3cgdGhlIGNvbnRlbnQoaW5uZXJIVE1MKSBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50IGlzIGluIHRoZSBkZWZpbmVkIG9yZGVyIG9mIHRoZSBwYW5lbCBlbGVtZW50cy48a28+QGRlcHJlY2F0ZWQgc2luY2UgMi4yLjA8YnI+PGJyPuyduOuNseyKpCDrsojtmLjsnZgg7KKF66WYPGJyPi0gdHJ1ZSAo66y866as7KCBKTogW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSDrsJjtmZjqsJLsl5AgMeydhCDruoAg6rCSLjxicj4tIGZhbHNlICjrhbzrpqzsoIEpOiDsnbTsoIQg7Yyo64SQIOyalOyGjOydmCDsu6jthZDtirgoaW5uZXJIVE1MKeqwgCAn7Yyo64SQIOyalOyGjOuTpOydmCDsoJXsnZjrkJwg7Iic7IScJ+yXkOyEnCDrqocg67KI7Ke47J247KeA7JeQIOuMgO2VnCDqsJIuPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfG51bGx9IFByZXZpb3VzIGVsZW1lbnQgaW5kZXggdmFsdWUgb3IgbnVsbCBpZiBubyBtb3JlIGVsZW1lbnQgZXhpc3QuIEEgemVyby1iYXNlZCBpbnRlZ2VyLjxrbz7snbTsoIQg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi4LiAw67aA7YSwIOyLnOyeke2VmOuKlCDsoJXsiJguIO2MqOuEkOydtCDsl4bripQg6rK97Jqw64qUIGBudWxsYC48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldEluZGV4XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0TmV4dEluZGV4XG5cdCAqL1xuXHRnZXRQcmV2SW5kZXgocGh5c2ljYWwpIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0RWxlbWVudCh0aGlzLl9jb25mLmRpckRhdGFbMV0sIGZhbHNlLCBwaHlzaWNhbCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGFuaW1hdGVkIHBhbmVsIGlzIHBsYXlpbmcuXG5cdCAqIEBrbyDtjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmOydtCDsp4Ttlokg7KSR7J247KeAIO2ZleyduO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNpc1BsYXlpbmdcblx0ICogQHJldHVybiB7Qm9vbGVhbn0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGFuaW1hdGVkIHBhbmVsIGlzIHBsYXlpbmcgPGtvPu2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWYIOynhO2WiSDspJEg7Jes67aAPC9rbz5cblx0ICovXG5cdGlzUGxheWluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5fY29uZi5wYW5lbC5hbmltYXRpbmc7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZSBwYW5lbCBhcHBseWluZyBzdGFydC9lbmQgcGhhc2UgdmFsdWVcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBBeGVzJyBtZXRob2QgbmFtZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gdG8gZGVzdGluYXRpb24gdmFsdWVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uVmFsdWUgZHVyYXRpb24gdmFsdWVcblx0ICovXG5cdF9tb3ZlUGFuZWxCeVBoYXNlKG1ldGhvZCwgdG8sIGR1cmF0aW9uVmFsdWUpIHtcblx0XHRjb25zdCBkdXJhdGlvbiA9IHV0aWxzLmdldE51bVZhbHVlKGR1cmF0aW9uVmFsdWUsIHRoaXMub3B0aW9ucy5kdXJhdGlvbik7XG5cblx0XHRpZiAodGhpcy5fc2V0UGhhc2VWYWx1ZShcInN0YXJ0XCIpICE9PSBmYWxzZSkge1xuXHRcdFx0dGhpcy5fc2V0QXhlcyhtZXRob2QsIHRvLCBkdXJhdGlvbik7XG5cdFx0XHQhZHVyYXRpb24gJiYgdGhpcy5fc2V0UGhhc2VWYWx1ZShcImVuZFwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgYW4gZWxlbWVudCB0byB0aGUgbmV4dCBwYW5lbC4gSWYgYGhvcml6b250YWw9dHJ1ZWBpcyByaWdodCBwYW5lbC4gSWYgYGhvcml6b250YWw9ZmFsc2VgaXMgbG93ZXIgcGFuZWwuXG5cdCAqIEBrbyDri6TsnYwg7Yyo64SQ66GcIOydtOuPme2VnOuLpC4gYGhvcml6b250YWw9dHJ1ZWDsnbTrqbQg7Jqw7LihIO2MqOuEkC4gYGhvcml6b250YWw9ZmFsc2Vg7J2066m0IO2VmOy4oSDtjKjrhJAuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjbmV4dFxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uPW9wdGlvbnMuZHVyYXRpb25dIER1cmF0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudCAodW5pdDogbXMpIDxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCEKOuLqOychDogbXMpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjYmVmb3JlRmxpY2tTdGFydFxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZmxpY2tcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2ZsaWNrRW5kXG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjbW92ZVRvXG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjcHJldlxuXHQgKi9cblx0bmV4dChkdXJhdGlvbikge1xuXHRcdGNvbnN0IGluZGV4ID0gdGhpcy5nZXROZXh0SW5kZXgoKTtcblxuXHRcdGlmICh0eXBlb2YgaW5kZXggIT09IFwibnVtYmVyXCIpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5tb3ZlVG8oaW5kZXgsIGR1cmF0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyBhbiBlbGVtZW50IHRvIHRoZSBwcmV2aW91cyBwYW5lbC4gSWYgYGhvcml6b250YWw9dHJ1ZWBpcyBsZWZ0IHBhbmVsLiBJZiBgaG9yaXpvbnRhbD1mYWxzZWBpcyB1cHBlciBwYW5lbC5cblx0ICogQGtvIOydtOyghCDtjKjrhJDroZwg7J2064+Z7ZWc64ukLiBgaG9yaXpvbnRhbD10cnVlYOydtOuptCDsoozsuKEg7Yyo64SQLiBgaG9yaXpvbnRhbD1mYWxzZWDsnbTrqbQg7IOB7LihIO2MqOuEkC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNwcmV2XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249b3B0aW9ucy5kdXJhdGlvbl0gRHVyYXRpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50ICh1bml0OiBtcykgPGtvPu2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQo64uo7JyEOiBtcyk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2JlZm9yZUZsaWNrU3RhcnRcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2ZsaWNrXG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNmbGlja0VuZFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI21vdmVUb1xuXHQgKiBAc2VlIGVnLkZsaWNraW5nI25leHRcblx0ICovXG5cdHByZXYoZHVyYXRpb24pIHtcblx0XHRjb25zdCBpbmRleCA9IHRoaXMuZ2V0UHJldkluZGV4KCk7XG5cblx0XHRpZiAodHlwZW9mIGluZGV4ICE9PSBcIm51bWJlclwiKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMubW92ZVRvKGluZGV4LCBkdXJhdGlvbik7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdG8gdGhlIHBhbmVsIGluIHRoZSBvcmRlciBzcGVjaWZpZWQgaW4gYG5vVmFsdWVgLiBJZiBub1ZhbHVlIGlzIGVxdWFsIHRvIHRoZSBjdXJyZW50IGxvZ2ljYWwgaW5kZXggbnVtYmVyaW5nLCBubyBhY3Rpb24gaXMgdGFrZW4uIFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSwgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja30sIFtmbGlja0VuZF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmR9IGV2ZW50cyBvY2N1ciBvbmUgYWZ0ZXIgdGhlIG90aGVyLlxuXHQgKiBAa28gYG5vVmFsdWVg7JeQIOyngOygle2VnCDsiJzshJzsnZgg7Yyo64SQ66GcIOydtOuPme2VnOuLpC4gYG5vVmFsdWVg6rCS7J20IO2YhOyerOydmCDrhbzrpqzsoIEg7J24642x7IqkIOuyiO2YuOyZgCDqsJnri6TrqbQg7JWE66y064+Z7J6RIO2VmOyngCDslYrripTri6QuIFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSwgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja30sIFtmbGlja0VuZF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmR9IOydtOuypO2KuOqwgCDssKjroYDroZwg67Cc7IOd7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI21vdmVUb1xuXHQgKiBAcGFyYW0ge051bWJlcn0gbm9WYWx1ZSBUaGUgbG9naWNhbCBpbmRleCBudW1iZXIgb2YgdGhlIHBhbmVsIGVsZW1lbnQgdG8gYmUgbW92ZWQuIChCYXNlZCBvbiB0aGUgZGVmaW5lZCBvcmRlciBvZiB0aGUgcGFuZWwgZWxlbWVudHMuKTxrbz7snbTrj5ntlaAg7Yyo64SQIOyalOyGjOydmCDrhbzrpqzsoIEg7J24642x7IqkIOuyiO2YuC4gKFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH3rqZTshJzrk5wg7LC47KGwLik8L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uPW9wdGlvbnMuZHVyYXRpb25dIER1cmF0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudCAodW5pdDogbXMpIDxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmCDsp4Ttlokg7Iuc6rCEKOuLqOychDogbXMpPC9rbz5cblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNiZWZvcmVGbGlja1N0YXJ0XG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNmbGlja1xuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZmxpY2tFbmRcblx0ICogQHNlZSBlZy5GbGlja2luZyNwcmV2XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjbmV4dFxuXHQgKi9cblx0bW92ZVRvKG5vVmFsdWUsIGR1cmF0aW9uKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IGNpcmN1bGFyID0gdGhpcy5vcHRpb25zLmNpcmN1bGFyO1xuXHRcdGNvbnN0IGN1cnJlbnRJbmRleCA9IHBhbmVsLmluZGV4O1xuXHRcdGxldCBpbmRleFRvTW92ZTtcblx0XHRsZXQgaXNQb3NpdGl2ZTtcblx0XHRsZXQgbm8gPSBub1ZhbHVlO1xuXG5cdFx0bm8gPSB1dGlscy5nZXROdW1WYWx1ZShubywgLTEpO1xuXG5cdFx0aWYgKG5vIDwgMCB8fCBubyA+PSBwYW5lbC5vcmlnQ291bnQgfHwgbm8gPT09IHBhbmVsLm5vIHx8XG5cdFx0XHRwYW5lbC5hbmltYXRpbmcgfHwgY29uZi50b3VjaC5ob2xkaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRpbmRleFRvTW92ZSA9IG5vIC0gKGNpcmN1bGFyID8gcGFuZWwubm8gOiBjdXJyZW50SW5kZXgpO1xuXHRcdGlzUG9zaXRpdmUgPSBpbmRleFRvTW92ZSA+IDA7XG5cblx0XHQvLyBjaGVjayBmb3IgcmVhbCBwYW5lbCBjb3VudCB3aGljaCBjYW4gYmUgbW92ZWQgb24gZWFjaCBzaWRlcyBpbiBjaXJjdWxhciBtb2RlXG5cdFx0aWYgKGNpcmN1bGFyICYmXG5cdFx0XHRNYXRoLmFicyhpbmRleFRvTW92ZSkgPlxuXHRcdFx0KGlzUG9zaXRpdmUgPyBwYW5lbC5jb3VudCAtIChjdXJyZW50SW5kZXggKyAxKSA6IGN1cnJlbnRJbmRleCkpIHtcblx0XHRcdGluZGV4VG9Nb3ZlICs9IChpc1Bvc2l0aXZlID8gLTEgOiAxKSAqIHBhbmVsLmNvdW50O1xuXHRcdFx0aXNQb3NpdGl2ZSA9IGluZGV4VG9Nb3ZlID4gMDtcblx0XHR9XG5cblx0XHR0aGlzLl9zZXRQYW5lbE5vKGNpcmN1bGFyID8ge25vfSA6IHtubywgaW5kZXg6IG5vfSk7XG5cdFx0dGhpcy5fY29uZi5pbmRleFRvTW92ZSA9IGluZGV4VG9Nb3ZlO1xuXHRcdHRoaXMuX3NldFZhbHVlVG9Nb3ZlKGlzUG9zaXRpdmUpO1xuXG5cdFx0dGhpcy5fbW92ZVBhbmVsQnlQaGFzZShcblx0XHRcdGNpcmN1bGFyID8gXCJzZXRCeVwiIDogXCJzZXRUb1wiLFxuXHRcdFx0cGFuZWwuc2l6ZSAqIChjaXJjdWxhciA/IGluZGV4VG9Nb3ZlIDogbm8pLFxuXHRcdFx0ZHVyYXRpb25cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGhvcml6b250YWwgb3IgdmVydGljYWwgbGVuZ3RoIG9mIHRoZSBwYW5lbCBpcyB1cGRhdGVkIGFjY29yZGluZyB0byB0aGUgYmFzZSBlbGVtZW50LiBJZiBgaG9yaXpvbnRhbD10cnVlYCBpcyBob3Jpem9udGFsLiBJZiBgaG9yaXpvbnRhbD1mYWxzZWAgaXMgdmVydGljYWwuXG5cdCAqIEBrbyDtjKjrhJDsnZgg6rCA66GcIO2YueydgCDshLjroZwg6ri47J2066W8IOq4sOykgOyalOyGjOyXkCDrp57strAg6rCx7Iug7ZWc64ukLiBgaG9yaXpvbnRhbD10cnVlYOydtOuptCDqsIDroZwsIGBob3Jpem9udGFsPWZhbHNlYOydtOuptCDshLjroZwuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjcmVzaXplXG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAZXhhbXBsZVxuXHQgKiBjb25zdCBmbGljayA9IG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiLCB7XG5cdCAqIFx0cHJldmlld1BhZGRpbmc6IFsxMCwgMTBdXG5cdCAqIH0pO1xuXHQgKlxuXHQgKiAvLyBXaGVuIGRldmljZSBvcmllbnRhaW9uIGNoYW5nZXMuXG5cdCAqIC8vIOuLqOunkOq4sOulvCDtmozsoITtlojsnYQg65WMLlxuXHQgKiBmbGljay5yZXNpemUoKTtcblx0ICpcblx0ICogLy8gT3Igd2hlbiBjaGFuZ2VzIHByZXZpZXdQYWRkaW5nIG9wdGlvbiBmcm9tIGl0cyBvcmlnaW5hbCB2YWx1ZS5cblx0ICogLy8g65iQ64qUIHByZXZpZXdQYWRkaW5n7Ji17IWY6rCS7J2EIOuzgOqyve2WiOydhCDrlYwuXG5cdCAqIGZsaWNrLm9wdGlvbnMucHJldmlld1BhZGRpbmcgPSBbMjAsIDMwXTtcblx0ICogZmxpY2sucmVzaXplKCk7XG5cdCAqL1xuXHRyZXNpemUoKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCBwYW5lbCA9IGNvbmYucGFuZWw7XG5cdFx0Y29uc3QgaG9yaXpvbnRhbCA9IG9wdGlvbnMuaG9yaXpvbnRhbDtcblx0XHRjb25zdCB1c2VUcmFuc2xhdGUgPSBvcHRpb25zLnVzZVRyYW5zbGF0ZTtcblx0XHRsZXQgcGFuZWxTaXplO1xuXG5cdFx0aWYgKCF0aGlzLmlzUGxheWluZygpKSB7XG5cdFx0XHRpZiAodXRpbHMuaXNBcnJheShvcHRpb25zLnByZXZpZXdQYWRkaW5nKSAmJiB0eXBlb2YoK29wdGlvbnMucHJldmlld1BhZGRpbmcuam9pbihcIlwiKSkgPT09IFwibnVtYmVyXCIpIHtcblx0XHRcdFx0dGhpcy5fc2V0UGFkZGluZyhvcHRpb25zLnByZXZpZXdQYWRkaW5nLmNvbmNhdCgpKTtcblx0XHRcdFx0cGFuZWxTaXplID0gcGFuZWwuc2l6ZTtcblx0XHRcdH0gZWxzZSBpZiAoaG9yaXpvbnRhbCkge1xuXHRcdFx0XHRwYW5lbFNpemUgPSBwYW5lbC5zaXplID0gdXRpbHMuY3NzKHRoaXMuJHdyYXBwZXIsIFwid2lkdGhcIiwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlc2l6ZSBwYW5lbCBlbGVtZW50c1xuXHRcdFx0dXRpbHMuY3NzKHBhbmVsLiRsaXN0LCB7XG5cdFx0XHRcdFtob3Jpem9udGFsID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIl06IHV0aWxzLmdldFVuaXRWYWx1ZShwYW5lbFNpemUpXG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gcmVtb3ZlIGRhdGEtaGVpZ2h0IGF0dHJpYnV0ZSBhbmQgcmUtZXZhbHVhdGUgcGFuZWwncyBoZWlnaHRcblx0XHRcdGlmIChvcHRpb25zLmFkYXB0aXZlSGVpZ2h0KSB7XG5cdFx0XHRcdGNvbnN0ICRwYW5lbCA9IHRoaXMuJGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGBbJHtEQVRBX0hFSUdIVH1dYCk7XG5cblx0XHRcdFx0aWYgKCRwYW5lbC5sZW5ndGgpIHtcblx0XHRcdFx0XHR1dGlscy50b0FycmF5KCRwYW5lbClcblx0XHRcdFx0XHRcdC5mb3JFYWNoKHYgPT4gdi5yZW1vdmVBdHRyaWJ1dGUoREFUQV9IRUlHSFQpKTtcblxuXHRcdFx0XHRcdHRoaXMuX3NldEFkYXB0aXZlSGVpZ2h0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fYXhlc0luc3QuYXhpcy5mbGljay5yYW5nZSA9IFswLCBwYW5lbFNpemUgKiAocGFuZWwuY291bnQgLSAxKV07XG5cdFx0XHR0aGlzLl9zZXRBeGVzKFwic2V0VG9cIiwgcGFuZWxTaXplICogcGFuZWwuaW5kZXgsIDApO1xuXG5cdFx0XHRpZiAoIXVzZVRyYW5zbGF0ZSkge1xuXHRcdFx0XHR0aGlzLl9hcHBseVBhbmVsc1BvcygpO1xuXHRcdFx0XHR0aGlzLl9hZGp1c3RDb250YWluZXJDc3MoXCJlbmRcIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSBwYW5lbCB0byBpdHMgb3JpZ2luYWwgcG9zaXRpb24uIChJdCBvbmx5IHdvcmtzIHdoZW4gdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSBldmVudCBpcyBjYW5jZWxlZC4pIFtiZWZvcmVSZXN0b3JlXXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVSZXN0b3JlfSwgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja30sIFtyZXN0b3JlXXtAbGluayBlZy5GbGlja2luZyNldmVudDpyZXN0b3JlfSBldmVudHMgYXJlIG9jY3VyIGluIG9yZGVyLlxuXHQgKiBAa28g7Yyo64SQ7J2YIOychOy5mOulvCDsm5Drnpgg7J6Q66as66GcIOuQmOuPjOumsOuLpC4gKFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSDsnbTrsqTtirjsnZgg6riw67O464+Z7J6R7J2EIOy3qOyGjO2VnCDqsr3smrDsl5Drp4wg64+Z7J6R7ZWoLikgW2JlZm9yZVJlc3RvcmVde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZVJlc3RvcmV9LCBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfSwgW3Jlc3RvcmVde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OnJlc3RvcmV9IOydtOuypO2KuOqwgCDssKjroYDroZwg67Cc7IOd7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI3Jlc3RvcmVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtkdXJhdGlvblZhbHVlPW9wdGlvbnMuZHVyYXRpb25dIER1cmF0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudCAodW5pdDogbXMpPGtvPu2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQo64uo7JyEOiBtcyk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZVJlc3RvcmVcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrXG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNldmVudDpyZXN0b3JlXG5cdCAqIEBleGFtcGxlXG5cdCAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKS5vbihcImJlZm9yZUZsaWNrU3RhcnRcIiwgZSA9PiB7XG5cdCAqIFx0aWYgKGUubm8gPT09IDIpIHtcblx0ICogXHRcdC8vIENhbmNlbHMgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlICdiZWZvcmVGbGlja1N0YXJ0JyBldmVudC5cblx0ICogXHRcdC8vICdiZWZvcmVGbGlja1N0YXJ0JyDsnbTrsqTtirgg6riw67O464+Z7J6RIOy3qOyGjC5cblx0ICogXHRcdGUuc3RvcCgpO1xuXHQgKlxuXHQgKiBcdFx0Ly8gUmV0dXJuIHRvIG9yaWdpbmFsIHBvc2l0aW9uLlxuXHQgKiBcdFx0Ly8g7JuQ656YIOyekOumrOuhnCDrkJjrj4zrprwuXG5cdCAqIFx0XHR0aGlzLnJlc3RvcmUoMTAwKTtcblx0ICogXHR9XG5cdCAqIH0pO1xuXHQgKi9cblx0cmVzdG9yZShkdXJhdGlvblZhbHVlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IGN1cnJQb3MgPSB0aGlzLl9heGVzSW5zdC5nZXQoKS5mbGljaztcblx0XHRsZXQgZHVyYXRpb24gPSBkdXJhdGlvblZhbHVlO1xuXHRcdGxldCBkZXN0UG9zO1xuXG5cdFx0Ly8gY2hlY2sgaWYgdGhlIHBhbmVsIGlzbid0IGluIHJpZ2h0IHBvc2l0aW9uXG5cdFx0aWYgKGN1cnJQb3MgIT09IHBhbmVsLmN1cnJJbmRleCAqIHBhbmVsLnNpemUpIHtcblx0XHRcdGNvbmYuY3VzdG9tRXZlbnQucmVzdG9yZUNhbGwgPSB0cnVlO1xuXHRcdFx0ZHVyYXRpb24gPSB1dGlscy5nZXROdW1WYWx1ZShkdXJhdGlvbiwgdGhpcy5vcHRpb25zLmR1cmF0aW9uKTtcblxuXHRcdFx0dGhpcy5fcmV2ZXJ0UGFuZWxObygpO1xuXHRcdFx0ZGVzdFBvcyA9IHBhbmVsLnNpemUgKiBwYW5lbC5pbmRleDtcblxuXHRcdFx0dGhpcy5fdHJpZ2dlckJlZm9yZVJlc3RvcmUoe2RlcGFQb3M6IGN1cnJQb3MsIGRlc3RQb3N9KTtcblx0XHRcdHRoaXMuX3NldEF4ZXMoXCJzZXRUb1wiLCBkZXN0UG9zLCBkdXJhdGlvbik7XG5cblx0XHRcdGlmICghZHVyYXRpb24pIHtcblx0XHRcdFx0dGhpcy5fYWRqdXN0Q29udGFpbmVyQ3NzKFwiZW5kXCIpO1xuXHRcdFx0XHR0aGlzLl90cmlnZ2VyUmVzdG9yZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB0byBoYW5kbGUgb24gYXBpIGNhbGxcblx0XHR9IGVsc2UgaWYgKHBhbmVsLmNoYW5nZWQpIHtcblx0XHRcdHRoaXMuX3JldmVydFBhbmVsTm8oKTtcblx0XHRcdGNvbmYudG91Y2guZGlzdGFuY2UgPSBjb25mLmluZGV4VG9Nb3ZlID0gMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaW5wdXQgZnJvbSB0aGUgaW5wdXQgZGV2aWNlIGlzIG5vdCBibG9ja2VkIHNvIHRoYXQgdGhlIHBhbmVsIGNhbiBiZSBtb3ZlZCBieSB0aGUgaW5wdXQgZGV2aWNlLlxuXHQgKiBAa28g66eJ7JWY642YIOyeheugpSDsnqXsuZjroZzrtoDthLDsnZgg7J6F66Cl7J2EIO2RvOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNlbmFibGVJbnB1dFxuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZGlzYWJsZUlucHV0XG5cdCAqL1xuXHRlbmFibGVJbnB1dCgpIHtcblx0XHR0aGlzLl9wYW5JbnB1dC5lbmFibGUoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaW5wdXQgZnJvbSB0aGUgaW5wdXQgZGV2aWNlIGlzIGJsb2NrZWQgc28gdGhhdCB0aGUgcGFuZWwgaXMgbm90IG1vdmVkIGJ5IHRoZSBpbnB1dCBkZXZpY2UuXG5cdCAqIEBrbyDtjKjrhJDsnbQg7J6F66ClIOyepey5mOyXkCDsnZjtlbQg7JuA7KeB7J207KeAIOyViuuPhOuhnSDsnoXroKUg7J6l7LmY66Gc67aA7YSw7J2YIOyeheugpeydhCDrp4nripTri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZGlzYWJsZUlucHV0XG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNlbmFibGVJbnB1dFxuXHQgKi9cblx0ZGlzYWJsZUlucHV0KCkge1xuXHRcdHRoaXMuX3BhbklucHV0LmRpc2FibGUoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgY3VycmVudCBmbGlja2luZyBzdGF0dXMuIElmIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBzcGVjaWZpZWQgYXMgYSBbc2V0U3RhdHVzKClde0BsaW5rIGVnLkZsaWNraW5nI3NldFN0YXR1c30gbWV0aG9kIGFyZ3VtZW50LCBpdCBjYW4gYmUgcmV0dXJuZWQgdG8gaXRzIHZhbHVlIHN0YXRlLlxuXHQgKiBAa28g7ZiE7J6sIOyDge2DnCDqsJLsnYQg67CY7ZmY7ZWc64ukLiDrsJjtmZjrsJvsnYAg6rCS7J2EIFtzZXRTdGF0dXMoKV17QGxpbmsgZWcuRmxpY2tpbmcjc2V0U3RhdHVzfSDrqZTshJzrk5wg7J247J6Q66GcIOyngOygle2VmOuptCDqt7gg6rCSIOyDge2DnOuhnCDrkJjrj4zrprQg7IiYIOyeiOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNnZXRTdGF0dXNcblx0ICogQHBhcmFtIHtCb29sZWFufSBbc3RyaW5naWZ5XSBTZXQgdHJ1ZSBpZiB3YW50IGdldCBzdHJpbmdpZmllZCBzdGF0dXMgdmFsdWUuPGtvPnRydWUg7KeA7KCV7IucIGpzb27rrLjsnpDsl7Qg7ZiV7YOc66GcIOuwmO2ZmO2VnOuLpC48L2tvPlxuXHQgKiBAcmV0dXJuIHtTdGF0dXN8U3RyaW5nfSBBbiBvYmplY3Qgd2l0aCBjdXJyZW50IHN0YXRlIHZhbHVlIGluZm9ybWF0aW9uLjxrbz7tmITsnqwg7IOB7YOc6rCSIOygleuztOulvCDqsIDsp4Qg6rCd7LK0Ljwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjc2V0U3RhdHVzXG5cdCAqIEBleGFtcGxlXG5cdCAqIGNvbnN0IGZsaWNrID0gbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpO1xuXHQgKiBjb25zdCBzdGF0dXMgPSBmbGljay5nZXRTdGF0dXMoKTtcblx0ICogY29uc3QganNvblN0YXVzID0gZmxpY2suZ2V0U3RhdHVzKHRydWUpO1xuXHQgKlxuXHQgKiBjb25zb2xlLmxvZyhzdGF0dXMpOyAvLyB7cGFuZWw6IHsuLi59LCAkbGlzdDogQXJyYXkoNyl9XG5cdCAqIGNvbnNvbGUubG9nKGpzb25TdGF0dXMpOyAvLyBcIntcXFwicGFuZWxcXFwiOntcXFwiaW5kZXhcXFwiOjMsXFxcIm5vXFxcIjo2LFxcXCJjdXJySW5kZXhcXFwiOjMsXFxcImN1cnJOb1xcXCI6Nn0sXFxcIiRsaXN0XFxcIjpbe1xcXCJzdHlsZVxcXCI6XFxcImJhY2tncm91bmQtY29sb3I6IHJnYigxNTUsIDQ5LCAxMzcpOyBwb3NpdGlvbjogYWJzb2x1dGU7ICBoZWlnaHQ6IDEwMCU7XFxcIixcXFwiY2xhc3NOYW1lXFxcIjpcXFwiZWctZmxpY2stcGFuZWxcXFwiLFxcXCJodG1sXFxcIjpcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Jmx0O3AmZ3Q7cGFuZWwgMyZsdDsvcCZndDtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXFwifSx7XFxcInN0eWxlXFxcIjpcXFwiYmFja2dyb3VuZC1jb2xvcjogcmdiKDUxLCAxNzIsIDkxKTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDQmbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn0se1xcXCJzdHlsZVxcXCI6XFxcImJhY2tncm91bmQtY29sb3I6IHJnYigxMTYsIDM4LCAyNDEpOyBwb3NpdGlvbjogYWJzb2x1dGU7ICBoZWlnaHQ6IDEwMCU7XFxcIixcXFwiY2xhc3NOYW1lXFxcIjpcXFwiZWctZmxpY2stcGFuZWxcXFwiLFxcXCJodG1sXFxcIjpcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Jmx0O3AmZ3Q7cGFuZWwgNSZsdDsvcCZndDtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXFwifSx7XFxcInN0eWxlXFxcIjpcXFwiYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MSwgMTM5LCAyNCk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCA2Jmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9LHtcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjA0LCAxMDIsIDIwNCk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCAwJmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9LHtcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTQsIDUzLCAxNTYpOyBwb3NpdGlvbjogYWJzb2x1dGU7ICBoZWlnaHQ6IDEwMCU7XFxcIixcXFwiY2xhc3NOYW1lXFxcIjpcXFwiZWctZmxpY2stcGFuZWxcXFwiLFxcXCJodG1sXFxcIjpcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Jmx0O3AmZ3Q7cGFuZWwgMSZsdDsvcCZndDtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXFwifSx7XFxcInN0eWxlXFxcIjpcXFwiYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5NiwgMjE4LCA3Mik7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCAyJmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9XX1cIlxuXHQgKi9cblx0LyoqXG5cdCAqIFRoZSByZXR1cm4gdmFsdWUgc3BlY2lmaWNhdGlvbiBvZiB0aGUgZ2V0U3RhdHVzICgpIG1ldGhvZC5cblx0ICogQGtvIGdldFN0YXR1cygpIOuplOyEnOuTnOydmCDrsJjtmZjqsJIg66qF7IS4LlxuXHQgKiBAdHlwZWRlZiB7T2JqZWN0fSBTdGF0dXNcblx0ICogQHByb3BlcnR5IHtPYmplY3R9IHBhbmVsIGN1cnJlbnQgcGFuZWwgcG9zaXRpb248a28+7ZiE7J6sIO2MqOuEkCDsnITsuZg8L2tvPlxuXHQgKiBAcHJvcGVydHkge051bWJlcn0gcGFuZWwuaW5kZXggUGh5c2ljYWwgaW5kZXggbnVtYmVyLjxrbz7rrLzrpqzsoIEg7J24642x7IqkIOuyiO2YuC48L2tvPlxuXHQgKiBAcHJvcGVydHkge051bWJlcn0gcGFuZWwuY3VyckluZGV4IEN1cnJlbnQgcGh5c2ljYWwgaW5kZXggbnVtYmVyLjxrbz7tmITsnqwg66y866as7KCBIOyduOuNseyKpCDrsojtmLguPC9rbz5cblx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IHBhbmVsLm5vIExvZ2ljYWwgaW5kZXggbnVtYmVyLjxrbz7rhbzrpqzsoIEg7J24642x7IqkIOuyiO2YuC48L2tvPlxuXHQgKiBAcHJvcGVydHkge051bWJlcn0gcGFuZWwuY3Vyck5vIEN1cnJlbnQgbG9naWNhbCBpbmRleCBudW1iZXIuPGtvPu2YhOyerCDrhbzrpqzsoIEg7J24642x7IqkIOuyiO2YuC48L2tvPlxuXHQgKiBAcHJvcGVydHkge0FycmF5Ljx7c3R5bGU6IFN0cmluZywgY2xhc3NOYW1lOiBTdHJpbmcsIGh0bWw6IFN0cmluZ30+fSAkbGlzdCBwYW5lbCdzIGh0bWw8a28+7Yyo64SQIOygleuztDwva28+XG5cdCAqIEBwcm9wZXJ0eSB7T2JqZWN0fSAkbGlzdC5vYmogRm9yIGNvbnZlbmllbmNlLCB0aGUgZWxlbWVudCBpcyBkZW5vdGVkIGJ5IG9iai48a28+7Y647J2Y7IOBIOybkOyGjOulvCBvYmrroZwg7ZGc6riw7ZWoPC9rbz5cblx0ICogQHByb3BlcnR5IHtTdHJpbmd9ICRsaXN0Lm9iai5zdHlsZSBUaGUgdmFsdWUgb2YgdGhlIHN0eWxlIGF0dHJpYnV0ZSBvZiB0aGUgcGFuZWwgZWxlbWVudC4gKCd0cmFuc2Zvcm0nLCAnbGVmdCcsICd0b3AnLCAnd2lsbC1jaGFuZ2UnLCAnYm94LXNpemluZycsICd3aWR0aCcgc3R5bGUgaGFzIGJlZW4gZGVsZXRlZC4pPGtvPu2MqOuEkCDsmpTshozsnZggc3R5bGUg7IaN7ISxIOqwki4gKCd0cmFuc2Zvcm0nLCAnbGVmdCcsICd0b3AnLCAnd2lsbC1jaGFuZ2UnLCAnYm94LXNpemluZycsICd3aWR0aCcgc3R5bGXsnYAg7IKt7KCc65CoKTwva28+XG5cdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSAkbGlzdC5vYmouY2xhc3NOYW1lIFRoZSBjbGFzcyBuYW1lIG9mIHRoZSBwYW5lbCBlbGVtZW50Ljxrbz7tjKjrhJAg7JqU7IaM7J2YIGNsYXNzIOydtOumhC48L2tvPlxuXHQgKiBAcHJvcGVydHkge1N0cmluZ30gJGxpc3Qub2JqLmh0bWwgVGhlIGlubmVySFRNTCB2YWx1ZSBvZiB0aGUgcGFuZWwgZWxlbWVudC48a28+7Yyo64SQIOyalOyGjOydmCBpbm5lckhUTUwg6rCSLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0SW5kZXhcblx0ICovXG5cdGdldFN0YXR1cyhzdHJpbmdpZnkpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3QgcnhTdHlsZSA9IC8oKD86LXdlYmtpdC0pP3RyYW5zZm9ybXxsZWZ0fHRvcHx3aWxsLWNoYW5nZXxib3gtc2l6aW5nfHdpZHRoKTpbXjtdKjsvZztcblx0XHRjb25zdCBzdGF0dXMgPSB7XG5cdFx0XHQvLyBjdXJyZW50IHBhbmVsIHBvc2l0aW9uXG5cdFx0XHRwYW5lbDoge1xuXHRcdFx0XHRpbmRleDogcGFuZWwuaW5kZXgsXG5cdFx0XHRcdG5vOiBwYW5lbC5ubyxcblx0XHRcdFx0Y3VyckluZGV4OiBwYW5lbC5jdXJySW5kZXgsXG5cdFx0XHRcdGN1cnJObzogcGFuZWwuY3Vyck5vXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBwYW5lbCdzIGh0bWxcblx0XHRcdCRsaXN0OiBwYW5lbC4kbGlzdC5tYXAodiA9PiAoe1xuXHRcdFx0XHRzdHlsZTogdi5zdHlsZS5jc3NUZXh0LnJlcGxhY2UocnhTdHlsZSwgXCJcIikudHJpbSgpLFxuXHRcdFx0XHRjbGFzc05hbWU6IHYuY2xhc3NOYW1lLFxuXHRcdFx0XHRodG1sOiB2LmlubmVySFRNTFxuXHRcdFx0fSkpXG5cdFx0fTtcblxuXHRcdHJldHVybiBzdHJpbmdpZnkgP1xuXHRcdFx0SlNPTi5zdHJpbmdpZnkoc3RhdHVzKSA6IHN0YXR1cztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXN0b3JlIHRvIHRoZSBzdGF0ZSBvZiB0aGUgYHN0YXR1c1ZhbHVlYC5cblx0ICogQGtvIGBzdGF0dXNWYWx1ZWDsnZgg7IOB7YOc66GcIOuzteybkO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNzZXRTdGF0dXNcblx0ICogQHBhcmFtIHtTdGF0dXN8U3RyaW5nfSBzdGF0dXNWYWx1ZSBTdGF0dXMgdmFsdWUgdG8gYmUgcmVzdG9yZWQuIFlvdSBjYW4gc3BlY2lmeSB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBbZ2V0U3RhdHVzKClde0BsaW5rIGVnLkZsaWNraW5nI2dldFN0YXR1c30gbWV0aG9kLjxrbz7rs7Xsm5DtlaAg7IOB7YOcIOqwki4gW2dldFN0YXR1cygpXXtAbGluayBlZy5GbGlja2luZyNnZXRTdGF0dXN966mU7ISc65OcIOuwmO2ZmOqwkuydhCDsp4DsoJXtlZjrqbQg65Cc64ukLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0U3RhdHVzXG5cdCAqIEBleGFtcGxlXG5cdCAqIGNvbnN0IGZsaWNrID0gbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpO1xuXHQgKiBjb25zdCBzdGF0dXMgPSBmbGljay5nZXRTdGF0dXMoKTtcblx0ICpcblx0ICogLy8gTW92ZSB0byBhcmJpdHJhcnkgcGFuZWwuXG5cdCAqIC8vIOyehOydmCDtjKjrhJDroZwg7J2064+ZXG5cdCAqIGZsaWNrLm1vdmVUbygyKTtcblx0ICpcblx0ICogLy8gUmVzdG9yZSB0byBzdGF0dXMuXG5cdCAqIC8vIHN0YXR1cyDsg4Htg5zroZwg67O17JuQXG5cdCAqIGZsaWNrLnNldFN0YXR1cyhzdGF0dXMpO1xuXHQgKi9cblx0c2V0U3RhdHVzKHN0YXR1c1ZhbHVlKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IGlzQWRhcHRpdmVIZWlnaHQgPSB0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQ7XG5cdFx0Y29uc3Qgc3RhdHVzID0gdHlwZW9mIHN0YXR1c1ZhbHVlID09PSBcInN0cmluZ1wiID9cblx0XHRcdEpTT04ucGFyc2Uoc3RhdHVzVmFsdWUpIDogc3RhdHVzVmFsdWU7XG5cblx0XHRpZiAoc3RhdHVzKSB7XG5cdFx0XHRmb3IgKGNvbnN0IHggaW4gc3RhdHVzLnBhbmVsKSB7XG5cdFx0XHRcdHggaW4gcGFuZWwgJiYgKHBhbmVsW3hdID0gc3RhdHVzLnBhbmVsW3hdKTtcblx0XHRcdH1cblxuXHRcdFx0cGFuZWwuJGxpc3QuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRjb25zdCBkYXRhID0gc3RhdHVzLiRsaXN0W2ldO1xuXHRcdFx0XHRjb25zdCBzdHlsZSA9IGRhdGEuc3R5bGU7XG5cdFx0XHRcdGNvbnN0IGNsYXNzTmFtZSA9IGRhdGEuY2xhc3NOYW1lO1xuXHRcdFx0XHRjb25zdCBodG1sID0gZGF0YS5odG1sO1xuXG5cdFx0XHRcdHN0eWxlICYmICh2LnN0eWxlLmNzc1RleHQgKz0gc3R5bGUpO1xuXHRcdFx0XHRjbGFzc05hbWUgJiYgKHYuY2xhc3NOYW1lID0gY2xhc3NOYW1lKTtcblx0XHRcdFx0aHRtbCAmJiAodi5pbm5lckhUTUwgPSBodG1sKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpc0FkYXB0aXZlSGVpZ2h0ICYmIHRoaXMuX3NldEFkYXB0aXZlSGVpZ2h0KCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHJlZmVyZW5jZSBlbGVtZW50IGFuZCBpdHMgY2hpbGRyZW4gdG8gdGhlIHN0YXRlIHRoZXkgd2VyZSBpbiBiZWZvcmUgdGhlIGluc3RhbmNlIHdhcyBjcmVhdGVkLiBSZW1vdmUgYWxsIGF0dGFjaGVkIGV2ZW50IGhhbmRsZXJzLiBTcGVjaWZ5IGBudWxsYCBmb3IgYWxsIGF0dHJpYnV0ZXMgb2YgdGhlIGluc3RhbmNlIChpbmNsdWRpbmcgaW5oZXJpdGVkIGF0dHJpYnV0ZXMpLjxicj5JZiBwbHVnaW4gaXNuJ3QgZW1wdHksIGFsc28gcmVzZXQgYWxsIHBsdWdpbnMgcmVnaXN0ZXJlZC5cblx0ICogQGtvIOq4sOykgCDsmpTshozsmYAg6re4IO2VmOychCDsmpTshozrpbwg7J247Iqk7YS07IqkIOyDneyEseyghOydmCDsg4Htg5zroZwg65CY64+M66aw64ukLiDrtoDssKnrkJwg66qo65OgIOydtOuypO2KuCDtlbjrk6Trn6zrpbwg7YOI6rGw7ZWc64ukLiDsnbjsiqTthLTsiqTsnZgg66qo65OgIOyGjeyEsSjsg4Hsho3rsJvsnYAg7IaN7ISx7Y+s7ZWoKeyXkCBgbnVsbGDsnYQg7KeA7KCV7ZWc64ukLjxicj7tlIzrn6zqt7jsnbjsnbQg67mE7Ja07J6I7KeAIOyViuuLpOuptCwg7ZSM65+s6re47J2464+EIOuqqOuRkCDrpqzshYvtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZGVzdHJveVxuXHQgKiBAZXhhbXBsZVxuXHQgKiBjb25zdCBmbGljayA9IG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKTtcblx0ICogZmxpY2suZGVzdHJveSgpO1xuXHQgKiBjb25zb2xlLmxvZyhmbGljay5tb3ZlVG8pOyAvLyBudWxsXG5cdCAqL1xuXHRkZXN0cm95KCkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IG9yaWdQYW5lbFN0eWxlID0gY29uZi5vcmlnUGFuZWxTdHlsZTtcblx0XHRjb25zdCB3cmFwcGVyID0gb3JpZ1BhbmVsU3R5bGUud3JhcHBlcjtcblx0XHRjb25zdCBjb250YWluZXIgPSBvcmlnUGFuZWxTdHlsZS5jb250YWluZXI7XG5cdFx0Y29uc3QgbGlzdCA9IG9yaWdQYW5lbFN0eWxlLmxpc3Q7XG5cblx0XHQvLyB1bmJpbmQgZXZlbnRzXG5cdFx0dGhpcy5fYmluZEV2ZW50cyhmYWxzZSk7XG5cdFx0dGhpcy5vZmYoKTtcblxuXHRcdC8vIGRlc3Ryb3kgZWcuQXhlcyBpbnN0YW5jZVxuXHRcdHRoaXMuX2F4ZXNJbnN0LmRlc3Ryb3koKTtcblx0XHR0aGlzLl9wYW5JbnB1dC5kZXN0cm95KCk7XG5cblx0XHQvLyB1bndyYXAgY29udGFpbmVyIGVsZW1lbnQgYW5kIHJlc3RvcmUgb3JpZ2luYWwgaW5saW5lIHN0eWxlXG5cdFx0Ly8gcmVzdG9yZSB3cmFwcGVyIHN0eWxlXG5cdFx0Y29uc3QgJHdyYXBwZXIgPSB0aGlzLiR3cmFwcGVyO1xuXG5cdFx0JHdyYXBwZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgd3JhcHBlci5jbGFzc05hbWUpO1xuXHRcdCR3cmFwcGVyW3dyYXBwZXIuc3R5bGUgPyBcInNldEF0dHJpYnV0ZVwiIDogXCJyZW1vdmVBdHRyaWJ1dGVcIl0oXCJzdHlsZVwiLCB3cmFwcGVyLnN0eWxlKTtcblxuXHRcdC8vIHJlc3RvcmUgY29udGFpbmVyIHN0eWxlXG5cdFx0Y29uc3QgJGNvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lcjtcblx0XHRjb25zdCAkY2hpbGRyZW4gPSBbXVxuXHRcdFx0LnNsaWNlLmNhbGwoJGNvbnRhaW5lci5jaGlsZHJlbik7XG5cblx0XHRpZiAob3JpZ1BhbmVsU3R5bGUuY29udGFpbmVyLmNsYXNzTmFtZSkge1xuXHRcdFx0JGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjb250YWluZXIuY2xhc3NOYW1lKTtcblx0XHRcdCRjb250YWluZXJbY29udGFpbmVyLnN0eWxlID8gXCJzZXRBdHRyaWJ1dGVcIiA6IFwicmVtb3ZlQXR0cmlidXRlXCJdKFwic3R5bGVcIiwgY29udGFpbmVyLnN0eWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGNoaWxkcmVuLmZvckVhY2godiA9PiAkd3JhcHBlci5hcHBlbmRDaGlsZCh2KSk7XG5cdFx0XHQkY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJGNvbnRhaW5lcik7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDAsICRlbDsgKCRlbCA9ICRjaGlsZHJlbltpXSk7IGkrKykge1xuXHRcdFx0aWYgKGkgPiBsaXN0Lmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0JGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJGVsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGNsYXNzTmFtZSA9IGxpc3RbaV0uY2xhc3NOYW1lO1xuXHRcdFx0XHRjb25zdCBzdHlsZSA9IGxpc3RbaV0uc3R5bGU7XG5cblx0XHRcdFx0JGVsW2NsYXNzTmFtZSA/IFwic2V0QXR0cmlidXRlXCIgOiBcInJlbW92ZUF0dHJpYnV0ZVwiXShcImNsYXNzXCIsIGNsYXNzTmFtZSk7XG5cdFx0XHRcdCRlbFtzdHlsZSA/IFwic2V0QXR0cmlidXRlXCIgOiBcInJlbW92ZUF0dHJpYnV0ZVwiXShcInN0eWxlXCIsIHN0eWxlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyByZWxlYXNlIHBsdWdpbiByZXNvdXJjZXNcblx0XHR0aGlzLnBsdWdpbnMuZm9yRWFjaCh2ID0+IHtcblx0XHRcdHRoaXMucGx1Z2luc1t2XS4kY29tcG9uZW50V2lsbFVubW91bnQoKTtcblx0XHR9KTtcblxuXHRcdC8vIHJlbGVhc2UgcmVzb3VyY2VzXG5cdFx0Zm9yIChjb25zdCB4IGluIHRoaXMpIHtcblx0XHRcdHRoaXNbeF0gPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlciBwbHVnaW4gdG8gYmUgdXNlZC5cblx0ICogQGtvIOyCrOyaqeuQoCDtlIzrn6zqt7jsnbjsnYQg65Ox66Gd7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI3BsdWdpblxuXHQgKiBAZXhhbXBsZVxuXHQgKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIikucGx1Z2luKFtcblx0ICogICAgIG5ldyBlZy5GbGlja2luZy5wbHVnaW4uT3BhY2l0eUVmZmVjdChcInNwYW5cIiksXG5cdCAqICAgICAuLi5cblx0ICogXSk7XG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICovXG5cdHBsdWdpbihsaXN0KSB7XG5cdFx0bGlzdC5mb3JFYWNoKHAgPT4ge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBBIGxpc3Qgb2YgcGx1Z2lucyB1c2VkLlxuXHRcdFx0ICogQGtvIOyCrOyaqeuQnCDtlIzrn6zqt7jsnbgg66qp66GdXG5cdFx0XHQgKiBAcHJvcGVydHkge0FycmF5fSBwbHVnaW5zIEFuIGFycmF5IG9mIHBsdWdpbiBpbnN0YW5jZXMgPGtvPu2UjOufrOq3uOyduCDsnbjsiqTthLTsiqQg67Cw7Je0PC9rbz5cblx0XHRcdCAqIEBuYW1lIHBsdWdpbnNcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBpbnN0YW5jZVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIGNvbnN0IGZsaWNrID0gbmV3IGVnLkZsaWNraW5nKCAuLi4gKS5wbHVnaW4oWyAuLi4gXSk7XG5cdFx0XHQgKlxuXHRcdFx0ICogZmxpY2sucGx1Z2luczsgLy8gWyAuLi4gXSAtIGFycmF5IG9mIHBsdWdpbnNcblx0XHRcdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHRcdFx0ICovXG5cdFx0XHRpZiAodGhpcy5wbHVnaW5zLmZpbHRlcih2ID0+IHYuY29uc3RydWN0b3IgPT09IHAuY29uc3RydWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHR0aGlzLnBsdWdpbnMucHVzaChwLiRjb21wb25lbnRXaWxsTW91bnQodGhpcykpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGVjdGlvbiBvZiB1dGlsaXRpZXMgdXNlZCBpbnRlcm5hbGx5XG5cdCAqIEBrbyDrgrTrtoDsl5DshJwg7IKs7Jqp65CY64qUIOycoO2LuOumrO2LsCDrqqjsnYxcblx0ICogQG5hbWUgdXRpbHNcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEBwcml2YXRlXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRzdGF0aWMgdXRpbHMgPSB1dGlscztcblx0LyoqXG5cdCAqIFZlcnNpb24gaW5mbyBzdHJpbmdcblx0ICogQGtvIOuyhOyghOygleuztCDrrLjsnpDsl7Rcblx0ICogQG5hbWUgVkVSU0lPTlxuXHQgKiBAc3RhdGljXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqIEBleGFtcGxlXG5cdCAqIGVnLkZsaWNraW5nLlZFUlNJT047ICAvLyBleCkgMi4yLjBcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqL1xuXHRzdGF0aWMgVkVSU0lPTiA9IFwiMi40LjItc25hcHNob3RcIjtcblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIHVzZWQgaW50ZXJuYWxseVxuXHQgKiBAa28g64K067aA7JeQ7IScIOyCrOyaqeuQmOuKlCDsg4HsiJgg6rCSXG5cdCAqIEBuYW1lIGNvbnN0c1xuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHByaXZhdGVcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHN0YXRpYyBjb25zdHMgPSB7XG5cdFx0RVZFTlRTLFxuXHRcdFRSQU5TRk9STSxcblx0XHRTVVBQT1JUX1dJTExDSEFOR0UsXG5cdFx0SVNfQU5EUk9JRDJcblx0fTtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIG5vbmUgZGlyZWN0aW9uLlxuXHQgKiBAa28gbm9uZSDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9OT05FXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCAxXG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX05PTkUgPSBBeGVzLkRJUkVDVElPTl9OT05FO1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3IgbGVmdCBkaXJlY3Rpb24uXG5cdCAqIEBrbyBsZWZ0IOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX0xFRlRcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDJcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fTEVGVCA9IEF4ZXMuRElSRUNUSU9OX0xFRlQ7XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciByaWdodCBkaXJlY3Rpb24uXG5cdCAqIEBrbyByaWdodCDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9SSUdIVFxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgNFxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9SSUdIVCA9IEF4ZXMuRElSRUNUSU9OX1JJR0hUO1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3IgdXAgZGlyZWN0aW9uLlxuXHQgKiBAa28gdXAg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fVVBcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDhcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fVVAgPSBBeGVzLkRJUkVDVElPTl9VUDtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIGRvd24gZGlyZWN0aW9uLlxuXHQgKiBAa28gZG93biDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9ET1dOXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCAxNlxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9ET1dOID0gQXhlcy5ESVJFQ1RJT05fRE9XTjtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIGhvcml6b250YWwgZGlyZWN0aW9uLlxuXHQgKiBAa28gaG9yaXpvbnRhbCDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9IT1JJWk9OVEFMXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCA2XG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX0hPUklaT05UQUwgPSBBeGVzLkRJUkVDVElPTl9IT1JJWk9OVEFMO1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3IgdmVydGljYWwgZGlyZWN0aW9uLlxuXHQgKiBAa28gdmVydGljYWwg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fVkVSVElDQUxcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDI0XG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX1ZFUlRJQ0FMID0gQXhlcy5ESVJFQ1RJT05fVkVSVElDQUw7XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciBhbGwgZGlyZWN0aW9uLlxuXHQgKiBAa28gYWxsIOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX0FMTFxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgMzBcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fQUxMID0gQXhlcy5ESVJFQ1RJT05fQUxMO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==