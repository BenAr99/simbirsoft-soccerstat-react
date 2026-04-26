import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {defineConfig, globalIgnores} from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-empty-function': 'warn',
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-shadow': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            "react-refresh/only-export-components": "off",
            eqeqeq: 'error',
            'guard-for-in': 'error',
            'max-classes-per-file': ['error', 1],
            'max-len': [
                'warn',
                {
                    code: 120,
                    comments: 160,
                },
            ],
            'max-lines': ['error', 400],
            'no-bitwise': 'error',
            'no-console': 'off',
            'no-new-wrappers': 'error',
            'no-useless-concat': 'error',
            'no-var': 'error',
            'no-restricted-syntax': 'off',
            'no-shadow': 'error',
            'one-var': ['error', 'never'],
            'prefer-arrow-callback': 'error',
            'prefer-const': 'error',
            'sort-imports': [
                'error',
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    allowSeparatedGroups: true,
                },
            ],
            'no-eval': 'error',
            'no-implied-eval': 'error',
        },
        languageOptions: {
            globals: globals.browser,
        },
    },
])
