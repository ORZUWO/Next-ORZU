'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const t = useTranslations('Product');
  const params = useParams();
  const id = params.id as string;

  // Simple validation for product existence in translations
  const isValidProduct = ['p1', 'p2', 'p3'].includes(id);

  if (!isValidProduct) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Product Not Found</h1>
          <Link href="/product" className="text-blue-400 hover:underline">Return to collection</Link>
        </div>
      </div>
    );
  }

  const colors: Record<string, string> = {
    p1: 'blue',
    p2: 'purple',
    p3: 'emerald'
  };

  const color = colors[id];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[60%] h-[60%] bg-${color}-600/10 rounded-full blur-[150px] animate-pulse`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 relative z-10">
        <Link 
          href="/product" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-bold uppercase tracking-widest text-sm">{t('back')}</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Product Image Placeholder */}
          <div className="relative aspect-square rounded-[3rem] bg-white/[0.02] border border-white/10 flex items-center justify-center overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/10 to-transparent opacity-50`}></div>
            <div className={`w-64 h-64 bg-${color}-500/20 rounded-full blur-[100px] group-hover:blur-[120px] transition-all duration-700`}></div>
            <div className="relative text-[15rem] font-black opacity-10 select-none group-hover:scale-110 transition-transform duration-1000">
              {id.toUpperCase()}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div>
              <div className={`inline-block px-4 py-1.5 mb-6 rounded-full bg-${color}-500/10 border border-${color}-500/20 text-${color}-400 text-sm font-medium tracking-wide uppercase`}>
                Premium Edition
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-none">
                {t(`items.${id}.name`)}
              </h1>
              <p className="text-3xl font-black text-white/90 mb-8">{t(`items.${id}.price`)}</p>
              <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                {t(`items.${id}.desc`)}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className={`w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center`}>
                  <svg className={`w-5 h-5 text-${color}-400`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-300 font-medium">Enterprise Grade Security</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className={`w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center`}>
                  <svg className={`w-5 h-5 text-${color}-400`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-300 font-medium">Optimized Performance</span>
              </div>
            </div>

            <button className={`w-full md:w-auto px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-${color}-500 hover:text-white transition-all duration-300 transform active:scale-95 shadow-2xl shadow-${color}-500/20`}>
              {t('buy')}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Accent */}
      <div className="py-24 overflow-hidden opacity-20 select-none pointer-events-none">
        <div className="text-[20vw] font-black tracking-tighter whitespace-nowrap animate-scroll">
          {t(`items.${id}.name`)} • {t(`items.${id}.name`)} • {t(`items.${id}.name`)}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
