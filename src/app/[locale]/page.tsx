'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Deep Space Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-block px-6 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-blue-400 text-sm font-bold tracking-[0.2em] uppercase animate-fade-in">
            Welcome to the Future
          </div>
          
          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-10 bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent animate-title">
            ORZU <br /> VISION
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-up">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in-up delay-300">
            <Link 
              href="/product" 
              className="px-12 py-5 bg-white text-black font-black rounded-full hover:bg-blue-600 hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]"
            >
              {t('hero.cta')}
            </Link>
            <Link 
              href="/about" 
              className="px-12 py-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full font-bold hover:bg-white/10 transition-all"
            >
              {t('hero.secondaryCta')}
            </Link>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
          <div className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll</div>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Featured Experience Section */}
      <section className="py-32 px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                {t('features.title')}
              </h2>
              <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-700">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.724 2.17a2 2 0 00.51 2.22l1.69 1.69a2 2 0 002.828 0l2.387-2.387a2 2 0 000-2.828l-1.316-1.316z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t(`features.item${i}.title`)}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {t(`features.item${i}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Visual Statement */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative rounded-[4rem] p-12 md:p-32 border border-white/10 bg-slate-900/50 backdrop-blur-3xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-12 group-hover:scale-105 transition-transform duration-1000">
              Where <span className="text-blue-500 italic">Dreams</span> Meet <span className="text-purple-500 uppercase">Reality</span>.
            </h2>
            <div className="flex justify-center">
              <Link 
                href="/contact" 
                className="group inline-flex items-center gap-4 text-xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                Start a Project
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-400 group-hover:translate-x-2 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-32 text-center border-t border-white/5">
        <div className="text-6xl md:text-9xl font-black opacity-5 mb-12 select-none tracking-tighter">ORZU</div>
        <div className="flex justify-center gap-10 text-slate-500 font-bold uppercase tracking-widest text-xs">
          <Link href="/product" className="hover:text-white transition-colors">Products</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes title {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1.5s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-title { animation: title 2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}