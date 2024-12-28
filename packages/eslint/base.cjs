module.exports = {
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],

  reportUnusedDisableDirectives: true,

  env: {
    es2021: true,
  },

  settings: {
    'import/resolver': {
      node: {},
    },
  },

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },

  rules: {
    // JavaScript
    curly: ['warn', 'all'],
    eqeqeq: 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-implicit-coercion': 'error',
    'no-redeclare': 'warn',
    'no-shadow': 'off',
    'no-var': 'error',
    'prefer-const': 'warn',

    // Import
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'import/order': ['off'],
    'import/prefer-default-export': 'off',

    // simple-import-sort
    // https://github.com/lydell/eslint-plugin-simple-import-sort
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },

  overrides: [
    {
      files: ['*.js?(x)', '*.mjs'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
      },
    },
    {
      files: ['*.ts?(x)'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/stylistic',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
      ],

      rules: {
        // TypeScript
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'function', format: ['camelCase', 'PascalCase'] },
          { selector: ['interface', 'typeLike', 'enumMember'], format: ['PascalCase'] },
          { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'], leadingUnderscore: 'allow' },
        ],
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: false,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-use-before-define': 'off',

        // Import
        'import/default': 'off',
        'import/export': 'off',
        'import/namespace': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
}
