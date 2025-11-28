/** @type {import("stylelint").Config} */
export default {
    extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['custom-variant', 'theme', 'apply'],
            },
        ],
        'hue-degree-notation': null,
        'no-descending-specificity': null,
        'no-empty-source': null,
        'block-no-empty': true,
    },
}
