// window is undefined in node.js
const win = (typeof window !== "undefined")
  ? window
  : {
    document: {} as Document,
    navigator: { userAgent: "" } as Navigator,
  } as Window;

export { win as window };
export const document = window.document;
