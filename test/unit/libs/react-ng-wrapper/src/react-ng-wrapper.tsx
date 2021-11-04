/* eslint-disable @typescript-eslint/no-namespace */
import React from "react";

import {
  ɵrenderComponent as renderComponent,
  ɵmarkDirty as markDirty,
  ɵLifecycleHooksFeature as LifecycleHooksFeature,
  ɵComponentType as componentType,
  ɵComponentDef as ComponentDef,
  ɵNG_COMP_DEF as NG_COMPONENT_DEF,
  SimpleChange,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { Subscription } from "rxjs";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}

export class ReactNgWrapper<T, U = any> extends React.Component<U, { selector: string; propChanged: Set<string> }> {
  private _childComponent: T & Partial<OnChanges>;
  private _componentDef: ComponentDef<T>;
  private _subscriptions: Subscription[] = [];

  public constructor(props: Readonly<U>, private componentFactory: componentType<T>) {
    super(props);

    this._componentDef = componentFactory[NG_COMPONENT_DEF] || null;

    if (!this._componentDef) {
      throw new Error(`A component with a ${NG_COMPONENT_DEF} is required`);
    }

    this.state = {
      selector: this._componentDef.selectors[0][0] as string,
      propChanged: new Set<string>()
    };
  }

  public componentWillUnmount() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // After the component did mount, we set the state each second.
  public componentDidMount() {
    // render component after selector is in DOM
    this._childComponent = renderComponent(this.componentFactory, { hostFeatures: [LifecycleHooksFeature] });

    // listen to outputs
    this._subscriptions.push(
      ...Object.keys(this._componentDef.outputs).map(
        (output) => {
          return this._childComponent[output].subscribe((e) => {
            if (this.props[output] && typeof this.props[output] === "function") {
              this.props[output](e);
            }
          });
        }
      )
    );

    // bind inputs
    this.updateComponent();
  }

  public componentDidUpdate() {
    this.updateComponent();
  }

  public updateComponent() {
    if (this._childComponent) {
      const changes: SimpleChanges = {};
      // update inputs and detect changes
      Object.keys(this.props).forEach(prop => {
        if (this._childComponent[prop] &&
          Object.keys(this._componentDef.inputs).includes(prop) &&
          this._childComponent[prop] !== this.props[prop]) {

          changes[prop] = new SimpleChange(this._childComponent[prop], this.props[prop], !this.state.propChanged.has(prop));
          this.state.propChanged.add(prop);
          this._childComponent[prop] = this.props[prop];
        }
      });

      if (typeof this._childComponent.ngOnChanges === "function") {
        this._childComponent.ngOnChanges(changes);
      }

      markDirty(this._childComponent);
    }
  }

  // render will know everything!
  public render() {
    const CustomTag = `${this.state.selector}`;

    return (
      <CustomTag></CustomTag>
    );
  }
}
