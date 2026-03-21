import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  Download,
  Plus,
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
      {
        name: "Software Engineering",
        code: "CS304",
        marks: 25,
        total: 30,
        grade: "A",
      },
      {
        name: "Engineering Mathematics III",
        code: "MA301",
        marks: 27,
        total: 30,
        grade: "A",
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
      {
        name: "Software Engineering",
        code: "CS304",
        marks: 28,
        total: 30,
        grade: "A+",
      },
      {
        name: "Engineering Mathematics III",
        code: "MA301",
        marks: 24,
        total: 30,
        grade: "B+",
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
      {
        name: "Software Engineering",
        code: "CS304",
        marks: 88,
        total: 100,
        grade: "A",
      },
      {
        name: "Engineering Mathematics III",
        code: "MA301",
        marks: 82,
        total: 100,
        grade: "A",
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

const TEACHER_STUDENT_DATA = [
  { name: "Rahul Sharma", rollNo: "CS301001" },
  { name: "Priya Patel", rollNo: "CS301002" },
  { name: "Arjun Singh", rollNo: "CS301003" },
  { name: "Sneha Reddy", rollNo: "CS301004" },
  { name: "Karan Mehta", rollNo: "CS301005" },
];

const SUBJECTS_3RD = [
  "Data Structures & Algorithms",
  "Computer Networks",
  "Operating Systems",
  "Database Management Systems",
  "Software Engineering",
  "Engineering Mathematics III",
];

const TEACHER_MARKS: Record<
  string,
  { mid1: number; mid2: number; sem: number }
> = {
  "Rahul Sharma-DSA": { mid1: 26, mid2: 25, sem: 85 },
  "Priya Patel-DSA": { mid1: 24, mid2: 22, sem: 79 },
  "Arjun Singh-DSA": { mid1: 28, mid2: 27, sem: 88 },
  "Sneha Reddy-DSA": { mid1: 22, mid2: 24, sem: 72 },
  "Karan Mehta-DSA": { mid1: 25, mid2: 26, sem: 81 },
};

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

function gradeColor(grade: string) {
  if (grade === "A+" || grade === "A") return "bg-green-100 text-green-700";
  if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-700";
  if (grade === "C+" || grade === "C") return "bg-orange-100 text-orange-700";
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
  // Read registered year from localStorage for students
  const registeredYear =
    localStorage.getItem("eduportal_user_year") || "3rd Year";
  const userName = localStorage.getItem("eduportal_user_name") || "Student";
  const userBranch = localStorage.getItem("eduportal_user_branch") || "";

  // For students: only show years up to the registered year
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

  // SGPA = for currently selected year's semester
  const currentSGPA = calcSGPA(RESULTS_DATA[selectedYear].semester);
  // CGPA = cumulative across all student's years up to registered year
  const completedYearsData = studentYears.map((y) => RESULTS_DATA[y]);
  const cgpa = calcCGPA(completedYearsData);

  const handleDownload = () => {
    toast.success("Result PDF downloaded");
  };

  const handleAddMarks = () => {
    toast.success(`Marks added for ${addForm.student} — ${addForm.subject}`);
    setShowAddModal(false);
  };

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

      {/* Year tabs — students only see up to their registered year */}
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

      {/* Student view */}
      {role === "student" && (
        <>
          {/* CGPA / SGPA summary */}
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

          {/* Overall summary for current view */}
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

          {/* Subject rows */}
          <div className="space-y-3">
            {subjects.map((r) => (
              <SubjectRow key={r.code} r={r} />
            ))}
          </div>
        </>
      )}

      {/* Teacher / Admin view */}
      {(role === "teacher" || role === "admin") && (
        <>
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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[700px]" data-ocid="results.table">
              <thead className="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Mid 1
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Mid 2
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Semester
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TEACHER_STUDENT_DATA.map((st, si) =>
                  subjects.map((sub, ri) => {
                    const key = `${st.name}-DSA`;
                    const m = TEACHER_MARKS[key] || {
                      mid1: 20 + ri,
                      mid2: 22 + ri,
                      sem: 70 + ri * 2,
                    };
                    const total = m.mid1 + m.mid2 + Math.round(m.sem / 10);
                    const grade = total >= 65 ? "A" : total >= 55 ? "B+" : "B";
                    return (
                      <tr
                        key={`${st.name}-${sub.code}`}
                        className="hover:bg-slate-50"
                        data-ocid={`results.row.${si * subjects.length + ri + 1}`}
                      >
                        {ri === 0 && (
                          <td
                            className="px-4 py-3 text-sm font-medium text-slate-900"
                            rowSpan={subjects.length}
                          >
                            <div>
                              <p>{st.name}</p>
                              <p className="text-xs text-slate-400">
                                {st.rollNo}
                              </p>
                            </div>
                          </td>
                        )}
                        <td className="px-4 py-3 text-sm text-slate-700">
                          <p>{sub.name}</p>
                          <p className="text-xs text-slate-400">{sub.code}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          {m.mid1}/30
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          {m.mid2}/30
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          {m.sem}/100
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                          {total}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-full ${gradeColor(grade)}`}
                          >
                            {grade}
                          </span>
                        </td>
                      </tr>
                    );
                  }),
                )}
              </tbody>
            </table>
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
