'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrips: 0,
    activeItineraries: 0,
    monthlyRevenue: 0
  })

  useEffect(() => {
    // 실제 환경에서는 API 호출로 대체
    setStats({
      totalUsers: 1234,
      totalTrips: 567,
      activeItineraries: 89,
      monthlyRevenue: 12345000
    })
  }, [])

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">PlanGo 관리자 대시보드</h1>
        <p className="text-gray-600 mt-2">여행 계획 서비스 통계 및 관리</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">총 사용자</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalUsers.toLocaleString()}</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">총 여행</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalTrips.toLocaleString()}</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">활성 일정</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{stats.activeItineraries.toLocaleString()}</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">월 수익</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">₩{stats.monthlyRevenue.toLocaleString()}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">최근 활동</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>새로운 사용자 등록</span>
              <span className="text-gray-500">2시간 전</span>
            </div>
            <div className="flex justify-between items-center">
              <span>여행 일정 생성</span>
              <span className="text-gray-500">3시간 전</span>
            </div>
            <div className="flex justify-between items-center">
              <span>결제 완료</span>
              <span className="text-gray-500">5시간 전</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">빠른 작업</h2>
          <div className="space-y-3">
            <Button className="w-full">사용자 관리</Button>
            <Button className="w-full">여행지 관리</Button>
            <Button className="w-full">결제 내역</Button>
            <Button className="w-full">리포트 생성</Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 