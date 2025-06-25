'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'

export default function DestinationsPage() {
  const [destinations] = useState([
    { id: 1, name: '서울', country: '대한민국', popularity: '높음', status: '활성' },
    { id: 2, name: '제주도', country: '대한민국', popularity: '매우 높음', status: '활성' },
    { id: 3, name: '부산', country: '대한민국', popularity: '높음', status: '활성' },
    { id: 4, name: '도쿄', country: '일본', popularity: '높음', status: '활성' },
  ])

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">여행지 관리</h1>
        <p className="text-gray-600 mt-2">등록된 여행지들을 관리합니다</p>
      </div>

      <div className="mb-6">
        <Button>새 여행지 추가</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">이름</th>
                <th className="text-left p-4">국가</th>
                <th className="text-left p-4">인기도</th>
                <th className="text-left p-4">상태</th>
                <th className="text-left p-4">작업</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((destination) => (
                <tr key={destination.id} className="border-b">
                  <td className="p-4">{destination.id}</td>
                  <td className="p-4">{destination.name}</td>
                  <td className="p-4">{destination.country}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      destination.popularity === '매우 높음' ? 'bg-red-100 text-red-800' :
                      destination.popularity === '높음' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {destination.popularity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {destination.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="outline" size="sm" className="mr-2">편집</Button>
                    <Button variant="destructive" size="sm">삭제</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
} 