export function merge(target: object, ...srcs: object[]): object {
  srcs.forEach(source => {
    Object.keys(source).forEach(key => {
      const value = source[key];
      target[key] = value;
    });
  });

  return target;
}
