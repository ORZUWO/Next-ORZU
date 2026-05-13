"use client"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addStudent,
  deleteStudent,
  editStudent,
  getStudents,
} from "@/src/services/api"
import { IStudent } from "@/src/services/types"

export default function HomePage() {
  const queryClient = useQueryClient()

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [editId, setEditId] = useState<string | null>(null)

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  })

  const addMutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      setName("")
      setAge("")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
    },
  })

  const editMutation = useMutation({
    mutationFn: editStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      setName("")
      setAge("")
      setEditId(null)
    },
  })

  const submitStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !age.trim()) return

    if (editId) {
      editMutation.mutate({
        id: editId,
        name,
        age,
        status: true,
      })
    } else {
      addMutation.mutate({
        name,
        age,
        status: true,
      })
    }
  }

  const startEdit = (student: IStudent) => {
    setEditId(student.id)
    setName(student.name)
    setAge(student.age)
  }

  const cancelEdit = () => {
    setEditId(null)
    setName("")
    setAge("")
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 h-12 w-80 animate-pulse rounded-2xl bg-white/10" />
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="mb-4 h-14 animate-pulse rounded-2xl bg-white/10"
              />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="rounded-[30px] border border-red-500/20 bg-red-500/10 p-10 text-center">
          <h1 className="text-3xl font-black text-red-400">Error...</h1>
          <p className="mt-2 text-slate-400">Data гирифта нашуд</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400">
              TanStack Query CRUD
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Students{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                Table
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-slate-400">
              CRUD Table бо GET, POST, PUT, DELETE.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-sm text-slate-400">Total students</p>
            <h2 className="text-3xl font-black">{data.length}</h2>
          </div>
        </div>

        <form
          onSubmit={submitStudent}
          className="mb-8 rounded-[30px] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto_auto]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name..."
              className="h-14 rounded-2xl border border-white/10 bg-slate-900 px-5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age..."
              className="h-14 rounded-2xl border border-white/10 bg-slate-900 px-5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <button
              disabled={addMutation.isPending || editMutation.isPending}
              className="h-14 rounded-2xl bg-blue-600 px-8 font-black text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
            >
              {editId ? "Save" : "Add"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="h-14 rounded-2xl border border-white/10 px-6 font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.05]">
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">
                    №
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">
                    Student
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">
                    Age
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">
                    Status
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">
                    ID
                  </th>
                  <th className="px-6 py-5 text-right text-xs font-black uppercase tracking-widest text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <h2 className="text-2xl font-black text-white">
                        No students found
                      </h2>
                      <p className="mt-2 text-slate-400">
                        Аввалин student-ро илова кун
                      </p>
                    </td>
                  </tr>
                ) : (
                  data.map((student, index) => (
                    <tr
                      key={student.id}
                      className="border-b border-white/10 transition hover:bg-white/[0.06]"
                    >
                      <td className="px-6 py-5 text-sm font-bold text-slate-400">
                        {index + 1}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-lg font-black shadow-lg shadow-blue-500/25">
                            {student.name?.[0]?.toUpperCase()}
                          </div>

                          <div>
                            <h3 className="font-black text-white">
                              {student.name}
                            </h3>
                            <p className="text-sm text-slate-500">
                              Student account
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm font-bold text-slate-300">
                        {student.age}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-black ${
                            student.status
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {student.status ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-xs font-bold text-slate-500">
                        {student.id}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => startEdit(student)}
                            className="rounded-xl bg-yellow-500/10 px-5 py-2 text-sm font-black text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteMutation.mutate(student.id)}
                            disabled={deleteMutation.isPending}
                            className="rounded-xl bg-red-500/10 px-5 py-2 text-sm font-black text-red-400 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
                          >
                            Delete
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
      </div>
    </main>
  )
}