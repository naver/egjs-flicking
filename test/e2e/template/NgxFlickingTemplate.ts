import { FlickingOptions } from "../../../src";
import { NgxFlickingComponent } from "../../../packages/ngx-flicking/projects/ngx-flicking/src/lib/ngx-flicking.component";


export default (options: Partial<FlickingOptions>, panels: string[], styles: string[]) => {
  styles.forEach(style => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    document.head.appendChild(stylesheet);
    stylesheet.href = style;
  });

  return {
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
  };
};
