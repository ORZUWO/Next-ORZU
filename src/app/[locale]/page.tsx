"use client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useFormik } from 'formik';
import { useState } from 'react';

const HomePage = () => {
  const Api = "https://69945553fade7a9ec0f51007.mockapi.io/Student"
  const queryClient = useQueryClient()
  const [idx, setidx] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await axios.get(Api)
      return data
    }
  })

  const { mutate: deleteuser } = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${Api}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const { mutate: adduser } = useMutation({
    mutationFn: async (newuser: any) => {
      await axios.post(Api, newuser)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setIsModalOpen(false)
      resetForm()
    },
  })

  const { mutate: edituser } = useMutation({
    mutationFn: async (user: any) => {
      await axios.put(`${Api}/${idx}`, user)
      setidx(null)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setIsModalOpen(false)
      resetForm()
    },
  })

  const { handleChange, handleSubmit, values, resetForm, setValues } = useFormik({
    initialValues: {
      name: '',
      age: '',
      status: true,
    },
    onSubmit: (values) => {
      if (idx == null) {
        adduser(values)
      } else {
        edituser(values)
      }
    },
  });

  const handleEdit = (student: any) => {
    setidx(student.id)
    setValues({
      name: student.name,
      age: student.age,
      status: student.status
    })
    setIsModalOpen(true)
  }

  const openAddModal = () => {
    setidx(null)
    resetForm()
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen p-8 max-w-[1400px] mx-auto space-y-12">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="text-gradient">Student Registry</span>
          </h1>
          <p className="text-slate-400 text-lg">Manage academic records with high-performance tools</p>
        </div>
        
        <button
          onClick={openAddModal}
          className="group relative flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-2xl shadow-blue-900/40 transition-all active:scale-95"
        >
          <svg className="w-6 h-6 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Add New Student
        </button>
      </header>

      {/* Table Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="glass-card rounded-[2rem] overflow-hidden border border-slate-800/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800/50">
                  <th className="px-8 py-6 font-semibold text-slate-300 text-sm uppercase tracking-wider">Student Profile</th>
                  <th className="px-8 py-6 font-semibold text-slate-300 text-sm uppercase tracking-wider">Age</th>
                  <th className="px-8 py-6 font-semibold text-slate-300 text-sm uppercase tracking-wider">Status</th>
                  <th className="px-8 py-6 font-semibold text-slate-300 text-sm uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-24 text-center text-slate-500">
                      <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        </div>
                        <span className="text-sm font-medium tracking-widest uppercase">Fetching Records</span>
                      </div>
                    </td>
                  </tr>
                ) : data?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-24 text-center text-slate-500 font-medium">No student records found in the database.</td>
                  </tr>
                ) : (
                  data?.map((student: any) => (
                    <tr key={student.id} className="group hover:bg-white/[0.03] transition-colors duration-200">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center border border-white/10 group-hover:border-blue-500/30 transition-all shadow-lg">
                            <span className="text-blue-400 font-bold text-lg">{student.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="font-bold text-slate-200 group-hover:text-white transition-colors text-lg">{student.name}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-tight">ID: {student.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-slate-300 font-medium text-lg">{student.age}</span>
                        <span className="text-slate-500 text-sm ml-1 font-normal">years old</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`status-badge px-4 py-1.5 text-[0.7rem] ${student.status ? 'status-active' : 'status-inactive'}`}>
                          {student.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleEdit(student)}
                            className="p-3 bg-blue-500/5 hover:bg-blue-500/20 rounded-xl text-blue-400 hover:text-blue-300 transition-all border border-blue-500/10"
                            title="Edit Record"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.138 2.97a2.25 2.25 0 113.182 3.182L9 16.5l-4 1 1-4 10.138-10.138z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteuser(student.id)}
                            className="p-3 bg-rose-500/5 hover:bg-rose-500/20 rounded-xl text-rose-400 hover:text-rose-300 transition-all border border-rose-500/10"
                            title="Delete Record"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative glass-card p-10 rounded-[2.5rem] w-full max-w-lg border border-slate-700/50 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold text-white">{idx ? 'Edit Student' : 'Add New Student'}</h2>
                  <p className="text-slate-400 text-sm">Please provide the details below</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                    autoFocus
                    type="text"
                    placeholder="e.g. Alexander Pierce"
                    className="w-full bg-slate-900/80 border border-slate-700/50 rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Age</label>
                    <input
                      onChange={handleChange}
                      name="age"
                      value={values.age}
                      type="text"
                      placeholder="21"
                      className="w-full bg-slate-900/80 border border-slate-700/50 rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                    <div className="flex h-[60px] items-center px-5 bg-slate-900/80 border border-slate-700/50 rounded-2xl">
                      <label className="flex items-center cursor-pointer w-full justify-between">
                        <span className="text-slate-300 text-sm font-medium">{values.status ? 'Active' : 'Inactive'}</span>
                        <input
                          type="checkbox"
                          name="status"
                          checked={values.status}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/20 transition-all active:scale-95"
                  >
                    {idx == null ? 'Create Student' : 'Save Changes'}
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

export default HomePage
