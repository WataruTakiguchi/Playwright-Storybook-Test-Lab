# テスト戦略

## 共有 testid

- `data-testid` の値はすべて `src/testids.ts` に集約します。
- コンポーネント、unit test、Storybook のインタラクションテスト、E2E、component test はすべてこの単一ソースを参照します。

## Playwright の locator 方針

- ユーザーが触る操作要素、見出し、意味のある要素には `getByRole` を優先します。
- `getByTestId` は role や文言に依存させたくない安定した構造アンカーに限定します。
- 実運用では、ページの外枠やコンポーネント root は `getByTestId`、ボタンや見出しの操作は `getByRole` を使います。

## 実行対象

- `npm run test:unit`: Vitest + Testing Library
- `npm run test:storybook:ci`: Storybook + test runner
- `npm run test:ct`: Playwright component testing
- `npm run test:e2e`: Playwright end-to-end
