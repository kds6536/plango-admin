import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'PlanGo Admin Dashboard',
  description: 'PlanGo 관리자 대시보드',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-900 text-white">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
          <Navigation />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 