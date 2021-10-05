import { Component } from "@angular/core";

@Component({
  selector: "demo-virtual",
  templateUrl: "./virtual.component.html",
  styleUrls: ["../app.component.css", "./virtual.component.css"]
})
export class VirtualComponent {
  public flickingOptions = {
    panelsPerView: 5,
    circular: true,
    virtual: {
      cache: true,
      panelClass: "panel",
      renderPanel: (panel) => `<span>Panel ${panel.index}</span>`,
      initialPanelCount: 100
    }
  };
}
