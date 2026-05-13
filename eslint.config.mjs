// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: ['eslint.config.mjs']
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest
			},
			sourceType: 'commonjs',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no‑unsafe‑assignment': 'off',
			'prettier/prettier': ['error', { endOfLine: 'auto' }],
			// Правила которые составил ИИ
			// ---------- Общие (ESLint) ----------
			'no-console': 'off', // console – полезен в обучении
			'no-useless-concat': 'warn', // лишнее склеивание строк
			'@typescript-eslint/ban-ts-comment': [
				'warn',
				{ 'ts-ignore': false }
			],

			// ---------- TypeScript ----------
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			],
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/ban-types': [
				'warn',
				{
					extendDefaults: false,
					types: {
						'{}': false,
						Object: false
					}
				}
			],
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/explicit-member-accessibility': 'off',

			// ---------- import ----------
			'import/extensions': [
				'error',
				'ignorePackages',
				{ ts: 'never', tsx: 'never' }
			],
			'import/no-extraneous-dependencies': [
				'warn',
				{
					devDependencies: [
						'**/*.test.{ts,tsx}',
						'**/*.spec.{ts,tsx}',
						'**/test/**',
						'**/tests/**',
						'**/scripts/**',
						'**/webpack.config.*',
						'**/vite.config.*',
						'**/*.config.{ts,js}'
					]
				}
			],
			// ---------- Прочие рекомендации ----------
			quotes: ['warn', 'single', { avoidEscape: true }],
			'no-var': 'warn',
			'require-jsdoc': 'off',
			'@typescript-eslint/no-empty-function': 'warn', // Только предупреждение
			// Базовые правила ESLint (щядящие)
			'no-debugger': 'warn', // Разрешаем debugger, но с предупреждением
			'no-alert': 'warn', // Разрешаем alert, но с предупреждением

			// Стилистические правила (можно отключить если используете Prettier)
			semi: ['warn', 'always'], // Всегда ставим точку с запятой
			'comma-dangle': ['warn', 'always-multiline'], // Висячая запятая для многострочных структур

			// Дружелюбные правила для начинающих
			'prefer-const': 'warn', // Советуем использовать const, но не требуем
			eqeqeq: ['warn', 'always'] // Советуем использовать строгое равенство
		}
	}
)
