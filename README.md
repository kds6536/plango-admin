# plango-admin

Plan Go 관리자 페이지 (독립형 프로젝트)

## 프로젝트 구조
- 이 폴더는 관리자 페이지(프론트엔드)만을 위한 독립 프로젝트입니다.
- 메인 서비스(`plango`)와 별도로 운영하며, 각각 별도의 GitHub 저장소와 Railway 서비스로 배포합니다.

## 주요 기술 스택
- Next.js 14
- React 18
- Tailwind CSS
- @tanstack/react-query
- Supabase (인증/DB)

## 개발 및 실행 방법
```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 환경 변수 설정
`.env.local` 파일에 아래와 같이 환경변수를 설정하세요.
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=your_backend_api_url
```

## Railway 배포 가이드
1. 이 저장소를 Railway에 연결하여 새 서비스로 등록합니다.
2. Railway의 Variables 탭에서 위 환경변수를 등록합니다.
3. 빌드/배포 에러 발생 시 Build Logs, Logs 탭을 확인하여 문제를 해결합니다.

---

문의: kds6536 (GitHub)
