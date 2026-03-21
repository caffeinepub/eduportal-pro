import { BookOpen, FileText, MessageSquare, TrendingUp } from "lucide-react";
import type { Page } from "../../App";

const subjects = [
  { name: "Mathematics", grade: "A-", score: 88, teacher: "Dr. Sarah Johnson" },
  { name: "Physics", grade: "B+", score: 83, teacher: "Mr. James Wilson" },
  { name: "English", grade: "A", score: 92, teacher: "Ms. Emily Davis" },
  { name: "Chemistry", grade: "B", score: 79, teacher: "Prof. Robert Brown" },
];

const upcomingExams = [
  { subject: "Mathematics", date: "Dec 20", type: "Final Exam" },
  { subject: "Physics", date: "Dec 22", type: "Midterm" },
];

export default function ParentDashboard({
  navigate,
}: { navigate: (p: Page) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Parent Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Monitoring progress for{" "}
          <span className="font-medium">Alex Thompson</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Attendance Rate",
            value: "94%",
            icon: <TrendingUp size={18} />,
            color: "bg-green-100 text-green-600",
          },
          {
            label: "Enrolled Courses",
            value: "5",
            icon: <BookOpen size={18} />,
            color: "bg-blue-100 text-blue-600",
          },
          {
            label: "Average Grade",
            value: "B+",
            icon: <FileText size={18} />,
            color: "bg-purple-100 text-purple-600",
          },
          {
            label: "Teacher Messages",
            value: "3",
            icon: <MessageSquare size={18} />,
            color: "bg-orange-100 text-orange-600",
          },
        ].map((k) => (
          <div
            key={k.label}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-3"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.color}`}
            >
              {k.icon}
            </div>
            <div>
              <p className="text-xs text-slate-500">{k.label}</p>
              <p className="text-xl font-bold text-slate-900">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-slate-900">
              Academic Performance
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {subjects.map((s) => (
              <div key={s.name} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-slate-900 text-sm">{s.name}</p>
                  <span className="text-sm font-bold text-blue-600">
                    {s.grade}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{s.teacher}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${s.score >= 90 ? "bg-green-500" : s.score >= 80 ? "bg-blue-500" : "bg-orange-400"}`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">{s.score}/100</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-slate-900">Upcoming Exams</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {upcomingExams.map((e) => (
                <div
                  key={e.subject}
                  className="px-5 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {e.subject}
                    </p>
                    <p className="text-xs text-slate-400">{e.type}</p>
                  </div>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                    {e.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-slate-900 mb-3">
              Attendance Overview
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg
                  viewBox="0 0 36 36"
                  className="w-20 h-20 -rotate-90"
                  aria-label="Attendance chart"
                >
                  <title>Attendance</title>
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeDasharray="94 6"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-900">
                  94%
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-600">
                  Alex has attended{" "}
                  <span className="font-semibold text-slate-900">
                    94 out of 100
                  </span>{" "}
                  classes this semester.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("attendance")}
                  className="text-xs text-blue-600 hover:underline mt-1"
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
