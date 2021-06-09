module.exports = {
  "extends": [
    "../../.eslintrc.js"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./test/unit/tsconfig.json",
    "sourceType": "module"
  },
  "rules": {
    "import/order": "off",
    "guard-for-in": "off",
    "max-classes-per-file": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@jsdoc/check-indentation": "off"
  }
};
