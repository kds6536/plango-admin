'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { 
  Users, 
  DollarSign, 
  MapPin, 
  Activity, 
  TrendingUp,
  ArrowUpIcon,
  ArrowDownIcon,
  Calendar
} from 'lucide-react'

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly')

  const weeklyData = [
    { name: '월', value: 120000 },
    { name: '화', value: 150000 },
    { name: '수', value: 180000 },
    { name: '목', value: 220000 },
    { name: '금', value: 250000 },
    { name: '토', value: 300000 },
    { name: '일', value: 280000 }
  ]

  const monthlyData = [
    { name: '1월', value: 3200000 },
    { name: '2월', value: 3600000 },
    { name: '3월', value: 4100000 },
    { name: '4월', value: 3800000 },
    { name: '5월', value: 4500000 },
    { name: '6월', value: 5200000 },
    { name: '7월', value: 4900000 },
    { name: '8월', value: 5600000 },
    { name: '9월', value: 5100000 },
    { name: '10월', value: 5800000 },
    { name: '11월', value: 6200000 },
    { name: '12월', value: 6800000 }
  ]

  const yearlyData = [
    { name: '2021', value: 32000000 },
    { name: '2022', value: 48000000 },
    { name: '2023', value: 67000000 },
    { name: '2024', value: 89000000 },
    { name: '2025', value: 112000000 }
  ]

  const getCurrentData = () => {
    switch(selectedPeriod) {
      case 'monthly': return monthlyData
      case 'yearly': return yearlyData
      default: return weeklyData
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">관리자 대시보드</h1>
            <p className="text-gray-300">PlanGo 서비스 현황을 한눈에 확인하세요</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Calendar className="w-4 h-4 mr-2" />
            리포트 생성
          </Button>
        </div>

        {/* 주요 지표 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300">총 사용자</h3>
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">24,589</div>
              <div className="flex items-center text-sm text-green-400">
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                +12.5% 지난달 대비
              </div>
            </div>
          </Card>

          <Card className="card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300">월간 수익</h3>
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">₩782,000</div>
              <div className="flex items-center text-sm text-green-400">
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                +8.2% 지난달 대비
              </div>
            </div>
          </Card>

          <Card className="card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300">여행 계획</h3>
                <MapPin className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">8,945</div>
              <div className="flex items-center text-sm text-green-400">
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                +15.3% 지난달 대비
              </div>
            </div>
          </Card>

          <Card className="card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300">활성 사용자</h3>
                <Activity className="h-5 w-5 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">18,420</div>
              <div className="flex items-center text-sm text-red-400">
                <ArrowDownIcon className="w-4 h-4 mr-1" />
                -2.1% 지난주 대비
              </div>
            </div>
          </Card>
        </div>

        {/* 수익 그래프 섹션 */}
        <Card className="card">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-bold text-white">수익 현황</h2>
            </div>
            
            <div className="flex gap-2 mb-6">
              <Button 
                onClick={() => setSelectedPeriod('weekly')}
                className={selectedPeriod === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}
              >
                주간
              </Button>
              <Button 
                onClick={() => setSelectedPeriod('monthly')}
                className={selectedPeriod === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}
              >
                월간
              </Button>
              <Button 
                onClick={() => setSelectedPeriod('yearly')}
                className={selectedPeriod === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}
              >
                연간
              </Button>
            </div>

            <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">수익 차트 ({selectedPeriod})</p>
                <p className="text-sm text-gray-500 mt-2">
                  {getCurrentData().length}개 데이터 포인트
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* 최근 활동 */}
        <Card className="card">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-bold text-white">최근 활동</h2>
            </div>
            <div className="space-y-4">
              {[
                { user: '김민수', action: '프로 플랜으로 업그레이드', time: '2분 전', type: 'upgrade' },
                { user: '이지영', action: '서울 3일 여행 계획 생성', time: '15분 전', type: 'create' },
                { user: '박철호', action: '결제 완료 (₩29,000)', time: '32분 전', type: 'payment' },
                { user: '정수현', action: '새로운 계정 가입', time: '1시간 전', type: 'signup' },
                { user: '최영희', action: '부산 여행 계획 공유', time: '2시간 전', type: 'share' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'upgrade' ? 'bg-green-400' :
                      activity.type === 'create' ? 'bg-blue-400' :
                      activity.type === 'payment' ? 'bg-yellow-400' :
                      activity.type === 'signup' ? 'bg-purple-400' :
                      'bg-orange-400'
                    }`} />
                    <div>
                      <p className="text-white font-medium">{activity.user}</p>
                      <p className="text-gray-400 text-sm">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 