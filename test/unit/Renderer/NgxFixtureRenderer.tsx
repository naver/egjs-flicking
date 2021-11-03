import { Component, Injectable } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

import { Children, isValidElement } from "react";
import VanillaFlicking from "~/Flicking";

import { NgxFlickingModule } from "../../../packages/ngx-flicking/projects/ngx-flicking/src/public-api";

import FixtureRenderer from "./FixtureRenderer";
import DummyFlicking from "../helper/DummyFlicking";
import { createSandbox } from "../helper/test-util";

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

class NgxFixtureRenderer implements FixtureRenderer {
  public async render(el: JSX.Element): Promise<VanillaFlicking> {
    const sandbox = createSandbox("vue-ui");
    const elAsAngularTemplate = this._parseJSX(el);
    const flickingJSX = this._findFlickingJSX(el);

    @Injectable({
      providedIn: "root"
    })
    class NgxTestingService {
      public constructor() {}
    }

    @Component({
      selector: "ngx-ui",
      template: elAsAngularTemplate,
      providers: [NgxTestingService]
    })
    class NgxTestingComponent {
      public options = flickingJSX.props.options;

      public constructor() {}
    }

    await TestBed.configureTestingModule({
      declarations: [
        NgxTestingComponent
      ],
      imports: [
        NgxFlickingModule
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(NgxTestingComponent);

    sandbox.appendChild(fixture.debugElement.nativeElement);

    return new VanillaFlicking("el");
  }

  private _findFlickingJSX(el: JSX.Element): DummyFlicking {
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
  }

  private _parseJSX(el: JSX.Element, isPanel: boolean = false) {
    const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];

    if (!isValidElement(el)) {
      return el;
    } else if (el.type === DummyFlicking) {
      return `<ngx-flicking #flicking [options]="{ circular: true }">${children.map(child => this._parseJSX(child, true))}</ngx-flicking>`;
    } else {
      const props = (el.props as any);
      const parsedChildren = children.map(child => this._parseJSX(child));
      const attrs = [];

      if (isPanel) {
        attrs.push("flicking-panel");
      }

      if (props.className) {
        attrs.push(`class="${props.className}"`);
      }

      return `<${el.type} ${attrs.join(" ")}>${parsedChildren}</${el.type}>`;
    }
  }
}

export default NgxFixtureRenderer;
