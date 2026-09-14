export const initialClientData = {
  // Current logged in states for demo convenience (can be toggled or logged out)
  auth: {
    studentLoggedIn: true,
    collegeLoggedIn: true,
    companyLoggedIn: true
  },

  // Logged in student profile (Rahul Sharma)
  student: {
    id: "std-001",
    name: "Rahul Sharma",
    enrollmentNo: "EN2022CS089",
    email: "rahul.sharma@campus.edu",
    phone: "+91 98765 43210",
    college: "Apex Institute of Technology & Engineering",
    degree: "B.Tech Computer Science & Engineering",
    branch: "Computer Science & Engineering",
    year: "4th Year (2022-2026)",
    cgpa: 8.7,
    backlogs: 0,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    collegeVerificationStatus: "verified", // "verified" | "pending" | "rejected"
    collegeIdDoc: "college_id_rahul_verified.pdf",
    targetRole: "Java Backend Developer",
    profileCompletion: 88,
    aiReadinessScore: 78,
    activeApplicationsCount: 4,
    verifiedSkillsCount: 3,
    upcomingInterviewsCount: 2,
    savedJobs: ["job-101", "job-105"],
    resume: {
      fileName: "Rahul_Sharma_Software_Resume.pdf",
      lastUpdated: "2026-09-10",
      fileSize: "420 KB",
      atsScore: 84
    },
    skills: [
      { 
        name: "Java", 
        status: "verified", 
        level: "Advanced", 
        score: 90, 
        verifiedReason: "Verified via Oracle SE 17 Certification & Coding Assessment (Score: 92%)" 
      },
      { 
        name: "Spring Boot", 
        status: "verified", 
        level: "Intermediate", 
        score: 82, 
        verifiedReason: "Verified via E-Commerce Backend Project & REST API Assessment" 
      },
      { 
        name: "SQL & DBMS", 
        status: "verified", 
        level: "Advanced", 
        score: 88, 
        verifiedReason: "Verified via HackerRank 5-Star SQL Badge & Coursera Data Engineering" 
      },
      { 
        name: "DSA (Data Structures)", 
        status: "needs_assessment", 
        level: "Beginner", 
        score: 55, 
        verifiedReason: "Needs Assessment: Arrays/Strings verified; Trees & DP assessment pending" 
      },
      { 
        name: "AWS / Cloud", 
        status: "not_verified", 
        level: "Beginner", 
        score: 25, 
        verifiedReason: "Not Verified: No production project or certificate uploaded yet" 
      },
      { 
        name: "Docker", 
        status: "needs_assessment", 
        level: "Intermediate", 
        score: 60, 
        verifiedReason: "Needs Assessment: Basic Dockerfile verified in GitHub repo" 
      }
    ],
    projects: [
      {
        id: "p1",
        title: "High-Throughput Banking REST API",
        tech: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
        desc: "Engineered scalable banking microservice with JWT auth handling 3,000+ simulated concurrent transactions with sub-80ms response.",
        github: "https://github.com/rahul/banking-api",
        liveDemo: "https://banking-demo.careerbridge.dev",
        verified: true
      },
      {
        id: "p2",
        title: "Campus Drive Management System",
        tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        desc: "Automated student eligibility checks and placement coordinator dashboard with CSV export and email alerts.",
        github: "https://github.com/rahul/placement-portal",
        liveDemo: "https://placement-demo.careerbridge.dev",
        verified: true
      }
    ],
    certificates: [
      { 
        id: "c1", 
        title: "Oracle Certified Professional: Java SE 17", 
        issuer: "Oracle University", 
        date: "Jan 2024", 
        credentialId: "OCP-9842109", 
        status: "verified",
        evidence: "Official digital badge verified via Credly URL"
      },
      { 
        id: "c2", 
        title: "Spring Boot 3 Masterclass", 
        issuer: "Udemy", 
        date: "Nov 2023", 
        credentialId: "UC-8729103", 
        status: "verified",
        evidence: "Certificate PDF uploaded and verified"
      },
      { 
        id: "c3", 
        title: "SQL (Advanced) Skill Certificate", 
        issuer: "HackerRank", 
        date: "Aug 2023", 
        credentialId: "HR-SQL-5421", 
        status: "verified",
        evidence: "Completed 90-minute timed proctored assessment"
      },
      { 
        id: "c4", 
        title: "AWS Cloud Practitioner Training", 
        issuer: "Coursera", 
        date: "Pending", 
        credentialId: "In Progress", 
        status: "pending_review",
        evidence: "Uploaded course completion screenshot (Under evaluation)"
      }
    ],
    internships: [
      {
        id: "int-1",
        role: "Backend Engineering Intern",
        company: "DevSprint Technologies",
        duration: "3 Months (Jun 2025 - Aug 2025)",
        location: "Bengaluru (Hybrid)",
        stipend: "₹20,000 / month",
        desc: "Refactored legacy REST controllers to Spring WebFlux, reducing server latency by 22%. Wrote JUnit 5 unit tests with 85% coverage.",
        completionLetterVerified: true
      }
    ],
    roadmap: [
      { id: 1, title: "Java Fundamentals & Concurrency", category: "Core Tech", status: "completed", progress: 100, desc: "Syntax, Memory model, Multithreading, ExecutorService" },
      { id: 2, title: "OOP & SOLID Principles", category: "Architecture", status: "completed", progress: 100, desc: "Design patterns (Factory, Strategy, Observer) with clean code" },
      { id: 3, title: "Java Collections & Streams API", category: "Core Tech", status: "completed", progress: 100, desc: "List, Map, Set, Stream filter/map/reduce, Functional interfaces" },
      { id: 4, title: "DSA: Arrays, Strings, Trees & DP", category: "Problem Solving", status: "in_progress", progress: 65, desc: "Target 120+ LeetCode problems (Currently 75 solved; focus on Trees/DP)" },
      { id: 5, title: "SQL Indexing & ACID Transactions", category: "Database", status: "completed", progress: 100, desc: "Complex joins, B-Tree indexes, Query optimization, Normalization" },
      { id: 6, title: "Spring Boot 3, Security & JWT", category: "Backend", status: "in_progress", progress: 50, desc: "Spring Data JPA, Hibernate, Role-based auth with Spring Security 6" },
      { id: 7, title: "Docker & AWS ECS Deployment", category: "Cloud & DevOps", status: "pending", progress: 0, desc: "Containerize Spring backend, push to ECR, deploy on AWS ECS" },
      { id: 8, title: "ATS-Compliant Resume & Portfolio", category: "Career Prep", status: "in_progress", progress: 80, desc: "Quantify impact with numbers, action verbs, and clean single-column format" },
      { id: 9, title: "Mock Technical & System Design Rounds", category: "Interviews", status: "pending", progress: 0, desc: "Practice URL shortener/Rate limiter designs & behavioral STAR stories" }
    ],
    notifications: [
      { id: "notif-1", title: "Interview Scheduled with Wipro", time: "2 hours ago", type: "interview", read: false },
      { id: "notif-2", title: "Accenture Drive Approved by College TPO", time: "1 day ago", type: "drive", read: true },
      { id: "notif-3", title: "College Verified your Student Profile", time: "2 days ago", type: "verification", read: true }
    ]
  },

  // Directory of all students in the college for College & Company views
  students: [
    {
      id: "std-001",
      name: "Rahul Sharma",
      enrollmentNo: "EN2022CS089",
      email: "rahul.sharma@campus.edu",
      phone: "+91 98765 43210",
      college: "Apex Institute of Technology & Engineering",
      degree: "B.Tech Computer Science & Engineering",
      branch: "Computer Science & Engineering",
      year: "4th Year (2022-2026)",
      cgpa: 8.7,
      backlogs: 0,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      collegeVerificationStatus: "verified",
      placementStatus: "In Progress (2 Interviews)",
      aiReadinessScore: 78,
      targetRole: "Java Backend Developer",
      resume: {
        fileName: "Rahul_Sharma_Software_Resume.pdf",
        lastUpdated: "2026-09-10",
        fileSize: "420 KB",
        atsScore: 84
      },
      skills: [
        { name: "Java", status: "verified", level: "Advanced", score: 90, verifiedReason: "Verified via Oracle SE 17 Certification & Coding Assessment (Score: 92%)" },
        { name: "Spring Boot", status: "verified", level: "Intermediate", score: 82, verifiedReason: "Verified via E-Commerce Backend Project & REST API Assessment" },
        { name: "SQL & DBMS", status: "verified", level: "Advanced", score: 88, verifiedReason: "Verified via HackerRank 5-Star SQL Badge & Coursera Data Engineering" },
        { name: "DSA", status: "needs_assessment", level: "Intermediate", score: 65, verifiedReason: "Arrays/Strings verified; Trees & Graphs in progress" },
        { name: "AWS", status: "not_verified", level: "Beginner", score: 25, verifiedReason: "Awaiting production deployment credentials" }
      ],
      projects: [
        {
          id: "p1",
          title: "High-Throughput Banking REST API",
          tech: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Docker"],
          desc: "Engineered scalable banking microservice with JWT auth handling 3,000+ simulated concurrent transactions with sub-80ms response.",
          github: "https://github.com/rahul/banking-api",
          liveDemo: "https://banking-demo.careerbridge.dev",
          verified: true
        },
        {
          id: "p2",
          title: "Campus Drive Management System",
          tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
          desc: "Automated student eligibility checks and placement coordinator dashboard with CSV export and email alerts.",
          github: "https://github.com/rahul/placement-portal",
          liveDemo: "https://placement-demo.careerbridge.dev",
          verified: true
        }
      ],
      internships: [
        {
          id: "int-1",
          role: "Backend Engineering Intern",
          company: "DevSprint Technologies",
          duration: "3 Months (Jun 2025 - Aug 2025)",
          location: "Bengaluru (Hybrid)",
          stipend: "₹20,000 / month",
          desc: "Refactored legacy REST controllers to Spring WebFlux, reducing server latency by 22%. Wrote JUnit 5 unit tests with 85% coverage.",
          completionLetterVerified: true
        }
      ],
      certificates: [
        { id: "c1", title: "Oracle Certified Professional: Java SE 17", issuer: "Oracle University", date: "Jan 2024", credentialId: "OCP-9842109", status: "verified", evidence: "Credly Badge Verified" },
        { id: "c2", title: "Spring Boot 3 Masterclass", issuer: "Udemy", date: "Nov 2023", credentialId: "UC-8729103", status: "verified", evidence: "Verified Certificate" },
        { id: "c3", title: "SQL (Advanced) Skill Certificate", issuer: "HackerRank", date: "Aug 2023", credentialId: "HR-SQL-5421", status: "verified", evidence: "Proctored Test 94%" }
      ],
      matchReasons: [
        "Java SE 17 certification verified with 90% score",
        "Spring Boot microservice project in portfolio",
        "SQL 5-star badge verified",
        "Prior 3-month backend internship experience"
      ]
    },
    {
      id: "std-002",
      name: "Priya Singh",
      enrollmentNo: "EN2022IT045",
      email: "priya.singh@campus.edu",
      phone: "+91 98111 22334",
      college: "Apex Institute of Technology & Engineering",
      degree: "B.Tech Information Technology",
      branch: "Information Technology",
      year: "4th Year (2022-2026)",
      cgpa: 9.1,
      backlogs: 0,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      collegeVerificationStatus: "verified",
      placementStatus: "Shortlisted (Accenture)",
      aiReadinessScore: 88,
      targetRole: "Full Stack Engineer",
      resume: {
        fileName: "Priya_Singh_FullStack_Resume.pdf",
        lastUpdated: "2026-09-12",
        fileSize: "480 KB",
        atsScore: 92
      },
      skills: [
        { name: "React", status: "verified", level: "Advanced", score: 94, verifiedReason: "Meta Front-End Specialization Certified & 4 Production Apps" },
        { name: "Node.js", status: "verified", level: "Advanced", score: 89, verifiedReason: "Verified via Express/NestJS microservices project" },
        { name: "TypeScript", status: "verified", level: "Intermediate", score: 85, verifiedReason: "Full-stack type-safe architecture assessment passed" },
        { name: "MongoDB", status: "verified", level: "Advanced", score: 88, verifiedReason: "Mongo University M220JS Certified" }
      ],
      projects: [
        {
          id: "p21",
          title: "CollabCanvas - Realtime Whiteboard",
          tech: ["React", "TypeScript", "WebSockets", "Node.js", "Redis"],
          desc: "Real-time collaborative whiteboard platform supporting 50+ concurrent users per canvas with sub-30ms socket latency.",
          github: "https://github.com/priya/collab-canvas",
          liveDemo: "https://collabcanvas.demo.dev",
          verified: true
        },
        {
          id: "p22",
          title: "CarePulse Health Telemedicine App",
          tech: ["Next.js", "Tailwind CSS", "Appwrite", "Stripe"],
          desc: "HIPAA-inspired patient scheduling and tele-consultation platform with automated SMS appointment reminders.",
          github: "https://github.com/priya/carepulse",
          liveDemo: "https://carepulse.demo.dev",
          verified: true
        }
      ],
      internships: [
        {
          id: "int-2",
          role: "Frontend Engineer Intern",
          company: "Zeta Interactive",
          duration: "4 Months (May 2025 - Aug 2025)",
          location: "Hyderabad (Remote)",
          stipend: "₹25,000 / month",
          desc: "Built component library in Storybook with 100% WCAG accessibility compliance; improved Core Web Vitals LCP by 35%.",
          completionLetterVerified: true
        }
      ],
      certificates: [
        { id: "c21", title: "Meta Front-End Developer Professional Certificate", issuer: "Meta", date: "Mar 2024", credentialId: "META-FE-9981", status: "verified", evidence: "Coursera Verified Certificate" },
        { id: "c22", title: "TypeScript Core Certification", issuer: "freeCodeCamp", date: "Dec 2023", credentialId: "FCC-TS-102", status: "verified", evidence: "Proctored Exam 96%" }
      ],
      matchReasons: [
        "Meta Front-End Specialization certified",
        "React + Node.js production project deployed on Vercel",
        "Clean GitHub contribution streak (200+ commits)",
        "CGPA 9.1 with 0 backlogs"
      ]
    },
    {
      id: "std-003",
      name: "Amit Kumar",
      enrollmentNo: "EN2022CS014",
      email: "amit.kumar@campus.edu",
      phone: "+91 98222 33445",
      college: "Apex Institute of Technology & Engineering",
      degree: "B.Tech Computer Science & Engineering",
      branch: "Computer Science & Engineering",
      year: "4th Year (2022-2026)",
      cgpa: 8.3,
      backlogs: 0,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      collegeVerificationStatus: "verified",
      placementStatus: "Available",
      aiReadinessScore: 81,
      targetRole: "Python Backend Developer",
      resume: {
        fileName: "Amit_Kumar_Python_Backend_Resume.pdf",
        lastUpdated: "2026-09-08",
        fileSize: "410 KB",
        atsScore: 86
      },
      skills: [
        { name: "Python", status: "verified", level: "Advanced", score: 91, verifiedReason: "PCAP Certified Associate Python Programmer" },
        { name: "Django", status: "verified", level: "Advanced", score: 86, verifiedReason: "Django REST Framework proctored benchmark" },
        { name: "PostgreSQL", status: "verified", level: "Intermediate", score: 80, verifiedReason: "Database design assessment verified" },
        { name: "Docker", status: "verified", level: "Intermediate", score: 75, verifiedReason: "Containerization pipeline verified in GitHub" }
      ],
      projects: [
        {
          id: "p31",
          title: "FinTrack - Microservices Ledger",
          tech: ["Python", "FastAPI", "PostgreSQL", "Celery", "RabbitMQ"],
          desc: "Asynchronous double-entry financial ledger microservice processing 10k background accounting events.",
          github: "https://github.com/amit/fintrack-fastapi",
          liveDemo: "https://fintrack.demo.dev",
          verified: true
        }
      ],
      internships: [
        {
          id: "int-3",
          role: "Python Backend Intern",
          company: "CloudData Labs",
          duration: "3 Months (Jun 2025 - Aug 2025)",
          location: "Pune (On-site)",
          stipend: "₹18,000 / month",
          desc: "Automated data ingestion ETL pipelines and optimized slow SQL queries, reducing API latency from 400ms to 95ms.",
          completionLetterVerified: true
        }
      ],
      certificates: [
        { id: "c31", title: "PCAP – Certified Associate in Python Programming", issuer: "Python Institute", date: "Feb 2024", credentialId: "PCAP-31-03", status: "verified", evidence: "OpenEDG Digital Certificate" }
      ],
      matchReasons: [
        "Python Institute PCAP Certified",
        "FastAPI / Django REST framework projects",
        "Experience with Docker containerization",
        "Consistent problem solver on CodeChef"
      ]
    },
    {
      id: "std-004",
      name: "Neha Gupta",
      enrollmentNo: "EN2022CS102",
      email: "neha.gupta@campus.edu",
      phone: "+91 98333 44556",
      college: "Apex Institute of Technology & Engineering",
      degree: "B.Tech Computer Science & Engineering",
      branch: "Computer Science & Engineering",
      year: "4th Year (2022-2026)",
      cgpa: 8.5,
      backlogs: 0,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      collegeVerificationStatus: "verified",
      placementStatus: "Placed (TCS Digital - 9 LPA)",
      aiReadinessScore: 79,
      targetRole: "Java & Cloud Backend",
      resume: {
        fileName: "Neha_Gupta_Java_Cloud_Resume.pdf",
        lastUpdated: "2026-09-05",
        fileSize: "390 KB",
        atsScore: 82
      },
      skills: [
        { name: "Java", status: "verified", level: "Advanced", score: 88, verifiedReason: "Java Concurrency & OOP assessment verified" },
        { name: "Spring Boot", status: "verified", level: "Advanced", score: 85, verifiedReason: "Spring Cloud microservice architecture verified" },
        { name: "Microservices", status: "verified", level: "Intermediate", score: 78, verifiedReason: "Eureka / API Gateway routing verified" }
      ],
      projects: [
        {
          id: "p41",
          title: "Order Flow Microservices Architecture",
          tech: ["Java 17", "Spring Cloud", "Kafka", "MySQL"],
          desc: "Distributed event-driven e-commerce order management system using Apache Kafka for pub/sub messaging.",
          github: "https://github.com/neha/order-flow",
          liveDemo: "https://orders.demo.dev",
          verified: true
        }
      ],
      internships: [
        {
          id: "int-4",
          role: "Software Developer Intern",
          company: "Infosys Campus Connect",
          duration: "2 Months (Jul 2025 - Aug 2025)",
          location: "Bengaluru",
          stipend: "₹15,000 / month",
          desc: "Built automated unit tests and integration tests for internal billing modules.",
          completionLetterVerified: true
        }
      ],
      certificates: [
        { id: "c41", title: "Enterprise Java & Spring Cloud", issuer: "Coursera", date: "Jan 2024", credentialId: "CR-SPRING-881", status: "verified", evidence: "Verified Certificate" }
      ],
      matchReasons: [
        "Placed at TCS Digital via campus drive",
        "Strong object-oriented design and Spring Cloud fundamentals",
        "Excellent communication in technical assessments"
      ]
    },
    {
      id: "std-005",
      name: "Vikas Verma",
      enrollmentNo: "EN2022ME032",
      email: "vikas.verma@campus.edu",
      phone: "+91 98444 55667",
      college: "Apex Institute of Technology & Engineering",
      degree: "B.Tech Mechanical Engineering",
      branch: "Mechanical Engineering",
      year: "4th Year (2022-2026)",
      cgpa: 7.2,
      backlogs: 1,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      collegeVerificationStatus: "pending",
      placementStatus: "Pending Verification",
      aiReadinessScore: 58,
      targetRole: "Graduate Trainee Engineer",
      resume: {
        fileName: "Vikas_Verma_Mechanical_Resume.pdf",
        lastUpdated: "2026-09-01",
        fileSize: "360 KB",
        atsScore: 68
      },
      skills: [
        { name: "AutoCAD", status: "verified", level: "Advanced", score: 78, verifiedReason: "Certified CAD modeler" },
        { name: "Python Basics", status: "needs_assessment", level: "Beginner", score: 45, verifiedReason: "Under assessment" }
      ],
      projects: [
        {
          id: "p51",
          title: "Robotic Arm Kinematics Simulation",
          tech: ["AutoCAD", "MATLAB", "Python"],
          desc: "6-DOF robotic manipulator simulation with forward/inverse kinematics analysis.",
          github: "https://github.com/vikas/robotic-arm",
          verified: true
        }
      ],
      internships: [],
      certificates: [
        { id: "c51", title: "Certified CAD Professional", issuer: "Autodesk", date: "2024", credentialId: "ADSK-4491", status: "verified", evidence: "Autodesk Credential" }
      ],
      matchReasons: [
        "Core mechanical engineering coursework complete",
        "Awaiting ID card verification from TPO"
      ]
    },
    {
      id: "std-006",
      name: "Ananya Roy",
      enrollmentNo: "EN2022EC019",
      email: "ananya.roy@campus.edu",
      phone: "+91 98555 66778",
      college: "Apex Institute of Technology & Engineering",
      degree: "B.Tech Electronics & Communication",
      branch: "Electronics & Communication",
      year: "4th Year (2022-2026)",
      cgpa: 8.9,
      backlogs: 0,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      collegeVerificationStatus: "verified",
      placementStatus: "Available",
      aiReadinessScore: 76,
      targetRole: "Embedded Software / IoT",
      resume: {
        fileName: "Ananya_Roy_Embedded_Resume.pdf",
        lastUpdated: "2026-09-11",
        fileSize: "440 KB",
        atsScore: 85
      },
      skills: [
        { name: "C++", status: "verified", level: "Advanced", score: 88, verifiedReason: "Proctored C++ STL assessment verified" },
        { name: "Embedded C", status: "verified", level: "Advanced", score: 85, verifiedReason: "ARM Cortex firmware project verified" },
        { name: "IoT Protocols", status: "verified", level: "Intermediate", score: 70, verifiedReason: "MQTT / HTTP IoT hardware gateway verified" }
      ],
      projects: [
        {
          id: "p61",
          title: "Smart Industrial Air Quality Monitor",
          tech: ["ESP32", "Embedded C++", "MQTT", "AWS IoT Core"],
          desc: "Low-power hardware sensor unit streaming real-time PM2.5 and CO2 metrics over MQTT with alert triggers.",
          github: "https://github.com/ananya/smart-air-iot",
          liveDemo: "https://smartair.demo.dev",
          verified: true
        }
      ],
      internships: [
        {
          id: "int-6",
          role: "Embedded Firmware Intern",
          company: "SenseTech Solutions",
          duration: "3 Months (Jun 2025 - Aug 2025)",
          location: "Bengaluru",
          stipend: "₹22,000 / month",
          desc: "Implemented I2C sensor drivers for STM32 microcontrollers with DMA data transfers.",
          completionLetterVerified: true
        }
      ],
      certificates: [
        { id: "c61", title: "ARM Cortex Embedded Systems", issuer: "edX / UT Austin", date: "Dec 2023", credentialId: "EDX-EMB-891", status: "verified", evidence: "Verified Certificate" }
      ],
      matchReasons: [
        "Embedded systems national hackathon winner",
        "Strong C++ and firmware architecture experience"
      ]
    }
  ],

  // Verification requests awaiting College TPO approval
  studentVerificationRequests: [
    {
      id: "vreq-1",
      studentId: "std-005",
      studentName: "Vikas Verma",
      enrollmentNo: "EN2022ME032",
      branch: "Mechanical Engineering",
      year: "4th Year",
      cgpa: 7.2,
      idCardImage: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=300&auto=format&fit=crop&q=80",
      submittedDate: "2026-09-12",
      status: "pending"
    },
    {
      id: "vreq-2",
      studentId: "std-006",
      studentName: "Ananya Roy",
      enrollmentNo: "EN2022EC019",
      branch: "Electronics & Communication",
      year: "4th Year",
      cgpa: 8.9,
      idCardImage: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=300&auto=format&fit=crop&q=80",
      submittedDate: "2026-09-13",
      status: "pending"
    }
  ],

  // College Profile & Placement Dashboard Overview
  collegeOverview: {
    name: "Apex Institute of Technology & Engineering",
    code: "APEX-TPO-09",
    officialEmail: "tpo@apexinstitute.ac.in",
    tpoHead: "Dr. Arvind Subramanian",
    phone: "+91 11 2789 4400",
    address: "Tech Innovation Enclave, Sector 62, NCR",
    stats: {
      totalStudents: 1240,
      verifiedStudents: 1080,
      pendingVerification: 160,
      companiesCount: 48,
      placementDrivesCount: 16,
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
    branchWiseStats: [
      { branch: "Computer Science (CSE)", total: 420, placed: 395, rate: 94, avgPackage: "8.8 LPA" },
      { branch: "Information Technology (IT)", total: 240, placed: 220, rate: 91, avgPackage: "8.2 LPA" },
      { branch: "Electronics & Comm (ECE)", total: 280, placed: 215, rate: 76, avgPackage: "6.5 LPA" },
      { branch: "Mechanical Engg (ME)", total: 180, placed: 110, rate: 61, avgPackage: "5.4 LPA" },
      { branch: "Civil Engineering (CE)", total: 120, placed: 62, rate: 51, avgPackage: "4.8 LPA" }
    ],
    packageStats: {
      highestPackage: "44.0 LPA (Microsoft)",
      averagePackage: "7.8 LPA",
      medianPackage: "6.5 LPA",
      topOffersCount: 68 // >= 12 LPA
    },
    topCompanies: [
      { name: "TCS", offers: 28, logo: "🏢", avgPackage: "7.5 LPA" },
      { name: "Infosys", offers: 24, logo: "💼", avgPackage: "6.8 LPA" },
      { name: "Accenture", offers: 18, logo: "🚀", avgPackage: "9.2 LPA" },
      { name: "Wipro", offers: 12, logo: "⚡", avgPackage: "6.5 LPA" },
      { name: "Cognizant", offers: 10, logo: "🌐", avgPackage: "7.0 LPA" }
    ],
    aiInsights: [
      {
        id: "ai-1",
        title: "Spring Boot Deficiency Alert in CSE",
        highlight: "38% of eligible CSE students are missing Spring Boot.",
        detail: "Accenture, Cognizant, and Wipro drives list Spring Boot as an essential requirement. Current batch readiness is lower than company benchmarks.",
        suggestedAction: "Organize an intensive 3-day weekend bootcamp on Spring Boot 3 & REST APIs.",
        affectedStudentsCount: 128,
        urgency: "High"
      },
      {
        id: "ai-2",
        title: "DSA Array/DP Gap Impacting Product Companies",
        highlight: "45% of students fail proctored DSA coding round in Amazon/Microsoft mocks.",
        detail: "Students clear MCQ rounds but get stuck on Trees, Recursion, and Dynamic Programming live coding questions.",
        suggestedAction: "Conduct daily LeetCode medium timed tests for students with CGPA >= 8.0.",
        affectedStudentsCount: 165,
        urgency: "Medium"
      },
      {
        id: "ai-3",
        title: "High Demand for Cloud / DevOps Certified Talent",
        highlight: "Cloud jobs offer 35% higher average package (11.5 LPA vs 7.8 LPA).",
        detail: "Only 14 students currently hold verified AWS or Azure foundational certificates in the institute.",
        suggestedAction: "Sponsor AWS Cloud Practitioner exam vouchers for top 50 ranked students.",
        affectedStudentsCount: 50,
        urgency: "Opportunity"
      }
    ],
    // Company partnership requests to conduct campus drives
    companyRequests: [
      {
        id: "req-101",
        company: "Amazon Web Services (AWS)",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        role: "Cloud Support Associate",
        package: "₹12 - 18 LPA",
        locations: ["Bengaluru", "Hyderabad"],
        eligibility: {
          minCgpa: 7.5,
          branches: ["CSE", "IT", "ECE"],
          allowedBacklogs: 0,
          academicYear: "2026"
        },
        requiredSkills: ["Linux", "Networking", "Python", "Cloud Fundamentals"],
        requestedDriveDate: "2026-10-15",
        status: "pending", // "pending" | "approved" | "rejected"
        officialRecruiter: "Anjali Saxena (University Talent Lead)"
      },
      {
        id: "req-102",
        company: "Deloitte USI",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
        role: "Associate Analyst (Cyber & Cloud)",
        package: "₹8.5 - 11 LPA",
        locations: ["Gurugram", "Bengaluru"],
        eligibility: {
          minCgpa: 7.0,
          branches: ["CSE", "IT", "ECE", "ME"],
          allowedBacklogs: 0,
          academicYear: "2026"
        },
        requiredSkills: ["Information Security", "SQL", "Python", "Problem Solving"],
        requestedDriveDate: "2026-10-08",
        status: "pending",
        officialRecruiter: "Rajeev Nambiar (Campus Head)"
      },
      {
        id: "req-103",
        company: "Accenture",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
        role: "Advanced Application Engineering Associate",
        package: "₹8.5 - 14 LPA",
        locations: ["Hyderabad", "Bengaluru", "Noida"],
        eligibility: {
          minCgpa: 7.0,
          branches: ["CSE", "IT", "ECE"],
          allowedBacklogs: 0,
          academicYear: "2026"
        },
        requiredSkills: ["Java", "Spring Boot", "SQL", "Cloud"],
        requestedDriveDate: "2026-09-28",
        status: "approved",
        officialRecruiter: "Siddharth Mehra (University Relations)"
      }
    ],
    // Placement Drives organized and published by College
    placementDrives: [
      {
        id: "drv-1",
        company: "Accenture",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
        role: "Backend Developer & Application Associate",
        package: "₹8.5 - 14 LPA",
        location: "Hyderabad / Gurugram",
        eligibility: {
          minCgpa: 7.0,
          branches: ["Computer Science & Engineering", "Information Technology", "Electronics & Comm"],
          allowedBacklogs: 0,
          academicYear: "2026"
        },
        requiredSkills: ["Java", "Spring Boot", "SQL", "REST APIs"],
        openPositions: 35,
        deadline: "2026-09-25",
        testDate: "2026-09-28",
        interviewDate: "2026-10-02",
        status: "Registration Open",
        registeredStudentsCount: 142
      },
      {
        id: "drv-2",
        company: "TCS Digital",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
        role: "Digital Software Engineer",
        package: "₹7.5 - 11.5 LPA",
        location: "Bengaluru / Pune (Hybrid)",
        eligibility: {
          minCgpa: 7.5,
          branches: ["Computer Science & Engineering", "Information Technology"],
          allowedBacklogs: 0,
          academicYear: "2026"
        },
        requiredSkills: ["Java", "SQL", "Data Structures", "Git"],
        openPositions: 40,
        deadline: "2026-09-24",
        testDate: "2026-09-27",
        interviewDate: "2026-10-05",
        status: "Shortlisting Underway",
        registeredStudentsCount: 185
      },
      {
        id: "drv-3",
        company: "Infosys Ltd",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
        role: "Specialist Programmer (SP)",
        package: "₹9.5 - 13 LPA",
        location: "Bengaluru / Mysore",
        eligibility: {
          minCgpa: 8.0,
          branches: ["Computer Science & Engineering", "Information Technology"],
          allowedBacklogs: 0,
          academicYear: "2026"
        },
        requiredSkills: ["DSA", "Java", "Python", "Problem Solving"],
        openPositions: 15,
        deadline: "2026-10-02",
        testDate: "2026-10-06",
        interviewDate: "2026-10-12",
        status: "Upcoming",
        registeredStudentsCount: 64
      }
    ]
  },

  // Opportunities: Categorized into College Placements, Off-Campus, and Internships
  opportunities: [
    // 1. College Placements (Only approved by College)
    {
      id: "job-101",
      title: "Software Developer (TCS Digital)",
      company: "TCS",
      companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80",
      type: "Full-time",
      category: "College Placement",
      salary: "₹7.5 - 11.5 LPA",
      location: "Bengaluru / Pune (Hybrid)",
      matchScore: 96,
      requiredSkills: ["Java", "SQL", "Problem Solving", "Git"],
      deadline: "2026-09-24",
      driveDate: "2026-09-27 (Online Test) • 2026-10-05 (Interview)",
      eligibilityText: "B.Tech CSE/IT, CGPA >= 7.5, 0 active backlogs",
      minCgpa: 7.5,
      branchesAllowed: ["Computer Science & Engineering", "Information Technology"],
      description: "Design and implement scalable enterprise microservices using modern Java frameworks with high concurrency.",
      status: "Approved by College",
      isCollegeApproved: true
    },
    {
      id: "job-102",
      title: "Backend Developer (Application Engineering)",
      company: "Accenture",
      companyLogo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&auto=format&fit=crop&q=80",
      type: "Full-time",
      category: "College Placement",
      salary: "₹8.5 - 14 LPA",
      location: "Hyderabad / Gurugram",
      matchScore: 92,
      requiredSkills: ["Java", "Spring Boot", "SQL", "REST APIs"],
      deadline: "2026-09-25",
      driveDate: "2026-09-28 (Assessment) • 2026-10-02 (Technical Interview)",
      eligibilityText: "B.Tech All CS/IT/ECE, CGPA >= 7.0, 0 active backlogs",
      minCgpa: 7.0,
      branchesAllowed: ["Computer Science & Engineering", "Information Technology", "Electronics & Comm"],
      description: "Build robust REST APIs, optimize relational database queries, and contribute to high-availability architecture.",
      status: "Approved by College",
      isCollegeApproved: true
    },
    {
      id: "job-107",
      title: "Specialist Programmer (Power Programmer)",
      company: "Infosys Ltd",
      companyLogo: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=100&auto=format&fit=crop&q=80",
      type: "Full-time",
      category: "College Placement",
      salary: "₹9.5 - 13 LPA",
      location: "Bengaluru / Pune",
      matchScore: 86,
      requiredSkills: ["DSA", "Java", "Python", "SQL"],
      deadline: "2026-10-02",
      driveDate: "2026-10-06 (Proctored Coding)",
      eligibilityText: "B.Tech CSE/IT, CGPA >= 8.0, 0 active backlogs",
      minCgpa: 8.0,
      branchesAllowed: ["Computer Science & Engineering", "Information Technology"],
      description: "Advanced competitive programming, architecture prototyping, and algorithmic performance engineering.",
      status: "Approved by College",
      isCollegeApproved: true
    },

    // 2. Off-Campus Jobs (Independent from college drives)
    {
      id: "job-103",
      title: "Full Stack Software Engineer",
      company: "InnovateX Tech",
      companyLogo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&auto=format&fit=crop&q=80",
      type: "Full-time",
      category: "Off-Campus",
      salary: "₹10 - 16 LPA",
      location: "Bengaluru (On-site)",
      matchScore: 85,
      requiredSkills: ["React", "Node.js", "SQL", "TypeScript", "Docker"],
      deadline: "2026-10-10",
      driveDate: "Rolling Off-Campus Screening",
      eligibilityText: "Any Engineering Degree (2025/2026 Batch), Open Eligibility",
      minCgpa: 6.5,
      branchesAllowed: ["All"],
      description: "Direct off-campus hire. Build customer-facing fintech dashboards with real-time websocket transactions.",
      status: "Open",
      isCollegeApproved: false
    },
    {
      id: "job-104",
      title: "Cloud & DevOps Associate Engineer",
      company: "CloudTech Global",
      companyLogo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=80",
      type: "Full-time",
      category: "Off-Campus",
      salary: "₹11 - 18 LPA",
      location: "Remote (India)",
      matchScore: 68,
      requiredSkills: ["AWS", "Docker", "Linux", "Python", "CI/CD"],
      deadline: "2026-10-18",
      driveDate: "Take-home practical assignment",
      eligibilityText: "B.Tech/BE, Hands-on Linux & Cloud deployment skills required",
      minCgpa: 6.0,
      branchesAllowed: ["All"],
      description: "Manage Terraform infrastructure, monitor Kubernetes clusters on AWS EKS, and support automated CI/CD pipelines.",
      status: "Open",
      isCollegeApproved: false
    },

    // 3. Internships (Paid / Unpaid, Stipend, Duration, City)
    {
      id: "job-105",
      title: "Java Backend Developer Intern",
      company: "Wipro Technologies",
      companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
      type: "Internship (Paid)",
      category: "Internship",
      salary: "₹25,000 / month",
      stipend: "₹25,000 / mo",
      duration: "6 Months (Jan 2026 - Jun 2026)",
      city: "Noida / Delhi NCR",
      workMode: "Hybrid",
      matchScore: 94,
      requiredSkills: ["Java", "Spring Boot", "SQL"],
      deadline: "2026-09-22",
      driveDate: "2026-09-26 (Technical Interview)",
      eligibilityText: "Pre-final & Final Year Students with Java proficiency",
      minCgpa: 7.0,
      branchesAllowed: ["All"],
      description: "Mentored corporate internship with hands-on enterprise Java microservices development and fast-track PPO evaluation.",
      status: "Open",
      isCollegeApproved: false
    },
    {
      id: "job-106",
      title: "Frontend Engineering Intern",
      company: "NexGen Labs",
      companyLogo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&auto=format&fit=crop&q=80",
      type: "Internship (Paid)",
      category: "Internship",
      salary: "₹18,000 / month",
      stipend: "₹18,000 / mo",
      duration: "3 Months (Immediate)",
      city: "Bengaluru",
      workMode: "Remote",
      matchScore: 78,
      requiredSkills: ["React", "Tailwind CSS", "JavaScript"],
      deadline: "2026-09-26",
      driveDate: "Coding test link sent upon apply",
      eligibilityText: "Portfolio projects in React required",
      minCgpa: 6.0,
      branchesAllowed: ["All"],
      description: "Build clean, reusable design-system components and dashboards using Tailwind and React 19.",
      status: "Open",
      isCollegeApproved: false
    },
    {
      id: "job-108",
      title: "Open Source Research Intern",
      company: "DataKernel Foundation",
      companyLogo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
      type: "Internship (Unpaid / Certificate & PPO)",
      category: "Internship",
      salary: "Certificate + Mentorship + Direct PPO Consideration",
      stipend: "Unpaid (Academic Credit + PPO)",
      duration: "2 Months",
      city: "Remote",
      workMode: "Remote",
      matchScore: 74,
      requiredSkills: ["Python", "SQL", "Git"],
      deadline: "2026-10-01",
      driveDate: "GitHub PR evaluation",
      eligibilityText: "Passionate about open-source databases and documentation",
      minCgpa: 6.0,
      branchesAllowed: ["All"],
      description: "Contribute to open-source database connectors, write integration tests, and learn under senior open-source maintainers.",
      status: "Open",
      isCollegeApproved: false
    }
  ],

  // Student Applications & ATS Tracking
  applications: [
    {
      id: "app-201",
      studentId: "std-001",
      studentName: "Rahul Sharma",
      jobId: "job-102",
      jobTitle: "Backend Developer (Application Engineering)",
      company: "Accenture",
      appliedDate: "2026-09-10",
      currentStage: "Interview", // "Applied" | "Under Review" | "Shortlisted" | "Interview" | "Selected" | "Rejected"
      status: "Interview Scheduled",
      interviewDate: "2026-09-22 at 03:00 PM",
      interviewStage: "Technical Round 1 (Java & System Architecture)",
      aiScore: 92,
      rejectionReason: null,
      improvementSuggestions: null,
      recommendedRoadmap: null,
      recruiterFeedback: "Strong fundamentals in Java and relational database design. Be ready for concurrency & indexing questions."
    },
    {
      id: "app-202",
      studentId: "std-001",
      studentName: "Rahul Sharma",
      jobId: "job-101",
      jobTitle: "Software Developer (TCS Digital)",
      company: "TCS",
      appliedDate: "2026-09-08",
      currentStage: "Shortlisted",
      status: "Shortlisted",
      interviewDate: null,
      interviewStage: "Awaiting Assessment Slot",
      aiScore: 96,
      rejectionReason: null,
      improvementSuggestions: null,
      recommendedRoadmap: null,
      recruiterFeedback: "Candidate scored 96% match. Shortlisted for upcoming TCS Digital online coding round."
    },
    {
      id: "app-203",
      studentId: "std-001",
      studentName: "Rahul Sharma",
      jobId: "job-105",
      jobTitle: "Java Backend Developer Intern",
      company: "Wipro Technologies",
      appliedDate: "2026-09-05",
      currentStage: "Interview",
      status: "Interview Scheduled",
      interviewDate: "2026-09-18 at 11:30 AM",
      interviewStage: "Technical & Problem Solving Round",
      aiScore: 94,
      rejectionReason: null,
      improvementSuggestions: null,
      recommendedRoadmap: null,
      recruiterFeedback: "Assessment score 92nd percentile. Verified Java SE 17 badge prioritized your application."
    },
    {
      id: "app-204",
      studentId: "std-001",
      studentName: "Rahul Sharma",
      jobId: "job-104",
      jobTitle: "Cloud & DevOps Associate Engineer",
      company: "CloudTech Global",
      appliedDate: "2026-09-01",
      currentStage: "Rejected",
      status: "Rejected",
      interviewDate: null,
      interviewStage: "Screening Round",
      aiScore: 68,
      rejectionReason: "Required Skill Missing: Insufficient hands-on AWS production deployment and Docker containerization evidence.",
      improvementSuggestions: [
        "Complete AWS Certified Cloud Practitioner or Solutions Architect Associate.",
        "Containerize your Java/Spring Boot project using a multi-stage Dockerfile.",
        "Deploy the Docker container onto AWS ECS or AWS App Runner and link the live URL in your resume."
      ],
      recommendedRoadmap: "Roadmap Step 7: Docker & AWS ECS Deployment",
      recruiterFeedback: "Strong backend basics, but the DevOps role requires verifiable containerization experience. Re-apply once your AWS credentials are verified!"
    },
    {
      id: "app-205",
      studentId: "std-002",
      studentName: "Priya Singh",
      jobId: "job-102",
      jobTitle: "Backend Developer (Application Engineering)",
      company: "Accenture",
      appliedDate: "2026-09-11",
      currentStage: "Shortlisted",
      status: "Shortlisted",
      interviewDate: null,
      interviewStage: "Awaiting Technical Interview Slot",
      aiScore: 95,
      rejectionReason: null,
      improvementSuggestions: null,
      recommendedRoadmap: null,
      recruiterFeedback: "Exceptional 9.1 CGPA and verified Meta Frontend & Node.js credentials. High priority candidate."
    },
    {
      id: "app-206",
      studentId: "std-003",
      studentName: "Amit Kumar",
      jobId: "job-102",
      jobTitle: "Backend Developer (Application Engineering)",
      company: "Accenture",
      appliedDate: "2026-09-09",
      currentStage: "Applied",
      status: "Under Review",
      interviewDate: null,
      interviewStage: "Profile Screening",
      aiScore: 89,
      rejectionReason: null,
      improvementSuggestions: null,
      recommendedRoadmap: null,
      recruiterFeedback: "Verified Python & Docker skills. Reviewing backend project repositories."
    },
    {
      id: "app-207",
      studentId: "std-004",
      studentName: "Neha Gupta",
      jobId: "job-102",
      jobTitle: "Backend Developer (Application Engineering)",
      company: "Accenture",
      appliedDate: "2026-09-07",
      currentStage: "Shortlisted",
      status: "Shortlisted",
      interviewDate: null,
      interviewStage: "Coding Evaluation Slot",
      aiScore: 91,
      rejectionReason: null,
      improvementSuggestions: null,
      recommendedRoadmap: null,
      recruiterFeedback: "Verified Spring Cloud microservices architecture experience."
    }
  ],

  // Company Profile & ATS Recruiter Overview
  companyOverview: {
    name: "Accenture Technologies",
    officialEmail: "campus.recruiting@accenture.com",
    recruiterName: "Siddharth Mehra",
    recruiterTitle: "Head of University Relations & Campus ATS",
    stats: {
      activeJobs: 6,
      totalApplications: 148,
      shortlisted: 42,
      interviewsScheduled: 18,
      selectedCandidates: 12,
      hiringPerformanceRate: 88
    },
    hiringMetrics: {
      shortlistRate: "28.3%",
      interviewRate: "12.1%",
      selectionRate: "8.1%",
      avgTimeToHire: "14 Days",
      topSkillsDemanded: ["Java", "Spring Boot", "SQL", "Microservices", "React"]
    }
  }
};
