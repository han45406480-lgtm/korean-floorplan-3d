import { FloorplanTemplate } from '../types/floorplan';

export interface PromptOptions {
  interiorStyle?: 'modern_luxury' | 'natural_warm' | 'minimal_white';
  flooringMaterial?: 'oak_wood' | 'porcelain_tile' | 'marble';
  wallFinishes?: 'italian_tile' | 'warm_gray_wallpaper';
  includeFurniture?: boolean;
}

export function generate3dPrompt(template: FloorplanTemplate, options: PromptOptions = {}): {
  prompt: string;
  negativePrompt: string;
  controlNetPreprocessor: string;
} {
  const style = options.interiorStyle || 'modern_luxury';
  
  const basePrompt = [
    `3D isometric architectural floor plan rendering of a modern Korean luxury apartment (${template.id} unit)`,
    `top-down cutaway aerial view with open ceiling`,
    `exact wall layout and boundary strictly preserved: ${template.bayStructure}`,
    `living room width ${template.dimensions.livingRoomWidth}, master bedroom ${template.dimensions.masterBedroom}`,
    `natural oak engineered wood flooring with soft satin reflection`,
    `premium Italian porcelain tile feature wall in living room`,
    `kitchen with engineered stone island countertop and minimalist matte white cabinetry`,
    `master bedroom with glass-door luxury boutique walk-in closet and ensuite bathroom`,
    `modern designer furniture placement: comfortable fabric sofa, low coffee table, Scandinavian dining chairs, indoor planter`,
    `soft recessed ceiling cove lighting, warm daylight beaming through balcony windows (4000K daylight)`,
    `photorealistic, Unreal Engine 5 render, Octane Render style, high detail, clean 8k resolution, architectural digest photography`
  ].join(', ');

  const negativePrompt = [
    'deformed walls',
    'crooked boundaries',
    'missing rooms',
    'low resolution',
    'blurry textures',
    'distorted furniture',
    'dark shadows',
    'overexposed highlights',
    'cartoonish',
    'unrealistic ceiling roofs',
    'cluttered mess'
  ].join(', ');

  return {
    prompt: basePrompt,
    negativePrompt: negativePrompt,
    controlNetPreprocessor: 'lineart_standard' // or 'canny'
  };
}
