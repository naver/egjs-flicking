// return [0, 1, ...., max - 1]
export function counter(max: number): number[] {
  return [...Array(max).keys()];
}
