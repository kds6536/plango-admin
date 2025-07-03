'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react'

export default function DestinationsPage() {
  const [destinations] = useState([
    { id: 1, name: '서울', country: '대한민국', popularity: '높음', status: '활성', visits: 1250 },
    { id: 2, name: '제주도', country: '대한민국', popularity: '매우 높음', status: '활성', visits: 2100 },
    { id: 3, name: '부산', country: '대한민국', popularity: '높음', status: '활성', visits: 890 },
    { id: 4, name: '도쿄', country: '일본', popularity: '높음', status: '활성', visits: 1680 },
    { id: 5, name: '오사카', country: '일본', popularity: '중간', status: '활성', visits: 650 },
    { id: 6, name: '방콕', country: '태국', popularity: '높음', status: '비활성', visits: 420 },
  ])

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case '매우 높음': return 'bg-red-900/50 text-red-300 border border-red-700'
      case '높음': return 'bg-orange-900/50 text-orange-300 border border-orange-700'
      case '중간': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
      default: return 'bg-green-900/50 text-green-300 border border-green-700'
    }
  }

  const getStatusColor = (status: string) => {
    return status === '활성' 
      ? 'bg-green-900/50 text-green-300 border border-green-700'
      : 'bg-gray-700/50 text-gray-300 border border-gray-600'
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <MapPin className="w-8 h-8 text-blue-400" />
          여행지 관리
        </h1>
        <p className="text-gray-300 mt-2">등록된 여행지들을 관리하고 새로운 여행지를 추가합니다</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="card">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-300">총 여행지</h3>
            <p className="text-2xl font-bold text-blue-400 mt-2">{destinations.length}개</p>
          </div>
        </Card>
        <Card className="card">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-300">활성 여행지</h3>
            <p className="text-2xl font-bold text-green-400 mt-2">
              {destinations.filter(d => d.status === '활성').length}개
            </p>
          </div>
        </Card>
        <Card className="card">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-300">총 방문수</h3>
            <p className="text-2xl font-bold text-purple-400 mt-2">
              {destinations.reduce((sum, d) => sum + d.visits, 0).toLocaleString()}
            </p>
          </div>
        </Card>
        <Card className="card">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-300">평균 방문수</h3>
            <p className="text-2xl font-bold text-orange-400 mt-2">
              {Math.round(destinations.reduce((sum, d) => sum + d.visits, 0) / destinations.length).toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      <div className="mb-6">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          새 여행지 추가
        </Button>
      </div>

      <Card className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-300 font-semibold">ID</th>
                <th className="text-left p-4 text-gray-300 font-semibold">이름</th>
                <th className="text-left p-4 text-gray-300 font-semibold">국가</th>
                <th className="text-left p-4 text-gray-300 font-semibold">방문수</th>
                <th className="text-left p-4 text-gray-300 font-semibold">인기도</th>
                <th className="text-left p-4 text-gray-300 font-semibold">상태</th>
                <th className="text-left p-4 text-gray-300 font-semibold">작업</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((destination) => (
                <tr key={destination.id} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 text-white">{destination.id}</td>
                  <td className="p-4 text-white font-medium">{destination.name}</td>
                  <td className="p-4 text-gray-300">{destination.country}</td>
                  <td className="p-4 text-gray-300">{destination.visits.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPopularityColor(destination.popularity)}`}>
                      {destination.popularity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(destination.status)}`}>
                      {destination.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-blue-600 text-blue-400 hover:bg-blue-900/50"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        편집
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="bg-red-900/50 border border-red-700 text-red-300 hover:bg-red-800/50"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        삭제
                      </Button>
                    </div>
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