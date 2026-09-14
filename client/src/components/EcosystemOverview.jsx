import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Bot, 
  TrendingUp, 
  FileCheck, 
  Users,
  ShieldAlert,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function EcosystemOverview({ onSelectRole, studentData, collegeData, opportunities }) {
  const problems = [
    "Students don't know which jobs they are eligible for.",
    "Lack of clarity on missing skills and blind spots.",
    "Certificates are not trusted blindly by employers.",
    "No feedback after rejection leaves students lost.",
    "Colleges struggle to manage students & physical drives.",
    "Companies find it hard to identify genuinely skilled talent."
  ];

  const solutions = [
    "Unified platform connecting Students, Colleges & Companies.",
    "Skill verification (certificates + coding experience + test assessment).",
    "AI-powered career analyzer & personalized step-by-step roadmap.",
    "Transparent application tracking with recruiter & AI feedback.",
    "Streamlined automated placement management for colleges.",
    "Verified, skill-based AI candidate ranking for hiring teams."
  ];

  const workflowSteps = [
    { title: "Company creates hiring", role: "Company", icon: Briefcase, color: "bg-blue-50 text-blue-600 border-blue-200" },
    { title: "College approves drive", role: "College", icon: Building2, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { title: "Students see opportunity", role: "Student", icon: GraduationCap, color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { title: "Student applies with 1-click", role: "Student", icon: Zap, color: "bg-sky-50 text-sky-600 border-sky-200" },
    { title: "Company receives application", role: "Company", icon: Users, color: "bg-purple-50 text-purple-600 border-purple-200" },
    { title: "AI ranking & shortlisting", role: "AI Engine", icon: Bot, color: "bg-amber-50 text-amber-600 border-amber-200" },
    { title: "Interview scheduled", role: "Recruiter", icon: TrendingUp, color: "bg-violet-50 text-violet-600 border-violet-200" },
    { title: "Selected / Feedback given", role: "Ecosystem", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700 border-emerald-300" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Problem vs Solution Split from Image 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* The Problem */}
        <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4 text-rose-600">
            <div className="h-8 w-8 rounded-lg bg-rose-50 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="text-base font-black tracking-tight text-slate-900">The Problem</h3>
          </div>

          <div className="space-y-3 text-xs">
            {problems.map((p, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-slate-600 bg-rose-50/40 p-2.5 rounded-xl border border-rose-100">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Our Solution */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4 text-emerald-600">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-black tracking-tight text-slate-900">Our Solution</h3>
          </div>

          <div className="space-y-3 text-xs">
            {solutions.map((s, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-slate-700 bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* How It Works Pipeline (Matching Image 1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-black text-slate-900">How It Works: End-to-End Placement Flow</h3>
            <p className="text-xs text-slate-500">From job posting to AI shortlisting and offer rollout</p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Full Placement Lifecycle
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className={`p-3 rounded-xl border ${step.color} flex flex-col justify-between text-left transition-all hover:scale-105 shadow-sm`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black opacity-60">0{idx + 1}</span>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold leading-tight">{step.title}</h4>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-wider opacity-70 mt-3 block">{step.role}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Portal Interactive Jumpers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Student Portal Card */}
        <div 
          onClick={() => onSelectRole('student')}
          className="bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl p-6 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Interactive Portal
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900">Student Portal</h4>
            <p className="text-xs text-slate-500 mt-1">
              Build skills, check AI Readiness (78/100), follow personalized roadmaps, and apply to matching roles.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-50 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Current Demo User:</span>
                <strong className="text-slate-900">{studentData.name}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Verified Skills:</span>
                <strong className="text-emerald-600">3 Verified</strong>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>Launch Student View</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* College Portal Card */}
        <div 
          onClick={() => onSelectRole('college')}
          className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-xl p-6 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Interactive Portal
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900">College Portal</h4>
            <p className="text-xs text-slate-500 mt-1">
              Manage placement drives, view batch skill gap insights, track 86% placement rate, and verify students.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-50 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Total Students:</span>
                <strong className="text-slate-900">{collegeData.stats.totalStudents.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Placement Rate:</span>
                <strong className="text-sky-600">{collegeData.stats.placementRate}%</strong>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>Launch College View</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Company Portal Card */}
        <div 
          onClick={() => onSelectRole('company')}
          className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl p-6 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
                <Briefcase className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Interactive Portal
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900">Company Portal</h4>
            <p className="text-xs text-slate-500 mt-1">
              Find verified talent, evaluate candidate matches with AI rationale, schedule technical interviews, and post openings.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-50 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Top Candidate:</span>
                <strong className="text-emerald-700">#1 Rahul Sharma (92%)</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Active Openings:</span>
                <strong className="text-slate-900">{opportunities.length} Roles</strong>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>Launch Company View</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </div>
        </div>

      </div>

    </div>
  );
}
