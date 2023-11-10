import type { Metadata } from 'next';
import { DM_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Unsplash Search',
  description: 'A ZORA take home challenge by kkuhnen',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans`}>
        <div className={styles.colorBar} />
        <h1 className={styles.siteTitle}>{metadata.title?.toString()}</h1>
        <p className={styles.siteSubtitle}>
          {metadata.description?.toString()}
        </p>
        {children}
      </body>
    </html>
  );
}
