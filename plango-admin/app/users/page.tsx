'use client'

import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search, 
  Filter,
  UserPlus,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Crown,
  Calendar,
  LogIn,
  Mail,
  Phone,
  DollarSign
} from 'lucide-react'
import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  plan: 'free' | 'starter' | 'pro' | 'enterprise'
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  endDate: string | null
  loginCount: number
  lastLogin: string
  totalSpent: number
  tripsCreated: number
}

const users: User[] = [
  {
    id: 'USR001',
    name: '김민수',
    email: 'kim.minsu@email.com',
    phone: '010-1234-5678',
    plan: 'pro',
    status: 'active',
    joinDate: '2024-01-15',
    endDate: '2025-01-15',
    loginCount: 247,
    lastLogin: '2024-12-25 14:32',
    totalSpent: 89000,
    tripsCreated: 12
  },
  {
    id: 'USR002',
    name: '이지영',
    email: 'lee.jiyoung@email.com',
    phone: '010-2345-6789',
    plan: 'starter',
    status: 'active',
    joinDate: '2024-03-22',
    endDate: '2025-03-22',
    loginCount: 156,
    lastLogin: '2024-12-24 09:15',
    totalSpent: 29000,
    tripsCreated: 8
  },
  {
    id: 'USR003',
    name: '박철호',
    email: 'park.cheolho@email.com',
    phone: '010-3456-7890',
    plan: 'enterprise',
    status: 'active',
    joinDate: '2023-11-08',
    endDate: '2024-11-08',
    loginCount: 892,
    lastLogin: '2024-12-25 16:45',
    totalSpent: 299000,
    tripsCreated: 45
  },
  {
    id: 'USR004',
    name: '정수현',
    email: 'jung.suhyun@email.com',
    phone: '010-4567-8901',
    plan: 'free',
    status: 'active',
    joinDate: '2024-12-20',
    endDate: null,
    loginCount: 12,
    lastLogin: '2024-12-25 11:20',
    totalSpent: 0,
    tripsCreated: 2
  },
  {
    id: 'USR005',
    name: '최영희',
    email: 'choi.younghee@email.com',
    phone: '010-5678-9012',
    plan: 'starter',
    status: 'inactive',
    joinDate: '2024-02-14',
    endDate: '2025-02-14',
    loginCount: 89,
    lastLogin: '2024-12-15 13:22',
    totalSpent: 58000,
    tripsCreated: 6
  },
  {
    id: 'USR006',
    name: '한동훈',
    email: 'han.donghoon@email.com',
    phone: '010-6789-0123',
    plan: 'pro',
    status: 'suspended',
    joinDate: '2024-05-30',
    endDate: '2025-05-30',
    loginCount: 234,
    lastLogin: '2024-12-10 08:45',
    totalSpent: 118000,
    tripsCreated: 18
  }
]

const planColors = {
  free: 'bg-gray-500',
  starter: 'bg-blue-500',
  pro: 'bg-purple-500',
  enterprise: 'bg-yellow-500'
}

const planLabels = {
  free: '무료',
  starter: '스타터',
  pro: '프로',
  enterprise: '엔터프라이즈'
}

const statusColors = {
  active: 'bg-green-500',
  inactive: 'bg-orange-500',
  suspended: 'bg-red-500'
}

const statusLabels = {
  active: '활성',
  inactive: '비활성',
  suspended: '정지'
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = selectedPlan === 'all' || user.plan === selectedPlan
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    
    return matchesSearch && matchesPlan && matchesStatus
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case '무료': return 'bg-gray-700/50 text-gray-300 border border-gray-600'
      case '스타터': return 'bg-blue-900/50 text-blue-300 border border-blue-700'
      case '프로': return 'bg-purple-900/50 text-purple-300 border border-purple-700'
      case '엔터프라이즈': return 'bg-orange-900/50 text-orange-300 border border-orange-700'
      default: return 'bg-gray-700/50 text-gray-300 border border-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '활성': return 'bg-green-900/50 text-green-300 border border-green-700'
      case '비활성': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
      case '만료': return 'bg-red-900/50 text-red-300 border border-red-700'
      default: return 'bg-gray-700/50 text-gray-300 border border-gray-600'
    }
  }

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0)
  const totalTrips = users.reduce((sum, u) => sum + u.tripsCreated, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">사용자 관리</h1>
            <p className="text-slate-400">등록된 사용자들을 관리하고 모니터링하세요</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="btn-gradient">
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
            <Button className="btn-gradient">
              <UserPlus className="w-4 h-4 mr-2" />
              사용자 추가
            </Button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 fade-in">
          <Card className="card hover:glow transition-all duration-300">
            <div className="p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-slate-300">총 사용자</h3>
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{totalUsers.toLocaleString()}</div>
                <p className="text-xs text-slate-400 mt-1">전체 등록 사용자</p>
              </div>
            </div>
          </Card>

          <Card className="card hover:glow transition-all duration-300">
            <div className="p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-slate-300">활성 사용자</h3>
                <Users className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {activeUsers.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400 mt-1">현재 활성 상태</p>
              </div>
            </div>
          </Card>

          <Card className="card hover:glow transition-all duration-300">
            <div className="p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-slate-300">총 수익</h3>
                <DollarSign className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(totalRevenue)}
                </div>
                <p className="text-xs text-slate-400 mt-1">누적 수익</p>
              </div>
            </div>
          </Card>

          <Card className="card hover:glow transition-all duration-300">
            <div className="p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-slate-300">총 여행 계획</h3>
                <Calendar className="h-4 w-4 text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {totalTrips.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400 mt-1">총 여행 계획</p>
              </div>
            </div>
          </Card>
        </div>

        {/* 검색 및 필터 */}
        <Card className="card fade-in">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="사용자 이름 또는 이메일로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                >
                  <option value="all">모든 플랜</option>
                  <option value="free">무료</option>
                  <option value="starter">스타터</option>
                  <option value="pro">프로</option>
                  <option value="enterprise">엔터프라이즈</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                >
                  <option value="all">모든 상태</option>
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                  <option value="suspended">정지</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* 사용자 테이블 */}
        <Card className="card fade-in">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-white">사용자 목록 ({filteredUsers.length}명)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 px-4 font-medium text-slate-300">사용자</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">요금제</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">상태</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">가입일</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">종료일</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">로그인 횟수</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">마지막 로그인</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">총 지출</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">여행 수</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors table-row">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-sm text-slate-400 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                            <div className="text-sm text-slate-400 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getPlanColor(user.plan)} text-white`}>
                          {user.plan === 'enterprise' && <Crown className="w-3 h-3 mr-1" />}
                          {planLabels[user.plan]}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getStatusColor(user.status)} text-white`}>
                          {statusLabels[user.status]}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {formatDate(user.joinDate)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {user.endDate ? formatDate(user.endDate) : '-'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white flex items-center gap-1">
                          <LogIn className="w-3 h-3 text-slate-400" />
                          {user.loginCount.toLocaleString()}회
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-slate-300">
                          {user.lastLogin}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-white">
                          {formatCurrency(user.totalSpent)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white">
                          {user.tripsCreated}개
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 