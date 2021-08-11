import { Component, OnInit, ViewChild } from "@angular/core";
import { Sync } from "@egjs/flicking-plugins";

@Component({
  selector: "demo-sync",
  templateUrl: "./sync.component.html",
  styleUrls: ["../app.component.css", "./sync.component.css", "../../../../../node_modules/@egjs/flicking-plugins/dist/flicking-plugins.css"]
})
export class SyncComponent implements OnInit {
  @ViewChild("flicking0", { static: true }) flicking0: any;
  @ViewChild("flicking1", { static: true }) flicking1: any;
  @ViewChild("flicking2", { static: true }) flicking2: any;
  plugins: any[] = [];

  public ngOnInit() {
    console.log(this.flicking0);

    this.plugins = [new Sync({
      type: "camera",
      synchronizedFlickingOptions: [
        {
          flicking: this.flicking0,
          isClickable: false
        },
        {
          flicking: this.flicking1,
          isClickable: false
        },
        {
          flicking: this.flicking2,
          isClickable: false
        }
      ]
    })]
  }
}
