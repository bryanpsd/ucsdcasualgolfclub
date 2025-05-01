/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  semi: false,
  bracketSpacing: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
