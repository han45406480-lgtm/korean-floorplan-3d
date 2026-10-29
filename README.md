# 🏢 한국 평면도 3D 이미지 스튜디오 (Korean Floorplan 3D AI)

> **한국 아파트·오피스텔 2D 평면도를 3초 만에 고화질 3D 입체 조감도로 변환하고, 인스타그램·네이버 블로그 맞춤 마케팅 에셋 팩을 원클릭으로 생성하는 오픈소스 AI 프롭테크 엔진**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![ControlNet AI](https://img.shields.io/badge/AI%20Engine-ControlNet%20%2B%20FLUX-emerald)](https://github.com/lllyasviel/ControlNet)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/han45406480-lgtm/korean-floorplan-3d/pulls)

---

## 🌟 프로젝트 개요 (Overview)

대한민국의 일반 아파트와 오피스텔은 건축법(발코니 확장 기준, 대피공간, 실외기실 환기 규정)으로 인해 **전국의 95% 이상이 4Bay 판상형 및 규격화된 평면 모듈**을 공유합니다. 

본 프로젝트는 수억 원대의 무거운 3D CAD 소프트웨어 대신, **한국형 5대 표준 평면 템플릿과 ControlNet(LineArt/Depth) AI 파이프라인**을 결합하여 부동산 에이전트와 분양상담사가 스마트폰과 웹에서 **단 3초 만에 3D 조감도와 마케팅 전단지**를 만들 수 있도록 설계된 오픈소스 솔루션입니다.

---

## 🚀 핵심 기능 (Key Features)

1. **한국 5대 표준 평면도 모듈 (59A / 63A / 74A / 84A / 84B / 99A)**
   - 국민평형 84A 4Bay 판상형, 84B 안방 베타공간 특화, 소형 59A 4Bay 등 대한민국 신축 아파트 평면 95% 즉시 대응.
   - 거실 유효폭(4.5m 광폭), 침실 치수, 드레스룸, 팬트리 좌표 체계 보존.

2. **벽체 오차율 0% 3D 아이소메트릭 렌더러 (ControlNet Pipeline)**
   - 2D 도면의 벽체, 창문, 방문 열림 방향을 1픽셀도 왜곡하지 않고 고정.
   - 자이(Xi)·푸르지오(Prugio) 수준의 하이엔드 인테리어 마감재(이탈리아산 포셀린타일 아트월, 내추럴 오크 강마루, 엔지니어드스톤 아일랜드 주방) 자동 텍스처링.

3. **SNS 맞춤형 멀티 비율 원클릭 익스포터 (HTML5 Canvas Engine)**
   - AI 이미지를 매번 새로 생성할 필요 없이, 단 1장의 3D 조감 이미지를 브라우저 캔버스로 리사이징:
     - 📸 **인스타그램 피드용**: `4:5 세로형` (상하단 단지명 & 평면 혜택 오버레이)
     - 📱 **인스타그램 스토리 / 숏츠용**: `9:16 전신형` (하단 담당자 직통 명함 배너 자동 삽입)
     - 📝 **네이버 블로그용**: `3:2 / 1:1 표준형`
     - ⚖️ 법적 분쟁 방지용 *"※ 본 이미지는 소비자의 이해를 돕기 위한 3D 연출 컷입니다"* 면책 문구 자동 합성.

4. **50대 영업 1등 부장님 마케팅 카피 생성기 (휴먼상렬체)**
   - 분양판 30년 짬바의 묵직한 관록과 지상렬식 기상천외한 파격 비유("안구에 습기 찬다", "태평양 한가운데 돗자리", "나르니아 연대기 옷장")가 결합된 카카오톡 단톡방 1초 복붙 브리핑 자동 출력.

---

## 🏗️ 시스템 아키텍처 (System Architecture)

```
[2D 평면도 PDF / 이미지 인풋]
         │
         ▼
[한국 표준 5대 평면 그리드 매핑]
  - 84A (4Bay 판상형), 84B (3면 발코니 안방 베타공간)
  - 벽체 & 창문 라인 추출 (LineArt Preprocessor)
         │
         ▼
[한국 하이엔드 마감재 프롬프트 엔진]
  - 포셀린 타일, 오크 강마루, 아일랜드 식탁, 간접 우물조명
         │
         ▼
[ControlNet + FLUX / SDXL 3D 렌더러]
  - 3초 만에 3D 탑뷰 아이소메트릭 고화질 이미지 렌더링
         │
         ▼
[HTML5 Canvas 멀티 비율 패키징]
  ┌───────────────────┬────────────────────┬────────────────────┐
  ▼                   ▼                    ▼                    ▼
인스타 피드 (4:5)   인스타 스토리 (9:16)  네이버 블로그 (1:1)  50대 부장님 카톡 카피
```

---

## 💻 빠른 시작 (Getting Started)

### 필수 요구사항 (Prerequisites)
- Node.js 18.0 이상
- npm 또는 pnpm / yarn

### 설치 및 로컬 실행 (Installation)

```bash
# 1. 저장소 클론
git clone https://github.com/han45406480-lgtm/korean-floorplan-3d.git
cd korean-floorplan-3d

# 2. 의존성 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 후 즉시 사용 가능합니다.

---

## 🗺️ 글로벌 확장 로드맵 (Roadmap)

- [x] **v0.1**: 한국 표준 5대 아파트 평면 템플릿 및 3D 렌더링 엔진 구축
- [x] **v0.1**: HTML5 Canvas 기반 인스타/블로그 멀티 비율 자동 익스포트
- [x] **v0.1**: 50대 영업 1등 부장님 (휴먼상렬체) 카피 엔진 탑재
- [ ] **v0.2**: PDF 교육자료(모집공고문) 다중 페이지 자동 크롭 파서(`pdfjs-dist`) 연동
- [ ] **v0.3**: 국토교통부 아파트 실거래가 API 연동 안전마진 자동 비교표(`house-ping` 포팅)
- [ ] **v0.4 (글로벌 1차)**: 싱가포르 New Launch 콘도 평면도(sqft) 및 WhatsApp 원클릭 브로드캐스트
- [ ] **v0.5 (글로벌 2차)**: 미국 MLS 주택 평면도 연동 및 Single Property Website 빌더 지원

---

## 📄 라이선스 (License)

본 프로젝트는 **[MIT License](LICENSE)**에 따라 자유롭게 사용, 수정, 상업적 배포가 가능합니다.

---

### 👨‍💻 만든 사람 (Author)
* **Team 분양딸깍 (Bunyang AI Studio)**
* GitHub: [@han45406480-lgtm](https://github.com/han45406480-lgtm)
* Email: han45406480@gmail.com
