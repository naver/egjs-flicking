// eslint-disable-next-line @typescript-eslint/no-var-requires
const Helper = require("@codeceptjs/helper");

class CFCHelper extends Helper {
  public async amLoadingNativeFlicking() {
    const I = this.helpers.Playwright as CodeceptJS.I;

    await I.executeScript(this._loadNative);
  }

  public async amLoadingReactFlicking() {
    const I = this.helpers.Playwright as CodeceptJS.I;

    await I.executeScript(this._loadReact);
  }

  private _loadNative = () => {
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

  private _loadReact = async () => {
    const loadScript = async (src: string) => new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");

      script.setAttribute("type", "text/javascript");

      script.addEventListener("load", () => {
        resolve();
      });

      script.addEventListener("error", e => {
        reject(e);
      });

      document.head.appendChild(script);
      script.src = src;
    });

    await Promise.all([
      loadScript("../../../packages/react-flicking/node_modules/react/umd/react.production.min.js"),
      loadScript("../../../packages/react-flicking/node_modules/react-dom/umd/react-dom.production.min.js")
    ]);

    // @ts-expect-error
    ReactDOM.render(
      document.getElementById("flicking-container")!.innerHTML,
      document.getElementById("flicking-container")
    );
  };
}

export default CFCHelper;
module.exports = CFCHelper;
