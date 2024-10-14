import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
export const metadata: Metadata = {
  title: '都道府県別-人口推移グラフ',
  description: '人口推移のグラフを表示します。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
