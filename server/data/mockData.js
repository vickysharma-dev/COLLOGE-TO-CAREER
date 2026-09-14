export const initialData = {
  students: [
    {
      id: "std-001",
      name: "Rahul Sharma",
      email: "rahul.sharma@campus.edu",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      college: "Indian Institute of Technology & Management",
      degree: "B.Tech Computer Science (2022-2026)",
      cgpa: 8.7,
      aiReadinessScore: 78,
      profileCompletion: 86,
      activeApplicationsCount: 4,
      verifiedSkillsCount: 3,
      upcomingInterviewsCount: 2,
      targetRole: "Java Backend Developer",
      skills: [
        { name: "Java", status: "verified", level: "Advanced", score: 90 },
        { name: "Spring Boot", status: "verified", level: "Intermediate", score: 82 },
        { name: "SQL", status: "verified", level: "Advanced", score: 88 },
        { name: "DSA", status: "gap", level: "Beginner", score: 55, note: "Arrays & Strings OK, Trees/DP needed" },
        { name: "AWS", status: "missing", level: "None", score: 20, note: "Cloud deployment recommended" }
      ],
      certificates: [
        { title: "Oracle Certified Professional: Java SE 17", issuer: "Oracle", date: "Jan 2024", verified: true },
        { title: "Spring Boot Masterclass", issuer: "Udemy", date: "Nov 2023", verified: true },
        { title: "SQL for Data Science", issuer: "Coursera", date: "Aug 2023", verified: true }
      ],
      roadmap: [
        { id: 1, title: "Java Fundamentals", status: "completed", desc: "Syntax, Data types, Control Flow, Memory" },
        { id: 2, title: "OOP Concepts", status: "completed", desc: "Inheritance, Polymorphism, Encapsulation, Abstraction" },
        { id: 3, title: "Java Collections", status: "completed", desc: "List, Set, Map, Streams, Generics" },
        { id: 4, title: "DSA (Arrays, Strings, Trees)", status: "in_progress", progress: 65, desc: "Solve 100+ LeetCode problems" },
        { id: 5, title: "SQL + DBMS", status: "completed", desc: "Complex queries, Indexing, Transactions" },
        { id: 6, title: "Spring Boot & REST API", status: "in_progress", progress: 45, desc: "CRUD, Spring Security, JWT" },
        { id: 7, title: "Microservices & Cloud", status: "pending", desc: "Docker, AWS ECS, Service Discovery" },
        { id: 8, title: "Resume Building & ATS", status: "pending", desc: "Quantified project impact, ATS keywords" },
        { id: 9, title: "Mock Technical Interviews", status: "pending", desc: "System design basics and behavioral prep" }
      ]
    },
    {
      id: "std-002",
      name: "Priya Singh",
      email: "priya.singh@campus.edu",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      college: "Indian Institute of Technology & Management",
      degree: "B.Tech Information Technology",
      cgpa: 9.1,
      aiReadinessScore: 84,
      profileCompletion: 95,
      activeApplicationsCount: 3,
      verifiedSkillsCount: 5,
      upcomingInterviewsCount: 3,
      targetRole: "Full Stack Engineer",
      skills: [
        { name: "React", status: "verified", level: "Advanced", score: 94 },
        { name: "TypeScript", status: "verified", level: "Intermediate", score: 85 },
        { name: "Node.js", status: "verified", level: "Advanced", score: 89 },
        { name: "MongoDB", status: "verified", level: "Advanced", score: 88 },
        { name: "Tailwind CSS", status: "verified", level: "Advanced", score: 92 }
      ],
      certificates: [
        { title: "Meta Front-End Developer Specialization", issuer: "Coursera", date: "Dec 2023", verified: true }
      ]
    },
    {
      id: "std-003",
      name: "Amit Kumar",
      email: "amit.kumar@campus.edu",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      college: "Indian Institute of Technology & Management",
      degree: "B.Tech Computer Science",
      cgpa: 8.3,
      aiReadinessScore: 81,
      profileCompletion: 88,
      activeApplicationsCount: 2,
      verifiedSkillsCount: 4,
      upcomingInterviewsCount: 1,
      targetRole: "Python Backend Developer",
      skills: [
        { name: "Python", status: "verified", level: "Advanced", score: 91 },
        { name: "Django", status: "verified", level: "Advanced", score: 86 },
        { name: "PostgreSQL", status: "verified", level: "Intermediate", score: 80 },
        { name: "Docker", status: "verified", level: "Intermediate", score: 75 }
      ]
    },
    {
      id: "std-004",
      name: "Neha Gupta",
      email: "neha.gupta@campus.edu",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      college: "Indian Institute of Technology & Management",
      degree: "B.Tech Computer Science",
      cgpa: 8.5,
      aiReadinessScore: 79,
      profileCompletion: 82,
      activeApplicationsCount: 5,
      verifiedSkillsCount: 3,
      upcomingInterviewsCount: 1,
      targetRole: "Java & Microservices Engineer",
      skills: [
        { name: "Java", status: "verified", level: "Advanced", score: 88 },
        { name: "Spring Boot", status: "verified", level: "Advanced", score: 85 },
        { name: "Microservices", status: "verified", level: "Intermediate", score: 78 }
      ]
    }
  ],

  collegeOverview: {
    name: "Apex University & Institute of Technology",
    stats: {
      totalStudents: 1240,
      verifiedStudents: 1080,
      placedStudents: 892,
      placementRate: 86
    },
    placementTrend: [
      { month: "Jan", rate: 35, offers: 180 },
      { month: "Feb", rate: 48, offers: 320 },
      { month: "Mar", rate: 62, offers: 510 },
      { month: "Apr", rate: 71, offers: 690 },
      { month: "May", rate: 79, offers: 795 },
      { month: "Jun", rate: 86, offers: 892 }
    ],
    topCompanies: [
      { name: "TCS", offers: 28, logo: "🏢", avgPackage: "7.5 LPA" },
      { name: "Infosys", offers: 24, logo: "💼", avgPackage: "6.8 LPA" },
      { name: "Accenture", offers: 18, logo: "🚀", avgPackage: "9.2 LPA" },
      { name: "Wipro", offers: 12, logo: "⚡", avgPackage: "6.5 LPA" },
      { name: "Cognizant", offers: 10, logo: "🌐", avgPackage: "7.0 LPA" }
    ],
    skillGaps: [
      { skill: "Java", deficiencyPct: 24, recommendedCourse: "Advanced Java & Concurrency" },
      { skill: "Spring Boot", deficiencyPct: 42, recommendedCourse: "Spring Boot 3 REST API Bootcamp" },
      { skill: "DSA", deficiencyPct: 38, recommendedCourse: "Algorithms & Competitive Programming" },
      { skill: "AWS / Cloud", deficiencyPct: 56, recommendedCourse: "AWS Certified Cloud Practitioner" }
    ],
    upcomingDrives: [
      { id: "drv-1", company: "Accenture", role: "Backend Developer", date: "2026-09-20", eligibility: "CGPA >= 7.5", positions: 25, status: "Active" },
      { id: "drv-2", company: "TCS Digital", role: "Software Engineer", date: "2026-09-24", eligibility: "CGPA >= 7.0", positions: 40, status: "Registration Open" },
      { id: "drv-3", company: "Infosys", role: "Specialist Programmer", date: "2026-10-02", eligibility: "CGPA >= 8.0", positions: 15, status: "Upcoming" }
    ]
  },

  opportunities: [
    {
      id: "job-101",
      title: "Software Developer",
      company: "TCS",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
      type: "Full-time",
      category: "College Placement",
      salary: "₹6 - 12 LPA",
      location: "Bengaluru / Pune (Hybrid)",
      matchScore: 96,
      requiredSkills: ["Java", "SQL", "Problem Solving", "Git"],
      deadline: "2026-09-28",
      description: "Design and implement scalable enterprise microservices using modern Java frameworks.",
      status: "Open"
    },
    {
      id: "job-102",
      title: "Backend Developer",
      company: "Accenture",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
      type: "Full-time",
      category: "College Placement",
      salary: "₹8 - 15 LPA",
      location: "Hyderabad / Gurugram",
      matchScore: 92,
      requiredSkills: ["Java", "Spring Boot", "SQL", "REST APIs"],
      deadline: "2026-09-30",
      description: "Build robust REST APIs, optimize database queries, and contribute to high-availability architecture.",
      status: "Open"
    },
    {
      id: "job-103",
      title: "Full Stack Engineer",
      company: "Infosys",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
      type: "Full-time",
      category: "Off-Campus",
      salary: "₹7 - 11 LPA",
      location: "Remote / Bangalore",
      matchScore: 85,
      requiredSkills: ["React", "Node.js", "SQL", "TypeScript"],
      deadline: "2026-10-05",
      description: "Develop user-centric web applications and microservices for global Fortune 500 clients.",
      status: "Open"
    },
    {
      id: "job-104",
      title: "Cloud & DevOps Associate",
      company: "CloudTech Solutions",
      type: "Full-time",
      category: "Off-Campus",
      salary: "₹10 - 16 LPA",
      location: "Remote",
      matchScore: 68,
      requiredSkills: ["AWS", "Docker", "Linux", "Python"],
      deadline: "2026-10-12",
      description: "Manage CI/CD pipelines, containerize backend services, and monitor AWS infrastructure.",
      status: "Open"
    },
    {
      id: "job-105",
      title: "Java Developer Intern",
      company: "Wipro Technologies",
      type: "Internship (Paid)",
      category: "Internship",
      salary: "₹25,000 / month",
      location: "Noida / Hybrid",
      matchScore: 94,
      requiredSkills: ["Java", "Spring Boot", "SQL"],
      deadline: "2026-09-22",
      description: "6-month paid internship with real-world project mentorship and direct PPO evaluation.",
      status: "Open"
    },
    {
      id: "job-106",
      title: "Frontend Engineering Intern",
      company: "InnovateLabs",
      type: "Internship (Unpaid / PPO)",
      category: "Internship",
      salary: "Experience + Certificate + PPO",
      location: "Remote",
      matchScore: 76,
      requiredSkills: ["React", "Tailwind CSS", "JavaScript"],
      deadline: "2026-09-25",
      description: "Gain hands-on experience building interactive dashboard interfaces with modern frontend tech.",
      status: "Open"
    }
  ],

  applications: [
    {
      id: "app-201",
      studentId: "std-001",
      studentName: "Rahul Sharma",
      jobId: "job-102",
      jobTitle: "Backend Developer",
      company: "Accenture",
      appliedDate: "2026-09-10",
      status: "Interview Scheduled",
      interviewDate: "2026-09-18 at 02:30 PM",
      aiScore: 92,
      feedback: "Strong fundamentals in Java and relational database design. Be ready for concurrency & indexing questions."
    },
    {
      id: "app-202",
      studentId: "std-001",
      studentName: "Rahul Sharma",
      jobId: "job-101",
      jobTitle: "Software Developer",
      company: "TCS",
      appliedDate: "2026-09-08",
      status: "Under Review",
      interviewDate: null,
      aiScore: 96,
      feedback: "Resume shortlisted by recruiter filter. Awaiting technical round slot assignment."
    },
    {
      id: "app-203",
      studentId: "std-001",
      studentName: "Rahul Sharma",
      jobId: "job-105",
      jobTitle: "Java Developer Intern",
      company: "Wipro Technologies",
      appliedDate: "2026-09-05",
      status: "Interview Scheduled",
      interviewDate: "2026-09-16 at 11:00 AM",
      aiScore: 94,
      feedback: "Assessment test passed with 92% percentile score."
    },
    {
      id: "app-204",
      studentId: "std-001",
      studentName: "Rahul Sharma",
      jobId: "job-104",
      jobTitle: "Cloud & DevOps Associate",
      company: "CloudTech Solutions",
      appliedDate: "2026-09-01",
      status: "Rejected",
      interviewDate: null,
      aiScore: 68,
      feedback: "Missing verified hands-on AWS or Docker project experience. Recommendation: Complete AWS Cloud Practitioner and add containerized project to portfolio."
    }
  ]
};
