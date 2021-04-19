
class VisibleRenderer extends $ts:RawRenderer<file>/home/wn/egjs-flicking/src/renderer/VisibleRenderer.ts</file>

A {@link Renderer} that renders only visible panel elements({@link Camera#visiblePanels visiblePanels}) inside the camera element

|properties|methods|
|---|---|
|[panels](#panels)<br/>[panelCount](#panelCount)<br/>[elementManipulator](#elementManipulator)<br/>[align](#align)|[render](#render)<br/>[init](#init)<br/>[destroy](#destroy)<br/>[getPanel](#getPanel)<br/>[insert](#insert)<br/>[remove](#remove)<br/>[updatePanelSize](#updatePanelSize)|



## Properties

### panels {#panels}
Array of panels


**Type**: Array&lt;Panel&gt;




### panelCount {#panelCount}
Count of panels


**Type**: number




### elementManipulator {#elementManipulator}
An instance of the {@link OffsetManipulator} that Renderer's using


**Type**: OffsetManipulator




### align {#align}
A {@link Panel}'s {@link Panel#align align} value that applied to all panels


**Type**: Constants.ALIGN | string | number




## Methods

### render
Render visible panel elements inside the camera element







### init
Initialize Renderer







### destroy
Destroy Renderer and return to initial state







### getPanel
Return the {@link Panel} at the given index. `null` if it doesn't exists.







### insert
Insert new panels at given index<br/>This will increase index of panels after by the number of panels added







### remove
Remove the panel at the given index<br/>This will decrease index of panels after by the number of panels removed







### updatePanelSize
Update all panel sizes








