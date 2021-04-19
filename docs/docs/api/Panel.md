
class Panel 

An slide data component that holds information of a single HTMLElement

|properties|methods|
|---|---|
|[element](#element)<br/>[index](#index)<br/>[position](#position)<br/>[size](#size)<br/>[sizeIncludingMargin](#sizeIncludingMargin)<br/>[height](#height)<br/>[margin](#margin)<br/>[alignPosition](#alignPosition)<br/>[offset](#offset)<br/>[removed](#removed)<br/>[range](#range)<br/>[align](#align)|[resize](#resize)<br/>[contains](#contains)<br/>[destroy](#destroy)<br/>[includePosition](#includePosition)<br/>[includeRange](#includeRange)<br/>[focus](#focus)<br/>[prev](#prev)<br/>[next](#next)<br/>[increaseIndex](#increaseIndex)<br/>[decreaseIndex](#decreaseIndex)<br/>[increasePosition](#increasePosition)<br/>[decreasePosition](#decreasePosition)<br/>[increaseOffset](#increaseOffset)<br/>[decreaseOffset](#decreaseOffset)<br/>[resetOffset](#resetOffset)|

## Constructor
### new Panel(options, options.el, options.index, options.align, options.flicking)


## Properties

### element {#element}
`HTMLElement` that panel's referencing


**Type**: HTMLElement




### index {#index}
Index of the panel


**Type**: number




### position {#position}
Position of the panel, including {@link Panel#alignPosition alignPosition}


**Type**: number




### size {#size}
Cached size of the panel element<br/>This is equal to {@link Panel#element element}'s `offsetWidth` if {@link Flicking#horizontal horizontal} is `true`, and `offsetHeight` else


**Type**: number




### sizeIncludingMargin {#sizeIncludingMargin}
Panel's size including CSS `margin`<br/>This value includes {@link Panel#element element}'s margin left/right if {@link Flicking#horizontal horizontal} is `true`, and margin top/bottom else


**Type**: number




### height {#height}
Height of the panel element


**Type**: number




### margin {#margin}
Cached CSS `margin` value of the panel element


**Type**: object




### alignPosition {#alignPosition}
Align position inside the panel where {@link Camera}'s {@link Camera#alignPosition alignPosition} inside viewport should be located at


**Type**: number




### offset {#offset}
Panel's position offset which is changed after panel element's order changes if {@link Flicking#circular circular} is enabled


**Type**: number




### removed {#removed}
A value indicating whether the panel's {@link Flicking#remove remove}d


**Type**: boolean




### range {#range}
Panel element's range of the bounding box


**Type**: object




### align {#align}
A value indicating where the {@link Panel#alignPosition alignPosition} should be located at inside the panel element


**Type**: Constants.ALIGN | string | number




## Methods

### resize
Update size of the panel







### contains
Check whether the given element is inside of this panel's {@link Panel#element element}







### destroy
Reset internal state and set {@link Panel#removed removed} to `true`







### includePosition
Check whether the given position is inside of this panel's {@link Panel#range range}







### includeRange
Check whether the given range is fully included in this panel's area







### focus
Move {@link Camera} to this panel







### prev
Get previous(`index - 1`) panel. When the previous panel does not exist, this will return `null` instead<br/>If the {@link Flicking#circularEnabled circular} is enabled, this will return the last panel if called from the first panel







### next
Get next(`index + 1`) panel. When the next panel does not exist, this will return `null` instead<br/>If the {@link Flicking#circularEnabled circular} is enabled, this will return the first panel if called from the last panel







### increaseIndex
Increase panel's index by the given value





:::caution

This property is for internal use only

:::

### decreaseIndex
Decrease panel's index by the given value





:::caution

This property is for internal use only

:::

### increasePosition
Increase panel's position by the given value





:::caution

This property is for internal use only

:::

### decreasePosition
Decrease panel's position by the given value





:::caution

This property is for internal use only

:::

### increaseOffset
Increase panel's offset by the given value





:::caution

This property is for internal use only

:::

### decreaseOffset
Decrease panel's offset by the given value





:::caution

This property is for internal use only

:::

### resetOffset
Reset panel's offset to 0





:::caution

This property is for internal use only

:::


