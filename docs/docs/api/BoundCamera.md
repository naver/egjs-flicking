
class BoundCamera extends $ts:Camera<file>/home/wn/egjs-flicking/src/camera/BoundCamera.ts</file>

A {@link Camera} that set range not to go out of the first/last panel, so it won't show empty spaces before/after the first/last panel

|properties|methods|
|---|---|
|[element](#element)<br/>[position](#position)<br/>[alignPosition](#alignPosition)<br/>[offset](#offset)<br/>[range](#range)<br/>[rangeDiff](#rangeDiff)<br/>[visiblePanels](#visiblePanels)<br/>[visibleRange](#visibleRange)<br/>[anchorPoints](#anchorPoints)<br/>[controlParams](#controlParams)<br/>[atEdge](#atEdge)<br/>[size](#size)<br/>[align](#align)|[updateRange](#updateRange)<br/>[init](#init)<br/>[destroy](#destroy)<br/>[lookAt](#lookAt)<br/>[getPrevAnchor](#getPrevAnchor)<br/>[getNextAnchor](#getNextAnchor)<br/>[findAnchorIncludePosition](#findAnchorIncludePosition)<br/>[findNearestAnchor](#findNearestAnchor)<br/>[clampToReachablePosition](#clampToReachablePosition)<br/>[canReach](#canReach)<br/>[canSee](#canSee)<br/>[updateAlignPos](#updateAlignPos)<br/>[updateAnchors](#updateAnchors)<br/>[updatePosition](#updatePosition)<br/>[resetNeedPanelHistory](#resetNeedPanelHistory)|



## Properties

### element {#element}
The camera(`.flicking-camera`) element


**Type**: HTMLElement




### position {#position}
Current position of the camera


**Type**: number




### alignPosition {#alignPosition}
Align position inside the viewport where {@link Panel}'s {@link Panel#alignPosition alignPosition} should be located at


**Type**: number




### offset {#offset}
Position offset, used for the {@link Flicking#renderOnlyVisible renderOnlyVisible} option


**Type**: number




### range {#range}
A range that Camera's {@link Camera#position position} can reach


**Type**: object




### rangeDiff {#rangeDiff}
A difference between Camera's minimum and maximum position that can reach


**Type**: number




### visiblePanels {#visiblePanels}
An array of visible panels from the current position


**Type**: Array&lt;Panel&gt;




### visibleRange {#visibleRange}
A range of the visible area from the current position


**Type**: object




### anchorPoints {#anchorPoints}
An array of {@link AnchorPoint}s that Camera can be stopped at


**Type**: Array&lt;AnchorPoint&gt;




### controlParams {#controlParams}
A current parameters of the Camera for updating {@link AxesController}


**Type**: object




### atEdge {#atEdge}
A Boolean value indicating whether Camera's over the minimum or maximum position reachable


**Type**: boolean




### size {#size}
Return the size of the viewport


**Type**: number




### align {#align}
A value indicating where the {@link Camera#alignPosition alignPosition} should be located at inside the viewport element


**Type**: Constants.ALIGN | string | number




## Methods

### updateRange
Update {@link Camera#range range} of Camera







### init
Initialize Camera







### destroy
Destroy Camera and return to initial state







### lookAt
Move to the given position and apply CSS transform







### getPrevAnchor
Return a previous {@link AnchorPoint} of given {@link AnchorPoint}<br/>If it does not exist, return `null` instead







### getNextAnchor
Return a next {@link AnchorPoint} of given {@link AnchorPoint}<br/>If it does not exist, return `null` instead







### findAnchorIncludePosition
Return {@link AnchorPoint} that includes given position<br/>If there's no {@link AnchorPoint} that includes the given position, return `null` instead







### findNearestAnchor
Return {@link AnchorPoint} nearest to given position<br/>If there're no {@link AnchorPoint}s, return `null` instead







### clampToReachablePosition
Clamp the given position between camera's range







### canReach
Check whether the given panel is inside of the Camera's range







### canSee
Check whether the given panel element is visible at the current position







### updateAlignPos
Update Camera's {@link Camera#alignPosition alignPosition}







### updateAnchors
Update Camera's {@link Camera#anchorPoints anchorPoints}







### updatePosition
Update position after resizing







### resetNeedPanelHistory
Reset the history of {@link Flicking#event:needPanel needPanel} events so it can be triggered again








