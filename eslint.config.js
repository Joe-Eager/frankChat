import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	prettierConfig,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module'
			}
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'react-refresh': reactRefreshPlugin,
			'react-hooks': reactHooksPlugin
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'no-restricted-imports': [
				'error',
				{
					patterns: ['@mui/*/*/*']
				}
			],
			semi: ['error', 'always'],
			'no-tabs': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'no-mixed-spaces-and-tabs': 'off',
			'react/prop-types': 'off',
			'cypress/no-unnecessary-waiting': 'off'
		}
	},
	{
		ignores: ['dist/**', '.eslintrc.{js,cjs}']
	}
];
