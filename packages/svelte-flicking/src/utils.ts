export const findIndex = (array: any[], checker: (val: any) => boolean): number => {
  for (let idx = 0; idx < array.length; idx++) {
    if (checker(array[idx])) {
      return idx;
    }
  }

  return -1;
};
