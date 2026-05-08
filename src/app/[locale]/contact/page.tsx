'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Left Column: Content & Info */}
          <div>
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-wide">
              Connect
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent leading-none">
              {t('title')}
            </h1>
            <p className="text-xl text-slate-400 mb-16 leading-relaxed max-w-lg">
              {t('subtitle')}
            </p>

            <div className="space-y-12">
              <div className="group flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Email Us</div>
                  <div className="text-2xl font-medium">{t('info.email')}</div>
                </div>
              </div>

              <div className="group flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Call Us</div>
                  <div className="text-2xl font-medium">{t('info.phone')}</div>
                </div>
              </div>

              <div className="group flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Visit Us</div>
                  <div className="text-xl font-medium max-w-xs">{t('info.address')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem]">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">{t('form.name')}</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">{t('form.email')}</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">{t('form.message')}</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all resize-none"
                    placeholder="..."
                  />
                </div>

                <button className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 transform active:scale-[0.98] shadow-xl shadow-blue-500/10">
                  {t('form.submit')}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <footer className="py-20 text-center opacity-30">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
        <div className="text-xs uppercase tracking-[1em]">ORZU VISION</div>
      </footer>
    </div>
  );
}
