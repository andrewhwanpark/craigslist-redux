/**
 * Given an argument, return `true` if it is not `undefined` or `null`.
 */
export const isDefined = (x) => {
  return x != null;
};

/**
 * Given an argument, determine if it is `null` or `undefined`.
 */
export const isNullable = (x) => {
  return x == null;
};
