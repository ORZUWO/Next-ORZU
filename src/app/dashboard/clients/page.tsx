"use client"

import {
  useGetTodoapiQuery,
  useDeleteTodoapiMutation,
  usePostTodoapiMutation,
  useEditTodoapiMutation,
} from "@/src/services/api"
import { IStudent } from "@/src/services/types"
import { useState } from "react"

export default function ClientsCRUDPage() {
  const { data: students, isLoading, isError } = useGetTodoapiQuery()
  const [deleteStudent] = useDeleteTodoapiMutation()
  const [addStudent] = usePostTodoapiMutation()
  const [editStudent] = useEditTodoapiMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Partial<IStudent>>({})

  const handleOpenAdd = () => {
    setCurrentStudent({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      image: "https://dummyjson.com/icon/emilys/128",
      address: "",
    })
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (student: IStudent) => {
    setCurrentStudent(student)
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditMode) {
      await editStudent(currentStudent as IStudent)
    } else {
      await addStudent(currentStudent as any)
    }
    setIsModalOpen(false)
  }

  if (isLoading) return <div className="p-10 text-center font-bold animate-pulse text-blue-600">Loading students...</div>
  if (isError) return <div className="p-10 text-center text-red-500 font-bold">Error loading students.</div>

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Students Directory</h1>
            <p className="text-slate-500 font-medium mt-1">Manage student records with ease</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            + Add Student
          </button>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Company</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students && students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student.id || index} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
                          <img 
                            src={student.image || "https://dummyjson.com/icon/emilys/128"} 
                            alt="Avatar" 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {student.firstName || student.name || "Unknown"} {student.lastName || ""}
                          </p>
                          <p className="text-xs text-slate-400 font-medium">{student.address || "Dushanbe, TJ"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-semibold text-slate-600">{student.email || "no-email@example.com"}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-semibold text-slate-600">{student.phone || "---"}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                        {student.company || "SoftClub"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-slate-400 font-medium">
                    No students found. Add one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden border border-white/20">
            <div className="p-10">
              <h2 className="text-3xl font-black text-slate-900 mb-8">
                {isEditMode ? "Edit Student" : "Add New Student"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">First Name</label>
                    <input
                      required
                      className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-900"
                      value={currentStudent.firstName || ""}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Last Name</label>
                    <input
                      required
                      className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-900"
                      value={currentStudent.lastName || ""}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-900"
                    value={currentStudent.email || ""}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Phone</label>
                    <input
                      className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-900"
                      value={currentStudent.phone || ""}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Company</label>
                    <input
                      className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-900"
                      value={currentStudent.company || ""}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-14 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-14 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    {isEditMode ? "Save Changes" : "Create Student"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}