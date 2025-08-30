// src/eslint.config.cjs
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],
    // Replaces .eslintignore in ESLint v9
    ignores: [
      "coverage/**",
      "node_modules/**",
      "dist/**",
      "playwright-report/**"
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      ...js.configs.recommended.rules
    }
  }
];
