import {
  BookOpen,
  FileText,
  Plus,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Page } from "../../App";

const kpis = [
  {
    label: "Total Students",
    value: "480",
    change: "+12%",
    icon: <Users size={20} />,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Total Teachers",
    value: "48",
    change: "+3%",
    icon: <BookOpen size={20} />,
    color: "text-purple-600 bg-purple-100",
  },
  {
    label: "Active Courses",
    value: "24",
    change: "+5%",
    icon: <TrendingUp size={20} />,
    color: "text-green-600 bg-green-100",
  },
  {
    label: "Recent Enrollments",
    value: "72",
    change: "+18%",
    icon: <UserPlus size={20} />,
    color: "text-orange-600 bg-orange-100",
  },
  {
    label: "Upcoming Exams",
    value: "5",
    change: "",
    icon: <FileText size={20} />,
    color: "text-red-600 bg-red-100",
  },
];

const chartData = [
  { month: "Jan", attendance: 92, assignments: 78 },
  { month: "Feb", attendance: 88, assignments: 82 },
  { month: "Mar", attendance: 95, assignments: 85 },
  { month: "Apr", attendance: 91, assignments: 79 },
  { month: "May", attendance: 87, assignments: 88 },
  { month: "Jun", attendance: 93, assignments: 91 },
];

const activities = [
  { activity: "New course added", user: "Dr. Rajesh Kumar", time: "2 min ago" },
  { activity: "Student enrolled", user: "Arjun Mehta", time: "15 min ago" },
  { activity: "Lab report submitted", user: "Priya Nair", time: "32 min ago" },
  { activity: "Exam scheduled", user: "Prof. Anita Sharma", time: "1 hr ago" },
  { activity: "Grades posted", user: "Mr. Suresh Patel", time: "2 hr ago" },
];

const recentMessages = [
  {
    name: "Rajesh Kumar",
    msg: "Please review the new lab curriculum...",
    initials: "RK",
  },
  {
    name: "Arjun Mehta",
    msg: "Question about the upcoming semester exam...",
    initials: "AM",
  },
  {
    name: "Priya Nair",
    msg: "The lab equipment is ready for use",
    initials: "PN",
  },
];

interface Props {
  navigate: (p: Page) => void;
}

export default function AdminDashboard({ navigate }: Props) {
  const adminName = localStorage.getItem("eduportal_user_name") || "Admin";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Welcome back, {adminName}! Here's an overview of your institution.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">{k.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {k.value}
                </p>
                {k.change && (
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded mt-1 inline-block">
                    {k.change}
                  </span>
                )}
              </div>
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${k.color}`}
              >
                {k.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-slate-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {activities.map((a) => (
              <div
                key={a.activity}
                className="px-5 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {a.activity}
                  </p>
                  <p className="text-xs text-slate-400">{a.user}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="font-semibold text-slate-900 mb-1">
            Overview Analytics
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Attendance & assignment submissions
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[70, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#2B6FD6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="assignments"
                stroke="#2E9D57"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions + Messages */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-slate-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Add New Course", page: "courses" as Page },
                { label: "Enroll Student", page: "students" as Page },
                { label: "Create Exam", page: "exams" as Page },
                { label: "Post Announcement", page: "announcements" as Page },
                { label: "Manage Library", page: "library" as Page },
              ].map((a) => (
                <button
                  type="button"
                  key={a.label}
                  onClick={() => navigate(a.page)}
                  className="w-full py-2 px-3 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={14} />
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-slate-900 mb-3">
              Recent Messages
            </h2>
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {m.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {m.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{m.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
