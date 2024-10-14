'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Selector from '@/components/Selector';

export default function Home() {
  return (
    <div className={styles.page}>
      <Selector />
    </div>
  );
}
