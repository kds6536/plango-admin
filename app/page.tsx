'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  MapPin, 
  CreditCard, 
  TrendingUp,
  DollarSign,
  Activity,
  Calendar,
  Globe,
  ArrowUpIcon,
  ArrowDownIcon
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// 수익 데이터 (주간/월간/년간)
const weeklyRevenueData = [
  { name: '월', revenue: 12400, growth: 12 },
  { name: '화', revenue: 13200, growth: 8 },
  { name: '수', revenue: 15800, growth: 15 },
  { name: '목', revenue: 14600, growth: -2 },
  { name: '금', revenue: 16900, growth: 18 },
  { name: '토', revenue: 18200, growth: 22 },
  { name: '일', revenue: 17100, growth: 16 }
]

const monthlyRevenueData = [
  { name: '1월', revenue: 245000, growth: 12 },
  { name: '2월', revenue: 298000, growth: 22 },
  { name: '3월', revenue: 352000, growth: 18 },
  { name: '4월', revenue: 378000, growth: 7 },
  { name: '5월', revenue: 425000, growth: 12 },
  { name: '6월', revenue: 489000, growth: 15 },
  { name: '7월', revenue: 523000, growth: 7 },
  { name: '8월', revenue: 578000, growth: 11 },
  { name: '9월', revenue: 612000, growth: 6 },
  { name: '10월', revenue: 689000, growth: 13 },
  { name: '11월', revenue: 725000, growth: 5 },
  { name: '12월', revenue: 782000, growth: 8 }
]

const yearlyRevenueData = [
  { name: '2021', revenue: 3200000, growth: 0 },
  { name: '2022', revenue: 4850000, growth: 52 },
  { name: '2023', revenue: 6720000, growth: 39 },
  { name: '2024', revenue: 8960000, growth: 33 },
  { name: '2025', revenue: 11200000, growth: 25 }
]

const userGrowthData = [
  { month: '1월', users: 1200, active: 850 },
  { month: '2월', users: 1450, active: 980 },
  { month: '3월', users: 1680, active: 1150 },
  { month: '4월', users: 1920, active: 1350 },
  { month: '5월', users: 2180, active: 1580 },
  { month: '6월', users: 2450, active: 1820 }
]

const planDistribution = [
  { name: '무료 플랜', value: 45, color: '#64748b' },
  { name: '스타터', value: 30, color: '#3b82f6' },
  { name: '프로', value: 20, color: '#8b5cf6' },
  { name: '엔터프라이즈', value: 5, color: '#f59e0b' }
]

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly')

  const getCurrentData = () => {
    switch(selectedPeriod) {
      case 'monthly': return monthlyRevenueData
      case 'yearly': return yearlyRevenueData
      default: return weeklyRevenueData
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">관리자 대시보드</h1>
            <p className="text-gray-300">PlanGo 서비스 현황을 한눈에 확인하세요</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-4 h-4 mr-2" />
              리포트 생성
            </Button>
          </div>
        </div>

        {/* 주요 지표 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-gray-300">총 사용자</h3>
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24,589</div>
                <div className="flex items-center text-xs text-green-400">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +12.5% 지난달 대비
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-gray-300">월간 수익</h3>
                <DollarSign className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">₩782,000</div>
                <div className="flex items-center text-xs text-green-400">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +8.2% 지난달 대비
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-gray-300">여행 계획</h3>
                <MapPin className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">8,945</div>
                <div className="flex items-center text-xs text-green-400">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +15.3% 지난달 대비
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-gray-300">활성 사용자</h3>
                <Activity className="h-4 w-4 text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">18,420</div>
                <div className="flex items-center text-xs text-red-400">
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                  -2.1% 지난주 대비
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 수익 그래프 섹션 */}
        <Card className="bg-gray-800 border-gray-700">
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

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 사용자 증가 추이 */}
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white">사용자 증가 추이</h2>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '6px'
                      }}
                    />
                    <Bar dataKey="users" fill="#3B82F6" />
                    <Bar dataKey="active" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* 요금제 분포 */}
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">요금제 분포</h2>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {planDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '6px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {planDistribution.map((plan, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: plan.color }}
                    />
                    <span className="text-sm text-gray-300">{plan.name} ({plan.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* 최근 활동 */}
        <Card className="bg-gray-800 border-gray-700">
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
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
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