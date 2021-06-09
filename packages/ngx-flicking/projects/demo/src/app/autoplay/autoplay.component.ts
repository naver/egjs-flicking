import { Component, OnInit } from '@angular/core';
import { Fade, AutoPlay } from '@egjs/flicking-plugins';

@Component({
  selector: 'demo-autoplay',
  templateUrl: './autoplay.component.html',
  styleUrls: ['../app.component.css', './autoplay.component.css']
})
export class AutoplayComponent implements OnInit {
  plugins: any[] = [new Fade(), new AutoPlay({ duration: 2000, direction: 'NEXT' })];

  constructor() { }

  ngOnInit() {
  }
}
