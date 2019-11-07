const base = require('@umijs/fabric/dist/eslint');

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'default-case': 0,
    'react/sort-comp': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'jsx-a11y/no-autofocus': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
