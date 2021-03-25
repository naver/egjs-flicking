<a name="FlickingError"></a>

## FlickingError ⇐ <code>$ts:Error&lt;file&gt;/home/wn/egjs-flicking/src/core/FlickingError.ts&lt;/file&gt;</code>
<div>Special type of known error that [Flicking](#Flicking) throws.</div>

**Kind**: global class  
**Extends**: <code>$ts:Error&lt;file&gt;/home/wn/egjs-flicking/src/core/FlickingError.ts&lt;/file&gt;</code>  
**See**: [ERROR_CODE](#Constants.ERROR_CODE)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| code | <code>number</code> | <div>에러 코드<span>에러 코드</span></div> |

<a name="new_FlickingError_new"></a>

### new FlickingError(message, code)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>$ts:string&lt;file&gt;/home/wn/egjs-flicking/src/core/FlickingError.ts&lt;/file&gt;</code> | <div>Error message<span>에러 메시지</span></div> |
| code | <code>$ts:number&lt;file&gt;/home/wn/egjs-flicking/src/core/FlickingError.ts&lt;/file&gt;</code> | <div>Error code<span>에러 코드</span></div> |

**Example**  
```ts
<pre class="prettyprint source"><code>import Flicking, { FlickingError, ERROR_CODES } from &quot;@egjs/flicking&quot;;
try {
  const flicking = new Flicking(&quot;.flicking-viewport&quot;)
} catch (e) {
  if (e instanceof FlickingError && e.code === ERROR_CODES.ELEMENT_NOT_FOUND) {
    console.error(&quot;Element not found&quot;)
  }
}
</code></pre>
```
