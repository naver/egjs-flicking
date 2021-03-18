import { FlickingOptions } from "../../../src";
import { NgxFlickingComponent } from "../../../packages/ngx-flicking/projects/ngx-flicking/src/lib/ngx-flicking.component";


export default (options: Partial<FlickingOptions>, panels: string[]) => ({
  template: `
    <ngx-flicking [options]="options">
      ${panels.join("")}
    </ngx-flicking>
  `,
  props: {
    options: options
  },
  moduleMetadata: {
    imports: [],
    declarations: [NgxFlickingComponent]
  }
});
