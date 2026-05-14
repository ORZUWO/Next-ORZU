"use client"

import { Link, useRouter, usePathname } from "@/src/i18n/navigation"
import { useEffect, useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const auth = localStorage.getItem("auth")
    if (!auth) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("auth")
    router.push("/login")
  }

  if (!isMounted) return null

  const pageTitle = pathname.split("/").pop() || "Dashboard"

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/clients", label: "Clients", icon: "👥" },
    { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      <aside className="hidden lg:flex w-64 bg-[#0f172a] text-slate-400 flex-col fixed h-full shadow-2xl z-40">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-black text-xl">O</span>
            </div>
            <span className="text-xl font-black text-white tracking-tight">ORZU CRM</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href))
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 text-left"
            >
              <span className="text-lg">🚪</span>
              Logout
            </button>
          </div>
        </nav>

        <div className="p-6 m-4 rounded-[24px] bg-white/5 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-black shadow-lg">
              AD
            </div>
            <div>
              <p className="text-xs font-black text-white">Admin User</p>
              <p className="text-[10px] text-slate-500 font-bold">Premium Account</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f172a] border-b border-white/5 px-6 h-16 flex items-center justify-between shadow-lg">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <span className="text-white font-black text-sm">O</span>
          </div>
          <span className="text-lg font-black text-white tracking-tight">ORZU CRM</span>
        </Link>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-white active:scale-95 transition-all"
        >
          <span className="text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-16 left-0 right-0 bg-[#0f172a] p-6 border-b border-white/5 animate-slide-down">
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold transition-all ${
                    pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href))
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold text-red-500 hover:bg-red-500/10 transition-all text-left"
                >
                  <span className="text-xl">🚪</span>
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:ml-64 pt-16 lg:pt-0">
        <header className="hidden lg:flex h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
            <div>
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Pages</h2>
              <p className="text-lg font-black text-slate-800 capitalize leading-none mt-0.5">{pageTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400">
              <span className="text-sm font-bold">Search...</span>
              <span className="text-xs bg-white px-1.5 py-0.5 rounded border border-slate-200 font-black">⌘K</span>
            </div>
            
            <div className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer relative">
              <span className="text-xl">🔔</span>
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>

            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"></div>
          </div>
        </header>

        <div className="lg:hidden px-6 pt-8">
           <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-blue-600 rounded-full"></div>
              <h1 className="text-2xl font-black text-slate-800 capitalize tracking-tight">{pageTitle}</h1>
           </div>
        </div>

        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
