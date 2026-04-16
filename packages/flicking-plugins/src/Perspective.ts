/* eslint-disable no-underscore-dangle */
import Flicking, { EVENTS, Plugin } from "@egjs/flicking";

/**
 * Options for the {@link Perspective} plugin
 */
export interface PerspectiveOptions {
  /**
   * CSS selector for the element to apply the perspective effect. If empty, the panel element itself is used
   * @defaultValue ""
   */
  selector: string;
  /**
   * Effect amplification scale
   * @defaultValue 1
   */
  scale: number;
  /**
   * Rotation amplification scale
   * @defaultValue 1
   */
  rotate: number;
  /**
   * The value of the CSS `perspective` property (px)
   * @defaultValue 1000
   */
  perspective: number;
}

/**
 * A plugin to apply 3D perspective effect while panels are moving
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/plugins/perspective | Demo: Perspective}
 */
class Perspective implements Plugin {
  private _flicking: Flicking | null;

  /* Options  */
  private _selector: PerspectiveOptions["selector"];
  private _scale: PerspectiveOptions["scale"];
  private _rotate: PerspectiveOptions["rotate"];
  private _perspective: PerspectiveOptions["perspective"];

  /** Current value of the {@link PerspectiveOptions.selector | selector} option. */
  public get selector() {
    return this._selector;
  }
  /** Current value of the {@link PerspectiveOptions.scale | scale} option. */
  public get scale() {
    return this._scale;
  }
  /** Current value of the {@link PerspectiveOptions.rotate | rotate} option. */
  public get rotate() {
    return this._rotate;
  }
  /** Current value of the {@link PerspectiveOptions.perspective | perspective} option. */
  public get perspective() {
    return this._perspective;
  }

  /** Sets {@link PerspectiveOptions.selector | selector}. */
  public set selector(val: string) {
    this._selector = val;
  }
  /** Sets {@link PerspectiveOptions.scale | scale}. */
  public set scale(val: number) {
    this._scale = val;
  }
  /** Sets {@link PerspectiveOptions.rotate | rotate}. */
  public set rotate(val: number) {
    this._rotate = val;
  }
  /** Sets {@link PerspectiveOptions.perspective | perspective}. */
  public set perspective(val: number) {
    this._perspective = val;
  }

  /**
   * @param options - Options for the Perspective instance
   * @example
   * ```ts
   * flicking.addPlugins(new Perspective({ selector: "p", scale: 1, rotate: 1, perspective: 1000 }));
   * ```
   */
  public constructor(options: Partial<PerspectiveOptions> = {}) {
    const { selector = "", scale = 1, rotate = 1, perspective = 1000 } = options;

    this._flicking = null;
    this._selector = selector;
    this._scale = scale;
    this._rotate = rotate;
    this._perspective = perspective;
  }

  /** Initialize the plugin and apply the perspective effect to the Flicking instance.
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

  /** Recalculate and apply the perspective effect to all visible panels. */
  public update = (): void => {
    this._onMove();
  };

  private _onMove = (): void => {
    const flicking = this._flicking;
    const selector = this._selector;
    const scale = this._scale;
    const rotate = this._rotate;
    const perspective = this._perspective;

    if (!flicking) return;

    const horizontal = flicking.horizontal;
    const panels = flicking.visiblePanels;

    panels.forEach(panel => {
      const progress = panel.outsetProgress;
      const el = panel.element;
      const target = selector ? (el.querySelector(selector) as HTMLElement) : el;
      const panelScale = 1 / (Math.abs(progress * scale) + 1);
      const rotateDegree =
        progress > 0 ? Math.min(90, progress * 100 * rotate) : Math.max(-90, progress * 100 * rotate);
      const [rotateX, rotateY] = horizontal ? [0, rotateDegree] : [rotateDegree, 0];

      target.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${panelScale})`;
    });
  };
}

export default Perspective;
