import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

List of constants that flicking exports

## Members
### ERROR_CODE {#ERROR_CODE}
<div className="bulma-tags">
<span className="bulma-tag is-info">static</span>



</div>

Error codes of [FlickingError](FlickingError). Below are the conditions where each error code occurs.

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|WRONG_TYPE|number|Parameter type is wrong<ko>패러미터의 타입이 잘못되었을 경우</ko>|
|ELEMENT_NOT_FOUND|number|Element is not found inside page with the given CSS selector<ko>주어진 CSS selector로 페이지 내에서 해당 엘리먼트를 찾지 못했을 경우</ko>|
|VAL_MUST_NOT_NULL|number|Expected non-null value, but given `null` or `undefined`<ko>값을 기대했으나, `null`이나 `undefined`를 받은 경우</ko>|
|NOT_ATTACHED_TO_FLICKING|number|When Flicking's component is not initialized (i.e. [Flicking#init](Flicking#init) is not called)<ko>Flicking 내부 컴포넌트가 초기화되지 않은 경우 ([Flicking#init](Flicking#init)이 호출되지 않은 경우)</ko>|
|WRONG_OPTION|number|One of the options is wrong<ko>옵션들 중 잘못된 값이 있을 때</ko>|
|INDEX_OUT_OF_RANGE|number|When the given index is out of possible range<ko>인덱스가 주어진 범위를 벗어난 경우</ko>|
|POSITION_NOT_REACHABLE|number|When [Control#moveToPosition](Control#moveToPosition)'s position parameter is out of possible range.<ko>[Control#moveToPosition](Control#moveToPosition)의 `position` 패러미터가 도달 가능한 범위를 벗어난 경우</ko>|
|TRANSFORM_NOT_SUPPORTED|number|CSS `transform` property is not available(<=IE8) <ko>CSS `transform` 속성을 사용할 수 없는 경우(<=IE8)</ko>|
|STOP_CALLED_BY_USER|number|When the event's `stop()` is called by user.<ko>사용자에 의해 이벤트의 `stop()`이 호출된 경우</ko>|
|ANIMATION_INTERRUPTED|number|When the animation is interrupted by user.<ko>사용자에 의해 애니메이션이 중단된 경우</ko>|
|ANIMATION_ALREADY_PLAYING|number|When the animation is already playing.<ko>현재 애니메이션이 이미 진행중인 경우</ko>|
|NOT_ALLOWED_IN_FRAMEWORK|number|When the non-allowed method is called from frameworks (React, Angular, Vue...)
<ko>프레임워크(React, Angular, Vue ...)에서 사용 불가능한 메소드를 호출했을 경우</ko>|







### EVENTS {#EVENTS}
<div className="bulma-tags">
<span className="bulma-tag is-info">static</span>



</div>

Event type object with event name strings of [Flicking](Flicking)

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|HOLD_START|"holdStart"|holdStart event<ko>holdStart 이벤트</ko>|
|HOLD_END|"holdEnd"|holdEnd event<ko>holdEnd 이벤트</ko>|
|MOVE_START|"moveStart"|moveStart event<ko>moveStart 이벤트</ko>|
|MOVE|"move"|move event<ko>move 이벤트</ko>|
|MOVE_END|"moveEnd"|moveEnd event<ko>moveEnd 이벤트</ko>|
|WILL_CHANGE|"willChange"|willChange event<ko>willChange 이벤트</ko>|
|CHANGED|"changed"|changed event<ko>changed 이벤트</ko>|
|WILL_RESTORE|"willRestore"|willRestore event<ko>willRestore 이벤트</ko>|
|RESTORED|"restored"|restored event<ko>restored 이벤트</ko>|
|SELECT|"select"|select event<ko>select 이벤트</ko>|
|NEED_PANEL|"needPanel"|needPanel event<ko>needPanel 이벤트</ko>|



```ts
import { EVENTS } from "@egjs/flicking";
EVENTS.MOVE_START; // "moveStart"
```



### ALIGN {#ALIGN}
<div className="bulma-tags">
<span className="bulma-tag is-info">static</span>



</div>

An object with all possible predefined literal string for the [align](Flicking#align) option

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|PREV|"prev"|left/top align<ko>좌/상 정렬</ko>|
|CENTER|"center"|center align<ko>중앙 정렬</ko>|
|NEXT|"next"|right/bottom align<ko>우/하 정렬</ko>|







### DIRECTION {#DIRECTION}
<div className="bulma-tags">
<span className="bulma-tag is-info">static</span>



</div>

An object of directions

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|PREV|"PREV"|"left" when [horizontal](Flicking#horizontal) is true, and "top" when [horizontal](Flicking#horizontal) is false
<ko>[horizontal](Flicking#horizontal)가 `true`일 경우 왼쪽, [horizontal](Flicking#horizontal)가 `false`일 경우 위쪽을 의미합니다</ko>|
|NEXT|"NEXT"|"right" when [horizontal](Flicking#horizontal) is true, and "bottom" when [horizontal](Flicking#horizontal) is false
<ko>[horizontal](Flicking#horizontal)가 `true`일 경우 오른쪽, [horizontal](Flicking#horizontal)가 `false`일 경우 아래쪽을 의미합니다</ko>|
|NONE|null|This value usually means it's the same position<ko>주로 제자리인 경우를 의미합니다</ko>|







### MOVE_TYPE {#MOVE_TYPE}
<div className="bulma-tags">
<span className="bulma-tag is-info">static</span>



</div>

An object with all possible [moveType](Flicking#moveType)s

**Type**: object








|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
|SNAP|"snap"|Flicking's [moveType](Flicking#moveType) that enables [SnapControl](SnapControl) as a Flicking's [control](Flicking#control)
<ko>Flicking의 [control](Flicking#control)을 [SnapControl](SnapControl)로 설정하게 하는 [moveType](Flicking#moveType)</ko>|
|FREE_SCROLL|"freeScroll"|Flicking's [moveType](Flicking#moveType) that enables [FreeControl](FreeControl) as a Flicking's [control](Flicking#control)
<ko>Flicking의 [control](Flicking#control)을 [FreeControl](FreeControl)로 설정하게 하는 [moveType](Flicking#moveType)</ko>|







