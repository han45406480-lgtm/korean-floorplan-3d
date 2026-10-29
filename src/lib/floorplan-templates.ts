import { FloorplanTemplate } from '../types/floorplan';

export const KOREAN_STANDARD_TEMPLATES: FloorplanTemplate[] = [
  {
    id: '84A',
    name: '84㎡A (4Bay 판상형 표준)',
    pyung: 34,
    areaExclusive: 84.99,
    bayStructure: '4Bay 판상형',
    dimensions: {
      livingRoomWidth: '4.5m',
      masterBedroom: '3.6m × 3.6m'
    },
    rooms: [
      // Top row: Entrance, Bath1, Alpha/Pantry, Kitchen/Dining, Dressroom, MasterBath
      { id: 'ent', name: '현관/창고', type: 'entrance', x: 6, y: 12, w: 12, h: 24, dimText: '1.6×2.2' },
      { id: 'bath1', name: '공용욕실', type: 'bath', x: 6, y: 36, w: 12, h: 18, dimText: '2.1×1.8' },
      { id: 'pantry', name: '팬트리/알파룸', type: 'Alpha', x: 18, y: 12, w: 16, h: 28, dimText: '2.4×2.3' },
      { id: 'kitchen', name: '주방/식당', type: 'kitchen', x: 34, y: 8, w: 28, h: 34, dimText: '3.8×3.4' },
      { id: 'bath2', name: '부부욕실', type: 'bath', x: 62, y: 14, w: 13, h: 22, dimText: '2.2×1.8' },
      { id: 'dress', name: '드레스룸', type: 'dressroom', x: 75, y: 8, w: 19, h: 28, dimText: '2.9×2.4' },
      // Bottom row (South-facing 4Bay): Bed3, Bed2, Living Room, Master Bedroom
      { id: 'bed3', name: '침실3', type: 'bedroom', x: 6, y: 54, w: 18, h: 36, dimText: '3.0×3.3' },
      { id: 'bed2', name: '침실2', type: 'bedroom', x: 24, y: 54, w: 18, h: 36, dimText: '2.7×3.3' },
      { id: 'living', name: '거실', type: 'living', x: 42, y: 42, w: 28, h: 48, dimText: '4.5m 광폭' },
      { id: 'master', name: '침실1(안방)', type: 'master', x: 70, y: 36, w: 24, h: 44, dimText: '3.6×3.6' },
      { id: 'balcony', name: '발코니', type: 'balcony', x: 70, y: 80, w: 24, h: 10, dimText: '확장/실외기' }
    ]
  },
  {
    id: '84B',
    name: '84㎡B (3면 개방 + 베타공간)',
    pyung: 34,
    areaExclusive: 84.96,
    bayStructure: '3면 개방형',
    dimensions: {
      livingRoomWidth: '4.5m',
      masterBedroom: '4.8m × 3.6m'
    },
    rooms: [
      { id: 'ent', name: '현관/창고', type: 'entrance', x: 6, y: 14, w: 14, h: 22, dimText: '1.8×2.2' },
      { id: 'bath1', name: '공용욕실', type: 'bath', x: 6, y: 36, w: 14, h: 18, dimText: '2.1×1.8' },
      { id: 'pantry', name: '대형팬트리', type: 'pantry', x: 20, y: 14, w: 12, h: 26, dimText: '1.8×2.4' },
      { id: 'kitchen', name: '주방/다이닝', type: 'kitchen', x: 32, y: 8, w: 26, h: 34, dimText: '4.5×3.8' },
      { id: 'bath2', name: '부부욕실', type: 'bath', x: 58, y: 14, w: 12, h: 22, dimText: '2.1×1.8' },
      { id: 'dress', name: '드레스룸', type: 'dressroom', x: 70, y: 8, w: 12, h: 28, dimText: '2.0×2.6' },
      { id: 'beta', name: '안방 베타룸', type: 'Alpha', x: 82, y: 14, w: 13, h: 26, dimText: '2.9×2.2' },
      { id: 'bed3', name: '침실3', type: 'bedroom', x: 6, y: 54, w: 18, h: 36, dimText: '3.0×3.3' },
      { id: 'bed2', name: '침실2', type: 'bedroom', x: 24, y: 54, w: 17, h: 36, dimText: '2.7×3.3' },
      { id: 'living', name: '거실', type: 'living', x: 41, y: 42, w: 27, h: 48, dimText: '4.5m 광폭' },
      { id: 'master', name: '침실1(안방)', type: 'master', x: 68, y: 40, w: 27, h: 40, dimText: '4.8×3.6' },
      { id: 'balcony', name: '발코니', type: 'balcony', x: 68, y: 80, w: 27, h: 10, dimText: '발코니' }
    ]
  },
  {
    id: '59A',
    name: '59㎡A (소형 4Bay 판상형)',
    pyung: 24,
    areaExclusive: 59.99,
    bayStructure: '4Bay 판상형',
    dimensions: {
      livingRoomWidth: '3.6m',
      masterBedroom: '3.3m × 3.0m'
    },
    rooms: [
      { id: 'dress', name: '드레스룸', type: 'dressroom', x: 8, y: 12, w: 14, h: 26, dimText: '1.8×2.4' },
      { id: 'bath2', name: '부부욕실', type: 'bath', x: 22, y: 16, w: 12, h: 22, dimText: '1.8×1.8' },
      { id: 'kitchen', name: '주방/식당', type: 'kitchen', x: 34, y: 10, w: 28, h: 32, dimText: '2.9×3.2' },
      { id: 'pantry', name: '팬트리', type: 'pantry', x: 62, y: 18, w: 12, h: 22, dimText: '1.5×1.8' },
      { id: 'ent', name: '현관', type: 'entrance', x: 74, y: 14, w: 18, h: 20, dimText: '1.5×1.8' },
      { id: 'bath1', name: '공용욕실', type: 'bath', x: 74, y: 34, w: 18, h: 18, dimText: '2.1×1.6' },
      { id: 'master', name: '침실1(안방)', type: 'master', x: 8, y: 38, w: 26, h: 48, dimText: '3.3×3.0' },
      { id: 'living', name: '거실', type: 'living', x: 34, y: 42, w: 24, h: 44, dimText: '3.6m' },
      { id: 'bed2', name: '침실2', type: 'bedroom', x: 58, y: 52, w: 17, h: 34, dimText: '2.7×3.1' },
      { id: 'bed3', name: '침실3', type: 'bedroom', x: 75, y: 52, w: 17, h: 34, dimText: '2.7×3.1' }
    ]
  },
  {
    id: '74A',
    name: '74㎡A (중소형 4Bay + 알파룸)',
    pyung: 30,
    areaExclusive: 74.96,
    bayStructure: '4Bay 판상형',
    dimensions: {
      livingRoomWidth: '4.2m',
      masterBedroom: '3.5m × 3.3m'
    },
    rooms: [
      { id: 'ent', name: '현관/창고', type: 'entrance', x: 6, y: 14, w: 13, h: 22, dimText: '1.6×2.0' },
      { id: 'bath1', name: '공용욕실', type: 'bath', x: 6, y: 36, w: 13, h: 18, dimText: '2.1×1.7' },
      { id: 'alpha', name: '알파룸', type: 'Alpha', x: 19, y: 12, w: 16, h: 28, dimText: '1.8×2.3' },
      { id: 'kitchen', name: '주방/식당', type: 'kitchen', x: 35, y: 10, w: 27, h: 32, dimText: '2.9×3.5' },
      { id: 'bath2', name: '부부욕실', type: 'bath', x: 62, y: 14, w: 13, h: 22, dimText: '2.1×1.8' },
      { id: 'dress', name: '드레스룸', type: 'dressroom', x: 75, y: 10, w: 18, h: 26, dimText: '2.4×2.2' },
      { id: 'bed3', name: '침실3', type: 'bedroom', x: 6, y: 54, w: 18, h: 36, dimText: '2.7×3.1' },
      { id: 'bed2', name: '침실2', type: 'bedroom', x: 24, y: 54, w: 18, h: 36, dimText: '2.7×3.1' },
      { id: 'living', name: '거실', type: 'living', x: 42, y: 42, w: 26, h: 48, dimText: '4.2m' },
      { id: 'master', name: '침실1(안방)', type: 'master', x: 68, y: 36, w: 25, h: 44, dimText: '3.5×3.3' },
      { id: 'balcony', name: '발코니', type: 'balcony', x: 68, y: 80, w: 25, h: 10, dimText: '발코니' }
    ]
  },
  {
    id: '99A',
    name: '99㎡A (대형 5Bay 판상형)',
    pyung: 39,
    areaExclusive: 99.39,
    bayStructure: '5Bay 판상형',
    dimensions: {
      livingRoomWidth: '4.8m',
      masterBedroom: '4.2m × 3.5m'
    },
    rooms: [
      { id: 'dress', name: '부티크 드레스룸', type: 'dressroom', x: 5, y: 10, w: 20, h: 26, dimText: '3.2×2.4' },
      { id: 'bath2', name: '부부욕실', type: 'bath', x: 25, y: 14, w: 12, h: 22, dimText: '2.2×2.0' },
      { id: 'kitchen', name: '다이닝/주방', type: 'kitchen', x: 37, y: 8, w: 30, h: 32, dimText: '4.4×3.4' },
      { id: 'pantry', name: '대형팬트리', type: 'pantry', x: 67, y: 14, w: 12, h: 24, dimText: '1.8×2.2' },
      { id: 'ent', name: '현관/창고', type: 'entrance', x: 79, y: 12, w: 16, h: 20, dimText: '1.8×2.2' },
      { id: 'bath1', name: '공용욕실', type: 'bath', x: 79, y: 32, w: 16, h: 18, dimText: '2.2×1.8' },
      { id: 'master', name: '침실1(안방)', type: 'master', x: 5, y: 36, w: 22, h: 44, dimText: '4.2×3.5' },
      { id: 'bed2', name: '침실2', type: 'bedroom', x: 27, y: 50, w: 15, h: 40, dimText: '2.7×3.7' },
      { id: 'living', name: '거실', type: 'living', x: 42, y: 40, w: 25, h: 50, dimText: '4.8m 광폭' },
      { id: 'bed3', name: '침실3', type: 'bedroom', x: 67, y: 50, w: 14, h: 40, dimText: '2.7×3.7' },
      { id: 'bed4', name: '침실4', type: 'bedroom', x: 81, y: 50, w: 14, h: 40, dimText: '3.0×3.7' }
    ]
  }
];
