
class OffsetManipulator extends $ts:Component<file>/home/wn/egjs-flicking/src/renderer/OffsetManipulator.ts</file>

A component that manages panel offset from the element's order change

|methods|events|
|---|---|
|[init](#init)<br/>[destroy](#destroy)<br/>[insertPanelElements](#insertPanelElements)<br/>[movePanelElementsToStart](#movePanelElementsToStart)<br/>[movePanelElementsToEnd](#movePanelElementsToEnd)<br/>[resetPanelElementOrder](#resetPanelElementOrder)<br/>[removePanelElements](#removePanelElements)<br/>[removeAllChildNodes](#removeAllChildNodes)<br/>[removeAllTextNodes](#removeAllTextNodes)<br/>[trigger](#trigger)<br/>[once](#once)<br/>[hasOn](#hasOn)<br/>[on](#on)<br/>[off](#off)|[orderChanged](#event-orderChanged)|




## Methods

### init
Initialize OffsetManipulator







### destroy
Destroy Renderer and return to initial state







### insertPanelElements
Insert panel elements before nextSibling







### movePanelElementsToStart
Move panel element as the first child of the camera element







### movePanelElementsToEnd
Move panel element as the last child of the camera element







### resetPanelElementOrder
Reset panel element order by the panel's index







### removePanelElements
Remove panel elements







### removeAllChildNodes
Remove all child nodes inside the given element







### removeAllTextNodes
Remove all text nodes inside the given element







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







## Events
### orderChanged {#event-orderChanged}
Event that fires when order of the elements is changed


**Type**: void




