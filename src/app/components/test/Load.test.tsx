import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../Loading';

test('ローディング中はスケルトンが表示される', () => {
  const { container } = render(<Loading loading={true} />);

  // スケルトンが表示されているか確認
  const skeleton = container.querySelector('.skeleton');
  expect(skeleton).toBeInTheDocument();
});

test('ローディングが終わったらスケルトンが非表示になる', () => {
  const { container } = render(<Loading loading={false} />);

  // スケルトンが存在しないことを確認
  const skeleton = container.querySelector('.skeleton');
  expect(skeleton).toBeNull();
});
