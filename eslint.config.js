import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser' // Import the Astro parser
import typescriptParser from '@typescript-eslint/parser'
import typescript from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'

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
      'jsx-a11y': jsxA11y,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.js', '**/*.ts'], // Apply to all JavaScript and TypeScript files
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly', // Define `console` as a global variable
        module: 'readonly', // Define `module` as a global variable
        require: 'readonly', // Define `require` as a global variable
        process: 'readonly', // Define `process` as a global variable
      },
    },
  },
  prettier,
]
