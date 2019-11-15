import { Component, OnInit, DoCheck, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'demo-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['../app.component.css', './panel.component.css'],
  })
export class PanelComponent implements OnInit, DoCheck, AfterContentChecked {

  constructor() { }

  ngOnInit() {
  }
  ngAfterContentChecked() {
    console.log(this);
    console.log("))))");
  }
  ngDoCheck() {

  }
}
