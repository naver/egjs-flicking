module.exports = {
  "extends": [
    "../.eslintrc.js"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./test/tsconfig.json",
    "sourceType": "module"
  },
  "rules": {
    "guard-for-in": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/unbound-method": "off",
    "@jsdoc/check-indentation": "off"
  }
};
