"use client"

export default function SettingsPage() {
  const sections = [
    {
      title: "General Settings",
      icon: "⚙️",
      items: [
        { label: "Organization Name", value: "Orzu CRM System", type: "input" },
        { label: "Admin Email", value: "admin@orzu.tj", type: "input" },
        { label: "Language", value: "English (US)", type: "select" },
        { label: "Timezone", value: "(GMT+05:00) Dushanbe", type: "select" },
      ]
    },
    {
      title: "Security & Privacy",
      icon: "🛡️",
      items: [
        { label: "Two-Factor Authentication", value: true, type: "toggle" },
        { label: "Login Alerts", value: true, type: "toggle" },
        { label: "Last Login", value: "Today at 10:45 AM", type: "text" },
      ]
    }
  ]

  return (
    <div className="max-w-4xl animate-fade-in space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-xs text-slate-400 font-bold mt-1">Manage your account preferences</p>
        </div>
        <button className="px-6 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black shadow-lg hover:bg-slate-800 transition-all active:scale-95">
          Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3">
              <span className="text-xl">{section.icon}</span>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">{section.title}</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{item.label}</p>
                  </div>
                  
                  <div className="w-64 flex justify-end">
                    {item.type === "input" && (
                      <input 
                        type="text" 
                        defaultValue={item.value as string} 
                        className="w-full h-10 px-4 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 transition-all font-bold text-xs text-slate-700"
                      />
                    )}
                    {item.type === "select" && (
                      <select className="w-full h-10 px-4 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-500 transition-all font-bold text-xs text-slate-700 cursor-pointer">
                        <option>{item.value}</option>
                        <option>Other Option</option>
                      </select>
                    )}
                    {item.type === "toggle" && (
                      <div className={`w-12 h-6.5 rounded-full relative p-1 cursor-pointer transition-colors duration-300 ${item.value ? 'bg-blue-600' : 'bg-slate-200'}`}>
                        <div className={`h-4.5 w-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${item.value ? 'translate-x-5.5' : 'translate-x-0'}`}></div>
                      </div>
                    )}
                    {item.type === "text" && (
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-red-50/30 rounded-[24px] border border-red-100 p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-black text-red-600 uppercase tracking-wider">Danger Zone</h3>
            <p className="text-[10px] text-red-400 font-bold mt-0.5">Permanently delete workspace data</p>
          </div>
          <button className="px-5 py-2.5 rounded-xl border-2 border-red-200 text-red-600 text-[10px] font-black hover:bg-red-600 hover:text-white transition-all">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
