module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-await-in-loop': 0,
    'no-use-before-define': 0,
    'no-restricted-syntax': 0,
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-loop-func': 'off',
    'no-return-assign': 'off',
  },
};
