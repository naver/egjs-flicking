// UI fixture

const colors = [
  "#296EB4",
  "#B1740F",
  "#032B43",
  "#50808E",
  "#420217",
  "#565264",
];

const wrapper = (...panels: any[]) => `
  <div class="wrapper">
    ${panels.map(([panelFunc, args], index) => panelFunc(index, args)).join("\n")}
  </div>`;

const panel = (index: number, className: string) => `
  <div class="${className}" style="background-color:${colors[index % colors.length]}">
    <p>Layer ${index}</p>
  </div>`;

export const horizontal = {
  full: wrapper(
    [panel, "panel-horizontal-full"],
    [panel, "panel-horizontal-full"],
    [panel, "panel-horizontal-full"],
  ),
  half: wrapper(
    [panel, "panel-horizontal-50"],
    [panel, "panel-horizontal-50"],
    [panel, "panel-horizontal-50"],
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
  fixedTo100: wrapper(
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
  none: wrapper(),
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
  ),
};
