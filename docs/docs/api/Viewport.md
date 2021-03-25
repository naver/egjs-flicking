<a name="Viewport"></a>

## Viewport
<div>A component that manages viewport size</div>

**Kind**: global class  

* [Viewport](#Viewport)
    * [new Viewport(el)](#new_Viewport_new)
    * [.element](#Viewport+element) ⇒
    * [.width](#Viewport+width) ⇒
    * [.height](#Viewport+height) ⇒
    * [.setSize([size])](#Viewport+setSize) ⇒
    * [.resize()](#Viewport+resize) ⇒

<a name="new_Viewport_new"></a>

### new Viewport(el)

| Param | Type | Description |
| --- | --- | --- |
| el | <code>$ts:HTMLElement&lt;file&gt;/home/wn/egjs-flicking/src/core/Viewport.ts&lt;/file&gt;</code> | <div>A viewport element<span>뷰포트 엘리먼트</span></div> |

<a name="Viewport+element"></a>

### viewport.element ⇒
<div>A viewport(root) element</div>

**Kind**: instance property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
<a name="Viewport+width"></a>

### viewport.width ⇒
<div>Viewport width</div>

**Kind**: instance property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
<a name="Viewport+height"></a>

### viewport.height ⇒
<div>Viewport height</div>

**Kind**: instance property of [<code>Viewport</code>](#Viewport)  
**Read only**: true  
<a name="Viewport+setSize"></a>

### viewport.setSize([size]) ⇒
<div>Change viewport's size.<br/>
This will change the actual size of <code>.flicking-viewport</code> element by changing its CSS width/height property</div>

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  

| Param | Type | Description |
| --- | --- | --- |
| [size] | <code>object</code> | <div>New viewport size<span>새 뷰포트 크기</span></div> |
| [size.width] | <code>number</code> \| <code>string</code> | <div>CSS string or number(in px)<span>CSS 문자열 또는 숫자(px)</span></div> |
| [size.height] | <code>number</code> \| <code>string</code> | <div>CSS string or number(in px)<span>CSS 문자열 또는 숫자(px)</span></div> |

<a name="Viewport+resize"></a>

### viewport.resize() ⇒
<div>Update width/height to the current viewport element's size</div>

**Kind**: instance method of [<code>Viewport</code>](#Viewport)  
