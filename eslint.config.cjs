module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "prettier"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    es2021: true
  },
  overrides: [
    {
      files: ["client/**/*.{ts,tsx}"],
      env: {
        browser: true
      }
    },
    {
      files: ["server/**/*.{ts,js}"],
      env: {
        node: true
      }
    }
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "unused-imports/no-unused-imports": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal"],
        "newlines-between": "always"
      }
    ]
  }
};