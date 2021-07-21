export const findIndex = (array, checker) => {
  for (let idx = 0; idx < array.length; idx++) {
    if (checker(array[idx])) {
      return idx;
    }
  }

  return -1;
};
