'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Select from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Database, Cpu, Settings, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'

// --- v2.0 Enhanced AI Settings ---
const OPENAI_MODELS = [
  { value: 'gpt-4', label: 'GPT-4 (최고 성능)' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo (고성능/빠름)' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (빠른 속도)' },
]

const GEMINI_MODELS = [
  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (빠른 속도)' },
  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro (고성능)' },
  { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro (안정성)' },
]

// --- v2.0 Enhanced Types ---
interface AISettings {
  provider: 'openai' | 'gemini';
  openai_model: string;
  gemini_model: string;
  temperature: number;
  max_tokens: number;
}

interface SystemStatus {
  supabase_connected: boolean;
  current_ai_provider: string;
  ai_model: string;
  system_ready: boolean;
}

interface PromptData {
  prompt_type: string;
  prompt_content: string;
}

const PROMPT_TYPES = [
  { value: 'itinerary_generation', label: '일정 생성 마스터 프롬프트' },
  { value: 'place_recommendation', label: '장소 추천 프롬프트' },
  { value: 'optimization', label: '동선 최적화 프롬프트' }
]

export default function AISettingsPage() {
  const [currentSettings, setCurrentSettings] = useState<AISettings | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [selectedPromptType, setSelectedPromptType] = useState('itinerary_generation');
  const [promptContent, setPromptContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'settings' | 'prompts' | 'status'>('settings');

  const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'https://plango-api-production-0c8c.up.railway.app';
  }

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = getApiUrl();
      const [settingsResponse, statusResponse] = await Promise.all([
        axios.get(`${apiUrl}/api/v1/admin/ai-settings`),
        axios.get(`${apiUrl}/api/v1/admin/system/status`)
      ]);
      
      setCurrentSettings(settingsResponse.data.data);
      setSystemStatus(statusResponse.data.data);
      
      // 기본 프롬프트 로드
      await fetchPrompt(selectedPromptType);
      
    } catch (err) {
      setError('❌ 설정 정보를 불러오지 못했습니다. API 서버가 실행 중인지 확인해주세요.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const fetchPrompt = async (promptType: string) => {
    try {
      const apiUrl = getApiUrl();
      const response = await axios.get(`${apiUrl}/api/v1/admin/prompts/${promptType}`);
      setPromptContent(response.data.data.prompt_content || '');
    } catch (err) {
      console.error('프롬프트 로드 실패:', err);
      setPromptContent('프롬프트를 로드할 수 없습니다.');
    }
  }

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (selectedPromptType) {
      fetchPrompt(selectedPromptType);
    }
  }, [selectedPromptType]);

  const saveAISettings = async () => {
    if (!currentSettings) return;
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const apiUrl = getApiUrl();
      const response = await axios.put(`${apiUrl}/api/v1/admin/ai-settings`, currentSettings);
      
      if (response.data.success) {
        setSuccessMessage(`✅ AI 설정 저장 완료! 현재 제공자: ${currentSettings.provider}`);
        await fetchData(); // 상태 새로고침
      }
    } catch (err) {
      console.error('AI 설정 저장 에러:', err);
      setError('❌ AI 설정 저장에 실패했습니다.');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  }

  const savePrompt = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const apiUrl = getApiUrl();
      const response = await axios.put(`${apiUrl}/api/v1/admin/prompts`, {
        prompt_type: selectedPromptType,
        prompt_content: promptContent
      });
      
      if (response.data.success) {
        setSuccessMessage(`✅ '${PROMPT_TYPES.find(p => p.value === selectedPromptType)?.label}' 프롬프트가 저장되었습니다!`);
      }
    } catch (err) {
      console.error('프롬프트 저장 에러:', err);
      setError('❌ 프롬프트 저장에 실패했습니다.');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  }

  const testAIGeneration = async () => {
    setSaving(true);
    setError(null);
    
    try {
      const apiUrl = getApiUrl();
      const response = await axios.post(`${apiUrl}/api/v1/admin/test/ai-generation`);
      
      if (response.data.success) {
        setSuccessMessage(`✅ AI 생성 테스트 성공! 응답 길이: ${response.data.data.response_length}자`);
      }
    } catch (err) {
      console.error('AI 테스트 에러:', err);
      setError('❌ AI 생성 테스트에 실패했습니다.');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  }

  if (loading && !currentSettings) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin h-8 w-8 mr-2" />
        <span>Supabase에서 설정 정보를 불러오는 중...</span>
      </div>
    );
  }

  if (error && !currentSettings) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-400" />
        <div className="text-red-400">{error}</div>
        <Button onClick={fetchData} className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          <Database className="inline h-8 w-8 mr-2" />
          Plango AI 관리 v2.0
        </h1>
        <p className="text-gray-300">Supabase 기반 실시간 AI 설정 및 마스터 프롬프트 관리</p>
      </div>

      {/* Status Messages */}
      {successMessage && (
        <div className="p-4 rounded-lg text-center font-semibold bg-green-900 text-green-200 flex items-center justify-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          {successMessage}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-lg text-center font-semibold bg-red-900 text-red-200 flex items-center justify-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 rounded-lg bg-gray-800 p-1">
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'settings' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Settings className="inline h-4 w-4 mr-1" />
          AI 설정
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'prompts' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Cpu className="inline h-4 w-4 mr-1" />
          마스터 프롬프트
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'status' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Database className="inline h-4 w-4 mr-1" />
          시스템 상태
        </button>
      </div>

      {/* AI Settings Tab */}
      {activeTab === 'settings' && currentSettings && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI 제공자 설정</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Provider Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">AI 제공자</label>
              <Select
                value={currentSettings.provider}
                onChange={(value) => setCurrentSettings({...currentSettings, provider: value as 'openai' | 'gemini'})}
                options={[
                  { value: 'openai', label: '🤖 OpenAI (ChatGPT)' },
                  { value: 'gemini', label: '💎 Google Gemini' }
                ]}
              />
            </div>

            {/* OpenAI Model */}
            <div>
              <label className="block text-sm font-medium mb-2">OpenAI 모델</label>
              <Select
                value={currentSettings.openai_model}
                onChange={(value) => setCurrentSettings({...currentSettings, openai_model: value})}
                options={OPENAI_MODELS}
              />
            </div>

            {/* Gemini Model */}
            <div>
              <label className="block text-sm font-medium mb-2">Gemini 모델</label>
              <Select
                value={currentSettings.gemini_model}
                onChange={(value) => setCurrentSettings({...currentSettings, gemini_model: value})}
                options={GEMINI_MODELS}
              />
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-sm font-medium mb-2">창의성 (Temperature): {currentSettings.temperature}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={currentSettings.temperature}
                onChange={(e) => setCurrentSettings({...currentSettings, temperature: parseFloat(e.target.value)})}
                className="w-full"
              />
              <div className="text-xs text-gray-400 mt-1">0 = 일관성 중심, 1 = 창의성 중심</div>
            </div>

            {/* Max Tokens */}
            <div>
              <label className="block text-sm font-medium mb-2">최대 토큰 수</label>
              <input
                type="number"
                min="500"
                max="4000"
                value={currentSettings.max_tokens}
                onChange={(e) => setCurrentSettings({...currentSettings, max_tokens: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button 
              onClick={saveAISettings} 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Settings className="h-4 w-4 mr-2" />}
              AI 설정 저장
            </Button>
            <Button 
              onClick={testAIGeneration} 
              disabled={saving}
              variant="outline"
            >
              {saving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Cpu className="h-4 w-4 mr-2" />}
              AI 테스트
            </Button>
          </div>
        </Card>
      )}

      {/* Master Prompts Tab */}
      {activeTab === 'prompts' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">마스터 프롬프트 관리</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">프롬프트 타입</label>
            <Select
              value={selectedPromptType}
              onChange={setSelectedPromptType}
              options={PROMPT_TYPES}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">프롬프트 내용</label>
            <Textarea
              value={promptContent}
              onChange={(e) => setPromptContent(e.target.value)}
              rows={15}
              className="w-full"
              placeholder="마스터 프롬프트를 입력하세요..."
            />
          </div>

          <Button 
            onClick={savePrompt} 
            disabled={saving}
            className="bg-green-600 hover:bg-green-700"
          >
            {saving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
            프롬프트 저장
          </Button>
        </Card>
      )}

      {/* System Status Tab */}
      {activeTab === 'status' && systemStatus && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">시스템 상태</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Supabase 연결</span>
                <span className={`flex items-center ${systemStatus.supabase_connected ? 'text-green-400' : 'text-red-400'}`}>
                  {systemStatus.supabase_connected ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                  {systemStatus.supabase_connected ? '연결됨' : '연결 안됨'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span>현재 AI 제공자</span>
                <span className="font-semibold">{systemStatus.current_ai_provider}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span>AI 모델</span>
                <span className="font-semibold">{systemStatus.ai_model}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span>시스템 준비 상태</span>
                <span className={`flex items-center ${systemStatus.system_ready ? 'text-green-400' : 'text-yellow-400'}`}>
                  {systemStatus.system_ready ? <CheckCircle className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                  {systemStatus.system_ready ? '준비됨' : '설정 필요'}
                </span>
              </div>
            </div>
          </div>

          <Button 
            onClick={fetchData} 
            className="mt-4"
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            상태 새로고침
          </Button>
        </Card>
      )}
    </div>
  )
}