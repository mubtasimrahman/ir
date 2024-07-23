module.exports = {
    root: true,
    env: {
      node: true,
      es2020: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.json",
    },
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    plugins: ["@typescript-eslint"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "prettier"
    ],
    rules: {
      "import/order": ["error", { "newlines-between": "always" }],
      "import/no-unresolved": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    },
  };
  