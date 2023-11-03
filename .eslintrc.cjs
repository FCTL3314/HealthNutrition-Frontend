/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  rules: {
    "indent": ["error", 4],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "sort-imports": ["error", {
        "ignoreCase": false,
        "ignoreDeclarationSort": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        "allowSeparatedGroups": false
    }]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
