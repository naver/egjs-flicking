import { counter } from "../../../src/utils";

// UI fixture
import { DEFAULT_OPTIONS } from "../../../src/consts";

const colors = [
  "#296EB4",
  "#B1740F",
  "#032B43",
  "#50808E",
  "#420217",
  "#565264"
];
const defaultClassPrefix = DEFAULT_OPTIONS.classPrefix;

// Wrapper with width: 100% & height: 39px guaranteed
export const wrapper = (...panels: any[]) => `
  <div class="wrapper">
    ${typeof panels[0] === "object"
    ? panels.map(([panelFunc, args], index) => panelFunc(index, args)).join("\n")
    : panels[0]}
  </div>`;

// Wrapper with dynamic size
export const inlineWrapper = (...panels: any[]) => `
  <div class="wrapper inline">
    ${typeof panels[0] === "object"
    ? panels.map(([panelFunc, args], index) => panelFunc(index, args)).join("\n")
    : panels[0]}
  </div>`;

export const viewport = (...panels: any[]) => `
  <div class="${defaultClassPrefix}-viewport">
    ${typeof panels[0] === "object"
    ? panels.map(([panelFunc, args], index) => panelFunc(index, args)).join("\n")
    : panels[0]}
  </div>`;

export const camera = (...panels: any[]) => `
  <div class="${defaultClassPrefix}-camera">
    ${panels.map(([panelFunc, ...args], index) => panelFunc(index, ...args)).join("\n")}
  </div>`;

export const panel = (index: number, className: string) => `
  <div class="${className}" style="background-color:${colors[index % colors.length]}">
    <p>Layer ${index}</p>
  </div>`;

export const image = (index: number, className: string, src: string, lazy: boolean = false) => `
  <div class="${className}" style="background-color:${colors[index % colors.length]}">
    <img src="${src}" loading="${lazy ? "lazy" : "default"}" alt="image">Layer ${index}</img>
  </div>`;

export const horizontal = {
  full: wrapper(
    [panel, "panel-horizontal-full"],
    [panel, "panel-horizontal-full"],
    [panel, "panel-horizontal-full"],
  ),
  fullN: (count: number) =>  wrapper(
    ...counter(count).map(() => [panel, "panel-horizontal-full"]),
  ),
  half: wrapper(
    [panel, "panel-horizontal-50"],
    [panel, "panel-horizontal-50"],
    [panel, "panel-horizontal-50"],
  ),
  halfN: (count: number) =>  wrapper(
    ...counter(count).map(() => [panel, "panel-horizontal-50"]),
  ),
  variant: wrapper(
    [panel, "panel-horizontal-50"],
    [panel, "panel-horizontal-20"],
    [panel, "panel-horizontal-40"],
    [panel, "panel-horizontal-30"],
    [panel, "panel-horizontal-full"],
    [panel, "panel-horizontal-10"],
  ),
  variant2: wrapper(
    [panel, "panel-horizontal-50"],
    [panel, "panel-horizontal-full"],
    [panel, "panel-horizontal-30"],
    [panel, "panel-horizontal-120"],
  ),
  shouldClone4: wrapper(
    [panel, "panel-horizontal-50"],
    [panel, "panel-horizontal-50"],
  ),
  oneTenth: wrapper(
    [panel, "panel-horizontal-10"],
  ),
  fixedTo100N: (count: number) =>  wrapper(
    ...counter(count).map(() => [panel, "panel-horizontal-100px"]),
  ),
  fixedTo100: wrapper(
    [panel, "panel-horizontal-100px"],
    [panel, "panel-horizontal-100px"],
    [panel, "panel-horizontal-100px"],
    [panel, "panel-horizontal-100px"],
    [panel, "panel-horizontal-100px"],
    [panel, "panel-horizontal-100px"],
    [panel, "panel-horizontal-100px"],
  ),
  panel30: wrapper(
    [panel, "panel-horizontal-30"],
    [panel, "panel-horizontal-30"],
    [panel, "panel-horizontal-30"],
    [panel, "panel-horizontal-30"],
    [panel, "panel-horizontal-30"],
    [panel, "panel-horizontal-30"],
  ),
  panel30N: (count: number) =>  wrapper(
    ...counter(count).map(() => [panel, "panel-horizontal-30"]),
  ),
  none: wrapper(),
  hasViewport: wrapper(
    viewport(
      [panel, "panel-horizontal-full"],
      [panel, "panel-horizontal-full"],
      [panel, "panel-horizontal-full"],
    ),
  ),
  hasCamera: wrapper(
    camera(
      [panel, "panel-horizontal-full"],
      [panel, "panel-horizontal-full"],
      [panel, "panel-horizontal-full"],
    ),
  ),
  hasViewportCamera: wrapper(
    viewport(
      camera(
        [panel, "panel-horizontal-full"],
        [panel, "panel-horizontal-full"],
        [panel, "panel-horizontal-full"],
      ),
    ),
  ),
  hasBigHeight: wrapper(
    viewport(
      camera(
        [panel, "panel-horizontal-full panel-vertical-2000px"],
      ),
    ),
  ),
  hasDifferentHeight: wrapper(
    viewport(
      camera(
        [panel, "panel-horizontal-full"],
        [panel, "panel-horizontal-full panel-vertical-2000px"],
      ),
    ),
  ),
  hasZeroWidth: wrapper(
    viewport(
      camera(
        [panel, "panel-horizontal-0px"],
        [panel, "panel-horizontal-0px"],
        [panel, "panel-horizontal-0px"],
      ),
    ),
  ),
  hasDisplayNone: wrapper(
    viewport(
      camera(
        [panel, "panel-horizontal-none"],
        [panel, "panel-horizontal-none"],
        [panel, "panel-horizontal-none"],
      ),
    ),
  ),
  hasEmptyImagesInside: inlineWrapper(
    viewport(
      camera(
        [image, "panel-inline", "./images/non-exist.png"],
        [image, "panel-inline", "./images/non-exist.png"],
        [image, "panel-inline", "./images/non-exist.png"],
      ),
    ),
  ),
  hasEmptyLazyImagesInside: inlineWrapper(
    viewport(
      camera(
        [image, "panel-inline", "./images/non-exist.png", true],
        [image, "panel-inline", "./images/non-exist.png", true],
        [image, "panel-inline", "./images/non-exist.png", true],
      ),
    ),
  )
};

export const vertical = {
  full: wrapper(
    [panel, "panel-vertical-full"],
    [panel, "panel-vertical-full"],
    [panel, "panel-vertical-full"],
  ),
  half: wrapper(
    [panel, "panel-vertical-50"],
    [panel, "panel-vertical-50"],
    [panel, "panel-vertical-50"],
  ),
  variant: wrapper(
    [panel, "panel-vertical-50"],
    [panel, "panel-vertical-20"],
    [panel, "panel-vertical-40"],
    [panel, "panel-vertical-30"],
    [panel, "panel-vertical-full"],
    [panel, "panel-vertical-10"],
  ),
  shouldClone4: wrapper(
    [panel, "panel-vertical-50"],
    [panel, "panel-vertical-50"],
  )
};
