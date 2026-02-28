import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const localTestIdPlugin = {
  rules: {
    'no-literal-testid': {
      meta: {
        type: 'problem',
        docs: {
          description: 'disallow string literals in JSX data-testid attributes'
        },
        messages: {
          noLiteral:
            'data-testid must reference a shared test id constant instead of a string literal.'
        },
        schema: []
      },
      create(context) {
        const isDataTestIdAttribute = (node) =>
          node.type === 'JSXAttribute' &&
          node.name.type === 'JSXIdentifier' &&
          node.name.name === 'data-testid';

        const isLiteralValue = (node) => {
          if (!node) {
            return false;
          }

          if (node.type === 'Literal' && typeof node.value === 'string') {
            return true;
          }

          if (node.type === 'JSXExpressionContainer') {
            const expression = node.expression;

            if (expression.type === 'Literal' && typeof expression.value === 'string') {
              return true;
            }

            if (
              expression.type === 'TemplateLiteral' &&
              expression.expressions.length === 0 &&
              expression.quasis.length === 1
            ) {
              return true;
            }
          }

          return false;
        };

        return {
          JSXAttribute(node) {
            if (!isDataTestIdAttribute(node)) {
              return;
            }

            if (isLiteralValue(node.value)) {
              context.report({
                node,
                messageId: 'noLiteral'
              });
            }
          }
        };
      }
    }
  }
};

export default tseslint.config(
  {
    ignores: ['dist', 'storybook-static', 'playwright-report', 'test-results', 'playwright/.cache']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      'local-testid': localTestIdPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'local-testid/no-literal-testid': 'error'
    }
  }
);
