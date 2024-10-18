'use client';
export const runtime = 'edge';
import styles from './page.module.css';
import Selector from '@/app/components/Selector';
import Chart from '@/app/components/Chart';
import { useCallback, useEffect, useState } from 'react';
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
  // 選択された人口タイプ
  const [selectedType, setSelectedType] = useState<
    'total' | 'youth' | 'workin_age' | 'elderly'
  >('total');
  // チャートに表示する人口データ
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);

  // チャートの読み込み状態
  const [loadingChart, setLoadingChart] = useState<boolean>(true);

  // 都道府県の人口データを取得する関数
  const fetchPopulationData = useCallback(
    async (prefCode: number, prefName: string) => {
      setLoadingChart(true);
      try {
        const response = await getPopulationData(prefCode);
        const typeData =
          response.find(
            (item: ResponsePopulation) =>
              item.label === labelTypes[selectedType]
          )?.data || [];

        const formattedData = typeData.map((entry) => ({
          year: entry.year,
          value: entry.value,
          prefName: prefName,
        }));
        setPopulationData((prevData) => [...prevData, ...formattedData]);
      } catch (e) {
        console.error(e);
      }
      setLoadingChart(false);
    },
    [selectedType] // selectedTypeに依存
  );

  // 選択された都道府県や人口タイプが変更された時にデータを取得
  useEffect(() => {
    // 各都道府県ごとにデータを取得
    setPopulationData([]); // 以前のデータをクリア
    if (!selectedPrefecture) return;
    selectedPrefecture.forEach((prefCode) => {
      fetchPopulationData(prefCode.prefCode, prefCode.prefName);
    });
  }, [selectedPrefecture, selectedType, fetchPopulationData]);

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

  return (
    <div className={styles.main}>
      <h1>都道府県別人口推移</h1>
      {/* 都道府県を選択する */}
      <Selector onChange={handleSelectorChange} />
      {/* 表示するタイプの変更 */}
      <select
        className={styles.select_view}
        onChange={handleTypeChange}
        value={selectedType}
      >
        <option value="total">総人口</option>
        <option value="youth">年少人口</option>
        <option value="workin_age">生産年齢人口</option>
        <option value="elderly">老年人口</option>
      </select>
      {/* チャートの表示 */}
      <h1 className={styles.title}>{labelTypes[selectedType]}</h1>
      <Chart data={populationData} loading={loadingChart} />
    </div>
  );
}
