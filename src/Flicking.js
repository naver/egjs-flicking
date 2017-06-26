/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import MovableCoord from "@egjs/movablecoord";
import {utils, Mixin} from "./utils";
import * as consts from "./consts";
import {CONFIG, OPTIONS} from "./config";
import {document} from "./browser";
import eventHandler from "./eventHandler";

/**
 * A module used to implement flicking interactions. With this module, you can make flicking gestures, which are ways to navigate left and right to move between panels arranged side by side.
 * @ko 플리킹 UI를 구현하는 모듈. 나란히 배치한 패널을 쓸어 넘겨 다음 패널이나 이전 패널로 이동하는 플리킹 UI를 만들 수 있다.
 * @alias eg.Flicking
 * @extends eg.Component
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
export default class Flicking extends Mixin(Component).with(eventHandler) {
	/**
	 * Constructor
	 * @param {HTMLElement|String|jQuery} element A base element for the eg.Flicking module <ko>eg.Flicking 모듈을 사용할 기준 엘리먼트</ko>
	* @param {Object} options The option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
	* @param {Boolean} [options.hwAccelerable=eg.isHWAccelerable()] Force hardware compositing <ko>하드웨어 가속 사용 여부</ko>
	* @param {String} [options.prefix=eg-flick] A prefix for class names of the panel elements <ko>패널 엘리먼트의 클래스 이름에 설정할 접두사</ko>
	* @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
	* @param {Boolean} [options.horizontal=true] Direction of the panel movement (true: horizontal, false: vertical) <ko>패널 이동 방향 (true 가로방향, false 세로방향)</ko>
	* @param {Boolean} [options.circular=false] Indicates whether a circular panel is available <ko>패널 순환 여부</ko>
	* @param {Number|Array} [options.previewPadding=[0,0]] The preview size for the previous or next panel. If direction is set to "horizontal", the preview section will be displayed on the left and right of the panel. If direction is set to "vertical", it will be displayed on the top and bottom of the panel <ko>이전 패널과 다음 패널을 미리 보는 영역의 크기. 패널 이동 방향이 가로 방향이면 패널 왼쪽과 오른쪽에 미리 보는 영역이 나타난다. 패널 이동 방향이 세로 방향이면 패널 위쪽과 아래쪽에 미리 보는 영역이 나타난다</ko>
	* @param {Number|Array} [options.bounce=[10,10]] −	The size of bouncing area. If a panel is set to "non-circulable", the start and end panels can exceed the base element area and move further as much as the bouncing area. If a panel is dragged to the bouncing area and then dropped, the panel where bouncing effects are applied is retuned back into the base element area. <ko>바운스 영역의 크기. 패널이 순환하지 않도록 설정됐다면 시작 패널과 마지막 패널은 기준 엘리먼트 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 패널을 바운스 영역까지 끌었다가 놓으면, 바운스 효과가 적용된 패널이 다시 기준 엘리먼트 영역 안으로 들어온다</ko>
	* @param {Number} [options.threshold=40] Distance threshold. If the drag exceeds the threshold value, it will be changed to the next panel <ko>다음 패널로 바뀌는 기준 이동 거리. 패널을 기준 이동 거리 이상 끌었다 놓으면 패널이 다음 패널로 바뀐다</ko>
	* @param {Number} [options.duration=100] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
	* @param {Function} [options.panelEffect=easeOutCubic] The easing function to apply to a panel moving animation <ko>패널 이동 애니메이션에 적용할 easing 함수</ko>
	* @param {Number} [options.defaultIndex=0] The index number of a panel to be selected upon module initialization <ko>모듈이 초기화될 때 선택할 패널의 인덱스 번호</ko>
	* @param {Array} [options.inputType] Types of input devices.<br>- touch: A touch screen can be used to move a panel.<br>- mouse: A mouse can be used to move a panel. <ko>입력 장치 종류.<br>- touch: 터치 입력 장치로 패널을 이동할 수 있다.<br>- mouse: 마우스로 패널을 이동할 수 있다.</ko>
	* @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
	* @param {Boolean} [options.adaptiveHeight=false] Set container's height be adaptive according panel's height.<br>(Note: on Android 4.1.x stock browser, has rendering bug which not correctly render height value on panel with single node. To avoid just append another empty node at the end.)<ko>컨테이너 영역이 패널의 높이값에 따라 변경될지 여부<br>(참고: Android 4.1.x 스톡 브라우저에서 단일 노드로 구성된 패널의 높이값 변경이 제대로 렌더링 되지 않는 버그가 있음. 비어있는 노드를 추가하면 해결이 가능하다.)</ko>
	*
 * @see Easing Functions Cheat Sheet {@link http://easings.net/}
 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}). <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@link https://jqueryui.com/easing})를 사용한다</ko>
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

			if (typeof(val) === "number") {
				val = [val, val];
			} else if (!utils.isArray(val)) {
				val = arrVal[key];
			}

			this.options[key] = val;
		}
	}

	/**
	 * Set config values
	 * @param {HTMLCollection} $children wrappers' children elements
	 * @param {String} _prefix event prefix
	 * @return {HTMLElement}
	 */
	_setConfig($children, _prefix) {
		const options = this.options;
		const padding = options.previewPadding;
		let $nodes = $children;

		if ($nodes[0].classList.contains(`${options.prefix}-container`)) {
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
			.forEach(v => conf.dirData.push(MovableCoord[`DIRECTION_${v}`]));
	}

	/**
	 * Build and set panel nodes to make flicking structure
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
			v.classList.add(`${prefix}-panel`);

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

		// create MovableCoord instance
		this._mcInst = new MovableCoord({
			min: [0, 0],
			max: this._getDataByDirection([panel.size * (panelCount - 1), 0]),
			margin: 0,
			circular: false,
			easing: options.panelEffect,
			deceleration: options.deceleration,
			bounce: this._getDataByDirection([0, bounce[1], 0, bounce[0]])
		});

		this._setDefaultPanel(options.defaultIndex);
	}

	/**
	 * Set preview padding value
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

		panel.size = utils.getNumValue(wrapperStyle[horizontal ? "width" : "height"]) - (
				utils.getNumValue(wrapperStyle[`padding${paddingType[0]}`]) +
				utils.getNumValue(wrapperStyle[`padding${paddingType[1]}`])
			);
	}

	/**
	 * To fulfill minimum panel count cloning original node when circular or previewPadding option are set
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
			this._setMovableCoord("setTo", [
				Math.abs(coords[0]), Math.abs(coords[1])
			], true, 0);
		}
	}

	/**
	 * Arrange panels' position
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

			// arrange MovableCoord's coord position
			conf.customEvent.flick = !!this._setMovableCoord("setTo", [
				panel.size * panel.index, 0
			], true, 0);
		}

		this._applyPanelsPos();
	}

	/**
	 * Set each panel's position in DOM
	 */
	_applyPanelsPos() {
		this._conf.panel.$list.forEach(this._applyPanelsCss.bind(this));
	}

	/**
	 * Set CSS style values to move elements
	 *
	 * Initialize setting up checking if browser support transform css property.
	 * If browser doesn't support transform, then use left/top properties instead.
	 * @param {HTMLElement} $element
	 * @param {Array} coords
	 */
	_setMoveStyle($el, coordsValue) {
		this._setMoveStyle = consts.SUPPORT_TRANSFORM ?
			function moveStyle($element, coords) {
				utils.css($element, {
					transform: utils.translate(coords[0], coords[1], this._conf.useLayerHack)
				});
			} : ($element, coords) => {
				utils.css($element, {left: coords[0], top: coords[1]});
			};

		this._setMoveStyle($el, coordsValue);
	}

	/**
	 * Callback function for applying CSS values to each panels
	 *
	 * Need to be initialized before use, to set up for Android 2.x browsers or others.
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
				const coords = this._getDataByDirection([
					`${this._conf.panel.size * i}px`, 0
				]);

				utils.css(v, {
					left: coords[0],
					top: coords[1]
				});
			};
		} else {
			this._applyPanelsCss = function applyCss(v, i) {
				const coords = this._getDataByDirection([
					consts.SUPPORT_TRANSFORM ?
						`${100 * i}%` :
						`${this._conf.panel.size * i}px`, 0
				]);

				this._setMoveStyle(v, coords);
			};
		}
	}

	/**
	 * Adjust container's css value to handle Android 2.x link highlighting bug
	 *
	 * @param {String} phase
	 *    start - set left/top value to 0
	 *    end - set translate value to 0
	 * @param {Array} coordValue coordinate value
	 */
	_adjustContainerCss(phase, coordValue) {
		const conf = this._conf;
		const panel = conf.panel;
		const options = this.options;
		const horizontal = options.horizontal;
		const paddingTop = options.previewPadding[0];
		let container = this.$container;
		let coords = coordValue;
		let value;

		if (consts.IS_ANDROID2) {
			if (!coords) {
				coords = [-panel.size * panel.index, 0];
			}

			if (phase === "start") {
				container = container.style;
				value = parseInt(container[horizontal ? "left" : "top"], 10);

				if (horizontal) {
					value && (container.left = "0px");
				} else {
					value !== paddingTop && (container.top = "0px");
				}

				this._setTranslate([-coords[+!options.horizontal], 0]);
			} else if (phase === "end") {
				coords = this._getCoordsValue(coords);

				utils.css(container, {
					left: coords.x,
					top: coords.y,
					transform: utils.translate(0, 0, conf.useLayerHack)
				});

				conf.$dummyAnchor.focus();
			}
		}
	}

	/**
	 * Set MovableCoord coord value
	 * @param {String} method
	 * @param {Array} coordValue
	 * @param {Boolean} isDirVal
	 * @param {Number} duration
	 * @return {eg.MovableCoord} MovableCoord instance
	 */
	_setMovableCoord(method, coordValue, isDirVal, duration) {
		let coord = coordValue;

		if (isDirVal) {
			coord = this._getDataByDirection(coord);
		}

		return this._mcInst[method](coord[0], coord[1], duration);
	}

	/**
	 * Set hint for browser to decide efficient way of doing transform changes(or animation)
	 * https://dev.opera.com/articles/css-will-change-property/
	 */
	_setHint() {
		const style = {willChange: "transform"};

		utils.css(this.$container, style);
		utils.css(this._conf.panel.$list, style);
	}

	/**
	 * Get data according options.horizontal value
	 *
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
	 * @param {Boolean} direction
	 * @param {Number} indexToMove
	 */
	_arrangePanelPosition(direction, indexToMove) {
		const next = direction === this._conf.dirData[0];

		this._movePanelPosition(Math.abs(indexToMove || 1), next);
	}

	/**
	 * Get the base position index of the panel
	 */
	_getBasePositionIndex() {
		return Math.floor(this._conf.panel.count / 2 - 0.1);
	}

	/**
	 * Bind events
	 * @param {Boolean} bind
	 */
	_bindEvents(bind) {
		const options = this.options;
		const $wrapper = this.$wrapper;
		const mcInst = this._mcInst;

		if (bind) {
			mcInst.bind($wrapper, {
				scale: this._getDataByDirection([-1, 0]),
				direction: MovableCoord[`DIRECTION_${options.horizontal ? "HORIZONTAL" : "VERTICAL"}`],
				interruptable: false,
				inputType: options.inputType,
				thresholdAngle: options.thresholdAngle
			}).on({
				hold: this._holdHandler.bind(this),
				change: this._changeHandler.bind(this),
				release: this._releaseHandler.bind(this),
				animationStart: this._animationStartHandler.bind(this),
				animationEnd: this._animationEndHandler.bind(this)
			});
		} else {
			mcInst.unbind($wrapper).off();
		}
	}

	/**
	 * Set container's height value according to children's height
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
				(direction === MovableCoord.DIRECTION_LEFT && "Next") ||
				(direction === MovableCoord.DIRECTION_RIGHT && "Prev") || ""
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
	 * @param {Object} e event object
	 */
	_triggerBeforeRestore(e) {
		const conf = this._conf;
		const touch = conf.touch;

		// reverse direction value when restore
		touch.direction = ~~conf.dirData.join("").replace(touch.direction, "");

		/**
		 * This event is fired before an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached
		 * @ko 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원되기 전에 발생하는 이벤트
		 * @name eg.Flicking#beforeRestore
		 * @event
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {String} param.eventType The name of the event <ko>이름명</ko>
		 * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다. (@deprecated since 1.3.0)</ko>
		 * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
		 * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
		 * @param {Array} param.depaPos Start coordinate <ko>출발점 좌표</ko>
		 * @param {Number} param.depaPos.0 x-coordinate <ko>x 좌표</ko>
		 * @param {Number} param.depaPos.1 y-coordinate <ko>y 좌표</ko>
		 * @param {Array} param.destPos End coordinate <ko>도착점 좌표</ko>
		 * @param {Number} param.destPos.0 x-coordinate <ko>x 좌표</ko>
		 * @param {Number} param.destPos.1 y-coordinate <ko>y 좌표</ko>
		 */
		conf.customEvent.restore = this._triggerEvent(consts.EVENTS.beforeRestore, {
			depaPos: e.depaPos,
			destPos: e.destPos
		});

		if (!conf.customEvent.restore) {
			"stop" in e && e.stop();
			conf.panel.animating = false;
		}
	}

	/**
	 * Trigger restore event
	 */
	_triggerRestore() {
		const customEvent = this._conf.customEvent;

		/**
		 * This event is fired after an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached.
		 * @ko 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원된 다음 발생하는 이벤트
		 * @name eg.Flicking#restore
		 * @event
		 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
		 * @param {String} param.eventType The name of the event <ko>이름명</ko>
		 * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM(@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
		 * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
		 * @param {Number} param.direction Direction of the panel move (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
		 */
		customEvent.restore && this._triggerEvent(consts.EVENTS.restore);
		customEvent.restoreCall = false;
	}

	/**
	 * Set value when panel changes
	 * @param {String} phase - [start|end]
	 * @param {Object} pos
	 */
	_setPhaseValue(phase, pos) {
		const conf = this._conf;
		const options = this.options;
		const panel = conf.panel;

		if (phase === "start" && (panel.changed = this._isMovable())) {
			/**
			 * This event is fired before flicking starts
			 * @ko 플리킹이 시작하기 전에 발생하는 이벤트
			 * @name eg.Flicking#beforeFlickStart
			 * @event
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {String} param.eventType The name of the event <ko>이름명</ko>
			 * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
			 * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
			 * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>−	이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
			 * @param {Array} param.depaPos Start coordinate <ko>출발점 좌표</ko>
			 * @param {Number} param.depaPos.0 x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.depaPos.1 y-coordinate <ko>y 좌표</ko>
			 * @param {Array} param.destPos End coordinate <ko>도착점 좌표</ko>
			 * @param {Number} param.destPos.0 x-coordinate <ko>x 좌표</ko>
			 * @param {Number} param.destPos.1 y-coordinate <ko>y 좌표</ko>
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
			 * This event is fired after panel moves.
			 * @ko 패널이 이동한 다음 발생하는 이벤트
			 * @name eg.Flicking#flickEnd
			 * @event
			 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
			 * @param {String} param.eventType The name of the event <ko>이름명</ko>
			 * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
			 * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
			 * @param {Number} param.direction Direction of the movemen (see eg.MovableCoord.DIRECTION_* constant) <ko>−	이동 방향(eg.MovableCoord.DIRECTION_* constant 참고</ko>
			 */
			panel.changed && this._triggerEvent(consts.EVENTS.flickEnd);
		}

		this._adjustContainerCss(phase);
		return true;
	}

	/**
	 * Get positive or negative according direction
	 */
	_getNumByDirection() {
		const conf = this._conf;

		return conf.touch.direction === conf.dirData[0] ? 1 : -1;
	}

	/**
	 * Revert panel number
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
	 * @param {Event} e
	 */
	_setPointerEvents(e) {
		const pointer = utils.css(this.$container, "pointerEvents");
		let val;

		if (e && e.holding &&
			e.hammerEvent && e.hammerEvent.preventSystemEvent &&
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
	 * @param coords {Array} x,y numeric value
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
	 * @param {Array} coords coordinate x,y value
	 */
	_setTranslate(coordsValue) {
		const coords = this._getCoordsValue(coordsValue);

		this._setMoveStyle(this.$container, [coords.x, coords.y]);
	}

	/**
	 * Check if panel passed through threshold pixel
	 */
	_isMovable() {
		const options = this.options;
		const mcInst = this._mcInst;
		const isMovable = Math.abs(this._conf.touch.distance) >= options.threshold;
		let max;
		let currPos;

		if (!options.circular && isMovable) {
			max = this._getDataByDirection(mcInst.options.max)[0];
			currPos = this._getDataByDirection(mcInst.get())[0];

			// if current position out of range
			if (currPos < 0 || currPos > max) {
				return false;
			}
		}

		return isMovable;
	}

	/**
	 * Trigger custom events
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
			index: panel.currIndex,
			no: panel.currNo,
			direction: conf.touch.direction
		}, param));
	}

	/**
	 * Get next/prev panel element/index.
	 * @param {Boolean} direction
	 * @param {Boolean} element - true:to get element, false:to get index
	 * @param {Number} physical - true : physical, false : logical
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
	 * @param {Boolean} next
	 */
	_setValueToMove(next) {
		const conf = this._conf;

		conf.touch.distance = this.options.threshold + 1;
		conf.touch.direction = conf.dirData[+!next];
	}

	/**
	 * Returns the index number of the current panel element.
	 * @ko 현재 패널 엘리먼트의 인덱스 번호를 반환한다
	 * @method eg.Flicking#getIndex
	 * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
	 * @return {Number} Index number of the current panel element <ko>현재 패널의 인덱스 번호</ko>
	 */
	getIndex(physical) {
		return this._conf.panel[physical ? "currIndex" : "currNo"];
	}

	/**
	 * Returns the reference of the current panel element.
	 * @ko 현재 패널 엘리먼트의 레퍼런스를 반환한다
	 * @method eg.Flicking#getElement
	 * @return {HTMLElement} Current element <ko>현재 엘리먼트</ko>
	 */
	getElement() {
		const panel = this._conf.panel;

		return panel.$list[panel.currIndex];
	}

	/**
	 * Returns the reference of the next panel element.
	 * @ko 다음 패널 엘리먼트의 레퍼런스를 반환한다.
	 * @method eg.Flicking#getNextElement
	 * @return {HTMLElement|null} Next panel element or null if it does not exist.<ko>다음 패널 엘리먼트. 패널이 없으면 'null'을 반환한다.</ko>
	 */
	getNextElement() {
		return this._getElement(this._conf.dirData[0], true);
	}

	/**
	 * Returns the index number of the next panel element.
	 * @ko 다음 패널 엘리먼트의 인덱스 번호를 반환한다
	 * @method eg.Flicking#getNextIndex
	 * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
	 * @return {Number|null} Index number of the next panel element or null if it does not exist. <ko>다음 패널 엘리먼트의 인덱스 번호. 패널이 없으면 'null'을 반환한다</ko>
	 */
	getNextIndex(physical) {
		return this._getElement(this._conf.dirData[0], false, physical);
	}

	/**
	 * Returns the references of whole panel elements.
	 * @ko 패널을 구성하는 모든 엘리먼트의 레퍼런스를 반환한다
	 * @method eg.Flicking#getAllElements
	 * @return {HTMLElement} Whole panel elements <ko>모든 패널 엘리먼트</ko>
	 */
	getAllElements() {
		return this._conf.panel.$list;
	}

	/**
	 * Returns the reference of the previous panel element.
	 * @ko 이전 패널 엘리먼트의 레퍼런스를 반환한다.
	 * @method eg.Flicking#getPrevElement
	 * @return {HTMLElement|null} Previous panel element or null if it does not exist. <ko>이전 패널 엘리먼트. 패널이 없으면 'null'을 반환한다</ko>
	 */
	getPrevElement() {
		return this._getElement(this._conf.dirData[1], true);
	}

	/**
	 * Returns the index number of the previous panel element.
	 * @ko 이전 패널 엘리먼트의 인덱스 번호를 반환한다
	 * @method eg.Flicking#getPrevIndex
	 * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
	 * @return {Number|null} Previous element index value or null if no more element exist<ko>이전 패널 인덱스 번호. 패널이 없는 경우에는 null</ko>
	 */
	getPrevIndex(physical) {
		return this._getElement(this._conf.dirData[1], false, physical);
	}

	/**
	 * Returns the total number of whole panel elements.
	 * @ko 전체 패널 엘리먼트의 개수를 반환한다
	 * @method eg.Flicking#getTotalCount
	 * @deprecated since 1.3.0
	 * @param {Boolean} [physical=false] Number of elements relative to (true: DOM, false: panel content)<ko>엘리먼트 개수의 기준(true: DOM 엘리먼트 기준, false: 패널 콘텐츠 기준)</ko>
	 * @return {Number} Total number of whole panel elements <ko>모든 패널 엘리먼트의 개수</ko>
	 */
	getTotalCount(physical) {
		return this._conf.panel[physical ? "count" : "origCount"];
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
			this[next ? "getNextIndex" : "getPrevIndex"]() != null
		) {
			this._movePanelByPhase("setBy", [
				panel.size * (next ? 1 : -1), 0
			], duration);
		}

		return this;
	}

	/**
	 * Move panel applying start/end phase value
	 * @param {String} method movableCoord method name
	 * @param {Object} coords coordinate array value
	 * @param {Number} durationValue duration value
	 */
	_movePanelByPhase(method, coords, durationValue) {
		const duration = utils.getNumValue(durationValue, this.options.duration);

		if (this._setPhaseValue("start") !== false) {
			this._setMovableCoord(method, coords, true, duration);
			!duration && this._setPhaseValue("end");
		}
	}

	/**
	 * Moves an element to the next panel.
	 * @ko 다음 패널로 이동한다.
	 * @method eg.Flicking#next
	 * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
	 * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	next(duration) {
		return this._movePanel(true, duration);
	}

	/**
	 * Moves an element to the previous panel.
	 * @ko 이전 패널로 이동한다.
	 * @method eg.Flicking#prev
	 * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
	 * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	prev(duration) {
		return this._movePanel(false, duration);
	}

	/**
	 * Moves an element to the indicated panel.
	 * @ko 지정한 패널로 이동한다.
	 * @method eg.Flicking#moveTo
	 * @param {Number} no Logical index number of the target panel element, which is relative to the panel content. <ko>이동할 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
	 * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
	 * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
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
			[panel.size * (circular ? indexToMove : no), 0],
			duration
		);

		return this;
	}

	/**
	 * Updates the size of the panel.
	 * @ko 패널의 크기를 갱신한다
	 * @method eg.Flicking#resize
	 * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 let some = new eg.Flicking("#mflick", {
					previewPadding: [10,10]
				});

	 // when device orientaion changes
	 some.resize();

	 // or when changes previewPadding option from its original value
	 some.options.previewPadding = [20, 30];
	 some.resize();
	 */
	resize() {
		const conf = this._conf;
		const options = this.options;
		const panel = conf.panel;
		const horizontal = options.horizontal;
		let panelSize;

		if (~~options.previewPadding.join("")) {
			this._setPadding(options.previewPadding.concat());
			panelSize = panel.size;
		} else if (horizontal) {
			panelSize = panel.size = utils.css(this.$wrapper, "width", true);
		}

		const maxCoords = this._getDataByDirection(
			[panelSize * (panel.count - 1), 0]
		);

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

		this._mcInst.options.max = maxCoords;
		this._setMovableCoord("setTo", [panelSize * panel.index, 0], true, 0);

		if (consts.IS_ANDROID2) {
			this._applyPanelsPos();
			this._adjustContainerCss("end");
		}

		return this;
	}

	/**
	 * Restores an element to its original position when it movement stops while the element is not dragged until a certain distance threshold is reached.
	 * @ko 다음 패널로 바뀌기 전에 패널 이동이 멈췄을 때 원래 패널로 복원한다
	 * @method eg.Flicking#restore
	 * @param {Number} [durationValue=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
	 * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 * @example
	 * let some = new eg.Flicking("#mflick").on({
	 *				beforeFlickStart : function(e) {
	 *					if(e.no === 2) {
	 *						e.stop();  // stop flicking
	 *						this.restore(100);  // restoring to previous position
	 *					}
	 *				}
	 *			);
	 */
	restore(durationValue) {
		const conf = this._conf;
		const panel = conf.panel;
		const currPos = this._getDataByDirection(this._mcInst.get());
		let duration = durationValue;
		let destPos;

		// check if the panel isn't in right position
		if (currPos[0] !== panel.currIndex * panel.size) {
			conf.customEvent.restoreCall = true;
			duration = utils.getNumValue(duration, this.options.duration);

			this._revertPanelNo();
			destPos = this._getDataByDirection([panel.size * panel.index, 0]);

			this._triggerBeforeRestore({depaPos: currPos, destPos});
			this._setMovableCoord("setTo", destPos, true, duration);

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
	 * Enables input devices.
	 * @ko 입력 장치를 사용할 수 있게 한다
	 * @method eg.Flicking#enableInput
	 * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	enableInput() {
		this._mcInst.enableInput();
		return this;
	}

	/**
	 * Disables input devices.
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @method eg.Flicking#disableInput
	 * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	disableInput() {
		this._mcInst.disableInput();
		return this;
	}

	/**
	 * Get current flicking status
	 * @ko 현재의 상태 값을 반환한다.
	 * @method eg.Flicking#getStatus
	 * @param {Boolean} stringify Set true if want get stringified status value <ko>상태 값을 문자열로 전달받고자 하는지 여부</ko>
	 * @return {{panel: {index: (*|number), no: (*|number), currIndex: number, currNo: number}, $list}}
	 */
	getStatus(stringify) {
		const panel = this._conf.panel;
		const rxStyle = /(transform|left|top|will-change|box-sizing|width):[^;]*;/g;
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
	 * Set flicking as given status
	 * @method eg.Flicking#setStatus
	 * @param {Object|String} statusValue status value to be restored <ko>복원할 상태 값</ko>
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
	 * Destroys elements, properties, and events used in a panel.
	 * @ko 패널에 사용한 엘리먼트와 속성, 이벤트를 해제한다
	 * @method eg.Flicking#destroy
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
				break;
			}

			const className = list[i].className;
			const style = list[i].style;

			$el[className ? "setAttribute" : "removeAttribute"]("class", className);
			$el[style ? "setAttribute" : "removeAttribute"]("style", style);
		}

		// unbind events
		this._bindEvents(false);
		this.off();

		// release resources
		for (const x in this) {
			this[x] = null;
		}
	}
}
