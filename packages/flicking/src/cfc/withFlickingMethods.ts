import Component from "@egjs/component";

import Flicking from "../Flicking";

/**
 * Decorator that makes the method of flicking available in the framework.
 * @internal
 * @example
 * ```js
 * import Flicking, { withFlickingMethods } from "@egjs/flicking";
 *
 * class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
 *   &#64;withFlickingMethods
 *   private flicking: Flicking;
 * }
 * ```
 */
const withFlickingMethods = (prototype: any, flickingName: string) => {
  [Component.prototype, Flicking.prototype].forEach(proto => {
    Object.getOwnPropertyNames(proto)
      .filter(name => !prototype[name] && name.indexOf("_") !== 0 && name !== "constructor")
      .forEach((name: string) => {
        const descriptor = Object.getOwnPropertyDescriptor(proto, name)!;

        if (descriptor.value) {
          // Public Function
          Object.defineProperty(prototype, name, {
            value: function (...args) {
              return descriptor.value.call(this[flickingName], ...args);
            }
          });
        } else {
          const getterDescriptor: { get?: () => any; set?: (val: any) => void } = {};
          if (descriptor.get) {
            getterDescriptor.get = function () {
              const flicking = this[flickingName];
              return flicking && descriptor.get?.call(flicking);
            };
          }
          if (descriptor.set) {
            getterDescriptor.set = function (...args) {
              return descriptor.set?.call(this[flickingName], ...args);
            };
          }

          Object.defineProperty(prototype, name, getterDescriptor);
        }
      });
  });
};

export default withFlickingMethods;
