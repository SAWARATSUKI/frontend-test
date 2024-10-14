import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Selector from './Selector';
import test from 'node:test';
import { expect, jest } from '@jest/globals';

test('都道府県の選択', () => {
  const onChange = jest.fn();
  render(<Selector onChange={onChange} />);
  //   北海道のラベルをクリック
  fireEvent.click(screen.getByLabelText('北海道'));
  //   北海道が1回呼ばれる
  expect(onChange).toHaveBeenCalledWith(1);
});
