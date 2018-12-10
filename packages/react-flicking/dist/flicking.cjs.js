'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var NativeFlicking = _interopDefault(require('@egjs/flicking'));
var React = require('react');
var ReactDOM = require('react-dom');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function hasClass(element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  }

  return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}
function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += " " + className;
  }

  return true;
}

var DIRECTION_LEFT = NativeFlicking.DIRECTION_LEFT;
var DIRECTION_RIGHT = NativeFlicking.DIRECTION_RIGHT;
var DIRECTION_TOP = NativeFlicking.DIRECTION_TOP;
var DIRECTION_BOTTOM = NativeFlicking.DIRECTION_BOTTOM;
var flickingOptions = ["hwAccelerable", "prefix", "deceleration", "horizontal", "circular", "previewPadding", "bounce", "threshold", "duration", "panelEffect", "defaultIndex", "inputType", "thresholdAngle", "adaptiveHeight", "zIndex", "useTranslate"];

var Flicking =
/** @class */
function (_super) {
  __extends(Flicking, _super);

  function Flicking() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.resize = function () {
      _this.flicking.resize();

      _this.flicking.plugins.forEach(function (plugin) {
        if (plugin.resize) {
          plugin.resize();
        }
      });

      return _this;
    };

    return _this;
  }

  var __proto = Flicking.prototype;

  __proto.render = function () {
    var props = this.props;
    var defaultProps = Flicking.defaultProps;
    var Tag = props.tag;
    var attributes = {};

    for (var name in props) {
      if (name in defaultProps || flickingOptions.indexOf(name) !== -1) {
        continue;
      }

      attributes[name] = props[name];
    }

    return React.createElement(Tag, __assign({}, attributes), React.createElement("div", {
      className: this.props.prefix + "-container"
    }, this.props.children));
  };

  __proto.componentDidUpdate = function () {
    var flicking = this.flicking;
    var panel = flicking._conf.panel;
    var horizontal = this.props.horizontal;
    var className = this.props.prefix + "-panel";
    panel.$list = Array.prototype.slice.call(flicking.$container.children);
    panel.count = panel.$list.length;
    panel.origCount = panel.count;

    if (this.props.circular) {
      flicking._arrangePanels();

      flicking._movePanelPosition(panel.no - panel.index, true);
    }

    panel.$list.forEach(function (el) {
      if (hasClass(el, className)) {
        return;
      }

      addClass(el, className);
      el.style.cssText += "position:absolute;box-sizing:border-box;" + (horizontal ? "height" : "size") + ": 100%;top:0;left:0;";
    });

    flicking._applyPanelsPos();

    this.resize();
  };

  __proto.componentDidMount = function () {
    var _this = this;

    var options = {};
    var props = this.props;

    for (var name in props) {
      if (flickingOptions.indexOf(name) !== -1) {
        options[name] = props[name];
      }
    }

    this.flicking = new NativeFlicking(ReactDOM.findDOMNode(this), options);
    var flicking = this.flicking;
    flicking.on("flick", function (e) {
      _this.props.onFlick(e);
    });
    flicking.on("flickEnd", function (e) {
      _this.props.onFlickEnd(e);
    });
    flicking.on("beforeFlickStart", function (e) {
      _this.props.onBeforeFlickStart(e);
    });
    flicking.on("beforeRestore", function (e) {
      _this.props.onBeforeRestore(e);
    });
    flicking.on("restore", function (e) {
      _this.props.onRestore(e);
    });
    window.addEventListener("resize", this.resize);
  };

  __proto.moveTo = function (no, duration) {
    this.flicking.moveTo(no, duration);
    return this;
  };

  __proto.next = function (duration) {
    this.flicking.next(duration);
    return this;
  };

  __proto.prev = function (duration) {
    this.flicking.prev(duration);
    return this;
  };

  __proto.getAllElements = function () {
    return this.flicking.getAllElements();
  };

  __proto.getElement = function () {
    return this.flicking.getElement();
  };

  __proto.getNextElement = function () {
    return this.flicking.getNextElement();
  };

  __proto.getPrevElement = function () {
    return this.flicking.getPrevElement();
  };

  __proto.getIndex = function (physical) {
    return this.flicking.getIndex(physical);
  };

  __proto.getNextIndex = function (physical) {
    return this.flicking.getNextIndex(physical);
  };

  __proto.getPrevIndex = function (physical) {
    return this.flicking.getPrevIndex(physical);
  };

  __proto.plugin = function (plugins) {
    this.flicking.plugin(plugins);
    return this;
  };

  __proto.componentWillUnmount = function () {
    this.flicking.destroy();
    window.removeEventListener("resize", this.resize);
  };

  Flicking.defaultProps = {
    horizontal: true,
    onBeforeFlickStart: function (e) {
      return;
    },
    onBeforeRestore: function (e) {
      return;
    },
    onFlick: function (e) {
      return;
    },
    onFlickEnd: function (e) {
      return;
    },
    onRestore: function (e) {
      return;
    },
    prefix: "eg-flick",
    tag: "div"
  };
  return Flicking;
}(React.Component);

exports.DIRECTION_LEFT = DIRECTION_LEFT;
exports.DIRECTION_RIGHT = DIRECTION_RIGHT;
exports.DIRECTION_TOP = DIRECTION_TOP;
exports.DIRECTION_BOTTOM = DIRECTION_BOTTOM;
exports.default = Flicking;
//# sourceMappingURL=flicking.cjs.js.map
