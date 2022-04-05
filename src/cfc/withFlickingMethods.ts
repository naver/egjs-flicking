import Component from "@egjs/component";

import Flicking from "../Flicking";

/**
 * Decorator that makes the method of flicking available in the framework.
 * @ko 프레임워크에서 플리킹의 메소드를 사용할 수 있게 하는 데코레이터.
 * @memberof eg.Flicking
 * @private
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
    Object.getOwnPropertyNames(proto).filter(name => !prototype[name] && name.indexOf("_") !== 0 && name !== "constructor")
      .forEach((name: string) => {
        const descriptor = Object.getOwnPropertyDescriptor(proto, name)!;

        if (descriptor.value) {
          // Public Function
          Object.defineProperty(prototype, name, {
            value: function(...args) {
              return descriptor.value.call(this[flickingName], ...args);
            }
          });
        } else {
          const getterDescriptor: { get?: () => any; set?: (val: any) => void } = {};
          if (descriptor.get) {
            getterDescriptor.get = function() {
              const flicking = this[flickingName];
              return flicking && descriptor.get?.call(flicking);
            };
          }
          if (descriptor.set) {
            getterDescriptor.set = function(...args) {
              return descriptor.set?.call(this[flickingName], ...args);
            };
          }

          Object.defineProperty(prototype, name, getterDescriptor);
        }
      });
  });
};

export default withFlickingMethods;
