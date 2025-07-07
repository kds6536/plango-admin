'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { CreditCard, DollarSign, TrendingUp, AlertCircle, Eye } from 'lucide-react'

export default function PaymentsPage() {
  const [payments] = useState([
    { 
      id: 1, 
      user: '김철수', 
      amount: 50000, 
      status: '완료', 
      date: '2024-01-15', 
      method: '신용카드',
      plan: '스타터',
      transactionId: 'TXN001'
    },
    { 
      id: 2, 
      user: '이영희', 
      amount: 75000, 
      status: '완료', 
      date: '2024-01-20', 
      method: '계좌이체',
      plan: '프로',
      transactionId: 'TXN002'
    },
    { 
      id: 3, 
      user: '박민수', 
      amount: 30000, 
      status: '취소', 
      date: '2024-02-01', 
      method: '신용카드',
      plan: '무료',
      transactionId: 'TXN003'
    },
    { 
      id: 4, 
      user: '최지영', 
      amount: 120000, 
      status: '진행중', 
      date: '2024-02-05', 
      method: '신용카드',
      plan: '엔터프라이즈',
      transactionId: 'TXN004'
    },
    { 
      id: 5, 
      user: '정현우', 
      amount: 75000, 
      status: '완료', 
      date: '2024-02-08', 
      method: '페이팔',
      plan: '프로',
      transactionId: 'TXN005'
    },
    { 
      id: 6, 
      user: '송미경', 
      amount: 50000, 
      status: '환불', 
      date: '2024-02-10', 
      method: '신용카드',
      plan: '스타터',
      transactionId: 'TXN006'
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료': return 'bg-green-900/50 text-green-300 border border-green-700'
      case '진행중': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
      case '취소': return 'bg-red-900/50 text-red-300 border border-red-700'
      case '환불': return 'bg-purple-900/50 text-purple-300 border border-purple-700'
      default: return 'bg-gray-700/50 text-gray-300 border border-gray-600'
    }
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

  const totalAmount = payments.reduce((sum, p) => p.status === '완료' ? sum + p.amount : sum, 0)
  const completedPayments = payments.filter(p => p.status === '완료').length
  const pendingPayments = payments.filter(p => p.status === '진행중').length
  const cancelledPayments = payments.filter(p => p.status === '취소' || p.status === '환불').length

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-green-400" />
          결제 내역
        </h1>
        <p className="text-gray-300 mt-2">사용자들의 결제 내역을 관리하고 분석합니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="card">
          <div className="text-center">
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-300">총 결제액</h3>
            <p className="text-2xl font-bold text-green-400 mt-2">₩{totalAmount.toLocaleString()}</p>
          </div>
        </Card>
        <Card className="card">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-300">완료된 결제</h3>
            <p className="text-2xl font-bold text-blue-400 mt-2">{completedPayments}건</p>
          </div>
        </Card>
        <Card className="card">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-300">진행중</h3>
            <p className="text-2xl font-bold text-yellow-400 mt-2">{pendingPayments}건</p>
          </div>
        </Card>
        <Card className="card">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-300">취소/환불</h3>
            <p className="text-2xl font-bold text-red-400 mt-2">{cancelledPayments}건</p>
          </div>
        </Card>
      </div>

      <Card className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-300 font-semibold">ID</th>
                <th className="text-left p-4 text-gray-300 font-semibold">사용자</th>
                <th className="text-left p-4 text-gray-300 font-semibold">요금제</th>
                <th className="text-left p-4 text-gray-300 font-semibold">금액</th>
                <th className="text-left p-4 text-gray-300 font-semibold">상태</th>
                <th className="text-left p-4 text-gray-300 font-semibold">날짜</th>
                <th className="text-left p-4 text-gray-300 font-semibold">결제 방법</th>
                <th className="text-left p-4 text-gray-300 font-semibold">거래ID</th>
                <th className="text-left p-4 text-gray-300 font-semibold">작업</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 text-white font-medium">{payment.id}</td>
                  <td className="p-4 text-white">{payment.user}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(payment.plan)}`}>
                      {payment.plan}
                    </span>
                  </td>
                  <td className="p-4 text-white font-semibold">₩{payment.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{payment.date}</td>
                  <td className="p-4 text-gray-300">{payment.method}</td>
                  <td className="p-4 text-gray-400 font-mono text-sm">{payment.transactionId}</td>
                  <td className="p-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-blue-600 text-blue-400 hover:bg-blue-900/50"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      상세보기
                    </Button>
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