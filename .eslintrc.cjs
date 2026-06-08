module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/attributes-order': 'off',
    'vue/html-self-closing': ['error', {
      html: { void: 'any', normal: 'any', component: 'any' }
    }],
    'vue/require-default-prop': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'vue/no-v-html': 'warn',
  },
}