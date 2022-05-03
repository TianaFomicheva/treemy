/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    'root': true,
    'extends': [
        'plugin:vue/vue3-essential',
        // 'eslint:recommended',
        '@vue/eslint-config-prettier'
    ],
    'env': {
        'vue/setup-compiler-macros': true
    },
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',

        // allow async-await
        'vue/require-v-for-key': 'off',

        // allow v-for with v-if
        'vue/no-use-v-if-with-v-for': 'off',

        // indent
        'indent': ['error', 4, { 'SwitchCase': 1 }],

        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // spacing inside braces
        'object-curly-spacing': 'off'

        // vars aka area_id
    }
}
