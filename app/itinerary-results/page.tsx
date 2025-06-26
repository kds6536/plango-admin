export default function ItineraryResultsPage() {
  return (
    <div className="min-h-screen p-8 bg-white text-black">
      <h1 className="text-4xl font-bold text-center mb-8">추천 여행 일정</h1>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">추천 일정 1</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-semibold">09:00 - 경복궁 관람</div>
                <div className="text-sm text-gray-600">비용: 3,000원</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-semibold">12:00 - 인사동 점심</div>
                <div className="text-sm text-gray-600">비용: 15,000원</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-semibold">14:00 - 명동 쇼핑</div>
                <div className="text-sm text-gray-600">비용: 50,000원</div>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            자세히 보기
          </button>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-800">추천 일정 2</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-semibold">10:00 - 한강공원 산책</div>
                <div className="text-sm text-gray-600">비용: 무료</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-semibold">13:00 - 홍대 맛집 투어</div>
                <div className="text-sm text-gray-600">비용: 20,000원</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <div className="font-semibold">16:00 - 이태원 문화체험</div>
                <div className="text-sm text-gray-600">비용: 30,000원</div>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600">
            자세히 보기
          </button>
        </div>
      </div>

      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
          선택한 항목으로 일정 만들기
        </button>
      </div>
    </div>
  )
} 