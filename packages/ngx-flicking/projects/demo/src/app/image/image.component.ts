import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-image',
  templateUrl: './image.component.html',
  styleUrls: ['../app.component.css', './image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit {
  show = false;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.show = true;
  }
}
