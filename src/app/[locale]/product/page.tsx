'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ProductListingPage() {
  const t = useTranslations('Product');

  const products = [
    { id: 'p1', color: 'blue' },
    { id: 'p2', color: 'purple' },
    { id: 'p3', color: 'emerald' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide">
            Our Collection
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group relative block p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-4"
            >
              <div className={`aspect-square rounded-3xl mb-8 bg-${product.color}-500/10 border border-${product.color}-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                <div className={`w-24 h-24 bg-${product.color}-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all`}></div>
                <div className="absolute text-8xl font-black opacity-5 select-none">{product.id.toUpperCase()}</div>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                {t(`items.${product.id}.name`)}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                {t(`items.${product.id}.desc`)}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-black text-white">{t(`items.${product.id}.price`)}</span>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              {/* Decorative line */}
              <div className={`absolute bottom-0 left-10 right-10 h-1 bg-gradient-to-r from-${product.color}-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}></div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="py-20 text-center opacity-30">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
        <div className="text-xs uppercase tracking-[1em]">ORZU VISION</div>
      </footer>
    </div>
  );
}
