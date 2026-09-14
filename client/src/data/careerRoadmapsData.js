// Comprehensive Career Roadmaps with Free (YouTube Channels & Playlists) and Paid Resources

export const popularJobRoles = [
  {
    id: "java_backend",
    title: "Java Backend Developer",
    subtitle: "Enterprise Java, Spring Boot 3, Microservices & SQL",
    category: "Backend & Systems",
    demand: "Very High Demand",
    avgSalary: "₹8 - 24 LPA",
    icon: "Server",
    color: "from-amber-500 to-red-600",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    tags: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Kafka", "Docker"]
  },
  {
    id: "fullstack_mern",
    title: "Full Stack Developer (MERN / Next.js)",
    subtitle: "React 19, Next.js 15, Node.js, Express & MongoDB",
    category: "Full Stack Web",
    demand: "High Demand",
    avgSalary: "₹7 - 20 LPA",
    icon: "Globe",
    color: "from-blue-600 to-indigo-600",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS"]
  },
  {
    id: "frontend_react",
    title: "Frontend Engineer (React / TypeScript)",
    subtitle: "Modern React, TypeScript, Redux Toolkit, Web Performance & UI/UX",
    category: "Frontend Web",
    demand: "High Demand",
    avgSalary: "₹6 - 18 LPA",
    icon: "Layout",
    color: "from-cyan-500 to-blue-600",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    tags: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind", "Jest"]
  },
  {
    id: "ai_ml_engineer",
    title: "AI / Machine Learning Engineer",
    subtitle: "Python, PyTorch, Scikit-Learn, LLMs, LangChain & GenAI",
    category: "Artificial Intelligence",
    demand: "Extreme Demand",
    avgSalary: "₹10 - 32 LPA",
    icon: "Sparkles",
    color: "from-purple-600 to-pink-600",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    tags: ["Python", "PyTorch", "NumPy", "Deep Learning", "LLMs", "LangChain"]
  },
  {
    id: "devops_cloud",
    title: "DevOps & Cloud Engineer",
    subtitle: "Linux, Docker, Kubernetes, AWS, Terraform & CI/CD Pipelines",
    category: "Cloud & Infrastructure",
    demand: "Very High Demand",
    avgSalary: "₹9 - 26 LPA",
    icon: "Cloud",
    color: "from-sky-500 to-blue-700",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    tags: ["Linux", "AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"]
  },
  {
    id: "data_analyst",
    title: "Data Analyst & BI Specialist",
    subtitle: "Advanced SQL, Power BI, Tableau, Python (Pandas) & Business Metrics",
    category: "Data Analytics",
    demand: "High Demand",
    avgSalary: "₹6 - 16 LPA",
    icon: "BarChart3",
    color: "from-emerald-500 to-teal-600",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tags: ["SQL", "Excel", "Power BI", "Tableau", "Python", "Data Modeling"]
  },
  {
    id: "android_mobile",
    title: "Android / Mobile App Developer",
    subtitle: "Kotlin, Jetpack Compose, Coroutines, MVVM & Flutter",
    category: "Mobile Development",
    demand: "High Demand",
    avgSalary: "₹6 - 18 LPA",
    icon: "Smartphone",
    color: "from-green-500 to-emerald-600",
    badgeColor: "bg-green-50 text-green-700 border-green-200",
    tags: ["Kotlin", "Jetpack Compose", "Android SDK", "Coroutines", "Flutter", "Firebase"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Security Analyst",
    subtitle: "Network Security, Ethical Hacking, SOC, SIEM & Penetration Testing",
    category: "Security & Networking",
    demand: "Very High Demand",
    avgSalary: "₹8 - 25 LPA",
    icon: "Shield",
    color: "from-rose-500 to-red-700",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    tags: ["Networking", "Linux", "Wireshark", "Burp Suite", "SOC", "SIEM"]
  }
];

export const predefinedRoadmaps = {
  // -------------------------------------------------------------
  // 1. JAVA BACKEND DEVELOPER
  // -------------------------------------------------------------
  java_backend: {
    roleId: "java_backend",
    roleName: "Java Backend Developer",
    tagline: "From Core Java fundamentals to enterprise-ready Spring Boot microservices and system design",
    targetCompanies: ["Amazon", "TCS Digital", "Accenture", "Infosys", "Oracle", "Morgan Stanley", "JPMorgan"],
    estimatedDuration: "6 to 8 Months (15-20 hours/week)",
    aiCompatibilityScore: 92,
    stages: [
      {
        id: 1,
        phase: "Phase 1: Foundations (Weeks 1-4)",
        title: "Java Core, OOP & Memory Management",
        category: "Core Tech",
        status: "completed",
        progress: 100,
        desc: "Master Java syntax, JVM architecture, Memory Heap vs Stack, Garbage Collection, and Object-Oriented Principles.",
        keyTopics: [
          "JVM, JRE, JDK internals & bytecode execution",
          "OOP 4 Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism",
          "Exception handling (Checked vs Unchecked exceptions)",
          "Multithreading, Synchronization & ThreadPoolExecutor"
        ],
        project: {
          title: "Multi-Threaded CLI File Downloader & Hash Verifier",
          desc: "Build a multithreaded command-line utility with thread pooling and checksum verification."
        },
        freeResources: [
          {
            channel: "Kunāl Kushwaha",
            title: "Java + DSA Complete Bootcamp (Hinglish)",
            type: "YouTube Channel & Playlist",
            url: "https://www.youtube.com/@kunalkushwaha",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Complete playlist covering fundamentals, memory management, and debugging from scratch."
          },
          {
            channel: "Telusko (Navin Reddy)",
            title: "Java Full Course for Beginners to Advanced",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@Telusko",
            badge: "Free YouTube",
            language: "English / Hinglish",
            desc: "12-hour comprehensive Java walkthrough with OOP principles, Collections, and practical demos."
          },
          {
            channel: "freeCodeCamp.org",
            title: "Java Programming Full Course (10 Hours)",
            type: "YouTube Video",
            url: "https://www.youtube.com/watch?v=A74TOX803D0",
            badge: "Free YouTube",
            language: "English",
            desc: "Hands-on video course covering all core concepts with code snippets."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "Java Programming Masterclass updated to Java 21",
            instructor: "Tim Buchalka",
            url: "https://www.udemy.com/course/java-the-complete-java-developer-course/",
            price: "~₹499 on sale",
            rating: "4.7 ★ (200k+ students)",
            desc: "Deep industry-standard syllabus with 80+ hours of exercises, unit testing, and concurrency."
          },
          {
            platform: "Coursera",
            title: "Java Programming and Software Engineering Fundamentals",
            instructor: "Duke University",
            url: "https://www.coursera.org/specializations/java-programming",
            price: "Free to Audit / Financial Aid available",
            rating: "4.6 ★",
            desc: "Academic accredited certification focusing on algorithm design and clean software architecture."
          }
        ]
      },
      {
        id: 2,
        phase: "Phase 2: Data Structures & Collections (Weeks 5-8)",
        title: "Collections Framework, Streams API & Algorithmic Foundations",
        category: "Data Structures",
        status: "completed",
        progress: 100,
        desc: "Deep dive into ArrayList, HashMap internals, HashSet, ConcurrentHashMap, Lambda expressions, and Streams filter/map/reduce.",
        keyTopics: [
          "HashMap internal collision resolution (Buckets, Red-Black Trees)",
          "Java Collections (List, Set, Queue, Deque, PriorityQueue)",
          "Functional Interfaces, Lambdas & Streams API pipelines",
          "DSA: Arrays, Two Pointers, Sliding Window & Hashing"
        ],
        project: {
          title: "In-Memory Key-Value Store with Eviction Policies (LRU)",
          desc: "Implement a thread-safe LRU Cache using HashMap and Doubly Linked List in pure Java."
        },
        freeResources: [
          {
            channel: "take U forward (Striver)",
            title: "A2Z DSA Course & Collections Playlist",
            type: "YouTube Channel & Sheet",
            url: "https://www.youtube.com/@takeUforward",
            badge: "Free YouTube",
            language: "Hinglish / English",
            desc: "The gold standard for technical placement interviews at FAANG and top MNCs."
          },
          {
            channel: "Abdul Bari",
            title: "Data Structures & Algorithms Detailed Tutorials",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@abdul_bari",
            badge: "Free YouTube",
            language: "English",
            desc: "World-class visual animations of trees, graphs, dynamic programming, and asymptotic notations."
          }
        ],
        paidResources: [
          {
            platform: "Educative.io",
            title: "Grokking the Coding Interview: Patterns for Coding Questions",
            instructor: "Educative Engineering Team",
            url: "https://www.educative.io/courses/grokking-the-coding-interview",
            price: "Subscription (~₹1,200/mo)",
            rating: "4.9 ★",
            desc: "Interactive browser coding for 16 core patterns (Two pointers, Fast & Slow, Top K)."
          }
        ]
      },
      {
        id: 3,
        phase: "Phase 3: Database & SQL Mastery (Weeks 9-12)",
        title: "Relational Databases, PostgreSQL, Indexing & ACID Transactions",
        category: "Database & ORM",
        status: "completed",
        progress: 100,
        desc: "Master relational schema design, 3rd Normal Form, B-Tree indexes, EXPLAIN ANALYZE, and ACID transaction isolation levels.",
        keyTopics: [
          "PostgreSQL & MySQL advanced queries and window functions",
          "B-Tree, Hash, and GIN Indexing strategies",
          "ACID properties & Transaction Isolation (Dirty reads, Phantom reads)",
          "JDBC, Connection Pooling (HikariCP) & introduction to Hibernate"
        ],
        project: {
          title: "E-Commerce Database Schema with High-Volume Indexing",
          desc: "Design an optimized database schema handling 100,000 product records with complex analytical queries."
        },
        freeResources: [
          {
            channel: "Hussein Nasser",
            title: "Database Engineering Mastery & PostgreSQL Deep Dives",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@hnasr",
            badge: "Free YouTube",
            language: "English",
            desc: "In-depth engineering discussions on DB indexing, connection pooling, ACID, and replication."
          },
          {
            channel: "CodeWithHarry",
            title: "Complete SQL & Database Bootcamp (Hinglish)",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@CodeWithHarry",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Beginner to advanced SQL commands, joins, aggregations, and subqueries."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "The Complete SQL Bootcamp: Go from Zero to Hero",
            instructor: "Jose Portilla",
            url: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
            price: "~₹499 on sale",
            rating: "4.7 ★ (180k+ students)",
            desc: "PostgreSQL, pgAdmin, and database optimization."
          }
        ]
      },
      {
        id: 4,
        phase: "Phase 4: Frameworks & Web APIs (Weeks 13-18)",
        title: "Spring Boot 3, Spring Security 6, JWT & RESTful APIs",
        category: "Backend Frameworks",
        status: "in_progress",
        progress: 65,
        desc: "Build enterprise REST APIs with Spring Data JPA, Spring Security 6, Stateless JWT authentication, validation, and Swagger documentation.",
        keyTopics: [
          "Inversion of Control (IoC) & Dependency Injection (@Component, @Autowired)",
          "Spring Data JPA, Hibernate ORM, Entity relationships (@OneToMany, @ManyToMany)",
          "Spring Security 6 with custom JWT Filter & Role-Based Access Control (RBAC)",
          "Global Exception Handling (@ControllerAdvice) & DTO pattern"
        ],
        project: {
          title: "High-Throughput Banking & Payment Microservice",
          desc: "Engineered banking microservice with JWT auth, wallet transfers, and idempotent payment processing."
        },
        freeResources: [
          {
            channel: "Amigoscode (Nelson)",
            title: "Spring Boot 3 & Microservices Full Course",
            type: "YouTube Channel & Tutorials",
            url: "https://www.youtube.com/@amigoscode",
            badge: "Free YouTube",
            language: "English",
            desc: "Modern Spring Boot 3 tutorials covering architecture, Docker integration, and unit testing."
          },
          {
            channel: "Durgesh (Learn Code With Durgesh)",
            title: "Complete Spring Boot + Spring Security with JWT in Hindi",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@LearnCodeWithDurgesh",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Step-by-step Hindi explanations of Spring Boot annotations, JPA, and JWT filters."
          },
          {
            channel: "Java Guides (Ramesh Fadatare)",
            title: "Building Real-World Spring Boot REST APIs",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@JavaGuides",
            badge: "Free YouTube",
            language: "English",
            desc: "Extensive library of Spring Boot CRUD apps, DTO mapping, and testing with JUnit 5."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "Spring Boot 3, Spring 6 & Hibernate for Beginners",
            instructor: "Chad Darby",
            url: "https://www.udemy.com/course/spring-hibernate-tutorial/",
            price: "~₹499 on sale",
            rating: "4.7 ★ (120k+ reviews)",
            desc: "Highest rated Spring Boot course covering REST APIs, JPA, Security, and Thymeleaf."
          },
          {
            platform: "Pluralsight",
            title: "Spring Framework 6 Path: Core & Microservices",
            instructor: "Pluralsight Expert Authors",
            url: "https://www.pluralsight.com/paths/spring-framework",
            price: "Subscription (~₹1,499/mo)",
            rating: "4.8 ★",
            desc: "Enterprise training path with interactive skill assessments."
          }
        ]
      },
      {
        id: 5,
        phase: "Phase 5: DevOps, Cloud & Caching (Weeks 19-24)",
        title: "Docker, Redis Caching, Kafka Messaging & AWS Deployment",
        category: "Cloud & Scalability",
        status: "pending",
        progress: 15,
        desc: "Take backend apps to production. Dockerize container images, integrate Redis distributed caching, Kafka event streaming, and deploy on AWS ECS/EC2.",
        keyTopics: [
          "Multi-stage Dockerfile for lightweight Java container images",
          "Redis caching strategies (Cache-Aside, Write-Through, TTL)",
          "Asynchronous event-driven architecture using Apache Kafka / RabbitMQ",
          "AWS deployment basics: EC2, RDS PostgreSQL, S3 & Load Balancer"
        ],
        project: {
          title: "Distributed Order Processing Pipeline with Kafka & Redis",
          desc: "Event-driven architecture where orders trigger payment and notification services asynchronously with Redis caching."
        },
        freeResources: [
          {
            channel: "TechWorld with Nana",
            title: "Docker & Kubernetes Full Course for Beginners",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@TechWorldwithNana",
            badge: "Free YouTube",
            language: "English",
            desc: "Visual walkthroughs of containers, images, ports, and container orchestration."
          },
          {
            channel: "Abhishek.Veeramalla",
            title: "DevOps Zero to Hero (Hinglish)",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@AbhishekVeeramalla",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Real-time AWS EC2 deployment, Docker, and CI/CD pipelines explained for college students."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "Docker & Kubernetes: The Practical Guide",
            instructor: "Maximilian Schwarzmüller",
            url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
            price: "~₹499 on sale",
            rating: "4.8 ★",
            desc: "Hands-on containerization and Kubernetes cluster deployment."
          },
          {
            platform: "Coursera",
            title: "AWS Fundamentals: Going Cloud-Native",
            instructor: "Amazon Web Services (Official)",
            url: "https://www.coursera.org/learn/aws-fundamentals-going-cloud-native",
            price: "Free to Audit / Financial Aid",
            rating: "4.7 ★",
            desc: "Official AWS certification curriculum for compute, storage, and networking."
          }
        ]
      },
      {
        id: 6,
        phase: "Phase 6: Placement Prep & System Design (Weeks 25-28)",
        title: "High-Level System Design & Placement Interview Readiness",
        category: "Interview Preparation",
        status: "pending",
        progress: 0,
        desc: "Prepare for campus placement technical rounds, system design (Rate Limiter, URL Shortener, Notification Service), and HR behavioral STAR answers.",
        keyTopics: [
          "System Design: Scalability, Load Balancing, Horizontal vs Vertical scaling",
          "CAP Theorem, Consistent Hashing, Message Queues vs WebSockets",
          "Mock technical interviews with algorithmic time-complexity trade-offs",
          "ATS-compliant single-column resume optimization"
        ],
        project: {
          title: "Production System Design Architecture Blueprint",
          desc: "Author an architecture design document and functional prototype for a Scalable URL Shortener handling 10M daily clicks."
        },
        freeResources: [
          {
            channel: "Gaurav Sen (GKCS)",
            title: "System Design for Beginners & Software Engineers",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@gkcs",
            badge: "Free YouTube",
            language: "English",
            desc: "Clear visual breakdown of URL shorteners, distributed caching, and microservices."
          },
          {
            channel: "NeetCode",
            title: "System Design & Algorithms Roadmap",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@NeetCode",
            badge: "Free YouTube",
            language: "English",
            desc: "Clean diagrams explaining core system design building blocks."
          }
        ],
        paidResources: [
          {
            platform: "Educative.io",
            title: "Grokking Modern System Design Interview for Engineers",
            instructor: "Educative Engineering",
            url: "https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers",
            price: "Subscription (~₹1,200/mo)",
            rating: "4.9 ★",
            desc: "The gold standard text-based course for software engineering placement interviews."
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 2. FULL STACK DEVELOPER (MERN / Next.js)
  // -------------------------------------------------------------
  fullstack_mern: {
    roleId: "fullstack_mern",
    roleName: "Full Stack Developer (MERN / Next.js)",
    tagline: "Master modern web development from HTML/CSS/JS to React 19, Next.js 15, Node.js, and Cloud deployment",
    targetCompanies: ["Razorpay", "Swiggy", "Zomato", "Cred", "PhonePe", "Flipkart", "Juspay"],
    estimatedDuration: "6 Months (15-20 hours/week)",
    aiCompatibilityScore: 89,
    stages: [
      {
        id: 1,
        phase: "Phase 1: Web Fundamentals & Modern JavaScript (Weeks 1-4)",
        title: "HTML5, CSS3, Tailwind CSS & ES6+ JavaScript",
        category: "Frontend Core",
        status: "completed",
        progress: 100,
        desc: "Master modern responsive design, Flexbox/Grid, semantic markup, and advanced JavaScript (closures, promises, event loop, async/await).",
        keyTopics: [
          "Semantic HTML5 & Responsive UI with Tailwind CSS",
          "JavaScript Execution Context, Call Stack & Event Loop",
          "ES6+ features: Destructuring, Spread, Modules, Arrow functions",
          "DOM Manipulation, Fetch API & Async/Await error handling"
        ],
        project: {
          title: "Interactive SaaS Dashboard UI with Dark Mode",
          desc: "Responsive web UI with animated charts, search filtering, and theme switching using Tailwind CSS."
        },
        freeResources: [
          {
            channel: "Chai aur Code (Hitesh Choudhary)",
            title: "Complete JavaScript in Hindi (Chai aur JavaScript)",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@chaiaurcode",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "The most popular Hindi JavaScript series covering memory execution, DOM, and async JS."
          },
          {
            channel: "Sheryians Coding School",
            title: "Advanced JavaScript & DOM Animations",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@sheryians",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Engaging Hindi tutorials on modern JS, GSAP, and frontend interactions."
          },
          {
            channel: "Traversy Media",
            title: "Modern JavaScript From The Beginning",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@TraversyMedia",
            badge: "Free YouTube",
            language: "English",
            desc: "Practical no-nonsense project-based JavaScript guide."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "The Complete 2024 Web Development Bootcamp",
            instructor: "Dr. Angela Yu",
            url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
            price: "~₹499 on sale",
            rating: "4.7 ★ (350k+ reviews)",
            desc: "World's most popular all-in-one web development course from frontend to backend."
          },
          {
            platform: "Udemy",
            title: "JavaScript - The Complete Guide (Beginner + Advanced)",
            instructor: "Maximilian Schwarzmüller",
            url: "https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/",
            price: "~₹499 on sale",
            rating: "4.7 ★",
            desc: "Comprehensive deep dive into JS internals, OOP, browser APIs, and testing."
          }
        ]
      },
      {
        id: 2,
        phase: "Phase 2: React 19 & State Management (Weeks 5-10)",
        title: "React Component Architecture, Hooks & Redux Toolkit",
        category: "Frontend Frameworks",
        status: "in_progress",
        progress: 75,
        desc: "Build single-page apps with functional components, custom hooks (useEffect, useMemo, useCallback), Context API, and Redux Toolkit.",
        keyTopics: [
          "Virtual DOM & Component Reconciliation",
          "React Hooks: useState, useEffect, useRef, useReducer, useMemo",
          "Global State Management with Redux Toolkit & Zustand",
          "React Router v6 & protected authentication routes"
        ],
        project: {
          title: "Real-Time Collaboration Kanban Workspace (Trello Clone)",
          desc: "Full drag-and-drop task board with subtasks, labels, and local state persistence."
        },
        freeResources: [
          {
            channel: "CodeWithHarry",
            title: "React JS Tutorial in Hindi (Sigma Web Dev Series)",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@CodeWithHarry",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Clear explanations of state, props, hooks, and project development."
          },
          {
            channel: "Web Dev Simplified (Kyle)",
            title: "Learn React Hooks in 1 Hour",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@WebDevSimplified",
            badge: "Free YouTube",
            language: "English",
            desc: "Ultra-clear code demonstrations of tricky React concepts."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "React - The Complete Guide (incl. React Router & Redux)",
            instructor: "Maximilian Schwarzmüller",
            url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
            price: "~₹499 on sale",
            rating: "4.7 ★ (180k+ students)",
            desc: "The standard comprehensive React course updated with latest features."
          },
          {
            platform: "Coursera",
            title: "Meta Front-End Developer Professional Certificate",
            instructor: "Meta Staff",
            url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
            price: "Subscription / Financial Aid",
            rating: "4.7 ★",
            desc: "Official 9-course certificate program created by Meta engineers."
          }
        ]
      },
      {
        id: 3,
        phase: "Phase 3: Backend with Node.js, Express & MongoDB (Weeks 11-16)",
        title: "Server-side REST APIs, Authentication & Database Modeling",
        category: "Backend Core",
        status: "in_progress",
        progress: 40,
        desc: "Develop robust RESTful APIs with Node.js, Express middleware, MongoDB Mongoose schemas, JWT cookies, and Bcrypt password hashing.",
        keyTopics: [
          "Node.js Event-driven Architecture & File System (fs/streams)",
          "Express routing, error handling middleware, CORS, rate limiting",
          "MongoDB aggregation pipelines, indexing & Mongoose validations",
          "Stateless JWT auth with HttpOnly cookies & refresh tokens"
        ],
        project: {
          title: "Job Portal API with Resume Upload & Application Tracking",
          desc: "RESTful backend with Cloudinary PDF uploads, JWT role verification, and email alerts via Nodemailer."
        },
        freeResources: [
          {
            channel: "Chai aur Code",
            title: "Chai aur Backend (Node.js, Express & MongoDB Series)",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@chaiaurcode",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Production-grade backend series building an industry-level Video platform API."
          },
          {
            channel: "freeCodeCamp.org",
            title: "Node.js and Express.js - Full Course",
            type: "YouTube Video",
            url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
            badge: "Free YouTube",
            language: "English",
            desc: "8-hour comprehensive backend guide with practical code walkthroughs."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
            instructor: "Jonas Schmedtmann",
            url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
            price: "~₹499 on sale",
            rating: "4.8 ★",
            desc: "Deep architectural patterns, security best practices, and production deployment."
          }
        ]
      },
      {
        id: 4,
        phase: "Phase 4: Full Stack Next.js 15 & Full Stack Integration (Weeks 17-22)",
        title: "Next.js App Router, Server Components & TypeScript",
        category: "Full Stack Framework",
        status: "pending",
        progress: 10,
        desc: "Level up with Next.js 15: Server-Side Rendering (SSR), Static Site Generation (SSG), Server Actions, Prisma ORM, and TypeScript.",
        keyTopics: [
          "Next.js 15 App Router, Layouts & Server vs Client Components",
          "TypeScript interfaces, generics, and strict type safety",
          "Prisma ORM with PostgreSQL / Supabase databases",
          "NextAuth.js v5 social logins (Google, GitHub) & credentials"
        ],
        project: {
          title: "Full-Stack SaaS Platform with Stripe Payments & AI Assistant",
          desc: "Production Next.js 15 web app featuring OpenAI streaming responses, Clerk auth, and Stripe billing."
        },
        freeResources: [
          {
            channel: "Piyush Garg",
            title: "Next.js 14/15 Full Course & System Architecture",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@piyushgarg1",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Clear Hindi explanations of Next.js server components, SSR, and production deployment."
          },
          {
            channel: "JavaScript Mastery (Adrian)",
            title: "Next.js 15 Full Stack Production Apps",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@javascriptmastery",
            badge: "Free YouTube",
            language: "English",
            desc: "Stunning production-grade portfolio projects with clean code and modern designs."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "Next.js 15 & React - The Complete Guide",
            instructor: "Maximilian Schwarzmüller",
            url: "https://www.udemy.com/course/nextjs-react-the-complete-guide/",
            price: "~₹499 on sale",
            rating: "4.8 ★",
            desc: "Complete guide to Next.js App Router, Server Actions, caching, and Vercel deployment."
          }
        ]
      },
      {
        id: 5,
        phase: "Phase 5: Deployment, Testing & Placement Interview Prep (Weeks 23-26)",
        title: "Docker, CI/CD, Unit Testing & Web System Design",
        category: "Production & Interviews",
        status: "pending",
        progress: 0,
        desc: "Deploy full stack apps using Docker on AWS / Vercel, setup GitHub Actions CI/CD, write Vitest/Jest unit tests, and prepare for frontend system design.",
        keyTopics: [
          "Containerizing MERN / Next.js with Docker & Nginx reverse proxy",
          "Automated CI/CD with GitHub Actions and linting/test gates",
          "Frontend System Design: Infinite scroll, debouncing, asset optimization",
          "Placement Interview preparation: Machine coding rounds & DSA in JS"
        ],
        project: {
          title: "Verified Portfolio with 3 Production Live Apps",
          desc: "Personal developer portfolio hosted on custom domain with lighthouse score 95+ and live demos."
        },
        freeResources: [
          {
            channel: "Akshay Saini",
            title: "Namaste JavaScript & Namaste React",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@akshaymarch7",
            badge: "Free YouTube",
            language: "Hinglish / English",
            desc: "Industry-standard interview questions on JavaScript internals, currying, polyfills, and React."
          },
          {
            channel: "Striver (take U forward)",
            title: "Technical Interview DSA Problem Solving",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@takeUforward",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Top placement coding problems for software engineering roles."
          }
        ],
        paidResources: [
          {
            platform: "Educative.io",
            title: "Grokking the Front End System Design Interview",
            instructor: "Educative Engineering",
            url: "https://www.educative.io/courses/grokking-the-front-end-system-design-interview",
            price: "Subscription (~₹1,200/mo)",
            rating: "4.8 ★",
            desc: "Framework for solving web performance, caching, and large-scale UI system design rounds."
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 3. AI / MACHINE LEARNING ENGINEER
  // -------------------------------------------------------------
  ai_ml_engineer: {
    roleId: "ai_ml_engineer",
    roleName: "AI / Machine Learning Engineer",
    tagline: "From Mathematics & Python to Deep Learning, LLMs, and Generative AI Applications",
    targetCompanies: ["Google", "Microsoft", "Amazon", "NVIDIA", "Adobe", "Fractal Analytics", "Mu Sigma"],
    estimatedDuration: "6 to 9 Months (15-20 hours/week)",
    aiCompatibilityScore: 88,
    stages: [
      {
        id: 1,
        phase: "Phase 1: Math Foundations & Python for Data Science (Weeks 1-4)",
        title: "Linear Algebra, Statistics, NumPy & Pandas",
        category: "Core Math & Python",
        status: "completed",
        progress: 100,
        desc: "Master vectors, matrices, eigenvalues, multivariate calculus, probability distributions, and Python data manipulation libraries.",
        keyTopics: [
          "Linear Algebra: Matrix operations, Eigenvectors, SVD",
          "Probability & Statistics: Bayes Theorem, Normal distribution, Hypothesis testing",
          "NumPy arrays, broadcasting, vectorization vs loops",
          "Pandas DataFrames: Cleaning, merging, groupby, pivot tables"
        ],
        project: {
          title: "Exploratory Data Analysis (EDA) of Global Healthcare Datasets",
          desc: "Comprehensive statistical notebook using Pandas and Seaborn with automated anomaly detection."
        },
        freeResources: [
          {
            channel: "Krish Naik",
            title: "Complete Python & Statistics for Machine Learning (Hinglish)",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@krishnaik06",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Top Indian educator for Data Science with complete end-to-end playlists."
          },
          {
            channel: "StatQuest with Josh Starmer",
            title: "Statistics & Machine Learning Clearly Explained",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@statquest",
            badge: "Free YouTube",
            language: "English",
            desc: "Unmatched visual intuitive animations explaining complex statistical formulas."
          },
          {
            channel: "3Blue1Brown",
            title: "Essence of Linear Algebra & Neural Networks",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@3blue1brown",
            badge: "Free YouTube",
            language: "English",
            desc: "Breathtaking geometric intuition for matrices, transformations, and calculus."
          }
        ],
        paidResources: [
          {
            platform: "Coursera",
            title: "Mathematics for Machine Learning and Data Science Specialization",
            instructor: "DeepLearning.AI (Andrew Ng)",
            url: "https://www.coursera.org/specializations/mathematics-for-machine-learning-and-data-science",
            price: "Free to Audit / Financial Aid",
            rating: "4.9 ★",
            desc: "Foundational mathematics specifically geared for machine learning algorithms."
          }
        ]
      },
      {
        id: 2,
        phase: "Phase 2: Classical Machine Learning (Weeks 5-10)",
        title: "Supervised & Unsupervised ML Algorithms with Scikit-Learn",
        category: "Machine Learning",
        status: "in_progress",
        progress: 60,
        desc: "Build, evaluate, and tune Linear/Logistic Regression, Decision Trees, Random Forests, XGBoost, K-Means clustering, and PCA.",
        keyTopics: [
          "Supervised Learning: Regression, Classification, Cost functions",
          "Ensemble methods: Bagging, Boosting (Random Forest, XGBoost, LightGBM)",
          "Model Evaluation: Confusion Matrix, ROC-AUC, F1-Score, Cross-Validation",
          "Feature Engineering: One-hot encoding, StandardScaler, Handling missing data"
        ],
        project: {
          title: "End-to-End Credit Risk Prediction Pipeline with MLflow",
          desc: "Built model predicting loan default probabilities with 89% AUC-ROC, deployed with FastAPI."
        },
        freeResources: [
          {
            channel: "CampusX (Nitish Singh)",
            title: "100 Days of Machine Learning in Hindi",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@CampusX-official",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Most thorough Hindi playlist covering mathematical derivations and code implementations."
          },
          {
            channel: "freeCodeCamp.org",
            title: "Machine Learning with Python and Scikit-Learn",
            type: "YouTube Video",
            url: "https://www.youtube.com/watch?v=7eh4d6sabA0",
            badge: "Free YouTube",
            language: "English",
            desc: "Hands-on projects covering supervised and unsupervised learning."
          }
        ],
        paidResources: [
          {
            platform: "Coursera",
            title: "Machine Learning Specialization",
            instructor: "Andrew Ng (DeepLearning.AI & Stanford)",
            url: "https://www.coursera.org/specializations/machine-learning-introduction",
            price: "Free to Audit / Financial Aid",
            rating: "4.9 ★ (150k+ reviews)",
            desc: "The world's most renowned machine learning course by pioneer Andrew Ng."
          }
        ]
      },
      {
        id: 3,
        phase: "Phase 3: Deep Learning & Computer Vision / NLP (Weeks 11-16)",
        title: "Neural Networks, PyTorch, CNNs, RNNs & Transformers",
        category: "Deep Learning",
        status: "pending",
        progress: 20,
        desc: "Master artificial neural networks with PyTorch: Backpropagation, Convolutional Neural Networks (CNNs) for vision, and Transformers for NLP.",
        keyTopics: [
          "PyTorch Tensors, Autograd, Custom Datasets & DataLoader",
          "CNNs: Convolution, Pooling, ResNet architectures & Transfer Learning",
          "NLP fundamentals: Word2Vec, Tokenization, Attention Mechanism",
          "Hugging Face Transformers: BERT, RoBERTa fine-tuning"
        ],
        project: {
          title: "Multi-Class Medical Imaging Classifier with ResNet-50",
          desc: "Fine-tuned deep learning vision model classifying chest X-rays with PyTorch and Weights & Biases tracking."
        },
        freeResources: [
          {
            channel: "Daniel Bourke",
            title: "PyTorch for Deep Learning Bootcamp",
            type: "YouTube Video (24 Hours)",
            url: "https://www.youtube.com/@mrdbourke",
            badge: "Free YouTube",
            language: "English",
            desc: "Hands-on PyTorch course building computer vision and classification models from zero."
          },
          {
            channel: "Krish Naik",
            title: "Deep Learning with PyTorch & TensorFlow Series",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@krishnaik06",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Practical ANN, CNN, and RNN implementations in Hindi."
          }
        ],
        paidResources: [
          {
            platform: "Coursera",
            title: "Deep Learning Specialization (5 Courses)",
            instructor: "DeepLearning.AI (Andrew Ng)",
            url: "https://www.coursera.org/specializations/deep-learning",
            price: "Free to Audit / Financial Aid",
            rating: "4.9 ★",
            desc: "In-depth masterclass on hyperparameter tuning, structuring ML projects, CNNs, and Sequence Models."
          }
        ]
      },
      {
        id: 4,
        phase: "Phase 4: Generative AI, LLMs & LangChain (Weeks 17-22)",
        title: "RAG Systems, Vector Databases, Prompt Engineering & LangChain",
        category: "Generative AI",
        status: "pending",
        progress: 0,
        desc: "Build modern generative AI applications: Retrieval-Augmented Generation (RAG), embeddings, Vector databases (Pinecone/ChromaDB), and autonomous agents.",
        keyTopics: [
          "Prompt Engineering techniques (Few-shot, Chain-of-Thought)",
          "Vector Embeddings, Semantic Search & Vector DBs (Chroma, Pinecone)",
          "LangChain & LlamaIndex for document question-answering pipelines",
          "Open-source LLMs (Llama 3, Mistral) fine-tuning with LoRA / QLoRA"
        ],
        project: {
          title: "Enterprise Document Intelligence RAG Assistant",
          desc: "Upload PDFs and question-answer with citations using LangChain, OpenAI embeddings, and ChromaDB."
        },
        freeResources: [
          {
            channel: "Krish Naik",
            title: "Generative AI with LangChain & OpenAI Series",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@krishnaik06",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Step-by-step tutorials on LangChain, HuggingFace, ChromaDB, and building end-to-end RAG."
          },
          {
            channel: "freeCodeCamp.org",
            title: "LangChain and Vector Databases Crash Course",
            type: "YouTube Video",
            url: "https://www.youtube.com/watch?v=aywZrzNaKjs",
            badge: "Free YouTube",
            language: "English",
            desc: "Build AI applications with Python, LangChain, and Pinecone."
          }
        ],
        paidResources: [
          {
            platform: "DeepLearning.AI",
            title: "Short Courses on GenAI, LangChain & LLM Agents",
            instructor: "Andrew Ng & Industry Partners",
            url: "https://www.deeplearning.ai/short-courses/",
            price: "Free / Certificate option",
            rating: "4.9 ★",
            desc: "Cutting-edge 1-hour courses on building RAG, function calling, and evaluation."
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // 4. DEVOPS & CLOUD ENGINEER
  // -------------------------------------------------------------
  devops_cloud: {
    roleId: "devops_cloud",
    roleName: "DevOps & Cloud Engineer",
    tagline: "Automate infrastructure, CI/CD pipelines, container orchestration, and cloud architecture",
    targetCompanies: ["AWS", "Red Hat", "Cisco", "Infosys", "Wipro", "Capgemini", "Cognizant"],
    estimatedDuration: "6 Months (15-20 hours/week)",
    aiCompatibilityScore: 86,
    stages: [
      {
        id: 1,
        phase: "Phase 1: Linux, Networking & Bash Scripting (Weeks 1-4)",
        title: "Linux Command Line, Shell Scripting & TCP/IP",
        category: "Operating Systems",
        status: "completed",
        progress: 100,
        desc: "Master Ubuntu/CentOS file systems, permissions (chmod, chown), process monitoring (ps, top, systemctl), networking (SSH, DNS, IP), and Bash automation.",
        keyTopics: [
          "Linux System Administration & Cron Jobs",
          "Bash Scripting: Variables, loops, conditionals, awk, sed, grep",
          "Computer Networking: OSI model, TCP/UDP, DNS, Subnets, Firewalls",
          "Git & GitHub version control workflows"
        ],
        project: {
          title: "Automated Server Health Monitor & Backup Script",
          desc: "Bash script reporting CPU/memory spikes with email alerts and automated S3 log backups."
        },
        freeResources: [
          {
            channel: "Abhishek.Veeramalla",
            title: "Linux & Shell Scripting Zero to Hero",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@AbhishekVeeramalla",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Best practical DevOps playlist for college students starting from absolute scratch."
          },
          {
            channel: "NetworkChuck",
            title: "Linux for Hackers & Networking Basics",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@NetworkChuck",
            badge: "Free YouTube",
            language: "English",
            desc: "High energy, entertaining, visual networking and Linux tutorials."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "Linux Administration: The Complete Linux Bootcamp",
            instructor: "Jason Cannon",
            url: "https://www.udemy.com/course/linux-administration-bootcamp/",
            price: "~₹499 on sale",
            rating: "4.7 ★",
            desc: "Enterprise Linux administration and command line skills."
          }
        ]
      },
      {
        id: 2,
        phase: "Phase 2: Containers & Orchestration (Weeks 5-10)",
        title: "Docker & Kubernetes (K8s) Cluster Architecture",
        category: "Containerization",
        status: "in_progress",
        progress: 50,
        desc: "Package applications into container images with Docker, write Docker Compose stacks, and deploy resilient workloads with Kubernetes Pods, Services, and Ingress.",
        keyTopics: [
          "Docker: Dockerfile optimization, multi-stage builds, volumes, networks",
          "Docker Compose for multi-container web apps",
          "Kubernetes architecture: Control Plane, Kubelet, Pods, Deployments",
          "Kubernetes Services (ClusterIP, NodePort, LoadBalancer) & Ingress"
        ],
        project: {
          title: "Microservices Cluster Deployment on Minikube with Helm",
          desc: "Deployed resilient 3-service web app with horizontal pod autoscaling (HPA) and rolling updates."
        },
        freeResources: [
          {
            channel: "TechWorld with Nana",
            title: "Complete Docker & Kubernetes Tutorial",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@TechWorldwithNana",
            badge: "Free YouTube",
            language: "English",
            desc: "World-class visual animations of containers, pods, and cluster networking."
          },
          {
            channel: "Kunal Kushwaha",
            title: "Complete DevOps Bootcamp: Docker & Kubernetes in Hindi",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@kunalkushwaha",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Comprehensive open-source DevOps bootcamp with free live certifications prep."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "Certified Kubernetes Administrator (CKA) with Practice Tests",
            instructor: "Mumshad Mannambeth (KodeKloud)",
            url: "https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/",
            price: "~₹499 on sale",
            rating: "4.8 ★ (100k+ students)",
            desc: "The undisputed best course for learning Kubernetes with hands-on browser terminal labs."
          }
        ]
      },
      {
        id: 3,
        phase: "Phase 3: Cloud Platforms & Infrastructure as Code (Weeks 11-16)",
        title: "Amazon Web Services (AWS) & Terraform (IaC)",
        category: "Cloud & IaC",
        status: "pending",
        progress: 10,
        desc: "Architect scalable cloud systems on AWS (EC2, VPC, S3, RDS, IAM, Route53), and define reproducible infrastructure using Terraform HCL scripts.",
        keyTopics: [
          "AWS Core: IAM, VPC with public/private subnets, EC2 auto-scaling",
          "Database & Storage: S3 bucket policies, RDS PostgreSQL, DynamoDB",
          "Terraform: Providers, state files, variables, modules, and terraform apply",
          "Cost management and security compliance best practices"
        ],
        project: {
          title: "Multi-Tier AWS VPC Infrastructure Provisioned via Terraform",
          desc: "Automated provisioning of 2-tier web application VPC with NAT Gateway and Application Load Balancer."
        },
        freeResources: [
          {
            channel: "freeCodeCamp.org",
            title: "AWS Certified Solutions Architect Associate Full Course",
            type: "YouTube Video (10 Hours)",
            url: "https://www.youtube.com/watch?v=Ia-UEYYR44s",
            badge: "Free YouTube",
            language: "English",
            desc: "Complete walkthrough of all core AWS services with exam tips."
          },
          {
            channel: "Abhishek.Veeramalla",
            title: "Terraform Zero to Hero Series (Hinglish)",
            type: "YouTube Playlist",
            url: "https://www.youtube.com/@AbhishekVeeramalla",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Practical Terraform labs provisioning AWS infrastructure step-by-step."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: "Ultimate AWS Certified Solutions Architect Associate SAA-C03",
            instructor: "Stéphane Maarek",
            url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
            price: "~₹499 on sale",
            rating: "4.7 ★ (300k+ reviews)",
            desc: "The premier AWS course in the world covering real cloud architectures."
          }
        ]
      },
      {
        id: 4,
        phase: "Phase 4: CI/CD & Observability (Weeks 17-20)",
        title: "GitHub Actions, Jenkins, Prometheus & Grafana",
        category: "CI/CD & Monitoring",
        status: "pending",
        progress: 0,
        desc: "Automate code build/test/deploy cycles with GitHub Actions and Jenkins, and build observability dashboards with Prometheus metrics and Grafana alerts.",
        keyTopics: [
          "CI/CD pipelines with GitHub Actions workflows (.github/workflows)",
          "Automated linting, Docker image building and push to AWS ECR",
          "Prometheus metrics scraping & alertmanager rules",
          "Grafana visualization dashboards for CPU, memory, and latency"
        ],
        project: {
          title: "Zero-Downtime CI/CD Pipeline with Live Grafana Metrics",
          desc: "Full automated pipeline deploying code on merge to production with Prometheus health dashboards."
        },
        freeResources: [
          {
            channel: "TechWorld with Nana",
            title: "Prometheus & Grafana Monitoring Full Course",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@TechWorldwithNana",
            badge: "Free YouTube",
            language: "English",
            desc: "Clear visual guide to monitoring Kubernetes clusters and server metrics."
          }
        ],
        paidResources: [
          {
            platform: "KodeKloud",
            title: "Complete DevOps Learning Path",
            instructor: "KodeKloud Engineering",
            url: "https://kodekloud.com/",
            price: "Monthly subscription",
            rating: "4.9 ★",
            desc: "Hands-on browser labs for Jenkins, Terraform, Docker, and Kubernetes."
          }
        ]
      }
    ]
  }
};

// Fallback roadmap generator for any custom target job role entered by user
export function generateCustomRoadmap(roleName) {
  const normalized = (roleName || '').toLowerCase().trim();

  // Try to find matching key
  if (normalized.includes('java') || normalized.includes('spring')) {
    return predefinedRoadmaps.java_backend;
  }
  if (normalized.includes('mern') || normalized.includes('full') || normalized.includes('web') || normalized.includes('next')) {
    return predefinedRoadmaps.fullstack_mern;
  }
  if (normalized.includes('ai') || normalized.includes('machine') || normalized.includes('ml') || normalized.includes('data sci')) {
    return predefinedRoadmaps.ai_ml_engineer;
  }
  if (normalized.includes('devops') || normalized.includes('cloud') || normalized.includes('aws') || normalized.includes('docker')) {
    return predefinedRoadmaps.devops_cloud;
  }

  // Dynamic tailored roadmap
  return {
    roleId: "custom_" + Date.now(),
    roleName: roleName,
    tagline: `AI-Synthesized Placement & Industry Curriculum for ${roleName}`,
    targetCompanies: ["Leading Product Startups", "Top IT Services (TCS Digital, Infosys, Accenture)", "MNC Tech Hubs"],
    estimatedDuration: "5 to 6 Months (15 hours/week)",
    aiCompatibilityScore: 85,
    stages: [
      {
        id: 1,
        phase: "Phase 1: Core Fundamentals & Tooling (Weeks 1-4)",
        title: `Fundamental Concepts & Architecture for ${roleName}`,
        category: "Core Foundations",
        status: "in_progress",
        progress: 40,
        desc: `Master the essential languages, design patterns, and programming foundations required for ${roleName}.`,
        keyTopics: [
          "Core programming paradigms and data modeling",
          "Version control with Git, GitHub branching, and code reviews",
          "Asynchronous I/O, error handling, and memory considerations",
          "Algorithmic thinking and basic data structures (Arrays, Maps)"
        ],
        project: {
          title: `Foundational Prototype Application for ${roleName}`,
          desc: "End-to-end working proof of concept demonstrating clean code principles and architecture."
        },
        freeResources: [
          {
            channel: "freeCodeCamp.org",
            title: `${roleName} Full Course for Beginners`,
            type: "YouTube Video & Tutorials",
            url: "https://www.youtube.com/@freecodecamp",
            badge: "Free YouTube",
            language: "English",
            desc: "Comprehensive 8+ hour open-source video course with no ads."
          },
          {
            channel: "CodeWithHarry",
            title: "Complete Technology Bootcamp in Hindi",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@CodeWithHarry",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Popular Hindi tutorials explaining core programming concepts with practical projects."
          }
        ],
        paidResources: [
          {
            platform: "Coursera",
            title: `Professional Certificate in ${roleName}`,
            instructor: "Top Tier Industry Partner",
            url: "https://www.coursera.org",
            price: "Free to Audit / Financial Aid available",
            rating: "4.8 ★",
            desc: "Accredited specialization certificate with graded coding assignments."
          },
          {
            platform: "Udemy",
            title: `Complete ${roleName} Masterclass: Zero to Hero`,
            instructor: "Industry Expert Instructor",
            url: "https://www.udemy.com",
            price: "~₹499 on sale",
            rating: "4.7 ★",
            desc: "Hands-on video training with real-world case studies."
          }
        ]
      },
      {
        id: 2,
        phase: "Phase 2: Frameworks & Production Standards (Weeks 5-10)",
        title: `Enterprise Frameworks, APIs & Databases for ${roleName}`,
        category: "Frameworks & Tools",
        status: "pending",
        progress: 10,
        desc: `Work with modern industrial frameworks, libraries, REST/GraphQL APIs, and database persistence layers.`,
        keyTopics: [
          "Framework architecture and best practices",
          "Database integration (SQL / NoSQL) and query optimization",
          "Authentication, security protocols, and API validation",
          "Writing automated unit and integration tests"
        ],
        project: {
          title: `Full-Featured Capstone Project for ${roleName}`,
          desc: "Industry-grade project solving a real user problem with authentication, database, and cloud storage."
        },
        freeResources: [
          {
            channel: "Chai aur Code",
            title: "Production Architecture & Code in Hindi",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@chaiaurcode",
            badge: "Free YouTube",
            language: "Hinglish",
            desc: "Deep architectural principles and real-world software development in Hinglish."
          }
        ],
        paidResources: [
          {
            platform: "Udemy",
            title: `The Comprehensive ${roleName} Developer Course`,
            instructor: "Senior Software Architect",
            url: "https://www.udemy.com",
            price: "~₹499 on sale",
            rating: "4.8 ★",
            desc: "Complete project-driven course with source code and downloadable assets."
          }
        ]
      },
      {
        id: 3,
        phase: "Phase 3: Deployment, Portfolio & Placement Prep (Weeks 11-16)",
        title: `Cloud Deployment, System Design & Interview Preparation`,
        category: "Placement Readiness",
        status: "pending",
        progress: 0,
        desc: `Deploy your projects live on the cloud, optimize your ATS resume, and prepare for technical placement interview rounds.`,
        keyTopics: [
          "Docker containerization and cloud hosting (AWS / Vercel / Render)",
          "Building an ATS-compliant resume highlighting quantifiable metrics",
          "Core system design concepts and performance tuning",
          "Behavioral STAR interview questions and technical coding rounds"
        ],
        project: {
          title: "Public Verified GitHub Repository with Live Hosted Link",
          desc: "Production project with CI/CD, README documentation, architectural diagram, and test coverage."
        },
        freeResources: [
          {
            channel: "take U forward (Striver)",
            title: "A2Z Placement Preparation & DSA Sheet",
            type: "YouTube Channel",
            url: "https://www.youtube.com/@takeUforward",
            badge: "Free YouTube",
            language: "Hinglish / English",
            desc: "The essential DSA and technical interview sheet for product and service MNCs."
          }
        ],
        paidResources: [
          {
            platform: "Educative.io",
            title: "Grokking Coding & Technical Interview Patterns",
            instructor: "Educative Engineering",
            url: "https://www.educative.io",
            price: "Subscription (~₹1,200/mo)",
            rating: "4.9 ★",
            desc: "Text-based coding interview questions and algorithmic explanations."
          }
        ]
      }
    ]
  };
}

export function getRoadmapForRole(roleName) {
  if (!roleName) return predefinedRoadmaps.java_backend;
  const normalized = roleName.toLowerCase();
  if (normalized.includes('java') || normalized.includes('spring')) return predefinedRoadmaps.java_backend;
  if (normalized.includes('mern') || normalized.includes('full') || normalized.includes('next') || normalized.includes('web')) return predefinedRoadmaps.fullstack_mern;
  if (normalized.includes('ai') || normalized.includes('machine') || normalized.includes('ml') || normalized.includes('data sci') || normalized.includes('deep')) return predefinedRoadmaps.ai_ml_engineer;
  if (normalized.includes('devops') || normalized.includes('cloud') || normalized.includes('aws') || normalized.includes('docker') || normalized.includes('infra')) return predefinedRoadmaps.devops_cloud;
  if (predefinedRoadmaps[roleName]) return predefinedRoadmaps[roleName];
  return generateCustomRoadmap(roleName);
}
