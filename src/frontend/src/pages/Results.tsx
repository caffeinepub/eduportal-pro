import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  Download,
  Plus,
  Printer,
  Send,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Page, Role } from "../App";

type SubjectResult = {
  name: string;
  code: string;
  marks: number;
  total: number;
  grade: string;
};

type YearData = {
  mid1: SubjectResult[];
  mid2: SubjectResult[];
  semester: SubjectResult[];
};

const RESULTS_DATA: Record<string, YearData> = {
  "1st Year": {
    mid1: [
      {
        name: "Engineering Physics",
        code: "PH101",
        marks: 24,
        total: 30,
        grade: "B+",
      },
      {
        name: "Engineering Chemistry",
        code: "CH101",
        marks: 22,
        total: 30,
        grade: "B",
      },
      {
        name: "Engineering Mathematics I",
        code: "MA101",
        marks: 27,
        total: 30,
        grade: "A",
      },
      {
        name: "Engineering Mathematics II",
        code: "MA102",
        marks: 25,
        total: 30,
        grade: "A",
      },
      {
        name: "Basic Electronics",
        code: "EC101",
        marks: 21,
        total: 30,
        grade: "B",
      },
      {
        name: "Computer Programming (C)",
        code: "CS101",
        marks: 28,
        total: 30,
        grade: "A+",
      },
    ],
    mid2: [
      {
        name: "Engineering Physics",
        code: "PH101",
        marks: 23,
        total: 30,
        grade: "B+",
      },
      {
        name: "Engineering Chemistry",
        code: "CH101",
        marks: 25,
        total: 30,
        grade: "A",
      },
      {
        name: "Engineering Mathematics I",
        code: "MA101",
        marks: 26,
        total: 30,
        grade: "A",
      },
      {
        name: "Engineering Mathematics II",
        code: "MA102",
        marks: 24,
        total: 30,
        grade: "B+",
      },
      {
        name: "Basic Electronics",
        code: "EC101",
        marks: 22,
        total: 30,
        grade: "B",
      },
      {
        name: "Computer Programming (C)",
        code: "CS101",
        marks: 27,
        total: 30,
        grade: "A",
      },
    ],
    semester: [
      {
        name: "Engineering Physics",
        code: "PH101",
        marks: 76,
        total: 100,
        grade: "B+",
      },
      {
        name: "Engineering Chemistry",
        code: "CH101",
        marks: 72,
        total: 100,
        grade: "B+",
      },
      {
        name: "Engineering Mathematics I",
        code: "MA101",
        marks: 84,
        total: 100,
        grade: "A",
      },
      {
        name: "Engineering Mathematics II",
        code: "MA102",
        marks: 80,
        total: 100,
        grade: "A",
      },
      {
        name: "Basic Electronics",
        code: "EC101",
        marks: 70,
        total: 100,
        grade: "B+",
      },
      {
        name: "Computer Programming (C)",
        code: "CS101",
        marks: 91,
        total: 100,
        grade: "A+",
      },
    ],
  },
  "2nd Year": {
    mid1: [
      {
        name: "Digital Electronics",
        code: "EC201",
        marks: 25,
        total: 30,
        grade: "A",
      },
      {
        name: "Signals & Systems",
        code: "EC202",
        marks: 22,
        total: 30,
        grade: "B",
      },
      {
        name: "Engineering Mathematics III",
        code: "MA201",
        marks: 26,
        total: 30,
        grade: "A",
      },
      {
        name: "Object Oriented Programming",
        code: "CS201",
        marks: 28,
        total: 30,
        grade: "A+",
      },
      {
        name: "Data Structures",
        code: "CS202",
        marks: 27,
        total: 30,
        grade: "A",
      },
      {
        name: "Computer Organization",
        code: "CS203",
        marks: 23,
        total: 30,
        grade: "B+",
      },
    ],
    mid2: [
      {
        name: "Digital Electronics",
        code: "EC201",
        marks: 24,
        total: 30,
        grade: "B+",
      },
      {
        name: "Signals & Systems",
        code: "EC202",
        marks: 26,
        total: 30,
        grade: "A",
      },
      {
        name: "Engineering Mathematics III",
        code: "MA201",
        marks: 25,
        total: 30,
        grade: "A",
      },
      {
        name: "Object Oriented Programming",
        code: "CS201",
        marks: 27,
        total: 30,
        grade: "A",
      },
      {
        name: "Data Structures",
        code: "CS202",
        marks: 28,
        total: 30,
        grade: "A+",
      },
      {
        name: "Computer Organization",
        code: "CS203",
        marks: 22,
        total: 30,
        grade: "B",
      },
    ],
    semester: [
      {
        name: "Digital Electronics",
        code: "EC201",
        marks: 79,
        total: 100,
        grade: "B+",
      },
      {
        name: "Signals & Systems",
        code: "EC202",
        marks: 74,
        total: 100,
        grade: "B+",
      },
      {
        name: "Engineering Mathematics III",
        code: "MA201",
        marks: 83,
        total: 100,
        grade: "A",
      },
      {
        name: "Object Oriented Programming",
        code: "CS201",
        marks: 89,
        total: 100,
        grade: "A",
      },
      {
        name: "Data Structures",
        code: "CS202",
        marks: 92,
        total: 100,
        grade: "A+",
      },
      {
        name: "Computer Organization",
        code: "CS203",
        marks: 76,
        total: 100,
        grade: "B+",
      },
    ],
  },
  "3rd Year": {
    mid1: [
      {
        name: "Data Structures & Algorithms",
        code: "CS301",
        marks: 26,
        total: 30,
        grade: "A",
      },
      {
        name: "Computer Networks",
        code: "CS401",
        marks: 24,
        total: 30,
        grade: "B+",
      },
      {
        name: "Operating Systems",
        code: "CS302",
        marks: 28,
        total: 30,
        grade: "A+",
      },
      {
        name: "Database Management Systems",
        code: "CS303",
        marks: 22,
        total: 30,
        grade: "B",
      },
    ],
    mid2: [
      {
        name: "Data Structures & Algorithms",
        code: "CS301",
        marks: 25,
        total: 30,
        grade: "A",
      },
      {
        name: "Computer Networks",
        code: "CS401",
        marks: 27,
        total: 30,
        grade: "A",
      },
      {
        name: "Operating Systems",
        code: "CS302",
        marks: 23,
        total: 30,
        grade: "B+",
      },
      {
        name: "Database Management Systems",
        code: "CS303",
        marks: 26,
        total: 30,
        grade: "A",
      },
    ],
    semester: [
      {
        name: "Data Structures & Algorithms",
        code: "CS301",
        marks: 85,
        total: 100,
        grade: "A",
      },
      {
        name: "Computer Networks",
        code: "CS401",
        marks: 78,
        total: 100,
        grade: "B+",
      },
      {
        name: "Operating Systems",
        code: "CS302",
        marks: 91,
        total: 100,
        grade: "A+",
      },
      {
        name: "Database Management Systems",
        code: "CS303",
        marks: 74,
        total: 100,
        grade: "B+",
      },
    ],
  },
  "4th Year": {
    mid1: [
      {
        name: "Machine Learning",
        code: "CS401",
        marks: 27,
        total: 30,
        grade: "A",
      },
      {
        name: "Cloud Computing",
        code: "CS402",
        marks: 25,
        total: 30,
        grade: "A",
      },
      {
        name: "Compiler Design",
        code: "CS403",
        marks: 23,
        total: 30,
        grade: "B+",
      },
      {
        name: "Project Work",
        code: "CS490",
        marks: 28,
        total: 30,
        grade: "A+",
      },
      { name: "Elective I", code: "CS481", marks: 24, total: 30, grade: "B+" },
      { name: "Elective II", code: "CS482", marks: 26, total: 30, grade: "A" },
    ],
    mid2: [
      {
        name: "Machine Learning",
        code: "CS401",
        marks: 28,
        total: 30,
        grade: "A+",
      },
      {
        name: "Cloud Computing",
        code: "CS402",
        marks: 26,
        total: 30,
        grade: "A",
      },
      {
        name: "Compiler Design",
        code: "CS403",
        marks: 24,
        total: 30,
        grade: "B+",
      },
      {
        name: "Project Work",
        code: "CS490",
        marks: 29,
        total: 30,
        grade: "A+",
      },
      { name: "Elective I", code: "CS481", marks: 25, total: 30, grade: "A" },
      { name: "Elective II", code: "CS482", marks: 27, total: 30, grade: "A" },
    ],
    semester: [
      {
        name: "Machine Learning",
        code: "CS401",
        marks: 88,
        total: 100,
        grade: "A",
      },
      {
        name: "Cloud Computing",
        code: "CS402",
        marks: 83,
        total: 100,
        grade: "A",
      },
      {
        name: "Compiler Design",
        code: "CS403",
        marks: 77,
        total: 100,
        grade: "B+",
      },
      {
        name: "Project Work",
        code: "CS490",
        marks: 93,
        total: 100,
        grade: "A+",
      },
      { name: "Elective I", code: "CS481", marks: 80, total: 100, grade: "A" },
      { name: "Elective II", code: "CS482", marks: 85, total: 100, grade: "A" },
    ],
  },
};

// Teacher student marks state (mid1/30, mid2/30, sem/100)
type StudentMarks = { mid1: number; mid2: number; sem: number };

const INITIAL_STUDENT_MARKS: Record<string, StudentMarks> = {
  "Rahul Sharma": { mid1: 26, mid2: 25, sem: 85 },
  "Priya Patel": { mid1: 24, mid2: 22, sem: 79 },
  "Arjun Singh": { mid1: 28, mid2: 27, sem: 88 },
  "Sneha Reddy": { mid1: 22, mid2: 24, sem: 72 },
  "Karan Mehta": { mid1: 20, mid2: 21, sem: 65 },
  "Deepika Verma": { mid1: 18, mid2: 19, sem: 55 },
  "Rohan Gupta": { mid1: 29, mid2: 28, sem: 93 },
};

const TEACHER_STUDENT_DATA = [
  { name: "Rahul Sharma", rollNo: "CS301001" },
  { name: "Priya Patel", rollNo: "CS301002" },
  { name: "Arjun Singh", rollNo: "CS301003" },
  { name: "Sneha Reddy", rollNo: "CS301004" },
  { name: "Karan Mehta", rollNo: "CS301005" },
  { name: "Deepika Verma", rollNo: "CS301006" },
  { name: "Rohan Gupta", rollNo: "CS301007" },
];

const SUBJECTS_3RD = [
  "Data Structures & Algorithms",
  "Computer Networks",
  "Operating Systems",
  "Database Management Systems",
];

const CLASS_OPTIONS = [
  "3rd Year CSE",
  "2nd Year CSE",
  "1st Year CSE",
  "3rd Year ECE",
];

const ALL_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function gradeToPoints(grade: string): number {
  switch (grade) {
    case "A+":
      return 10;
    case "A":
      return 9;
    case "A-":
      return 8.5;
    case "B+":
      return 8;
    case "B":
      return 7;
    case "B-":
      return 6.5;
    case "C+":
      return 6;
    case "C":
      return 5;
    case "D":
      return 4;
    default:
      return 0;
  }
}

function calcSGPA(subjects: SubjectResult[]): number {
  const totalPoints = subjects.reduce(
    (sum, s) => sum + gradeToPoints(s.grade),
    0,
  );
  return Math.round((totalPoints / subjects.length) * 100) / 100;
}

function calcCGPA(yearsData: YearData[]): number {
  const sgpas = yearsData.map((yd) => calcSGPA(yd.semester));
  const avg = sgpas.reduce((s, g) => s + g, 0) / sgpas.length;
  return Math.round(avg * 100) / 100;
}

function calcGrade(pct: number): string {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  if (pct >= 50) return "C";
  if (pct >= 35) return "D";
  return "F";
}

function gradeColor(grade: string) {
  if (grade === "A+" || grade === "A") return "bg-green-100 text-green-700";
  if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-700";
  if (grade === "C" || grade === "D") return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
}

function SubjectRow({ r }: { r: SubjectResult }) {
  const pct = Math.round((r.marks / r.total) * 100);
  const pass = r.marks >= r.total * 0.35;
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-slate-800">{r.name}</p>
          <span className="text-xs text-slate-400">{r.code}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                pct >= 75
                  ? "bg-green-500"
                  : pct >= 50
                    ? "bg-blue-500"
                    : "bg-red-400"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 shrink-0">
            {r.marks}/{r.total}
          </span>
        </div>
      </div>
      <span
        className={`text-xs font-bold px-2 py-0.5 rounded-full ${gradeColor(r.grade)}`}
      >
        {r.grade}
      </span>
      <span
        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          pass ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        }`}
      >
        {pass ? "Pass" : "Fail"}
      </span>
    </div>
  );
}

export default function Results({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const registeredYear =
    localStorage.getItem("eduportal_user_year") || "3rd Year";
  const userName = localStorage.getItem("eduportal_user_name") || "Student";
  const userBranch = localStorage.getItem("eduportal_user_branch") || "";

  const registeredYearIndex = ALL_YEARS.indexOf(registeredYear);
  const studentYears =
    role === "student"
      ? ALL_YEARS.slice(0, registeredYearIndex + 1)
      : ALL_YEARS;

  const [selectedYear, setSelectedYear] = useState(
    role === "student" ? registeredYear : "3rd Year",
  );
  const [selectedExam, setSelectedExam] = useState("mid1");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    student: TEACHER_STUDENT_DATA[0].name,
    subject: SUBJECTS_3RD[0],
    examType: "Mid 1",
    marks: "",
  });

  // Teacher view state
  const [selectedClass, setSelectedClass] = useState(CLASS_OPTIONS[0]);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS_3RD[0]);
  const [studentMarks, setStudentMarks] = useState<
    Record<string, StudentMarks>
  >({ ...INITIAL_STUDENT_MARKS });
  const [editingCell, setEditingCell] = useState<{
    name: string;
    field: keyof StudentMarks;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  const examTabs = [
    { key: "mid1", label: "Mid 1" },
    { key: "mid2", label: "Mid 2" },
    { key: "semester", label: "Semester" },
  ];

  const yearData = RESULTS_DATA[selectedYear];
  const subjects: SubjectResult[] =
    selectedExam === "mid1"
      ? yearData.mid1
      : selectedExam === "mid2"
        ? yearData.mid2
        : yearData.semester;

  const totalMarks = subjects.reduce((s, r) => s + r.marks, 0);
  const maxMarks = subjects.reduce((s, r) => s + r.total, 0);
  const overallPct = Math.round((totalMarks / maxMarks) * 100);
  const currentSGPA = calcSGPA(RESULTS_DATA[selectedYear].semester);
  const completedYearsData = studentYears.map((y) => RESULTS_DATA[y]);
  const cgpa = calcCGPA(completedYearsData);

  const handleDownload = () => toast.success("Result PDF downloaded");
  const handleAddMarks = () => {
    toast.success(`Marks added for ${addForm.student} — ${addForm.subject}`);
    setShowAddModal(false);
  };

  // Teacher inline edit helpers
  const startEdit = (
    name: string,
    field: keyof StudentMarks,
    currentVal: number,
  ) => {
    setEditingCell({ name, field });
    setEditValue(String(currentVal));
  };

  const commitEdit = () => {
    if (!editingCell) return;
    const val = Number(editValue);
    if (!Number.isNaN(val) && val >= 0) {
      setStudentMarks((prev) => ({
        ...prev,
        [editingCell.name]: {
          ...prev[editingCell.name],
          [editingCell.field]: val,
        },
      }));
    }
    setEditingCell(null);
  };

  // Analytics computed from studentMarks
  const analyticsStudents = TEACHER_STUDENT_DATA.map((st) => {
    const m = studentMarks[st.name] || { mid1: 0, mid2: 0, sem: 0 };
    const total = m.mid1 + m.mid2 + m.sem;
    const pct = Math.round((total / 160) * 100);
    const grade = calcGrade(pct);
    return { ...st, ...m, total, pct, grade };
  });

  const classAvg = Math.round(
    analyticsStudents.reduce((s, st) => s + st.total, 0) /
      analyticsStudents.length,
  );
  const passPct = Math.round(
    (analyticsStudents.filter((st) => st.pct >= 35).length /
      analyticsStudents.length) *
      100,
  );
  const topPerformer = analyticsStudents.reduce(
    (best, st) => (st.total > best.total ? st : best),
    analyticsStudents[0],
  );

  // Per-subject averages (simulated)
  const subjectAvgs = SUBJECTS_3RD.map((sub, i) => ({
    name: sub,
    avg: Math.round(70 + i * 3 + Math.random() * 5),
  }));

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="results.back_button"
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Academic Results
          </h1>
          {role === "student" ? (
            <p className="text-slate-500 mt-1">
              {userName}
              {userBranch ? ` · ${userBranch}` : ""} · {registeredYear} ·
              Year-wise & Exam-wise Performance
            </p>
          ) : (
            <p className="text-slate-500 mt-1">
              BTech — Year-wise & Exam-wise Performance
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {role === "student" && (
            <button
              type="button"
              onClick={handleDownload}
              data-ocid="results.primary_button"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Download size={15} /> Download Result
            </button>
          )}
          {(role === "teacher" || role === "admin") && (
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              data-ocid="results.open_modal_button"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus size={15} /> Add Marks
            </button>
          )}
        </div>
      </div>

      {/* Year tabs */}
      <div className="flex gap-2 flex-wrap">
        {studentYears.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setSelectedYear(y)}
            data-ocid="results.tab"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedYear === y
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-slate-600 hover:bg-gray-200"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* ========== STUDENT VIEW ========== */}
      {role === "student" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <Award size={16} />
                <span className="text-xs font-medium opacity-80">CGPA</span>
              </div>
              <p className="text-2xl font-bold">{cgpa}</p>
              <p className="text-xs opacity-70">Cumulative (all years)</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={16} />
                <span className="text-xs font-medium opacity-80">SGPA</span>
              </div>
              <p className="text-2xl font-bold">{currentSGPA}</p>
              <p className="text-xs opacity-70">{selectedYear}</p>
            </div>
            <div className="bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle size={16} />
                <span className="text-xs font-medium opacity-80">Years</span>
              </div>
              <p className="text-2xl font-bold">{studentYears.length}</p>
              <p className="text-xs opacity-70">Completed</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} />
                <span className="text-xs font-medium opacity-80">Trend</span>
              </div>
              <p className="text-2xl font-bold">&uarr;</p>
              <p className="text-xs opacity-70">Improving</p>
            </div>
          </div>

          <div className="flex gap-2">
            {examTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedExam(tab.key)}
                data-ocid="results.tab"
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  selectedExam === tab.key
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-gray-200 hover:border-slate-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-gray-200">
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-700">
                {selectedYear} —{" "}
                {examTabs.find((t) => t.key === selectedExam)?.label} Overall
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {totalMarks}/{maxMarks} marks · {overallPct}%
              </p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
            </div>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full ${
                overallPct >= 75
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {overallPct}%
            </span>
          </div>

          <div className="space-y-3">
            {subjects.map((r) => (
              <SubjectRow key={r.code} r={r} />
            ))}
          </div>
        </>
      )}

      {/* ========== TEACHER / ADMIN VIEW ========== */}
      {(role === "teacher" || role === "admin") && (
        <>
          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-wrap items-end gap-4">
            <div>
              <label
                htmlFor="toolbar-class"
                className="text-xs font-semibold text-slate-500 uppercase block mb-1"
              >
                Class / Section
              </label>
              <select
                id="toolbar-class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                data-ocid="results.select"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm min-w-[160px]"
              >
                {CLASS_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="toolbar-subject"
                className="text-xs font-semibold text-slate-500 uppercase block mb-1"
              >
                Subject
              </label>
              <select
                id="toolbar-subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm min-w-[200px]"
              >
                {SUBJECTS_3RD.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={() =>
                  toast.success(
                    `Results for ${selectedClass} — ${selectedSubject} published successfully!`,
                  )
                }
                data-ocid="results.primary_button"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                <Send size={14} /> Publish Results
              </button>
              <button
                type="button"
                onClick={() => toast.success("Report downloaded as PDF")}
                data-ocid="results.secondary_button"
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                <Download size={14} /> Download
              </button>
              <button
                type="button"
                onClick={() => toast.success("Sending to printer...")}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Printer size={14} /> Print
              </button>
            </div>
          </div>

          {/* Exam type tabs */}
          <div className="flex gap-2">
            {examTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedExam(tab.key)}
                data-ocid="results.tab"
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  selectedExam === tab.key
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-gray-200 hover:border-slate-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Marks Entry Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-slate-800">
                Marks Entry — {selectedSubject}
              </h3>
              <p className="text-xs text-slate-400">
                Click any mark cell to edit. Grade and percentage
                auto-calculate.
              </p>
            </div>
            <table className="w-full min-w-[700px]" data-ocid="results.table">
              <thead className="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Roll No
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">
                    Mid 1 /30
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">
                    Mid 2 /30
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">
                    Semester /100
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">
                    Total /160
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">
                    %
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TEACHER_STUDENT_DATA.map((st, si) => {
                  const m = studentMarks[st.name] || {
                    mid1: 0,
                    mid2: 0,
                    sem: 0,
                  };
                  const total = m.mid1 + m.mid2 + m.sem;
                  const pct = Math.round((total / 160) * 100);
                  const grade = calcGrade(pct);
                  const rowBg =
                    pct >= 75
                      ? "hover:bg-green-50"
                      : pct >= 50
                        ? "hover:bg-orange-50"
                        : "hover:bg-red-50";
                  const rowBorder =
                    pct >= 75
                      ? "border-l-2 border-l-green-400"
                      : pct >= 50
                        ? "border-l-2 border-l-orange-400"
                        : "border-l-2 border-l-red-400";

                  const renderEditCell = (
                    field: keyof StudentMarks,
                    val: number,
                  ) => {
                    const isEditing =
                      editingCell?.name === st.name &&
                      editingCell?.field === field;
                    return (
                      <td className="px-4 py-3 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={commitEdit}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") commitEdit();
                              if (e.key === "Escape") setEditingCell(null);
                            }}
                            className="w-16 text-center border border-blue-400 rounded px-1 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEdit(st.name, field, val)}
                            className="text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded cursor-pointer transition-colors"
                            title="Click to edit"
                          >
                            {val}
                          </button>
                        )}
                      </td>
                    );
                  };

                  return (
                    <tr
                      key={st.name}
                      className={`${rowBg} ${rowBorder}`}
                      data-ocid={`results.row.${si + 1}`}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        {st.name}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {st.rollNo}
                      </td>
                      {renderEditCell("mid1", m.mid1)}
                      {renderEditCell("mid2", m.mid2)}
                      {renderEditCell("sem", m.sem)}
                      <td className="px-4 py-3 text-center text-sm font-bold text-slate-900">
                        {total}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-semibold">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            pct >= 75
                              ? "bg-green-100 text-green-700"
                              : pct >= 50
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-600"
                          }`}
                        >
                          {pct}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${gradeColor(grade)}`}
                        >
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Result Analytics Panel */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              📊 Result Analytics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {classAvg}/160
                </p>
                <p className="text-xs text-blue-500 mt-1">
                  Class Average Marks
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-700">{passPct}%</p>
                <p className="text-xs text-green-500 mt-1">Pass Percentage</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-amber-700 truncate">
                  {topPerformer?.name}
                </p>
                <p className="text-lg font-bold text-amber-600">
                  {topPerformer?.total}/160
                </p>
                <p className="text-xs text-amber-500">Top Performer</p>
              </div>
            </div>
            {/* Subject-wise bar chart */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3">
                Subject-wise Class Average
              </p>
              <div className="space-y-2">
                {subjectAvgs.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <p className="text-xs text-slate-600 w-44 truncate shrink-0">
                      {s.name}
                    </p>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${s.avg}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 w-8 text-right">
                      {s.avg}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Performance Tracking */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              🧑‍🎓 Student Performance Tracking
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase">
                      Student
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-slate-500 uppercase">
                      Mid 1
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-slate-500 uppercase">
                      Mid 2
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-slate-500 uppercase">
                      Semester
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-slate-500 uppercase">
                      Total
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-slate-500 uppercase">
                      %
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-slate-500 uppercase">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {analyticsStudents.map((st, si) => {
                    const trend =
                      st.mid2 > st.mid1 ? "↑" : st.mid2 < st.mid1 ? "↓" : "→";
                    const trendColor =
                      trend === "↑"
                        ? "text-green-600"
                        : trend === "↓"
                          ? "text-red-500"
                          : "text-slate-400";
                    const rowBg =
                      st.pct >= 75
                        ? "bg-green-50/60"
                        : st.pct >= 50
                          ? "bg-orange-50/60"
                          : "bg-red-50/60";
                    return (
                      <tr
                        key={st.name}
                        className={rowBg}
                        data-ocid={`results.item.${si + 1}`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">
                          <div>
                            <p>{st.name}</p>
                            <p className="text-xs text-slate-400">
                              {st.rollNo}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-slate-700">
                          {st.mid1}/30
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-slate-700">
                          {st.mid2}/30
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-slate-700">
                          {st.sem}/100
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-bold text-slate-900">
                          {st.total}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              st.pct >= 75
                                ? "bg-green-100 text-green-700"
                                : st.pct >= 50
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-red-100 text-red-600"
                            }`}
                          >
                            {st.pct}%
                          </span>
                        </td>
                        <td
                          className={`px-4 py-3 text-center text-lg font-bold ${trendColor}`}
                        >
                          {trend}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-green-200" />
                <span className="text-xs text-slate-500">Above 75%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-orange-200" />
                <span className="text-xs text-slate-500">50–75%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-200" />
                <span className="text-xs text-slate-500">Below 50%</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Marks Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            data-ocid="results.dialog"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Add Marks</h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                data-ocid="results.close_button"
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="rm-student"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Student
                </label>
                <select
                  id="rm-student"
                  value={addForm.student}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, student: e.target.value }))
                  }
                  data-ocid="results.select"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {TEACHER_STUDENT_DATA.map((s) => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="rm-subject"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Subject
                </label>
                <select
                  id="rm-subject"
                  value={addForm.subject}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {SUBJECTS_3RD.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="rm-exam"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Exam Type
                </label>
                <select
                  id="rm-exam"
                  value={addForm.examType}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, examType: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {["Mid 1", "Mid 2", "Semester"].map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="rm-marks"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Marks
                </label>
                <input
                  id="rm-marks"
                  type="number"
                  value={addForm.marks}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, marks: e.target.value }))
                  }
                  data-ocid="results.input"
                  placeholder={
                    addForm.examType === "Semester" ? "Out of 100" : "Out of 30"
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                data-ocid="results.cancel_button"
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddMarks}
                data-ocid="results.confirm_button"
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Save Marks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
