import { FloorplanTemplate, RenderConfig, RoomSpec } from '../types/floorplan';

/**
 * Renders the 2D Architectural CAD Blueprint View onto an HTML5 Canvas
 */
export function render2DBlueprintToDataURL(template: FloorplanTemplate): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Clean architectural paper background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1000, 1000);

  // Subtle CAD grid
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 1000; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 1000);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(1000, i);
    ctx.stroke();
  }

  // Title Header
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px -apple-system, sans-serif';
  ctx.fillText(`${template.name} — 2D 원본 평면도 (확장형)`, 60, 70);
  ctx.fillStyle = '#64748b';
  ctx.font = '18px -apple-system, sans-serif';
  ctx.fillText(`전용면적 ${template.areaExclusive}㎡ (${template.pyung}평형) | ${template.bayStructure}`, 60, 102);

  const offsetX = 50;
  const offsetY = 140;
  const scaleW = 9.0;
  const scaleH = 7.6;

  // Draw rooms
  template.rooms.forEach((room) => {
    const rx = offsetX + room.x * scaleW;
    const ry = offsetY + room.y * scaleH;
    const rw = room.w * scaleW;
    const rh = room.h * scaleH;

    // Room fill based on type
    if (room.type === 'living' || room.type === 'bedroom' || room.type === 'master') {
      ctx.fillStyle = '#e5d5c5';
    } else if (room.type === 'kitchen') {
      ctx.fillStyle = '#dfd3c3';
    } else if (room.type === 'bath' || room.type === 'balcony') {
      ctx.fillStyle = '#e2e8f0';
    } else {
      ctx.fillStyle = '#f1f5f9';
    }
    ctx.fillRect(rx, ry, rw, rh);

    // CAD Wood plank hatch lines for living/bedrooms
    if (room.type === 'living' || room.type === 'bedroom' || room.type === 'master') {
      ctx.strokeStyle = 'rgba(120, 90, 60, 0.14)';
      ctx.lineWidth = 1;
      for (let py = ry + 14; py < ry + rh; py += 14) {
        ctx.beginPath();
        ctx.moveTo(rx, py);
        ctx.lineTo(rx + rw, py);
        ctx.stroke();
      }
    }

    // Tile grid for bath/entrance
    if (room.type === 'bath' || room.type === 'entrance') {
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
      ctx.lineWidth = 1;
      for (let px = rx + 20; px < rx + rw; px += 20) {
        ctx.beginPath();
        ctx.moveTo(px, ry);
        ctx.lineTo(px, ry + rh);
        ctx.stroke();
      }
      for (let py = ry + 20; py < ry + rh; py += 20) {
        ctx.beginPath();
        ctx.moveTo(rx, py);
        ctx.lineTo(rx + rw, py);
        ctx.stroke();
      }
    }

    // Thick architectural structural wall border
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 8;
    ctx.strokeRect(rx, ry, rw, rh);

    // Window indicator on south/top edges
    if (room.y + room.h >= 85) {
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(rx + 20, ry + rh - 5, rw - 40, 10);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.strokeRect(rx + 20, ry + rh - 5, rw - 40, 10);
    }

    // Room Label & Dimensions
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(room.name, rx + rw / 2, ry + rh / 2 - 4);

    if (room.dimText) {
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 15px -apple-system, sans-serif';
      ctx.fillText(room.dimText, rx + rw / 2, ry + rh / 2 + 20);
    }
  });

  ctx.textAlign = 'left';
  return canvas.toDataURL('image/png');
}

/**
 * Renders a 3D Isometric Cutaway Perspective from either a Standard Template OR a Custom Uploaded 2D Image
 */
export async function render3DIsometricToDataURL(
  template: FloorplanTemplate,
  config: RenderConfig,
  customUploadedImage?: string | null
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Studio Lighting Background
  const bgGrad = ctx.createRadialGradient(600, 550, 100, 600, 600, 850);
  if (config.lighting === 'warm_daylight') {
    bgGrad.addColorStop(0, '#1e293b');
    bgGrad.addColorStop(1, '#090d16');
  } else if (config.lighting === 'hotel_lounge') {
    bgGrad.addColorStop(0, '#1c1917');
    bgGrad.addColorStop(1, '#0c0a09');
  } else {
    bgGrad.addColorStop(0, '#f8fafc');
    bgGrad.addColorStop(1, '#cbd5e1');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 1200);

  // Isometric Projection Helper
  const angleRad = config.cameraAngle === 'iso_45' ? -0.32 : config.cameraAngle === 'top_60' ? -0.15 : -0.45;
  const tiltScaleY = config.cameraAngle === 'iso_45' ? 0.68 : config.cameraAngle === 'top_60' ? 0.82 : 0.58;
  const wallH = config.wallHeight;

  function toIso(x: number, y: number, z: number = 0): { x: number; y: number } {
    const cx = x - 500;
    const cy = y - 500;
    const rx = cx * Math.cos(angleRad) - cy * Math.sin(angleRad) * 0.45;
    const ry = (cx * Math.sin(angleRad) * 0.45 + cy * Math.cos(angleRad)) * tiltScaleY;
    return {
      x: 600 + rx,
      y: 600 + ry - z
    };
  }

  // If user uploaded a custom 2D floorplan image, perform 3D Isometric Slab + Extruded Edge Relief Rendering
  if (customUploadedImage) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        // Draw deep 3D drop shadow under the floorplan slab
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.beginPath();
        const s1 = toIso(100, 140, -25);
        const s2 = toIso(900, 140, -25);
        const s3 = toIso(900, 860, -25);
        const s4 = toIso(100, 860, -25);
        ctx.moveTo(s1.x + 25, s1.y + 35);
        ctx.lineTo(s2.x + 25, s2.y + 35);
        ctx.lineTo(s3.x + 25, s3.y + 35);
        ctx.lineTo(s4.x + 25, s4.y + 35);
        ctx.closePath();
        ctx.fill();

        // Draw 3D foundation slab sides
        const b1 = toIso(100, 860, 0);
        const b2 = toIso(900, 860, 0);
        const b3 = toIso(900, 140, 0);
        const b1Low = toIso(100, 860, -wallH * 0.7);
        const b2Low = toIso(900, 860, -wallH * 0.7);
        const b3Low = toIso(900, 140, -wallH * 0.7);

        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.moveTo(b1.x, b1.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.lineTo(b2Low.x, b2Low.y);
        ctx.lineTo(b1Low.x, b1Low.y);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(b2.x, b2.y);
        ctx.lineTo(b3.x, b3.y);
        ctx.lineTo(b3Low.x, b3Low.y);
        ctx.lineTo(b2Low.x, b2Low.y);
        ctx.closePath();
        ctx.fill();

        // Transform canvas to isometric plane and layer uploaded plan into 3D relief
        ctx.translate(600, 580);
        ctx.scale(1, tiltScaleY);
        ctx.rotate(angleRad);

        // Multi-layer 3D wall extrusion effect
        for (let z = 0; z <= wallH; z += 3) {
          ctx.globalAlpha = z === wallH ? 1.0 : 0.12;
          ctx.drawImage(img, -400, -360 - z / tiltScaleY, 800, 720);
        }
        ctx.globalAlpha = 1.0;

        // Warm sunlight overlay
        const sunGrad = ctx.createLinearGradient(-400, -360, 400, 360);
        sunGrad.addColorStop(0, 'rgba(254, 243, 199, 0.22)');
        sunGrad.addColorStop(1, 'rgba(15, 23, 42, 0.15)');
        ctx.fillStyle = sunGrad;
        ctx.fillRect(-400, -360 - wallH / tiltScaleY, 800, 720);

        ctx.restore();
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = customUploadedImage;
    });
  }

  // 2. Render 3D Isometric Structural Floor & Walls from Template Geometry
  const offsetX = 90;
  const offsetY = 150;
  const scaleW = 8.2;
  const scaleH = 7.2;

  // Ambient Drop Shadow of the whole building slab
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.beginPath();
  const sh1 = toIso(offsetX + 40, offsetY + 50, -30);
  const sh2 = toIso(offsetX + 800, offsetY + 50, -30);
  const sh3 = toIso(offsetX + 800, offsetY + 660, -30);
  const sh4 = toIso(offsetX + 40, offsetY + 660, -30);
  ctx.moveTo(sh1.x + 30, sh1.y + 40);
  ctx.lineTo(sh2.x + 30, sh2.y + 40);
  ctx.lineTo(sh3.x + 30, sh3.y + 40);
  ctx.lineTo(sh4.x + 30, sh4.y + 40);
  ctx.closePath();
  ctx.fill();

  // Sort rooms back-to-front (top-left to bottom-right) for accurate painter's algorithm 3D occlusion
  const sortedRooms = [...template.rooms].sort((a, b) => (a.y + a.x * 0.3) - (b.y + b.x * 0.3));

  sortedRooms.forEach((room) => {
    const rx = offsetX + room.x * scaleW;
    const ry = offsetY + room.y * scaleH;
    const rw = room.w * scaleW;
    const rh = room.h * scaleH;

    const p1 = toIso(rx, ry, 0);
    const p2 = toIso(rx + rw, ry, 0);
    const p3 = toIso(rx + rw, ry + rh, 0);
    const p4 = toIso(rx, ry + rh, 0);

    // A. Floor Surface Rendering
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();

    if (room.type === 'bath') {
      ctx.fillStyle = '#cbd5e1';
    } else if (room.type === 'entrance' || room.type === 'balcony') {
      ctx.fillStyle = '#94a3b8';
    } else if (room.type === 'kitchen') {
      ctx.fillStyle = config.flooring === 'porcelain_tile' || config.flooring === 'marble' ? '#e2e8f0' : '#d6c3b0';
    } else {
      // Living / Bedrooms flooring
      if (config.flooring === 'oak_wood') ctx.fillStyle = '#dcc5ab';
      else if (config.flooring === 'herringbone') ctx.fillStyle = '#cfb293';
      else if (config.flooring === 'porcelain_tile') ctx.fillStyle = '#e5e7eb';
      else ctx.fillStyle = '#f1f5f9';
    }
    ctx.fill();

    // Floor Plank / Tile Texture Lines
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.12)';
    ctx.lineWidth = 1;
    const steps = 6;
    for (let i = 1; i < steps; i++) {
      const ly = ry + (rh / steps) * i;
      const lp1 = toIso(rx, ly, 0);
      const lp2 = toIso(rx + rw, ly, 0);
      ctx.beginPath();
      ctx.moveTo(lp1.x, lp1.y);
      ctx.lineTo(lp2.x, lp2.y);
      ctx.stroke();
    }

    // B. Back & Side Inner Walls (3D Extrusion)
    const w1Top = toIso(rx, ry, wallH);
    const w2Top = toIso(rx + rw, ry, wallH);
    const w3Top = toIso(rx + rw, ry + rh, wallH);
    const w4Top = toIso(rx, ry + rh, wallH);

    // Back Wall (North)
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(w2Top.x, w2Top.y);
    ctx.lineTo(w1Top.x, w1Top.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Left Wall (West)
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.lineTo(w4Top.x, w4Top.y);
    ctx.lineTo(w1Top.x, w1Top.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // C. 3D Interior Furniture Placement
    if (config.showFurniture) {
      draw3DFurniture(ctx, room, rx, ry, rw, rh, toIso);
    }

    // D. Front & Right Cutaway Walls (Half-height or Full with Window)
    const frontWallH = room.y + room.h >= 85 ? wallH * 0.45 : wallH;
    const fw3Top = toIso(rx + rw, ry + rh, frontWallH);
    const fw4Top = toIso(rx, ry + rh, frontWallH);

    // Right Wall (East)
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(w3Top.x, w3Top.y);
    ctx.lineTo(w2Top.x, w2Top.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Front Wall (South) with Panoramic Glass Window for 4Bay front rooms
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.moveTo(p4.x, p4.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(fw3Top.x, fw3Top.y);
    ctx.lineTo(fw4Top.x, fw4Top.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glass Window Pane on South-facing Bay
    if (room.y + room.h >= 85) {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(fw4Top.x, fw4Top.y);
      ctx.lineTo(fw3Top.x, fw3Top.y);
      ctx.lineTo(w3Top.x, w3Top.y);
      ctx.lineTo(w4Top.x, w4Top.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Top Wall Cap Highlights (Thick White Architectural Cutaway Top Edge)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(w1Top.x, w1Top.y);
    ctx.lineTo(w2Top.x, w2Top.y);
    ctx.lineTo(w3Top.x, w3Top.y);
    ctx.moveTo(w1Top.x, w1Top.y);
    ctx.lineTo(w4Top.x, w4Top.y);
    ctx.stroke();

    // E. Floating 3D Room Badge
    if (config.showLabels) {
      const centerIso = toIso(rx + rw / 2, ry + rh / 2, wallH * 0.65);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      const badgeW = 98;
      const badgeH = config.showDimensions && room.dimText ? 42 : 26;
      ctx.fillRect(centerIso.x - badgeW / 2, centerIso.y - badgeH / 2, badgeW, badgeH);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(centerIso.x - badgeW / 2, centerIso.y - badgeH / 2, badgeW, badgeH);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(room.name, centerIso.x, centerIso.y - (config.showDimensions && room.dimText ? 3 : -4));

      if (config.showDimensions && room.dimText) {
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 11px -apple-system, sans-serif';
        ctx.fillText(room.dimText, centerIso.x, centerIso.y + 13);
      }
    }
  });

  ctx.textAlign = 'left';
  return canvas.toDataURL('image/png');
}

/**
 * Helper to draw 3D Isometric Furniture Blocks inside rooms
 */
function draw3DFurniture(
  ctx: CanvasRenderingContext2D,
  room: RoomSpec,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  toIso: (x: number, y: number, z: number) => { x: number; y: number }
) {
  const drawBox = (bx: number, by: number, bw: number, bh: number, bz: number, topColor: string, sideColor: string) => {
    const b1 = toIso(bx, by, 0);
    const b2 = toIso(bx + bw, by, 0);
    const b3 = toIso(bx + bw, by + bh, 0);
    const b4 = toIso(bx, by + bh, 0);
    const t1 = toIso(bx, by, bz);
    const t2 = toIso(bx + bw, by, bz);
    const t3 = toIso(bx + bw, by + bh, bz);
    const t4 = toIso(bx, by + bh, bz);

    // Front-South face
    ctx.fillStyle = sideColor;
    ctx.beginPath();
    ctx.moveTo(b4.x, b4.y);
    ctx.lineTo(b3.x, b3.y);
    ctx.lineTo(t3.x, t3.y);
    ctx.lineTo(t4.x, t4.y);
    ctx.closePath();
    ctx.fill();

    // Right-East face
    ctx.beginPath();
    ctx.moveTo(b2.x, b2.y);
    ctx.lineTo(b3.x, b3.y);
    ctx.lineTo(t3.x, t3.y);
    ctx.lineTo(t2.x, t2.y);
    ctx.closePath();
    ctx.fill();

    // Top face
    ctx.fillStyle = topColor;
    ctx.beginPath();
    ctx.moveTo(t1.x, t1.y);
    ctx.lineTo(t2.x, t2.y);
    ctx.lineTo(t3.x, t3.y);
    ctx.lineTo(t4.x, t4.y);
    ctx.closePath();
    ctx.fill();
  };

  if (room.type === 'living') {
    // 3D L-shaped Sofa + Rug + Coffee Table
    drawBox(rx + rw * 0.15, ry + rh * 0.25, rw * 0.7, rh * 0.5, 2, '#e2e8f0', '#cbd5e1'); // Rug
    drawBox(rx + rw * 0.12, ry + rh * 0.22, rw * 0.22, rh * 0.45, 16, '#475569', '#334155'); // Sofa base
    drawBox(rx + rw * 0.48, ry + rh * 0.35, rw * 0.2, rh * 0.25, 10, '#f8fafc', '#cbd5e1'); // Coffee table
  } else if (room.type === 'master' || room.type === 'bedroom') {
    // 3D Bed + Pillows
    const bw = rw * 0.55;
    const bh = rh * 0.48;
    const bx = rx + (rw - bw) / 2;
    const by = ry + rh * 0.15;
    drawBox(bx, by, bw, bh, 14, '#f8fafc', '#94a3b8'); // Mattress
    drawBox(bx, by + bh * 0.4, bw, bh * 0.6, 15, '#3b82f6', '#1d4ed8'); // Duvet
    drawBox(bx + bw * 0.1, by + 4, bw * 0.35, bh * 0.22, 18, '#ffffff', '#e2e8f0'); // Pillow 1
    drawBox(bx + bw * 0.55, by + 4, bw * 0.35, bh * 0.22, 18, '#ffffff', '#e2e8f0'); // Pillow 2
  } else if (room.type === 'kitchen') {
    // Engineered Stone Kitchen Island + Dining Table
    drawBox(rx + rw * 0.1, ry + rh * 0.08, rw * 0.8, rh * 0.22, 22, '#f8fafc', '#cbd5e1'); // Main Counter
    drawBox(rx + rw * 0.25, ry + rh * 0.48, rw * 0.55, rh * 0.32, 20, '#ffffff', '#94a3b8'); // Island Table
  } else if (room.type === 'bath') {
    // Bathtub / Vanity
    drawBox(rx + rw * 0.1, ry + rh * 0.12, rw * 0.8, rh * 0.35, 16, '#e0f2fe', '#bae6fd');
  }
}
