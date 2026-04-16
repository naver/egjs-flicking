import Flicking, { EVENTS, Plugin } from "@egjs/flicking";

/**
 * A plugin to apply parallax effect while panels are moving
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/plugins/parallax | Demo: Parallax}
 */
class Parallax implements Plugin {
  private _flicking: Flicking | null;

  /* Options  */
  private _selector: string;
  private _scale: number;

  /** CSS selector for the element to apply the parallax effect. If empty, the panel element itself is used
   * @readonly
   */
  public get selector() {
    return this._selector;
  }
  /** Effect amplification scale
   * @readonly
   */
  public get scale() {
    return this._scale;
  }

  /** Sets the CSS selector for the target parallax element. */
  public set selector(val: string) {
    this._selector = val;
  }
  /** Sets the effect amplification scale. */
  public set scale(val: number) {
    this._scale = val;
  }

  /**
   * @param selector - CSS selector for the element to apply the parallax effect. If empty, the panel element itself is used
   * @param scale - Effect amplification scale
   * @example
   * ```ts
   * flicking.addPlugins(new Parallax("img", 1));
   * ```
   */
  public constructor(selector = "", scale = 1) {
    this._flicking = null;
    this._selector = selector;
    this._scale = scale;
  }

  /** Initialize the plugin and apply the parallax effect to the Flicking instance.
   * @param flicking - The Flicking instance to attach this plugin to
   */
  public init(flicking: Flicking): void {
    if (this._flicking) {
      this.destroy();
    }

    this._flicking = flicking;

    flicking.on(EVENTS.MOVE, this._onMove);
    flicking.on(EVENTS.AFTER_RESIZE, this.update);
    this._onMove();
  }

  /** Destroy the plugin and remove all event listeners. */
  public destroy(): void {
    if (!this._flicking) return;

    this._flicking.off(EVENTS.MOVE, this._onMove);
    this._flicking.off(EVENTS.AFTER_RESIZE, this.update);
    this._flicking = null;
  }

  /** Recalculate and apply the parallax effect to all visible panels. */
  public update = (): void => {
    this._onMove();
  };

  private _onMove = (): void => {
    const flicking = this._flicking;

    if (!flicking) return;

    const panels = flicking.visiblePanels;

    panels.forEach(panel => {
      const progress = panel.outsetProgress;
      const el = panel.element;
      const target = this._selector ? (el.querySelector(this._selector) as HTMLElement) : el;
      const parentTarget = target.parentNode as Element;
      const rect = target.getBoundingClientRect();
      const parentRect = parentTarget.getBoundingClientRect();
      const position = ((parentRect.width - rect.width) / 2) * progress * this._scale;
      const transform = `translate(-50%) translate(${position}px)`;
      const style = target.style;

      style.cssText += `transform: ${transform};-webkit-transform: ${transform};-ms-transform:${transform}`;
    });
  };
}
export default Parallax;
