/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Error codes of {@link FlickingError}. Below are the conditions where each error code occurs.
 * @ko {@link FlickingError}의 에러 코드. 아래는 각각의 에러 코드가 발생하는 조건입니다.
 * @name ERROR_CODE
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
 * @property {number} NOT_INITIALIZED When the {@link Flicking#init} is not called before but is needed<ko>{@link Flicking#init}의 호출이 필요하나, 아직 호출되지 않았을 경우</ko>
 * @property {number} NO_ACTIVE When there're no active panel that flicking has selected. This may be due to the absence of any panels<ko>현재 Flicking이 선택한 패널이 없을 경우. 일반적으로 패널이 하나도 없는 경우에 발생할 수 있습니다</ko>
 * @property {number} NOT_ALLOWED_IN_VIRTUAL When the non-allowed method is called while the virtual option is enabled<ko>virtual 옵션이 활성화된 상태에서 사용 불가능한 메소드가 호출되었을 경우</ko>
 */
export const CODE = {
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
  NOT_ALLOWED_IN_FRAMEWORK: 11,
  NOT_INITIALIZED: 12,
  NO_ACTIVE: 13,
  NOT_ALLOWED_IN_VIRTUAL: 14
} as const;

export const MESSAGE = {
  WRONG_TYPE: (wrongVal: any, correctTypes: string[]) => `${wrongVal}(${typeof wrongVal}) is not a ${correctTypes.map(type => `"${type}"`).join(" or ")}.`,
  ELEMENT_NOT_FOUND: (selector: string) => `Element with selector "${selector}" not found.`,
  VAL_MUST_NOT_NULL: (val: any, name: string) => `${name} should be provided. Given: ${val}`,
  NOT_ATTACHED_TO_FLICKING: "This module is not attached to the Flicking instance. \"init()\" should be called first.",
  WRONG_OPTION: (optionName: string, val: any) => `Option "${optionName}" is not in correct format, given: ${val}`,
  INDEX_OUT_OF_RANGE: (val: number, min: number, max: number) => `Index "${val}" is out of range: should be between ${min} and ${max}.`,
  POSITION_NOT_REACHABLE: (position: number) => `Position "${position}" is not reachable.`,
  TRANSFORM_NOT_SUPPORTED: "Browser does not support CSS transform.",
  STOP_CALLED_BY_USER: "Event stop() is called by user.",
  ANIMATION_INTERRUPTED: "Animation is interrupted by user input.",
  ANIMATION_ALREADY_PLAYING: "Animation is already playing.",
  NOT_ALLOWED_IN_FRAMEWORK: "This behavior is not allowed in the frameworks like React, Vue, or Angular.",
  NOT_INITIALIZED: "Flicking is not initialized yet, call init() first.",
  NO_ACTIVE: "There's no active panel that Flicking has selected. This may be due to the absence of any panels.",
  NOT_ALLOWED_IN_VIRTUAL: "This behavior is not allowed when the virtual option is enabled"
} as const;
