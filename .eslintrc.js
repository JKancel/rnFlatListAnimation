module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            trailingComma: 'none',
            tabWidth: 2,
            semi: true,
            singleQuote: true,
            bracketSpacing: true,
            eslintIntegration: true,
            printWidth: 120,
            arrowParens: 'avoid',
            parser: 'babel-ts'
          }
        ],
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'comma-dangle': ['error', 'never'],
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'no-confusing-arrow': ['error', {allowParens: true}],
        'react-hooks/exhaustive-deps': 'warn',
        'react-native/no-inline-styles': 'off'
      }
    }
  ]
};
