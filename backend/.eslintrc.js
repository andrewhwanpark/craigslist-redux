module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "airbnb-base",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {},
};
