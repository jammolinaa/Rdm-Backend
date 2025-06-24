module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 'key-spacing': [
    //   'error', {
    //     'align': { 'beforeColon': true, 'afterColon': true, 'on': 'colon' }
    //   }
    // ],
    'global-require': 'off',
    'newline-per-chained-call': 'off',
    'import/no-dynamic-require': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'class-methods-use-this': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
