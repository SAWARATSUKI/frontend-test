import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Script from 'next/script';
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
      <head>
        {/* Adobe Fonts*/}
        <Script
          id="typekit"
          strategy="beforeInteractive" // スクリプトをページがインタラクティブになる前に実行
        >
          {`
          (function(d) {
            var config = {
              kitId: 'yle7ale',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
          })(document);
        `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
