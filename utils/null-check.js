/**
 * Given an argument, return `true` if it is not `undefined` or `null`.
 */
const isDefined = (x) => {
  return x != null;
};

/**
 * Given an argument, determine if it is `null` or `undefined`.
 */
const isNullable = (x) => {
  return x == null;
};

module.exports = { isDefined, isNullable };
