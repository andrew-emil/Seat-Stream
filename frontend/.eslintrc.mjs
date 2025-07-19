module.exports = {
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
