module.exports = {
  extends: ['plugin:@next/next/recommended'],
  plugins: ['react', 'jsx-a11y', 'react-refresh', 'import'],

  rules: {
    // Next
    '@next/next/no-duplicate-head': 'off',
    // React
    'react/jsx-no-target-blank': 'off',
    'react/no-unknown-property': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',

    // JSX A11y
    'jsx-a11y/alt-text': [
      'warn',
      {
        elements: ['img'],
        img: ['Image'],
      },
    ],
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',

    // Import
    'import/no-anonymous-default-export': 'warn',
    // React Refresh
    'react-refresh/only-export-components': 'off',
  },
}
