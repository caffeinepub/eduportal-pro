import { BookOpen, Calendar, ClipboardList, Users } from "lucide-react";
import type { Page } from "../../App";

const myCourses = [
  {
    name: "Advanced Mathematics",
    students: 42,
    code: "MATH401",
    schedule: "Mon/Wed 9:00 AM",
  },
  {
    name: "Physics Lab",
    students: 28,
    code: "PHYS301",
    schedule: "Tue/Thu 2:00 PM",
  },
  {
    name: "Calculus I",
    students: 35,
    code: "MATH201",
    schedule: "Mon/Fri 11:00 AM",
  },
];

const pending = [
  {
    assignment: "Calculus Homework #5",
    course: "Calculus I",
    submissions: 28,
    due: "2 days ago",
  },
  {
    assignment: "Lab Report 3",
    course: "Physics Lab",
    submissions: 22,
    due: "3 days ago",
  },
  {
    assignment: "Problem Set 8",
    course: "Advanced Mathematics",
    submissions: 35,
    due: "5 days ago",
  },
];

const todayClasses = [
  {
    time: "9:00 AM",
    course: "Advanced Mathematics",
    room: "Room 201",
    students: 42,
  },
  { time: "11:00 AM", course: "Calculus I", room: "Room 105", students: 35 },
  {
    time: "2:00 PM",
    course: "Office Hours",
    room: "Staff Office",
    students: 0,
  },
];

export default function TeacherDashboard({
  navigate,
}: { navigate: (p: Page) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Teacher Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Good morning, Dr. Sarah Johnson. You have 3 classes today.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "My Courses",
            value: "3",
            icon: <BookOpen size={18} />,
            color: "bg-blue-100 text-blue-600",
          },
          {
            label: "Total Students",
            value: "105",
            icon: <Users size={18} />,
            color: "bg-green-100 text-green-600",
          },
          {
            label: "Pending Grades",
            value: "85",
            icon: <ClipboardList size={18} />,
            color: "bg-orange-100 text-orange-600",
          },
          {
            label: "Today's Classes",
            value: "3",
            icon: <Calendar size={18} />,
            color: "bg-purple-100 text-purple-600",
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
            {myCourses.map((c) => (
              <div key={c.name} className="px-5 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {c.code} &bull; {c.schedule}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {c.students} students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-slate-900">Pending to Grade</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {pending.map((p) => (
                <div
                  key={p.assignment}
                  className="px-5 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {p.assignment}
                    </p>
                    <p className="text-xs text-slate-400">
                      {p.course} &bull; {p.submissions} submissions
                    </p>
                  </div>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                    {p.due}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-slate-900">Today's Schedule</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {todayClasses.map((c) => (
                <div key={c.time} className="px-5 py-3 flex items-center gap-3">
                  <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                    {c.time}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {c.course}
                    </p>
                    <p className="text-xs text-slate-400">
                      {c.room}
                      {c.students > 0 ? ` &bull; ${c.students} students` : ""}
                    </p>
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
