/*
Copyright (c) 2017 NAVER Corp.
@egjs/flicking-plugins JavaScript library
@egjs/flicking-plugins project is licensed under the MIT <https://github.com/naver/egjs-flicking-plugins> license

https://github.com/naver/egjs-flicking-plugins
@version 3.0.0-snapshot
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.eg = global.eg || {}, global.eg.Flicking = global.eg.Flicking || {}, global.eg.Flicking.plugins = {})));
}(this, function (exports) { 'use strict';

  /**
   * You can apply parallax effect while panel is moving.
   * @ko 패널들을 움직이면서 parallax 효과를 부여할 수 있습니다.
   * @memberof eg.Flicking.plugins
   */
  var Parallax =
  /*#__PURE__*/
  function () {
    /**
     * @param - Selector of the element to apply parallax effect <ko> Parallax 효과를 적용할 엘리먼트의 선택자 </ko>
     * @param - Effect amplication scale <ko>효과 증폭도</ko>
     * @example
    flicking.addPlugins(new eg.Flicking.plugins.Parallax("img", 1));
     */
    function Parallax(selector, scale) {
      if (selector === void 0) {
        selector = "";
      }

      if (scale === void 0) {
        scale = 1;
      }

      var _this = this;

      this.selector = selector;
      this.scale = scale;

      this.onMove = function (e) {
        _this.move(e.currentTarget);
      };
    }

    var __proto = Parallax.prototype;

    __proto.init = function (flicking) {
      flicking.on("move", this.onMove);
      this.move(flicking);
    };

    __proto.destroy = function (flicking) {
      flicking.off("move", this.onMove);
    };

    __proto.move = function (flicking) {
      var _this = this;

      var panels = flicking.getVisiblePanels();
      panels.forEach(function (panel) {
        var progress = panel.getOutsetProgress();
        panel.update(function (el) {
          var target = el.querySelector(_this.selector);
          var parentTarget = target.parentNode;
          var rect = target.getBoundingClientRect();
          var parentRect = parentTarget.getBoundingClientRect();
          var position = (parentRect.width - rect.width) / 2 * progress * _this.scale;
          var transform = "translate(-50%) translate(" + position + "px)";
          var style = target.style;
          style.cssText += "transform: " + transform + ";-webkit-transform: " + transform + ";-ms-transform:" + transform;
        });
      });
    };

    return Parallax;
  }();

  /**
   * You can apply fade in / out effect while panel is moving.
   * @ko 패널들을 움직이면서 fade in / out 효과를 부여할 수 있습니다.
   * @memberof eg.Flicking.plugins
   */
  var Fade =
  /*#__PURE__*/
  function () {
    /**
     * @param - The selector of the element to which the fade effect is to be applied. If the selector is blank, it applies to panel element. <ko>Fade 효과를 적용할 대상의 선택자. 선택자가 공백이면 패널 엘리먼트에 적용된다.</ko>
     * @param - Effect amplication scale <ko>효과 증폭도</ko>
     * @example
    flicking.addPlugins(new eg.Flicking.plugins.Fade("p", 1));
     */
    function Fade(selector, scale) {
      if (selector === void 0) {
        selector = "";
      }

      if (scale === void 0) {
        scale = 1;
      }

      var _this = this;

      this.selector = selector;
      this.scale = scale;

      this.onMove = function (e) {
        _this.move(e.currentTarget);
      };
    }

    var __proto = Fade.prototype;

    __proto.init = function (flicking) {
      flicking.on("move", this.onMove);
      this.move(flicking);
    };

    __proto.destroy = function (flicking) {
      flicking.off("move", this.onMove);
    };

    __proto.move = function (flicking) {
      var panels = flicking.getVisiblePanels();
      var selector = this.selector;
      var scale = this.scale;
      panels.forEach(function (panel) {
        var progress = panel.getOutsetProgress();
        panel.update(function (el) {
          var target = selector ? el.querySelector(selector) : el;
          var opacity = Math.min(1, Math.max(0, 1 - Math.abs(progress * scale)));
          target.style.opacity = "" + opacity;
        });
      });
    };

    return Fade;
  }();

  /**
   * Plugin that allow you to automatically move to the next/previous panel, on a specific time basis
   * @ko 일정 시간마다, 자동으로 다음/이전 패널로 넘어가도록 할 수 있는 플러그인
   * @memberof eg.Flicking.plugins
   */
  var AutoPlay =
  /*#__PURE__*/
  function () {
    /**
     * @param - Time to wait before moving on to the next panel <ko>다음 패널로 움직이기까지 대기 시간</ko>
     * @param - The direction in which the panel moves. <ko>패널이 움직이는 방향</ko>
     * @example
    flicking.addPlugins(new eg.Flicking.plugins.AutoPlay(2000, "NEXT"));
     */
    function AutoPlay(duration, direction) {
      if (duration === void 0) {
        duration = 2000;
      }

      if (direction === void 0) {
        direction = "NEXT";
      }

      var _this = this;

      this.duration = duration;
      this.direction = direction;
      this.timerId = 0;

      this.onPlay = function (e) {
        _this.play(e.currentTarget);
      };

      this.onStop = function () {
        clearTimeout(_this.timerId);
      };
    }

    var __proto = AutoPlay.prototype;

    __proto.init = function (flicking) {
      flicking.on({
        move: this.onStop,
        holdStart: this.onStop,
        select: this.onPlay,
        moveEnd: this.onPlay
      });
      this.play(flicking);
    };

    __proto.destroy = function (flicking) {
      this.onStop();
      flicking.off("moveStart", this.onStop);
      flicking.off("holdStart", this.onStop);
      flicking.off("moveEnd", this.onPlay);
      flicking.off("select", this.onPlay);
    };

    __proto.play = function (flicking) {
      var _this = this;

      this.onStop();
      this.timerId = window.setTimeout(function () {
        flicking[_this.direction === "NEXT" ? "next" : "prev"]();

        _this.play(flicking);
      }, this.duration);
    };

    return AutoPlay;
  }();

  /**
   * @namepsace eg.Flicking
   */

  exports.Parallax = Parallax;
  exports.Fade = Fade;
  exports.AutoPlay = AutoPlay;

}));
//# sourceMappingURL=plugins.js.map
