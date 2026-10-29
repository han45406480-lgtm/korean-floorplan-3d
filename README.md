# 🏢 한국 평면도 3D 이미지 스튜디오 (Korean Floorplan 3D AI)

> **한국 아파트·오피스텔 2D 분양 평면도를 업로드하면 위에서 내려다보는 3D 입체 조감 이미지를 생성하고, 원본과 비교한 뒤 인스타그램·네이버 블로그 비율로 즉시 다운로드하는 오픈소스 프로젝트**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

---

## 🎯 핵심 사용 흐름 (Workflow)

1. **평면도 업로드 또는 한국 표준 프리셋 선택**
   - 분양 현장의 2D 평면도 이미지(PNG, JPG, WEBP)를 업로드하거나 한국 표준 아파트 5대 평면(59A, 74A, 84A, 84B, 99A)을 선택합니다.
2. **3D 입체 평면 이미지 생성**
   - 위에서 공간 전체를 내려다보는 3D 아이소메트릭(Isometric) 입체 평면 이미지를 즉시 생성합니다.
   - 카메라 각도(45° 조감, 60° 탑뷰, 30° 입체뷰), 벽체 높이, 바닥 마감재(내추럴 오크 강마루, 포셀린 타일, 헤링본, 마블), 3D 가구 배치를 실시간으로 제어할 수 있습니다.
   - 선택적으로 Cloud AI 키(Fal.ai ControlNet + FLUX)를 입력하면 클라우드 실사 렌더링도 지원합니다.
3. **원본 2D vs 생성 3D 결과 비교 슬라이더**
   - 화면 중앙의 슬라이더를 좌우로 움직여 원본 평면도의 방 개수, 창문, 발코니 위치가 3D 결과물과 일치하는지 한눈에 비교합니다.
4. **SNS 용도별 비율 원클릭 다운로드 (재생성 비용 ZERO)**
   - 3D 평면 이미지 한 장을 생성한 뒤, 집의 일부가 잘리지 않도록 여백 안에 전체 평면을 안전하게 배치하여 즉시 저장합니다:
     - **인스타그램 피드**: 세로형 `4:5` (`1080 × 1350`)
     - **인스타그램 스토리**: 세로형 `9:16` (`1080 × 1920`)
     - **네이버 블로그**: 가로형 `3:2` (`1200 × 800`) 및 정사각형 `1:1` (`1080 × 1080`)
     - 하단에 *"※ 본 이미지는 평면 이해를 돕기 위한 AI/3D 연출 이미지입니다"* 안내 문구가 자동 표시됩니다.

---

## 📂 프로젝트 구조 (Directory Structure)

```
korean-floorplan-3d/
├── src/
│   ├── app/
│   │   ├── api/render-3d/route.ts   # Cloud AI (Fal.ai ControlNet + FLUX) 연동 엔드포인트
│   │   ├── globals.css              # 스타일시트
│   │   ├── layout.tsx               # 루트 레이아웃
│   │   └── page.tsx                 # 3D 평면도 스튜디오 메인 UI (2D/3D 비교 슬라이더 포함)
│   ├── lib/
│   │   ├── floorplan-templates.ts   # 한국 아파트 5대 표준 평면 좌표 및 치수 데이터
│   │   ├── isometric-3d-renderer.ts # 내장 3D 아이소메트릭 벽체 돌출·가구·마감재 렌더링 엔진
│   │   ├── prompt-engine.ts         # ControlNet + FLUX 한국형 인테리어 프롬프트 빌더
│   │   └── canvas-exporter.ts       # SNS 비율별(4:5, 9:16, 3:2, 1:1) 무손실 여백 배치 익스포터
│   └── types/
│       └── floorplan.ts             # 타입 정의
├── LICENSE                          # MIT 라이선스
└── package.json
```

---

## 💻 로컬 실행 및 배포 방법 (Getting Started)

```bash
# 1. 패키지 설치
npm install

# 2. 로컬 개발 서버 실행 (http://localhost:3000)
npm run dev

# 3. 프로덕션 빌드
npm run build
```

---

## 📄 라이선스 (License)

본 프로젝트는 **[MIT License](LICENSE)**를 따릅니다.
