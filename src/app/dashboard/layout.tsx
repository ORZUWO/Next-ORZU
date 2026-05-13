"use client"

import { Link, useRouter } from "@/src/i18n/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("auth")
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-[220px] bg-slate-900 p-5 text-white">
        <h1 className="mb-8 text-2xl font-bold">CRM</h1>

        <nav className="flex flex-col gap-3">
          <Link href="/dashboard/clients">Clients</Link>
          <Link href="/dashboard/clients">Dashboard</Link>
          <Link href="/dashboard/clients">Settings</Link>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex h-[70px] items-center justify-between border-b bg-white px-6">
          <h2 className="text-xl font-bold">Clients Dashboard</h2>

          <div className="flex items-center gap-4">
            <span>Admin User</span>

            <button
              onClick={logout}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}