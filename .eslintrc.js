module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'max-len': ['error', 120, { ignoreTemplateLiterals: true, ignoreStrings: true }],
    'no-unused-vars': 'warn'
  }
}
