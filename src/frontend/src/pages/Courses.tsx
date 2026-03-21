import {
  ArrowLeft,
  BeakerIcon,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  FileText,
  Film,
  FlaskConical,
  Paperclip,
  Play,
  Plus,
  Timer,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

interface LabExperiment {
  week: number;
  name: string;
  duration: string;
  aim: string;
  status: "completed" | "in-progress" | "upcoming";
}

interface CourseContent {
  chapters: { title: string; topics: string[] }[];
  notes: { name: string; url: string }[];
  videos: { name: string; url: string }[];
  presentations: { name: string }[];
  references: { name: string; url: string }[];
  labExperiments?: LabExperiment[];
}

interface Course {
  id: number;
  name: string;
  code: string;
  subject: string;
  teacher: string;
  description: string;
  classYear: string;
  duration: string;
  startDate: string;
  endDate: string;
  students: number;
  status: string;
  dept: string;
  isLab?: boolean;
  labWeeks?: number;
  content: CourseContent;
}

const getTeacherName = () =>
  localStorage.getItem("eduportal_user_name") || "Dr. Rajesh Kumar";

const dsaLabExperiments: LabExperiment[] = [
  {
    week: 1,
    name: "Introduction to C/C++ & Arrays",
    duration: "3 hours",
    aim: "Implement basic array operations",
    status: "completed",
  },
  {
    week: 2,
    name: "Linked List Implementation",
    duration: "3 hours",
    aim: "Singly and doubly linked lists",
    status: "completed",
  },
  {
    week: 3,
    name: "Stack using Array & Linked List",
    duration: "3 hours",
    aim: "Push/pop operations",
    status: "completed",
  },
  {
    week: 4,
    name: "Queue Implementation",
    duration: "3 hours",
    aim: "Linear and circular queue",
    status: "completed",
  },
  {
    week: 5,
    name: "Binary Search Tree",
    duration: "3 hours",
    aim: "BST insert, delete, search",
    status: "completed",
  },
  {
    week: 6,
    name: "Tree Traversals",
    duration: "3 hours",
    aim: "Inorder, Preorder, Postorder",
    status: "completed",
  },
  {
    week: 7,
    name: "Graph Representation",
    duration: "3 hours",
    aim: "Adjacency matrix and list",
    status: "in-progress",
  },
  {
    week: 8,
    name: "BFS & DFS Algorithms",
    duration: "3 hours",
    aim: "Graph traversal techniques",
    status: "upcoming",
  },
  {
    week: 9,
    name: "Sorting Algorithms",
    duration: "3 hours",
    aim: "Bubble, Selection, Insertion, Merge Sort",
    status: "upcoming",
  },
  {
    week: 10,
    name: "Searching Algorithms",
    duration: "3 hours",
    aim: "Linear search, Binary search",
    status: "upcoming",
  },
  {
    week: 11,
    name: "Hashing Techniques",
    duration: "3 hours",
    aim: "Hash tables and collision handling",
    status: "upcoming",
  },
  {
    week: 12,
    name: "Dynamic Programming",
    duration: "3 hours",
    aim: "Knapsack, LCS problems",
    status: "upcoming",
  },
];

const cnLabExperiments: LabExperiment[] = [
  {
    week: 1,
    name: "Network Topology Setup",
    duration: "3 hours",
    aim: "Configure star/bus/ring topology",
    status: "completed",
  },
  {
    week: 2,
    name: "IP Addressing & Subnetting",
    duration: "3 hours",
    aim: "IPv4 addressing and subnet mask",
    status: "completed",
  },
  {
    week: 3,
    name: "OSI Model Implementation",
    duration: "3 hours",
    aim: "Layer-wise protocol study",
    status: "completed",
  },
  {
    week: 4,
    name: "TCP/IP Socket Programming",
    duration: "3 hours",
    aim: "Client-server communication",
    status: "completed",
  },
  {
    week: 5,
    name: "HTTP & FTP Protocols",
    duration: "3 hours",
    aim: "Web and file transfer protocols",
    status: "completed",
  },
  {
    week: 6,
    name: "DNS Configuration",
    duration: "3 hours",
    aim: "Domain name resolution",
    status: "completed",
  },
  {
    week: 7,
    name: "Router Configuration",
    duration: "3 hours",
    aim: "Static and dynamic routing",
    status: "in-progress",
  },
  {
    week: 8,
    name: "Firewall & Security",
    duration: "3 hours",
    aim: "Network security rules",
    status: "upcoming",
  },
  {
    week: 9,
    name: "Wireshark Packet Analysis",
    duration: "3 hours",
    aim: "Capture and analyze packets",
    status: "upcoming",
  },
  {
    week: 10,
    name: "VLAN Configuration",
    duration: "3 hours",
    aim: "Virtual LAN setup",
    status: "upcoming",
  },
  {
    week: 11,
    name: "Network Performance Testing",
    duration: "3 hours",
    aim: "Bandwidth and latency measurement",
    status: "upcoming",
  },
  {
    week: 12,
    name: "Mini Network Design Project",
    duration: "4 hours",
    aim: "Design a complete network infrastructure",
    status: "upcoming",
  },
];

const osLabExperiments: LabExperiment[] = [
  {
    week: 1,
    name: "Linux Shell & Basic Commands",
    duration: "3 hours",
    aim: "File system navigation and shell scripting basics",
    status: "completed",
  },
  {
    week: 2,
    name: "Process Creation & Fork",
    duration: "3 hours",
    aim: "fork(), exec(), wait() system calls",
    status: "completed",
  },
  {
    week: 3,
    name: "Inter-Process Communication",
    duration: "3 hours",
    aim: "Pipes, message queues, shared memory",
    status: "completed",
  },
  {
    week: 4,
    name: "Thread Programming (pthreads)",
    duration: "3 hours",
    aim: "Create, sync, and manage POSIX threads",
    status: "completed",
  },
  {
    week: 5,
    name: "CPU Scheduling Algorithms",
    duration: "3 hours",
    aim: "FCFS, SJF, Round Robin simulation",
    status: "completed",
  },
  {
    week: 6,
    name: "Deadlock Detection",
    duration: "3 hours",
    aim: "Banker's algorithm implementation",
    status: "completed",
  },
  {
    week: 7,
    name: "Memory Management & Paging",
    duration: "3 hours",
    aim: "Page table and virtual address translation",
    status: "in-progress",
  },
  {
    week: 8,
    name: "Page Replacement Algorithms",
    duration: "3 hours",
    aim: "FIFO, LRU, Optimal page replacement",
    status: "upcoming",
  },
  {
    week: 9,
    name: "File System Operations",
    duration: "3 hours",
    aim: "Create, read, write, delete using system calls",
    status: "upcoming",
  },
  {
    week: 10,
    name: "Disk Scheduling Algorithms",
    duration: "3 hours",
    aim: "FCFS, SSTF, SCAN, C-SCAN",
    status: "upcoming",
  },
  {
    week: 11,
    name: "Semaphores & Synchronization",
    duration: "3 hours",
    aim: "Producer-consumer and reader-writer problems",
    status: "upcoming",
  },
  {
    week: 12,
    name: "OS Security & Auditing",
    duration: "3 hours",
    aim: "Access control and audit log analysis",
    status: "upcoming",
  },
];

const dbmsLabExperiments: LabExperiment[] = [
  {
    week: 1,
    name: "ER Diagram & Schema Design",
    duration: "3 hours",
    aim: "Design ER diagrams for real-world scenarios",
    status: "completed",
  },
  {
    week: 2,
    name: "DDL Commands",
    duration: "3 hours",
    aim: "CREATE, ALTER, DROP tables with constraints",
    status: "completed",
  },
  {
    week: 3,
    name: "DML Operations",
    duration: "3 hours",
    aim: "INSERT, UPDATE, DELETE, SELECT queries",
    status: "completed",
  },
  {
    week: 4,
    name: "Aggregate Functions & Grouping",
    duration: "3 hours",
    aim: "SUM, AVG, COUNT, GROUP BY, HAVING",
    status: "completed",
  },
  {
    week: 5,
    name: "Joins & Subqueries",
    duration: "3 hours",
    aim: "INNER, LEFT, RIGHT, FULL JOIN and nested queries",
    status: "completed",
  },
  {
    week: 6,
    name: "Views & Indexes",
    duration: "3 hours",
    aim: "Create views for abstraction and indexes for performance",
    status: "completed",
  },
  {
    week: 7,
    name: "Stored Procedures & Functions",
    duration: "3 hours",
    aim: "Write and call PL/SQL procedures and functions",
    status: "in-progress",
  },
  {
    week: 8,
    name: "Triggers",
    duration: "3 hours",
    aim: "BEFORE/AFTER INSERT/UPDATE/DELETE triggers",
    status: "upcoming",
  },
  {
    week: 9,
    name: "Transactions & ACID Properties",
    duration: "3 hours",
    aim: "COMMIT, ROLLBACK, SAVEPOINT, isolation levels",
    status: "upcoming",
  },
  {
    week: 10,
    name: "Normalization (1NF to BCNF)",
    duration: "3 hours",
    aim: "Decompose relations to remove redundancy",
    status: "upcoming",
  },
  {
    week: 11,
    name: "NoSQL – MongoDB Basics",
    duration: "3 hours",
    aim: "CRUD operations in MongoDB document store",
    status: "upcoming",
  },
  {
    week: 12,
    name: "Mini Database Project",
    duration: "4 hours",
    aim: "Design and implement a complete database system",
    status: "upcoming",
  },
];

const buildInitialCourses = (): Course[] => [
  {
    id: 1,
    name: "Data Structures & Algorithms",
    code: "CS301",
    subject: "Computer Science",
    teacher: getTeacherName(),
    description:
      "Comprehensive study of fundamental data structures including arrays, linked lists, trees, graphs, and algorithms for sorting, searching, and optimization in software engineering.",
    classYear: "3rd Year CSE",
    duration: "6 months",
    startDate: "Jan 2026",
    endDate: "Jun 2026",
    students: 60,
    status: "active",
    dept: "Computer Science",
    content: {
      chapters: [
        {
          title: "Chapter 1: Introduction to DSA",
          topics: [
            "Time & Space Complexity",
            "Big-O Notation",
            "Algorithm Analysis",
          ],
        },
        {
          title: "Chapter 2: Arrays & Linked Lists",
          topics: [
            "Static Arrays",
            "Dynamic Arrays",
            "Singly & Doubly Linked Lists",
          ],
        },
        {
          title: "Chapter 3: Stacks & Queues",
          topics: ["Stack Operations", "Queue Variants", "Priority Queues"],
        },
        {
          title: "Chapter 4: Trees",
          topics: ["Binary Trees", "BST", "AVL Trees", "Heaps"],
        },
        {
          title: "Chapter 5: Graphs",
          topics: ["BFS", "DFS", "Shortest Path Algorithms"],
        },
      ],
      notes: [
        { name: "DSA Module 1 - Arrays.pdf", url: "#" },
        { name: "DSA Module 2 - Trees.pdf", url: "#" },
      ],
      videos: [
        { name: "Lecture 1: Introduction & Complexity", url: "#" },
        { name: "Lecture 2: Sorting Algorithms", url: "#" },
        { name: "Lecture 3: Graph Traversal", url: "#" },
      ],
      presentations: [
        { name: "Module 1 Slides.pptx" },
        { name: "Module 2 Slides.pptx" },
      ],
      references: [
        {
          name: "CLRS - Introduction to Algorithms",
          url: "https://mitpress.mit.edu/",
        },
        { name: "GeeksforGeeks DSA", url: "https://geeksforgeeks.org" },
      ],
    },
  },
  {
    id: 2,
    name: "Computer Networks",
    code: "CS401",
    subject: "Computer Science",
    teacher: "Dr. Meena Rao",
    description:
      "Study of computer network architecture, OSI model, TCP/IP protocols, routing algorithms, network security, and emerging technologies like SDN and cloud networking.",
    classYear: "3rd Year CSE",
    duration: "5 months",
    startDate: "Jan 2026",
    endDate: "May 2026",
    students: 58,
    status: "active",
    dept: "Computer Science",
    content: {
      chapters: [
        {
          title: "Chapter 1: Network Fundamentals",
          topics: ["OSI Model", "TCP/IP Stack", "Network Topologies"],
        },
        {
          title: "Chapter 2: Data Link Layer",
          topics: ["Framing", "Error Detection", "MAC Protocols"],
        },
        {
          title: "Chapter 3: Network Layer",
          topics: ["IP Addressing", "Subnetting", "Routing Algorithms"],
        },
        {
          title: "Chapter 4: Transport & Application Layer",
          topics: ["TCP vs UDP", "HTTP/HTTPS", "DNS & DHCP"],
        },
      ],
      notes: [
        { name: "Networks Module 1.pdf", url: "#" },
        { name: "Routing Protocols Reference.pdf", url: "#" },
      ],
      videos: [
        { name: "OSI Model Explained", url: "#" },
        { name: "TCP Handshake Demo", url: "#" },
      ],
      presentations: [{ name: "CS401 Chapter 3 Slides.pptx" }],
      references: [{ name: "Computer Networks - Tanenbaum", url: "#" }],
    },
  },
  {
    id: 3,
    name: "Operating Systems",
    code: "CS302",
    subject: "Computer Science",
    teacher: "Prof. Anand Verma",
    description:
      "Detailed study of operating system concepts including process management, memory management, file systems, I/O management, security, and modern OS architectures.",
    classYear: "3rd Year CSE",
    duration: "5 months",
    startDate: "Jan 2026",
    endDate: "May 2026",
    students: 62,
    status: "active",
    dept: "Computer Science",
    content: {
      chapters: [
        {
          title: "Chapter 1: OS Introduction",
          topics: ["OS Structure", "System Calls", "Kernel Types"],
        },
        {
          title: "Chapter 2: Process Management",
          topics: ["Process States", "PCB", "Context Switching"],
        },
        {
          title: "Chapter 3: CPU Scheduling",
          topics: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"],
        },
        {
          title: "Chapter 4: Memory Management",
          topics: ["Paging", "Segmentation", "Virtual Memory"],
        },
        {
          title: "Chapter 5: File Systems",
          topics: [
            "File Allocation",
            "Directory Structures",
            "Disk Scheduling",
          ],
        },
      ],
      notes: [
        { name: "OS Unit 1 - Processes.pdf", url: "#" },
        { name: "OS Unit 2 - Memory.pdf", url: "#" },
      ],
      videos: [
        { name: "Lecture 1: Process Scheduling", url: "#" },
        { name: "Lecture 2: Virtual Memory", url: "#" },
      ],
      presentations: [{ name: "OS Concepts Slides.pptx" }],
      references: [
        { name: "Operating System Concepts - Silberschatz", url: "#" },
      ],
    },
  },
  {
    id: 4,
    name: "Database Management Systems",
    code: "CS303",
    subject: "Computer Science",
    teacher: "Dr. Priya Nair",
    description:
      "Fundamentals of database design, SQL, relational algebra, normalization, transaction management, concurrency control, and introduction to NoSQL databases.",
    classYear: "3rd Year CSE",
    duration: "5 months",
    startDate: "Jan 2026",
    endDate: "May 2026",
    students: 60,
    status: "active",
    dept: "Computer Science",
    content: {
      chapters: [
        {
          title: "Chapter 1: Database Concepts",
          topics: ["DBMS vs File System", "Data Models", "ER Diagram"],
        },
        {
          title: "Chapter 2: Relational Model & SQL",
          topics: ["DDL & DML", "Joins", "Aggregate Functions"],
        },
        {
          title: "Chapter 3: Normalization",
          topics: ["1NF, 2NF, 3NF", "BCNF", "Functional Dependencies"],
        },
        {
          title: "Chapter 4: Transaction Management",
          topics: ["ACID Properties", "Concurrency Control", "Deadlock"],
        },
      ],
      notes: [
        { name: "DBMS Module 1 - SQL Basics.pdf", url: "#" },
        { name: "Normalization Reference.pdf", url: "#" },
      ],
      videos: [
        { name: "SQL Joins Explained", url: "#" },
        { name: "Transaction & ACID Tutorial", url: "#" },
      ],
      presentations: [{ name: "DBMS Overview Slides.pptx" }],
      references: [{ name: "Database System Concepts - Korth", url: "#" }],
    },
  },
  {
    id: 5,
    name: "Software Engineering",
    code: "CS304",
    subject: "Computer Science",
    teacher: "Prof. Sanjay Gupta",
    description:
      "Software development life cycle, requirements engineering, software design patterns, testing methodologies, project management, and agile development practices.",
    classYear: "3rd Year CSE",
    duration: "4 months",
    startDate: "Feb 2026",
    endDate: "May 2026",
    students: 60,
    status: "active",
    dept: "Computer Science",
    content: {
      chapters: [
        {
          title: "Chapter 1: SDLC Models",
          topics: ["Waterfall", "Agile", "Scrum", "Spiral Model"],
        },
        {
          title: "Chapter 2: Requirements Engineering",
          topics: ["SRS Document", "Use Cases", "User Stories"],
        },
        {
          title: "Chapter 3: Design Patterns",
          topics: ["Creational", "Structural", "Behavioral Patterns"],
        },
        {
          title: "Chapter 4: Software Testing",
          topics: ["Unit Testing", "Integration Testing", "Black/White Box"],
        },
      ],
      notes: [
        { name: "SE Module 1 - SDLC.pdf", url: "#" },
        { name: "Design Patterns Reference.pdf", url: "#" },
      ],
      videos: [
        { name: "Agile & Scrum Overview", url: "#" },
        { name: "Software Testing Strategies", url: "#" },
      ],
      presentations: [{ name: "SE Design Patterns Slides.pptx" }],
      references: [{ name: "Software Engineering - Pressman", url: "#" }],
    },
  },
  {
    id: 6,
    name: "Engineering Mathematics III",
    code: "MA301",
    subject: "Mathematics",
    teacher: "Prof. Anita Sharma",
    description:
      "Advanced mathematical topics for engineering students including Fourier series, Laplace transforms, partial differential equations, and complex variable theory.",
    classYear: "3rd Year CSE",
    duration: "5 months",
    startDate: "Jan 2026",
    endDate: "May 2026",
    students: 120,
    status: "active",
    dept: "Mathematics",
    content: {
      chapters: [
        {
          title: "Chapter 1: Fourier Series",
          topics: [
            "Periodic Functions",
            "Euler's Formulas",
            "Half Range Series",
          ],
        },
        {
          title: "Chapter 2: Laplace Transforms",
          topics: [
            "Definition & Properties",
            "Inverse Laplace",
            "Solving ODEs",
          ],
        },
        {
          title: "Chapter 3: Partial Differential Equations",
          topics: ["First Order PDEs", "Wave Equation", "Heat Equation"],
        },
        {
          title: "Chapter 4: Complex Variables",
          topics: [
            "Analytic Functions",
            "Cauchy-Riemann Equations",
            "Contour Integration",
          ],
        },
      ],
      notes: [
        { name: "Fourier Series Notes.pdf", url: "#" },
        { name: "Laplace Transform Formulae.pdf", url: "#" },
      ],
      videos: [
        { name: "Lecture 1: Fourier Series Intro", url: "#" },
        { name: "Lecture 2: Laplace Transforms", url: "#" },
      ],
      presentations: [{ name: "MA301 Overview Slides.pptx" }],
      references: [
        { name: "Higher Engineering Mathematics - B.S. Grewal", url: "#" },
      ],
    },
  },
  // Lab Courses
  {
    id: 7,
    name: "DSA Lab",
    code: "CS301L",
    subject: "Computer Science Lab",
    teacher: getTeacherName(),
    description:
      "Practical implementation of data structures and algorithms using C/C++. 12-week lab covering arrays, linked lists, trees, graphs, sorting, searching, hashing, and dynamic programming.",
    classYear: "3rd Year CSE",
    duration: "12 weeks",
    startDate: "Jan 2026",
    endDate: "Mar 2026",
    students: 60,
    status: "active",
    dept: "Computer Science",
    isLab: true,
    labWeeks: 12,
    content: {
      chapters: [],
      notes: [
        { name: "DSA Lab Manual CS301L.pdf", url: "#" },
        { name: "C++ Reference Sheet.pdf", url: "#" },
      ],
      videos: [{ name: "Lab Intro: Setup & Compilation", url: "#" }],
      presentations: [{ name: "DSA Lab Overview.pptx" }],
      references: [
        {
          name: "GeeksforGeeks DSA Practice",
          url: "https://geeksforgeeks.org",
        },
      ],
      labExperiments: dsaLabExperiments,
    },
  },
  {
    id: 8,
    name: "Computer Networks Lab",
    code: "CS401L",
    subject: "Networking Lab",
    teacher: "Dr. Meena Rao",
    description:
      "Hands-on networking lab covering topology setup, IP addressing, protocol configuration, socket programming, router/firewall configuration, and network performance analysis.",
    classYear: "3rd Year CSE",
    duration: "12 weeks",
    startDate: "Jan 2026",
    endDate: "Mar 2026",
    students: 58,
    status: "active",
    dept: "Computer Science",
    isLab: true,
    labWeeks: 12,
    content: {
      chapters: [],
      notes: [
        { name: "CN Lab Manual CS401L.pdf", url: "#" },
        { name: "Cisco Packet Tracer Guide.pdf", url: "#" },
      ],
      videos: [{ name: "Lab 1: Packet Tracer Intro", url: "#" }],
      presentations: [{ name: "CN Lab Schedule.pptx" }],
      references: [
        { name: "Cisco Networking Academy", url: "https://netacad.com" },
      ],
      labExperiments: cnLabExperiments,
    },
  },
  {
    id: 9,
    name: "Operating Systems Lab",
    code: "CS302L",
    subject: "OS Lab",
    teacher: "Prof. Anand Verma",
    description:
      "Practical OS lab using Linux/Ubuntu. Covers shell scripting, process management, CPU scheduling simulation, memory management, file systems, and synchronization mechanisms.",
    classYear: "3rd Year CSE",
    duration: "12 weeks",
    startDate: "Jan 2026",
    endDate: "Mar 2026",
    students: 62,
    status: "active",
    dept: "Computer Science",
    isLab: true,
    labWeeks: 12,
    content: {
      chapters: [],
      notes: [
        { name: "OS Lab Manual CS302L.pdf", url: "#" },
        { name: "Linux Command Reference.pdf", url: "#" },
      ],
      videos: [{ name: "Linux Shell Basics", url: "#" }],
      presentations: [{ name: "OS Lab Overview.pptx" }],
      references: [
        { name: "Linux man pages", url: "https://man7.org/linux/man-pages/" },
      ],
      labExperiments: osLabExperiments,
    },
  },
  {
    id: 10,
    name: "DBMS Lab",
    code: "CS303L",
    subject: "Database Lab",
    teacher: "Dr. Priya Nair",
    description:
      "Practical database lab using MySQL and MongoDB. Covers SQL DDL/DML, joins, stored procedures, triggers, transactions, normalization, and NoSQL operations.",
    classYear: "3rd Year CSE",
    duration: "12 weeks",
    startDate: "Jan 2026",
    endDate: "Mar 2026",
    students: 60,
    status: "active",
    dept: "Computer Science",
    isLab: true,
    labWeeks: 12,
    content: {
      chapters: [],
      notes: [
        { name: "DBMS Lab Manual CS303L.pdf", url: "#" },
        { name: "SQL Quick Reference.pdf", url: "#" },
      ],
      videos: [{ name: "MySQL Setup & Basics", url: "#" }],
      presentations: [{ name: "DBMS Lab Schedule.pptx" }],
      references: [
        { name: "MySQL Documentation", url: "https://dev.mysql.com/doc/" },
      ],
      labExperiments: dbmsLabExperiments,
    },
  },
];

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-500",
};

const experimentStatusConfig = {
  completed: {
    label: "Completed",
    classes: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  "in-progress": {
    label: "In Progress",
    classes: "bg-blue-100 text-blue-700 border-blue-200",
  },
  upcoming: {
    label: "Upcoming",
    classes: "bg-gray-100 text-gray-500 border-gray-200",
  },
};

type FilterType = "all" | "theory" | "lab";

export default function Courses({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [courses, setCourses] = useState<Course[]>(buildInitialCourses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "content">("details");
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const teacherName =
    role === "teacher" ? localStorage.getItem("eduportal_user_name") || "" : "";

  const [form, setForm] = useState({
    name: "",
    code: "",
    subject: "",
    teacher: teacherName,
    description: "",
    classYear: "",
    duration: "",
    startDate: "",
    endDate: "",
  });

  const filteredCourses = courses.filter((c) => {
    if (filter === "theory") return !c.isLab;
    if (filter === "lab") return c.isLab;
    return true;
  });

  const handleAdd = () => {
    if (!form.name || !form.code) return;
    const newCourse: Course = {
      id: Date.now(),
      ...form,
      students: 0,
      status: "active",
      dept: form.subject,
      content: {
        chapters: [],
        notes: [],
        videos: [],
        presentations: [],
        references: [],
      },
    };
    setCourses((prev) => [...prev, newCourse]);
    setForm({
      name: "",
      code: "",
      subject: "",
      teacher: teacherName,
      description: "",
      classYear: "",
      duration: "",
      startDate: "",
      endDate: "",
    });
    setShowAddModal(false);
  };

  const openDetails = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab("details");
    setExpandedChapter(null);
  };

  const completedCount = (exps: LabExperiment[]) =>
    exps.filter((e) => e.status === "completed").length;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="nav.back_button"
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Courses</h1>
          <p className="text-slate-500 mt-1">
            3rd Year BTech CSE &mdash; {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""} shown
          </p>
        </div>
        {(role === "admin" || role === "teacher") && (
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            data-ocid="courses.open_modal_button"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> Add Course
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {(["all", "theory", "lab"] as FilterType[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            data-ocid={`courses.${f}.tab`}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === f
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {f === "lab" ? "🧪 Lab" : f === "theory" ? "📚 Theory" : "All"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((c, idx) => (
          <div
            key={c.id}
            data-ocid={`courses.item.${idx + 1}`}
            className={`bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col gap-3 ${
              c.isLab
                ? "border-violet-200 hover:border-violet-300"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  c.isLab ? "bg-violet-50" : "bg-blue-50"
                }`}
              >
                {c.isLab ? (
                  <FlaskConical size={18} className="text-violet-600" />
                ) : (
                  <BookOpen size={18} className="text-blue-600" />
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {c.isLab && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-violet-100 text-violet-700 tracking-wide">
                    LAB
                  </span>
                )}
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[c.status] || "bg-gray-100 text-gray-500"}`}
                >
                  {c.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 leading-tight">
                {c.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded font-mono font-medium ${
                    c.isLab
                      ? "bg-violet-100 text-violet-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {c.code}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  {c.subject}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-500">
              <p className="flex items-center gap-1">
                <span className="font-medium text-slate-700">Class:</span>{" "}
                {c.classYear}
              </p>
              <p className="flex items-center gap-1">
                <span className="font-medium text-slate-700">Teacher:</span>{" "}
                {c.teacher}
              </p>
              <p className="flex items-center gap-1">
                <Clock size={12} className="text-slate-400" />
                {c.isLab
                  ? `${c.labWeeks} Weeks · ${c.labWeeks} Experiments`
                  : `${c.duration} · ${c.startDate} – ${c.endDate}`}
              </p>
              {c.isLab && (
                <p className="flex items-center gap-1">
                  <Timer size={12} className="text-slate-400" />
                  {c.startDate} – {c.endDate}
                </p>
              )}
              <p className="flex items-center gap-1">
                <Users size={12} className="text-slate-400" /> {c.students}{" "}
                students enrolled
              </p>
            </div>

            {/* Lab progress bar */}
            {c.isLab && c.content.labExperiments && (
              <div className="mt-1">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span className="font-medium text-violet-700">
                    {completedCount(c.content.labExperiments)}/{c.labWeeks} done
                  </span>
                </div>
                <div className="w-full bg-violet-100 rounded-full h-1.5">
                  <div
                    className="bg-violet-500 h-1.5 rounded-full transition-all"
                    style={{
                      width: `${(completedCount(c.content.labExperiments) / (c.labWeeks ?? 12)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => openDetails(c)}
              data-ocid={`courses.primary_button.${idx + 1}`}
              className={`mt-auto w-full py-2 text-white text-xs font-medium rounded-lg transition-colors ${
                c.isLab
                  ? "bg-violet-700 hover:bg-violet-800"
                  : "bg-slate-900 hover:bg-slate-700"
              }`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            data-ocid="courses.modal"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    selectedCourse.isLab ? "bg-violet-100" : "bg-blue-50"
                  }`}
                >
                  {selectedCourse.isLab ? (
                    <FlaskConical size={16} className="text-violet-600" />
                  ) : (
                    <BookOpen size={16} className="text-blue-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedCourse.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded ${
                        selectedCourse.isLab
                          ? "text-violet-600 bg-violet-50"
                          : "text-blue-600 bg-blue-50"
                      }`}
                    >
                      {selectedCourse.code}
                    </span>
                    {selectedCourse.isLab && (
                      <span className="text-xs font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                        LAB
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                data-ocid="courses.close_button"
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-6">
              {(["details", "content"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  data-ocid={`courses.${tab}.tab`}
                  className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                    activeTab === tab
                      ? selectedCourse.isLab
                        ? "border-violet-600 text-violet-600"
                        : "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab === "details"
                    ? "Basic Details"
                    : selectedCourse.isLab
                      ? "Lab Schedule"
                      : "Course Content"}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5">
              {activeTab === "details" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Course Name", value: selectedCourse.name },
                      { label: "Course ID", value: selectedCourse.code },
                      { label: "Subject", value: selectedCourse.subject },
                      { label: "Teacher Name", value: selectedCourse.teacher },
                      {
                        label: "Class / Year",
                        value: selectedCourse.classYear,
                      },
                      {
                        label: "Duration",
                        value: selectedCourse.isLab
                          ? `${selectedCourse.labWeeks} Weeks · ${selectedCourse.labWeeks} Experiments`
                          : selectedCourse.duration,
                      },
                      { label: "Start Date", value: selectedCourse.startDate },
                      { label: "End Date", value: selectedCourse.endDate },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-slate-50 rounded-lg px-4 py-3"
                      >
                        <p className="text-xs text-slate-400 font-medium mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-slate-800">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-50 rounded-lg px-4 py-3">
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Description
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedCourse.description}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg px-4 py-3">
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Students Enrolled
                    </p>
                    <p className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                      <Users size={14} className="text-blue-500" />{" "}
                      {selectedCourse.students} students
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "content" && (
                <div className="space-y-6">
                  {/* Lab Schedule */}
                  {selectedCourse.isLab &&
                    selectedCourse.content.labExperiments && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                            <FlaskConical
                              size={15}
                              className="text-violet-600"
                            />
                            12-Week Lab Schedule
                          </h3>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />{" "}
                              Completed (
                              {completedCount(
                                selectedCourse.content.labExperiments,
                              )}
                              )
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />{" "}
                              In Progress
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />{" "}
                              Upcoming
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {selectedCourse.content.labExperiments.map((exp) => {
                            const cfg = experimentStatusConfig[exp.status];
                            return (
                              <div
                                key={exp.week}
                                className={`border rounded-xl px-4 py-3 flex items-start gap-4 transition-all ${
                                  exp.status === "completed"
                                    ? "bg-emerald-50 border-emerald-200"
                                    : exp.status === "in-progress"
                                      ? "bg-blue-50 border-blue-200 shadow-sm"
                                      : "bg-white border-gray-200"
                                }`}
                              >
                                <div
                                  className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                                    exp.status === "completed"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : exp.status === "in-progress"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-500"
                                  }`}
                                >
                                  W{exp.week}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 flex-wrap">
                                    <p className="text-sm font-semibold text-slate-800">
                                      {exp.name}
                                    </p>
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${cfg.classes}`}
                                    >
                                      {cfg.label}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 mt-0.5">
                                    {exp.aim}
                                  </p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                      <Timer size={11} /> {exp.duration}
                                    </span>
                                    {exp.status === "completed" && (
                                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                        <CheckCircle2 size={11} /> Submitted
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* Theory Chapters */}
                  {!selectedCourse.isLab &&
                    selectedCourse.content.chapters.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <BookOpen size={15} className="text-blue-600" />{" "}
                          Chapters & Topics
                        </h3>
                        <div className="space-y-2">
                          {selectedCourse.content.chapters.map((ch, i) => (
                            <div
                              key={ch.title}
                              className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedChapter(
                                    expandedChapter === i ? null : i,
                                  )
                                }
                                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                              >
                                <span className="text-sm font-medium text-slate-800">
                                  {ch.title}
                                </span>
                                {expandedChapter === i ? (
                                  <ChevronUp
                                    size={15}
                                    className="text-slate-400"
                                  />
                                ) : (
                                  <ChevronDown
                                    size={15}
                                    className="text-slate-400"
                                  />
                                )}
                              </button>
                              {expandedChapter === i && (
                                <ul className="px-4 py-3 space-y-1">
                                  {ch.topics.map((t) => (
                                    <li
                                      key={t}
                                      className="flex items-center gap-2 text-sm text-slate-600"
                                    >
                                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                                      {t}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Notes */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <FileText size={15} className="text-red-500" /> Notes /
                      PDFs
                    </h3>
                    <div className="space-y-2">
                      {selectedCourse.content.notes.map((n) => (
                        <div
                          key={n.name}
                          className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg px-4 py-2.5"
                        >
                          <span className="flex items-center gap-2 text-sm text-slate-700">
                            <FileText size={14} className="text-red-400" />{" "}
                            {n.name}
                          </span>
                          <a
                            href={n.url}
                            className="text-xs text-blue-600 font-medium hover:underline"
                          >
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Videos */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Film size={15} className="text-purple-600" /> Video
                      Lectures
                    </h3>
                    <div className="space-y-2">
                      {selectedCourse.content.videos.map((v) => (
                        <div
                          key={v.name}
                          className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-lg px-4 py-2.5"
                        >
                          <span className="flex items-center gap-2 text-sm text-slate-700">
                            <Play size={14} className="text-purple-400" />{" "}
                            {v.name}
                          </span>
                          <a
                            href={v.url}
                            className="text-xs text-purple-600 font-medium hover:underline"
                          >
                            Watch
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Presentations */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Paperclip size={15} className="text-orange-500" />{" "}
                      Presentations
                    </h3>
                    <div className="space-y-2">
                      {selectedCourse.content.presentations.map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-lg px-4 py-2.5"
                        >
                          <Paperclip size={14} className="text-orange-400" />
                          <span className="text-sm text-slate-700">
                            {p.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* References */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <ExternalLink size={15} className="text-green-600" />{" "}
                      Reference Materials
                    </h3>
                    <div className="space-y-2">
                      {selectedCourse.content.references.map((r) => (
                        <div
                          key={r.name}
                          className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-4 py-2.5"
                        >
                          <ExternalLink size={14} className="text-green-400" />
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {r.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            data-ocid="courses.dialog"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-slate-900">
                Add New Course
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                data-ocid="courses.close_button"
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Course Name",
                    key: "name",
                    placeholder: "e.g. Advanced Physics",
                    type: "text",
                  },
                  {
                    label: "Course ID",
                    key: "code",
                    placeholder: "e.g. PHYS401",
                    type: "text",
                  },
                  {
                    label: "Subject",
                    key: "subject",
                    placeholder: "e.g. Physics",
                    type: "text",
                  },
                  {
                    label: "Teacher Name",
                    key: "teacher",
                    placeholder: "Teacher's name",
                    type: "text",
                  },
                  {
                    label: "Class / Year",
                    key: "classYear",
                    placeholder: "e.g. 3rd Year CSE",
                    type: "text",
                  },
                  {
                    label: "Duration",
                    key: "duration",
                    placeholder: "e.g. 6 months",
                    type: "text",
                  },
                  {
                    label: "Start Date",
                    key: "startDate",
                    placeholder: "e.g. Jan 2026",
                    type: "text",
                  },
                  {
                    label: "End Date",
                    key: "endDate",
                    placeholder: "e.g. Jun 2026",
                    type: "text",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label
                      htmlFor={`add_${f.key}`}
                      className="text-sm font-medium text-slate-700 block mb-1"
                    >
                      {f.label}
                    </label>
                    <input
                      id={`add_${f.key}`}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          [f.key]: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="add_description"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Description
                </label>
                <textarea
                  id="add_description"
                  rows={3}
                  placeholder="Course description..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  data-ocid="courses.cancel_button"
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  data-ocid="courses.submit_button"
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
