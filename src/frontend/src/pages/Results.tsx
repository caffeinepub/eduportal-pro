import { ArrowLeft } from "lucide-react";
import type { Page, Role } from "../App";

const results = [
  {
    student: "Alex Thompson",
    exam: "Calculus Midterm",
    course: "Advanced Mathematics",
    score: 88,
    grade: "A-",
    date: "Nov 15, 2025",
  },
  {
    student: "Maria Garcia",
    exam: "Calculus Midterm",
    course: "Advanced Mathematics",
    score: 92,
    grade: "A",
    date: "Nov 15, 2025",
  },
  {
    student: "James Lee",
    exam: "Calculus Midterm",
    course: "Advanced Mathematics",
    score: 74,
    grade: "C+",
    date: "Nov 15, 2025",
  },
  {
    student: "Sophie Turner",
    exam: "Physics Lab Test",
    course: "Physics",
    score: 85,
    grade: "B+",
    date: "Nov 18, 2025",
  },
  {
    student: "Daniel Kim",
    exam: "Physics Lab Test",
    course: "Physics",
    score: 79,
    grade: "B-",
    date: "Nov 18, 2025",
  },
  {
    student: "Alex Thompson",
    exam: "CS Unit Test",
    course: "Computer Science",
    score: 95,
    grade: "A+",
    date: "Nov 28, 2025",
  },
  {
    student: "Maria Garcia",
    exam: "CS Unit Test",
    course: "Computer Science",
    score: 88,
    grade: "A-",
    date: "Nov 28, 2025",
  },
];

const gradeColor: Record<string, string> = {
  "A+": "text-green-700 bg-green-100",
  A: "text-green-700 bg-green-100",
  "A-": "text-green-600 bg-green-100",
  "B+": "text-blue-600 bg-blue-100",
  B: "text-blue-600 bg-blue-100",
  "B-": "text-blue-500 bg-blue-100",
  "C+": "text-orange-600 bg-orange-100",
};

export default function Results({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const displayResults =
    role === "student"
      ? results.filter((r) => r.student === "Alex Thompson")
      : results;

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
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Results</h1>
        <p className="text-slate-500 mt-1">
          {displayResults.length} result records
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              {role !== "student" && (
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Student
                </th>
              )}
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Exam
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Course
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Score
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Grade
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayResults.map((r) => (
              <tr key={`${r.student}-${r.exam}`} className="hover:bg-slate-50">
                {role !== "student" && (
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">
                    {r.student}
                  </td>
                )}
                <td className="px-5 py-3 text-sm text-slate-700">{r.exam}</td>
                <td className="px-5 py-3 text-sm text-slate-500">{r.course}</td>
                <td className="px-5 py-3 text-sm font-semibold text-slate-900">
                  {r.score}/100
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${gradeColor[r.grade] || "bg-gray-100 text-gray-500"}`}
                  >
                    {r.grade}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-slate-400">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
