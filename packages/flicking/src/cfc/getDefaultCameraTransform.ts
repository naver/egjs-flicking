import { FlickingOptions } from "../Flicking";
import { ALIGN } from "../const/external";
import { parseArithmeticExpression } from "../utils";

export default (align: FlickingOptions["align"] = ALIGN.CENTER, horizontal: boolean = true, firstPanelSize?: string) => {
  const cameraAlign = getCameraAlign(align);
  const panelAlign = getPanelAlign(align);

  if (panelAlign == null) return "";

  const camPosition = `calc(${cameraAlign} - (${firstPanelSize || "0px"} * ${panelAlign.percentage}) - ${panelAlign.absolute}px)`;

  return horizontal
    ? `translate(${camPosition})`
    : `translate(0, ${camPosition})`;
};

const getCameraAlign = (align: FlickingOptions["align"]) => {
  const alignVal = typeof align === "object"
    ? (align as { camera: string | number }).camera
    : align;

  return parseAlign(alignVal);
};

const getPanelAlign = (align: FlickingOptions["align"]) => {
  const alignVal = typeof align === "object"
    ? (align as { panel: string | number }).panel
    : align;

  return parseArithmeticExpression(parseAlign(alignVal));
};

const parseAlign = (alignVal: number | string) => {
  if (typeof alignVal === "number") {
    return `${alignVal}px`;
  }

  switch (alignVal) {
    case ALIGN.CENTER:
      return "50%";
    case ALIGN.NEXT:
      return "100%";
    case ALIGN.PREV:
      return "0%";
    default:
      return alignVal;
  }
};
