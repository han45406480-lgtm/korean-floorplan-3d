import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '한국 평면도 3D 이미지 스튜디오 (Korean Floorplan 3D Studio)',
  description: '한국 아파트·오피스텔 2D 평면도를 3초 만에 3D 입체 조감도로 변환하는 오픈소스 AI 엔진 및 SNS 마케팅 킷',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
