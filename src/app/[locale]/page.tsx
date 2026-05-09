"use client";

import { useDeleteTodoapiMutation, useEditTodoapiMutation, useGetTodoapiQuery, usePostTodoapiMutation } from "@/src/services/api";
import { Idata } from "@/src/services/types";
import { useState } from "react";

export default function HomePage() {
  const { data, error, isLoading } = useGetTodoapiQuery(null);
  let [PostTodoapi] =usePostTodoapiMutation()
  let [DeleteTodoapi] =useDeleteTodoapiMutation()
  let [EditTodoapi] =useEditTodoapiMutation()

  let [name,setName]=useState("")
  let [age,setAge]=useState("")
  let [status,setStatus]=useState(null)
  let [idx,setIdx]=useState(null)


  let edituser=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.name)
    setAge(e.age)
    setStatus(e.status)
    setIdx(e.id)
    
  }
  

  const handlsubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    let newUser={
      name:e.target["name"].value,
      age:e.target["age"].value,
      status:true,
      id:Date.now().toString()
    }
    PostTodoapi(newUser)
  }

  const handledit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    let userdata=data?.find((e:any)=>e.id==idx)

    let editUser={
      ...userdata,
      name:name,
      age:age,
      status:status,
      id:idx
    }
    EditTodoapi(editUser)
  }

  // Note: Assuming data.data if IStudent is { data: Idata[] }
  // or just data if it returns Idata[] directly. 
  // Based on your snippet, I'll handle both or stick to what looks like the intent.
  const items = Array.isArray(data) ? data : (data as any)?.data || [];

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 pt-24">
        <div className="mb-12">
          <div className="h-10 w-64 loading-skeleton rounded-lg mb-4" />
          <div className="h-4 w-96 loading-skeleton rounded-lg opacity-50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card p-6 rounded-2xl h-48 loading-skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="glass-card p-8 rounded-3xl text-center max-w-md animate-fade-in">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-400 mb-6">We couldn't fetch the data. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 pt-24">
      {/* Header Section */}
      <div className="mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          <span className="text-gradient">Manage Your</span> Students
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Real-time overview of student registrations and their current status in the system.
        </p>
      </div>
      <form onSubmit={handlsubmit}>
        <input type="text" name="name" placeholder="Name..." />
        <input type="text" name="age" placeholder="Age..." />
        <button type="submit">Add</button>
      </form>

      <form onSubmit={handledit}>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" placeholder="Name..." />
        <input value={age} onChange={(e)=>setAge(e.target.value)} type="text" name="age" placeholder="Age..." />
        <button type="submit">Edit</button>
      </form>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item: Idata, index: number) => (
          <div 
            key={item.id} 
            className="glass-card p-8 rounded-3xl group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500">
                <span className="text-xl font-bold text-gradient">{item.name[0]}</span>
              </div>
              <span className={`status-badge ${item.status ? 'status-active' : 'status-inactive'}`}>
                {item.status ? 'Active' : 'Inactive'}
                
              </span>
              <div>
              <span onClick={()=>DeleteTodoapi(item.id)} className="bg-red-600 p-2 rounded-2xl cursor-pointer">
                DELETE
              </span>
              <span onClick={()=>edituser(item)} className="bg-blue-600 ml-1 p-2 rounded-2xl cursor-pointer">
                Edit
              </span>

              </div>
            </div>

            <h2 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">
              {item.name}
            </h2>
            <p className="text-slate-400 font-medium mb-6 flex items-center gap-2">
              <span className="w-1 h-1 bg-slate-600 rounded-full" />
              {item.age} Years Old
            </p>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">ID: {item.id}</span>
              <button className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-24 glass-card rounded-3xl animate-fade-in">
          <p className="text-slate-400 text-xl">No students found.</p>
        </div>
      )}
    </div>
  );
}
