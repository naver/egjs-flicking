/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy,
  ViewEncapsulation,
  QueryList,
  ContentChildren,
  Renderer2
} from "@angular/core";
import VanillaFlicking, {
  FlickingOptions,
  FlickingEvents,
  EVENTS,
  sync,
  Plugin,
  Status
} from "@egjs/flicking";
import { ComponentEvent } from "@egjs/component";
import ListDiffer from "@egjs/list-differ";

import FlickingInterface from "./FlickingInterface";
import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";
import NgxRenderer from "./NgxRenderer";

@Component({
  selector: "ngx-flicking, [NgxFlicking]",
  template: `
    <div class="flicking-camera">
      <ng-content></ng-content>
    </div>`,
  host: {
    class: "flicking-viewport",
    style: "display: block;"
  },
  styleUrls: [
    "../../node_modules/@egjs/flicking/dist/flicking.css"
  ],
  encapsulation: ViewEncapsulation.None
})
export class NgxFlickingComponent extends FlickingInterface
  implements AfterViewInit, OnDestroy, OnChanges {
  @Input() public options: Partial<FlickingOptions> = {};
  @Input() public plugins: Plugin[] = [];
  @Input() public status: Status;

  @Output() public ready = new EventEmitter<FlickingEvents[typeof EVENTS.READY]>();
  @Output() public beforeResize = new EventEmitter<FlickingEvents[typeof EVENTS.BEFORE_RESIZE]>();
  @Output() public afterResize = new EventEmitter<FlickingEvents[typeof EVENTS.AFTER_RESIZE]>();
  @Output() public holdStart = new EventEmitter<FlickingEvents[typeof EVENTS.HOLD_START]>();
  @Output() public holdEnd = new EventEmitter<FlickingEvents[typeof EVENTS.HOLD_END]>();
  @Output() public moveStart = new EventEmitter<FlickingEvents[typeof EVENTS.MOVE_START]>();
  @Output() public move = new EventEmitter<FlickingEvents[typeof EVENTS.MOVE]>();
  @Output() public moveEnd = new EventEmitter<FlickingEvents[typeof EVENTS.MOVE_END]>();
  @Output() public willChange = new EventEmitter<FlickingEvents[typeof EVENTS.WILL_CHANGE]>();
  @Output() public changed = new EventEmitter<FlickingEvents[typeof EVENTS.CHANGED]>();
  @Output() public willRestore = new EventEmitter<FlickingEvents[typeof EVENTS.WILL_RESTORE]>();
  @Output() public restored = new EventEmitter<FlickingEvents[typeof EVENTS.RESTORED]>();
  @Output() public select = new EventEmitter<FlickingEvents[typeof EVENTS.SELECT]>();
  @Output() public needPanel = new EventEmitter<FlickingEvents[typeof EVENTS.NEED_PANEL]>();
  @Output() public visibleChange = new EventEmitter<FlickingEvents[typeof EVENTS.VISIBLE_CHANGE]>();
  @Output() public reachEdge = new EventEmitter<FlickingEvents[typeof EVENTS.REACH_EDGE]>();

  @ContentChildren(NgxFlickingPanel) private _ngxPanels: QueryList<NgxFlickingPanel>;
  private _elRef: ElementRef<HTMLElement>;
  private _ngxRenderer: Renderer2;
  private _pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();
  private _elementDiffer: ListDiffer<NgxFlickingPanel> | null = null;

  public get ngxPanels() { return this._ngxPanels; }

  public constructor(elRef: ElementRef<HTMLElement>, renderer: Renderer2) {
    super();

    this._elRef = elRef;
    this._ngxRenderer = renderer;
    this._vanillaFlicking = null;
  }

  public ngAfterViewInit() {
    const viewportEl = this._elRef.nativeElement;
    const options: Partial<FlickingOptions> = {
      ...this.options,
      renderExternal: {
        renderer: NgxRenderer,
        rendererOptions: { ngxFlicking: this, ngxRenderer: this._ngxRenderer }
      },
      useOrderManipulator: true
    };

    // This prevents mousemove to call ngDoCheck & noAfterContentChecked everytime
    this._vanillaFlicking = new VanillaFlicking(viewportEl, options);

    if (!this._vanillaFlicking.horizontal) {
      this._ngxRenderer.addClass(this._elRef.nativeElement, "vertical");
    }

    const elementDiffer = new ListDiffer(this._ngxPanels.toArray());
    this._elementDiffer = elementDiffer;

    this._bindEvents();
    this._checkPlugins();

    const flicking = this._vanillaFlicking;

    if (flicking.initialized) {
      this.ready.emit({ ...new ComponentEvent(EVENTS.READY), currentTarget: this });
    }

    if (this.status) {
      flicking.setStatus(this.status);
    }

    this._ngxPanels.changes.subscribe(() => {
      const panels = this._ngxPanels.toArray();
      const diffResult = this._elementDiffer.update(panels);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sync(flicking, diffResult, [...diffResult.maintained.map(([_, idx]) => diffResult.list[idx]), ...diffResult.added.map(idx => diffResult.list[idx])]);
    });
  }

  public ngOnDestroy() {
    if (!this._vanillaFlicking) return;

    this._vanillaFlicking.destroy();
  }

  public ngOnChanges() {
    const flicking = this._vanillaFlicking;
    if (!flicking) return;

    void this._vanillaFlicking.renderer.forceRenderAllPanels();
    this._checkPlugins();
  }

  private _bindEvents() {
    const flicking = this._vanillaFlicking;
    const events = Object.keys(EVENTS).map((key: keyof typeof EVENTS) => EVENTS[key]);

    events.forEach(evtName => {
      flicking.on(evtName, e => {
        // Style guide: Event - https://angular.io/guide/styleguide#dont-prefix-output-properties
        const emitter = this[evtName] as EventEmitter<FlickingEvents[typeof evtName]>;

        e.currentTarget = this;

        if (emitter) {
          emitter.emit(e);
        }
      });
    });
  }

  private _checkPlugins() {
    const flicking = this._vanillaFlicking;
    if (!flicking) return;

    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.plugins);

    flicking.addPlugins(...added.map(index => list[index]));
    flicking.removePlugins(...removed.map(index => prevList[index]));
  }
}
