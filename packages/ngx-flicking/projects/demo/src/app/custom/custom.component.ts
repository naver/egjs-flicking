import { ChildrenDiffResult } from '@egjs/children-differ';
import { Component, ElementRef, OnInit, Input } from '@angular/core';

@Component({
  selector: 'demo-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['../app.component.css']
})
export class CustomComponent {
  testCloneCount: 0;
  title = 'ngx-flicking-example';
  list: object[] = [
    {num: 0},
    {num: 1},
    {num: 2}
  ];

  constructor(private elRef: ElementRef) {
    this.testCloneCount = 0;
  }

  appendItem() {
    const val = {num: this.list.length};
    console.log(`New Item: ${val} at ${this.list.length}`);

    this.list = [...this.list, val];
  }

  prependItem() {
    const val = {num: this.list.length};
    // const last = this.list[this.list.length - 1];
    console.log(`New Item: ${val} at ${this.list.length}`);

    this.list = [val, ...this.list];
  }

  removeItem(index) {
    console.log(`Remove Item: ${index}th`);

    this.list.splice(index, 1);
    this.list = [...this.list];
  }

  addCloneCount() {
    this.testCloneCount++;
    console.log("CustomComponent addCloneClout", this.testCloneCount);
  }

  onUpdate(diffResult: ChildrenDiffResult) {
    console.log('Result Callback : added: %o, removed: %o, changed: %o', diffResult.added, diffResult.removed, diffResult.changed);
  }
}

@Component({
  selector: 'lib-test-panel',
  template: `
    <div>
      test-panel works! {{id}}
    </div>
  `
})
export class TestPanelComponent implements OnInit {
  @Input() id: string;

  constructor() {
  }

  ngOnInit() {
    console.log("TestPanelComponent", this.id);
  }

}
