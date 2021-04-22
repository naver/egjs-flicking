import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div className="notification is-warning my-2">⚠️ This class is for <strong>internal</strong> use only.</div>

```ts
class OffsetManipulator extends Component
```
A component that manages panel offset from the element's order change

<div className="container">
    <div className="row mb-2"><div className="col col--6"><strong>Methods</strong></div><div className="col col--6"><strong>Events</strong></div></div>
    <div className="row"><div className="col col--6"><a href="#init">init</a><br/><a href="#destroy">destroy</a><br/><a href="#insertPanelElements">insertPanelElements</a><br/><a href="#movePanelElementsToStart">movePanelElementsToStart</a><br/><a href="#movePanelElementsToEnd">movePanelElementsToEnd</a><br/><a href="#resetPanelElementOrder">resetPanelElementOrder</a><br/><a href="#removePanelElements">removePanelElements</a><br/><a href="#removeAllChildNodes">removeAllChildNodes</a><br/><a href="#removeAllTextNodes">removeAllTextNodes</a><br/><a href="#trigger">trigger</a><br/><a href="#once">once</a><br/><a href="#hasOn">hasOn</a><br/><a href="#on">on</a><br/><a href="#off">off</a></div><div className="col col--6"><a href="#event-orderChanged">orderChanged</a></div></div>
  </div>




## Methods

### init {#init}
<div className="bulma-tags">




</div>

Initialize OffsetManipulator





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|flicking|[Flicking](Flicking)|no||An instance of [Flicking](Flicking)<ko>Flicking의 인스턴스</ko>|








### destroy {#destroy}
<div className="bulma-tags">




</div>

Destroy Renderer and return to initial state





**Returns**: void













### insertPanelElements {#insertPanelElements}
<div className="bulma-tags">




</div>

Insert panel elements before nextSibling





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||An array of panels to add<ko>추가할 패널의 배열</ko>|
|nextSibling|[Panel](Panel) \| null|no|||








### movePanelElementsToStart {#movePanelElementsToStart}
<div className="bulma-tags">




</div>

Move panel element as the first child of the camera element





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||Panels to move<ko>위치를 변경할 패널들</ko>|
|togglePoints|Array&lt;[TogglePoint](TogglePoint)&gt;|no||An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>|








### movePanelElementsToEnd {#movePanelElementsToEnd}
<div className="bulma-tags">




</div>

Move panel element as the last child of the camera element





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||Panels to move<ko>위치를 변경할 패널들</ko>|
|togglePoints|Array&lt;[TogglePoint](TogglePoint)&gt;|no||An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>|








### resetPanelElementOrder {#resetPanelElementOrder}
<div className="bulma-tags">




</div>

Reset panel element order by the panel's index





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||Panels to move<ko>위치를 변경할 패널들</ko>|








### removePanelElements {#removePanelElements}
<div className="bulma-tags">




</div>

Remove panel elements





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|panels|Array&lt;[Panel](Panel)&gt;|no||Panels to remove<ko>삭제할 패널들</ko>|








### removeAllChildNodes {#removeAllChildNodes}
<div className="bulma-tags">




</div>

Remove all child nodes inside the given element





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|element|HTMLElement|no||A HTMLElement to remove all child nodes<ko>Child node를 전부 삭제할 HTMLElement</ko>|








### removeAllTextNodes {#removeAllTextNodes}
<div className="bulma-tags">




</div>

Remove all text nodes inside the given element





**Returns**: this




|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|element|HTMLElement|no||A HTMLElement to remove all text nodes<ko>Text node를 전부 삭제할 HTMLElement</ko>|








### trigger {#trigger}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Trigger a custom event.





**Returns**: this
- An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|event|string \| ComponentEvent|no||The name of the custom event to be triggered or an instance of the ComponentEvent<ko>발생할 커스텀 이벤트의 이름 또는 ComponentEvent의 인스턴스</ko>|
|params|Array&lt;any&gt; \| $ts:...|no||Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>|




```ts
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component<{
  beforeHi: ComponentEvent<{ foo: number; bar: string }>;
  hi: { foo: { a: number; b: boolean } };
  someEvent: (foo: number, bar: string) => void;
  someOtherEvent: void; // When there's no event argument
}> {
  some(){
    if(this.trigger("beforeHi")){ // When event call to stop return false.
      this.trigger("hi");// fire hi event.
    }
  }
}

const some = new Some();
some.on("beforeHi", e => {
  if(condition){
    e.stop(); // When event call to stop, `hi` event not call.
  }
  // `currentTarget` is component instance.
  console.log(some === e.currentTarget); // true

  typeof e.foo; // number
  typeof e.bar; // string
});
some.on("hi", e => {
  typeof e.foo.b; // boolean
});
// If you want to more know event design. You can see article.
// https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
```



### once {#once}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Executed event just one time.





**Returns**: this
- An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|eventName|string \| $ts:...|no||The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>|
|handlerToAttach|function \| $ts:...|yes||The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>|




```ts
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component<{
  hi: ComponentEvent;
}> {
  hi() {
    alert("hi");
  }
  thing() {
    this.once("hi", this.hi);
  }
}

var some = new Some();
some.thing();
some.trigger(new ComponentEvent("hi"));
// fire alert("hi");
some.trigger(new ComponentEvent("hi"));
// Nothing happens
```



### hasOn {#hasOn}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Checks whether an event has been attached to a component.





**Returns**: boolean
- Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|eventName|string|no||The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>|




```ts
import Component from "@egjs/component";

class Some extends Component<{
  hi: void;
}> {
  some() {
    this.hasOn("hi");// check hi event.
  }
}
```



### on {#on}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Attaches an event to a component.





**Returns**: this
- An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|eventName|string \| $ts:...|no||The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>|
|handlerToAttach|function \| $ts:...|yes||The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>|




```ts
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component<{
  hi: void;
}> {
  hi() {
    console.log("hi");
  }
  some() {
    this.on("hi",this.hi); //attach event
  }
}
```



### off {#off}
<div className="bulma-tags">


<span className="bulma-tag is-danger">inherited</span>

</div>

Detaches an event from the component.<br/>If the `eventName` is not given this will detach all event handlers attached.<br/>If the `handlerToDetach` is not given, this will detach all event handlers for `eventName`.





**Returns**: this
- An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>



|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
|eventName|string \| $ts:...|yes||The name of the event to be detached <ko>해제할 이벤트의 이름</ko>|
|handlerToDetach|function \| $ts:...|yes||The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>|




```ts
import Component, { ComponentEvent } from "@egjs/component";

class Some extends Component<{
  hi: void;
}> {
  hi() {
    console.log("hi");
  }
  some() {
    this.off("hi",this.hi); //detach event
  }
}
```



## Events
### orderChanged {#event-orderChanged}
<div className="bulma-tags">




</div>

Event that fires when order of the elements is changed

**Type**: void
















