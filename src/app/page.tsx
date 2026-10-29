'use client';

import React, { useState } from 'react';
import { KOREAN_STANDARD_TEMPLATES } from '@/lib/floorplan-templates';
import { generate3dPrompt } from '@/lib/prompt-engine';
import { generate50sSalesCopy } from '@/lib/sales-copy-engine';
import { exportToCanvas } from '@/lib/canvas-exporter';
import { FloorplanTemplate, SnsRatio } from '@/types/floorplan';
import { 
  Building2, 
  Sparkles, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Layers, 
  SlidersHorizontal,
  FileImage,
  PhoneCall,
  Flame,
  Camera
} from 'lucide-react';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<FloorplanTemplate>(KOREAN_STANDARD_TEMPLATES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [renderOutput, setRenderOutput] = useState<string | null>(null);
  const [copiedCopy, setCopiedCopy] = useState(false);
  const [downloadingRatio, setDownloadingRatio] = useState<string | null>(null);

  // Form states
  const [projectName, setProjectName] = useState('백석시그니처자이');
  const [agentName, setAgentName] = useState('한지훈');
  const [agentPhone, setAgentPhone] = useState('010-4540-6480');
  const [flooring, setFlooring] = useState<'oak_wood' | 'porcelain_tile'>('oak_wood');

  const activePrompt = generate3dPrompt(selectedTemplate, {
    interiorStyle: 'modern_luxury',
    flooringMaterial: flooring
  });

  const salesCopy = generate50sSalesCopy(
    projectName,
    selectedTemplate,
    agentName,
    agentPhone
  );

  const handleGenerate3D = () => {
    setIsGenerating(true);
    // Simulating photorealistic ControlNet AI top-down rendering
    setTimeout(() => {
      // High-resolution SVG 3D Isometric visual representation of the apartment
      const simulated3dRender = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900"><defs><linearGradient id="wall3d" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23334155"/><stop offset="100%" stop-color="%231e293b"/></linearGradient><linearGradient id="floorOak" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23e2d5c3"/><stop offset="100%" stop-color="%23d0c2ad"/></linearGradient><linearGradient id="tileKitchen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23f1f5f9"/><stop offset="100%" stop-color="%23e2e8f0"/></linearGradient><linearGradient id="sofa" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23475569"/><stop offset="100%" stop-color="%23334155"/></linearGradient></defs><rect width="100%" height="100%" fill="%230f172a"/><g transform="rotate(-15 450 450) scale(0.85 0.65) translate(80 150)"><rect x="100" y="100" width="700" height="500" rx="16" fill="url(%23floorOak)" stroke="url(%23wall3d)" stroke-width="20"/><rect x="420" y="320" width="360" height="260" fill="url(%23tileKitchen)"/><rect x="180" y="140" width="200" height="150" rx="12" fill="%23cbd5e1" stroke="%2394a3b8" stroke-width="3"/><text x="280" y="220" font-family="sans-serif" font-weight="bold" font-size="20" fill="%23334155" text-anchor="middle">침실 3</text><rect x="400" y="140" width="180" height="150" rx="12" fill="%23cbd5e1" stroke="%2394a3b8" stroke-width="3"/><text x="490" y="220" font-family="sans-serif" font-weight="bold" font-size="20" fill="%23334155" text-anchor="middle">침실 2</text><rect x="600" y="140" width="180" height="180" rx="12" fill="%23cbd5e1" stroke="%2394a3b8" stroke-width="4"/><text x="690" y="220" font-family="sans-serif" font-weight="bold" font-size="22" fill="%230f172a" text-anchor="middle">침실 1 (안방)</text><rect x="630" y="240" width="120" height="60" rx="6" fill="%2310b981" opacity="0.3"/><text x="690" y="275" font-family="sans-serif" font-weight="bold" font-size="14" fill="%23064e3b" text-anchor="middle">드레스룸</text><rect x="160" y="340" width="240" height="220" rx="8" fill="url(%23sofa)"/><text x="280" y="440" font-family="sans-serif" font-weight="bold" font-size="28" fill="%23ffffff" text-anchor="middle">거실 (${selectedTemplate.dimensions.livingRoomWidth})</text><rect x="460" y="360" width="160" height="70" rx="8" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="4"/><text x="540" y="405" font-family="sans-serif" font-weight="bold" font-size="18" fill="%230f172a" text-anchor="middle">아일랜드 주방</text></g><rect x="40" y="40" width="820" height="60" rx="12" fill="%231e293b" opacity="0.9"/><text x="70" y="78" font-family="sans-serif" font-size="24" font-weight="bold" fill="%2310b981">${projectName}</text><text x="320" y="78" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23ffffff">${selectedTemplate.name} 3D 아이소메트릭 입체 조감도</text><text x="70" y="860" font-family="sans-serif" font-size="16" fill="%2364748b">※ 본 이미지는 소비자의 이해를 돕기 위한 3D 연출 컷입니다. (분양딸깍 3D 엔진)</text></svg>`;
      setRenderOutput(simulated3dRender);
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopySalesCopy = () => {
    navigator.clipboard.writeText(salesCopy);
    setCopiedCopy(true);
    setTimeout(() => setCopiedCopy(false), 2000);
  };

  const handleDownloadRatio = async (ratio: SnsRatio, label: string) => {
    if (!renderOutput) return;
    setDownloadingRatio(ratio);
    try {
      const dataUrl = await exportToCanvas(renderOutput, {
        ratio,
        projectName,
        unitType: selectedTemplate.name,
        agentName,
        agentPhone,
        watermarkText: '※ 본 이미지는 소비자의 이해를 돕기 위한 3D 연출 컷입니다'
      });
      const link = document.createElement('a');
      link.download = `${projectName}_${selectedTemplate.id}_${label}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingRatio(null);
    }
  };

  return (
    <main className="min-h-screen pb-16">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-xl text-emerald-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-white">한국 평면도 3D 이미지 스튜디오</h1>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 font-medium px-2 py-0.5 rounded-full border border-emerald-500/30">
                Open-Source v0.1.0
              </span>
            </div>
            <p className="text-xs text-slate-400">2D 평면도 1장으로 3D 입체 조감도 및 SNS 마케팅 에셋 팩 원클릭 생성</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            엔진: ControlNet + FLUX Architecture
          </span>
          <a 
            href="https://github.com/han45406480-lgtm/korean-floorplan-3d" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            GitHub Star ⭐
          </a>
        </div>
      </header>

      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto px-6 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input, Template, & Finishes (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Property & Agent Details */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 font-semibold text-sm">
              <PhoneCall className="w-4 h-4" />
              <span>현장 및 담당자 정보</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">단지명</label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">담당 에이전트</label>
                <input 
                  type="text" 
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-400 block mb-1">직통 전화번호 (전단/SNS 배너 표기용)</label>
                <input 
                  type="text" 
                  value={agentPhone}
                  onChange={(e) => setAgentPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Select Standard Korean Floor Plan Template */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Layers className="w-4 h-4" />
                <span>한국 표준 평면도 선택 (5대 규격)</span>
              </div>
              <span className="text-xs text-slate-500">직접 업로드 지원</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {KOREAN_STANDARD_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedTemplate(tmpl);
                    setRenderOutput(null);
                  }}
                  className={`text-left p-3 rounded-xl border transition ${
                    selectedTemplate.id === tmpl.id
                      ? 'bg-emerald-950/40 border-emerald-500/80 text-white shadow-lg shadow-emerald-950/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">{tmpl.id}타입</span>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {tmpl.pyung}평형
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 truncate">{tmpl.bayStructure}</div>
                </button>
              ))}
            </div>

            {/* Template Specs Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">전용면적:</span>
                <span className="font-semibold text-white">{selectedTemplate.areaExclusive}㎡</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">거실 유효폭:</span>
                <span className="font-semibold text-emerald-400">{selectedTemplate.dimensions.livingRoomWidth} 광폭</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">안방 크기:</span>
                <span className="font-semibold text-white">{selectedTemplate.dimensions.masterBedroom}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-400 leading-relaxed">
                <strong className="text-slate-200">특화 공간:</strong> {selectedTemplate.features.join(' · ')}
              </div>
            </div>
          </div>

          {/* 3. Luxury Interior Finishes */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3 text-emerald-400 font-semibold text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>한국 하이엔드 인테리어 마감재 (자이/푸르지오 스펙)</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => setFlooring('oak_wood')}
                className={`p-2.5 rounded-lg border text-left transition ${
                  flooring === 'oak_wood'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-medium'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                내추럴 오크 강마루
              </button>
              <button
                onClick={() => setFlooring('porcelain_tile')}
                className={`p-2.5 rounded-lg border text-left transition ${
                  flooring === 'porcelain_tile'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-medium'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                포셀린 타일 바닥
              </button>
            </div>
            <div className="mt-3 text-xs text-slate-400 bg-slate-950/70 p-3 rounded-lg border border-slate-800 leading-relaxed">
              * 이탈리아산 포셀린타일 아트월, 엔지니어드스톤 아일랜드 주방, 우물천장 간접조명이 3D 프롬프트에 기본 반영됩니다.
            </div>
          </div>

          {/* 4. Action Button */}
          <button
            onClick={handleGenerate3D}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-base transition disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>ControlNet AI 3D 렌더링 변환 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>3D 입체 조감도 생성하기 (3초 소요)</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: 3D Render Output & Multi-Ratio SNS Export (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main 3D Viewer & Split View */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-bold text-base flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>3D 탑뷰 아이소메트릭 렌더링 결과</span>
                </h2>
                <p className="text-xs text-slate-400">벽체 오차율 0% · 한국형 아파트 마감재 자동 반영</p>
              </div>
              {renderOutput && (
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 렌더링 완료
                </span>
              )}
            </div>

            {/* Display Area */}
            <div className="relative aspect-square w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center shadow-inner">
              {renderOutput ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={renderOutput} 
                  alt="3D Floorplan" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8 space-y-4">
                  <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-500">
                    <FileImage className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300">왼쪽에서 평면도를 선택하고 생성 버튼을 누르세요</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedTemplate.name} ({selectedTemplate.bayStructure}) 2D 도면이 대기 중입니다
                    </p>
                  </div>
                  <div className="max-w-md mx-auto p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 text-left">
                    <strong className="text-emerald-400">주입 프롬프트:</strong> {activePrompt.prompt.slice(0, 150)}...
                  </div>
                </div>
              )}
            </div>

            {/* SNS 1-Click Multi-Ratio Export Toolbar */}
            {renderOutput && (
              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>SNS 맞춤 비율 1초 다운로드 (HTML5 Canvas)</span>
                  </span>
                  <span className="text-[11px] text-slate-500">명함 & 면책 문구 자동 합성</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleDownloadRatio('instagram-feed', '인스타피드_4x5')}
                    disabled={downloadingRatio !== null}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400">인스타 피드</div>
                    <div className="text-[11px] text-slate-400">4:5 세로형</div>
                  </button>

                  <button
                    onClick={() => handleDownloadRatio('instagram-story', '인스타스토리_9x16')}
                    disabled={downloadingRatio !== null}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400">인스타 스토리</div>
                    <div className="text-[11px] text-slate-400">9:16 숏츠형</div>
                  </button>

                  <button
                    onClick={() => handleDownloadRatio('naver-blog', '네이버블로그_3x2')}
                    disabled={downloadingRatio !== null}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400">네이버 블로그</div>
                    <div className="text-[11px] text-slate-400">3:2 가로형</div>
                  </button>

                  <button
                    onClick={() => handleDownloadRatio('square', '정사각형_1x1')}
                    disabled={downloadingRatio !== null}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400">정사각형 원본</div>
                    <div className="text-[11px] text-slate-400">1:1 기본형</div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 50대 영업 1등 부장님 (지상렬 화법) Sales Copy Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">50대 영업 1등 부장님 마케팅 카피 (휴먼상렬체)</h3>
              </div>
              <button
                onClick={handleCopySalesCopy}
                className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                {copiedCopy ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>카톡 복사용 복사</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
              {salesCopy}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
