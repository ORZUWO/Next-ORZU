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

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      <aside className="w-64 bg-[#0f172a] text-slate-400 flex flex-col fixed h-full shadow-2xl">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-black text-xl">O</span>
            </div>
            <span className="text-xl font-black text-white tracking-tight">ORZU CRM</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
              pathname === "/dashboard"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="text-lg">📊</span>
            Dashboard
          </Link>

          <Link
            href="/dashboard/clients"
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
              pathname.startsWith("/dashboard/clients")
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="text-lg">👥</span>
            Clients
          </Link>

          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
              pathname.startsWith("/dashboard/settings")
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="text-lg">⚙️</span>
            Settings
          </Link>

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

      <div className="flex-1 flex flex-col ml-64">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-30">
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

        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
