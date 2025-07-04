'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Select from '@/components/ui/select'

// --- 최신/정확한 모델 목록 ---
const OPENAI_MODELS = [
  { value: 'gpt-4o', label: 'gpt-4o (최신/최고성능)' },
  { value: 'gpt-4-turbo', label: 'gpt-4-turbo (고성능)' },
  { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo (빠른 속도/저렴)' },
]
const GEMINI_MODELS = [
  { value: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro (최신/대용량)' },
  { value: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash (최신/빠른 속도)' },
  { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro (기본/안정)' },
]

// --- 타입 명시 ---
interface AISettings {
  default_provider: 'openai' | 'gemini';
  openai_model_name: string;
  gemini_model_name: string;
}

export default function AISettingsPage() {
  const [currentSettings, setCurrentSettings] = useState<AISettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // API 통신 (axios)
  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      // Railway 배포를 위한 하드코딩된 API URL
      const apiUrl = 'https://plango-api-production.up.railway.app/api/v1';
      const response = await axios.get(`${apiUrl}/admin/ai-settings`);
      setCurrentSettings(response.data);
    } catch (err) {
      setError('❌ 설정 정보를 불러오지 못했습니다. API 서버가 실행 중인지 확인해주세요.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchSettings(); }, []);

  const saveSettings = async () => {
    if (!currentSettings) return;
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      // Railway 배포를 위한 하드코딩된 API URL
      const apiUrl = 'https://plango-api-production.up.railway.app/api/v1';
      
      console.log('전송할 데이터:', currentSettings);
      console.log('API URL:', `${apiUrl}/admin/ai-settings`);
      
      // 실제 저장 시도
      await axios.put(`${apiUrl}/admin/ai-settings`, currentSettings);
      setSuccessMessage('✅ AI 설정이 성공적으로 저장되었습니다!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('저장 에러 상세:', err);
      setError('❌ 설정 저장에 실패했습니다. API 서버 로그를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  }

  if (loading && !currentSettings) {
    return <div className="text-center py-20">설정 정보를 불러오는 중...</div>
  }
  if (error && !currentSettings) {
    return <div className="text-center py-20 text-red-400">{error}</div>
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 fade-in">
      <h1 className="text-3xl font-bold gradient-text mb-2">AI 설정 관리</h1>
      <p className="text-gray-300 mb-6">Plango API에서 사용할 기본 AI 제공자와 상세 모델을 선택하세요.</p>
      {successMessage && <div className="p-4 rounded-lg text-center font-semibold bg-green-900 text-green-200">{successMessage}</div>}
      {error && <div className="p-4 rounded-lg text-center font-semibold bg-red-900 text-red-200">{error}</div>}
      <div className="grid gap-8 md:grid-cols-2">
        {/* OpenAI 카드 */}
        <Card
          className={`p-6 card cursor-pointer transition-all duration-200 ${currentSettings?.default_provider === 'openai' ? 'ring-2 ring-blue-400 scale-105 shadow-xl' : 'border-gray-700 opacity-70 hover:scale-105 hover:ring-2 hover:ring-blue-300'}`}
          onClick={() => setCurrentSettings(prev => prev ? { ...prev, default_provider: 'openai' } : null)}
        >
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
              value={currentSettings?.openai_model_name}
              onChange={e => setCurrentSettings(prev => prev ? { ...prev, openai_model_name: e.target.value } : null)}
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
        <Card
          className={`p-6 card cursor-pointer transition-all duration-200 ${currentSettings?.default_provider === 'gemini' ? 'ring-2 ring-purple-400 scale-105 shadow-xl' : 'border-gray-700 opacity-70 hover:scale-105 hover:ring-2 hover:ring-purple-300'}`}
          onClick={() => setCurrentSettings(prev => prev ? { ...prev, default_provider: 'gemini' } : null)}
        >
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
              value={currentSettings?.gemini_model_name}
              onChange={e => setCurrentSettings(prev => prev ? { ...prev, gemini_model_name: e.target.value } : null)}
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
      <Card className="p-6 mt-8 bg-gradient-to-r from-gray-900 to-gray-800 border-0 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-blue-200">현재 사용중인 AI 설정 (DB 기준)</h3>
        {currentSettings ? (
          <div className="flex flex-col gap-2 text-base">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-400">기본 제공자:</span>
              <span className={`px-2 py-1 rounded font-bold ${currentSettings.default_provider === 'openai' ? 'bg-blue-700 text-blue-100' : 'bg-purple-700 text-purple-100'}`}>{currentSettings.default_provider === 'openai' ? 'OpenAI GPT' : 'Google Gemini'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-400">현재 활성화된 모델:</span>
              <span className="px-2 py-1 rounded bg-gray-700 text-white font-mono">
                {currentSettings.default_provider === 'openai' ? currentSettings.openai_model_name : currentSettings.gemini_model_name}
              </span>
            </div>
          </div>
        ) : <p>설정 정보를 불러오지 못했습니다.</p>}
      </Card>
    </div>
  )
} 