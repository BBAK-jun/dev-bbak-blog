/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: "all",
  arrowParens: "always",
  endOfLine: "lf",

  plugins: ["prettier-plugin-packagejson"],
};
