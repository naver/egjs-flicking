/*
Copyright (c) 2017 NAVER Corp.
@egjs/flicking project is licensed under the MIT <https://naver.github.io/egjs/license.txt> license

@egjs/flicking JavaScript library
https://github.com/naver/egjs-flicking

@version 2.4.2
*/
import Flicking from '@egjs/flicking';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

var utils = Flicking.utils;
var consts = utils.extend(utils.extend({}, Flicking.consts), {
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

var Plugin =
/*#__PURE__*/
function () {
  var Plugin =
  /*#__PURE__*/
  function () {
    /**
     * Constructor
     * @param {Object} options Option object <ko>옵션 객체</ko>
     */
    function Plugin(options) {
      if (options === void 0) {
        options = {};
      }

      this.options = options;
    }
    /**
     * Before mounting. It's init point from Flicking instance
     * @param {Flicking} instance Flicking instance
     * @returns {Plugin}
     */


    var _proto = Plugin.prototype;

    _proto.$componentWillMount = function $componentWillMount(instance) {
      this.$$ = instance; // get hint and layer-hack setting

      this.useWillChange = instance.$container.style.willChange === "transform";
      this.useLayerHack = this.getInstanceConf().useLayerHack;
      this.bindEvents();
      this.$componentMount();
      this.$componentDidMount();
      return this;
    };
    /**
     * After mounting
     * @return {Plugin}
     */


    _proto.$componentDidMount = function $componentDidMount() {
      return this;
    };
    /**
     * Before the destroy
     */


    _proto.$componentWillUnmount = function $componentWillUnmount() {
      var _this = this;

      Object.keys(this).forEach(function (v) {
        _this[v] = null;
      });
    };

    _proto.getInstanceConf = function getInstanceConf() {
      return this.$$._conf;
    };
    /**
     * Bind flicking custom events
     */


    _proto.bindEvents = function bindEvents() {
      this.$$.on({
        flick: this._onFlick.bind(this),
        flickEnd: this._onFlickEnd.bind(this),
        restore: this._onRestore.bind(this)
      });
    };
    /**
     * 'flick' event handler
     * @param {Object} e
     * @private
     */


    _proto._onFlick = function _onFlick(e) {
      var pos = e.pos;
      var distance = e.distance || pos - this.$$._conf.panel.size;
      this.onFlick && this.onFlick(e, distance);
    };
    /**
     * 'flickEnd' event handler
     * @param {Object} e
     * @private
     */


    _proto._onFlickEnd = function _onFlickEnd(e) {
      var type = e.direction & consts.DIRECTION_LEFT && "next" || e.direction & consts.DIRECTION_RIGHT && "prev" || "";
      type && this.arrange && this.arrange(type);
      this.onFlickEnd && this.onFlickEnd(e);
    };
    /**
     * 'restore' event handler
     * @param {Object} e
     * @private
     */


    _proto._onRestore = function _onRestore(e) {
      this.onRestore && this.onRestore(e);
    };
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


    return Plugin;
  }();

  Plugin.utils = utils;
  Plugin.consts = consts;
  Plugin.VERSION = "2.4.2";
  return Plugin;
}();

/**
 * A plugin to add opacity effect attached with flicking interaction.
 * - Should be targeted only one element(or a wrapper element having child nodes) per panel.
 * @ko 플리킹 인터렉션에 따른 투명도 조절 효과 플러그인.
 * - 각 패널당 한 개의 요소(또는 자식노드를 포함하는 한 개의 래퍼요소)만 지정되어야 한다.
 * @alias eg.Flicking.plugin.OpacityEffect
 * @memberof eg.Flicking.plugin
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
 * import {OpacityEffect} from "@egjs/flicking-plugins";
 *
 * new Flicking("#some")
 *  .plugin([
 *      new OpacityEffect("span")
 *  ]);
 * ```
 */

var OpacityEffect =
/*#__PURE__*/
function (_Plugin) {
  _inheritsLoose(OpacityEffect, _Plugin);

  /**
   * Constructor
   * @param {String} selector Target element selector string <ko>대상 요소 셀렉터 문자열</ko>
   */
  function OpacityEffect(selector) {
    return _Plugin.call(this, {
      selector: selector
    }) || this;
  }

  var _proto = OpacityEffect.prototype;

  _proto.$componentMount = function $componentMount() {
    this.details = Plugin.utils.toArray(this.$$.$wrapper.querySelectorAll(this.options.selector));

    this._build();

    this.resize();
    return this;
  };

  _proto._build = function _build() {
    this.details = [this.details.pop()].concat(this.details);
  };

  _proto._setSelected = function _setSelected(index, setClass) {
    var utils = Plugin.utils;
    utils.classList(utils.css(this.details[index], {
      opacity: ""
    }), "selected", setClass);
  };

  _proto.resize = function resize() {
    this.size = this.getInstanceConf().panel.size;
    this.onRestore("resize");
  };

  _proto.arrange = function arrange(type) {
    if (type !== "resize") {
      this.details = type === "next" ? this.details.concat(this.details.shift()) : [this.details.pop()].concat(this.details);
    }

    this._setSelected(1, true);

    /next|resize/.test(type) && this._setSelected(0, false);
    /prev|resize/.test(type) && this._setSelected(2, false);
  };

  _proto.onFlick = function onFlick(e, distance) {
    var pos = e.pos;
    var per = pos % this.size / this.size;
    var utils = Plugin.utils;

    if (Math.abs(distance) >= this.size) {
      return;
    }

    var opacity = distance > 0 && per <= 0.5 && 1 - 2 * per || distance < 0 && per > 0.5 && 2 * (per - 0.5);
    opacity !== undefined && utils.css(this.details[1], {
      opacity: opacity
    });
  };

  _proto.onRestore = function onRestore() {
    this.arrange("resize");
  };

  _proto.get = function get() {
    return this.details[1];
  };

  return OpacityEffect;
}(Plugin);

/**
 * A plugin to add horizontal parallax effect attached with flicking interaction.
 * - Should be targeted only one element per panel.
 * - It can't be used with `previewPadding` option.
 * @ko 플리킹 인터렉션에 따른 가로유형 패럴렉스 효과 플러그인.
 * - 각 패널당 한 개의 요소만 지정되어야 한다.
 * - `previewPadding` 옵션과 같이 사용될 수 없다.
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
 * import {ParallaxEffect} from "@egjs/flicking-plugins";
 *
 * new Flicking("#some")
 *  .plugin([
 *      new ParallaxEffect("p")
 *  ]);
 * ```
 */

var ParallaxEffect =
/*#__PURE__*/
function (_Plugin) {
  _inheritsLoose(ParallaxEffect, _Plugin);

  /**
   * Constructor
   * @param {String} selector Target selector string within panel element<ko>패널 내에 위치한 대상 요소 셀렉터 문자열</ko>
   */
  function ParallaxEffect(selector) {
    return _Plugin.call(this, {
      selector: selector
    }) || this;
  }

  var _proto = ParallaxEffect.prototype;

  _proto.$componentMount = function $componentMount() {
    var _this = this;

    // select target elements
    this.imgs = this.$$.getAllElements().map(function (v) {
      return v.querySelector(_this.options.selector);
    });
    this.resize();

    this._build();

    return this;
  };

  _proto._build = function _build() {
    var _this2 = this;

    var utils = Plugin.utils;

    var currIndex = this._getCurrIndex(); // set panel element's style


    utils.css(this.getInstanceConf().panel.$list, {
      overflow: "hidden"
    }); // set targeted element's style

    this.imgs.forEach(function (v, i) {
      var x = -50;

      if (currIndex > i) {
        x = 50;
      } else if (currIndex === i) {
        x = 0;
      }

      _this2.useWillChange && utils.css(v, {
        willChange: "transform"
      });

      _this2._setTranslate(v, x + "%", 0);
    });
  };

  _proto._setTranslate = function _setTranslate(el, x, y) {
    el && Plugin.utils.css(el, {
      transform: Plugin.utils.translate.apply(null, this.$$._getDataByDirection([x, y]).concat(this.useLayerHack))
    });
    return el;
  };

  _proto._getCurrIndex = function _getCurrIndex() {
    return this.getInstanceConf().panel.currIndex;
  };

  _proto._getPanel = function _getPanel() {
    var index = this._getCurrIndex();

    return {
      prev: this.imgs[index - 1],
      curr: this.imgs[index],
      next: this.imgs[index + 1]
    };
  };

  _proto.arrange = function arrange(type) {
    if (this.$$.options.circular && type !== "resize") {
      this.imgs = type === "next" ? this.imgs.concat(this.imgs.shift()) : [this.imgs.pop()].concat(this.imgs);
    }

    var panel = this._getPanel(); // update panel's translate


    this._setTranslate(panel.curr, 0, 0);

    /next|resize/.test(type) && this._setTranslate(panel.next, "50%", 0);
    /prev|resize/.test(type) && this._setTranslate(panel.prev, "-50%", 0);
  };

  _proto.onFlick = function onFlick(e, distance) {
    var _this3 = this;

    var pos = e.pos;
    var maxRange = this.size;
    var delta = pos % maxRange / 2;
    var siblingDelta = -(maxRange / 2 - delta);

    if (Math.abs(distance) >= maxRange) {
      return;
    }

    var panel = this._getPanel();

    var update = [];

    if (distance > 0 && panel.next) {
      update.push({
        el: panel.curr,
        x: delta
      });
      update.push({
        el: panel.next,
        x: siblingDelta
      });
    } else if (distance < 0 && panel.prev) {
      update.push({
        el: panel.curr,
        x: siblingDelta
      });
      update.push({
        el: panel.prev,
        x: delta
      });
    }

    update.forEach(function (v) {
      return _this3._setTranslate(v.el, v.x + "px", 0);
    });
  };

  _proto.onRestore = function onRestore() {
    this.arrange("resize");
  };

  _proto.resize = function resize() {
    this.size = this.getInstanceConf().panel.size;
    this.onRestore("resize");
  };

  _proto.get = function get() {
    return this.imgs[this._getCurrIndex()];
  };

  return ParallaxEffect;
}(Plugin);

export { OpacityEffect, ParallaxEffect };
//# sourceMappingURL=plugins.esm.js.map
