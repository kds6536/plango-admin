'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'

interface AISettings {
  provider: 'openai' | 'gemini'
  openai_api_key?: string
  gemini_api_key?: string
  last_updated: string
  updated_by: string
}

export default function AISettingsPage() {
  const [settings, setSettings] = useState<AISettings>({
    provider: 'openai',
    last_updated: '',
    updated_by: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // API 설정 로드
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8005'
      const response = await fetch(`${apiUrl}/api/v1/admin/ai-settings`)
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('설정 로드 실패:', error)
    }
  }

  const updateSettings = async (newProvider: 'openai' | 'gemini') => {
    setLoading(true)
    setMessage('')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8005'
      const response = await fetch(`${apiUrl}/api/v1/admin/ai-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: newProvider,
          updated_by: 'admin'
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSettings(data)
        setMessage(`✅ AI 제공자가 ${newProvider === 'openai' ? 'OpenAI' : 'Google Gemini'}로 변경되었습니다!`)
      } else {
        setMessage('❌ 설정 변경에 실패했습니다.')
      }
    } catch (error) {
      setMessage('❌ 네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI 설정 관리</h1>
        <p className="text-gray-600 mt-2">
          Plango API에서 사용할 AI 제공자를 선택하세요
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* OpenAI 카드 */}
        <Card className={`p-6 border-2 transition-all ${settings.provider === 'openai' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                AI
              </div>
              <div>
                <h3 className="text-lg font-semibold">OpenAI GPT</h3>
                <p className="text-sm text-gray-600">ChatGPT 기반 AI 서비스</p>
              </div>
            </div>
            {settings.provider === 'openai' && (
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                현재 사용 중
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="text-sm">
              <strong>특징:</strong>
              <ul className="mt-1 text-gray-600 space-y-1">
                <li>• 자연스러운 대화형 응답</li>
                <li>• 창의적인 여행 일정 생성</li>
                <li>• 다양한 언어 지원</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => updateSettings('openai')}
              disabled={loading || settings.provider === 'openai'}
              className="w-full"
              variant={settings.provider === 'openai' ? 'secondary' : 'default'}
            >
              {settings.provider === 'openai' ? '현재 선택됨' : 'OpenAI 선택'}
            </Button>
          </div>
        </Card>

        {/* Gemini 카드 */}
        <Card className={`p-6 border-2 transition-all ${settings.provider === 'gemini' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                G
              </div>
              <div>
                <h3 className="text-lg font-semibold">Google Gemini</h3>
                <p className="text-sm text-gray-600">구글의 최신 AI 모델</p>
              </div>
            </div>
            {settings.provider === 'gemini' && (
              <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                현재 사용 중
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="text-sm">
              <strong>특징:</strong>
              <ul className="mt-1 text-gray-600 space-y-1">
                <li>• 빠른 응답 속도</li>
                <li>• 구글 서비스와 연동</li>
                <li>• 멀티모달 AI 지원</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => updateSettings('gemini')}
              disabled={loading || settings.provider === 'gemini'}
              className="w-full"
              variant={settings.provider === 'gemini' ? 'secondary' : 'default'}
            >
              {settings.provider === 'gemini' ? '현재 선택됨' : 'Gemini 선택'}
            </Button>
          </div>
        </Card>
      </div>

      {/* 설정 정보 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">현재 설정 정보</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">AI 제공자:</span>
            <span className="capitalize">{settings.provider === 'openai' ? 'OpenAI GPT' : 'Google Gemini'}</span>
          </div>
          {settings.last_updated && (
            <div className="flex justify-between">
              <span className="font-medium">마지막 업데이트:</span>
              <span>{new Date(settings.last_updated).toLocaleString('ko-KR')}</span>
            </div>
          )}
          {settings.updated_by && (
            <div className="flex justify-between">
              <span className="font-medium">업데이트한 사용자:</span>
              <span>{settings.updated_by}</span>
            </div>
          )}
        </div>
      </Card>

      {/* 주의사항 */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">⚠️ 주의사항</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• AI 제공자 변경 시 즉시 모든 API 요청에 적용됩니다</li>
          <li>• 각 제공자별로 유효한 API 키가 설정되어 있어야 합니다</li>
          <li>• 변경 후 여행 일정 생성 결과가 달라질 수 있습니다</li>
        </ul>
      </Card>
    </div>
  )
} 