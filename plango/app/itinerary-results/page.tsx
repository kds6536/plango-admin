"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Printer, Save, RotateCcw, Plane } from "lucide-react"

export default function ItineraryResultsPage() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [showDetails1, setShowDetails1] = useState(false)
  const [showDetails2, setShowDetails2] = useState(false)

  // 샘플 일정 데이터
  const schedule1 = [
    { id: "1-1", time: "09:00", title: "경복궁 관람", description: "조선왕조의 정궁에서 역사와 문화를 체험하세요. 수문장 교대식 관람 가능.", cost: "3,000원" },
    { id: "1-2", time: "12:00", title: "인사동 점심", description: "전통 한식당에서 맛있는 한정식을 즐기며 한국의 맛을 느껴보세요.", cost: "15,000원" },
    { id: "1-3", time: "14:00", title: "명동 쇼핑", description: "한국 최대의 쇼핑거리에서 쇼핑과 거리음식을 즐겨보세요.", cost: "50,000원" },
    { id: "1-4", time: "18:00", title: "남산타워", description: "서울의 야경을 한눈에 볼 수 있는 최고의 전망대입니다.", cost: "12,000원" }
  ]

  const schedule2 = [
    { id: "2-1", time: "10:00", title: "한강공원", description: "한강에서 자전거를 타며 여유로운 시간을 보내세요.", cost: "5,000원" },
    { id: "2-2", time: "13:00", title: "홍대 맛집", description: "젊음의 거리 홍대에서 다양한 맛집을 탐방해보세요.", cost: "20,000원" },
    { id: "2-3", time: "16:00", title: "이태원 카페", description: "세계 각국의 문화가 어우러진 이태원의 특별한 카페들.", cost: "8,000원" },
    { id: "2-4", time: "19:00", title: "동대문 야시장", description: "밤늦게까지 열리는 동대문에서 쇼핑과 야식을 즐겨보세요.", cost: "25,000원" }
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

  const handleSaveSchedule = () => {
    alert("일정이 저장되었습니다! 💾")
  }

  const handleViewOtherSchedules = () => {
    alert("다른 일정을 불러오는 중입니다... 🔄")
  }

  const handleDownload = () => {
    alert("일정이 다운로드됩니다! 📱")
  }

  const handlePrint = () => {
    window.print()
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
    
    alert(`선택된 ${selectedItems.size}개 항목으로 커스텀 일정이 생성됩니다! ✨`)
    console.log("선택된 일정:", selectedSchedule)
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white transform rotate-45" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Go
            </span>
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎉 추천 여행 일정 (새로고침됨)
          </h1>
          <p className="text-xl text-muted-foreground">AI가 생성한 완벽한 맞춤형 여행 일정을 확인하세요 ✨</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button onClick={handleSaveSchedule} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4" />
            <span>📝 일정 저장하기</span>
          </Button>
          <Button onClick={handleViewOtherSchedules} variant="outline" className="flex items-center space-x-2">
            <RotateCcw className="w-4 h-4" />
            <span>👁️ 다른 일정 보기</span>
          </Button>
          <Button onClick={handleDownload} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4" />
            <span>💾 일정 다운로드</span>
          </Button>
          <Button onClick={handlePrint} variant="outline" className="flex items-center space-x-2">
            <Printer className="w-4 h-4" />
            <span>🖨️ 바로 프린터</span>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 추천 일정 1 */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-2xl text-center">🌟 추천 일정 1 (문화·역사)</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">일정 선택</h3>
                <Button 
                  onClick={() => setShowDetails1(!showDetails1)} 
                  variant="outline" 
                  size="sm"
                >
                  {showDetails1 ? "간단히 보기" : "자세히 보기"}
                </Button>
              </div>
              
              <div className="space-y-4">
                {schedule1.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">
                        {item.time} - {item.title}
                      </div>
                      <div className="text-sm text-muted-foreground">비용: {item.cost}</div>
                      {showDetails1 && (
                        <div className="text-sm text-muted-foreground mt-2 p-2 bg-background rounded">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 추천 일정 2 */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <CardTitle className="text-2xl text-center">🌟 추천 일정 2 (힐링·맛집)</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">일정 선택</h3>
                <Button 
                  onClick={() => setShowDetails2(!showDetails2)} 
                  variant="outline" 
                  size="sm"
                >
                  {showDetails2 ? "간단히 보기" : "자세히 보기"}
                </Button>
              </div>
              
              <div className="space-y-4">
                {schedule2.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">
                        {item.time} - {item.title}
                      </div>
                      <div className="text-sm text-muted-foreground">비용: {item.cost}</div>
                      {showDetails2 && (
                        <div className="text-sm text-muted-foreground mt-2 p-2 bg-background rounded">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 혼합 일정 생성 버튼 */}
        {selectedItems.size > 0 && (
          <div className="text-center mt-8">
            <div className="mb-4">
              <span className="text-lg font-semibold text-foreground">
                선택된 항목: {selectedItems.size}개
              </span>
            </div>
            <Button 
              onClick={handleCreateCustomSchedule}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
            >
              ✨ 혼합 일정 재생성하기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
