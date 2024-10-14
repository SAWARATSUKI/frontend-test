import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Selector from './Selector';
import test from 'node:test';
import { jest } from '@jest/globals';

const mockCallback = jest.fn();

test('都道府県別チェックボックスの表示を確認', async () => {
  render(<Selector />);
});
