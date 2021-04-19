
class SnapControl extends $ts:Control<file>/home/wn/egjs-flicking/src/control/SnapControl.ts</file>

A {@link Control} that uses a release momentum to choose destination panel

|properties|methods|
|---|---|
|[controller](#controller)<br/>[activeIndex](#activeIndex)<br/>[activePanel](#activePanel)<br/>[animating](#animating)<br/>[holding](#holding)|[moveToPosition](#moveToPosition)<br/>[init](#init)<br/>[destroy](#destroy)<br/>[enable](#enable)<br/>[disable](#disable)<br/>[updateInput](#updateInput)<br/>[resetActivePanel](#resetActivePanel)<br/>[moveToPanel](#moveToPanel)|



## Properties

### controller {#controller}
A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events


**Type**: AxesController




### activeIndex {#activeIndex}
Index number of the {@link Flicking#currentPanel currentPanel}


**Type**: number




### activePanel {#activePanel}
Currently active panel


**Type**: Panel




### animating {#animating}
Whether Flicking's animating


**Type**: boolean




### holding {#holding}
Whether user is clicking or touching


**Type**: boolean




## Methods

### moveToPosition
Move {@link Camera} to the given position







### init
Initialize Control







### destroy
Destroy Control and return to initial state







### enable
Enable input from the user (mouse/touch)







### disable
Disable input from the user (mouse/touch)







### updateInput
Update {@link Control#controller controller}'s state







### resetActivePanel
Reset {@link Control#activePanel activePanel} to `null`







### moveToPanel
Move {@link Camera} to the given panel








