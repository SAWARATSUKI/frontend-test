'use client';
import { getPrefectures } from '@/server/actions';

import React, { useEffect, useState } from 'react';
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
    <div>
      {prefectures.map((prefecture) => {
        return (
          <label key={prefecture.prefCode}>
            <input
              type="checkbox"
              value={prefecture.prefCode}
              onChange={(e) =>
                onChange(
                  prefecture.prefCode,
                  prefecture.prefName,
                  e.target.checked
                )
              }
            />
            {prefecture.prefName}
          </label>
        );
      })}
    </div>
  );
}
