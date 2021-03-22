import { FlickingOptions } from "../../../src";
import { NgxFlickingComponent } from "../../../packages/ngx-flicking/projects/ngx-flicking/src/lib/ngx-flicking.component";


export default (options: Partial<FlickingOptions>, panels: string[], styles: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const styleStrings = styles.map(style => require(`../public/${style}`).default);

  return {
    template: `
      <ngx-flicking [options]="options">
        ${panels.join("")}
      </ngx-flicking>
    `,
    styles: styleStrings,
    props: {
      options: options
    },
    moduleMetadata: {
      imports: [],
      declarations: [NgxFlickingComponent]
    }
  };
};
