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
  Renderer2,
  HostBinding
} from "@angular/core";
import VanillaFlicking, {
  FlickingOptions,
  FlickingEvents,
  sync,
  getDefaultCameraTransform,
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

import { EVENT_NAMES } from "./consts";
import FlickingInterface from "./FlickingInterface";
import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";
import NgxRenderer from "./NgxRenderer";

@Component({
  selector: "ngx-flicking, [NgxFlicking]",
  template: `
    <div class="flicking-camera" [ngStyle]="cameraStyleBeforeInit">
      <ng-content></ng-content>
    </div>
    <ng-content select="[in-viewport]"></ng-content>`,
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
  @Input() public hideBeforeInit: boolean = false;
  @Input() public firstPanelSize: string;
  @Output() public ready: EventEmitter<ReadyEvent<NgxFlickingComponent>>;
  @Output() public beforeResize: EventEmitter<BeforeResizeEvent<NgxFlickingComponent>>;
  @Output() public afterResize: EventEmitter<AfterResizeEvent<NgxFlickingComponent>>;
  @Output() public holdStart: EventEmitter<HoldStartEvent<NgxFlickingComponent>>;
  @Output() public holdEnd: EventEmitter<HoldEndEvent<NgxFlickingComponent>>;
  @Output() public moveStart: EventEmitter<MoveStartEvent<NgxFlickingComponent>>;
  @Output() public move: EventEmitter<MoveEvent<NgxFlickingComponent>>;
  @Output() public moveEnd: EventEmitter<MoveEndEvent<NgxFlickingComponent>>;
  @Output() public willChange: EventEmitter<WillChangeEvent<NgxFlickingComponent>>;
  @Output() public changed: EventEmitter<ChangedEvent<NgxFlickingComponent>>;
  @Output() public willRestore: EventEmitter<WillRestoreEvent<NgxFlickingComponent>>;
  @Output() public restored: EventEmitter<RestoredEvent<NgxFlickingComponent>>;
  @Output() public select: EventEmitter<SelectEvent<NgxFlickingComponent>>;
  @Output() public needPanel: EventEmitter<NeedPanelEvent<NgxFlickingComponent>>;
  @Output() public visibleChange: EventEmitter<VisibleChangeEvent<NgxFlickingComponent>>;
  @Output() public reachEdge: EventEmitter<ReachEdgeEvent<NgxFlickingComponent>>;
  @Output() public panelChange: EventEmitter<PanelChangeEvent<NgxFlickingComponent>>;

  @HostBinding("class.vertical") public get isVertical() {
    return this.options.horizontal === false;
  }

  @HostBinding("class.flicking-hidden") public get isHiddenBeforeInit() {
    const initialized = this._vanillaFlicking && this._vanillaFlicking.initialized;
    return this.hideBeforeInit && !initialized;
  }

  public get cameraStyleBeforeInit() {
    const initialized = this._vanillaFlicking && this._vanillaFlicking.initialized;
    return !initialized && this.firstPanelSize
      ? { transform: getDefaultCameraTransform(this.options.align, this.options.horizontal, this.firstPanelSize) }
      : {};
  }

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

    EVENT_NAMES.forEach(evtName => {
      this[evtName] = new EventEmitter();
    });
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
    EVENT_NAMES.forEach(evtName => {
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
