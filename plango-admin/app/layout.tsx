import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Plango Admin',
  description: 'Plango 관리자 페이지',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 