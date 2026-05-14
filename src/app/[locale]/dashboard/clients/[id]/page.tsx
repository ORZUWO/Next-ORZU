"use client"

import { useGetClientByIdQuery } from "@/src/services/api"
import { Link } from "@/src/i18n/navigation"
import { useParams } from "next/navigation"

export default function ClientDetailsPage() {
  const params = useParams()
  const id = params.id as string

  const { data: student, isLoading, isError } = useGetClientByIdQuery(id)

  if (isLoading) return <div className="p-10 text-center font-bold animate-pulse text-blue-600">Loading student details...</div>
  if (isError) return <div className="p-10 text-center text-red-500 font-bold">Error loading student details.</div>
  if (!student) return <div className="p-10 text-center text-slate-500 font-bold">Student not found.</div>

  return (
    <div className="p-6 bg-slate-50 font-sans min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/dashboard/clients" 
          className="mb-4 inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm"
        >
          ← Back to Directory
        </Link>

        <div className="bg-white rounded-[32px] shadow-lg border border-slate-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="h-24 w-24 rounded-2xl bg-white p-1.5 shadow-xl">
                <img 
                  src={student.image || "https://dummyjson.com/icon/emilys/128"} 
                  alt={student.firstName} 
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="pt-16 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-sm text-slate-500 font-bold mt-0.5">{student.company || "SoftClub Member"}</p>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                Active Student
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email Address</p>
                <p className="text-base font-bold text-slate-700">{student.email}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Location / Address</p>
                <p className="text-base font-bold text-slate-700">{student.address || "Dushanbe, Tajikistan"}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Phone Number</p>
                <p className="text-base font-bold text-slate-700">{student.phone || "---"}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Registration ID</p>
                <p className="text-base font-bold text-slate-700">#STU-00{student.id}</p>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
              <h3 className="text-base font-black text-indigo-900 mb-1">Student Performance Notes</h3>
              <p className="text-xs text-indigo-700 font-bold leading-relaxed">
                This student is currently enrolled in the Advanced Web Development track. 
                Regularly attends all sessions and shows great progress in React & Redux Toolkit modules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
