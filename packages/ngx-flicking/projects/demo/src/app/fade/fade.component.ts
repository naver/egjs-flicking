import { Component, OnInit } from '@angular/core';
import { Fade } from '@egjs/flicking-plugins';

@Component({
  selector: 'demo-fade',
  templateUrl: './fade.component.html',
  styleUrls: ['../app.component.css', './fade.component.css']
})
export class FadeComponent implements OnInit {
  plugins = [new Fade()];

  constructor() { }

  ngOnInit() {
  }

}
