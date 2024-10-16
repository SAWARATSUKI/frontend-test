'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Selector from '@/components/Selector';
import { useState } from 'react';
import React from 'react';
export default function Home() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<number[] | null>(
    null
  );

  const handleSelectorChange = (prefCode: number, checked: boolean) => {
    setSelectedPrefecture((prev) =>
      checked
        ? [...(prev || []), prefCode]
        : (prev || []).filter((p) => p !== prefCode)
    );
  };

  return (
    <div className={styles.page}>
      <Selector onChange={handleSelectorChange} />
    </div>
  );
}
