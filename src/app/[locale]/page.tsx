"use client"

import { addTodo, deleteTodo, editcheck, editTodo, getid, GetTodo } from "@/src/store/Todo"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

const HomePage = () => {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [infoId, setInfoId] = useState<string | null>(null)
  const [idx, setidx] = useState(null)

  const { register, handleSubmit, reset } = useForm<any>()

  const { register: editRegister, handleSubmit: editHandleSubmit,reset: editReset,} = useForm<any>()

  const { data: getdata } = useQuery({
    queryFn: GetTodo,
    queryKey: ["todos"],
  })

  const { data: infoData, isFetching: infoFetching } = useQuery({
    queryKey: ["todo", infoId],
    queryFn: () => getid(infoId!),
    enabled: !!infoId,
  })

  const { mutate: postdata } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const { mutate: deletedata } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const { mutate: editdata } = useMutation({
    mutationFn: (newuser: any) => editTodo(newuser.id, newuser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const { mutate: checkdata } = useMutation({
    mutationFn: editcheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const addtodoapi = (e: any) => {
    let newuser: any = {
      name: e.name,
      age: e.age,
      status: e.status,
      img: e.img,
    }

    postdata(newuser)
    reset()
  }


  const editpush = (user: any) => {
    setidx(user.id)

    editReset({
      name: user.name,
      img: user.img || "",
      age: user.age,
      status: user.status == true ? "true" : "false",
    })
  }

  const edittodoapi = (e: any) => {
    let newuser: any = {
      name: e.name,
      age: e.age,
      status: e.status,
      img: e.img,
      id: idx,
    }

    editdata(newuser)
    setOpen(false)
  }

  

  return (
    <div className="min-h-screen bg-transparent p-6 text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#1a1f36] border border-gray-700 rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-white">User Management</h2>


          <form onSubmit={handleSubmit(addtodoapi)} className="flex flex-col md:flex-row gap-3 items-center">
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className="flex-1 w-full bg-[#0f1225] border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />

            <input
              {...register("img")}
              type="text"
              placeholder="Image URL"
              className="flex-1 w-full bg-[#0f1225] border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />

            <input
              {...register("age", { required: true })}
              type="number"
              placeholder="Age"
              className="w-full md:max-w-[100px] bg-[#0f1225] border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />

            <select
              {...register("status")}
              className="w-full md:max-w-[120px] bg-[#0f1225] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
            >
              Add User
            </button>
          </form>
        </div>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-[#1a1f36] p-6 rounded-md border border-gray-700 w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">Edit User</h2>

              <form onSubmit={editHandleSubmit(edittodoapi)} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Name</label>
                  <input
                    {...editRegister("name", { required: true })}
                    type="text"
                    placeholder="Name"
                    className="w-full bg-[#0f1225] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Image URL</label>
                  <input
                    {...editRegister("img")}
                    type="text"
                    placeholder="Image URL"
                    className="w-full bg-[#0f1225] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Age</label>
                  <input
                    {...editRegister("age", { required: true })}
                    type="number"
                    placeholder="Age"
                    className="w-full bg-[#0f1225] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Status</label>
                  <select
                    {...editRegister("status")}
                    className="w-full bg-[#0f1225] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>


                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {infoId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-[#1a1f36] p-6 rounded-md border border-gray-700 w-full max-w-sm">
              {infoFetching ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
              ) : infoData ? (
                <>
                  <div className="flex justify-center mb-4">
                    {infoData.img ? (
                      <img src={infoData.img} className="w-24 h-24 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-700" />
                    )}
                  </div>

                  <h2 className="text-xl font-semibold text-white mb-2 text-center">{infoData.name}</h2>

                  <div className="text-gray-300 space-y-2 mb-6 text-center">
                    <p><span className="font-medium text-gray-400">ID:</span> {infoData.id}</p>
                    <p><span className="font-medium text-gray-400">Age:</span> {infoData.age}</p>
                    <p><span className="font-medium text-gray-400">Status:</span> {infoData.status ? "Active" : "Inactive"}</p>
                  </div>
                </>
              ) : (
                <div className="text-center text-red-400 mb-6">Failed to load data</div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={() => setInfoId(null)}
                  className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

    

        <div className="bg-[#1a1f36] border border-gray-700 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0f1225] border-b border-gray-700">
                  <th className="py-3 px-4 text-sm font-semibold text-gray-300 text-center w-24">Checkbox</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-300">Id</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-300">Name</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-300">Image</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-300">Age</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-300">Status</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                </tr>
              </thead>


              <tbody className="divide-y divide-gray-700">
                {getdata?.map((e: any) => {
                  return (
                    <tr key={e.id} className="hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <input
                            onChange={() => checkdata(e)}
                            checked={e.status}
                            type="checkbox"
                            className="w-4 h-4"
                          />
                        </div>
                      </td>

                      <td className="py-3 px-4 text-gray-300">{e.id}</td>
                      <td className="py-3 px-4 text-white">{e.name}</td>

                      <td className="py-3 px-4 text-gray-300">
                        {e.img ? (
                          <img src={e.img} className="w-10 h-10 rounded-full object-cover" alt="" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-700" />
                        )}
                      </td>

                      <td className="py-3 px-4 text-gray-300">{e.age}</td>

                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${e.status ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                          {e.status ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setInfoId(e.id)}
                            className="text-green-400 hover:text-green-300 text-sm"
                          >
                            Info
                          </button>

                          <button
                            onClick={() => {
                              editpush(e)
                              setOpen(true)
                            }}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deletedata(e.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}

                {(!getdata || getdata.length === 0) && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No users found. Add some data!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
