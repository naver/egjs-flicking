import { Component } from '@angular/core';

@Component({
  selector: 'demo-propchange',
  templateUrl: './propchange.component.html',
  styleUrls: ['../app.component.css']
})
export class PropChangeComponent {
  options = { panelsPerView: 5 };

  onClick() {
    this.options = {
      ...this.options,
      panelsPerView: this.options.panelsPerView - 1
    }
  }
}
