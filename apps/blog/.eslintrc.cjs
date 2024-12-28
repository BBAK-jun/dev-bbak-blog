module.exports = {
  extends: ['@dev-bbak/eslint-config/base', '@dev-bbak/eslint-config/react', '@dev-bbak/eslint-config/next'],
  ignorePatterns: ['dist', '.eslintrc.cjs', '!.storybook'],

  env: {
    es2020: true,
    node: true,
    browser: true,
  },
}
