module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true,
    },
    extends: 'standard',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'indent': ['warn', 4, { SwitchCase: 1 }],
        'comma-dangle': 0,
        'quotes': 0,
        'quote-props': ['warn', 'consistent-as-needed'],
        'semi': ['warn', 'always'],
        'space-before-function-paren': 0,
    }
}
