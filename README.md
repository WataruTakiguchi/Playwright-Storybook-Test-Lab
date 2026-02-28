# Playwright / Storybook Test Lab

Vite + React + TypeScript を土台に、Playwright E2E、Playwright Component Testing、Storybook test runnerの運用方針を検証するためのリポジトリです。

## テスト方針

このリポジトリでは、テストコードの書き方を先に統一します。テストを書くときは、まずロケータ方針と testIdの管理ルールを守ってください。

## ロケータ方針

優先順位は以下です。

1. `getByTestId`
2. `getByRole` / `getByLabel`
3. CSS / XPath

補足:

- このリポジトリでは、まず `getByTestId` を最優先にします。UI文言の変更に引きずられにくく、
  E2E / CT / Storybook test runnerで共通化しやすいためです。
- 次に `getByRole` / `getByLabel` を使います。ユーザー操作の意図を明示したい場面や、フォーム入力のようにラベルが安定している場面で使います。
- CSSセレクタや XPathは最後の手段です。原則禁止です。どうしても避けられない場合だけ使い、その理由をテストコード上のコメントで残してください。

## testid 管理

`data-testid` は文字列直書き禁止です。必ず共有定数を経由してください。

現在の管理場所:

- 共通: [src/testids/common/app.ts](https://github.com/WataruTakiguchi/Playwright-Storybook-Test-Lab/blob/main/src/testids/common/app.ts)
- ページ単位: [src/testids/pages/home.ts](https://github.com/WataruTakiguchi/Playwright-Storybook-Test-Lab/blob/main/src/testids/pages/home.ts)
- 集約 export: [src/testids/index.ts](https://github.com/WataruTakiguchi/Playwright-Storybook-Test-Lab/blob/main/src/testids/index.ts)

### 追加手順

1. 追加先を決めます。
2. その画面だけで使うなら `src/testids/pages/<page>.ts` に追加します。
3. 複数画面で再利用するなら `src/testids/common/` に追加します。
4. `src/testids/index.ts` から再エクスポートします。
5. コンポーネントでは `data-testid={...}` で参照します。
6. テストでも同じ定数をimportして使います。

### 命名規則

- 値はkebab-caseにします。
- どの要素か分かる接頭辞を付けます。
- 画面単位のidは、画面名や機能名で名前空間を切ります。

例:

- `app-shell`
- `example-card-form`
- `example-card-name-input`
- `example-card-apply-button`

### 粒度

- ページ全体の安定アンカーは付けます。
- フォーム、主要ボタン、主要表示領域など、テストで繰り返し触る要素には付けます。
- 見た目だけのラッパーや、一度も参照しない装飾要素にはむやみに付けません。
- 1つの操作や検証に対して、最小限のidだけ追加します。

## JSX ルール

`data-testid="literal"` のような文字列直書きは、ESLintでエラーになります。

NG:

```tsx
<input data-testid="login-email" />
```

OK:

```tsx
<input data-testid={homeQa.exampleCard.nameInput} />
```

例外が必要な場合は、通常の ESLint ルールと同様に抑制できます。

```tsx
// eslint-disable-next-line local-testid/no-literal-testid
<input data-testid="temporary-exception" />
```

## テストの役割分担

### E2E

- 画面をまたぐ主要導線や、ブラウザ上での実動作確認を担当します。
- ルーティング、起動、フォーム送信、最終的な表示確認などを見ます。
- 増やしすぎないのが原則です。1機能につき「代表的な正常系」を優先し、細かい分岐はCTやStorybook testに寄せてください。

### Storybook test

- コンポーネント単位のインタラクション確認を担当します。
- `play` 関数で入力やクリックを行い、見た目と操作の整合を素早く確認します。
- UI カタログとテストを同じ場所で管理したいケースに向いています。

### Component Testing (CT)

- ブラウザ実行のまま、コンポーネント単体を検証します。
- E2Eにするほどではないが、DOM・イベント・ブラウザ挙動は見たいケースを担当します。
- E2Eの前に、部品単位で失敗を早く切り分けたいときに使います。

### どこに何を書くか

- ページ全体のシナリオ: E2E
- 単一コンポーネントの操作フロー: Storybook test または CT
- E2Eで細かい分岐を量産しない

## ローカル実行コマンド

### 開発

- `npm run dev`: アプリ起動
- `npm run storybook`: Storybook 起動

### ビルド

- `npm run build`: アプリビルド
- `npm run build-storybook`: Storybook ビルド

### テスト

- `npm run lint`: ESLint
- `npm run test:unit`: Vitest
- `npm run test:e2e`: Playwright E2E
- `npm run test:ct`: Playwright Component Testing
- `npm run test:storybook`: Storybook build + test runner を CI 想定で実行

## テスト追加時の基本手順

1. 先に `src/testids` に必要なidを追加します。
2. コンポーネントへ `data-testid={...}` を付けます。
3. 近い層のテストを追加します。
4. 本当にページ全体で見る必要があるものだけE2Eに上げます。
5. `npm run lint` と該当テストをローカルで通してからPRを作ります。

この README のルールに従えば、新規参加者でも同じ基準でtestIdと、Playwright / Storybook テストを追加できます。
