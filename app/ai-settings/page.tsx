'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Select from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group'

const OPENAI_MODELS = [
  { value: 'gpt-4o', label: 'gpt-4o (최신/고성능)' },
  { value: 'gpt-4-turbo', label: 'gpt-4-turbo' },
  { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo (기본/빠른 속도)' },
]
const GEMINI_MODELS = [
  { value: 'gemini-1.5-pro-latest', label: 'gemini-1.5-pro-latest (최신)' },
  { value: 'gemini-1.0-pro', label: 'gemini-1.0-pro (기본)' },
]

export default function AISettingsPage() {
  const [defaultProvider, setDefaultProvider] = useState<'openai' | 'gemini'>('openai')
  const [openaiModel, setOpenaiModel] = useState('gpt-4o')
  const [geminiModel, setGeminiModel] = useState('gemini-1.5-pro-latest')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8005'
      const response = await fetch(`${apiUrl}/api/v1/admin/ai-settings`)
      if (response.ok) {
        const data = await response.json()
        setDefaultProvider(data.default_provider || 'openai')
        setOpenaiModel(data.openai_model || 'gpt-4o')
        setGeminiModel(data.gemini_model || 'gemini-1.5-pro-latest')
      }
    } catch (error) {
      setMessage('❌ 설정 정보를 불러오지 못했습니다.')
    }
  }

  const saveSettings = async () => {
    setLoading(true)
    setMessage('')
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8005'
      const response = await fetch(`${apiUrl}/api/v1/admin/ai-settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          default_provider: defaultProvider,
          openai_model: openaiModel,
          gemini_model: geminiModel,
        })
      })
      if (response.ok) {
        setMessage('✅ AI 설정이 성공적으로 저장되었습니다!')
        fetchSettings()
      } else {
        setMessage('❌ 설정 저장에 실패했습니다.')
      }
    } catch (error) {
      setMessage('❌ 네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 fade-in">
      <h1 className="text-3xl font-bold gradient-text mb-2">AI 설정 관리</h1>
      <p className="text-gray-300 mb-6">Plango API에서 사용할 기본 AI 제공자와 상세 모델을 선택하세요.</p>

      {message && (
        <div className={`p-4 rounded-lg text-center font-semibold mb-4 ${message.includes('✅') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>{message}</div>
      )}

      {/* 기본 제공자 선택 */}
      <div className="flex justify-center mb-6">
        <RadioGroup
          className="flex gap-8"
          value={defaultProvider}
          onValueChange={(val: string) => setDefaultProvider(val as 'openai' | 'gemini')}
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="openai" />
            <span className="font-semibold text-blue-300">OpenAI</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="gemini" />
            <span className="font-semibold text-purple-300">Gemini</span>
          </label>
        </RadioGroup>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* OpenAI 카드 */}
        <Card className={`p-6 card ${defaultProvider === 'openai' ? 'ring-2 ring-blue-400' : 'border-gray-700'}`}> 
          <div className="flex items-center mb-4 gap-3">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">AI</div>
            <div>
              <h3 className="text-lg font-bold gradient-text">OpenAI GPT</h3>
              <p className="text-sm text-gray-400">ChatGPT 기반 AI 서비스</p>
            </div>
          </div>
          <div className="mb-4 text-sm text-gray-300">
            <strong>특징:</strong>
            <ul className="mt-1 space-y-1">
              <li>• 자연스러운 대화형 응답</li>
              <li>• 창의적인 여행 일정 생성</li>
              <li>• 다양한 언어 지원</li>
            </ul>
          </div>
          <div className="mb-2">
            <label className="block text-xs text-gray-400 mb-1">상세 모델</label>
            <Select
              value={openaiModel}
              onChange={e => setOpenaiModel(e.target.value)}
              className="w-full bg-gray-900 text-blue-200 border-blue-400"
            >
              {OPENAI_MODELS.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </Select>
          </div>
          <div className="text-xs text-gray-500 mt-2">API Key: 환경변수로 관리</div>
        </Card>

        {/* Gemini 카드 */}
        <Card className={`p-6 card ${defaultProvider === 'gemini' ? 'ring-2 ring-purple-400' : 'border-gray-700'}`}> 
          <div className="flex items-center mb-4 gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">G</div>
            <div>
              <h3 className="text-lg font-bold gradient-text">Google Gemini</h3>
              <p className="text-sm text-gray-400">구글의 최신 AI 모델</p>
            </div>
          </div>
          <div className="mb-4 text-sm text-gray-300">
            <strong>특징:</strong>
            <ul className="mt-1 space-y-1">
              <li>• 빠른 응답 속도</li>
              <li>• 구글 서비스와 연동</li>
              <li>• 멀티모달 AI 지원</li>
            </ul>
          </div>
          <div className="mb-2">
            <label className="block text-xs text-gray-400 mb-1">상세 모델</label>
            <Select
              value={geminiModel}
              onChange={e => setGeminiModel(e.target.value)}
              className="w-full bg-gray-900 text-purple-200 border-purple-400"
            >
              {GEMINI_MODELS.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </Select>
          </div>
          <div className="text-xs text-gray-500 mt-2">API Key: 환경변수로 관리</div>
        </Card>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={saveSettings}
          disabled={loading}
          className="btn-gradient px-8 py-2 text-lg font-bold shadow-lg"
        >
          {loading ? '저장 중...' : '설정 저장'}
        </Button>
      </div>

      <Card className="p-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">현재 설정 정보</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">기본 제공자:</span>
            <span className="capitalize gradient-text">{defaultProvider === 'openai' ? 'OpenAI GPT' : 'Google Gemini'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">OpenAI 모델:</span>
            <span>{openaiModel}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Gemini 모델:</span>
            <span>{geminiModel}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-yellow-900/60 border-yellow-700 mt-8">
        <h3 className="text-lg font-semibold mb-2 text-yellow-200">⚠️ 주의사항</h3>
        <ul className="text-sm text-yellow-100 space-y-1">
          <li>• AI 제공자/모델 변경 시 즉시 모든 API 요청에 적용됩니다</li>
          <li>• 각 제공자별로 유효한 API 키가 환경변수로 설정되어 있어야 합니다</li>
          <li>• 변경 후 여행 일정 생성 결과가 달라질 수 있습니다</li>
        </ul>
      </Card>
    </div>
  )
} 