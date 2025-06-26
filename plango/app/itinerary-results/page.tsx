"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Printer, Save, RotateCcw, Plane } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ItineraryResultsPage() {
  const router = useRouter()

  // 일정 저장 기능
  const handleSaveItinerary = () => {
    const itineraryData = {
      savedAt: new Date().toISOString(),
      title: "추천 여행 일정",
      destinations: ["도쿄", "아사쿠사", "시부야", "하라주쿠"],
      duration: "3일",
      savedDate: new Date().toLocaleDateString('ko-KR')
    }

    // 로컬 스토리지에 저장
    const savedItineraries = JSON.parse(localStorage.getItem('savedItineraries') || '[]')
    savedItineraries.push(itineraryData)
    localStorage.setItem('savedItineraries', JSON.stringify(savedItineraries))

    toast.success("일정이 성공적으로 저장되었습니다! 📝", {
      description: "저장된 일정은 언제든지 확인할 수 있습니다.",
      duration: 3000,
    })
  }

  // 다른 일정 보기 (여행 일정 만들기로 이동)
  const handleViewOtherItinerary = () => {
    router.push('/create-itinerary')
  }

  // 일정 다운로드 기능
  const handleDownloadItinerary = () => {
    const itineraryText = `
# 🎉 추천 여행 일정

## 📍 전체 여행 경로
도쿄역 → 아사쿠사 → 시부야 → 하라주쿠
총 거리: 약 25km | 예상 소요시간: 3일

## 볼거리 (명소)
### 센소지 절
도쿄에서 가장 오래된 불교 사원으로 전통적인 일본 문화를 체험할 수 있습니다.

### 도쿄 스카이트리  
634m 높이의 전망대에서 도쿄 전경을 한눈에 감상하세요.

## 먹거리 (음식점)
### 스시 다이
츠키지 시장 근처의 유명한 스시 맛집으로 신선한 해산물을 맛볼 수 있습니다.

### 라멘 이치란
일본 전국에서 사랑받는 돈코츠 라멘 전문점입니다.

## 놀거리 (체험/이벤트)
### 기모노 체험
아사쿠사에서 전통 기모노를 입고 일본 문화를 체험해보세요.

## 축제 정보
### 산자 마츠리
5월 중순, 아사쿠사 신사에서 열리는 도쿄 3대 축제 중 하나입니다.

## 숙소 정보
### 시부야 비즈니스 호텔
시부야 중심가에 위치한 깔끔하고 편리한 비즈니스 호텔입니다.

## 교통편
### JR 패스
일본 전국의 JR 열차를 무제한 이용할 수 있는 외국인 전용 패스입니다.

생성일: ${new Date().toLocaleDateString('ko-KR')}
    `.trim()

    const blob = new Blob([itineraryText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `여행일정_${new Date().toLocaleDateString('ko-KR').replace(/\./g, '')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success("일정이 다운로드되었습니다! 📥", {
      description: "파일이 다운로드 폴더에 저장되었습니다.",
      duration: 3000,
    })
  }

  // 프린트 기능
  const handlePrintItinerary = () => {
    window.print()
    
    toast.info("프린트 창이 열렸습니다! 🖨️", {
      description: "프린터를 확인하고 인쇄를 진행해주세요.",
      duration: 3000,
    })
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
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎉 추천 여행 일정
          </h1>
          <p className="text-xl text-muted-foreground">AI가 생성한 완벽한 맞춤형 여행 일정을 확인하세요 ✨</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            onClick={handleSaveItinerary}
            variant="outline" 
            className="flex items-center space-x-2 bg-card backdrop-blur-sm shadow-lg border-border hover:bg-muted/50 transition-colors"
          >
            <Save className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>💾 이 일정 저장하기</span>
          </Button>
          <Button 
            onClick={handleViewOtherItinerary}
            variant="outline" 
            className="flex items-center space-x-2 bg-card backdrop-blur-sm shadow-lg border-border hover:bg-muted/50 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span>🔄 다른 일정 보기</span>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Itinerary 1 */}
          <Card className="shadow-2xl border-0 bg-card">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl text-center">🌟 추천 일정 1</CardTitle>

              {/* 전체 여행 경로 */}
              <div className="mt-4 p-4 bg-white/20 rounded-lg">
                <h4 className="font-bold text-lg mb-3">📍 전체 여행 경로</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold mb-1">
                      1
                    </div>
                    <span>도쿄역</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold mb-1">
                      2
                    </div>
                    <span>아사쿠사</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold mb-1">
                      3
                    </div>
                    <span>시부야</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold mb-1">
                      4
                    </div>
                    <span>하라주쿠</span>
                  </div>
                </div>
                <p className="text-center mt-3 text-sm">총 거리: 약 25km | 예상 소요시간: 3일</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              {/* 볼거리 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">볼거리 (명소)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">센소지 절</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        도쿄에서 가장 오래된 불교 사원으로 전통적인 일본 문화를 체험할 수 있습니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">도쿄 스카이트리</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        634m 높이의 전망대에서 도쿄 전경을 한눈에 감상하세요.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 먹거리 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">먹거리 (음식점 또는 음식)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">스시 다이</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        츠키지 시장 근처의 유명한 스시 맛집으로 신선한 해산물을 맛볼 수 있습니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">라멘 이치란</h4>
                      <p className="text-sm text-muted-foreground mb-2">일본 전국에서 사랑받는 돈코츠 라멘 전문점입니다.</p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 놀거리 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">놀거리 (체험/이벤트)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">기모노 체험</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        아사쿠사에서 전통 기모노를 입고 일본 문화를 체험해보세요.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 축제 정보 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">축제 정보</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">산자 마츠리</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        5월 중순, 아사쿠사 신사에서 열리는 도쿄 3대 축제 중 하나입니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 숙소 정보 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">숙소 정보</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">시부야 비즈니스 호텔</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        시부야 중심가에 위치한 깔끔하고 편리한 비즈니스 호텔입니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 교통편 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">교통편</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">JR 패스</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        일본 전국의 JR 열차를 무제한 이용할 수 있는 외국인 전용 패스입니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button 
                  onClick={handleDownloadItinerary}
                  className="flex-1 bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2 text-white" />
                  일정 다운로드
                </Button>
                <Button 
                  onClick={handlePrintItinerary}
                  variant="outline" 
                  className="flex-1 border-border hover:bg-muted/50 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2 text-muted-foreground" />
                  바로 프린트
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Itinerary 2 */}
          <Card className="shadow-2xl border-0 bg-card">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <CardTitle className="text-3xl text-center">🌟 추천 일정 2</CardTitle>

              {/* 전체 여행 경로 */}
              <div className="mt-4 p-4 bg-white/20 rounded-lg">
                <h4 className="font-bold text-lg mb-3">📍 전체 여행 경로</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold mb-1">
                      1
                    </div>
                    <span>신주쿠</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold mb-1">
                      2
                    </div>
                    <span>우에노</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold mb-1">
                      3
                    </div>
                    <span>긴자</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-white/50 mx-2"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold mb-1">
                      4
                    </div>
                    <span>오다이바</span>
                  </div>
                </div>
                <p className="text-center mt-3 text-sm">총 거리: 약 30km | 예상 소요시간: 3일</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              {/* Similar content structure as Itinerary 1 but with different content */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">볼거리 (명소)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">메이지 신궁</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        도심 속 자연과 전통이 어우러진 일본의 대표적인 신사입니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">우에노 공원</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        벚꽃으로 유명한 공원으로 다양한 박물관과 동물원이 있습니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 먹거리 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">먹거리 (음식점 또는 음식)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">규카츠 모토무라</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        도쿄에서 가장 유명한 규카츠 전문점으로 부드러운 소고기를 맛볼 수 있습니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">타코야키 박물관</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        오사카의 대표 음식 타코야키를 도쿄에서도 맛볼 수 있는 곳입니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 놀거리 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">놀거리 (체험/이벤트)</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">로봇 레스토랑</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        신주쿠에서 즐기는 독특한 로봇 쇼와 함께하는 식사 체험입니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 축제 정보 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">축제 정보</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">칸다 마츠리</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        5월 중순, 칸다 신사에서 열리는 에도 시대부터 이어진 전통 축제입니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 숙소 정보 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">숙소 정보</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">전통 료칸</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        일본 전통 숙박시설에서 온천과 가이세키 요리를 경험해보세요.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 교통편 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">교통편</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold text-foreground">도쿄 메트로 패스</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        도쿄 시내 지하철을 무제한 이용할 수 있는 1일/2일/3일 패스입니다.
                      </p>
                      <Link href="#" className="text-green-600 text-sm hover:underline">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button 
                  onClick={handleDownloadItinerary}
                  className="flex-1 bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2 text-white" />
                  일정 다운로드
                </Button>
                <Button 
                  onClick={handlePrintItinerary}
                  variant="outline" 
                  className="flex-1 border-border hover:bg-muted/50 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2 text-muted-foreground" />
                  바로 프린트
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
