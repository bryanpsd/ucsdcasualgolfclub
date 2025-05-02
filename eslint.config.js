import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser' // Import the Astro parser
import typescriptParser from '@typescript-eslint/parser'
import typescript from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.astro'], // Only include files in the `src` directory
    languageOptions: {
      parser: astroParser, // Use the imported Astro parser
      parserOptions: {
        parser: typescriptParser, // Use TypeScript parser for embedded scripts
        project: './tsconfig.json', // Explicitly reference tsconfig.json
        ecmaVersion: 2021,
        sourceType: 'module',
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      astro,
    },
    rules: {
      'astro/no-set-html-directive': 'error', // Example Astro-specific rule
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'], // Only include TypeScript files in `src`
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json', // Explicitly reference tsconfig.json
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  prettier,
]
