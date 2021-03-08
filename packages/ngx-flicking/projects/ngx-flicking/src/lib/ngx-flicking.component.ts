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
  ContentChild,
  TemplateRef,
  SimpleChanges,
  AfterViewChecked,
  DoCheck,
  ChangeDetectorRef,
  ViewEncapsulation,
  QueryList,
  ContentChildren,
  ViewChild
} from "@angular/core";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import * as uuid from "uuid";

import NativeFlicking, {
  FlickingOptions,
  EVENTS,
  FlickingEvents,
  NeedPanelEvent
} from "~/index";

export interface RenderPanelChangeEvent {
  visibles: {
    index: number;
    key: number; /* Unique value */
    data: any; /* User panel data */
  }[];
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
implements AfterViewInit, OnDestroy, OnChanges, AfterViewChecked, DoCheck {
  @Input() public options: Partial<FlickingOptions> = {};
  @Input() public plugins: Plugin[] = [];
  @Input() public panels: any[] = [];

  @Output() public needPanel = new EventEmitter<RenderPanelChangeEvent>();
  @Output() public renderPanelChange = new EventEmitter<RenderPanelChangeEvent>();
  @ViewChild("camera") camera: ElementRef<HTMLElement>;

  private _elRef: ElementRef<HTMLDivElement>;
  private _cdr: ChangeDetectorRef;
  private _nativeFlicking: NativeFlicking | null;
  private _pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();
  private _panelDiffer: ListDiffer<string | number> | null = null;
  /**
   * To prevent 'ExpressionChangedAfterItHasBeenCheckedError'
   * It would trigger above error if you changed the value after DOM operation is started. It makes unstable DOM tree.
   * So when it is in critical section(DOM updates), it should update the value asynchronously.
   *
   * Ref: https://indepth.dev/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error/
   */
  private criticalSection = true;

  public constructor(elRef: ElementRef, cdr: ChangeDetectorRef) {
    this._elRef = elRef;
    this._cdr = cdr;
    this._nativeFlicking = null;
  }

  public ngAfterViewInit() {
    const viewportEl = this._elRef.nativeElement as HTMLElement;
    const options = { ...this.options, renderExternal: true };

    this._nativeFlicking = new NativeFlicking(viewportEl, options);
    this._panelDiffer = new ListDiffer(this._getChildKeys());

    // this._syncPanelDataIfRenderOnlyVisible(this.panels);

    this._bindEvents();
    this._checkPlugins();

    // Re-render component
    this._cdr.markForCheck();
  }

  public ngOnDestroy() {
    if (!this._nativeFlicking) return;

    // this._nativeFlicking.destroy();
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes);
    // if (this._nativeFlicking && this.prevPanels !== this.panels) {
    //   this._syncPanelDataIfRenderOnlyVisible(this.panels);
    //   this.prevPanels = this.panels;
    // }

    this._checkPlugins();
  }

  public ngDoCheck() {
    this.criticalSection = true;
  }

  public ngAfterContentChecked() {
    if (!this._panelDiffer) return;

    const flicking = this._nativeFlicking;
    const renderer = flicking.renderer;
    const diffResult = this._panelDiffer.update(this._getChildKeys());

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
      const children = [].slice.apply(cameraEl.children);

      diffResult.added.forEach(panelIdx => {
        renderer.insert(panelIdx, children[panelIdx]);
      });
    };

    this._checkPlugins();

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      // this.panels = this._getPanelVNodes();
    }
  }

  public ngAfterViewChecked() {
    this.criticalSection = false;
  }

  private _syncPanelDataIfRenderOnlyVisible(panelData: any[]) {
    if (!panelData || !this.options.renderOnlyVisible) {
      return;
    }

    // const panelDiff = this._panelDiffer.update(this.panels);

    // console.log(panelDiff);
    // this._nativeFlicking.beforeSync(panelDiff);
    // const renderingIndexes = this._nativeFlicking.getRenderingIndexes(panelDiff);

    // this._triggerRenderChange(renderingIndexes);
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
      flicking.on(EVENTS.VISIBLE_CHANGE, () => {
        // this._triggerRenderChange();
      });
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
    const children = ([].slice.apply(this.camera.nativeElement.children) as HTMLElement[])
      .filter(node => node.nodeType === Node.ELEMENT_NODE);
    children.forEach(child => {
      if (!child.hasAttribute("key")) {
        child.setAttribute("key", uuid.v4());
      }
    });

    return children.map(child => child.getAttribute("key"));
  }

  // private _triggerRenderChange(visibles: number[]) {
  //   // visible panel is not changed
  //   if (visibles.length === this.prevVisibles.length &&
  //     visibles.every((v, i) => this.prevVisibles[i] === v)) {
  //       return;
  //   }

  //   this.prevVisibles = visibles;

  //   const l = this.panels.length;
  //   const renderChangeEvent: RenderPanelChangeEvent = {
  //     visibles: visibles.map(i => ({
  //       key: i,
  //       index: i % l,
  //       data: this.panels[i % l]
  //     }))
  //   };

  //   if (Promise) {
  //     Promise.resolve()
  //     .then(() => this.renderPanelChange.emit(renderChangeEvent));
  //     return;
  //   }

  //   // If Promise is not supported (IE)
  //   if (this.criticalSection) {
  //     setTimeout(() => {
  //       // This works OK but it may cause blink when panel is appended or added
  //       this.renderPanelChange.emit(renderChangeEvent);
  //     });
  //   } else {
  //     this.renderPanelChange.emit(renderChangeEvent);
  //   }
  // }
}
