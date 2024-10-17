'use client';
import { getPrefectures } from '@/server/actions';
import styles from './../styles/selector.module.css';
import React, { useEffect, useState } from 'react';

const PrefectureLabelElement = ({
  prefCode,
  prefName,
  onChange,
}: Readonly<{
  prefCode: number;
  prefName: string;
  onChange: (prefCode: number, prefName: string, checked: boolean) => void;
}>) => {
  return (
    <label>
      <input
        type="checkbox"
        value={prefCode}
        onChange={(e) => onChange(prefCode, prefName, e.target.checked)}
      />
      {prefName}
    </label>
  );
};
export default function Selector({
  onChange,
}: Readonly<{
  onChange: (prefCode: number, prefName: string, checked: boolean) => void;
}>) {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  useEffect(() => {
    const fetchPrefectures = async () => {
      let response = await getPrefectures();
      setPrefectures(response);
    };
    fetchPrefectures();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.selector}>
        {prefectures.map((prefecture) => {
          return (
            <>
              {/* 地方ごとにLabelを分ける */}
              {(() => {
                if (prefecture.prefCode === 1) {
                  return <h3>北海道</h3>;
                } else if (prefecture.prefCode === 2) {
                  return <h3>東北地方</h3>;
                } else if (prefecture.prefCode === 8) {
                  return <h3>関東</h3>;
                } else if (prefecture.prefCode === 15) {
                  return <h3>中部</h3>;
                } else if (prefecture.prefCode === 24) {
                  return <h3>近畿</h3>;
                } else if (prefecture.prefCode === 31) {
                  return <h3>中国</h3>;
                } else if (prefecture.prefCode === 36) {
                  return <h3>四国</h3>;
                } else if (prefecture.prefCode === 40) {
                  return <h3>九州・沖縄</h3>;
                }
              })()}
              <PrefectureLabelElement
                key={prefecture.prefCode}
                prefCode={prefecture.prefCode}
                prefName={prefecture.prefName}
                onChange={onChange}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
