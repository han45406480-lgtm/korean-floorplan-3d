export type ApartmentType = '59A' | '63A' | '74A' | '84A' | '84B' | '84C' | '99A';

export interface FloorplanTemplate {
  id: ApartmentType;
  name: string;
  pyung: number;
  areaExclusive: number; // 전용면적 ㎡
  bayStructure: '4Bay 판상형' | '3면 개방형' | '5Bay 판상형' | '타워형';
  features: string[];
  keyMarketingPoint: string;
  dimensions: {
    livingRoomWidth: string; // e.g. "4.5m"
    masterBedroom: string;  // e.g. "3.6m x 3.6m"
  };
  sampleSvg: string;
}

export type SnsRatio = 'instagram-feed' | 'instagram-story' | 'naver-blog' | 'square';

export interface ExportConfig {
  ratio: SnsRatio;
  projectName: string;
  unitType: string;
  agentName: string;
  agentPhone: string;
  watermarkText: string;
}
