import { ExportConfig } from '../types/floorplan';

/**
 * Exports a single 3D floorplan image into SNS-ready ratios (4:5, 9:16, 3:2, 1:1)
 * while guaranteeing that no part of the floorplan is cropped.
 */
export async function exportToCanvas(
  sourceImageUrl: string,
  config: ExportConfig
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let width = 1080;
      let height = 1080;

      if (config.ratio === 'instagram-feed') {
        width = 1080;
        height = 1350; // 4:5
      } else if (config.ratio === 'instagram-story') {
        width = 1080;
        height = 1920; // 9:16
      } else if (config.ratio === 'naver-blog') {
        width = 1200;
        height = 800; // 3:2
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }

      // 1. Background Fill
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // 2. Top Header Title
      const headerHeight = config.ratio === 'naver-blog' ? 100 : 160;
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 24px -apple-system, sans-serif';
      ctx.fillText(config.projectName, 56, headerHeight * 0.45);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 38px -apple-system, sans-serif';
      ctx.fillText(`${config.unitType} 3D 입체 평면도`, 56, headerHeight * 0.82);

      // 3. Fit Entire 3D Floorplan inside Safe Margin (Zero Cropping)
      const footerHeight = 80;
      const availW = width - 80;
      const availH = height - headerHeight - footerHeight;
      const scale = Math.min(availW / img.width, availH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = (width - drawW) / 2;
      const drawY = headerHeight + (availH - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // 4. Mandatory AI Generation Notice / Watermark
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(config.watermarkText, width / 2, height - 30);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = sourceImageUrl;
  });
}
