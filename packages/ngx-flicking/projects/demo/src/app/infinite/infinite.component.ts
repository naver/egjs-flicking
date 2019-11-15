import { EVENTS } from './../../../../../../../src/consts';
import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-infinite',
  templateUrl: './infinite.component.html',
  styleUrls: ['../app.component.css', './infinite.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteComponent implements OnInit {
  list0 = [0, 1, 2, 3, 4];
  list1 = [0, 1, 2, 3, 4];
  list2 = [0, 1, 2, 3, 4];
  math = Math;

  constructor() { }

  ngOnInit() {
  }

  onPrepend() {
    const start = this.list0[0] || 0;
    this.list0.splice(0, 0, start - 2, start - 1);
  }

  onAppend() {
    const end = this.list0[this.list0.length - 1] || 0;
    this.list0.push(end + 1, end + 2);
  }

  onNeedPanel1(e) {
    if (e.type === EVENTS.NEED_PANEL) {
      const end = this.list1[this.list1.length - 1] || 0;
      this.list1.push(end + 1, end + 2);
    }
  }
  onNeedPanel2(e) {
    if (e.type === EVENTS.NEED_PANEL) {
      const end = this.list2[this.list2.length - 1] || 0;
      this.list2.push(end + 1, end + 2);
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
