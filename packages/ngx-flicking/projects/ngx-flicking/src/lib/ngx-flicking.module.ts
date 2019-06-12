import { NgModule } from '@angular/core';
import { NgxFlickingComponent } from './ngx-flicking.component';
import { NgxChildrenDifferModule } from '@egjs/ngx-children-differ';
// import { NgxFlickingPanelDirective } from './ngx-flicking-panel.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxFlickingComponent],
  imports: [
    CommonModule,
    NgxChildrenDifferModule
  ],
  exports: [NgxFlickingComponent]
})
export class NgxFlickingModule { }
