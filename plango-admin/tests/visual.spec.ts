import { test, expect } from '@playwright/test';

test('홈페이지 시각적 요소 확인', async ({ page }) => {
  // 실제 배포 주소로 변경 필요
  await page.goto('https://plango-admin.vercel.app');

  // 헤더, 주요 버튼, 텍스트 등 시각적 요소가 보이는지 확인
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('text=로그인')).toBeVisible();
  // 필요시 전체 페이지 스크린샷 저장
  await page.screenshot({ path: 'homepage.png', fullPage: true });
}); 