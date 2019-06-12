import { Parallax } from '@egjs/flicking-plugins';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['../app.component.css', './parallax.component.css']
})
export class ParallaxComponent implements OnInit {
  plugins = [new Parallax('img', 4)];

  constructor() { }

  ngOnInit() {
  }

}
