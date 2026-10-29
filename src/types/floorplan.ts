export type ApartmentType = '59A' | '63A' | '74A' | '84A' | '84B' | '84C' | '99A';

export interface RoomSpec {
  id: string;
  name: string;
  type: 'living' | 'bedroom' | 'master' | 'kitchen' | 'bath' | 'balcony' | 'Alpha' | 'entrance' | 'dressroom' | 'pantry';
  x: number; // grid percentage 0-100
  y: number;
  w: number;
  h: number;
  dimText?: string;
}

export interface FloorplanTemplate {
  id: ApartmentType;
  name: string;
  pyung: number;
  areaExclusive: number;
  bayStructure: '4Bay 판상형' | '3면 개방형' | '5Bay 판상형' | '타워형';
  dimensions: {
    livingRoomWidth: string;
    masterBedroom: string;
  };
  rooms: RoomSpec[];
}

export type SnsRatio = 'instagram-feed' | 'instagram-story' | 'naver-blog' | 'square';

export type FlooringType = 'oak_wood' | 'porcelain_tile' | 'herringbone' | 'marble';
export type LightingTone = 'warm_daylight' | 'hotel_lounge' | 'bright_studio';
export type CameraAngle = 'iso_45' | 'top_60' | 'front_30';

export interface RenderConfig {
  flooring: FlooringType;
  lighting: LightingTone;
  cameraAngle: CameraAngle;
  wallHeight: number; // 20 - 60
  showLabels: boolean;
  showDimensions: boolean;
  showFurniture: boolean;
}

export interface ExportConfig {
  ratio: SnsRatio;
  projectName: string;
  unitType: string;
  watermarkText: string;
}
