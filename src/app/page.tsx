'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Selector from '@/app/components/Selector';
import Chart from '@/app/components/Chart';
import { useEffect, useState } from 'react';
import React from 'react';
import { getPopulationData } from '@/server/actions';
const labelTypes = {
  total: '総人口',
  youth: '年少人口',
  workin_age: '生産年齢人口',
  elderly: '老年人口',
};

export default function Home() {
  // 選択された都道府県と人口タイプを管理するステート
  const [selectedPrefecture, setSelectedPrefecture] = useState<
    { prefCode: number; prefName: string }[]
  >([]);
  const [selectedType, setSelectedType] = useState<
    'total' | 'youth' | 'workin_age' | 'elderly'
  >('total');
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);

  // 都道府県の人口データを取得する関数
  const fetchPopulationData = async (prefCode: number, prefName: string) => {
    const response = await getPopulationData(prefCode);
    const typeData =
      response.find((item: any) => item.label === labelTypes[selectedType])
        ?.data || [];

    const formattedData = typeData.map((entry: any) => ({
      year: entry.year,
      value: entry.value,
      prefName: prefName,
    }));
    setPopulationData((prevData) => {
      return [...prevData, ...formattedData];
    });
  };

  // 選択された都道府県の変更を受け取る関数
  const handleSelectorChange = (
    prefCode: number,
    prefName: string,
    checked: boolean
  ) => {
    setSelectedPrefecture((prev) =>
      checked
        ? // チェックがついている場合は都道府県コードを追加
          [...(prev || []), { prefCode, prefName }]
        : // チェックが外れている場合は都道府県コードを削除
          (prev || []).filter((p) => p.prefCode !== prefCode)
    );
  };

  // 人口タイプの変更を受け取る関数
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(
      e.target.value as 'total' | 'youth' | 'workin_age' | 'elderly'
    );
  };

  useEffect(() => {
    // 各都道府県ごとにデータを取得
    setPopulationData([]); // 以前のデータをクリア
    if (!selectedPrefecture) return;
    selectedPrefecture.forEach((prefCode) => {
      console.log(prefCode);
      fetchPopulationData(prefCode.prefCode, prefCode.prefName);
    });
  }, [selectedPrefecture, selectedType]);

  return (
    <>
      <div>
        <Selector onChange={handleSelectorChange} />
      </div>
      <select onChange={handleTypeChange} value={selectedType}>
        <option value="total">総人口</option>
        <option value="youth">年少人口</option>
        <option value="workin_age">生産年齢人口</option>
        <option value="elderly">老年人口</option>
      </select>
      <h1 className={styles.title}>{labelTypes[selectedType]}</h1>
      <Chart data={populationData} />
    </>
  );
}
