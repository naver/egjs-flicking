/*
Copyright (c) 2017 NAVER Corp.
@egjs/flicking JavaScript library
@egjs/flicking project is licensed under the MIT license

https://github.com/naver/egjs-flicking
@version 3.0.0-beta
*/
var Parallax =
/*#__PURE__*/
function () {
  function Parallax(selector, scale) {
    if (scale === void 0) {
      scale = 1;
    }

    var _this = this;

    this.selector = selector;
    this.scale = scale;

    this.onMove = function (e) {
      var flicking = e.currentTarget;
      var panels = flicking.getVisiblePanels();
      panels.forEach(function (panel) {
        var progress = panel.outsetProgress;
        panel.update(function (el) {
          var target = el.querySelector(_this.selector);
          var parentTarget = target.parentNode;
          var rect = target.getBoundingClientRect();
          var parentRect = parentTarget.getBoundingClientRect();
          var position = (rect.width - parentRect.width) / 2 * progress * _this.scale;
          target.style.transform = "translate(-50%) translate(" + position + "px)";
        });
      });
    };
  }

  var __proto = Parallax.prototype;

  __proto.init = function (flicking) {
    flicking.on("move", this.onMove);
  };

  __proto.destory = function (flicking) {
    flicking.off("move", this.onMove);
  };

  return Parallax;
}();

var Fade =
/*#__PURE__*/
function () {
  function Fade(selector, scale) {
    if (scale === void 0) {
      scale = 1;
    }

    var _this = this;

    this.selector = selector;
    this.scale = scale;

    this.onMove = function (e) {
      var flicking = e.currentTarget;
      var panels = flicking.getVisiblePanels();
      var selector = _this.selector;
      var scale = _this.scale;
      panels.forEach(function (panel) {
        var progress = panel.outsetProgress;
        panel.update(function (el) {
          var target = selector ? el.querySelector(selector) : el;
          var opacity = Math.min(1, Math.max(0, 1 - Math.abs(progress * scale)));
          target.style.opacity = "" + opacity;
        });
      });
    };
  }

  var __proto = Fade.prototype;

  __proto.init = function (flicking) {
    flicking.on("move", this.onMove);
  };

  __proto.destory = function (flicking) {
    flicking.off("move", this.onMove);
  };

  return Fade;
}();

var index = {
  Parallax: Parallax,
  Fade: Fade
};

export default index;
//# sourceMappingURL=all.esm.js.map
