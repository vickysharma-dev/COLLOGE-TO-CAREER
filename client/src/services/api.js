import { initialClientData } from '../data/mockData';

const BACKEND_URL = 'http://localhost:5000/api';

const getLocalData = () => {
  const stored = localStorage.getItem('careerbridge_platform_data_v2');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Ensure students have full profile fields (resume, projects, internships, certificates)
      if (parsed.students && Array.isArray(parsed.students)) {
        parsed.students = parsed.students.map(s => {
          const initial = initialClientData.students.find(init => init.id === s.id);
          if (initial) {
            return {
              ...initial,
              ...s,
              resume: s.resume || initial.resume,
              projects: s.projects && s.projects.length ? s.projects : initial.projects,
              internships: s.internships && s.internships.length ? s.internships : initial.internships,
              certificates: s.certificates && s.certificates.length ? s.certificates : initial.certificates,
              skills: s.skills && s.skills.length ? s.skills : initial.skills
            };
          }
          return s;
        });
      }
      // Ensure any new applications are present
      if (parsed.applications && Array.isArray(parsed.applications)) {
        initialClientData.applications.forEach(initApp => {
          if (!parsed.applications.some(a => a.id === initApp.id)) {
            parsed.applications.push(initApp);
          }
        });
      }
      return parsed;
    } catch (e) {
      console.error("Error parsing stored data", e);
    }
  }
  localStorage.setItem('careerbridge_platform_data_v2', JSON.stringify(initialClientData));
  return initialClientData;
};

const saveLocalData = (data) => {
  localStorage.setItem('careerbridge_platform_data_v2', JSON.stringify(data));
};

export const api = {
  // Get full state
  getFullState: () => getLocalData(),

  // Get current student
  getStudent: async (id = "std-001") => {
    const local = getLocalData();
    return local.student || local.students.find(s => s.id === id) || local.students[0];
  },

  // Update Student Profile
  updateStudentProfile: async (updates) => {
    const local = getLocalData();
    local.student = { ...local.student, ...updates };
    // also update in students directory
    const idx = local.students.findIndex(s => s.id === local.student.id);
    if (idx !== -1) {
      local.students[idx] = { ...local.students[idx], ...updates };
    }
    saveLocalData(local);
    return local.student;
  },

  // Save / Bookmark Job
  toggleSaveJob: async (jobId) => {
    const local = getLocalData();
    const student = local.student;
    if (!student.savedJobs) student.savedJobs = [];
    if (student.savedJobs.includes(jobId)) {
      student.savedJobs = student.savedJobs.filter(id => id !== jobId);
    } else {
      student.savedJobs.push(jobId);
    }
    saveLocalData(local);
    return student.savedJobs;
  },

  // Student Skill Assessment & Verification
  requestSkillVerification: async (skillName, evidence) => {
    const local = getLocalData();
    const skill = local.student.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (skill) {
      skill.status = "verified";
      skill.score = Math.max(skill.score, 88);
      skill.verifiedReason = `Verified via proctored assessment & project evidence: ${evidence}`;
      local.student.verifiedSkillsCount = local.student.skills.filter(s => s.status === 'verified').length;
      saveLocalData(local);
    }
    return local.student;
  },

  // Fetch All Students
  getStudents: async () => {
    const local = getLocalData();
    return local.students;
  },

  // College Data
  getCollegeData: async () => {
    const local = getLocalData();
    const overview = local.collegeOverview || {};
    return {
      ...overview,
      overview: overview,
      verificationRequests: local.studentVerificationRequests || [],
      placementDrives: overview.placementDrives || [],
      placementTrend: overview.placementTrend || [],
      stats: overview.stats || {},
      topCompanies: overview.topCompanies || [],
      branchWiseStats: overview.branchWiseStats || [],
      aiInsights: overview.aiInsights || [],
      packageStats: overview.packageStats || {}
    };
  },

  // College accepts / rejects student verification
  processStudentVerification: async (requestId, action) => {
    const local = getLocalData();
    const req = local.studentVerificationRequests.find(r => r.id === requestId);
    if (req) {
      req.status = action === 'accept' ? 'accepted' : 'rejected';
      // update student
      const student = local.students.find(s => s.id === req.studentId);
      if (student) {
        student.collegeVerificationStatus = action === 'accept' ? 'verified' : 'rejected';
      }
      if (local.student && local.student.id === req.studentId) {
        local.student.collegeVerificationStatus = action === 'accept' ? 'verified' : 'rejected';
      }
      saveLocalData(local);
    }
    return local;
  },

  // College approves / rejects Company Hiring Request
  processCompanyRequest: async (requestId, action) => {
    const local = getLocalData();
    const req = local.collegeOverview.companyRequests.find(r => r.id === requestId);
    if (req) {
      req.status = action === 'approve' ? 'approved' : 'rejected';
      if (action === 'approve') {
        // Automatically create opportunity in College Placements!
        const newOpp = {
          id: `job-approved-${Date.now()}`,
          title: req.role,
          company: req.company,
          companyLogo: req.companyLogo || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80",
          type: "Full-time",
          category: "College Placement",
          salary: req.package,
          location: req.locations ? req.locations.join(' / ') : "Campus Placement",
          matchScore: 92,
          requiredSkills: req.requiredSkills || ["Java", "SQL"],
          deadline: "2026-10-20",
          driveDate: `${req.requestedDriveDate} (Approved Campus Drive)`,
          eligibilityText: `B.Tech CGPA >= ${req.eligibility.minCgpa}, Branches: ${req.eligibility.branches.join(', ')}`,
          minCgpa: req.eligibility.minCgpa,
          branchesAllowed: req.eligibility.branches,
          description: `Campus drive organized by ${req.company} in partnership with College TPO.`,
          status: "Approved by College",
          isCollegeApproved: true
        };
        local.opportunities.unshift(newOpp);
      }
      saveLocalData(local);
    }
    return local;
  },

  // Create Placement Drive by College
  createPlacementDrive: async (driveData) => {
    const local = getLocalData();
    const newDrive = {
      id: `drv-${Date.now()}`,
      company: driveData.company,
      companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80",
      role: driveData.role,
      package: driveData.package || "₹8 - 14 LPA",
      location: driveData.location || "Campus Drive",
      eligibility: {
        minCgpa: driveData.minCgpa || 7.0,
        branches: driveData.branches || ["Computer Science & Engineering", "Information Technology"],
        allowedBacklogs: driveData.allowedBacklogs || 0,
        academicYear: "2026"
      },
      requiredSkills: driveData.requiredSkills || ["Problem Solving"],
      openPositions: Number(driveData.openPositions) || 25,
      deadline: driveData.deadline || "2026-10-15",
      testDate: driveData.testDate || "2026-10-18",
      interviewDate: driveData.interviewDate || "2026-10-25",
      status: "Registration Open",
      registeredStudentsCount: 1
    };

    local.collegeOverview.placementDrives.unshift(newDrive);

    // Also make it immediately available in Student College Placements
    const newJob = {
      id: `job-drive-${Date.now()}`,
      title: newDrive.role,
      company: newDrive.company,
      companyLogo: newDrive.companyLogo,
      type: "Full-time",
      category: "College Placement",
      salary: newDrive.package,
      location: newDrive.location,
      matchScore: 90,
      requiredSkills: newDrive.requiredSkills,
      deadline: newDrive.deadline,
      driveDate: `${newDrive.testDate} (Test) • ${newDrive.interviewDate} (Interview)`,
      eligibilityText: `B.Tech CGPA >= ${newDrive.eligibility.minCgpa}, 0 backlogs`,
      minCgpa: newDrive.eligibility.minCgpa,
      branchesAllowed: newDrive.eligibility.branches,
      description: `Official campus drive created by Placement Cell for ${newDrive.company}.`,
      status: "Approved by College",
      isCollegeApproved: true
    };
    local.opportunities.unshift(newJob);

    saveLocalData(local);
    return newDrive;
  },

  // Opportunities
  getOpportunities: async () => {
    const local = getLocalData();
    return local.opportunities;
  },

  // Company creates hiring
  createHiring: async (hiringData, hiringType = 'college') => {
    const local = getLocalData();

    if (hiringType === 'college') {
      // 1. College Hiring -> Send request to College TPO for approval
      const newRequest = {
        id: `req-${Date.now()}`,
        company: hiringData.company || "Accenture",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
        role: hiringData.role,
        package: hiringData.salary,
        locations: [hiringData.location],
        eligibility: {
          minCgpa: Number(hiringData.minCgpa) || 7.0,
          branches: hiringData.branches || ["CSE", "IT"],
          allowedBacklogs: 0,
          academicYear: "2026"
        },
        requiredSkills: hiringData.requiredSkills || ["Java", "SQL"],
        requestedDriveDate: hiringData.deadline || "2026-10-25",
        status: "pending",
        officialRecruiter: "University Campus ATS"
      };
      local.collegeOverview.companyRequests.unshift(newRequest);
      saveLocalData(local);
      return { type: 'college_request_sent', data: newRequest };
    } else {
      // 2. Off-Campus Hiring -> Directly visible in Student Off-Campus
      const newOffCampus = {
        id: `job-off-${Date.now()}`,
        title: hiringData.role,
        company: hiringData.company,
        companyLogo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&auto=format&fit=crop&q=80",
        type: hiringData.type || "Full-time",
        category: "Off-Campus",
        salary: hiringData.salary,
        location: hiringData.location,
        matchScore: 84,
        requiredSkills: hiringData.requiredSkills || ["React", "Node.js"],
        deadline: hiringData.deadline || "2026-10-30",
        driveDate: "Direct Off-Campus Screening",
        eligibilityText: `Eligibility: ${hiringData.eligibility || 'Open to all graduates'}`,
        minCgpa: Number(hiringData.minCgpa) || 6.5,
        branchesAllowed: ["All"],
        description: hiringData.description || "Direct off-campus opening published on CareerBridge ATS.",
        status: "Open",
        isCollegeApproved: false
      };
      local.opportunities.unshift(newOffCampus);
      saveLocalData(local);
      return { type: 'offcampus_published', data: newOffCampus };
    }
  },

  // Applications
  getApplications: async () => {
    const local = getLocalData();
    return local.applications;
  },

  // Apply
  applyToOpportunity: async (studentId, jobId) => {
    const local = getLocalData();
    const student = local.student || local.students.find(s => s.id === studentId);
    const job = local.opportunities.find(j => j.id === jobId);
    if (!job) throw new Error("Job not found");

    const existing = local.applications.find(a => a.studentId === student.id && a.jobId === job.id);
    if (existing) throw new Error("Already applied to this opening");

    const newApp = {
      id: `app-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      currentStage: "Applied",
      status: "Applied",
      interviewDate: null,
      interviewStage: "Application Screening",
      aiScore: job.matchScore || 88,
      rejectionReason: null,
      improvementSuggestions: null,
      recommendedRoadmap: null,
      recruiterFeedback: "Application received by campus recruiting desk. Automated AI resume match completed."
    };

    local.applications.unshift(newApp);
    student.activeApplicationsCount = (student.activeApplicationsCount || 0) + 1;
    saveLocalData(local);
    return newApp;
  },

  // Company: Shortlist Candidate
  shortlistCandidate: async (appId) => {
    const local = getLocalData();
    const app = local.applications.find(a => a.id === appId);
    if (app) {
      app.currentStage = "Shortlisted";
      app.status = "Shortlisted";
      app.recruiterFeedback = "Congratulations! Your profile has been shortlisted by the recruiting team.";
      saveLocalData(local);
    }
    return app;
  },

  // Company: Schedule Interview
  scheduleCandidateInterview: async (appId, date, time, stage, feedback) => {
    const local = getLocalData();
    const app = local.applications.find(a => a.id === appId);
    if (app) {
      app.currentStage = "Interview";
      app.status = "Interview Scheduled";
      app.interviewDate = `${date} at ${time}`;
      app.interviewStage = stage || "Technical Round 1";
      app.recruiterFeedback = feedback || "Interview slot confirmed. Please prepare your core projects and algorithmic basics.";
      saveLocalData(local);
    }
    return app;
  },

  // Company: Reject Candidate with Structured Feedback
  rejectCandidate: async (appId, reason, suggestions, recommendedRoadmap) => {
    const local = getLocalData();
    const app = local.applications.find(a => a.id === appId);
    if (app) {
      app.currentStage = "Rejected";
      app.status = "Rejected";
      app.rejectionReason = reason;
      app.improvementSuggestions = suggestions || [
        "Strengthen hands-on implementation of required tech stack.",
        "Add verifiable GitHub demo links to portfolio.",
        "Follow recommended roadmap milestones to improve AI readiness score."
      ];
      app.recommendedRoadmap = recommendedRoadmap || "Roadmap: System Design & Backend Mastery";
      app.recruiterFeedback = `Feedback: ${reason}. Check improvement suggestions and continue following your roadmap!`;
      saveLocalData(local);
    }
    return app;
  },

  // Company: Select Candidate
  selectCandidate: async (appId) => {
    const local = getLocalData();
    const app = local.applications.find(a => a.id === appId);
    if (app) {
      app.currentStage = "Selected";
      app.status = "Selected / Offer Rolled Out";
      app.recruiterFeedback = "Congratulations! You have cleared all rounds and been selected for this position!";
      
      // Update student's placement status in directory
      const std = local.students.find(s => s.id === app.studentId);
      if (std) {
        std.placementStatus = `Placed (${app.company})`;
      }
      saveLocalData(local);
    }
    return app;
  },

  // Roadmap Toggle
  toggleRoadmapStep: async (stepId) => {
    const local = getLocalData();
    const step = local.student.roadmap.find(r => r.id === stepId);
    if (step) {
      if (step.status === 'completed') {
        step.status = 'in_progress';
        step.progress = 50;
      } else if (step.status === 'in_progress') {
        step.status = 'completed';
        step.progress = 100;
      } else {
        step.status = 'in_progress';
        step.progress = 25;
      }
      const completed = local.student.roadmap.filter(r => r.status === 'completed').length;
      local.student.aiReadinessScore = Math.min(98, 62 + Math.round((completed / local.student.roadmap.length) * 32));
      saveLocalData(local);
    }
    return local.student;
  },

  // AI Assistant Chatbot
  sendChatMessage: async (message, studentContext) => {
    const query = (message || '').toLowerCase();
    let reply = "";
    let actionSuggestions = [];

    if (query.includes('dsa') || query.includes('algorithm')) {
      reply = "Aapka DSA currently Beginner level par hai (score 55%). Recommendation: Pehle **Arrays, Two Pointers, HashMap** master karein, fir **Binary Trees & Graphs** solve karein. Daily 2 LeetCode easy/medium problems solve karein to jump readiness score to 88+!";
      actionSuggestions = ["Open DSA Roadmap Step 4", "Start DSA Assessment", "Top 50 Interview Questions"];
    } else if (query.includes('internship') || query.includes('kaunsi')) {
      reply = "Aapke verified skills **Java, Spring Boot aur SQL** hain. Sabse high-match internship **Wipro Java Developer Intern (94% Match, ₹25,000/mo)** aur **Accenture Backend Developer (92% Match)** hain. Inme direct PPO opportunity bhi available hai!";
      actionSuggestions = ["Apply to Wipro Intern", "View Matching Internships", "Check College Drives"];
    } else if (query.includes('resume') || query.includes('ats')) {
      reply = "Aapke resume mein **Spring Boot REST APIs** aur **SQL Indexing** projects clearly quantified hone chahiye. For example: *'Engineered high-throughput REST APIs handling 3,000+ requests with sub-80ms latency'*. AWS certificate upload karne se TCS & Infosys shortlist probability 30% badh jayegi!";
      actionSuggestions = ["Scan Resume with AI ATS", "Add Quantified Achievements", "Download Tech Template"];
    } else if (query.includes('roadmap') || query.includes('guide')) {
      reply = "Aapka personalized roadmap **Java Backend Developer** ke liye 60% complete hai:\n1. Core Java & OOP (Done ✅)\n2. Collections & Streams (Done ✅)\n3. SQL & Database (Done ✅)\n4. Spring Boot & REST (In Progress ⏳)\n5. DSA Arrays & Trees (Action Needed ⚠️)\n6. Docker & AWS Deployment (Pending).";
      actionSuggestions = ["Go to Roadmap Step 6", "Take Spring Boot Test", "Schedule Mock Interview"];
    } else {
      reply = `Hello! Main aapka **CareerBridge AI Assistant** hoon. Aap mujhse pooch sakte hain:\n• *"Mere skills ke according kaunsi internship best hai?"*\n• *"Mera DSA weak hai, kya karu?"*\n• *"Resume kaise improve karein?"*\n• *"Spring Boot me kya seekhein?"*`;
      actionSuggestions = ["Find My Skill Gaps", "Improve My Resume", "Explore College Placements"];
    }

    return {
      reply,
      actionSuggestions,
      readinessScore: studentContext?.aiReadinessScore || 78,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
};
