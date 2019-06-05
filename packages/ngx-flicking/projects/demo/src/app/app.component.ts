import { AlignComponent } from './align/align.component';
import { Component, ElementRef } from '@angular/core';
import { CustomComponent } from './custom/custom.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private elRef: ElementRef) {
  }
}
