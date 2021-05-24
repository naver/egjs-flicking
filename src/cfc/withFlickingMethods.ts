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
  Object.getOwnPropertyNames(Flicking.prototype)
    .filter(name => !prototype[name] && !name.startsWith("_") && name !== "constructor")
    .forEach((name: keyof Flicking) => {
      const descriptor = Object.getOwnPropertyDescriptor(Flicking.prototype, name)!;

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
            return descriptor.get?.call(this[flickingName]);
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
};

export default withFlickingMethods;
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
