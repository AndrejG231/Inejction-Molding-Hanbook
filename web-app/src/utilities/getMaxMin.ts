type getMaxMinT = {
  (values: number[] | { [key in string]: any }, branch?: string): {
    max: number;
    min: number;
  };
};

export const getMaxMin: getMaxMinT = (values, branch) => {
  let [max, min] = [-Infinity, Infinity];
  if (branch) {
    values.forEach((val: { [key in string]: number }) => {
      const value = val[branch];
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
    });
    return { max: max, min: min };
  }
  values.forEach((value: number) => {
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  });
  return { max: max, min: min };
};
