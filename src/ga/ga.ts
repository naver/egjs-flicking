import { isBrowser } from "../consts";

const tid = "UA-70842526-24";
const cid = (Math.random() * Math.pow(10, 20)) / Math.pow(10, 10);

export function sendEvent(category: string, action: string, label: any) {
  if (!isBrowser) {
    return;
  }

  try {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const screen = window.screen || { width: innerWidth, height: innerHeight };
    const collectInfos = [
      "v=1",
      "t=event",
      `dl=${location.href}`,
      `ul=${(navigator.language || "en-us").toLowerCase()}`,
      `de=${document.charset || document.inputEncoding || document.characterSet || "utf-8"}`,
      `dr=${document.referrer}`,
      `dt=${document.title}`,
      `sr=${screen.width}x${screen.height}`,
      `vp=${innerWidth}x${innerHeight}`,
      `ec=${category}`,
      `ea=${action}`,
      `el=${JSON.stringify(label)}`,
      `cid=${cid}`,
      `tid=${tid}`,
      "cd1=#__VERSION__#",
      `z=${Math.floor(Math.random() * 10000000)}`,
    ];
    const req = new XMLHttpRequest();
    req.open("GET", `https://www.google-analytics.com/collect?${collectInfos.join("&")}`);
    req.send();
  } catch (e) {}
}
