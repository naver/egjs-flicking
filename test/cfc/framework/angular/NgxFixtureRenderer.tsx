import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { Children, isValidElement } from "react";
import VanillaFlicking from "@egjs/flicking";

import { NgxFlickingComponent, NgxFlickingPanel } from "@egjs/ngx-flicking";

import DummyFlicking from "../../fixture/DummyFlicking";
import {
  createSandbox,
  cleanup,
  resolveFlickingWhenReady,
  findFlickingJSX,
  flattenAttrs,
} from "../../common/utils";

const render = async (el: JSX.Element): Promise<VanillaFlicking> => {
  const sandbox = createSandbox("angular-ui");
  const replaced = parseFlickingJSX(el);
  const flickingJSX = findFlickingJSX(el);

  const options = flickingJSX ? flickingJSX.props.options : {};
  const plugins = flickingJSX ? flickingJSX.props.plugins : [];
  const events = flickingJSX ? flickingJSX.props.events : {};

  @Component({
    template: replaced,
    standalone: true,
    imports: [CommonModule, NgxFlickingComponent, NgxFlickingPanel],
  })
  class NgxFlickingTestComp {
    @ViewChild(NgxFlickingComponent) public flicking!: NgxFlickingComponent;
    public options = options;
    public plugins = plugins;
    public events = events;
  }

  await TestBed.configureTestingModule({
    imports: [NgxFlickingTestComp],
  }).compileComponents();

  const fixture = TestBed.createComponent(NgxFlickingTestComp);
  fixture.detectChanges();
  sandbox.appendChild(fixture.nativeElement);

  return resolveFlickingWhenReady(fixture.componentInstance.flicking);
};

const flattenOptions = {
  formatProp: (name: string, val: any) => {
    if (name === "style") {
      return `[ngStyle]="${JSON.stringify(val).replace(/"/g, "'")}"`;
    } else if (typeof val === "string") {
      return `${name}="${val}"`;
    } else {
      return `${name}={${val}}`;
    }
  },
};

const parseFlickingJSX = (el: JSX.Element, isPanel = false): string => {
  const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];

  if (el.type === DummyFlicking) {
    const attrs = flattenAttrs(el, flattenOptions);
    const replacedChildren = childs
      .map((child) => parseFlickingJSX(child, true))
      .join("");
    const events = el.props.events;
    const eventHandlers = Object.keys(events).map((eventName) => {
      return `(${eventName})="events.${eventName}($event)"`;
    });

    return `<ngx-flicking #flicking [options]="options" [plugins]="plugins" ${attrs.join(
      " "
    )} ${eventHandlers.join(" ")}>${replacedChildren}</ngx-flicking>`;
  } else if (!isValidElement(el)) {
    return el as unknown as string;
  } else {
    const attrs = flattenAttrs(el, flattenOptions);
    const replacedChildren = childs
      .map((child) => parseFlickingJSX(child))
      .join("");

    if (isPanel) {
      attrs.push("flicking-panel");
    }

    return `<${el.type} ${attrs.join(" ")}>${replacedChildren}</${el.type}>`;
  }
};

export { render, cleanup };
