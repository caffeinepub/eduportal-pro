import {
  AlertCircle,
  Bell,
  BookOpen,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import type { Page } from "../../App";

const enrolledCourses = [
  {
    name: "Data Structures & Algorithms",
    teacher: "Dr. Rajesh Kumar",
    progress: 68,
    grade: "A",
  },
  {
    name: "Engineering Mathematics III",
    teacher: "Prof. Anita Sharma",
    progress: 55,
    grade: "B+",
  },
  {
    name: "Digital Electronics",
    teacher: "Mr. Suresh Patel",
    progress: 80,
    grade: "A-",
  },
];

const upcomingAssignments = [
  {
    title: "DSA Lab Assignment #4",
    course: "Data Structures & Algorithms",
    due: "Tomorrow",
    status: "pending",
  },
  {
    title: "Engineering Maths Problem Set",
    course: "Engineering Mathematics III",
    due: "Mar 28",
    status: "pending",
  },
  {
    title: "Logic Gate Design Report",
    course: "Digital Electronics",
    due: "Mar 30",
    status: "submitted",
  },
];

export default function StudentDashboard({
  navigate,
}: { navigate: (p: Page) => void }) {
  const pendingAssignments = upcomingAssignments.filter(
    (a) => a.status === "pending",
  );
  const userName = localStorage.getItem("eduportal_user_name") || "Student";
  const userYear = localStorage.getItem("eduportal_user_year") || "";
  const userBranch = localStorage.getItem("eduportal_user_branch") || "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome, {userName}!
        </h1>
        <p className="text-slate-500 mt-1">
          {userYear && userBranch ? `${userYear} · ${userBranch} · ` : ""}
          You have {pendingAssignments.length} assignment
          {pendingAssignments.length !== 1 ? "s" : ""} due this week.
        </p>
      </div>

      {/* Assignment submission reminder */}
      {pendingAssignments.length > 0 && (
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl px-5 py-4">
          <AlertCircle size={20} className="text-orange-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-orange-700">
              Assignment should be submitted!
            </p>
            <p className="text-xs text-orange-600 mt-0.5">
              You have {pendingAssignments.length} pending assignment
              {pendingAssignments.length > 1 ? "s" : ""}. Please submit before
              the due date to avoid penalties.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("assignments")}
            className="text-xs font-medium text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            View Assignments
          </button>
        </div>
      )}

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
            value: String(pendingAssignments.length),
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
                    {a.status === "pending" && (
                      <span className="ml-2 text-xs text-orange-500 font-normal">
                        • Should be submitted
                      </span>
                    )}
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
