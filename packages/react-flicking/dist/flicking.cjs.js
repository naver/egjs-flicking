/*
Copyright (c) 2015-present NAVER Corp.
name: react-flicking
license: undefined
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking
version: 3.0.0-beta
*/
'use strict';

var Flicking$1 = require('@egjs/flicking');
var React = require('react');
var reactDom = require('react-dom');
var ChildrenDiffer = require('@egjs/react-children-differ');
var ListDiffer = require('@egjs/list-differ');

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
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var CloneComponent =
/*#__PURE__*/
function (_super) {
  __extends(CloneComponent, _super);

  function CloneComponent() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  var __proto = CloneComponent.prototype;

  __proto.render = function () {
    return this.props.children;
  };

  return CloneComponent;
}(React.Component);

var DEFAULT_OPTIONS = {
  classPrefix: "eg-flick",
  deceleration: 0.0075,
  horizontal: true,
  circular: false,
  infinite: false,
  infiniteThreshold: 0,
  threshold: 40,
  duration: 100,
  panelEffect: function (x) {
    return 1 - Math.pow(1 - x, 3);
  },
  defaultIndex: 0,
  inputType: ["touch", "mouse"],
  thresholdAngle: 45,
  bounce: 10,
  autoResize: false,
  adaptive: false,
  zIndex: 2000,
  bound: false,
  overflow: false,
  hanger: "50%",
  anchor: "50%",
  gap: 0,
  moveType: {
    type: "snap",
    count: 1
  },
  lastIndex: Infinity,
  renderExternal: true
};
var FLICKING_PROPS = {
  tag: "div",
  classPrefix: "eg-flick",
  plugins: [],
  onNeedPanel: function (e) {},
  onMoveStart: function (e) {},
  onMove: function (e) {},
  onMoveEnd: function (e) {},
  onHoldStart: function (e) {},
  onHoldEnd: function (e) {},
  onRestore: function (e) {},
  onSelect: function (e) {},
  onChange: function (e) {}
};

function MappingFlicking() {
  var flickingPrototype = Flicking$1.prototype;
  return function (constructor) {
    var prototype = constructor.prototype;
    Object.keys(flickingPrototype).forEach(function (name) {
      var method = flickingPrototype[name];

      if (typeof method === "function") {
        prototype[name] = function () {
          var _a;

          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          var result = (_a = this.flicking)[name].apply(_a, args);

          if (result === this.flicking) {
            return this;
          } else {
            return result;
          }
        };
      }
    });
  };
}

var Flicking =
/*#__PURE__*/
function (_super) {
  __extends(Flicking, _super);

  function Flicking() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      cloneCount: 0
    };
    _this.options = __assign({}, DEFAULT_OPTIONS); // differ

    _this.pluginsDiffer = new ListDiffer();

    _this.onUpdate = function (result) {
      if (typeof _this.props.lastIndex === "number") {
        _this.setLastIndex(_this.props.lastIndex);
      }

      _this.flicking.sync(result);

      _this.checkPlugins();

      _this.checkCloneCount();
    };

    return _this;
  } // life cycle


  var __proto = Flicking.prototype;

  __proto.render = function () {
    var props = this.props; // tslint:disable-next-line:naming-convention

    var Tag = props.tag;
    var classPrefix = props.classPrefix;
    var options = this.options;
    var attributes = {};

    for (var name in props) {
      if (name in DEFAULT_OPTIONS) {
        options[name] = props[name];
      } else if (!(name in FLICKING_PROPS)) {
        attributes[name] = props[name];
      }
    }

    return React.createElement(Tag, __assign({}, attributes), React.createElement("div", {
      className: classPrefix + "-viewport"
    }, React.createElement("div", {
      className: classPrefix + "-camera"
    }, React.createElement(ChildrenDiffer, {
      onUpdate: this.onUpdate
    }, this.renderPanels()))));
  };

  __proto.componentDidMount = function () {
    var _this = this;

    this.flicking = new Flicking$1(reactDom.findDOMNode(this), this.options).on({
      moveStart: function (e) {
        return _this.props.onMoveStart(e);
      },
      move: function (e) {
        return _this.props.onMove(e);
      },
      moveEnd: function (e) {
        return _this.props.onMoveEnd(e);
      },
      holdStart: function (e) {
        return _this.props.onHoldStart(e);
      },
      holdEnd: function (e) {
        return _this.props.onHoldEnd(e);
      },
      select: function (e) {
        return _this.props.onSelect(e);
      },
      needPanel: function (e) {
        return _this.props.onNeedPanel(e);
      },
      change: function (e) {
        return _this.props.onChange(e);
      },
      restore: function (e) {
        return _this.props.onRestore(e);
      }
    });

    if (this.props.status) {
      this.setStatus(this.props.status);
    }

    this.checkPlugins();
    this.checkCloneCount();
  };

  __proto.componentWillUnmount = function () {
    this.destroy();
  }; // private


  __proto.checkPlugins = function () {
    var _a = this.pluginsDiffer.update(this.props.plugins),
        list = _a.list,
        added = _a.added,
        removed = _a.removed,
        prevList = _a.prevList;

    this.addPlugins(added.map(function (index) {
      return list[index];
    }));
    this.removePlugins(removed.map(function (index) {
      return prevList[index];
    }));
  };

  __proto.checkCloneCount = function () {
    var cloneCount = this.flicking.getCloneCount();

    if (this.state.cloneCount !== cloneCount) {
      this.setState({
        cloneCount: cloneCount
      });
    }
  };

  __proto.renderPanels = function () {
    var length = this.state.cloneCount;
    var children = React.Children.toArray(this.props.children);
    var arr = children.slice();

    var _loop_1 = function (i) {
      arr = arr.concat(children.map(function (el) {
        return React.createElement(CloneComponent, {
          key: "clone" + i + el.key
        }, el);
      }));
    };

    for (var i = 0; i < length; ++i) {
      _loop_1(i);
    }

    return arr;
  };

  Flicking.defaultProps = FLICKING_PROPS;
  Flicking = __decorate([MappingFlicking()], Flicking);
  return Flicking;
}(React.Component);

module.exports = Flicking;
//# sourceMappingURL=flicking.cjs.js.map
