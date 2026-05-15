"use client"

import {
  useGetTodoapiQuery,
  useDeleteTodoapiMutation,
  usePostTodoapiMutation,
  useEditTodoapiMutation,
} from "@/src/services/api"
import { IStudent } from "@/src/services/types"
import { useState } from "react"
import { Link } from "@/src/i18n/navigation"

export default function ClientsCRUDPage() {
  const { data: students, isLoading, isError } = useGetTodoapiQuery()
  const [deleteStudent] = useDeleteTodoapiMutation()
  const [addStudent] = usePostTodoapiMutation()
  const [editStudent] = useEditTodoapiMutation()

  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Partial<IStudent>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    image: "https://dummyjson.com/icon/emilys/128",
    address: "Dushanbe, Tajikistan",
  })

  const handleOpenAdd = () => {
    setCurrentStudent({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      image: "https://dummyjson.com/icon/emilys/128",
      address: "Dushanbe, Tajikistan",
    })
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (student: IStudent) => {
    setCurrentStudent({ ...student })
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

  const filteredStudents = students?.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
    const email = (student.email || "").toLowerCase()
    const value = search.toLowerCase()
    return fullName.includes(value) || email.includes(value)
  }) || []

  if (isLoading) return <div className="p-10 text-center font-bold animate-pulse text-blue-600">Loading students...</div>
  if (isError) return <div className="p-10 text-center text-red-500 font-bold">Error loading students.</div>

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-5 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Students Directory</h1>
            <p className="text-slate-500 font-medium mt-1">Manage student records with ease</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="h-12 pl-11 pr-5 w-64 rounded-2xl bg-white border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold text-sm text-slate-900 shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={handleOpenAdd}
              className="h-12 px-6 rounded-2xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="text-lg">+</span> Add Student
            </button>
          </div>
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
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
                      <div className="flex items-center justify-end gap-2 transition-opacity">
                        <Link
                          href={`/dashboard/clients/${student.id}`}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm flex items-center justify-center"
                          title="Info"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center justify-center"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-slate-400 font-medium">
                    {search ? `No students matching "${search}"` : "No students found. Add one to get started!"}
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
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-slate-900">
                  {isEditMode ? "Edit Student" : "Add New Student"}
                </h2>
                <div className="h-16 w-16 rounded-2xl bg-slate-100 border-2 border-slate-200 overflow-hidden shadow-md">
                   <img 
                    src={currentStudent.image || "https://dummyjson.com/icon/emilys/128"} 
                    alt="Preview" 
                    className="h-full w-full object-cover" 
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Photo URL</label>
                  <input
                    className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-900"
                    placeholder="https://example.com/photo.jpg"
                    value={currentStudent.image || ""}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, image: e.target.value })}
                  />
                </div>

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
                      required
                      className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-900"
                      value={currentStudent.phone || ""}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Company</label>
                    <input
                      required
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
