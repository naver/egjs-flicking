/* eslint-disable max-classes-per-file */

import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { RenderPanelChangeEvent } from 'projects/ngx-flicking/src/public-api';

import { EVENTS } from '~/index';

@Component({
  selector: 'demo-infinite',
  templateUrl: './infinite.component.html',
  styleUrls: ['../app.component.css', './infinite.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteComponent implements OnInit {
  list0 = [0, 1, 2, 3, 4];
  list1 = [0, 1, 2, 3, 4];
  list2 = [0, 1, 2, 3, 4];
  visible1 = [];
  math = Math;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.visible1 = [...this.list1];
  }

  onPrepend() {
    const start = this.list0[0] || 0;
    this.list0 = [start - 2, start - 1, ...this.list0];
  }

  onAppend() {
    const end = this.list0[this.list0.length - 1] || 0;
    this.list0 = [...this.list0, end + 1, end + 2];
  }

  onRenderPanelChange(event: RenderPanelChangeEvent) {
    this.visible1 = [...event.visibles];
    this.cdr.detectChanges();
  }

  onNeedPanel1(e) {
    if (e.eventType === EVENTS.NEED_PANEL && e.direction === "NEXT") {
      const end = this.list1[this.list1.length - 1] || 0;
      this.list1 = [...this.list1, end + 1, end + 2];
      this.cdr.detectChanges();
    }
  }

  onNeedPanel2(e) {
    if (e.eventType === EVENTS.NEED_PANEL && e.direction === "NEXT") {
      const end = this.list2[this.list2.length - 1] || 0;
      this.list2 = [...this.list2, end + 1, end + 2];
      this.cdr.detectChanges();
    }
  }
}

@Component({
  selector: 'place-holder',
  template: `<ng-content></ng-content>`,
  styleUrls: ['../app.component.css', './infinite.component.css']
})
export class PlaceHolderItemComponent implements OnInit, AfterViewInit {
  @Input() num: number;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(this.elRef.nativeElement, `infinite${this.num % 5}`);
    this.renderer.addClass(this.elRef.nativeElement, 'placeholder');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.removeClass(this.elRef.nativeElement, 'placeholder');
    }, 1500);
  }
}
