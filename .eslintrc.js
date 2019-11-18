module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    ...base.rules,
    'default-case': 0,
    'react/sort-comp': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/anchor-has-content': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
