import { NgxFlickingComponent } from "../../../dist/libs/angular-component-library";
import { ReactNgWrapper } from "../../../dist/libs/react-ng-wrapper";

export class NgxHybridFlicking extends ReactNgWrapper<NgxFlickingComponent> {
  public constructor(props) {
    super(props, NgxFlickingComponent as any);
  }
}
