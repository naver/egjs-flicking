import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['../app.component.css', './snap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
