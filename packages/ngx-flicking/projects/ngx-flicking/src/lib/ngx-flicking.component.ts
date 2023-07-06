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
  HostBinding,
  Inject,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  PanelChangeEvent,
  VirtualRenderingStrategy,
  NormalRenderingStrategy,
  range,
  CLASS,
} from '@egjs/flicking';
import ListDiffer from '@egjs/list-differ';
import { ComponentEvent } from '@egjs/component';

import { EVENT_NAMES } from './consts';
import FlickingInterface from './FlickingInterface';
import { NgxFlickingPanel } from './ngx-flicking-panel.directive';
import NgxRenderer, { NgxRendererOptions } from './NgxRenderer';
import NgxElementProvider from './NgxElementProvider';

@Component({
  selector: 'ngx-flicking, [NgxFlicking]',
  template: `
    <div [ngClass]="_cameraElClass" [ngStyle]="cameraStyleBeforeInit">
      <ng-content></ng-content>
    </div>
    <ng-content select="[in-viewport]"></ng-content>`,
  host: {
    class: 'flicking-viewport',
    style: 'display: block;',
  },
  styleUrls: [
    "../../node_modules/@egjs/flicking/dist/flicking.css"
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class NgxFlickingComponent
  extends FlickingInterface
  implements AfterViewInit, OnDestroy, OnChanges
{
  @Input() public options: Partial<FlickingOptions> = {};
  @Input() public plugins: Plugin[] = [];
  @Input() public status: Status;
  @Input() public cameraClass: string;
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
  private _pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();

  public get ngxPanels() { return this._ngxPanels; }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public get _cameraElClass() { return `flicking-camera ${this.cameraClass ?? ""}`.trim(); }

  private _destroy$ = new Subject<void>();

  public constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _ngxRenderer: Renderer2,
    @Inject(PLATFORM_ID) private _platformId: string,
    private _ngZone: NgZone,
  ) {
    super();

    this._vanillaFlicking = null;

    EVENT_NAMES.forEach(evtName => {
      this[evtName] = new EventEmitter();
    });
  }

  public ngAfterViewInit() {
    if (!isPlatformBrowser(this._platformId)) return;

    const options = this.options;
    const viewportEl = this._elRef.nativeElement;
    const virtual = options.virtual && options.panelsPerView > 0;
    const rendererOptions: NgxRendererOptions = {
      ngxFlicking: this,
      align: options.align,
      ngxRenderer: this._ngxRenderer,
      strategy: virtual
        ? new VirtualRenderingStrategy()
        : new NormalRenderingStrategy({
          providerCtor: NgxElementProvider
        })
    };

    if (virtual) {
      this._initVirtualElements();
    }

    // Initialize `VanillaFlicking` outside of the Angular zone so it will set up `mousedown`
    // and `mousemove` event listeners within the root zone, and it won't trigger change detection
    // every time the user moves the mouse.
    const flicking = this._ngZone.runOutsideAngular(() => new VanillaFlicking(viewportEl, {
      ...this.options,
      externalRenderer: new NgxRenderer(rendererOptions)
    }));
    this._vanillaFlicking = flicking;

    const elementDiffer = new ListDiffer(this._ngxPanels.toArray());

    this._bindEvents();
    this._checkPlugins();

    if (this.status) {
      flicking.setStatus(this.status);
    }

    // Note: doesn't need to unsubscribe, because `changes`
    // gets completed by Angular when the view is destroyed.
    this._ngxPanels.changes.subscribe(() => {
      const panels = this._ngxPanels.toArray();
      const diffResult = elementDiffer.update(panels);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sync(flicking, diffResult, [...diffResult.maintained.map(([_, idx]) => diffResult.list[idx]), ...diffResult.added.map(idx => diffResult.list[idx])]);
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._vanillaFlicking?.destroy();
  }

  public ngOnChanges() {
    const flicking = this._vanillaFlicking;
    if (!flicking) return;

    this._ngZone.runOutsideAngular(() => {
      void flicking.renderer.forceRenderAllPanels();
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { virtual, ...newOptions } = this.options;

    // Omit 'virtual', as it can't have any setter
    for (const key in newOptions) {
      if (key in flicking && flicking[key] !== newOptions[key]) {
        flicking[key] = newOptions[key];
      }
    }

    this._checkPlugins();
  }

  private _bindEvents() {
    const flicking = this._vanillaFlicking!;

    EVENT_NAMES.forEach(evtName => {
      // `fromEvent` supports passing `JQueryStyleEventEmitter`
      // (an object with `on` and `off` methods). `flicking` acts as a
      // jQuery event emitter since it has both methods.
      fromEvent<ComponentEvent>(flicking, evtName)
        .pipe(takeUntil(this._destroy$))
        .subscribe((e) => {
          // Style guide: Event - https://angular.io/guide/styleguide#dont-prefix-output-properties
          const emitter = this[evtName] as EventEmitter<FlickingEvents[typeof evtName]>;

          e.currentTarget = this;

          if (emitter && emitter.observers.length > 0) {
            this._ngZone.run(() => emitter.emit(e as FlickingEvents[typeof evtName]));
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

  private _initVirtualElements() {
    const options = this.options;
    const renderer = this._ngxRenderer;
    const cameraElement = this._elRef.nativeElement.firstElementChild;
    const panelsPerView = options.panelsPerView!;
    const virtual = options.virtual!;
    const fragment = document.createDocumentFragment();

    const newElements = range(panelsPerView + 1).map(idx => {
      const panelEl = renderer.createElement("div");
      panelEl.className = virtual.panelClass ?? CLASS.DEFAULT_VIRTUAL;
      panelEl.dataset.elementIndex = idx.toString();
      return panelEl;
    });

    newElements.forEach(el => {
      fragment.appendChild(el);
    });

    renderer.appendChild(cameraElement, fragment);
  }
}
