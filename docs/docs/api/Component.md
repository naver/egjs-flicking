<a name="Component"></a>

## Component
<div>A class used to manage events in a component</div>

**Kind**: global class  

* [Component](#Component)
    * _instance_
        * [.trigger(event, ...params)](#Component+trigger) ⇒ <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code>
        * [.once(eventName, [handlerToAttach])](#Component+once) ⇒ <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code>
        * [.hasOn(eventName)](#Component+hasOn) ⇒ <code>boolean</code>
        * [.on(eventName, [handlerToAttach])](#Component+on) ⇒ <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code>
        * [.off([eventName], [handlerToDetach])](#Component+off) ⇒ <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code>
    * _static_
        * [.VERSION](#Component.VERSION) ⇒

<a name="Component+trigger"></a>

### component.trigger(event, ...params) ⇒ <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code>
<div>Trigger a custom event.</div>

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code> - <div>An instance of the component itself<span>컴포넌트 자신의 인스턴스</span></div>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> \| <code>ComponentEvent</code> | <div>The name of the custom event to be triggered or an instance of the ComponentEvent<span>발생할 커스텀 이벤트의 이름 또는 ComponentEvent의 인스턴스</span></div> |
| ...params | <code>Array&lt;any&gt;</code> \| <code>$ts:...</code> | <div>Event data to be sent when triggering a custom event <span>커스텀 이벤트가 발생할 때 전달할 데이터</span></div> |

**Example**  
```ts
<pre class="prettyprint source lang-ts"><code>import Component, { ComponentEvent } from &quot;@egjs/component&quot;;

class Some extends Component&lt;{
  beforeHi: ComponentEvent&lt;{ foo: number; bar: string }>;
  hi: { foo: { a: number; b: boolean } };
  someEvent: (foo: number, bar: string) => void;
  someOtherEvent: void; // When there's no event argument
}> {
  some(){
    if(this.trigger(&quot;beforeHi&quot;)){ // When event call to stop return false.
      this.trigger(&quot;hi&quot;);// fire hi event.
    }
  }
}

const some = new Some();
some.on(&quot;beforeHi&quot;, e => {
  if(condition){
    e.stop(); // When event call to stop, `hi` event not call.
  }
  // `currentTarget` is component instance.
  console.log(some === e.currentTarget); // true

  typeof e.foo; // number
  typeof e.bar; // string
});
some.on(&quot;hi&quot;, e => {
  typeof e.foo.b; // boolean
});
// If you want to more know event design. You can see article.
// https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
</code></pre>
```
<a name="Component+once"></a>

### component.once(eventName, [handlerToAttach]) ⇒ <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code>
<div>Executed event just one time.</div>

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code> - <div>An instance of the component itself<span>컴포넌트 자신의 인스턴스</span></div>  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> \| <code>$ts:...</code> | <div>The name of the event to be attached or an event name - event handler mapped object.<span>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</span></div> |
| [handlerToAttach] | <code>function</code> \| <code>$ts:...</code> | <div>The handler function of the event to be attached <span>등록할 이벤트의 핸들러 함수</span></div> |

**Example**  
```ts
<pre class="prettyprint source lang-ts"><code>import Component, { ComponentEvent } from &quot;@egjs/component&quot;;

class Some extends Component&lt;{
  hi: ComponentEvent;
}> {
  hi() {
    alert(&quot;hi&quot;);
  }
  thing() {
    this.once(&quot;hi&quot;, this.hi);
  }
}

var some = new Some();
some.thing();
some.trigger(new ComponentEvent(&quot;hi&quot;));
// fire alert(&quot;hi&quot;);
some.trigger(new ComponentEvent(&quot;hi&quot;));
// Nothing happens
</code></pre>
```
<a name="Component+hasOn"></a>

### component.hasOn(eventName) ⇒ <code>boolean</code>
<div>Checks whether an event has been attached to a component.</div>

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>boolean</code> - <div>Indicates whether the event is attached. <span>이벤트 등록 여부</span></div>  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | <div>The name of the event to be attached <span>등록 여부를 확인할 이벤트의 이름</span></div> |

**Example**  
```ts
<pre class="prettyprint source lang-ts"><code>import Component from &quot;@egjs/component&quot;;

class Some extends Component&lt;{
  hi: void;
}> {
  some() {
    this.hasOn(&quot;hi&quot;);// check hi event.
  }
}
</code></pre>
```
<a name="Component+on"></a>

### component.on(eventName, [handlerToAttach]) ⇒ <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code>
<div>Attaches an event to a component.</div>

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code> - <div>An instance of a component itself<span>컴포넌트 자신의 인스턴스</span></div>  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> \| <code>$ts:...</code> | <div>The name of the event to be attached or an event name - event handler mapped object.<span>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</span></div> |
| [handlerToAttach] | <code>function</code> \| <code>$ts:...</code> | <div>The handler function of the event to be attached <span>등록할 이벤트의 핸들러 함수</span></div> |

**Example**  
```ts
<pre class="prettyprint source lang-ts"><code>import Component, { ComponentEvent } from &quot;@egjs/component&quot;;

class Some extends Component&lt;{
  hi: void;
}> {
  hi() {
    console.log(&quot;hi&quot;);
  }
  some() {
    this.on(&quot;hi&quot;,this.hi); //attach event
  }
}
</code></pre>
```
<a name="Component+off"></a>

### component.off([eventName], [handlerToDetach]) ⇒ <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code>
<div>Detaches an event from the component.<br/>If the <code>eventName</code> is not given this will detach all event handlers attached.<br/>If the <code>handlerToDetach</code> is not given, this will detach all event handlers for <code>eventName</code>.</div>

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>$ts:this&lt;file&gt;/home/wn/egjs-flicking/node\_modules/@egjs/component/src/Component.ts&lt;/file&gt;</code> - <div>An instance of a component itself <span>컴포넌트 자신의 인스턴스</span></div>  

| Param | Type | Description |
| --- | --- | --- |
| [eventName] | <code>string</code> \| <code>$ts:...</code> | <div>The name of the event to be detached <span>해제할 이벤트의 이름</span></div> |
| [handlerToDetach] | <code>function</code> \| <code>$ts:...</code> | <div>The handler function of the event to be detached <span>해제할 이벤트의 핸들러 함수</span></div> |

**Example**  
```ts
<pre class="prettyprint source lang-ts"><code>import Component, { ComponentEvent } from &quot;@egjs/component&quot;;

class Some extends Component&lt;{
  hi: void;
}> {
  hi() {
    console.log(&quot;hi&quot;);
  }
  some() {
    this.off(&quot;hi&quot;,this.hi); //detach event
  }
}
</code></pre>
```
<a name="Component.VERSION"></a>

### Component.VERSION ⇒
<div>Version info string</div>

**Kind**: static property of [<code>Component</code>](#Component)  
**Example**  
```ts
<div>Component.VERSION;  // ex) 3.0.0</div>
```
