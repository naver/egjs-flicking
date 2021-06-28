import { Component, OnInit } from "@angular/core";
import { Arrow } from "@egjs/flicking-plugins";

@Component({
  selector: "demo-arrow",
  templateUrl: "./arrow.component.html",
  styleUrls: ["../app.component.css", "./arrow.component.css", "../../../../../node_modules/@egjs/flicking-plugins/dist/flicking-plugins.css"]
})
export class ArrowComponent implements OnInit {
  plugins: any[] = [new Arrow()];

  constructor() { }

  ngOnInit() {
  }
}
