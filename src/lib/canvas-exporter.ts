import { ExportConfig } from '../types/floorplan';

/**
 * Single 1:1 image rendered into multi-ratio SNS layouts using HTML5 Canvas
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
        // 4:5 ratio
        width = 1080;
        height = 1350;
      } else if (config.ratio === 'instagram-story') {
        // 9:16 ratio
        width = 1080;
        height = 1920;
      } else if (config.ratio === 'naver-blog') {
        // 3:2 ratio
        width = 1200;
        height = 800;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // 1. Dark charcoal premium background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Subtle gradient header
      const grad = ctx.createLinearGradient(0, 0, 0, height * 0.25);
      grad.addColorStop(0, '#1e293b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height * 0.25);

      // 2. Draw Header
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 28px -apple-system, sans-serif';
      ctx.fillText(config.projectName, 60, 80);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px -apple-system, sans-serif';
      ctx.fillText(`${config.unitType} 프리미엄 3D 평면`, 60, 140);

      // 3. Draw Source 3D Image (preserve aspect, center in remaining space)
      const maxImgW = width - 120;
      const maxImgH = config.ratio === 'instagram-story' ? height * 0.55 : height * 0.65;
      const scale = Math.min(maxImgW / img.width, maxImgH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = (width - drawW) / 2;
      const drawY = 180 + (maxImgH - drawH) / 2;

      // Draw subtle shadow frame
      ctx.fillStyle = '#1e293b';
      ctx.roundRect ? ctx.roundRect(drawX - 10, drawY - 10, drawW + 20, drawH + 20, 16) : ctx.rect(drawX - 10, drawY - 10, drawW + 20, drawH + 20);
      ctx.fill();

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // 4. Draw Footer / Agent Badge
      const footerY = height - 120;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(40, footerY - 50, width - 80, 90);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px -apple-system, sans-serif';
      ctx.fillText(`담당: ${config.agentName}`, 70, footerY);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 32px -apple-system, sans-serif';
      ctx.fillText(`직통문의 ${config.agentPhone}`, 250, footerY + 3);

      // 5. Watermark / Disclaimer
      ctx.fillStyle = '#64748b';
      ctx.font = '16px -apple-system, sans-serif';
      ctx.fillText(config.watermarkText, 60, height - 30);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = sourceImageUrl;
  });
}
