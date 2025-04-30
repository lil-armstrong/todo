import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: ["eslint:recommended", "next", "next/core-web-vitals"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
    },
    ignorePatterns: [
      "node_modules/",
      "build/",
      "dist/",
      ".next/",
      "out/",
      "coverage/",
      "public/",
      "package-lock.json",
      "yarn.lock",
      "*.d.ts",
    ],
  }),
];

export default eslintConfig;
