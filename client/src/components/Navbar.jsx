import React from 'react';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Layers, 
  Sparkles, 
  Bell, 
  CheckCircle2, 
  Compass
} from 'lucide-react';

export default function Navbar({ currentRole, setCurrentRole, studentData, notificationCount = 2 }) {
  const roles = [
    { id: 'student', label: 'Student Portal', icon: GraduationCap, badge: 'Rahul' },
    { id: 'college', label: 'College Portal', icon: Building2, badge: 'Apex Univ' },
    { id: 'company', label: 'Company Portal', icon: Briefcase, badge: 'Recruiter' },
    { id: 'ecosystem', label: 'Ecosystem & Overview', icon: Layers, badge: 'Live Tour' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentRole('ecosystem')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Compass className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">Career<span className="text-blue-600">Bridge</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">AI Powered</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">From Campus to Career, Smarter.</p>
            </div>
          </div>

          {/* Role Switcher Pill Bar */}
          <div className="hidden md:flex items-center p-1 bg-slate-100/90 rounded-full border border-slate-200/80">
            {roles.map(role => {
              const Icon = role.icon;
              const isActive = currentRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setCurrentRole(role.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-blue-600 shadow-sm shadow-slate-200 font-bold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{role.label}</span>
                  {role.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'bg-slate-200/70 text-slate-500'
                    }`}>
                      {role.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Quick Mobile Role Selector */}
            <div className="md:hidden">
              <select 
                value={currentRole} 
                onChange={(e) => setCurrentRole(e.target.value)}
                className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 font-semibold text-blue-600"
              >
                <option value="student">Student Portal</option>
                <option value="college">College Portal</option>
                <option value="company">Company Portal</option>
                <option value="ecosystem">Ecosystem</option>
              </select>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Current Active Persona Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img 
                src={currentRole === 'student' ? studentData?.avatar : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              <div className="hidden lg:block text-left text-xs">
                <p className="font-semibold text-slate-900 leading-tight">
                  {currentRole === 'student' ? studentData?.name || 'Rahul Sharma' : currentRole === 'college' ? 'Dean Placements' : 'Talent Lead'}
                </p>
                <p className="text-[10px] text-slate-500">
                  {currentRole === 'student' ? 'Student (CS)' : currentRole === 'college' ? 'Apex Institute' : 'TCS / Accenture'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
