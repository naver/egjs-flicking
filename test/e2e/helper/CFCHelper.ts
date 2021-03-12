// eslint-disable-next-line @typescript-eslint/no-var-requires
const Helper = require("@codeceptjs/helper");

class CFCHelper extends Helper {
  public async amLoadingNativeFlicking() {
    const I = this.helpers.Playwright as CodeceptJS.I;

    await I.executeScript(this._load);
  }

  private _load = () => {
    const script = document.createElement("script");
    const stylesheet = document.createElement("link");

    script.setAttribute("type", "text/javascript");
    stylesheet.setAttribute("rel", "stylesheet");

    const loadScript = () => new Promise<void>((resolve, reject) => {
      script.addEventListener("load", () => {
        const flickingElements = document.querySelectorAll("flicking");
        flickingElements.forEach(el => {
          const viewportEl = document.createElement("div");
          const cameraEl = document.createElement("div");
          const panels = document.createDocumentFragment();

          [].slice.call(el.children).forEach((child: HTMLElement) => {
            panels.appendChild(child);
          });

          cameraEl.appendChild(panels);
          viewportEl.appendChild(cameraEl);

          cameraEl.classList.add("flicking-camera");
          viewportEl.classList.add("flicking-viewport");

          el.parentNode?.replaceChild(viewportEl, el);

          // @ts-expect-error
          new Flicking(viewportEl);
        });

        resolve();
      });

      script.addEventListener("error", e => {
        reject(e);
      });
      document.head.appendChild(script);

      script.src = "../../../dist/flicking.pkgd.js";
    });

    const loadStylesheet = () => new Promise<void>((resolve, reject) => {
      stylesheet.addEventListener("load", () => {
        resolve();
      });

      stylesheet.addEventListener("error", e => {
        reject(e);
      });

      document.head.appendChild(stylesheet);

      stylesheet.href = "../../../dist/flicking.css";
    });

    return Promise.all([loadScript(), loadStylesheet()]);
  };
}

export default CFCHelper;
module.exports = CFCHelper;
