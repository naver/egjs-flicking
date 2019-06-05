/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import NativeFlicking, { Plugin, FlickingOptions, withFlickingMethods, DEFAULT_OPTIONS, FlickingEvent } from '@egjs/flicking';
// tslint:disable-next-line: max-line-length
import { Component, OnInit, Input, AfterViewInit, ElementRef, OnChanges, Output, EventEmitter, OnDestroy, ContentChild, TemplateRef } from '@angular/core';
import ListDiffer, { DiffResult } from '@egjs/list-differ';

@Component({
  selector: 'eg-flicking',
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
export class NgxFlickingComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() options: Partial<FlickingOptions> = {};
  @Input() plugins: Plugin[] = [];

  // Reference Flicking.EventType
  @Output() handleEvents = new EventEmitter<Partial<FlickingEvent>>();
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  @withFlickingMethods
  private flicking?: NativeFlicking | null;
  private pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();
  classPrefix: string;
  cloneCount = 0;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.options = {...DEFAULT_OPTIONS, ...this.options, ...{renderExternal: true}};
    this.classPrefix = this.options.classPrefix;
  }

  ngOnChanges() {
    this.checkPlugins();
  }

  ngAfterViewInit() {
    if (!this.flicking) {
      this.flicking = new NativeFlicking(this.elRef.nativeElement.children[0], this.options);

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

  ngOnDestroy() {
    if (this.flicking) {
      this.flicking.destroy();
      // TODO: unbindEvents
    }
  }

  onUpdate(diff: DiffResult<any>) {
    // console.log('Result Callback : added: %o, removed: %o, changed: %o', diff.added, diff.removed, diff.changed);
    this.flicking.sync(diff);

    if (diff.added.length > 0 || diff.removed.length > 0 || diff.changed.length > 0) {

      setTimeout(() => {
        this.checkCloneCount();
      });
    }
  }

  checkCloneCount() {
    if (!this.flicking) {
      return;
    }

    const newCC = this.flicking.getCloneCount();

    if (this.cloneCount === newCC) {
      return;
    }

    // console.log(`Flicking Component: clone count is changed (${this.cloneCount} => ${newCC})`);
    this.cloneCount = newCC;
  }

  private checkPlugins() {
    if (!this.flicking) {
      return;
    }

    const { list, added, removed, prevList } = this.pluginsDiffer.update(this.plugins);

    this.flicking.addPlugins(added.map(index => list[index]));
    this.flicking.removePlugins(removed.map(index => prevList[index]));
  }

  private bindEvents() {
    const events = Object.keys(NativeFlicking.EVENTS)
      .map(key => NativeFlicking.EVENTS[key]);

    events.forEach(eventName => {
      this.flicking.on(eventName, e => {
        e.currentTarget = this;

        this.handleEvents.emit(e); // type is camelCase
      });
    });
  }
}
