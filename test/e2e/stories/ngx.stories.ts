import { moduleMetadata, storiesOf } from "@storybook/angular";
import * as testCases from "./testcases";
import NgxFlickingTemplate from "../template/NgxFlickingTemplate";
import { NgxFlickingModule } from "../../../packages/ngx-flicking/projects/ngx-flicking/src/lib/ngx-flicking.module";
import { NgxFlickingComponent } from "../../../packages/ngx-flicking/projects/ngx-flicking/src/lib/ngx-flicking.component";

const stories = storiesOf("Angular", module);

// stories.addDecorator(
//   moduleMetadata({
//     imports: [NgxFlickingModule]
//   })
// );

Object.keys(testCases).forEach(testCaseName => {
  const { options, panels } = testCases[testCaseName];
  stories.add(testCaseName, () => NgxFlickingTemplate(options, panels));
});
