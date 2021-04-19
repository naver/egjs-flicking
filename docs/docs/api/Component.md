
class Component 

A class used to manage events in a component

|properties|methods|
|---|---|
|[VERSION](#VERSION)|[trigger](#trigger)<br/>[once](#once)<br/>[hasOn](#hasOn)<br/>[on](#on)<br/>[off](#off)|



## Properties
### VERSION {#VERSION}
Version info string


**Type**: $ts:string&lt;file&gt;/home/wn/egjs-flicking/node_modules/@egjs/component/src/Component.ts&lt;/file&gt;





## Methods

### trigger
Trigger a custom event.







### once
Executed event just one time.







### hasOn
Checks whether an event has been attached to a component.







### on
Attaches an event to a component.







### off
Detaches an event from the component.<br/>If the `eventName` is not given this will detach all event handlers attached.<br/>If the `handlerToDetach` is not given, this will detach all event handlers for `eventName`.








