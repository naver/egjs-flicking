
class ElementManipulator extends $ts:OffsetManipulator<file>/home/wn/egjs-flicking/src/renderer/ElementManipulator.ts</file>

A component that manages element add/remove and element's order change

|methods|events|
|---|---|
|[init](#init)<br/>[destroy](#destroy)<br/>[insertPanelElements](#insertPanelElements)<br/>[movePanelElementsToStart](#movePanelElementsToStart)<br/>[movePanelElementsToEnd](#movePanelElementsToEnd)<br/>[resetPanelElementOrder](#resetPanelElementOrder)<br/>[removePanelElements](#removePanelElements)<br/>[removeAllChildNodes](#removeAllChildNodes)<br/>[removeAllTextNodes](#removeAllTextNodes)|[orderChanged](#event-orderChanged)|




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







## Events
### orderChanged {#event-orderChanged}
Event that fires when order of the elements is changed


**Type**: void




