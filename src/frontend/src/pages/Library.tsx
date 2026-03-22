import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Edit,
  Globe,
  IndianRupee,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Page } from "../App";

// ── Types ──────────────────────────────────────────────────────────────────────
type IssueRule = "Yes" | "No" | "Limited" | "Online";

interface LibraryBook {
  bookId: string;
  bookName: string;
  author: string;
  category: string;
  subcategory: string;
  isbn: string;
  publisher: string;
  quantity: number;
  availableQty: number;
  shelfNumber: string;
  price: number;
}

interface IssueRecord {
  issueId: string;
  bookId: string;
  bookName: string;
  userId: string;
  userName: string;
  userRole: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "Issued" | "Returned" | "Overdue" | "Pending";
  fine: number;
  bookCondition: string;
}

// ── Category Config ────────────────────────────────────────────────────────────
interface CategoryConfig {
  name: string;
  icon: string;
  issueRule: IssueRule;
  usedBy: string;
  description: string;
  subcategories: string[];
  color: string;
  badgeClass: string;
}

const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    name: "Academic",
    icon: "📚",
    issueRule: "Yes",
    usedBy: "Students & Teachers",
    description: "Core textbooks and study materials for BTech subjects",
    subcategories: [
      "Textbooks",
      "Reference books",
      "Subject books",
      "Lab manuals",
      "Guides",
    ],
    color: "bg-blue-50 border-blue-200",
    badgeClass: "bg-blue-100 text-blue-700",
  },
  {
    name: "Reference",
    icon: "📖",
    issueRule: "No",
    usedBy: "Students & Teachers",
    description: "Library-use only. Cannot be issued or taken home.",
    subcategories: [
      "Dictionaries",
      "Encyclopedias",
      "Atlases",
      "Handbooks",
      "Manuals",
    ],
    color: "bg-red-50 border-red-200",
    badgeClass: "bg-red-100 text-red-700",
  },
  {
    name: "Competitive",
    icon: "🏆",
    issueRule: "Yes",
    usedBy: "Students only",
    description:
      "Preparation books for competitive exams like UPSC, SSC, Banking",
    subcategories: ["UPSC", "SSC", "Banking", "Railways", "State exams"],
    color: "bg-amber-50 border-amber-200",
    badgeClass: "bg-amber-100 text-amber-700",
  },
  {
    name: "GK",
    icon: "🌍",
    issueRule: "Yes",
    usedBy: "Students & Teachers",
    description: "General Knowledge, current affairs, and year books",
    subcategories: ["Current affairs", "GK books", "Year books", "Magazines"],
    color: "bg-green-50 border-green-200",
    badgeClass: "bg-green-100 text-green-700",
  },
  {
    name: "Literature",
    icon: "✍️",
    issueRule: "Yes",
    usedBy: "Students only",
    description: "Novels, short stories, poems, drama and fiction",
    subcategories: ["Novels", "Short stories", "Poems", "Drama", "Fiction"],
    color: "bg-purple-50 border-purple-200",
    badgeClass: "bg-purple-100 text-purple-700",
  },
  {
    name: "Journals",
    icon: "📰",
    issueRule: "Limited",
    usedBy: "Teachers & Students",
    description: "Monthly magazines, weekly journals and research journals",
    subcategories: [
      "Monthly magazines",
      "Weekly journals",
      "Research journals",
    ],
    color: "bg-orange-50 border-orange-200",
    badgeClass: "bg-orange-100 text-orange-700",
  },
  {
    name: "Digital",
    icon: "💻",
    issueRule: "Online",
    usedBy: "All users",
    description:
      "E-books, PDFs, online books and research papers — online access only",
    subcategories: ["E-books", "PDFs", "Online books", "Research papers"],
    color: "bg-teal-50 border-teal-200",
    badgeClass: "bg-teal-100 text-teal-700",
  },
];

const CATEGORIES = CATEGORY_CONFIG.map((c) => c.name);

function getCategoryConfig(cat: string): CategoryConfig {
  return CATEGORY_CONFIG.find((c) => c.name === cat) ?? CATEGORY_CONFIG[0];
}

function getIssueRule(cat: string): IssueRule {
  return getCategoryConfig(cat).issueRule;
}

function IssueRuleBadge({
  rule,
  size = "sm",
}: { rule: IssueRule; size?: "sm" | "xs" }) {
  const cls = size === "xs" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-0.5";
  if (rule === "Yes")
    return (
      <span
        className={`${cls} rounded-full font-semibold bg-green-100 text-green-700 border border-green-200`}
      >
        ✓ Issuable
      </span>
    );
  if (rule === "No")
    return (
      <span
        className={`${cls} rounded-full font-semibold bg-red-100 text-red-700 border border-red-200`}
      >
        🚫 Library Only
      </span>
    );
  if (rule === "Limited")
    return (
      <span
        className={`${cls} rounded-full font-semibold bg-orange-100 text-orange-700 border border-orange-200`}
      >
        ⚠ Limited Issue
      </span>
    );
  return (
    <span
      className={`${cls} rounded-full font-semibold bg-teal-100 text-teal-700 border border-teal-200`}
    >
      🌐 Online Access
    </span>
  );
}

// ── Seed Books ─────────────────────────────────────────────────────────────────
const SEED_BOOKS: LibraryBook[] = [
  // Academic
  {
    bookId: "B001",
    bookName: "Engineering Mathematics Vol 1",
    author: "H. K. Dass",
    category: "Academic",
    subcategory: "Textbooks",
    isbn: "978-8121903332",
    publisher: "S. Chand",
    quantity: 5,
    availableQty: 5,
    shelfNumber: "A1",
    price: 450,
  },
  {
    bookId: "B002",
    bookName: "Physics for Engineers",
    author: "M. R. Srinivasan",
    category: "Academic",
    subcategory: "Textbooks",
    isbn: "978-8120345430",
    publisher: "PHI Learning",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "A2",
    price: 399,
  },
  {
    bookId: "B003",
    bookName: "C Programming Lab Manual",
    author: "Yashavant Kanetkar",
    category: "Academic",
    subcategory: "Lab manuals",
    isbn: "978-8183331630",
    publisher: "BPB Publications",
    quantity: 6,
    availableQty: 6,
    shelfNumber: "A3",
    price: 299,
  },
  {
    bookId: "B004",
    bookName: "Chemistry Textbook for Engineers",
    author: "P. C. Jain",
    category: "Academic",
    subcategory: "Textbooks",
    isbn: "978-8121926539",
    publisher: "S. Chand",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "A4",
    price: 375,
  },
  {
    bookId: "B005",
    bookName: "Technical English Communication",
    author: "Edgar Thorpe",
    category: "Academic",
    subcategory: "Subject books",
    isbn: "978-8131734780",
    publisher: "Pearson",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "A5",
    price: 325,
  },
  {
    bookId: "B006",
    bookName: "Computer Science Guide for BTech",
    author: "T. Balagurusamy",
    category: "Academic",
    subcategory: "Guides",
    isbn: "978-0070702363",
    publisher: "McGraw-Hill",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "A6",
    price: 420,
  },
  // Reference
  {
    bookId: "B007",
    bookName: "Oxford Dictionary of English",
    author: "Oxford University Press",
    category: "Reference",
    subcategory: "Dictionaries",
    isbn: "978-0199571123",
    publisher: "Oxford",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "R1",
    price: 1200,
  },
  {
    bookId: "B008",
    bookName: "Encyclopedia Britannica Vol 1",
    author: "Encyclopedia Britannica Inc.",
    category: "Reference",
    subcategory: "Encyclopedias",
    isbn: "978-1593392925",
    publisher: "Britannica",
    quantity: 1,
    availableQty: 1,
    shelfNumber: "R2",
    price: 2500,
  },
  {
    bookId: "B009",
    bookName: "World Atlas & Geography Guide",
    author: "Philip's",
    category: "Reference",
    subcategory: "Atlases",
    isbn: "978-1849074490",
    publisher: "Philip's Maps",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "R3",
    price: 899,
  },
  {
    bookId: "B010",
    bookName: "Engineering Handbook",
    author: "Robert H. Perry",
    category: "Reference",
    subcategory: "Handbooks",
    isbn: "978-0070498419",
    publisher: "McGraw-Hill",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "R4",
    price: 1800,
  },
  {
    bookId: "B011",
    bookName: "Lab Safety Manual & Guidelines",
    author: "National Safety Council",
    category: "Reference",
    subcategory: "Manuals",
    isbn: "978-0879122096",
    publisher: "NSC Press",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "R5",
    price: 650,
  },
  // Competitive
  {
    bookId: "B012",
    bookName: "UPSC General Studies Paper 1",
    author: "M. Laxmikanth",
    category: "Competitive",
    subcategory: "UPSC",
    isbn: "978-9353167684",
    publisher: "McGraw-Hill",
    quantity: 5,
    availableQty: 5,
    shelfNumber: "C1",
    price: 599,
  },
  {
    bookId: "B013",
    bookName: "SSC CGL Complete Guide 2024",
    author: "Arihant Experts",
    category: "Competitive",
    subcategory: "SSC",
    isbn: "978-9325295490",
    publisher: "Arihant",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "C2",
    price: 549,
  },
  {
    bookId: "B014",
    bookName: "Banking Awareness 2024",
    author: "B. K. Raut",
    category: "Competitive",
    subcategory: "Banking",
    isbn: "978-9390365609",
    publisher: "Disha Publications",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "C3",
    price: 475,
  },
  {
    bookId: "B015",
    bookName: "Railway Exam Guide RRB NTPC",
    author: "Kiran Prakashan",
    category: "Competitive",
    subcategory: "Railways",
    isbn: "978-9353949051",
    publisher: "Kiran Prakashan",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "C4",
    price: 499,
  },
  {
    bookId: "B016",
    bookName: "Telangana State PSC Handbook",
    author: "Youth Competition Times",
    category: "Competitive",
    subcategory: "State exams",
    isbn: "978-9351722922",
    publisher: "YCT Publications",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "C5",
    price: 425,
  },
  // GK
  {
    bookId: "B017",
    bookName: "Current Affairs 2024 Monthly",
    author: "Mahesh Kumar Barnwal",
    category: "GK",
    subcategory: "Current affairs",
    isbn: "978-9355642646",
    publisher: "Cosmos Bookhive",
    quantity: 6,
    availableQty: 6,
    shelfNumber: "G1",
    price: 250,
  },
  {
    bookId: "B018",
    bookName: "Lucent's General Knowledge 2024",
    author: "Lucent Publication",
    category: "GK",
    subcategory: "GK books",
    isbn: "978-9350224830",
    publisher: "Lucent",
    quantity: 5,
    availableQty: 5,
    shelfNumber: "G2",
    price: 299,
  },
  {
    bookId: "B019",
    bookName: "India Year Book 2024",
    author: "Ministry of I&B",
    category: "GK",
    subcategory: "Year books",
    isbn: "978-8123023090",
    publisher: "Publications Division",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "G3",
    price: 350,
  },
  {
    bookId: "B020",
    bookName: "Manorama Year Book 2024",
    author: "Manorama Group",
    category: "GK",
    subcategory: "Year books",
    isbn: "978-9387000063",
    publisher: "Manorama",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "G4",
    price: 275,
  },
  // Literature
  {
    bookId: "B021",
    bookName: "Wings of Fire: An Autobiography",
    author: "A. P. J. Abdul Kalam",
    category: "Literature",
    subcategory: "Novels",
    isbn: "978-8173711466",
    publisher: "Universities Press",
    quantity: 5,
    availableQty: 5,
    shelfNumber: "L1",
    price: 250,
  },
  {
    bookId: "B022",
    bookName: "The Alchemist",
    author: "Paulo Coelho",
    category: "Literature",
    subcategory: "Novels",
    isbn: "978-0062315007",
    publisher: "HarperOne",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "L2",
    price: 299,
  },
  {
    bookId: "B023",
    bookName: "Collected Poems — Rabindranath Tagore",
    author: "Rabindranath Tagore",
    category: "Literature",
    subcategory: "Poems",
    isbn: "978-8126002085",
    publisher: "Rupa Publications",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "L3",
    price: 199,
  },
  {
    bookId: "B024",
    bookName: "Short Stories Anthology",
    author: "R. K. Narayan",
    category: "Literature",
    subcategory: "Short stories",
    isbn: "978-0143031055",
    publisher: "Penguin India",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "L4",
    price: 225,
  },
  {
    bookId: "B025",
    bookName: "Drama Classics: Selected Plays",
    author: "William Shakespeare",
    category: "Literature",
    subcategory: "Drama",
    isbn: "978-8173717482",
    publisher: "Atlantic",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "L5",
    price: 275,
  },
  {
    bookId: "B026",
    bookName: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    category: "Literature",
    subcategory: "Fiction",
    isbn: "978-0439708180",
    publisher: "Scholastic",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "L6",
    price: 450,
  },
  // Journals
  {
    bookId: "B027",
    bookName: "Science Monthly — Vol 42",
    author: "Science Academy",
    category: "Journals",
    subcategory: "Monthly magazines",
    isbn: "ISSN-0036-8075",
    publisher: "AAAS",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "J1",
    price: 180,
  },
  {
    bookId: "B028",
    bookName: "Technology Today — Weekly",
    author: "Tech Media Group",
    category: "Journals",
    subcategory: "Weekly journals",
    isbn: "ISSN-1091-4714",
    publisher: "Tech Media",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "J2",
    price: 120,
  },
  {
    bookId: "B029",
    bookName: "Education Research Journal 2024",
    author: "NCERT Editorial",
    category: "Journals",
    subcategory: "Research journals",
    isbn: "ISSN-0013-1857",
    publisher: "NCERT",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "J3",
    price: 200,
  },
  {
    bookId: "B030",
    bookName: "IEEE Transactions on Engineering",
    author: "IEEE",
    category: "Journals",
    subcategory: "Research journals",
    isbn: "ISSN-0018-9340",
    publisher: "IEEE",
    quantity: 1,
    availableQty: 1,
    shelfNumber: "J4",
    price: 500,
  },
  // Digital
  {
    bookId: "B031",
    bookName: "Introduction to AI (PDF)",
    author: "Andrew Ng",
    category: "Digital",
    subcategory: "PDFs",
    isbn: "DIGITAL-001",
    publisher: "Coursera Press",
    quantity: 99,
    availableQty: 99,
    shelfNumber: "D1",
    price: 0,
  },
  {
    bookId: "B032",
    bookName: "Cloud Computing E-Book",
    author: "Dr. Rajiv Ranjan",
    category: "Digital",
    subcategory: "E-books",
    isbn: "DIGITAL-002",
    publisher: "Springer",
    quantity: 99,
    availableQty: 99,
    shelfNumber: "D2",
    price: 0,
  },
  {
    bookId: "B033",
    bookName: "Research Paper: ML Trends 2024",
    author: "Google Brain Team",
    category: "Digital",
    subcategory: "Research papers",
    isbn: "DIGITAL-003",
    publisher: "arXiv",
    quantity: 99,
    availableQty: 99,
    shelfNumber: "D3",
    price: 0,
  },
  {
    bookId: "B034",
    bookName: "Online DSA Course Notes",
    author: "NPTEL Faculty",
    category: "Digital",
    subcategory: "Online books",
    isbn: "DIGITAL-004",
    publisher: "NPTEL",
    quantity: 99,
    availableQty: 99,
    shelfNumber: "D4",
    price: 0,
  },
  {
    bookId: "B035",
    bookName: "Data Structures PDF Notes",
    author: "Prof. V. Kumar",
    category: "Digital",
    subcategory: "PDFs",
    isbn: "DIGITAL-005",
    publisher: "IIT Hyderabad",
    quantity: 99,
    availableQty: 99,
    shelfNumber: "D5",
    price: 0,
  },
];

// ── Storage Helpers ────────────────────────────────────────────────────────────
function getBooks(): LibraryBook[] {
  const stored = localStorage.getItem("libraryBooks_v2");
  if (!stored) {
    localStorage.setItem("libraryBooks_v2", JSON.stringify(SEED_BOOKS));
    return SEED_BOOKS;
  }
  const books: LibraryBook[] = JSON.parse(stored);
  // Migrate old books without subcategory
  return books.map((b) => ({
    ...b,
    subcategory:
      b.subcategory ||
      CATEGORY_CONFIG.find((c) => c.name === b.category)?.subcategories[0] ||
      "",
    category: CATEGORIES.includes(b.category) ? b.category : "Academic",
  }));
}

function saveBooks(books: LibraryBook[]) {
  localStorage.setItem("libraryBooks_v2", JSON.stringify(books));
}

function getIssues(): IssueRecord[] {
  return JSON.parse(localStorage.getItem("libraryIssues") || "[]");
}

function saveIssues(issues: IssueRecord[]) {
  localStorage.setItem("libraryIssues", JSON.stringify(issues));
}

function calcDueDate(issueDate: string): string {
  const d = new Date(issueDate);
  d.setDate(d.getDate() + 14);
  return d.toISOString().split("T")[0];
}

function calcFine(issue: IssueRecord): number {
  if (issue.returnDate) {
    const due = new Date(issue.dueDate);
    const ret = new Date(issue.returnDate);
    if (issue.bookCondition === "Lost") {
      const books = getBooks();
      const book = books.find((b) => b.bookId === issue.bookId);
      return book ? book.price : 500;
    }
    if (issue.bookCondition === "Damaged") return 200;
    if (ret <= due) return 0;
    const days = Math.floor((ret.getTime() - due.getTime()) / 86400000);
    return days * 5;
  }
  const today = new Date();
  const due = new Date(issue.dueDate);
  if (today > due) {
    const days = Math.floor((today.getTime() - due.getTime()) / 86400000);
    return days * 5;
  }
  return 0;
}

function getCurrentUser() {
  const s = localStorage.getItem("currentUser");
  return s ? JSON.parse(s) : { id: "u1", name: "Student", role: "student" };
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Library({
  navigate,
}: { navigate: (page: Page) => void }) {
  const user = getCurrentUser();
  const isAdmin = user.role === "admin";
  const isTeacher = user.role === "teacher";
  const maxBooks = isTeacher ? 5 : 3;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (isAdmin) navigate("dashboard");
              else if (isTeacher) navigate("dashboard");
              else navigate("dashboard");
            }}
            data-ocid="library.back.button"
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} className="mr-1" /> Back to Dashboard
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl">
            <BookOpen className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Library Management
            </h1>
            <p className="text-sm text-slate-500">
              EduPortal Pro — Digital & Physical Library System
            </p>
          </div>
        </div>

        {isAdmin ? (
          <AdminLibrary />
        ) : (
          <UserLibrary maxBooks={maxBooks} userRole={user.role} />
        )}
      </div>
    </div>
  );
}

// ── Admin Library ──────────────────────────────────────────────────────────────
const defaultBookForm = (): Omit<LibraryBook, "bookId" | "availableQty"> => ({
  bookName: "",
  author: "",
  category: "Academic",
  subcategory: "Textbooks",
  isbn: "",
  publisher: "",
  quantity: 1,
  shelfNumber: "",
  price: 0,
});

function AdminLibrary() {
  const [books, setBooks] = useState<LibraryBook[]>(getBooks);
  const [issues, setIssues] = useState<IssueRecord[]>(getIssues);
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [subcatFilter, setSubcatFilter] = useState("All");
  const [bookFormOpen, setBookFormOpen] = useState(false);
  const [editBook, setEditBook] = useState<LibraryBook | null>(null);
  const [bookForm, setBookForm] = useState(defaultBookForm());
  const [returnDialogIssue, setReturnDialogIssue] =
    useState<IssueRecord | null>(null);
  const [returnCondition, setReturnCondition] = useState("Good");

  const refresh = () => {
    setBooks(getBooks());
    setIssues(getIssues());
  };

  useEffect(() => {
    const today = new Date();
    const iss = getIssues().map((i) => {
      if (i.status === "Issued" && new Date(i.dueDate) < today) {
        return { ...i, status: "Overdue" as const };
      }
      return i;
    });
    saveIssues(iss);
    setIssues(iss);
  }, []);

  const pending = issues.filter((i) => i.status === "Pending");
  const issued = issues.filter(
    (i) => i.status === "Issued" || i.status === "Overdue",
  );
  const overdue = issues.filter((i) => i.status === "Overdue");
  const totalFines = issues.reduce((s, i) => s + calcFine(i), 0);

  const currentSubcats =
    catFilter === "All" ? [] : getCategoryConfig(catFilter).subcategories;

  const filteredBooks = books.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      b.bookName.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.isbn.toLowerCase().includes(q);
    const matchCat = catFilter === "All" || b.category === catFilter;
    const matchSubcat =
      subcatFilter === "All" || b.subcategory === subcatFilter;
    return matchSearch && matchCat && matchSubcat;
  });

  const openAdd = () => {
    setEditBook(null);
    setBookForm(defaultBookForm());
    setBookFormOpen(true);
  };

  const openEdit = (b: LibraryBook) => {
    setEditBook(b);
    setBookForm({
      bookName: b.bookName,
      author: b.author,
      category: b.category,
      subcategory: b.subcategory,
      isbn: b.isbn,
      publisher: b.publisher,
      quantity: b.quantity,
      shelfNumber: b.shelfNumber,
      price: b.price,
    });
    setBookFormOpen(true);
  };

  const handleSaveBook = () => {
    const bks = getBooks();
    if (editBook) {
      const idx = bks.findIndex((b) => b.bookId === editBook.bookId);
      if (idx >= 0) {
        const diff = bookForm.quantity - editBook.quantity;
        bks[idx] = {
          ...bks[idx],
          ...bookForm,
          availableQty: Math.max(0, bks[idx].availableQty + diff),
        };
      }
    } else {
      const newId = `B${String(bks.length + 1).padStart(3, "0")}`;
      bks.push({ ...bookForm, bookId: newId, availableQty: bookForm.quantity });
    }
    saveBooks(bks);
    setBookFormOpen(false);
    refresh();
  };

  const handleDelete = (bookId: string) => {
    saveBooks(getBooks().filter((b) => b.bookId !== bookId));
    refresh();
  };

  const approveIssue = (issueId: string) => {
    const iss = getIssues().map((i) =>
      i.issueId === issueId ? { ...i, status: "Issued" as const } : i,
    );
    const approved = iss.find((i) => i.issueId === issueId);
    if (approved) {
      const bks = getBooks().map((b) =>
        b.bookId === approved.bookId
          ? { ...b, availableQty: Math.max(0, b.availableQty - 1) }
          : b,
      );
      saveBooks(bks);
    }
    saveIssues(iss);
    refresh();
  };

  const rejectIssue = (issueId: string) => {
    saveIssues(getIssues().filter((i) => i.issueId !== issueId));
    refresh();
  };

  const processReturn = () => {
    if (!returnDialogIssue) return;
    const today = new Date().toISOString().split("T")[0];
    const iss = getIssues().map((i) => {
      if (i.issueId !== returnDialogIssue.issueId) return i;
      const fine = calcFine({
        ...i,
        returnDate: today,
        bookCondition: returnCondition,
      });
      return {
        ...i,
        returnDate: today,
        status: "Returned" as const,
        bookCondition: returnCondition,
        fine,
      };
    });
    const bk = iss.find((i) => i.issueId === returnDialogIssue.issueId);
    if (bk && returnCondition !== "Lost") {
      saveBooks(
        getBooks().map((b) =>
          b.bookId === returnDialogIssue.bookId
            ? { ...b, availableQty: b.availableQty + 1 }
            : b,
        ),
      );
    }
    saveIssues(iss);
    setReturnDialogIssue(null);
    refresh();
  };

  const markFinePaid = (issueId: string) => {
    saveIssues(
      getIssues().map((i) => (i.issueId === issueId ? { ...i, fine: 0 } : i)),
    );
    refresh();
  };

  return (
    <>
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: "Total Books",
            value: books.reduce((s, b) => s + b.quantity, 0),
            color: "text-blue-700",
            bg: "bg-blue-50",
          },
          {
            label: "Available",
            value: books.reduce((s, b) => s + b.availableQty, 0),
            color: "text-green-700",
            bg: "bg-green-50",
          },
          {
            label: "Issued",
            value: issued.length,
            color: "text-orange-700",
            bg: "bg-orange-50",
          },
          {
            label: "Overdue",
            value: overdue.length,
            color: "text-red-700",
            bg: "bg-red-50",
          },
          {
            label: "Fines (₹)",
            value: totalFines,
            color: "text-purple-700",
            bg: "bg-purple-50",
          },
        ].map((k) => (
          <Card key={k.label} className="border border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-slate-500 font-medium">{k.label}</p>
              <p className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap gap-1 h-auto bg-slate-100 p-1 rounded-lg">
          <TabsTrigger value="overview" data-ocid="library.overview.tab">
            Overview
          </TabsTrigger>
          <TabsTrigger value="books" data-ocid="library.books.tab">
            Books
          </TabsTrigger>
          <TabsTrigger value="requests" data-ocid="library.requests.tab">
            Requests{" "}
            {pending.length > 0 && (
              <span className="ml-1 bg-orange-500 text-white text-xs rounded-full px-1.5">
                {pending.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="issued" data-ocid="library.issued.tab">
            Issued
          </TabsTrigger>
          <TabsTrigger value="returns" data-ocid="library.returns.tab">
            Returns
          </TabsTrigger>
          <TabsTrigger value="fines" data-ocid="library.fines.tab">
            Fines
          </TabsTrigger>
          <TabsTrigger value="reports" data-ocid="library.reports.tab">
            Reports
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="mt-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Library Categories Overview
            </h2>
            <p className="text-sm text-slate-500">
              All 7 book categories with issue rules and collection stats
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CATEGORY_CONFIG.map((cat) => {
              const catBooks = books.filter((b) => b.category === cat.name);
              const totalQty = catBooks.reduce((s, b) => s + b.quantity, 0);
              const availQty = catBooks.reduce((s, b) => s + b.availableQty, 0);
              return (
                <Card
                  key={cat.name}
                  className={`border-2 ${cat.color} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{cat.icon}</span>
                      <IssueRuleBadge rule={cat.issueRule} />
                    </div>
                    <CardTitle className="text-base font-bold text-slate-800 mt-1">
                      {cat.name} Books
                    </CardTitle>
                    <p className="text-xs text-slate-500">{cat.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">Total</p>
                        <p className="font-bold text-slate-700">{totalQty}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Available</p>
                        <p className="font-bold text-green-600">{availQty}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Titles</p>
                        <p className="font-bold text-slate-700">
                          {catBooks.length}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">
                        Subcategories
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cat.subcategories.slice(0, 3).map((sc) => (
                          <span
                            key={sc}
                            className={`text-xs px-1.5 py-0.5 rounded ${cat.badgeClass}`}
                          >
                            {sc}
                          </span>
                        ))}
                        {cat.subcategories.length > 3 && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                            +{cat.subcategories.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>👥</span>
                      <span>{cat.usedBy}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* BOOKS TAB */}
        <TabsContent value="books" className="mt-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                data-ocid="library.search_input"
                placeholder="Search by title, author, ISBN…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select
                value={catFilter}
                onValueChange={(v) => {
                  setCatFilter(v);
                  setSubcatFilter("All");
                }}
              >
                <SelectTrigger
                  className="w-40"
                  data-ocid="library.category.select"
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {catFilter !== "All" && (
                <Select value={subcatFilter} onValueChange={setSubcatFilter}>
                  <SelectTrigger
                    className="w-44"
                    data-ocid="library.subcategory.select"
                  >
                    <SelectValue placeholder="Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Subcategories</SelectItem>
                    {currentSubcats.map((sc) => (
                      <SelectItem key={sc} value={sc}>
                        {sc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button
                onClick={openAdd}
                data-ocid="library.add_book.button"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus size={16} className="mr-1" /> Add Book
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>ID</TableHead>
                  <TableHead>Book Name</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead>Issue Rule</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Avail</TableHead>
                  <TableHead>Shelf</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((b, idx) => {
                  const cfg = getCategoryConfig(b.category);
                  return (
                    <TableRow
                      key={b.bookId}
                      data-ocid={`library.books.item.${idx + 1}`}
                    >
                      <TableCell className="font-mono text-xs text-slate-400">
                        {b.bookId}
                      </TableCell>
                      <TableCell className="font-medium max-w-[180px] truncate text-slate-800">
                        {b.bookName}
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 max-w-[120px] truncate">
                        {b.author}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badgeClass}`}
                        >
                          {cfg.icon} {b.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {b.subcategory}
                      </TableCell>
                      <TableCell>
                        <IssueRuleBadge rule={cfg.issueRule} size="xs" />
                      </TableCell>
                      <TableCell className="text-center">
                        {b.quantity}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            b.availableQty > 0
                              ? "text-green-600 font-semibold"
                              : "text-red-500 font-semibold"
                          }
                        >
                          {b.availableQty}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {b.shelfNumber}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEdit(b)}
                            data-ocid={`library.books.edit_button.${idx + 1}`}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(b.bookId)}
                            data-ocid={`library.books.delete_button.${idx + 1}`}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredBooks.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.books.empty_state"
                    >
                      No books found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* REQUESTS TAB */}
        <TabsContent value="requests" className="mt-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Request ID</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((i, idx) => (
                  <TableRow
                    key={i.issueId}
                    data-ocid={`library.requests.item.${idx + 1}`}
                  >
                    <TableCell className="font-mono text-xs">
                      {i.issueId}
                    </TableCell>
                    <TableCell className="font-medium">{i.bookName}</TableCell>
                    <TableCell>{i.userName}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          i.userRole === "teacher"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        {i.userRole}
                      </Badge>
                    </TableCell>
                    <TableCell>{i.issueDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => approveIssue(i.issueId)}
                          data-ocid={`library.requests.confirm_button.${idx + 1}`}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => rejectIssue(i.issueId)}
                          data-ocid={`library.requests.cancel_button.${idx + 1}`}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {pending.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.requests.empty_state"
                    >
                      No pending requests
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ISSUED TAB */}
        <TabsContent value="issued" className="mt-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Issue ID</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fine</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issued.map((i, idx) => {
                  const isOv = i.status === "Overdue";
                  return (
                    <TableRow
                      key={i.issueId}
                      data-ocid={`library.issued.item.${idx + 1}`}
                      className={isOv ? "bg-red-50" : ""}
                    >
                      <TableCell className="font-mono text-xs">
                        {i.issueId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {i.bookName}
                      </TableCell>
                      <TableCell>{i.userName}</TableCell>
                      <TableCell>{i.issueDate}</TableCell>
                      <TableCell
                        className={isOv ? "text-red-600 font-semibold" : ""}
                      >
                        {i.dueDate}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            isOv
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          {isOv ? "Overdue" : "Issued"}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={isOv ? "text-red-600 font-semibold" : ""}
                      >
                        {calcFine(i) > 0 ? `₹${calcFine(i)}` : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {issued.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.issued.empty_state"
                    >
                      No books currently issued
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* RETURNS TAB */}
        <TabsContent value="returns" className="mt-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Issue ID</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issued.map((i, idx) => (
                  <TableRow
                    key={i.issueId}
                    data-ocid={`library.returns.item.${idx + 1}`}
                  >
                    <TableCell className="font-mono text-xs">
                      {i.issueId}
                    </TableCell>
                    <TableCell className="font-medium">{i.bookName}</TableCell>
                    <TableCell>{i.userName}</TableCell>
                    <TableCell>{i.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          new Date(i.dueDate) < new Date()
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {new Date(i.dueDate) < new Date()
                          ? "Overdue"
                          : "Issued"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setReturnDialogIssue(i);
                          setReturnCondition("Good");
                        }}
                        data-ocid={`library.returns.primary_button.${idx + 1}`}
                      >
                        Process Return
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {issued.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.returns.empty_state"
                    >
                      No books to return
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* FINES TAB */}
        <TabsContent value="fines" className="mt-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Issue ID</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Fine</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues
                  .filter((i) => i.fine > 0)
                  .map((i, idx) => (
                    <TableRow
                      key={i.issueId}
                      data-ocid={`library.fines.item.${idx + 1}`}
                    >
                      <TableCell className="font-mono text-xs">
                        {i.issueId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {i.bookName}
                      </TableCell>
                      <TableCell>{i.userName}</TableCell>
                      <TableCell>{i.returnDate || "Not returned"}</TableCell>
                      <TableCell>{i.bookCondition}</TableCell>
                      <TableCell className="text-red-600 font-bold">
                        ₹{i.fine}
                      </TableCell>
                      <TableCell>
                        {i.status === "Returned" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => markFinePaid(i.issueId)}
                            data-ocid={`library.fines.confirm_button.${idx + 1}`}
                          >
                            Mark Paid
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                {issues.filter((i) => i.fine > 0).length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.fines.empty_state"
                    >
                      No fines
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* REPORTS TAB */}
        <TabsContent value="reports" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">
                  Book Stock by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {CATEGORY_CONFIG.map((cat) => {
                    const catBooks = books.filter(
                      (b) => b.category === cat.name,
                    );
                    if (catBooks.length === 0) return null;
                    const total = catBooks.reduce((s, b) => s + b.quantity, 0);
                    const avail = catBooks.reduce(
                      (s, b) => s + b.availableQty,
                      0,
                    );
                    return (
                      <div
                        key={cat.name}
                        className="flex justify-between items-center text-sm"
                      >
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${cat.badgeClass}`}
                        >
                          {cat.icon} {cat.name}
                        </span>
                        <span className="text-slate-600">
                          {avail} / {total} available
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Issue Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Issues</span>
                    <span className="font-semibold">{issues.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Currently Issued</span>
                    <span className="font-semibold text-orange-600">
                      {issued.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Overdue</span>
                    <span className="font-semibold text-red-600">
                      {overdue.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Returned</span>
                    <span className="font-semibold text-green-600">
                      {issues.filter((i) => i.status === "Returned").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Fines (₹)</span>
                    <span className="font-semibold text-red-600">
                      {totalFines}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Book Dialog */}
      <Dialog open={bookFormOpen} onOpenChange={setBookFormOpen}>
        <DialogContent className="max-w-lg" data-ocid="library.books.dialog">
          <DialogHeader>
            <DialogTitle>{editBook ? "Edit Book" : "Add New Book"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="col-span-2">
              <Label>Book Name</Label>
              <Input
                value={bookForm.bookName}
                onChange={(e) =>
                  setBookForm({ ...bookForm, bookName: e.target.value })
                }
                placeholder="Book title"
                data-ocid="library.books.input"
              />
            </div>
            <div className="col-span-2">
              <Label>Author</Label>
              <Input
                value={bookForm.author}
                onChange={(e) =>
                  setBookForm({ ...bookForm, author: e.target.value })
                }
                placeholder="Author name"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={bookForm.category}
                onValueChange={(v) =>
                  setBookForm({
                    ...bookForm,
                    category: v,
                    subcategory: getCategoryConfig(v).subcategories[0],
                  })
                }
              >
                <SelectTrigger data-ocid="library.books.category.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {getCategoryConfig(c).icon} {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subcategory</Label>
              <Select
                value={bookForm.subcategory}
                onValueChange={(v) =>
                  setBookForm({ ...bookForm, subcategory: v })
                }
              >
                <SelectTrigger data-ocid="library.books.subcategory.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getCategoryConfig(bookForm.category).subcategories.map(
                    (sc) => (
                      <SelectItem key={sc} value={sc}>
                        {sc}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>ISBN</Label>
              <Input
                value={bookForm.isbn}
                onChange={(e) =>
                  setBookForm({ ...bookForm, isbn: e.target.value })
                }
                placeholder="ISBN"
              />
            </div>
            <div>
              <Label>Publisher</Label>
              <Input
                value={bookForm.publisher}
                onChange={(e) =>
                  setBookForm({ ...bookForm, publisher: e.target.value })
                }
                placeholder="Publisher"
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                min={1}
                value={bookForm.quantity}
                onChange={(e) =>
                  setBookForm({ ...bookForm, quantity: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <Label>Shelf Number</Label>
              <Input
                value={bookForm.shelfNumber}
                onChange={(e) =>
                  setBookForm({ ...bookForm, shelfNumber: e.target.value })
                }
                placeholder="e.g. A1"
              />
            </div>
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                min={0}
                value={bookForm.price}
                onChange={(e) =>
                  setBookForm({ ...bookForm, price: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBookFormOpen(false)}
              data-ocid="library.books.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveBook}
              data-ocid="library.books.save_button"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editBook ? "Save Changes" : "Add Book"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Return Dialog */}
      <Dialog
        open={!!returnDialogIssue}
        onOpenChange={(o) => !o && setReturnDialogIssue(null)}
      >
        <DialogContent data-ocid="library.return.dialog">
          <DialogHeader>
            <DialogTitle>Process Book Return</DialogTitle>
          </DialogHeader>
          {returnDialogIssue && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-slate-600">
                Book:{" "}
                <span className="font-semibold">
                  {returnDialogIssue.bookName}
                </span>
              </p>
              <p className="text-sm text-slate-600">
                Borrower:{" "}
                <span className="font-semibold">
                  {returnDialogIssue.userName}
                </span>
              </p>
              <p className="text-sm text-slate-600">
                Due Date:{" "}
                <span
                  className={
                    new Date(returnDialogIssue.dueDate) < new Date()
                      ? "text-red-600 font-semibold"
                      : "font-semibold"
                  }
                >
                  {returnDialogIssue.dueDate}
                </span>
              </p>
              <div>
                <Label>Book Condition</Label>
                <Select
                  value={returnCondition}
                  onValueChange={setReturnCondition}
                >
                  <SelectTrigger data-ocid="library.return.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Damaged">
                      Damaged (₹200 penalty)
                    </SelectItem>
                    <SelectItem value="Lost">Lost (Full price fine)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(() => {
                const today = new Date().toISOString().split("T")[0];
                const fine = calcFine({
                  ...returnDialogIssue,
                  returnDate: today,
                  bookCondition: returnCondition,
                });
                return fine > 0 ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 font-semibold flex items-center gap-1">
                      <IndianRupee size={14} /> Fine: ₹{fine}
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 font-semibold flex items-center gap-1">
                      <CheckCircle size={14} /> No fine — returned on time
                    </p>
                  </div>
                );
              })()}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReturnDialogIssue(null)}
              data-ocid="library.return.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={processReturn}
              data-ocid="library.return.confirm_button"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirm Return
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ── User Library (Student / Teacher) ──────────────────────────────────────────
function UserLibrary({
  maxBooks,
  userRole,
}: { maxBooks: number; userRole: string }) {
  const user = getCurrentUser();
  const [books, setBooks] = useState<LibraryBook[]>(getBooks);
  const [issues, setIssues] = useState<IssueRecord[]>(getIssues);
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState<"overview" | "browse">(
    "overview",
  );
  const [catFilter, setCatFilter] = useState("All");
  const [subcatFilter, setSubcatFilter] = useState("All");
  const [requestDialogBook, setRequestDialogBook] =
    useState<LibraryBook | null>(null);

  const refresh = () => {
    setBooks(getBooks());
    setIssues(getIssues());
  };

  useEffect(() => {
    const today = new Date();
    const iss = getIssues().map((i) => {
      if (i.status === "Issued" && new Date(i.dueDate) < today) {
        return { ...i, status: "Overdue" as const, fine: calcFine(i) };
      }
      return i;
    });
    saveIssues(iss);
    setIssues(iss);
  }, []);

  const myIssues = issues.filter(
    (i) => i.userId === user.id && i.status !== "Returned",
  );
  const myActiveCount = myIssues.filter((i) =>
    ["Issued", "Overdue", "Pending"].includes(i.status),
  ).length;
  const myFines = myIssues.reduce((s, i) => s + calcFine(i), 0);

  const today = new Date();
  const dueSoon = myIssues.filter((i) => {
    const due = new Date(i.dueDate);
    const diff = (due.getTime() - today.getTime()) / 86400000;
    return diff >= 0 && diff <= 3;
  });

  const currentSubcats =
    catFilter === "All" ? [] : getCategoryConfig(catFilter).subcategories;

  const filteredBooks = books.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      b.bookName.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.isbn.toLowerCase().includes(q);
    const matchCat = catFilter === "All" || b.category === catFilter;
    const matchSubcat =
      subcatFilter === "All" || b.subcategory === subcatFilter;
    return matchSearch && matchCat && matchSubcat;
  });

  const canBorrow = (book: LibraryBook): { ok: boolean; reason: string } => {
    const rule = getIssueRule(book.category);
    if (rule === "No")
      return { ok: false, reason: "Library use only — cannot be borrowed" };
    if (rule === "Online")
      return { ok: false, reason: "Available online only" };
    if (
      userRole === "teacher" &&
      (book.category === "Competitive" || book.category === "Literature")
    ) {
      return { ok: true, reason: "" }; // teachers can still borrow but we show note
    }
    if (myActiveCount >= maxBooks)
      return { ok: false, reason: `Maximum ${maxBooks} books limit reached` };
    if (myIssues.some((i) => i.bookId === book.bookId))
      return { ok: false, reason: "Already borrowed" };
    if (book.availableQty <= 0) return { ok: false, reason: "Not available" };
    return { ok: true, reason: "" };
  };

  const handleRequest = (book: LibraryBook) => {
    const { ok } = canBorrow(book);
    if (!ok) return;
    const todayStr = new Date().toISOString().split("T")[0];
    const newIssue: IssueRecord = {
      issueId: `ISS${Date.now()}`,
      bookId: book.bookId,
      bookName: book.bookName,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      issueDate: todayStr,
      dueDate: calcDueDate(todayStr),
      returnDate: null,
      status: "Pending",
      fine: 0,
      bookCondition: "Good",
    };
    saveIssues([...getIssues(), newIssue]);
    setRequestDialogBook(null);
    refresh();
  };

  return (
    <div className="space-y-6">
      {/* My Books Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "My Borrowed",
            value: myActiveCount,
            color: "text-blue-700",
            bg: "bg-blue-50",
            limit: `/ ${maxBooks}`,
          },
          {
            label: "Due Soon",
            value: dueSoon.length,
            color: "text-orange-700",
            bg: "bg-orange-50",
            limit: "",
          },
          {
            label: "My Fines (₹)",
            value: myFines,
            color: "text-red-700",
            bg: "bg-red-50",
            limit: "",
          },
          {
            label: "Total Books",
            value: books.length,
            color: "text-green-700",
            bg: "bg-green-50",
            limit: " titles",
          },
        ].map((k) => (
          <Card key={k.label} className="border border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-slate-500 font-medium">{k.label}</p>
              <p className={`text-2xl font-bold mt-1 ${k.color}`}>
                {k.value}
                <span className="text-sm font-normal text-slate-400">
                  {k.limit}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      {myFines > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle size={16} />
          You have outstanding fines of ₹{myFines}. Please clear them at the
          library counter.
        </div>
      )}
      {dueSoon.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2 text-amber-700 text-sm">
          <AlertCircle size={16} />
          {dueSoon.length} book(s) due within 3 days. Please return on time to
          avoid fines.
        </div>
      )}

      {/* My Active Borrows */}
      {myIssues.length > 0 && (
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800">
              📚 My Borrowed Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {myIssues.map((i, idx) => {
                const isOv = i.status === "Overdue";
                const isPending = i.status === "Pending";
                return (
                  <div
                    key={i.issueId}
                    data-ocid={`library.myborrowed.item.${idx + 1}`}
                    className={`flex items-center justify-between p-3 rounded-lg border ${isOv ? "bg-red-50 border-red-200" : isPending ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"}`}
                  >
                    <div>
                      <p className="font-medium text-sm text-slate-800">
                        {i.bookName}
                      </p>
                      <p className="text-xs text-slate-500">Due: {i.dueDate}</p>
                    </div>
                    <Badge
                      className={
                        isOv
                          ? "bg-red-100 text-red-700"
                          : isPending
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                      }
                    >
                      {i.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Toggle */}
      <div className="flex gap-2 border-b border-slate-200 pb-1">
        <button
          type="button"
          onClick={() => setActiveView("overview")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeView === "overview"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:text-slate-900"
          }`}
          data-ocid="library.overview.tab"
        >
          Category Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveView("browse")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeView === "browse"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:text-slate-900"
          }`}
          data-ocid="library.browse.tab"
        >
          Browse Books
        </button>
      </div>

      {/* Category Overview */}
      {activeView === "overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORY_CONFIG.map((cat) => {
            const catBooks = books.filter((b) => b.category === cat.name);
            const availQty = catBooks.reduce((s, b) => s + b.availableQty, 0);
            const isStudentOnly =
              cat.usedBy === "Students only" && userRole === "teacher";
            return (
              <Card
                key={cat.name}
                className={`border-2 ${cat.color} shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  isStudentOnly ? "opacity-75" : ""
                }`}
                onClick={() => {
                  setCatFilter(cat.name);
                  setSubcatFilter("All");
                  setActiveView("browse");
                }}
                data-ocid={"library.category.card"}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{cat.icon}</span>
                    <IssueRuleBadge rule={cat.issueRule} />
                  </div>
                  <CardTitle className="text-base font-bold text-slate-800 mt-1">
                    {cat.name} Books
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-400">Available</p>
                      <p className="font-bold text-green-600">{availQty}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Titles</p>
                      <p className="font-bold text-slate-700">
                        {catBooks.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.slice(0, 3).map((sc) => (
                      <span
                        key={sc}
                        className={`text-xs px-1.5 py-0.5 rounded ${cat.badgeClass}`}
                      >
                        {sc}
                      </span>
                    ))}
                  </div>
                  {isStudentOnly && (
                    <p className="text-xs text-amber-600 font-medium">
                      📌 Primarily for Students
                    </p>
                  )}
                  <p className="text-xs text-slate-400">👥 {cat.usedBy}</p>
                  <p className="text-xs text-blue-600 font-medium">
                    Click to browse →
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Browse Books */}
      {activeView === "browse" && (
        <div className="space-y-4">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                data-ocid="library.search_input"
                placeholder="Search books by title, author, ISBN…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {["All", ...CATEGORIES].map((cat) => {
              const count =
                cat === "All"
                  ? books.length
                  : books.filter((b) => b.category === cat).length;
              const cfg = cat !== "All" ? getCategoryConfig(cat) : null;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setCatFilter(cat);
                    setSubcatFilter("All");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    catFilter === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                  }`}
                  data-ocid={"library.filter.tab"}
                >
                  {cfg ? cfg.icon : "📋"} {cat}
                  <span
                    className={`text-xs px-1 rounded-full ${
                      catFilter === cat
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subcategory Chips */}
          {catFilter !== "All" && (
            <div className="flex gap-2 flex-wrap">
              {["All", ...currentSubcats].map((sc) => (
                <button
                  type="button"
                  key={sc}
                  onClick={() => setSubcatFilter(sc)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                    subcatFilter === sc
                      ? "bg-slate-700 text-white border-slate-700"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                  }`}
                  data-ocid="library.subcategory.tab"
                >
                  {sc}
                </button>
              ))}
            </div>
          )}

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBooks.map((book, idx) => {
              const cfg = getCategoryConfig(book.category);
              const rule = cfg.issueRule;
              const myIssued = myIssues.some((i) => i.bookId === book.bookId);
              const { ok: canBorrowOk, reason } = canBorrow(book);
              const isStudentOnly =
                cfg.usedBy === "Students only" && userRole === "teacher";
              return (
                <Card
                  key={book.bookId}
                  data-ocid={`library.books.item.${idx + 1}`}
                  className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-2xl">{cfg.icon}</span>
                      <IssueRuleBadge rule={rule} size="xs" />
                    </div>
                    <CardTitle className="text-sm font-bold text-slate-800 leading-tight mt-1">
                      {book.bookName}
                    </CardTitle>
                    <p className="text-xs text-slate-500">{book.author}</p>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1 flex flex-col justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${cfg.badgeClass}`}
                        >
                          {book.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {book.subcategory}
                        </span>
                      </div>
                      {isStudentOnly && (
                        <p className="text-xs text-amber-600">
                          📌 Available for Students
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Shelf: {book.shelfNumber}</span>
                        <span
                          className={
                            book.availableQty > 0
                              ? "text-green-600 font-semibold"
                              : "text-red-500 font-semibold"
                          }
                        >
                          {book.availableQty > 0
                            ? `${book.availableQty} available`
                            : "Unavailable"}
                        </span>
                      </div>
                    </div>
                    <div>
                      {myIssued ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-xs text-green-700 font-medium text-center">
                          ✓ Already Borrowed
                        </div>
                      ) : rule === "No" ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-700 font-medium text-center">
                          🚫 Library Reading Only
                        </div>
                      ) : rule === "Online" ? (
                        <Button
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs h-8"
                          size="sm"
                          onClick={() => window.open("#", "_blank")}
                          data-ocid={`library.books.primary_button.${idx + 1}`}
                        >
                          <Globe size={12} className="mr-1" /> Access Online
                        </Button>
                      ) : (
                        <Button
                          className={`w-full text-xs h-8 ${
                            canBorrowOk
                              ? rule === "Limited"
                                ? "bg-orange-500 hover:bg-orange-600 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                          size="sm"
                          disabled={!canBorrowOk}
                          onClick={() =>
                            canBorrowOk && setRequestDialogBook(book)
                          }
                          title={reason}
                          data-ocid={`library.books.primary_button.${idx + 1}`}
                        >
                          {rule === "Limited"
                            ? "⚠ Request (Limited)"
                            : "Borrow Book"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {filteredBooks.length === 0 && (
              <div
                className="col-span-full text-center py-16 text-slate-400"
                data-ocid="library.books.empty_state"
              >
                <BookOpen size={48} className="mx-auto mb-3 opacity-30" />
                <p className="text-lg font-medium">No books found</p>
                <p className="text-sm">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Borrow Confirm Dialog */}
      <Dialog
        open={!!requestDialogBook}
        onOpenChange={(o) => !o && setRequestDialogBook(null)}
      >
        <DialogContent data-ocid="library.borrow.dialog">
          <DialogHeader>
            <DialogTitle>Confirm Borrow Request</DialogTitle>
          </DialogHeader>
          {requestDialogBook && (
            <div className="space-y-3 py-2">
              <p className="text-sm text-slate-700">
                You are requesting to borrow:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="font-semibold text-slate-800">
                  {requestDialogBook.bookName}
                </p>
                <p className="text-sm text-slate-500">
                  by {requestDialogBook.author}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getCategoryConfig(requestDialogBook.category).badgeClass}`}
                  >
                    {requestDialogBook.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {requestDialogBook.subcategory}
                  </span>
                </div>
              </div>
              {getIssueRule(requestDialogBook.category) === "Limited" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-orange-700 text-sm">
                  ⚠ This is a limited-issue item (Journal/Magazine). Subject to
                  librarian approval.
                </div>
              )}
              <p className="text-xs text-slate-500">
                Due date will be 14 days from today. Late returns attract ₹5/day
                fine.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRequestDialogBook(null)}
              data-ocid="library.borrow.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                requestDialogBook && handleRequest(requestDialogBook)
              }
              data-ocid="library.borrow.confirm_button"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirm Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
