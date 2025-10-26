module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/recommended', // TODO: Enable jsx-a11y recommended rules
    'plugin:import/react',
    'plugin:prettier/recommended',
  ],
  plugins: ['react-refresh'],

  settings: {
    react: { version: 'detect' },
  },

  rules: {
    // React
    'react/display-name': 'off',
    'react/function-component-definition': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx', '.mdx'] }],
    'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-pascal-case': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/self-closing-comp': ['warn', { html: true, component: true }],

    // React Hooks
    'react-hooks/exhaustive-deps': 'warn',

    // JSX A11y

    // React refresh
    'react-refresh/only-export-components': 'off',
  },
}
