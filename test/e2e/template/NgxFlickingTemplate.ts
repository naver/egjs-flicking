import { NgxFlickingComponent } from "../../../packages/ngx-flicking/projects/ngx-flicking/src/lib/ngx-flicking.component";
import { NgxFlickingPanel } from "../../../packages/ngx-flicking/projects/ngx-flicking/src/lib/ngx-flicking-panel.directive";
import { Fixture } from "../types";

export default (fixture: Fixture) => {
  const { styles, panels, options } = fixture;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const styleStrings = styles.map(style => require(`../public/${style}`).default);

  return {
    template: `
      <ngx-flicking [options]="options">
        ${panels.map(panel => `<${panel.tag} flicking-panel class="${panel.class}">${panel.text}</${panel.tag}>`).join("")}
      </ngx-flicking>
    `,
    styles: styleStrings,
    props: {
      options: options
    },
    moduleMetadata: {
      imports: [],
      declarations: [NgxFlickingComponent, NgxFlickingPanel]
    }
  };
};
