/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import NativeFlicking, {
  Plugin,
  FlickingOptions,
  withFlickingMethods,
  DEFAULT_OPTIONS,
  FlickingEvent,
  NeedPanelEvent,
  SelectEvent,
  ChangeEvent,
  VisibleChangeEvent,
} from '@egjs/flicking';
import {
  Component,
  OnInit,
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
  VERSION,
} from '@angular/core';
import ListDiffer, { DiffResult } from '@egjs/list-differ';

export interface RenderPanelChangeEvent {
  visibles: {
    index: number;
    key: number; /* Unique value */
    data: any; /* User panel data */
  }[];
}

@Component({
  selector: 'ngx-flicking',
  template: `
    <div>
      <div class={{classPrefix}}-viewport>
        <div class={{classPrefix}}-camera ngxChildrenDiffer (update)="onUpdate($event)">
          <ng-container *ngTemplateOutlet="template"></ng-container>
          <ng-container *ngFor="let items of [].constructor(cloneCount)">
            <ng-container *ngTemplateOutlet="template"></ng-container>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    ':host {display: block}', ':host > div {width: 100%; height: 100%}'
  ]
})
export class NgxFlickingComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, AfterViewChecked, DoCheck {
  @Input() options: Partial<FlickingOptions> = {};
  @Input() plugins: Plugin[] = [];
  @Input() panels: any[];

  // TODO: Can @Output be added dynamically?
  @Output() holdStart = new EventEmitter<Partial<FlickingEvent>>();
  @Output() holdEnd = new EventEmitter<Partial<FlickingEvent>>();
  @Output() moveStart = new EventEmitter<Partial<FlickingEvent>>();
  @Output() move = new EventEmitter<Partial<FlickingEvent>>();
  @Output() moveEnd = new EventEmitter<Partial<FlickingEvent>>();
  @Output() change = new EventEmitter<ChangeEvent>();
  @Output() restore = new EventEmitter<Partial<FlickingEvent>>();
  @Output() select = new EventEmitter<SelectEvent>();
  @Output() needPanel = new EventEmitter<NeedPanelEvent>();
  @Output() visibleChange = new EventEmitter<VisibleChangeEvent>();
  @Output() renderPanelChange = new EventEmitter<RenderPanelChangeEvent>();
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  classPrefix: string;
  cloneCount = 0;

  @withFlickingMethods
  private flicking?: NativeFlicking | null;
  private pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();
  private userPanelDataDiffer: ListDiffer<any> = null;
  private internalCloneCount = 0;
  private prevPanels = null;
  private prevVisibles: number[] = [];
  /**
   * To prevent 'ExpressionChangedAfterItHasBeenCheckedError'
   * It would trigger above error if you changed the value after DOM operation is started. It makes unstable DOM tree.
   * So when it is in critical section(DOM updates), it should update the value asynchronously.
   *
   * Ref: https://indepth.dev/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error/
   */
  private criticalSection = true;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.options = {...DEFAULT_OPTIONS, ...this.options, ...{renderExternal: true}};
    this.classPrefix = this.options.classPrefix;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.flicking && this.prevPanels !== this.panels) {
      this.syncPanelDataIfRenderOnlyVisible(this.panels);
      this.prevPanels = this.panels;
    }

    this.checkPlugins();
  }

  ngAfterViewInit() {
    if (!this.flicking) {
      this.flicking = new NativeFlicking(
        this.elRef.nativeElement.children[0],
        {
          ...this.options,
          framework: 'angular',
          frameworkVersion: VERSION.full,
        } as object,
      );
      this.userPanelDataDiffer = new ListDiffer<any>(this.panels);

      this.syncPanelDataIfRenderOnlyVisible(this.panels);

      this.bindEvents();

      this.checkPlugins();

      setTimeout(() => {
        // To check clone on first time
        /**
         * TODO: Can setTimeout guarantee that it's called before XXXChecked?
         */
        this.checkCloneCount();
      });
    }
  }

  syncPanelDataIfRenderOnlyVisible(panelData: any[]) {
    if (!panelData || !this.options.renderOnlyVisible) {
      return;
    }

    const panelDiff = this.userPanelDataDiffer.update(this.panels);
    this.flicking.beforeSync(panelDiff);
    const renderingIndexes = this.flicking.getRenderingIndexes(panelDiff);

    this.triggerRenderChange(renderingIndexes);
  }

  ngOnDestroy() {
    if (this.flicking) {
      this.flicking.destroy();
    }
  }

  onUpdate(diff: DiffResult<any>) {
    // console.log('Result Callback : added: %o, removed: %o, changed: %o', diff.added, diff.removed, diff.changed);
    if (diff.added.length > 0 || diff.removed.length > 0 || diff.changed.length > 0) {
      this.flicking.sync(diff);

      setTimeout(() => {
        this.checkCloneCount();
      });
    }
  }

  ngDoCheck() {
    this.criticalSection = true;
  }

  ngAfterViewChecked() {
    this.criticalSection = false;
  }

  checkCloneCount() {
    if (!this.flicking) {
      return;
    }

    const newCC = this.flicking.getCloneCount();

    if (this.internalCloneCount === newCC) {
      return;
    }

    // console.log(`Flicking Component: clone count is changed (${this.cloneCount} => ${newCC})`);
    if (!this.options.renderOnlyVisible) {
      this.cloneCount = newCC;
    } else {
      // it should not use clone count, clone is calculated by NativeFlicking.
      // Updating `this.cloneCount` makes trigger re-render.
    }

    this.internalCloneCount = newCC;
  }

  private checkPlugins() {
    if (!this.flicking) {
      return;
    }

    const { list, added, removed, prevList } = this.pluginsDiffer.update(this.plugins);

    this.flicking.addPlugins(added.map(index => list[index]));
    this.flicking.removePlugins(removed.map(index => prevList[index]));
  }

  private counter(n: number): number[] {
    const counterArray: number[] = [];
    for (let i = 0; i < n; i += 1) {
      counterArray[i] = i;
    }
    return counterArray;
  }

  private bindEvents() {
    const events = Object.keys(NativeFlicking.EVENTS)
      .map(key => NativeFlicking.EVENTS[key]);

    events.forEach(eventName => {
      this.flicking.on(eventName, e => {
        e.currentTarget = this;
        const emitter = this[eventName]; // Style guide: Event - https://angular.io/guide/styleguide#dont-prefix-output-properties

        if (emitter) {
          emitter.emit(e);

          if (eventName === 'visibleChange') {
            const list = this.counter(this.panels.length * (this.flicking.getCloneCount() + 1));
            const min = e.range.min;
            const max = e.range.max;

            const visibles = min >= 0
              ? list.slice(min, max + 1)
              : list.slice(0, max + 1).concat(list.slice(min));

            this.triggerRenderChange(visibles);
          }
        }
      });
    });
  }

  private triggerRenderChange(visibles: number[]) {
    // visible panel is not changed
    if (visibles.length === this.prevVisibles.length &&
        visibles.every((v, i) => this.prevVisibles[i] === v)) {
      return;
    }

    this.prevVisibles = visibles;

    const l = this.panels.length;
    const renderChangeEvent: RenderPanelChangeEvent = {
      visibles: visibles.map(i => ({
        key: i,
        index: i % l,
        data: this.panels[i % l]
      }))
    };

    if (Promise) {
      Promise.resolve()
        .then(() => this.renderPanelChange.emit(renderChangeEvent));
      return;
    }

    // If Promise is not supported (IE)
    if (this.criticalSection) {
      setTimeout(() => {
        // This works OK but it may cause blink when panel is appended or added
        this.renderPanelChange.emit(renderChangeEvent);
      });
    } else {
      this.renderPanelChange.emit(renderChangeEvent);
    }
  }
}
