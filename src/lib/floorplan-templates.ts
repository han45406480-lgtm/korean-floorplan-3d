import { FloorplanTemplate } from '../types/floorplan';

export const KOREAN_STANDARD_TEMPLATES: FloorplanTemplate[] = [
  {
    id: '84A',
    name: '84A타입 국민평형',
    pyung: 34,
    areaExclusive: 84.99,
    bayStructure: '4Bay 판상형',
    features: ['4.5m 와이드 광폭 거실', '대면형 LDK 주방+아일랜드', '온전한 알파룸', '안방 파우더&드레스룸', '현관창고+주방팬트리'],
    keyMarketingPoint: '가장 많은 사람이 선택하는 완성도 높은 4Bay 국민평형, 채광·통풍 극대화 맞통풍 설계',
    dimensions: {
      livingRoomWidth: '4.5m',
      masterBedroom: '3.6m x 3.6m'
    },
    sampleSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23f8fafc"/><rect x="40" y="40" width="520" height="320" fill="none" stroke="%23334155" stroke-width="4"/><line x1="170" y1="40" x2="170" y2="360" stroke="%2364748b" stroke-width="2"/><line x1="300" y1="40" x2="300" y2="360" stroke="%2364748b" stroke-width="2"/><line x1="430" y1="40" x2="430" y2="360" stroke="%2364748b" stroke-width="2"/><line x1="40" y1="180" x2="430" y2="180" stroke="%2364748b" stroke-width="2"/><text x="105" y="110" font-family="sans-serif" font-size="14" fill="%230f172a" text-anchor="middle">침실3 (2.7x3.3)</text><text x="235" y="110" font-family="sans-serif" font-size="14" fill="%230f172a" text-anchor="middle">침실2 (2.7x3.3)</text><text x="365" y="110" font-family="sans-serif" font-size="16" font-weight="bold" fill="%230f172a" text-anchor="middle">거실 (4.5m)</text><text x="495" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230f172a" text-anchor="middle">침실1 (안방)</text><text x="235" y="270" font-family="sans-serif" font-size="14" fill="%230f172a" text-anchor="middle">알파룸 / 팬트리</text><text x="365" y="270" font-family="sans-serif" font-size="14" fill="%230f172a" text-anchor="middle">주방 / 식당 (대면형)</text><text x="495" y="270" font-family="sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">드레스룸/부부욕실</text></svg>'
  },
  {
    id: '84B',
    name: '84B타입 판상끝판왕',
    pyung: 34,
    areaExclusive: 84.96,
    bayStructure: '3면 개방형',
    features: ['안방 독립 베타공간 (서재/홈짐)', '3면 발코니 확장 서비스면적 극대화', '완벽한 수납 삼각지대', '4.5m 광폭 거실'],
    keyMarketingPoint: '3면 발코니 확장으로 체감 면적은 40평형대! 안방 안쪽 전용 베타공간 설계',
    dimensions: {
      livingRoomWidth: '4.5m',
      masterBedroom: '4.8m x 3.6m'
    },
    sampleSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23f8fafc"/><rect x="40" y="40" width="520" height="320" fill="none" stroke="%23334155" stroke-width="4"/><line x1="160" y1="40" x2="160" y2="360" stroke="%2364748b" stroke-width="2"/><line x1="300" y1="40" x2="300" y2="360" stroke="%2364748b" stroke-width="2"/><line x1="430" y1="40" x2="430" y2="360" stroke="%2364748b" stroke-width="2"/><text x="100" y="110" font-family="sans-serif" font-size="14" fill="%230f172a" text-anchor="middle">침실3</text><text x="230" y="110" font-family="sans-serif" font-size="14" fill="%230f172a" text-anchor="middle">침실2</text><text x="365" y="110" font-family="sans-serif" font-size="16" font-weight="bold" fill="%230f172a" text-anchor="middle">거실 (4.5m)</text><text x="495" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="%230f172a" text-anchor="middle">침실1 (안방)</text><text x="495" y="270" font-family="sans-serif" font-size="14" font-weight="bold" fill="%2310b981" text-anchor="middle">★ 안방 베타공간</text></svg>'
  },
  {
    id: '59A',
    name: '59A타입 소형 명품',
    pyung: 24,
    areaExclusive: 59.99,
    bayStructure: '4Bay 판상형',
    features: ['소형 희소 4Bay 구조', '안방 파우더룸&드레스룸 완비', '주방 팬트리 수납', '다용도실 세탁동선'],
    keyMarketingPoint: '최근 공급 가뭄인 24평형의 완벽한 4Bay 판상형, 신혼부부·실속 실수요 1순위',
    dimensions: {
      livingRoomWidth: '3.6m',
      masterBedroom: '3.3m x 3.0m'
    },
    sampleSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23f8fafc"/><rect x="40" y="40" width="520" height="320" fill="none" stroke="%23334155" stroke-width="4"/><text x="300" y="200" font-family="sans-serif" font-size="18" font-weight="bold" fill="%230f172a" text-anchor="middle">59A 4Bay 판상형 표준 도면</text></svg>'
  },
  {
    id: '74A',
    name: '74A타입 체감면적 극대화',
    pyung: 30,
    areaExclusive: 74.96,
    bayStructure: '4Bay 판상형',
    features: ['4.2m 와이드 거실', '알파룸 제공', '현관창고+주방팬트리', '가성비·가심비 최적화'],
    keyMarketingPoint: '사는 느낌은 34평형 그대로, 분양가와 관리비는 30평형대로 1억 원 가까이 아끼는 스마트 초이스',
    dimensions: {
      livingRoomWidth: '4.2m',
      masterBedroom: '3.5m x 3.3m'
    },
    sampleSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23f8fafc"/><rect x="40" y="40" width="520" height="320" fill="none" stroke="%23334155" stroke-width="4"/><text x="300" y="200" font-family="sans-serif" font-size="18" font-weight="bold" fill="%230f172a" text-anchor="middle">74A 4Bay 판상형 도면</text></svg>'
  },
  {
    id: '99A',
    name: '99A타입 대형 5Bay 프리미엄',
    pyung: 39,
    areaExclusive: 99.39,
    bayStructure: '5Bay 판상형',
    features: ['압도적인 5Bay 판상형 거대 4룸', '4.8m 광폭 거실', '독립형 다이닝룸', '초대형 부티크 드레스룸'],
    keyMarketingPoint: '살아가면서 집 좁아서 이사 갈 걱정 평생 없는 대형 평면 희소성 1위',
    dimensions: {
      livingRoomWidth: '4.8m',
      masterBedroom: '4.2m x 3.5m'
    },
    sampleSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23f8fafc"/><rect x="40" y="40" width="520" height="320" fill="none" stroke="%23334155" stroke-width="4"/><text x="300" y="200" font-family="sans-serif" font-size="18" font-weight="bold" fill="%230f172a" text-anchor="middle">99A 5Bay 대형 평면 도면</text></svg>'
  }
];
