/*
Copyright (c) 2015-present NAVER Corp.
name: @egjs/flicking
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking
version: 4.0.0-beta.1
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Flicking = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics$1 = function (d, b) {
      extendStatics$1 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics$1(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$1 = function () {
      __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$1.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }
    function __values$2(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read$1(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
          r,
          ar = [],
          e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }
    function __spreadArray(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

      return to;
    }

    /*
    Copyright (c) NAVER Corp.
    name: @egjs/component
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-component
    version: 3.0.1
    */
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __values$1(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
          r,
          ar = [],
          e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }
    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

      return ar;
    }

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    var isUndefined$1 = function (value) {
      return typeof value === "undefined";
    };

    /**
     * Event class to provide additional properties
     * @ko Component에서 추가적인 프로퍼티를 제공하는 이벤트 클래스
     */

    var ComponentEvent =
    /*#__PURE__*/
    function () {
      /**
       * Create a new instance of ComponentEvent.
       * @ko ComponentEvent의 새로운 인스턴스를 생성한다.
       * @param eventType The name of the event.<ko>이벤트 이름.</ko>
       * @param props An object that contains additional event properties.<ko>추가적인 이벤트 프로퍼티 오브젝트.</ko>
       */
      function ComponentEvent(eventType, props) {
        var e_1, _a;

        this.eventType = eventType;
        this._canceled = false;
        if (!props) return;

        try {
          for (var _b = __values$1(Object.keys(props)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

            this[key] = props[key];
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
      /**
       * Stop the event. {@link ComponentEvent#isCanceled} will return `true` after.
       * @ko 이벤트를 중단한다. 이후 {@link ComponentEvent#isCanceled}가 `true`를 반환한다.
       */


      var __proto = ComponentEvent.prototype;

      __proto.stop = function () {
        this._canceled = true;
      };
      /**
       * Returns a boolean value that indicates whether {@link ComponentEvent#stop} is called before.
       * @ko {@link ComponentEvent#stop}이 호출되었는지 여부를 반환한다.
       * @return {boolean} A boolean value that indicates whether {@link ComponentEvent#stop} is called before.<ko>이전에 {@link ComponentEvent#stop}이 불려졌는지 여부를 반환한다.</ko>
       */


      __proto.isCanceled = function () {
        return this._canceled;
      };

      return ComponentEvent;
    }();

    /**
     * A class used to manage events in a component
     * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
     */

    var Component$1 =
    /*#__PURE__*/
    function () {
      /**
       * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
       */
      function Component() {
        this._eventHandler = {};
      }
      /**
       * Trigger a custom event.
       * @ko 커스텀 이벤트를 발생시킨다
       * @param {string | ComponentEvent} event The name of the custom event to be triggered or an instance of the ComponentEvent<ko>발생할 커스텀 이벤트의 이름 또는 ComponentEvent의 인스턴스</ko>
       * @param {any[]} params Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
       * @return An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```ts
       * import Component, { ComponentEvent } from "@egjs/component";
       *
       * class Some extends Component<{
       *   beforeHi: ComponentEvent<{ foo: number; bar: string }>;
       *   hi: { foo: { a: number; b: boolean } };
       *   someEvent: (foo: number, bar: string) => void;
       *   someOtherEvent: void; // When there's no event argument
       * }> {
       *   some(){
       *     if(this.trigger("beforeHi")){ // When event call to stop return false.
       *       this.trigger("hi");// fire hi event.
       *     }
       *   }
       * }
       *
       * const some = new Some();
       * some.on("beforeHi", e => {
       *   if(condition){
       *     e.stop(); // When event call to stop, `hi` event not call.
       *   }
       *   // `currentTarget` is component instance.
       *   console.log(some === e.currentTarget); // true
       *
       *   typeof e.foo; // number
       *   typeof e.bar; // string
       * });
       * some.on("hi", e => {
       *   typeof e.foo.b; // boolean
       * });
       * // If you want to more know event design. You can see article.
       * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
       * ```
       */


      var __proto = Component.prototype;

      __proto.trigger = function (event) {
        var params = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          params[_i - 1] = arguments[_i];
        }

        var eventName = event instanceof ComponentEvent ? event.eventType : event;

        var handlers = __spread(this._eventHandler[eventName] || []);

        if (handlers.length <= 0) {
          return this;
        }

        if (event instanceof ComponentEvent) {
          event.currentTarget = this;
          handlers.forEach(function (handler) {
            handler(event);
          });
        } else {
          handlers.forEach(function (handler) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            handler.apply(void 0, __spread(params));
          });
        }

        return this;
      };
      /**
       * Executed event just one time.
       * @ko 이벤트가 한번만 실행된다.
       * @param {string} eventName The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```ts
       * import Component, { ComponentEvent } from "@egjs/component";
       *
       * class Some extends Component<{
       *   hi: ComponentEvent;
       * }> {
       *   hi() {
       *     alert("hi");
       *   }
       *   thing() {
       *     this.once("hi", this.hi);
       *   }
       * }
       *
       * var some = new Some();
       * some.thing();
       * some.trigger(new ComponentEvent("hi"));
       * // fire alert("hi");
       * some.trigger(new ComponentEvent("hi"));
       * // Nothing happens
       * ```
       */


      __proto.once = function (eventName, handlerToAttach) {
        var _this = this;

        if (typeof eventName === "object" && isUndefined$1(handlerToAttach)) {
          var eventHash = eventName;

          for (var key in eventHash) {
            this.once(key, eventHash[key]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var listener_1 = function () {
            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            } // eslint-disable-next-line @typescript-eslint/no-unsafe-call


            handlerToAttach.apply(void 0, __spread(args));

            _this.off(eventName, listener_1);
          };

          this.on(eventName, listener_1);
        }

        return this;
      };
      /**
       * Checks whether an event has been attached to a component.
       * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
       * @param {string} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
       * @return {boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
       * @example
       * ```ts
       * import Component from "@egjs/component";
       *
       * class Some extends Component<{
       *   hi: void;
       * }> {
       *   some() {
       *     this.hasOn("hi");// check hi event.
       *   }
       * }
       * ```
       */


      __proto.hasOn = function (eventName) {
        return !!this._eventHandler[eventName];
      };
      /**
       * Attaches an event to a component.
       * @ko 컴포넌트에 이벤트를 등록한다.
       * @param {string} eventName The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```ts
       * import Component, { ComponentEvent } from "@egjs/component";
       *
       * class Some extends Component<{
       *   hi: void;
       * }> {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.on("hi",this.hi); //attach event
       *   }
       * }
       * ```
       */


      __proto.on = function (eventName, handlerToAttach) {
        if (typeof eventName === "object" && isUndefined$1(handlerToAttach)) {
          var eventHash = eventName;

          for (var name in eventHash) {
            this.on(name, eventHash[name]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var handlerList = this._eventHandler[eventName];

          if (isUndefined$1(handlerList)) {
            this._eventHandler[eventName] = [];
            handlerList = this._eventHandler[eventName];
          }

          handlerList.push(handlerToAttach);
        }

        return this;
      };
      /**
       * Detaches an event from the component.<br/>If the `eventName` is not given this will detach all event handlers attached.<br/>If the `handlerToDetach` is not given, this will detach all event handlers for `eventName`.
       * @ko 컴포넌트에 등록된 이벤트를 해제한다.<br/>`eventName`이 주어지지 않았을 경우 모든 이벤트 핸들러를 제거한다.<br/>`handlerToAttach`가 주어지지 않았을 경우 `eventName`에 해당하는 모든 이벤트 핸들러를 제거한다.
       * @param {string?} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
       * @param {function?} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```ts
       * import Component, { ComponentEvent } from "@egjs/component";
       *
       * class Some extends Component<{
       *   hi: void;
       * }> {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.off("hi",this.hi); //detach event
       *   }
       * }
       * ```
       */


      __proto.off = function (eventName, handlerToDetach) {
        var e_1, _a; // Detach all event handlers.


        if (isUndefined$1(eventName)) {
          this._eventHandler = {};
          return this;
        } // Detach all handlers for eventname or detach event handlers by object.


        if (isUndefined$1(handlerToDetach)) {
          if (typeof eventName === "string") {
            delete this._eventHandler[eventName];
            return this;
          } else {
            var eventHash = eventName;

            for (var name in eventHash) {
              this.off(name, eventHash[name]);
            }

            return this;
          }
        } // Detach single event handler


        var handlerList = this._eventHandler[eventName];

        if (handlerList) {
          var idx = 0;

          try {
            for (var handlerList_1 = __values$1(handlerList), handlerList_1_1 = handlerList_1.next(); !handlerList_1_1.done; handlerList_1_1 = handlerList_1.next()) {
              var handlerFunction = handlerList_1_1.value;

              if (handlerFunction === handlerToDetach) {
                handlerList.splice(idx, 1);

                if (handlerList.length <= 0) {
                  delete this._eventHandler[eventName];
                }

                break;
              }

              idx++;
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (handlerList_1_1 && !handlerList_1_1.done && (_a = handlerList_1.return)) _a.call(handlerList_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }

        return this;
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @example
       * Component.VERSION;  // ex) 3.0.0
       * @memberof Component
       */


      Component.VERSION = "3.0.1";
      return Component;
    }();

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var ComponentEvent$1 = ComponentEvent;

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Special type of known error that {@link Flicking} throws.
     * @ko Flicking 내부에서 알려진 오류 발생시 throw되는 에러
     * @property {number} code Error code<ko>에러 코드</ko>
     * @property {string} message Error message<ko>에러 메시지</ko>
     * @see {@link Constants.ERROR_CODE ERROR_CODE}
     * @example
     * ```ts
     * import Flicking, { FlickingError, ERROR_CODES } from "@egjs/flicking";
     * try {
     *   const flicking = new Flicking(".flicking-viewport")
     * } catch (e) {
     *   if (e instanceof FlickingError && e.code === ERROR_CODES.ELEMENT_NOT_FOUND) {
     *     console.error("Element not found")
     *   }
     * }
     * ```
     */

    var FlickingError =
    /*#__PURE__*/
    function (_super) {
      __extends$1(FlickingError, _super);
      /**
       * @param message Error message<ko>에러 메시지</ko>
       * @param code Error code<ko>에러 코드</ko>
       */


      function FlickingError(message, code) {
        var _this = _super.call(this, message) || this;

        _this.message = message;
        _this.code = code;
        Object.setPrototypeOf(_this, FlickingError.prototype);
        _this.name = "FlickingError";
        return _this;
      }

      return FlickingError;
    }(Error);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    /* eslint-disable @typescript-eslint/restrict-template-expressions */

    /**
     * Error codes of {@link FlickingError}. Below are the conditions where each error code occurs.
     * @ko {@link FlickingError}의 에러 코드. 아래는 각각의 에러 코드가 발생하는 조건입니다.
     * @name ERROR_CODE
     * @memberof Constants
     * @constant
     * @type object
     * @property {number} WRONG_TYPE Parameter type is wrong<ko>패러미터의 타입이 잘못되었을 경우</ko>
     * @property {number} ELEMENT_NOT_FOUND Element is not found inside page with the given CSS selector<ko>주어진 CSS selector로 페이지 내에서 해당 엘리먼트를 찾지 못했을 경우</ko>
     * @property {number} VAL_MUST_NOT_NULL Expected non-null value, but given `null` or `undefined`<ko>값을 기대했으나, `null`이나 `undefined`를 받은 경우</ko>
     * @property {number} NOT_ATTACHED_TO_FLICKING When Flicking's component is not initialized (i.e. {@link Flicking#init} is not called)<ko>Flicking 내부 컴포넌트가 초기화되지 않은 경우 ({@link Flicking#init}이 호출되지 않은 경우)</ko>
     * @property {number} WRONG_OPTION One of the options is wrong<ko>옵션들 중 잘못된 값이 있을 때</ko>
     * @property {number} INDEX_OUT_OF_RANGE When the given index is out of possible range<ko>인덱스가 주어진 범위를 벗어난 경우</ko>
     * @property {number} POSITION_NOT_REACHABLE When {@link Control#moveToPosition}'s position parameter is out of possible range.<ko>{@link Control#moveToPosition}의 `position` 패러미터가 도달 가능한 범위를 벗어난 경우</ko>
     * @property {number} TRANSFORM_NOT_SUPPORTED CSS `transform` property is not available(<=IE8) <ko>CSS `transform` 속성을 사용할 수 없는 경우(<=IE8)</ko>
     * @property {number} STOP_CALLED_BY_USER When the event's `stop()` is called by user.<ko>사용자에 의해 이벤트의 `stop()`이 호출된 경우</ko>
     * @property {number} ANIMATION_INTERRUPTED When the animation is interrupted by user.<ko>사용자에 의해 애니메이션이 중단된 경우</ko>
     * @property {number} ANIMATION_ALREADY_PLAYING When the animation is already playing.<ko>현재 애니메이션이 이미 진행중인 경우</ko>
     * @property {number} NOT_ALLOWED_IN_FRAMEWORK When the non-allowed method is called from frameworks (React, Angular, Vue...)
     * <ko>프레임워크(React, Angular, Vue ...)에서 사용 불가능한 메소드를 호출했을 경우</ko>
     */
    var CODE = {
      WRONG_TYPE: 0,
      ELEMENT_NOT_FOUND: 1,
      VAL_MUST_NOT_NULL: 2,
      NOT_ATTACHED_TO_FLICKING: 3,
      WRONG_OPTION: 4,
      INDEX_OUT_OF_RANGE: 5,
      POSITION_NOT_REACHABLE: 6,
      TRANSFORM_NOT_SUPPORTED: 7,
      STOP_CALLED_BY_USER: 8,
      ANIMATION_INTERRUPTED: 9,
      ANIMATION_ALREADY_PLAYING: 10,
      NOT_ALLOWED_IN_FRAMEWORK: 11
    };
    var MESSAGE = {
      WRONG_TYPE: function (wrongVal, correctTypes) {
        return wrongVal + "(" + typeof wrongVal + ") is not a " + correctTypes.map(function (type) {
          return "\"" + type + "\"";
        }).join(" or ") + ".";
      },
      ELEMENT_NOT_FOUND: function (selector) {
        return "Element with selector \"" + selector + "\" not found.";
      },
      VAL_MUST_NOT_NULL: function (val, name) {
        return name + " should be provided. Given: " + val;
      },
      NOT_ATTACHED_TO_FLICKING: function (name) {
        return name + " is not attached to the Flicking instance. \"init()\" should be called first.";
      },
      WRONG_OPTION: function (optionName, val) {
        return "Option \"" + optionName + "\" is not in correct format, given: " + val;
      },
      INDEX_OUT_OF_RANGE: function (val, min, max) {
        return "Index \"" + val + "\" is out of range: should be between " + min + " and " + max + ".";
      },
      POSITION_NOT_REACHABLE: function (position) {
        return "Position \"" + position + "\" is not reachable.";
      },
      TRANSFORM_NOT_SUPPORTED: "Browser does not support CSS transform",
      STOP_CALLED_BY_USER: "Event stop() is called by user",
      ANIMATION_INTERRUPTED: "Animation is interrupted by user input",
      ANIMATION_ALREADY_PLAYING: "Animation is already playing",
      NOT_ALLOWED_IN_FRAMEWORK: "This behavior is not allowed in the frameworks like React, Vue, or Angular"
    };

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Event type object with event name strings of {@link Flicking}
     * @ko {@link Flicking}의 이벤트 이름 문자열들을 담은 객체
     * @type {object}
     * @memberof Constants
     * @property {"holdStart"} HOLD_START holdStart event<ko>holdStart 이벤트</ko>
     * @property {"holdEnd"} HOLD_END holdEnd event<ko>holdEnd 이벤트</ko>
     * @property {"moveStart"} MOVE_START moveStart event<ko>moveStart 이벤트</ko>
     * @property {"move"} MOVE move event<ko>move 이벤트</ko>
     * @property {"moveEnd"} MOVE_END moveEnd event<ko>moveEnd 이벤트</ko>
     * @property {"willChange"} WILL_CHANGE willChange event<ko>willChange 이벤트</ko>
     * @property {"changed"} CHANGED changed event<ko>changed 이벤트</ko>
     * @property {"willRestore"} WILL_RESTORE willRestore event<ko>willRestore 이벤트</ko>
     * @property {"restored"} RESTORED restored event<ko>restored 이벤트</ko>
     * @property {"select"} SELECT select event<ko>select 이벤트</ko>
     * @property {"needPanel"} NEED_PANEL needPanel event<ko>needPanel 이벤트</ko>
     * @example
     * ```ts
     * import { EVENTS } from "@egjs/flicking";
     * EVENTS.MOVE_START; // "moveStart"
     * ```
     */

    var EVENTS = {
      READY: "ready",
      BEFORE_RESIZE: "beforeResize",
      AFTER_RESIZE: "afterResize",
      HOLD_START: "holdStart",
      HOLD_END: "holdEnd",
      MOVE_START: "moveStart",
      MOVE: "move",
      MOVE_END: "moveEnd",
      WILL_CHANGE: "willChange",
      CHANGED: "changed",
      WILL_RESTORE: "willRestore",
      RESTORED: "restored",
      SELECT: "select",
      NEED_PANEL: "needPanel",
      VISIBLE_CHANGE: "visibleChange",
      REACH_EDGE: "reachEdge"
    };
    /**
     * An object with all possible predefined literal string for the {@link Flicking#align align} option
     * @ko {@link Flicking#align align} 옵션에 사용되는 미리 정의된 리터럴 상수들을 담고 있는 객체
     * @memberof Constants
     * @type {object}
     * @property {"prev"} PREV left/top align<ko>좌/상 정렬</ko>
     * @property {"center"} CENTER center align<ko>중앙 정렬</ko>
     * @property {"next"} NEXT right/bottom align<ko>우/하 정렬</ko>
     */

    var ALIGN = {
      PREV: "prev",
      CENTER: "center",
      NEXT: "next"
    };
    /**
     * An object of directions
     * @ko 방향을 나타내는 값들을 담고 있는 객체
     * @memberof Constants
     * @type {object}
     * @property {"PREV"} PREV "left" when {@link Flicking#horizontal horizontal} is true, and "top" when {@link Flicking#horizontal horizontal} is false
     * <ko>{@link Flicking#horizontal horizontal}가 `true`일 경우 왼쪽, {@link Flicking#horizontal horizontal}가 `false`일 경우 위쪽을 의미합니다</ko>
     * @property {"NEXT"} NEXT "right" when {@link Flicking#horizontal horizontal} is true, and "bottom" when {@link Flicking#horizontal horizontal} is false
     * <ko>{@link Flicking#horizontal horizontal}가 `true`일 경우 오른쪽, {@link Flicking#horizontal horizontal}가 `false`일 경우 아래쪽을 의미합니다</ko>
     * @property {null} NONE This value usually means it's the same position<ko>주로 제자리인 경우를 의미합니다</ko>
     */

    var DIRECTION = {
      PREV: "PREV",
      NEXT: "NEXT",
      NONE: null
    };
    /**
     * An object with all possible {@link Flicking#moveType moveType}s
     * @ko Flicking이 제공하는 {@link Flicking#moveType moveType}들을 담고 있는 객체
     * @memberof Constants
     * @type {object}
     * @property {"snap"} SNAP Flicking's {@link Flicking#moveType moveType} that enables {@link SnapControl} as a Flicking's {@link Flicking#control control}
     * <ko>Flicking의 {@link Flicking#control control}을 {@link SnapControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
     * @property {"freeScroll"} FREE_SCROLL Flicking's {@link Flicking#moveType moveType} that enables {@link FreeControl} as a Flicking's {@link Flicking#control control}
     * <ko>Flicking의 {@link Flicking#control control}을 {@link FreeControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
     */

    var MOVE_TYPE = {
      SNAP: "snap",
      FREE_SCROLL: "freeScroll"
    };

    var Constants = {
        __proto__: null,
        EVENTS: EVENTS,
        ALIGN: ALIGN,
        DIRECTION: DIRECTION,
        MOVE_TYPE: MOVE_TYPE,
        ERROR_CODE: CODE
    };

    var merge = function (target) {
      var sources = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }

      sources.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
          target[key] = source[key];
        });
      });
      return target;
    };
    var getElement = function (el, parent) {
      var targetEl = null;

      if (isString(el)) {
        var parentEl = parent ? parent : document;
        var queryResult = parentEl.querySelector(el);

        if (!queryResult) {
          throw new FlickingError(MESSAGE.ELEMENT_NOT_FOUND(el), CODE.ELEMENT_NOT_FOUND);
        }

        targetEl = queryResult;
      } else if (el && el.nodeType === Node.ELEMENT_NODE) {
        targetEl = el;
      }

      if (!targetEl) {
        throw new FlickingError(MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), CODE.WRONG_TYPE);
      }

      return targetEl;
    };
    var checkExistence = function (value, nameOnErrMsg) {
      if (value == null) {
        throw new FlickingError(MESSAGE.VAL_MUST_NOT_NULL(value, nameOnErrMsg), CODE.VAL_MUST_NOT_NULL);
      }
    };
    var clamp = function (x, min, max) {
      return Math.max(Math.min(x, max), min);
    };
    var getFlickingAttached = function (val, nameToThrowOnError) {
      if (!val) {
        throw new FlickingError(MESSAGE.NOT_ATTACHED_TO_FLICKING(nameToThrowOnError), CODE.NOT_ATTACHED_TO_FLICKING);
      }

      return val;
    };
    var toArray$2 = function (iterable) {
      return [].slice.call(iterable);
    }; // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

    var isArray = function (arr) {
      return Boolean(arr) && arr.constructor === Array;
    };
    var parseAlign = function (align, size) {
      var alignPoint;

      if (isString(align)) {
        switch (align) {
          case ALIGN.PREV:
            alignPoint = 0;
            break;

          case ALIGN.CENTER:
            alignPoint = 0.5 * size;
            break;

          case ALIGN.NEXT:
            alignPoint = size;
            break;

          default:
            alignPoint = parseArithmeticExpression(align, size);

            if (alignPoint == null) {
              throw new FlickingError(MESSAGE.WRONG_OPTION("align", align), CODE.WRONG_OPTION);
            }

        }
      } else {
        alignPoint = align;
      }

      return alignPoint;
    };
    var parseBounce = function (bounce, size) {
      var parsedBounce;

      if (isArray(bounce)) {
        parsedBounce = bounce.map(function (val) {
          return parseArithmeticExpression(val, size);
        });
      } else {
        var parsedVal = parseArithmeticExpression(bounce, size);
        parsedBounce = [parsedVal, parsedVal];
      }

      return parsedBounce.map(function (val) {
        if (val == null) {
          throw new FlickingError(MESSAGE.WRONG_OPTION("bounce", bounce), CODE.WRONG_OPTION);
        }

        return val;
      });
    };
    var parseArithmeticExpression = function (cssValue, base) {
      var cssRegex = /(?:(\+|\-)\s*)?(\d+(?:\.\d+)?(%|px)?)/g;

      if (typeof cssValue === "number") {
        return cssValue;
      }

      var idx = 0;
      var calculatedValue = 0;
      var matchResult = cssRegex.exec(cssValue);

      while (matchResult != null) {
        var sign = matchResult[1];
        var value = matchResult[2];
        var unit = matchResult[3];
        var parsedValue = parseFloat(value);

        if (idx <= 0) {
          sign = sign || "+";
        } // Return default value for values not in good form


        if (!sign) {
          return null;
        }

        if (unit === "%") {
          parsedValue = parsedValue / 100 * base;
        }

        calculatedValue += sign === "+" ? parsedValue : -parsedValue; // Match next occurrence

        ++idx;
        matchResult = cssRegex.exec(cssValue);
      } // None-matched


      if (idx === 0) {
        return null;
      }

      return calculatedValue;
    };
    var parseCSSSizeValue = function (val) {
      return isString(val) ? val : val + "px";
    };
    var getDirection$1 = function (start, end) {
      if (start === end) return DIRECTION.NONE;
      return start < end ? DIRECTION.NEXT : DIRECTION.PREV;
    };
    var parseElement = function (element) {
      if (!isArray(element)) {
        element = [element];
      }

      var elements = [];
      element.forEach(function (el) {
        if (isString(el)) {
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = el;
          elements.push.apply(elements, __spreadArray([], __read$1(toArray$2(tempDiv.children))));

          while (tempDiv.firstChild) {
            tempDiv.removeChild(tempDiv.firstChild);
          }
        } else if (el && el.nodeType === Node.ELEMENT_NODE) {
          elements.push(el);
        } else {
          throw new FlickingError(MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), CODE.WRONG_TYPE);
        }
      });
      return elements;
    };
    var getMinusCompensatedIndex = function (idx, max) {
      return idx < 0 ? clamp(idx + max, 0, max) : clamp(idx, 0, max);
    };
    var includes = function (array, target) {
      var e_1, _a;

      try {
        for (var array_1 = __values$2(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
          var val = array_1_1.value;
          if (val === target) return true;
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      return false;
    };
    var isString = function (val) {
      return typeof val === "string";
    };
    var circulatePosition = function (pos, min, max) {
      var size = max - min;

      if (pos < min) {
        var offset = (min - pos) % size;
        pos = max - offset;
      } else if (pos > max) {
        var offset = (pos - max) % size;
        pos = min + offset;
      }

      return pos;
    };
    var find$1 = function (array, checker) {
      var e_2, _a;

      try {
        for (var array_2 = __values$2(array), array_2_1 = array_2.next(); !array_2_1.done; array_2_1 = array_2.next()) {
          var val = array_2_1.value;

          if (checker(val)) {
            return val;
          }
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (array_2_1 && !array_2_1.done && (_a = array_2.return)) _a.call(array_2);
        } finally {
          if (e_2) throw e_2.error;
        }
      }

      return null;
    };
    var findRight = function (array, checker) {
      for (var idx = array.length - 1; idx >= 0; idx--) {
        var val = array[idx];

        if (checker(val)) {
          return val;
        }
      }

      return null;
    };
    var findIndex = function (array, checker) {
      for (var idx = 0; idx < array.length; idx++) {
        if (checker(array[idx])) {
          return idx;
        }
      }

      return -1;
    }; // export const getProgress = (pos: number, range: number[]) => {
    //   // start, anchor, end
    //   // -1 , 0 , 1
    //   const [min, center, max] = range;
    //   if (pos > center && (max - center)) {
    //     // 0 ~ 1
    //     return (pos - center) / (max - center);
    //   } else if (pos < center && (center - min)) {
    //     // -1 ~ 0
    //     return (pos - center) / (center - min);
    //   } else if (pos !== center && max - min) {
    //     return (pos - min) / (max - min);
    //   }
    //   return 0;
    // };

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * A component that manages viewport size
     * @ko 뷰포트 크기 정보를 담당하는 컴포넌트
     */

    var Viewport =
    /*#__PURE__*/
    function () {
      /**
       * @param el A viewport element<ko>뷰포트 엘리먼트</ko>
       */
      function Viewport(el) {
        this._el = el;
        this._width = 0;
        this._height = 0;
      }

      var __proto = Viewport.prototype;
      Object.defineProperty(__proto, "element", {
        /**
         * A viewport(root) element
         * @ko 뷰포트(root) 엘리먼트
         * @type {HTMLElement}
         * @readonly
         */
        get: function () {
          return this._el;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "width", {
        /**
         * Viewport width
         * @ko 뷰포트 너비
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._width;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "height", {
        /**
         * Viewport height
         * @ko 뷰포트 높이
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._height;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Change viewport's size.
       * This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property
       * @ko 뷰포트 크기를 변경합니다.
       * `.flicking-viewport` 엘리먼트에 해당 크기의 CSS width/height를 적용합니다
       * @param {object} [size] New viewport size<ko>새 뷰포트 크기</ko>
       * @param {number|string} [size.width] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
       * @param {number|string} [size.height] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
       */

      __proto.setSize = function (_a) {
        var width = _a.width,
            height = _a.height;
        var el = this._el;

        if (width != null) {
          el.style.width = parseCSSSizeValue(width);
        }

        if (height != null) {
          el.style.height = parseCSSSizeValue(height);
        }

        this.resize();
      };
      /**
       * Update width/height to the current viewport element's size
       * @ko 현재 뷰포트 엘리먼트의 크기로 너비/높이를 업데이트합니다
       */


      __proto.resize = function () {
        var el = this._el;
        this._width = el.offsetWidth;
        this._height = el.offsetHeight;
      };

      return Viewport;
    }();

    /*! Hammer.JS - v2.0.17-rc - 2019-12-16
     * http://naver.github.io/egjs
     *
     * Forked By Naver egjs
     * Copyright (c) hammerjs
     * Licensed under the MIT license */
    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    /**
     * @private
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

    var assign$1 = assign;

    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
    var TEST_ELEMENT = typeof document === "undefined" ? {
      style: {}
    } : document.createElement('div');
    var TYPE_FUNCTION = 'function';
    var round = Math.round,
        abs = Math.abs;
    var now = Date.now;

    /**
     * @private
     * get the prefixed property
     * @param {Object} obj
     * @param {String} property
     * @returns {String|Undefined} prefixed
     */

    function prefixed(obj, property) {
      var prefix;
      var prop;
      var camelProp = property[0].toUpperCase() + property.slice(1);
      var i = 0;

      while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = prefix ? prefix + camelProp : property;

        if (prop in obj) {
          return prop;
        }

        i++;
      }

      return undefined;
    }

    /* eslint-disable no-new-func, no-nested-ternary */
    var win$1;

    if (typeof window === "undefined") {
      // window is undefined in node.js
      win$1 = {};
    } else {
      win$1 = window;
    }

    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
    function getTouchActionProps() {
      if (!NATIVE_TOUCH_ACTION) {
        return false;
      }

      var touchMap = {};
      var cssSupports = win$1.CSS && win$1.CSS.supports;
      ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        return touchMap[val] = cssSupports ? win$1.CSS.supports('touch-action', val) : true;
      });
      return touchMap;
    }

    var TOUCH_ACTION_COMPUTE = 'compute';
    var TOUCH_ACTION_AUTO = 'auto';
    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

    var TOUCH_ACTION_NONE = 'none';
    var TOUCH_ACTION_PAN_X = 'pan-x';
    var TOUCH_ACTION_PAN_Y = 'pan-y';
    var TOUCH_ACTION_MAP = getTouchActionProps();

    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
    var SUPPORT_TOUCH$1 = 'ontouchstart' in win$1;
    var SUPPORT_POINTER_EVENTS$1 = prefixed(win$1, 'PointerEvent') !== undefined;
    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH$1 && MOBILE_REGEX.test(navigator.userAgent);
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
     * @private
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
     * @private
     * let a boolean value also be a function that must return a boolean
     * this first item in args will be used as the context
     * @param {Boolean|Function} val
     * @param {Array} [args]
     * @returns {Boolean}
     */

    function boolOrFn(val, args) {
      if (typeof val === TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
      }

      return val;
    }

    /**
     * @private
     * small indexOf wrapper
     * @param {String} str
     * @param {String} find
     * @returns {Boolean} found
     */
    function inStr(str, find) {
      return str.indexOf(find) > -1;
    }

    /**
     * @private
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
      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
      // for different directions, e.g. horizontal pan but vertical swipe?)
      // we need none (as otherwise with pan-x pan-y combined none of these
      // recognizers will work, since the browser would handle all panning

      if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
      } // pan-x OR pan-y


      if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
      } // manipulation


      if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
      }

      return TOUCH_ACTION_AUTO;
    }

    /**
     * @private
     * Touch Action
     * sets the touchAction property or uses the js alternative
     * @param {Manager} manager
     * @param {String} value
     * @constructor
     */

    var TouchAction =
    /*#__PURE__*/
    function () {
      function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
      }
      /**
       * @private
       * set the touchAction value on the element or enable the polyfill
       * @param {String} value
       */


      var _proto = TouchAction.prototype;

      _proto.set = function set(value) {
        // find out the touch-action by the event handlers
        if (value === TOUCH_ACTION_COMPUTE) {
          value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
          this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }

        this.actions = value.toLowerCase().trim();
      };
      /**
       * @private
       * just re-set the touchAction value
       */


      _proto.update = function update() {
        this.set(this.manager.options.touchAction);
      };
      /**
       * @private
       * compute the value for the touchAction property based on the recognizer's settings
       * @returns {String} value
       */


      _proto.compute = function compute() {
        var actions = [];
        each(this.manager.recognizers, function (recognizer) {
          if (boolOrFn(recognizer.options.enable, [recognizer])) {
            actions = actions.concat(recognizer.getTouchAction());
          }
        });
        return cleanTouchActions(actions.join(' '));
      };
      /**
       * @private
       * this method is called on each input cycle and provides the preventing of the browser behavior
       * @param {Object} input
       */


      _proto.preventDefaults = function preventDefaults(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection; // if the touch action did prevented once this session

        if (this.manager.session.prevented) {
          srcEvent.preventDefault();
          return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
          // do not prevent defaults if this is a tap gesture
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

        if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
          return this.preventSrc(srcEvent);
        }
      };
      /**
       * @private
       * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
       * @param {Object} srcEvent
       */


      _proto.preventSrc = function preventSrc(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
      };

      return TouchAction;
    }();

    /**
     * @private
     * find if a node is in the given parent
     * @method hasParent
     * @param {HTMLElement} node
     * @param {HTMLElement} parent
     * @return {Boolean} found
     */
    function hasParent(node, parent) {
      while (node) {
        if (node === parent) {
          return true;
        }

        node = node.parentNode;
      }

      return false;
    }

    /**
     * @private
     * get the center of all the pointers
     * @param {Array} pointers
     * @return {Object} center contains `x` and `y` properties
     */

    function getCenter(pointers) {
      var pointersLength = pointers.length; // no need to loop when only one touch

      if (pointersLength === 1) {
        return {
          x: round(pointers[0].clientX),
          y: round(pointers[0].clientY)
        };
      }

      var x = 0;
      var y = 0;
      var i = 0;

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
     * @private
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
     * @private
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

      var x = p2[props[0]] - p1[props[0]];
      var y = p2[props[1]] - p1[props[1]];
      return Math.sqrt(x * x + y * y);
    }

    /**
     * @private
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

      var x = p2[props[0]] - p1[props[0]];
      var y = p2[props[1]] - p1[props[1]];
      return Math.atan2(y, x) * 180 / Math.PI;
    }

    /**
     * @private
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

    function computeDeltaXY(session, input) {
      var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
      // jscs throwing error on defalut destructured values and without defaults tests fail

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
     * @private
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
     * @private
     * calculate the scale factor between two pointersets
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} scale
     */

    function getScale(start, end) {
      return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
    }

    /**
     * @private
     * calculate the rotation degrees between two pointersets
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} rotation
     */

    function getRotation(start, end) {
      return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
    }

    /**
     * @private
     * velocity is calculated every x ms
     * @param {Object} session
     * @param {Object} input
     */

    function computeIntervalInputData(session, input) {
      var last = session.lastInterval || input;
      var deltaTime = input.timeStamp - last.timeStamp;
      var velocity;
      var velocityX;
      var velocityY;
      var direction;

      if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;
        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
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
    * @private
     * extend the data with some usable properties like scale, rotate, velocity etc
     * @param {Object} manager
     * @param {Object} input
     */

    function computeInputData(manager, input) {
      var session = manager.session;
      var pointers = input.pointers;
      var pointersLength = pointers.length; // store the first input to calculate the distance and direction

      if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
      } // to compute scale and rotation we need to store the multiple touches


      if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
      } else if (pointersLength === 1) {
        session.firstMultiple = false;
      }

      var firstInput = session.firstInput,
          firstMultiple = session.firstMultiple;
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
      input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
      input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
      input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
      input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
      computeIntervalInputData(session, input); // find the correct target

      var target = manager.element;
      var srcEvent = input.srcEvent;
      var srcEventTarget;

      if (srcEvent.composedPath) {
        srcEventTarget = srcEvent.composedPath()[0];
      } else if (srcEvent.path) {
        srcEventTarget = srcEvent.path[0];
      } else {
        srcEventTarget = srcEvent.target;
      }

      if (hasParent(srcEventTarget, target)) {
        target = srcEventTarget;
      }

      input.target = target;
    }

    /**
     * @private
     * handle input events
     * @param {Manager} manager
     * @param {String} eventType
     * @param {Object} input
     */

    function inputHandler(manager, eventType, input) {
      var pointersLen = input.pointers.length;
      var changedPointersLen = input.changedPointers.length;
      var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
      var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
      input.isFirst = !!isFirst;
      input.isFinal = !!isFinal;

      if (isFirst) {
        manager.session = {};
      } // source event is the normalized value of the domEvents
      // like 'touchstart, mouseup, pointerdown'


      input.eventType = eventType; // compute scale, rotation etc

      computeInputData(manager, input); // emit secret event

      manager.emit('hammer.input', input);
      manager.recognize(input);
      manager.session.prevInput = input;
    }

    /**
     * @private
     * split string on whitespace
     * @param {String} str
     * @returns {Array} words
     */
    function splitStr(str) {
      return str.trim().split(/\s+/g);
    }

    /**
     * @private
     * addEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */

    function addEventListeners(target, types, handler) {
      each(splitStr(types), function (type) {
        target.addEventListener(type, handler, false);
      });
    }

    /**
     * @private
     * removeEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */

    function removeEventListeners(target, types, handler) {
      each(splitStr(types), function (type) {
        target.removeEventListener(type, handler, false);
      });
    }

    /**
     * @private
     * get the window object of an element
     * @param {HTMLElement} element
     * @returns {DocumentView|Window}
     */
    function getWindowForElement(element) {
      var doc = element.ownerDocument || element;
      return doc.defaultView || doc.parentWindow || window;
    }

    /**
     * @private
     * create new input type manager
     * @param {Manager} manager
     * @param {Function} callback
     * @returns {Input}
     * @constructor
     */

    var Input =
    /*#__PURE__*/
    function () {
      function Input(manager, callback) {
        var self = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
        // so when disabled the input events are completely bypassed.

        this.domHandler = function (ev) {
          if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
          }
        };

        this.init();
      }
      /**
       * @private
       * should handle the inputEvent data and trigger the callback
       * @virtual
       */


      var _proto = Input.prototype;

      _proto.handler = function handler() {};
      /**
       * @private
       * bind the events
       */


      _proto.init = function init() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
      };
      /**
       * @private
       * unbind the events
       */


      _proto.destroy = function destroy() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
      };

      return Input;
    }();

    /**
     * @private
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
          if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
            // do not use === here, test fails
            return i;
          }

          i++;
        }

        return -1;
      }
    }

    var POINTER_INPUT_MAP = {
      pointerdown: INPUT_START,
      pointermove: INPUT_MOVE,
      pointerup: INPUT_END,
      pointercancel: INPUT_CANCEL,
      pointerout: INPUT_CANCEL
    }; // in IE10 the pointer types is defined as an enum

    var IE10_POINTER_TYPE_ENUM = {
      2: INPUT_TYPE_TOUCH,
      3: INPUT_TYPE_PEN,
      4: INPUT_TYPE_MOUSE,
      5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

    };
    var POINTER_ELEMENT_EVENTS = 'pointerdown';
    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

    if (win$1.MSPointerEvent && !win$1.PointerEvent) {
      POINTER_ELEMENT_EVENTS = 'MSPointerDown';
      POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
    }
    /**
     * @private
     * Pointer events input
     * @constructor
     * @extends Input
     */


    var PointerEventInput =
    /*#__PURE__*/
    function (_Input) {
      _inheritsLoose(PointerEventInput, _Input);

      function PointerEventInput() {
        var _this;

        var proto = PointerEventInput.prototype;
        proto.evEl = POINTER_ELEMENT_EVENTS;
        proto.evWin = POINTER_WINDOW_EVENTS;
        _this = _Input.apply(this, arguments) || this;
        _this.store = _this.manager.session.pointerEvents = [];
        return _this;
      }
      /**
       * @private
       * handle mouse events
       * @param {Object} ev
       */


      var _proto = PointerEventInput.prototype;

      _proto.handler = function handler(ev) {
        var store = this.store;
        var removePointer = false;
        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
        var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

        var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
          if (storeIndex < 0) {
            store.push(ev);
            storeIndex = store.length - 1;
          }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
          removePointer = true;
        } // it not found, so the pointer hasn't been down (so it's probably a hover)


        if (storeIndex < 0) {
          return;
        } // update the event in the store


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
      };

      return PointerEventInput;
    }(Input);

    /**
     * @private
     * convert array-like objects to real arrays
     * @param {Object} obj
     * @returns {Array}
     */
    function toArray$1(obj) {
      return Array.prototype.slice.call(obj, 0);
    }

    /**
     * @private
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
          results = results.sort(function (a, b) {
            return a[key] > b[key];
          });
        }
      }

      return results;
    }

    var TOUCH_INPUT_MAP = {
      touchstart: INPUT_START,
      touchmove: INPUT_MOVE,
      touchend: INPUT_END,
      touchcancel: INPUT_CANCEL
    };
    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
    /**
     * @private
     * Multi-user touch events input
     * @constructor
     * @extends Input
     */

    var TouchInput =
    /*#__PURE__*/
    function (_Input) {
      _inheritsLoose(TouchInput, _Input);

      function TouchInput() {
        var _this;

        TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
        _this = _Input.apply(this, arguments) || this;
        _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

        return _this;
      }

      var _proto = TouchInput.prototype;

      _proto.handler = function handler(ev) {
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
      };

      return TouchInput;
    }(Input);

    function getTouches(ev, type) {
      var allTouches = toArray$1(ev.touches);
      var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

      if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
      }

      var i;
      var targetTouches;
      var changedTouches = toArray$1(ev.changedTouches);
      var changedTargetTouches = [];
      var target = this.target; // get target touches from touches

      targetTouches = allTouches.filter(function (touch) {
        return hasParent(touch.target, target);
      }); // collect touches

      if (type === INPUT_START) {
        i = 0;

        while (i < targetTouches.length) {
          targetIds[targetTouches[i].identifier] = true;
          i++;
        }
      } // filter changed touches to only contain touches that exist in the collected target ids


      i = 0;

      while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
          changedTargetTouches.push(changedTouches[i]);
        } // cleanup removed touches


        if (type & (INPUT_END | INPUT_CANCEL)) {
          delete targetIds[changedTouches[i].identifier];
        }

        i++;
      }

      if (!changedTargetTouches.length) {
        return;
      }

      return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
      uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
    }

    var MOUSE_INPUT_MAP = {
      mousedown: INPUT_START,
      mousemove: INPUT_MOVE,
      mouseup: INPUT_END
    };
    var MOUSE_ELEMENT_EVENTS = 'mousedown';
    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
    /**
     * @private
     * Mouse events input
     * @constructor
     * @extends Input
     */

    var MouseInput =
    /*#__PURE__*/
    function (_Input) {
      _inheritsLoose(MouseInput, _Input);

      function MouseInput() {
        var _this;

        var proto = MouseInput.prototype;
        proto.evEl = MOUSE_ELEMENT_EVENTS;
        proto.evWin = MOUSE_WINDOW_EVENTS;
        _this = _Input.apply(this, arguments) || this;
        _this.pressed = false; // mousedown state

        return _this;
      }
      /**
       * @private
       * handle mouse events
       * @param {Object} ev
       */


      var _proto = MouseInput.prototype;

      _proto.handler = function handler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

        if (eventType & INPUT_START && ev.button === 0) {
          this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
          eventType = INPUT_END;
        } // mouse must be down


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
      };

      return MouseInput;
    }(Input);

    /**
     * @private
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

    function setLastTouch(eventData) {
      var _eventData$changedPoi = eventData.changedPointers,
          touch = _eventData$changedPoi[0];

      if (touch.identifier === this.primaryTouch) {
        var lastTouch = {
          x: touch.clientX,
          y: touch.clientY
        };
        var lts = this.lastTouches;
        this.lastTouches.push(lastTouch);

        var removeLastTouch = function removeLastTouch() {
          var i = lts.indexOf(lastTouch);

          if (i > -1) {
            lts.splice(i, 1);
          }
        };

        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
      }
    }

    function recordTouches(eventType, eventData) {
      if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
      }
    }

    function isSyntheticEvent(eventData) {
      var x = eventData.srcEvent.clientX;
      var y = eventData.srcEvent.clientY;

      for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x);
        var dy = Math.abs(y - t.y);

        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
          return true;
        }
      }

      return false;
    }

    var TouchMouseInput =
    /*#__PURE__*/
    function () {
      var TouchMouseInput =
      /*#__PURE__*/
      function (_Input) {
        _inheritsLoose(TouchMouseInput, _Input);

        function TouchMouseInput(_manager, callback) {
          var _this;

          _this = _Input.call(this, _manager, callback) || this;

          _this.handler = function (manager, inputEvent, inputData) {
            var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
            var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

            if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
              return;
            } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


            if (isTouch) {
              recordTouches.call(_assertThisInitialized(_assertThisInitialized(_this)), inputEvent, inputData);
            } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized(_assertThisInitialized(_this)), inputData)) {
              return;
            }

            _this.callback(manager, inputEvent, inputData);
          };

          _this.touch = new TouchInput(_this.manager, _this.handler);
          _this.mouse = new MouseInput(_this.manager, _this.handler);
          _this.primaryTouch = null;
          _this.lastTouches = [];
          return _this;
        }
        /**
         * @private
         * handle mouse and touch events
         * @param {Hammer} manager
         * @param {String} inputEvent
         * @param {Object} inputData
         */


        var _proto = TouchMouseInput.prototype;

        /**
         * @private
         * remove the event listeners
         */
        _proto.destroy = function destroy() {
          this.touch.destroy();
          this.mouse.destroy();
        };

        return TouchMouseInput;
      }(Input);

      return TouchMouseInput;
    }();

    /**
     * @private
     * create new input type manager
     * called by the Manager constructor
     * @param {Hammer} manager
     * @returns {Input}
     */

    function createInputInstance(manager) {
      var Type; // let inputClass = manager.options.inputClass;

      var inputClass = manager.options.inputClass;

      if (inputClass) {
        Type = inputClass;
      } else if (SUPPORT_POINTER_EVENTS$1) {
        Type = PointerEventInput;
      } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
      } else if (!SUPPORT_TOUCH$1) {
        Type = MouseInput;
      } else {
        Type = TouchMouseInput;
      }

      return new Type(manager, inputHandler);
    }

    /**
     * @private
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

    var STATE_POSSIBLE = 1;
    var STATE_BEGAN = 2;
    var STATE_CHANGED = 4;
    var STATE_ENDED = 8;
    var STATE_RECOGNIZED = STATE_ENDED;
    var STATE_CANCELLED = 16;
    var STATE_FAILED = 32;

    /**
     * @private
     * get a unique id
     * @returns {number} uniqueId
     */
    var _uniqueId = 1;
    function uniqueId() {
      return _uniqueId++;
    }

    /**
     * @private
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
     * @private
     * get a usable string, used as event postfix
     * @param {constant} state
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
     * @private
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

    /**
     * @private
     * Recognizer
     * Every recognizer needs to extend from this class.
     * @constructor
     * @param {Object} options
     */

    var Recognizer =
    /*#__PURE__*/
    function () {
      function Recognizer(options) {
        if (options === void 0) {
          options = {};
        }

        this.options = _extends({
          enable: true
        }, options);
        this.id = uniqueId();
        this.manager = null; // default is enable true

        this.state = STATE_POSSIBLE;
        this.simultaneous = {};
        this.requireFail = [];
      }
      /**
       * @private
       * set options
       * @param {Object} options
       * @return {Recognizer}
       */


      var _proto = Recognizer.prototype;

      _proto.set = function set(options) {
        assign$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

        this.manager && this.manager.touchAction.update();
        return this;
      };
      /**
       * @private
       * recognize simultaneous with an other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */


      _proto.recognizeWith = function recognizeWith(otherRecognizer) {
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
      };
      /**
       * @private
       * drop the simultaneous link. it doesnt remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */


      _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
          return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
      };
      /**
       * @private
       * recognizer can only run when an other is failing
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */


      _proto.requireFailure = function requireFailure(otherRecognizer) {
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
      };
      /**
       * @private
       * drop the requireFailure link. it does not remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */


      _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
          return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);

        if (index > -1) {
          this.requireFail.splice(index, 1);
        }

        return this;
      };
      /**
       * @private
       * has require failures boolean
       * @returns {boolean}
       */


      _proto.hasRequireFailures = function hasRequireFailures() {
        return this.requireFail.length > 0;
      };
      /**
       * @private
       * if the recognizer can recognize simultaneous with an other recognizer
       * @param {Recognizer} otherRecognizer
       * @returns {Boolean}
       */


      _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
      };
      /**
       * @private
       * You should use `tryEmit` instead of `emit` directly to check
       * that all the needed recognizers has failed before emitting.
       * @param {Object} input
       */


      _proto.emit = function emit(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
          self.manager.emit(event, input);
        } // 'panstart' and 'panmove'


        if (state < STATE_ENDED) {
          emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) {
          // additional event(panleft, panright, pinchin, pinchout...)
          emit(input.additionalEvent);
        } // panend and pancancel


        if (state >= STATE_ENDED) {
          emit(self.options.event + stateStr(state));
        }
      };
      /**
       * @private
       * Check that all the require failure recognizers has failed,
       * if true, it emits a gesture event,
       * otherwise, setup the state to FAILED.
       * @param {Object} input
       */


      _proto.tryEmit = function tryEmit(input) {
        if (this.canEmit()) {
          return this.emit(input);
        } // it's failing anyway


        this.state = STATE_FAILED;
      };
      /**
       * @private
       * can we emit?
       * @returns {boolean}
       */


      _proto.canEmit = function canEmit() {
        var i = 0;

        while (i < this.requireFail.length) {
          if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
            return false;
          }

          i++;
        }

        return true;
      };
      /**
       * @private
       * update the recognizer
       * @param {Object} inputData
       */


      _proto.recognize = function recognize(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign$1({}, inputData); // is is enabled and allow recognizing?

        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
          this.reset();
          this.state = STATE_FAILED;
          return;
        } // reset when we've reached the end


        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
          this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
        // so trigger an event

        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
          this.tryEmit(inputDataClone);
        }
      };
      /**
       * @private
       * return the state of the recognizer
       * the actual recognizing happens in this method
       * @virtual
       * @param {Object} inputData
       * @returns {constant} STATE
       */

      /* jshint ignore:start */


      _proto.process = function process(inputData) {};
      /* jshint ignore:end */

      /**
       * @private
       * return the preferred touch-action
       * @virtual
       * @returns {Array}
       */


      _proto.getTouchAction = function getTouchAction() {};
      /**
       * @private
       * called when the gesture isn't allowed to recognize
       * like when another is being recognized or it is disabled
       * @virtual
       */


      _proto.reset = function reset() {};

      return Recognizer;
    }();

    /**
     * @private
     * This recognizer is just used as a base for the simple attribute recognizers.
     * @constructor
     * @extends Recognizer
     */

    var AttrRecognizer =
    /*#__PURE__*/
    function (_Recognizer) {
      _inheritsLoose(AttrRecognizer, _Recognizer);

      function AttrRecognizer(options) {
        if (options === void 0) {
          options = {};
        }

        return _Recognizer.call(this, _extends({
          pointers: 1
        }, options)) || this;
      }
      /**
       * @private
       * Used to check if it the recognizer receives valid input, like input.distance > 10.
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {Boolean} recognized
       */


      var _proto = AttrRecognizer.prototype;

      _proto.attrTest = function attrTest(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
      };
      /**
       * @private
       * Process the input and return the state for the recognizer
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {*} State
       */


      _proto.process = function process(input) {
        var state = this.state;
        var eventType = input.eventType;
        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

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
      };

      return AttrRecognizer;
    }(Recognizer);

    /**
     * @private
     * direction cons to string
     * @param {constant} direction
     * @returns {String}
     */

    function directionStr(direction) {
      if (direction === DIRECTION_DOWN) {
        return 'down';
      } else if (direction === DIRECTION_UP) {
        return 'up';
      } else if (direction === DIRECTION_LEFT) {
        return 'left';
      } else if (direction === DIRECTION_RIGHT) {
        return 'right';
      }

      return '';
    }

    /**
     * @private
     * Pan
     * Recognized when the pointer is down and moved in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */

    var PanRecognizer =
    /*#__PURE__*/
    function (_AttrRecognizer) {
      _inheritsLoose(PanRecognizer, _AttrRecognizer);

      function PanRecognizer(options) {
        var _this;

        if (options === void 0) {
          options = {};
        }

        _this = _AttrRecognizer.call(this, _extends({
          event: 'pan',
          threshold: 10,
          pointers: 1,
          direction: DIRECTION_ALL
        }, options)) || this;
        _this.pX = null;
        _this.pY = null;
        return _this;
      }

      var _proto = PanRecognizer.prototype;

      _proto.getTouchAction = function getTouchAction() {
        var direction = this.options.direction;
        var actions = [];

        if (direction & DIRECTION_HORIZONTAL) {
          actions.push(TOUCH_ACTION_PAN_Y);
        }

        if (direction & DIRECTION_VERTICAL) {
          actions.push(TOUCH_ACTION_PAN_X);
        }

        return actions;
      };

      _proto.directionTest = function directionTest(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY; // lock to axis?

        if (!(direction & options.direction)) {
          if (options.direction & DIRECTION_HORIZONTAL) {
            direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
            hasMoved = x !== this.pX;
            distance = Math.abs(input.deltaX);
          } else {
            direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
            hasMoved = y !== this.pY;
            distance = Math.abs(input.deltaY);
          }
        }

        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
      };

      _proto.attrTest = function attrTest(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
        this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
      };

      _proto.emit = function emit(input) {
        this.pX = input.deltaX;
        this.pY = input.deltaY;
        var direction = directionStr(input.direction);

        if (direction) {
          input.additionalEvent = this.options.event + direction;
        }

        _AttrRecognizer.prototype.emit.call(this, input);
      };

      return PanRecognizer;
    }(AttrRecognizer);

    var defaults = {
      /**
       * @private
       * set if DOM events are being triggered.
       * But this is slower and unused by simple implementations, so disabled by default.
       * @type {Boolean}
       * @default false
       */
      domEvents: false,

      /**
       * @private
       * The value for the touchAction property/fallback.
       * When set to `compute` it will magically set the correct value based on the added recognizers.
       * @type {String}
       * @default compute
       */
      touchAction: TOUCH_ACTION_COMPUTE,

      /**
       * @private
       * @type {Boolean}
       * @default true
       */
      enable: true,

      /**
       * @private
       * EXPERIMENTAL FEATURE -- can be removed/changed
       * Change the parent input target element.
       * If Null, then it is being set the to main element.
       * @type {Null|EventTarget}
       * @default null
       */
      inputTarget: null,

      /**
       * @private
       * force an input class
       * @type {Null|Function}
       * @default null
       */
      inputClass: null,

      /**
       * @private
       * Some CSS properties can be used to improve the working of Hammer.
       * Add them to this method and they will be set when creating a new Manager.
       * @namespace
       */
      cssProps: {
        /**
         * @private
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: "none",

        /**
         * @private
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: "none",

        /**
         * @private
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: "none",

        /**
         * @private
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: "none",

        /**
         * @private
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: "none",

        /**
         * @private
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };

    var STOP = 1;
    var FORCED_STOP = 2;
    /**
     * @private
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
      each(manager.options.cssProps, function (value, name) {
        prop = prefixed(element.style, name);

        if (add) {
          manager.oldCssProps[prop] = element.style[prop];
          element.style[prop] = value;
        } else {
          element.style[prop] = manager.oldCssProps[prop] || "";
        }
      });

      if (!add) {
        manager.oldCssProps = {};
      }
    }
    /**
     * @private
     * trigger dom event
     * @param {String} event
     * @param {Object} data
     */


    function triggerDomEvent(event, data) {
      var gestureEvent = document.createEvent("Event");
      gestureEvent.initEvent(event, true, true);
      gestureEvent.gesture = data;
      data.target.dispatchEvent(gestureEvent);
    }
    /**
    * @private
     * Manager
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */


    var Manager =
    /*#__PURE__*/
    function () {
      function Manager(element, options) {
        var _this = this;

        this.options = assign$1({}, defaults, options || {});
        this.options.inputTarget = this.options.inputTarget || element;
        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};
        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);
        toggleCssProps(this, true);
        each(this.options.recognizers, function (item) {
          var recognizer = _this.add(new item[0](item[1]));

          item[2] && recognizer.recognizeWith(item[2]);
          item[3] && recognizer.requireFailure(item[3]);
        }, this);
      }
      /**
       * @private
       * set options
       * @param {Object} options
       * @returns {Manager}
       */


      var _proto = Manager.prototype;

      _proto.set = function set(options) {
        assign$1(this.options, options); // Options that need a little more setup

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
      };
      /**
       * @private
       * stop recognizing for this session.
       * This session will be discarded, when a new [input]start event is fired.
       * When forced, the recognizer cycle is stopped immediately.
       * @param {Boolean} [force]
       */


      _proto.stop = function stop(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
      };
      /**
       * @private
       * run the recognizers!
       * called by the inputHandler function on every movement of the pointers (touches)
       * it walks through all the recognizers and tries to detect the gesture that is being made
       * @param {Object} inputData
       */


      _proto.recognize = function recognize(inputData) {
        var session = this.session;

        if (session.stopped) {
          return;
        } // run the touch-action polyfill


        this.touchAction.preventDefaults(inputData);
        var recognizer;
        var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`

        var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
        // or when we're in a new session

        if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
          session.curRecognizer = null;
          curRecognizer = null;
        }

        var i = 0;

        while (i < recognizers.length) {
          recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
          // 1.   allow if the session is NOT forced stopped (see the .stop() method)
          // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
          //      that is being recognized.
          // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
          //      this can be setup with the `recognizeWith()` method on the recognizer.

          if (session.stopped !== FORCED_STOP && ( // 1
          !curRecognizer || recognizer === curRecognizer || // 2
          recognizer.canRecognizeWith(curRecognizer))) {
            // 3
            recognizer.recognize(inputData);
          } else {
            recognizer.reset();
          } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
          // current active recognizer. but only if we don't already have an active recognizer


          if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
            session.curRecognizer = recognizer;
            curRecognizer = recognizer;
          }

          i++;
        }
      };
      /**
       * @private
       * get a recognizer by its event name.
       * @param {Recognizer|String} recognizer
       * @returns {Recognizer|Null}
       */


      _proto.get = function get(recognizer) {
        if (recognizer instanceof Recognizer) {
          return recognizer;
        }

        var recognizers = this.recognizers;

        for (var i = 0; i < recognizers.length; i++) {
          if (recognizers[i].options.event === recognizer) {
            return recognizers[i];
          }
        }

        return null;
      };
      /**
       * @private add a recognizer to the manager
       * existing recognizers with the same event name will be removed
       * @param {Recognizer} recognizer
       * @returns {Recognizer|Manager}
       */


      _proto.add = function add(recognizer) {
        if (invokeArrayArg(recognizer, "add", this)) {
          return this;
        } // remove existing


        var existing = this.get(recognizer.options.event);

        if (existing) {
          this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;
        this.touchAction.update();
        return recognizer;
      };
      /**
       * @private
       * remove a recognizer by name or instance
       * @param {Recognizer|String} recognizer
       * @returns {Manager}
       */


      _proto.remove = function remove(recognizer) {
        if (invokeArrayArg(recognizer, "remove", this)) {
          return this;
        }

        var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

        if (recognizer) {
          var recognizers = this.recognizers;
          var index = inArray(recognizers, targetRecognizer);

          if (index !== -1) {
            recognizers.splice(index, 1);
            this.touchAction.update();
          }
        }

        return this;
      };
      /**
       * @private
       * bind event
       * @param {String} events
       * @param {Function} handler
       * @returns {EventEmitter} this
       */


      _proto.on = function on(events, handler) {
        if (events === undefined || handler === undefined) {
          return this;
        }

        var handlers = this.handlers;
        each(splitStr(events), function (event) {
          handlers[event] = handlers[event] || [];
          handlers[event].push(handler);
        });
        return this;
      };
      /**
       * @private unbind event, leave emit blank to remove all handlers
       * @param {String} events
       * @param {Function} [handler]
       * @returns {EventEmitter} this
       */


      _proto.off = function off(events, handler) {
        if (events === undefined) {
          return this;
        }

        var handlers = this.handlers;
        each(splitStr(events), function (event) {
          if (!handler) {
            delete handlers[event];
          } else {
            handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
          }
        });
        return this;
      };
      /**
       * @private emit event to the listeners
       * @param {String} event
       * @param {Object} data
       */


      _proto.emit = function emit(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
          triggerDomEvent(event, data);
        } // no handlers, so skip it all


        var handlers = this.handlers[event] && this.handlers[event].slice();

        if (!handlers || !handlers.length) {
          return;
        }

        data.type = event;

        data.preventDefault = function () {
          data.srcEvent.preventDefault();
        };

        var i = 0;

        while (i < handlers.length) {
          handlers[i](data);
          i++;
        }
      };
      /**
       * @private
       * destroy the manager and unbinds all events
       * it doesn't unbind dom events, that is the user own responsibility
       */


      _proto.destroy = function destroy() {
        this.element && toggleCssProps(this, false);
        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
      };

      return Manager;
    }();

    /*
    Copyright (c) 2015 NAVER Corp.
    name: @egjs/agent
    license: MIT
    author: NAVER Corp.
    repository: git+https://github.com/naver/agent.git
    version: 2.3.0
    */
    function some(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
          return true;
        }
      }

      return false;
    }
    function find(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
          return arr[i];
        }
      }

      return null;
    }
    function getUserAgent(agent) {
      var userAgent = agent;

      if (typeof userAgent === "undefined") {
        if (typeof navigator === "undefined" || !navigator) {
          return "";
        }

        userAgent = navigator.userAgent || "";
      }

      return userAgent.toLowerCase();
    }
    function execRegExp(pattern, text) {
      try {
        return new RegExp(pattern, "g").exec(text);
      } catch (e) {
        return null;
      }
    }
    function hasUserAgentData() {
      if (typeof navigator === "undefined" || !navigator || !navigator.userAgentData) {
        return false;
      }

      var userAgentData = navigator.userAgentData;
      var brands = userAgentData.brands || userAgentData.uaList;
      return !!(brands && brands.length);
    }
    function findVersion(versionTest, userAgent) {
      var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", userAgent);
      return result ? result[3] : "";
    }
    function convertVersion(text) {
      return text.replace(/_/g, ".");
    }
    function findPreset(presets, userAgent) {
      var userPreset = null;
      var version = "-1";
      some(presets, function (preset) {
        var result = execRegExp("(" + preset.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);

        if (!result || preset.brand) {
          return false;
        }

        userPreset = preset;
        version = result[3] || "-1";

        if (preset.versionAlias) {
          version = preset.versionAlias;
        } else if (preset.versionTest) {
          version = findVersion(preset.versionTest.toLowerCase(), userAgent) || version;
        }

        version = convertVersion(version);
        return true;
      });
      return {
        preset: userPreset,
        version: version
      };
    }
    function findPresetBrand(presets, brands) {
      var brandInfo = {
        brand: "",
        version: "-1"
      };
      some(presets, function (preset) {
        var result = findBrand(brands, preset);

        if (!result) {
          return false;
        }

        brandInfo.brand = preset.id;
        brandInfo.version = preset.versionAlias || result.version;
        return brandInfo.version !== "-1";
      });
      return brandInfo;
    }
    function findBrand(brands, preset) {
      return find(brands, function (_a) {
        var brand = _a.brand;
        return execRegExp("" + preset.test, brand.toLowerCase());
      });
    }

    var BROWSER_PRESETS = [{
      test: "phantomjs",
      id: "phantomjs"
    }, {
      test: "whale",
      id: "whale"
    }, {
      test: "edgios|edge|edg",
      id: "edge"
    }, {
      test: "msie|trident|windows phone",
      id: "ie",
      versionTest: "iemobile|msie|rv"
    }, {
      test: "miuibrowser",
      id: "miui browser"
    }, {
      test: "samsungbrowser",
      id: "samsung internet"
    }, {
      test: "samsung",
      id: "samsung internet",
      versionTest: "version"
    }, {
      test: "chrome|crios",
      id: "chrome"
    }, {
      test: "firefox|fxios",
      id: "firefox"
    }, {
      test: "android",
      id: "android browser",
      versionTest: "version"
    }, {
      test: "safari|iphone|ipad|ipod",
      id: "safari",
      versionTest: "version"
    }]; // chromium's engine(blink) is based on applewebkit 537.36.

    var CHROMIUM_PRESETS = [{
      test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
      id: "chrome",
      versionTest: "chrome"
    }, {
      test: "chromium",
      id: "chrome"
    }, {
      test: "whale",
      id: "chrome",
      versionAlias: "-1",
      brand: true
    }];
    var WEBKIT_PRESETS = [{
      test: "applewebkit",
      id: "webkit",
      versionTest: "applewebkit|safari"
    }];
    var WEBVIEW_PRESETS = [{
      test: "(?=(iphone|ipad))(?!(.*version))",
      id: "webview"
    }, {
      test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
      id: "webview"
    }, {
      // test webview
      test: "webview",
      id: "webview"
    }];
    var OS_PRESETS = [{
      test: "windows phone",
      id: "windows phone"
    }, {
      test: "windows 2000",
      id: "window",
      versionAlias: "5.0"
    }, {
      test: "windows nt",
      id: "window"
    }, {
      test: "iphone|ipad|ipod",
      id: "ios",
      versionTest: "iphone os|cpu os"
    }, {
      test: "mac os x",
      id: "mac"
    }, {
      test: "android",
      id: "android"
    }, {
      test: "tizen",
      id: "tizen"
    }, {
      test: "webos|web0s",
      id: "webos"
    }];

    function parseUserAgentData(osData) {
      var userAgentData = navigator.userAgentData;
      var brands = (userAgentData.uaList || userAgentData.brands).slice();
      var isMobile = userAgentData.mobile || false;
      var firstBrand = brands[0];
      var browser = {
        name: firstBrand.brand,
        version: firstBrand.version,
        majorVersion: -1,
        webkit: false,
        webkitVersion: "-1",
        chromium: false,
        chromiumVersion: "-1",
        webview: !!findPresetBrand(WEBVIEW_PRESETS, brands).brand
      };
      var os = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
      };
      browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function (preset) {
        return findBrand(brands, preset);
      });
      var chromiumBrand = findPresetBrand(CHROMIUM_PRESETS, brands);
      browser.chromium = !!chromiumBrand.brand;
      browser.chromiumVersion = chromiumBrand.version;

      if (!browser.chromium) {
        var webkitBrand = findPresetBrand(WEBKIT_PRESETS, brands);
        browser.webkit = !!webkitBrand.brand;
        browser.webkitVersion = webkitBrand.version;
      }

      if (osData) {
        var platform_1 = osData.platform.toLowerCase();
        var result = find(OS_PRESETS, function (preset) {
          return new RegExp("" + preset.test, "g").exec(platform_1);
        });
        os.name = result ? result.id : platform_1;
        os.version = osData.platformVersion;
      }

      var browserBrand = findPresetBrand(BROWSER_PRESETS, brands);

      if (browserBrand.brand) {
        browser.name = browserBrand.brand;
        browser.version = osData ? osData.uaFullVersion : browserBrand.version;
      }

      if (navigator.platform === "Linux armv8l") {
        os.name = "android";
      } else if (browser.webkit) {
        os.name = isMobile ? "ios" : "mac";
      }

      if (os.name === "ios" && browser.webview) {
        browser.version = "-1";
      }

      os.version = convertVersion(os.version);
      browser.version = convertVersion(browser.version);
      os.majorVersion = parseInt(os.version, 10);
      browser.majorVersion = parseInt(browser.version, 10);
      return {
        browser: browser,
        os: os,
        isMobile: isMobile,
        isHints: true
      };
    }

    function parseUserAgent(userAgent) {
      var nextAgent = getUserAgent(userAgent);
      var isMobile = !!/mobi/g.exec(nextAgent);
      var browser = {
        name: "unknown",
        version: "-1",
        majorVersion: -1,
        webview: !!findPreset(WEBVIEW_PRESETS, nextAgent).preset,
        chromium: false,
        chromiumVersion: "-1",
        webkit: false,
        webkitVersion: "-1"
      };
      var os = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
      };

      var _a = findPreset(BROWSER_PRESETS, nextAgent),
          browserPreset = _a.preset,
          browserVersion = _a.version;

      var _b = findPreset(OS_PRESETS, nextAgent),
          osPreset = _b.preset,
          osVersion = _b.version;

      var chromiumPreset = findPreset(CHROMIUM_PRESETS, nextAgent);
      browser.chromium = !!chromiumPreset.preset;
      browser.chromiumVersion = chromiumPreset.version;

      if (!browser.chromium) {
        var webkitPreset = findPreset(WEBKIT_PRESETS, nextAgent);
        browser.webkit = !!webkitPreset.preset;
        browser.webkitVersion = webkitPreset.version;
      }

      if (osPreset) {
        os.name = osPreset.id;
        os.version = osVersion;
        os.majorVersion = parseInt(osVersion, 10);
      }

      if (browserPreset) {
        browser.name = browserPreset.id;
        browser.version = browserVersion;

        if (browser.webview && os.name === "ios" && browser.name !== "safari") {
          browser.webview = false;
        }
      }

      browser.majorVersion = parseInt(browser.version, 10);
      return {
        browser: browser,
        os: os,
        isMobile: isMobile,
        isHints: false
      };
    }
    /**
     * Extracts browser and operating system information from the user agent string.
     * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
     * @function eg.agent#agent
     * @param - user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
     * @return - agent Info <ko> 에이전트 정보 </ko>
     * @example
    import agent from "@egjs/agent";
    // eg.agent();
    const { os, browser, isMobile } = agent();
     */

    function agent(userAgent) {
      if (typeof userAgent === "undefined" && hasUserAgentData()) {
        return parseUserAgentData();
      } else {
        return parseUserAgent(userAgent);
      }
    }

    /*
    Copyright (c) NAVER Corp.
    name: @egjs/component
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-component
    version: 2.2.2
    */
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    function isUndefined(value) {
      return typeof value === "undefined";
    }
    /**
     * A class used to manage events in a component
     * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
     * @alias eg.Component
     */


    var Component =
    /*#__PURE__*/
    function () {
      /**
       * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
       */
      function Component() {
        /**
         * @deprecated
         * @private
         */
        this.options = {};
        this._eventHandler = {};
      }
      /**
       * Triggers a custom event.
       * @ko 커스텀 이벤트를 발생시킨다
       * @param {string} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
       * @param {object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
       * @param {any[]} restParam Additional parameters when triggering a custom event <ko>커스텀 이벤트가 발생할 때 필요시 추가적으로 전달할 데이터</ko>
       * @return Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   some(){
       *     if(this.trigger("beforeHi")){ // When event call to stop return false.
       *       this.trigger("hi");// fire hi event.
       *     }
       *   }
       * }
       *
       * const some = new Some();
       * some.on("beforeHi", (e) => {
       *   if(condition){
       *     e.stop(); // When event call to stop, `hi` event not call.
       *   }
       * });
       * some.on("hi", (e) => {
       *   // `currentTarget` is component instance.
       *   console.log(some === e.currentTarget); // true
       * });
       * // If you want to more know event design. You can see article.
       * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
       * ```
       */


      var __proto = Component.prototype;

      __proto.trigger = function (eventName) {
        var _this = this;

        var params = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          params[_i - 1] = arguments[_i];
        }

        var handlerList = this._eventHandler[eventName] || [];
        var hasHandlerList = handlerList.length > 0;

        if (!hasHandlerList) {
          return true;
        }

        var customEvent = params[0] || {};
        var restParams = params.slice(1); // If detach method call in handler in first time then handler list calls.

        handlerList = handlerList.concat();
        var isCanceled = false; // This should be done like this to pass previous tests

        customEvent.eventType = eventName;

        customEvent.stop = function () {
          isCanceled = true;
        };

        customEvent.currentTarget = this;
        var arg = [customEvent];

        if (restParams.length >= 1) {
          arg = arg.concat(restParams);
        }

        handlerList.forEach(function (handler) {
          handler.apply(_this, arg);
        });
        return !isCanceled;
      };
      /**
       * Executed event just one time.
       * @ko 이벤트가 한번만 실행된다.
       * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       * hi() {
       *   alert("hi");
       * }
       * thing() {
       *   this.once("hi", this.hi);
       * }
       *
       * var some = new Some();
       * some.thing();
       * some.trigger("hi");
       * // fire alert("hi");
       * some.trigger("hi");
       * // Nothing happens
       * ```
       */


      __proto.once = function (eventName, handlerToAttach) {
        var _this = this;

        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;

          for (var key in eventHash) {
            this.once(key, eventHash[key]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var listener_1 = function () {
            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }

            handlerToAttach.apply(_this, args);

            _this.off(eventName, listener_1);
          };

          this.on(eventName, listener_1);
        }

        return this;
      };
      /**
       * Checks whether an event has been attached to a component.
       * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
       * @param {string} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
       * @return {boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   some() {
       *     this.hasOn("hi");// check hi event.
       *   }
       * }
       * ```
       */


      __proto.hasOn = function (eventName) {
        return !!this._eventHandler[eventName];
      };
      /**
       * Attaches an event to a component.
       * @ko 컴포넌트에 이벤트를 등록한다.
       * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.on("hi",this.hi); //attach event
       *   }
       * }
       * ```
       */


      __proto.on = function (eventName, handlerToAttach) {
        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;

          for (var name in eventHash) {
            this.on(name, eventHash[name]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var handlerList = this._eventHandler[eventName];

          if (isUndefined(handlerList)) {
            this._eventHandler[eventName] = [];
            handlerList = this._eventHandler[eventName];
          }

          handlerList.push(handlerToAttach);
        }

        return this;
      };
      /**
       * Detaches an event from the component.
       * @ko 컴포넌트에 등록된 이벤트를 해제한다
       * @param {string} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
       * @param {function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.off("hi",this.hi); //detach event
       *   }
       * }
       * ```
       */


      __proto.off = function (eventName, handlerToDetach) {
        var e_1, _a; // Detach all event handlers.


        if (isUndefined(eventName)) {
          this._eventHandler = {};
          return this;
        } // Detach all handlers for eventname or detach event handlers by object.


        if (isUndefined(handlerToDetach)) {
          if (typeof eventName === "string") {
            delete this._eventHandler[eventName];
            return this;
          } else {
            var eventHash = eventName;

            for (var name in eventHash) {
              this.off(name, eventHash[name]);
            }

            return this;
          }
        } // Detach single event handler


        var handlerList = this._eventHandler[eventName];

        if (handlerList) {
          var idx = 0;

          try {
            for (var handlerList_1 = __values(handlerList), handlerList_1_1 = handlerList_1.next(); !handlerList_1_1.done; handlerList_1_1 = handlerList_1.next()) {
              var handlerFunction = handlerList_1_1.value;

              if (handlerFunction === handlerToDetach) {
                handlerList.splice(idx, 1);
                break;
              }

              idx++;
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (handlerList_1_1 && !handlerList_1_1.done && (_a = handlerList_1.return)) _a.call(handlerList_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }

        return this;
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @example
       * eg.Component.VERSION;  // ex) 2.0.0
       * @memberof eg.Component
       */


      Component.VERSION = "2.2.2";
      return Component;
    }();

    /*
    Copyright (c) 2015 NAVER Corp.
    name: @egjs/axes
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-axes
    version: 2.8.0
    */

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

    function getInsidePosition(destPos, range, circular, bounce) {
      var toDestPos = destPos;
      var targetRange = [circular[0] ? range[0] : bounce ? range[0] - bounce[0] : range[0], circular[1] ? range[1] : bounce ? range[1] + bounce[1] : range[1]];
      toDestPos = Math.max(targetRange[0], toDestPos);
      toDestPos = Math.min(targetRange[1], toDestPos);
      return toDestPos;
    } // determine outside

    function isOutside(pos, range) {
      return pos < range[0] || pos > range[1];
    }
    function getDuration(distance, deceleration) {
      var duration = Math.sqrt(distance / deceleration * 2); // when duration is under 100, then value is zero

      return duration < 100 ? 0 : duration;
    }
    function isCircularable(destPos, range, circular) {
      return circular[1] && destPos > range[1] || circular[0] && destPos < range[0];
    }
    function getCirculatedPos(pos, range, circular) {
      var toPos = pos;
      var min = range[0];
      var max = range[1];
      var length = max - min;

      if (circular[1] && pos > max) {
        // right
        toPos = (toPos - max) % length + min;
      }

      if (circular[0] && pos < min) {
        // left
        toPos = (toPos - min) % length + max;
      }

      return toPos;
    }

    /* eslint-disable no-new-func, no-nested-ternary */
    var win;

    if (typeof window === "undefined") {
      // window is undefined in node.js
      win = {
        navigator: {
          userAgent: ""
        }
      };
    } else {
      win = window;
    }

    function toArray(nodes) {
      // const el = Array.prototype.slice.call(nodes);
      // for IE8
      var el = [];

      for (var i = 0, len = nodes.length; i < len; i++) {
        el.push(nodes[i]);
      }

      return el;
    }
    function $(param, multi) {
      if (multi === void 0) {
        multi = false;
      }

      var el;

      if (typeof param === "string") {
        // String (HTML, Selector)
        // check if string is HTML tag format
        var match = param.match(/^<([a-z]+)\s*([^>]*)>/); // creating element

        if (match) {
          // HTML
          var dummy = document.createElement("div");
          dummy.innerHTML = param;
          el = toArray(dummy.childNodes);
        } else {
          // Selector
          el = toArray(document.querySelectorAll(param));
        }

        if (!multi) {
          el = el.length >= 1 ? el[0] : undefined;
        }
      } else if (param === win) {
        // window
        el = param;
      } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
        // HTMLElement, Document
        el = param;
      } else if ("jQuery" in win && param instanceof jQuery || param.constructor.prototype.jquery) {
        // jQuery
        el = multi ? param.toArray() : param.get(0);
      } else if (Array.isArray(param)) {
        el = param.map(function (v) {
          return $(v);
        });

        if (!multi) {
          el = el.length >= 1 ? el[0] : undefined;
        }
      }

      return el;
    }
    var raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame;
    var caf = win.cancelAnimationFrame || win.webkitCancelAnimationFrame;

    if (raf && !caf) {
      var keyInfo_1 = {};
      var oldraf_1 = raf;

      raf = function (callback) {
        function wrapCallback(timestamp) {
          if (keyInfo_1[key]) {
            callback(timestamp);
          }
        }

        var key = oldraf_1(wrapCallback);
        keyInfo_1[key] = true;
        return key;
      };

      caf = function (key) {
        delete keyInfo_1[key];
      };
    } else if (!(raf && caf)) {
      raf = function (callback) {
        return win.setTimeout(function () {
          callback(win.performance && win.performance.now && win.performance.now() || new Date().getTime());
        }, 16);
      };

      caf = win.clearTimeout;
    }
    /**
     * A polyfill for the window.requestAnimationFrame() method.
     * @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
     * @private
     */


    function requestAnimationFrame(fp) {
      return raf(fp);
    }
    /**
    * A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
    * @param {Number} key −	The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드가 반환한 아이디 값</ko>
    * @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
    * @private
    */

    function cancelAnimationFrame(key) {
      caf(key);
    }
    function map(obj, callback) {
      var tranformed = {};

      for (var k in obj) {
        k && (tranformed[k] = callback(obj[k], k));
      }

      return tranformed;
    }
    function filter(obj, callback) {
      var filtered = {};

      for (var k in obj) {
        k && callback(obj[k], k) && (filtered[k] = obj[k]);
      }

      return filtered;
    }
    function every(obj, callback) {
      for (var k in obj) {
        if (k && !callback(obj[k], k)) {
          return false;
        }
      }

      return true;
    }
    function equal(target, base) {
      return every(target, function (v, k) {
        return v === base[k];
      });
    }
    var roundNumFunc = {};
    function roundNumber(num, roundUnit) {
      // Cache for performance
      if (!roundNumFunc[roundUnit]) {
        roundNumFunc[roundUnit] = getRoundFunc(roundUnit);
      }

      return roundNumFunc[roundUnit](num);
    }
    function roundNumbers(num, roundUnit) {
      if (!num || !roundUnit) {
        return num;
      }

      var isNumber = typeof roundUnit === "number";
      return map(num, function (value, key) {
        return roundNumber(value, isNumber ? roundUnit : roundUnit[key]);
      });
    }
    function getDecimalPlace(val) {
      if (!isFinite(val)) {
        return 0;
      }

      var v = val + "";

      if (v.indexOf("e") >= 0) {
        // Exponential Format
        // 1e-10, 1e-12
        var p = 0;
        var e = 1;

        while (Math.round(val * e) / e !== val) {
          e *= 10;
          p++;
        }

        return p;
      } // In general, following has performance benefit.
      // https://jsperf.com/precision-calculation


      return v.indexOf(".") >= 0 ? v.length - v.indexOf(".") - 1 : 0;
    }
    function inversePow(n) {
      // replace Math.pow(10, -n) to solve floating point issue.
      // eg. Math.pow(10, -4) => 0.00009999999999999999
      return 1 / Math.pow(10, n);
    }
    function getRoundFunc(v) {
      var p = v < 1 ? Math.pow(10, getDecimalPlace(v)) : 1;
      return function (n) {
        if (v === 0) {
          return 0;
        }

        return Math.round(Math.round(n / v) * v * p) / p;
      };
    }

    function minMax(value, min, max) {
      return Math.max(Math.min(value, max), min);
    }

    var AnimationManager =
    /*#__PURE__*/
    function () {
      function AnimationManager(_a) {
        var options = _a.options,
            itm = _a.itm,
            em = _a.em,
            axm = _a.axm;
        this.options = options;
        this.itm = itm;
        this.em = em;
        this.axm = axm;
        this.animationEnd = this.animationEnd.bind(this);
      }

      var __proto = AnimationManager.prototype;

      __proto.getDuration = function (depaPos, destPos, wishDuration) {
        var _this = this;

        var duration;

        if (typeof wishDuration !== "undefined") {
          duration = wishDuration;
        } else {
          var durations_1 = map(destPos, function (v, k) {
            return getDuration(Math.abs(v - depaPos[k]), _this.options.deceleration);
          });
          duration = Object.keys(durations_1).reduce(function (max, v) {
            return Math.max(max, durations_1[v]);
          }, -Infinity);
        }

        return minMax(duration, this.options.minimumDuration, this.options.maximumDuration);
      };

      __proto.createAnimationParam = function (pos, duration, option) {
        var depaPos = this.axm.get();
        var destPos = pos;
        var inputEvent = option && option.event || null;
        return {
          depaPos: depaPos,
          destPos: destPos,
          duration: minMax(duration, this.options.minimumDuration, this.options.maximumDuration),
          delta: this.axm.getDelta(depaPos, destPos),
          inputEvent: inputEvent,
          input: option && option.input || null,
          isTrusted: !!inputEvent,
          done: this.animationEnd
        };
      };

      __proto.grab = function (axes, option) {
        if (this._animateParam && axes.length) {
          var orgPos_1 = this.axm.get(axes);
          var pos = this.axm.map(orgPos_1, function (v, opt) {
            return getCirculatedPos(v, opt.range, opt.circular);
          });

          if (!every(pos, function (v, k) {
            return orgPos_1[k] === v;
          })) {
            this.em.triggerChange(pos, false, orgPos_1, option, !!option);
          }

          this._animateParam = null;
          this._raf && cancelAnimationFrame(this._raf);
          this._raf = null;
          this.em.triggerAnimationEnd(!!(option && option.event));
        }
      };

      __proto.getEventInfo = function () {
        if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
          return {
            input: this._animateParam.input,
            event: this._animateParam.inputEvent
          };
        } else {
          return null;
        }
      };

      __proto.restore = function (option) {
        var pos = this.axm.get();
        var destPos = this.axm.map(pos, function (v, opt) {
          return Math.min(opt.range[1], Math.max(opt.range[0], v));
        });
        this.animateTo(destPos, this.getDuration(pos, destPos), option);
      };

      __proto.animationEnd = function () {
        var beforeParam = this.getEventInfo();
        this._animateParam = null; // for Circular

        var circularTargets = this.axm.filter(this.axm.get(), function (v, opt) {
          return isCircularable(v, opt.range, opt.circular);
        });
        Object.keys(circularTargets).length > 0 && this.setTo(this.axm.map(circularTargets, function (v, opt) {
          return getCirculatedPos(v, opt.range, opt.circular);
        }));
        this.itm.setInterrupt(false);
        this.em.triggerAnimationEnd(!!beforeParam);

        if (this.axm.isOutside()) {
          this.restore(beforeParam);
        } else {
          this.finish(!!beforeParam);
        }
      };

      __proto.finish = function (isTrusted) {
        this._animateParam = null;
        this.itm.setInterrupt(false);
        this.em.triggerFinish(isTrusted);
      };

      __proto.animateLoop = function (param, complete) {
        if (param.duration) {
          this._animateParam = __assign({}, param);
          var info_1 = this._animateParam;
          var self_1 = this;
          var destPos_1 = info_1.destPos;
          var prevPos_1 = info_1.depaPos;
          var prevEasingPer_1 = 0;
          var directions_1 = map(prevPos_1, function (value, key) {
            return value <= destPos_1[key] ? 1 : -1;
          });
          var originalIntendedPos_1 = map(destPos_1, function (v) {
            return v;
          });
          var prevTime_1 = new Date().getTime();
          info_1.startTime = prevTime_1;

          (function loop() {
            self_1._raf = null;
            var currentTime = new Date().getTime();
            var ratio = (currentTime - info_1.startTime) / param.duration;
            var easingPer = self_1.easing(ratio);
            var toPos = self_1.axm.map(prevPos_1, function (pos, options, key) {
              var nextPos = ratio >= 1 ? destPos_1[key] : pos + info_1.delta[key] * (easingPer - prevEasingPer_1); // Subtract distance from distance already moved.
              // Recalculate the remaining distance.
              // Fix the bouncing phenomenon by changing the range.

              var circulatedPos = getCirculatedPos(nextPos, options.range, options.circular);

              if (nextPos !== circulatedPos) {
                // circular
                var rangeOffset = directions_1[key] * (options.range[1] - options.range[0]);
                destPos_1[key] -= rangeOffset;
                prevPos_1[key] -= rangeOffset;
              }

              return circulatedPos;
            });
            var isCanceled = !self_1.em.triggerChange(toPos, false, prevPos_1);
            prevPos_1 = toPos;
            prevTime_1 = currentTime;
            prevEasingPer_1 = easingPer;

            if (easingPer >= 1) {
              destPos_1 = self_1.getFinalPos(destPos_1, originalIntendedPos_1);

              if (!equal(destPos_1, self_1.axm.get(Object.keys(destPos_1)))) {
                self_1.em.triggerChange(destPos_1, true, prevPos_1);
              }

              complete();
              return;
            } else if (isCanceled) {
              self_1.finish(false);
            } else {
              // animationEnd
              self_1._raf = requestAnimationFrame(loop);
            }
          })();
        } else {
          this.em.triggerChange(param.destPos, true);
          complete();
        }
      };
      /**
       * Get estimated final value.
       *
       * If destPos is within the 'error range' of the original intended position, the initial intended position is returned.
       *   - eg. original intended pos: 100, destPos: 100.0000000004 ==> return 100;
       * If dest Pos is outside the 'range of error' compared to the originally intended pos, it is returned rounded based on the originally intended pos.
       *   - eg. original intended pos: 100.123 destPos: 50.12345 => return 50.123
       *
       * @param originalIntendedPos
       * @param destPos
       */


      __proto.getFinalPos = function (destPos, originalIntendedPos) {
        var _this = this; // compare destPos and originalIntendedPos


        var ERROR_LIMIT = 0.000001;
        var finalPos = map(destPos, function (value, key) {
          if (value >= originalIntendedPos[key] - ERROR_LIMIT && value <= originalIntendedPos[key] + ERROR_LIMIT) {
            // In error range, return original intended
            return originalIntendedPos[key];
          } else {
            // Out of error range, return rounded pos.
            var roundUnit = _this.getRoundUnit(value, key);

            var result = roundNumber(value, roundUnit);
            return result;
          }
        });
        return finalPos;
      };

      __proto.getRoundUnit = function (val, key) {
        var roundUnit = this.options.round; // manual mode

        var minRoundUnit = null; // auto mode
        // auto mode

        if (!roundUnit) {
          // Get minimum round unit
          var options = this.axm.getAxisOptions(key);
          minRoundUnit = inversePow(Math.max(getDecimalPlace(options.range[0]), getDecimalPlace(options.range[1]), getDecimalPlace(val)));
        }

        return minRoundUnit || roundUnit;
      };

      __proto.getUserControll = function (param) {
        var userWish = param.setTo();
        userWish.destPos = this.axm.get(userWish.destPos);
        userWish.duration = minMax(userWish.duration, this.options.minimumDuration, this.options.maximumDuration);
        return userWish;
      };

      __proto.animateTo = function (destPos, duration, option) {
        var _this = this;

        var param = this.createAnimationParam(destPos, duration, option);

        var depaPos = __assign({}, param.depaPos);

        var retTrigger = this.em.triggerAnimationStart(param); // to control

        var userWish = this.getUserControll(param); // You can't stop the 'animationStart' event when 'circular' is true.

        if (!retTrigger && this.axm.every(userWish.destPos, function (v, opt) {
          return isCircularable(v, opt.range, opt.circular);
        })) {
          console.warn("You can't stop the 'animation' event when 'circular' is true.");
        }

        if (retTrigger && !equal(userWish.destPos, depaPos)) {
          var inputEvent = option && option.event || null;
          this.animateLoop({
            depaPos: depaPos,
            destPos: userWish.destPos,
            duration: userWish.duration,
            delta: this.axm.getDelta(depaPos, userWish.destPos),
            isTrusted: !!inputEvent,
            inputEvent: inputEvent,
            input: option && option.input || null
          }, function () {
            return _this.animationEnd();
          });
        }
      };

      __proto.easing = function (p) {
        return p > 1 ? 1 : this.options.easing(p);
      };

      __proto.setTo = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        }

        var axes = Object.keys(pos);
        this.grab(axes);
        var orgPos = this.axm.get(axes);

        if (equal(pos, orgPos)) {
          return this;
        }

        this.itm.setInterrupt(true);
        var movedPos = filter(pos, function (v, k) {
          return orgPos[k] !== v;
        });

        if (!Object.keys(movedPos).length) {
          return this;
        }

        movedPos = this.axm.map(movedPos, function (v, opt) {
          var range = opt.range,
              circular = opt.circular;

          if (circular && (circular[0] || circular[1])) {
            return v;
          } else {
            return getInsidePosition(v, range, circular);
          }
        });

        if (equal(movedPos, orgPos)) {
          return this;
        }

        if (duration > 0) {
          this.animateTo(movedPos, duration);
        } else {
          this.em.triggerChange(movedPos);
          this.finish(false);
        }

        return this;
      };

      __proto.setBy = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        }

        return this.setTo(map(this.axm.get(Object.keys(pos)), function (v, k) {
          return v + pos[k];
        }), duration);
      };

      return AnimationManager;
    }();

    var EventManager =
    /*#__PURE__*/
    function () {
      function EventManager(axes) {
        this.axes = axes;
      }
      /**
       * This event is fired when a user holds an element on the screen of the device.
       * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
       * @name eg.Axes#hold
       * @event
       * @type {object}
       * @property {Object.<string, number>} pos coordinate <ko>좌표 정보</ko>
       * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
       * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("hold", function(event) {
       *   // event.pos
       *   // event.input
       *   // event.inputEvent
       *   // isTrusted
       * });
       */


      var __proto = EventManager.prototype;

      __proto.triggerHold = function (pos, option) {
        var roundPos = this.getRoundPos(pos).roundPos;
        this.axes.trigger("hold", {
          pos: roundPos,
          input: option.input || null,
          inputEvent: option.event || null,
          isTrusted: true
        });
      };
      /**
       * Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
       * @ko 'change' 이벤트 이후 이동할 좌표를 지정한다. change이벤트의 holding 값이 true일 경우에 동작한다
       * @name set
      * @function
       * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("change", function(event) {
       *   event.holding && event.set({x: 10});
       * });
       */

      /** Specifies the animation coordinates to move after the 'release' or 'animationStart' events.
       * @ko 'release' 또는 'animationStart' 이벤트 이후 이동할 좌표를 지정한다.
       * @name setTo
      * @function
       * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
       * @param {Number} [duration] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("animationStart", function(event) {
       *   event.setTo({x: 10}, 2000);
       * });
       */

      /**
       * This event is fired when a user release an element on the screen of the device.
       * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
       * @name eg.Axes#release
       * @event
       * @type {object}
       * @property {Object.<string, number>} depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
       * @property {Object.<string, number>} destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
       * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
       * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
       * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
       * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("release", function(event) {
       *   // event.depaPos
       *   // event.destPos
       *   // event.delta
       *   // event.input
       *   // event.inputEvent
       *   // event.setTo
       *   // event.isTrusted
       *
       *   // if you want to change the animation coordinates to move after the 'release' event.
       *   event.setTo({x: 10}, 2000);
       * });
       */


      __proto.triggerRelease = function (param) {
        var _a = this.getRoundPos(param.destPos, param.depaPos),
            roundPos = _a.roundPos,
            roundDepa = _a.roundDepa;

        param.destPos = roundPos;
        param.depaPos = roundDepa;
        param.setTo = this.createUserControll(param.destPos, param.duration);
        this.axes.trigger("release", param);
      };
      /**
       * This event is fired when coordinate changes.
       * @ko 좌표가 변경됐을 때 발생하는 이벤트
       * @name eg.Axes#change
       * @event
       * @type {object}
       * @property {Object.<string, number>} pos  The coordinate <ko>좌표</ko>
       * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
       * @property {Boolean} holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
       * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
       * @property {Object} inputEvent The event object received from inputType. If the value is changed by animation, it returns 'null'.<ko>inputType으로 부터 받은 이벤트 객체. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
       * @property {set} set Specifies the coordinates to move after the event. It works when the holding value is true <ko>이벤트 이후 이동할 좌표를 지정한다. holding 값이 true일 경우에 동작한다.</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("change", function(event) {
       *   // event.pos
       *   // event.delta
       *   // event.input
       *   // event.inputEvent
       *   // event.holding
       *   // event.set
       *   // event.isTrusted
       *
       *   // if you want to change the coordinates to move after the 'change' event.
       *   // it works when the holding value of the change event is true.
       *   event.holding && event.set({x: 10});
       * });
       */


      __proto.triggerChange = function (pos, isAccurate, depaPos, option, holding) {
        if (holding === void 0) {
          holding = false;
        }

        var am = this.am;
        var axm = am.axm;
        var eventInfo = am.getEventInfo();

        var _a = this.getRoundPos(pos, depaPos),
            roundPos = _a.roundPos,
            roundDepa = _a.roundDepa;

        var moveTo = axm.moveTo(roundPos, roundDepa);
        var inputEvent = option && option.event || eventInfo && eventInfo.event || null;
        var param = {
          pos: moveTo.pos,
          delta: moveTo.delta,
          holding: holding,
          inputEvent: inputEvent,
          isTrusted: !!inputEvent,
          input: option && option.input || eventInfo && eventInfo.input || null,
          set: inputEvent ? this.createUserControll(moveTo.pos) : function () {}
        };
        var result = this.axes.trigger("change", param);
        inputEvent && axm.set(param.set()["destPos"]);
        return result;
      };
      /**
       * This event is fired when animation starts.
       * @ko 에니메이션이 시작할 때 발생한다.
       * @name eg.Axes#animationStart
       * @event
       * @type {object}
       * @property {Object.<string, number>} depaPos The coordinates when animation starts<ko>애니메이션이 시작 되었을 때의 좌표 </ko>
       * @property {Object.<string, number>} destPos The coordinates to move to. If you change this value, you can run the animation<ko>이동할 좌표. 이값을 변경하여 애니메이션을 동작시킬수 있다</ko>
       * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
       * @property {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>애니메이션 진행 시간(단위: ms). 이값을 변경하여 애니메이션의 이동시간을 조절할 수 있다.</ko>
       * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
       * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
       * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("release", function(event) {
       *   // event.depaPos
       *   // event.destPos
       *   // event.delta
       *   // event.input
       *   // event.inputEvent
       *   // event.setTo
       *   // event.isTrusted
       *
       *   // if you want to change the animation coordinates to move after the 'animationStart' event.
       *   event.setTo({x: 10}, 2000);
       * });
       */


      __proto.triggerAnimationStart = function (param) {
        var _a = this.getRoundPos(param.destPos, param.depaPos),
            roundPos = _a.roundPos,
            roundDepa = _a.roundDepa;

        param.destPos = roundPos;
        param.depaPos = roundDepa;
        param.setTo = this.createUserControll(param.destPos, param.duration);
        return this.axes.trigger("animationStart", param);
      };
      /**
       * This event is fired when animation ends.
       * @ko 에니메이션이 끝났을 때 발생한다.
       * @name eg.Axes#animationEnd
       * @event
       * @type {object}
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("animationEnd", function(event) {
       *   // event.isTrusted
       * });
       */


      __proto.triggerAnimationEnd = function (isTrusted) {
        if (isTrusted === void 0) {
          isTrusted = false;
        }

        this.axes.trigger("animationEnd", {
          isTrusted: isTrusted
        });
      };
      /**
       * This event is fired when all actions have been completed.
       * @ko 에니메이션이 끝났을 때 발생한다.
       * @name eg.Axes#finish
       * @event
       * @type {object}
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("finish", function(event) {
       *   // event.isTrusted
       * });
       */


      __proto.triggerFinish = function (isTrusted) {
        if (isTrusted === void 0) {
          isTrusted = false;
        }

        this.axes.trigger("finish", {
          isTrusted: isTrusted
        });
      };

      __proto.createUserControll = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        } // to controll


        var userControl = {
          destPos: __assign({}, pos),
          duration: duration
        };
        return function (toPos, userDuration) {
          toPos && (userControl.destPos = __assign({}, toPos));
          userDuration !== undefined && (userControl.duration = userDuration);
          return userControl;
        };
      };

      __proto.setAnimationManager = function (am) {
        this.am = am;
      };

      __proto.destroy = function () {
        this.axes.off();
      };

      __proto.getRoundPos = function (pos, depaPos) {
        // round value if round exist
        var roundUnit = this.axes.options.round; // if (round == null) {
        // 	return {pos, depaPos}; // undefined, undefined
        // }

        return {
          roundPos: roundNumbers(pos, roundUnit),
          roundDepa: roundNumbers(depaPos, roundUnit)
        };
      };

      return EventManager;
    }();

    var InterruptManager =
    /*#__PURE__*/
    function () {
      function InterruptManager(options) {
        this.options = options;
        this._prevented = false; //  check whether the animation event was prevented
      }

      var __proto = InterruptManager.prototype;

      __proto.isInterrupting = function () {
        // when interruptable is 'true', return value is always 'true'.
        return this.options.interruptable || this._prevented;
      };

      __proto.isInterrupted = function () {
        return !this.options.interruptable && this._prevented;
      };

      __proto.setInterrupt = function (prevented) {
        !this.options.interruptable && (this._prevented = prevented);
      };

      return InterruptManager;
    }();

    var AxisManager =
    /*#__PURE__*/
    function () {
      function AxisManager(axis, options) {
        var _this = this;

        this.axis = axis;
        this.options = options;

        this._complementOptions();

        this._pos = Object.keys(this.axis).reduce(function (acc, v) {
          acc[v] = _this.axis[v].range[0];
          return acc;
        }, {});
      }
      /**
         * set up 'css' expression
         * @private
         */


      var __proto = AxisManager.prototype;

      __proto._complementOptions = function () {
        var _this = this;

        Object.keys(this.axis).forEach(function (axis) {
          _this.axis[axis] = __assign({
            range: [0, 100],
            bounce: [0, 0],
            circular: [false, false]
          }, _this.axis[axis]);
          ["bounce", "circular"].forEach(function (v) {
            var axisOption = _this.axis;
            var key = axisOption[axis][v];

            if (/string|number|boolean/.test(typeof key)) {
              axisOption[axis][v] = [key, key];
            }
          });
        });
      };

      __proto.getDelta = function (depaPos, destPos) {
        var fullDepaPos = this.get(depaPos);
        return map(this.get(destPos), function (v, k) {
          return v - fullDepaPos[k];
        });
      };

      __proto.get = function (axes) {
        var _this = this;

        if (axes && Array.isArray(axes)) {
          return axes.reduce(function (acc, v) {
            if (v && v in _this._pos) {
              acc[v] = _this._pos[v];
            }

            return acc;
          }, {});
        } else {
          return __assign(__assign({}, this._pos), axes || {});
        }
      };

      __proto.moveTo = function (pos, depaPos) {
        if (depaPos === void 0) {
          depaPos = this._pos;
        }

        var delta = map(this._pos, function (v, key) {
          return key in pos && key in depaPos ? pos[key] - depaPos[key] : 0;
        });
        this.set(this.map(pos, function (v, opt) {
          return opt ? getCirculatedPos(v, opt.range, opt.circular) : 0;
        }));
        return {
          pos: __assign({}, this._pos),
          delta: delta
        };
      };

      __proto.set = function (pos) {
        for (var k in pos) {
          if (k && k in this._pos) {
            this._pos[k] = pos[k];
          }
        }
      };

      __proto.every = function (pos, callback) {
        var axisOptions = this.axis;
        return every(pos, function (value, key) {
          return callback(value, axisOptions[key], key);
        });
      };

      __proto.filter = function (pos, callback) {
        var axisOptions = this.axis;
        return filter(pos, function (value, key) {
          return callback(value, axisOptions[key], key);
        });
      };

      __proto.map = function (pos, callback) {
        var axisOptions = this.axis;
        return map(pos, function (value, key) {
          return callback(value, axisOptions[key], key);
        });
      };

      __proto.isOutside = function (axes) {
        return !this.every(axes ? this.get(axes) : this._pos, function (v, opt) {
          return !isOutside(v, opt.range);
        });
      };

      __proto.getAxisOptions = function (key) {
        return this.axis[key];
      };

      return AxisManager;
    }();

    var InputObserver =
    /*#__PURE__*/
    function () {
      function InputObserver(_a) {
        var options = _a.options,
            itm = _a.itm,
            em = _a.em,
            axm = _a.axm,
            am = _a.am;
        this.isOutside = false;
        this.moveDistance = null;
        this.isStopped = false;
        this.options = options;
        this.itm = itm;
        this.em = em;
        this.axm = axm;
        this.am = am;
      } // when move pointer is held in outside


      var __proto = InputObserver.prototype;

      __proto.atOutside = function (pos) {
        var _this = this;

        if (this.isOutside) {
          return this.axm.map(pos, function (v, opt) {
            var tn = opt.range[0] - opt.bounce[0];
            var tx = opt.range[1] + opt.bounce[1];
            return v > tx ? tx : v < tn ? tn : v;
          });
        } else {
          // when start pointer is held in inside
          // get a initialization slope value to prevent smooth animation.
          var initSlope_1 = this.am.easing(0.00001) / 0.00001;
          return this.axm.map(pos, function (v, opt) {
            var min = opt.range[0];
            var max = opt.range[1];
            var out = opt.bounce;
            var circular = opt.circular;

            if (circular && (circular[0] || circular[1])) {
              return v;
            } else if (v < min) {
              // left
              return min - _this.am.easing((min - v) / (out[0] * initSlope_1)) * out[0];
            } else if (v > max) {
              // right
              return max + _this.am.easing((v - max) / (out[1] * initSlope_1)) * out[1];
            }

            return v;
          });
        }
      };

      __proto.get = function (input) {
        return this.axm.get(input.axes);
      };

      __proto.hold = function (input, event) {
        if (this.itm.isInterrupted() || !input.axes.length) {
          return;
        }

        var changeOption = {
          input: input,
          event: event
        };
        this.isStopped = false;
        this.itm.setInterrupt(true);
        this.am.grab(input.axes, changeOption);
        !this.moveDistance && this.em.triggerHold(this.axm.get(), changeOption);
        this.isOutside = this.axm.isOutside(input.axes);
        this.moveDistance = this.axm.get(input.axes);
      };

      __proto.change = function (input, event, offset) {
        if (this.isStopped || !this.itm.isInterrupting() || this.axm.every(offset, function (v) {
          return v === 0;
        })) {
          return;
        }

        var depaPos = this.moveDistance || this.axm.get(input.axes);
        var destPos; // for outside logic

        destPos = map(depaPos, function (v, k) {
          return v + (offset[k] || 0);
        });
        this.moveDistance && (this.moveDistance = destPos); // from outside to inside

        if (this.isOutside && this.axm.every(depaPos, function (v, opt) {
          return !isOutside(v, opt.range);
        })) {
          this.isOutside = false;
        }

        depaPos = this.atOutside(depaPos);
        destPos = this.atOutside(destPos);
        var isCanceled = !this.em.triggerChange(destPos, false, depaPos, {
          input: input,
          event: event
        }, true);

        if (isCanceled) {
          this.isStopped = true;
          this.moveDistance = null;
          this.am.finish(false);
        }
      };

      __proto.release = function (input, event, offset, inputDuration) {
        if (this.isStopped || !this.itm.isInterrupting() || !this.moveDistance) {
          return;
        }

        var pos = this.axm.get(input.axes);
        var depaPos = this.axm.get();
        var destPos = this.axm.get(this.axm.map(offset, function (v, opt, k) {
          if (opt.circular && (opt.circular[0] || opt.circular[1])) {
            return pos[k] + v;
          } else {
            return getInsidePosition(pos[k] + v, opt.range, opt.circular, opt.bounce);
          }
        }));
        var duration = this.am.getDuration(destPos, pos, inputDuration);

        if (duration === 0) {
          destPos = __assign({}, depaPos);
        } // prepare params


        var param = {
          depaPos: depaPos,
          destPos: destPos,
          duration: duration,
          delta: this.axm.getDelta(depaPos, destPos),
          inputEvent: event,
          input: input,
          isTrusted: true
        };
        this.em.triggerRelease(param);
        this.moveDistance = null; // to contol

        var userWish = this.am.getUserControll(param);
        var isEqual = equal(userWish.destPos, depaPos);
        var changeOption = {
          input: input,
          event: event
        };

        if (isEqual || userWish.duration === 0) {
          !isEqual && this.em.triggerChange(userWish.destPos, false, depaPos, changeOption, true);
          this.itm.setInterrupt(false);

          if (this.axm.isOutside()) {
            this.am.restore(changeOption);
          } else {
            this.em.triggerFinish(true);
          }
        } else {
          this.am.animateTo(userWish.destPos, userWish.duration, changeOption);
        }
      };

      return InputObserver;
    }();

    // export const DIRECTION_NONE = 1;
    var IOS_EDGE_THRESHOLD = 30;
    var IS_IOS_SAFARI = "ontouchstart" in win && agent().browser.name === "safari";
    var TRANSFORM = function () {
      if (typeof document === "undefined") {
        return "";
      }

      var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
      var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

      for (var i = 0, len = target.length; i < len; i++) {
        if (target[i] in bodyStyle) {
          return target[i];
        }
      }

      return "";
    }();

    /**
     * @typedef {Object} AxisOption The Axis information. The key of the axis specifies the name to use as the logical virtual coordinate system.
     * @ko 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.
     * @property {Number[]} [range] The coordinate of range <ko>좌표 범위</ko>
     * @property {Number} [range.0=0] The coordinate of the minimum <ko>최소 좌표</ko>
     * @property {Number} [range.1=0] The coordinate of the maximum <ko>최대 좌표</ko>
     * @property {Number[]} [bounce] The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
     * @property {Number} [bounce.0=0] The size of coordinate of the minimum area <ko>최소 좌표 바운스 영역의 크기</ko>
     * @property {Number} [bounce.1=0] The size of coordinate of the maximum area <ko>최대 좌표 바운스 영역의 크기</ko>
     * @property {Boolean[]} [circular] Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
     * @property {Boolean} [circular.0=false] Indicates whether to circulate to the coordinate of the minimum <ko>최소 좌표 방향의 순환 여부</ko>
     * @property {Boolean} [circular.1=false] Indicates whether to circulate to the coordinate of the maximum <ko>최대 좌표 방향의 순환 여부</ko>
    **/

    /**
     * @typedef {Object} AxesOption The option object of the eg.Axes module
     * @ko eg.Axes 모듈의 옵션 객체
     * @property {Function} [easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
     * @property {Number} [maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
     * @property {Number} [minimumDuration=0] Minimum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최소 좌표 이동 시간</ko>
     * @property {Number} [deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
     * @property {Boolean} [interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>진행 중인 애니메이션 중지 가능 여부.<br>- true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.<br>- false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
     * @property {Number} [round = null] Rounding unit. For example, 0.1 rounds to 0.1 decimal point(6.1234 => 6.1), 5 rounds to 5 (93 => 95) <br>[Details](https://github.com/naver/egjs-axes/wiki/round-option)<ko>반올림 단위. 예를 들어 0.1 은 소숫점 0.1 까지 반올림(6.1234 => 6.1), 5 는 5 단위로 반올림(93 => 95).<br>[상세내용](https://github.com/naver/egjs-axes/wiki/round-option)</ko>
    **/

    /**
     * @class eg.Axes
     * @classdesc A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions.
     * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치를 통해 전달 받은 사용자의 동작을 논리적인 가상 좌표로 변경하는 모듈이다. 사용자 동작에 반응하는 UI를 손쉽게 만들수 있다.
     * @extends eg.Component
     *
     * @param {Object.<string, AxisOption>} axis Axis information managed by eg.Axes. The key of the axis specifies the name to use as the logical virtual coordinate system.  <ko>eg.Axes가 관리하는 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.</ko>
     * @param {AxesOption} [options] The option object of the eg.Axes module<ko>eg.Axes 모듈의 옵션 객체</ko>
     * @param {Object.<string, number>} [startPos] The coordinates to be moved when creating an instance. not triggering change event.<ko>인스턴스 생성시 이동할 좌표, change 이벤트는 발생하지 않음.</ko>
     *
     * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
     * @example
     *
     * // 1. Initialize eg.Axes
     * const axes = new eg.Axes({
     *	something1: {
     *		range: [0, 150],
     *		bounce: 50
     *	},
     *	something2: {
     *		range: [0, 200],
     *		bounce: 100
     *	},
     *	somethingN: {
     *		range: [1, 10],
     *	}
     * }, {
     *  deceleration : 0.0024
     * });
     *
     * // 2. attach event handler
     * axes.on({
     *	"hold" : function(evt) {
     *	},
     *	"release" : function(evt) {
     *	},
     *	"animationStart" : function(evt) {
     *	},
     *	"animationEnd" : function(evt) {
     *	},
     *	"change" : function(evt) {
     *	}
     * });
     *
     * // 3. Initialize inputTypes
     * const panInputArea = new eg.Axes.PanInput("#area", {
     *	scale: [0.5, 1]
     * });
     * const panInputHmove = new eg.Axes.PanInput("#hmove");
     * const panInputVmove = new eg.Axes.PanInput("#vmove");
     * const pinchInputArea = new eg.Axes.PinchInput("#area", {
     *	scale: 1.5
     * });
     *
     * // 4. Connect eg.Axes and InputTypes
     * // [PanInput] When the mouse or touchscreen is down and moved.
     * // Connect the 'something2' axis to the mouse or touchscreen x position and
     * // connect the 'somethingN' axis to the mouse or touchscreen y position.
     * axes.connect(["something2", "somethingN"], panInputArea); // or axes.connect("something2 somethingN", panInputArea);
     *
     * // Connect only one 'something1' axis to the mouse or touchscreen x position.
     * axes.connect(["something1"], panInputHmove); // or axes.connect("something1", panInputHmove);
     *
     * // Connect only one 'something2' axis to the mouse or touchscreen y position.
     * axes.connect(["", "something2"], panInputVmove); // or axes.connect(" something2", panInputVmove);
     *
     * // [PinchInput] Connect 'something2' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
     * axes.connect("something2", pinchInputArea);
     */

    var Axes =
    /*#__PURE__*/
    function (_super) {
      __extends(Axes, _super);

      function Axes(axis, options, startPos) {
        if (axis === void 0) {
          axis = {};
        }

        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.axis = axis;
        _this._inputs = [];
        _this.options = __assign({
          easing: function easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3);
          },
          interruptable: true,
          maximumDuration: Infinity,
          minimumDuration: 0,
          deceleration: 0.0006,
          round: null
        }, options);
        _this.itm = new InterruptManager(_this.options);
        _this.axm = new AxisManager(_this.axis, _this.options);
        _this.em = new EventManager(_this);
        _this.am = new AnimationManager(_this);
        _this.io = new InputObserver(_this);

        _this.em.setAnimationManager(_this.am);

        startPos && _this.em.triggerChange(startPos);
        return _this;
      }
      /**
       * Connect the axis of eg.Axes to the inputType.
       * @ko eg.Axes의 축과 inputType을 연결한다
       * @method eg.Axes#connect
       * @param {(String[]|String)} axes The name of the axis to associate with inputType <ko>inputType과 연결할 축의 이름</ko>
       * @param {Object} inputType The inputType instance to associate with the axis of eg.Axes <ko>eg.Axes의 축과 연결할 inputType 인스턴스<ko>
       * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   }
       * });
       *
       * axes.connect("x", new eg.Axes.PanInput("#area1"))
       *    .connect("x xOther", new eg.Axes.PanInput("#area2"))
       *    .connect(" xOther", new eg.Axes.PanInput("#area3"))
       *    .connect(["x"], new eg.Axes.PanInput("#area4"))
       *    .connect(["xOther", "x"], new eg.Axes.PanInput("#area5"))
       *    .connect(["", "xOther"], new eg.Axes.PanInput("#area6"));
       */


      var __proto = Axes.prototype;

      __proto.connect = function (axes, inputType) {
        var mapped;

        if (typeof axes === "string") {
          mapped = axes.split(" ");
        } else {
          mapped = axes.concat();
        } // check same instance


        if (~this._inputs.indexOf(inputType)) {
          this.disconnect(inputType);
        } // check same element in hammer type for share


        if ("hammer" in inputType) {
          var targets = this._inputs.filter(function (v) {
            return v.hammer && v.element === inputType.element;
          });

          if (targets.length) {
            inputType.hammer = targets[0].hammer;
          }
        }

        inputType.mapAxes(mapped);
        inputType.connect(this.io);

        this._inputs.push(inputType);

        return this;
      };
      /**
       * Disconnect the axis of eg.Axes from the inputType.
       * @ko eg.Axes의 축과 inputType의 연결을 끊는다.
       * @method eg.Axes#disconnect
       * @param {Object} [inputType] An inputType instance associated with the axis of eg.Axes <ko>eg.Axes의 축과 연결한 inputType 인스턴스<ko>
       * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   }
       * });
       *
       * const input1 = new eg.Axes.PanInput("#area1");
       * const input2 = new eg.Axes.PanInput("#area2");
       * const input3 = new eg.Axes.PanInput("#area3");
       *
       * axes.connect("x", input1);
       *    .connect("x xOther", input2)
       *    .connect(["xOther", "x"], input3);
       *
       * axes.disconnect(input1); // disconnects input1
       * axes.disconnect(); // disconnects all of them
       */


      __proto.disconnect = function (inputType) {
        if (inputType) {
          var index = this._inputs.indexOf(inputType);

          if (index >= 0) {
            this._inputs[index].disconnect();

            this._inputs.splice(index, 1);
          }
        } else {
          this._inputs.forEach(function (v) {
            return v.disconnect();
          });

          this._inputs = [];
        }

        return this;
      };
      /**
       * Returns the current position of the coordinates.
       * @ko 좌표의 현재 위치를 반환한다
       * @method eg.Axes#get
       * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
       * @return {Object.<string, number>} Axis coordinate information <ko>축 좌표 정보</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   },
       * 	 "zoom": {
       *      range: [50, 30]
       *   }
       * });
       *
       * axes.get(); // {"x": 0, "xOther": -100, "zoom": 50}
       * axes.get(["x", "zoom"]); // {"x": 0, "zoom": 50}
       */


      __proto.get = function (axes) {
        return this.axm.get(axes);
      };
      /**
       * Moves an axis to specific coordinates.
       * @ko 좌표를 이동한다.
       * @method eg.Axes#setTo
       * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
       * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
       * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   },
       * 	 "zoom": {
       *      range: [50, 30]
       *   }
       * });
       *
       * axes.setTo({"x": 30, "zoom": 60});
       * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
       *
       * axes.setTo({"x": 100, "xOther": 60}, 1000); // animatation
       *
       * // after 1000 ms
       * axes.get(); // {"x": 100, "xOther": 60, "zoom": 60}
       */


      __proto.setTo = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        }

        this.am.setTo(pos, duration);
        return this;
      };
      /**
       * Moves an axis from the current coordinates to specific coordinates.
       * @ko 현재 좌표를 기준으로 좌표를 이동한다.
       * @method eg.Axes#setBy
       * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
       * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
       * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   },
       * 	 "zoom": {
       *      range: [50, 30]
       *   }
       * });
       *
       * axes.setBy({"x": 30, "zoom": 10});
       * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
       *
       * axes.setBy({"x": 70, "xOther": 60}, 1000); // animatation
       *
       * // after 1000 ms
       * axes.get(); // {"x": 100, "xOther": -40, "zoom": 60}
       */


      __proto.setBy = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        }

        this.am.setBy(pos, duration);
        return this;
      };
      /**
       * Returns whether there is a coordinate in the bounce area of ​​the target axis.
       * @ko 대상 축 중 bounce영역에 좌표가 존재하는지를 반환한다
       * @method eg.Axes#isBounceArea
       * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
       * @return {Boolen} Whether the bounce area exists. <ko>bounce 영역 존재 여부</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   },
       * 	 "zoom": {
       *      range: [50, 30]
       *   }
       * });
       *
       * axes.isBounceArea(["x"]);
       * axes.isBounceArea(["x", "zoom"]);
       * axes.isBounceArea();
       */


      __proto.isBounceArea = function (axes) {
        return this.axm.isOutside(axes);
      };
      /**
      * Destroys properties, and events used in a module and disconnect all connections to inputTypes.
      * @ko 모듈에 사용한 속성, 이벤트를 해제한다. 모든 inputType과의 연결을 끊는다.
      * @method eg.Axes#destroy
      */


      __proto.destroy = function () {
        this.disconnect();
        this.em.destroy();
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @type {String}
       * @example
       * eg.Axes.VERSION;  // ex) 3.3.3
       * @memberof eg.Axes
       */


      Axes.VERSION = "2.8.0";
      /**
       * @name eg.Axes.TRANSFORM
       * @desc Returns the transform attribute with CSS vendor prefixes.
       * @ko CSS vendor prefixes를 붙인 transform 속성을 반환한다.
       *
       * @constant
       * @type {String}
       * @example
       * eg.Axes.TRANSFORM; // "transform" or "webkitTransform"
       */

      Axes.TRANSFORM = TRANSFORM;
      /**
       * @name eg.Axes.DIRECTION_NONE
       * @constant
       * @type {Number}
       */

      Axes.DIRECTION_NONE = DIRECTION_NONE;
      /**
       * @name eg.Axes.DIRECTION_LEFT
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_LEFT = DIRECTION_LEFT;
      /**
       * @name eg.Axes.DIRECTION_RIGHT
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_RIGHT = DIRECTION_RIGHT;
      /**
       * @name eg.Axes.DIRECTION_UP
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_UP = DIRECTION_UP;
      /**
       * @name eg.Axes.DIRECTION_DOWN
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_DOWN = DIRECTION_DOWN;
      /**
       * @name eg.Axes.DIRECTION_HORIZONTAL
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
      /**
       * @name eg.Axes.DIRECTION_VERTICAL
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
      /**
       * @name eg.Axes.DIRECTION_ALL
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_ALL = DIRECTION_ALL;
      return Axes;
    }(Component);

    var SUPPORT_POINTER_EVENTS = "PointerEvent" in win || "MSPointerEvent" in win;
    var SUPPORT_TOUCH = ("ontouchstart" in win);
    var UNIQUEKEY = "_EGJS_AXES_INPUTTYPE_";
    function toAxis(source, offset) {
      return offset.reduce(function (acc, v, i) {
        if (source[i]) {
          acc[source[i]] = v;
        }

        return acc;
      }, {});
    }
    function createHammer(element, options) {
      try {
        // create Hammer
        return new Manager(element, __assign({}, options));
      } catch (e) {
        return null;
      }
    }
    function convertInputType(inputType) {
      if (inputType === void 0) {
        inputType = [];
      }

      var hasTouch = false;
      var hasMouse = false;
      var hasPointer = false;
      inputType.forEach(function (v) {
        switch (v) {
          case "mouse":
            hasMouse = true;
            break;

          case "touch":
            hasTouch = SUPPORT_TOUCH;
            break;

          case "pointer":
            hasPointer = SUPPORT_POINTER_EVENTS;
          // no default
        }
      });

      if (hasPointer) {
        return PointerEventInput;
      } else if (hasTouch && hasMouse) {
        return TouchMouseInput;
      } else if (hasTouch) {
        return TouchInput;
      } else if (hasMouse) {
        return MouseInput;
      }

      return null;
    }

    function getDirectionByAngle(angle, thresholdAngle) {
      if (thresholdAngle < 0 || thresholdAngle > 90) {
        return DIRECTION_NONE;
      }

      var toAngle = Math.abs(angle);
      return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL;
    }
    function getNextOffset(speeds, deceleration) {
      var normalSpeed = Math.sqrt(speeds[0] * speeds[0] + speeds[1] * speeds[1]);
      var duration = Math.abs(normalSpeed / -deceleration);
      return [speeds[0] / 2 * duration, speeds[1] / 2 * duration];
    }
    function useDirection(checkType, direction, userDirection) {
      if (userDirection) {
        return !!(direction === DIRECTION_ALL || direction & checkType && userDirection & checkType);
      } else {
        return !!(direction & checkType);
      }
    }
    /**
     * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
     * @ko eg.Axes.PanInput 모듈의 옵션 객체
     * @property {String[]} [inputType=["touch","mouse", "pointer"]] Types of input devices.<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
     * @property {Number[]} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
     * @property {Number} [scale.0=1] horizontal axis scale <ko>수평축 배율</ko>
     * @property {Number} [scale.1=1] vertical axis scale <ko>수직축 배율</ko>
     * @property {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
     * @property {Number} [threshold=0] Minimal pan distance required before recognizing <ko>사용자의 Pan 동작을 인식하기 위해산 최소한의 거리</ko>
     * @property {Number} [iOSEdgeSwipeThreshold=30] Area (px) that can go to the next page when swiping the right edge in iOS safari <ko>iOS Safari에서 오른쪽 엣지를 스와이프 하는 경우 다음 페이지로 넘어갈 수 있는 영역(px)</ko>
     * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager의 옵션</ko>
    **/

    /**
     * @class eg.Axes.PanInput
     * @classdesc A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
     * @ko 마우스나 터치 스크린을 누르고 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
     *
     * @example
     * const pan = new eg.Axes.PanInput("#area", {
     * 		inputType: ["touch"],
     * 		scale: [1, 1.3],
     * });
     *
     * // Connect the 'something2' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
     * // Connect the 'somethingN' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
     * axes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);
     *
     * // Connect only one 'something1' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
     * axes.connect(["something1"], pan); // or axes.connect("something1", pan);
     *
     * // Connect only one 'something2' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
     * axes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);
     *
     * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput 모듈을 사용할 엘리먼트</ko>
     * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
     */

    var PanInput =
    /*#__PURE__*/
    function () {
      function PanInput(el, options) {
        this.axes = [];
        this.hammer = null;
        this.element = null;
        this.panRecognizer = null;
        this.isRightEdge = false;
        this.rightEdgeTimer = 0;
        this.panFlag = false;
        /**
         * Hammer helps you add support for touch gestures to your page
         *
         * @external Hammer
         * @see {@link http://hammerjs.github.io|Hammer.JS}
         * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
         * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
         */

        if (typeof Manager === "undefined") {
          throw new Error("The Hammerjs must be loaded before eg.Axes.PanInput.\nhttp://hammerjs.github.io/");
        }

        this.element = $(el);
        this.options = __assign({
          inputType: ["touch", "mouse", "pointer"],
          scale: [1, 1],
          thresholdAngle: 45,
          threshold: 0,
          iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
          releaseOnScroll: false,
          hammerManagerOptions: {
            // css properties were removed due to usablility issue
            // http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
            cssProps: {
              userSelect: "none",
              touchSelect: "none",
              touchCallout: "none",
              userDrag: "none"
            }
          }
        }, options);
        this.onHammerInput = this.onHammerInput.bind(this);
        this.onPanmove = this.onPanmove.bind(this);
        this.onPanend = this.onPanend.bind(this);
      }

      var __proto = PanInput.prototype;

      __proto.mapAxes = function (axes) {
        var useHorizontal = !!axes[0];
        var useVertical = !!axes[1];

        if (useHorizontal && useVertical) {
          this._direction = DIRECTION_ALL;
        } else if (useHorizontal) {
          this._direction = DIRECTION_HORIZONTAL;
        } else if (useVertical) {
          this._direction = DIRECTION_VERTICAL;
        } else {
          this._direction = DIRECTION_NONE;
        }

        this.axes = axes;
      };

      __proto.connect = function (observer) {
        var hammerOption = {
          direction: this._direction,
          threshold: this.options.threshold
        };

        if (this.hammer) {
          // for sharing hammer instance.
          // hammer remove previous PanRecognizer.
          this.removeRecognizer();
          this.dettachEvent();
        } else {
          var keyValue = this.element[UNIQUEKEY];

          if (!keyValue) {
            keyValue = String(Math.round(Math.random() * new Date().getTime()));
          }

          var inputClass = convertInputType(this.options.inputType);

          if (!inputClass) {
            throw new Error("Wrong inputType parameter!");
          }

          this.hammer = createHammer(this.element, __assign({
            inputClass: inputClass
          }, this.options.hammerManagerOptions));
          this.element[UNIQUEKEY] = keyValue;
        }

        this.panRecognizer = new PanRecognizer(hammerOption);
        this.hammer.add(this.panRecognizer);
        this.attachEvent(observer);
        return this;
      };

      __proto.disconnect = function () {
        this.removeRecognizer();

        if (this.hammer) {
          this.dettachEvent();
        }

        this._direction = DIRECTION_NONE;
        return this;
      };
      /**
      * Destroys elements, properties, and events used in a module.
      * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
      * @method eg.Axes.PanInput#destroy
      */


      __proto.destroy = function () {
        this.disconnect();

        if (this.hammer && this.hammer.recognizers.length === 0) {
          this.hammer.destroy();
        }

        delete this.element[UNIQUEKEY];
        this.element = null;
        this.hammer = null;
      };
      /**
       * Enables input devices
       * @ko 입력 장치를 사용할 수 있게 한다
       * @method eg.Axes.PanInput#enable
       * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.enable = function () {
        this.hammer && (this.hammer.get("pan").options.enable = true);
        return this;
      };
      /**
       * Disables input devices
       * @ko 입력 장치를 사용할 수 없게 한다.
       * @method eg.Axes.PanInput#disable
       * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.disable = function () {
        this.hammer && (this.hammer.get("pan").options.enable = false);
        return this;
      };
      /**
       * Returns whether to use an input device
       * @ko 입력 장치를 사용 여부를 반환한다.
       * @method eg.Axes.PanInput#isEnable
       * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
       */


      __proto.isEnable = function () {
        return !!(this.hammer && this.hammer.get("pan").options.enable);
      };

      __proto.removeRecognizer = function () {
        if (this.hammer && this.panRecognizer) {
          this.hammer.remove(this.panRecognizer);
          this.panRecognizer = null;
        }
      };

      __proto.onHammerInput = function (event) {
        if (this.isEnable()) {
          if (event.isFirst) {
            this.panFlag = false;

            if (event.srcEvent.cancelable !== false) {
              var edgeThreshold = this.options.iOSEdgeSwipeThreshold;
              this.observer.hold(this, event);
              this.isRightEdge = IS_IOS_SAFARI && event.center.x > window.innerWidth - edgeThreshold;
              this.panFlag = true;
            }
          } else if (event.isFinal) {
            this.onPanend(event);
          }
        }
      };

      __proto.onPanmove = function (event) {
        var _this = this;

        if (!this.panFlag) {
          return;
        }

        var _a = this.options,
            iOSEdgeSwipeThreshold = _a.iOSEdgeSwipeThreshold,
            releaseOnScroll = _a.releaseOnScroll;
        var userDirection = getDirectionByAngle(event.angle, this.options.thresholdAngle); // not support offset properties in Hammerjs - start

        var prevInput = this.hammer.session.prevInput;

        if (releaseOnScroll && !event.srcEvent.cancelable) {
          this.onPanend(__assign(__assign({}, event), {
            velocityX: 0,
            velocityY: 0,
            offsetX: 0,
            offsetY: 0
          }));
          return;
        }

        if (prevInput && IS_IOS_SAFARI) {
          var swipeLeftToRight = event.center.x < 0;

          if (swipeLeftToRight) {
            // iOS swipe left => right
            this.onPanend(__assign(__assign({}, prevInput), {
              velocityX: 0,
              velocityY: 0,
              offsetX: 0,
              offsetY: 0
            }));
            return;
          } else if (this.isRightEdge) {
            clearTimeout(this.rightEdgeTimer); // - is right to left

            var swipeRightToLeft = event.deltaX < -iOSEdgeSwipeThreshold;

            if (swipeRightToLeft) {
              this.isRightEdge = false;
            } else {
              // iOS swipe right => left
              this.rightEdgeTimer = window.setTimeout(function () {
                _this.onPanend(__assign(__assign({}, prevInput), {
                  velocityX: 0,
                  velocityY: 0,
                  offsetX: 0,
                  offsetY: 0
                }));
              }, 100);
            }
          }
        }
        /* eslint-disable no-param-reassign */


        if (prevInput) {
          event.offsetX = event.deltaX - prevInput.deltaX;
          event.offsetY = event.deltaY - prevInput.deltaY;
        } else {
          event.offsetX = 0;
          event.offsetY = 0;
        }

        var offset = this.getOffset([event.offsetX, event.offsetY], [useDirection(DIRECTION_HORIZONTAL, this._direction, userDirection), useDirection(DIRECTION_VERTICAL, this._direction, userDirection)]);
        var prevent = offset.some(function (v) {
          return v !== 0;
        });

        if (prevent) {
          var srcEvent = event.srcEvent;

          if (srcEvent.cancelable !== false) {
            srcEvent.preventDefault();
          }

          srcEvent.stopPropagation();
        }

        event.preventSystemEvent = prevent;
        prevent && this.observer.change(this, event, toAxis(this.axes, offset));
      };

      __proto.onPanend = function (event) {
        if (!this.panFlag) {
          return;
        }

        clearTimeout(this.rightEdgeTimer);
        this.panFlag = false;
        var offset = this.getOffset([Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1), Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1)], [useDirection(DIRECTION_HORIZONTAL, this._direction), useDirection(DIRECTION_VERTICAL, this._direction)]);
        offset = getNextOffset(offset, this.observer.options.deceleration);
        this.observer.release(this, event, toAxis(this.axes, offset));
      };

      __proto.attachEvent = function (observer) {
        this.observer = observer;
        this.hammer.on("hammer.input", this.onHammerInput).on("panstart panmove", this.onPanmove);
      };

      __proto.dettachEvent = function () {
        this.hammer.off("hammer.input", this.onHammerInput).off("panstart panmove", this.onPanmove);
        this.observer = null;
      };

      __proto.getOffset = function (properties, direction) {
        var offset = [0, 0];
        var scale = this.options.scale;

        if (direction[0]) {
          offset[0] = properties[0] * scale[0];
        }

        if (direction[1]) {
          offset[1] = properties[1] * scale[1];
        }

        return offset;
      };

      return PanInput;
    }();

    var STATE_TYPE;

    (function (STATE_TYPE) {
      STATE_TYPE[STATE_TYPE["IDLE"] = 0] = "IDLE";
      STATE_TYPE[STATE_TYPE["HOLDING"] = 1] = "HOLDING";
      STATE_TYPE[STATE_TYPE["DRAGGING"] = 2] = "DRAGGING";
      STATE_TYPE[STATE_TYPE["ANIMATING"] = 3] = "ANIMATING";
      STATE_TYPE[STATE_TYPE["DISABLED"] = 4] = "DISABLED";
    })(STATE_TYPE || (STATE_TYPE = {}));
    /**
     * A component that shows the current status of the user input or the animation
     * @ko 현재 사용자 입력 또는 애니메이션 상태를 나타내는 컴포넌트
     * @internal
     */


    var State =
    /*#__PURE__*/
    function () {
      function State() {}
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event of Axes
       * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      var __proto = State.prototype;

      __proto.onHold = function (ctx) {// DO NOTHING
      };
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event of Axes
       * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      __proto.onChange = function (ctx) {// DO NOTHING
      };
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of Axes
       * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      __proto.onRelease = function (ctx) {// DO NOTHING
      };
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event of Axes
       * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      __proto.onAnimationEnd = function (ctx) {// DO NOTHING
      };
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event of Axes<ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      __proto.onFinish = function (ctx) {// DO NOTHING
      };

      return State;
    }();

    /**
     * A default state when there's no user input and no animation's playing
     * @ko 사용자의 입력이 없고, 애니메이션이 동작하고있지 않은 기본 상태
     * @internal
     */

    var IdleState =
    /*#__PURE__*/
    function (_super) {
      __extends$1(IdleState, _super);

      function IdleState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {false}
         * @readonly
         */


        _this.holding = false;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {false}
         * @readonly
         */

        _this.animating = false;
        return _this;
      }

      var __proto = IdleState.prototype;

      __proto.onHold = function (ctx) {
        // Shouldn't do any action until any panels on flicking area
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;

        if (flicking.renderer.panelCount <= 0) {
          transitTo(STATE_TYPE.DISABLED);
          return;
        }

        var holdStartEvent = new ComponentEvent$1(EVENTS.HOLD_START, {
          axesEvent: axesEvent
        });
        flicking.trigger(holdStartEvent);

        if (holdStartEvent.isCanceled()) {
          transitTo(STATE_TYPE.DISABLED);
        } else {
          transitTo(STATE_TYPE.HOLDING);
        }
      }; // By methods call


      __proto.onChange = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;
        var controller = flicking.control.controller;
        var animatingContext = controller.animatingContext;
        var moveStartEvent = new ComponentEvent$1(EVENTS.MOVE_START, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection$1(animatingContext.start, animatingContext.end),
          axesEvent: axesEvent
        });
        flicking.trigger(moveStartEvent);

        if (moveStartEvent.isCanceled()) {
          transitTo(STATE_TYPE.DISABLED);
        } else {
          // Trigger AnimatingState's onChange, to trigger "move" event immediately
          transitTo(STATE_TYPE.ANIMATING).onChange(ctx);
        }
      };

      return IdleState;
    }(State);

    /**
     * A state that activates when user's holding the Flicking area, but not moved a single pixel yet
     * @ko 사용자의 입력이 시작되었으나, 아직 움직이지는 않은 상태
     * @internal
     */

    var HoldingState =
    /*#__PURE__*/
    function (_super) {
      __extends$1(HoldingState, _super);

      function HoldingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {true}
         * @readonly
         */


        _this.holding = true;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {false}
         * @readonly
         */

        _this.animating = false;
        _this._releaseEvent = null;
        return _this;
      }

      var __proto = HoldingState.prototype;

      __proto.onChange = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;
        var inputEvent = axesEvent.inputEvent;
        var offset = flicking.horizontal ? inputEvent.offsetX : inputEvent.offsetY;
        var moveStartEvent = new ComponentEvent$1(EVENTS.MOVE_START, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection$1(0, -offset),
          axesEvent: axesEvent
        });
        flicking.trigger(moveStartEvent);

        if (moveStartEvent.isCanceled()) {
          transitTo(STATE_TYPE.DISABLED);
        } else {
          // Trigger DraggingState's onChange, to trigger "move" event immediately
          transitTo(STATE_TYPE.DRAGGING).onChange(ctx);
        }
      };

      __proto.onRelease = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;
        flicking.trigger(new ComponentEvent$1(EVENTS.HOLD_END, {
          axesEvent: axesEvent
        }));

        if (axesEvent.delta.flick !== 0) {
          // Sometimes "release" event on axes triggered before "change" event
          // Especially if user flicked panel fast in really short amount of time
          // if delta is not zero, that means above case happened.
          // Event flow should be HOLD_START -> MOVE_START -> MOVE -> HOLD_END
          // At least one move event should be included between holdStart and holdEnd
          axesEvent.setTo({
            flick: flicking.camera.position
          }, 0);
          transitTo(STATE_TYPE.IDLE);
          return;
        } // Can't handle select event here,
        // As "finish" axes event happens


        this._releaseEvent = axesEvent;
      };

      __proto.onFinish = function (ctx) {
        var e_1, _a;

        var flicking = ctx.flicking,
            transitTo = ctx.transitTo; // Should transite to IDLE state before select event
        // As user expects hold is already finished

        transitTo(STATE_TYPE.IDLE);

        if (!this._releaseEvent) {
          return;
        } // Handle release event here
        // To prevent finish event called twice


        var releaseEvent = this._releaseEvent; // Static click

        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

        var srcEvent = releaseEvent.inputEvent.srcEvent;
        var clickedElement;

        if (srcEvent.type === "touchend") {
          var touchEvent = srcEvent;
          var touch = touchEvent.changedTouches[0];
          clickedElement = document.elementFromPoint(touch.clientX, touch.clientY);
        } else {
          clickedElement = srcEvent.target;
        }
        /* eslint-enable */


        var panels = flicking.renderer.panels;
        var clickedPanel = null;

        try {
          for (var panels_1 = __values$2(panels), panels_1_1 = panels_1.next(); !panels_1_1.done; panels_1_1 = panels_1.next()) {
            var panel = panels_1_1.value;

            if (panel.contains(clickedElement)) {
              clickedPanel = panel;
              break;
            }
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (panels_1_1 && !panels_1_1.done && (_a = panels_1.return)) _a.call(panels_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }

        if (clickedPanel) {
          var cameraPosition = flicking.camera.position;
          var clickedPanelPosition = clickedPanel.position;
          flicking.trigger(new ComponentEvent$1(EVENTS.SELECT, {
            index: clickedPanel.index,
            panel: clickedPanel,
            // Direction to the clicked panel
            direction: getDirection$1(cameraPosition, clickedPanelPosition)
          }));
        }
      };

      return HoldingState;
    }(State);

    /**
     * All possible @egjs/axes event keys
     * @internal
     */
    var EVENT = {
      HOLD: "hold",
      CHANGE: "change",
      RELEASE: "release",
      ANIMATION_END: "animationEnd",
      FINISH: "finish"
    };
    /**
     * An Axis key that Flicking uses
     * @internal
     */

    var POSITION_KEY = "flick";

    /**
     * A state that activates when user's dragging the Flicking area
     * @ko 사용자가 드래깅중인 상태
     * @internal
     */

    var DraggingState =
    /*#__PURE__*/
    function (_super) {
      __extends$1(DraggingState, _super);

      function DraggingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {true}
         * @readonly
         */


        _this.holding = true;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {true}
         * @readonly
         */

        _this.animating = true;
        return _this;
      }

      var __proto = DraggingState.prototype;

      __proto.onChange = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;

        if (!axesEvent.delta[POSITION_KEY]) {
          return;
        }

        var camera = flicking.camera;
        var prevPosition = camera.position;
        camera.lookAt(axesEvent.pos[POSITION_KEY]);
        var moveEvent = new ComponentEvent$1(EVENTS.MOVE, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection$1(0, axesEvent.delta[POSITION_KEY]),
          axesEvent: axesEvent
        });
        flicking.trigger(moveEvent);

        if (moveEvent.isCanceled()) {
          // Return to previous position
          camera.lookAt(prevPosition);
          transitTo(STATE_TYPE.DISABLED);
        }
      };

      __proto.onRelease = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo; // Update last position to cope with Axes's animating behavior
        // Axes uses start position when animation start

        flicking.trigger(new ComponentEvent$1(EVENTS.HOLD_END, {
          axesEvent: axesEvent
        }));

        if (flicking.renderer.panelCount <= 0) {
          // There're no panels
          transitTo(STATE_TYPE.IDLE);
          return;
        }

        transitTo(STATE_TYPE.ANIMATING);
        var control = flicking.control;
        var position = axesEvent.destPos[POSITION_KEY];
        var duration = Math.max(axesEvent.duration, flicking.duration);
        void control.moveToPosition(position, duration, axesEvent);
      };

      return DraggingState;
    }(State);

    /**
     * A state that activates when Flicking's animating by user input or method call
     * @ko 사용자 입력이나 메소드 호출에 의해 Flicking의 애니메이션이 동작중인 상태
     * @internal
     */

    var AnimatingState =
    /*#__PURE__*/
    function (_super) {
      __extends$1(AnimatingState, _super);

      function AnimatingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {false}
         * @readonly
         */


        _this.holding = false;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {true}
         * @readonly
         */

        _this.animating = true;
        return _this;
      }

      var __proto = AnimatingState.prototype;

      __proto.onHold = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;
        var holdStartEvent = new ComponentEvent$1(EVENTS.HOLD_START, {
          axesEvent: axesEvent
        });
        flicking.trigger(holdStartEvent);

        if (holdStartEvent.isCanceled()) {
          transitTo(STATE_TYPE.DISABLED);
        } else {
          transitTo(STATE_TYPE.DRAGGING);
        }
      };

      __proto.onChange = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;

        if (!axesEvent.delta.flick) {
          return;
        }

        var camera = flicking.camera;
        var prevPosition = camera.position;
        camera.lookAt(axesEvent.pos.flick);
        var moveEvent = new ComponentEvent$1(EVENTS.MOVE, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection$1(0, axesEvent.delta.flick),
          axesEvent: axesEvent
        });
        flicking.trigger(moveEvent);

        if (moveEvent.isCanceled()) {
          // Return to previous position
          flicking.camera.lookAt(prevPosition);
          transitTo(STATE_TYPE.DISABLED);
        }
      };

      __proto.onFinish = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo; // if (viewport.options.bound) {
        //   viewport.setCurrentPanel(this.targetPanel as Panel);
        // } else {
        //   viewport.setCurrentPanel(viewport.getNearestPanel() as Panel);
        // }

        var camera = flicking.camera;
        var anchorBelow = camera.findAnchorIncludePosition(camera.position);

        if (flicking.horizontal && flicking.adaptive && anchorBelow) {
          flicking.viewport.setSize({
            height: anchorBelow.panel.height
          });
        }

        transitTo(STATE_TYPE.IDLE);
        var controller = flicking.control.controller;
        var animatingContext = controller.animatingContext;
        flicking.trigger(new ComponentEvent$1(EVENTS.MOVE_END, {
          isTrusted: axesEvent.isTrusted,
          direction: getDirection$1(animatingContext.start, animatingContext.end),
          axesEvent: axesEvent
        }));
      };

      return AnimatingState;
    }(State);

    /**
     * A state that activates when Flicking is stopped by event's `stop` method
     * @ko 이벤트의 `stop`호출에 의해 Flicking이 정지된 상태
     * @internal
     */

    var DisabledState =
    /*#__PURE__*/
    function (_super) {
      __extends$1(DisabledState, _super);

      function DisabledState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {false}
         * @readonly
         */


        _this.holding = false;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {true}
         * @readonly
         */

        _this.animating = true;
        return _this;
      }

      var __proto = DisabledState.prototype;

      __proto.onAnimationEnd = function (ctx) {
        var transitTo = ctx.transitTo;
        transitTo(STATE_TYPE.IDLE);
      };

      __proto.onChange = function (ctx) {
        var axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo; // Can stop Axes's change event

        axesEvent.stop();
        transitTo(STATE_TYPE.IDLE);
      };

      __proto.onRelease = function (ctx) {
        var axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo; // This is needed when stopped hold start event

        if (axesEvent.delta.flick === 0) {
          transitTo(STATE_TYPE.IDLE);
        }
      };

      return DisabledState;
    }(State);

    /**
     * @internal
     */

    var StateMachine =
    /*#__PURE__*/
    function () {
      function StateMachine() {
        var _this = this;

        this.transitTo = function (nextStateType) {
          var nextState;

          switch (nextStateType) {
            case STATE_TYPE.IDLE:
              nextState = new IdleState();
              break;

            case STATE_TYPE.HOLDING:
              nextState = new HoldingState();
              break;

            case STATE_TYPE.DRAGGING:
              nextState = new DraggingState();
              break;

            case STATE_TYPE.ANIMATING:
              nextState = new AnimatingState();
              break;

            case STATE_TYPE.DISABLED:
              nextState = new DisabledState();
              break;
          }

          _this._state = nextState;
          return _this._state;
        };

        this._state = new IdleState();
      }

      var __proto = StateMachine.prototype;
      Object.defineProperty(__proto, "state", {
        get: function () {
          return this._state;
        },
        enumerable: false,
        configurable: true
      });

      __proto.fire = function (eventType, externalCtx) {
        var currentState = this._state;

        var ctx = __assign$1(__assign$1({}, externalCtx), {
          transitTo: this.transitTo
        });

        switch (eventType) {
          case EVENT.HOLD:
            currentState.onHold(ctx);
            break;

          case EVENT.CHANGE:
            currentState.onChange(ctx);
            break;

          case EVENT.RELEASE:
            currentState.onRelease(ctx);
            break;

          case EVENT.ANIMATION_END:
            currentState.onAnimationEnd(ctx);
            break;

          case EVENT.FINISH:
            currentState.onFinish(ctx);
            break;
        }
      };

      return StateMachine;
    }();

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
     * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 이벤트를 처리하는 컨트롤러 컴포넌트
     * @internal
     */

    var AxesController =
    /*#__PURE__*/
    function () {
      /** */
      function AxesController() {
        this._resetInternalValues();

        this._stateMachine = new StateMachine();
      }

      var __proto = AxesController.prototype;
      Object.defineProperty(__proto, "axes", {
        /**
         * An {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
         * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes}의 인스턴스
         * @type {Axes}
         * @see https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html
         * @readonly
         */
        get: function () {
          return this._axes;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "state", {
        /**
         * A activated {@link State} that shows the current status of the user input or the animation
         * @ko 현재 활성화된 {@link State} 인스턴스로 사용자 입력 또는 애니메이션 상태를 나타냅니다
         * @type {State}
         */
        get: function () {
          return this._stateMachine.state;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "animatingContext", {
        /**
         * A context of the current animation playing
         * @ko 현재 재생중인 애니메이션 정보
         * @type {object}
         * @property {number} start A start position of the animation<ko>애니메이션 시작 지점</ko>
         * @property {number} end A end position of the animation<ko>애니메이션 끝 지점</ko>
         * @property {number} offset camera offset<ko>카메라 오프셋</ko>
         * @readonly
         */
        get: function () {
          return this._animatingContext;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "enabled", {
        /**
         * A Boolean indicating whether the user input is enabled
         * @ko 현재 사용자 입력이 활성화되었는지를 나타내는 값
         * @type {boolean}
         * @readonly
         */
        get: function () {
          var _a, _b;

          return (_b = (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.isEnable()) !== null && _b !== void 0 ? _b : false;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        /**
         * Current position value in {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
         * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} 인스턴스 내부의 현재 좌표 값
         * @type {number}
         * @readonly
         */
        get: function () {
          var _a, _b;

          return (_b = (_a = this._axes) === null || _a === void 0 ? void 0 : _a.get([POSITION_KEY])[POSITION_KEY]) !== null && _b !== void 0 ? _b : 0;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize AxesController
       * @ko AxesController를 초기화합니다
       * @param {Flicking} flicking An instance of Flicking
       * @chainable
       * @return {this}
       */

      __proto.init = function (flicking) {
        var _a;

        var _this = this;

        this._flicking = flicking;
        this._axes = new Axes((_a = {}, _a[POSITION_KEY] = {
          range: [0, 0],
          circular: false,
          bounce: [0, 0]
        }, _a), {
          deceleration: flicking.deceleration,
          interruptable: flicking.interruptable,
          easing: flicking.easing
        });
        this._panInput = new PanInput(flicking.viewport.element, {
          inputType: flicking.inputType,
          iOSEdgeSwipeThreshold: flicking.iOSEdgeSwipeThreshold,
          scale: flicking.horizontal ? [-1, 0] : [0, -1]
        });
        var axes = this._axes;
        axes.connect(flicking.horizontal ? [POSITION_KEY, ""] : ["", POSITION_KEY], this._panInput);

        var _loop_1 = function (key) {
          var eventType = EVENT[key];
          axes.on(eventType, function (e) {
            _this._stateMachine.fire(eventType, {
              flicking: flicking,
              axesEvent: e
            });
          });
        };

        for (var key in EVENT) {
          _loop_1(key);
        }

        return this;
      };
      /**
       * Destroy AxesController and return to initial state
       * @ko AxesController를 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        var _a, _b;

        (_a = this._axes) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this._panInput) === null || _b === void 0 ? void 0 : _b.destroy();

        this._resetInternalValues();

        return this;
      };
      /**
       * Enable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 활성화합니다
       * @chainable
       * @return {this}
       */


      __proto.enable = function () {
        var _a;

        (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.enable();
        return this;
      };
      /**
       * Disable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 막습니다
       * @chainable
       * @return {this}
       */


      __proto.disable = function () {
        var _a;

        (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.disable();
        return this;
      };
      /**
       * Update {@link https://naver.github.io/egjs-axes/ @egjs/axes}'s state
       * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 상태를 갱신합니다
       * @chainable
       * @throws {FlickingError}
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link AxesController#init init} is not called before
       * <ko>{@link AxesController#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      __proto.update = function () {
        var _a;

        var flicking = getFlickingAttached(this._flicking, "Control");
        var camera = flicking.camera;
        var axes = this._axes;
        var controlParams = camera.controlParams;
        var axis = axes.axis[POSITION_KEY];
        axis.circular = [controlParams.circular, controlParams.circular];
        axis.range = [controlParams.range.min, controlParams.range.max];
        axis.bounce = parseBounce(flicking.bounce, camera.size);
        axes.axm.set((_a = {}, _a[POSITION_KEY] = controlParams.position, _a));
        return this;
      };
      /**
       * Run Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} using the given position
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} 메소드를 주어진 좌표를 이용하여 수행합니다
       * @param {number} position A position to move<ko>이동할 좌표</ko>
       * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
       * @param {number} [axesEvent] If provided, it'll use its {@link setTo} method instead
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
       */


      __proto.animateTo = function (position, duration, axesEvent) {
        var _a;

        var _this = this;

        var axes = this._axes;

        if (!axes) {
          return Promise.reject(new FlickingError(MESSAGE.NOT_ATTACHED_TO_FLICKING("Control"), CODE.NOT_ATTACHED_TO_FLICKING));
        }

        var startPos = axes.get([POSITION_KEY])[POSITION_KEY];

        if (startPos === position) {
          var flicking = getFlickingAttached(this._flicking, "Control");
          flicking.camera.lookAt(position);
          return Promise.resolve();
        }

        this._animatingContext = {
          start: startPos,
          end: position,
          offset: 0
        };

        var animate = function () {
          var _a, _b;

          var resetContext = function () {
            _this._animatingContext = {
              start: 0,
              end: 0,
              offset: 0
            };
          };

          axes.once(EVENT.FINISH, resetContext);

          if (axesEvent) {
            axesEvent.setTo((_a = {}, _a[POSITION_KEY] = position, _a), duration);
          } else {
            axes.setTo((_b = {}, _b[POSITION_KEY] = position, _b), duration);
          }
        };

        if (duration === 0) {
          animate();
          axes.axm.set((_a = {}, _a[POSITION_KEY] = position, _a));
          return Promise.resolve();
        } else {
          return new Promise(function (resolve, reject) {
            var animationFinishHandler = function () {
              axes.off(EVENT.HOLD, interruptionHandler);
              resolve();
            };

            var interruptionHandler = function () {
              axes.off(EVENT.FINISH, animationFinishHandler);
              reject(new FlickingError(MESSAGE.ANIMATION_INTERRUPTED, CODE.ANIMATION_INTERRUPTED));
            };

            axes.once(EVENT.FINISH, animationFinishHandler);

            if (!axesEvent) {
              axes.once(EVENT.HOLD, interruptionHandler);
            }

            animate();
          });
        }
      };

      __proto._resetInternalValues = function () {
        this._flicking = null;
        this._axes = null;
        this._panInput = null;
        this._animatingContext = {
          start: 0,
          end: 0,
          offset: 0
        };
      };

      return AxesController;
    }();

    /**
     * A component that manages inputs and animation of Flicking
     * @ko Flicking의 입력 장치 & 애니메이션을 담당하는 컴포넌트
     */

    var Control$1 =
    /*#__PURE__*/
    function () {
      /** */
      function Control() {
        var _this = this;

        this._setActivePanel = function (newActivePanel, prevActivePanel, isTrusted) {
          var _a;

          var flicking = getFlickingAttached(_this._flicking, "Control");
          _this._activePanel = newActivePanel;

          if (newActivePanel !== prevActivePanel) {
            flicking.trigger(new ComponentEvent$1(EVENTS.CHANGED, {
              index: newActivePanel.index,
              panel: newActivePanel,
              prevIndex: (_a = prevActivePanel === null || prevActivePanel === void 0 ? void 0 : prevActivePanel.index) !== null && _a !== void 0 ? _a : -1,
              prevPanel: prevActivePanel,
              isTrusted: isTrusted,
              direction: prevActivePanel ? getDirection$1(prevActivePanel.position, newActivePanel.position) : DIRECTION.NONE
            }));
          } else {
            flicking.trigger(new ComponentEvent$1(EVENTS.RESTORED, {
              isTrusted: isTrusted
            }));
          }
        };

        this._flicking = null;
        this._controller = new AxesController();
        this._activePanel = null;
      }

      var __proto = Control.prototype;
      Object.defineProperty(__proto, "controller", {
        /**
         * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
         * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 이벤트를 처리하는 컨트롤러 컴포넌트
         * @type {AxesController}
         * @readonly
         */
        get: function () {
          return this._controller;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "activeIndex", {
        /**
         * Index number of the {@link Flicking#currentPanel currentPanel}
         * @ko {@link Flicking#currentPanel currentPanel}의 인덱스 번호
         * @type {number}
         * @default 0
         * @readonly
         */
        get: function () {
          var _a, _b;

          return (_b = (_a = this._activePanel) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : -1;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "activePanel", {
        /**
         * Currently active panel
         * @ko 현재 선택된 패널
         * @type {Panel}
         * @readonly
         * @see Panel
         */
        get: function () {
          return this._activePanel;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "animating", {
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._controller.state.animating;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "holding", {
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._controller.state.holding;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize Control
       * @ko Control을 초기화합니다
       * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
       * @chainable
       * @return {this}
       */

      __proto.init = function (flicking) {
        this._flicking = flicking;

        this._controller.init(flicking);

        return this;
      };
      /**
       * Destroy Control and return to initial state
       * @ko Control을 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        this._controller.destroy();

        this._flicking = null;
        this._activePanel = null;
      };
      /**
       * Enable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 활성화합니다
       * @chainable
       * @return {this}
       */


      __proto.enable = function () {
        this._controller.enable();

        return this;
      };
      /**
       * Disable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 막습니다
       * @chainable
       * @return {this}
       */


      __proto.disable = function () {
        this._controller.disable();

        return this;
      };
      /**
       * Update {@link Control#controller controller}'s state
       * @ko {@link Control#controller controller}의 내부 상태를 갱신합니다
       * @chainable
       * @return {this}
       */


      __proto.updateInput = function () {
        this._controller.update();

        return this;
      };
      /**
       * Reset {@link Control#activePanel activePanel} to `null`
       * @ko {@link Control#activePanel activePanel}을 `null`로 초기화합니다
       * @chainable
       * @return {this}
       */


      __proto.resetActivePanel = function () {
        this._activePanel = null;
        return this;
      };
      /**
       * Move {@link Camera} to the given panel
       * @ko {@link Camera}를 해당 패널 위로 이동합니다
       * @param {Panel} panel The target panel to move<ko>이동할 패널</ko>
       * @param {object} options An options object<ko>옵션 오브젝트</ko>
       * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
       * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
       * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
       * @param {Constants.DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.moveToPanel = function (panel, _a) {
        var duration = _a.duration,
            _b = _a.direction,
            direction = _b === void 0 ? DIRECTION.NONE : _b,
            axesEvent = _a.axesEvent;
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, position, nearestAnchor, camPos_1, camRangeDiff, possiblePositions;
          return __generator(this, function (_c) {
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            position = panel.position;

            if (!camera.canReach(panel)) {
              nearestAnchor = camera.findNearestAnchor(position);

              if (panel.removed || !nearestAnchor) {
                return [2
                /*return*/
                , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(panel.position), CODE.POSITION_NOT_REACHABLE))];
              } // Override position & panel if that panel is not reachable


              position = nearestAnchor.position;
              panel = nearestAnchor.panel;
            } else if (camera.controlParams.circular) {
              camPos_1 = this._controller.position;
              camRangeDiff = camera.rangeDiff;
              possiblePositions = [position, position + camRangeDiff, position - camRangeDiff].filter(function (pos) {
                if (direction === DIRECTION.NONE) return true;
                return direction === DIRECTION.PREV ? pos <= camPos_1 : pos >= camPos_1;
              });
              position = possiblePositions.reduce(function (nearestPosition, pos) {
                if (Math.abs(camPos_1 - pos) < Math.abs(camPos_1 - nearestPosition)) {
                  return pos;
                } else {
                  return nearestPosition;
                }
              }, Infinity);
            }

            this._triggerIndexChangeEvent(panel, panel.position, axesEvent);

            return [2
            /*return*/
            , this._animateToPosition({
              position: position,
              duration: duration,
              newActivePanel: panel,
              axesEvent: axesEvent
            })];
          });
        });
      };

      __proto._triggerIndexChangeEvent = function (panel, position, axesEvent) {
        var _a;

        var flicking = getFlickingAttached(this._flicking, "Control");
        var triggeringEvent = panel !== this._activePanel ? EVENTS.WILL_CHANGE : EVENTS.WILL_RESTORE;
        var camera = flicking.camera;
        var activePanel = this._activePanel;
        var event = new ComponentEvent$1(triggeringEvent, {
          index: panel.index,
          panel: panel,
          isTrusted: (axesEvent === null || axesEvent === void 0 ? void 0 : axesEvent.isTrusted) || false,
          direction: getDirection$1((_a = activePanel === null || activePanel === void 0 ? void 0 : activePanel.position) !== null && _a !== void 0 ? _a : camera.position, position)
        });
        flicking.trigger(event);

        if (event.isCanceled()) {
          throw new FlickingError(MESSAGE.STOP_CALLED_BY_USER, CODE.STOP_CALLED_BY_USER);
        }
      };

      __proto._animateToPosition = function (_a) {
        var position = _a.position,
            duration = _a.duration,
            newActivePanel = _a.newActivePanel,
            axesEvent = _a.axesEvent;
        return __awaiter(this, void 0, void 0, function () {
          var currentPanel, animate, isTrusted;

          var _this = this;

          return __generator(this, function (_b) {
            currentPanel = this._activePanel;

            animate = function () {
              return _this._controller.animateTo(position, duration, axesEvent);
            };

            isTrusted = (axesEvent === null || axesEvent === void 0 ? void 0 : axesEvent.isTrusted) || false;

            if (duration === 0) {
              this._setActivePanel(newActivePanel, currentPanel, isTrusted);

              return [2
              /*return*/
              , animate()];
            } else {
              return [2
              /*return*/
              , animate().then(function () {
                return _this._setActivePanel(newActivePanel, currentPanel, isTrusted);
              })];
            }
          });
        });
      };

      return Control;
    }();

    /**
     * A {@link Control} that uses a release momentum to choose destination panel
     * @ko 입력을 중단한 시점의 가속도에 영향받아 도달할 패널을 계산하는 이동 방식을 사용하는 {@link Control}
     */

    var SnapControl =
    /*#__PURE__*/
    function (_super) {
      __extends$1(SnapControl, _super);

      function SnapControl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Move {@link Camera} to the given position
       * @ko {@link Camera}를 주어진 좌표로 이동합니다
       * @param {number} position The target position to move<ko>이동할 좌표</ko>
       * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
       * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
       * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
       */


      var __proto = SnapControl.prototype;

      __proto.moveToPosition = function (position, duration, axesEvent) {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, activePanel, clampedPosition, anchorAtPosition, prevPos, isOverThreshold, adjacentAnchor, targetPos, targetPanel;
          return __generator(this, function (_a) {
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            activePanel = this._activePanel;
            clampedPosition = camera.clampToReachablePosition(position);
            anchorAtPosition = camera.findNearestAnchor(clampedPosition);

            if (!anchorAtPosition || !activePanel) {
              return [2
              /*return*/
              , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE))];
            }

            prevPos = activePanel.position;
            isOverThreshold = Math.abs(position - prevPos) >= flicking.threshold;
            adjacentAnchor = position > prevPos ? camera.getNextAnchor(anchorAtPosition) : camera.getPrevAnchor(anchorAtPosition);

            if (isOverThreshold && anchorAtPosition.position !== activePanel.position) {
              // Move to anchor at position
              targetPanel = anchorAtPosition.panel;
              targetPos = anchorAtPosition.position;
            } else if (isOverThreshold && adjacentAnchor) {
              // Move to adjacent anchor
              targetPanel = adjacentAnchor.panel;
              targetPos = adjacentAnchor.position;
            } else {
              // Restore to active panel
              targetPos = activePanel.position;
              targetPanel = activePanel;
            }

            this._triggerIndexChangeEvent(targetPanel, position, axesEvent);

            return [2
            /*return*/
            , this._animateToPosition({
              position: targetPos,
              duration: duration,
              newActivePanel: targetPanel,
              axesEvent: axesEvent
            })];
          });
        });
      };

      return SnapControl;
    }(Control$1);

    /**
     * A {@link Control} that can be scrolled freely without alignment
     * @ko 패널이 정해진 지점에 정렬되지 않고, 자유롭게 스크롤할 수 있는 이동 방식을 사용하는 {@link Control}
     */

    var FreeControl =
    /*#__PURE__*/
    function (_super) {
      __extends$1(FreeControl, _super);

      function FreeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Move {@link Camera} to the given position
       * @ko {@link Camera}를 주어진 좌표로 이동합니다
       * @param {number} position The target position to move<ko>이동할 좌표</ko>
       * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
       * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
       * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
       */


      var __proto = FreeControl.prototype;

      __proto.moveToPosition = function (position, duration, axesEvent) {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, targetPos, anchorAtPosition, targetPanel;
          return __generator(this, function (_a) {
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            targetPos = camera.clampToReachablePosition(position);
            anchorAtPosition = camera.findAnchorIncludePosition(targetPos);

            if (!anchorAtPosition) {
              return [2
              /*return*/
              , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE))];
            }

            targetPanel = anchorAtPosition.panel;

            this._triggerIndexChangeEvent(targetPanel, position, axesEvent);

            return [2
            /*return*/
            , this._animateToPosition({
              position: position,
              duration: duration,
              newActivePanel: targetPanel,
              axesEvent: axesEvent
            })];
          });
        });
      };

      return FreeControl;
    }(Control$1);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Control = {
        __proto__: null,
        Control: Control$1,
        SnapControl: SnapControl,
        FreeControl: FreeControl,
        AxesController: AxesController,
        State: State,
        IdleState: IdleState,
        HoldingState: HoldingState,
        DraggingState: DraggingState,
        AnimatingState: AnimatingState,
        DisabledState: DisabledState,
        StateMachine: StateMachine
    };

    /**
     * A data component that has actual position where the camera should be stopped at
     * @ko 카메라가 정지해야하는 실제 위치를 담고 있는 데이터 컴포넌트
     */
    var AnchorPoint =
    /*#__PURE__*/
    function () {
      /**
       * @param {object} options An options object<ko>옵션 객체</ko>
       * @param {number} [options.index] Index of AnchorPoint<ko>AnchorPoint의 인덱스</ko>
       * @param {number} [options.position] Position of AnchorPoint<ko>AnchorPoint의 좌표</ko>
       * @param {Panel} [options.panel] A {@link Panel} instance AnchorPoint is referencing to<ko>AnchorPoint가 참조하고 있는 {@link Panel}</ko>
       */
      function AnchorPoint(_a) {
        var index = _a.index,
            position = _a.position,
            panel = _a.panel;
        this._index = index;
        this._pos = position;
        this._panel = panel;
      }

      var __proto = AnchorPoint.prototype;
      Object.defineProperty(__proto, "index", {
        /**
         * Index of AnchorPoint
         * @ko AnchorPoint의 인덱스
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._index;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        /**
         * Position of AnchorPoint
         * @ko AnchorPoint의 좌표
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._pos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panel", {
        /**
         * A {@link Panel} instance AnchorPoint is referencing to
         * @ko AnchorPoint가 참조하고 있는 {@link Panel}
         * @type {Panel}
         * @readonly
         */
        get: function () {
          return this._panel;
        },
        enumerable: false,
        configurable: true
      });
      return AnchorPoint;
    }();

    /**
     * A component that manages actual movement inside the viewport
     * @ko 뷰포트 내에서의 실제 움직임을 담당하는 컴포넌트
     */

    var Camera$1 =
    /*#__PURE__*/
    function () {
      /** */
      function Camera(_a) {
        var _this = this;

        var _b = _a === void 0 ? {} : _a,
            _c = _b.align,
            align = _c === void 0 ? ALIGN.CENTER : _c;

        this._checkTranslateSupport = function () {
          var e_1, _a;

          var transforms = ["webkitTransform", "msTransform", "MozTransform", "OTransform", "transform"];
          var supportedStyle = document.documentElement.style;
          var transformName = "";

          try {
            for (var transforms_1 = __values$2(transforms), transforms_1_1 = transforms_1.next(); !transforms_1_1.done; transforms_1_1 = transforms_1.next()) {
              var prefixedTransform = transforms_1_1.value;

              if (prefixedTransform in supportedStyle) {
                transformName = prefixedTransform;
              }
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (transforms_1_1 && !transforms_1_1.done && (_a = transforms_1.return)) _a.call(transforms_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }

          if (!transformName) {
            throw new FlickingError(MESSAGE.TRANSFORM_NOT_SUPPORTED, CODE.TRANSFORM_NOT_SUPPORTED);
          }

          _this._transform = transformName;
        };

        this._flicking = null;

        this._resetInternalValues(); // Options


        this._align = align;
      }

      var __proto = Camera.prototype;
      Object.defineProperty(__proto, "element", {
        // Internal states getter

        /**
         * The camera(`.flicking-camera`) element
         * @ko 카메라(`.flicking-camera`) 엘리먼트
         * @type {HTMLElement}
         * @readonly
         */
        get: function () {
          return this._el;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        /**
         * Current position of the camera
         * @ko Camera의 현재 좌표
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._position;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "alignPosition", {
        /**
         * Align position inside the viewport where {@link Panel}'s {@link Panel#alignPosition alignPosition} should be located at
         * @ko 패널의 정렬 기준 위치. 뷰포트 내에서 {@link Panel}의 {@link Panel#alignPosition alignPosition}이 위치해야 하는 곳입니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._alignPos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "offset", {
        /**
         * Position offset, used for the {@link Flicking#renderOnlyVisible renderOnlyVisible} option
         * @ko Camera의 좌표 오프셋. {@link Flicking#renderOnlyVisible renderOnlyVisible} 옵션을 위해 사용됩니다.
         * @type {number}
         * @default 0
         */
        get: function () {
          return this._offset;
        },
        set: function (val) {
          this._offset = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "range", {
        /**
         * A range that Camera's {@link Camera#position position} can reach
         * @ko Camera의 {@link Camera#position position}이 도달 가능한 범위
         * @type {object}
         * @property {number} min A minimum position<ko>최소 위치</ko>
         * @property {number} min A maximum position<ko>최대 위치</ko>
         * @readonly
         */
        get: function () {
          return this._range;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "rangeDiff", {
        /**
         * A difference between Camera's minimum and maximum position that can reach
         * @ko Camera가 도달 가능한 최소/최대 좌표의 차이
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._range.max - this._range.min;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visiblePanels", {
        /**
         * An array of visible panels from the current position
         * @ko 현재 보이는 패널들의 배열
         * @type {Panel[]}
         * @readonly
         */
        get: function () {
          return this._visiblePanels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visibleRange", {
        /**
         * A range of the visible area from the current position
         * @ko 현재 위치에서 보이는 범위
         * @type {object}
         * @property {number} min A minimum position<ko>최소 위치</ko>
         * @property {number} min A maximum position<ko>최대 위치</ko>
         * @readonly
         */
        get: function () {
          return {
            min: this._position - this._alignPos,
            max: this._position - this._alignPos + this.size
          };
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "anchorPoints", {
        /**
         * An array of {@link AnchorPoint}s that Camera can be stopped at
         * @ko 카메라가 도달 가능한 {@link AnchorPoint}의 목록
         * @type {AnchorPoint[]}
         * @readonly
         */
        get: function () {
          return this._anchors;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "controlParams", {
        /**
         * A current parameters of the Camera for updating {@link AxesController}
         * @ko {@link AxesController}를 업데이트하기 위한 현재 Camera 패러미터들
         * @type {object}
         * @property {object} range Camera {@link Camera#range range}<ko>Camera가 도달 가능한 범위({@link Camera#range range})</ko>
         * @property {number} position Current position<ko>현재 좌표</ko>
         * @property {boolean} circular A Boolean indicating whether the {@link Flicking#circular circular} option is enabled<ko>{@link Flicking#circular circular}옵션 활성화 여부</ko>
         * @readonly
         */
        get: function () {
          return {
            range: this._range,
            position: this._position,
            circular: false
          };
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "atEdge", {
        /**
         * A Boolean value indicating whether Camera's over the minimum or maximum position reachable
         * @ko 현재 카메라가 도달 가능한 범위의 최소 혹은 최대점을 넘어섰는지를 나타냅니다
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._position <= this._range.min || this._position >= this._range.max;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "size", {
        /**
         * Return the size of the viewport
         * @ko 뷰포트 크기를 반환합니다
         * @type {number}
         * @readonly
         */
        get: function () {
          var flicking = this._flicking;
          return flicking ? flicking.horizontal ? flicking.viewport.width : flicking.viewport.height : 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter

        /**
         * A value indicating where the {@link Camera#alignPosition alignPosition} should be located at inside the viewport element
         * @ko {@link Camera#alignPosition alignPosition}이 뷰포트 엘리먼트 내의 어디에 위치해야 하는지를 나타내는 값
         * @type {Constants.ALIGN | string | number}
         */
        get: function () {
          return this._align;
        },
        // Options Setter
        set: function (val) {
          this._align = val;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize Camera
       * @ko Camera를 초기화합니다
       * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
       * @chainable
       * @throws {FlickingError}
       * {@link Constants.ERROR_CODE VAL_MUST_NOT_NULL} If the camera element(`.flicking-camera`) does not exist inside viewport element
       * <ko>{@link Constants.ERROR_CODE VAL_MUST_NOT_NULL} 뷰포트 엘리먼트 내부에 카메라 엘리먼트(`.flicking-camera`)가 존재하지 않을 경우</ko>
       * @return {this}
       */

      __proto.init = function (flicking) {
        this._flicking = flicking;
        var viewportEl = flicking.viewport.element;
        checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
        this._el = viewportEl.firstElementChild;

        this._checkTranslateSupport();

        return this;
      };
      /**
       * Destroy Camera and return to initial state
       * @ko Camera를 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        this._flicking = null;

        this._resetInternalValues();

        return this;
      };
      /**
       * Move to the given position and apply CSS transform
       * @ko 해당 좌표로 이동하고, CSS transform을 적용합니다
       * @param {number} pos A new position<ko>움직일 위치</ko>
       * @throws {FlickingError}
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      __proto.lookAt = function (pos) {
        var prevPos = this._position;
        this._position = pos;

        this._refreshVisiblePanels();

        this._checkNeedPanel();

        this._checkReachEnd(prevPos, pos);

        this._applyTransform();

        return this;
      };
      /**
       * Return a previous {@link AnchorPoint} of given {@link AnchorPoint}
       * If it does not exist, return `null` instead
       * @ko 주어진 {@link AnchorPoint}의 이전 {@link AnchorPoint}를 반환합니다
       * 존재하지 않을 경우 `null`을 반환합니다
       * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>기준 {@link AnchorPoint}</ko>
       * @return {AnchorPoint | null} The previous {@link AnchorPoint}<ko>이전 {@link AnchorPoint}</ko>
       */


      __proto.getPrevAnchor = function (anchor) {
        return this._anchors[anchor.index - 1] || null;
      };
      /**
       * Return a next {@link AnchorPoint} of given {@link AnchorPoint}
       * If it does not exist, return `null` instead
       * @ko 주어진 {@link AnchorPoint}의 다음 {@link AnchorPoint}를 반환합니다
       * 존재하지 않을 경우 `null`을 반환합니다
       * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>기준 {@link AnchorPoint}</ko>
       * @return {AnchorPoint | null} The next {@link AnchorPoint}<ko>다음 {@link AnchorPoint}</ko>
       */


      __proto.getNextAnchor = function (anchor) {
        return this._anchors[anchor.index + 1] || null;
      };
      /**
       * Return {@link AnchorPoint} that includes given position
       * If there's no {@link AnchorPoint} that includes the given position, return `null` instead
       * @ko 주어진 좌표를 포함하는 {@link AnchorPoint}를 반환합니다
       * 주어진 좌표를 포함하는 {@link AnchorPoint}가 없을 경우 `null`을 반환합니다
       * @param {number} position A position to check<ko>확인할 좌표</ko>
       * @return {AnchorPoint | null} The {@link AnchorPoint} that includes the given position<ko>해당 좌표를 포함하는 {@link AnchorPoint}</ko>
       */


      __proto.findAnchorIncludePosition = function (position) {
        var e_2, _a;

        var anchors = this._anchors;

        try {
          for (var anchors_1 = __values$2(anchors), anchors_1_1 = anchors_1.next(); !anchors_1_1.done; anchors_1_1 = anchors_1.next()) {
            var anchor = anchors_1_1.value;

            if (anchor.panel.includePosition(position, true)) {
              return anchor;
            }
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (anchors_1_1 && !anchors_1_1.done && (_a = anchors_1.return)) _a.call(anchors_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }

        return null;
      };
      /**
       * Return {@link AnchorPoint} nearest to given position
       * If there're no {@link AnchorPoint}s, return `null` instead
       * @ko 해당 좌표에서 가장 가까운 {@link AnchorPoint}를 반환합니다
       * {@link AnchorPoint}가 하나도 없을 경우 `null`을 반환합니다
       * @param {number} position A position to check<ko>확인할 좌표</ko>
       * @return {AnchorPoint | null} The {@link AnchorPoint} nearest to the given position<ko>해당 좌표에 가장 인접한 {@link AnchorPoint}</ko>
       */


      __proto.findNearestAnchor = function (position) {
        var anchors = this._anchors;
        if (anchors.length <= 0) return null;
        var prevDist = Infinity;

        for (var anchorIdx = 0; anchorIdx < anchors.length; anchorIdx++) {
          var anchor = anchors[anchorIdx];
          var dist = Math.abs(anchor.position - position);

          if (dist > prevDist) {
            // Return previous anchor
            return anchors[anchorIdx - 1];
          }

          prevDist = dist;
        } // Return last anchor


        return anchors[anchors.length - 1];
      };
      /**
       * Clamp the given position between camera's range
       * @ko 주어진 좌표를 Camera가 도달 가능한 범위 사이의 값으로 만듭니다
       * @param {number} position A position to clamp<ko>범위를 제한할 좌표</ko>
       * @return {number} A clamped position<ko>범위 제한된 좌표</ko>
       */


      __proto.clampToReachablePosition = function (position) {
        var range = this._range;
        return clamp(position, range.min, range.max);
      };
      /**
       * Check whether the given panel is inside of the Camera's range
       * @ko 해당 {@link Panel}이 Camera가 도달 가능한 범위 내에 있는지를 반환합니다
       * @param panel An instance of {@link Panel} to check<ko>확인할 {@link Panel}의 인스턴스</ko>
       * @return {boolean} Whether the panel's inside Camera's range<ko>도달 가능한 범위 내에 해당 패널이 존재하는지 여부</ko>
       */


      __proto.canReach = function (panel) {
        var range = this._range;
        if (panel.removed) return false;
        var panelPos = panel.position;
        return panelPos >= range.min && panelPos <= range.max;
      };
      /**
       * Check whether the given panel element is visible at the current position
       * @ko 현재 좌표에서 해당 패널 엘리먼트를 볼 수 있는지 여부를 반환합니다
       * @param panel An instance of {@link Panel} to check<ko>확인할 {@link Panel}의 인스턴스</ko>
       * @return Whether the panel element is visible at the current position<ko>현재 위치에서 해당 패널 엘리먼트가 보이는지 여부</ko>
       */


      __proto.canSee = function (panel) {
        var visibleRange = this.visibleRange; // Should not include margin, as we don't declare what the margin is visible as what the panel is visible.

        return panel.includeRange(visibleRange.min, visibleRange.max, false);
      };
      /**
       * Update Camera's {@link Camera#alignPosition alignPosition}
       * @ko Camera의 {@link Camera#alignPosition alignPosition}을 업데이트합니다
       * @chainable
       * @return {this}
       */


      __proto.updateAlignPos = function () {
        var align = this._align;
        var alignVal = typeof align === "object" ? align.camera : align;
        this._alignPos = parseAlign(alignVal, this.size);
        return this;
      };
      /**
       * Update Camera's {@link Camera#anchorPoints anchorPoints}
       * @ko Camera의 {@link Camera#anchorPoints anchorPoints}를 업데이트합니다
       * @throws {FlickingError}
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @chainable
       * @return {this}
       */


      __proto.updateAnchors = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var panels = flicking.renderer.panels;
        this._anchors = panels.map(function (panel, index) {
          return new AnchorPoint({
            index: index,
            position: panel.position,
            panel: panel
          });
        });
        return this;
      };
      /**
       * Update position after resizing
       * @ko resize 이후에 position을 업데이트합니다
       * @throws {FlickingError}
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @chainable
       * @return {this}
       */


      __proto.updatePosition = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var activePanel = flicking.control.activePanel;

        if (activePanel) {
          this.lookAt(activePanel.position);
        }

        return this;
      };
      /**
       * Reset the history of {@link Flicking#event:needPanel needPanel} events so it can be triggered again
       * @ko 발생한 {@link Flicking#event:needPanel needPanel} 이벤트들을 초기화하여 다시 발생할 수 있도록 합니다
       * @chainable
       * @return {this}
       */


      __proto.resetNeedPanelHistory = function () {
        this._needPanelTriggered = {
          prev: false,
          next: false
        };
        return this;
      };

      __proto._resetInternalValues = function () {
        this._position = 0;
        this._alignPos = 0;
        this._offset = 0;
        this._range = {
          min: 0,
          max: 0
        };
        this._visiblePanels = [];
        this._anchors = [];
        this._needPanelTriggered = {
          prev: false,
          next: false
        };
      };

      __proto._refreshVisiblePanels = function () {
        var _this = this;

        var flicking = getFlickingAttached(this._flicking, "Camera");
        var panels = flicking.renderer.panels;
        var newVisiblePanels = panels.filter(function (panel) {
          return _this.canSee(panel);
        });
        var prevVisiblePanels = this._visiblePanels;
        this._visiblePanels = newVisiblePanels;
        var added = newVisiblePanels.filter(function (panel) {
          return !includes(prevVisiblePanels, panel);
        });
        var removed = prevVisiblePanels.filter(function (panel) {
          return !includes(newVisiblePanels, panel);
        });

        if (added.length > 0 || removed.length > 0) {
          flicking.renderer.render();
          flicking.trigger(new ComponentEvent$1(EVENTS.VISIBLE_CHANGE, {
            added: added,
            removed: removed,
            visiblePanels: newVisiblePanels
          }));
        }
      };

      __proto._checkNeedPanel = function () {
        var needPanelTriggered = this._needPanelTriggered;
        if (needPanelTriggered.prev && needPanelTriggered.next) return;
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var panels = flicking.renderer.panels;

        if (panels.length <= 0) {
          if (!needPanelTriggered.prev) {
            flicking.trigger(new ComponentEvent$1(EVENTS.NEED_PANEL, {
              direction: DIRECTION.PREV
            }));
            needPanelTriggered.prev = true;
          }

          if (!needPanelTriggered.next) {
            flicking.trigger(new ComponentEvent$1(EVENTS.NEED_PANEL, {
              direction: DIRECTION.NEXT
            }));
            needPanelTriggered.next = true;
          }

          return;
        }

        var cameraPosition = this._position;
        var cameraSize = this.size;
        var cameraRange = this._range;
        var needPanelThreshold = flicking.needPanelThreshold;
        var cameraPrev = cameraPosition - this._alignPos;
        var cameraNext = cameraPrev + cameraSize;
        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];

        if (!needPanelTriggered.prev) {
          var firstPanelPrev = firstPanel.range.min;

          if (cameraPrev <= firstPanelPrev + needPanelThreshold || cameraPosition <= cameraRange.min + needPanelThreshold) {
            flicking.trigger(new ComponentEvent$1(EVENTS.NEED_PANEL, {
              direction: DIRECTION.PREV
            }));
            needPanelTriggered.prev = true;
          }
        }

        if (!needPanelTriggered.next) {
          var lastPanelNext = lastPanel.range.max;

          if (cameraNext >= lastPanelNext - needPanelThreshold || cameraPosition >= cameraRange.max - needPanelThreshold) {
            flicking.trigger(new ComponentEvent$1(EVENTS.NEED_PANEL, {
              direction: DIRECTION.NEXT
            }));
            needPanelTriggered.next = true;
          }
        }
      };

      __proto._checkReachEnd = function (prevPos, newPos) {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var range = this._range;
        var wasBetweenRange = prevPos > range.min && prevPos < range.max;
        var isBetweenRange = newPos > range.min && newPos < range.max;
        if (!wasBetweenRange || isBetweenRange) return;
        var direction = newPos <= range.min ? DIRECTION.PREV : DIRECTION.NEXT;
        flicking.trigger(new ComponentEvent$1(EVENTS.REACH_EDGE, {
          direction: direction
        }));
      };

      __proto._applyTransform = function () {
        var el = this._el;
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var actualPosition = this._position - this._alignPos - this._offset;
        el.style[this._transform] = flicking.horizontal ? "translate(" + -actualPosition + "px)" : "translate(0, " + -actualPosition + "px)";
      };

      return Camera;
    }();

    /**
     * A {@link Camera} that can move from the position of the first panel to the position of the last panel
     * @ko 첫번째 패널의 좌표로부터 마지막 패널의 좌표로까지 이동할 수 있는 종류의 {@link Camera}
     */

    var LinearCamera =
    /*#__PURE__*/
    function (_super) {
      __extends$1(LinearCamera, _super);

      function LinearCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Update {@link Camera#range range} of Camera
       * @ko Camera의 {@link Camera#range range}를 업데이트합니다
       * @chainable
       * @throws {FlickingError}
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      var __proto = LinearCamera.prototype;

      __proto.updateRange = function () {
        var _a, _b;

        var flicking = getFlickingAttached(this._flicking, "Camera");
        var renderer = flicking.renderer;
        var firstPanel = renderer.getPanel(0);
        var lastPanel = renderer.getPanel(renderer.panelCount - 1);
        this._range = {
          min: (_a = firstPanel === null || firstPanel === void 0 ? void 0 : firstPanel.position) !== null && _a !== void 0 ? _a : 0,
          max: (_b = lastPanel === null || lastPanel === void 0 ? void 0 : lastPanel.position) !== null && _b !== void 0 ? _b : 0
        };
        return this;
      };

      return LinearCamera;
    }(Camera$1);

    /**
     * A {@link Camera} that connects the last panel and the first panel, enabling continuous loop
     * @ko 첫번째 패널과 마지막 패널이 이어진 상태로, 무한히 회전할 수 있는 종류의 {@link Camera}
     */

    var CircularCamera =
    /*#__PURE__*/
    function (_super) {
      __extends$1(CircularCamera, _super);

      function CircularCamera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this._circularOffset = 0;
        _this._circularEnabled = false;
        _this._panelTooglePoints = {};
        return _this;
      }

      var __proto = CircularCamera.prototype;
      Object.defineProperty(__proto, "controlParams", {
        get: function () {
          return {
            range: this._range,
            position: this._position,
            circular: this._circularEnabled
          };
        },
        enumerable: false,
        configurable: true
      });

      __proto.getPrevAnchor = function (anchor) {
        if (!this._circularEnabled || anchor.index !== 0) return _super.prototype.getPrevAnchor.call(this, anchor);
        var anchors = this._anchors;
        var rangeDiff = this.rangeDiff;
        var lastAnchor = anchors[anchors.length - 1];
        return new AnchorPoint({
          index: lastAnchor.index,
          position: lastAnchor.position - rangeDiff,
          panel: lastAnchor.panel
        });
      };

      __proto.getNextAnchor = function (anchor) {
        var anchors = this._anchors;
        if (!this._circularEnabled || anchor.index !== anchors.length - 1) return _super.prototype.getNextAnchor.call(this, anchor);
        var rangeDiff = this.rangeDiff;
        var firstAnchor = anchors[0];
        return new AnchorPoint({
          index: firstAnchor.index,
          position: firstAnchor.position + rangeDiff,
          panel: firstAnchor.panel
        });
      };

      __proto.findAnchorIncludePosition = function (position) {
        if (!this._circularEnabled) return _super.prototype.findAnchorIncludePosition.call(this, position);
        var range = this._range;
        var positionInRange = circulatePosition(position, range.min, range.max);

        var anchorInRange = _super.prototype.findAnchorIncludePosition.call(this, positionInRange);

        if (!anchorInRange) return null;
        var rangeDiff = this.rangeDiff;

        if (position < range.min) {
          var loopCount = -Math.floor((range.min - position) / rangeDiff) - 1;
          return new AnchorPoint({
            index: anchorInRange.index,
            position: anchorInRange.position + rangeDiff * loopCount,
            panel: anchorInRange.panel
          });
        } else if (position > range.max) {
          var loopCount = Math.floor((position - range.max) / rangeDiff) + 1;
          return new AnchorPoint({
            index: anchorInRange.index,
            position: anchorInRange.position + rangeDiff * loopCount,
            panel: anchorInRange.panel
          });
        }

        return anchorInRange;
      };

      __proto.clampToReachablePosition = function (position) {
        // Basically all position is reachable for circular camera
        return this._circularEnabled ? position : _super.prototype.clampToReachablePosition.call(this, position);
      };

      __proto.canReach = function (panel) {
        if (panel.removed) return false;
        return this._circularEnabled // Always reachable on circular mode
        ? true : _super.prototype.canReach.call(this, panel);
      };

      __proto.canSee = function (panel) {
        var range = this._range;
        var rangeDiff = this.rangeDiff;
        var visibleRange = this.visibleRange;

        var visibleInCurrentRange = _super.prototype.canSee.call(this, panel);

        if (!this._circularEnabled) {
          return visibleInCurrentRange;
        } // Check looped visible area for circular case


        if (visibleRange.min < range.min) {
          return visibleInCurrentRange || panel.includeRange(visibleRange.min + rangeDiff, visibleRange.max + rangeDiff, false);
        } else if (visibleRange.max > range.max) {
          return visibleInCurrentRange || panel.includeRange(visibleRange.min - rangeDiff, visibleRange.max - rangeDiff, false);
        }

        return visibleInCurrentRange;
      };
      /**
       * Update {@link Camera#range range} of Camera
       * @ko Camera의 {@link Camera#range range}를 업데이트합니다
       * @chainable
       * @throws {FlickingError}
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      __proto.updateRange = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var renderer = flicking.renderer;
        var panels = renderer.panels;

        if (panels.length <= 0) {
          this._resetInternalValues();

          return this;
        }

        var position = this._position;
        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];
        var firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
        var lastPanelNext = lastPanel.range.max + lastPanel.margin.next;
        var visibleSize = this.size;
        var panelSizeSum = lastPanelNext - firstPanelPrev;
        var canSetCircularMode = panels.every(function (panel) {
          return panelSizeSum - panel.size >= visibleSize;
        });

        if (canSetCircularMode) {
          this._range = {
            min: firstPanelPrev,
            max: lastPanelNext
          };
          var panelTooglePoints_1 = {};
          var alignPos_1 = this._alignPos;
          var shouldBeToggledPrev_1 = [];
          var togglePointPrev_1 = [];
          var shouldBeToggledNext_1 = [];
          var togglePointNext_1 = [];
          var range_1 = this._range;
          var minimumVisible_1 = range_1.min - alignPos_1;
          var maximumVisible_1 = range_1.max - alignPos_1 + visibleSize;
          panels.forEach(function (panel) {
            var shouldBeVisibleAtMin = panel.includeRange(maximumVisible_1 - visibleSize, maximumVisible_1, false);
            var shouldBeVisibleAtMax = panel.includeRange(minimumVisible_1, minimumVisible_1 + visibleSize, false);

            if (shouldBeVisibleAtMin) {
              var togglePos = panel.range.max + range_1.min - range_1.max + alignPos_1;
              var shouldToggle = togglePos > position;
              var togglePoint = {
                panel: panel,
                direction: DIRECTION.PREV,
                toggled: shouldToggle
              };
              panelTooglePoints_1[togglePos] = togglePoint;

              if (shouldToggle) {
                shouldBeToggledPrev_1.push(panel);
                togglePointPrev_1.push(togglePoint);
              }
            }

            if (shouldBeVisibleAtMax) {
              var togglePos = panel.range.min + range_1.max - visibleSize + alignPos_1;
              var shouldToggle = togglePos < position;
              var togglePoint = {
                panel: panel,
                direction: DIRECTION.NEXT,
                toggled: false
              };
              panelTooglePoints_1[togglePos] = togglePoint;

              if (shouldToggle) {
                shouldBeToggledNext_1.push(panel);
                togglePointNext_1.push(togglePoint);
              }
            }
          });
          renderer.elementManipulator.movePanelElementsToStart(shouldBeToggledPrev_1, togglePointPrev_1);
          renderer.elementManipulator.movePanelElementsToEnd(shouldBeToggledNext_1, togglePointNext_1);
          this._circularOffset = this._calcPanelAreaSum(shouldBeToggledPrev_1) - this._calcPanelAreaSum(shouldBeToggledNext_1);
          this._panelTooglePoints = panelTooglePoints_1;
        } else {
          this._range = {
            min: firstPanel.position,
            max: lastPanel.position
          };
          this._circularOffset = 0;
          this._panelTooglePoints = {};
        }

        this._circularEnabled = canSetCircularMode;
        return this;
      };

      __proto.lookAt = function (pos) {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var prevPos = this._position;
        var panelTooglePoints = this._panelTooglePoints;
        var elementManipulator = flicking.renderer.elementManipulator;
        var togglePoints = Object.keys(panelTooglePoints).map(function (pointString) {
          return parseFloat(pointString);
        }).sort(function (a, b) {
          return a - b;
        });
        if (pos === prevPos) return _super.prototype.lookAt.call(this, pos);

        if (pos > prevPos) {
          var togglePointInfos_1 = [];
          var passedPanels = togglePoints.reduce(function (passed, togglePoint) {
            var togglePointInfo = panelTooglePoints[togglePoint];
            var passedPoint = togglePoint >= prevPos && togglePoint <= pos;
            var shouldToggle = togglePointInfo.direction === DIRECTION.NEXT && !togglePointInfo.toggled || togglePointInfo.direction === DIRECTION.PREV && togglePointInfo.toggled;

            if (passedPoint && shouldToggle) {
              togglePointInfo.toggled = !togglePointInfo.toggled;
              passed.push(togglePointInfo.panel);
              togglePointInfos_1.push(togglePointInfo);
            }

            return passed;
          }, []);
          elementManipulator.movePanelElementsToEnd(passedPanels, togglePointInfos_1);
          this._circularOffset -= this._calcPanelAreaSum(passedPanels);
        } else {
          var togglePointInfos_2 = [];
          var passedPanels = togglePoints.reduce(function (passed, togglePoint) {
            var togglePointInfo = panelTooglePoints[togglePoint];
            var passedPoint = togglePoint <= prevPos && togglePoint >= pos;
            var shouldToggle = togglePointInfo.direction === DIRECTION.NEXT && togglePointInfo.toggled || togglePointInfo.direction === DIRECTION.PREV && !togglePointInfo.toggled;

            if (passedPoint && shouldToggle) {
              togglePointInfo.toggled = !togglePointInfo.toggled;
              passed.push(togglePointInfo.panel);
              togglePointInfos_2.push(togglePointInfo);
            }

            return passed;
          }, []);
          elementManipulator.movePanelElementsToStart(passedPanels, togglePointInfos_2);
          this._circularOffset += this._calcPanelAreaSum(passedPanels);
        }

        flicking.renderer.render();
        return _super.prototype.lookAt.call(this, pos);
      };

      __proto._applyTransform = function () {
        var el = this._el;
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var actualPosition = this._position - this._alignPos - this._offset + this._circularOffset;
        el.style[this._transform] = flicking.horizontal ? "translate(" + -actualPosition + "px)" : "translate(0, " + -actualPosition + "px)";
      };

      __proto._resetInternalValues = function () {
        _super.prototype._resetInternalValues.call(this);

        this._circularOffset = 0;
        this._circularEnabled = false;
        this._panelTooglePoints = {};
      };

      __proto._calcPanelAreaSum = function (panels) {
        return panels.reduce(function (sum, panel) {
          return sum + panel.sizeIncludingMargin;
        }, 0);
      };

      return CircularCamera;
    }(Camera$1);

    /**
     * A {@link Camera} that set range not to go out of the first/last panel, so it won't show empty spaces before/after the first/last panel
     * @ko 첫번째와 마지막 패널 밖으로 넘어가지 못하도록 범위를 설정하여, 첫번째/마지막 패널 전/후의 빈 공간을 보이지 않도록 하는 종류의 {@link Camera}
     */

    var BoundCamera =
    /*#__PURE__*/
    function (_super) {
      __extends$1(BoundCamera, _super);

      function BoundCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Update {@link Camera#range range} of Camera
       * @ko Camera의 {@link Camera#range range}를 업데이트합니다
       * @chainable
       * @throws {FlickingError}
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      var __proto = BoundCamera.prototype;

      __proto.updateRange = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var renderer = flicking.renderer;
        var alignPos = this._alignPos;
        var firstPanel = renderer.getPanel(0);
        var lastPanel = renderer.getPanel(renderer.panelCount - 1);

        if (!firstPanel || !lastPanel) {
          this._range = {
            min: 0,
            max: 0
          };
          return this;
        }

        var viewportSize = this.size;
        var firstPanelPrev = firstPanel.range.min;
        var lastPanelNext = lastPanel.range.max;
        var panelAreaSize = lastPanelNext - firstPanelPrev;
        var canSetBoundMode = viewportSize < panelAreaSize;

        if (canSetBoundMode) {
          this._range = {
            min: firstPanelPrev + alignPos,
            max: lastPanelNext - viewportSize + alignPos
          };
        } else {
          this._range = {
            min: firstPanel.position,
            max: lastPanel.position
          };
        }

        return this;
      };

      __proto.updateAnchors = function () {
        var _this = this;

        var flicking = getFlickingAttached(this._flicking, "Camera");
        var panels = flicking.renderer.panels;

        if (panels.length <= 0) {
          this._anchors = [];
          return this;
        }

        var range = this._range;
        var reachablePanels = panels.filter(function (panel) {
          return _this.canReach(panel);
        });
        var shouldPrependBoundAnchor = reachablePanels[0].position !== range.min;
        var shouldAppendBoundAnchor = reachablePanels[reachablePanels.length - 1].position !== range.max;
        var indexOffset = shouldPrependBoundAnchor ? 1 : 0;
        var newAnchors = reachablePanels.map(function (panel, idx) {
          return new AnchorPoint({
            index: idx + indexOffset,
            position: panel.position,
            panel: panel
          });
        });

        if (shouldPrependBoundAnchor) {
          newAnchors.splice(0, 0, new AnchorPoint({
            index: 0,
            position: range.min,
            panel: find$1(panels, function (panel) {
              return panel.includePosition(range.min);
            })
          }));
        }

        if (shouldAppendBoundAnchor) {
          newAnchors.push(new AnchorPoint({
            index: newAnchors.length,
            position: range.max,
            panel: findRight(panels, function (panel) {
              return panel.includePosition(range.min);
            })
          }));
        }

        this._anchors = newAnchors;
        return this;
      };

      return BoundCamera;
    }(Camera$1);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Camera = {
        __proto__: null,
        Camera: Camera$1,
        LinearCamera: LinearCamera,
        CircularCamera: CircularCamera,
        BoundCamera: BoundCamera
    };

    /**
     * An slide data component that holds information of a single HTMLElement
     * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
     */

    var Panel =
    /*#__PURE__*/
    function () {
      /**
       * @param {object} options An options object<ko>옵션 오브젝트</ko>
       * @param {HTMLElement} [options.el] A `HTMLElement` panel's referencing<ko>패널이 참조하는 `HTMLElement`</ko>
       * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
       * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
       * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
       */
      function Panel(_a) {
        var el = _a.el,
            index = _a.index,
            align = _a.align,
            flicking = _a.flicking;
        this._el = el;
        this._index = index;
        this._flicking = flicking;
        this._align = align;
        this._removed = false;

        this._resetInternalStates();
      }

      var __proto = Panel.prototype;
      Object.defineProperty(__proto, "element", {
        // Internal States Getter

        /**
         * `HTMLElement` that panel's referencing
         * @ko 패널이 참조하고 있는 `HTMLElement`
         * @type {HTMLElement}
         * @readonly
         */
        get: function () {
          return this._el;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "index", {
        /**
         * Index of the panel
         * @ko 패널의 인덱스
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._index;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        /**
         * Position of the panel, including {@link Panel#alignPosition alignPosition}
         * @ko 패널의 현재 좌표, {@link Panel#alignPosition alignPosition}을 포함하고 있습니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._pos + this._alignPos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "size", {
        /**
         * Cached size of the panel element
         * This is equal to {@link Panel#element element}'s `offsetWidth` if {@link Flicking#horizontal horizontal} is `true`, and `offsetHeight` else
         * @ko 패널 엘리먼트의 캐시된 크기
         * 이 값은 {@link Flicking#horizontal horizontal}이 `true`일 경우 {@link Panel#element element}의 `offsetWidth`와 동일하고, `false`일 경우 `offsetHeight`와 동일합니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._size;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "sizeIncludingMargin", {
        /**
         * Panel's size including CSS `margin`
         * This value includes {@link Panel#element element}'s margin left/right if {@link Flicking#horizontal horizontal} is `true`, and margin top/bottom else
         * @ko CSS `margin`을 포함한 패널의 크기
         * 이 값은 {@link Flicking#horizontal horizontal}이 `true`일 경우 margin left/right을 포함하고, `false`일 경우 margin top/bottom을 포함합니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._size + this._margin.prev + this._margin.next;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "height", {
        /**
         * Height of the panel element
         * @ko 패널 엘리먼트의 높이
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._height;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "margin", {
        /**
         * Cached CSS `margin` value of the panel element
         * @ko 패널 엘리먼트의 CSS `margin` 값
         * @type {object}
         * @property {number} prev CSS `margin-left` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-top` else
         * <ko>{@link Flicking#horizontal horizontal}이 `true`일 경우 `margin-left`, `false`일 경우 `margin-top`에 해당하는 값</ko>
         * @property {number} next CSS `margin-right` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-bottom` else
         * <ko>{@link Flicking#horizontal horizontal}이 `true`일 경우 `margin-right`, `false`일 경우 `margin-bottom`에 해당하는 값</ko>
         * @readonly
         */
        get: function () {
          return this._margin;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "alignPosition", {
        /**
         * Align position inside the panel where {@link Camera}'s {@link Camera#alignPosition alignPosition} inside viewport should be located at
         * @ko 패널의 정렬 기준 위치. {@link Camera}의 뷰포트 내에서의 {@link Camera#alignPosition alignPosition}이 위치해야 하는 곳입니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._alignPos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "offset", {
        /**
         * Panel's position offset which is changed after panel element's order changes if {@link Flicking#circular circular} is enabled
         * @ko 현재 패널의 위치 오프셋 값. {@link Flicking#circular circular} 모드에서 패널의 엘리먼트의 순서가 변경될 때 이 값이 변경됩니다
         * @type {number}
         * @default 0
         * @readonly
         */
        get: function () {
          return this._offset;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "removed", {
        /**
         * A value indicating whether the panel's {@link Flicking#remove remove}d
         * @ko 패널이 {@link Flicking#remove remove}되었는지 여부를 나타내는 값
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._removed;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "range", {
        /**
         * Panel element's range of the bounding box
         * @ko 패널 엘리먼트의 Bounding box 범위
         * @type {object}
         * @property {number} [min] Bounding box's left({@link Flicking#horizontal horizontal}: true) / top({@link Flicking#horizontal horizontal}: false)
         * @property {number} [max] Bounding box's right({@link Flicking#horizontal horizontal}: true) / bottom({@link Flicking#horizontal horizontal}: false)
         * @readonly
         */
        get: function () {
          return {
            min: this._pos,
            max: this._pos + this._size
          };
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter

        /**
         * A value indicating where the {@link Panel#alignPosition alignPosition} should be located at inside the panel element
         * @ko {@link Panel#alignPosition alignPosition}이 패널 내의 어디에 위치해야 하는지를 나타내는 값
         * @type {Constants.ALIGN | string | number}
         */
        get: function () {
          return this._align;
        },
        // Options Getter
        set: function (val) {
          this._align = val;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Update size of the panel
       * @ko 패널의 크기를 갱신합니다
       * @chainable
       * @return {this}
       */

      __proto.resize = function () {
        var el = this._el; // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

        var elStyle = window.getComputedStyle(el) || el.currentStyle;
        var flicking = this._flicking;
        var horizontal = flicking.horizontal;
        var prevPanel = flicking.renderer.panels[this._index - 1];
        this._size = horizontal ? el.offsetWidth : el.offsetHeight;
        this._margin = horizontal ? {
          prev: parseFloat(elStyle.marginLeft),
          next: parseFloat(elStyle.marginRight)
        } : {
          prev: parseFloat(elStyle.marginTop),
          next: parseFloat(elStyle.marginBottom)
        };
        this._pos = prevPanel ? prevPanel.range.max + prevPanel.margin.next + this._margin.prev : this._margin.prev;
        this._height = horizontal ? el.offsetHeight : this._size;

        this._updateAlignPos();

        return this;
      };
      /**
       * Check whether the given element is inside of this panel's {@link Panel#element element}
       * @ko 해당 엘리먼트가 이 패널의 {@link Panel#element element} 내에 포함되어 있는지를 반환합니다
       * @param {HTMLElement} element The HTMLElement to check<ko>확인하고자 하는 HTMLElement</ko>
       * @return {boolean} A Boolean value indicating the element is inside of this panel {@link Panel#element element}<ko>패널의 {@link Panel#element element}내에 해당 엘리먼트 포함 여부</ko>
       */


      __proto.contains = function (element) {
        return this._el.contains(element);
      };
      /**
       * Reset internal state and set {@link Panel#removed removed} to `true`
       * @ko 내부 상태를 초기화하고 {@link Panel#removed removed}를 `true`로 설정합니다.
       * @return {void}
       */


      __proto.destroy = function () {
        this._resetInternalStates();

        this._removed = true;
      };
      /**
       * Check whether the given position is inside of this panel's {@link Panel#range range}
       * @ko 주어진 좌표가 현재 패널의 {@link Panel#range range}내에 속해있는지를 반환합니다.
       * @param {number} pos A position to check<ko>확인하고자 하는 좌표</ko>
       * @param {boolean} [includeMargin=false] Include {@link margin} to the range<ko>패널 영역에 {@link margin}값을 포함시킵니다</ko>
       * @return {boolean} A Boolean value indicating whether the given position is included in the panel range<ko>해당 좌표가 패널 영역 내에 속해있는지 여부</ko>
       */


      __proto.includePosition = function (pos, includeMargin) {
        if (includeMargin === void 0) {
          includeMargin = false;
        }

        return this.includeRange(pos, pos, includeMargin);
      };
      /**
       * Check whether the given range is fully included in this panel's area
       * @ko 주어진 범위가 이 패널 내부에 완전히 포함되는지를 반환합니다
       * @param {number} min Minimum value of the range to check<ko>확인하고자 하는 최소 범위</ko>
       * @param {number} max Maximum value of the range to check<ko>확인하고자 하는 최대 범위</ko>
       * @param {boolean} [includeMargin=false] Include {@link margin} to the range<ko>패널 영역에 {@link margin}값을 포함시킵니다</ko>
       * @returns {boolean} A Boolean value indicating whether the given range is fully included in the panel range<ko>해당 범위가 패널 영역 내에 완전히 속해있는지 여부</ko>
       */


      __proto.includeRange = function (min, max, includeMargin) {
        if (includeMargin === void 0) {
          includeMargin = false;
        }

        var margin = this._margin;
        var panelRange = this.range;

        if (includeMargin) {
          panelRange.min -= margin.prev;
          panelRange.max += margin.next;
        }

        return max >= panelRange.min && min <= panelRange.max;
      };
      /**
       * Move {@link Camera} to this panel
       * @ko {@link Camera}를 이 패널로 이동합니다
       * @param {number} [duration] Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
       * @returns {Promise<void>} A Promise which will be resolved after reaching the panel<ko>패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.focus = function (duration) {
        return this._flicking.moveTo(this._index, duration);
      };
      /**
       * Get previous(`index - 1`) panel. When the previous panel does not exist, this will return `null` instead
       * If the {@link Flicking#circularEnabled circular} is enabled, this will return the last panel if called from the first panel
       * @ko 이전(`index - 1`) 패널을 반환합니다. 이전 패널이 없을 경우 `null`을 반환합니다
       * {@link Flicking#circularEnabled circular} 모드가 활성화되었을 때 첫번째 패널에서 이 메소드를 호출할 경우 마지막 패널을 반환합니다
       * @returns {Panel | null} The previous panel<ko>이전 패널</ko>
       */


      __proto.prev = function () {
        var index = this._index;
        var flicking = this._flicking;
        var renderer = flicking.renderer;
        var panelCount = renderer.panelCount;
        if (panelCount === 1) return null;
        return flicking.circularEnabled ? renderer.getPanel(index === 0 ? panelCount - 1 : index - 1) : renderer.getPanel(index - 1);
      };
      /**
       * Get next(`index + 1`) panel. When the next panel does not exist, this will return `null` instead
       * If the {@link Flicking#circularEnabled circular} is enabled, this will return the first panel if called from the last panel
       * @ko 다음(`index + 1`) 패널을 반환합니다. 다음 패널이 없을 경우 `null`을 반환합니다
       * {@link Flicking#circularEnabled circular} 모드가 활성화되었을 때 마지막 패널에서 이 메소드를 호출할 경우 첫번째 패널을 반환합니다
       * @returns {Panel | null} The previous panel<ko>다음 패널</ko>
       */


      __proto.next = function () {
        var index = this._index;
        var flicking = this._flicking;
        var renderer = flicking.renderer;
        var panelCount = renderer.panelCount;
        if (panelCount === 1) return null;
        return flicking.circularEnabled ? renderer.getPanel(index === panelCount - 1 ? 0 : index + 1) : renderer.getPanel(index + 1);
      };
      /**
       * Increase panel's index by the given value
       * @ko 패널의 인덱스를 주어진 값만큼 증가시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.increaseIndex = function (val) {
        this._index += Math.max(val, 0);
        return this;
      };
      /**
       * Decrease panel's index by the given value
       * @ko 패널의 인덱스를 주어진 값만큼 감소시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.decreaseIndex = function (val) {
        this._index -= Math.max(val, 0);
        return this;
      };
      /**
       * Increase panel's position by the given value
       * @ko 패널의 위치를 주어진 값만큼 증가시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.increasePosition = function (val) {
        this._moveBy(Math.max(val, 0));

        return this;
      };
      /**
       * Decrease panel's position by the given value
       * @ko 패널의위치를 주어진 값만큼 감소시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.decreasePosition = function (val) {
        this._moveBy(-Math.max(val, 0));

        return this;
      };
      /**
       * Increase panel's offset by the given value
       * @ko 패널의 오프셋을 주어진 값만큼 증가시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.increaseOffset = function (val) {
        this._offset += Math.max(val, 0);
        return this;
      };
      /**
       * Decrease panel's offset by the given value
       * @ko 패널의 오프셋을 주어진 값만큼 감소시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.decreaseOffset = function (val) {
        this._offset -= Math.max(val, 0);
        return this;
      };
      /**
       * Reset panel's offset to 0
       * @ko 패널의 오프셋을 0으로 초기화합니다
       * @internal
       * @chainable
       * @returns {this}
       */


      __proto.resetOffset = function () {
        this._offset = 0;
        return this;
      };

      __proto._moveBy = function (val) {
        this._pos += val;
        return this;
      };

      __proto._updateAlignPos = function () {
        this._alignPos = parseAlign(this._align, this._size);
      };

      __proto._resetInternalStates = function () {
        this._size = 0;
        this._pos = 0;
        this._margin = {
          prev: 0,
          next: 0
        };
        this._height = 0;
        this._alignPos = 0;
        this._offset = 0;
      };

      return Panel;
    }();

    /* eslint-disable @typescript-eslint/no-unused-vars */

    /**
     * Event that fires when order of the elements is changed
     * @ko 엘리먼트 순서 변경시 트리거되는 이벤트
     * @event OffsetManipulator#orderChanged
     * @type {void}
     */

    /**
     * A component that manages panel offset from the element's order change
     * @ko 엘리먼트 순서 변경에 의한 패널 오프셋 변경을 담당하는 컴포넌트
     * @internal
     * @fires OffsetManipulator#orderChanged
     */

    var OffsetManipulator =
    /*#__PURE__*/
    function (_super) {
      __extends$1(OffsetManipulator, _super);
      /** */


      function OffsetManipulator() {
        var _this = _super.call(this) || this;

        _this._flicking = null;
        return _this;
      }
      /**
       * Initialize OffsetManipulator
       * @ko OffsetManipulator를 초기화합니다
       * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
       * @chainable
       * @return {this}
       */


      var __proto = OffsetManipulator.prototype;

      __proto.init = function (flicking) {
        this._flicking = flicking;
      };
      /**
       * Destroy Renderer and return to initial state
       * @ko Renderer를 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        this._flicking = null;
      };
      /**
       * Insert panel elements before nextSibling
       * @ko 패널 엘리먼트들을 기준 패널(`nextSibling`) 이전에 추가합니다
       * @param {Panel[]} panels An array of panels to add<ko>추가할 패널의 배열</ko>
       * @chainable
       * @return {this}
       */


      __proto.insertPanelElements = function (panels, nextSibling) {
        // DO NOTHING
        return this;
      };
      /**
       * Move panel element as the first child of the camera element
       * @ko 패널 엘리먼트들을 카메라 엘리먼트의 첫번째 child로 이동시킨다
       * @param {Panel[]} panels Panels to move<ko>위치를 변경할 패널들</ko>
       * @param {TogglePoint[]} togglePoints An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>
       * @chainable
       * @return {this}
       */


      __proto.movePanelElementsToStart = function (panels, togglePoints) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camRangeDiff = flicking.camera.rangeDiff;
        panels.forEach(function (panel, idx) {
          panel.decreaseOffset(camRangeDiff);
        });

        if (panels.length > 0) {
          this.trigger("orderChanged");
        }

        return this;
      };
      /**
       * Move panel element as the last child of the camera element
       * @ko 패널 엘리먼트들을 카메라 엘리먼트의 마지막 child로 이동시킨다
       * @param {Panel[]} panels Panels to move<ko>위치를 변경할 패널들</ko>
       * @param {TogglePoint[]} togglePoints An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>
       * @chainable
       * @return {this}
       */


      __proto.movePanelElementsToEnd = function (panels, togglePoints) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camRangeDiff = flicking.camera.rangeDiff;
        panels.forEach(function (panel, idx) {
          panel.increaseOffset(camRangeDiff);
        });

        if (panels.length > 0) {
          this.trigger("orderChanged");
        }

        return this;
      };
      /**
       * Reset panel element order by the panel's index
       * @ko 패널 엘리먼트 순서를 인덱스 순으로 변경한다
       * @param {Panel[]} panels Panels to move<ko>위치를 변경할 패널들</ko>
       * @chainable
       * @return {this}
       */


      __proto.resetPanelElementOrder = function (panels) {
        panels.forEach(function (panel) {
          panel.resetOffset();
        });

        if (panels.length > 0) {
          this.trigger("orderChanged");
        }

        return this;
      };
      /**
       * Remove panel elements
       * @ko 패널 엘리먼트들을 삭제한다
       * @param {Panel[]} panels Panels to remove<ko>삭제할 패널들</ko>
       * @chainable
       * @return {this}
       */


      __proto.removePanelElements = function (panels) {
        // DO NOTHING
        return this;
      };
      /**
       * Remove all child nodes inside the given element
       * @ko 주어진 엘리먼트 내의 모든 child node를 제거한다
       * @param element A HTMLElement to remove all child nodes<ko>Child node를 전부 삭제할 HTMLElement</ko>
       * @chainable
       * @return {this}
       */


      __proto.removeAllChildNodes = function (element) {
        // DO NOTHING
        return this;
      };
      /**
       * Remove all text nodes inside the given element
       * @ko 주어진 엘리먼트 내의 모든 text node를 제거한다
       * @param element A HTMLElement to remove all text nodes<ko>Text node를 전부 삭제할 HTMLElement</ko>
       * @chainable
       * @return {this}
       */


      __proto.removeAllTextNodes = function (element) {
        // DO NOTHING
        return this;
      };

      return OffsetManipulator;
    }(Component$1);

    /**
     * A component that manages {@link Panel} and its elements
     * @ko {@link Panel}과 그 엘리먼트들을 관리하는 컴포넌트
     */

    var Renderer$1 =
    /*#__PURE__*/
    function () {
      /**
       * @param {object} options An options object<ko>옵션 오브젝트</ko>
       * @param {Constants.ALIGN | string | number} [options.align] An {@link Flicking#align align} value that will be applied to all panels<ko>전체 패널에 적용될 {@link Flicking#align align} 값</ko>
       * @param {OffsetManipulator} [options.elementManipulator] An instance of {@link OffsetManipulator} that renderer will use<ko>Renderer가 사용할 {@link OffsetManipulator}의 인스턴스</ko>
       */
      function Renderer(_a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.align,
            align = _c === void 0 ? ALIGN.CENTER : _c,
            _d = _b.elementManipulator,
            elementManipulator = _d === void 0 ? new OffsetManipulator() : _d;

        this._align = align;
        this._flicking = null;
        this._elementManipulator = elementManipulator;
        this._panels = [];
      }

      var __proto = Renderer.prototype;
      Object.defineProperty(__proto, "panels", {
        // Internal states Getter

        /**
         * Array of panels
         * @ko 전체 패널들의 배열
         * @type {Panel[]}
         * @readonly
         * @see Panel
         */
        get: function () {
          return this._panels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panelCount", {
        /**
         * Count of panels
         * @ko 전체 패널의 개수
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._panels.length;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "elementManipulator", {
        /**
         * An instance of the {@link OffsetManipulator} that Renderer's using
         * @ko Renderer가 현재 사용중인 {@link OffsetManipulator}의 인스턴스
         * @type {OffsetManipulator}
         * @readonly
         */
        get: function () {
          return this._elementManipulator;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter

        /**
         * A {@link Panel}'s {@link Panel#align align} value that applied to all panels
         * @ko {@link Panel}에 공통적으로 적용할 {@link Panel#align align} 값
         * @type {Constants.ALIGN | string | number}
         */
        get: function () {
          return this._align;
        },
        // Options Setter
        set: function (val) {
          this._align = val;

          var panelAlign = this._getPanelAlign();

          this._panels.forEach(function (panel) {
            panel.align = panelAlign;
          });
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize Renderer
       * @ko Renderer를 초기화합니다
       * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
       * @chainable
       * @return {this}
       */

      __proto.init = function (flicking) {
        this._flicking = flicking;

        this._elementManipulator.init(flicking);

        this._collectPanels();

        return this;
      };
      /**
       * Destroy Renderer and return to initial state
       * @ko Renderer를 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        this._flicking = null;
        this._panels = [];

        this._elementManipulator.destroy();
      };
      /**
       * Return the {@link Panel} at the given index. `null` if it doesn't exists.
       * @ko 주어진 인덱스에 해당하는 {@link Panel}을 반환합니다. 주어진 인덱스에 해당하는 패널이 존재하지 않을 경우 `null`을 반환합니다.
       * @return {Panel | null} Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>
       * @see Panel
       */


      __proto.getPanel = function (index) {
        return this._panels[index] || null;
      };
      /**
       * Insert new panels at given index
       * This will increase index of panels after by the number of panels added
       * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
       * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
       * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
       * @param {Flicking.ElementLike | Flicking.ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
       * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
       * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
       */


      __proto.insert = function (index, element) {
        var panels = this._panels;
        var elementManipulator = this._elementManipulator;
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var control = flicking.control;

        var align = this._getPanelAlign();

        var elements = parseElement(element);
        var insertingIdx = getMinusCompensatedIndex(index, panels.length);
        var panelsPushed = panels.slice(insertingIdx);
        var newPanels = elements.map(function (el, elIdx) {
          return new Panel({
            el: el,
            index: insertingIdx + elIdx,
            align: align,
            flicking: flicking
          });
        });
        if (newPanels.length <= 0) return []; // Reset the order of the elements first

        elementManipulator.resetPanelElementOrder(panels);
        panels.splice.apply(panels, __spreadArray([insertingIdx, 0], __read$1(newPanels))); // Insert the actual elements as camera element's children

        elementManipulator.insertPanelElements(newPanels, panelsPushed[0] || null); // Resize the newly added panels

        newPanels.forEach(function (panel) {
          return panel.resize();
        });

        var insertedSize = this._getPanelSizeSum(newPanels); // Update panel indexes & positions


        panelsPushed.forEach(function (panel) {
          panel.increaseIndex(newPanels.length);
          panel.increasePosition(insertedSize);
        }); // Update camera & control

        this._updateCameraAndControl();

        this.render(); // Move to the first panel added if no panels existed
        // FIXME: fix for animating case

        if (newPanels.length > 0 && !control.animating) {
          void control.moveToPanel(control.activePanel || newPanels[0], {
            duration: 0
          }).catch(function () {
            return void 0;
          });
        }

        return newPanels;
      };
      /**
       * Remove the panel at the given index
       * This will decrease index of panels after by the number of panels removed
       * @ko 주어진 인덱스의 패널을 제거합니다
       * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
       * @param {number} index Index of panel to remove<ko>제거할 패널의 인덱스</ko>
       * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
       * @return An array of removed panels<ko>제거된 패널들의 배열</ko>
       */


      __proto.remove = function (index, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 1;
        }

        var panels = this._panels;
        var elementManipulator = this._elementManipulator;
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera,
            control = flicking.control;
        var activePanel = control.activePanel;
        var removingIdx = getMinusCompensatedIndex(index, panels.length);
        var panelsPulled = panels.slice(removingIdx + deleteCount);
        var panelsRemoved = panels.splice(removingIdx, deleteCount);
        if (panelsRemoved.length <= 0) return []; // Reset the order of the elements first

        elementManipulator.resetPanelElementOrder(panels); // Update panel indexes & positions

        var removedSize = this._getPanelSizeSum(panelsRemoved);

        panelsPulled.forEach(function (panel) {
          panel.decreaseIndex(panelsRemoved.length);
          panel.decreasePosition(removedSize);
        }); // Remove panel elements

        elementManipulator.removePanelElements(panelsRemoved);
        panelsRemoved.forEach(function (panel) {
          return panel.destroy();
        }); // Update camera & control

        this._updateCameraAndControl();

        if (includes(panelsRemoved, activePanel)) {
          control.resetActivePanel();
        }

        this.render(); // FIXME: fix for animating case

        if (panelsRemoved.length > 0 && !control.animating) {
          var targetPanel = includes(panelsRemoved, activePanel) ? panelsPulled[0] || panels[panels.length - 1] : activePanel;

          if (targetPanel) {
            void control.moveToPanel(targetPanel, {
              duration: 0
            }).catch(function () {
              return void 0;
            });
          } else {
            // All panels removed
            camera.lookAt(0);
          }
        }

        return panelsRemoved;
      };
      /**
       * Update all panel sizes
       * @ko 모든 패널의 크기를 업데이트합니다
       * @chainable
       * @return {this}
       */


      __proto.updatePanelSize = function () {
        this._panels.forEach(function (panel) {
          return panel.resize();
        });

        return this;
      };

      __proto._collectPanels = function () {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element; // Remove all text nodes in the camera element

        this._elementManipulator.removeAllTextNodes(cameraElement);

        var align = this._getPanelAlign();

        var cameraChilds = toArray$2(cameraElement.children);
        this._panels = cameraChilds.map(function (el, index) {
          return new Panel({
            flicking: flicking,
            el: el,
            index: index,
            align: align
          });
        });
        return this;
      };

      __proto._getPanelAlign = function () {
        var align = this._align;
        return typeof align === "object" ? align.panel : align;
      };

      __proto._getPanelSizeSum = function (panels) {
        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];
        var marginDiff = lastPanel.margin.next - firstPanel.margin.prev;
        return lastPanel.range.max - firstPanel.range.min + marginDiff;
      };

      __proto._updateCameraAndControl = function () {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera,
            control = flicking.control;
        camera.updateRange();
        camera.updateAnchors();
        camera.resetNeedPanelHistory();
        control.updateInput();
      };

      return Renderer;
    }();

    /**
     * A {@link Renderer} that always renders all panel elements inside the camera element
     * @ko 모든 패널 엘리먼트를 카메라 엘리먼트 내에 항상 렌더링하는 종류의 {@link Renderer}
     */

    var RawRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends$1(RawRenderer, _super);

      function RawRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Render panel elements inside the camera element
       * @ko 패널 엘리먼트들을 카메라 엘리먼트 내부에 렌더링합니다
       * @chainable
       * @return {this}
       */


      var __proto = RawRenderer.prototype;

      __proto.render = function () {
        return this;
      };

      return RawRenderer;
    }(Renderer$1);

    /**
     * A {@link Renderer} that renders only visible panel elements({@link Camera#visiblePanels visiblePanels}) inside the camera element
     * @ko 현재 카메라의 보이는 패널들({@link Camera#visiblePanels visiblePanels})만을 카메라 엘리먼트 내에 렌더링하는 종류의 {@link Renderer}
     */

    var VisibleRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends$1(VisibleRenderer, _super);

      function VisibleRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Render visible panel elements inside the camera element
       * @ko 보이는 패널 엘리먼트들을 카메라 엘리먼트 내부에 렌더링합니다
       * @chainable
       * @return {this}
       */


      var __proto = VisibleRenderer.prototype;

      __proto.render = function () {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera;
        var cameraElement = camera.element;
        var panels = flicking.renderer.panels;
        var visiblePanels = camera.visiblePanels;
        var elementManipulator = this._elementManipulator;

        if (panels.length <= 0 || visiblePanels.length <= 0) {
          camera.offset = 0;
          return this;
        }

        var panelsSortedByActualPosition = __spreadArray([], __read$1(panels)).sort(function (a, b) {
          return a.position + a.offset - (b.position + b.offset);
        });

        var visibleSortedByActualPosition = __spreadArray([], __read$1(visiblePanels)).sort(function (a, b) {
          return a.position + a.offset - (b.position + b.offset);
        }); // Remove remaining(removed) elements


        elementManipulator.removeAllChildNodes(cameraElement);
        elementManipulator.insertPanelElements(visibleSortedByActualPosition, null);
        var firstVisibleIdx = findIndex(panelsSortedByActualPosition, function (panel) {
          return panel.index === visibleSortedByActualPosition[0].index;
        });
        var invisiblePrevPanels = panelsSortedByActualPosition.slice(0, firstVisibleIdx);

        var invisibleSize = this._calcPanelRangeSize(invisiblePrevPanels);

        camera.offset = invisibleSize;
        return this;
      };

      __proto._calcPanelRangeSize = function (panels) {
        return panels.reduce(function (sum, panel) {
          return sum + panel.sizeIncludingMargin;
        }, 0);
      };

      return VisibleRenderer;
    }(RawRenderer);

    /**
     * A component that manages element add/remove and element's order change
     * @ko 엘리먼트 추가/제거 및 순서 변경을 담당하는 컴포넌트
     */

    var ElementManipulator =
    /*#__PURE__*/
    function (_super) {
      __extends$1(ElementManipulator, _super);

      function ElementManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = ElementManipulator.prototype;

      __proto.insertPanelElements = function (panels, nextSibling) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera;
        var cameraElement = camera.element;
        var nextSiblingElement = (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.element) || null;
        var fragment = document.createDocumentFragment();
        panels.forEach(function (panel) {
          return fragment.appendChild(panel.element);
        });
        cameraElement.insertBefore(fragment, nextSiblingElement);
        return this;
      };

      __proto.movePanelElementsToStart = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera;
        var cameraElement = camera.element;
        var camRangeDiff = camera.rangeDiff;
        var panelEls = panels.map(function (panel) {
          return panel.element;
        });
        var refElement = includes(panelEls, cameraElement.firstElementChild) ? null : cameraElement.firstElementChild;

        this._relocatePanelElements(panels, refElement);

        panels.forEach(function (panel) {
          panel.decreaseOffset(camRangeDiff);
        });
        return this;
      };

      __proto.movePanelElementsToEnd = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera;
        var camRangeDiff = camera.rangeDiff;

        this._relocatePanelElements(panels, null);

        panels.forEach(function (panel) {
          panel.increaseOffset(camRangeDiff);
        });
        return this;
      };

      __proto.resetPanelElementOrder = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element;

        this._relocatePanelElements(panels.filter(function (panel) {
          return panel.element.parentElement === cameraElement;
        }), null);

        panels.forEach(function (panel) {
          panel.resetOffset();
        });
        return this;
      };

      __proto.removePanelElements = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element;
        panels.forEach(function (panel) {
          cameraElement.removeChild(panel.element);
        });
        return this;
      };

      __proto.removeAllChildNodes = function (element) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        return this;
      };

      __proto.removeAllTextNodes = function (element) {
        element.childNodes.forEach(function (node) {
          if (node.nodeType === Node.TEXT_NODE) {
            element.removeChild(node);
          }
        });
        return this;
      };

      __proto._relocatePanelElements = function (panels, refChild) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element;
        var fragment = document.createDocumentFragment();
        panels.forEach(function (panel) {
          return fragment.appendChild(panel.element);
        });
        cameraElement.insertBefore(fragment, refChild);
      };

      return ElementManipulator;
    }(OffsetManipulator);

    /**
     * A component that manages panel element's order without adding/removing it using CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/order order} property
     * @ko 패널 추가/제거 없이 CSS {@link https://developer.mozilla.org/ko/docs/Web/CSS/order order} 속성을 이용하여 엘리먼트 순서를 변경하는 컴포넌트
     */

    var OrderManipulator =
    /*#__PURE__*/
    function (_super) {
      __extends$1(OrderManipulator, _super);

      function OrderManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = OrderManipulator.prototype;

      __proto.movePanelElementsToStart = function (panels, togglePoints) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");

        if (flicking.circular && !flicking.renderOnlyVisible) {
          panels.forEach(function (panel, idx) {
            if (togglePoints[idx].toggled) {
              panel.element.style.order = "-1";
            } else {
              panel.element.style.order = "0";
            }
          });
        }

        return _super.prototype.movePanelElementsToStart.call(this, panels, togglePoints);
      };

      __proto.movePanelElementsToEnd = function (panels, togglePoints) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");

        if (flicking.circular && !flicking.renderOnlyVisible) {
          panels.forEach(function (panel, idx) {
            if (togglePoints[idx].toggled) {
              panel.element.style.order = "1";
            } else {
              panel.element.style.order = "0";
            }
          });
        }

        return _super.prototype.movePanelElementsToEnd.call(this, panels, togglePoints);
      };

      __proto.resetPanelElementOrder = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");

        if (flicking.circular && !flicking.renderOnlyVisible) {
          panels.forEach(function (panel) {
            panel.element.style.order = "0";
          });
        }

        return _super.prototype.resetPanelElementOrder.call(this, panels);
      };

      return OrderManipulator;
    }(OffsetManipulator);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Renderer = {
        __proto__: null,
        Renderer: Renderer$1,
        RawRenderer: RawRenderer,
        VisibleRenderer: VisibleRenderer,
        OffsetManipulator: OffsetManipulator,
        ElementManipulator: ElementManipulator,
        OrderManipulator: OrderManipulator
    };

    /**
     * @extends Component
     * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
     * @requires {@link https://github.com/naver/egjs-component|@egjs/component}
     * @requires {@link https://github.com/naver/egjs-axes|@egjs/axes}
     */

    var Flicking =
    /*#__PURE__*/
    function (_super) {
      __extends$1(Flicking, _super);
      /**
       * @param root A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string
       * <ko>Flicking을 초기화할 HTMLElement로, `string` 타입으로 지정시 css 선택자 문자열을 지정해야 합니다.</ko>
       * @param {object} [options={}] An options object for Flicking.<ko>Flicking에 적용할 옵션 오브젝트</ko>
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE WRONG_TYPE}|When the root is not either string or HTMLElement|
       * |{@link Constants.ERROR_CODE ELEMENT_NOT_FOUND}|When the element with given CSS selector does not exist|
       * <ko>
       *
       * |code|조건|
       * |---|---|
       * |{@link Constants.ERROR_CODE WRONG_TYPE}|루트 엘리먼트가 string이나 HTMLElement가 아닐 경우|
       * |{@link Constants.ERROR_CODE ELEMENT_NOT_FOUND}|주어진 CSS selector로 엘리먼트를 찾지 못했을 경우|
       *
       * </ko>
       * @example
       * ```ts
       * import Flicking from "@egjs/flicking";
       *
       * // Creating new instance of Flicking with HTMLElement
       * const flicking = new Flicking(document.querySelector(".flicking-viewport"), { circular: true });
       *
       * // Creating new instance of Flicking with CSS selector
       * const flicking2 = new Flicking(".flicking-viewport", { circular: true });
       * ```
       */


      function Flicking(root, _a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.align,
            align = _c === void 0 ? ALIGN.CENTER : _c,
            _d = _b.defaultIndex,
            defaultIndex = _d === void 0 ? 0 : _d,
            _e = _b.horizontal,
            horizontal = _e === void 0 ? true : _e,
            _f = _b.circular,
            circular = _f === void 0 ? false : _f,
            _g = _b.bound,
            bound = _g === void 0 ? false : _g,
            _h = _b.adaptive,
            adaptive = _h === void 0 ? false : _h,
            _j = _b.needPanelThreshold,
            needPanelThreshold = _j === void 0 ? 0 : _j,
            _k = _b.deceleration,
            deceleration = _k === void 0 ? 0.0075 : _k,
            _l = _b.duration,
            duration = _l === void 0 ? 500 : _l,
            _m = _b.easing,
            easing = _m === void 0 ? function (x) {
          return 1 - Math.pow(1 - x, 3);
        } : _m,
            _o = _b.inputType,
            inputType = _o === void 0 ? ["mouse", "touch"] : _o,
            _p = _b.moveType,
            moveType = _p === void 0 ? "snap" : _p,
            _q = _b.threshold,
            threshold = _q === void 0 ? 40 : _q,
            _r = _b.interruptable,
            interruptable = _r === void 0 ? true : _r,
            _s = _b.bounce,
            bounce = _s === void 0 ? "20%" : _s,
            _t = _b.iOSEdgeSwipeThreshold,
            iOSEdgeSwipeThreshold = _t === void 0 ? 30 : _t,
            _u = _b.preventClickOnDrag,
            preventClickOnDrag = _u === void 0 ? true : _u,
            _v = _b.renderOnlyVisible,
            renderOnlyVisible = _v === void 0 ? false : _v,
            _w = _b.autoInit,
            autoInit = _w === void 0 ? true : _w,
            _x = _b.autoResize,
            autoResize = _x === void 0 ? true : _x,
            _y = _b.renderExternal,
            renderExternal = _y === void 0 ? false : _y,
            _z = _b.useOrderManipulator,
            useOrderManipulator = _z === void 0 ? false : _z;

        var _this = _super.call(this) || this;
        /**
         * Update viewport/panel sizes
         * @ko 패널 및 뷰포트의 크기를 갱신합니다
         * @method
         * @fires Flicking#beforeResize
         * @fires Flicking#afterResize
         * @return {this}
         */


        _this.resize = function () {
          var viewport = _this._viewport;
          var renderer = _this._renderer;
          var camera = _this._camera;
          var control = _this._control;
          var prevWidth = viewport.width;
          var prevHeight = viewport.height;

          _this.trigger(new ComponentEvent$1(EVENTS.BEFORE_RESIZE, {
            width: prevWidth,
            height: prevHeight,
            element: viewport.element
          }));

          viewport.resize();
          renderer.updatePanelSize();
          renderer.elementManipulator.resetPanelElementOrder(renderer.panels);
          camera.updateAlignPos();
          camera.updateRange();
          camera.updateAnchors();
          control.updateInput();
          camera.updatePosition();
          var newWidth = viewport.width;
          var newHeight = viewport.height;
          var sizeChanged = newWidth !== prevWidth || newHeight !== prevHeight;

          _this.trigger(new ComponentEvent$1(EVENTS.AFTER_RESIZE, {
            width: viewport.width,
            height: viewport.height,
            prev: {
              width: prevWidth,
              height: prevHeight
            },
            sizeChanged: sizeChanged,
            element: viewport.element
          }));

          return _this;
        };

        _this._preventClickWhenDragged = function (e) {
          if (_this._control.animating) {
            e.preventDefault();
          }
        }; // Internal states


        _this._initialized = false; // Bind options

        _this._align = align;
        _this._defaultIndex = defaultIndex;
        _this._horizontal = horizontal;
        _this._circular = circular;
        _this._bound = bound;
        _this._adaptive = adaptive;
        _this._needPanelThreshold = needPanelThreshold;
        _this._deceleration = deceleration;
        _this._duration = duration;
        _this._easing = easing;
        _this._inputType = inputType;
        _this._moveType = moveType;
        _this._threshold = threshold;
        _this._interruptable = interruptable;
        _this._bounce = bounce;
        _this._iOSEdgeSwipeThreshold = iOSEdgeSwipeThreshold;
        _this._preventClickOnDrag = preventClickOnDrag;
        _this._renderOnlyVisible = renderOnlyVisible;
        _this._autoResize = autoResize;
        _this._autoInit = autoInit;
        _this._renderExternal = renderExternal;
        _this._useOrderManipulator = useOrderManipulator; // Create core components

        _this._viewport = new Viewport(getElement(root));
        _this._renderer = _this._createRenderer();
        _this._camera = _this._createCamera();
        _this._control = _this._createControl();

        if (_this._autoInit) {
          _this.init();
        }

        return _this;
      }

      var __proto = Flicking.prototype;
      Object.defineProperty(__proto, "control", {
        // Components

        /**
         * {@link Control} instance of the Flicking
         * @ko 현재 Flicking에 활성화된 {@link Control} 인스턴스
         * @type {Control}
         * @default SnapControl
         * @readonly
         * @see Control
         * @see SnapControl
         * @see FreeControl
         */
        get: function () {
          return this._control;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "camera", {
        /**
         * {@link Camera} instance of the Flicking
         * @ko 현재 Flicking에 활성화된 {@link Camera} 인스턴스
         * @type {Camera}
         * @default LinearCamera
         * @readonly
         * @see Camera
         * @see LinearCamera
         * @see BoundCamera
         * @see CircularCamera
         */
        get: function () {
          return this._camera;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderer", {
        /**
         * {@link Renderer} instance of the Flicking
         * @ko 현재 Flicking에 활성화된 {@link Renderer} 인스턴스
         * @type {Renderer}
         * @default RawRenderer
         * @readonly
         * @see Renderer
         * @see RawRenderer
         * @see VisibleRenderer
         */
        get: function () {
          return this._renderer;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "viewport", {
        /**
         * A component that manages viewport size
         * @ko 뷰포트 크기 정보를 담당하는 컴포넌트
         * @type {Viewport}
         * @readonly
         * @see Viewport
         */
        get: function () {
          return this._viewport;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "initialized", {
        // Internal States

        /**
         * Whether Flicking's {@link Flicking#init init()} is called.
         * This is `true` when {@link Flicking#init init()} is called, and is `false` after calling {@link Flicking#destroy destroy()}.
         * @ko Flicking의 {@link Flicking#init init()}이 호출되었는지를 나타내는 멤버 변수.
         * 이 값은 {@link Flicking#init init()}이 호출되었으면 `true`로 변하고, {@link Flicking#destroy destroy()}호출 이후에 다시 `false`로 변경됩니다.
         * @type {boolean}
         * @default false
         * @readonly
         */
        get: function () {
          return this._initialized;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "circularEnabled", {
        /**
         * Whether the `circular` option is enabled.
         * The {@link Flicking#circular circular} option can't be enabled when sum of the panel sizes are too small.
         * @ko {@link Flicking#circular circular} 옵션이 활성화되었는지 여부를 나타내는 멤버 변수.
         * {@link Flicking#circular circular} 옵션은 패널의 크기의 합이 충분하지 않을 경우 비활성화됩니다.
         * @type {boolean}
         * @default false
         * @readonly
         */
        get: function () {
          return this._camera.controlParams.circular;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "index", {
        /**
         * Index number of the {@link Flicking#currentPanel currentPanel}
         * @ko {@link Flicking#currentPanel currentPanel}의 인덱스 번호
         * @type {number}
         * @default 0
         * @readonly
         */
        get: function () {
          return this._control.activeIndex;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "element", {
        /**
         * The root(`.flicking-viewport`) element
         * @ko root(`.flicking-viewport`) 엘리먼트
         * @type {HTMLElement}
         * @readonly
         */
        get: function () {
          return this._viewport.element;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "currentPanel", {
        /**
         * Currently active panel
         * @ko 현재 선택된 패널
         * @type {Panel}
         * @readonly
         * @see Panel
         */
        get: function () {
          return this._control.activePanel;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panels", {
        /**
         * Array of panels
         * @ko 전체 패널들의 배열
         * @type {Panel[]}
         * @readonly
         * @see Panel
         */
        get: function () {
          return this._renderer.panels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panelCount", {
        /**
         * Count of panels
         * @ko 전체 패널의 개수
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._renderer.panelCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visiblePanels", {
        /**
         * Array of panels that is visible at the current position
         * @ko 현재 보이는 패널의 배열
         * @type {Panel[]}
         * @readonly
         * @see Panel
         */
        get: function () {
          return this._camera.visiblePanels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "animating", {
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._control.animating;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "holding", {
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._control.holding;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter
        // UI / LAYOUT

        /**
         * Align position of the panels within viewport. You can set different values each for the panel and camera
         * @ko 뷰포트 내에서 패널 정렬방식을 설정하는 옵션. 카메라와 패널 개별로 옵션을 설정할 수도 있습니다
         * @type {Constants.ALIGN | string | number | { panel: string | number, camera: string | number }}
         * @property {Constants.ALIGN | string | number} panel The align value for each {@link Panel}s<ko>개개의 {@link Panel}에 적용할 값</ko>
         * @property {Constants.ALIGN | string | number} camera The align value for {@link Camera}<ko>{@link Camera}에 적용할 값</ko>
         * @default "center"
         * @example
         * ```ts
         * const possibleOptions = [
         *   // Literal strings
         *   "prev", "center", "next",
         *   // % values, applied to both panel & camera
         *   "0%", "25%", "42%",
         *   // px values, arithmetic calculation with (+/-) is also allowed.
         *   "0px", "100px", "50% - 25px",
         *   // numbers, same to number + px ("0px", "100px")
         *   0, 100, 1000,
         *   // Setting a different value for panel & camera
         *   { panel: "10%", camera: "25%" }
         * ];
         *
         * possibleOptions.forEach(align => {
         *   new Flicking("#el", { align });
         * });
         * ```
         */
        get: function () {
          return this._align;
        },
        // Options Setter
        // UI / LAYOUT
        set: function (val) {
          this._align = val;
          this._renderer.align = val;
          this._camera.align = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "defaultIndex", {
        /**
         * Index of the panel to move when Flicking's {@link Flicking#init init()} is called. A zero-based integer
         * @ko Flicking의 {@link Flicking#init init()}이 호출될 때 이동할 디폴트 패널의 인덱스로, 0부터 시작하는 정수입니다
         * @type {number}
         * @default 0
         */
        get: function () {
          return this._defaultIndex;
        },
        set: function (val) {
          this._defaultIndex = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "horizontal", {
        /**
         * Direction of panel movement (true: horizontal, false: vertical)
         * @ko 패널 이동 방향 (true: 가로방향, false: 세로방향)
         * @type {boolean}
         * @default true
         */
        get: function () {
          return this._horizontal;
        },
        set: function (val) {
          this._horizontal = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "circular", {
        /**
         * Enables circular(continuous loop) mode, which connects first/last panel for continuous scrolling.
         * @ko 순환 모드를 활성화합니다. 순환 모드에서는 양 끝의 패널이 서로 연결되어 끊김없는 스크롤이 가능합니다.
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._circular;
        },
        set: function (val) {
          this._circular = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "bound", {
        /**
         * Prevent the view(camera element) from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel
         * Only can be enabled when `circular=false`
         * @ko 뷰(카메라 엘리먼트)가 첫번째와 마지막 패널 밖으로 넘어가지 못하게 하여, 첫번째/마지막 패널 전/후의 빈 공간을 보이지 않도록 하는 옵션입니다
         * `circular=false`인 경우에만 사용할 수 있습니다
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._bound;
        },
        set: function (val) {
          this._bound = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "adaptive", {
        /**
         * Update height of the viewport element after movement same to the height of the panel below. This can be only enabled when `horizontal=true`
         * @ko 이동한 후 뷰포트 엘리먼트의 크기를 현재 패널의 높이와 동일하게 설정합니다. `horizontal=true`인 경우에만 사용할 수 있습니다.
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._adaptive;
        },
        set: function (val) {
          this._adaptive = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "needPanelThreshold", {
        // EVENTS

        /**
         * A Threshold from viewport edge before triggering `needPanel` event
         * @ko `needPanel`이벤트가 발생하기 위한 뷰포트 끝으로부터의 최대 거리
         * @type {number}
         * @default 0
         */
        get: function () {
          return this._needPanelThreshold;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "deceleration", {
        // ANIMATION

        /**
         * Deceleration value for panel movement animation which is triggered by user input. A higher value means a shorter animation time
         * @ko 사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아집니다
         * @type {number}
         * @default 0.0075
         */
        get: function () {
          return this._deceleration;
        },
        // ANIMATION
        set: function (val) {
          this._deceleration = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "easing", {
        /**
         * An easing function applied to the panel movement animation. Default value is `easeOutCubic`
         * @ko 패널 이동 애니메이션에 적용할 easing 함수. 기본값은 `easeOutCubic`이다
         * @type {function}
         * @default x => 1 - Math.pow(1 - x, 3)
         * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
         */
        get: function () {
          return this._easing;
        },
        set: function (val) {
          this._easing = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "duration", {
        /**
         * Default duration of the animation (ms)
         * @ko 디폴트 애니메이션 재생 시간 (ms)
         * @default 500
         * @type number
         */
        get: function () {
          return this._duration;
        },
        set: function (val) {
          this._duration = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "inputType", {
        // INPUT

        /**
         * Types of input devices to enable
         * @ko 활성화할 입력 장치 종류
         * @type string[]
         * @default ["touch", "mouse"]
         * @see {@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption Possible values (PanInputOption#inputType)}
         * <ko>{@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption 가능한 값들 (PanInputOption#inputType)}</ko>
         */
        get: function () {
          return this._inputType;
        },
        // INPUT
        set: function (val) {
          this._inputType = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "moveType", {
        /**
         * Movement style by user input. This will change instance type of {@link Flicking#control}
         * @ko 사용자 입력에 의한 이동 방식. 이 값에 따라 {@link Flicking#control}의 인스턴스 타입이 결정됩니다
         * @type string
         * @default "snap"
         * @see {@link Constants.MOVE_TYPE}
         * @example
         * ```ts
         * import Flicking, { MOVE_TYPE } from "@egjs/flicking";
         *
         * const flicking = new Flicking({
         *   moveType: MOVE_TYPE.FREE_SCROLL
         * });
         * ```
         */
        get: function () {
          return this._moveType;
        },
        set: function (val) {
          this._moveType = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "threshold", {
        /**
         * Movement threshold to change panel (unit: px). It should be dragged above the threshold to change the current panel.
         * @ko 패널 변경을 위한 이동 임계값 (단위: px). 주어진 값 이상으로 스크롤해야만 패널 변경이 가능하다.
         * @type {number}
         * @default 40
         */
        get: function () {
          return this._threshold;
        },
        set: function (val) {
          this._threshold = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "interruptable", {
        /**
         * Set animation to be interruptable by click/touch.
         * @ko 사용자의 클릭/터치로 인해 애니메이션을 도중에 멈출 수 있도록 설정합니다.
         * @type {boolean}
         * @default true
         */
        get: function () {
          return this._interruptable;
        },
        set: function (val) {
          this._interruptable = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "bounce", {
        /**
         * The size value of the bounce area. Only can be enabled when `circular=false`.
         * You can set different bounce value for prev/next direction by using array.
         * `number` for px value, and `string` for px, and % value relative to viewport size.
         * You have to call {@link Control#updateInput} after changing this to take effect.
         * @ko Flicking이 최대 영역을 넘어서 갈 수 있는 최대 크기. `circular=false`인 경우에만 사용할 수 있습니다.
         * 배열을 통해 prev/next 방향에 대해 서로 다른 바운스 값을 지정할 수 있습니다.
         * `number`를 통해 px값을, `stirng`을 통해 px 혹은 뷰포트 크기 대비 %값을 사용할 수 있습니다.
         * 이 값을 변경시 {@link Control#updateInput}를 호출해야 합니다.
         * @type {string | number | Array<string | number>}
         * @default "20%"
         * @example
         * ```ts
         * const possibleOptions = [
         *   // % values, relative to viewport element(".flicking-viewport")'s size
         *   "0%", "25%", "42%",
         *   // px values, arithmetic calculation with (+/-) is also allowed.
         *   "0px", "100px", "50% - 25px",
         *   // numbers, same to number + px ("0px", "100px")
         *   0, 100, 1000
         * ];
         * ```
         *
         * @example
         * ```ts
         * const flicking = new Flicking("#el", { bounce: "20%" });
         *
         * flicking.bounce = "100%";
         * flicking.control.updateInput(); // Call this to update!
         * ```
         */
        get: function () {
          return this._bounce;
        },
        set: function (val) {
          this._bounce = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "iOSEdgeSwipeThreshold", {
        /**
         * Size of the area from the right edge in iOS safari (in px) which enables swipe-back or swipe-forward
         * @ko iOS Safari에서 swipe를 통한 뒤로가기/앞으로가기를 활성화하는 오른쪽 끝으로부터의 영역의 크기 (px)
         * @type {number}
         * @default 30
         */
        get: function () {
          return this._iOSEdgeSwipeThreshold;
        },
        set: function (val) {
          this._iOSEdgeSwipeThreshold = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "preventClickOnDrag", {
        /**
         * Automatically prevent `click` event if the user has dragged at least a single pixel on the viewport element
         * @ko 사용자가 뷰포트 영역을 1픽셀이라도 드래그했을 경우 자동으로 {@link https://developer.mozilla.org/ko/docs/Web/API/Element/click_event click} 이벤트를 취소합니다
         * @type {boolean}
         * @default true
         */
        get: function () {
          return this._preventClickOnDrag;
        },
        set: function (val) {
          this._preventClickOnDrag = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderOnlyVisible", {
        // PERFORMANCE

        /**
         * Whether to render visible panels only. This can dramatically increase performance when there're many panels.
         * This will set {@link Flicking#renderer renderer}'s type to {@link VisibleRenderer}
         * @ko 보이는 패널만 렌더링할지 여부를 설정합니다. 패널이 많을 경우에 퍼포먼스를 크게 향상시킬 수 있습니다.
         * 이 옵션을 활성화할 경우 {@link Flicking#renderer renderer}의 타입을 {@link VisibleRenderer}로 설정합니다.
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._renderOnlyVisible;
        },
        // PERFORMANCE
        set: function (val) {
          this._renderOnlyVisible = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "autoInit", {
        // OTHERS

        /**
         * Call {@link Flicking#init init()} automatically when creating Flicking's instance
         * @ko Flicking 인스턴스를 생성할 때 자동으로 {@link Flicking#init init()}를 호출합니다
         * @type {boolean}
         * @default true
         * @readonly
         */
        get: function () {
          return this._autoInit;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "autoResize", {
        /**
         * Attach Flicking's {@link Flicking#resize resize} method to window's resize event.
         * Flicking will automatically call {@link Flicking#resize resize} window size and orientation change.
         * @ko Flicking의 {@link Flicking#resize resize} 메소드를 window의 resize 이벤트 핸들러로 등록합니다.
         * 설정시 window 창 크기 및 orientation 변경에 의해 자동으로 {@link Flicking#resize resize}를 호출합니다.
         * @type {boolean}
         * @default true
         */
        get: function () {
          return this._autoResize;
        },
        // OTHERS
        set: function (val) {
          this._autoResize = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderExternal", {
        /**
         * This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.
         * @ko 프레임워크(React, Vue, Angular, ...)에서만 사용하는 옵션으로, 자동으로 설정되므로 따로 사용하실 필요 없습니다!
         * @type {boolean}
         * @default false
         * @internal
         * @readonly
         */
        get: function () {
          return this._renderExternal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "useOrderManipulator", {
        /**
         * Use {@link OrderManipulator} for the element order managing in {@link Renderer}.
         * Instead of inserting/removing element to change order, this will use CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/order order}.
         * ⚠️ Enabling this option will decrease browser coverage to IE11+
         * @ko {@link Renderer}에서 엘리먼트 순서 관리를 위해 {@link OrderManipulator}를 사용합니다.
         * 엘리먼트를 직접적으로 추가/삭제하는 대신 CSS {@link https://developer.mozilla.org/ko/docs/Web/CSS/order order} 속성을 사용해서 순서를 관리합니다.
         * ⚠️ 이 옵션을 사용시 IE10 이하의 브라우저는 지원할 수 없습니다.
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._useOrderManipulator;
        },
        set: function (val) {
          this._useOrderManipulator = val;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize Flicking and move to the default index
       * This is automatically called on Flicking's constructor when `autoInit` is true(default)
       * @ko Flicking을 초기화하고, 디폴트 인덱스로 이동합니다
       * 이 메소드는 `autoInit` 옵션이 true(default)일 경우 Flicking이 생성될 때 자동으로 호출됩니다
       * @fires Flicking#ready
       * @return {this}
       */

      __proto.init = function () {
        if (this._initialized) return this;
        var camera = this._camera;
        var renderer = this._renderer;
        var control = this._control;
        var viewport = this._viewport;
        camera.init(this);
        renderer.init(this);
        control.init(this);
        this.resize(); // Look at initial panel

        this._moveToInitialPanel();

        if (this._autoResize) {
          window.addEventListener("resize", this.resize);
        }

        if (this._preventClickOnDrag) {
          viewport.element.addEventListener("click", this._preventClickWhenDragged);
        } // Done initializing & emit ready event


        this._initialized = true;
        this.trigger(new ComponentEvent$1(EVENTS.READY));
        return this;
      };
      /**
       * Destroy Flicking and remove all event handlers
       * @ko Flicking과 하위 컴포넌트들을 초기 상태로 되돌리고, 부착된 모든 이벤트 핸들러를 제거합니다
       * @return {void}
       */


      __proto.destroy = function () {
        if (!this._initialized) return;
        this.off();
        window.removeEventListener("resize", this.resize);

        this._viewport.element.removeEventListener("click", this._preventClickWhenDragged);

        this._control.destroy();

        this._camera.destroy();

        this._renderer.destroy();

        this._initialized = false;
      };
      /**
       * Move to the previous panel (current index - 1)
       * @ko 이전 패널로 이동합니다 (현재 인덱스 - 1)
       * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms)<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
       * @async
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|When the previous panel does not exist|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|이전 패널이 존재하지 않을 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the previous panel<ko>이전 패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.prev = function (duration) {
        var _a, _b, _c;

        if (duration === void 0) {
          duration = this._duration;
        }

        return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.prev()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : -1, duration, DIRECTION.PREV);
      };
      /**
       * Move to the next panel (current index + 1)
       * @ko 다음 패널로 이동합니다 (현재 인덱스 + 1)
       * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
       * @async
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|When the next panel does not exist|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|다음 패널이 존재하지 않을 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the next panel<ko>다음 패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.next = function (duration) {
        var _a, _b, _c;

        if (duration === void 0) {
          duration = this._duration;
        }

        return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.next()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : this._renderer.panelCount, duration, DIRECTION.NEXT);
      };
      /**
       * Move to the panel with given index
       * @ko 주어진 인덱스에 해당하는 패널로 이동합니다
       * @param {number} index The index of the panel to move<ko>이동할 패널의 인덱스</ko>
       * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
       * @param {Constants.DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
       * @async
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|When the root is not either string or HTMLElement|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|해당 인덱스를 가진 패널이 존재하지 않을 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.moveTo = function (index, duration, direction) {
        if (duration === void 0) {
          duration = this._duration;
        }

        if (direction === void 0) {
          direction = DIRECTION.NONE;
        }

        var renderer = this._renderer;
        var panelCount = renderer.panelCount;
        var panel = renderer.getPanel(index);

        if (!panel) {
          return Promise.reject(new FlickingError(MESSAGE.INDEX_OUT_OF_RANGE(index, 0, panelCount - 1), CODE.INDEX_OUT_OF_RANGE));
        }

        if (this._control.animating) {
          return Promise.reject(new FlickingError(MESSAGE.ANIMATION_ALREADY_PLAYING, CODE.ANIMATION_ALREADY_PLAYING));
        }

        return this._control.moveToPanel(panel, {
          duration: duration,
          direction: direction
        });
      };
      /**
       * Return the {@link Panel} at the given index. `null` if it doesn't exists.
       * @ko 주어진 인덱스에 해당하는 {@link Panel}을 반환합니다. 주어진 인덱스에 해당하는 패널이 존재하지 않을 경우 `null`을 반환합니다.
       * @return {Panel | null} Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>
       * @see Panel
       * @example
       * ```ts
       * const panel = flicking.getPanel(0);
       * // Which is a shorthand to...
       * const samePanel = flicking.panels[0];
       * ```
       */


      __proto.getPanel = function (index) {
        return this._renderer.getPanel(index);
      };
      /**
       * Enable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 활성화합니다
       * @return {this}
       */


      __proto.enableInput = function () {
        this._control.enable();

        return this;
      };
      /**
       * Disable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 막습니다
       * @return {this}
       */


      __proto.disableInput = function () {
        this._control.disable();

        return this;
      };
      /**
       * Get current flicking status. You can restore current state by giving returned value to [setStatus()]{@link Flicking#setStatus}
       * @ko 현재 상태를 반환합니다. 반환받은 값을 [setStatus()]{@link Flicking#setStatus} 메소드의 인자로 지정하면 현재 상태를 복원할 수 있습니다
       * @return An object with current status value information.<ko>현재 상태값 정보를 가진 객체.</ko>
       */


      __proto.getStatus = function () {
        // TODO:
        return {
          index: -1,
          panels: [],
          position: 0
        };
      };
      /**
       * Restore to the state of the `status`
       * @ko `status`의 상태로 복원합니다
       * @param status Status value to be restored. You can specify the return value of the [getStatus()]{@link Flicking#getStatus} method<ko>복원할 상태 값. [getStatus()]{@link Flicking#getStatus}메서드의 반환값을 지정하면 됩니다</ko>
       * @return {void}
       */


      __proto.setStatus = function (status) {
        // TODO:
        return;
      };
      /**
       * Add plugins that can have different effects on Flicking
       * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가합니다
       * @param - The plugin(s) to add<ko>추가할 플러그인(들)</ko>
       * @return {this}
       */


      __proto.addPlugins = function (plugins) {
        // TODO:
        return this;
      };
      /**
       * Remove plugins from Flicking.
       * @ko 플리킹으로부터 플러그인들을 제거합니다.
       * @param - The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
       * @return {this}
       */


      __proto.removePlugins = function (plugins) {
        // TODO:
        return this;
      };
      /**
       * Add new panels after the last panel
       * @ko 패널 목록의 제일 끝에 새로운 패널들을 추가합니다
       * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
       * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
       * @return {Panel[]} An array of appended panels<ko>추가된 패널들의 배열</ko>
       * @see Panel
       * @see ElementLike
       * @throws {FlickingError} {@link Constants.ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
       * @example
       * ```ts
       * const flicking = new Flicking("#flick");
       * // These are possible parameters
       * flicking.append(document.createElement("div"));
       * flicking.append("\<div\>Panel\</div\>");
       * flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]);
       * // Even this is possible
       * flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
       * ```
       */


      __proto.append = function (element) {
        return this.insert(this._renderer.panelCount, element);
      };
      /**
       * Add new panels before the first panel
       * This will increase index of panels after by the number of panels added
       * @ko 패널 목록의 제일 앞(index 0)에 새로운 패널들을 추가합니다
       * 추가한 패널의 개수만큼 기존 패널들의 인덱스가 증가합니다.
       * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
       * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
       * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
       * @see Panel
       * @see ElementLike
       * @throws {FlickingError} {@link Constants.ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
       * @example
       * ```ts
       * const flicking = new eg.Flicking("#flick");
       * flicking.prepend(document.createElement("div"));
       * flicking.prepend("\<div\>Panel\</div\>");
       * flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]);
       * // Even this is possible
       * flicking.prepend("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
       * ```
       */


      __proto.prepend = function (element) {
        return this.insert(0, element);
      };
      /**
       * Insert new panels at given index
       * This will increase index of panels after by the number of panels added
       * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
       * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
       * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
       * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
       * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
       * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
       * @throws {FlickingError} {@link Constants.ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
       * @example
       * ```ts
       * const flicking = new eg.Flicking("#flick");
       * flicking.insert(0, document.createElement("div"));
       * flicking.insert(2, "\<div\>Panel\</div\>");
       * flicking.insert(1, ["\<div\>Panel\</div\>", document.createElement("div")]);
       * // Even this is possible
       * flicking.insert(3, "\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
       * ```
       */


      __proto.insert = function (index, element) {
        if (this._renderExternal) {
          throw new FlickingError(MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, CODE.NOT_ALLOWED_IN_FRAMEWORK);
        }

        return this._renderer.insert(index, element);
      };
      /**
       * Remove the panel at the given index
       * This will decrease index of panels after by the number of panels removed
       * @ko 주어진 인덱스의 패널을 제거합니다
       * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
       * @param {number} index Index of panel to remove<ko>제거할 패널의 인덱스</ko>
       * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
       * @return {Panel[]} An array of removed panels<ko>제거된 패널들의 배열</ko>
       */


      __proto.remove = function (index, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 1;
        }

        if (this._renderExternal) {
          throw new FlickingError(MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, CODE.NOT_ALLOWED_IN_FRAMEWORK);
        }

        return this._renderer.remove(index, deleteCount);
      };

      __proto._createControl = function () {
        var moveType = this._moveType;
        var moveTypes = Object.keys(MOVE_TYPE).map(function (key) {
          return MOVE_TYPE[key];
        });

        if (!includes(moveTypes, moveType)) {
          throw new FlickingError(MESSAGE.WRONG_OPTION("moveType", JSON.stringify(moveType)), CODE.WRONG_OPTION);
        }

        switch (moveType) {
          case MOVE_TYPE.SNAP:
            return new SnapControl();

          case MOVE_TYPE.FREE_SCROLL:
            return new FreeControl();
        }
      };

      __proto._createCamera = function () {
        var cameraOption = {
          align: this._align
        };

        if (this._circular) {
          if (this._bound) {
            // eslint-disable-next-line no-console
            console.warn("\"circular\" and \"bound\" option cannot be used together, ignoring bound.");
          }

          return new CircularCamera(cameraOption);
        } else if (this._bound) {
          return new BoundCamera(cameraOption);
        } else {
          return new LinearCamera(cameraOption);
        }
      };

      __proto._createRenderer = function () {
        var elementManipulator = this._useOrderManipulator ? new OrderManipulator() : this._renderExternal ? new OffsetManipulator() : new ElementManipulator();
        var rendererOptions = {
          align: this._align,
          elementManipulator: elementManipulator
        };
        return this._createActualRenderer(rendererOptions);
      };

      __proto._createActualRenderer = function (rendererOptions) {
        if (this._renderOnlyVisible) {
          return new VisibleRenderer(rendererOptions);
        } else {
          return new RawRenderer(rendererOptions);
        }
      };

      __proto._moveToInitialPanel = function () {
        var renderer = this._renderer;
        var control = this._control;
        var initialPanel = renderer.getPanel(this._defaultIndex) || renderer.getPanel(0);
        if (!initialPanel) return;
        void control.moveToPanel(initialPanel, {
          duration: 0
        });
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @type {string}
       * @readonly
       * @example
       * Flicking.VERSION;  // ex) 4.0.0
       */


      Flicking.VERSION = "4.0.0-beta.1";
      return Flicking;
    }(Component$1);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Core = {
        __proto__: null,
        Panel: Panel,
        Viewport: Viewport,
        FlickingError: FlickingError,
        AnchorPoint: AnchorPoint
    };

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    merge(Flicking, Core);
    merge(Flicking, Camera);
    merge(Flicking, Control);
    merge(Flicking, Renderer);
    merge(Flicking, Constants);

    return Flicking;

})));
//# sourceMappingURL=flicking.pkgd.js.map
