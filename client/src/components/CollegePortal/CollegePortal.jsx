import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  Plus, 
  Sparkles, 
  Award, 
  Search, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronRight, 
  Eye, 
  UserCheck, 
  GraduationCap, 
  Check, 
  X, 
  Download, 
  BookOpen, 
  BarChart3, 
  LogOut,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Globe,
  FolderGit2,
  Phone,
  GitBranch
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import confetti from 'canvas-confetti';

export default function CollegePortal({ 
  collegeData = {}, 
  students = [], 
  applications = [], 
  onCreateDrive, 
  onProcessStudentVerification, 
  onProcessCompanyRequest 
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Safe data extraction (support both nested overview and direct properties)
  const overview = collegeData?.overview || collegeData || {};
  const placementDrivesList = collegeData?.placementDrives || overview?.placementDrives || [];
  const pendingVerificationList = collegeData?.verificationRequests || [];
  const companyRequestsList = overview?.companyRequests || [];
  const stats = overview?.stats || collegeData?.stats || {
    totalStudents: 1240,
    verifiedStudents: 1080,
    pendingVerification: 160,
    companiesCount: 48,
    placementDrivesCount: 16,
    placedStudents: 892,
    placementRate: 86
  };
  const placementTrend = overview?.placementTrend || collegeData?.placementTrend || [
    { month: "Jan", rate: 35 },
    { month: "Feb", rate: 48 },
    { month: "Mar", rate: 62 },
    { month: "Apr", rate: 71 },
    { month: "May", rate: 79 },
    { month: "Jun", rate: 86 }
  ];
  const topCompanies = overview?.topCompanies || collegeData?.topCompanies || [];
  const branchWiseStats = overview?.branchWiseStats || collegeData?.branchWiseStats || [];
  const aiInsights = overview?.aiInsights || collegeData?.aiInsights || [];
  const packageStats = overview?.packageStats || collegeData?.packageStats || {
    highestPackage: "44.0 LPA",
    averagePackage: "7.8 LPA",
    medianPackage: "6.5 LPA",
    topOffersCount: 68
  };

  // Login form state
  const [loginForm, setLoginForm] = useState({
    collegeName: overview?.name || 'Apex Institute of Technology & Engineering',
    email: overview?.officialEmail || 'tpo@apexinstitute.ac.in',
    password: '••••••••••••',
    verificationDoc: 'aicte_approval_letter_2026.pdf'
  });

  // Search & Filter state
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState(null);
  const [selectedVerificationStudentModal, setSelectedVerificationStudentModal] = useState(null);
  const [selectedCompanyRequestModal, setSelectedCompanyRequestModal] = useState(null);
  const [idCardZoom, setIdCardZoom] = useState(false);
  const [eligibilityStudentCheck, setEligibilityStudentCheck] = useState(students?.[0] || null);
  const [selectedDriveForEligibility, setSelectedDriveForEligibility] = useState(placementDrivesList?.[0] || null);

  // Helper to resolve complete student profile from a verification request
  const resolveStudentFromReq = (req) => {
    if (!req) return null;
    const found = students.find(s => s.id === req.studentId || s.name === req.studentName || s.enrollmentNo === req.enrollmentNo);
    const base = found || {};
    return {
      id: base.id || req.studentId || "std-005",
      name: base.name || req.studentName || "Student",
      enrollmentNo: base.enrollmentNo || req.enrollmentNo || "EN2022CS000",
      branch: base.branch || req.branch || "Computer Science & Engineering",
      degree: base.degree || `B.Tech ${base.branch || req.branch || "Computer Science & Engineering"}`,
      college: base.college || overview?.name || "Apex Institute of Technology & Engineering",
      year: base.year || req.year || "4th Year (2022-2026)",
      cgpa: base.cgpa || req.cgpa || 7.5,
      backlogs: base.backlogs ?? 0,
      avatar: base.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      email: base.email || `${(req.studentName || 'student').toLowerCase().replace(/\s+/g, '.')}@campus.edu`,
      phone: base.phone || "+91 98765 43210",
      aiReadinessScore: base.aiReadinessScore || 70,
      targetRole: base.targetRole || "Graduate Trainee Engineer",
      skills: base.skills && base.skills.length ? base.skills : [
        { name: "Technical Coursework", status: "verified", score: 80 },
        { name: "Problem Solving", status: "needs_assessment", score: 65 }
      ],
      projects: base.projects || [],
      certificates: base.certificates || [],
      internships: base.internships || [],
      resume: base.resume || {
        fileName: `${(req.studentName || 'Student').replace(/\s+/g, '_')}_Resume.pdf`,
        atsScore: 78
      },
      verificationReq: req,
      idCardImage: req.idCardImage || base.idCardImage || "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=500&auto=format&fit=crop&q=80"
    };
  };

  // Helper to resolve complete company profile from a partnership request
  const resolveCompanyFromReq = (req) => {
    if (!req) return null;
    return {
      ...req,
      company: req.company || "Corporate Partner",
      role: req.role || "Software Engineer",
      package: req.package || "₹8.5 - 14 LPA",
      locations: req.locations || [req.location || "Bengaluru / Hyderabad"],
      officialRecruiter: req.officialRecruiter || "Corporate Talent Team",
      recruiterEmail: req.recruiterEmail || `campus.hiring@${req.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      recruiterPhone: req.recruiterPhone || "+91 80 4123 9000",
      recruiterDesignation: req.recruiterDesignation || "University Relations & Campus ATS Lead",
      industry: req.industry || "Information Technology & Enterprise Cloud Consulting",
      headquarters: req.headquarters || "Bengaluru / Gurugram Technology Center",
      website: req.website || `https://${req.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      openPositions: req.openPositions || 30,
      description: req.description || `Build scalable microservices and event-driven data pipelines for enterprise clients with comprehensive onboard training.`,
      selectionProcess: req.selectionProcess || [
        "Round 1: Proctored Online Coding Assessment (DSA & CS Fundamentals)",
        "Round 2: Technical Interview (System Architecture & Live Problem Solving)",
        "Round 3: Behavioral & Cultural Fitment Evaluation"
      ],
      eligibility: req.eligibility || {
        minCgpa: req.minCgpa || 7.0,
        branches: req.branches || ["Computer Science & Engineering", "Information Technology", "Electronics & Comm"],
        allowedBacklogs: req.allowedBacklogs ?? 0,
        academicYear: "2026"
      },
      requiredSkills: req.requiredSkills || ["Java", "SQL", "Problem Solving", "Git"],
      requestedDriveDate: req.requestedDriveDate || "2026-10-15"
    };
  };

  // Create Drive Modal state
  const [isCreateDriveOpen, setIsCreateDriveOpen] = useState(false);
  const [driveForm, setDriveForm] = useState({
    company: '',
    role: '',
    package: '₹8.5 - 14 LPA',
    location: 'Campus Auditorium / Online',
    minCgpa: 7.5,
    branches: ['Computer Science & Engineering', 'Information Technology'],
    allowedBacklogs: 0,
    openPositions: 30,
    deadline: '2026-10-15',
    testDate: '2026-10-18',
    interviewDate: '2026-10-25'
  });

  // Action Handlers
  const handleStudentVerification = async (reqId, action) => {
    if (onProcessStudentVerification) {
      await onProcessStudentVerification(reqId, action);
    }
    confetti({ particleCount: 50, spread: 50 });
    alert(`Student verification request ${action === 'accept' ? 'ACCEPTED (Student is now College Verified)' : 'REJECTED'}`);
  };

  const handleCompanyRequestAction = async (reqId, action) => {
    if (onProcessCompanyRequest) {
      await onProcessCompanyRequest(reqId, action);
    }
    if (action === 'approve') {
      confetti({ particleCount: 70, spread: 60 });
      alert("Company hiring request APPROVED! This job is now published to Student College Placements.");
    } else {
      alert("Company hiring request rejected.");
    }
  };

  const handleCreateDriveSubmit = async (e) => {
    e.preventDefault();
    if (!driveForm.company || !driveForm.role) return alert("Please fill company and role");
    if (onCreateDrive) {
      await onCreateDrive(driveForm);
    }
    setIsCreateDriveOpen(false);
    confetti({ particleCount: 60, spread: 50 });
    alert("Placement Drive created and published directly to students!");
  };

  // Eligibility evaluation helper
  const evaluateEligibility = (std, drive) => {
    if (!std || !drive) return { eligible: false, reasons: ["Please select both a student and a placement drive"] };
    const reasons = [];

    const minCgpa = drive.eligibility?.minCgpa || drive.minCgpa || 7.0;
    if ((std.cgpa || 0) < minCgpa) {
      reasons.push(`CGPA is ${std.cgpa}, but required is ${minCgpa}`);
    }

    const maxBacklogs = drive.eligibility?.allowedBacklogs !== undefined ? drive.eligibility.allowedBacklogs : (drive.allowedBacklogs !== undefined ? drive.allowedBacklogs : 0);
    if ((std.backlogs || 0) > maxBacklogs) {
      reasons.push(`Student has ${std.backlogs} backlog(s), maximum allowed is ${maxBacklogs}`);
    }

    const branchesList = drive.eligibility?.branches || drive.branches || [];
    if (branchesList.length > 0) {
      const branchAllowed = branchesList.some(b => 
        (std.branch || '').toLowerCase().includes(b.toLowerCase()) || b === 'All'
      );
      if (!branchAllowed) {
        reasons.push(`Branch '${std.branch}' not in eligible branches: ${branchesList.join(', ')}`);
      }
    }

    return {
      eligible: reasons.length === 0,
      reasons
    };
  };

  // Filter students
  const filteredStudents = (students || []).filter(s => 
    (s.name || '').toLowerCase().includes(studentSearch.toLowerCase()) ||
    (s.enrollmentNo || '').toLowerCase().includes(studentSearch.toLowerCase()) ||
    (s.branch || '').toLowerCase().includes(studentSearch.toLowerCase())
  );

  const placedStudentsList = (students || []).filter(s => s.placementStatus && s.placementStatus.includes('Placed'));

  // -------------------------------------------------------------
  // 1. COLLEGE LOGIN SCREEN (If logged out)
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-8 space-y-6 animate-scale-in">
          <div className="text-center space-y-2">
            <div className="h-14 w-14 rounded-2xl bg-[#4338ca] mx-auto flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Building2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">College TPO Portal Login</h2>
            <p className="text-xs text-slate-500">Placement Management & Corporate Relations SaaS</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Institution / College Name</label>
              <input 
                type="text" 
                value={loginForm.collegeName}
                onChange={(e) => setLoginForm({ ...loginForm, collegeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official TPO Email</label>
              <input 
                type="email" 
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                required
              />
            </div>

            <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-indigo-950 text-[11px]">AICTE / UGC Accreditation Doc</p>
                <p className="text-[10px] text-slate-500">{loginForm.verificationDoc}</p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                ✓ Validated
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition"
            >
              Sign In to Placement Dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN COLLEGE PORTAL
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-sm">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900">{overview?.name || "Apex Institute of Technology"}</h2>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                {overview?.code || "APEX-TPO-09"}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Training & Placement Cell • Head: <strong className="text-slate-800">{overview?.tpoHead || "Dr. Arvind Subramanian"}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsCreateDriveOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>+ Create Placement Drive</span>
          </button>
          
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Dark Navy / Indigo Sidebar */}
        <aside className="lg:col-span-3">
          <div className="bg-[#0b132b] text-slate-300 rounded-3xl p-3.5 sticky top-20 space-y-1 shadow-xl">
            <div className="p-3 bg-white/10 rounded-2xl mb-3 flex items-center gap-2.5">
              <Building2 className="h-5 w-5 text-indigo-400" />
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">Placement Admin</h4>
                <p className="text-[10px] text-slate-400">Enterprise SaaS</p>
              </div>
            </div>

            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'profile', label: 'College Profile', icon: Building2 },
              { id: 'verification', label: 'Student Verification', icon: ShieldCheck, count: pendingVerificationList.filter(r => r.status === 'pending').length },
              { id: 'students', label: 'Enrolled Students', icon: Users, count: students.length },
              { id: 'company_requests', label: 'Company Requests', icon: Briefcase, count: companyRequestsList.filter(r => r.status === 'pending').length, alert: true },
              { id: 'drives', label: 'Placement Drives', icon: Calendar, count: placementDrivesList.length },
              { id: 'applications', label: 'Applications ATS', icon: FileText, count: applications.length },
              { id: 'results', label: 'Placement Results', icon: Award, count: `${stats?.placedStudents || 892} Placed` },
              { id: 'analytics', label: 'Placement Analytics', icon: BarChart3 },
              { id: 'insights', label: 'AI Placement Insights', icon: Sparkles, highlight: true }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                      : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : item.alert ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 space-y-6">

          {/* ============================================================ */}
          {/* TAB 1: DASHBOARD (KPI Cards + Overview)                      */}
          {/* ============================================================ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* 7 KPI CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Total Students</p>
                  <p className="text-xl font-black text-slate-900 mt-1">{stats?.totalStudents || 1240}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Verified Students</p>
                  <p className="text-xl font-black text-emerald-600 mt-1">{stats?.verifiedStudents || 1080}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Pending Verify</p>
                  <p className="text-xl font-black text-amber-600 mt-1">{stats?.pendingVerification || 160}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Companies</p>
                  <p className="text-xl font-black text-blue-600 mt-1">{stats?.companiesCount || 48}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Placement Drives</p>
                  <p className="text-xl font-black text-indigo-600 mt-1">{placementDrivesList.length || 16}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Placed Students</p>
                  <p className="text-xl font-black text-purple-600 mt-1">{stats?.placedStudents || 892}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Placement Rate</p>
                  <p className="text-xl font-black text-sky-600 mt-1">{stats?.placementRate || 86}%</p>
                </div>
              </div>

              {/* Placement Trend Chart & Top Companies */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Batch Placement Growth Curve</h4>
                  <p className="text-xs text-slate-500 mb-4">Monthly placement rate progression (Jan - Jun)</p>
                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={placementTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[20, 100]} unit="%" />
                        <Tooltip />
                        <Line type="monotone" dataKey="rate" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Top Recruiting Partners</h4>
                  <div className="space-y-2">
                    {(topCompanies.length > 0 ? topCompanies : [
                      { name: "TCS", offers: 28, logo: "🏢", avgPackage: "7.5 LPA" },
                      { name: "Infosys", offers: 24, logo: "💼", avgPackage: "6.8 LPA" },
                      { name: "Accenture", offers: 18, logo: "🚀", avgPackage: "9.2 LPA" },
                      { name: "Wipro", offers: 12, logo: "⚡", avgPackage: "6.5 LPA" }
                    ]).map(c => (
                      <div key={c.name} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{c.logo}</span>
                          <div>
                            <p className="font-bold text-slate-900">{c.name}</p>
                            <span className="text-[10px] text-slate-500">{c.avgPackage}</span>
                          </div>
                        </div>
                        <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg">
                          {c.offers} Offers
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: PROFILE                                               */}
          {/* ============================================================ */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <h3 className="text-lg font-black text-slate-900">Institution & TPO Cell Profile</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900">Institution Details</h4>
                  <p><span className="text-slate-400">Name:</span> <strong>{overview?.name}</strong></p>
                  <p><span className="text-slate-400">Code:</span> <strong>{overview?.code}</strong></p>
                  <p><span className="text-slate-400">Address:</span> <strong>{overview?.address}</strong></p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900">Placement Coordination Contact</h4>
                  <p><span className="text-slate-400">Head of TPO:</span> <strong>{overview?.tpoHead}</strong></p>
                  <p><span className="text-slate-400">Official Email:</span> <strong>{overview?.officialEmail}</strong></p>
                  <p><span className="text-slate-400">Phone:</span> <strong>{overview?.phone}</strong></p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: STUDENT VERIFICATION                                  */}
          {/* ============================================================ */}
          {activeTab === 'verification' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-slate-900">Student ID Verification Desk</h3>
                <p className="text-xs text-slate-500">
                  Review student ID documents. Accepted students automatically become <strong>College Verified</strong>.
                </p>
              </div>

              <div className="space-y-3">
                {pendingVerificationList.length === 0 ? (
                  <p className="text-xs text-slate-400">No pending student verification requests.</p>
                ) : (
                  pendingVerificationList.map(req => {
                    const studentObj = resolveStudentFromReq(req);
                    return (
                      <div key={req.id} className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50/40 hover:bg-white transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs shadow-2xs">
                        <div className="flex items-center gap-3.5">
                          <div 
                            className="relative cursor-pointer group"
                            onClick={() => setSelectedVerificationStudentModal(studentObj)}
                            title="Click to inspect ID Card Document"
                          >
                            <img src={req.idCardImage} alt="ID" className="h-14 w-20 object-cover rounded-xl border border-slate-200 shadow-2xs group-hover:scale-105 transition" />
                            <span className="absolute inset-0 bg-slate-900/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition font-bold text-[10px] gap-1">
                              <Eye className="h-3.5 w-3.5" /> View
                            </span>
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 
                                onClick={() => setSelectedVerificationStudentModal(studentObj)}
                                className="font-extrabold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer transition"
                              >
                                {req.studentName}
                              </h4>
                              <span className="px-2 py-0.2 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-200">
                                {studentObj.cgpa} CGPA
                              </span>
                              <span className="px-2 py-0.2 rounded-md bg-slate-100 text-slate-600 font-medium text-[10px]">
                                {studentObj.backlogs === 0 ? "0 Backlogs" : `${studentObj.backlogs} Backlog`}
                              </span>
                            </div>
                            <p className="text-slate-500 font-medium text-[11px] mt-0.5">
                              Enrollment: <strong className="text-slate-700">{req.enrollmentNo}</strong> • {req.branch} ({req.year})
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                req.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : req.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                Verification: {req.status}
                              </span>
                              <span className="text-slate-400 text-[10px]">Submitted: {req.submittedDate || 'Recent'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          {/* View Profile Button */}
                          <button
                            onClick={() => setSelectedVerificationStudentModal(studentObj)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition flex items-center gap-1.5 text-[11px] shadow-2xs"
                            title="View student complete profile, CGPA, and ID proof"
                          >
                            <Eye className="h-3.5 w-3.5 text-indigo-400" />
                            <span>View Profile & ID Proof</span>
                          </button>

                          {req.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStudentVerification(req.id, 'reject')}
                                className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold transition text-[11px]"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => handleStudentVerification(req.id, 'accept')}
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xs text-[11px]"
                              >
                                Accept & Verify
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: ENROLLED STUDENTS DIRECTORY                           */}
          {/* ============================================================ */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Enrolled Students Database</h3>
                  <p className="text-xs text-slate-500">Search and view comprehensive candidate portfolios</p>
                </div>

                <div className="relative">
                  <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
                  <input 
                    type="text" 
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by name, enrollment, branch..."
                    className="pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium w-64 outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="py-2.5 px-3">Student</th>
                      <th className="py-2.5 px-3">Branch & CGPA</th>
                      <th className="py-2.5 px-3">Verification</th>
                      <th className="py-2.5 px-3">AI Readiness</th>
                      <th className="py-2.5 px-3">Placement Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 flex items-center gap-2.5">
                          <img src={s.avatar} alt={s.name} className="h-8 w-8 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-slate-900">{s.name}</p>
                            <p className="text-[10px] text-slate-400">{s.enrollmentNo}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <p className="text-slate-800">{s.branch}</p>
                          <p className="text-[10px] text-slate-500 font-bold">CGPA {s.cgpa} • {s.backlogs || 0} backlogs</p>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.collegeVerificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {s.collegeVerificationStatus === 'verified' ? '✓ Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {s.aiReadinessScore}/100
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-slate-700 font-semibold">{s.placementStatus}</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setSelectedStudentForModal(s)}
                            className="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 text-[11px] font-bold"
                          >
                            View Portfolio
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 5: COMPANY REQUESTS (Approval Pipeline)                  */}
          {/* ============================================================ */}
          {activeTab === 'company_requests' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-slate-900">Corporate Partnership & Drive Requests</h3>
                <p className="text-xs text-slate-500">
                  Companies requesting to conduct campus drives. Approved drives appear in <strong>Student College Placements</strong>.
                </p>
              </div>

              <div className="space-y-4">
                {companyRequestsList.map(req => {
                  const isApproved = req.status === 'approved';
                  const companyObj = resolveCompanyFromReq(req);
                  return (
                    <div key={req.id} className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50/50 hover:bg-white transition flex flex-col justify-between text-xs space-y-3 shadow-2xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="cursor-pointer group relative"
                            onClick={() => setSelectedCompanyRequestModal(companyObj)}
                            title="Click to view company profile"
                          >
                            <img src={req.companyLogo} alt={req.company} className="h-11 w-11 rounded-xl object-contain bg-white p-1 border shadow-2xs group-hover:scale-105 transition" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 
                                onClick={() => setSelectedCompanyRequestModal(companyObj)}
                                className="font-extrabold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer transition flex items-center gap-1.5"
                              >
                                <span>{req.role}</span>
                              </h4>
                              <span className="px-2 py-0.2 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-200">
                                {companyObj.package}
                              </span>
                            </div>
                            <p className="text-slate-500 font-semibold text-[11px] mt-0.5">
                              {req.company} • <span className="text-slate-600">Recruiter: {req.officialRecruiter}</span>
                            </p>
                          </div>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold self-start sm:self-center ${
                          isApproved ? 'bg-emerald-100 text-emerald-800' : req.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isApproved ? 'Approved by TPO' : req.status === 'rejected' ? 'Rejected' : 'Pending Review'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-white rounded-xl border border-slate-100">
                        <div><span className="text-slate-400 block text-[10px]">Package</span><strong className="text-slate-900">{req.package}</strong></div>
                        <div><span className="text-slate-400 block text-[10px]">Min CGPA Cutoff</span><strong className="text-indigo-700">{req.eligibility?.minCgpa || 7.0} CGPA</strong></div>
                        <div><span className="text-slate-400 block text-[10px]">Eligible Branches</span><strong className="text-slate-900">{(req.eligibility?.branches || ['All']).join(', ')}</strong></div>
                        <div><span className="text-slate-400 block text-[10px]">Requested Date</span><strong className="text-slate-900">{req.requestedDriveDate}</strong></div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200/80">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedCompanyRequestModal(companyObj)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition flex items-center gap-1.5 text-[11px] shadow-2xs"
                            title="View company profile, recruiter verification, and drive proposal"
                          >
                            <Eye className="h-3.5 w-3.5 text-indigo-400" />
                            <span>View Company Profile & Drive Proposal</span>
                          </button>
                        </div>

                        {req.status === 'pending' && (
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => handleCompanyRequestAction(req.id, 'reject')}
                              className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold transition text-[11px]"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleCompanyRequestAction(req.id, 'approve')}
                              className="px-4 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold shadow-xs transition text-[11px]"
                            >
                              Approve & Publish to College Placements →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 6: PLACEMENT DRIVES & AUTOMATIC ELIGIBILITY CHECKER      */}
          {/* ============================================================ */}
          {activeTab === 'drives' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Placement Drives & Automatic Eligibility Checker</h3>
                  <p className="text-xs text-slate-500">Evaluates CGPA, Branch, Year, Backlogs & Skill criteria</p>
                </div>
                <button
                  onClick={() => setIsCreateDriveOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-700 text-white text-xs font-bold"
                >
                  + Add Drive
                </button>
              </div>

              {/* AUTOMATIC ELIGIBILITY ENGINE WIDGET */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-indigo-900 font-bold">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span>Automatic Eligibility Test Simulation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select Student</label>
                    <select 
                      value={eligibilityStudentCheck?.id || ''} 
                      onChange={(e) => setEligibilityStudentCheck(students.find(s => s.id === e.target.value) || null)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                    >
                      {students.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.branch}, CGPA {s.cgpa}, {s.backlogs || 0} backlogs)</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select Drive</label>
                    <select 
                      value={selectedDriveForEligibility?.id || ''} 
                      onChange={(e) => setSelectedDriveForEligibility(placementDrivesList.find(d => d.id === e.target.value) || null)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                    >
                      {placementDrivesList.map(d => (
                        <option key={d.id} value={d.id}>{d.company} — {d.role} (Min CGPA: {d.eligibility?.minCgpa || d.minCgpa || 7.0})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Eligibility Result Display */}
                {(() => {
                  const evalResult = evaluateEligibility(eligibilityStudentCheck, selectedDriveForEligibility);
                  return (
                    <div className={`p-3 rounded-xl border ${
                      evalResult.eligible ? 'bg-emerald-100 border-emerald-300 text-emerald-950' : 'bg-rose-100 border-rose-300 text-rose-950'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-sm">
                        {evalResult.eligible ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <XCircle className="h-5 w-5 text-rose-700" />}
                        <span>{evalResult.eligible ? 'ELIGIBLE for this Drive' : 'NOT ELIGIBLE for this Drive'}</span>
                      </div>
                      {!evalResult.eligible && (
                        <ul className="list-disc list-inside mt-1.5 text-xs text-rose-900 space-y-0.5">
                          {evalResult.reasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Drives Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                      <th className="py-2.5 px-3">Company & Role</th>
                      <th className="py-2.5 px-3">Package</th>
                      <th className="py-2.5 px-3">Eligibility Criteria</th>
                      <th className="py-2.5 px-3">Key Dates</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {placementDrivesList.map(d => (
                      <tr key={d.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-900">{d.company}</p>
                          <p className="text-slate-500">{d.role}</p>
                        </td>
                        <td className="py-3 px-3 font-bold text-indigo-700">{d.package}</td>
                        <td className="py-3 px-3 text-slate-700">
                          CGPA &gt;= {d.eligibility?.minCgpa || d.minCgpa || 7.0}, {d.eligibility?.allowedBacklogs || d.allowedBacklogs || 0} backlogs
                        </td>
                        <td className="py-3 px-3 text-slate-500">
                          Deadline: {d.deadline} • Test: {d.testDate}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 7: APPLICATIONS TRACKING (ATS)                           */}
          {/* ============================================================ */}
          {activeTab === 'applications' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 animate-fade-in">
              <div>
                <h3 className="text-lg font-black text-slate-900">Student Placement Applications Pipeline</h3>
                <p className="text-xs text-slate-500">Applied → Under Review → Shortlisted → Interview → Selected / Rejected</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="py-2.5 px-3">Student</th>
                      <th className="py-2.5 px-3">Drive Role</th>
                      <th className="py-2.5 px-3">Match %</th>
                      <th className="py-2.5 px-3">Current Stage</th>
                      <th className="py-2.5 px-3">Interview / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-bold text-slate-900">{app.studentName}</td>
                        <td className="py-3 px-3 text-slate-700">{app.jobTitle} @ {app.company}</td>
                        <td className="py-3 px-3 font-black text-blue-600">{app.aiScore}%</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {app.currentStage || app.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">
                          {app.interviewDate || app.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 8: PLACEMENT RESULTS                                     */}
          {/* ============================================================ */}
          {activeTab === 'results' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Final Placement Results (2026 Batch)</h3>
                  <p className="text-xs text-slate-500">Official offers rolled out & confirmed placements</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {stats?.placedStudents || 892} Students Placed
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Branch</th>
                      <th className="py-2.5 px-3">Recruiting Company</th>
                      <th className="py-2.5 px-3">Offered Package</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900">Neha Gupta</td>
                      <td className="py-3 px-3 text-slate-600">Computer Science & Engineering</td>
                      <td className="py-3 px-3 font-bold text-slate-800">TCS Digital</td>
                      <td className="py-3 px-3 font-black text-emerald-700">₹9.0 LPA</td>
                      <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Offer Accepted</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900">Kavita Reddy</td>
                      <td className="py-3 px-3 text-slate-600">Information Technology</td>
                      <td className="py-3 px-3 font-bold text-slate-800">Infosys Specialist</td>
                      <td className="py-3 px-3 font-black text-emerald-700">₹9.5 LPA</td>
                      <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Offer Accepted</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900">Rohan Das</td>
                      <td className="py-3 px-3 text-slate-600">Computer Science & Engineering</td>
                      <td className="py-3 px-3 font-bold text-slate-800">Accenture Advance</td>
                      <td className="py-3 px-3 font-black text-emerald-700">₹14.0 LPA</td>
                      <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Offer Accepted</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 9: ANALYTICS (Placement Rate, Branch, Packages)          */}
          {/* ============================================================ */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <h3 className="text-lg font-black text-slate-900">Placement Analytics & Package Statistics</h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block">Highest Package</span>
                  <strong className="text-base font-black text-indigo-700">{packageStats?.highestPackage || "44.0 LPA"}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block">Average Package</span>
                  <strong className="text-base font-black text-slate-900">{packageStats?.averagePackage || "7.8 LPA"}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block">Median Package</span>
                  <strong className="text-base font-black text-slate-900">{packageStats?.medianPackage || "6.5 LPA"}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border">
                  <span className="text-slate-400 font-bold block">Dream Offers (&gt;=12 LPA)</span>
                  <strong className="text-base font-black text-emerald-600">{packageStats?.topOffersCount || 68} Offers</strong>
                </div>
              </div>

              {/* Branch-wise placement bar chart */}
              <div className="p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 mb-3">Branch-Wise Placement Percentage</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={branchWiseStats.length > 0 ? branchWiseStats : [
                      { branch: "CSE", rate: 94 },
                      { branch: "IT", rate: 91 },
                      { branch: "ECE", rate: 76 },
                      { branch: "ME", rate: 61 },
                      { branch: "CE", rate: 51 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="branch" stroke="#94a3b8" fontSize={9} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[0, 100]} unit="%" />
                      <Tooltip />
                      <Bar dataKey="rate" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 10: AI INSIGHTS                                          */}
          {/* ============================================================ */}
          {activeTab === 'insights' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <div>
                  <h3 className="text-lg font-black text-slate-900">AI Intelligent Placement Insights</h3>
                  <p className="text-xs text-slate-500">Automated cohort diagnostics and recommended remedial workshops</p>
                </div>
              </div>

              <div className="space-y-4">
                {(aiInsights.length > 0 ? aiInsights : [
                  {
                    id: "ai-1",
                    title: "Spring Boot Deficiency Alert in CSE",
                    highlight: "38% of eligible CSE students are missing Spring Boot.",
                    detail: "Accenture, Cognizant, and Wipro drives list Spring Boot as an essential requirement.",
                    suggestedAction: "Organize an intensive 3-day weekend bootcamp on Spring Boot 3 & REST APIs.",
                    affectedStudentsCount: 128,
                    urgency: "High"
                  }
                ]).map(insight => (
                  <div key={insight.id} className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/20 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-indigo-950">{insight.title}</h4>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                        {insight.urgency} Urgency
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-indigo-100 font-bold text-indigo-900 text-xs">
                      ⚡ {insight.highlight}
                    </div>

                    <p className="text-slate-600">{insight.detail}</p>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-indigo-100">
                      <span className="text-slate-500">
                        Affected Students: <strong className="text-slate-900">{insight.affectedStudentsCount} Candidates</strong>
                      </span>
                      <button 
                        onClick={() => alert(`Workshop scheduled: "${insight.suggestedAction}". Notification dispatched to ${insight.affectedStudentsCount} students!`)}
                        className="px-4 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-[11px] shadow-xs"
                      >
                        Schedule Suggested Workshop →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CREATE PLACEMENT DRIVE MODAL */}
      {isCreateDriveOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-scale-in text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Create Campus Placement Drive</h3>
              <button onClick={() => setIsCreateDriveOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateDriveSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={driveForm.company}
                  onChange={(e) => setDriveForm({ ...driveForm, company: e.target.value })}
                  placeholder="e.g. Microsoft, Google, Infosys"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Title</label>
                <input 
                  type="text" 
                  value={driveForm.role}
                  onChange={(e) => setDriveForm({ ...driveForm, role: e.target.value })}
                  placeholder="e.g. Software Development Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Offered Package</label>
                  <input 
                    type="text" 
                    value={driveForm.package}
                    onChange={(e) => setDriveForm({ ...driveForm, package: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Minimum CGPA Criteria</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={driveForm.minCgpa}
                    onChange={(e) => setDriveForm({ ...driveForm, minCgpa: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Deadline</label>
                  <input 
                    type="date" 
                    value={driveForm.deadline}
                    onChange={(e) => setDriveForm({ ...driveForm, deadline: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-xl border border-slate-300 text-[11px]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Test Date</label>
                  <input 
                    type="date" 
                    value={driveForm.testDate}
                    onChange={(e) => setDriveForm({ ...driveForm, testDate: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-xl border border-slate-300 text-[11px]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Interview Date</label>
                  <input 
                    type="date" 
                    value={driveForm.interviewDate}
                    onChange={(e) => setDriveForm({ ...driveForm, interviewDate: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-xl border border-slate-300 text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsCreateDriveOpen(false)} className="px-3.5 py-1.5 rounded-xl border border-slate-300 font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold transition shadow-xs">
                  Publish Drive to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. STUDENT IDENTITY & ACADEMIC RECORD VERIFICATION MODAL      */}
      {/* ============================================================ */}
      {selectedVerificationStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full my-auto overflow-hidden animate-scale-in text-xs flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
              <button 
                onClick={() => setSelectedVerificationStudentModal(null)} 
                className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition font-bold"
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedVerificationStudentModal.avatar} 
                    alt={selectedVerificationStudentModal.name} 
                    className="h-16 w-16 rounded-2xl object-cover ring-4 ring-indigo-500/40 shadow-lg" 
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-black text-white">{selectedVerificationStudentModal.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedVerificationStudentModal.verificationReq?.status === 'accepted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : selectedVerificationStudentModal.verificationReq?.status === 'rejected'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        Status: {selectedVerificationStudentModal.verificationReq?.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>
                    <p className="text-indigo-200 text-xs mt-0.5 font-semibold">
                      {selectedVerificationStudentModal.degree || selectedVerificationStudentModal.branch}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Enrollment No: <strong className="text-white font-mono">{selectedVerificationStudentModal.enrollmentNo}</strong> • {selectedVerificationStudentModal.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <div>
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Academic Record</span>
                    <span className="text-xl font-black text-emerald-400">{selectedVerificationStudentModal.cgpa}</span>
                    <span className="text-xs text-slate-300 font-semibold"> / 10.0 CGPA</span>
                  </div>
                  <div className="border-l border-white/10 pl-3">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Backlogs</span>
                    <span className={`text-xs font-bold ${
                      selectedVerificationStudentModal.backlogs === 0 ? 'text-emerald-300' : 'text-amber-300'
                    }`}>
                      {selectedVerificationStudentModal.backlogs === 0 ? "0 Active" : `${selectedVerificationStudentModal.backlogs} Active`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 bg-slate-50/50 flex-1">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Column: Official College ID Card Preview */}
                <div className="md:col-span-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-indigo-600" />
                      <span>Uploaded College ID Proof</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">Click image to inspect</span>
                  </div>

                  <div 
                    onClick={() => setIdCardZoom(true)}
                    className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-900 shadow-md cursor-pointer hover:border-indigo-500 transition"
                  >
                    <img 
                      src={selectedVerificationStudentModal.idCardImage} 
                      alt="College ID" 
                      className="w-full h-56 object-cover group-hover:scale-105 transition duration-300 opacity-90 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                      <p className="text-white text-xs font-bold flex items-center gap-1.5">
                        <Eye className="h-4 w-4" /> Click for High-Res Lightbox View
                      </p>
                    </div>
                  </div>

                  {/* Verification Match Checklist */}
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <span className="font-extrabold text-slate-900 text-[11px] block">TPO Verification Checklist:</span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Student Name matches institutional rolls: <strong>{selectedVerificationStudentModal.name}</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Enrollment ID valid in ERP: <strong>{selectedVerificationStudentModal.enrollmentNo}</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Department: <strong>{selectedVerificationStudentModal.branch}</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Academic Cohort: <strong>{selectedVerificationStudentModal.year} (Active)</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Complete Academic & Skill Profile */}
                <div className="md:col-span-6 space-y-4">
                  
                  {/* Contact & Student Info Card */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Candidate Credentials</h4>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Official Campus Email</span>
                        <strong className="text-slate-800">{selectedVerificationStudentModal.email}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Contact Phone</span>
                        <strong className="text-slate-800">{selectedVerificationStudentModal.phone}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Target Career Path</span>
                        <strong className="text-slate-800">{selectedVerificationStudentModal.targetRole}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">AI Readiness Score</span>
                        <strong className="text-blue-600">{selectedVerificationStudentModal.aiReadinessScore}/100</strong>
                      </div>
                    </div>
                  </div>

                  {/* Skills Assessment Matrix */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Verified Technical Skills</h4>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        {selectedVerificationStudentModal.skills?.length || 0} Skills Evaluated
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {selectedVerificationStudentModal.skills?.map(sk => (
                        <span key={sk.name} className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                          ✓ {sk.name} ({sk.score}%)
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  {selectedVerificationStudentModal.projects && selectedVerificationStudentModal.projects.length > 0 && (
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                      <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Engineering Projects</h4>
                      {selectedVerificationStudentModal.projects.map(p => (
                        <div key={p.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900">{p.title}</strong>
                            <span className="text-[9px] text-slate-500 font-bold">{p.tech?.join(', ')}</span>
                          </div>
                          <p className="text-slate-600 text-[10px] line-clamp-2">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Resume Document Link */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <span className="font-bold text-slate-900 text-[11px] block">
                          {selectedVerificationStudentModal.resume?.fileName || `${selectedVerificationStudentModal.name.replace(' ', '_')}_Resume.pdf`}
                        </span>
                        <span className="text-[10px] text-slate-400">ATS Readiness Verified</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Reviewing resume for ${selectedVerificationStudentModal.name}`)}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition text-[10px]"
                    >
                      Inspect Resume
                    </button>
                  </div>

                </div>

              </div>

            </div>

            {/* Action Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px]">Verification Request:</span>
                <strong className="text-slate-900">{selectedVerificationStudentModal.name}</strong>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-700 font-black">{selectedVerificationStudentModal.cgpa} CGPA</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedVerificationStudentModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition"
                >
                  Close
                </button>

                {selectedVerificationStudentModal.verificationReq?.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleStudentVerification(selectedVerificationStudentModal.verificationReq.id, 'reject');
                        setSelectedVerificationStudentModal(null);
                      }}
                      className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold transition"
                    >
                      Reject Request
                    </button>

                    <button
                      onClick={() => {
                        handleStudentVerification(selectedVerificationStudentModal.verificationReq.id, 'accept');
                        setSelectedVerificationStudentModal(null);
                      }}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black transition shadow-md flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Accept & Verify Student</span>
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. CORPORATE PARTNER PROFILE & DRIVE PROPOSAL MODAL          */}
      {/* ============================================================ */}
      {selectedCompanyRequestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full my-auto overflow-hidden animate-scale-in text-xs flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
              <button 
                onClick={() => setSelectedCompanyRequestModal(null)} 
                className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition font-bold"
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-white p-2 border shadow-lg flex items-center justify-center">
                    <img 
                      src={selectedCompanyRequestModal.companyLogo} 
                      alt={selectedCompanyRequestModal.company} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-black text-white">{selectedCompanyRequestModal.company}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Corporate Entity Verified
                      </span>
                    </div>
                    <p className="text-indigo-200 text-xs mt-0.5 font-semibold">
                      {selectedCompanyRequestModal.industry}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Headquarters: <strong className="text-slate-200">{selectedCompanyRequestModal.headquarters}</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-right shrink-0">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Proposed Package</span>
                  <span className="text-xl font-black text-emerald-400">{selectedCompanyRequestModal.package}</span>
                  <span className="text-[10px] text-slate-300 block font-semibold mt-0.5">
                    Positions: {selectedCompanyRequestModal.openPositions} Vacancies
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 bg-slate-50/50 flex-1">
              
              {/* Recruiter & ATS Verification Section */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <span>Campus Recruitment Coordinator Details</span>
                  </h4>
                  {selectedCompanyRequestModal.website && (
                    <a 
                      href={selectedCompanyRequestModal.website}
                      target="_blank" 
                      rel="noreferrer"
                      className="text-indigo-600 font-bold hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>Official Company Portal</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Recruiter Name & Title</span>
                    <strong className="text-slate-800">{selectedCompanyRequestModal.officialRecruiter}</strong>
                    <p className="text-slate-500 text-[10px]">{selectedCompanyRequestModal.recruiterDesignation}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Official Corporate Email</span>
                    <strong className="text-slate-800">{selectedCompanyRequestModal.recruiterEmail}</strong>
                    <p className="text-emerald-700 text-[10px]">✓ Corporate Domain Verified</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Campus Liaison Phone</span>
                    <strong className="text-slate-800">{selectedCompanyRequestModal.recruiterPhone}</strong>
                    <p className="text-slate-500 text-[10px]">Mon - Fri (09:00 AM - 06:00 PM)</p>
                  </div>
                </div>
              </div>

              {/* Drive Proposal Specifications */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{selectedCompanyRequestModal.role}</h4>
                    <p className="text-slate-500 text-[11px]">Proposed On-Campus Placement Drive Specifications</p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-800 font-black border border-indigo-200 text-xs">
                    Package: {selectedCompanyRequestModal.package}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold">Minimum CGPA Cutoff</span>
                    <strong className="text-indigo-700 text-sm">{selectedCompanyRequestModal.eligibility?.minCgpa || 7.0} CGPA</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold">Eligible Branches</span>
                    <strong className="text-slate-800 text-xs">{(selectedCompanyRequestModal.eligibility?.branches || ['All']).join(', ')}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold">Allowed Backlogs</span>
                    <strong className="text-slate-800 text-xs">{selectedCompanyRequestModal.eligibility?.allowedBacklogs ?? 0} Active Backlogs</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold">Passing Cohort</span>
                    <strong className="text-slate-800 text-xs">{selectedCompanyRequestModal.eligibility?.academicYear || '2026 Batch'}</strong>
                  </div>
                </div>

                <div>
                  <strong className="block text-slate-800 mb-1">Job Role Description:</strong>
                  <p className="text-slate-600 leading-relaxed text-xs">{selectedCompanyRequestModal.description}</p>
                </div>

                {/* Required Skills */}
                <div>
                  <strong className="block text-slate-800 mb-1.5">Required Technical Stack & Skills:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCompanyRequestModal.requiredSkills?.map(sk => (
                      <span key={sk} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selection Timeline */}
                <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                  <strong className="font-extrabold text-indigo-950 block">Drive Timeline & Selection Rounds:</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    <div><span className="text-slate-500 block text-[10px]">Requested Date:</span><strong>{selectedCompanyRequestModal.requestedDriveDate}</strong></div>
                    <div><span className="text-slate-500 block text-[10px]">Work Locations:</span><strong>{selectedCompanyRequestModal.locations?.join(', ')}</strong></div>
                    <div><span className="text-slate-500 block text-[10px]">Rounds:</span><strong>{selectedCompanyRequestModal.selectionProcess?.length || 3} Evaluation Stages</strong></div>
                  </div>
                  <ul className="list-disc list-inside text-indigo-900 text-[10px] space-y-0.5 pt-1">
                    {selectedCompanyRequestModal.selectionProcess?.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

            {/* Action Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px]">Proposal:</span>
                <strong className="text-slate-900">{selectedCompanyRequestModal.company}</strong>
                <span className="text-slate-400">•</span>
                <span className="text-indigo-700 font-bold">{selectedCompanyRequestModal.role}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCompanyRequestModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition"
                >
                  Close
                </button>

                {selectedCompanyRequestModal.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleCompanyRequestAction(selectedCompanyRequestModal.id, 'reject');
                        setSelectedCompanyRequestModal(null);
                      }}
                      className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold transition"
                    >
                      Reject Request
                    </button>

                    <button
                      onClick={() => {
                        handleCompanyRequestAction(selectedCompanyRequestModal.id, 'approve');
                        setSelectedCompanyRequestModal(null);
                      }}
                      className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-black transition shadow-md flex items-center gap-1.5"
                    >
                      <span>Approve & Publish to College Placements →</span>
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. ENROLLED STUDENT PORTFOLIO INSPECTION MODAL               */}
      {/* ============================================================ */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full my-auto p-6 space-y-4 animate-scale-in text-xs max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={selectedStudentForModal.avatar} alt="Avatar" className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/30" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-sm text-slate-900">{selectedStudentForModal.name}</h4>
                    <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {selectedStudentForModal.collegeVerificationStatus === 'verified' ? '✓ College Verified' : 'Pending Verification'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">{selectedStudentForModal.enrollmentNo} • {selectedStudentForModal.degree || selectedStudentForModal.branch}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudentForModal(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div><span className="text-slate-400 block text-[10px]">Cumulative CGPA</span><strong className="text-indigo-700 text-xs">{selectedStudentForModal.cgpa} / 10.0</strong></div>
              <div><span className="text-slate-400 block text-[10px]">Active Backlogs</span><strong>{selectedStudentForModal.backlogs || 0} Backlogs</strong></div>
              <div><span className="text-slate-400 block text-[10px]">AI Readiness</span><strong className="text-blue-600">{selectedStudentForModal.aiReadinessScore}/100</strong></div>
              <div><span className="text-slate-400 block text-[10px]">Placement Status</span><strong>{selectedStudentForModal.placementStatus || "Available"}</strong></div>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <strong className="block text-slate-800 mb-1">Target Job Role:</strong>
                <p className="text-slate-600">{selectedStudentForModal.targetRole || "Software Developer"}</p>
              </div>

              <div>
                <strong className="block text-slate-800 mb-1.5">Verified Technical Skills:</strong>
                <div className="flex flex-wrap gap-1">
                  {selectedStudentForModal.skills?.map(sk => (
                    <span key={sk.name} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      ✓ {sk.name} ({sk.score}%)
                    </span>
                  ))}
                </div>
              </div>

              {selectedStudentForModal.projects && selectedStudentForModal.projects.length > 0 && (
                <div>
                  <strong className="block text-slate-800 mb-1.5">Projects:</strong>
                  <div className="space-y-1.5">
                    {selectedStudentForModal.projects.map(p => (
                      <div key={p.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px]">
                        <div className="flex justify-between items-center">
                          <strong className="text-slate-900">{p.title}</strong>
                          <span className="text-[10px] text-slate-500 font-semibold">{p.tech?.join(', ')}</span>
                        </div>
                        <p className="text-slate-600 text-[10px] mt-0.5">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <strong className="block text-slate-800 mb-1">ATS Resume File:</strong>
                <div className="p-2.5 bg-slate-50 rounded-xl border flex items-center justify-between">
                  <span className="font-semibold text-slate-700 text-[11px]">{selectedStudentForModal.resume?.fileName || `${selectedStudentForModal.name.replace(' ', '_')}_Resume.pdf`}</span>
                  <span className="text-blue-600 font-bold text-[10px] cursor-pointer hover:underline">
                    Preview Document
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end border-t border-slate-100">
              <button onClick={() => setSelectedStudentForModal(null)} className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. ID CARD HIGH-RES LIGHTBOX VIEWER                          */}
      {/* ============================================================ */}
      {idCardZoom && selectedVerificationStudentModal && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full text-center space-y-3">
            <button 
              onClick={() => setIdCardZoom(false)}
              className="absolute -top-10 right-0 text-white font-bold text-lg hover:text-rose-400 transition"
            >
              ✕ Close Zoom
            </button>
            <img 
              src={selectedVerificationStudentModal.idCardImage} 
              alt="High-Res College ID" 
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20" 
            />
            <p className="text-white text-xs font-semibold">
              Official College ID Card Proof • Student: {selectedVerificationStudentModal.name} ({selectedVerificationStudentModal.enrollmentNo})
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
