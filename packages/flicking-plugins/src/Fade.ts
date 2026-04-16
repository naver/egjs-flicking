import Flicking, { EVENTS, Plugin } from "@egjs/flicking";

/**
 * A plugin to apply fade in/out effect while panels are moving
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/plugins/fade | Demo: Fade}
 */
class Fade implements Plugin {
  private _flicking: Flicking | null;

  /* Options  */
  private _selector: string;
  private _scale: number;

  /** CSS selector for the element to apply the fade effect. If empty, the panel element itself is used
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

  /** Sets the CSS selector for the target fade element. */
  public set selector(val: string) {
    this._selector = val;
  }
  /** Sets the effect amplification scale. */
  public set scale(val: number) {
    this._scale = val;
  }

  /**
   * @param selector - CSS selector for the element to apply the fade effect. If empty, the panel element itself is used
   * @param scale - Effect amplification scale
   * @example
   * ```ts
   * flicking.addPlugins(new Fade("p", 1));
   * ```
   */
  public constructor(selector = "", scale = 1) {
    this._flicking = null;
    this._selector = selector;
    this._scale = scale;
  }

  /** Initialize the plugin and apply the fade effect to the Flicking instance.
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

  /** Recalculate and apply the fade effect to all visible panels. */
  public update = (): void => {
    this._onMove();
  };

  private _onMove = (): void => {
    const flicking = this._flicking;
    const selector = this._selector;
    const scale = this._scale;

    if (!flicking) return;

    const panels = flicking.visiblePanels;

    panels.forEach(panel => {
      const progress = panel.outsetProgress;
      const el = panel.element;
      const target = selector ? (el.querySelector(selector) as HTMLElement) : el;

      if (target) {
        const opacity = Math.min(1, Math.max(0, 1 - Math.abs(progress * scale)));
        target.style.opacity = `${opacity}`;
      }
    });
  };
}

export default Fade;
