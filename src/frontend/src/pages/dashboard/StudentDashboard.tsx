import { Bell, BookOpen, ClipboardList, TrendingUp } from "lucide-react";
import type { Page } from "../../App";

const enrolledCourses = [
  {
    name: "Advanced Mathematics",
    teacher: "Dr. Sarah Johnson",
    progress: 72,
    grade: "A-",
  },
  {
    name: "Physics Lab",
    teacher: "Mr. James Wilson",
    progress: 58,
    grade: "B+",
  },
  {
    name: "English Literature",
    teacher: "Ms. Emily Davis",
    progress: 85,
    grade: "A",
  },
];

const upcomingAssignments = [
  {
    title: "Calculus Homework #6",
    course: "Advanced Mathematics",
    due: "Tomorrow",
    status: "pending",
  },
  {
    title: "Lab Report 4",
    course: "Physics Lab",
    due: "Dec 15",
    status: "pending",
  },
  {
    title: "Essay Draft",
    course: "English Literature",
    due: "Dec 18",
    status: "submitted",
  },
];

export default function StudentDashboard({
  navigate,
}: { navigate: (p: Page) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Hello, Alex! You have 2 assignments due this week.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Enrolled Courses",
            value: "5",
            icon: <BookOpen size={18} />,
            color: "bg-blue-100 text-blue-600",
          },
          {
            label: "Pending Assignments",
            value: "3",
            icon: <ClipboardList size={18} />,
            color: "bg-orange-100 text-orange-600",
          },
          {
            label: "Attendance Rate",
            value: "94%",
            icon: <TrendingUp size={18} />,
            color: "bg-green-100 text-green-600",
          },
          {
            label: "Upcoming Exams",
            value: "2",
            icon: <Bell size={18} />,
            color: "bg-red-100 text-red-600",
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
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">My Courses</h2>
            <button
              type="button"
              onClick={() => navigate("courses")}
              className="text-xs text-blue-600 hover:underline"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {enrolledCourses.map((c) => (
              <div key={c.name} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900 text-sm">{c.name}</p>
                  <span className="text-sm font-bold text-blue-600">
                    {c.grade}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{c.teacher}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {c.progress}% complete
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">
              Upcoming Assignments
            </h2>
            <button
              type="button"
              onClick={() => navigate("assignments")}
              className="text-xs text-blue-600 hover:underline"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingAssignments.map((a) => (
              <div
                key={a.title}
                className="px-5 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {a.course} &bull; Due: {a.due}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    a.status === "submitted"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
