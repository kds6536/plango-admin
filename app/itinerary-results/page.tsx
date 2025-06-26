"use client"

import { useState } from "react"
import Link from "next/link"

export default function ItineraryResultsPage() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [showDetails1, setShowDetails1] = useState(false)
  const [showDetails2, setShowDetails2] = useState(false)

  const schedule1 = [
    { id: "1-1", time: "09:00", title: "경복궁 관람", description: "조선왕조의 정궁인 경복궁에서 역사와 문화를 체험해보세요. 수문장 교대식도 관람할 수 있습니다.", cost: "3,000원" },
    { id: "1-2", time: "12:00", title: "인사동 점심", description: "전통 한식당에서 맛있는 한정식을 즐기며 한국의 맛을 느껴보세요.", cost: "15,000원" },
    { id: "1-3", time: "14:00", title: "명동 쇼핑", description: "한국 최대의 쇼핑거리에서 쇼핑과 거리음식을 즐겨보세요.", cost: "50,000원" },
    { id: "1-4", time: "18:00", title: "남산타워", description: "서울의 야경을 한눈에 볼 수 있는 랜드마크를 방문해보세요.", cost: "16,000원" }
  ]

  const schedule2 = [
    { id: "2-1", time: "10:00", title: "한강공원 산책", description: "시원한 강바람을 맞으며 자전거를 타거나 피크닉을 즐겨보세요.", cost: "무료" },
    { id: "2-2", time: "13:00", title: "홍대 맛집 투어", description: "젊음의 거리 홍대에서 다양한 맛집을 탐방해보세요.", cost: "20,000원" },
    { id: "2-3", time: "16:00", title: "이태원 문화체험", description: "다국적 문화가 어우러진 이태원에서 특별한 경험을 해보세요.", cost: "30,000원" },
    { id: "2-4", time: "19:00", title: "동대문 야시장", description: "밤늦게까지 열리는 동대문에서 야식과 쇼핑을 즐겨보세요.", cost: "25,000원" }
  ]

  const handleCheckboxChange = (itemId: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId)
    } else {
      newSelected.add(itemId)
    }
    setSelectedItems(newSelected)
  }

  const handleCreateCustomSchedule = () => {
    if (selectedItems.size === 0) {
      alert("최소 1개 이상의 항목을 선택해주세요!")
      return
    }
    
    const selectedSchedule: any[] = []
    schedule1.forEach(item => {
      if (selectedItems.has(item.id)) selectedSchedule.push(item)
    })
    schedule2.forEach(item => {
      if (selectedItems.has(item.id)) selectedSchedule.push(item)
    })
    
    alert(`선택된 ${selectedItems.size}개 항목으로 커스텀 일정이 생성됩니다!`)
    console.log("선택된 일정:", selectedSchedule)
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              ✈️
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Go
            </span>
          </Link>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎉 추천 여행 일정
          </h1>
          <p className="text-xl text-muted-foreground mb-6">AI가 생성한 완벽한 맞춤형 여행 일정을 확인하세요 ✨</p>
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4 max-w-3xl mx-auto">
            <p className="text-lg font-medium text-foreground mb-2">🔥 원하는 항목을 선택해서 나만의 일정을 만들어보세요!</p>
            <p className="text-sm text-muted-foreground">두 일정에서 마음에 드는 항목들을 체크박스로 선택하고 커스텀 일정을 생성할 수 있습니다.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="shadow-2xl border-0 bg-card rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
              <h2 className="text-3xl text-center font-bold">🌟 추천 일정 1</h2>
              <p className="text-center mt-2 opacity-90">문화·역사 중심 코스</p>
            </div>
            <div className="p-6">
              {schedule1.map((item) => (
                <div key={item.id} className="border-b border-border pb-4 mb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm text-blue-600 font-medium">{item.time}</span>
                          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm text-orange-600 font-medium">{item.cost}</p>
                        </div>
                      </div>
                      {showDetails1 && (
                        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setShowDetails1(!showDetails1)}
                className="w-full mt-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                {showDetails1 ? "간단히 보기" : "자세히 보기"}
              </button>
            </div>
          </div>

          <div className="shadow-2xl border-0 bg-card rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6">
              <h2 className="text-3xl text-center font-bold">🌟 추천 일정 2</h2>
              <p className="text-center mt-2 opacity-90">힐링·맛집 중심 코스</p>
            </div>
            <div className="p-6">
              {schedule2.map((item) => (
                <div key={item.id} className="border-b border-border pb-4 mb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm text-green-600 font-medium">{item.time}</span>
                          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm text-orange-600 font-medium">{item.cost}</p>
                        </div>
                      </div>
                      {showDetails2 && (
                        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setShowDetails2(!showDetails2)}
                className="w-full mt-4 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                {showDetails2 ? "간단히 보기" : "자세히 보기"}
              </button>
            </div>
          </div>
        </div>

        {selectedItems.size > 0 && (
          <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-lg font-medium text-foreground mb-4">
                🎯 {selectedItems.size}개 항목이 선택되었습니다
              </p>
              <button
                onClick={handleCreateCustomSchedule}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
              >
                ✨ 나만의 일정 만들기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 