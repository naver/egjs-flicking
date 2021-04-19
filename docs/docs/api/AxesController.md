
class AxesController 

A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events

|properties|methods|
|---|---|
|[axes](#axes)<br/>[state](#state)<br/>[animatingContext](#animatingContext)<br/>[enabled](#enabled)<br/>[position](#position)|[init](#init)<br/>[destroy](#destroy)<br/>[enable](#enable)<br/>[disable](#disable)<br/>[update](#update)<br/>[animateTo](#animateTo)|



## Properties

### axes {#axes}
An {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance


**Type**: Axes




### state {#state}
A activated {@link State} that shows the current status of the user input or the animation


**Type**: State




### animatingContext {#animatingContext}
A context of the current animation playing


**Type**: object




### enabled {#enabled}
A Boolean indicating whether the user input is enabled


**Type**: boolean




### position {#position}
Current position value in {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance


**Type**: number




## Methods

### init
Initialize AxesController







### destroy
Destroy AxesController and return to initial state







### enable
Enable input from the user (mouse/touch)







### disable
Disable input from the user (mouse/touch)







### update
Update {@link https://naver.github.io/egjs-axes/ @egjs/axes}'s state







### animateTo
Run Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} using the given position








