import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    // Add rules configuration
    rules: {
      // Disable the img element warning
      "@next/next/no-img-element": "off",
      
      // Disable TypeScript any type errors
      "@typescript-eslint/no-explicit-any": "off",
      
      // Disable unused variables warning
      // "@typescript-eslint/no-unused-vars": "off",
      
      // Optional: Keep unused vars but ignore ones starting with underscore
      // "@typescript-eslint/no-unused-vars": [
      //   "error",
      //   {
      //     "argsIgnorePattern": "^_",
      //     "varsIgnorePattern": "^_"
      //   }
      // ],
    },
  },
];

export default eslintConfig;