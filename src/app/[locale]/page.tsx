"use client"
import { useDeleteTodoapiMutation, useEditTodoapiMutation, useGetTodoapiQuery, usePostTodoapiMutation } from '@/src/services/api'
import { IStudent } from '@/src/services/types'
import { useFormik } from 'formik'
import { useState } from 'react'

const HomePage = () => {
  let { data, isLoading, isError } = useGetTodoapiQuery(null)
  let [deleteTodoapi] = useDeleteTodoapiMutation()
  let [postTodoapi] = usePostTodoapiMutation()
  let [editTodoapi] = useEditTodoapiMutation()
  let [idx, setidx] = useState<string | null>(null)

  const { values, handleChange, handleSubmit, setValues, resetForm } = useFormik({
    initialValues: {
      name: '',
      age: '',
      status: '',
    },
    onSubmit: values => {
      if (idx == null) {
        let newuser = {
          name: values.name,
          age: values.age,
          status: values.status,
        }
        postTodoapi(newuser as any)
        resetForm()
      } else {
        let edituser = {
          id: idx,
          name: values.name,
          age: values.age,
          status: values.status,
        }
        editTodoapi(edituser as any)
        setidx(null)
        resetForm()
      }
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 pt-24">
        <div className="mb-12 animate-pulse">
          <div className="h-12 w-64 bg-white/5 rounded-2xl mb-4" />
          <div className="h-4 w-96 bg-white/5 rounded-lg opacity-50" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 w-full bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="glass-card p-10 rounded-[2.5rem] text-center max-w-md animate-fade-in">
          <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          </div>
          <h2 className="text-3xl font-black mb-3">System Error</h2>
          <p className="text-slate-400 mb-8 text-lg">We couldn't connect to the database. Please try again.</p>
          <button onClick={() => window.location.reload()} className="moshni-button w-full">Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 pt-24 max-w-6xl animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="text-gradient">Student</span> Portal
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl font-medium">
            Manage student records with precision and elegance.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
          <div className="px-6 py-2 text-center">
            <div className="text-3xl font-bold text-white">{data?.length || 0}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Total</div>
          </div>
        </div>
      </div>

      {/* Unified Form Section */}
      <div className="mb-20">
        <form onSubmit={handleSubmit} className="glass-card p-10 rounded-[2.5rem] border-white/10">
          <div className="flex items-center gap-4 mb-10">
            <div className={`p-4 rounded-2xl ${idx ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'}`}>
              {idx ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              )}
            </div>
            <h2 className="text-3xl font-bold">{idx ? "Update Student" : "New Registration"}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={values.name} 
                onChange={handleChange} 
                className="moshni-input" 
                placeholder="e.g. John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Age</label>
              <input 
                type="number" 
                name="age" 
                value={values.age} 
                onChange={handleChange} 
                className="moshni-input" 
                placeholder="18"
              />
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Status</label>
                <select 
                  name="status" 
                  value={values.status} 
                  onChange={handleChange} 
                  className="moshni-input appearance-none"
                >
                  <option value="" className="bg-slate-900">Select...</option>
                  <option value="true" className="bg-slate-900">Active</option>
                  <option value="false" className="bg-slate-900">Inactive</option>
                </select>
              </div>
              <button type="submit" className="moshni-button flex-1 h-[54px]">
                {idx ? (
                  <><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save</>
                ) : (
                  <><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add</>
                )}
              </button>
              {idx && (
                <button 
                  type="button" 
                  onClick={() => { setidx(null); resetForm(); }}
                  className="moshni-button-secondary h-[54px]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Modern Table Section */}
      <div className="overflow-x-auto pb-10">
        <table className="moshni-table">
          <thead>
            <tr>
              <th>Student Profile</th>
              <th>Age</th>
              <th>Current Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: IStudent, index: number) => (
              <tr key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <td>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center border border-white/5">
                      <span className="text-2xl font-black text-gradient uppercase">{item.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-xl">{item.name}</div>
                      <div className="text-xs text-slate-500 font-mono tracking-tighter">ID: {item.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-slate-300 font-bold text-lg">{item.age} <span className="text-xs text-slate-500 uppercase ml-1">Years</span></span>
                </td>
                <td>
                  <span className={`status-badge flex items-center gap-2 w-fit ${item.status ? 'status-active' : 'status-inactive'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.status ? 'bg-green-400' : 'bg-rose-400'} animate-pulse`} />
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => {
                        setidx(item.id)
                        setValues(item as any)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      className="p-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </button>
                    <button 
                      onClick={() => deleteTodoapi(item.id)}
                      className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!data || data.length === 0) && (
          <div className="text-center py-20 glass-card rounded-[2.5rem] border-dashed border-white/10 mt-8">
            <p className="text-slate-500 text-xl font-medium">No records found. Start by adding a student.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage