"use client"

import { useRouter } from "@/src/i18n/navigation"
import { useState } from "react"
import { z } from "zod"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
})

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = loginSchema.safeParse({
      email,
      password,
    })

    if (!result.success) {
      setError(result.error.issues[0].message)
      setIsLoading(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    localStorage.setItem("auth", "true")
    router.push("/dashboard/clients")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 p-10">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600 mb-4 shadow-lg shadow-blue-200">
              <span className="text-xl font-bold text-white">O</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>

            <p className="text-slate-500 text-sm mt-1 font-medium">
              Access your CRM Dashboard
            </p>
          </div>

          <form onSubmit={login} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                Email Address
              </label>

              <input
                type="email"
                placeholder="name@gmail.com"
                className="w-full h-12 px-5 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-12 px-5 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full h-12 mt-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Login to Account"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Orzu CRM • Secure Login
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}