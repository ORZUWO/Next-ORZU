"use client"

export default function DashboardOverview() {
  const stats = [
    { title: "Total Students", value: "2,450", growth: "+12%", icon: "👥", color: "from-blue-500 to-blue-700" },
    { title: "Active Courses", value: "124", growth: "+5%", icon: "📚", color: "from-emerald-500 to-teal-700" },
    { title: "Total Revenue", value: "$45,200", growth: "+18%", icon: "💰", color: "from-purple-500 to-indigo-700" },
    { title: "Upcoming Exams", value: "12", growth: "Next Week", icon: "📝", color: "from-orange-500 to-red-700" },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-10 text-white shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">Welcome Back, Admin! 👋</h1>
          <p className="text-slate-400 font-medium max-w-xl leading-relaxed">
            Everything is looking great today. You have <span className="text-blue-400 font-bold">12 new students</span> to review and <span className="text-emerald-400 font-bold">3 reports</span> waiting for your approval.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group bg-white p-8 rounded-[32px] border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg shadow-blue-500/10`}>
                {stat.icon}
              </div>
              <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${stat.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {stat.growth}
              </span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Analytics Overview</h3>
              <p className="text-xs text-slate-400 font-bold mt-1">Student growth performance for 2026</p>
            </div>
            <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-500">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-64 w-full flex items-end gap-2 px-2 relative">
            {[40, 70, 45, 90, 65, 80, 55, 95, 40, 60, 85, 100].map((height, i) => (
              <div key={i} className="flex-1 group relative flex flex-col items-center justify-end h-full">
                <div 
                  style={{ height: `${height}%` }} 
                  className="w-full bg-gradient-to-t from-blue-600/10 to-blue-600 rounded-t-xl group-hover:from-blue-600 group-hover:to-blue-500 transition-all duration-300 shadow-sm"
                ></div>
                <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">M{i+1}</span>
              </div>
            ))}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-1">
              {[1, 2, 3, 4].map(l => <div key={l} className="w-full border-t border-dashed border-slate-300"></div>)}
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Recent Activity</h3>
          <div className="space-y-8">
            {[
              { user: "Emily Johnson", action: "joined New Course", time: "2 mins ago", icon: "🎓", color: "bg-blue-50 text-blue-600" },
              { user: "System Update", action: "Database backup completed", time: "1 hour ago", icon: "⚙️", color: "bg-slate-50 text-slate-600" },
              { user: "Emilyd Johnson", action: "uploaded a new photo", time: "3 hours ago", icon: "📸", color: "bg-purple-50 text-purple-600" },
              { user: "New Payment", action: "from Student #STU-001", time: "5 hours ago", icon: "💸", color: "bg-emerald-50 text-emerald-600" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`h-10 w-10 shrink-0 rounded-2xl ${activity.color} flex items-center justify-center text-sm shadow-sm`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    <span className="text-blue-600">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 rounded-2xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  )
}
