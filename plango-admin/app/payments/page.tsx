'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'

export default function PaymentsPage() {
  const [payments] = useState([
    { id: 1, user: '김철수', amount: 50000, status: '완료', date: '2024-01-15', method: '카드' },
    { id: 2, user: '이영희', amount: 75000, status: '완료', date: '2024-01-20', method: '계좌이체' },
    { id: 3, user: '박민수', amount: 30000, status: '취소', date: '2024-02-01', method: '카드' },
    { id: 4, user: '최지영', amount: 120000, status: '진행중', date: '2024-02-05', method: '카드' },
  ])

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">결제 내역</h1>
        <p className="text-gray-600 mt-2">사용자들의 결제 내역을 관리합니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">총 결제액</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">₩275,000</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">완료된 결제</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">2건</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">진행중</h3>
            <p className="text-2xl font-bold text-orange-600 mt-2">1건</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">취소된 결제</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">1건</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">사용자</th>
                <th className="text-left p-4">금액</th>
                <th className="text-left p-4">상태</th>
                <th className="text-left p-4">날짜</th>
                <th className="text-left p-4">결제 방법</th>
                <th className="text-left p-4">작업</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="p-4">{payment.id}</td>
                  <td className="p-4">{payment.user}</td>
                  <td className="p-4">₩{payment.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === '완료' ? 'bg-green-100 text-green-800' :
                      payment.status === '진행중' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4">{payment.date}</td>
                  <td className="p-4">{payment.method}</td>
                  <td className="p-4">
                    <Button variant="outline" size="sm">상세보기</Button>
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