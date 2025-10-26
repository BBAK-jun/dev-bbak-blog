// Flat config bridge for ESLint v9
const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = [
  ...compat.extends('@dev-bbak/eslint-config/base'),
  ...compat.extends('@dev-bbak/eslint-config/react'),
  ...compat.extends('@dev-bbak/eslint-config/next'),
  {
    ignores: ['node_modules', '.next', 'dist', 'public', 'coverage', 'eslint.config.cjs'],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
]
