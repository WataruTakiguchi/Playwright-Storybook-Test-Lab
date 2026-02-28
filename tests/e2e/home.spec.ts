import { test, expect } from '@playwright/test';
import { appQa, homeQa } from '../../src/testids';

test('トップページで locator 方針どおりに操作できる', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId(appQa.shell)).toBeVisible();
  await expect(page.getByRole('heading', { name: /playwright \+ storybook\s*の基本構成/i })).toBeVisible();
  await expect(page.getByTestId(homeQa.exampleCard.form)).toBeVisible();
  await page.getByLabel('表示テキスト').fill('E2E 確認');
  await page.getByRole('button', { name: '反映する' }).click();
  await expect(page.getByTestId(homeQa.exampleCard.message)).toHaveText('現在の表示: E2E 確認');

  await page.getByRole('button', { name: /クリック回数/i }).click();

  await expect(page.getByTestId(homeQa.exampleCard.button)).toHaveText('クリック回数: 1');
});

test('入力フォームを空で送信すると未設定に戻る', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('表示テキスト').fill('フォーム確認');
  await page.getByRole('button', { name: '反映する' }).click();
  await expect(page.getByTestId(homeQa.exampleCard.message)).toHaveText('現在の表示: フォーム確認');

  await page.getByLabel('表示テキスト').fill('');
  await page.getByRole('button', { name: '反映する' }).click();

  await expect(page.getByTestId(homeQa.exampleCard.message)).toHaveText('現在の表示: 未設定');
});
