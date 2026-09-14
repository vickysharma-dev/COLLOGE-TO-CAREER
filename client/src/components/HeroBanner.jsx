import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Zap, Briefcase, GraduationCap, Building2 } from 'lucide-react';

export default function HeroBanner({ onSelectRole }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-sky-600 text-white p-6 sm:p-10 shadow-xl shadow-blue-600/15 mb-8">
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-400/20 blur-2xl pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Mission & Pathways */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold tracking-wide backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>A Unified Campus-to-Career Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            From Campus to Career, <br className="hidden sm:inline" />
            <span className="text-sky-200 underline decoration-sky-300/60 decoration-wavy">Smarter & Verified.</span>
          </h1>

          <p className="text-blue-100 text-sm sm:text-base max-w-xl leading-relaxed">
            Connecting <strong className="text-white">Students</strong>, <strong className="text-white">Colleges</strong>, and <strong className="text-white">Companies</strong> with AI-powered skill verification, real-time readiness scoring, and transparent placement drives.
          </p>

          {/* Stepper: Learn -> Build Skills -> Get Hired */}
          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> 1. Learn
            </span>
            <ArrowRight className="h-4 w-4 text-blue-200" />
            <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400"></span> 2. Build Skills
            </span>
            <ArrowRight className="h-4 w-4 text-blue-200" />
            <span className="px-3 py-1.5 rounded-xl bg-white text-blue-900 flex items-center gap-1.5 shadow-md shadow-black/10">
              <Zap className="h-3.5 w-3.5 text-blue-600 fill-blue-600" /> 3. Get Hired
            </span>
          </div>
        </div>

        {/* Right Column: 3 Audience Quick Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
          
          <div 
            onClick={() => onSelectRole('student')}
            className="group cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 transition duration-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/30 border border-white/30 flex items-center justify-center text-sky-200 group-hover:scale-110 transition">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">For Students</h4>
                <p className="text-xs text-blue-100">AI Readiness, Skill Roadmaps & Verified Jobs</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-200 group-hover:translate-x-1 transition" />
          </div>

          <div 
            onClick={() => onSelectRole('college')}
            className="group cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 transition duration-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/30 border border-white/30 flex items-center justify-center text-indigo-200 group-hover:scale-110 transition">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">For Colleges</h4>
                <p className="text-xs text-blue-100">Manage placement drives & batch analytics</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-200 group-hover:translate-x-1 transition" />
          </div>

          <div 
            onClick={() => onSelectRole('company')}
            className="group cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 transition duration-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/30 border border-white/30 flex items-center justify-center text-emerald-200 group-hover:scale-110 transition">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">For Companies</h4>
                <p className="text-xs text-blue-100">Hire verified talent with AI candidate ranking</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-200 group-hover:translate-x-1 transition" />
          </div>

        </div>

      </div>
    </div>
  );
}
