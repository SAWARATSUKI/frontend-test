import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Selector from './Selector';

beforeEach(() => {
  fetchMock.resetMocks(); // 各テスト前にモックをリセット
});

test('都道府県の選択', async () => {
  // APIのレスポンスをモック
  fetchMock.mockResponseOnce(
    JSON.stringify({ result: [{ prefCode: 1, prefName: '北海道' }] })
  );

  const onChange = jest.fn(); // モック関数を作成

  render(<Selector onChange={onChange} />); // コンポーネントをレンダリング

  // 北海道の要素が表示されるまで待つ
  const checkbox = await screen.findByLabelText('北海道');
  expect(checkbox).toBeInTheDocument(); // DOMに存在するか確認

  fireEvent.click(checkbox); // クリックイベントを発火
  expect(onChange).toHaveBeenCalledWith(1, true); //返り値が1,trueであれば良い
});
