import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import boundariesPlugin from 'eslint-plugin-boundaries'
import fsdPlugin from 'eslint-plugin-fsd-imports'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '*.config.js', '*.config.ts']),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      importPlugin.flatConfigs.recommended,
      boundariesPlugin.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'src/app/*',
          capture: ['app']
        },
        {
          type: 'pages',
          pattern: 'src/pages/*',
          capture: ['pages']
        },
        {
          type: 'widgets',
          pattern: 'src/widgets/*',
          capture: ['widgets']
        },
        {
          type: 'features',
          pattern: 'src/features/*',
          capture: ['features']
        },
        {
          type: 'entities',
          pattern: 'src/entities/*',
          capture: ['entities']
        },
        {
          type: 'shared',
          pattern: 'src/shared/*',
          capture: ['shared']
        }
      ],
      'boundaries/ignore': [
        '**/*.test.*',
        '**/*.spec.*',
        '**/__tests__/**',
        '**/__mocks__/**'
      ]
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
      'boundaries': boundariesPlugin,
      'fsd-imports': fsdPlugin,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: 10 }],
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          {
            from: ['app'],
            allow: ['pages', 'widgets', 'features', 'entities', 'shared']
          },
          {
            from: ['pages'],
            allow: ['widgets', 'features', 'entities', 'shared']
          },
          {
            from: ['widgets'],
            allow: ['features', 'entities', 'shared']
          },
          {
            from: ['features'],
            allow: ['entities', 'shared']
          },
          {
            from: ['entities'],
            allow: ['shared']
          },
          {
            from: ['shared'],
            allow: ['shared']
          }
        ]
      }],

      'fsd-imports/public-api-imports': ['error', {
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.spec.*']
      }],
      
      'fsd-imports/layer-imports': ['error', {
        alias: '@',
        ignoreImportPatterns: ['**/shared/**', '**/app/**']
      }],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
    },
  },

  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    rules: {
      'boundaries/element-types': 'off',
      'fsd-imports/public-api-imports': 'off',
      'fsd-imports/layer-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])