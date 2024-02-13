/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import {
  Component,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
  QueryList,
  ContentChildren,
  Renderer2,
  Inject,
  PLATFORM_ID,
  NgZone,
  input,
  computed,
  inject,
  ChangeDetectionStrategy,
  effect,
  DestroyRef,
} from '@angular/core';
import { DOCUMENT, NgClass, NgStyle, isPlatformServer } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
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
    <div [ngClass]="cameraElClass()" [ngStyle]="cameraStyleBeforeInit()">
      <ng-content></ng-content>
    </div>
    <ng-content select="[in-viewport]"></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flicking-viewport',
    style: 'display: block;',
    '[class.vertical]': 'isVertical()',
    '[class.flicking-hidden]': 'isHiddenBeforeInit()'
  },
  styleUrl: "../../../../node_modules/@egjs/flicking/dist/flicking.css",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgClass, NgStyle],
})
export class NgxFlickingComponent
  extends FlickingInterface
  implements AfterViewInit
{
  public options = input<Partial<FlickingOptions>>({});
  public plugins = input<Plugin[]>([])
  public status = input<Status>();
  public cameraClass = input<string>();
  public hideBeforeInit = input(false);
  public firstPanelSize = input<string>();

  @Output() public ready!: EventEmitter<ReadyEvent<NgxFlickingComponent>>;
  @Output() public beforeResize!: EventEmitter<BeforeResizeEvent<NgxFlickingComponent>>;
  @Output() public afterResize!: EventEmitter<AfterResizeEvent<NgxFlickingComponent>>;
  @Output() public holdStart!: EventEmitter<HoldStartEvent<NgxFlickingComponent>>;
  @Output() public holdEnd!: EventEmitter<HoldEndEvent<NgxFlickingComponent>>;
  @Output() public moveStart!: EventEmitter<MoveStartEvent<NgxFlickingComponent>>;
  @Output() public move!: EventEmitter<MoveEvent<NgxFlickingComponent>>;
  @Output() public moveEnd!: EventEmitter<MoveEndEvent<NgxFlickingComponent>>;
  @Output() public willChange!: EventEmitter<WillChangeEvent<NgxFlickingComponent>>;
  @Output() public changed!: EventEmitter<ChangedEvent<NgxFlickingComponent>>;
  @Output() public willRestore!: EventEmitter<WillRestoreEvent<NgxFlickingComponent>>;
  @Output() public restored!: EventEmitter<RestoredEvent<NgxFlickingComponent>>;
  @Output() public select!: EventEmitter<SelectEvent<NgxFlickingComponent>>;
  @Output() public needPanel!: EventEmitter<NeedPanelEvent<NgxFlickingComponent>>;
  @Output() public visibleChange!: EventEmitter<VisibleChangeEvent<NgxFlickingComponent>>;
  @Output() public reachEdge!: EventEmitter<ReachEdgeEvent<NgxFlickingComponent>>;
  @Output() public panelChange!: EventEmitter<PanelChangeEvent<NgxFlickingComponent>>;

  readonly isVertical = computed(() => this.options().horizontal === false);

  readonly isHiddenBeforeInit = computed(() => {
    const initialized = this._vanillaFlicking?.initialized;
    return this.hideBeforeInit() && !initialized;
  });

  readonly cameraStyleBeforeInit = computed(() => {
    const initialized = this._vanillaFlicking?.initialized;
    const { align, horizontal } = this.options();
    const firstPanelSize = this.firstPanelSize();

    if (!initialized && firstPanelSize) {
      return {
        transform: getDefaultCameraTransform(
          align,
          horizontal,
          firstPanelSize
        ),
      };
    } else {
      return {};
    }
  });

  @ContentChildren(NgxFlickingPanel) private _ngxPanels!: QueryList<NgxFlickingPanel>;
  private _pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();

  public get ngxPanels() { return this._ngxPanels; }

  readonly cameraElClass = computed(() => {
    const cameraClass = this.cameraClass();
    return `flicking-camera ${cameraClass ?? ''}`.trim();
  });

  private _document = inject(DOCUMENT);
  private _destroyRef = inject(DestroyRef);

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

    if (isPlatformServer(this._platformId)) return;

    effect(() => {
      // Read it immediately as thus the effect consumer would be able to
      // catch the signal producer.
      const options = this.options();

      const flicking = this._vanillaFlicking;
      if (!flicking) return;

      this._ngZone.runOutsideAngular(() => {
        void flicking.renderer.forceRenderAllPanels();
      });

      // Omit 'virtual', as it can't have any setter
      const { virtual, ...newOptions } = options;
      for (const key in newOptions) {
        const typedKey = key as keyof typeof newOptions;
        if (typedKey in flicking && flicking[typedKey] !== newOptions[typedKey]) {
          // Cast to `any` is required because there're readonly keys on the
          // `VanillaFlicking` interface.
          (flicking as any)[key] = newOptions[typedKey];
        }
      }

      this._checkPlugins();
    });

    this._destroyRef.onDestroy(() => this._vanillaFlicking?.destroy());
  }

  public ngAfterViewInit() {
    if (isPlatformServer(this._platformId)) return;

    const options = this.options();
    const viewportEl = this._elRef.nativeElement;
    const virtual = options.virtual && (options.panelsPerView || 0) > 0;
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
      ...options,
      externalRenderer: new NgxRenderer(rendererOptions)
    }));
    this._vanillaFlicking = flicking;

    const elementDiffer = new ListDiffer(this._ngxPanels.toArray());

    this._bindEvents();
    this._checkPlugins();

    const status = this.status();
    if (status) {
      flicking.setStatus(status);
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

  private _bindEvents() {
    const flicking = this._vanillaFlicking!;

    EVENT_NAMES.forEach(evtName => {
      // `fromEvent` supports passing `JQueryStyleEventEmitter`
      // (an object with `on` and `off` methods). `flicking` acts as a
      // jQuery event emitter since it has both methods.
      fromEvent<ComponentEvent>(flicking, evtName)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((e) => {
          // Style guide: Event - https://angular.io/guide/styleguide#dont-prefix-output-properties
          const emitter = this[evtName] as any as EventEmitter<FlickingEvents[typeof evtName]>;

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

    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.plugins());

    flicking.addPlugins(...added.map(index => list[index]));
    flicking.removePlugins(...removed.map(index => prevList[index]));
  }

  private _initVirtualElements() {
    const options = this.options();
    const renderer = this._ngxRenderer;
    const cameraElement = this._elRef.nativeElement.firstElementChild;
    const panelsPerView = options.panelsPerView!;
    const virtual = options.virtual!;
    const fragment = this._document.createDocumentFragment();

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
