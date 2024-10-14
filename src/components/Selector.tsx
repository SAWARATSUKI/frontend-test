'use client';
import React, { useEffect, useState } from 'react';
export default function Selector({
  onChange,
}: Readonly<{ onChange: (prefectures: number[]) => void }>) {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture[]>(
    []
  );
  useEffect(() => {
    const fetchPrefectures = async () => {
      const res = await fetch(
        'https://opendata.resas-portal.go.jp/api/v1/prefectures',
        {
          headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_APIKEY! },
        }
      );
      const data = await res.json();
      console.log(process.env.NEXT_PUBLIC_RESAS_API_KEY);
      setPrefectures(data.result);
    };
    fetchPrefectures();
  });
  return (
    <div>
      {prefectures.map((prefecture) => {
        return (
          <label key={prefecture.prefCode}>
            <input
              type="checkbox"
              value={prefecture.prefCode}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedPrefecture([...selectedPrefecture, prefecture]);
                  onChange([
                    ...selectedPrefecture.map((pref) => pref.prefCode),
                    Number(e.target.value),
                  ]);
                } else {
                  onChange([
                    ...selectedPrefecture
                      .map((pref) => pref.prefCode)
                      .filter(
                        (prefCode) => prefCode !== Number(e.target.value)
                      ),
                  ]);
                  setSelectedPrefecture([
                    ...selectedPrefecture.filter(
                      (pref) => pref.prefCode !== Number(e.target.value)
                    ),
                  ]);
                }
              }}
            />
            {prefecture.prefName}
          </label>
        );
      })}
    </div>
  );
}
