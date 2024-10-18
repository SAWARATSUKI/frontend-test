import React from 'react';
import styles from '@/app/styles/loading.module.css';
interface LoadingProps {
  loading: boolean; // ローディング状態
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  if (!loading) return null; // ローディングがfalseのときは何も表示しない

  return (
    <div
      className={styles.skeleton}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default Loading;
