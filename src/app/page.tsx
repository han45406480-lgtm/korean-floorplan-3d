'use client';

import React, { useState, useEffect, useRef } from 'react';
import { KOREAN_STANDARD_TEMPLATES } from '@/lib/floorplan-templates';
import { generate3dPrompt } from '@/lib/prompt-engine';
import { render2DBlueprintToDataURL, render3DIsometricToDataURL } from '@/lib/isometric-3d-renderer';
import { exportToCanvas } from '@/lib/canvas-exporter';
import { 
  FloorplanTemplate, 
  SnsRatio, 
  FlooringType, 
  LightingTone, 
  CameraAngle,
  RenderConfig
} from '@/types/floorplan';
import { 
  Box, 
  Sparkles, 
  Download, 
  Check, 
  Layers, 
  SlidersHorizontal,
  Upload,
  Eye,
  Columns,
  RotateCcw,
  KeyRound
} from 'lucide-react';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<FloorplanTemplate>(KOREAN_STANDARD_TEMPLATES[0]);
  const [custom2DImage, setCustom2DImage] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string | null>(null);

  const [blueprint2DUrl, setBlueprint2DUrl] = useState<string>('');
  const [render3DUrl, setRender3DUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'3d_only' | 'split_compare'>('split_compare');
  const [splitPos, setSplitPos] = useState<number>(50);
  const [downloadingRatio, setDownloadingRatio] = useState<string | null>(null);

  // Project Title for Export Header
  const [projectName, setProjectName] = useState<string>('백석시그니처자이');
  const [falApiKey, setFalApiKey] = useState<string>('');
  const [showApiModal, setShowApiModal] = useState<boolean>(false);

  // 3D Render Parameters
  const [renderConfig, setRenderConfig] = useState<RenderConfig>({
    flooring: 'oak_wood',
    lighting: 'warm_daylight',
    cameraAngle: 'iso_45',
    wallHeight: 38,
    showLabels: true,
    showDimensions: true,
    showFurniture: true
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Automatically render 2D and 3D views when template or config changes
  useEffect(() => {
    let active = true;
    const updateRenders = async () => {
      setIsGenerating(true);
      const twoD = custom2DImage || render2DBlueprintToDataURL(selectedTemplate);
      if (active) setBlueprint2DUrl(twoD);

      const threeD = await render3DIsometricToDataURL(
        selectedTemplate,
        renderConfig,
        custom2DImage
      );
      if (active) {
        setRender3DUrl(threeD);
        setIsGenerating(false);
      }
    };
    updateRenders();
    return () => {
      active = false;
    };
  }, [selectedTemplate, renderConfig, custom2DImage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCustomFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCustom2DImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCloudAiRender = async () => {
    setIsGenerating(true);
    try {
      const promptData = generate3dPrompt(selectedTemplate, {
        interiorStyle: 'modern_luxury',
        flooringMaterial: renderConfig.flooring === 'oak_wood' ? 'oak_wood' : 'porcelain_tile'
      });

      if (falApiKey.trim()) {
        const res = await fetch('/api/render-3d', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: blueprint2DUrl,
            prompt: promptData.prompt,
            negativePrompt: promptData.negativePrompt,
            apiKey: falApiKey.trim(),
            provider: 'fal'
          })
        });
        const data = await res.json();
        if (data.imageUrl) {
          setRender3DUrl(data.imageUrl);
          setIsGenerating(false);
          return;
        }
      }

      // Fallback or instant local 3D engine refresh
      const threeD = await render3DIsometricToDataURL(
        selectedTemplate,
        renderConfig,
        custom2DImage
      );
      setRender3DUrl(threeD);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadRatio = async (ratio: SnsRatio, label: string) => {
    if (!render3DUrl) return;
    setDownloadingRatio(ratio);
    try {
      const dataUrl = await exportToCanvas(render3DUrl, {
        ratio,
        projectName,
        unitType: customFileName ? customFileName.replace(/\.[^/.]+$/, '') : selectedTemplate.name,
        watermarkText: '※ 본 이미지는 평면 이해를 돕기 위한 AI/3D 연출 이미지로 실제 시공 시 차이가 있을 수 있습니다.'
      });
      const link = document.createElement('a');
      link.download = `${projectName}_${selectedTemplate.id}_3D평면_${label}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingRatio(null);
    }
  };

  const handleDownloadRaw3D = () => {
    if (!render3DUrl) return;
    const link = document.createElement('a');
    link.download = `${projectName}_${selectedTemplate.id}_3D원본.png`;
    link.href = render3DUrl;
    link.click();
  };

  const activePrompt = generate3dPrompt(selectedTemplate, {
    interiorStyle: 'modern_luxury',
    flooringMaterial: renderConfig.flooring === 'oak_wood' ? 'oak_wood' : 'porcelain_tile'
  });

  return (
    <main className="min-h-screen pb-16 bg-slate-950 text-slate-100">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/15 border border-emerald-500/40 p-2.5 rounded-xl text-emerald-400">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-bold text-lg text-white tracking-tight">한국 평면도 3D 이미지 생성기</h1>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                3D Isometric Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              분양 평면도 업로드 → 3D 입체 조감 이미지 변환 → 원본 비교 및 SNS 규격별 다운로드
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowApiModal(!showApiModal)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cloud AI 키 설정 {falApiKey ? '(연결됨)' : '(선택)'}</span>
          </button>
          <a
            href="https://github.com/han45406480-lgtm/korean-floorplan-3d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl border border-slate-700 transition"
          >
            GitHub 저장소
          </a>
        </div>
      </header>

      {/* Optional Cloud API Key Drawer */}
      {showApiModal && (
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              <strong className="text-emerald-400">Fal.ai ControlNet + FLUX API 키 (선택사항):</strong> 키를 입력하면 클라우드 GPU로 실사 렌더링을 수행하며, 미입력 시 내장 실시간 3D 아이소메트릭 엔진이 즉시 작동합니다.
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="password"
                placeholder="fal_key_..."
                value={falApiKey}
                onChange={(e) => setFalApiKey(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white w-full sm:w-64"
              />
              <button
                onClick={() => setShowApiModal(false)}
                className="bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg"
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Studio Workspace */}
      <div className="max-w-7xl mx-auto px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Control Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Step 1: 2D Floorplan Upload or Standard Template */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>1. 분양 평면도 업로드 / 표준 선택</span>
              </span>
              {custom2DImage && (
                <button
                  onClick={() => {
                    setCustom2DImage(null);
                    setCustomFileName(null);
                  }}
                  className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> 초기화
                </button>
              )}
            </div>

            {/* Custom 2D Image Upload Box */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3.5 px-4 mb-4 border-2 border-dashed border-slate-700 hover:border-emerald-500/70 bg-slate-950/60 rounded-xl flex flex-col items-center justify-center gap-1.5 transition group"
            >
              <Upload className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition" />
              <span className="text-xs font-semibold text-slate-200">
                {customFileName ? `업로드됨: ${customFileName}` : '내 컴퓨터에서 2D 평면도 이미지 업로드'}
              </span>
              <span className="text-[11px] text-slate-500">PNG, JPG, WEBP 분양 도면 지원</span>
            </button>

            {/* Project Name Input */}
            <div className="mb-4">
              <label className="text-xs text-slate-400 block mb-1">현장 단지명 (이미지 상단 표기)</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Korean Standard 5 Templates */}
            <label className="text-xs text-slate-400 block mb-2">한국 아파트 표준 평면 프리셋 (5대 규격)</label>
            <div className="grid grid-cols-2 gap-2">
              {KOREAN_STANDARD_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setCustom2DImage(null);
                    setCustomFileName(null);
                    setSelectedTemplate(tmpl);
                  }}
                  className={`text-left p-2.5 rounded-xl border transition ${
                    !custom2DImage && selectedTemplate.id === tmpl.id
                      ? 'bg-emerald-950/50 border-emerald-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{tmpl.id}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {tmpl.pyung}평
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{tmpl.bayStructure}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: 3D Isometric Camera & Finishes Controls */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>2. 3D 조감 각도 및 마감재 설정</span>
            </div>

            {/* Camera Angle */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">카메라 앵글 (조감 시점)</label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'iso_45', label: '45° 표준 조감' },
                  { id: 'top_60', label: '60° 수직 탑뷰' },
                  { id: 'front_30', label: '30° 입체 투시' }
                ].map((cam) => (
                  <button
                    key={cam.id}
                    onClick={() => setRenderConfig({ ...renderConfig, cameraAngle: cam.id as CameraAngle })}
                    className={`py-2 px-2 rounded-lg border text-center transition ${
                      renderConfig.cameraAngle === cam.id
                        ? 'border-emerald-500 bg-emerald-500/15 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    {cam.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wall Extrusion Height */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">3D 벽체 입체 높이</span>
                <span className="text-emerald-400 font-semibold">{renderConfig.wallHeight}px</span>
              </div>
              <input
                type="range"
                min={18}
                max={64}
                value={renderConfig.wallHeight}
                onChange={(e) => setRenderConfig({ ...renderConfig, wallHeight: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Flooring Material */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">바닥 마감재 (강마루 / 포셀린 타일)</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'oak_wood', label: '내추럴 오크 강마루' },
                  { id: 'porcelain_tile', label: '이탈리아 포셀린타일' },
                  { id: 'herringbone', label: '헤링본 원목마루' },
                  { id: 'marble', label: '비앙코 화이트 마블' }
                ].map((fl) => (
                  <button
                    key={fl.id}
                    onClick={() => setRenderConfig({ ...renderConfig, flooring: fl.id as FlooringType })}
                    className={`p-2 rounded-lg border text-left transition ${
                      renderConfig.flooring === fl.id
                        ? 'border-emerald-500 bg-emerald-500/15 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    {fl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Tone */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">조명 분위기</label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'warm_daylight', label: '따뜻한 채광' },
                  { id: 'hotel_lounge', label: '호텔 라운지' },
                  { id: 'bright_studio', label: '화이트 배경제거' }
                ].map((lt) => (
                  <button
                    key={lt.id}
                    onClick={() => setRenderConfig({ ...renderConfig, lighting: lt.id as LightingTone })}
                    className={`py-2 px-2 rounded-lg border text-center transition ${
                      renderConfig.lighting === lt.id
                        ? 'border-emerald-500 bg-emerald-500/15 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    {lt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Toggles */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={renderConfig.showFurniture}
                  onChange={(e) => setRenderConfig({ ...renderConfig, showFurniture: e.target.checked })}
                  className="accent-emerald-500"
                />
                <span>3D 가구배치</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={renderConfig.showLabels}
                  onChange={(e) => setRenderConfig({ ...renderConfig, showLabels: e.target.checked })}
                  className="accent-emerald-500"
                />
                <span>방 이름표</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={renderConfig.showDimensions}
                  onChange={(e) => setRenderConfig({ ...renderConfig, showDimensions: e.target.checked })}
                  className="accent-emerald-500"
                />
                <span>치수 표기</span>
              </label>
            </div>
          </div>

          {/* Step 3: Re-render Action Button */}
          <button
            onClick={handleCloudAiRender}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm transition"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isGenerating ? '3D 입체 평면도 렌더링 중...' : '3D 조감 이미지 생성 / 새로고침'}</span>
          </button>
        </div>

        {/* Right Preview & Download Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Viewer Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-white font-bold text-base flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>원본 2D 평면도 vs 3D 입체 조감도 확인</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  슬라이더를 좌우로 움직여 방 개수, 창문, 발코니 위치가 원본과 일치하는지 비교하세요
                </p>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setViewMode('split_compare')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                    viewMode === 'split_compare'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>2D/3D 비교 슬라이더</span>
                </button>
                <button
                  onClick={() => setViewMode('3d_only')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                    viewMode === '3d_only'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D 완성본 단독 보기</span>
                </button>
              </div>
            </div>

            {/* Interactive Canvas Viewport */}
            <div className="relative aspect-square max-h-[580px] w-full mx-auto bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 select-none">
              {viewMode === '3d_only' ? (
                render3DUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={render3DUrl}
                    alt="3D Isometric Floorplan"
                    className="w-full h-full object-contain"
                  />
                )
              ) : (
                <div className="relative w-full h-full">
                  {/* Underlying 3D Render (Right side / Full) */}
                  {render3DUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={render3DUrl}
                      alt="3D Floorplan"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  )}

                  {/* Clipped 2D Original Blueprint (Left side) */}
                  {blueprint2DUrl && (
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blueprint2DUrl}
                        alt="2D Original Floorplan"
                        className="w-full h-full object-contain bg-slate-900"
                      />
                    </div>
                  )}

                  {/* Vertical Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)] pointer-events-none"
                    style={{ left: `${splitPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shadow-lg text-xs">
                      ⇄
                    </div>
                  </div>

                  {/* Badges */}
                  <span className="absolute top-4 left-4 bg-slate-900/90 text-slate-200 text-xs font-semibold px-3 py-1 rounded-full border border-slate-700">
                    원본 2D 평면도
                  </span>
                  <span className="absolute top-4 right-4 bg-emerald-500/90 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">
                    AI 3D 입체 조감도
                  </span>

                  {/* Invisible Range Slider for Smooth Dragging */}
                  <input
                    type="range"
                    min={5}
                    max={95}
                    value={splitPos}
                    onChange={(e) => setSplitPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                  />
                </div>
              )}
            </div>

            {/* Step 4: SNS Ratio Selection & Download */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>3. 용도별 비율 선택 후 다운로드 (여백 자동 배치 · 잘림 방지)</span>
                </span>
                <button
                  onClick={handleDownloadRaw3D}
                  className="text-xs text-emerald-400 hover:underline font-medium"
                >
                  원본 3D PNG 바로 저장 →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handleDownloadRatio('instagram-feed', '인스타피드_4x5')}
                  disabled={downloadingRatio !== null}
                  className="p-3.5 bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/60 rounded-xl text-left transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400">인스타그램 피드</span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded font-semibold">4:5</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">1080 × 1350 세로형</div>
                </button>

                <button
                  onClick={() => handleDownloadRatio('instagram-story', '인스타스토리_9x16')}
                  disabled={downloadingRatio !== null}
                  className="p-3.5 bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/60 rounded-xl text-left transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400">인스타그램 스토리</span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded font-semibold">9:16</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">1080 × 1920 전체화면</div>
                </button>

                <button
                  onClick={() => handleDownloadRatio('naver-blog', '네이버블로그_3x2')}
                  disabled={downloadingRatio !== null}
                  className="p-3.5 bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/60 rounded-xl text-left transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400">네이버 블로그</span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded font-semibold">3:2</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">1200 × 800 가로형</div>
                </button>

                <button
                  onClick={() => handleDownloadRatio('square', '정사각형_1x1')}
                  disabled={downloadingRatio !== null}
                  className="p-3.5 bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/60 rounded-xl text-left transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400">블로그 / 피드 겸용</span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded font-semibold">1:1</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">1080 × 1080 정사각형</div>
                </button>
              </div>
            </div>

            {/* ControlNet Prompt Inspector */}
            <div className="mt-4 p-3.5 bg-slate-950/90 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-emerald-400">ControlNet + FLUX 3D 렌더링 프롬프트 (자동 생성):</strong>
                <span>Preprocessor: {activePrompt.controlNetPreprocessor}</span>
              </div>
              <p className="font-mono text-slate-300 break-all leading-relaxed">{activePrompt.prompt}</p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
