import { prefectureColors } from '@/utils/colors';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PopulationData {
  year: number;
  value: number;
  prefName: string;
}

interface PopulationChartProps {
  data: PopulationData[];
}

const PopulationChart: React.FC<PopulationChartProps> = ({ data }) => {
  // データ全体から年を取得（重複を除く）
  const uniqueYears = Array.from(new Set(data.map((d) => d.year)));

  // 各年ごとのデータを年をキーにしてグループ化し、prefNameを使って折れ線を区別
  const formattedData = uniqueYears.map((year) => {
    const yearData: Record<string, number> = { year };
    data.forEach((d) => {
      if (d.year === year) {
        yearData[d.prefName] = d.value;
      }
    });
    return yearData;
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Array.from(new Set(data.map((d) => d.prefName))).map(
            (prefName, index) => (
              <Line
                key={prefName}
                type="monotone"
                dataKey={prefName} // 都道府県名をdataKeyとして使用
                name={prefName} // 都道府県名を表示
                stroke={prefectureColors[String(index)]} // 都道府県ごとに色を分ける
              />
            )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationChart;
