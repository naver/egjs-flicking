import { Component, ViewChild } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Children, isValidElement } from "react";
import VanillaFlicking from "../../../../../src/Flicking";

import { NgxFlickingComponent } from "./lib/ngx-flicking.component";
import { NgxFlickingPanel } from "./lib/ngx-flicking-panel.directive";
import { NgxFlickingService } from "./lib/ngx-flicking.service";

import DummyFlicking from "../../../helper/DummyFlicking";
import FixtureRenderer from "../../../helper/FixtureRenderer";
import { createSandbox } from "../../../helper/test-util";

class NgxFixtureRenderer implements FixtureRenderer {
  public async render(el: JSX.Element): Promise<VanillaFlicking> {
    const sandbox = createSandbox("angular-ui");
    const replaced = this._parseFlickingJSX(el);
    const flickingJSX = this._findFlickingJSX(el);

    const options = flickingJSX ? flickingJSX.props.options : null;

    @Component({
      template: replaced
    })
    class NgxFlickingTestComp {
      @ViewChild(NgxFlickingComponent) public flicking!: NgxFlickingComponent;
      public options = options;
    }

    await TestBed.configureTestingModule({
      declarations: [NgxFlickingComponent, NgxFlickingPanel, NgxFlickingTestComp],
      providers: [NgxFlickingService]
    }).compileComponents();

    const fixture = TestBed.createComponent(NgxFlickingTestComp);
    fixture.detectChanges();
    sandbox.appendChild(fixture.nativeElement);

    return fixture.componentInstance.flicking as unknown as VanillaFlicking;
  }

  private _findFlickingJSX(el: JSX.Element): DummyFlicking | null {
    const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];

    if (el.type === DummyFlicking) {
      return el as unknown as DummyFlicking;
    }

    for (const child of children) {
      const found = this._findFlickingJSX(child);
      if (found) {
        return found;
      }
    }

    return null;
  }

  private _parseFlickingJSX(el: JSX.Element, isPanel = false): string {
    const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];

    if (el.type === DummyFlicking) {
      const replacedChildren = childs.map(child => this._parseFlickingJSX(child, true)).join("");
      return `<ngx-flicking #flicking [options]="options">${ replacedChildren }</ngx-flicking>`;
    } else if (!isValidElement(el)) {
      return el as unknown as string;
    } else {
      const dom = el as JSX.Element;
      const { className, children, ...otherProps } = dom.props;
      const attrs = [];
      const replacedChildren = childs.map(child => this._parseFlickingJSX(child)).join("");

      if (isPanel) {
        attrs.push("flicking-panel");
      }

      if (className) {
        attrs.push(`class="${className}"`);
      }

      for (const key in otherProps) {
        attrs.push(`${key}="${otherProps[key]}"`);
      }

      return `<${dom.type} ${attrs.join(" ")}>${ replacedChildren }</${dom.type}>`;
    }
  }
}

export default NgxFixtureRenderer;