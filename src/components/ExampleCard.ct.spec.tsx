import { expect, test } from '@playwright/experimental-ct-react';
import { ExampleCard } from './ExampleCard';
import { homeQa } from '../testids';

test('コンポーネントテストでカウントを増やす', async ({ mount }) => {
  const component = await mount(<ExampleCard title="コンポーネントテスト" />);

  await expect(component.getByRole('heading', { name: 'コンポーネントテスト' })).toBeVisible();
  await component.getByLabel('表示テキスト').fill('CT 反映');
  await component.getByRole('button', { name: '反映する' }).click();
  await expect(component.getByTestId(homeQa.exampleCard.message)).toContainText('現在の表示: CT 反映');
  await component.getByRole('button', { name: /クリック回数/i }).click();
  await expect(component.getByTestId(homeQa.exampleCard.button)).toContainText('クリック回数: 1');
});
