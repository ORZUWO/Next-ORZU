"use client";

import { useDeleteTodoapiMutation, useEditTodoapiMutation, useGetTodoapiQuery, usePostTodoapiMutation } from "@/src/services/api";
import { Idata } from "@/src/services/types";
import { useState, useEffect } from "react";

// --- Custom "Formik-like" Hook to avoid external dependency ---
function useFormikLite({ initialValues, onSubmit, validate }: any) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setValues((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setFieldValue = (name: string, value: any) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(validationErrors).length === 0) {
      await onSubmit(values, { resetForm: () => { setValues(initialValues); setErrors({}); setTouched({}); } });
    }
    setIsSubmitting(false);
  };

  const getFieldProps = (name: string) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: () => setTouched((prev: any) => ({ ...prev, [name]: true })),
  });

  return { values, errors, touched, getFieldProps, handleSubmit, setValues, setFieldValue, resetForm: () => setValues(initialValues), isSubmitting };
}

// --- Premium SVG Icons ---
const Icons = {
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
  ),
  UserPlus: ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
  ),
  CheckCircle: ({ size = 12 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  ),
  Alert: ({ size = 12 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
  )
};

export default function HomePage() {
  const { data, error, isLoading } = useGetTodoapiQuery(null);
  const [postTodo] = usePostTodoapiMutation();
  const [deleteTodo] = useDeleteTodoapiMutation();
  const [editTodo] = useEditTodoapiMutation();

  const [editingId, setEditingId] = useState<string | null>(null);

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) errors.name = "Name is required";
    else if (values.name.length < 2) errors.name = "Name too short";
    
    if (!values.age) errors.age = "Age is required";
    else if (values.age <= 0 || values.age > 120) errors.age = "Invalid age";
    
    return errors;
  };

  const formik = useFormikLite({
    initialValues: {
      name: "",
      age: "",
      status: true,
    },
    validate,
    onSubmit: async (values: any, { resetForm }: any) => {
      if (editingId) {
        await editTodo({ ...values, id: editingId, age: Number(values.age) });
        setEditingId(null);
      } else {
        await postTodo({
          ...values,
          age: Number(values.age),
          id: Date.now().toString(),
        });
      }
      resetForm();
    },
  });

  const handleEdit = (item: Idata) => {
    setEditingId(item.id);
    formik.setValues({
      name: item.name,
      age: item.age.toString(),
      status: item.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    formik.resetForm();
  };

  const items = Array.isArray(data) ? data : (data as any)?.data || [];

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 pt-24">
        <div className="mb-12 animate-pulse">
          <div className="h-12 w-64 bg-white/5 rounded-xl mb-4" />
          <div className="h-4 w-96 bg-white/5 rounded-lg opacity-50" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 w-full bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="glass-card p-10 rounded-[2rem] text-center max-w-md animate-fade-in">
          <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Icons.Alert size={40} />
          </div>
          <h2 className="text-3xl font-black mb-3">System Error</h2>
          <p className="text-slate-400 mb-8 text-lg">We couldn't connect to the student database. Please try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="moshni-button w-full"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 pt-24 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-fade-in">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="text-gradient">Manage</span> Students
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl font-medium">
            Advanced student management system with real-time synchronization.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
          <div className="px-4 py-2 text-center">
            <div className="text-2xl font-bold text-white">{items.length}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Students</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="px-4 py-2 text-center">
            <div className="text-2xl font-bold text-green-400">{items.filter((i: any) => i.status).length}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Active</div>
          </div>
        </div>
      </div>

      {/* Unified Form Section */}
      <div className="mb-16 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <form onSubmit={formik.handleSubmit} className="glass-card p-8 rounded-[2rem] border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-3 rounded-2xl ${editingId ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'}`}>
              {editingId ? <Icons.Edit /> : <Icons.UserPlus />}
            </div>
            <h2 className="text-2xl font-bold">
              {editingId ? "Edit Student Details" : "Register New Student"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5">
              <label className="block text-sm font-bold text-slate-400 mb-2 ml-1">Full Name</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className={`moshni-input ${formik.touched.name && formik.errors.name ? 'border-red-500/50' : ''}`}
                placeholder="e.g. John Doe"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error-text flex items-center gap-1 mt-2">
                  <Icons.Alert size={14} /> {formik.errors.name}
                </div>
              )}
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-slate-400 mb-2 ml-1">Age</label>
              <input
                type="number"
                {...formik.getFieldProps("age")}
                className={`moshni-input ${formik.touched.age && formik.errors.age ? 'border-red-500/50' : ''}`}
                placeholder="18"
              />
              {formik.touched.age && formik.errors.age && (
                <div className="error-text flex items-center gap-1 mt-2">
                  <Icons.Alert size={14} /> {formik.errors.age}
                </div>
              )}
            </div>

            <div className="md:col-span-1 flex flex-col items-center">
              <label className="block text-sm font-bold text-slate-400 mb-2">Status</label>
              <input
                type="checkbox"
                checked={formik.values.status}
                onChange={(e) => formik.setFieldValue("status", e.target.checked)}
                className="w-6 h-6 rounded-lg bg-white/5 border-white/10 text-blue-500 focus:ring-blue-500/20 transition-all cursor-pointer mt-2"
              />
            </div>

            <div className="md:col-span-3 flex items-end gap-4">
              <button 
                type="submit" 
                disabled={formik.isSubmitting}
                className="moshni-button flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {editingId ? <><Icons.Save /> Update</> : <><Icons.UserPlus size={20} /> Register</>}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  onClick={cancelEdit}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-slate-400"
                >
                  <Icons.X />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Moshni Table Section */}
      <div className="animate-fade-in overflow-x-auto pb-8" style={{ animationDelay: '200ms' }}>
        <table className="moshni-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Age</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: Idata, index: number) => (
              <tr key={item.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                <td>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center border border-white/5">
                      <span className="text-xl font-black text-gradient uppercase">{item.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{item.name}</div>
                      <div className="text-xs text-slate-500 font-mono">ID: {item.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-slate-300 font-semibold">{item.age} Years</span>
                </td>
                <td>
                  <span className={`status-badge flex items-center gap-1.5 w-fit ${item.status ? 'status-active' : 'status-inactive'}`}>
                    {item.status ? (
                      <><Icons.CheckCircle size={12} /> Active</>
                    ) : (
                      <><Icons.Alert size={12} /> Inactive</>
                    )}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all duration-300"
                      title="Edit Student"
                    >
                      <Icons.Edit />
                    </button>
                    <button 
                      onClick={() => deleteTodo(item.id)}
                      className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300"
                      title="Delete Student"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="text-center py-20 glass-card rounded-[2rem] border-dashed border-white/10">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-500">
              <Icons.UserPlus size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-300">No Students Registered</h3>
            <p className="text-slate-500">Start by adding a new student using the form above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

