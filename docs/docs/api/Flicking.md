
class Flicking extends Component



|properties|methods|events|
|---|---|---|
|[VERSION](#VERSION)<br/>[control](#control)<br/>[camera](#camera)<br/>[renderer](#renderer)<br/>[viewport](#viewport)<br/>[initialized](#initialized)<br/>[circularEnabled](#circularEnabled)<br/>[index](#index)<br/>[element](#element)<br/>[currentPanel](#currentPanel)<br/>[panels](#panels)<br/>[panelCount](#panelCount)<br/>[visiblePanels](#visiblePanels)<br/>[animating](#animating)<br/>[holding](#holding)<br/>[align](#align)<br/>[defaultIndex](#defaultIndex)<br/>[horizontal](#horizontal)<br/>[circular](#circular)<br/>[bound](#bound)<br/>[adaptive](#adaptive)<br/>[needPanelThreshold](#needPanelThreshold)<br/>[deceleration](#deceleration)<br/>[easing](#easing)<br/>[duration](#duration)<br/>[inputType](#inputType)<br/>[moveType](#moveType)<br/>[threshold](#threshold)<br/>[interruptable](#interruptable)<br/>[bounce](#bounce)<br/>[iOSEdgeSwipeThreshold](#iOSEdgeSwipeThreshold)<br/>[preventClickOnDrag](#preventClickOnDrag)<br/>[renderOnlyVisible](#renderOnlyVisible)<br/>[autoInit](#autoInit)<br/>[autoResize](#autoResize)<br/>[renderExternal](#renderExternal)<br/>[useOrderManipulator](#useOrderManipulator)|[test](#test)<br/>[init](#init)<br/>[destroy](#destroy)<br/>[prev](#prev)<br/>[next](#next)<br/>[moveTo](#moveTo)<br/>[getPanel](#getPanel)<br/>[enableInput](#enableInput)<br/>[disableInput](#disableInput)<br/>[getStatus](#getStatus)<br/>[setStatus](#setStatus)<br/>[addPlugins](#addPlugins)<br/>[removePlugins](#removePlugins)<br/>[resize](#resize)<br/>[append](#append)<br/>[prepend](#prepend)<br/>[insert](#insert)<br/>[remove](#remove)<br/>[trigger](#trigger)<br/>[once](#once)<br/>[hasOn](#hasOn)<br/>[on](#on)<br/>[off](#off)|[ready](#event-ready)<br/>[beforeResize](#event-beforeResize)<br/>[afterResize](#event-afterResize)<br/>[holdStart](#event-holdStart)<br/>[holdEnd](#event-holdEnd)<br/>[moveStart](#event-moveStart)<br/>[move](#event-move)<br/>[moveEnd](#event-moveEnd)<br/>[willChange](#event-willChange)<br/>[changed](#event-changed)<br/>[willRestore](#event-willRestore)<br/>[restored](#event-restored)<br/>[select](#event-select)<br/>[needPanel](#event-needPanel)<br/>[visibleChange](#event-visibleChange)<br/>[reachEdge](#event-reachEdge)|

## Constructor
### new Flicking(root, options)


## Properties
### VERSION {#VERSION}
Version info string







### control {#control}
{@link Control} instance of the Flicking


**Type**: Control




### camera {#camera}
{@link Camera} instance of the Flicking


**Type**: Camera




### renderer {#renderer}
{@link Renderer} instance of the Flicking


**Type**: Renderer




### viewport {#viewport}
A component that manages viewport size


**Type**: Viewport




### initialized {#initialized}
Whether Flicking's {@link Flicking#init init()} is called.<br/>This is `true` when {@link Flicking#init init()} is called, and is `false` after calling {@link Flicking#destroy destroy()}.


**Type**: boolean




### circularEnabled {#circularEnabled}
Whether the `circular` option is enabled.<br/>The {@link Flicking#circular circular} option can't be enabled when sum of the panel sizes are too small.


**Type**: boolean




### index {#index}
Index number of the {@link Flicking#currentPanel currentPanel}


**Type**: number




### element {#element}
The root(`.flicking-viewport`) element


**Type**: HTMLElement




### currentPanel {#currentPanel}
Currently active panel


**Type**: Panel




### panels {#panels}
Array of panels


**Type**: Array&lt;Panel&gt;




### panelCount {#panelCount}
Count of panels


**Type**: number




### visiblePanels {#visiblePanels}
Array of panels that is visible at the current position


**Type**: Array&lt;Panel&gt;




### animating {#animating}
Whether Flicking's animating


**Type**: boolean




### holding {#holding}
Whether user is clicking or touching


**Type**: boolean




### align {#align}
Align position of the panels within viewport. You can set different values each for the panel and camera


**Type**: Constants.ALIGN | string | number | Object




### defaultIndex {#defaultIndex}
Index of the panel to move when Flicking's {@link Flicking#init init()} is called. A zero-based integer


**Type**: number




### horizontal {#horizontal}
Direction of panel movement (true: horizontal, false: vertical)


**Type**: boolean




### circular {#circular}
Enables circular(continuous loop) mode, which connects first/last panel for continuous scrolling.


**Type**: boolean




### bound {#bound}
Prevent the view(camera element) from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel<br/>Only can be enabled when `circular=false`


**Type**: boolean




### adaptive {#adaptive}
Update height of the viewport element after movement same to the height of the panel below. This can be only enabled when `horizontal=true`


**Type**: boolean




### needPanelThreshold {#needPanelThreshold}
A Threshold from viewport edge before triggering `needPanel` event


**Type**: number




### deceleration {#deceleration}
Deceleration value for panel movement animation which is triggered by user input. A higher value means a shorter animation time


**Type**: number




### easing {#easing}
An easing function applied to the panel movement animation. Default value is `easeOutCubic`


**Type**: function




### duration {#duration}
Default duration of the animation (ms)


**Type**: number




### inputType {#inputType}
Types of input devices to enable


**Type**: Array&lt;string&gt;




### moveType {#moveType}
Movement style by user input. This will change instance type of {@link Flicking#control}


**Type**: string




### threshold {#threshold}
Movement threshold to change panel (unit: px). It should be dragged above the threshold to change the current panel.


**Type**: number




### interruptable {#interruptable}
Set animation to be interruptable by click/touch.


**Type**: boolean




### bounce {#bounce}
The size value of the bounce area. Only can be enabled when `circular=false`.<br/>You can set different bounce value for prev/next direction by using array.<br/>`number` for px value, and `string` for px, and % value relative to viewport size.<br/>You have to call {@link Control#updateInput} after changing this to take effect.


**Type**: string | number | Array.&lt;(string|number)&gt;




### iOSEdgeSwipeThreshold {#iOSEdgeSwipeThreshold}
Size of the area from the right edge in iOS safari (in px) which enables swipe-back or swipe-forward


**Type**: number




### preventClickOnDrag {#preventClickOnDrag}
Automatically prevent `click` event if the user has dragged at least a single pixel on the viewport element


**Type**: boolean




### renderOnlyVisible {#renderOnlyVisible}
Whether to render visible panels only. This can dramatically increase performance when there're many panels.<br/>This will set {@link Flicking#renderer renderer}'s type to {@link VisibleRenderer}


**Type**: boolean




### autoInit {#autoInit}
Call {@link Flicking#init init()} automatically when creating Flicking's instance


**Type**: boolean




### autoResize {#autoResize}
Attach Flicking's {@link Flicking#resize resize} method to window's resize event.<br/>Flicking will automatically call {@link Flicking#resize resize} window size and orientation change.


**Type**: boolean




### renderExternal {#renderExternal}
This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.


**Type**: boolean


:::caution

This property is for internal use only

:::

### useOrderManipulator {#useOrderManipulator}
Use {@link OrderManipulator} for the element order managing in {@link Renderer}.<br/>Instead of inserting/removing element to change order, this will use CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/order order}.<br/>⚠️ Enabling this option will decrease browser coverage to IE11+


**Type**: boolean




## Methods
### test
A Static test methods







### init
Initialize Flicking and move to the default index<br/>This is automatically called on Flicking's constructor when `autoInit` is true(default)







### destroy
Destroy Flicking and remove all event handlers







### prev
Move to the previous panel (current index - 1)







### next
Move to the next panel (current index + 1)







### moveTo
Move to the panel with given index







### getPanel
Return the {@link Panel} at the given index. `null` if it doesn't exists.







### enableInput
Enable input from the user (mouse/touch)







### disableInput
Disable input from the user (mouse/touch)







### getStatus
Get current flicking status. You can restore current state by giving returned value to [setStatus()]{@link Flicking#setStatus}







### setStatus
Restore to the state of the `status`







### addPlugins
Add plugins that can have different effects on Flicking







### removePlugins
Remove plugins from Flicking.







### resize
Update viewport/panel sizes







### append
Add new panels after the last panel







### prepend
Add new panels before the first panel<br/>This will increase index of panels after by the number of panels added







### insert
Insert new panels at given index<br/>This will increase index of panels after by the number of panels added







### remove
Remove the panel at the given index<br/>This will decrease index of panels after by the number of panels removed







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
### ready {#event-ready}
Event that fires when Flicking's {@link Flicking#init init()} is called


**Type**: object




### beforeResize {#event-beforeResize}
Event that fires when Flicking's {@link Flicking#resize resize()} is called, before updating the sizes of panels and viewport.<br/>You can update the sizes of panels and viewport with this event, and it'll be applied after {@link Flicking#resize resize()} is finished.


**Type**: object




### afterResize {#event-afterResize}
Event that fires when Flicking's {@link Flicking#resize resize()} is called, after updating the sizes of panels and viewport.


**Type**: object




### holdStart {#event-holdStart}
Event that fires when user started dragging.


**Type**: object




### holdEnd {#event-holdEnd}
Event that fires when user stopped dragging.


**Type**: object




### moveStart {#event-moveStart}
Event that fires once before first {@link Flicking#event:move move} event


**Type**: object




### move {#event-move}
Event that fires for every movement


**Type**: object




### moveEnd {#event-moveEnd}
Event that fires when the movement is finished by user input release or animation end.


**Type**: object




### willChange {#event-willChange}
Event that fires when Flicking's active index will be changed. Index will be changed at the {@link Flicking#event:changed changed} event.<br/>It can be triggered when user finished input, or flicking start to move by method.<br/>Calling `stop()` in event will prevent index change and camera movement.


**Type**: object




### changed {#event-changed}
Event that fires when Flicking's index is changed.


**Type**: object




### willRestore {#event-willRestore}
Event fires when user drag amount not reached {@link Flicking#threshold threshold} and is returning to {@link Flicking#currentPanel currentPanel}


**Type**: object




### restored {#event-restored}
Event that fires when Flicking has returned to {@link Flicking#currentPanel currentPanel}


**Type**: object




### select {#event-select}
Event that fires when panel is statically click / touched


**Type**: object




### needPanel {#event-needPanel}
Event that fires when an empty panel area is visible at the edge of viewport<br/>You can set its threshold with {@link Flicking#needPanelThreshold needPanelThreshold}


**Type**: object




### visibleChange {#event-visibleChange}
Event that fires when visible panel inside the viewport changes


**Type**: object




### reachEdge {#event-reachEdge}
Event that fires when camera reaches the maximum/minimum range


**Type**: object




