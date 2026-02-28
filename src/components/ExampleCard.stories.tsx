import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { ExampleCard } from './ExampleCard';
import { homeQa } from '../testids';

const meta = {
  title: 'Components/ExampleCard',
  component: ExampleCard,
  args: {
    title: 'Storybook のインタラクション確認'
  },
  parameters: {
    docs: {
      description: {
        component: `この Story では data-testid をページ単位の定数から参照しています。例: homeQa.exampleCard.nameInput = "${homeQa.exampleCard.nameInput}"`
      }
    }
  }
} satisfies Meta<typeof ExampleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactions: Story = {
  args: {
    title: '操作確認済み'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const onUnhandled = fn();

    await userEvent.clear(canvas.getByLabelText('表示テキスト'));
    await userEvent.type(canvas.getByLabelText('表示テキスト'), 'Storybook 反映');
    await userEvent.click(canvas.getByRole('button', { name: '反映する' }));
    await expect(canvas.getByTestId(homeQa.exampleCard.message)).toHaveTextContent('現在の表示: Storybook 反映');

    await userEvent.click(canvas.getByRole('button', { name: /クリック回数/i }));

    await expect(canvas.getByTestId(homeQa.exampleCard.button)).toHaveTextContent('クリック回数: 1');
    expect(onUnhandled).not.toHaveBeenCalled();
  }
};
