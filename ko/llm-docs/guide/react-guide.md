# React Guide

Learn about React-specific features, event handling, and component usage for using Flicking in your React application.

> **Info: This guide is for React users. For Vue3, see the [Vue3 Guide](https://naver.github.io/egjs-flicking/llm-docs/guide/vue3-guide.md). For vanilla JavaScript, see the [Quick Start](https://naver.github.io/egjs-flicking/llm-docs/guide/quickstart.md) guide.**

---

## Installation & Import

### Package Installation

```bash
npm install @egjs/react-flicking
# or
yarn add @egjs/react-flicking
```

### Import in Your Component

```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
```

> **Warning: Import Path**
Make sure to use the correct package:
- ✅ `@egjs/react-flicking` (React)
- ❌ `@egjs/flicking` (Vanilla JS only)

---

## Event Handling

Event handlers in React use the `on` prefix with PascalCase event names.

### Event Naming Pattern

**Format**: `on` + PascalCase event name

```jsx
<Flicking
  onReady={(e) => console.log("ready")}
  onChanged={(e) => console.log("changed")}
  onWillChange={(e) => console.log("willChange")}
  onWillRestore={(e) => console.log("willRestore")}
  onRestored={(e) => console.log("restored")}
  onMoveStart={(e) => console.log("moveStart")}
  onMove={(e) => console.log("move")}
  onMoveEnd={(e) => console.log("moveEnd")}
  onHoldStart={(e) => console.log("holdStart")}
  onHoldEnd={(e) => console.log("holdEnd")}
  onSelect={(e) => console.log("select")}
  onNeedPanel={(e) => console.log("needPanel")}
  onVisibleChange={(e) => console.log("visibleChange")}
  onReachEdge={(e) => console.log("reachEdge")}>
  {/* panels */}
</Flicking>
```

> **Tip: React Event Handler Pattern**
- Event name in camelCase: `changed`, `willChange`, `moveStart`
- Add `on` prefix: `onChanged`, `onWillChange`, `onMoveStart`
- Use PascalCase for compound words: `onVisibleChange` (not `onvisibleChange`)

### Common Event Handlers

```jsx
function MyCarousel() {
  // Fired AFTER panel change completes
  const handleChanged = (e) => {
    console.log("New panel index:", e.index);
    console.log("Previous panel index:", e.prevIndex);
  };

  // Fired BEFORE panel change starts (cancellable)
  const handleWillChange = (e) => {
    console.log("Will move to:", e.index);
    // Call e.stop() to prevent the change
    if (e.index === 5) {
      e.stop(); // Cancel navigation to panel 5
    }
  };

  // Fired when user starts dragging
  const handleMoveStart = (e) => {
    console.log("User started moving");
  };

  return (
    <Flicking
      onChanged={handleChanged}
      onWillChange={handleWillChange}
      onMoveStart={handleMoveStart}>
      {/* panels */}
    </Flicking>
  );
}
```

**See Also:**
- [`ChangedEvent`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/ChangedEvent.md) - Fired AFTER panel change
- [`WillChangeEvent`](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/WillChangeEvent.md) - Fired BEFORE panel change
- [All Event Interfaces](https://naver.github.io/egjs-flicking/llm-docs/api/interfaces/ChangedEvent.md)

---

## Using the Instance

Use `useRef` to access the Flicking instance and control the carousel programmatically.

### Using useRef

```jsx
import { useRef } from "react";
import Flicking from "@egjs/react-flicking";

function MyCarousel() {
  const flickingRef = useRef(null);

  const handlePrev = () => {
    flickingRef.current?.prev();
  };

  const handleNext = () => {
    flickingRef.current?.next();
  };

  const handleMoveTo = () => {
    flickingRef.current?.moveTo(3);
  };

  return (
    <div>
      <Flicking ref={flickingRef}>
        <div>Panel 1
        <div>Panel 2
        <div>Panel 3
        <div>Panel 4
      </Flicking>

      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleMoveTo}>Move to Panel 4</button>
    
  );
}
```

> **Tip: Optional Chaining**
Use optional chaining (`?.`) when calling methods to avoid errors if the ref is not yet mounted:
```jsx
flickingRef.current?.moveTo(2);  // ✅ Safe
flickingRef.current.moveTo(2);   // ❌ May error if not mounted
```

**See Also:**
- [`moveTo()`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#moveto)
- [`prev()`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#prev)
- [`next()`](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md#next)
- [All Flicking Methods](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md)

---

## Styling

In React, the `className` prop you pass to the `<Flicking>` component is applied directly to the `.flicking-viewport` element:

```jsx
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

// className goes on the Flicking component
<Flicking className="my-carousel">
  Panel 1
</Flicking>
```

```css
/* Your custom class is applied to .flicking-viewport */
.my-carousel {
  max-width: 1200px;
  margin: 0 auto;
}

.panel {
  width: 300px;
  height: 400px;
}
```

You can use any styling approach (CSS files, CSS Modules, styled-components, inline styles, etc.) — the key point is that your class applies to the viewport.

> **Tip: Complete Styling Guide**
For detailed information about Flicking's HTML structure, required CSS, and comprehensive styling guidelines, see [HTML Structure & Styling](https://naver.github.io/egjs-flicking/llm-docs/guide/structure-and-styling.md).

---

## React Component Panels

When using React components as panels, there are specific requirements to ensure Flicking can properly manage them.

### Ref Forwarding Requirement

React components used as panels **must forward refs** to their root DOM element. This allows Flicking to access and manipulate the panel elements.

```jsx
import { forwardRef } from "react";
import Flicking from "@egjs/react-flicking";

// ✅ Correct - Component forwards ref
const Panel = forwardRef((props, ref) => (
  <div ref={ref} className="panel">
    {props.children}
  
));

function MyCarousel() {
  return (
    <Flicking>
      <Panel>Panel 1</Panel>
      <Panel>Panel 2</Panel>
      <Panel>Panel 3</Panel>
    </Flicking>
  );
}
```

```jsx
// ❌ Wrong - No ref forwarding
const Panel = (props) => (
  
    {props.children}
  
);

// ❌ Wrong - Multiple root elements
const Panel = forwardRef((props, ref) => (
  <>
    <div>Header
    <div ref={ref}>Content
  </>
));
```

### Workarounds

If you can't modify the component to forward refs, use one of these approaches:

#### 1. Wrap in a div (Recommended)

```jsx
<Flicking>
  <div><ThirdPartyComponent />
  <div><ThirdPartyComponent />
  <div><ThirdPartyComponent />
</Flicking>
```

#### 2. Use useFindDOMNode option

```jsx
<Flicking useFindDOMNode={true}>
  <ThirdPartyComponent />
  <ThirdPartyComponent />
  <ThirdPartyComponent />
</Flicking>
```

> **Warning: Performance Note**
`useFindDOMNode` uses React's deprecated `findDOMNode` API and may impact performance. Wrapping in a div is the preferred solution.

---

## React-Exclusive Options

React Flicking provides additional options not available in vanilla JS or Vue3.

### HTML Tag Customization

**viewportTag** - Customize the viewport element's HTML tag (default: `"div"`)

```jsx
<Flicking viewportTag="section">
  {/* Renders as <section class="flicking-viewport"> */}
</Flicking>
```

**cameraTag** - Customize the camera element's HTML tag (default: `"div"`)

```jsx
<Flicking cameraTag="ul">
  {/* Camera renders as <ul class="flicking-camera"> */}
  <li>Panel 1</li>
  <li>Panel 2</li>
</Flicking>
```

### Camera Styling

**cameraClass** - Add custom className to the camera element (default: `""`)

```jsx
<Flicking cameraClass="my-camera-class">
  {/* Camera will have classes: "flicking-camera my-camera-class" */}
</Flicking>
```

### Rendering Optimization

**renderOnSameKey** - Control re-rendering when children have identical keys (default: `false`)

```jsx
const [panels, setPanels] = useState([1, 2, 3]);

<Flicking renderOnSameKey={false}>
  {panels.map((num) => (
    <div key={num}>Panel {num}
  ))}
</Flicking>
```

When `false`, panels with the same key won't re-render, improving performance. Set to `true` if you need to force re-renders.

**useFindDOMNode** - Enable alternative DOM access method (default: `false`)

```jsx
<Flicking useFindDOMNode={true}>
  {/* Allows components without ref forwarding */}
</Flicking>
```

> **Tip: These options are React-specific. See [Flicking API](https://naver.github.io/egjs-flicking/llm-docs/api/classes/Flicking.md) for the complete reference.**

---

## Common Pitfalls

### 1. Wrong Import Path

```jsx
// ❌ Wrong - This is vanilla JS
import Flicking from "@egjs/flicking";

// ✅ Correct - React wrapper
import Flicking from "@egjs/react-flicking";
```

### 2. Wrong Event Handler Names

```jsx
// ❌ Wrong - Missing 'on' prefix
<Flicking changed={handler} />

// ❌ Wrong - Using vanilla JS event name
<Flicking on="changed" />

// ✅ Correct - onChanged with PascalCase
<Flicking onChanged={handler} />
```

### 3. Forgetting CSS Import

```jsx
// ❌ Missing CSS - Panels won't display correctly
import Flicking from "@egjs/react-flicking";

// ✅ Include CSS
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
```

### 4. Accessing Methods Before Mount

```jsx
function MyCarousel() {
  const flickingRef = useRef(null);

  // ❌ Wrong - Ref is null during render
  flickingRef.current?.moveTo(2);

  // ✅ Correct - Use in event handler or useEffect
  useEffect(() => {
    flickingRef.current?.moveTo(2);
  }, []);

  return <Flicking ref={flickingRef}>{/* panels */}</Flicking>;
}
```
