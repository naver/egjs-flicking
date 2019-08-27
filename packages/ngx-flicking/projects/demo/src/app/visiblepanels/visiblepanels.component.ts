import { EVENTS } from '../../../../../../../src/consts';
import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'demo-visiblepanels',
  templateUrl: './visiblepanels.component.html',
  styleUrls: ['../app.component.css', './visiblepanels.component.css']
})
export class VisiblePanelsComponent implements OnInit {
  list0 = [0, 1, 2, 3, 4];
  math = Math;
  visiblePanels = [];

  constructor() { }

  ngOnInit() {
    this.visiblePanels = this.list0.map(i => ({
      key: i,
      num: i
    }));
  }

  onPrepend() {
    const start = this.list0[0] || 0;
    this.list0.splice(0, 0, ...[start - 2, start - 1]);

    this.list0 = this.list0.slice();
  }

  onAppend() {
    const end = this.list0[this.list0.length - 1] || 0;
    this.list0.push(end + 1, end + 2);
    this.list0 = this.list0.slice();
  }

  onRenderPanelChange(visibleIndexes: number[]) {
    const l = this.list0.length;
    const newVisiblePanels = visibleIndexes.map(i => {
      return {
        key: i,
        num: this.list0[i % l]
      };
    });

    this.visiblePanels = newVisiblePanels;
  }

  // TODO: We can use trackByFn for the performance.
  // But if key could be overwrapped, it would be not working.
  // For example when prepending panels, new visibleIndexs could be overlapped existing panel's key.
  // So use trackByFn only when not using prepend.
  trackByFn(index, item) {
    return item.key;
  }
}

@Component({
  selector: 'place-holder',
  template: `<ng-content></ng-content>`,
  styleUrls: ['../app.component.css', './visiblepanels.component.css']
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
