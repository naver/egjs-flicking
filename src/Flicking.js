/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import Axes, {PanInput} from "@egjs/axes";
import {utils, Mixin} from "./utils";
import * as consts from "./consts";
import {CONFIG, OPTIONS} from "./config";
import {document} from "./browser";
import eventHandler from "./eventHandler";

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
 * 	previewPadding: [0 0],
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
export default class Flicking extends Mixin(Component).with(eventHandler) {
	/**
	 * Constructor
	 * @param {HTMLElement|String} element A base element for the eg.Flicking module. When specifying a value as a `String` type, you must specify a css selector string to select the element.<ko>eg.Flicking 모듈을 사용할 기준 요소. `String`타입으로 값 지정시 요소를 선택하기 위한 css 선택자 문자열을 지정해야 한다.</ko>
	 * @param {Object} [options] The option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
	 * @param {Boolean} [options.hwAccelerable=true] Force hardware compositing.<ko>하드웨어 가속 사용 여부.</ko>
	 * @param {String} [options.prefix="eg-flick"] A prefix for class names of the panel elements.<ko>패널 요소의 클래스 이름 접두사.</ko>
	 * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time.<ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
	 * @param {Boolean} [options.horizontal=true] Direction of the panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true 가로방향, false 세로방향)</ko>
	 * @param {Boolean} [options.circular=false] Whether to let the first panel flick right to the end panel (let the left panel flick from the end panel to move to the first panel). (The term 'circulation')<ko>첫 패널에서 우 액션 입력하여 끝 패널로 이동하게 할지와 끝 패널에서 우 액션 입력하여 첫 패널로 이동할하게 할지 여부. (통칭 '순환')</ko>
	 * @param {Number|Array} [options.previewPadding=[0,0]] The preview size value(unit: pixel) for the previous or next panel. If direction is set to "horizontal", the preview section will be displayed on the left and right of the panel. If direction is set to "vertical", it will be displayed on the top and bottom of the panel.<ko>이전 패널과 다음 패널을 미리 보는 영역의 크기값(단위: 픽셀). 패널 이동 방향이 가로 방향이면 패널 좌우에, 세로 방향이면 패널 상하에 미리 보는 영역이 나타난다.</ko>
	 * @param {Number|Array} [options.bounce=[10,10]] The size value(unit: pixel) of the bounce area. If `circular=false`, the panel can be moved by this value when inputting a right gesture in the first panel or inputting a left gesture in the end panel. When the input is completed while moving, it returns to its original position.<ko>바운스 영역의 크기값(단위: 픽셀). `circular=false`인 경우, 첫 패널에서 우 액션 입력시, 끝 패널에서 좌 액션 입력시 이 값 만큼만 패널이 이동할 수 있고 이동한 상태에서 입력을 마치면 원래 자리로 돌아온다.</ko>
	 * @param {Number} [options.threshold=40] Movement threshold to destination panel(unit: pixel). A panel element must be dragged beyond the threshold to move to the destination panel.<ko>목적 패널로의 이동 임계값 (단위: 픽셀). 패널 요소를 임계값 이상으로 끌어다 놓아야만이 목적 패널로 이동한다.</ko>
	 * @param {Number} [options.duration=100] Duration of the panel movement. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
	 * @param {Function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] The easing function to apply to a panel moving animation. The default function is easeOutCubic.<ko>패널 이동 애니메이션에 적용할 `easing`함수. 기본값은 `easeOutCubic`이다.</ko>
	 * @param {Number} [options.defaultIndex=0] The panel index number to specify when initializing the module. A zero-based integer.<ko>모듈 초기화시 지정할 패널 인덱스 번호. 0부터 시작하는 정수.</ko>
	 * @param {Array} [options.inputType=["touch,"mouse"]] Types of input devices. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput Reference})<br>- "touch": A touch input device.<br>- "mouse": A mouse.<ko>입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput 참고})<br>- "touch": 터치 입력 장치.<br>- "mouse": 마우스.</ko>
	 * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user input is horizontal or vertical. (0 ~ 90)<ko>사용자의 입력이 가로 방향인지 세로 방향인지 판단하는 기준 각도 (0 ~ 90)</ko>
	 * @param {Boolean} [options.adaptiveHeight=false] Whether the height of the container element reflects the height value of the panel after completing the movement.<br>(Note: on Android 4.1.x stock browser, has rendering bug which not correctly render height value on panel with single node. To avoid just append another empty node at the end.)<ko>목적 패널로 이동한 후 그 패널의 높이값을 컨테이너 요소의 높이값에 반영할지 여부.<br>(참고: Android 4.1.x 스톡 브라우저에서 단일 노드로 구성된 패널의 높이값 변경이 제대로 렌더링 되지 않는 버그가 있음. 비어있는 노드를 추가하면 해결이 가능하다.)</ko>
	*/
	constructor(element, options, _prefix) {
		super();

		this.$wrapper = utils.$(element);
		const $children = this.$wrapper && this.$wrapper.children;

		if (!this.$wrapper || !$children || !$children.length) {
			// eslint-disable validateLineBreaks, maximumLineLength
			throw new Error("Given base element doesn't exist or it hasn't proper DOM structure to be initialized.");

			// eslint-enable validateLineBreaks, maximumLineLength
		}

		this._setOptions(options);
		this._setConfig($children, _prefix);

		!utils.hasClickBug() && (this._setPointerEvents = () => {});

		this._build();
		this._bindEvents(true);

		this._applyPanelsCss();
		this._arrangePanels();

		this.options.hwAccelerable && consts.SUPPORT_WILLCHANGE && this._setHint();
		this.options.adaptiveHeight && this._setAdaptiveHeight();

		this._adjustContainerCss("end");
	}

	/**
	 * Set options values
	 * @private
	 * @param {Object} options
	 */
	_setOptions(options) {
		// default value of previewPadding and bounce
		const arrVal = {
			previewPadding: [0, 0],
			bounce: [10, 10]
		};

		this.options = utils.extend(utils.extend({}, OPTIONS), arrVal, options);

		for (const key in arrVal) {
			let val = this.options[key];

			if (typeof val === "number") {
				val = [val, val];
			} else if (!utils.isArray(val)) {
				val = arrVal[key];
			}

			this.options[key] = val;
		}
	}

	/**
	 * Set config values
	 * @private
	 * @param {HTMLCollection} $children wrappers' children elements
	 * @param {String} _prefix event prefix
	 * @return {HTMLElement}
	 */
	_setConfig($children, _prefix) {
		const options = this.options;
		const padding = options.previewPadding;
		let $nodes = $children;

		if (utils.classList($nodes[0], `${options.prefix}-container`)) {
			$nodes = $nodes[0];
			this.$container = $nodes;
			$nodes = $nodes.children;
		}

		// convert to array
		$nodes = [].slice.call($nodes);

		// config value
		const conf = this._conf = utils.extend(utils.extend({}, CONFIG), {
			panel: {
				$list: $nodes,
				minCount: padding[0] + padding[1] > 0 ? 5 : 3  // minimum panel count
			},
			// remember original class and inline style in case of restoration on destroy()
			origPanelStyle: {
				wrapper: {
					className: this.$wrapper.getAttribute("class") || null,
					style: this.$wrapper.getAttribute("style") || null
				},
				container: {
					className: (this.$container && this.$container.getAttribute("class")) || null,
					style: (this.$container && this.$container.getAttribute("style")) || null
				},
				list: $nodes.map(v => ({
					className: v.getAttribute("class") || null,
					style: v.getAttribute("style") || null
				}))
			},
			useLayerHack: options.hwAccelerable && !consts.SUPPORT_WILLCHANGE,
			eventPrefix: _prefix || ""
		});

		[["LEFT", "RIGHT"], ["UP", "DOWN"]][+!options.horizontal]
			.forEach(v => conf.dirData.push(Axes[`DIRECTION_${v}`]));
	}

	/**
	 * Build and set panel nodes to make flicking structure
	 * @private
	 */
	_build() {
		const panel = this._conf.panel;
		const options = this.options;
		const $children = panel.$list;
		const padding = options.previewPadding.concat();
		const prefix = options.prefix;
		const horizontal = options.horizontal;
		let panelCount = panel.count = panel.origCount = $children.length;
		const bounce = options.bounce;

		this._setPadding(padding, true);
		const sizeValue = this._getDataByDirection([panel.size, "100%"]);

		// container element style
		const cssValue = {
			position: "relative",
			zIndex: 2000,
			width: "100%",
			height: "100%"
		};

		horizontal && (cssValue.top = "0px");

		if (this.$container) {
			utils.css(this.$container, cssValue);
		} else {
			const $parent = $children[0].parentNode;
			const $container = document.createElement("div");

			$container.className = `${prefix}-container`;
			utils.css($container, cssValue);

			$children.forEach(v => $container.appendChild(v));

			$parent.appendChild($container);
			this.$container = $container;
		}

		// panels' css values
		$children.forEach(v => {
			utils.classList(v, `${prefix}-panel`, true);

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
			panelCount = panel.count = (
				panel.$list = [].slice.call(this.$container.children)
			).length;
		}

		// create Axes instance
		this._axesInst = new Axes({
			flick: {
				range: [0, panel.size * (panelCount - 1)],
				bounce
			}
		}, {
			easing: options.panelEffect,
			deceleration: options.deceleration,
			interruptable: false
		});

		this._setDefaultPanel(options.defaultIndex);
	}

	/**
	 * Set preview padding value
	 * @private
	 * @param {Array} padding
	 * @param {Boolean} build
	 */
	_setPadding(padding, build) {
		const horizontal = this.options.horizontal;
		const panel = this._conf.panel;
		const paddingSum = padding[0] + padding[1];
		const cssValue = {};

		if (paddingSum || !build) {
			cssValue.padding = horizontal ?
				`0 ${padding.reverse().join("px 0 ")}px` :
				`${padding.join("px 0 ")}px`;
		}

		if (build) {
			cssValue.overflow = "hidden";
			cssValue.boxSizing = "border-box";
		}

		Object.keys(cssValue).length &&
			utils.css(this.$wrapper, cssValue);

		const wrapperStyle = getComputedStyle(this.$wrapper);
		const paddingType = horizontal ? ["Left", "Right"] : ["Top", "Bottom"];
		const wrapperSize = Math.max(
			this.$wrapper[`offset${horizontal ? "Width" : "Height"}`],
			utils.getNumValue(wrapperStyle[horizontal ? "width" : "height"])
		);

		panel.size = wrapperSize - (
			utils.getNumValue(wrapperStyle[`padding${paddingType[0]}`]) +
			utils.getNumValue(wrapperStyle[`padding${paddingType[1]}`])
		);
	}

	/**
	 * To fulfill minimum panel count cloning original node when circular or previewPadding option are set
	 * @private
	 * @return {Boolean} true : added clone node, false : not added
	 */
	_addClonePanels() {
		const panel = this._conf.panel;
		const panelCount = panel.origCount;
		const cloneCount = panel.minCount - panelCount;
		const list = panel.$list;
		let cloneNodes;

		// if panels are given less than required when circular option is set, then clone node to apply circular mode
		if (this.options.circular && panelCount < panel.minCount) {
			cloneNodes = list.map(v => v.cloneNode(true));

			while (cloneNodes.length < cloneCount) {
				cloneNodes = cloneNodes.concat(
					list.map(v => v.cloneNode(true))
				);
			}

			cloneNodes.forEach(v => this.$container.appendChild(v));

			return !!cloneNodes.length;
		}

		return false;
	}

	/**
	 * Move panel's position within array
	 * @private
	 * @param {Number} count element counts to move
	 * @param {Boolean} append where the list to be appended(moved) (true: to the end, false: to the beginning)
	 */
	_movePanelPosition(count, append) {
		const panel = this._conf.panel;
		const list = panel.$list;
		const listToMove = list.splice(append ? 0 : panel.count - count, count);

		panel.$list = append ?
			list.concat(listToMove) :
			listToMove.concat(list);
	}

	/**
	 * Set default panel to show
	 * @private
	 * @param {Number} index
	 */
	_setDefaultPanel(index) {
		const panel = this._conf.panel;
		const lastIndex = panel.count - 1;
		let coords;
		let baseIndex;

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
			// if defaultIndex option is given, then move to that index panel
		} else if (index > 0 && index <= lastIndex) {
			this._setPanelNo({
				index,
				no: index,
				currIndex: index,
				currNo: index
			});

			coords = [-(panel.size * index), 0];

			this._setTranslate(coords);
			this._setAxes("setTo", Math.abs(coords[0]), 0);
		}
	}

	/**
	 * Arrange panels' position
	 * @private
	 * @param {Boolean} sort Need to sort panel's position
	 * @param {Number} indexToMove Number to move from current position (negative: left, positive: right)
	 */
	_arrangePanels(sort, indexToMove) {
		const conf = this._conf;
		const panel = conf.panel;
		const touch = conf.touch;
		const dirData = conf.dirData;
		let baseIndex;

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

			// arrange Axes' coord position
			conf.customEvent.flick = !!this._setAxes("setTo", panel.size * panel.index, 0);
		}

		this._applyPanelsPos();
	}

	/**
	 * Set each panel's position in DOM
	 * @private
	 */
	_applyPanelsPos() {
		this._conf.panel.$list.forEach(this._applyPanelsCss.bind(this));
	}

	/**
	 * Set CSS style values to move elements
	 *
	 * Initialize setting up checking if browser support transform css property.
	 * If browser doesn't support transform, then use left/top properties instead.
	 * @private
	 * @param {HTMLElement} $el
	 * @param {Array} coordsValue
	 */
	_setMoveStyle($el, coordsValue) {
		const transform = consts.TRANSFORM;

		this._setMoveStyle = transform.support ?
			function($element, coords) {
				utils.css($element, {
					[transform.name]: utils.translate(coords[0], coords[1], this._conf.useLayerHack)
				});
			} : ($element, coords) => {
				utils.css($element, {left: coords[0], top: coords[1]});
			};

		this._setMoveStyle($el, coordsValue);
	}

	/**
	 * Callback function for applying CSS values to each panels
	 * Need to be initialized before use, to set up for Android 2.x browsers or others.
	 * @private
	 */
	_applyPanelsCss() {
		const conf = this._conf;
		const dummyAnchorClassName = "__dummy_anchor";

		if (consts.IS_ANDROID2) {
			conf.$dummyAnchor = utils.$(`.${dummyAnchorClassName}`);

			!conf.$dummyAnchor && this.$wrapper.appendChild(
				conf.$dummyAnchor = utils.$(`<a href="javascript:void(0)" class="${dummyAnchorClassName}" style="position:absolute;height:0px;width:0px">`)
			);

			this._applyPanelsCss = function applyCss(v, i) {
				const coords = this._getDataByDirection(
					[`${this._conf.panel.size * i}px`, 0]
				);

				utils.css(v, {
					left: coords[0],
					top: coords[1]
				});
			};
		} else {
			this._applyPanelsCss = function applyCss(v, i) {
				const coords = this._getDataByDirection([
					consts.TRANSFORM.support ?
						`${100 * i}%` :
						`${this._conf.panel.size * i}px`, 0
				]);

				this._setMoveStyle(v, coords);
			};
		}
	}

	/**
	 * Adjust container's css value to handle Android 2.x link highlighting bug
	 * @private
	 * @param {String} phase
	 *    start - set left/top value to 0
	 *    end - set translate value to 0
	 * @param {Array} toValue coordinate value
	 */
	_adjustContainerCss(phase, toValue) {
		const conf = this._conf;
		const panel = conf.panel;
		const options = this.options;
		const horizontal = options.horizontal;
		const paddingTop = options.previewPadding[0];
		let container = this.$container;
		let to = toValue;
		let value;

		if (consts.IS_ANDROID2) {
			if (!to) {
				to = -panel.size * panel.index;
			}

			if (phase === "start") {
				container = container.style;
				value = parseInt(container[horizontal ? "left" : "top"], 10);

				if (horizontal) {
					value && (container.left = "0px");
				} else {
					value !== paddingTop && (container.top = "0px");
				}

				this._setTranslate([-to, 0]);
			} else if (phase === "end") {
				to = this._getCoordsValue([to, 0]);

				utils.css(container, {
					left: to.x,
					top: to.y,
					[consts.TRANSFORM.name]: utils.translate(0, 0, conf.useLayerHack)
				});

				conf.$dummyAnchor.focus();
			}
		}
	}

	/**
	 * Set Axes coord value
	 * @private
	 * @param {String} method
	 * @param {Number} flick destination value
	 * @param {Number} duration
	 * @return {eg.Axes} Axes instance
	 */
	_setAxes(method, flick, duration) {
		return this._axesInst[method]({flick}, duration);
	}

	/**
	 * Set hint for browser to decide efficient way of doing transform changes(or animation)
	 * https://dev.opera.com/articles/css-will-change-property/
	 * @private
	 */
	_setHint() {
		const style = {willChange: "transform"};

		utils.css(this.$container, style);
		utils.css(this._conf.panel.$list, style);
	}

	/**
	 * Get data according options.horizontal value
	 * @private
	 * @param {Array} value primary data to handle
	 * @return {Array}
	 */
	_getDataByDirection(value) {
		const data = value.concat();

		!this.options.horizontal && data.reverse();
		return data;
	}

	/**
	 * Move nodes
	 * @private
	 * @param {Boolean} direction
	 * @param {Number} indexToMove
	 */
	_arrangePanelPosition(direction, indexToMove) {
		const next = direction === this._conf.dirData[0];

		this._movePanelPosition(Math.abs(indexToMove || 1), next);
	}

	/**
	 * Get the base position index of the panel
	 * @private
	 */
	_getBasePositionIndex() {
		return Math.floor(this._conf.panel.count / 2 - 0.1);
	}

	/**
	 * Bind events
	 * @private
	 * @param {Boolean} bind
	 */
	_bindEvents(bind) {
		const options = this.options;
		const $wrapper = this.$wrapper;
		const axesInst = this._axesInst;

		if (bind) {
			this._panInput = new PanInput($wrapper, {
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
	}

	/**
	 * Set container's height value according to children's height
	 * @private
	 * @param {Number} direction
	 */
	_setAdaptiveHeight(direction) {
		const conf = this._conf;
		const indexToMove = conf.indexToMove;
		let $children;
		let height;

		const $panel = indexToMove === 0 ?

			// panel moved by 1
			this[`get${
				(direction === Axes.DIRECTION_LEFT && "Next") ||
				(direction === Axes.DIRECTION_RIGHT && "Prev") || ""
			}Element`]() :

			// panel moved by .moveTo()
			conf.panel.$list[
				conf.panel.currIndex + indexToMove
			];

		const $first = $panel.querySelector(":first-child");

		if ($first) {
			height = $first.getAttribute(consts.DATA_HEIGHT);

			if (!height) {
				$children = $panel.children;

				height = utils.outerHeight(
					$children.length > 1 ? ($panel.style.height = "auto", $panel) : $first
				);

				height > 0 && $first.setAttribute(consts.DATA_HEIGHT, height);
			}

			height > 0 && (this.$wrapper.style.height = `${height}px`);
		}
	}

	/**
	 * Trigger beforeRestore event
	 * @private
	 * @param {Object} e event object
	 */
	_triggerBeforeRestore(e) {
		const conf = this._conf;
		const touch = conf.touch;

		// reverse direction value when restore
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
		conf.customEvent.restore = this._triggerEvent(consts.EVENTS.beforeRestore, {
			depaPos: e.depaPos.flick,
			destPos: e.destPos.flick
		});

		if (!conf.customEvent.restore) {
			"stop" in e && e.stop();
			conf.panel.animating = false;
		}
	}

	/**
	 * Trigger restore event
	 * @private
	 */
	_triggerRestore() {
		const customEvent = this._conf.customEvent;

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
		customEvent.restore && this._triggerEvent(consts.EVENTS.restore);
		customEvent.restore = customEvent.restoreCall = false;
	}

	/**
	 * Set value when panel changes
	 * @private
	 * @param {String} phase - [start|end]
	 * @param {Object} pos
	 */
	_setPhaseValue(phase, pos) {
		const conf = this._conf;
		const options = this.options;
		const panel = conf.panel;

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
			panel.changed && this._triggerEvent(consts.EVENTS.flickEnd);
		}

		this._adjustContainerCss(phase);
		return true;
	}

	/**
	 * Get positive or negative according direction
	 * @private
	 */
	_getNumByDirection() {
		const conf = this._conf;

		return conf.touch.direction === conf.dirData[0] ? 1 : -1;
	}

	/**
	 * Revert panel number
	 * @private
	 */
	_revertPanelNo() {
		const panel = this._conf.panel;
		const num = this._getNumByDirection();

		const index = panel.currIndex >= 0 ? panel.currIndex : panel.index - num;
		const no = panel.currNo >= 0 ? panel.currNo : panel.no - num;

		this._setPanelNo({
			index,
			no
		});
	}

	/**
	 * Set the panel number
	 * @private
	 * @param {Object} obj number object
	 */
	_setPanelNo(obj) {
		const panel = this._conf.panel;
		const count = panel.origCount - 1;
		const num = this._getNumByDirection();

		if (utils.isObject(obj)) {
			for (const key in obj) {
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
	}

	/**
	 * Set pointerEvents css property on container element due to the iOS click bug
	 * @private
	 * @param {Event} e
	 */
	_setPointerEvents(e) {
		const pointer = utils.css(this.$container, "pointerEvents");
		let val;

		if (e && e.holding &&
			e.inputEvent && e.inputEvent.preventSystemEvent &&
			pointer !== "none"
		) {
			val = "none";
		} else if (!e && pointer !== "auto") {
			val = "auto";
		}

		val && utils.css(this.$container, {pointerEvents: val});
	}

	/**
	 * Get coordinate value with unit
	 * @private
	 * @param coordsValue {Array} x,y numeric value
	 * @return {Object} x,y coordinate value with unit
	 */
	_getCoordsValue(coordsValue) {
		// the param comes as [ val, 0 ], whatever the direction. So reorder the value depend the direction.
		const coords = this._getDataByDirection(coordsValue);

		return {
			x: utils.getUnitValue(coords[0]),
			y: utils.getUnitValue(coords[1])
		};
	}

	/**
	 * Set translate property value
	 * @private
	 * @param {Array} coordsValue coordinate x,y value
	 */
	_setTranslate(coordsValue) {
		const coords = this._getCoordsValue(coordsValue);

		this._setMoveStyle(this.$container, [coords.x, coords.y]);
	}

	/**
	 * Check if panel passed through threshold pixel
	 * @private
	 */
	_isMovable() {
		const options = this.options;
		const axesInst = this._axesInst;
		const isMovable = Math.abs(this._conf.touch.distance) >= options.threshold;
		let max;
		let currPos;

		if (!options.circular && isMovable) {
			max = axesInst.axis.flick.range[1];
			currPos = axesInst.get().flick;

			// if current position out of range
			if (currPos < 0 || currPos > max) {
				return false;
			}
		}

		return isMovable;
	}

	/**
	 * Trigger custom events
	 * @private
	 * @param {String} name - event name
	 * @param {Object} param - additional event value
	 * @return {Boolean}
	 */
	_triggerEvent(name, param) {
		const conf = this._conf;
		const panel = conf.panel;

		// pass changed panel no only on 'flickEnd' event
		if (name === consts.EVENTS.flickEnd) {
			panel.currNo = panel.no;
			panel.currIndex = panel.index;
		}

		return this.trigger(conf.eventPrefix + name, utils.extend({
			eventType: name,
			no: panel.currNo,
			direction: conf.touch.direction,
			isTrusted: conf.touch.isTrusted
		}, param));
	}

	/**
	 * Get next/prev panel element/index.
	 * @private
	 * @param {Boolean} direction
	 * @param {Boolean} element - true:to get element, false:to get index
	 * @param {Number} physical - true : physical, false : logical (@deprecated since 2.2.0)
	 * @return {HTMLElement|Number}
	 */
	_getElement(direction, element, physical) {
		const panel = this._conf.panel;
		const circular = this.options.circular;
		const pos = panel.currIndex;
		const next = direction === this._conf.dirData[0];
		let result = null;
		let total;
		let index;

		if (physical) {
			total = panel.count;
			index = pos;
		} else {
			total = panel.origCount;
			index = panel.currNo;
		}

		const currentIndex = index;

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
	}

	/**
	 * Set value to force move panels when duration is 0
	 * @private
	 * @param {Boolean} next
	 */
	_setValueToMove(next) {
		const conf = this._conf;

		conf.touch.distance = this.options.threshold + 1;
		conf.touch.direction = conf.dirData[+!next];
	}

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
	getIndex(physical) {
		return this._conf.panel[physical ? "currIndex" : "currNo"];
	}

	/**
	 * Returns the reference of the current panel element.
	 * @ko 현재 패널 요소의 레퍼런스를 반환한다.
	 * @method eg.Flicking#getElement
	 * @return {HTMLElement} Current panel element.<ko>현재 패널 요소.</ko>
	 * @see eg.Flicking#getPrevElement
	 * @see eg.Flicking#getNextElement
	 */
	getElement() {
		const panel = this._conf.panel;

		return panel.$list[panel.currIndex];
	}

	/**
	 * Returns the reference of the next panel element.
	 * @ko 다음 패널 요소의 레퍼런스를 반환한다.
	 * @method eg.Flicking#getNextElement
	 * @return {HTMLElement|null} Next panel element or `null` if it does not exist.<ko>다음 패널 요소. 패널이 없으면 `null`을 반환한다.</ko>
	 * @see eg.Flicking#getElement
	 * @see eg.Flicking#getPrevElement
	 */
	getNextElement() {
		return this._getElement(this._conf.dirData[0], true);
	}

	/**
	 * Returns the index number of the next panel element.
	 * @ko 다음 패널 요소의 인덱스 번호를 반환한다.
	 * @method eg.Flicking#getNextIndex
	 * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers<br>- true (Physical): Plus one of [getIndex()]{@link eg.Flicking#getIndex} return value.<br>- false (Logical): The value of how the content(innerHTML) of the next panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류.<br>- true (물리적): [getIndex()]{@link eg.Flicking#getIndex} 반환값에 1을 더한 값.<br>- false (논리적): 다음 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
	 * @return {Number|null} Index number of the next panel element or null if it does not exist. A zero-based integer.<ko>다음 패널 요소의 인덱스 번호. 0부터 시작하는 정수. 패널이 없으면 `null`을 반환한다.</ko>
	 * @see eg.Flicking#getIndex
	 * @see eg.Flicking#getPrevIndex
	 */
	getNextIndex(physical) {
		return this._getElement(this._conf.dirData[0], false, physical);
	}

	/**
	 * Returns a reference to all panel elements.
	 * @ko 모든 패널 요소의 레퍼런스를 반환한다.
	 * @method eg.Flicking#getAllElements
	 * @return {HTMLElement[]} Whole panel elements.<ko>모든 패널 요소.</ko>
	 */
	getAllElements() {
		return this._conf.panel.$list;
	}

	/**
	 * Returns the reference of the previous panel element.
	 * @ko 이전 패널 요소의 레퍼런스를 반환한다.
	 * @method eg.Flicking#getPrevElement
	 * @return {HTMLElement|null} Previous panel element or `null` if it does not exist.<ko>이전 패널 요소. 패널이 없으면 `null`을 반환한다.</ko>
	 * @see eg.Flicking#getElement
	 * @see eg.Flicking#getNextElement
	 */
	getPrevElement() {
		return this._getElement(this._conf.dirData[1], true);
	}

	/**
	 * Returns the index number of the previous panel element.
	 * @ko 이전 패널 요소의 인덱스 번호를 반환한다.
	 * @method eg.Flicking#getPrevIndex
	 * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers<br>- true (Physical): Minus one of [getIndex()]{@link eg.Flicking#getIndex} return value.<br>- false (Logical): The value of how the content(innerHTML) of the current panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류<br>- true (물리적): [getIndex()]{@link eg.Flicking#getIndex} 반환값에 1을 뺀 값.<br>- false (논리적): 이전 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
	 * @return {Number|null} Previous element index value or null if no more element exist. A zero-based integer.<ko>이전 패널 요소의 인덱스 번호. 0부터 시작하는 정수. 패널이 없는 경우는 `null`.</ko>
	 * @see eg.Flicking#getIndex
	 * @see eg.Flicking#getNextIndex
	 */
	getPrevIndex(physical) {
		return this._getElement(this._conf.dirData[1], false, physical);
	}

	/**
	 * Checks whether the animated panel is playing.
	 * @ko 패널 이동 애니메이션이 진행 중인지 확인한다.
	 * @method eg.Flicking#isPlaying
	 * @return {Boolean} Indicates whether the animated panel is playing <ko>패널 이동 애니메이션 진행 중 여부</ko>
	 */
	isPlaying() {
		return this._conf.panel.animating;
	}

	/**
	 * Move panel to the given direction
	 * @private
	 * @param {Boolean} next
	 * @param {Number} duration
	 */
	_movePanel(next, duration) {
		const conf = this._conf;
		const panel = conf.panel;
		const options = this.options;

		if (panel.animating || conf.touch.holding) {
			return undefined;
		}

		this._setValueToMove(next);

		if (options.circular ||
			this[`get${next ? "Next" : "Prev"}Index`]() !== null
		) {
			this._movePanelByPhase("setBy", panel.size * (next ? 1 : -1), duration);
		}

		return this;
	}

	/**
	 * Move panel applying start/end phase value
	 * @private
	 * @param {String} method Axes' method name
	 * @param {Number} to destination value
	 * @param {Number} durationValue duration value
	 */
	_movePanelByPhase(method, to, durationValue) {
		const duration = utils.getNumValue(durationValue, this.options.duration);

		if (this._setPhaseValue("start") !== false) {
			this._setAxes(method, to, duration);
			!duration && this._setPhaseValue("end");
		}
	}

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
	next(duration) {
		return this._movePanel(true, duration);
	}

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
	prev(duration) {
		return this._movePanel(false, duration);
	}

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
	moveTo(noValue, duration) {
		const conf = this._conf;
		const panel = conf.panel;
		const circular = this.options.circular;
		const currentIndex = panel.index;
		let indexToMove;
		let isPositive;
		let no = noValue;

		no = utils.getNumValue(no, -1);

		if (no < 0 || no >= panel.origCount || no === panel.no ||
			panel.animating || conf.touch.holding) {
			return this;
		}

		indexToMove = no - (circular ? panel.no : currentIndex);
		isPositive = indexToMove > 0;

		// check for real panel count which can be moved on each sides in circular mode
		if (circular &&
			Math.abs(indexToMove) >
			(isPositive ? panel.count - (currentIndex + 1) : currentIndex)) {
			indexToMove += (isPositive ? -1 : 1) * panel.count;
			isPositive = indexToMove > 0;
		}

		this._setPanelNo(circular ? {no} : {no, index: no});
		this._conf.indexToMove = indexToMove;
		this._setValueToMove(isPositive);

		this._movePanelByPhase(
			circular ? "setBy" : "setTo",
			panel.size * (circular ? indexToMove : no),
			duration
		);

		return this;
	}

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
	resize() {
		const conf = this._conf;
		const options = this.options;
		const panel = conf.panel;
		const horizontal = options.horizontal;
		let panelSize;

		if (!this.isPlaying()) {
			if (utils.isArray(options.previewPadding) && typeof +options.previewPadding.join("") === "number") {
				this._setPadding(options.previewPadding.concat());
				panelSize = panel.size;
			} else if (horizontal) {
				panelSize = panel.size = utils.css(this.$wrapper, "width", true);
			}

			const max = panelSize * (panel.count - 1);
			const maxCoords = this._getDataByDirection([max, 0]);

			// resize elements
			horizontal && utils.css(this.$container, {width: `${maxCoords[0] + panelSize}px`});
			utils.css(panel.$list, {
				[horizontal ? "width" : "height"]: utils.getUnitValue(panelSize)
			});

			// remove data-height attribute and re-evaluate panel's height
			if (options.adaptiveHeight) {
				const $panel = this.$container.querySelectorAll(`[${consts.DATA_HEIGHT}]`);

				if ($panel.length) {
					[].slice.call($panel)
						.forEach(v => v.removeAttribute(consts.DATA_HEIGHT));

					this._setAdaptiveHeight();
				}
			}

			this._axesInst.axis.flick.range = [0, max];
			this._setAxes("setTo", panelSize * panel.index, 0);

			if (consts.IS_ANDROID2) {
				this._applyPanelsPos();
				this._adjustContainerCss("end");
			}
		}

		return this;
	}

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
	restore(durationValue) {
		const conf = this._conf;
		const panel = conf.panel;
		const currPos = this._axesInst.get().flick;
		let duration = durationValue;
		let destPos;

		// check if the panel isn't in right position
		if (currPos !== panel.currIndex * panel.size) {
			conf.customEvent.restoreCall = true;
			duration = utils.getNumValue(duration, this.options.duration);

			this._revertPanelNo();
			destPos = panel.size * panel.index;

			this._triggerBeforeRestore({depaPos: currPos, destPos});
			this._setAxes("setTo", destPos, duration);

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
	}

	/**
	 * The input from the input device is not blocked so that the panel can be moved by the input device.
	 * @ko 막았던 입력 장치로부터의 입력을 푼다.
	 * @method eg.Flicking#enableInput
	 * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 * @see eg.Flicking#disableInput
	 */
	enableInput() {
		this._panInput.enable();
		return this;
	}

	/**
	 * The input from the input device is blocked so that the panel is not moved by the input device.
	 * @ko 패널이 입력 장치에 의해 움직이지 않도록 입력 장치로부터의 입력을 막는다.
	 * @method eg.Flicking#disableInput
	 * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 * @see eg.Flicking#enableInput
	 */
	disableInput() {
		this._panInput.disable();
		return this;
	}

	/**
	 * Get current flicking status. If the returned value is specified as a [setStatus()]{@link eg.Flicking#setStatus} method argument, it can be returned to its value state.
	 * @ko 현재 상태 값을 반환한다. 반환받은 값을 [setStatus()]{@link eg.Flicking#setStatus} 메서드 인자로 지정하면 그 값 상태로 되돌릴 수 있다.
	 * @method eg.Flicking#getStatus
	 * @param {Boolean} [stringify] Set true if want get stringified status value.<ko>true 지정시 json문자열 형태로 반환한다.</ko>
	 * @return {Status|String} An object with current state value information.<ko>현재 상태값 정보를 가진 객체.</ko>
	 * @see eg.Flicking#setStatus
	 * @example
	 * const flick = new eg.Flicking("flick");
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
	getStatus(stringify) {
		const panel = this._conf.panel;
		const rxStyle = /((?:-webkit-)?transform|left|top|will-change|box-sizing|width):[^;]*;/g;
		const status = {
			// current panel position
			panel: {
				index: panel.index,
				no: panel.no,
				currIndex: panel.currIndex,
				currNo: panel.currNo
			},

			// panel's html
			$list: panel.$list.map(v => ({
				style: v.style.cssText.replace(rxStyle, "").trim(),
				className: v.className,
				html: v.innerHTML
			}))
		};

		return stringify ?
			JSON.stringify(status) : status;
	}

	/**
	 * Restore to the state of the `statusValue`.
	 * @ko `statusValue`의 상태로 복원한다.
	 * @method eg.Flicking#setStatus
	 * @param {Status|String} statusValue Status value to be restored. You can specify the return value of the [getStatus()]{@link eg.Flicking#getStatus} method.<ko>복원할 상태 값. [getStatus()]{@link eg.Flicking#getStatus}메서드 반환값을 지정하면 된다.</ko>
	 * @see eg.Flicking#getStatus
	 * @example
	 * const flick = new eg.Flicking("flick");
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
	setStatus(statusValue) {
		const panel = this._conf.panel;
		const isAdaptiveHeight = this.options.adaptiveHeight;
		const status = typeof statusValue === "string" ?
			JSON.parse(statusValue) : statusValue;

		if (status) {
			for (const x in status.panel) {
				x in panel && (panel[x] = status.panel[x]);
			}

			panel.$list.forEach((v, i) => {
				const data = status.$list[i];
				const style = data.style;
				const className = data.className;
				const html = data.html;

				style && (v.style.cssText += style);
				className && (v.className = className);
				html && (v.innerHTML = html);
			});

			isAdaptiveHeight && this._setAdaptiveHeight();
		}
	}

	/**
	 * Returns the reference element and its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).
	 * @ko 기준 요소와 그 하위 요소를 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.
	 * @method eg.Flicking#destroy
	 * @example
	 * const flick = new eg.Flicking("flick");
	 * flick.destroy();
	 * console.log(flick.moveTo); // null
	 */
	destroy() {
		const conf = this._conf;
		const origPanelStyle = conf.origPanelStyle;
		const wrapper = origPanelStyle.wrapper;
		const container = origPanelStyle.container;
		const list = origPanelStyle.list;

		// unwrap container element and restore original inline style
		// restore wrapper style
		const $wrapper = this.$wrapper;

		$wrapper.setAttribute("class", wrapper.className);
		$wrapper[wrapper.style ? "setAttribute" : "removeAttribute"]("style", wrapper.style);

		// restore container style
		const $container = this.$container;
		const $children = []
			.slice.call($container.children);

		if (origPanelStyle.container.className) {
			$container.setAttribute("class", container.className);
			$container[container.style ? "setAttribute" : "removeAttribute"]("style", container.style);
		} else {
			$children.forEach(v => $wrapper.appendChild(v));
			$container.parentNode.removeChild($container);
		}

		for (let i = 0, $el; ($el = $children[i]); i++) {
			if (i > list.length - 1) {
				$el.parentNode.removeChild($el);
			} else {
				const className = list[i].className;
				const style = list[i].style;

				$el[className ? "setAttribute" : "removeAttribute"]("class", className);
				$el[style ? "setAttribute" : "removeAttribute"]("style", style);
			}
		}

		// unbind events
		this._bindEvents(false);
		this.off();

		// destroy eg.Axes instance
		this._axesInst.destroy();
		this._panInput.destroy();

		// release resources
		for (const x in this) {
			this[x] = null;
		}
	}

	/**
	 * Constant value for none direction.
	 * @ko none 방향에 대한 상수 값.
	 * @name DIRECTION_NONE
	 * @memberof eg.Flicking
	 * @static
	 * @constant
	 * @type {Number}
	 * @default 1
	 */
	static DIRECTION_NONE = Axes.DIRECTION_NONE;

	/**
	 * Constant value for left direction.
	 * @ko left 방향에 대한 상수 값.
	 * @name DIRECTION_LEFT
	 * @memberof eg.Flicking
	 * @static
	 * @constant
	 * @type {Number}
	 * @default 2
	 */
	static DIRECTION_LEFT = Axes.DIRECTION_LEFT;

	/**
	 * Constant value for right direction.
	 * @ko right 방향에 대한 상수 값.
	 * @name DIRECTION_RIGHT
	 * @memberof eg.Flicking
	 * @static
	 * @constant
	 * @type {Number}
	 * @default 4
	 */
	static DIRECTION_RIGHT = Axes.DIRECTION_RIGHT;

	/**
	 * Constant value for up direction.
	 * @ko up 방향에 대한 상수 값.
	 * @name DIRECTION_UP
	 * @memberof eg.Flicking
	 * @static
	 * @constant
	 * @type {Number}
	 * @default 8
	 */
	static DIRECTION_UP = Axes.DIRECTION_UP;

	/**
	 * Constant value for down direction.
	 * @ko down 방향에 대한 상수 값.
	 * @name DIRECTION_DOWN
	 * @memberof eg.Flicking
	 * @static
	 * @constant
	 * @type {Number}
	 * @default 16
	 */
	static DIRECTION_DOWN = Axes.DIRECTION_DOWN;

	/**
	 * Constant value for horizontal direction.
	 * @ko horizontal 방향에 대한 상수 값.
	 * @name DIRECTION_HORIZONTAL
	 * @memberof eg.Flicking
	 * @static
	 * @constant
	 * @type {Number}
	 * @default 6
	 */
	static DIRECTION_HORIZONTAL = Axes.DIRECTION_HORIZONTAL;

	/**
	 * Constant value for vertical direction.
	 * @ko vertical 방향에 대한 상수 값.
	 * @name DIRECTION_VERTICAL
	 * @memberof eg.Flicking
	 * @static
	 * @constant
	 * @type {Number}
	 * @default 24
	 */
	static DIRECTION_VERTICAL = Axes.DIRECTION_VERTICAL;

	/**
	 * Constant value for all direction.
	 * @ko all 방향에 대한 상수 값.
	 * @name DIRECTION_ALL
	 * @memberof eg.Flicking
	 * @static
	 * @constant
	 * @type {Number}
	 * @default 30
	 */
	static DIRECTION_ALL = Axes.DIRECTION_ALL;
}
