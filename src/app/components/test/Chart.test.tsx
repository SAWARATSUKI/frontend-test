import React from 'react';
import { render, screen } from '@testing-library/react';
import Chart from '../Chart';

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Line: () => <div>Line Component</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  CartesianGrid: () => <div>CartesianGrid</div>,
  Tooltip: () => <div>Tooltip</div>,
  Legend: () => <div>Legend</div>,
}));

test('グラフラベルのテキストが表示される', async () => {
  const data = [
    { year: 1990, value: 5000, prefName: '北海道' },
    { year: 2000, value: 4800, prefName: '北海道' },
    { year: 2010, value: 4700, prefName: '北海道' },
  ];

  const { getByText } = render(<Chart data={data} loading={false} />);
  expect(getByText('Line Component')).toBeInTheDocument(); // モックされたLineコンポーネントの確認
  expect(getByText('XAxis')).toBeInTheDocument(); // XAxisが存在するか確認
  expect(getByText('YAxis')).toBeInTheDocument(); // YAxisが存在するか確認
});
