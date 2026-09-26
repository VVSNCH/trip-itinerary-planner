const HEX_COLOUR = '/#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b/'

const visualRules = [
  {
    selector: `Literal[value=${HEX_COLOUR}]`,
    message: 'Colours live in src/theme/colors.ts.',
  },
  {
    selector: `TemplateElement[value.raw=${HEX_COLOUR}]`,
    message: 'Colours live in src/theme/colors.ts.',
  },
  {
    selector: 'Literal[value=/\\d+(\\.\\d+)?px\\b/]',
    message: 'Sizes live in src/theme (spacing, sizes, radii).',
  },
  {
    selector: 'TemplateElement[value.raw=/(^|[^\\w.-])\\d+(\\.\\d+)?px\\b/]',
    message: 'Sizes live in src/theme (spacing, sizes, radii).',
  },
]

module.exports = {
  root: true,
  ignorePatterns: ['dist', 'coverage', 'node_modules'],
  env: { browser: true, es2022: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-console': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}', 'src/setupTests.ts'],
      env: { node: true },
      globals: { describe: 'readonly', it: 'readonly', expect: 'readonly', vi: 'readonly' },
    },
    { files: ['*.cjs', 'vite.config.ts'], env: { node: true } },
    {
      files: ['src/**/*.{ts,tsx}'],
      excludedFiles: ['src/theme/**'],
      rules: { 'no-restricted-syntax': ['error', ...visualRules] },
    },
    {
      files: ['src/**/*.{ts,tsx}'],
      excludedFiles: ['src/theme/**', 'src/components/**'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@mui/*', '@emotion/*'],
                message: 'Use the components in src/components instead.',
              },
            ],
          },
        ],
        'no-restricted-syntax': [
          'error',
          ...visualRules,
          {
            selector: "JSXAttribute[name.name='sx']",
            message: 'sx is only for src/components/common.',
          },
        ],
      },
    },
  ],
}
