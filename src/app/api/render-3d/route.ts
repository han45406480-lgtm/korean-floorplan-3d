import { NextRequest, NextResponse } from 'next/server';

/**
 * Cloud AI 3D Floorplan Rendering Route (Supports Fal.ai / Replicate ControlNet + FLUX/SDXL)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, prompt, negativePrompt, apiKey, provider = 'fal' } = body;

    const effectiveKey = apiKey || process.env.FAL_KEY || process.env.REPLICATE_API_TOKEN;

    if (!effectiveKey) {
      return NextResponse.json(
        {
          mode: 'local_engine',
          message: 'API 키가 설정되지 않아 내장 3D 아이소메트릭 엔진으로 렌더링합니다.'
        },
        { status: 200 }
      );
    }

    if (provider === 'fal') {
      const response = await fetch('https://fal.run/fal-ai/flux-general/image-to-image', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${effectiveKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_url: imageBase64,
          prompt,
          negative_prompt: negativePrompt,
          strength: 0.72,
          num_inference_steps: 28,
          guidance_scale: 3.5
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        return NextResponse.json({ error: `Fal API Error: ${errText}` }, { status: response.status });
      }

      const result = await response.json();
      const outputUrl = result?.images?.[0]?.url || null;
      return NextResponse.json({ mode: 'cloud_ai', imageUrl: outputUrl });
    }

    return NextResponse.json({ mode: 'local_engine' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Render failed' }, { status: 500 });
  }
}
