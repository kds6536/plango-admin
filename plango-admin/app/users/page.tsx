'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'

export default function UsersPage() {
  const [users] = useState([
    { id: 1, name: '김철수', email: 'kim@example.com', status: '활성', joinDate: '2024-01-15' },
    { id: 2, name: '이영희', email: 'lee@example.com', status: '활성', joinDate: '2024-01-20' },
    { id: 3, name: '박민수', email: 'park@example.com', status: '비활성', joinDate: '2024-02-01' },
  ])

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">사용자 관리</h1>
        <p className="text-gray-600 mt-2">등록된 사용자들을 관리합니다</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">이름</th>
                <th className="text-left p-4">이메일</th>
                <th className="text-left p-4">상태</th>
                <th className="text-left p-4">가입일</th>
                <th className="text-left p-4">작업</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === '활성' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">{user.joinDate}</td>
                  <td className="p-4">
                    <Button className="mr-2">편집</Button>
                    <Button>삭제</Button>
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