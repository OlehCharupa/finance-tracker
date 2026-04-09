import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module"
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          "newlines-between": "always"
        }
      ]
    }
  },

  // 🌐 client (browser)
  {
    files: ["client/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        window: true,
        document: true
      }
    }
  },

  // 🖥 server (node)
 {
  files: ["server/**/*.{js,ts}"],
  languageOptions: {
    globals: globals.node
  }
}
];