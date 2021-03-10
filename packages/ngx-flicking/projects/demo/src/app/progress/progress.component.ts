// import { MOVE_TYPE, EVENTS } from './../../../../../../../src/consts';
import { MoveEvent } from '@egjs/flicking';
import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { NgxFlickingComponent } from 'projects/ngx-flicking/src/lib/ngx-flicking.component';

@Component({
  selector: 'demo-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['../app.component.css', './progress.component.css']
})
export class ProgressComponent implements OnInit, AfterViewInit {
  @ViewChild('thumb', { read: ViewContainerRef }) thumb;
  @ViewChild('flicking1', { read: NgxFlickingComponent }) flicking1;
  @ViewChild('flicking2', { read: NgxFlickingComponent }) flicking2;
  @ViewChild('flicking3', { read: NgxFlickingComponent }) flicking3;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // TODO: clone is created after first tick.
    setTimeout(() => {
      this.updateAllProgress(this.flicking1);
      this.updateAllOutsetProgress(this.flicking2);
      this.updateAllVisibleRatio(this.flicking3);
    });
  }

  updateProgressThumb(percent) {
    this.thumb.element.nativeElement.style.width = percent + '%';
  }

  updateAllProgress(flicking) {
    flicking.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getProgress().toFixed(2);
    });
  }

  updateAllOutsetProgress(flicking) {
    flicking.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getOutsetProgress().toFixed(2);
    });
  }

  updateAllVisibleRatio(flicking) {
    flicking.getAllPanels(true).forEach(panel => {
      panel.getElement().innerHTML = panel.getVisibleRatio().toFixed(2);
    });
  }

  onMove0(e: MoveEvent) {
    // this.updateProgressThumb(e.progress * 100);
  }

  onMove1(e: MoveEvent) {
    // this.updateAllProgress(e.currentTarget);
  }

  onMove2(e: MoveEvent) {
    // this.updateAllOutsetProgress(e.currentTarget);
  }

  onMove3(e) {
    // this.updateAllVisibleRatio(e.currentTarget);
  }
}
