'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide">
            Our Story
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tight mb-8 bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { key: 'projects', labelKey: 'projectsLabel' },
            { key: 'clients', labelKey: 'clientsLabel' },
            { key: 'awards', labelKey: 'awardsLabel' }
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-5xl md:text-7xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-500">
                {t(`stats.${stat.key}`)}
              </div>
              <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">
                {t(`stats.${stat.labelKey}`)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { key: 'innovation', color: 'blue' },
              { key: 'quality', color: 'purple' },
              { key: 'integrity', color: 'emerald' }
            ].map((value, i) => (
              <div key={i} className="relative group p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-${value.color}-500/20 flex items-center justify-center mb-8 border border-${value.color}-500/30 group-hover:scale-110 transition-transform`}>
                  <svg className={`w-7 h-7 text-${value.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t(`values.${value.key}`)}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {t(`values.${value.key}Desc`)}
                </p>
                <div className={`absolute bottom-0 left-10 right-10 h-1 bg-gradient-to-r from-${value.color}-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Experience Section */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[4rem] p-12 md:p-24 overflow-hidden border border-white/10 group">
            <div className="absolute inset-0 bg-[#0f172a] group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.15),transparent_50%)]"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  We believe in <span className="text-blue-500">simplicity</span> through <span className="text-purple-500">complex</span> engineering.
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed mb-10">
                  {t('description')}
                </p>
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 transform active:scale-95">
                  Work With Us
                </button>
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                <div className="text-[12rem] font-black opacity-5 select-none animate-spin-slow">O</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
                  <div className="w-16 h-1 w-1 bg-white rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Visual */}
      <footer className="py-20 text-center opacity-30">
        <div className="text-xs uppercase tracking-[1em] mb-4">Established 2026</div>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
      </footer>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
