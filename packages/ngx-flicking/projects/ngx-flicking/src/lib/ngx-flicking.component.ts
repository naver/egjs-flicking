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
  Status,
  SelectEvent,
  NeedPanelEvent,
  VisibleChangeEvent,
  HoldStartEvent,
  HoldEndEvent,
  MoveStartEvent,
  MoveEvent,
  MoveEndEvent,
  WillChangeEvent,
  ChangedEvent,
  WillRestoreEvent,
  RestoredEvent,
  ReadyEvent,
  BeforeResizeEvent,
  AfterResizeEvent,
  ReachEdgeEvent,
  PanelChangeEvent
} from "@egjs/flicking";
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

  @Output() public ready = new EventEmitter<ReadyEvent<NgxFlickingComponent>>();
  @Output() public beforeResize = new EventEmitter<BeforeResizeEvent<NgxFlickingComponent>>();
  @Output() public afterResize = new EventEmitter<AfterResizeEvent<NgxFlickingComponent>>();
  @Output() public holdStart = new EventEmitter<HoldStartEvent<NgxFlickingComponent>>();
  @Output() public holdEnd = new EventEmitter<HoldEndEvent<NgxFlickingComponent>>();
  @Output() public moveStart = new EventEmitter<MoveStartEvent<NgxFlickingComponent>>();
  @Output() public move = new EventEmitter<MoveEvent<NgxFlickingComponent>>();
  @Output() public moveEnd = new EventEmitter<MoveEndEvent<NgxFlickingComponent>>();
  @Output() public willChange = new EventEmitter<WillChangeEvent<NgxFlickingComponent>>();
  @Output() public changed = new EventEmitter<ChangedEvent<NgxFlickingComponent>>();
  @Output() public willRestore = new EventEmitter<WillRestoreEvent<NgxFlickingComponent>>();
  @Output() public restored = new EventEmitter<RestoredEvent<NgxFlickingComponent>>();
  @Output() public select = new EventEmitter<SelectEvent<NgxFlickingComponent>>();
  @Output() public needPanel = new EventEmitter<NeedPanelEvent<NgxFlickingComponent>>();
  @Output() public visibleChange = new EventEmitter<VisibleChangeEvent<NgxFlickingComponent>>();
  @Output() public reachEdge = new EventEmitter<ReachEdgeEvent<NgxFlickingComponent>>();
  @Output() public panelChange = new EventEmitter<PanelChangeEvent<NgxFlickingComponent>>();

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
      }
    };

    // This prevents mousemove to call ngDoCheck & noAfterContentChecked everytime
    const flicking = new VanillaFlicking(viewportEl, options);
    this._vanillaFlicking = flicking;

    if (!flicking.horizontal) {
      this._ngxRenderer.addClass(this._elRef.nativeElement, "vertical");
    }

    const elementDiffer = new ListDiffer(this._ngxPanels.toArray());
    this._elementDiffer = elementDiffer;

    this._bindEvents();
    this._checkPlugins();

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
