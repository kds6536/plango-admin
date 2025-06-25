'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapPin, Calendar, Users, Star, ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  const [destination, setDestination] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-blue-800/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-white">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  PlanGo
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                AI가 만들어주는 완벽한 여행 계획. 당신만의 특별한 여행을 시작하세요.
              </p>
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="어디로 떠나고 싶으세요?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-300"
                      />
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI 계획 생성
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                <CardHeader>
                  <MapPin className="w-8 h-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">맞춤 추천</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    AI가 당신의 취향과 예산에 맞는 완벽한 여행지를 추천해드립니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                <CardHeader>
                  <Calendar className="w-8 h-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">스마트 일정</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    최적화된 동선과 시간을 고려한 효율적인 여행 일정을 자동으로 생성합니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                <CardHeader>
                  <Users className="w-8 h-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">실시간 공유</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    동행자들과 실시간으로 계획을 공유하고 함께 수정할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">인기 여행지</h2>
          <p className="text-gray-300">다른 여행자들이 선택한 인기 목적지를 확인해보세요</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: '제주도', rating: 4.8, plans: 1250 },
            { name: '부산', rating: 4.7, plans: 980 },
            { name: '서울', rating: 4.9, plans: 2100 },
            { name: '강릉', rating: 4.6, plans: 750 }
          ].map((destination, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300">{destination.rating}</span>
                  </div>
                  <p className="text-sm text-gray-400">{destination.plans}개의 계획</p>
                  <Button variant="ghost" className="w-full text-purple-400 hover:text-purple-300 group-hover:bg-white/10">
                    계획 보기 <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 