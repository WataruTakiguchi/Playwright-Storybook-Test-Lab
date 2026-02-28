import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { appQa, homeQa } from './testids';

describe('App', () => {
  it('サンプルカードを表示してカウントを増やす', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByTestId(appQa.shell)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /playwright \+ storybook\s*の基本構成/i })).toBeVisible();

    await user.type(screen.getByLabelText('表示テキスト'), '単体テスト');
    await user.click(screen.getByRole('button', { name: '反映する' }));
    expect(screen.getByTestId(homeQa.exampleCard.message)).toHaveTextContent('現在の表示: 単体テスト');

    await user.click(screen.getByRole('button', { name: /クリック回数/i }));

    expect(screen.getByTestId(homeQa.exampleCard.button)).toHaveTextContent('クリック回数: 1');
  });

  it('入力フォームが空なら未設定に戻る', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText('表示テキスト'), '一度入力');
    await user.click(screen.getByRole('button', { name: '反映する' }));
    expect(screen.getByTestId(homeQa.exampleCard.message)).toHaveTextContent('現在の表示: 一度入力');

    await user.clear(screen.getByLabelText('表示テキスト'));
    await user.click(screen.getByRole('button', { name: '反映する' }));

    expect(screen.getByTestId(homeQa.exampleCard.message)).toHaveTextContent('現在の表示: 未設定');
  });
});
