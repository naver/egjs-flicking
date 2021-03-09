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
  NgZone
} from "@angular/core";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import * as uuid from "uuid";

import NativeFlicking, {
  FlickingOptions,
  FlickingEvents,
  EVENTS
} from "~/index";

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
    style: "display: block;"
  },
  styleUrls: [
    "../../../../node_modules/@egjs/flicking/dist/flicking.css"
  ],
  encapsulation: ViewEncapsulation.None
})
export class NgxFlickingComponent
implements AfterViewInit, OnDestroy, OnChanges {
  @Input() public options: Partial<FlickingOptions> = {};
  @Input() public plugins: Plugin[] = [];
  @Input() public panels: any[] = [];

  @Output() public ready = new EventEmitter<FlickingEvents[typeof EVENTS.READY]>();
  @Output() public beforeResize = new EventEmitter<FlickingEvents[typeof EVENTS.BEFORE_RESIZE]>();
  @Output() public afterResize = new EventEmitter<FlickingEvents[typeof EVENTS.AFTER_RESIZE]>();
  @Output() public holdStart = new EventEmitter<FlickingEvents[typeof EVENTS.HOLD_START]>();
  @Output() public holdEnd = new EventEmitter<FlickingEvents[typeof EVENTS.HOLD_END]>();
  @Output() public moveStart = new EventEmitter<FlickingEvents[typeof EVENTS.MOVE_START]>();
  @Output() public move = new EventEmitter<FlickingEvents[typeof EVENTS.MOVE]>();
  @Output() public moveEnd = new EventEmitter<FlickingEvents[typeof EVENTS.MOVE_END]>();
  @Output() public change = new EventEmitter<FlickingEvents[typeof EVENTS.CHANGE]>();
  @Output() public restore = new EventEmitter<FlickingEvents[typeof EVENTS.RESTORE]>();
  @Output() public select = new EventEmitter<FlickingEvents[typeof EVENTS.SELECT]>();
  @Output() public needPanel = new EventEmitter<FlickingEvents[typeof EVENTS.NEED_PANEL]>();
  @Output() public visibleChange = new EventEmitter<FlickingEvents[typeof EVENTS.VISIBLE_CHANGE]>();
  @Output() public reachEdge = new EventEmitter<FlickingEvents[typeof EVENTS.REACH_EDGE]>();
  @Output() public renderPanelChange = new EventEmitter<RenderPanelChangeEvent>();

  @ViewChild("camera") private _camera: ElementRef<HTMLElement>;
  private _elRef: ElementRef<HTMLDivElement>;
  private _zone: NgZone;
  private _nativeFlicking: NativeFlicking | null;
  private _pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();
  private _elementDiffer: ListDiffer<string | number> | null = null;
  private _panelsDiffer: ListDiffer<any> | null = null;
  private _diffResult: DiffResult<any> | null = null;
  /**
   * To prevent 'ExpressionChangedAfterItHasBeenCheckedError'
   * It would trigger above error if you changed the value after DOM operation is started. It makes unstable DOM tree.
   * So when it is in critical section(DOM updates), it should update the value asynchronously.
   *
   * Ref: https://indepth.dev/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error/
   */
  private criticalSection = true;

  public constructor(elRef: ElementRef, zone: NgZone) {
    this._elRef = elRef;
    this._zone = zone;
    this._nativeFlicking = null;
  }

  public ngAfterViewInit() {
    const viewportEl = this._elRef.nativeElement as HTMLElement;
    const options: Partial<FlickingOptions> = {
      ...this.options,
      renderExternal: true,
      useOffsetManipulator: true
    };

    // This prevents mousemove to call ngDoCheck & noAfterContentChecked everytime
    this._zone.runOutsideAngular(() => {
      this._nativeFlicking = new NativeFlicking(viewportEl, options);
    });
    this._elementDiffer = new ListDiffer(this._getChildKeys());
    this._panelsDiffer = new ListDiffer(this.panels);

    this._bindEvents();
    this._checkPlugins();

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

    if (changes.panels && !changes.panels.firstChange) {
      const diffResult = this._panelsDiffer.update(this.panels);

      const removedPanels = diffResult.removed.reduce((map, idx) => {
        map[idx] = true;
        return map;
      }, {});
      let removedCnt = 0;

      this.renderPanelChange.emit({
        visibles: [
          ...flicking.visiblePanels
            .filter(panel => {
              const removed = removedPanels[panel.index];
              if (removed) removedCnt += 1;
              return !removed;
            }).map(panel => diffResult.maintained[panel.index - removedCnt][1]),
          ...diffResult.added
        ].sort((a, b) => a - b).map(idx => diffResult.list[idx])
      })

      this._diffResult = diffResult;
    }

    this._checkPlugins();
  }

  public ngAfterContentChecked() {
    if (!this._elementDiffer) return;

    const flicking = this._nativeFlicking;
    const renderer = flicking.renderer;
    const diffResult = this.options.renderOnlyVisible
      ? this._diffResult
      : this._elementDiffer.update(this._getChildKeys());

    if (!diffResult) return;

    if (this.options.renderOnlyVisible) {
      flicking.off(EVENTS.VISIBLE_CHANGE, this._reRender);
    }

    diffResult.removed.forEach(idx => {
      renderer.remove(idx, 1);
    });

    diffResult.ordered.forEach(([prevIdx, newIdx]) => {
      const prevPanel = renderer.getPanel(prevIdx);
      const indexDiff = newIdx - prevIdx;

      if (indexDiff > 0) {
        prevPanel.increaseIndex(indexDiff);
      } else {
        prevPanel.decreaseIndex(-indexDiff);
      }
      // Update position
      prevPanel.resize();
    });

    if (diffResult.added.length > 0) {
      const cameraEl = flicking.camera.element;
      const children: HTMLElement[] = [].slice.call(cameraEl.children);
      const addedElements = children.slice(-diffResult.added.length);

      diffResult.added.forEach((panelIdx, elIdx) => {
        renderer.insert(panelIdx, addedElements[elIdx]);
      });
    };

    if (this.options.renderOnlyVisible) {
      this._reRender();
      flicking.on(EVENTS.VISIBLE_CHANGE, this._reRender);
    }

    this._checkPlugins();
    this._diffResult = null;
  }

  private _bindEvents() {
    const flicking = this._nativeFlicking;
    const events = Object.keys(EVENTS).map(key => EVENTS[key]) as Array<typeof EVENTS[keyof typeof EVENTS]>;

    events.forEach(evtName => {
      flicking.on(evtName, e => {
        // Style guide: Event - https://angular.io/guide/styleguide#dont-prefix-output-properties
        const emitter = this[evtName] as EventEmitter<FlickingEvents[typeof evtName]>;

        e.currentTarget = this;

        if (emitter)
        emitter.emit(e);
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

    flicking.addPlugins(added.map(index => list[index]));
    flicking.removePlugins(removed.map(index => prevList[index]));
  }

  private _getChildKeys() {
    // Fill keys if not exist
    const children = ([].slice.apply(this._camera.nativeElement.children) as HTMLElement[])
      .filter(node => node.nodeType === Node.ELEMENT_NODE);
    children.forEach(child => {
      if (!(child as any).__NGX_FLICKING_KEY__) {
        (child as any).__NGX_FLICKING_KEY__ =  uuid.v4();
      }
    });

    return children.map(child => (child as any).__NGX_FLICKING_KEY__);
  }

  private _reRender = () => {
    const flicking = this._nativeFlicking;
    const visiblePanels = flicking.visiblePanels;

    Promise.resolve().then(() => {
      this.renderPanelChange.emit({
        visibles: visiblePanels
          .sort((panel1, panel2) => (panel1.position + panel1.offset) - (panel2.position + panel2.offset))
          .map(panel => this.panels[panel.index])
      });
    })
  }
}
