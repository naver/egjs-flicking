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
  SimpleChanges,
  ViewEncapsulation,
  ViewChild,
  NgZone,
  AfterViewChecked,
  DoCheck
} from "@angular/core";
import NativeFlicking, {
  FlickingOptions,
  FlickingEvents,
  EVENTS,
  sync,
  getRenderingPanels,
  Plugin,
  Status
} from "@egjs/flicking";
import { ComponentEvent } from "@egjs/component";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import * as uuid from "uuid";

import FlickingInterface from "./FlickingInterface";

export interface RenderPanelChangeEvent {
  visibles: any[];
}

@Component({
  selector: "ngx-flicking, [NgxFlicking]",
  template: `
    <div class="flicking-camera" #camera>
      <ng-content></ng-content>
    </div>`,
  host: {
    class: "flicking-viewport",
    "[class.vertical]": "_isVertical",
    style: "display: block;"
  },
  styleUrls: [
    "../../node_modules/@egjs/flicking/dist/flicking.css"
  ],
  encapsulation: ViewEncapsulation.None
})
export class NgxFlickingComponent extends FlickingInterface
  implements AfterViewInit, OnDestroy, OnChanges, AfterViewChecked, DoCheck {
  @Input() public options: Partial<FlickingOptions> = {};
  @Input() public plugins: Plugin[] = [];
  @Input() public status: Partial<Status> = {};
  @Input() public data: any[] = [];

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
  @Output() public renderPanelChange = new EventEmitter<RenderPanelChangeEvent>();

  @ViewChild("camera") private _cameraElRef: ElementRef<HTMLElement>;
  private _elRef: ElementRef<HTMLElement>;
  private _zone: NgZone;
  private _pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();
  private _elementDiffer: ListDiffer<string | number> | null = null;
  private _panelsDiffer: ListDiffer<any> | null = null;
  private _diffResult: DiffResult<any> | null = null;
  private _isVertical: boolean = false;
  /**
   * To prevent 'ExpressionChangedAfterItHasBeenCheckedError'
   * It would trigger above error if you changed the value after DOM operation is started. It makes unstable DOM tree.
   * So when it is in critical section(DOM updates), it should update the value asynchronously.
   *
   * Ref: https://indepth.dev/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error/
   */
  private _criticalSection = true;

  public constructor(elRef: ElementRef<HTMLElement>, zone: NgZone) {
    super();

    this._elRef = elRef;
    this._zone = zone;
    this._nativeFlicking = null;
  }

  public ngAfterViewInit() {
    const viewportEl = this._elRef.nativeElement;
    const options: Partial<FlickingOptions> = {
      ...this.options,
      renderExternal: true,
      useOffsetManipulator: true
    };

    // This prevents mousemove to call ngDoCheck & noAfterContentChecked everytime
    this._zone.runOutsideAngular(() => {
      this._nativeFlicking = new NativeFlicking(viewportEl, options);
      this._isVertical = !this._nativeFlicking.horizontal;
    });
    this._elementDiffer = new ListDiffer(this._getChildKeys());
    this._panelsDiffer = new ListDiffer(this.data);

    this._bindEvents();
    this._checkPlugins();

    const flicking = this._nativeFlicking;

    if (flicking.initialized) {
      this.ready.emit({ ...new ComponentEvent(EVENTS.READY), currentTarget: this });
    }

    if (this.status) {
      flicking.setStatus(this.status);
    }

    if (this.options.renderOnlyVisible) {
      this._reRender();
    }
  }

  public ngOnDestroy() {
    if (!this._nativeFlicking) return;

    this._nativeFlicking.destroy();
  }

  public ngOnChanges(changes: SimpleChanges) {
    const flicking = this._nativeFlicking;
    if (!flicking) return;

    if (changes.data && !changes.data.firstChange) {
      const diffResult = this._panelsDiffer.update(this.data);

      this.renderPanelChange.emit({
        visibles: getRenderingPanels(flicking, diffResult)
      });

      this._diffResult = diffResult;
    }

    this._checkPlugins();
  }

  public ngDoCheck() {
    this._criticalSection = true;
  }

  public ngAfterViewChecked() {
    this._criticalSection = false;
  }

  public ngAfterContentChecked() {
    if (!this._elementDiffer) return;

    const flicking = this._nativeFlicking;
    const options = this.options;
    const diffResult = this.options.renderOnlyVisible
      ? this._diffResult
      : this._elementDiffer.update(this._getChildKeys());

    if (!diffResult) return;

    if (options.renderOnlyVisible) {
      flicking.off(EVENTS.VISIBLE_CHANGE, this._reRender);
    }

    sync(flicking, diffResult);

    if (options.renderOnlyVisible) {
      this._reRender();
      flicking.on(EVENTS.VISIBLE_CHANGE, this._reRender);
    }

    this._checkPlugins();
    this._diffResult = null;
  }

  private _bindEvents() {
    const flicking = this._nativeFlicking;
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

    if (this.options.renderOnlyVisible) {
      flicking.on(EVENTS.VISIBLE_CHANGE, this._reRender);
    }
  }

  private _checkPlugins() {
    const flicking = this._nativeFlicking;
    if (!flicking) return;

    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.plugins);

    flicking.addPlugins(...added.map(index => list[index]));
    flicking.removePlugins(...removed.map(index => prevList[index]));
  }

  private _getChildKeys() {
    // Fill keys if not exist
    const children = ([].slice.apply(this._cameraElRef.nativeElement.children) as HTMLElement[])
      .filter(node => node.nodeType === Node.ELEMENT_NODE);
    /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
    children.forEach(child => {
      if (!(child as any).__NGX_FLICKING_KEY__) {
        (child as any).__NGX_FLICKING_KEY__ =  uuid.v4();
      }
    });

    return children.map(child => (child as any).__NGX_FLICKING_KEY__);
    /* eslint-enable */
  }

  private _reRender = () => {
    const flicking = this._nativeFlicking;
    const visiblePanels = flicking.visiblePanels;

    const renderChangeEvent = {
      visibles: visiblePanels
        .sort((panel1, panel2) => (panel1.position + panel1.offset) - (panel2.position + panel2.offset))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .map(panel => this.data[panel.index])
    };

    if (Promise) {
      void Promise.resolve().then(() => {
        this.renderPanelChange.emit(renderChangeEvent);
      });
      return;
    }

    // If Promise is not supported (IE)
    if (this._criticalSection) {
      setTimeout(() => {
        // This works OK but it may cause blink when panel is appended or added
        this.renderPanelChange.emit(renderChangeEvent);
      });
    } else {
      this.renderPanelChange.emit(renderChangeEvent);
    }
  };
}
