import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nsaka | Real Estate Ops for Zambia',
  description: 'Role-aware, mobile-first real estate management workspace for Zambia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#060b13]`}>{children}</body>
    </html>
  );
}
